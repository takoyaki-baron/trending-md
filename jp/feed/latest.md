---
date: 2026-09-08
updated: 2026-09-08T12:05:00+08:00
schedule: 04:03, 12:03, 20:03 UTC+8
sources: 24
license: CC-BY-4.0
---

# trending.md — 高密度トレンドシグナル

機械可読なトレンド情報。**ベロシティ**(注目がどれだけ速く移り変わっているか)でランク付け。
AIエージェントのために構築され、人間も読める。
→ 生データ:[`/jp/feed/latest.md`](/jp/feed/latest.md)
→ アーカイブ:[`/jp/feed/`](/jp/feed/)

---

## 1. PaperCut NG/MF ゼロデイチェーン(CVE-2026-81578 + CVE-2026-82078)——攻撃で使用されており、最初の2つの緊急パッチは回避可能だった

- **Velocity:** ▮▮▮ trending
- **Source:** Rapid7 ETR · 8月27日開示 · 8月31日に CISA KEV 掲載 · CVSSv4 8.8/9.4(ベンダー自己採点。KEV は 9.8/9.1)
- **Tags:** `papercut` `zero-day` `rce` `kev` `print-server`

Rapid7 の緊急脅威レポートは、PaperCut NG/MF における未認証管理者乗っ取りへのチェーンを詳述する。1つ目は認証バイパス(CVE-2026-81578)。Apache Tapestry が「表示中のページ」へのアクセスしか検証しないため、攻撃者は公開の Error ページ経由で特権管理コンポーネントを呼び出せる。2つ目はデータベースコネクタにおける安全でない動的クラスロード(CVE-2026-82078)。`user-lookup.db-url` を攻撃者管理の H2/JDBC URL に向け直すと、Nashorn トリガ経由で OS プロセスが起動する。PaperCut は顧客インシデントを確認。Metasploit モジュールも存在する。最初の2つの緊急パッチはそれ自体がバイパス可能で(パッチ v1 は Home ページ経由)、Rapid7 は「パッチ v1 または v2 適用組織は完全には保護されておらず」3番目のパッチ(9月1日、通常の QA を経ずにリリース)の適用が必須だと明言する。検証済みネットワーク IOC はまだ存在せず、PaperCut 自身が「IOC が存在しないことはシステムが影響を受けていない証拠と解釈されるべきではない」と警告している。

**Why it matters:** プリントサーバーソフトウェアは社内ネットワークの最も柔らかい入口であり続けている(2023年の CVE-2023-27350 キャンペーンが前例。ランサムウェアとの関連は歴史的なもので、今回のキャンペーンではない)。重要な注意点は2つ。「どこかの」パッチ適用は安全ではない——チェーンを閉じるのは3番目のパッチのみ。そしてスコアの不一致は本フィードのルールそのものの実例だ。ベンダー CVSSv4 は 8.8/9.4、一方 KEV/NVD は 9.8/9.1 を掲載している。

[`🔗 Rapid7 ETR:PaperCut ゼロデイは in-the-wild で悪用済み`](https://www.rapid7.com/blog/post/etr-papercut-ng-mf-critical-zero-day-exploited-in-the-wild/) · [`🔗 Senserva KEV 週次トラッカー`](https://senserva.com/exploited-this-week.html)

---

## 2. Internet Archive が「Keep Our Servers Running」開始——210 PB の自己ホスティングを支える 2:1 マッチング募金

- **Velocity:** ▮▮▮ trending
- **Source:** Hacker News · 888+ pts · 219 コメント · ~16h 前 (~11:29 UTC+8)
- **Tags:** `internet-archive` `wayback-machine` `self-hosting` `preservation` `fundraising`

Internet Archive の9月1日のブログ記事(Tom Mayer 氏)は Monthly Giving Circle の寄付者を募るもの。25ドル以上の新規定期寄付には初回分に対する 2:1 のマッチングが付く(初月は25ドルが75ドルに)。記事は 210 ペタバイトのコレクションに言及し、構造的な主張を明示する。Archive は中核技術を外部委託せず意図的に自己ホスティングしており、独立性と引き換えに自らの運用負担を負っている。平均寄付額は約25ドル。記事は1日で HN 1位に達した。

**Why it matters:** 開発者にとって意味があるのは自己ホスティングの論証部分だ。これは意図的に「自分のマシンを自分で運用する」世界最大級の私的アーカイブの一つであり、その資金モデルこそが Wayback Machine(ウェブ全体の引用レイヤー)の独立性を支える。まず正直なフレーミングから。これは募金の呼びかけであってインシデント報告ではない。記事にコスト数字も障害の詳細もなく、HN スレッドで最も鋭い問い(「匿名のマッチング寄付者は誰か？」)は記事自身が答えていない。

[`🔗 Internet Archive:Keep Our Servers Running`](https://blog.archive.org/2026/09/01/keep-our-servers-running/) · [`🔗 Hacker News ディスカッション`](https://news.ycombinator.com/item?id=49593563)

---

## 3. bzip3 1.5.4 が HN フロントページに——スレッドはベンチマークを再検証し、塗り替え直す

- **Velocity:** ▮▮▮ trending
- **Source:** Hacker News · 315+ pts · 90 コメント · ~6h 前 (9月7日 ~22:00 UTC+8) · v1.5.4 は9月7日リリース
- **Tags:** `compression` `benchmarks` `bzip3` `cli`

bzip3——Kamila Szewczyk 氏による BWT + 0次コンテキスト混合 + RLE/LZP 圧縮器、「bzip2 の精神的後継」——が9月7日に 1.5.4 をリリースし、HN 投稿は約6時間で315ポイントに達した。README のベンチマークは、約262個の Perl ソースリリースにおいて 546 MB 対 xz の 2.06 GB を主張する。スレッドを支配した批判は、この比較は「 cherry-pick と見紛うほど不誠実」というもの。bzip3 は 512 MB ブロックで動作した一方、zstd は約 8 MB のデフォルトウィンドウのまま置かれていた。`--long=29` で再実行すると、zstd の出力は bzip3 より 2倍以上**小さく**、CPU 時間は半分。bzip3 のメモリ使用は 12–18 GB、zstd は約 700 MB だった。コメント者はカーネル tarball で zstd -19 が僅かに小さく解凍約145倍速いことも計測し、CI の失敗や README の大文字免責条項(bzip2 の README からの逐語コピーだと作者は弁明)にも異議を唱えた。

**Why it matters:** 本フィードの「ベンチマークには星号が付く」ルールの縮図だ。見出しの圧縮率はパラメータを揃えた途端に生き残れず、再正規化こそが本当のニュース。さらにリポジトリは `github.com/iczelia/bzip3` へ移転しており(旧 `kspalaiologs`)、ページ上に移転の説明はない。作者は本フィードが9月6日に取り上げた Balrogg と同じ人物だ。プロジェクトは別だが、名声ではなくリポジトリを見るべし。

[`🔗 iczelia/bzip3`](https://github.com/iczelia/bzip3) · [`🔗 Hacker News ディスカッション`](https://news.ycombinator.com/item?id=49598291)

---

## 4. tailcat——Tailscale がコントロールプレーン無しの WireGuard netcat をオープンソース化

- **Velocity:** ▮▮ rising
- **Source:** GitHub 週間トレンド · 約6.7k stars · 今週 +2,467(19位) · BSD-3-Clause · ブログは8月31日
- **Tags:** `networking` `wireguard` `tailscale` `go` `cli`

Tailscale が tailcat を公開した。Brad Fitzpatrick 氏による Go CLI/ライブラリで(2023年9月に「derpcat」として執筆、8月31日の TailscaleUp で开源化)、同社のデータプレーンのみ——ユーザースペース WireGuard、magicsock NAT 越え、DERP リレー——を使い、マシン間でエンドツーエンドの WireGuard トンネル越しに stdin/stdout を流す。コントロールプレーンは一切不要。アカウントも IP もログインも root も要らない。接続メタデータは秘密の `tc...` ベアラーケイパビリティアドレスに詰め込まれ、帯域外で共有する。クライアントは DERP ランデブーサーバに「MEOW」と鳴き、ホールパンチングが成功すれば直接 P2P UDP にアップグレードする。

**Why it matters:** Tailscale の接続マジックが協調インフラから分離可能であることの綺麗な実証であり、アドホックなエージェント間・マシン間トンネルに使えるプリミティブだ。ただし依存を考えるなら注意点が本題だ。安定性の保証は一切ない(Go API、CLI フラグ、ワイヤ形式がすべて変更されうる)。公開 DERP リレーはレート制限付き・SLA 無しで「いつでもアクセスを取り消す可能性がある」。アドレスは事前共有鍵を含むため DNS TXT に書けば全世界から読める。転送圧縮なし。UDP ペイロード上限 1,232 バイト。本体クライアントへの取り込みは未決。

[`🔗 tailscale/tailcat`](https://github.com/tailscale/tailcat) · [`🔗 Tailscale ブログ:tailcat`](https://tailscale.com/blog/tailcat)

---

## 5. MikroTik「MikroTrick」——RouterOS の SSH 脆弱性2件を連鎖させ未認証管理者乗っ取り、9月2日から攻撃確認

- **Velocity:** ▮▮ rising
- **Source:** CERT Polska(securityonline.info / The Hacker News 経由)· 9月2日以降の悪用を確認 · 9月5日公開 · CVSSv4 9.2(採点者は両ページとも未記載)
- **Tags:** `mikrotik` `routeros` `ssh` `network-appliance` `active-exploitation`

CERT Polska は、RouterOS の SSH 脆弱性2件の連鎖による未認証の完全な管理者支配を確認した。CVE-2026-67276 は公開鍵認証バイパス(RouterOS は鍵の modulus 照合時に指数をスキップするため、秘密鍵なしで偽造署名が検証を通る)。CVE-2026-86060 は細工したユーザー名によるセッション権限昇格で、ポリシーマスクを書き換える。9月2日時点で既に攻撃成功を観測。侵害されたデバイスには **「ops」** という新たな特権アカウントが現れ、ログには `ssh:-2@` を含む文字列が残る。姉妹脆弱性4件(CVE-2026-67277/78/79/81、CVSS 6.3–8.8)も同時開示され、いずれも悪用済みとして掲載。修正は 7.25beta3 / 7.24.2 / 7.23.4 / 6.49.21 で、MikroTik 初となるモバイルアプリのプッシュ通知で発表された。

**Why it matters:** RouterOS デバイスはボットネットの歴史で最も好まれた基盤であり、認証不要の管理者チェーンと数週間にわたる悪用確認は、露出した管理インターフェースを侵害済みとして扱うべきことを意味する——「ops」アカウントを確認せよ。アグリゲータが落とした限定条件も重要だ。CERT Polska も MikroTik も、観測されたチェーンを構成する2件の脆弱性がどれかを明言しておらず、日付からはゼロデイか 1デイか判定できない(beta 修正の changelog は9月2日、発表は9月3日)。公開 PoC は認証バイパスのみ。さらに MikroTik のデフォルトファイアウォールは通常管理ポートを保護しており、露出にはデフォルト変更が必要だったはずだ。

[`🔗 securityonline.info:MikroTrick`](https://securityonline.info/mikrotik-routeros-mikrotrick-cve-2026-67276/) · [`🔗 The Hacker News 記事`](https://thehackernews.com/2026/09/attackers-hijack-mikrotik-routers.html)

---

## 6. Bilevel Coordinated Reflection——マルチエージェント LLM オーケストレーションに不可能性結果(HF 論文1位)

- **Velocity:** ▮▮ rising
- **Source:** Hugging Face Daily Papers · 91アップvote(1位) · ~24h · arXiv 2609.02750
- **Tags:** `multi-agent` `game-theory` `llm-research` `swe-bench` `arxiv`

今週の HF バッチの首位論文は、オーケストレータ–ワーカ型マルチエージェント LLM システムを二階層協調ゲームとしてモデル化し、情報理論的な分離を証明した。**生成トランスクリプトのみを観測するゲートは、テキストが区別できない環境上一様に改善することは決してできない。環境に根ざしたゲートだけが可能である。** 論文は SRMA(接地評価のリスクが厳密に減少した場合のみ候補メモリを受け入れる)を提案し、500 の SWE-bench インスタンスで Kimi ベースのシステムが公開 mini-SWE-agent リファレンスの 70.8% 対し 72.2% を達成した。

**Why it matters:** メモリ受容ゲートは各エージェントフレームワークで直感ベースで増殖している。「トランスクリプト対グラウンデッド」の証明可能な分離は、このカテゴリに反証可能な設計ルールを与える。ただし論文自身の位置づけが注意点だ。実証マージンはリファレンスハーネス比 +1.4pt——貢献は理論(「予測された協調とドリフトの法則を検証する」)であり SOTA 主張ではない——公式リポジトリのスターは4で、注目は完全に論文主導だ。

[`🔗 Hugging Face 論文ページ`](https://huggingface.co/papers/2609.02750) · [`🔗 YihangChen9/Bilevel-Coordinated-Reflection`](https://github.com/YihangChen9/Bilevel-Coordinated-Reflection)

---

## 7. Iris——オープンな検索エージェントが BrowseComp 88.6 を主張、リーダーボードのトリック自体を公表

- **Velocity:** ▮▮ rising
- **Source:** Hugging Face Daily Papers · 50アップvote(2位) · ~36h · arXiv 2609.04304
- **Tags:** `search-agents` `reinforcement-learning` `open-source` `browsecomp`

AllSpark Research の Iris-mini(35B-A3B)と Iris-pro(397B-A17B)は、ライブ検索に対して SFT + RL を交互に行う訓練(「SFT-RL climbing」)を採用した。推論時コンテキスト管理ありでは、BrowseComp 82.2 / 88.6、BrowseComp-ZH 84.8 / 85.1、DeepSearchQA 86.9 / 92.9、HLE 52.3 / 56.4。パラメータ帯における最強のオープンソース検索エージェントを主張し、その全成績はサブエージェント無し・テスト時検証無しの単一 ReAct エージェントから出ている。

**Why it matters:** 荷重を支える文は著者自身のものだ。「推論時コンテキスト管理は、システム間の報告された差異のほとんどよりベンチマーク上で大きく効く」——だから全数値をあり/なし両条件で報告している。本フィードは注釈なしのリーダーボード差値を2度掲載してしまった。今回は、その誤読拒否が論文の中に組み込まれている。2つ目の注意点は、重みは約束されただけで未公開だ(「完全なレシピとともにモデル重みを公開する予定」)。リポジトリはスター36で重み無し。「最強のオープン検索エージェント」は現時点では主張であり成果物ではない。

[`🔗 Hugging Face 論文ページ`](https://huggingface.co/papers/2609.04304) · [`🔗 arXiv 2609.04304`](https://arxiv.org/abs/2609.04304) · [`🔗 AllSpark-Research/Iris`](https://github.com/AllSpark-Research/Iris)

---

## 8. vLLM の AMD GPU での投機的デコード——最大2.83倍、失敗ケースも印刷済み

- **Velocity:** ▮▮ rising
- **Source:** Hacker News · 118+ pts · 40 コメント · ~10h 前 (~17:26 UTC+8) · vLLM ブログ(8月23日)
- **Tags:** `inference` `speculative-decoding` `vllm` `amd` `rocm`

vLLM チームの記事(AMD と Embedded LLM チーム)は、Instinct MI300X と MI355X 上で ROCm を使い、5つのドラフト手法——ネイティブ MTP、Gemma 4 MTP、EAGLE-3、DFlash、DSpark——を検証する。実測ピークは出力トークンスループット 2.83倍(Qwen3.5-122B-A10B、平均受容長 5.01、受容率 80.2%)。Qwen3.6-35B-A3B での DFlash は 1.77–2.06倍。最適な提案長 N はモデルとデータセットにより 3〜11 と変わる。トリガーは新しい HN 投稿であって8月23日の記事日付ではない。

**Why it matters:** 投機的デコードは反射的なアドviceになりつつあるが、この記事の価値は印刷された反例にある。EAGLE-3 の MATH500 での最大実測値は spec 無しベースラインを**下回ったまま**——遅くなりうるのだ。TL;DR は即座に限定を付す(結果は「モデルファミリー、ドラフトチェックポイント、ワークロード、受容挙動に依存」し、全数値は「我々のテスト環境由来」)。代表ワークロードとエンドツーエンド計測による設定選択を主張している。ベンダーベンチの常套の星号もそのまま当てはまる。AMD が AMD を計測している。

[`🔗 vLLM ブログ:AMD GPU での投機的デコード`](https://blog.vllm.ai/2026/08/23/speculative-decoding-amd-gpus.html) · [`🔗 Hacker News ディスカッション`](https://news.ycombinator.com/item?id=49596054)

---

## 9. OpenAI が Codex/Work の5時間セッション制限を復活——Plus/Pro 向けに「即時リセット」を販売

- **Velocity:** ▮▮ rising
- **Source:** Hacker News · 113+ pts · 125 コメント · ~3h 前 (~00:40 UTC+8) · ユーザー報告。仕組みは OpenAI ヘルプセンターで確認
- **Tags:** `openai` `codex` `rate-limits` `pricing` `developer-tools`

Tell HN の投稿によれば、5時間のセッション制限が今週 ChatGPT Plus と Business Standard の Codex/Work ユーザーに復活した——「先週と制限の挙動が大きく違う理由を不思議に思っている人のために」——従来は使用量が週次枠から連続的に減る方式だった。OpenAI のヘルプセンターは現行構造を確認している。5時間 + 週次制限に加え、両方を即座に回復する有料の「instant reset」が登場したが、Plus と Pro の**個人**アカウント限定で、「Free、Go、Business、Enterprise、Edu プランでは利用不可」と明記され、返金不可、かつ週次リセットの時計を再アンカーする。コメント欄では、アップグレード・リセット購入・Codex 撤退を迫られたという報告が相次いでいる。

**Why it matters:** 多くのチームがワークフローを組んでいるコーディングエージェントにおいて、レート制限が収益化の表面になった。Codex のキャパシティプランニングに値札が付いたことになる。注意点としての規律を。「今週の復活」はユーザー報告だ(日付入りの OpenAI 発表は見つからず。ヘルプセンターは制限構造とリセット機構を確認するもので、時期は確認しない)。OpenAI は以前、制限の解除を一時的な「インシデント対応」と位置づけていた——スレッドはこれを bait-and-switch と読んでいる。

[`🔗 Hacker News:Tell HN スレッド`](https://news.ycombinator.com/item?id=49600233) · [`🔗 OpenAI ヘルプセンター:有料レート制限リセット`](https://help.openai.com/en/articles/20001507-paid-weekly-work-and-codex-rate-limit-resets)

---

## 10. Engrim——SQLite のメモリファイル1つを Claude Code、Cursor、Codex 等で共有(Show HN)

- **Velocity:** ▮▮ rising
- **Source:** Hacker News (Show HN) · 80+ pts · 48 コメント · ~15h 前 (~12:49 UTC+8) · リポジトリ 168 stars
- **Tags:** `agent-memory` `sqlite` `mcp` `local-first` `claude-code`

ローカルファーストの Python/SQLite メモリエンジン。Claude Code、Cursor、Windsurf、Codex、Antigravity がプロジェクト単位の単一メモリファイル(`~/.engrim/memory.db`)を共有でき、レコードごとに出自(`origin_agent`)を持つ。検索は SQLite FTS5(bm25)と `model2vec` 静的埋め込みを reciprocal-rank fusion で融合し、全履歴の代わりに約4,000文字の「ブートパック」を返す。MCP サーバは `engrim_recall` / `engrim_add` / `engrim_context` を公開する。

**Why it matters:** 出典付きのクロスハーネスメモリは、マルチ CLI の世界が収束しつつある形だ(ECC の Memory Vault 路線図と同じ衝動)。実装の選択も堅実——ローカル、検査可能、地味。だが HN スレッドの反論こそがこの分野の正直な現状だ。エージェントはメモリにゴミを書き込む。ライフサイクル・プルーニング・競合解決を解決した者はいない。看板数字(105セッションで 153k → 1,000 未満トークン)は作者自身の未検証ケーススタディにすぎない。

[`🔗 timgordontg/engrim`](https://github.com/timgordontg/engrim) · [`🔗 Hacker News ディスカッション`](https://news.ycombinator.com/item?id=49594008)

---

## 11. DeerFlow 2.0——ByteDance のエージェントハーネスがサンドボックス出口承認と自己編集エージェントを出荷

- **Velocity:** ▮▮ rising
- **Source:** GitHub Trending · 81.8k stars · 本日 +188 · MIT · 9月3–7日に約35コミット
- **Tags:** `agent-harness` `langgraph` `bytedance` `sandbox` `skills`

ByteDance の長期稼働エージェントハーネス DeerFlow(LangGraph 上でゼロから書き直されたもの:サブエージェント、漸進的スキル読み込み、MCP、長期メモリ、local/Docker/K8s/E2B のサンドボックス)は、実質の活動によってトレンドに乗った。最近のコミットには**承認付きの制御されたサンドボックス出口**(9月4日)、読み取り専用 LightRAG 検索、ランのアーカイブ/復元、ハードストップ優先修正が含まれる。v2.0.0 のリリースノートはランのハイドレーション/キャンセルに関する破壊的変更に印を付けている。

**Why it matters:** 人間の承認付きの出口制御サンドボックスは、エンタープライズのエージェント展開が繰り返し求めてきたものだ。81.8k スターのハーネスがこれを第一級機能として出荷することは、デフォルト線を引き上げる。ただし README 自身の一文をスター数と一緒に読め。スキルポリシーは「ベストエフォートの行動スコープであり、ハードなセキュリティ境界ではない」。MCP の `input_required` は通知のみ。本番のデフォルトは単一ゲートウェイワーカーだ。

[`🔗 bytedance/deer-flow`](https://github.com/bytedance/deer-flow) · [`🔗 DeerFlow リリース (v2.0.0)`](https://github.com/bytedance/deer-flow/releases)

---

## 12. Camofox-browser——エージェント向けアンチ検出ブラウザ、本日 +285。README には暗号通貨詐欺警告

- **Velocity:** ▮▮ rising
- **Source:** GitHub Trending · 9.6k stars · 本日 +285 · HN のトリガー無し(過去の投稿は3点と2点)
- **Tags:** `browser-automation` `anti-detection` `playwright` `ai-agents` `web-scraping`

Camoufox(C++ レベルの Firefox フィンガープリント偽装)をラップする REST サーバで、エージェントのステルス閲覧レイヤーを標榜する。エージェントに関係する表面は、アクセシビリティツリースナップショット(生 HTML より約90%小さいと主張、`e1`・`e2`…の安定した要素参照付き)、JSON を返す14個の検索マクロ(`@google_search`、`@reddit_subreddit`)、cookie/セッション永続化、yt-dlp 文字起こし。

**Why it matters:** エージェント開発者にとって信頼できる半分は a11y ツリースナップショットのパターンだ——小さいコンテキスト、安定した要素参照——ステルスの位置づけとは無関係に価値がある。残りは注意点ごと受け取ること。「Google、Cloudflare、ほとんどのボット検出をバイパス」はプロジェクト自身の未検証主張。今回のスパイクに HN のトリガーはなく(有機的拡散と悪名——README は現在、この名前で暗号トークンを発行した「胡散臭い連中」への警告を掲載)、初回実行で約 300 MB のバイナリ、`recordVideo` は Chromium 専用。そしてアンチ検出のユースケース自体が、README が触れない ToS/法的リスクを抱えている。

[`🔗 jo-inc/camofox-browser`](https://github.com/jo-inc/camofox-browser) · [`🔗 daijro/camoufox(上位エンジン)`](https://github.com/daijro/camoufox)

---

## 13. OpenMAIC v1.0.0——マルチエージェント AI 教室が1週間で +9.2k スター

- **Velocity:** ▮▮ rising
- **Source:** GitHub 週間トレンド(4位) · 33.0k stars · 今週 +9,193 · v1.0.0 は8月27日
- **Tags:** `multi-agent` `education` `open-source` `tts` `tsinghua`

「Open Multi-Agent Interactive Classroom」(THU-MAIC、清華大学系)は任意の文書やトピックを、AI 教師と AI クラスメートが教える授業に変える。講義、円卓ディベート、共有ホワイトボード、TTS——「アウトライン→シーン」の2段階パイプラインで実現する。v1.0.0 では Pro エージェントワークベンチ(内蔵スキル20個のチャットファーストなプランナー/ビルダーエージェント)、永続化 DB セッション、Feishu/Slack/Telegram のメッセージから教室を生成する SKILL.md パッケージが追加された。プロバイダ中立(OpenAI、Anthropic、Bedrock、Gemini、Ollama、ローカル ASR/TTS)で、PPTX/HTML/ZIP をエクスポートできる。

**Why it matters:** マルチエージェントのロールプレイはデモのジャンルから実際の製品カテゴリへ育ちつつあり、1週間で +9.2k スターは需要のシグナルだ。一方でリポジトリ自身の警告は、外部公開の準備ができていないことを示す。ワークベンチはデフォルト無効で `DATABASE_URL` と明示的モデルルーティングを厳格に要求(フォールバック無し)。開発用永続化トークンは「機密性もユーザー分離も一切提供しない」——localhost 専用。バンドル依存の一つは LGPL。

[`🔗 THU-MAIC/OpenMAIC`](https://github.com/THU-MAIC/OpenMAIC) · [`🔗 GitHub 週間トレンド`](https://github.com/trending?since=weekly)

---

## 14. Telerik UI for ASP.NET AJAX——パディングオラクルから RCE へのチェーンに公開エクスプロイト(9月7日)

- **Velocity:** ▮▮ rising
- **Source:** TantoSec リサーチ · 9月7日エクスプロイト公開 · CVSS 8.1(採点者未記載。Progress は CVSS を公表せず)· 2026.2.708(7月8日)で修正済み
- **Tags:** `telerik` `padding-oracle` `rce` `aspnet` `poc`

TantoSec が RadAsyncUpload に対する動作するチェーンを公開した。AES-CBC パディングオラクル(CVE-2026-13182。タイミング変種が CVE-2026-13183)に、防護されていない型解決(CVE-2026-13181)を重ね、ミックスモード DLL の `Assembly.LoadFrom` ガジェット経由で未認証 RCE に到達する。UI for ASP.NET AJAX 2026.1.225〜2026.2.519 で検証済み。オラクルクエリ約127,000回(ラボで約1時間)。エクスプロイトツールと2種のウェブシェルペイロードが9月7日時点で公開されている。

**Why it matters:** ねじれは、エクスプロイトの前提条件がまさに「ハードニング設定」である点だ。チェーンは明示的な `Telerik.AsyncUpload.ConfigurationEncryptionKey` を要求し、デフォルトインストールでは「条件を満たさない」。つまり推奨ミティゲーションに従った者が、そのままエクスプロイトの有効化条件になっている。Progress 自身の警告(成功した悪用は「標準の ASP.NET エラーログに目立った痕跡を残さない」)、一方のオラクルだけを修正し postback 経路を開けたままにした中間ビルド 2026.1.421、そしてオラクルには効かないカスタム鍵——を合わせれば、2026.2.708(AES-GCM)へのアップグレードが唯一の実質的な修正だ。確認された in-the-wild 悪用は無く、9月7日時点で KEV 未掲載。

[`🔗 TantoSec リサーチ(一次情報)`](https://tantosec.com/blog/2026/09/telerik-padding-oracle-to-shell) · [`🔗 The Hacker News 記事`](https://thehackernews.com/2026/09/telerik-ui-padding-oracle-bug-chained.html)

---

## 15. Apache Tomcat 9.0.121——一度に11件の CVE。うち8件は EOL の Tomcat 8.5 では修正不能、1件は過去の修正不完全が発端

- **Velocity:** ▮ steady
- **Source:** HeroDevs 分析 · 修正は 9.0.121/10.1.58/11.0.25(8月18日) · CVE は8月25日開示 · 開示時点で NVD の分析は 0/10
- **Tags:** `tomcat` `apache` `eol-risk` `http2` `auth-bypass`

Tomcat の累積修正には、web.xml の制約順序バイパス、CLIENT-CERT/SPNEGO 認証がフェイルオープンになる欠陥(CWE-287)、HTTP/2 のメモリ枯渇 DoS、そして CVE-2026-65637 が含まれる。最後のものは Apache 自身の言葉では「CVE-2026-32990 の修正が不完全だった」ことに起因する。authority を持たない HTTP/2 リクエストが厳格な SNI 検証をバイパスする。11件のうち8件は EOL の Tomcat 8.5(最終リリース 8.5.100、2024年3月 EOL)にも影響し、Apache によれば「修正されない」。HeroDevs はそのブランチで EOL 後の未修正 CVE を877日間で48件と数えている。

**Why it matters:** 修正不完全によるリグレッションは、パッチ適用の静かな故障モードだ。3月に閉じられたと生態系が信じていた SNI 検証は閉じられていなかった。そして大規模な Tomcat 8.5 のフリートには修正経路が一切ない。スコアリングの衛生管理として。Apache は CVSS ではなくテキストによる深刻度を公表する。採点済みは CVE-2026-66299 のみ(Apache: Low 対 CISA ADP: 7.5)。KEV 掲載は無く、悪用報告も無い。

[`🔗 HeroDevs:Tomcat 9.0.121 分析`](https://www.herodevs.com/blog-posts/apache-tomcat-9-0-121-fixes-11-cves-8-affect-eol-tomcat-8-5) · [`🔗 Senserva KEV 週次トラッカー`](https://senserva.com/exploited-this-week.html)

---

## 16. MarkItDown が +771 でトレンド2位に——マイクロソフトが「慎重なロールアウト」と呼ぶバグ修正プレリリースで

- **Velocity:** ▮ steady
- **Source:** GitHub Trending · 約180k stars · 本日 +771 · v0.1.8b1 は9月4日リリース
- **Tags:** `markdown` `document-conversion` `python` `microsoft`

microsoft/markitdown——PDF/Office/音声/HTML/EPub を Markdown に変換する Python ユーティリティで、明示的に LLM パイプライン向け(`markitdown-mcp` パッケージ付き)——が本日の GitHub トレンド2位。トリガーは9月4日のプレリリースだ。新機能ゼロの大量修正バッチ(CSV の BOM/パイプ、取り消し線の保持、DOCX/PPTX/XLSX のエッジケース、Windows stdin、短い YouTube URL)で、メンテナは「変更量が慎重なロールアウトを要する」と注記している——ゆえに安定版 0.1.8 の前に b1 が出た。

**Why it matters:** これは RAG パイプラインのかなりの割合を占める摂取(ingestion)側であり、そのエッジケースの挙動がコーパス品質を静かに定義する。トレンドの急上昇は LLM パイプラインの視聴者を映していて、リリース自体の華やかさを映していない。マイクロソフト自身の注意点。出力は「人間が読むための高忠実度変換の最良の選択肢ではないかもしれない」。現在のプロセス権限で動く(「信頼できない環境では入力をサニタイズせよ」、`convert_local()` を優先)。サーバ/API/フロントエンドは明示的に受け付けない方針。

[`🔗 microsoft/markitdown`](https://github.com/microsoft/markitdown) · [`🔗 markitdown リリース (0.1.8b1)`](https://github.com/microsoft/markitdown/releases)

---

## 17. CodePen 2.0 が打字中のキーストロークを送信している——一次テストだが激論に

- **Velocity:** ▮ steady
- **Source:** Hacker News (Ask HN) · 105+ pts · 51 コメント · ~9h 前 (~19:22 UTC+8) · ユーザー報告
- **Tags:** `codepen` `privacy` `web-dev` `telemetry`

Ask HN の投稿者が報告したところによれば、CodePen 2.0 は打字後1〜2秒以内、保存より前に、エディタ入力を `codepen.dev` へ送るという。index.html に入力した一意のマーカーが、`save:false` でも、生成された `*.codepen.dev` プレビューが配信する HTML にそのまま現れた。作者は ToS とプライバシーポリシーがこれを開示していないと主張する。一方 Builds ドキュメントは、Pen は「CodePen コンパイラで絶えず実行されており」「打字が1秒止まると」ビルドされると述べるのみだ。

**Why it matters:** 仕組みがどうであれ、実務的な結論は新しい証拠の付いた昔からの忠告だ——機密をクラウドのスクラッチパッドに入れるな。だがこのスレッドは主張の規律に関するケーススタディでもある。コメント者はこれがプレビューレンダリング/自動保存だと論じ(CodePen v1 も同じだったと)、クラッシュ後の未保存データは実際には復元できない点(自動保存の正当性を削ぐ)を指摘し、公式の CodePen の反応は無く、「機密は漏洩したとみなすべき」は著者の推論であって確認済みインシデントではない。

[`🔗 Hacker News:Ask HN スレッド`](https://news.ycombinator.com/item?id=49596976) · [`🔗 CodePen Builds ドキュメント`](https://blog.codepen.io/documentation/views/builds/)

---

## 18. トッテナム・ホットスパー、VMware から HPE Morpheus への移行でライセンス費85%超削減と発表

- **Velocity:** ▮ steady
- **Source:** Hacker News · 93+ pts · 40 コメント · ~9h 前 · Ars Technica(9月3日、再浮上)
- **Tags:** `vmware` `broadcom` `hpe` `virtualization` `licensing`

サッカークラブの CTO Rob Pickering 氏が Ars Technica に語ったところでは、スタジアムの VMware 環境を HPE Morpheus VM Essentials(GreenLake 経由で提供)に置き換えた結果、ライセンス料を「85%強」削減できているという。インフラ(6通路のデータセンター、ProLiant Gen12、Alletra Storage MP、ネットワークアクセスポイント20,000、IPTV スクリーン1,849)は3か月で移行した。同氏は「Broadcom による VMware 買収にまつわる諸問題……彼らの商業構造と顧客との付き合い方の変化」を挙げ、AI-ops スタックに組み込まれない仮想化は約35人の技術チームにとって価値が低いと論じる。

**Why it matters:** Broadcom の再価格付けによる流出は公開のリファレンスカスタマーを生み続けており、その一つ一つが VMware 契約を更新する全ての人にとっての交渉シグナルだ。数字もそう扱うべし。トッテナムはどの VMware 製品をどれだけの費用で使っていたかを明かしていない。85% は顧客自身の未監査の数字で、利害関係ベンダーが宣伝し、しかも一例にすぎない。

[`🔗 Ars Technica:VMware 移行でスパーズのライセンス費85%削減`](https://arstechnica.com/information-technology/2026/09/vmware-migration-reduces-tottenham-hotspurs-licensing-fees-by-85-percent/) · [`🔗 Hacker News ディスカッション`](https://news.ycombinator.com/item?id=49595851)

---

## 19. Dr. Claw——オープンソース「AI サイエンティスト・ワークスペース」が1kスター突破、EMNLP デモ採録

- **Velocity:** ▮ steady
- **Source:** GitHub · 1,058 stars · 9月7日に push · HF Daily Papers リスト(7アップvote) · EMNLP 2026 System Demonstrations
- **Tags:** `ai-scientist` `research-agents` `open-source` `emnlp`

OpenLAIR/dr-claw はモデル非依存の研究ワークスペースで、サーベイ → アイデア出し → 実験 → 論文執筆 → スライドを網羅し、Claude Code、Gemini CLI、Codex、OpenRouter ホストモデルと動く。100以上のスキルライブラリと、採点付きの arXiv/HF/GitHub/X ニュースフィードを同梱する。論文「Dr. Claw: An AI Scientist Workspace for Vibe Research」(arXiv 2609.00365)は EMNLP 2026 System Demonstrations に採録された。

**Why it matters:** 「vibe research」ツールが学術的な正当化(デモトラック採録)を得るのと同じ時に、商用エージェントがこのカテゴリを定義している。オープンな代替は同じループに収束しつつある。README 自身のフレーミングは正直に持ち運ぶこと。「Anthropic の Claude Science と同じビジョンを2026年2月から出荷してきた」という主張は、このプロジェクト自身の競合マーケティングであり、独立した比較ではない。ライセンスは GPL-3.0 + AGPL-3.0 のデュアル。

[`🔗 OpenLAIR/dr-claw`](https://github.com/OpenLAIR/dr-claw) · [`🔗 arXiv 2609.00365`](https://arxiv.org/abs/2609.00365)

---

## 20. Mador——855バイトのリアクティブ DOM ランタイム、プロパティ単位の依存追跡付き(Show HN)

- **Velocity:** ▮ steady
- **Source:** Hacker News (Show HN) · 98+ pts · 33 コメント · ~23h 前 · リポジトリ 98 stars
- **Tags:** `javascript` `reactivity` `frontend` `micro-library`

Mador(`@marsbos/mador`、MIT)は意図的に最小化されたリアクティブ DOM ランタイムだ。`mador(state)` は `[read, write]` タプルを返す。`read(selector, update, deps)` は CSS セレクタの対象をプロパティ単位の依存追跡付きでバインドし、バインディングは実際に読んだプロパティが変わった時のみ再実行される。書き込みはバッチ化され、DOM が消えればバインディングは自動で片付く。コンポーネント、テンプレート、仮想 DOM、ビルドステップ、グローバルランタイムは不要——ミニファイ後 855 バイト。

**Why it matters:** セレクタが今見つけたものにバインドする——所有権よりシグナル——は、フレームワーク内 signals とは真正に異なる設計ポイントであり、HN スレッドはそのトレードオフに関するコンパクトなセミナーだ。本フィードにとっての教訓はライブラリそのものより方法論だ。HN タイトルの「80行」は README のどこにも現れない(検証可能な数値はミニファイ後 855 バイト)。リポジトリは12コミット・リリース無し。見出しの数字を繰り返す前に、リポジトリを見ること。

[`🔗 marsbos/mador`](https://github.com/marsbos/mador) · [`🔗 Hacker News ディスカッション`](https://news.ycombinator.com/item?id=49590738)

---

## 21. WeatherNext 3 — DeepMind の天気モデルがリアルタイム衛星から直接学習、5km 解像度で毎時予報

- **Velocity:** ▮▮▮ trending
- **Source:** Hacker News · 263+ pts · 63 コメント · フロントページに再浮上（~9月5日投稿） · DeepMind 発表は9月3日
- **Tags:** `weather-ai` `deepmind` `forecasting` `earth-models`

Google DeepMind と Google Research は9月3日、WeatherNext 3 を発表した。Brightband の独立ライブ評価を援用し「これまでで最も先進的で正確な全球天気モデル」と称する。アーキテクチャ上の転換点は、従来の AI 天気モデルが数値予報（NWP）シミュレーションで学習していたのに対し、リアルタイム観測から直接学習する点だ——静止衛星のライブモザイクと疎な地上観測データを Functional Generative Network メッシュ transformer で融合する。主要地表変数の解像度は 5km（その他は 10/25km）。WeatherNext 2 の 25km/6時間グリッド比で約5倍の精細さになり、予報は毎時更新。降水の改善主張は「IMERG 比で最大 60%、MRMS 比 30%、早期リードタイムの雨量計観測比 10% の CRPS 改善」、1日以上の予報で「最大 50% 高精度」。Google 検索・Gemini・マップ・Maps Platform Weather API・Earth Engine に組み込まれ、BigQuery/GCS アクセスに加え、クリーンエネルギー向け出力（地上 100m 風速、雲量、日射量）も新增した。

**Why it matters:** NWP 再解析ではなくライブ衛星データに接地した、毎時予報を生成する初の全球モデル——漸進的改善ではなく、異なる訓練基盤だ。ただし但し書きは明示されている。精度主張はすべて「最大（up to）」付き。Google 自身が大気は「常に一定の不可予測性を保持する」と述べ、公式警報は各国気象機関に委ねており、最大の改善は歴史的に最も信頼性が低かった予報領域で起きている——相対的改善であって、降水の小規模過程問題の解決ではない。

[`🔗 Google DeepMind: WeatherNext 3`](https://blog.google/innovation-and-ai/models-and-research/google-deepmind/introducing-weathernext-3/) · [`🔗 Hacker News ディスカッション`](https://news.ycombinator.com/item?id=49552299)

---

## 22. GNU `strip` 経由の Trusting-Trust 攻撃——コンパイラに触れずに NixOS ディストリビューション全体をバックドア化

- **Velocity:** ▮▮▮ trending
- **Source:** Hacker News · 174+ pts · 37 コメント · 約34時間前（9月7日 ~02:00 UTC+8） · arXiv 2607.24888（7月27日）
- **Tags:** `supply-chain` `trusting-trust` `nixos` `build-security` `arxiv`

Ken Thompson の古典的 trusting-trust 攻撃は「コンパイラ固有の脅威と広く見なされて」きた。Julien Malka、Aman Sharma、Martin Monperrus、Stefano Zacchiroli、Théo Zimmermann の各氏は、そうではないことを実証した。コンパイル済み ELF バイナリのみを改変し、ソースコードには決して触れない日常的なビルドツール **GNU strip** を経由して Thompson 級の攻撃を成立させる。NixOS ブートストラップのバイナリシードに仕込まれた改変版 `strip` は、処理する全バイナリにペイロードを植入し、自身がビルドに関わる新たな strip バイナリへ自己コピーすることで世代から世代へ伝播する。ペイロードは「シードが依存閉包を離れた後も最終的な標準環境に存続する」。結果：エラー zero で完全なグラフィカルインストーラがビルドされ、その中のほぼ全バイナリがバックドア済みになる。

**Why it matters:** 信頼のルートがコンパイラからブートストラップシード内の任意バイナリへ移る——検証すべきはコンパイラだけでなく*シード*の来歴であり、diverse double-compiling のような古典的対抗策はコンパイラ対象のままだ。留保も記録：これは特定の実 nixpkgs リビジョンに対する研究者構築のデモであって、発見された侵入ではない。アブストラクトには野外証拠の記載がなく、実検出事例の議論もない。

[`🔗 arXiv 2607.24888`](https://arxiv.org/abs/2607.24888) · [`🔗 Hacker News ディスカッション`](https://news.ycombinator.com/item?id=49575515)

---

## 23. 1990年代 CA の RSA-512 ルート鍵をデスクトップで素因数分解——CADO-NFS 32時間、鍵は旧ブラウザインストーラから抽出

- **Velocity:** ▮▮▮ trending
- **Source:** Hacker News · 158+ pts · 29 コメント · 約6時間前（~06:00 UTC+8） · mcpherrin.ca 投稿（9月7日）
- **Tags:** `rsa` `cryptography` `pki` `factorization` `archive`

筆者は、1999年3月の Netscape 4.51 に同梱されていたカナダの消滅 CA「E-Certify」の 512bit ルート鍵2本（"Gold Server"（SSL）と"Gold Client"（S/MIME））を、Ryzen 9 5950X 上で CADO-NFS をローカル実行して分解した（32時間と29時間）。ルート証明書は archive.org の IE/Netscape インストーラコレクションから取得し、Claude Code で閲覧可能なサイトに抽出した。おまけ：IE 3.02（1996年）の「Test VeriSign Commercial Software Publisher CA」コード署名ルートは、Steve Weis 氏が「GPU クラスタで約1時間」で分解。背景として、RSA-155（512bit）は1999年に破られ、RSA-260（862bit）はつい最近分解され、1024bit は「十分なリソースを持つ組織なら可能性の範囲内」だという。

**Why it matters:** これは現在使用中の何にも影響しない——Netscape は2002年にルートを削除し、証明書は 2003-10-16 に失効。チェーン再現には時計を巻き戻した Netscape 4.51 が必要で、筆者いわく「地球上の該当者は zero」。価値は手法にある：歴史的ルート鍵は歴史的インストーラの中に眠り、コンシューマ級ハードウェアと LLM 支援の抽出があれば RSA-512 は容易だ。筆者自身の留保も残すべきだ：「この LLM 出力が完全に信頼できるかは検証していない。かなりもっともらしいにすぎない」。

[`🔗 mcpherrin.ca: 90年代 CA の RSA 鍵を分解した`](https://mcpherrin.ca/2026/09/07/rsa.html) · [`🔗 Hacker News ディスカッション`](https://news.ycombinator.com/item?id=49604637)

---

## 24. Caltech Mathathon——研究レベル数学初のハッカソン、結果は数学者の前で弁護させる

- **Velocity:** ▮▮ rising
- **Source:** Hacker News · 245+ pts · 84 コメント · 約27時間前（9月7日 ~09:10 UTC+8）
- **Tags:** `ai-math` `research` `hackathon` `verification`

Caltech が10月30日〜11月1日、40時間の「Mathathon」を開催する。研究レベル数学に特化した世界初のハッカソンと称し、約100チームがフロンティア AI モデルを与えられ、未解決予想や理論構築に挑む。その後「著名数学者の前で結果を弁護」し、参加者がモデルの出力を実際に理解しているかを評価する。200万ドル超の AI クレジット賞品。賞は2段階で、第2段階は「数学コミュニティが結果を検証する時間を持った後」でのみ授与される。動機節では近年の AI 駆動成果——エルデシュの平面単位距離予想の反証（80年未解決）と、非sofic群の初の陽な構成（27年未解決）——を引用している。

**Why it matters:** 検証優先の賞設計は、本フィードが記録し続けてきた「デモ＝ベンチマーク」問題への直接の回答だ——人間の検証を経るまで結果はカウントされず、評価されるのは出力ではなく理解である。Anthropic によるフェルマーの最終定理の形式化、フェルマー後の資金論文に続く今週3つ目のデータポイントでもあり、AI 加速された数学がデモではなく制度を獲得しつつあることを示す。

[`🔗 Caltech Mathathon`](https://mathathonchallenge.com/) · [`🔗 Hacker News ディスカッション`](https://news.ycombinator.com/item?id=49596055)

---

## 25. Jellyfin 12.0——バージョン番号が「10.」を捨て、レガシー `/emby` ルートを削除。完全バックアップなしではロールバック不能

- **Velocity:** ▮▮ rising
- **Source:** Hacker News · 149+ pts · 56 コメント · 約6時間前（~06:10 UTC+8） · RC 7 を経て9月8日に v12.0 リリース
- **Tags:** `jellyfin` `self-hosting` `media-server` `breaking-changes`

Jellyfin 12.0 が9月8日にリリースされた。長年使われてきた「10.」プレフィックスが廃され、新バージョニング最初のリリースとなる。目玉：エピソードの複数バージョン対応、類似度・レコメンドとプラグ可能な検索プロバイダ、3桁エピソード番号、サーバ同梱の ListenBrainz、FFmpeg 8.1、そして Resume/Next-Up/カウント系クエリを高速化する新しいリレーショナル `LinkedChildren` テーブル。破壊的変更リストは長い：レガシー `/emby/*`・`/mediabrowser/*` ルート削除（旧サードパーティクライアントは動作不能）、レガシー認証をデフォルト無効化、ユーザー名を一意インデックス付き正規化カラムへ移行（大文字小文字のみの重複はアップグレード前に解消が必要）、グローバル字幕設定の削除。リリースノートは率直だ。「データディレクトリの完全バックアップを強く推奨」——DB 変更により完全リストアなしのロールバックは不可能——直接アップグレードは 10.10.7 または 10.11.x からのみ、移行前にサードパーティプラグインの削除が必須、アップグレード後は全ライブラリ再スキャンが必要。

**Why it matters:** 最大の完全オープンソース自ホストメディアサーバが、数年で最大の互換性断絶を迎えた。エコシステム内の全サードパーティクライアントとプラグインが監査対象になる。ロールバック不能を明言し、アップグレードパスを明示するリリースノートの規律は、破壊的マイグレーションの記録手本だ。

[`🔗 Jellyfin releases（v12.0）`](https://github.com/jellyfin/jellyfin/releases) · [`🔗 Hacker News ディスカッション`](https://news.ycombinator.com/item?id=49604861)

---

## 26. FreeIPA CVE-2026-76578（CVSS 9.8、Red Hat 採点）——未認証の LDAP クライアントが FreeIPA 管理者になれる

- **Velocity:** ▮▮ rising
- **Source:** NVD · 9月7日公表（ステータス「Received」） · CVSS 9.8 Primary（Red Hat CNA） · securityonline.info 9月7日
- **Tags:** `freeipa` `keycloak-alternative` `ldap` `kerberos` `identity`

FreeIPA の自己管理 OTP トークン ACI は認証を要求せず、トークンエントリと共に追加できる属性も制限していない。未認証の LDAP クライアントは、ディレクトリサーバ側の関連する ACI 評価欠陥（別途トラック）とこれを連鎖させ、攻撃者制御の Kerberos プリンシパルを作成して administrators グループへ追加できる——認証情報も操作も不要の、アイデンティティサーバ完全掌握だ。影響範囲：RHEL 6〜10 の `ipa` パッケージのデフォルトインストール。クロスレルム Kerberos trust による AD 統合を利用する環境も含む。パッチ適用までの緩和策：LDAP ポート 389/636 を信頼ホストに限定し、匿名バインドを無効化（依存機能がないか確認の上）。securityonline.info は修正が FreeIPA 4.13.4 にあると報じるが、独立確認はできていない——プロジェクトの GitHub にはリリースが一つもない。注目すべきは、先行修正（CVE-2026-13097）が正規名衝突のみを塞ぎ、根底にある未認証書き込みアクセスは開いたままだったことだ。

**Why it matters:** デフォルト構成のアイデンティティ基盤における「未認証→ドメイン管理者」は最悪クラスのバグであり、アイデンティティサーバは下流すべての支点だ。本フィードの規則に従い採点者を記録：9.8 は Red Hat 自身の CNA スコアで、NVD のステータスは依然「Received」（未分析）。そして不完全修正のパターン（13097 → 76578）は、今朝の Tomcat 項目と同じ繰り返しだ。

[`🔗 NVD: CVE-2026-76578`](https://nvd.nist.gov/vuln/detail/CVE-2026-76578) · [`🔗 securityonline.info 解説`](https://securityonline.info/freeipa-cve-2026-76578-vulnerability/)

---

## 27. Windows HTTP.sys CVE-2026-62735——Pwn2Own Berlin の権限昇格バグの PoC が公開に

- **Velocity:** ▮▮ rising
- **Source:** securityonline.info 9月8日 · CVSS 7.8（Microsoft CNA、NVD Analyzed） · 8月11日の Patch Tuesday で修正済み
- **Tags:** `windows` `http-sys` `lpe` `poc` `pwn2own`

CVE-2026-62735——HTTP.sys（Windows カーネル HTTP ドライバ）のヒープベースバッファオーバーフローで、研究者 Siyeon Wi 氏が Pwn2Own Berlin 2026 で実演し、2026年8月の Patch Tuesday で修正済み——の完全な技術詳細と動作 PoC が今週公開された。根本原因は `UlpCreateInternalResponseOld` の整数オーバーフロー。ドライバはヘッダバイト合計でラップアラウンドを防護せず、過小な nonpaged pool バッファを確保する。PoC は特定の IOCTL 経由で約7万個のカスタムヘッダを含む HTTP レスポンスを送り、バッファを SYSTEM レベルのコード実行まで溢れさせる。影響範囲：Windows 10 1607 から Windows 11 26H1、Server 2012〜2025。回避策なし。確認された野外悪用はまだない（EPSS 0.5%）。

**Why it matters:** リスク窓は「パッチ〜PoC」の時間差だ——8月に修正済みだが、公開 PoC により未適用のフリートが標的リストに載る。露出はローカルかつ認証後（CVE 記述は「authorized attacker」）なので、真のリスク集団は共有ホスト・RDS サーバ・キオスク型環境であり、開放されたインターネットではない。深掘りの悪用解析はまだペイウォールの内側にあり、PoC の存在が示唆するほど公知の信頼性情報は多くない。

[`🔗 securityonline.info: CVE-2026-62735`](https://securityonline.info/windows-http-sys-cve-2026-62735/) · [`🔗 NVD: CVE-2026-62735`](https://nvd.nist.gov/vuln/detail/CVE-2026-62735)

---

## 28. pascalorg/editor——2.24万スターの WebGPU 3D 建築エディタ、AI ホスト向け MCP サーバを同梱

- **Velocity:** ▮▮ rising
- **Source:** GitHub Trending（日次 #13） · 22.4k stars · 本日 +168 · MIT
- **Tags:** `webgpu` `threejs` `mcp` `cad` `ai-agents`

Pascal のエディタ（React Three Fiber + WebGPU、Next.js/React 19 モノレポ）は、建物を検証付きノード階層——Site → Building → Level → 壁/スラブ/天井/屋根/ゾーン/アイテム——でモデル化する。空間グリッドによる配置検証、three-bvh-csg によるドア・窓のブーリアン開口、シーンはフラットなノード辞書として IndexedDB に保存し、dirty-node 追跡がフレーム毎の再生成を駆動する。エージェント関連部分はファーストクラスだ：MCP サーバ（`@pascal-app/mcp`）と CLI（`npx @pascal-app/cli editor`）により AI ホストがシーンを作成・操作でき、機能はビルトインと同じ manifest を使うプラグインで拡張する。

**Why it matters:** MCP を公開する構造化・制約検証付きのドメインエディタは「エージェントは誤魔化せない建物を描く」パターンそのもの——archify の検証済み IR 図表の建築版だ。シーングラフがエージェントに安全に読み書きできるデータであるのは、空間検証がプロンプト内ではなくツール内に存在するからだ。留保：リリースタグなし（main に 1,421 コミット）、undo/redo は50ステップ上限、プロジェクトが新しすぎて MCP サーフェスはまだ動く。

[`🔗 pascalorg/editor`](https://github.com/pascalorg/editor) · [`🔗 GitHub Trending`](https://github.com/trending)

---

## 29. Broadcom が VDDK ダウンロードを撤去——VMware を*離れる*ために全員が使うライブラリが 404 に

- **Velocity:** ▮▮ rising
- **Source:** Hacker News · 132+ pts · 55 コメント · 約8.5時間前（~03:30 UTC+8） · virtualizationhowto.com（ShapeBlue が8月25日に記録）
- **Tags:** `vmware` `broadcom` `vddk` `migration` `lock-in`

Broadcom は VMware Virtual Disk Development Kit の公開ダウンロードページを削除した——Azure Migrate、Red Hat MTV、Nutanix Move、Platform9 vJailbreak、そしてオープンソースの virtv2v/nbdkit がすべて VMware ディスクの読み取りに使うライブラリだ。Broadcom アカウントでログイン済みでも、VDDK 8 と 9 のバージョン別パスは一様に 404 を返す。公式声明も廃止通知もない。サポート窓口では VDDK は「使用もダウンロードも不可能になった」とされ、Technology Alliance Program への誘導がなされたと報じられる。Red Hat はプロプライエタリな同ソフトを再配布できないとし、Microsoft は Azure Migrate ガイダンスに警告を追加（エージェントベースへフォールバック）。Proxmox の内蔵 ESXi インポートは影響を受けない。

**Why it matters:** 今朝のトッテナム項目と収束する——顧客が契約を再価格付けするのと同時に、VMware 周辺の退出ツールがゲート化されつつあり、移行プロジェクトには「VDDK を合法的に入手できるか」という行が必要になった。誠実な留保：「意図的な退出障壁」という読みは原著者の解釈であり、Broadcom は公の場で何も語っておらず、機能する移行経路（Proxmox）は依然存在する。

[`🔗 virtualizationhowto: VMware からの離脱がさらに困難に`](https://www.virtualizationhowto.com/2026/09/leaving-vmware-just-got-harder-after-broadcom-pulled-vddk-downloads/) · [`🔗 Hacker News ディスカッション`](https://news.ycombinator.com/item?id=49602699)

---

## 30. Roundcube 1.6.19 / 1.7.4——webmail の12件修正、ゼロクリック stored XSS と CSS プロキシ SSRF バイパスを含む

- **Velocity:** ▮ steady
- **Source:** roundcube.net セキュリティ更新 · 9月6日リリース · 1.6 LTS と 1.7 の両ブランチ
- **Tags:** `roundcube` `webmail` `xss` `ssrf` `patch`

Roundcube は9月6日、両ブランチ向けセキュリティ更新をリリースし、報告されていた12件の欠陥を修正した。ヘッドラインは添付ファイル URL への TNEF MIME タグ注入による**ゼロクリック stored XSS**——メール1通で十分に発火する。そのほか：16進 IPv6 マップド IPv4 アドレスによる CSS プロキシの SSRF バイパス、3件のメールヘッダ注入（subject の裸 CR、受信者表示名の C エスケープ `\r`、identity の組織フィールド）、2件の CSS 注入/スマグリング、2件のリモートコンテンツ遮断バイパス（FuncIRI CSS エスケープ、SVG SMIL アニメーション）、末尾ドット FQDN による `is_local_url()` バイパス、SQL アドレス帳でのコンタクトグループ所属へのクロスユーザーアクセス。リリース投稿に CVE 番号の記載はなく、悪用報告もない。

**Why it matters:** Roundcube は自ホスト・共用ホスティングメールの大部分を支える webmail 層であり、ゼロクリックとは攻撃にメール送信以外何も要らないという意味だ。両ブランチ同時リリースのため、全本番インストール——LTS であれ現行であれ——の移行が必要になる。報告者クレジット付き・CVE 無しの開示様式は、NVD ではなくアドバイザリで追跡せよという意味でもある。

[`🔗 roundcube.net: Security updates 1.6.19 and 1.7.4`](https://roundcube.net/news/2026/09/06/security-updates-1.6.19-and-1.7.4) · [`🔗 roundcube/roundcubemail releases`](https://github.com/roundcube/roundcubemail/releases)

---

## 31. rclone `serve s3 --auth-proxy` はフェイルオープン——SigV4 検証が空のシークレットを受け入れる（CVSS 9.8、アドバイザリに PoC 同梱）

- **Velocity:** ▮ steady
- **Source:** GitHub アドバイザリ GHSA-xwwr-4h3p-r22c · 9月4日公表 · ≤ 1.68.0 に影響、1.75.1 で修正
- **Tags:** `rclone` `s3` `authentication` `cwe-306` `advisory`

`rclone serve s3` を `--auth-proxy` 付き・`--auth-key` なしで実行すると認証がフェイルオープンする：`authPairMiddleware` はクライアント指定の `Authorization` ヘッダから access key ID を取り、デフォルトで空文字列の `ws.s3Secret` と対で登録する——空文字列は正当な HMAC 鍵として機能する。誰でも自分で捏造した access key ID に対し SigV4 署名を手計算で作り、検証を通過できる。アドバイザリには動作する PoC が含まれる（「事前の認証情報 zero で、完全に認証された成功のバケット一覧取得」）。auth-proxy スクリプトも攻撃者と利用者を区別できない——key ID がユーザー名とパスワードの両方として届くためだ。CVSS 3.1 9.8（CWE-287/CWE-306）。公表時点で CVE 未採番。最小修正はこの構成での起動拒否で、アドバイザリは残存する設計上の限界も明示する：共有静的 auth key のままでは、per-identity シークレットにはプロトコル変更が必要。

**Why it matters:** rclone はバックアップ・データパイプラインの隅々にあり、これは教科書的なフェイルオープンのデフォルトだ——未修正のまま `serve s3 --auth-proxy` を動かしていれば、バックエンドは事実上全世界に読み可能だった。評価されるべき点：アドバイザリは PoC、影響/修正マトリクス、残存限界を同梱しており、まさに開示のあるべき姿だ。

[`🔗 GHSA-xwwr-4h3p-r22c`](https://github.com/rclone/rclone/security/advisories/GHSA-xwwr-4h3p-r22c) · [`🔗 rclone/rclone`](https://github.com/rclone/rclone)

---

## 32. Ladybird の8月レポート——新スタイルエンジンが「エンジン性能への本気の取り組み」を牽引

- **Velocity:** ▮ steady
- **Source:** Hacker News · 192+ pts · 46 コメント · 約2日前 · ladybird.org 月次レポート（8月31日）
- **Tags:** `ladybird` `browser` `web-engine` `performance`

Ladybird の月次アップデートは、CSS scroll snap、JavaScript デバッグ、セッション復元に加え、プロジェクトが「新しいスタイルエンジンによるエンジン性能への本気の取り組み」と呼ぶものをハイライトする。投稿は動画版（Twitch/YouTube）でも公開済み。プロジェクトの掲げる目標——2026年の Linux・macOS 向け初の Alpha リリース——は変わっていない。

**Why it matters:** Chromium/WebKit/Gecko の三極の外に立つ唯一のブラウザエンジンが、初のアルファへ着実に前進し続けており、性能面の work（機能の追い付けだけでなく）こそがアルファを日常ユーザーに信頼可能にするものだ。留保：これはプロジェクト自身の自己報告進捗であり、月次形式が与えるのは機能のヘッドラインとデモであって独立ベンチマークではない。「本気の取り組み」は、アルファ到来時に再検証すべき主張として扱うべきだ。

[`🔗 ladybird.org: This Month in Ladybird`](https://ladybird.org/) · [`🔗 Hacker News ディスカッション`](https://news.ycombinator.com/item?id=49571096)

---

## 33. 「Verify Before You Distill」——プロンプト単位で実測の教師信頼性を蒸留のゲートにする

- **Velocity:** ▮ steady
- **Source:** Hugging Face Daily Papers（9月8日掲載、4 票） · arXiv 2609.02998（9月2日）
- **Tags:** `distillation` `on-policy` `rlvr` `training` `arxiv`

TGOPD（Teacher-Gated On-Policy Distillation）は OPD の実在する失敗モードを狙う：逆 KL は mode-seeking なので、自信過剰に間違った教師は強いが誤解を招く token レベル勾配を生み、エントロピのような分布シグナルは正確さではなく不確実性を測る。解法はプロンプト毎のゲートだ：小さな教師プローブ群を検証器で採点し、各プロンプトを dense OPD 監督（合格）か verifier-grounded GRPO（不合格）へルーティングする。主張：4B・35B の両スケールの全6単一ドメイン設定で vanilla OPD に勝利、マルチドメイン訓練で7ベンチマーク平均が上回り、非同期 OPD では教師ノード GPU 利用率が実測 4B 実行で 9.8% から 78.9% へ上昇。

**Why it matters:** 先週の「Does On-Policy Distillation Really Distill?」の知見（教師ノイズは教師スケールと共に増大する）を実際のメカニズムへ落とし込んだものだ——レバーはスケールではなく検証だ。留保は2つ添えたまま：アブストラクトページには限界セクションが現れない（採用前に17ページの全文を確認）、そして4票という投票数は結果に対して関心が遅れていることの表れ——これは合意ではなく初期シグナルだ。

[`🔗 arXiv 2609.02998`](https://arxiv.org/abs/2609.02998) · [`🔗 Hugging Face 論文ページ`](https://huggingface.co/papers/2609.02998)

---

## Metadata

| Field | Value |
|-------|-------|
| Generated | 2026-09-08T12:05:00+08:00 |
| Items | 33 |
| Sources tracked | 24 (Rapid7, Senserva KEV tracker, Internet Archive blog, Hacker News, GitHub Trending, Tailscale blog, securityonline.info, The Hacker News, Hugging Face Daily Papers, arXiv, vLLM blog, OpenAI Help Center, TantoSec, HeroDevs, CodePen docs, Ars Technica, Google DeepMind blog, mcpherrin.ca, mathathonchallenge.com, NVD, jellyfin.org/GitHub releases, virtualizationhowto.com, roundcube.net, ladybird.org) |
| Update schedule | 04:03, 12:03, 20:03 UTC+8 (3x daily) |
| Ranking | Velocity-weighted (recency × engagement acceleration × source authority) |
| License | [CC-BY 4.0](https://creativecommons.org/licenses/by/4.0/) |

---

[Previous day](../2026-09-07/) · [Raw .md](../2026-09-08.md) · [Archive](../../archive/)
