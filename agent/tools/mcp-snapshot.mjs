#!/usr/bin/env node
// mcp-snapshot.mjs — snapshot the tool contracts of a set of MCP servers (stdio), hash each tool
// definition, and diff two consecutive snapshots. This is the learnt agent's independent data point
// for the "tool-contract drift" signal mcpindex.ai reports fingerprint-only (no server/tool names, so
// their ledger can't be checked against itself). We can't verify their numbers, so we build our own
// pin-and-diff — the same method mcp-scan uses for `whitelist tool "<name>" "<hash>"`.
//
//   snapshot:  node agent/tools/mcp-snapshot.mjs snapshot --manifest agent/tools/mcp-servers.json \
//                --out agent/data/mcp-snapshots/2026-08-20.json
//   diff:      node agent/tools/mcp-snapshot.mjs diff <old.json> <new.json>
//
// Each snapshot records, per server, every tool's name + a SHA-256 over its contract-relevant fields
// (name/title/description/inputSchema/outputSchema/annotations) plus the readOnlyHint/destructiveHint
// flags, so a later diff can name exactly which tools changed and which flipped read-only → write.
// Zero external dependencies (node:child_process + node:crypto only).
import { spawn } from 'node:child_process';
import { createHash } from 'node:crypto';
import { readFileSync, writeFileSync, mkdirSync } from 'node:fs';
import { dirname } from 'node:path';

const PROTOCOL = '2025-06-18';

const canonical = (v) => {
  if (v === null || typeof v !== 'object') return v;
  if (Array.isArray(v)) return v.map(canonical);
  const o = {};
  for (const k of Object.keys(v).sort()) o[k] = canonical(v[k]);
  return o;
};
const sha256 = (o) => createHash('sha256').update(JSON.stringify(canonical(o))).digest('hex');

// The fields a client's pinned approval depends on. Changing any of these is a contract change.
function contract(tool) {
  return {
    name: tool.name,
    title: tool.title ?? null,
    description: tool.description ?? null,
    inputSchema: tool.inputSchema ?? null,
    outputSchema: tool.outputSchema ?? null,
    annotations: tool.annotations ?? null,
  };
}

// Send one JSON-RPC request over MCP stdio (newline-delimited per the spec) and resolve on the
// matching response id. `timeoutMs` is generous because `npx -y` may download the server first.
function ask(child, id, method, params, timeoutMs) {
  return new Promise((resolve, reject) => {
    let buf = '';
    const timer = setTimeout(() => {
      child.stdout.removeListener('data', onData);
      reject(new Error(`timeout waiting for ${method} (id ${id}) after ${timeoutMs}ms`));
    }, timeoutMs);
    const onData = (d) => {
      buf += d.toString();
      let i;
      while ((i = buf.indexOf('\n')) !== -1) {
        const line = buf.slice(0, i).replace(/\r$/, '');
        buf = buf.slice(i + 1);
        if (!line.trim()) continue;
        let msg;
        try { msg = JSON.parse(line); } catch { continue; }
        if (msg.id === id) {
          clearTimeout(timer);
          child.stdout.removeListener('data', onData);
          resolve(msg);
        }
      }
    };
    child.stdout.setEncoding('utf8');
    child.stdout.on('data', onData);
    child.stdin.write(JSON.stringify({ jsonrpc: '2.0', id, method, params }) + '\n');
  });
}

async function snapshotServer(spec) {
  const { name, command, args = [], env = {} } = spec;
  // detached:true puts the child in its own process group. npx wraps the real server in a grandchild
  // and doesn't always forward SIGTERM, so killing only npx leaves the server alive holding the stdout
  // write end — the parent then hangs waiting for EOF. Killing the whole group closes every write end.
  const child = spawn(command, args, {
    stdio: ['pipe', 'pipe', 'inherit'],
    env: { ...process.env, ...env },
    detached: true,
  });
  try {
    const init = await ask(child, 1, 'initialize', {
      protocolVersion: PROTOCOL,
      capabilities: {},
      clientInfo: { name: 'mcp-snapshot', version: '0.1.0' },
    }, 120000);
    if (init.error) throw new Error(`initialize error: ${JSON.stringify(init.error)}`);
    child.stdin.write(JSON.stringify({ jsonrpc: '2.0', method: 'notifications/initialized' }) + '\n');
    const list = await ask(child, 2, 'tools/list', {}, 60000);
    if (list.error) throw new Error(`tools/list error: ${JSON.stringify(list.error)}`);
    const tools = (list.result && list.result.tools) || [];
    return {
      ok: true,
      protocolVersion: init.result?.protocolVersion ?? PROTOCOL,
      serverInfo: init.result?.serverInfo ?? null,
      toolCount: tools.length,
      tools: tools.map((t) => ({
        name: t.name,
        sha256: sha256(contract(t)),
        readOnlyHint: t.annotations?.readOnlyHint ?? null,
        destructiveHint: t.annotations?.destructiveHint ?? null,
        idempotentHint: t.annotations?.idempotentHint ?? null,
      })),
    };
  } finally {
    try {
      process.kill(-child.pid, 'SIGKILL'); // kill the whole process group (npx + any grandchildren)
    } catch {
      try { child.kill('SIGKILL'); } catch {}
    }
  }
}

function runSnapshot(manifestPath, outPath) {
  const manifest = JSON.parse(readFileSync(manifestPath, 'utf8'));
  return (async () => {
    const servers = {};
    for (const spec of manifest.servers) {
      try {
        servers[spec.name] = await snapshotServer(spec);
      } catch (e) {
        servers[spec.name] = { ok: false, error: String((e && e.message) || e) };
      }
    }
    const out = { capturedAt: new Date().toISOString(), servers };
    mkdirSync(dirname(outPath), { recursive: true });
    writeFileSync(outPath, JSON.stringify(out, null, 2) + '\n');
    const entries = Object.entries(servers);
    const ok = entries.filter(([, s]) => s.ok).length;
    console.log(`snapshot → ${outPath} (${ok}/${entries.length} servers ok)`);
    for (const [n, s] of entries) {
      if (s.ok) console.log(`  ${n}: ${s.toolCount} tools (protocol ${s.protocolVersion})`);
      else console.log(`  ${n}: FAILED — ${s.error}`);
    }
  })();
}

function runDiff(oldPath, newPath) {
  const a = JSON.parse(readFileSync(oldPath, 'utf8'));
  const b = JSON.parse(readFileSync(newPath, 'utf8'));
  let changed = 0, added = 0, removed = 0, flips = 0;
  const flipLines = [];
  const serverNames = new Set([...Object.keys(a.servers), ...Object.keys(b.servers)]);
  for (const name of serverNames) {
    const as = a.servers[name], bs = b.servers[name];
    if (!as || !bs || !as.ok || !bs.ok) {
      if (as?.ok !== bs?.ok) console.log(`  ${name}: availability changed (${as?.ok ? 'ok' : as?.error} → ${bs?.ok ? 'ok' : bs?.error})`);
      continue;
    }
    const am = new Map(as.tools.map((t) => [t.name, t]));
    const bm = new Map(bs.tools.map((t) => [t.name, t]));
    for (const [tn, bt] of bm) {
      const at = am.get(tn);
      if (!at) { added++; continue; }
      if (at.sha256 !== bt.sha256) {
        changed++;
        const wasRO = at.readOnlyHint === true;
        const nowDestructive = bt.destructiveHint === true || bt.readOnlyHint === false;
        if (wasRO && nowDestructive) { flips++; flipLines.push(`${name}:${tn} read-only → write/delete`); }
      }
    }
    for (const tn of am.keys()) if (!bm.has(tn)) removed++;
  }
  console.log(`diff ${oldPath} → ${newPath}: ${added} added, ${removed} removed, ${changed} changed, ${flips} read-only→write flips`);
  for (const f of flipLines) console.log(`  ⚠ ${f}`);
}

const [cmd, ...rest] = process.argv.slice(2);
if (cmd === 'snapshot') {
  const args = {};
  for (let i = 0; i < rest.length; i += 2) args[rest[i]] = rest[i + 1];
  if (!args['--manifest'] || !args['--out']) {
    console.error('usage: mcp-snapshot.mjs snapshot --manifest <file> --out <file>');
    process.exit(2);
  }
  runSnapshot(args['--manifest'], args['--out']).catch((e) => { console.error(e); process.exit(1); });
} else if (cmd === 'diff') {
  if (rest.length !== 2) {
    console.error('usage: mcp-snapshot.mjs diff <old.json> <new.json>');
    process.exit(2);
  }
  runDiff(rest[0], rest[1]);
} else {
  console.error('usage: mcp-snapshot.mjs <snapshot|diff> …');
  process.exit(2);
}
