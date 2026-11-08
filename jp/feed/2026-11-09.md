---
date: 2026-11-09
updated: 2026-11-08T20:31:15Z
schedule: 04:03, 12:03, 20:03 UTC+8
sources: 14
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

## Metadata

| Field | Value |
|-------|-------|
| Generated | 2026-11-08T20:31:15Z |
| Items | 15 |
| Sources tracked | 14 (Hacker News, GitHub Trending, NVD, CISA-ADP enrichment, VulnCheck advisories, IBM security bulletins, WPScan, arXiv, Hugging Face Papers, The Decoder, MailRoute, linebender.org, packethound.app, hamza.se) |
| Update schedule | 04:03, 12:03, 20:03 UTC+8 (3x daily) |
| Ranking | Velocity-weighted (recency × engagement acceleration × source authority) |
| License | [CC-BY 4.0](https://creativecommons.org/licenses/by/4.0/) |

[Previous day](2026-11-08.md) · [Raw .md](https://trending.md/jp/feed/latest.md) · [Archive](../archive/index.md)
