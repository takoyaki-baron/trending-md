---
date: 2026-09-22
updated: 2026-09-22T20:15:00+08:00
schedule: 04:03, 12:03, 20:03 UTC+8
sources: 43
license: CC-BY-4.0
---

## 1. Grok 4.7 リリース — xAI 自身のベンチマーク表で Fable 5.1 Max が5部門勝利

- **Velocity:** ▮▮▮ trending
- **Source:** Hacker News · 364+ pts · 306 comments · ~4h ago (~23:50 UTC+8)
- **Tags:** `model-release` `xai` `benchmarks` `coding-agents`

xAI は 9 月 21 日、Grok 4.7 を「コーディングとナレッジワークで最も高性能なモデル」として
リリースした：価格は 4.6 と同一（100 万トークンあたり入力 $2 / 出力 $6、「fast」版は 2 倍速・
2 倍価格）、500k コンテキスト、複数時間に及ぶタスクへの長時間 RL トレーニング。自己申告の
ベンチマーク表では EEBench（64.0%）と Harvey Legal Agent（19.6%）で首位、DeepSWE v1.1 は
71.0% だが「high effort」のアスタリスク付きで、effort 設定は行ごとに異なる。重要なのは同じ
ページ上のこと実：xAI 自身の表で、Fable 5.1 Max が CursorBench（51.8% vs 46.3%）、
Terminal-Bench（57.9% vs 38.0%）、HealthBench、AA Briefcase、GDPval Elo（1735 vs 1695）の
すべてで勝っている——主張はコストパフォーマンスであって首位ではない。Artificial Analysis の
独立測定は Intelligence Index 46（202 中 16 位）、「notably slow」（39.3 tok/s、151 位）、
出力は非常に冗長（評価で 2 億 4,000 万出力トークン、中央値は 9,400 万）。

**Why it matters:** 「正直な見出し」パターンの逆——ベンダーページは「Grok 4.7 がコーディング
ベンチマークで首位」的な要約より慎重で、独立測定はその控えめな主張すら裏付けない。AA 指数を
除く全ベンチマークは自己申告。安全性の数値（「危険なデュアルユースプロンプトの通過は 3.3%
のみ」）は内部評価のみ。パラメータ数は非公開。

[`🔗 x.ai 発表`](https://x.ai/news/grok-4-7) · [`🔗 Artificial Analysis`](https://artificialanalysis.ai/models/grok-4-7) · [`🔗 HN 議論`](https://news.ycombinator.com/item?id=49788838)

---

## 2. Amazon が Meta の Muse 買物エージェントをボット壁でブロック — 認証情報を巡り主張が対立

- **Velocity:** ▮▮▮ trending
- **Source:** Hacker News · 123+ pts · 117 comments · ~3h ago (~01:00 UTC+8)
- **Tags:** `agentic-commerce` `amazon` `meta` `bot-detection` `platform-policy`

Amazon は、今月初めに米国で公開された Meta の Muse エージェント（買物・支払い・メール読取・
人間さながらのブラウジングが可能）による amazon.com での利用をブロックし始めた。The Register
の実測が仕組みを確認：椅子を買わせようとしたところ、Muse は検索ページに到達する前に「自動化
ブラウザを直接拒否するアンチボットの壁」に阻まれたと報告した。Amazon は記録に残る形で、Meta は
「一方的に無理やり進入しようとした」、認可を申請したことは一度もなく、Muse は「顧客の認証情報を
取得・保存しているように見える」と主張。Meta は「Muse はユーザーのパスワードや支払い手段を見る
ことはできない」と反論。Amazon は 2023 年から第三者買物エージェント（Google、OpenAI、
Perplexity を含む）をブロックしてきたとし、一方で自社の Alexa for Shopping や Buy for Me を
運営している。

**Why it matters:** 認証情報を巡る主張はどちらも未検証の対立する断言——そのままの形で引用すべき。
構造的な問題はすでに進行形だ：最近の第9巡回区控訴裁判決は、（エージェント企業ではなく）ユーザー
がエージェント経由でサイトにアクセスすることは反ハッキング法に違反しないと判断し、この争いを
法廷からボット壁へ移した——そして壁を所有する会社が競合エージェントも所有している。

[`🔗 The Register（実測）`](https://www.theregister.com/ai-and-ml/2026/09/21/amazon-shows-metas-muse-ai-shopping-agent-the-door/5297777) · [`🔗 GeekWire`](https://www.geekwire.com/2026/amazon-blocks-metas-muse-ai-assistant-in-new-standoff/) · [`🔗 HN 議論`](https://news.ycombinator.com/item?id=49789982)

---

## 3. Cloudflare Python Workers が GA — FastAPI/Django/Flask をネイティブ実行、asyncpg は実 TCP ソケット経由

- **Velocity:** ▮▮▮ trending
- **Source:** Cloudflare blog / Hacker News · 130+ pts · 17 comments · ~7h ago (~21:38 UTC+8)
- **Tags:** `cloudflare` `python` `serverless` `wasm`

Cloudflare は Python Workers の一般提供（GA）を宣言し、2 年間のベータを経て Python を Workers
プラットフォームで「ファーストクラスの完全サポート対象言語」と位置づけた。実行環境は Pyodide
経由の Wasm コンパイル済み CPython。プラットフォームバインディング（R2、D1、Durable Objects、
Queues、Workflows、Workers AI、Hyperdrive）はすべて JS グルーコード不要。FastAPI/Django/Flask
は `workers.asgi`/`workers.wsgi` で動作。目新しいのはソケットブリッジで、Python の socket シス
テムコール——従来は「必ず失敗するスタブ」——を実際の外向き TCP に変換する。これにより
`asyncpg`/`aiomysql` が Hyperdrive 経由で動く。`openai`、`langchain`、`mcp` はネイティブ実行。
PEP 783（PyEmscripten プラットフォーム）は受理済み。

**Why it matters:** GA そのものがニュース——Python のチームは Workers を実験ではなくサポート
対象プラットフォームとして扱える。投稿自身の注意書き：ネイティブ C/C++/Rust 拡張を含むパッケージ
は Wasm へのクロスコンパイルが必要、PyEmscripten wheel のエコシステム採用は進行中、Python
バージョンや価格の詳細は未公開。

[`🔗 Cloudflare ブログ`](https://blog.cloudflare.com/python-workers-ga/) · [`🔗 HN 議論`](https://news.ycombinator.com/item?id=49787142)

---

## 4. Linux カーネルのローカル root 脆弱性4件が公開 PoC 付きで披露 — 「AI 支援」のバグ発見によるもの

- **Velocity:** ▮ rising
- **Source:** oss-security / securityonline.info · 9月18日披露、PoC 公開済み
- **Tags:** `linux-kernel` `lpe` `exploit` `security`

研究者 Asim Manizada が、linux-distros の embargo 解除後の 9 月 18 日に oss-security で、実動する
公開エクスプロイト付きのカーネル LPE 4件を披露した。本人によれば「カーネルのメモリレイアウトに
ついて推論する AI 支援ハーネス」による発見：CVE-2026-80844「DirtyAH6」（xfrm/IPv6 AH、最大
4,064 バイトの OOB memmove）、CVE-2026-81000「TUNderflow」（TUN、SKB_MAX_HEAD アンダー
フロー）、CVE-2026-68121「PPPoEject」（PPPoE の stale skb ポインタ UAF）、CVE-2026-74469
「DiagSpill」（SCTP/sctp_diag の 16 ビットカウンタ周回で netlink バッファ後方約 8 MiB に溢れ出す）。
バグの古さは 10〜21 年。すべて安定版カーネルで修正済み（5.10.270〜7.2.4）。今朝の NVD 確認：
末尾 3 件は 7.8/7.8/8.8——いずれも CNA 割り当ての「Secondary」で、NVD ステータスは Received の
まま Analyzed 未了。CVE-2026-80844 は**スコア未公表**。

**Why it matters:** DiagSpill はユーザー名前空間も CAP_NET_ADMIN も不要で、研究者は
AppArmor/SELinux がテストで PoC を阻止できなかったと報告——ただし本人の留保も併記すべき：
DirtyAH6 のリモート root は「理論上可能だが極めて困難に見える」、DiagSpill のリモート経路は
非デフォルトの SCTP 設定が必要（「完全なリモート root への経路は見えない」）、野良悪用の報告は
なし。検索アグリゲータが挙げていた「Red Hat RHSB-2026-011」公告は存在を確認できなかった——
引用しないこと。

[`🔗 oss-security 披露`](https://www.openwall.com/lists/oss-security/2026/09/18/3) · [`🔗 securityonline.info`](https://securityonline.info/linux-kernel-lpe-quartet-disclosed/) · [`🔗 NVD: CVE-2026-81000`](https://nvd.nist.gov/vuln/detail/CVE-2026-81000)

---

## 5. Raspberry Pi が Compute Module 5 を出荷時 RAM 容量にロック — 不正防止の副産物として修理可能性が低下

- **Velocity:** ▮ rising
- **Source:** Hacker News · 188+ pts · 152 comments · ~7h ago (~20:54 UTC+8)
- **Tags:** `raspberry-pi` `hardware` `sdram`

Raspberry Pi のエンジニアが公式フォーラムスレッドで、CM5 世代のデバイスが出荷時の RAM 容量に
ロックされたことを確認：「デバイスを元の RAM 容量にロックすることで商用インセンティブを排除し
た」——低容量モジュールを購入し大容量チップに載せ替えて高容量品として転売する行為が後を絶た
なかったため。エンジニア timg236 は 2 つ目の理由も追加：AI 由来のメモリ市場の密度により流通する
SDRAM SKU が大幅に増え、タイミングパラメータがデバイス本体に書き込まれるようになった——同じ
容量のチップ交換でさえランダムクラッシュの「非ゼロの確率」があるという。

**Why it matters:** 2 つの動機、1 つの目に見える帰結：不正防止策とサプライチェーンの現実主義が、
メイカーコミュニティが改造の土台にしてきたボードファミリーの修理可能性・アップグレード可能性の
低下として着地した。情報源はエンジニア自身のフォーラム投稿でありプレス発表ではない——それが
逆に信頼性の根拠になっている。

[`🔗 Raspberry Pi フォーラム（PhilE）`](https://forums.raspberrypi.com/viewtopic.php?p=2380887#p2380888) · [`🔗 HN 議論`](https://news.ycombinator.com/item?id=49786689)

---

## 6. Fable 5「8月に中央値の思考量が減少」— 推論コスト圧縮を測った一人のユーザーの記録

- **Velocity:** ▮ rising
- **Source:** Hacker News · 254+ pts · 169 comments · ~4h ago (~00:13 UTC+8)
- **Tags:** `anthropic` `inference` `reasoning`

広く拡散されたスレッドは、Fable 5 の思考トークン中央値が 8 月に急落したと報告している——時期は
モデルがサブスクリプションプランに恒久的に開放されたタイミングと一致。作者いわく 5 種類の測定
方法のいずれでも、ほとんどの呼び出しが xhigh/max effort でもほぼ、あるいはまったく思考してい
いなかったという。

**Why it matters:** 留保こそがこの項目の本体：これは明示的に一人のユーザーの自己測定（「これは
私自身の経験」）であり、ベンダーの確認はなく、スレッド以外の一次文書も独立検証されていない。
反響を呼んだのは、このフィードが一か月間記録してきたパターン——能力維持の主張と推論経済性の
緊張——と合致するからだが、これはデータポイントであって発見ではない。

[`🔗 X スレッド`](https://x.com/Lon/status/2101793422487204027) · [`🔗 HN 議論`](https://news.ycombinator.com/item?id=49789224)

---

## 7. Qwen が RecreationWorld をオープンソース化 — エージェントは外部から動作中アプリを再構築し、挙動で採点される

- **Velocity:** ▮ rising
- **Source:** arXiv / GitHub · 9月21日 cs.CL リストに掲載
- **Tags:** `computer-use` `benchmark` `agents` `qwen` `rl-environments`

Qwen/アリババの 32 名の著者チームが RecreationWorld を公開（arXiv は 9 月 18 日提出、21 日掲載）：
Ubuntu/macOS/Windows/Android/Web にまたがる 250 の検証可能な環境で、エージェントは動作中の
参照アプリケーションを**再現**しなければならない——GUI を通じてリバースエンジニアリングし、
コードで再実装する——そしてソースコードの類似性ではなく、プログラム的・視覚的なアサーションに
よる挙動の一致で採点される。MIT ライセンス、`uv run rb run` ハーネス付き。こうして生成された
軌跡は転移する：5 つの分布外コーディング・ハイブリッド CUA ベンチマークで改善。

**Why it matters:** 抄録自身の見出し数字が謙虚さの条項になっている：「GPT-6 Astra は全体 58.1% で
首位だが、全プログラム的テストを通過したのはタスクの 2.8% のみ」——エージェントは静的な UI 構造
の再現は得意でも、実際の計算挙動の再現ははるかに弱く、生成アプリは「より小さく、よりモノリシック」
になる。リポジトリ自身の表ではフロンティアモデルの評価コストは約 $115.80/タスク。リポジトリは
公開数日（コミット 3 件）——数字は初回出荷時のもので、確定値ではない。

[`🔗 arXiv:2609.22000`](https://arxiv.org/abs/2609.22000) · [`🔗 GitHub: QwenLM/RecreationWorld`](https://github.com/QwenLM/RecreationWorld)

---

## 8. npm `mathmain`：特定の方程式を解かないと復号されない暗号化 RAT ローダー

- **Velocity:** ▮ rising
- **Source:** SafeDep / Hacker News · 53+ pts · 8 comments · ~2h ago (~02:33 UTC+8)、上昇中
- **Tags:** `npm` `supply-chain` `malware` `c2`

SafeDep の分析（9 月 17 日開始、9 月 21 日に復号を再現）：npm パッケージ `mathmain`（`mathjs`
に隣接するタイポスクアット）と姉妹パッケージ `mathsbase`、`math-universe` は、npm ビルドにのみ
AES-256-GCM 暗号化ローダーを同梱している——リンク先の GitHub リポジトリにはローダーはない。
ペイロードは `lusolve()` が特定の行列（パスカル行列の LU 分解）で呼ばれたときにのみ復号される。
復号後のステージにはホスト偵察、シェル実行、Base Sepolia スマートコントラクトの読み取り、そして
`fraction.js`——10 秒ごとに Slack の `conversations.history` をポーリングし、オペレーターからの
メッセージをシェルコマンドとして実行する C2 エージェント——が含まれる。JFrog も方程式トリガーを独立に
報告。SHA-256 の IOC は公開済み。

**Why it matters:** 先週の `indexed-btree` タイポスクアットとは別物（仕組みもパッケージも違う）——
今回は実行を数学的トリガーでゲートし、サンドボックスでの爆発回避を狙ったものと見られる。SafeDep
自身の留保：トリガー付きでソルバーを呼ぶ公開コードは存在しない（攻撃側の呼び出し元は不明）、
被害者の実行Evidence もなし、npm のダウンロード数は信頼性がない（週 60.5 万は水増し。レジストリ
は 9 月 17 日に全体ゼロを報告）。

[`🔗 SafeDep 分析`](https://safedep.io/mathmain-encrypted-loader/) · [`🔗 HN 議論`](https://news.ycombinator.com/item?id=49791378)

---

## 9. NVIDIA が NemotronLabs VoiceChat 11B をオープンソース化 — （シミュレーションの）ツール呼び出し付き、単一モデルの全二重音声対話

- **Velocity:** ▮ rising
- **Source:** arXiv / Hugging Face · 論文は 9月21日 cs.CL に掲載
- **Tags:** `speech-to-speech` `full-duplex` `nvidia` `open-weights` `voice-agents`

NVIDIA の約 49 名の VoiceChat チームが、NemotronLabs VoiceChat 11B（重みは今夏早くに公開済み）
の論文を公表：ハイブリッド Mamba/Transformer で ASR→LLM→TTS のカスケードを単一モデルに置き
換える——Fast Conformer 0.6B エンコーダ + Nemotron Nano v2 9B + TTS デコーダ——約 55 万時間の
トレーニング、ターンテイク約 448 ms、ツール呼び出し対応としては初のオープンな全二重音声モデル
と自称。OpenMDW v1.1 ライセンス、vLLM で A100〜B200 の 1 枚で動作。VoiceBench と
Full-Duplex-Bench でオープン全二重モデル中 2 位。

**Why it matters:** 抄録が弱点を先回りして認めている：「引数の正確性とエンドツーエンドのツール実行
は改善余地が大きい」——モデルカード自身の数値はツール引数の正確率 42.2%、エンドツーエンド
Pass@1 33%。オフラインの関数呼び出しはシミュレーション（事前作成の JSON で実行なし）。システム
プロンプトとツール応答は ASCII のみ。「ツール呼び出し対応として初のオープン全二重」という枠組み
は本物だが、NVIDIA 自身の数値ではツール呼び出し自体は本番級ではない。

[`🔗 arXiv:2609.21967`](https://arxiv.org/abs/2609.21967) · [`🔗 Hugging Face モデルカード`](https://huggingface.co/nvidia/NVIDIA-NemotronLabs-VoiceChat-11B)

---

## 10. WordPress「Click2Shell」：テーマを強制インストールし PHP を実行する CSRF — スコアは 4.3、見出しは RCE

- **Velocity:** ▮ rising
- **Source:** BleepingComputer / WPScan · 7.1.1 で修正済み（9月17日）
- **Tags:** `wordpress` `csrf` `rce` `security`

Paulos Yibelo が披露したチェーン：細工されたリンクによりログイン中の WordPress 管理者が、攻撃者が
選んだ WordPress.org テーマを黙って強制インストールさせられ（テーマ slug を jQuery セレクタに
注入）、その後カスタマイザープレビューがテーマが無効のままでもテーマの PHP を実行する。管理者
権限の被害者と、配信のためのフィッシングまたはチェーン XSS が必要。`DISALLOW_FILE_MODS` が
あれば阻止できる。WordPress 7.1.1 で slug のエスケープにより修正され、4.8 までの全ブランチにバックポート
済み。CVE 番号なし（BleepingComputer と WPScan の記録を双方確認）。WPVDB ID 2624e094。

**Why it matters:** 公式 CVSS は**4.3（中）**——採点対象はコアの CSRF コンポーネントのみ——一方
で報道の見出しは「pre-auth RCE」。この乖離こそが教訓：恐ろしい枠組みは研究者のチェーンであって
どの採点者のものでもなく、野良悪用の報告もない。pwn.ai の以前の `/blog/xss2shell`
（CVE-2026-64638、8月6日修正）とは別のチェーン——混同しないこと。

[`🔗 BleepingComputer`](https://www.bleepingcomputer.com/news/security/wordpress-click2shell-flaw-lets-hackers-execute-php-on-the-server/) · [`🔗 WPScan 記録`](https://wpscan.com/vulnerability/2624e094-6c88-43b4-812f-26444994737d/)

---

## 11. アリババが open-code-review をオープンソース化 — 内製 AI レビュー CLI が10日で10リリース、スター 39k 超え

- **Velocity:** ▮ rising
- **Source:** GitHub Trending · 39.1k stars · v1.12.8 を 9月21日リリース
- **Tags:** `code-review` `agents` `cli` `alibaba`

アリババは、内部で数万人の開発者が 2 年間使ってきたというハイブリッドコードレビュー CLI を
オープンソース化した：Git diff を読み、ファイルをサブエージェントのレビュー単位にまとめ、決定論的
ルール（NPE、スレッド安全性、XSS、SQL インジェクション）とツールを使う LLM エージェントを組み
合わせて行レベルのコメントを出す。OpenAI/Anthropic 互換、npm インストール可能、Claude Code・
Codex・Cursor・GitHub Actions・Gerrit と統合。現在の週 +15.5k スターの急上昇はリリース駆動：
10 日で 10 リリース（v1.11.9 → v1.12.8。昨日公開、F# ルールと依存/ビルドディレクトリの既定除外を
追加）であって、6 月の HN の瞬間（284 pts）ではない。

**Why it matters:** README 自身のベンチマークがトレードオフを認めている：自己申告の AACR-Bench で
はリコールが **Claude Code などの汎用エージェントより低い**——「ノイズより精度を優先する意図的な
トレードオフ」とされる。トークン効率の主張は彼ら自身のベンチマーク画像に基づく。形として注目すべき
は、「決定論的ルール + エージェント」のハイブリッドが純 LLM レビューに迫りつつあること。

[`🔗 GitHub リポジトリ`](https://github.com/alibaba/open-code-review) · [`🔗 Releases`](https://github.com/alibaba/open-code-review/releases)

---

## 12. Heretic がプロジェクトサイトを公開し 2 回目の HN デー — 安全アラインメント自動除去、スター 32k

- **Velocity:** ▮ rising
- **Source:** Hacker News · 196+ pts · 83 comments · ~16h ago (~12:35 UTC+8)
- **Tags:** `abliteration` `llm-safety` `open-source` `dual-use`

Heretic（Philipp Emanuel Weidmann、AGPL-3.0）——方向性アブレーションによりオープンウェイト
モデルの安全トレーニングを自動で剥がすツール。Optuna TPE オプティマイザで拒否数と KL ダイバー
ジェンスを共同最小化し、ファインチューニングデータ不要——がランディングページ
（heretic-project.org）を公開し、HN フロントページに再浮上した（リポジトリ投稿は 2025 年 11 月に
745 ポイント）。スター 32.1k、Hugging Face には 5,000 以上のコミュニティ消融モデル、RTX 3090 で
約 20〜30 分：`pip install -U heretic-llm && heretic Qwen/Qwen3.5-4B`。自己申告の gemma-3-12b
結果：拒否 3/100、KL 0.16（手動アブリテレーションは 0.45〜1.04）。

**Why it matters:** 設計上のデュアルユースであり、ランディングページに利用上の警告は一切ない。
作者自身の留保はリポジトリにある：「メトリクスは人間の評価の代わりにならない」、ベンチマーク数値
はプラットフォーム依存、純状態空間アーキテクチャは未対応。安全議論が軽視しがちなのは分布の現実
——5,000 の消融モデルが `pip install` 一つで手の届く場所にあるという事実だ。

[`🔗 heretic-project.org`](https://heretic-project.org/) · [`🔗 GitHub: p-e-w/heretic`](https://github.com/p-e-w/heretic) · [`🔗 HN 議論`](https://news.ycombinator.com/item?id=49783101)

---

## 13. Zyxel GS1900 スイッチの RCE（CVE-2026-7273）が CISA KEV に掲載 — 修正から約 3 か月後に悪用を確認

- **Velocity:** ▮ steady
- **Source:** CISA KEV · 9月21日追加 · CVSS 8.8（CNA 割り当て、NVD Deferred）
- **Tags:** `zyxel` `kev` `rce` `network-switch` `security`

CISA は 9 月 21 日、CVE-2026-7273 を KEV カタログに追加した——今朝時点で最新のエントリ：Zyxel
GS1900 シリーズスイッチの CGI プログラムにおけるスタックバッファオーバーフローで、認証されていない
LAN 内攻撃者が細工した HTTP リクエストで OS コマンドを実行できる。修正ファームウェアは型番ごとに
`2.90(XXXX.2)C0`。6 月 16 日公開で、脆弱性サポート期間内のモデルのみパッチ提供、回避策の記載は
なし。

**Why it matters:** お決まりのパターンの再来——パッチは 6 月に存在し、悪用は 9 月に確認、対象は
ファームウェア更新がほとんど行き届かない LAN エッジのスイッチ。採点のニュアンスも持ち帰る価値が
ある：CVSS 8.8 は CNA（Zyxel）割り当てで NVD ステータスは Deferred、しかも Zyxel の公告ページ
自体にはスコアが表示されない——数字は CVE レコードの中にだけ存在する。

[`🔗 Zyxel 公告`](https://www.zyxel.com/global/en/support/security-advisories/zyxel-security-advisory-for-stack-based-buffer-overflow-vulnerability-in-gs1900-series-switches-06-16-2026) · [`🔗 CISA KEV カタログ`](https://www.cisa.gov/known-exploited-vulnerabilities-catalog)

---

## 14. Kimi K3 が Amazon Bedrock で GA — 中国メディアが中国オープンウェイトモデル初の北米クラウド収益配分契約と確認

- **Velocity:** ▮ steady
- **Source:** AWS What's New（9月18日）/ 毎日経済新聞（9月21日）
- **Tags:** `kimi` `moonshot-ai` `amazon-bedrock` `chinese-ai` `open-weights`

AWS は 9 月 18 日、Moonshot AI の Kimi K3 を Amazon Bedrock で一般提供開始した：2.8 兆パラメータの
オープンウェイトモデルで、ネイティブな視覚能力、100 万トークンのコンテキストウィンドウ、そして
——オープンウェイトモデルとして Bedrock 初——明示的プロンプトキャッシュに対応。Moonshot は
Kimi K2 から約 2.5 倍のスケーリング効率向上を報告。9 月 21 日、毎日経済新聞が Moonshot の確認を
引用し、これは中国モデルとして初の「北米クラウド収益配分」の取り決めだと報じた——8 月以来噂され
てきたあの合意である。

**Why it matters:** 流通のマイルストーンは具体的だ：中国のフロンティア規模のオープンウェイトモデル
が、AWS の標準エンタープライズ棚に並んだ。収益配分の枠組みは本物と確認されたが、**条件は一切
非公開**——比率なし、名前の出た幹部もなし、AWS 側の発表は収益にまったく触れていない。取引は
報じても、取引の経済性は報じられない。

[`🔗 AWS What's New`](https://aws.amazon.com/about-aws/whats-new/2026/09/moonshot-ai-kimi-k3-on-amazon-bedrock/) · [`🔗 毎日経済新聞`](https://www.mrjjxw.com/articles/2026-09-21/4587773.html)

---

## 15. アムネスティの MVT が v3 に到達 — Pegasus 時代のスパイウェアフォレンジックツールが出力形式を書き換え

- **Velocity:** ▮ steady
- **Source:** GitHub · 13.5k stars · v3 ブランチ統合済み
- **Tags:** `forensics` `spyware` `security-tools` `amnesty`

2021 年のペガサス・プロジェクトから生まれた Mobile Verification Toolkit が v3 ブランチを統合した：
出力形式の破壊的変更（issue #757：「出力形式を変更し、警告に low/medium/high の 3 段階を追加」）、
新しいプラグインパッケージシステム、シェル補完、そして「新しいスパイウェアに対応し続ける」という
用途に合わせた CalVer への移行。MVT の出力を消費するスクリプトやフォークは移行が必要。

**Why it matters:** 市民社会のフォレンジックが最も依存するツールが契約を変えた——誰も気づかないと、
下流ツールは静かに壊れる。プロジェクト自身の免責も変わらず：エンドユーザーの自己診断向けではなく、
公開 IOC だけでは「デバイスが『クリーン』と判定するには不十分」。

[`🔗 GitHub: mvt-project/mvt`](https://github.com/mvt-project/mvt) · [`🔗 v3 移行 issue`](https://github.com/mvt-project/mvt/issues/757)

---

## 16. project-nomad：オフラインファーストのナレッジサーバーがスター 37k 超え — Wikipedia・Khan アカデミー・地図・RAG を 1 つの Docker スタックに

- **Velocity:** ▮ steady
- **Source:** GitHub Trending · 37.8k stars · +360/day · v1.35.0-rc.1（9月13日）
- **Tags:** `offline-first` `self-hosted` `rag` `kiwix`

Crosstalk-Solutions の project-nomad は、Docker でオフライン知識・教育サーバーをオーケストレー
トする：Kiwix Wikipedia、Kolibri（Khan アカデミーコンテンツ）、ProtoMaps、CyberChef、さらに
Ollama+Qdrant の RAG アシスタント。v1.35.0-rc.1（9 月 13 日）でローカル画像添付、チャット回答下の
RAG 出典表示、オフライン翻訳を追加。現在は 1 日 +360 スターのペースで推移している。

**Why it matters:** このカテゴリは継続的に実証されている——同じオフラインファーストスタックが、災害
対応、ネットのない教室、プライバシー重視の家庭を支える。README 自身の警告を携えること：この箱は
**認証なし**で、インターネットに公開してはならないと明記されている。AI 機能には RTX 3060+/32GB
級のハードウェアが必要。

[`🔗 GitHub リポジトリ`](https://github.com/Crosstalk-Solutions/project-nomad) · [`🔗 Releases`](https://github.com/Crosstalk-Solutions/project-nomad/releases)

---

## 17. SolarWinds Access Rights Manager：ハードコードキーによる RCE（CVE-2026-28326）— 「リモート」ではなく「隣接ネットワーク」

- **Velocity:** ▮ steady
- **Source:** SolarWinds 公告 / NVD · ARM 2026.2.1 で修正済み（9月17日）
- **Tags:** `solarwinds` `hardcoded-key` `rce` `security`

SolarWinds は Access Rights Manager ≤ 2026.2 の CVE-2026-28326 を修正した：製品に同梱された
**ハードコードされた静的キー**経由の認証不要 RCE（クレジット：Armadin の Kai Huang）。修正版は
ARM 2026.2.1 で、回避策の提供はなし。今朝の NVD 確認：CVSS 8.8、CNA（SolarWinds PSIRT）割り当て
の「Secondary」、ステータスは Awaiting Analysis——しかもベクトルは `AV:A`（隣接ネットワーク）で、
二次報道の「認証不要リモートコード実行」より一段低い。

**Why it matters:** 出荷製品にハードコードされたキーは繰り返し現れている（2 週間前は Issabel の全
インストール同一 JWT キー）。「隣接」のニュアンスは運用上も重要——届くのはサーバーがいるネットワーク
であって、必ずしも任意の場所ではない。悪用はまだ未確認。SolarWinds の実績を考えれば、この「まだ」
には目を光らせる価値がある。

[`🔗 SolarWinds 公告`](https://www.solarwinds.com/trust-center/security-advisories/cve-2026-28326) · [`🔗 NVD: CVE-2026-28326`](https://nvd.nist.gov/vuln/detail/CVE-2026-28326)

---

## 18. ai-memory が再トレンド — git 管理のエージェントメモリサーバー、今回は正確な記述で

- **Velocity:** ▮ steady
- **Source:** GitHub Trending · 7.6k stars · +217/day
- **Tags:** `agent-memory` `mcp` `rust` `cli`

akitaonrails の ai-memory——MCP と HTTP を公開する単一バイナリの Rust プログラム——は、ライフ
サイクルフックでエージェントセッションを git 管理の markdown wiki に取り込み、SQLite FTS5
インデックスを付ける。既定パスでは LLM 呼び出しゼロ。約 20 のエージェント CLI（Claude Code、
Codex、Cursor、Gemini CLI など）に対応。2.0 移行ガイドと OKF v0.2 サポートが最近の更新。現在
1 日 +217 スターだが、新しい HN やローンチのイベントは見つけられなかった——これは持続的な勢いで
あってスパイクではない。

**Why it matters:** これはこのフィードが以前訂正したリポジトリである（誤った帰属が物語を膨らませて
いた）。上記が訂正済みの記述だ。エージェント CLI 向けの永続的で検査可能なメモリというカテゴリには
絶えず挑戦が集まり、既定パスの LLM 呼び出しゼロが注目に値する差別化ポイント。README の注意書き：
Windows サポートは実験的、クイックスタートの Docker は認証なし（ループバック限定）、1 つのデータ
ディレクトリに 1 サーバーのみ。

[`🔗 GitHub リポジトリ`](https://github.com/akitaonrails/ai-memory) · [`🔗 GitHub Trending`](https://github.com/trending?since=daily)

---

## 19. humanizer がスター 51k 超え — Wikipedia の「AI 文章のサイン」に基づくエージェントスキル

- **Velocity:** ▮ steady
- **Source:** GitHub Trending · 51.0k stars · +3,045/week
- **Tags:** `agent-skills` `writing` `claude-code`

blader の humanizer は、テキストから AI 文章の癖を取り除くプレーン Markdown のエージェント
スキルで、Wikipedia の「Signs of AI writing」ページを土台にしている。v3 の再構築（9 月 6 日）で
35 パターンを強度順に 25 に整理し、「弱いパターンは共存する場合にのみカウントする」ルールを追加。
スキル対応の任意のエージェントで動作し、事実の捏造を明示的に拒否し、散文以外は編集しない。

**Why it matters:** 新しいリリースも新しい HN の瞬間もない——週 +3k は v3 再構築を巡る持続的な勢い
であって新規ローンチではない。我々はその通りに書いている。存在そのものが興味深いデータポイント
だ：今シーズン最も需要のあるエージェントスキルは、機械のテキストを機械らしくなく読ませるスキルで、
その根拠は百科事典自身のスタイルガイドである。

[`🔗 GitHub リポジトリ`](https://github.com/blader/humanizer) · [`🔗 コミット履歴`](https://github.com/blader/humanizer/commits/main)

---

## 20. Xiaomi が MiMo v2.6 をリリース — ベンチマーク表のないローンチページの数時間後、数値は Hugging Face に到着

- **Velocity:** ▮▮▮ trending
- **Source:** Hacker News · 684+ pts · ~8h ago (~04:40 UTC+8)
- **Tags:** `model-release` `xiaomi` `mimo` `open-weights` `chinese-ai`

9 月 17 日に本フィードが取り上げた Xiaomi のライブ RL トレーニングダッシュボードに続き、
同社はその先にあったものを出荷した：MiMo-V2.6 シリーズの一挙公開「3 つの新モデル」——
**MiMo-V2.6-Pro**（フラッグシップ推論、長時間タスクとセキュリティワーク向け）、
**MiMo-V2.6-Flash**（高頻度のオフィスワークロード向け）、**MiMo-V2.6-Pro-UltraSpeed**
（最大 20 倍の出力速度を謳い、レイテンシ敏感な本番サービング向け）。価格は攻撃的：Pro は
入力 ¥3/100 万トークン（キャッシュヒット ¥0.025）、出力 ¥6。Flash は ¥1/¥0.02/¥2。
UltraSpeed は ¥0.25/¥30/¥60。提供は API、MiMo Chat/Desktop、そして月額 ¥14.9 の「MiMo
Claw」エージェントバンドル。V2.5 シリーズは「近日終了」の印付き。

**2026-09-22 12:51 更新（act pass）：** ローンチページは*現在も*全 V2.6 モデルについて
ベンチマークスコア・パラメータ数・コンテキスト長を一切公表していない（本 run で一次確認）
——しかし数値は約 8 時間以内に別の場所に到着した。Hugging Face のモデルカード（MIT ライ
センス、`-RL` 接尾辞付きの重み公開）は Xiaomi 自らのページが欠いているスペックを載せてい
る：Pro は 1.02T 総/42B アクティブのスパース MoE、1M コンテキスト。Flash は 309B/15B、
これも 1M。カードの自己申告スコアは称賛というより混合だ：DeepSWE v1.1 は **71.9**（Pro）/
**67.9**（Flash）——見守られたダッシュボードでの V2.5-Pro の 19% からは実質的な跳躍——
一方 Terminal Bench 4.0 は **34.9/28.8**、ExploitGym は **17.8/6.0**。HN スレッドの独立文脈
では TB4.0 の 34.9 は GPT-6 Astra 59.6、Claude Fable 5.1 55.1、Claude Opus 5 49.0 と並べら
れる（投稿者表、未検証）；Artificial Analysis は Pro を独立に **Intelligence Index 46
（v4.3.2）——オープンウェイト大型クラスで 1 位**と測定、Grok 4.7 と同値——価格は
$0.435/$0.87/100 万トークン、125 tok/s。

**Why it matters:** 注意書きは動いたが消えてはない：Xiaomi は数値を公表した——ただし宣伝
しているページではなく、そして見栄えの良い行（TB4.0、ExploitGym）と一緒に見栄えの悪い行
も公表していること自体が一つの較正シグナルだ。このリリースを再評価する：AA 指数ではほぼ
Grok-4.7 クラスの極めて安いオープンウェイト MoE だが、独立の agentic 表では明確に中位——
ローンチページの V2.5 比較が暗示することとは裏腹に、Opus クラスではない。

[`🔗 mimo.mi.com ローンチページ`](https://mimo.mi.com/) · [`🔗 HN スレッド`](https://news.ycombinator.com/item?id=49792730) · [`🔗 HF: MiMo-V2.6-Pro-RL`](https://huggingface.co/XiaomiMiMo/MiMo-V2.6-Pro-RL) · [`🔗 Artificial Analysis`](https://artificialanalysis.ai/models/mimo-v2-6-pro)

[`🔗 mimo.mi.com ローンチページ`](https://mimo.mi.com/) · [`🔗 HN 議論`](https://news.ycombinator.com/item?id=49792730)

---

## 21. Bryan Cantrill「Sun の何が間違っていたか」— 戦略は優れていた、運営には飽きていた、そして死んだ

- **Velocity:** ▮▮▮ trending
- **Source:** Hacker News · 533+ pts · 311 comments · ~14h ago (~22:30 UTC+8)
- **Tags:** `tech-history` `sun-microsystems` `engineering-culture` `oxide`

Cantrill（1998–2010 年に Sun のエンジニア、現 Oxide 共同創業者）は、OxCon で若手エンジニア
から「Sun は結局何を誤ったのか」と問われ、こう答えた：「Sun はビジネスを運営する仕組みに
飽きていた」。中心となるのは 2006 年のブログ記事「The Sun Doesn't Shine on Me」だ。筆者は
急成長中のスタートアップ（Joyent）で、OpenSolaris 動作の Sun ハードウェアを*買いたい*のに
電話は返ってこない——一方 Dell は深夜の Web フォームに専属アカウント担当を付け、「全仕事の
95%」を担った。エピローグは短編小説のようだ：Cantrill が Sun を辞めて入ったのがその
スタートアップ Joyent であり、Dell の「Steve」は後に彼と共に Oxide を共同創業した。

**Why it matters:** AI ブームの市場でインフラを届けるすべての人に響く一般化がある：「ビジ
ネスを運営する仕組みに飽きた会社は成功できない——戦略がどれほど優れていても」。Cantrill は
これを 15 年前の自身の HN コメントに anchor し、いまだ撤回していない——熱っぽい発言が時間
とともに*ますます*正しくなった稀な例だ。

[`🔗 bcantrill.dtrace.org`](https://bcantrill.dtrace.org/2026/09/20/what-sun-got-wrong/) · [`🔗 HN 議論`](https://news.ycombinator.com/item?id=49787436)

---

## 22. 「あなたが書いていない文章は読みたくない」— Colin Breck のエッセイが読者反乱の参照テキストに

- **Velocity:** ▮▮▮ trending
- **Source:** Hacker News · 415+ pts · 137 comments · ~6h ago (~07:00 UTC+8)
- **Tags:** `ai-writing` `technical-writing` `engineering-culture` `communication`

Breck（システム/データベースエンジニア、最近 CIDR 論文のサイクルを経験）は、人間の読者の
ために書かれるテキストの*作者*としては AI は失敗するが、ツールとしては本当に有用だと論じる：
ソースコード突き合わせでの主張検証、BibTeX の補完、TikZ 図の作成——4 人の専門レビュアーが
見逃した記法エラーまで発見した。しかし「段落を書かせるのは？ 価値なし。一度もない」。彼が
認める唯一の例外はアブストラクト——「論文で最も機械的で抽象化されたセクション」。核心の
メカニズムはコンテキストの非対称性だ：プロンプトを書いた側は自分で文脈を作ったから流し読み
できるが、読者は全行を読み「機械の内部を覗き込む」しかない。

**Why it matters:** このエッセイはちょうど波の真ん中に着地した——Cynthia Dunlop の調査
（AI 執筆と疑われる記事を開発者の 78% が読むのをやめる）を引用し、Oxide が公開文書に AI
検出器 Pangram を義務化したことに触れ、Cantrill の「LLM で書くことは書き手と読み手の社会
的契約を無効化すること」という一節が拡散されている。実務的な残り物：検証し、編集し、引用
する——ただし代筆はしない。注意：これは意見記事であり、調査数値は二次情報だ。

[`🔗 blog.colinbreck.com`](https://blog.colinbreck.com/i-dont-want-to-read-what-you-didnt-write/) · [`🔗 HN 議論`](https://news.ycombinator.com/item?id=49794330)

---

## 23. 「Watermark ではなく Spymark」— 隠密的 AI コンテンツ追跡への命名介入

- **Velocity:** ▮ rising
- **Source:** Hacker News · 215+ pts · 40 comments · ~5h ago (~07:35 UTC+8)
- **Tags:** `watermarking` `privacy` `synthid` `provenance`

Brandon Thomas（brand.io）は、知らないうちに同意もなく作品を追跡可能にする隠し信号に
「spymark」という名を提案する——「watermark」は目に見える無害な種類のために取っておくと。
集められた証拠：SynthID-O は 512×512 画像に 136 ビットのペイロードをエンコードできる（デー
タベース識別子＋誤り訂正が入る）；音声スキームは 128 ビットのペイロードを隠せ、圧縮や再
エンコードを乗り越える（2018 年の audiowmark は LLM 時代より前）；プリンタの追跡ドットの
先例は 1980 年代に遡る。業界側の反論——spymark は AI 生成コンテンツの識別に役立つ——も
的を外さずそのまま記されている。

**Why it matters:** 記事は自分をフレーミングの介入であって漏えいの開示ではないと誠実に
位置づけている：リスクのシナリオは条件付き（「未来を想像してほしい……」）、デモは明示的
に架空、標準メタデータ（EXIF、ID3）は検査可能なので除外している。精査に耐えるのは構造的
な事実だ：ペイロードはユーザー識別子を*運べ*、洗浄後も生き残り、現在の展開ではその紐付けを
妨げるものは何もない——使う言葉次第で、それが欠陥として登録されるか特徴として登録されるか
が決まる。

[`🔗 brand.io/article/spymarks`](https://brand.io/article/spymarks/) · [`🔗 HN 議論`](https://news.ycombinator.com/item?id=49794615)

---

## 24. M5 Ultra Mac Studio レビュー：1.2 TB/s のユニファイドメモリがローカルエージェント群を退屈にした——褒め言葉として

- **Velocity:** ▮ rising
- **Source:** MacStories / Hacker News · 236+ pts · 235 comments · ~14h ago (~22:20 UTC+8)
- **Tags:** `apple` `local-llm` `hardware` `mac-studio`

Federico Viticci が M5 Ultra Mac Studio をレビュー——初の UltraFusion クアッドダイ設計
（デュアルダイ M5 Max × 2）、80 コア GPU、帯域 819 GB/s → 1.2 TB/s、ユニファイドメモリ
256 GB（512 GB 版は 10 月下旬）。oMLX で Qwen3.8-Flash-Next 4-bit を動かしたローカル AI
の数値：プロンプト処理は M3 Ultra 比 +150%（約 2,733 tok/s）、16K コンテキストで生成約
108 vs 70 tok/s、256K でも 60–85 tok/s、256K の最初のトークンまでの時間は半減して約 102 秒。
並行処理は静かな勝利だ：3 つの並列リクエストで合計 81.5 tok/s（+23%）に達し、M3 Ultra は
わずか 4% しか伸びなかった。

**Why it matters:** 数字より結論が重要だ：Viticci は日々のエージェントスタックを完全に
オンデバイスで動かしている（API コストゼロの 99 日間エージェント研究スタック）。しかも
レビューの注意書きが異様にクリーンだ——32 GB に収まるモデルなら RTX 5090 の生速度がまだ
約 25% 速い、セットアップは一般ユーザーに「決して勧められない」、ハードウェアは数年分の
クラウド契約より高い。レビューに価格の記載なし——すべてを決めるその仕様だけが、印刷されて
いない。

[`🔗 MacStories レビュー`](https://www.macstories.net/stories/m5-ultra-mac-studio-review-the-dream-mac-for-local-ai-agents/) · [`🔗 HN 議論`](https://news.ycombinator.com/item?id=49787313)

---

## 25. Linear が AI コーディング時代に合わせて CI を作り直した — その全数値を書き残した

- **Velocity:** ▮ rising
- **Source:** Linear / Hacker News · 170+ pts · 176 comments · ~9h ago (~03:55 UTC+8)
- **Tags:** `ci-cd` `developer-tools` `ai-coding` `typescript`

Linear の問題は構造的だった：1 月以降エージェントがテストスイートを約 4 倍に増やし、エー
ジェントの反復のたびに CI 待ちが発生していた。再構築の内容：GitHub Actions からより高速な
サードパーティ runner へ（ジョブ平均 −34%、`tsc` −52%）、ネイティブ `tsgo` コンパイラ採用
（週次中央タイプチェック −73%）、ESLint ルールを書き直して lint から TypeScript を完全に
外す（−68%）、checkout をカスタム composite アクション＋永続 git ミラーに置換、
`node_modules` キャッシュ廃止（復元 28 秒 vs 再構築 7.5 秒）、そして最大のシングルウィン
——安全なファイルがモジュールレジストリを共有するオプトインの `isolate: false` Vitest
プロジェクト（月間 runner 費用の約 17%）。純効果：スイートが 4 倍になった*にもかかわらず*
PR 待ちが 6 分超から約 5 分に。対応しなければ今日は約 11 分だった。

**Why it matters:** これは珍しい完全定量の CI エンジニアリングログだ——7 つの小さなチェッ
クをまとめるだけで月 87,000 runner 分、シャード増設が割に合う setup コストの計算、そして
正直なリスク台帳（`isolate: false` が正しさのリスクは最も高く、ファイル単位のオプトインの
まま）。パターンは一般化できる：コードをエージェントが生成するなら、ボトルネックは検証側
に移り、CI チューニングは一等のエンジニアリング規律になる。

[`🔗 linear.app/now`](https://linear.app/now/ci-bottleneck-reworked) · [`🔗 HN 議論`](https://news.ycombinator.com/item?id=49792067)

---

## 26. 数学者たちが独立の諮問グループを結成 — 最初の任務は OpenAI の「100 以上の未解決問題を解決した」成果群

- **Velocity:** ▮ rising
- **Source:** Terry Tao ブログ / HN · 106+ pts · 51 comments · ~18h ago (~18:30 UTC+8)
- **Tags:** `openai` `mathematics` `ai-research` `governance`

数学と人工知能に関する諮問グループ（AGMAI、プリンストン高等研究所に拠点）が 9 月 21 日、
Terence Tao ブログのゲスト投稿で発足した：9 人のメンバー（Gowers、Hairer、De Lellis、
Witten、Vakil、Wood、Tillmann、Srivastava、Charles）、無報酬、「どんな AI 企業からも独立」、
推奨事項は公開、そして明示的に決定権を持たない。発端：OpenAI が外部諮問委員会の設置を求め
てメンバーに接触したが、彼らは代わりに独立グループを作った。最初の任務——OpenAI が内部
モデルの産物と称する「重要な数学的成果の大量バッチ」の公開調整について助言すること。
OpenAI 自身の発表は、そのモデルが「100 以上の長年の未解決問題を解決した」と主張している。

**Why it matters:** 公開調整の問題が制度化された：あるラボが一世紀分の成果を一度に主張する
とき、誰が検証し、どのペースで公開するのか。コメント欄の異論もストーリーの一部だ——Burt
Totaro らは、無報酬の諮問による正当性の貸与が、OpenAI がペースと公開を完全に制御し続ける
事実を覆い隠すのではないかと疑っている。主張された成果自体の検証は、まだ公には始まって
いない。

[`🔗 Terry Tao ブログ（ゲスト投稿）`](https://terrytao.wordpress.com/2026/09/21/advisory-group-on-mathematics-and-artificial-intelligence/) · [`🔗 agmai.org`](https://agmai.org/) · [`🔗 HN 議論`](https://news.ycombinator.com/item?id=49790389)

---

## 27. Tim Dettmers の研究室が「研究の単位はエコシステム」と宣言 — 6 つのリリース、小さな学術研究室に賭ける一手

- **Velocity:** ▮ rising
- **Source:** timdettmers.com / Hacker News · 120+ pts · 60 comments · ~11h ago (~01:30 UTC+8)
- **Tags:** `academic-ai` `open-source` `agents` `quantization`

Dettmers（CMU）は研究室の一括リリースの背後にある論拠を公開した：2 つのオープンソース
プロジェクトと 4 つの論文を一つのエコシステムとして、「GPU 数枚」の上に構築する。構成品：
長時間の無人セッションでリポジトリ（CUDA/Metal カーネル）を自律的に最適化するエージェント
ハーネス；フロンティアラボの deep research システム、Sakana AI、ScientistOne に勝ると称し、
オフラインで動く完全ローカルの自律研究システム；100 万〜1 億トークンのセッションを可能に
しコストを約 50% 削減する自動圧縮「CliffCompaction」（投稿によれば KernelBench で SOTA）；
そして削減したコストを複数ロールアウトに再投資するテスト時スケーリング手法。デモ数値：
Qwen 3.6 35B-A3B を 1.5-bit 量子化で Mac 上で約 450 tok/s；DeepSeek V4.1（550B）を 128 GB
MacBook で自動コンテキスト圧縮により実行。

**Why it matters:** これは主張の文章だ——Dettmers 自身が認めており、注意書きも具体的だ：
自律的なバイオインフォマティクス実行は約 2 時間で有用なヒューリスティック下界を産んだが、
全体としては SOTA に届かなかった；テスト時スケーリングは「まだ日常のエンジニアリングには
実用的でない」；リリースは 1 日遅延した。注視すべきは主力の主張だ：小さな研究室は論文では
なくエコシステムを出荷することで、フロンティアの近くに留まれる。リリースは本日から。

[`🔗 timdettmers.com`](https://timdettmers.com/2026/09/21/dlab-open-source-week/) · [`🔗 HN 議論`](https://news.ycombinator.com/item?id=49791647)

---

## 28. 偽 LastPass Authenticator が Microsoft 署名済みカーネルドライバを同梱 — 145 のセキュリティツールを殺す

- **Velocity:** ▮ rising
- **Source:** LastPass TIME チーム + Delphos Labs（9 月 17 日）· The Hacker News（9 月 21 日）
- **Tags:** `byovd` `infostealer` `supply-chain` `malware`

ダウンロード検索で上位に出る偽 GitHub 組織（「LastPass-Authenticator」）が、サイズ制限の
あるスキャナがスキップする 148 MB のジャンクパディング済み ZIP へ誘導する。中身：正規の
リネーム済み `vsdbg.exe` と悪意ある `vsdbg.dll` による DLL サイドローディング → 3 つの昇格
手法で SYSTEM 取得 → カーネルドライバ `Alinubx.sys` をインストール——Microsoft の Windows
Hardware Compatibility Publisher 署名チェーンで署名され、VirusTotal はゼロ検出、Microsoft
の危険なドライバブロックリストにも未掲載。カーネルから 145 個の AV/EDR プロセス名を終了さ
せ、その後「Rapuncel」スティーラーが 24 以上のブラウザのパスワード、暗号資産ウォレット、
セッショントークンを収穫——ブラウザ自身への注入で Chrome/Edge の app-bound 暗号化を破る。
同じ攻撃者サーバーには 40 以上のブランドの偽装ページが hosted されていた。

**Why it matters:** リネームされたドライバは既知のものだ——CnCrypt の `CcProtect.sys`、
LOLDrivers カタログに既にある；名前を変えただけで検出が 7/70 から 0/70 に落ちた。Microsoft
はこれを脆弱性として扱うことを拒否した（Microsoft のコンポーネントではないため）。引用す
べきは LastPass 自身の言葉だ：「Microsoft の証明は、ドライバが信頼パイプラインを通過した
ことの証明であって、ドライバが安全であることの証明ではない」。ハッシュではなく血統で狩れ
（サービス名 `NvFsFilter`、署名者「Henan Dafeng Software」）。

[`🔗 The Hacker News`](https://thehackernews.com/2026/09/fake-lastpass-authenticator-installer.html) · [`🔗 LastPass/Delphos 報告`](https://blog.lastpass.com/posts/lastpass-delphos-report-rapuncel-infostealer)

---

## 29. 光ファイバー 1 本の切断で、JFK・ニューアーク・ボストン・フィラデルフィアのフライトが停止

- **Velocity:** ▮ rising
- **Source:** Reuters / Hacker News · 216+ pts · 121 comments · ~9h ago (~03:10 UTC+8)
- **Tags:** `infrastructure` `faa` `resilience` `fiber`

9 月 21 日、建設業者がフィラデルフィア TRACON（ターミナルレーダー進入管制）に供給する
**バックアップ**光ファイバーを切断したため、FAA は東海岸主要空港への到着便を停止した。
グランドストップは JFK、ニューアーク、ボストン、フィラデルフィアに波及；数千便が遅延し、
FAA は同日遅くに通信経路を復旧し、「空域の安全を確認できるまで」再開しないと述べた。

**Why it matters:** 冗長性は設計通りに機能し、それでも都市圏の空域を数時間麻痺させた——
一度の物理切断が、生き残っていた経路を同時に奪った。今月のオランダ鉄道停止やバリンのデータ
喪失事故と同じ教訓だ：レジリエンスの失敗は地味な物理レイヤに集中し、フェイルオーバーが
訓練されるまで「バックアップ」はトポロジであって保証ではない。

[`🔗 Reuters`](https://www.reuters.com/world/us/faa-halts-some-us-east-coast-flights-due-communication-issues-2026-09-21/) · [`🔗 HN 議論`](https://news.ycombinator.com/item?id=49791509)

---

## 30. macOS 27 についにオフにできる AI 機能が搭載 — しかしユーザーいわくモデルはそれでもダウンロードされる

- **Velocity:** ▮ steady
- **Source:** Apple Support / HN · 259+ pts · 177 comments · ~11h ago (~01:00 UTC+8)
- **Tags:** `apple` `apple-intelligence` `macos-27` `privacy`

Apple は Mac（macOS 27「Golden Gate」）の Apple Intelligence に関する公式の機能単位コント
ロールを公開した：Siri AI はオフにして「Use Siri Classic」へフォールバック可能、メッセージ/
メール/通知の要約、スマートリプライ、Journal の書き込みプロンプト、留守電の提案にそれぞれ
個別スイッチ、スクリーンタイムで全体を制限できる。ユーザーが見つけた落とし穴：サポート
ページはストレージに一切触れず、別の人気スレッドが macOS によるオンデバイス AI モデルの
ダウンロードを止める回避策を記録している——一方 Ask HN のスレッドは、Siri の完全無効化は
依然として難しいと主張している。

**Why it matters:** 1 年間の「全部まとめて」デフォルトの後、オプトアウトの粒度は実質的な
進歩だ。スレッドが晒している未解決の問いは、「オフ」が*ダウンロードしない*を意味するのか、
それとも*使わない*だけなのか。Apple が明記した細字にも注意：サーバー側モデルには毎日の
使用制限がかかり、拡張アクセスは「将来有料になる可能性がある」——ローカル/クラウドの境界
に値札が付いた。

[`🔗 Apple Support`](https://support.apple.com/guide/mac-help/turn-restrict-access-apple-intelligence-mchlb2e44f94/mac) · [`🔗 HN 議論`](https://news.ycombinator.com/item?id=49790409) · [`🔗 ストレージ回避策スレッド`](https://www.reddit.com/r/MacOSBeta/comments/1vlnf13/workaround_to_avoid_downloading_ai_models_and/)

---

## 31. TraderTraitor の macOS バックドアが暗号資産と無関係の被害者に再出現 — 11 日間潜伏、Cursor ワークスペース展開の数秒後にビーコン

- **Velocity:** ▮ steady
- **Source:** SentinelLabs（9 月 18 日）· The Hacker News（9 月 21 日）
- **Tags:** `north-korea` `macos-malware` `supply-chain` `developer-security`

SentinelLabs が報告：北朝鮮関連のグループ（Jade Sleet/TraderTraitor/UNC4899——Bybit の
15 億ドル事件の犯人グループ）が、DevOps エンジニアの Apple Silicon Mac を経由してインドの
IT サービス企業を攻撃した：採用面接の口実が武器化された Terraform 依存関係ロックファイル
に誘導——`terraform init` が攻撃者ホストのモジュールを取得する。2 つの Rust 製 ARM64
バックドア：FLATROOF（Telegram C2、ブラウザデータ・ターミナル履歴・`login.keychain-db`
を窃取）と ROOFDECK（Nostr ベースの分散 C2、コマンドは暗号署名検証、Launch Agent で永続
化）。3 月 18 日に検出され、3 月 29 日まで潜伏——Cursor でワークスペースを開いた数秒後に
ビーコンを開始。更新版 ROOFDECK は 4 月 20 日に投入——LayerZero が KelpDAO ハックを公認
した翌日だった。

**Why it matters:** 2 つの詳細は暗号資産窃盗の枠を超えて一般化する：トリガーは被害者が
*開発環境を開いた*こと、そしてペイロードの更新は公開の時計を追っていた。開発者エンド
ポイントこそがサプライチェーンだ——面接の口実と `terraform init` は、もはやそれらに対する
再現可能なキルチェーンだ。

[`🔗 The Hacker News`](https://thehackernews.com/2026/09/jade-sleet-linked-to-indian-it-provider.html) · [`🔗 SentinelLabs 報告`](https://www.sentinelone.com/labs/dont-call-us-well-call-your-apis-tradertraitor-backdoors-resurface-on-victim-with-no-crypto-ties/)

---

## 32. Git 2.56 が今週リリース — そして 3.0 の問いが正式にテーブルに乗った

- **Velocity:** ▮ steady
- **Source:** LWN / Hacker News · 53+ pts · 19 comments · ~7h ago (~05:30 UTC+8)
- **Tags:** `git` `version-control` `sha256` `developer-tools`

Git 2.56（非マージコミット約 700 件、9 月下旬予定）は実験的な `git history drop`、解決済み
ファイルのみをステージし残留コンフリクトマーカーで中止する `git add --resolved`、
`git refs create/delete/update/rename`、`git branch --delete-merged` を届ける。より大きな
話：Junio Hamano が今月、次のリリースを **3.0** にすべきかコミュニティに正式に問い、4 つの
互換性破壊が議論されている——デフォルト SHA-256（2.42 以降非実験的；GitLab と Forgejo は
対応済み、GitHub の状況は不明）、オブジェクト ID は小文字のみ、reftable がデフォルトの ref
保存形式に、Rust がビルド要件に。Hamano：「これは人気投票ではないし、民主主義ですらない」
——決めるのは彼だ。

**Why it matters:** エコシステムへの影響があるのはデフォルト SHA-256 だ——Git オブジェクト
形式を読むすべてのツールと、すべてのフォージが準備を要する；古いリポジトリはサポートされ
続けるが、新しいデフォルトは 10 年かけて伝播する。*議論されていない*ことに注意：古い
リポジトリを壊すいかなる変更も。3.0 の決定は、実現すれば今年中に期待される。

[`🔗 LWN`](https://lwn.net/SubscriberLink/1094575/2385e98583715c2b/) · [`🔗 HN 議論`](https://news.ycombinator.com/item?id=49794736)

---

## 33. 「ノーといったのに Apple はイエスと言った」 — macOS アップグレードが明示的なオプトアウト後も Apple Intelligence を再有効化

- **Velocity:** ▮▮▮ trending
- **Source:** Hacker News · 303+ pts · 225 comments · ~4h ago (~16:04 UTC+8)
- **Tags:** `apple` `apple-intelligence` `privacy` `consent`

David Bushell のアップグレード当日記：15 分ごとに個人データを送信する機能が macOS 15.3 で
自動有効化された後、彼は Apple Intelligence と Siri を明示的に無効化していた（「かなり明確な
『ノー』」）。今週 macOS 15 → 27 にアップグレードすると、AI 機能が再有効化され、オプトアウト
のスイッチ自体が消えていた。Siri は「無効」なのに、メモリを消費しデータを書き続ける、kill でき
ない Siri プロセスが複数残存；Apple Intelligence は 22.28 GB のディスクを占有（Apple の
£500/TB ストレージアップグレード価格に換算して約 £11）；Screen Time の隠し回避策は AI 機能を
メニューから隠すだけで、無効化はしない。

**Why it matters:** 項目 30 が残した問い——「オフ」とはオフなのか——への具体的答えだ。
Apple は今週、本当の機能別スイッチを公開したが、既存のオプトアウトはアップグレードを
生存できなかった——つまりここでの同意は設定ではなく、バージョンごとの状態だ。注意：
これは単一ユーザーの実体験に基づく意見エッセイ——だが個々の詳細（プロセス、ストレージ、
Screen Time のパス）は当該マシンで検証可能だ。

[`🔗 dbushell.com`](https://dbushell.com/2026/09/22/apple-intelligence/) · [`🔗 HN 議論`](https://news.ycombinator.com/item?id=49797982)

---

## 34. agent-substrate/substrate — 「デフォルトで安全な agent 実行ランタイム」が本日の未カバー最多急上昇（+498/日）

- **Velocity:** ▮▮▮ trending
- **Source:** GitHub Trending · 2.7k stars · +498/day
- **Tags:** `agent-infra` `kubernetes` `sandboxing` `gvisor`

Go 製のランタイム（Apache-2.0）。多くの概ね遊休状態の agent（「アクター」）を、
Kubernetes 上の小さなウォーム worker プールに多重化する：gVisor と microVM
（cloud-hypervisor）のサンドボックスバックエンド、サスペンド/レジュームのためのフルステート
スナップショット（「Actor Teleport」）で休眠中のファイルシステム/RAM を永続化、リクエストの
パーキング、MITM インターセプト付きの下り（egress）ポリシー。ADK、LangChain、Claude Code、
Codex、MCP サーバーに対応。主張：標準コンテナランタイムの 10 倍の密度、500+/秒の
サスペンド/レジュームで 500ms 未満のレジューム、8 ポッドで約 250 アクター（「30 倍超の
オーバーサブスクリプション」）——すべてベンダー主張；ベンチマークガイドはリンクされているが、
ページ上に手法の記載はない。

**Why it matters:** オーバーサブスクリプションによる agent 密度は今シーズンのインフラテーゼ
になりつつあり、これは現時点で最も具体的なオープンソース実装だ。README 自身の警告が
カウンターウェイト：「本番利用は未対応で、API はほぼ確実に変更される」「Google の公式サポート
製品ではない」、Google の OSS 脆弱性報奨プログラムの対象外、Kubernetes 最新 stable と 1 個前
のマイナーのみサポート。

[`🔗 GitHub リポジトリ`](https://github.com/agent-substrate/substrate) · [`🔗 GitHub Trending`](https://github.com/trending?since=daily)

---

## 35. JetBrains が Air を発表 — IDE・Web・CLI・モバイルを横断する統一 agent システム

- **Velocity:** ▮▮ rising
- **Source:** JetBrains / Hacker News · 39+ pts · 26 comments · ~1h ago (~19:00 UTC+8)
- **Tags:** `jetbrains` `agents` `ide` `product-launch`

Air は 4 つのサーフェス（IDE、Web、CLI、モバイル）を横断する「agent でソフトウェアを
構築するための単一システム」で、Claude Agent、Codex、Junie、Copilot、OpenCode、
「ACP 経由で接続可能な任意の agent」を統合する。構成要素：IDE 内 Air（レジストリ経由で
ローカル agent を自動検出、diff レビュー、agent に実行させる行コメント）、Air Teams（専用
クラウド環境、自動化、一元化された MCP 設定）、Air Governance（組織全体の権限）、
merge/PR/push で発火し AI クレジットで会計管理される自動化。クラウド実行は「一部の
顧客に既に提供中」で順次展開；IDE プラグインはアルファ；API キーの持ち込み、または公開
API 料金で課金される JetBrains AI クレジットに対応。

**Why it matters:** 昨年 12 月に Fleet を切り捨て Air に賭けた JetBrains の着地点だ——
注目すべきは、独自 IDE にロックされた agent ではなく、他社の agent のための制御プレーンと
レビューサーフェスという agent 非依存のインフラを選んだことだ。注意：完全な価格は未公開、
発表から 1 時間で議論の盛り上がりはまだ小さい。

[`🔗 jetbrains.com/air`](https://www.jetbrains.com/air/) · [`🔗 HN 議論`](https://news.ycombinator.com/item?id=49799287)

---

## 36. gzip は言語モデルになれるか？ ゼロ訓練のジェネレータが答える：「まあ、ちょっとだけ」

- **Velocity:** ▮▮ rising
- **Source:** Hacker News · 196+ pts · 78 comments · ~6h ago (~14:08 UTC+8)
- **Tags:** `compression` `information-theory` `llm` `education`

nathan.rs 作者の `gzipt`（純標準ライブラリの Python）：コーパスで DEFLATE の 32 KiB ウィンドウを
 priming し、`len(compress(context + candidate))` で候補継続をスコアリング——短いほど
「よく予測されている」。動かすための工夫が 2 つ：マルチバイトスパンのビームサーチ（gzip は
整数バイト数しか出さず、1 バイト単位のステップは同点になり量子化ノイズに溺れる）、スコアリング
コンテキストは最後の `tail` バイトのみ保持——DEFLATE は近距離の安いマッチを好み、完全な履歴は
逐語的な自己コピーのループに崩壊する。シェイクスピアのサンプルは劇の形式らしさを保ちつつ
デタラメ；作者自身の結論は「まあ、ちょっとだけ？」——DeepMind の「Language Modeling Is
Compression」（2023）を引用し、その脚注は gzip ベースの生成が「うまくいかなかった」ことを既に
記録している。

**Why it matters:** 訓練パラメータゼロでの 圧縮＝予測 の等価性が実際にどう見えるかの、
誠実で動作するデモ——陰性結果の報告の手本でもある（ベンチマーク主張なし、注意点は
本文中に）。2023 年の論文からの本当の新規性は、バイトスパン上のビームサーチ構成だ。

[`🔗 nathan.rs`](https://nathan.rs/posts/gzip-lm/) · [`🔗 arXiv:2309.10668`](https://arxiv.org/abs/2309.10668) · [`🔗 HN 議論`](https://news.ycombinator.com/item?id=49797323)

---

## 37. browser-use/video-use — 「コーディング agent で動画を編集」が 25.5k スターを獲得

- **Velocity:** ▮▮ rising
- **Source:** GitHub Trending · 25.5k stars · +155/day
- **Tags:** `video-editing` `coding-agents` `browser-use` `mit`

未編集素材をフォルダに置き、コーディング agent（Claude Code、Codex）と会話すれば
`final.mp4` が手に入る——タイムラインソフト不要。設計の要点：LLM はフレームを直接見ない。
約 12KB の文字起こしファイル（ElevenLabs Scribe：単語タイムスタンプ、話者分離、音声
イベント）と、判断ポイントでのみオンデマンド生成されるフィルムストリップ PNG を読み、
カット、カラーグレーディング、30ms の音声フェード、焼き込み字幕を行う；自己評価ループが
カット境界を再確認（最大 3 回の修正サイクル）、Remotion/Manim/PIL/HyperFrames のオーバーレイは
並列サブ agent が担当。MIT ライセンス。

**Why it matters:** 表現方法でトークン効率を稼ぐ手法——テキスト文字起こしを動画の世界
モデルにする——は、今月 harness エンジニアリング項目群で追い続けてきたのと同じパターンを、
生フレームが割に合わないメディアに適用したものだ。注意：「4500 万トークンのノイズ」という
比較はプロジェクト自身の枠組み；「100% オープンソース」の主張と有料 ElevenLabs API キーへの
硬依存は並置すると微妙；リリースなし、コミット 21、オープン PR 93——そして我々は新たな
ローンチイベントを見つけられなかった。この急上昇は持続的モメンタムであり、名指しできる
引き金ではない。

[`🔗 GitHub リポジトリ`](https://github.com/browser-use/video-use) · [`🔗 Releases`](https://github.com/browser-use/video-use/releases)

---

## 38. SharePoint CVE-2026-65660：Microsoft のアドバイザリは「なりすまし、6.5」——今日の分析が認証後 RCE を実証

- **Velocity:** ▮▮ rising
- **Source:** Viettel / The Hacker News · ~1h ago (~19:17 UTC+8)
- **Tags:** `sharepoint` `microsoft` `rce` `cvss`

Pwn2Own Berlin 2025 の ToolShell 研究者、Viettel の Dinh Ho Anh Khoa が本日公開した完全な
技術詳細によれば、CVE-2026-65660 は SafeControls リストのバイパスだ：ToolPane が `Register`
ディレクティブを再構築する際、属性値を二重引用符の間に埋め込まれた引用符をエスケープせずに
書き込むため、認証済み攻撃者は型チェックの後に任意の .NET クラスを登録でき、
`XamlServices.Parse()` の逆シリアル化を経てコード実行に到達する（メモリ内ウェブシェルの
ペイロード付き）。6 月 9 日に修正済みの別の認証バイパスと連鎖させれば事前認証 RCE になるが、
匿名ページアクセスが有効な構成に限られる。8 月 11 日に修正済み；パッチは脆弱な機能も既定で
無効化する。野良悪用の報告はなく、CISA KEV 未掲載；Microsoft は悪用可能性を「低い」と評価
——ただし完全なエクスプロイトマークアップは既に公開済み。Khoa は SharePoint 2013（2023 年に
EOL）も影響を受けると指摘；Microsoft のアドバイザリが列挙するのは 2016/2019/Subscription
Edition のみだ。

**Why it matters:** スコアリングの顛末そのものがこの項目だ。Microsoft のアドバイザリは
長らく 6.5/なりすまし、完全性・可用性への影響なしと表示していた；CVE レコードは現在 RCE
（CWE-94）と題され、現行の NVD レコードは CVSS 3.1 **8.8 AV:N/AC:L/PR:L/UI:N——CNA
（Microsoft）による採点、ステータス Modified**。アドバイザリでトリアージした防御者は、最大値に
近いコード実行ではなく、中程度のなりすまし脆弱性を見ていたことになる。

[`🔗 The Hacker News`](https://thehackernews.com/2026/09/sharepoint-flaw-initially-listed-as.html) · [`🔗 NVD: CVE-2026-65660`](https://nvd.nist.gov/vuln/detail/CVE-2026-65660)

---

## 39. Meta Muse の隠されたディクテーションエンドポイント：Wardle の PoC がアシスタントをバックドアに変える

- **Velocity:** ▮ steady
- **Source:** The Hacker News · PoC 9 月 21 日、分析 9 月 22 日（~14:33 UTC+8）
- **Tags:** `muse` `meta` `macos` `agent-security`

Objective-See の Patrick Wardle が Mac 版 Muse アプリの PoC を公開：未公開のプレファレンス
`endo_voyager_dictation_endpoint` がディクテーションの行き先を決めており、ログインユーザーと
して動作する任意のプログラムが追加権限なしでそれを付け替えられる。その上で彼が示したのは
3 つのこと：ユーザーのディクテーションを読み取る、Muse が信じて実行する指示を注入する、
Muse のセッショントークンを取得する——彼はそのトークンで自分の iPhone 上の Muse を操縦した
（位置情報の報告、Bluetooth スキャン、スマートホームコマンドの一覧）。但し書きは付いたまま：
既存のコード実行が前提、macOS の TCC/キーチェーン保護は破らない、Meta のクラウド分離が
破られたことは示していない、彼のテストでは Muse はメッセージを下書きしただけで自分からは
送信しない。彼は Meta への報告なしに公開した；Meta はその後、彼が「修正」と呼ぶものを
プッシュした（未確認、セキュリティアドバイザリなし）。項目 2 の Amazon 壁面前的対立とは
別の問題——対象は隣接、脆弱性は別物だ。

**Why it matters:** agent 自身に与えられたアクセスこそが攻撃対象面だ：マルウェアは権限昇格を
必要とせず、鍵を既に握る正規の署名済みアプリを操縦するだけでいい——そして EDR はそれから
来るコマンドを検知しないかもしれない。クロスデバイスセッションを持つ agent クラスのアプリは、
1 台の Mac の侵害をアカウントが触れる全デバイスの掌握に変える。

[`🔗 The Hacker News`](https://thehackernews.com/2026/09/one-hidden-meta-muse-setting-could-let.html) · [`🔗 Objective-See Foundation`](https://objective-see.org)

---

## 40. Univer が「Office Harness for AI Agents」に再定義 — agent がワークツリーで作業しマージされるオフィスランタイム

- **Velocity:** ▮ steady
- **Source:** GitHub Trending · 14.9k stars · +202/day
- **Tags:** `office` `agents` `sdk` `typescript`

DreamNum の Univer（Luckysheet チーム）は、スプレッドシート、ドキュメント、スライド、
キャンバス、リレーショナルテーブル——PDF は「近日公開」——を 1 つの Apache-2.0 ランタイムに
統合し、ヘッドレス Node モード、Claude Code/Codex/OpenCode 向け CLI、`univer-mcp` プラグインを
提供する。agent ポジショニングは今や明示的だ：人間と agent が同じファイルを共編集し、agent は
隔離されたワークツリーのドラフトで作業してマージ前に人間のレビューを受け、git 式のバージョン
履歴が全変更を追跡し、agent は自己検証——検証条件を自ら設定し、通るまで反復する。サイトは
SpreadsheetBench 1 位のスコア（68.86%、人間のベンチマークは 71.3%）を引用——自己報告値だ。

**Why it matters:** オフィススイートが agent の検証サーフェスとして再構築されつつある——
構造化 API、スクリーンショット、レイアウト診断がチェック手段になる——というのは、コーディング
agent 評価の行き先と一致する。組み込む前に境界を読め：リアルタイム共同編集、インポート/
エクスポート、印刷、チャート、ピボットテーブルは Univer Pro の商用提供であり、docs/slides は
シートより成熟度が低く、SpreadsheetBench の数字はベンダー自身のものだ。

[`🔗 GitHub リポジトリ`](https://github.com/dream-num/univer) · [`🔗 univer.ai`](https://univer.ai/)

---

## 41. Treg：「agent ツール版 OpenRouter」——1 つのトークン、2,630 エンドポイント、従量課金

- **Velocity:** ▮ steady
- **Source:** GitHub Trending · 2.0k stars · +197/day
- **Tags:** `agent-tools` `api-gateway` `credentials` `metering`

Treg（セルフホスト可能な Python/FastAPI、ホスト型は treg.to）は、ベンダーツール API——
Semrush、Moz、SerpApi、Hunter、Crunchbase など——への単一のベース URL とトークンを agent に
与える。agent はツールではなくケイパビリティを要求する；treg がプロバイダにルーティングし、
資格情報をサーバー側で注入し、各プロバイダの実測成功率と速度を表示して、agent が証拠に基づき
選べるようにする。サブスクリプションなしの従量課金（引用例：Semrush のキーワード検索 1 回
$0.006；「マークアップ $0.000」を主張）；チームは自分のキー、CLI、`SKILL.md` レシピを組織全体で
登録できる。

**Why it matters:** ツール呼び出し層が独自の OpenRouter を持つことは、実際に満たされていない
ニーズだ——資格情報の注入と従量課金は、ベンダー API を呼ぶ agent がまさに欠いているものだ。
ただし秘密情報をそこに流す前に不一致を確認しよう：README は 3,000+ エンドポイント・60+
プロバイダ・「追加条項付き Apache 2.0」を主張する一方、ホスト型サイトは 2,630 エンドポイント、
47 プロバイダ、AGPL と書いている。その他の注記：応答は課金証拠のため最大 8 MiB バッファされ、
Fernet キーを失うと保存済みの秘密は永久に復元できず、ホスト型 CLI は既定で PostHog テレメトリを
送る。

[`🔗 GitHub リポジトリ`](https://github.com/superdesigndev/treg) · [`🔗 treg.to`](https://treg.to/)

---

## 42. claude-code-templates が 30.9k スターを突破 — skills エコノミーのアグリゲータ層

- **Velocity:** ▮ steady
- **Source:** GitHub Trending · 30.9k stars · +33/day
- **Tags:** `claude-code` `skills` `aggregator` `mit`

davila7 の claude-code-templates は、Claude Code を設定・監視する MIT ライセンスの CLI だ：
100+ の agent、スラッシュコマンド、フック、設定、MCP 統合を `npx claude-code-templates@latest`
でインストール可能で、リアルタイム分析ダッシュボード、モバイル会話モニター、ヘルスチェック、
プラグインダッシュボードを備える。帰属を保持したままサードパーティコレクションを集約して
いる——K-Dense 科学 skills（139）、Anthropic 公式 skills（21）、wshobson/agents（48）、
obra/superpowers など。

**Why it matters:** これは skills ウェーブの流通層であり、アグリゲータとしてのリスク——
率直に言う価値のあるもの——を引き継ぐ：インストールされるコンテンツは元作者のライセンスと
品質をそのまま引き、README はスポンサープレイスメント（Bright Data、Z.AI、Neon、Vercel）を
カタログに混ぜ込んでいる。新たなリリースイベントは見つからなかった——+33/日は安定した
蓄積であって急騰ではない。それが正直な読み方だ。

[`🔗 GitHub リポジトリ`](https://github.com/davila7/claude-code-templates) · [`🔗 GitHub Trending`](https://github.com/trending?since=daily)

---

## Metadata

| Field | Value |
|-------|-------|
| Generated | 2026-09-22T20:15:00+08:00 |
| Items | 42 |
| Sources tracked | 43 (Hacker News, GitHub Trending, x.ai, Artificial Analysis, The Register, GeekWire, Cloudflare blog, oss-security, securityonline.info, NVD, arXiv, GitHub, Hugging Face, Raspberry Pi forums, SafeDep, BleepingComputer, WPScan, Zyxel, CISA KEV, SolarWinds, AWS, 毎日経済新聞, X, mimo.mi.com, bcantrill.dtrace.org, blog.colinbreck.com, brand.io, MacStories, linear.app, terrytao.wordpress.com, agmai.org, timdettmers.com, The Hacker News, LastPass blog, SentinelLabs, Reuters, Apple Support, LWN, dbushell.com, jetbrains.com, nathan.rs, univer.ai, treg.to) |
| Update schedule | 04:03, 12:03, 20:03 UTC+8 (3x daily) |
| Ranking | Velocity-weighted (recency × engagement acceleration × source authority) |
| License | [CC-BY 4.0](https://creativecommons.org/licenses/by/4.0/) |

[Previous day](../archive/2026-09-21.md) · [Raw .md](./2026-09-22.md) · [Archive](../archive/index.md)
