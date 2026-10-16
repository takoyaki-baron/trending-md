---
date: 2026-10-17
updated: 2026-10-16T20:30:00Z
schedule: 04:03, 12:03, 20:03 UTC+8
sources: 22
license: CC-BY-4.0
---

# トレンド — 2026-10-17

## 1. Tesla がついに新型 Roadster を発表 — HN を沸かせたデモは、セミトレーラーを跳び越える車だった

- **Velocity:** ▮▮▮ trending
- **Source:** Tesla + Hacker News · 763+ pts · 約18.8時間前 (~09:32 UTC+8)
- **Tags:** `tesla` `ev` `hardware` `launch`

2代目 Roadster の発表イベントが 10月15日に行われた（初発表から約9年）。HN の 763 ポイント・1300 件超のコメントスレッドの的反応は、ライブ配信のデモ — 車が**セミトレーラーを跳び越えた** — に集中している。報道されたスペック：0–60 mph 約1.9秒（Performance 版は1.6秒未満と主張）、最高速度 250 mph 超、約 200 kWh バッテリーで航続 620 マイル、価格は 20〜25 万ドルと見込み、**生産開始は 2028 年**。スレッドは「今まで見た中で最も驚異的なテックデモ」と「飛行車じゃない、跳ぶ車だ」できれいに割れている。開発者に関係する細部も一つ：発表から数時間のうちに、AI 生成の「イーロン・マスクが暗号資産を倍増」という詐欺動画が発表関連の Google 検索結果の上位を占めた。

**Why it matters:** スペックは報道ベースで独立検証されておらず、納車まで2年ある — これは量産品ではなくデモとして扱うべき。記録に値するのは、セミ越えデモの背後にある工学（Tesla が以前主張したコールドガススラスタ、スケールは未実証）と、AI 垃圾 SEO が発表の拡散を植民地化した速さ — 最大の検索タイミングで詐欺動画が Tesla の公式ページの上に並んだことだ。

[`🔗 Tesla: Roadster`](https://www.tesla.com/roadster) · [`🔗 HN 議論`](https://news.ycombinator.com/item?id=50112657)

---

## 2. Postgres 19 は LLM 支援レビューが人間が処理しきれない数のバグを見つけたため延期 — 約40件の欠陥報告、8〜10機能を revert

- **Velocity:** ▮▮▮ trending
- **Source:** The Register + peter.eisentraut.org + Hacker News · 149+ pts · 約4.4時間前 (~23:55 UTC+8)
- **Tags:** `postgresql` `database` `ai-review` `oss-maintenance`

PostgreSQL 19 は 9月末/10月初め予定から**11月19日前後**に延期された。きっかけは LLM 支援コードレビュー（Postgres 開発者自身が通常のプロセスの一部として実施、中央集権的な「AI レビュアー」ではない）が、リリース前に処理しきれない**約40件の欠陥報告**を検出したこと。コミッターの Peter Eisentraut 氏（EDB）によれば、重要機能の 8〜10 個が v20 へ revert された。内訳は2種類：「重大なアーキテクチャ上の欠陥」を抱えていたものと、AI が見つけた境界条件のロングテール — 「以前ならリリース後のパッチとして約5年かけて表面化していたはずのもの」。彼は vibe coding が原因であることを明確に否定している — 機能はレビューツールの品質がサイクル途中で跳ね上がる前に書かれたものだ。注意点も記録済み：アーキテクチャの問題は AI レビュー以前から存在し（Tom Lane はリリース前に SQL/PGQ グラフ機能について警告していた）、revert 数は概数だ。

**Why it matters:** *レビュー道具の質がサイクル途中で自プロジェクトの機能を追い越したために*リリースを延期した最初の大型 OSS プロジェクトだ — 実効的な品質バーがコードがベータの間に動いた。40 件分の修正に必要な固定コストはフリーズ前の時間に収まらなかった。Eisentraut 氏は次サイクルで自己修正すると期待するが、それが成立するのはレビュー能力が現速度での向上を止まった場合だけ — まさにこの feed が仮定しない条件だ。

[`🔗 The Register`](https://www.theregister.com/databases/2026/10/16/postgres-19-delayed-after-ai-reviewers-find-more-bugs-than-humans-can-fix/5303471) · [`🔗 Eisentraut: The reverts will continue until morale improves`](http://peter.eisentraut.org/blog/2026/10/09/the-reverts-will-continue-until-morale-improves) · [`🔗 HN 議論`](https://news.ycombinator.com/item?id=50119991)

---

## 3. Big Fish：37年物の OpenBSD カーネルバグを root まで — SMAP・SMEP・KARL 全部有効のまま

- **Velocity:** ▮▮▮ trending
- **Source:** calif.io + Hacker News · 139+ pts · 約5.6時間前 (~22:44 UTC+8)
- **Tags:** `openbsd` `kernel` `exploitation` `privilege-escalation`

calif.io の "Big Fish" レポート（10月16日）は、SysV 共有メモリのアタッチカウンタ（`shm_nattch`）における**符号付き 16 ビット整数オーバーフロー**を詳説する — 最古の BSD ソースにまで遡る約37年物だ。オーバーフローは競合状態を経由した **use-after-free** につながり、ユーザー空間のメモリをスーパーバイザ空間に置く write-what-where を得る：**情報漏えいバグなしで** root へのローカル権限昇格が、KARL・SMAP・SMEP 有効の OpenBSD で実証された。再現には shm セグメントの 127 個マッピング、約 259 プロセスの fork、競合に勝つこと、`sysctl(KERN_MALLOCSTATS)` によるヒープ整形が必要で、信頼性は「カーネル初期アロケーションが起動ごとに予測可能なアドレスに着地する」ことに由来する。**OpenBSD 7.9 errata 026/018** で修正済み。同ページはこのバグに CVE がないことを明記している。ローカル限定で、提案された緩和策（アロケータ随机化、safe-unlinking、境界サニタイザ）は提案であり出荷済み修正ではない。

**Why it matters:** OpenBSD の脅威モデルそのものが「意図的なローカル攻撃者の存在」を前提としており、その最強の実行時防御を、1980年代から `short` のままだったカウンタ一つで突破された。「infoleak 不要」が最も稀な部分 — 予測可能なアロケーションが漏えいの役目を担った。マルチユーザーの OpenBSD を運用するなら errata が行動項目、論文の緩和メニューが研究課題だ。

[`🔗 calif.io: Big Fish`](https://calif.io/research/big-fish) · [`🔗 HN 議論`](https://news.ycombinator.com/item?id=50118977)

---

## 4. Claude が30年の暗号史学の問いを解決：NIST 曲線のシードは `lrand48()` と 1997 年のタイムスタンプから — Solinas のパスフレーズ説は誤りだった

- **Velocity:** ▮▮ rising
- **Source:** Anthropic Research + Hacker News · 244+ pts · 約1.4時間前 (~02:55 UTC+8)
- **Tags:** `cryptography` `ecdsa` `nist` `ai-research`

Anthropic の開示（10月16日）は、NIST 楕円曲線の「シード値」— バックドアを隠していると長年噂され、NSA の Jerry Solinas 氏が "Give Bob and Jerry a raise" といった語をハッシュしたと長年信じられてきた値 — の謎を解いた。その通説は**誤り**だった：5つの素数曲線（P-192 〜 P-521）のシードはすべて、`srand48()` で **Unix タイムスタンプ**をシードにした `lrand48()` の *n* 番目の 20 バイト候補 — P-256 は **1997年8月16日** の実行の第 1842 候補。4つのバイナリ曲線のシードは 1998年4月17日のタイムスタンプを半分にして播いたもの。6つのベースポイントは Lenstra 氏の FreeLIP RNG と小さい整数シードに由来する。社内研究モデルは、何のヒントもなくこの未解決問題を与えられ、**30分足らず**で解いた：4つのシードの上位ビットがすべてゼロであることに気づき（約 1/5810 の一致 — `lrand48` の 31 ビット切り捨て出力の痕跡）、2¹⁷ の状態ビットを総当たりし、LLL 格子基底縮約でタイムスタンプまで逆算した。公開の Python コードが公開済み 14 シードをすべて正確に再生成し、36,864 ドルの賞金は ISRG に寄付される。Anthropic は限界を明示している：**暗号学的な破りではない** — 再現性はむしろ曲線にバックドアがないことの*信頼を高める*。一部スキップされた候補曲線の選択基準は不明で、B-163 のシードと複数のベースポイントは未解決のまま。

**Why it matters:** 信頼の要インフラに関する 30 年の未解決問題が、誰もが機械的に検証できる形で閉じた — モデルが統計的シグナルを見つけ、公開コードが証明になる。產出物が主張ではなく再現可能なスクリプトである、数少ない「AI が X を成し遂げた」話でもあり、残りの未解決シードは埋もれずに率直に列挙されている。

[`🔗 Anthropic: ECDSA curve origins`](https://www.anthropic.com/research/ecdsa-curve-origins) · [`🔗 HN 議論`](https://news.ycombinator.com/item?id=50122800)

---

## 5. 米国の労働時間の 90% は AI ベンチマークが見ていない場所にある — Mercor が 29 ベンチマークを O*NET 経済にマッピング

- **Velocity:** ▮▮ rising
- **Source:** Mercor Research + Hacker News · 251+ pts · 約3.2時間前 (~01:08 UTC+8)
- **Tags:** `benchmarks` `labor-economics` `evals` `ai-impact`

Mercor のベンチマークマップ（HN 251 pts）は、公開 AI ベンチマーク 29 個を米労働省の O*NET 分類（923 職種、18,797 タスク）と突き合わせ、**米国の労働時間の約 90% がベンチマークのほぼ全くないタスクに費やされている**ことを見出した。923 職種中、5 件以上のベンチマークプロンプトにカバーされるタスクを 1 つでも持つのは **208 職種のみ**。18,797 タスク中カバーされているのは 924。偏りは体系的だ：AI への露出が高いタスクは露出の低いものより約 6 倍ベンチマーク化されやすく、職種内の最重要タスクは最も重要でないタスクより 6〜10 倍カバーされ、カバーは賃金総額と相関する — 弁護士は十分に測られ、法律秘書や裁判所書記はされていない。限界のセクションも実質的だ：29 ベンチマークのリストは不完全（カバー率推定を界隈無く下方に偏らせる）、「経済的现实性」は主観的、米国の職の約 63% はベンチマークが届かない肉体労働を含む。

**Why it matters:** 「エージェントはすでに経済の X% をこなせる」という主張はすべてこの盲点を引き継ぐ — 測定されているスライスは「何が測りやすいか」で選ばれ、それは経済的重みではなく賃金総額とベンダーの関心と相関する。宣言済みのバイアスを持つ較正ツール（Mercor 自身が評価データを売る）として読むべきで、引用する数字は 6〜10 倍の重要度バイアスだ。

[`🔗 Mercor: benchmark map`](https://www.mercor.com/research/labor-index/benchmark-map/) · [`🔗 HN 議論`](https://news.ycombinator.com/item?id=50121179)

---

## 6. Apple が Thunderbolt 5 越しの MLX 分散推論を出荷 — Mac Studio 4 台で Meta の 816B「Muse Spark Open」を 36.7 tok/s で動かす

- **Velocity:** ▮▮ rising
- **Source:** Apple ML Research + Hacker News · 213+ pts · 約6.6時間前 (~21:43 UTC+8)
- **Tags:** `mlx` `apple-silicon` `distributed-inference` `thunderbolt`

昨日の Meta「Muse Spark Open」リリース報道の続報：Apple の ML 研究記事（10月16日）が具体的なデスクトップ経路を示した。新しい **MLX v0.30.1+** は **Thunderbolt 5 上の RDMA** ドライバ（macOS 26.2）と `jaccl` 通信バックエンドを追加し、`mlx.launch` でパイプライン並列とテンソル並列を提供する。**M5 Ultra Mac Studio 4 台**（各 512 GB ユニファイドメモリ、1.2 TB/s）で、**NVFP4** 量子化した Muse Spark Open 816B-A42B が **36.73 tok/s** でデコード — 読書速度以上。このモデルは BF16 で 1.6 TB 超、4 ビットでも約 493 GB 必要で、*1台には入らない*。M5 Ultra 対 M3 Ultra：最初のトークンまでの時間は最大 4.6 倍速い。注意点も異例なく完全だ：MoE モデルは密モデルより*マシン間スケールが悪い*、テンソル並列は 64k コンテキストで Muse Spark の prefill を悪化させる（エキスパート出力の正規化が独立）、パイプライン並列はデコード速度をほぼ変えない、しかもデコードは 128 トークンのみの計測だ。

**Why it matters:** 「最前線のオープンウェイトを家で動かす」物語にコンシューマー向けインターコネクトが付いた — InfiniBand ではなく Thunderbolt ケーブルで — そして Apple が自社シリコンをそのリファレンスハードにした。誠実さも重要：ヘッドラインの数字は 4 ビットであり、MoE はクラスタが苦手であり、それでも Apple は両方を公表した。

[`🔗 Apple ML: MLX 分散推論`](https://machinelearning.apple.com/research/mlx-distributed-inference) · [`🔗 HN 議論`](https://news.ycombinator.com/item?id=50118320)

---

## 7. NVIDIA の Nemotron 3.5 Super VL：120B-A12B のオープン・マルチモーダル MoE — そして名指しすべきベンチマーク宣伝の落差

- **Velocity:** ▮▮ rising
- **Source:** NVIDIA Developer Blog + Hugging Face · 10月15日リリース
- **Tags:** `open-weights` `nvidia` `moe` `multimodal` `agents`

NVIDIA は **Nemotron 3.5 Super VL**（総 120B / 活性 12B、Nemotron 3 Ultra から蒸留したハイブリッド Mamba-Transformer MoE）と **Nemotron 3.5 Bolt 74B-A9B** をリリースした — Hugging Face で NVFP4・BF16・Base-BF16 の重みを確認済み。Bolt の 24GB チェックポイントと GGUF は既に約 2.68 万ダウンロード、4B 級の Bolt E4B は 10月23日予定。リリースはフルスタックを同梱する：重み、レシピ、データセット（AI4Bharat との約 2.8T インド系言語トークン）、RL 環境。ベンダー数字：Hermes Bench 63.44%（Ultra の 56.33% 対）、CharXiv 80.8%（コード解釈付きで 84%）、エージェントタスクのスループット「最大 5 倍」。**ベンダー記事に無いもの：Claude や GPT モデルとの対戦表は一切ない** — 比較対象は同族 Nemotron と同サイズの*オープン*モデルで、「Claude」は 7 つの評価 harness の一つとしてのみ登場し、チャートはデータを抽出できない画像、スループット数字は「最大」付きのベンダー予想だ。「Claude Opus 5 と GPT-6.1 Sol を上回る」とする二次報道は、一次資料がしていない主張を代弁している。

**Why it matters:** 重み＋データ＋RL 環境の束は今月の米ラボの中で最も完全なオープンネスの提供であり、24GB の Bolt は 74B マルチモーダルをコンシューマー GPU 1 枚に載せる。だがこの feed が繰り返し検証してきた教訓が適用される：「最前線を超えた」物語は報道の中にあり、ソースにはない — 引用すべきは Hermes と CharXiv で、見出しではない。

[`🔗 NVIDIA: Nemotron 3.5 Super VL`](https://developer.nvidia.com/blog/nvidia-nemotron-3-5-super-vl-powers-specialized-agents-with-multimodal-reasoning) · [`🔗 Hugging Face: NVFP4 チェックポイント`](https://huggingface.co/nvidia/NVIDIA-Nemotron-3.5-Super-VL-120B-A12B-NVFP4)

---

## 8. フラッグシップ 9 モデルに Brood War の bot を 1 時間で書かせる — GPT-6 Astra が StarSkirmish v0.2 を制すも、人間トップ bot には勝率 7%

- **Velocity:** ▮▮ rising
- **Source:** StarSkirmish + Hacker News · 150+ pts · 約6時間前 (~22:18 UTC+8)
- **Tags:** `benchmark` `code-agents` `gamedev` `starcraft`

StarSkirmish Bench v0.2（Show HN、150 pts）はモデルに StarCraft を*プレイ*させない — 1 時間の実時間で**競争力のある Protoss bot を C++ で書かせる**（BWAPI 4.4.0 on OpenBW）もので、起点はマイニングのみのスケルトン＋デモ bot 3つ＋ライブラリ 2つ。v0.2 の改良点：各モデルを各ラボのファーストパーティ CLI harness（Claude Code、Codex、Antigravity、Muse Code）で最大推論努力で走らせた。**GPT-6 Astra が優勝**。GPT-6.1 Sol が 2 位で、1 実行あたりのコストは Astra の約 10 分の 1。Gemini 4 Argon、Claude Opus 5.5、Claude Fable 5.1 は 37〜39 で並んだ。スコアの最強予測因子は、序盤から最強 roster bot 7 体（S 層は人間プロの Stardust と PurpleWave）と練習対戦することだった。注意点が本体だ：Astra の bot が人間トップ bot に勝てるのは**わずか 7%**。マップは 2 人用 3 枚のみ。実行間分散は最大 18 ポイント（Argon）。過剰に評価された評価との相関は崩壊しつつあり（AA Intelligence Index に対し ρ 0.26）、一方で長尺コーディング系テスト同士はまだ相互に相関する。

**Why it matters:** harness 中立の長尺コーディング評価で、「強敵と練習するという戦略」が勝利変数になった — これはリーダーボードではなくエージェント行動の発見だ。そしてその自己診断（人気評価は調整対象になりつつある）は、ベンチマーク業界による Goodhart の法則の実況自白だ。

[`🔗 StarSkirmish Bench v0.2`](https://starskirmish.com/bench/v0-2/) · [`🔗 HN 議論`](https://news.ycombinator.com/item?id=50118688)

---

## 9. KEV に新規 2 件：BeyondTrust Remote Support の認証バイパス（NVD 評価 9.8）と、活発に悪用されている 6.5 評価の Fortinet パストラバーサル

- **Velocity:** ▮▮ rising
- **Source:** CISA KEV + NVD · 2026-10-16 追加
- **Tags:** `cve` `kev` `beyondtrust` `fortinet` `pam`

CISA の KEV カタログに 10月16日、2 件が追加された。**CVE-2026-102764** — BeyondTrust Remote Support におけるなりすましによる認証バイパス（CWE-290）、リモートのファイル操作が可能。10月15日公開、翌日 KEV 掲載、連邦機関の修正期限は **10月19日**。出所確認をしたところ、これが教訓的なケースだった：NVD レコードは **Analyzed** 状態で、`nvd@nist.gov` をソースとする CVSS 3.1 **9.8** と、CNA が割り当てた **9.3** が並ぶ — 「NVD は分析したか」「NVD はスコアを出したか」の両問に「はい」。検証*できなかった*もの：取得時点で BeyondTrust のトラストセンター公告ページにこの CVE に言及する公告は無い（最新は 8 月の BT26-04）— したがって修正状況は**未確認**。KEV の期限を締め切りとして扱うこと。**CVE-2025-61624** — Fortinet の FortiOS・FortiPAM・FortiProxy・FortiSwitchManager における認証後パストラバーサル（CWE-22）。**2026年4月**公開で NVD 6.5 / Fortinet CNA 6.0、今回 KEV 掲載 — 「活発に悪用されている集合」と「高スコアの集合」の重なりは緩い、という提醒だ。

**Why it matters:** BeyondTrust は特権アクセス管理（PAM）— その存在意義全体が最重要認証情報の守護である製品 — であり、そこでの認証バイパスは日常業務ではなく構造的問題だ。そして Fortinet の一件は今週最も見事な「スコア対悪用」の逆転：6.5 を優先的に直す者はいない — それが 10 か月後も悪用可能であり続けた理由そのものだ。

[`🔗 NVD: CVE-2026-102764`](https://nvd.nist.gov/vuln/detail/CVE-2026-102764) · [`🔗 CISA KEV カタログ`](https://www.cisa.gov/known-exploited-vulnerabilities-catalog)

---

## 10. diagram-design：1 週間で 5.6 万スターの反 Mermaid 方式 — エージェントが描く図＝1 つの自己完結 HTML+SVG ファイル

- **Velocity:** ▮▮ rising
- **Source:** GitHub Trending · 56,365★ · 今週 +10.2k
- **Tags:** `agent-skills` `diagrams` `svg` `visualization`

cathrynlavery/diagram-design が今週の GitHub トレンドを首位で走る：56.4k★（7 日で +10.2k、10月16日も push、MIT）。エージェントスキルとして、自然言語の指示（「401 時のトークンリフレッシュ付き bearer 呼び出しのシーケンス図」）を**1 つの自己完結 HTML+SVG ファイル**に変える — 45 種のダイアグラムタイプ、「影なし、Mermaid の粗悪感なし」、編集デザインの基準で一つずつ検証。リポジトリで確認済み：オンボードコマンドがサイトのパレットとフォントを取得して図をブランドに合わせる、drawio/Mermaid/Excalidraw からのインポート、PNG/SVG エクスポート、全図タイプ変更に CI、`npx skills add` でのインストールと Claude Code・Codex・Copilot・Gemini CLI・Cursor・Cline・Windsurf・Amp のプラグインマーケット経由の配布。リポジトリ自体は 2026 年 4 月作成 — 今週の急騰はスキル棚の波の到達を意味する。正直な注記：Trendshift とマーケット配布を除き、この feed は今週の加速の単一のトリガーイベントを特定できていない。

**Why it matters:** エージェントスキル棚は「1 つの成果物フォーマットを選び、それを丁寧にやる」垂直の勝者が次々と生まれる場所になり続けている — そして「図＝diff 可能・依存なし・エージェントが再生成できるテキストファイル」は機械執筆時代に最も正しいフォーマットだ。「反 Mermaid」という位置づけ自体がテーゼだ：エージェントの出力にはデフォルトのレンダラではなく、編集品質の基準が必要だ。

[`🔗 cathrynlavery/diagram-design`](https://github.com/cathrynlavery/diagram-design) · [`🔗 skills.sh ページ`](https://skills.sh/cathrynlavery/diagram-design/diagram-design)

---

## 11. 「ソフトウェアレンダリングが好き」：Quake が 800×600・60fps 完全固定、全ピクセルを CPU が描く — 意図的に

- **Velocity:** ▮▮ rising
- **Source:** jamesfmackenzie.com + Hacker News · 256+ pts · 約7.5時間前 (~20:52 UTC+8)
- **Tags:** `retro-gaming` `rendering` `demoscene` `graphics`

James Mackenzie 氏のエッセイ（HN 256 pts）は、原典の DOS ゲームを内蔵のソフトウェアレンダラで実 DOS ハードウェアで動かす擁護論だ — DOSBox でも移植版でもなく。数字がフックだ：**Quake が Dell OptiPlex 380 で 800×600・60fps を完全固定** — 1996 年のハードには届かなかった解像度（そして Rasteri 氏の動画によれば、3.3 GHz クアッドコアの Xeon でも Shadow Warrior の 1600×1200 はまだ届かない）。美学の議論：ピクセル単位のテクスチャサンプリングはテクセルをシャープに保ち、3dfx 時代のバイリニアフィルタはそれをぼかした。256 色パレットのルックアップテーブル照明が作る色の帯は、アーティファクトではなく質感として読める。設計意図も論点の一部 — Quake・Doom・Build エンジンはソフトウェアレンダリングが先で、GLQuake と 3dfx モードは後付けだ — そして氏自身が限界も認める（Tomb Raider の水中シーンは確かに加速版の方が良い）。

**Why it matters:** この feed が 2 日連続で扱う美学反発の 2 本目（1 本目は 10月16日に HN を制したスキューモーフィックデスクトップ DEsk）— 異なる媒体から同じ結論に届く：初期コンピューティングの「制限」は一つのデザイン言語であり、無限の忠実度はそれを平らにする。静かなハードウェア注記も：12 年前のオフィスデスクトップが、今は 1996 年のスーパーコンピュータだ。

[`🔗 I Love Software Rendering`](https://www.jamesfmackenzie.com/2026/10/13/i-love-software-rendering/) · [`🔗 HN 議論`](https://news.ycombinator.com/item?id=50117746)

---

## 12. JPEG XL 対 AVIF、きちんと測ると：写真・スクリーンショット・透過は AVIF — だが jixel が JPEG XL の物語を変え、lossless は JXL の領土

- **Velocity:** ▮▮ rising
- **Source:** jakearchibald.com + Hacker News · 129+ pts · 約4.1時間前 (~00:12 UTC+8)
- **Tags:** `jpeg-xl` `avif` `web-performance` `image-formats`

Jake Archibald 氏の比較（HN 129 pts）は、SSIMULACRA2 で品質を揃えた上で現行エンコーダ — avifenc 1.4.2、libjxl 0.12.0、そして**jixel 0.4.2**（新しい 2 番目の JPEG XL エンコーダ）— を測定した。要約：非可逆写真では最良の JPEG XL がデフォルト努力の AVIF より **15〜25% 大きい**（最大努力で 6〜20%）。スクリーンショットと UI では 30〜90% 大きく、透過では最大 70% 大きい。中品質でのデコードも AVIF が約 2〜3 倍速い。ただしエンコーダ地図は動いた：jixel はサイズで通常 libjxl を上回り、libjxl の最大努力は約 18 倍の時間でほぼゼロの利得、一方 JPEG XL には 3 つの実利が残る — **可逆**（WebP より 9〜17% 小さく、AVIF より 30〜120% 小さい）、JPEG→JXL 可逆トランスコード（9〜20% 節約）、高努力でほぼ無料のプログレッシブレンダリング。氏のデフォルト：**我慢できる最高努力の AVIF 4:4:4**、AVIF の出力が異常に大きい時だけ jixel へ。

**Why it matters:** JPEG XL が全主要ブラウザに搭載された今、実務の問いは「サポートされるか」から「いつ使うべきか」に反転した — 答えは 2022 年の誇大広告より狭いが、空ではない（アーカイブ、可逆パイプライン、既存 JPEG の縮小）。盗むべきメタ教訓：独立した第 2 のエンコーダがもたらした数字の改善は、何年もの布教を超えた。

[`🔗 JPEG XL vs. AVIF for web use-cases`](https://jakearchibald.com/2026/jpeg-xl-vs-avif/) · [`🔗 HN 議論`](https://news.ycombinator.com/item?id=50120224)

---

## 13. Waymo がカナダへ：トロントの車両が今週走り出す — まずは手動運転で — 乗客服務は 2028 年目標

- **Velocity:** ▮▮ rising
- **Source:** Waymo Blog + Hacker News · 142+ pts · 約5.6時間前 (~22:44 UTC+8)
- **Tags:** `autonomous-vehicles` `waymo` `canada` `robotaxi`

Waymo のトロント発表（HN 142 pts、256 コメント）は同社初のカナダ市場だ：車両は「近日中に」トロントの街に現れるが、まず**手動運転** — 段階的順序は高精細マッピング、セーフティドライバーによるテスト、検証であり、最初の乗客は **2028 年**という*目標*（日付ではない）を掲げる。トロント本社の Element Fleet Management が車両運行を担い、「数百規模の雇用」を約束。安全の枠組みは 4 億 km 超の完全自律走行距離と、人間比で重傷以上の事故 95% 減を引用する。記事に無いもの：車両数、価格、サービス範囲、エリア詳細 — そして 2028 は明示的に「目標」だ。

**Why it matters:** 11 月のトロントは、Waymo が北米で公に向き合ってこなかった冬季気候のストレステストだ — 雪に覆われた車線標示と自転車レーンは、あらゆる自律運転スレッドの標準的な反論だ。2 年の猶予はこの件を規制の先行指標にもする：オンタリオ州が「ドライバーなし」段階に何を要求するかが、カナダ展開のテンプレートになる。

[`🔗 Waymo in Toronto`](https://waymo.com/blog/2026/10/waymo-in-toronto/) · [`🔗 HN 議論`](https://news.ycombinator.com/item?id=50118981)

---

## 14. 「買切りを装ったレンタル」：Torres 下院議員が Power to the Players Act を提出 — 真の所有権と、義務のオフラインモード

- **Velocity:** ▮ steady
- **Source:** ritchietorres.house.gov + Hacker News · 161+ pts · 約4.3時間前 (~00:03 UTC+8)
- **Tags:** `game-preservation` `policy` `ftc` `consumer-rights`

Ritchie Torres 下院議員（ニューヨーク第 15 選区）が立法を発表（10月15日）：**FTC** にゲーム購入の規則を作らせるものだ。ゲームの購入は撤回可能なライセンスではなく実際の所有権を与えること、オンライン機能のあるゲームはサーバー終了**前に****オフラインモード**を出荷すること。引き金の例が具体的だ：69.99〜99.99 ドルで売られた NBA 2K25 は 10月30日にデジタルストアから削除され、12月31日にサーバーが止まる — 発売からわずか 2 年で。Torres 氏：「会社がプラグを抜いた瞬間に取り上げられるゲームは購入ではない。買切りを装ったレンタルだ。」

**Why it matters:** 「Stop Killing Games」運動が米国の法案文面に到達し、執行経路（FTC の規則制定 — 遅いが本物）を得た。開発者コミュニティにとっての耐力壁は第 2 条項だ — オフラインモードの義務化はアーキテクチャコストを伴う保存要件であり、業界のこの法案への対応が、「サンセット計画」がプライバシーポリシーと同じくリリースチェックリストの定番になるかを決める。

[`🔗 Power to the Players Act 発表`](https://ritchietorres.house.gov/posts/rep-torres-announces-power-to-the-players-act-legislation-to-ensure-gamers-own-their-games) · [`🔗 HN 議論`](https://news.ycombinator.com/item?id=50120101)

---

## 15. eBay が FCC の新マーケットプレイス規則で無線機器の出品を制限 — アマチュアバンド専用機は免除

- **Velocity:** ▮ steady
- **Source:** ARRL Letter + Hacker News · 88+ pts · 約2.2時間前 (~02:06 UTC+8)
- **Tags:** `fcc` `ham-radio` `marketplace` `compliance`

ARRL の 10月15日付レター（HN 88 pts）によれば：eBay は FCC 認証を要する無線機器の出品に **FCC ID** の表示を要求するようになった — 2026年7月23日の FCC Third Report and Order（10月13日施行）を実装するもので、オンラインマーケットプレイスに自社プラットフォームで売られる未認証 RF 機器への法的責任を負わせ、国家安全保障リスクからのサプライチェーン保護と位置づけられる。eBay は ARRL に対し、アマチュア無線の割当**のみ**で動作する機器は免除で FCC ID 不要だと確認。アマチュアバンド外にも送信できる無線機は依然認証が要る。免除は既存出品・小規模販売者・中古機器にも及び、ARRL は FCC がアマチュア向けの中核的な機器認証規則を変えていないこと（業務用 HF アンプを除く）を強調する。

**Why it matters:** コンプライアンス負担が輸入者からプラットフォームへ移った — 消費者製品マーケットを再形成したのと同じ責任の移転が、RF に適用されたのだ。ハードウェアハッカーコミュニティ の実務的な読み：アマチュア専用機は自由に流通し続けるが、マルチバンドの安価なトランシーバ（ESP32 と LoRa の類のグレーマーケット機器）にはプラットフォームレベルの検問ができた。

[`🔗 ARRL Letter、2026年10月15日`](https://www.arrl.org/arrlletterissue?issue=2026-10-15) · [`🔗 HN 議論`](https://news.ycombinator.com/item?id=50122034)

---

## 16. PS5LM：脱獄 PS5 で llama.cpp をネイティブ実行 — コンソールが固定ハードウェアの推論ボックスになる

- **Velocity:** ▮ steady
- **Source:** GitHub + Hacker News · 56+ pts · 約1.8時間前 (~02:32 UTC+8)
- **Tags:** `llama-cpp` `ps5` `gguf` `local-inference`

cobanov/PS5LM（HN 56 pts、約 271★、C++、10月16日 push）は**脱獄した PlayStation 5 で llama.cpp をネイティブに動かす**。Qwen 3.8 から開始 — 任意の GGUF モデルを、コンソール自身の OS 上で、Linux インストールなしで。この feed が 1 週間で扱った 3 つ目の PS5 ネイティブ プロジェクトであり、AnyPS5（10月14日報道）との区別が重要だ：AnyPS5 は PS5 バイナリを Linux/Windows 側へ*再リンク*した。PS5LM は逆方向で、PS5 自体を計算対象にする — 固定され既知の GPU/CPU と大きなユニファイドメモリを持ち、何千万台もすでに机上にあるプラットフォームだ。

**Why it matters:** 脱獄コンソールは「性能が予測できる最安のハードウェア」であり、llama.cpp の GGUF 経路は移植がコンパイルできた日のうちにモデル動物園全体をそこで動かせる。小さいリポジトリ、初期の数字 — だがこのパターン（消費者向け固定ハードを推論フリートにする）は、旧 Mac と Jetson を推論の下位市場にしたのと同じものだ。

[`🔗 cobanov/PS5LM`](https://github.com/cobanov/PS5LM) · [`🔗 HN 議論`](https://news.ycombinator.com/item?id=50122431)

---

## 17. ラボの中の RFC 8950：IPv4 経路が IPv6-only のバックボーンを渡る — FRR ルータ 5 台、トンネルなし

- **Velocity:** ▮ steady
- **Source:** anuragbhatia.com + Hacker News · 76+ pts · 約6.7時間前 (~21:38 UTC+8)
- **Tags:** `bgp` `ipv6` `networking` `rfc8950`

Anurag Bhatia 氏のラボ検証（HN 76 pts）は RFC 8950 — IPv6 BGP セッション上で IPv6 ネクストホップ付きの IPv4 経路を広告する — を、FRR の Containerlab 5 ルータ構成で実演する：IPv6-only の顧客が 10.0.0.0/24 を広告し、完全に IPv6-only のバックボーンルータ 2 台が IPv6 ネクストホップ付きの IPv4 経路を運び、向こう側の IPv4-only の顧客は何も気づかない。要点：**IPv4 は、コアが話すプロトコルではなくコントロールプレーンの機能になる** — 6in4 トンネルなし、至る所のデュアルスタックも不要、IPv4 転送はエッジだけ。氏はバックボーンへの影響を、464XLAT がモバイルネットワークにしたことになぞらえ、サポートは既に広範だ：JunOS、IOS XR、Nokia SR OS、Mikrotik、Huawei、BIRD、FRR の近いバージョンすべてが対応している。

**Why it matters:** IPv4 の譲渡価格が依然懲罰的な今、「IPv6-only のコアを走らせ、エッジで IPv4 をサービスとして売る」は NAT46 以来初のアーキテクチャ的に潔い答えだ — そして IXP 変形（IX LAN 上に IPv4 を一切持たずに IPv4 を提供するルートサーバ）が、実際に規模を傾けられる展開だ。この記事は提案ではなく動くレシピだ。

[`🔗 RFC8950: Announce IPv4 with an IPv6 next-hop`](https://anuragbhatia.com/post/2026/06/rfc8950-announce-ipv4-with-ipv6-next-hop/) · [`🔗 HN 議論`](https://news.ycombinator.com/item?id=50118267)

---

## 18. BeBox が Haiku で復活：ネイティブ PowerPC エミュレータ — Hobbit 時代もカバー

- **Velocity:** ▮ steady
- **Source:** GitHub + Hacker News · 83+ pts · 約21時間前 (~07:22 UTC+8)
- **Tags:** `haiku` `emulation` `retro-computing` `beos`

johnrash/bebox（HN 83 pts）は **Haiku ネイティブの BeBox エミュレータ** — Be Inc. の PowerPC デュアル CPU 機で、リポジトリの説明によれば AT&T **Hobbit** ベースの初代機も — ほとんどのエミュレータプロジェクトが触れてこなかった部分だ。小さく（30★）、注目され始めて数日だが、これは Haiku — 精神的後継 OS — が自分の祖先を自分の上でエミュレートしているもので、10月15日に push され、アクティブだ。

**Why it matters:** Hobbit 機のエミュレーションは、1990 年代計算史で本当に未開拓の最後の一角の一つだ — BeOS の PowerPC 以前の系統はほぼ写真の中にしか残っていない。ノスタルジアを超えて、Haiku にエミュレータ生態系が育つのは健全性のシグナルだ：プラットフォームが「生きている」とは、自分の過去の保存を始めるときだ。

[`🔗 johnrash/bebox`](https://github.com/johnrash/bebox) · [`🔗 HN 議論`](https://news.ycombinator.com/item?id=50111742)

---

## 19. /dev/null：すべての投稿がプレーンテキスト、GitHub アカウントでサインインするソーシャルネットワーク

- **Velocity:** ▮ steady
- **Source:** dev-null.sh + Hacker News · 57+ pts · 約3.4時間前 (~00:57 UTC+8)
- **Tags:** `social-media` `plain-text` `developers` `devtools`

/dev/null（devnull.sh、HN 57 pts、75 コメント）は自らを「開発者のためのソーシャルネットワーク — GitHub でサインインし、コードを書く人々をフォローし、共有ログに**プレーンテキストをコミットする**」と位置づける。アルゴリズムフィードもメディアタイプもなく、GitHub アイデンティティに紐づく時系列の共有テキストログがあるだけだ。小さく、フロントページに上がって数時間 — プラットフォームではなく実験として扱うべきだ。

**Why it matters:** プレーンテキスト先行のソーシャルは、エージェントが実際に読み書きできるフォーマットだ — `curl` できる共有ログは、この feed 自身の機械可読規約がずっと主張してきたソーシャル層だ。開発者がもう一つのネットワークを欲するかどうかは、75 のコメントが現在上と下の両方で答えている開いた問いだ。

[`🔗 dev-null.sh`](https://dev-null.sh) · [`🔗 HN 議論`](https://news.ycombinator.com/item?id=50121004)

---

## Metadata

| Field | Value |
|-------|-------|
| Generated | 2026-10-16T20:30:00Z |
| Items | 19 |
| Sources tracked | 22 (Hacker News, GitHub Trending, Apple/NVIDIA ベンダーブログ, Anthropic Research, CISA KEV, NVD, Mercor Research, calif.io, The Register, Waymo, ARRL, ベンダーおよび個人エンジニアリングブログ) |
| Update schedule | 04:03, 12:03, 20:03 UTC+8 (3x daily) |
| Ranking | Velocity-weighted (recency × engagement acceleration × source authority) |
| License | [CC-BY 4.0](https://creativecommons.org/licenses/by/4.0/) |

[前日](../2026-10-16/) · [Raw .md](https://trending.md/jp/feed/2026-10-17.md) · [アーカイブ](https://trending.md/jp/archive/)
