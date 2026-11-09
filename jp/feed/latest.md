---
date: 2026-11-09
updated: 2026-11-09T05:12:07Z
schedule: 04:03, 12:03, 20:03 UTC+8
sources: 24
license: CC-BY-4.0
---

# trending.md — 2026-11-09

## 1. OpenEMR に一度に 44 件の CVE レコード — 脆弱性自体は 8〜9 月のリリースで既に修正済み

- **Velocity:** ▮▮▮ trending
- **Source:** NVD · 44 records · Nov 8 ~14:18Z (~22:18 UTC+8)
- **Tags:** `security` `cve` `healthcare`

VulnCheck の 11 月 8 日披露ラッシュ — 昨日報じた Vikunja の 39 レコードや OpenAM の 10.0 と同じバッチ — の最大の塊は **OpenEMR**、最も広く導入されているオープンソース電子カルテです。**一度の公開で 44 レコード**、うち 4 件が CVSS 3.1 で 9.0 以上（VulnCheck が CNA で、各レコードに `Primary` CVSS 3.1 と `Secondary` CVSS 4.0 の二つのスコアを発行）。目立つのは：CVE-2026-124469（9.9）、Fee Sheet 薬品在庫照会の SQL インジェクションで "`prod[N][warehouse]` POST フィールドを ORDER BY 句に補間"；CVE-2026-124450（9.9）、fax/sms モジュールの `disposeDocument` アクションにおけるパストラバーサルで、低権限ユーザーがデータベース認証情報ファイル `sqlconf.php` を読める；CVE-2026-124445（9.8）、`enforce_onetime_use` を無視するワンタイム認証バイパス。4 件すべての修正は **8 月 18 日・9 月 13 日・9 月 20 日・10 月 27 日** にリリース済み（8.3.0 → 8.5.0）— 書類はコードより 12〜82 日遅れ。CVE キーでは見えないリポジトリレベルの事実も：OpenEMR のアドバイザリストリームには **公開済み GHSA が 100 件（8 月 18 日 → 10 月 28 日）あり、GHSA オブジェクト自体に CVE ID を持つのは 8 件だけ** — 残り 92 件のアドバイザリは、CVE ID を鍵にするすべてのシステムから不可視です。

**Why it matters:** 影響範囲が "8.3.0/8.4.0 未満" に収まる医療システムであり、自動更新していれば何ヶ月も前に修正済み — しかし CVE ID でトリアージする人は、このリポジトリのアドバイザリ 100 件のうち 92 件が、スキャナーが見ている名前空間で一度も名乗り上げていなかったと、今知ったところです。バルク CNA 披露デーは、レジストリではなくプロジェクト自身のセキュリティフィードを読む者に報い続けています。

[`🔗 GHSA-cg8c-2v5q-29g7 (OpenEMR)`](https://github.com/openemr/openemr/security/advisories/GHSA-cg8c-2v5q-29g7) · [`🔗 CVE-2026-124469 on NVD`](https://nvd.nist.gov/vuln/detail/CVE-2026-124469)

---

## 2. llama-modchip：284B MoE を 1.71 bpw に量子化して 64 GB の CPU RAM に収める — デコード 9〜15 tok/s、GPU ゼロ

- **Velocity:** ▮▮▮ trending
- **Source:** Hacker News · 285+ pts · 10h ago (~18:22 UTC+8)
- **Tags:** `llm-inference` `cpu` `quantization`

`llama-modchip`（Apache 2.0、v2.4.0 は 11 月 4 日リリース）は ggml/llama.cpp のカーネルパッチと量子化トランスコーダのセットで、README の見出しは DeepSeek-V4-Flash — 43 層の MLA と 256 ルーティングエキスパート（Top-6）にまたがる **総パラメータ 284.33B・アクティブ 13.17B** — を **1.71 bpw・56.56 GiB** に圧縮し、256K KV キャッシュ付きで VmRSS ピーク 57.61 GiB、GPU なしの普通の 64 GB マシンに収めます。README の測定値：16 コア Zen 5 で prefill 44.36 tok/s、284B チェックポイントのデコード 9.1〜14.7 tok/s、30B クラス MoE で 25.0〜111.6 tok/s、40 ツールの Claude Code プロンプトに対する `/dev/shm` KV スロット復元が 13.1 ms。カーネル仕事は 4 段の ZMM/L1/L2/L3 キャッシュタイリング（README は prefill +77%、decode +53% と主張）と、自己スペキュレーション用の 1.64 MB Stockfish-PVS n-gram ドラフタ。HN コメンテーターは実際に動くと報告 — Ryzen 7 5700U + 64 GB DDR4 で "steady 12 to 14" tok/s — 一方、初期テスターの一人はデフォルトの `modchip` アプリがインストールするのは Nemotron-3.5-30B で DeepSeek には触れない、つまり 284B 経路はドキュメントを読む必要がある、と指摘しています。

**Why it matters:** 重要な数字は 284B ではなくアクティブ 13.17B です — スパース MoE と極端な低位量子化の組み合わせは、コンシューマハードウェアの進歩よりも速く "ローカルで動く" 線を押し上げています。スレッドで議論されている未決問題は 1.71 bpw での品質。README が売っているのはスループットで、品質こそその表が測っていないものです。

[`🔗 synchopate/llama-modchip`](https://github.com/synchopate/llama-modchip) · [`🔗 HN 議論`](https://news.ycombinator.com/item?id=50411961)

---

## 3. claude-mem が 114,830 スター到達で v15.12.0 リリース — スクリーンショット既定保持、25 GiB のクラウド割り当てが登場

- **Velocity:** ▮▮▮ trending
- **Source:** GitHub Trending · +7,482 this week · 114.8k stars
- **Tags:** `agents` `memory` `open-source`

claude-mem — コーディングエージェントの行動をキャプチャし、圧縮し、以降のセッションに再注入するエージェントメモリ層（Claude Code、OpenClaw、Codex、Gemini、Hermes、Copilot、OpenCode に対応）— は今週 2 番目に速いライザーで、21 時間に 3 リリース（v15.11.0 → v15.12.0、Nov 6 22:17Z → Nov 7 19:51Z）。v15.12.0 の見出し："エージェントが読んだり作ったりするスクリーンショットと画像が、AI モデルに送らずに、そのターンの観察にリンクされた状態で保持される" — 既定でオン、止める `Keep images` スイッチ付き。変換はオンチデバイスへ（可逆でない WebP、各 20 秒）、そしてリリースノートにクラウドの項目が現れます："各オーナーは cmem.ai に最大 25 GiB の画像を保存でき、Pro が強制する上限と同じ。"

**Why it matters:** エージェントメモリはコーディングエージェントスタックのリテンション面になりつつあります — ターミナルとエディタの生のスクリーンショットが、11.4 万スターのツールで既定で永続化される。これは実際の能力（視覚的観察はそれ以外なら失われる）であり、ローカルファーストのメモリツールがクラウド割り当てを育てる瞬間でもあります。リリースノートはそれを言っています — "Pro が強制する上限と同じ。"

[`🔗 thedotmack/claude-mem`](https://github.com/thedotmack/claude-mem) · [`🔗 v15.12.0 リリースノート`](https://github.com/thedotmack/claude-mem/releases/tag/v15.12.0)

---

## 4. Goldman Sachs がトレーダーとバンカーから Claude Code と Copilot を引き上げ — 10 月の内部ガイドラインでエンジニアのみに

- **Velocity:** ▮▮ rising
- **Source:** Hacker News · 252+ pts · 2h ago (~02:16 UTC+8)
- **Tags:** `industry` `agents` `enterprise`

Bloomberg が 11 月 2 日に報じたところ（10 月の内部ガイドラインを引用）によると、Goldman Sachs は "Anthropic の Claude Code や Microsoft の GitHub といった高度な AI コーディングツールへのアクセスを大部分の従業員から切断" し、エンジニアだけが引き続き使える状態にしました。トレーダーとバンカーは数ヶ月、これらのツールを取引フローの監視やコンテンツ制作に使っていました。Goldman の広報 Nick Carcaterra によれば Bloomberg の報告は "生産性やリスク管理を含む様々な要因" のみを挙げており、実験段階は終わり、長期的にそれを最大限活かせる人に限定する、と付け加えています。これは 7 月の立場 — CIO の Marco Argenti が非技術職による "vibe coding" を称賛し、トレーダーが AI で試作しエンジニアがスケールさせる — の反転です。HN のスレッドが 11 月 8 日にこの話を掘り起こし、それ以降上がり続けています。

**Why it matters:** 汎用エージェントアクセスの大企業による初の巻き戻しで、具体的な詳細付き — そして理由として挙げられたのは安全性ではなく生産性です。全員にエージェント を エンジニアだけに は、同じ会社で 7 ヶ月違いの二つの文書化された立場となりました。

[`🔗 The Decoder`](https://the-decoder.com/goldman-sachs-pulls-ai-coding-tools-from-traders-and-bankers/) · [`🔗 HN 議論`](https://news.ycombinator.com/item?id=50415628)

---

## 5. IBM のコーディングアシスタント Bob に 8.8 のコードインジェクションレコード — 経路はワークスペース定義 MCP サーバー

- **Velocity:** ▮▮ rising
- **Source:** NVD · ウィンドウ内で IBM 79 レコード · Nov 8 ~19:17Z
- **Tags:** `security` `mcp` `agents`

CVE-2026-9764（8.8、IBM PSIRT 記録、NVD は `Awaiting Analysis`）は IBM Bob 1.0.4〜2.0.1 をカバーし、IBM 自身のセキュリティ報道タイトルがメカニズムを物語っています："IBM Bob is vulnerable to Remote Code Execution due to improper control of workspace-defined MCP server execution." ワークスペース同梱の MCP 設定そのものがインジェクション経路です。同じ公開ウィンドウには、私の取得した約 34 時間で **79 件の IBM PSIRT レコード** が降りており、IBM Concert 1.0〜3.0.1.1 の 9.8 が二つ（CVE-2026-6715 と CVE-2026-15266、いずれも基盤 OS 上でのコマンド実行）を含みます。

**Why it matters:** 誰もがデモしてきた MCP 脅威モデル — リポジトリが同梱する設定は実行ベクトルである — に、バージョン範囲付きのベンダー製品 CVE 番号が付きました。これでハードニングの助言がパッチ管理に変わります。あなたのエージェントプラットフォームがクローンしたワークスペースに独自の MCP サーバー登録を許すなら、このレコードがゲートを付ける理由です。

[`🔗 IBM セキュリティ情報 (CVE-2026-9764)`](https://www.ibm.com/support/pages/node/7291535) · [`🔗 CVE-2026-9764 on NVD`](https://nvd.nist.gov/vuln/detail/CVE-2026-9764)

---

## 6. Outlook.com が DMARC レコードのないドメインのメールを黙って拒否 — 無告知で、一部だけ跳ねる

- **Velocity:** ▮▮ rising
- **Source:** Hacker News · 45+ pts · 1h ago (~03:20 UTC+8)
- **Tags:** `email` `deliverability` `infrastructure`

MailRoute の報告（11 月 6 日）によると、**11 月 5 日** から Outlook.com、Hotmail、Live、MSN は "DMARC レコードのないドメインからのメールの一部を拒否するようになり"、退信コードは `550 5.7.1 … lacks SPF/DKIM/DMARC Auth Records (AS9031519)`。Microsoft の 2025 年 5 月の大量送信者ルールと違い、日次送信量の閾値なしに小規模送信者を直撃し、MailRoute によれば無告知 — postmaster 通知もブログ記事もサービス正常性エントリもありません。拒否は部分的で不整合があり、これが危険な点です：通過したメールは何も証明しません。修正は安価です — `_dmarc` TXT レコード（`v=DMARC1; p=none`）を追加し、SPF か DKIM を From ドメインに整合させる（Microsoft 365 の既定 `onmicrosoft.com` 署名はカウントされません）。

**Why it matters:** 小規模メール運営者にとって、無音で確率的な拒否は最悪の故障モードです — ログは正常に見えるのに一部のメールが消える。現象そのものは独立に裏付けられています：二人の HN コメンテーターが自分のドメインで同じ拒否を食らったと報告。ただし「無告知」という枠組みを引用する前に一つ注意 — 別のコメンテーターが Microsoft の tech community と Learn の DMARC 推進文書へのリンクを貼っており、Microsoft が「何を告知しなかったか」は MailRoute の主張であって、検証済みの不在ではありません。

[`🔗 MailRoute ブログ`](https://mailroute.net/blog/outlook-rejecting-email-without-dmarc) · [`🔗 HN 議論`](https://news.ycombinator.com/item?id=50416158)

---

## 7. Contact Form 7：100 万ではなく 1,000 万サイトが使うプラグインに 9.8 の未認証ファイルアップロード — スコアは CISA-ADP、修正は 10 月 29 日

- **Velocity:** ▮▮ rising
- **Source:** NVD · 1 record（CISA-ADP スコア）· Nov 8 06:17Z (~14:17 UTC+8)
- **Tags:** `security` `wordpress` `cve`

CVE-2026-114432 は 6.2.4 未満の Contact Form 7 をカバーします：プラグインは "フォームのファイルフィールドからアップロードされたファイルの種類や拡張子を検証せず、一時ファイルクリーンアップの欠陥によりアップロードされたファイルがディスクに残る"。WPScan のアドバイザリタイトルはより正確です — "Contact Form 7 6.2 – 6.2.3 – Unauthenticated Arbitrary File Upload via Invalid UTF-8 Filename" — そしてレコードには **CNA からの CVSS がありません**：NVD にある 9.8 の CVSS 3.1 は **CISA-ADP エンリッチメント**（`Secondary`、ADP 組織 `134c704f-…`）で、レコード公開と同日に付きました。修正は 10 月 29 日にリリース済み（WordPress.org のディレクトリは現在 6.2.4.1）— 書類の 10 日前です。

**Why it matters:** 1,000 万のアクティブインストールは、今月披露された中で最も広く露出したファイルアップロード脆弱性の一つであり、誰もが引用するそのスコアは CNA ではなくコーディネータのものです。"9.8" と書くなら、誰の 9.8 かを名乗ってください。

[`🔗 WPScan アドバイザリ`](https://wpscan.com/vulnerability/6b0a5d1f-84fb-425f-8d37-ddde5703937c/) · [`🔗 CVE-2026-114432 on NVD`](https://nvd.nist.gov/vuln/detail/CVE-2026-114432)

---

## 8. Cognitive Symbionts：AI で拡張された人間の知能を AGI の副産物ではなく一等の目標とするポジションペーパー

- **Velocity:** ▮▮ rising
- **Source:** Hugging Face Papers · 116 upvotes · Nov 6 バッチ
- **Tags:** `research` `position-paper` `human-ai`

Hugging Face の 11 月 6 日デイリーバッチで最も票を集めた論文（arXiv 2611.05376、Nov 3 18:59Z 提出、Hao Fei ほか）は、機関車である AGI — 一台のマシンがどれほど賢くなれるかを問う — と並んで、AI 拡張人間知能（AHI）— "一台のマシンが特定の人の内にどれほどの知能を引き出せるか" を問う — を同等に扱うべきだと論じます。その設計対象は **認知的共生体（cognitive symbiont）**：ユーザーの感知するものを感知し、文脈を年単位で保持する "終身的で、埋め込みの、リアルタイムの、私的な、低摩擦の、能動的な伴走者"。設計空間は共生ループ（感知、保持、理解、共に生きる、行動、共に考える、成長）として組織され、パーソナルランタイムと信頼が境界とします。論文はガバナンスを内生化し、試験での秘匿支援や採用の社会的圧力を一等のリスクとして挙げます。

**Why it matters:** 今四半期に出荷されているすべてのパーソナルエージェントメモリ製品は、この論文の対象のアドホック版を建てています。ポジションペーパーの価値は語彙を与えることです。その枠組みはベンチマークの現状にも逆光を当てます — 進歩の単位がある特定の人が今できることなら、フロンティアリーダーボードの増分はもはや指標になりません。

[`🔗 arXiv:2611.05376`](https://arxiv.org/abs/2611.05376) · [`🔗 Hugging Face papers`](https://huggingface.co/papers/2611.05376)

---

## 9. SLA は空間-言語-アクションロボットモデルを継続事前学習でスケール — 3D 感知は凍結したまま

- **Velocity:** ▮▮ rising
- **Source:** Hugging Face Papers · 92 upvotes · Nov 6 バッチ
- **Tags:** `research` `robotics` `vla`

SLA（arXiv 2611.08373、Nov 5 17:52Z 提出、Fuhao Li ほか）は、暗黙的な空間アライメントの VLA をアーキテクチャ変更ではなく継続事前学習でスケールさせます：事前学習済み pi05 ポリシーから初期化し、アクション予測と、中間視覚埋め込みと **凍結された** 3D 感知モデルの空間表現とのアライメントを共同最適化します。データはロコモーション、タスク、シーンにまたがる異種ロボットデータセット。多様性を担う二つのメカニズム：複数 VLA 層の視覚埋め込みを適応的に集約する特徴依存ゲートと、デモ軌跡への過剰適合を減らす確率的状态ドロップアウト。推論時にはすべての補助部品が落ち、事前学習済み重みと元のアーキテクチャをそのまま再利用します。

**Why it matters:** ここでの VLA スケーリングの物語は新しいアーキテクチャではなく、データと補助目的です — そして訓練時のみ存在するパターン（配備時に消えるゲートとドロップアウト）は、凍結した基盤ポリシーに補助表現を付けたい全員が持ち帰れるトリックです。

[`🔗 arXiv:2611.08373`](https://arxiv.org/abs/2611.08373) · [`🔗 Hugging Face papers`](https://huggingface.co/papers/2611.08373)

---

## 10. JIT ビットマップテキストレンダリング：マイコン上で文字列ごとに描画ループをコンパイルする

- **Velocity:** ▮▮ rising
- **Source:** Hacker News · 81+ pts · 10h ago (~18:42 UTC+8)
- **Tags:** `rust` `embedded` `graphics`

Raph Levien による vic-2350 の最新記事 — リポジトリの自己記述は "An alternate universe 80s home computer, realized on RP2350 hardware"（11 月 7 日にプッシュ）— は厳しい予算に挑みます：このマシンはビームと競争し（520 kB SRAM、フレームバッファなし）、1 ピクセル約 6 サイクルしか残らず、Rust では届きません。答えは JIT：表示時に **文字列ごとに** 専用の ARM 機械語ループをコンパイルするもので、彼が Cortex-M33 のために作った言語 symbolasm で書かれています。記事の数字：内側ループはグリフあたり 23 サイクルでコンパイル、デモはコンパイルに約 21k、実行に約 42k サイクル（1 コアスループットの約 2.6%）、コンパイルはスキャンアウト前の 100 µs 以内に終わる。カーニングはグリフあたり 2 バイトのビットベクトルに対する AND と popcount に帰着します。第 2 パスは 1bpp の走査行を 1.75 サイクル/ピクセルで RGB565 に展開。彼は、手書きの Rust 草稿を Claude が翻訳・最適化して JIT コンパイラにしたと述べています。

**Why it matters:** これは 1982 年の Blit の技 — これから描くもののための表示コードを生成する — を三桁速くし、テキストに適用し、5 ドルのマイコンで動かしたものです。キャッシュではなくフレームごとのコンパイルは、組み込みテキストの設計空間における本当に新しい地点で、しかも全体がオープンソースです。

[`🔗 linebender.org 記事`](https://linebender.org/blog/jit-bitmap-text/) · [`🔗 raphlinus/vic-2350`](https://github.com/raphlinus/vic-2350) · [`🔗 HN 議論`](https://news.ycombinator.com/item?id=50412072)

---

## 11. BestRand：ランダムなベンチマーク部分集合は長い尾を持つ — 尾を切り落とすと推定誤差 16.4% 減、構築コストは半分

- **Velocity:** ▮ steady
- **Source:** Hugging Face Papers · 51 upvotes · Nov 6 バッチ
- **Tags:** `research` `benchmarks` `evaluation`

ベンチマーク圧縮 — 小さな部分集合からフルベンチマークのスコアを推定すること — の定番はランダムサンプリングで、BestRand（arXiv 2611.00883、Oct 31 12:36Z 提出）はその推定量の誤差分布の解析近似から出発します：それは **長い尾を持つ**。ランダムは平均的には良好に働くが、稀な大きな誤差が不安定にし、この不安定性は現代の基盤モデル間で持続します。BestRand はランダムの効率を保ちつつ高誤差の尾を切り詰め、"70+ のテキスト、マルチモーダル、エージェントベンチマーク" で検証：高誤差リスク 50.2% 減、推定誤差 16.4% 減、構築コストは 51.3%、分布外推定誤差は平均 21.8% 減。

**Why it matters:** モデルのリリース刻みが評価予算を抜いていく今、節約評価はインフラになりつつあります — そしてこの論文の貢献は、安い選択肢がいつ静かに失敗するかを正確に特徴づけることです。"500 問をサンプリングした" という主張に普段欠けている部分そのものです。

[`🔗 arXiv:2611.00883`](https://arxiv.org/abs/2611.00883) · [`🔗 Hugging Face papers`](https://huggingface.co/papers/2611.00883)

---

## 12. VisSearch-Bench：検索ツール付きでも、最強のマルチモーダルエージェントが長尺視覚検索を完全解決できるのは 26.47%

- **Velocity:** ▮ steady
- **Source:** Hugging Face Papers · 22 upvotes · Nov 6 バッチ
- **Tags:** `research` `benchmarks` `multimodal`

VisSearch-Bench（arXiv 2611.04894、Nov 3 13:40Z 提出）は、著者らが視覚的文脈管理と呼ぶ能力 — マルチモーダルエージェントが複数段のウェブ・画像検索で画像をどう見つけ、追い、結び付けるか — を測ります。**7 主要ドメイン・25 サブドメインにわたる 204 の人間執筆タスク** を、三つの型（集合式・逐次式・構造誘導式視覚検索）で備え、各タスクに参照解答、追跡可能な証拠、採点規則があり、Accuracy に部分的正しさを測る Process Score を加えて採点します。16 のマルチモーダルモデル — 検索ツール付きでも — "最良のシステムが完全に解決できるのはタスクの 26.47% のみ"。

**Why it matters:** エージェント検索の波は主にテキスト検索で検証されてきました。そこでは BM25 と grep で十分だった。このベンチマークは、問題の画像の半分がまだほど遠いと論じ、雰囲気ではなく証拠追跡可能な採点規則を与えます。

[`🔗 arXiv:2611.04894`](https://arxiv.org/abs/2611.04894) · [`🔗 Hugging Face papers`](https://huggingface.co/papers/2611.04894)

---

## 13. PacketHound が Windows ファイアウォールを「送信は先に聞く」方式に変える

- **Velocity:** ▮ steady
- **Source:** Hacker News · 44+ pts · 3h ago (~01:16 UTC+8)
- **Tags:** `windows` `privacy` `open-source`

PacketHound（v1.2.0、GPL-3.0、リポジトリは 11 月 5 日作成・11 月 8 日プッシュ）は Windows 10/11 向けの送信接続ファイアウォールです："Most firewalls only watch what comes in. PacketHound sniffs out what goes out" — アプリが初めて接続を試みると Allow か Block を尋ね、答えを覚え、Windows 自身のシステム通信には黙っているので質問に溺れません。ダウンロードは 68.2 MB。HN のスレッドが最初の本物の観客です。

**Why it matters:** Little Snitch のワークフローは二十年、Mac の静かなプライバシー優位でした。そして送信の可視性こそ、現代のデータ持ち出し — エージェント時代のそれ（コーディングエージェントが読んだ認証情報が予期しない場所に現れる）を含む — が住む場所です。無料で先に聞く Windows 版は実在する空白を埋めます。次の疑問は明白：アプリが一ダースのヘルパープロセスを起こしたとき、許可ルール UI がどう振る舞うか。

[`🔗 packethound.app`](https://packethound.app/) · [`🔗 packethound-app/packethound.app`](https://github.com/packethound-app/packethound.app)

---

## 14. Tasfer はリッチテキストエディタ全体を 2D キャンバスに描く — contentEditable 不使用、CRDT 同期は WebRTC 越し

- **Velocity:** ▮ steady
- **Source:** Hacker News · 78+ pts · 4.7d ago（いまだフロントページ）
- **Tags:** `editor` `canvas` `crdt`

Hamza Khuswan による Tasfer（11 月 3 日の記事、リポジトリは 11 月 8 日プッシュ）は `contentEditable` を完全に迂回します：テキスト、カーソル、選択、行分割、右から左/アラビア語のシェーピングはすべて、HTML5 2D キャンバス上の独自コードが描き、隠し input が IME と自動修正を守ります。ローカルファーストでアカウントなし、同期は著者が自作した CRDT で WebRTC 経由 — 最小のサーバーはピアの発見だけを助け何も保存せず、暗号化リレーが後備です。アプリは AGPL、エディタエンジンは MIT で別途商用ライセンス可能。作者は、2025 年 12 月に Claude がこの規模のプロジェクトでどれほど使えるか気づいて以降の加速を、LLM 支援に帰しています。

**Why it matters:** `contentEditable` はウェブ最古の沼の一つで、手作りエディタの物語はみな、行分割と IME の自前再構築に行き着きます。硬い部分（RTL、IME、CRDT）をすでに片付けた動くキャンバスエディタと、MIT ライセンスのエンジンは、埋め込み用途の現実的な選択肢です — 五日経った今も HN のスレッドは検証され続けています。

[`🔗 hamza.se/blog/tasfer`](https://www.hamza.se/blog/tasfer) · [`🔗 tasferlabs/tasfer`](https://github.com/tasferlabs/tasfer)

---

## 15. ziwei-doushu：1.69 万スターのオープンソース紫微斗数排盤エンジン — コードは MIT、データは CC-BY、姉妹リポジトリは 160 万フレームの動画を LLM に食わせる

- **Velocity:** ▮ steady
- **Source:** GitHub Trending · +4,906 this week · 16.9k stars
- **Tags:** `chinese-oss` `open-source` `llm`

今週注目の中国オープンソースライザーは紫微斗数排盤エンジン（ziwei-doushu、コード MIT、データセット CC BY 4.0、2026 年 5 月作成、現在 16,935 スター）：倪海廈の『天紀』教育体系に基づく完全な排盤システムで、完全な排盤アルゴリズム、四化システム、格局知識ベース、古籍原文データを備えます。v4.0 解読データセット（10 月 15 日リリース）は **674,976 命盤 × 13 维 = 8,774,688 解読セグメント、解凍後 56.6 GB（約 204 億字）**。11 月 8 日、README に新しい姉妹リポジトリ `nishi-ziwei-video-reading`（11 月 8 日作成）が加わりました：複数の大規模モデルが 17 話・160 万フレームのソース講義動画をコマごとに精読し、方法、スクリプト、試験問題、成績と躓きの全過程をプロジェクト進行とともに公開しています。

**Why it matters:** README の境界表明 — アルゴリズムは公開された伝統的知恵であり、価値は解読の深さ、UX、継続運営にある — は、"アルゴリズム" が公開データそのものとき、オープンコアの堀がどこへ向かうかについての最も潔い表現の一つです。そして姉妹リポジトリ自体が、LLM スケールの動画取り込みを領域コーパスに適用した作業ログであり、それ自体が方法論の成果物です。

> プロジェクトは自身の限界まで公開しています。README は六親判断が最弱の次元だと指摘し、ソース講義の言葉を引用して説明し、公開サイトにも同じ注意書きを載せています。

[`🔗 Renhuai123/ziwei-doushu`](https://github.com/Renhuai123/ziwei-doushu) · [`🔗 nishi-ziwei-video-reading（姉妹リポジトリ）`](https://github.com/Renhuai123/nishi-ziwei-video-reading)

---

## 16. ナンバープレートからドア解錠まで：コネクテッドカーの攻撃チェーン、WAF バイパスを LLM が人間の断念後に発見

- **Velocity:** ▮▮▮ trending
- **Source:** Hacker News · 139+ pts · 4.7h ago (~08:10 UTC+8)
- **Tags:** `security` `automotive` `llm`

Assetnote 共同創業者の Shubham Shah と Sam Curry が、ある自動車メーカーのコネクテッドカー基盤に関する一連の調査レポートを公開しました（ブランドは意図的に伏せ字。テストはすべて「明確に所有する、または操作許可を得た車」で実施）。オーストラリアのチェーン：露出した `admintool.*` サブドメインの管理 API は「JavaScript バンドルにハードコードされた API キー」以外の認証を要求せず、公開の登録照会でプレート→VIN、VIN→サブスクライバー GUID→個人情報へ。そしてステージング用のはずのベンダー JS バンドルに埋め込まれた ForgeRock OpenIDM 管理者認証情報が、本番環境でも有効でした。次に壁：すべての `/openidm/` パスは WAF に block され、見え見えのトラバーサル（`/XUI%2f..%2fopenidm/`）は即 403、OpenIDM 自身のサーブレットルーティングはトラバーサルを含むパスを — 管理者 JWT を発行した後でさえ — 拒絶します。手動の試行を数日重ねた末：「対象バージョンに最も近い OpenIDM のソースを取得し、GPT 5.6 Sol Ultra に丸 6 時間使わせた。成功した」— `/static%2f..%2fopenidm/` というプレフィックスは WAF のカバー外でした。さらに MFA スキップ（ROPC トークンを `IDTokenROPC` サービスで交換）を重ね、`POST /v1/remote/route/command {"command":"door-unlock"}` が通ります：「オーストラリア、アメリカ、カナダのこのメーカー車であれば、解錠やエンジン始動などのリモートコマンドを送れた」。ページには但し書きもあります：WAF を通らない `getUser` エンドポイントは PBKDF2-SHA512 のパスワードハッシュ、PIN ハッシュ、プッシュトークン、個人情報を漏らし、メーカーはまさにこれらのエンドポイントに「大量の WAF ルールを投資」していたと。

**Why it matters:** ForgeRock 系 ID インフラは高価値チェーンで繰り返し倒れるドミノになりつつあります — 先週は OpenAM 10.0 の WebSocket トークン窃取、今回は車両制御への完全なチェーン — そしてこの記事は新しい分業の整然とした実例です：人間がシステムをマッピングしてルーティング/WAF の壁に当たり、LLM の徹底探索が覆われていない唯一のプレフィックスを見つけた。「人間だから、あの 403 がすべてのプレフィックスに適用されると想定した」— まさに自動化探索が潰すべき失敗モードです。

[`🔗 shubs.io — オーストラリアのチェーン`](https://shubs.io/unlocking-any-car-from-x-brand-in-most-of-the-world/) · [`🔗 HN 議論`](https://news.ycombinator.com/item?id=50419215)

---

## 17. NVIDIA 取締役会が CEO ジェンスン・フアンについて「外国インテリジェンス活動」の独立調査を開始 — 侵害の証拠はないと明記

- **Velocity:** ▮▮▮ trending
- **Source:** Hacker News · 440+ pts（2 スレッド） · 8.5h ago (~04:26 UTC+8)
- **Tags:** `industry` `nvidia` `governance`

NVIDIA 取締役会、11 月 8 日：「創業者兼 CEO ジェンスン・フアンが外国インテリジェンス活動の標的になったとの最近の報道を受け、取締役会は独立調査を開始します。独立取締役の委員会が、外部の独立法律顧問の支援を受けて調査を監督します」。同じ声明の要となる一文：「国内の安全保障も NVIDIA の機密も侵害されたと考える理由は取締役会にはありませんが、調査は入手可能なすべての情報を検討します」。数時間後、フアン自身のオールハンズレター（「A Message to Our Company」）が報道の発端となった私的行為を認め、調査への協力を約束。HN では両文書が数時間でそれぞれ 440 超を付けました。元の報道は Bloomberg（ペイウォール）です。

**Why it matters:** AI スタックの大部分が走る会社の CEO を巡るガバナンス調査は、侵害の有無にかかわらず継続性の話です。引用すべきは取締役会自身の枠組み — 予防的、侵害の証拠なし、「Jensen とそのリーダーシップチームへの信頼」— であり、一次資料の前に いかなる侵害の断定も憶測です。

[`🔗 NVIDIA 取締役会声明`](https://nvidianews.nvidia.com/news/statement-from-nvidia-board-of-directors) · [`🔗 A Message to Our Company`](https://nvidianews.nvidia.com/news/a-message-to-our-company)

---

## 18. KetchUp、HN でローンチし、ローンチ途中で BenchUp に改名 — Rust + WebGPU のオープンソース SketchUp 代替

- **Velocity:** ▮▮▮ trending
- **Source:** Hacker News · 309+ pts · 6.3h ago (~06:35 UTC+8)
- **Tags:** `cad` `rust` `webgpu`

昨夜最大の Show HN（309 pts）は木工向けの無料オープンソース 3D モデラー：Push/Pull、正確な寸法、グループとコンポーネント、ポータブルなプロジェクトファイル — Windows/macOS/Linux のネイティブアプリとして「また WebAssembly 経由でデスクトップブラウザでも」動き、ブラウザ版は「WebGPU を優先し WebGL2 にフォールバック」。SketchUp の `.skp` をインポートし、`.obj` をエクスポート。最新リリースは v0.6.6、リポジトリは 10 月 23 日作成（まだ 198 スター — HN のポイントはホストされたアプリへ）、本日 04:12Z にプッシュ。ローンチの最中に起きた一幕：HN のタイトルは今も **KetchUp** ですが、サイトとリポジトリはすでに **BenchUp**（「formerly KetchUp」）へ改名済みで、README は旧 `.ketchup` プロジェクトに言及したまま — 発表の 1 日後の改名です。

**Why it matters:** SketchUp のオーナー変更以降、工房級 CAD のニッチには信頼できる自由ソフトウェアの答えが欠けており、これはこれまでで最も真剣な試みです — 1 つの Rust コードベースからネイティブアプリとブラウザ版の両方を。そしてこの途中改名は、このフィードが繰り返し測っている「発表 vs アーティファクト」のずれの生きた標本：引用すべきはリポジトリの現在の名前で、ローンチタイトルの名前ではありません。

[`🔗 BenchUp3D/editor`](https://github.com/BenchUp3D/editor) · [`🔗 HN 議論`](https://news.ycombinator.com/item?id=50418176)

---

## 19. Dux Modular Shell 2.1：waybar と 5 つのデーモンの Wayland デスクトップを 1 つの QML シェルで置き換える — HN 225 ポイント

- **Velocity:** ▮▮ rising
- **Source:** Hacker News · 225+ pts · 9.7h ago (~03:08 UTC+8)
- **Tags:** `linux` `wayland` `desktop`

DMS 2.1（「Stormborn」、11 月 4 日リリース。現行 v2.1.2）は Quickshell 上の QML + Go バックエンドのモノレポで、パネル・ウィジェット・ランチャー・ロック・アイドル・通知・polkit を提供し、waybar/swaylock/swayidle/mako/fuzzel の組み合わせの置き換えを明言 — niri、Hyprland、Sway、labwc、MangoWC、Scroll、Miracle WM に対応。2.1 ではインターフェース密度プリセット（Spacious〜Dense）、「DMS Classic」スタイル、同期歌詞つきメディアプレイヤー、動画壁紙、インストーラの Fedora Atomic 対応を追加。8.9k スターで、Arch の `extra` 公式リポジトリに入っており（AUR だけでなく）、最終コミットは 11 月 8 日。HN のタイトルは「desktop shell with file manager」と過小説明ですが、スイートはシェルに Dux Files・カレンダー・Greeter まで含みます。

**Why it matters:** GNOME/KDE 以後の Wayland 世界で欠けていたピースは「組み上がったデスクトップレイヤー」であり、コンポジター非依存のシェルがディストロ公式リポジトリに届いたことは、「コンポジターを選び、シェルを選ぶ」をカスタマイズの趣味からサポートされる構成へ変える節目です。

[`🔗 duxlabs.dev — v2.1 リリースノート`](https://duxlabs.dev/blog/v2-1-release) · [`🔗 duxlabs-dev/dux-shell`](https://github.com/duxlabs-dev/dux-shell) · [`🔗 HN 議論`](https://news.ycombinator.com/item?id=50416053)

---

## 20. RAM Altman：アイドル RAM の数値を毎日 Sam Altman にメールする cron スクリプト — DRAM 価格高騰がミームに

- **Velocity:** ▮▮ rising
- **Source:** Hacker News · 216+ pts · 11.5h ago (~01:20 UTC+8)
- **Tags:** `humor` `hardware` `dram`

このプロジェクト（リポジトリ 11 月 5 日作成、821 スター）はタイマーで走るシェルスクリプト：RAM の 10% 超が空いているとき、マシンの実際の `MemTotal − MemAvailable` の数値を入れたローテーション文章の 1 つを Altman に送ります。送らずに確認する `--dry-run` 付き。ネタの種は Altman の発言 — 家庭用 PC の DRAM は「おそらく時間の 5% しか使われていない」、個人のマシンに DRAM を溜め込むのは「かなり悪手」— で、この発言が今年の AI 駆動メモリ価格高騰と重なりました。褒めるべきはプロジェクト自身が訂正を載せていること：サイトは Altman が発言を文脈無視で取り上げられたと述べたこと、「i want you to have so much ram」と投稿したこと、一時 X で名前を Ram Altman に変えたことを明記し、プロジェクトはパロディで無関係と自己表示しています。

**Why it matters:** 冗談に 200+ ポイントは温度計の読みです — メモリ価格の痛みは、まさにこの読者層でミーム化しました。そして「刺」の隣に「訂正」を載せたミームのサイトは、同じ発言を真面目に報じた大半の記事よりソース衛生が良い。

[`🔗 ram-altman.lol`](https://ram-altman.lol/) · [`🔗 HN 議論`](https://news.ycombinator.com/item?id=50415172)

---

## 21. 2026-11-04 の C++26 DIS 否決報道を受けて：Herb Sutter のポストモーテム、決定因子は契約ではなく「the language's creator and its owners disagree」

- **Velocity:** ▮▮ rising
- **Source:** Hacker News · 91+ pts · 5.4h ago (~07:28 UTC+8)
- **Tags:** `cpp` `standards` `iso`

P4454R0（日付 2026-10-31。isocpp.org の 9 ページ PDF）は tl;dr をこう開きます：「The core decisive issue that caused the DIS to fail is that the language's creator and its owners disagree.」Sutter の 3 つの事実：WG21 には contracts への強い合意がある（2026-03 の Croydon で 114–12）；「For the first time since WG21 was formed 36 years ago, C++'s creator is siding with the minority」— つまり創作者が少数派に立って DIS に反対した。そして各国標準機関は Bjarne Stroustrup の異議に重みを置くことを選んだ — ロビイングで「more than doubled the numerical NB opposition」、票は反対 1 票の乗り換えと棄権 1 で通っていたほど接戦だった。手続への不満に対しては合意の数字を擁護：EWG の椅子は会社ごとの重複排除のために「quietly counted every contracts poll twice」。C++26 の選択肢を 6 つ表にします — ISO 出版そのものを飛ばす（Option A）から、国家団体や Linux Foundation へ標準化を移す（Option E/F）まで — そして編集注：論文のレビューで Bjarne は、Option B（contracts を外して再投票、理想的には 6 週間で新しい DIS）が「is the outcome he most wants to see」だと述べたと。

**Why it matters:** 今週の投票は contracts の設計争いとして報じられましたが、一次のポストモーテムは技術的議論が二次で、効いたのはすべての標準組織がいずれ直面するガバナンスの問い — 創業者の異議が委員会の合意に対してどの重みを持つか — だと論じます。そして生きた可能性を名指しします：C++26 は contracts なしで発行されるかもしれない。

[`🔗 P4454R0（PDF、isocpp.org）`](https://isocpp.org/files/papers/P4454R0.pdf) · [`🔗 HN 議論`](https://news.ycombinator.com/item?id=50418818)

---

## 22. Keycloak のトークン交換署名バイパス、公開勧告は修正より 130 日遅れ — CVE-2026-11800、8.1

- **Velocity:** ▮▮ rising
- **Source:** GitHub Advisory DB · GHSA-j97h-3f8r-mrjr · Nov 3 (~6d ago)
- **Tags:** `security` `cve` `identity`

CVE-2026-11800（CVSS 3.1 8.1、Red Hat CNA `secalert@redhat.com`。NVD レコードは `Analyzed` で Red Hat のスコアが唯一のメトリック — NVD が自スコアを出さない背書型 — に CISA-ADP の SSVC コンテナ）：「This JWT algorithm confusion vulnerability in the JWT Authorization Grant flow allows an attacker with valid client credentials to bypass signature verification」— 有効なクライアント認証情報（`PR:L`）を持つことを門に、不正なアクセストークンを鋳造できる、ID プロバイダに起こりうる最も深い切り口です。修正は上流 **26.6.4 で 2026-06-26 に投入済み**。それを記録する GHSA は **2026-11-03** にようやく登場 — 130 日の差。現行の 26.8.2 系（11 月 5 日）は修正済み。Red Hat の RHBK コンテナは 26.6.4-2/26.6-8。

**Why it matters:** 世界で最も広く展開されている ID プロバイダの一つのトークン交換が bypass されるのは、データ漏えいではなくクレデンシャル鋳造の原語です — そして物語の主役は開示の時計：勧告の公開に合わせてパッチした人は、コードが直った後も 4 か月間脆弱なフローを走らせていました。あなたの ID プロバイダが 6 月に何を直したかを確認してください。11 月に何を公表したかではなく。

[`🔗 CVE-2026-11800 on NVD`](https://nvd.nist.gov/vuln/detail/CVE-2026-11800) · [`🔗 GHSA-j97h-3f8r-mrjr on OSV`](https://osv.dev/vulnerability/GHSA-j97h-3f8r-mrjr)

---

## 23. IBM Qiskit、8.4 が 2 本 — 量子チェックポイントの脱シリアライズ RCE と、自分の修正バージョンを範囲に含むレコード

- **Velocity:** ▮▮ rising
- **Source:** NVD · 2 レコード · Nov 8 17:16Z (~01:16 UTC+8)
- **Tags:** `security` `quantum` `deserialization`

CVE-2026-116499 — 「IBM Qiskit SDK 1.4.2 through 2.6.2 could allow a local attacker to execute arbitrary code due to deserialization of untrusted data」：フォーマットバージョン 13 未満の QPY ファイルはデシリアライズに内部的に SymPy を使うため、細工した `.qpy` チェックポイントがロード時にコードを実行します。CVE-2026-116501（2.4.0–2.6.1）は破損したユニタリ行列による out-of-bounds write。両方とも 8.4 CVSS 3.1（IBM CNA `psirt@us.ibm.com`、Secondary スロット）、NVD は `Awaiting Analysis`、CISA-ADP の SSVC 付き（悪用：なし。自動化可能：否。技術的影響：total）。両方とも **v2.6.2** で修正済み（PyPI 2026-11-05 — レコードの 3 日前）。そして範囲の奇癖はレコード自身の説明文にあります：「1.4.2 **through** 2.6.2」なのに公告の remediation は「2.6.2 にアップグレード」— 修正バージョンがその影响範囲の中にいます（姉妹レコードの「2.4.0 through 2.6.1」は健全）。

**Why it matters:** モデルファイルをロードしたらコードが走るクラスが量子スタックに到達しました — `.qpy` ファイルは notebook や講義資料で共有されるアーティファクトで、ここでの「ローカル」とはあなたのチェックポイントを開く誰かのこと。そして「修正バージョンまで through」の範囲算術は、バージョンスキャナが文字通り従うものです。引用するのは公告のアップグレード行で、レコードの範囲ではありません。

[`🔗 IBM セキュリティ公告（CVE-2026-116499）`](https://www.ibm.com/support/pages/node/7295238) · [`🔗 CVE-2026-116499 on NVD`](https://nvd.nist.gov/vuln/detail/CVE-2026-116499)

---

## 24. Stanford Stanza：bytes フィールドに隠した pickle が `torch.load(weights_only=True)` をバイパス — CVE-2026-115878

- **Velocity:** ▮▮ rising
- **Source:** NVD · 1 レコード · Nov 3 21:17Z (~6d ago)
- **Tags:** `security` `ai` `pickle`

CVE-2026-115878（CVSS 3.1 7.8、GitHub CNA `security-advisories@github.com`。NVD は `Received`）：「From 1.14.0 until 1.15.0, loading an attacker-supplied lemmatizer checkpoint」で任意コードが実行されます — stanza は lemma 化器の `pos_dict` を gzip 圧縮 pickle としてチェックポイントの `dicts` フィールド（**`bytes`** 値）に格納しており、`torch.load(weights_only=True)` は `bytes` をプリミティブとして扱うため、許可リストは内側の pickle を検査しません（ベクトル `AV:L/PR:N/UI:R` — モデルをロードした人の権限で走ります）。**1.15.0** で修正済み（PyPI 2026-10-01、公告の 32 日前。PR #1649）。

**Why it matters:** チェックポイントをロードするときみんなが手を伸ばす安全スイッチが `weights_only=True` です。これは修正済みの反例で、その死角 — シリアライズ済みペイロードを運ぶプリミティブ型 — が、大きなパイプラインが日常的に包む小さな NLP ライブラリの中にあることを示します。チェックポイントサプライチェーンの話は、毎回ガードより一層深いところに出てきます。

[`🔗 GHSA-gh9r-c94j-cmp5 on OSV`](https://osv.dev/vulnerability/GHSA-gh9r-c94j-cmp5) · [`🔗 CVE-2026-115878 on NVD`](https://nvd.nist.gov/vuln/detail/CVE-2026-115878)

---

## 25. WeChat の WeLM-Image、オープンソース画像生成の首位を主張 — 重みのない 31.7B MoT レポート

- **Velocity:** ▮▮ rising
- **Source:** arXiv · 2611.07392 · Nov 5（HF papers 約 42 賛）
- **Tags:** `research` `image-generation` `tencent`

WeChat Vision の技術レポート：統合画像基盤モデル（理解・生成・指示編集・マルチ参照合成）は Mixture-of-Transformers バックボーン — 共有アテンション、独立した理解/生成パラメータ — で、各パスに MoE：**保存パラメータ 31.7B、対象 latent トークンごとに約 5.4B の生成パラメータが活性**、ネイティブ 1.5K 解像度で学習し、rubric/チェックリスト報酬 RL と noise-aware on-policy 蒸留を経ます。要旨の見出し：1536 解像度モデルが PRISM-Bench など 3 つのベンチで「ranks first among the evaluated open-source models」。Turbo 版（MeanFlow 少ステップ蒸留）は H20 1 枚で 1024×1024 を **4.98 秒** で生成。論文は編集ベンチ WeGenEditBench（厳選 2,740 サンプル）も自作し、既存の編集ベンチにサンプル固有の検証基準が欠けると論じます。そして決定的な注意：**公開重みなし** — Hugging Face 検索は空で、論文にリリース計画の記載もありません。

**Why it matters:** 「評価したオープンソースモデルの中で 1 位」は、著者が選んだ比較集合についての主張で、モデルを未公開のラボからのものです — Tencent の本番スタックがどこまで来ているかの本物の信号ではありますが、現時点で走行できるモデルでも、検証できるリーダーボードでもありません。

[`🔗 arXiv:2611.07392`](https://arxiv.org/abs/2611.07392) · [`🔗 Hugging Face papers`](https://huggingface.co/papers/2611.07392)

---

## 26. Vercel の json-render、検証付きジェネレーティブ UI を Chat SDK エージェントへストリーミング — 19.5k スターと、AI 生成 UI を制約する仕様

- **Velocity:** ▮▮ rising
- **Source:** GitHub Trending · +149 today · 19.5k stars
- **Tags:** `agents` `generative-ui` `frontend`

11 月 7 日の changelog が json-render を Chat SDK エージェントに接続：エージェントは型付けされた JSON スペックを出力し、Slack Block Kit や Teams Adaptive Cards のカードとして描画されます。編集はストリーミングで、変更は最大 500 ms に 1 回へ間引き。`toCard` は各要素の props をコンポーネントスキーマに対して検証し、項目ごとの診断付き `CardSpecError` を投げます — そのままモデルへ返せるように設計されています。Apache-2.0 のコアは React、Vue、Svelte、Solid、React Native、ink（ターミナル）、react-three-fiber、react-pdf、remotion、email のアダプタを同梱。v0.22.0 は 11 月 4 日リリース。

**Why it matters:** AI に「constrained to your catalog」の UI を書かせるのは、すべての agent-UI 製品が収束しているパターンです。これは validation-and-retry をプロトコルに置きます — カードはスキーマの型検査に通るか、モデルが正確な違反リストを受け取るか — プロンプトで挙動を祈るのではなく。

[`🔗 vercel-labs/json-render`](https://github.com/vercel-labs/json-render) · [`🔗 Vercel changelog`](https://vercel.com/changelog/json-render-and-chat-sdk-agents)

---

## 27. Paradev、MIT への移行数時間後に Desktop Canary をリリース：CLI エージェントに 1 ワークスペース、タスクに 1 worktree — 16.1k スター

- **Velocity:** ▮▮ rising
- **Source:** GitHub Trending · +39 today · 16.1k stars
- **Tags:** `agents` `devtools` `worktrees`

Paradev は Claude Code、Codex、OpenCode、Gemini CLI、Cursor Agent をオーケストレーションするデスクトップアプリ：タスクごとに git worktree・ブランチ・端末を割り当て、アプリ内 review/PR ペインとワークスペースごとの dev-server プレビューを備えます — 「コーディングエージェントそのものではなく……モデル呼び出しをプロキシしない」。desktop-v2.0.6（11 月 8 日）は Bring-Your-Own-Cloud ガイドと MIT へのライセンス変更を追加。**Desktop Canary** — 2026-11-09T00:53Z 公開の main の自動ビルド、内部テスト用で不安定な可能性ありの印付き — はデスクトップラインの次の一手の初お目見えです。macOS（Apple Silicon/Intel）と実験的な Linux AppImage。Windows 版なし。CLI は今も `superset` という名前で、Apache Superset とは明確に無関係です。

**Why it matters:** CLI エージェントの指揮レイヤーは急速に統合が進んでおり、Paradev の立ち位置 — モデルとの関係を持たない、MIT、クラウドは持ち込み — は Conductor/Codex アプリ型のインキュンベントへの正面の一撃です。見るべき賭けは、モデルベンダーロックインのないオーケストレーションが、インキュンベントのバンドリングに耐えられるか。

[`🔗 ParadevAI/Paradev`](https://github.com/ParadevAI/Paradev) · [`🔗 releases`](https://github.com/ParadevAI/Paradev/releases)

---

## 28. kortix-ai/CompanyOS：常駐エージェントとサーバーサイド Goals、クローズできるのは検証セッションだけ — v0.15.1、20.6k スター

- **Velocity:** ▮ steady
- **Source:** GitHub Trending · +72 today · 20.6k stars
- **Tags:** `agents` `open-source` `automation`

CompanyOS は pi ランタイムの上に築かれたイベント駆動マルチエージェントの「会社のオペレーティングシステム」：エージェントはスケジュール・webhook・ツールイベント・チームメッセージで起動し、それぞれ永続状態つきの自分のクラウドコンピュータを持ち、3,000+ アプリ接続を標榜します。v0.15.1（11 月 7 日）は Goals を API へ移しサーバーサイド状態に —「only a verifier session can mark a goal done」— さらに Proactive Spaces を追加：「Space のイベントフィードを読み、本当に重要なときだけ声を上げる」ウォッチャーです。

**Why it matters:** 常駐エージェントのスタックはオープンソースで形になりつつあり、その難所は信頼です。自分のゴールを自分でクローズできないエージェント — 別の検証セッションがそうする — は、「誰がエージェントの宿題を検査するのか」をプロンプトの指示ではなくアーキテクチャの事実にした、最初期のオープンソース設計の一つです。

[`🔗 kortix-ai/CompanyOS`](https://github.com/kortix-ai/CompanyOS) · [`🔗 releases`](https://github.com/kortix-ai/CompanyOS/releases)

---

## 29. Muir：Google、ゲート付き delta-rule アテンションの erase ゲートは低ランクでよいと発見 — 2,560 倍の長さ外挿も

- **Velocity:** ▮ steady
- **Source:** arXiv · 2611.08376 · Nov 5（HF papers 約 9 賛）
- **Tags:** `research` `linear-attention` `architecture`

Gated DeltaNet-2 は KV 状態を減衰させ、新しい値を書く前に incoming key への予測を消します。Muir の出発点は「state updates are far less sensitive to erasure than to writes」— key の活性化と単位正規化が key のエネルギーを疎なチャネル部分集合に集中させる — だから erase ゲートは**低ランク**でよい。Muir はすべてのゲートを 1 つの感度配分 low-rank 投影に融合し、matched-filter の readout ゲートを加え、節約したパラメータをより広い FFN に再投資し、大きな chunk での数値安定のために並列形式を用意します。166M〜1.34B パラメータで：perplexity は GDN-2 比 −1.8〜2.0%、Transformer 比 −2.5〜3.6%。1.34B では multi-hop・multi-needle 検索に勝ち、4K の学習長から 1000 万トークンのストリームまで **2,560 倍** を外挿します。論文自身の限界（discussion より）：固定のゲートランク予算では、静的と動的の readout が単一視野の保持と多ラグの適応を引き合いに出し合うこと。そして Splash Attention は短いコンテキスト（約 11K 未満）では依然速い — 融合された Pallas カーネルを持つのに対し、XLA は chunk の中間量を HBM に materialize するからです。

**Why it matters:** flash-linear-attention の実務者が実際に学習するスケールでの、測定付きのゲート付き delta-rule ファミリーの簡素化です。外挿の見出しを引用する前に、短コンテキストでの退行という正直な注記を携えてください。

[`🔗 arXiv:2611.08376`](https://arxiv.org/abs/2611.08376) · [`🔗 Hugging Face papers`](https://huggingface.co/papers/2611.08376)

---

## 30. latent 通信の利得は本当に通信から来るのか？ PLatour の対照実験は「時に違う」— それを見抜くテストも同梱

- **Velocity:** ▮ steady
- **Source:** arXiv · 2611.06976 · Nov 4（HF papers 約 15 賛）
- **Tags:** `research` `multi-model` `evaluation`

PACT（prefill から自己回帰へのクロスモデル転送）は、大きな凍結モデルのプロンプト表現と小さなモデルの安価な生成を組み合わせます。PLatour はそのオープンソースフレームワーク — ゼロ初期化の線形ブリッジで、オープンソースベースラインを上回り、より小さなセンダーで既存システムの報告値を共有の数学・コーディングベンチで超えたと報告 — そして論文の真の貢献が置かれます：「controlled experiments show that the gains on some tasks can be reproduced by uninformative sender signals, self-communication, or receiver-only training.」つまり、訓練可能なブリッジはセンダーの有用な情報をまったく使わずに、パラメータ効率的な適応として振る舞えるのです。論文は **PACT-Check** を同梱します：訓練済みシステムの利得のうち、本当に通信である部分を定量化するテストです。

**Why it matters:** latent 通信やクロスモデル圧縮の論文はエンドタスクの差分を報告します。これは「小さいモデルが大きいモデルを本当に使った」と「ブリッジはただの小さな LoRA の変装だった」を区別する陰性対照を提供します。次の見出し数字を信じる前に、まず実行を。

[`🔗 arXiv:2611.06976`](https://arxiv.org/abs/2611.06976) · [`🔗 zhenyi4/platour`](https://github.com/zhenyi4/platour)

---

## 31. SAE Interprets MoE：エキスパートごとの正確な特徴帰属 — すべての latent の pre-activation はエキスパートへ分解でき、数え上げ不要

- **Velocity:** ▮ steady
- **Source:** arXiv · 2611.08089 · Nov 5（HF papers 約 7 賛）
- **Tags:** `research` `moe` `interpretability`

既存の MoE 分析は「ドメインラベル付きコーパスでエキスパートが選ばれた回数を数える道具であり、……選択を記録するのであって貢献を記録しない」。ByteDance Seed の代替：MoE 層の出力はエキスパート出力の router 加重和であり、SAE エンコーダはアフィンなので、**すべての latent の pre-activation はエキスパートへ正確に分解できる** — 選択ではなく貢献です。Qwen3-30B-A3B（第 4/30/46 層）では：貢献は「far more concentrated than gating」で、ほとんどの latent に 1〜2 の支配的エキスパートがあり、自動解釈された支配集合はサブドメイン特化を示す — Java とフロントエンド web コード、幾何と算術・多項式で、別のエキスパートです。コード公開済み（Bytedance-Seed/SAE-Interprets-MoE）。論文自身の注意：粗いドメイン間でエキスパート数は「very unequal」であり、集中の主張にはそのベースレートを添える必要があります。

**Why it matters:** 正確（相関ではなく）な帰属手法にコードが付き、人々が実際に走らせているモデルで動きます。「選択 vs 貢献」の区別は、ルーティングされるモデルのエキスパートが実際に何をしているか監査する人全員に使い回せる部分です。

[`🔗 arXiv:2611.08089`](https://arxiv.org/abs/2611.08089) · [`🔗 Bytedance-Seed/SAE-Interprets-MoE`](https://github.com/Bytedance-Seed/SAE-Interprets-MoE)

---

## 32. Agentero：エージェントが改訂チェック付きのラベーブルに書き込み、読み取り専用 UI ブロックを返す研究ワークスペース — v0.15.3

- **Velocity:** ▮ steady
- **Source:** GitHub Trending · +145 today · 2.1k stars
- **Tags:** `agents` `research-tools` `chinese-oss`

Agentero（MIT、中国語優先で英語 README 付き、2.1k スター、本日 +145）は、人間とエージェントが 1 つのコンテキストを共有するデスクトップ研究ワークスペースです。v0.15.3（11 月 8 日 23:58Z）はエージェント返信内に描画される読み取り専用の構造化 UI ブロックを追加 — `openui-lang` コードフェンスから解析（layout/text/state/data/paper-reading コンポーネント）— ほかにドラッグできる PDF 翻訳フロートカードと、デスクトップの取得パイプラインを共有する CLI feed コマンド。v0.15.2 はエージェントが `table_query`/`table_upsert` で改訂チェック付き書き込みをするラベーブルと、Papers-with-Code 統合を追加しました。

**Why it matters:** この設計の分業こそが要点です：モデルにはきれいで構造化され改訂チェックのある書き込み先のコンテキストを与え、人間は快適な PDF の世界にとどまり、読み取り専用の描画だけを受け取る。エージェントコンテキストの断片化への具体的な答えで、この形の道具を送り続けている中国 OSS 界からのものです。

[`🔗 poco-ai/Agentero`](https://github.com/poco-ai/Agentero) · [`🔗 releases`](https://github.com/poco-ai/Agentero/releases)

---

## 33. microduck：脳みそ全部がオープンソースの 800 g 二足歩行アヒル — MuJoCo 訓練の RL ポリシー、毎時の検証済みビルド

- **Velocity:** ▮ steady
- **Source:** GitHub Trending · +599 today · 13.6k stars
- **Tags:** `robotics` `reinforcement-learning` `open-source`

pollen-robotics の microduck は約 25 cm / 800 g の二足ロボットで、Rockchip RK3566 の上の 50 Hz 制御ループが 15 サーボを駆動します。ポリシーは姉妹リポジトリ `microduck_rl` で訓練された RL — MuJoCo + PPO、sim2real、ONNX エクスポート — で、歩行、ローラー（車輪）、くちばしでのピックアップ、自己立ち直りのモードを持ち、ファームウェア更新は「verified, health-gated and reversible」（daemon 0.18.9-dev ビルドは本日時刻を押したばかり。実機は pollen-robotics.com で販売）。正直な備考一枚：今週の急上昇（+599 スター/日）の公開トリガーは見つかりませんでした — HN 投稿も報道もなし。検証できるのはリポジトリ、休みのないリリースの歩調、そして出荷済みのスタック一式です。

**Why it matters:** ホビー価格のロボットはほぼすべて閉じた制御スタックを積んで出荷されます。これには完全な訓練ツールチェーンが公開されており、「自分で再現する」が宣伝文句ではなく検証可能な主張になっています。見るべきは見つからないトリガーのほう — 速度を引用する前に調査を。

[`🔗 pollen-robotics/microduck`](https://github.com/pollen-robotics/microduck) · [`🔗 releases`](https://github.com/pollen-robotics/microduck/releases)

---

## 34. Aphyr が Harvest を弔う：Bending Spoons のもとで請求書が月 $13.32 から $133.98 へ

- **Velocity:** ▮ steady
- **Source:** Hacker News · 75+ pts · 2.9h ago (~09:58 UTC+8)
- **Tags:** `saas` `pricing` `industry`

Kyle Kingsbury — Jepsen の作者 — による Harvest、つまりタイムトラッキング/請求書 SaaS についての悼辞。2025 年に Bending Spoons（彼の枠組みでは「the company that gutted Vimeo」）に買収されました：彼のプランは **月 $13.32 から $133.98 へ**、全員を「enterprise」プランと「unlimited」使用量課金への強制移行によって — 彼の言葉では「as far as I can tell, exactly what I had before」。月 $12.65 の「flex」プランは通常約 3% のカード手数料の上にさらに 2% を skim し、サポートのメールは今や LLM が返す —「they don't read customer emails any more.」注意：これは一人の顧客の記述です — 彼自身のプラン価格であり、条項に対する彼自身の解釈です。

**Why it matters:** フリーランサーのインフラ（請求、時間管理）は買収後に約 10 倍で再価格設定されており、型は見覚えがあります — 全員を一つのプランへ移行し、既存の使用量を課金項目に付け替え、サポートを収益化する。実務的な教訓は、移行メールが届いてからではなく届く前に自分の更新料を見積もることです。

[`🔗 aphyr.com — RIP Harvest`](https://aphyr.com/posts/427-rip-harvest) · [`🔗 HN 議論`](https://news.ycombinator.com/item?id=50420035)

---

## Metadata

| Field | Value |
|-------|-------|
| Generated | 2026-11-09T05:12:07Z |
| Items | 34 |
| Sources tracked | 24 (Hacker News, GitHub Trending, NVD, CISA-ADP enrichment, VulnCheck advisories, IBM security bulletins, WPScan, GitHub Advisory DB, OSV Advisory DB, arXiv, Hugging Face Papers, NVIDIA Newsroom, isocpp.org, shubs.io, duxlabs.dev, vercel.com changelog, aphyr.com, ram-altman.lol, ketchup3d.github.io, The Decoder, MailRoute, linebender.org, packethound.app, hamza.se) |
| Update schedule | 04:03, 12:03, 20:03 UTC+8 (3x daily) |
| Ranking | Velocity-weighted (recency × engagement acceleration × source authority) |
| License | [CC-BY 4.0](https://creativecommons.org/licenses/by/4.0/) |

[Previous day](2026-11-08.md) · [Raw .md](https://trending.md/jp/feed/latest.md) · [Archive](../archive/index.md)
