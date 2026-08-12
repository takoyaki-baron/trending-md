// i18n strings — trending.md
// Add new languages here. Each key is a locale code (also the URL prefix).
// The build script auto-discovers all languages from this file.
// Only `code` and `label` are required; everything else falls back to `en`.

const strings = {
  en: {
    code: 'en',
    label: 'English',
    siteTitle: 'trending.md — Dense Trending Signals',
    siteDesc: 'Dense trending signals optimized for agentic web search. Markdown-first.',
    ogDesc: 'Dense trending information optimized for agentic web search. Markdown-first.',
    navFeed: 'feed',
    navAbout: 'about',
    navAgent: 'agent',
    navArchive: 'archive',
    navGitHub: 'github',
    footerTitle: 'trending.md — Markdown-first trending signals.',
    footerAgent: 'Agents:',
    footerRaw: 'raw md',
    footerAbout: 'about',
    breadcrumbFeed: 'feed',
    breadcrumbArchive: 'archive',
    rawMDFallback: 'raw .md',
    homeTitle: 'Latest Trending Signals',
    feedIndexTitle: 'Feed Index',
    archiveTitle: 'Archive',
    aboutTitle: 'About',
    agentTitle: 'Learnt Agent',
    actionTitle: 'Action',
    navAction: 'action',
    navKnowledge: 'knowledge',
    knowledgeTitle: 'Knowledge library',
    dayTitleMark: 'Trending',
  },

  zh: {
    code: 'zh',
    label: '简体中文',
    siteTitle: 'trending.md — 密集趋势信号',
    siteDesc: '面向 AI 智能体搜索优化的密集趋势信息。Markdown 优先。',
    ogDesc: '面向 AI 智能体搜索优化的密集趋势信息。Markdown 优先。',
    navFeed: '趋势',
    navAbout: '关于',
    navAgent: '智能体',
    navArchive: '归档',
    navGitHub: 'github',
    footerTitle: 'trending.md — Markdown 优先的趋势信号。',
    footerAgent: '智能体：',
    footerRaw: '原始 md',
    footerAbout: '关于',
    breadcrumbFeed: '趋势',
    breadcrumbArchive: '归档',
    rawMDFallback: '原始 .md',
    homeTitle: '最新趋势信号',
    feedIndexTitle: '趋势索引',
    archiveTitle: '归档',
    aboutTitle: '关于',
    agentTitle: '学习智能体',
    actionTitle: '行动',
    navAction: '行动',
    navKnowledge: '知识库',
    knowledgeTitle: '知识库',
    dayTitleMark: '趋势',
  },

  jp: {
    code: 'jp',
    label: '日本語',
    siteTitle: 'trending.md — 集中トレンドシグナル',
    siteDesc: 'AIエージェントのウェブ検索に最適化された高密度トレンド情報。Markdownファースト。',
    ogDesc: 'AIエージェントのウェブ検索に最適化された高密度トレンド情報。Markdownファースト。',
    navFeed: 'フィード',
    navAbout: '概要',
    navAgent: 'エージェント',
    navArchive: 'アーカイブ',
    navGitHub: 'github',
    footerTitle: 'trending.md — Markdownファーストのトレンドシグナル。',
    footerAgent: 'エージェント:',
    footerRaw: 'raw md',
    footerAbout: '概要',
    breadcrumbFeed: 'フィード',
    breadcrumbArchive: 'アーカイブ',
    rawMDFallback: 'raw .md',
    homeTitle: '最新トレンドシグナル',
    feedIndexTitle: 'フィード索引',
    archiveTitle: 'アーカイブ',
    aboutTitle: '概要',
    agentTitle: '学習エージェント',
    actionTitle: 'アクション',
    navAction: 'アクション',
    navKnowledge: 'ナレッジ',
    knowledgeTitle: 'ナレッジライブラリ',
    dayTitleMark: 'トレンド',
  },
};

// Derived: ordered list of language codes
const langs = Object.keys(strings);

// Default language (first one = root redirect target)
const defaultLang = langs[0];

// Fallback: fill missing keys from `en`
for (const [code, s] of Object.entries(strings)) {
  if (code === 'en') continue;
  for (const [k, v] of Object.entries(strings.en)) {
    if (!(k in s)) s[k] = v;
  }
}

module.exports = { strings, langs, defaultLang };
