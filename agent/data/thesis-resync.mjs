import fs from "node:fs";

// Which zh/jp status entries must be folded so the date sets match canonical en.
const PLAN = {
  6: [{ merge: [0, 1, 2, 3], label: "10-20 → 10-22" }],
  8: [{ merge: [1, 2], label: "10-24" }],
  20: [
    { merge: [1, 3], label: "10-25 04:03 → 10-26 04:03" },
    { merge: [2, 4], label: "10-25 12:03 → 20:30" },
  ],
  28: [{ merge: [0, 1], label: "10-25 20:03 → 20:30" }],
};

const ENTRY = /^(\s*)- \*\*(.+?)\*\*([\s\S]*)$/;

function thesisRange(lines, num) {
  let start = -1;
  for (let i = 0; i < lines.length; i++) {
    if (new RegExp(`^${num}\\. \\*\\*`).test(lines[i])) { start = i; break; }
  }
  if (start < 0) throw new Error("thesis " + num + " not found");
  let end = lines.length;
  for (let i = start + 1; i < lines.length; i++) {
    if (/^\d+\. \*\*/.test(lines[i]) || /^## /.test(lines[i])) { end = i; break; }
  }
  return [start, end];
}

// collect entry line-groups within [start,end)
function entries(lines, start, end) {
  const out = [];
  let cur = null;
  for (let i = start; i < end; i++) {
    const line = lines[i];
    const m = line.match(ENTRY);
    if (m && /^\s*- \*\*/.test(line)) {
      if (cur) out.push(cur);
      cur = { from: i, to: i, indent: m[1], label: m[2], body: m[3] };
    } else if (cur) {
      cur.to = i;
      cur.body += "\n" + line;
      if (!line.trim()) { cur.to = i - 1; out.push(cur); cur = null; }
    }
  }
  if (cur) out.push(cur);
  return out;
}

const ARROW = /→ \[\[[\s\S]*$/;

for (const loc of ["zh", "jp"]) {
  const p = `/Users/kelong/developer/github/trending-md/${loc}/agent.md`;
  const lines = fs.readFileSync(p, "utf8").split("\n");
  // process theses high->low so line indices stay valid
  for (const num of Object.keys(PLAN).map(Number).sort((a, b) => b - a)) {
    const [s, e] = thesisRange(lines, num);
    const es = entries(lines, s, e);
    const ops = PLAN[num]
      .map((op) => ({ ...op, entries: op.merge.map((i) => es[i]).filter(Boolean) }))
      .filter((op) => op.entries.length === op.merge.length)
      .sort((a, b) => b.entries[0].from - a.entries[0].from);
    for (const op of ops) {
      const texts = op.entries.map((x) => x.body.replace(ARROW, "").trim());
      const last = op.entries[op.entries.length - 1];
      const tail = (last.body.match(ARROW) || [""])[0].trim();
      const merged = `${op.entries[0].indent}- **${op.label}：**${texts.join("；")} ${tail}`.trimEnd();
      const from = op.entries[0].from;
      const to = last.to;
      lines.splice(from, to - from + 1, merged);
    }
  }
  fs.writeFileSync(p, lines.join("\n"));
  console.log(loc, "theses folded");
}
