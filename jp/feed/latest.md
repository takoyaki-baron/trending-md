---
date: 2026-11-12
updated: 2026-11-12T12:35:50Z
schedule: 04:03, 12:03, 20:03 UTC+8
sources: 46
license: CC-BY-4.0
---

# trending.md — 2026-11-12

## 1. AWS が公式 org 配下でローカル AWS エミュレータを公開——Rust 製、Werner Vogels の解説付き

- **Velocity:** ▮▮▮ trending
- **Source:** Hacker News · 306+ ポイント · 1.7 時間前（~02:45 UTC+8）
- **Tags:** `aws` `emulator` `local-development`

Amazon が **aws/aws-emulator**——"AWS API のローカルエミュレータ"——を公式 GitHub org に置き、HN のスレッドは 2 時間で 300 ポイントを超えた。AWS のワイヤプロトコルを定義するのと同じ Smithy モデルで駆動される、"one crate per service" の Rust Cargo ワークスペースだ。自己署名証明書で `127.0.0.1:9297` で HTTPS を提供し、AWS CLI や SDK は環境変数で向き先を変えられる。**組み込みモード**——テストごとに隔離されたインプロセスインスタンスを 1 つ走らせる Rust dev-dependency——と、エージェントフックも用意され、`aws agent-toolkit add-skill` でコーディングエージェントのスキルとしてインストールできる。README は珍しく率直だ："Don't use it for production workloads or to test security"、各リリースに忠実度スコアを公開、ソースビルドには約 100 GB のディスクが必要、そして"This repository does not take PRs."。Werner Vogels は同日、"when agents write the code" の時代のエンジニアリングを論じる companion エッセイを出した。

**Why it matters:** ローカル AWS エミュレーションは 10 年間サードパーティの領土だった（LocalStack など）。公式の、CC0 ライセンスの、Smithy 駆動のエミュレータは CI とテストのデフォルトを変える——テストごとの組み込みモード設計と agent-toolkit スキルは、Amazon が開発者優先ではなくエージェント優先で構築していることを示す。デフォルト ON のテレメトリと「PR を受け付けない」方針が、読むべき 2 つの細部だ。

> "AWS Emulator is a local emulator of the AWS APIs" … "Don't use it for production workloads or to test security." — README

[`🔗 aws/aws-emulator`](https://github.com/aws/aws-emulator) · [`🔗 Vogels: AWS Emulator and the engineer's job`](https://www.allthingsdistributed.com/2026/11/aws-emulator-and-the-engineers-job-when-agents-write-the-code.html) · [`🔗 HN での議論`](https://news.ycombinator.com/item?id=50456631)

---

## 2. Google の SWE が 48 体の AI エージェントを NASA の LiDAR に向けた——「未踏のマヤピラミッド」は再発見だった

- **Velocity:** ▮▮▮ trending
- **Source:** pietromiotti.com · HN 843 ポイント · 8 時間前（11 月 11 日 ~20:20 UTC+8）
- **Tags:** `ai-agents` `lidar` `archaeology`

Pietro Miotti の記事——この日の HN 最大の話題で 843 ポイント——は、ペルー旅行中の「とりとめのない考え」（10 月 18 日）からメキシコ INAH の公式回答まで**72 時間未満**しかかからなかったと語る。マヤ地域の公開 NASA LiDAR 約 1,200 km² を、画像として描画した LiDAR ストリップを **48 体のエージェント**が目視検査して一晩で分析した（"There was no special model or classifier involved: the agents literally looked at the pictures"）。エージェントは、整地された広場、高さ 8–12 m の楕円形ピラミッド、盛り上げた中庭、雨溜まりと思われる構造を持つ山頂遺跡を検出し、10 月 21 日に INAH の登録簿がその座標に登録遺跡がないことを確認した。**11 月 11 日のアップデートが見出しが省いた部分だ：**考古学者から、同じ遺跡は **Estrada-Belli ら 2025 年の論文**ですでに公開されていたと指摘された——"The agents missed it while going through the literature, so they rediscovered it rather than discovered it (it just wasn't in the register of Mexico's National Institute of Anthropology and History, INAH, yet)."（エージェントは文献を調べる際にこれを見逃しており、発見というより再発見だった——ただしまだメキシコ国立人類学歴史研究所 INAH の登録簿に入っていなかっただけだ。）

**Why it matters:** このワークフロー（レンダリングしたセンサー画像を読むエージェント、同じ週の公式登録照合）は本物で再現可能だ——だが記事自身のアップデートこそ、エージェントの「発見」が報道周期に乗る前に文献検索が必要な理由の実例だ。見出し級の主張は 1 日で崩れた。「公刊された科学が公式登録簿に届いていない」という INAH 登録のギャップこそが、耐久性のある検証可能な発見だ。

> "One major village doesn't seem to have been registered." ——更新前の本文

[`🔗 Pietro Miotti: マヤ遺跡`](https://pietromiotti.com/latest/maya-site/?maya) · [`🔗 HN での議論`](https://news.ycombinator.com/item?id=50452455)

---

## 3. Tim Peters が亡くなった——Python の禅、Timsort、そして初期の言語共同設計者

- **Velocity:** ▮▮▮ trending
- **Source:** discuss.python.org · HN 454 ポイント · 13 時間前（11 月 11 日 ~15:30 UTC+8）
- **Tags:** `python` `community` `timsort`

Guido van Rossum が Python コア開発者フォーラムに追悼スレッドを立てた："I am immensely sad to announce that Tim Peters has died … earlier this year on July 15." Peters（1952–2026）は **Zen of Python**（`import this`）を書き、2002 年に **Timsort** を発明した——Python のリストソートであり、後に Java と Android に採用された——そしてその前に、コミュニティの「2 番目の実ユーザー」だった。`int`/`float` の混合演算を Guido に受け入れさせ、**pymalloc** を磨き、dict 実装を最適化し、循環 GC とジェネレータを改良し、**doctest、difflib、pickletools、tabnanny** を書いた。Cray Research でスーパーコンピュータのコンパイラ、Dragon Systems で音声認識に従事し、2001 年から 2014 年まで PSF の Director を務め、"Timbot" の名でメーリングリストの数千の投稿に答えた。Guido は "Python-would-not-be-what-it-is-today-without-Tim-ly y'rs" の署名で締めた。

**Why it matters:** Python を Python たらしめているものの多く——すべての Android 端末に入っているソートアルゴリズム、あらゆる開発者が数句は暗唱できる設計のアフォリズム——は、一人の 20 年の貢献だ。このスレッドはまた、希少な一次資料のアーカイブでもある。コア開発者たちが、混合数値演算から pymalloc までの具体的な決定を一箇所に思い出として書き残している。

> "I am immensely sad to announce that Tim Peters has died … It's hard to overestimate Tim's influence on Python." — Guido van Rossum

[`🔗 In memoriam: Tim Peters (1952–2026)`](https://discuss.python.org/t/in-memoriam-tim-peters-1952-2026/110028) · [`🔗 HN での議論`](https://news.ycombinator.com/item?id=50450488)

---

## 4. マルウェアがコピーできない SSH 鍵——macOS 純正ツールだけの Secure Enclave ガイド、そして自分自身への正直な否定評価

- **Velocity:** ▮▮ rising
- **Source:** gatezh.com · HN 366 ポイント · 15.6 時間前（11 月 11 日 ~12:50 UTC+8）
- **Tags:** `ssh` `macos` `secure-enclave`

Serge Gatezh のガイドは、SSH 秘密鍵を**サードパーティソフトなしで** Mac の Secure Enclave に置く：`sc_auth create-ctk-identity -k p256-ne -t bio` がエクスポート不能な P-256 鍵を作り、`ssh-keygen -w /usr/lib/ssh-keychain.dylib -K` が "key handle" ファイルを生成する——これは明示的に鍵**ではなく**、SSH に Enclave への署名依頼をさせるポインタだ。脅威モデルは日常的なもの："Any malicious script that gets access to my filesystem could just copy them and get into all my servers"。目指す性質は "The private key should literally be impossible to extract, even if my Mac is fully compromised."。正直なのは結論だ：完全に機能するにもかかわらず、彼はネイティブ方式を**捨てて Secretive に移った**——Touch ID のプロンプトが "ctccardtoken needs to authenticate to continue" と表示されるからで、"it ended up plain ugly and I can't live with that."

**Why it matters:** `.ssh` ディレクトリの持ち逃げは最も手間のかからない攻撃の一つで、この記事はその依存ゼロの道筋の全体を記録している——罠も含めて（ハンドルは鍵ではない、`ssh-add -K` の古いガイドは非推奨、ファイル名は `~/.ssh/config` に明記が必要）。避けられないトレードは明快だ：**バックアップ不能**——"If your Mac dies, the keys die with it"。だからすべてのサーバーに別のリカバリ鍵も必要になる。

[`🔗 gatezh.com: Protecting SSH Keys with macOS Secure Enclave`](https://gatezh.com/posts/macos-secure-enclave-ssh-keys/) · [`🔗 HN での議論`](https://news.ycombinator.com/item?id=50449748)

---

## 5. The Verge がテレビメーカー 11 社に「覗き見」に関する 17 の質問——3 社が全問に回答、Hisense はメールを無視

- **Velocity:** ▮▮ rising
- **Source:** The Verge · HN 304 ポイント · 6 時間前（11 月 11 日 ~22:20 UTC+8）
- **Tags:** `privacy` `acr` `tv`

The Verge は Amazon、Apple、Google、Hisense、LG、Panasonic、Roku、Samsung、Sony、TCL、ウォルマートの Vizio に、**自動コンテンツ認識（ACR）**について 17 の質問を投げた——テレビが何を見ているか、何が家の外へ出るか、オプトアウトは本当に止まるか。"We now have answers from the top three TV manufacturers as well as every major streaming device company. Some companies declined to answer"、さらに "(One company, Hisense, ignored our emails entirely.)" 最も鋭いデータポイントは外部からだ：ノースイースタン大学の研究は、**ウォルマートの Vizio がオプトアウト後もデータ送信を続けていた**ことを見出した——Vizio はそれを "routine operational data used to support the Vizio experience" とし ACR ではないとし——Samsung と Roku へのトラフィックは "limited, but not stopped completely" だった。

**Why it matters:** ACR は安いテレビが安い理由であり、この記事の構成——同じ 17 の質問、並べて回答、拒否した会社は名前で——はマーケの言葉を比較可能な表に変える。オプトアウトの発見が実行可能な部分だ：セットアップ時の ACR 同意は設定から取り消せる、だが "opting out might not be as effective as it should be."

[`🔗 The Verge: 17 questions for TV manufacturers`](https://www.theverge.com/tech/1012372/tv-privacy-acr-questions) · [`🔗 HN での議論`](https://news.ycombinator.com/item?id=50453474)

---

## 6. 誤報の火災報知器が Jane Street の NYC 唯一のデータセンターを水没寸前に——スプリンクラーまであと 6.4°F

- **Velocity:** ▮▮ rising
- **Source:** michael.bacarella.com · HN 270 ポイント · 3.4 時間前（~01:05 UTC+8）
- **Tags:** `infrastructure` `incident-report` `datacenter`

Michael Bacarella のインシデントレポート：隣の準備室で業者が立てた粉塵が火災報知器を作動させ、報知器は **CRAC 冷却ユニットを停止し**（循環空気は火を助ける）、10 列分のラックの上のスプリンクラー配管を加圧した。スプリンクラーヘッドは約 150°F の熱溶栓が周囲温度で溶けたときだけ放水する——冷却が止まった部屋は「サーバーに水」へ向かって滑り、**どのモニターも警報しなかった**：サーバー単位の高温警告は設定されていなかった、"that happens from time to time" だから。救ったのは人間と幸運だ——香港オフィスの誰かが "server after server … popping up a climbing temperature condition" を偶然見て、9 分の距離に住む著者に電話、著者は "row by row, cabinet by cabinet" 電源ケーブルを引き抜き、画面は "141 F. 142. 143. 143.5. 143.6." を表示していた。

**Why it matters:** 失敗したのは、人間のために設計された安全インターロックをサーバー室に取り付けたことだ：報知器の火災対応は、サーバー室にとって最悪に間違った動作そのものだ。クローゼットデータセンターを運ぶすべての人への教訓——彼は今、小さな OCaml モニターで各サーバーの**オンボード**温度センサーを毎分ポーリングしている。"unknown unknowns can still ruin you"、そして艦隊自身が、沈黙に設定誤りできないセンサーだからだ。

> "141 F. 142. 143. 143.5. 143.6" ——引き抜く直前の最後の読数

[`🔗 False smoke alarm at the Jane Street datacenter`](https://michael.bacarella.com/2026/11/10/false-smoke-alarm-jane-street-datacenter/) · [`🔗 HN での議論`](https://news.ycombinator.com/item?id=50455394)

---

## 7. Apple の Support Community が読み取り専用に、11 月 20 日に永久閉鎖

- **Velocity:** ▮▮ rising
- **Source:** The Verge · HN 244 ポイント · 6 時間前（11 月 11 日 ~22:25 UTC+8）
- **Tags:** `apple` `support` `community`

Apple は Support Community フォーラム——20 年分の修正法、エラーコード解読スレッド、回避策の考古学が蓄積されたユーザー互助掲示板——を**読み取り専用**にし、バナーで閉鎖を告知した："The Apple Support Community will permanently close on November 20, 2026. Starting today, the site will no longer accept new posts and is available in a read-only state." Apple のメッセージはユーザーを "trusted guidance and support on the official Apple Support site" —— curated された KB であり、コミュニティコーパスではない——へ誘導する。

**Why it matters:** フォーラムのスレッドは技術サポートの非インデックス基盤だ——曖昧なカーネルパニックや移行バグをボランティアが解読する場所——なのに、告知には既存スレッドのエクスポート、アーカイブ、リダイレクトについて一切触れていない。11 月 20 日以降、Apple の問題のロングテールへの答えは検索エンジンのキャッシュと Wayback Machine にしか存在しなくなる。これは何年も後に「誰も再現できないバグ」として顔を出す種類の損失そのものだ。

[`🔗 The Verge: Apple is killing its Support Community forum`](https://www.theverge.com/tech/1031507/apple-community-support-forum-shutting-down) · [`🔗 HN での議論`](https://news.ycombinator.com/item?id=50453555)

---

## 8. WebGL2 での超リアルな砂：46 万粒、実物理単位、静止時は完全な無音

- **Velocity:** ▮▮ rising
- **Source:** av/safe-sand · HN 222 ポイント · 6.4 時間前（11 月 11 日 ~22:05 UTC+8）
- **Tags:** `webgl2` `graphics` `physics`

リアリズムを工学仕様として扱うスマホ画面の砂のおもちゃ：**10 万〜46 万個の独立した粒**が WebGL2 で GPU 上をシミュレートされ、"in real units (millimetres, 9.81 m/s²), so how fast sand moves and how much it lags matches the real thing"。各粒は固有のサイズ、鉱物色、摩擦係数を持ち、孤立した粒は転がり、砂の塊は傾きが**安息角**を超えるまで耐える。毎フレーム構築されるハイトフィールドが斜面力、セルフシャドウ、アンビエントオクルージョンを供給する。音は実際に動いている砂の量から合成され——毎秒数千の 2–8 kHz の微細なクリック——"when nothing moves, the output is exactly silent."。品質はフレームが遅いと段階的に下がり（DPR 3→2→1.5、その後粒数を減らす）、まず 30 fps の OS 制限と本当の過負荷を区別し、"never steps back up during a session"。

**Why it matters:** モバイル GPU での物理シミュレーションの凝縮された見本教材だ——実単位のダイナミクス、粒ごとの物性、誠実な適応品質ラダー——ビルド不要の静的サイトとして出荷されている。しかも、自分の品質ステートマシン（`window.sand.info().quality`）をドキュメント化する稀有な消費者デモでもあり、当て推量ではなく適応を検査できる。

[`🔗 Safe Sand（スマホで開く）`](https://av.github.io/safe-sand/) · [`🔗 av/safe-sand`](https://github.com/av/safe-sand) · [`🔗 HN での議論`](https://news.ycombinator.com/item?id=50453288)

---

## 9. 8 時間のエージェント編集を 2 回の LP ソルブで置き換える——weight-space programming が古典アルゴリズムとの対照を得た

- **Velocity:** ▮▮ rising
- **Source:** nathan.rs · HN 199 ポイント · 7.6 時間前（11 月 11 日 ~20:50 UTC+8）
- **Tags:** `interpretability` `optimization` `weight-editing`

Nathan Barry は "weight-space programming"——モデルが生の重みを読み書きする能力への MIT CSAIL の命名（"No gradients, no training loop, just reasoning about what the weights compute"）——を再訪し、GPT-6 Astra の著名な重み編集の大半が**試行錯誤による線形計画の求解**だったと観察する：どの `down_proj` 列を変えるかの選択に約 8 時間、28 回の forward pass。この選択を明示的な L1 最小化 LP（疎な `v`、独自の GPU PDHG ソルバで約 1 分）に定式化し直すと、エージェントの探索を置き換えられる："A couple of LP solves, about a minute each, do the same job with 8× fewer changed weights." Qwen3.5-0.8B の思考ループ病理（MATH-500 の回答の 93% が 32,768 トークンの上限に達する）において、LP 編集は Astra とノイズ範囲で一致する——GSM8K は 69.6 対 68.2、MATH-500 は 51.7 対 50.9——変える重みは 130,188 ではなく 16,291。おまけ：編集はほぼ定数のプッシュなので、単純な推論時ステアリングベクトルで "recovers essentially the whole fix."

**Why it matters:** この記事は agentic な結果の主張を評価するテンプレートだ：エージェントが実際に探索したものを再現し、それが古典的最適化問題だと気づき、アルゴリズムがエージェントに勝つか検証する。著者自身の留保も正しい方向に切れている——"This is one model"、レイヤー選択は依然 Astra から、そしてループ修正はトークンごとの制約すら必要なかった——だから、一般結果ではなく慎重なデータポイントの一つとして読むべきだ。

[`🔗 Can a Linear Program Do Weight-Space Programming?`](https://nathan.rs/posts/weight-space-lp/) · [`🔗 HN での議論`](https://news.ycombinator.com/item?id=50452655)

---

## 10. Atuin Threads：すべてのエージェントセッション、すべてのマシン、一つの検索可能な暗号化ログに

- **Velocity:** ▮▮ rising
- **Source:** Atuin · HN 142 ポイント · 5.9 時間前（11 月 11 日 ~22:30 UTC+8）
- **Tags:** `agents` `cli` `sync`

シェル履歴ツール Atuin が 18.24+ で **Threads** を出荷した："one searchable, synced history for every agent session, on every machine." 売りはハーネス横断の再開だ——"Start a task in Claude Code, then resume it in Codex on another machine"——さらに Git ブランチのようにセッションを**フォーク**し、MCP サーバー（`atuin mcp install claude/codex/pi/opencode`）でエージェント自身が過去セッションを検索して意図や中断された仕事を復元できる。アーキテクチャは既存の同期エンジンに乗る："It's generic, and can sync anything that can be modelled as an append-only log"、そして "Threads is end-to-end encrypted when synced, so we can't read your sessions."。キャプチャはオプトイン。対応ハーネスは現在 Claude Code、Codex、Pi、Omp、OpenCode。

**Why it matters:** エージェントセッションは現在、ツールチェーンで最も移植性のない成果物だ——ハーネスごと、マシンごとに閉じ込められ——そして各ハーネスベンダーの答えはこれまでずっと独自の壁に囲まれた形式だった。ハーネス非依存で追記のみの、E2E 暗号化されたセッション層は、このフィードのメモリ形式サーベイが呼んでいた中立なポジションだ。残る問いは、ハーネスベンダーがそれを採用するか、それともベンダーごとにセッション形式を言い直すかだ。

[`🔗 Atuin: Threads — agent sessions`](https://blog.atuin.sh/threads-agent-sessions/) · [`🔗 atuinsh/atuin`](https://github.com/atuinsh/atuin) · [`🔗 HN での議論`](https://news.ycombinator.com/item?id=50453637)

---

## 11. Google の Gemini Decisions API：テキストではなく確率を返すモデル——1 回の forward pass で 1,000 問

- **Velocity:** ▮▮ rising
- **Source:** Google · HN 新着 · 1.6 時間前（~02:50 UTC+8）
- **Tags:** `google` `gemini` `routing`

Google は 11 月 11 日、**gemini-decision-1** 上の新しいエンドポイント **Gemini Decisions API** を発表した。"fast, closed-set decisions powered by our new Gemini Decision 1 model"——ツール選択、ポリシーチェック、モデルルーティング、コンテキストグレーディングのような有界な選択のためのものだ。1 つのマルチモーダル入力（最大 256K トークン）に "up to 1,000 independent questions" をペアでき、3 つの問型がある：**noul**（はい/いいえの確率）、**choice**（2〜255 の候補と正規化された確率）、**score**（順序付きルーブリック）。トークンを逐次生成する代わりに、1 回の forward pass で "probabilities and confidence scores in 150-250 ms end-to-end latency" を返し、レイテンシは "nearly flat from 1 to 100 questions per request."。価格は "$0.10 per 1M input tokens with zero output tokens billed"——何問評価しても入力はリクエストごとに 1 度の課金——そして "nearly 5x cheaper across the shared benchmark suite than Gemini 3.5 Flash-Lite" と主張する。

**Why it matters:** このフィードがユーザー側から 2 度追跡してきた decision-model パターン（Amazon の 44 倍安いチケッティングルーター、較正された曖昧帯でエスカレートするモデル）が、プロダクト化されたのだ：ルーティング、ポリシーチェック、コンテキストグレーディングが、フォールバックや人間審査に回せる信頼スコア付きの専用プリミティブに。ベンチマークの主張は Google 独自のスイートだ——誰かがルーティングベンチマークを独立に再現するまで、5 倍安いという数字はベンダー数値として読む。

[`🔗 Google: Gemini Decisions API`](https://blog.google/innovation-and-ai/technology/developers-tools/gemini-decisions-api/) · [`🔗 HN での議論`](https://news.ycombinator.com/item?id=50456791)

---

## 12. MongoDB が一波で NVD に 26 件の CVE 記録——9.0 のレプリケーション UAF、そして 4.0 スコアが 3.1 より 1.7 高い macOS TLS バイパス

- **Velocity:** ▮▮ rising
- **Source:** MongoDB · NVD 26 記録 · 11 月 10 日（11 月 11 日 ~04:18 UTC+8）
- **Tags:** `mongodb` `cve` `database`

MongoDB の CNA は 11 月 10 日、ソース `cna@mongodb.com` として **26 件の記録**を NVD に公開した（キーワードではなくソースで数えた——スコアはすべて自己採点）、すべてまだ `Awaiting Analysis`。表の上位：**CVE-2026-118383、9.0**——レプリケーションの use-after-free（ネットワークベクトル、`S:C` のスコープ変更）、**CVE-2026-120824、8.8**——タイムシリーズコレクションの UAF（`PR:L`）、**CVE-2026-120815、8.4**——認可サブシステムの誤った認可。残りはエンジン全体に散る UAF の一族だ——SBE ウィンドウ関数アキュムレータ、プランキャッシュ、サーバーサイド JavaScript、アグリゲーションフレームワーク——加えて Kerberos/SSPI と X.509 クラスタメンバーシップのガード。1 件は小さな CVSS の講義になる：**CVE-2026-120808**、Apple SecureTransport バックエンド下で IPv6 ピアへの信頼チェーン検証をバイパスする macOS TLS クライアントの問題は、同じ CNA から **CVSS 3.1 では 7.4、CVSS 4.0 では 9.1** を付けられている。

**Why it matters:** すべての記録が `jira.mongodb.org` チケット（SERVER-130681、SERVER-134872、SERVER-136505、SERVER-138119/138175…）にリンクしており、影響バージョンの質問は記録から一ホップで答えられる——この波が儀式だけかどうか決める前に、自分のブランチのチケットを確認すること。そして 120808 のスコアは必ずバージョン付きで引用すること：3.1 と 4.0 の 2 つの数字は、同じバグを 2 つのフレームワークのスコープ規約を通した読み方だ。

[`🔗 NVD: CVE-2026-118383（9.0）`](https://nvd.nist.gov/vuln/detail/CVE-2026-118383) · [`🔗 NVD: CVE-2026-120808（macOS TLS）`](https://nvd.nist.gov/vuln/detail/CVE-2026-120808) · [`🔗 SERVER-138119`](https://jira.mongodb.org/browse/SERVER-138119)

---

## 13. Black Ops II がネイティブ ARM64 macOS に静的再コンパイル——Wine なし、ゲームファイルなし、自分の Steam コピーから

- **Velocity:** ▮ steady
- **Source:** adrbn/bo2-mac · HN 126 ポイント · 15.1 時間前（11 月 11 日 ~13:25 UTC+8）
- **Tags:** `static-recompilation` `macos` `reverse-engineering`

このフィードが追ってきた静的再コンパイルの系譜（ブラウザの NFS:U2、そして BO2）に加わる Show HN：**adrbn/bo2-mac** は Call of Duty: Black Ops II を "from 32-bit x86 Windows to native ARM64 macOS" として再構築する——**Remill が x86-32 を LLVM 17 IR にリフト**し、手書きの Win32 ランタイムが OS 層を置き換え、Direct3D 11 は Metal が描く。**Wine 不使用**、リポジトリに**ゲームファイルなし**（自分の Steam コピーを持参）。Apple M1 での報告結果：キャンペーン 51–60 fps、Zombies 57–60、ボット戦 53–60。リポジトリは 11 月 3 日に上がり、README には pipeline、findings、roadmap の各セクションがあり、中国語 README も付く。

**Why it matters:** Apple Silicon 上のレガシー 32 ビット Windows タイトルに対して、静的再コンパイルが勝ち続けている——Wine-on-Rosetta の積み重ねは二重の翻訳税を払う。トレードはいつも同じ：タイトルごと、法的には自分のコピーから作られる成果物だ——だがリフトから Metal までのパイプラインの文書化は、次の移植者の参照になる。

[`🔗 adrbn/bo2-mac`](https://github.com/adrbn/bo2-mac) · [`🔗 HN での議論`](https://news.ycombinator.com/item?id=50449891)

---

## 14. Auth0 自身の RAG リトリーバが FGA に拒否された文書を漏洩——2 件の SDK CVE が「権限認識 AI」パターンを直撃

- **Velocity:** ▮ steady
- **Source:** Okta · NVD 4 記録 · 11 月 10 日（11 月 11 日 ~05:17 UTC+8）
- **Tags:** `auth0` `rag` `authorization`

Okta は 11 月 10 日に 4 件の記録を公開し、そのうち 2 件は「認可システムで検索をフィルタする」パターンが約束するものそのものを突いている：**CVE-2026-107372**（`auth0-ai-js`）と **CVE-2026-108167**（`auth0-ai-python`）——FGA リトリーバは "does not distinguish between authorization checks under different users, relations, or conditions when filtering documents during retrieval-augmented generation, resulting in documents denied by Auth0 FGA being included in the model context and used in the generated response."。ペアの続き：**CVE-2026-126128**、Node SDK の Management API クライアントがパスパラメータを不正に中和し "allowing a request and its attached management API token to be redirected to an unintended endpoint on the same tenant"、**CVE-2026-126129**、ASP.NET Core SDK が "incorrectly determines a session's OIDC Back-Channel Logout status" のためにログアウト済みセッションを受け入れる。NVD の記録に CVSS はない——Okta のアドバイザリは trust.okta.com にある。

**Why it matters:** 権限認識リトリーバルは「ユーザーが読めないものをモデルに読ませない」ための標準的な答えであり、これらのバグはその答えを作ったベンダー自身がその失敗形態を出荷したものだ：アクセスが*許可されるか*をチェックするが*誰の*権限かをチェックしないフィルタ。どんな FGA/ReBAC エンジンでも RAG リトリーバの裏に置くなら、検証すべきはこの形だ——チェックの正しさが呼び出し者 ID から独立していること。

[`🔗 Okta アドバイザリ: auth0-ai-js（CVE-2026-107372）`](https://trust.okta.com/security-advisories/improper-access-control-in-auth0-ai-js-document-retrieval-cve-2026-107372) · [`🔗 NVD: CVE-2026-108167`](https://nvd.nist.gov/vuln/detail/CVE-2026-108167)

---

## 15. Yogurt：無料・プライベート・オープンソースの Granola 代替、会議ボットなしで録音

- **Velocity:** ▮ steady
- **Source:** FrigadeHQ/yogurt · HN 93 ポイント · 4.5 時間前（11 月 11 日 ~23:55 UTC+8）
- **Tags:** `meeting-notes` `privacy` `open-source`

Frigade による Show HN：**Yogurt**——"Private AI meeting notes. Free and open source."（MIT）——ボットを会議に加えずに "without adding a bot to the meeting" ローカルで通話を録音し、人ごとのネクストステップ付きサマリーを出す。デスクトップアプリとして Mac（Apple Silicon）、Windows（x64）、Linux（AppImage）向けに提供、メモリ 8 GB。リポジトリは 11 月 10 日公開で既に 232 スター。位置づけは有料クラウドノートテイカー（Granola、Otter、Fireflies）への直接対抗だ：ボットは通話に加わらず、ノートもマシンから出ない。

**Why it matters:** 会議メモ AI は最も収益化の早い AI カテゴリの一つで、便利さを売りにし、代償はすべての通話に座る録音装置と誰かのクラウド上のトランスクリプトだ。MIT ライセンスのローカル代替は、機密に関わる会議を持つすべての人のデフォルト計算を変える——Show HN で数時間で 90+ ポイントという伸びは、需要がそこにあることを示している。

[`🔗 FrigadeHQ/yogurt`](https://github.com/FrigadeHQ/yogurt) · [`🔗 HN での議論`](https://news.ycombinator.com/item?id=50454625)

---

## 16. Apple の償却済み MIPS：ベクトル DB の最良キーの場所を学習する小型ネットワーク

- **Velocity:** ▮ steady
- **Source:** Apple ML Research · HN 86 ポイント · 3.1 時間前（~01:15 UTC+8）
- **Tags:** `rag` `retrieval` `mips`

Apple の "Faster Retrieval for Better, More Efficient RAG" は、ICML 2026 の論文に基づく**最大内積探索（MIPS）の償却**を紹介する：クエリ非依存の索引の代わりに、固定されたキーデータベースのために小さなネットワークをオフラインで学習する。MIPS がキー集合の*サポート関数*を実現し、その勾配が最良の一致を返すという事実を利用する。2 つの実装：**SupportNet**——入力凸ニューラルネットワークが IVF 索引のセントロイドルーティングを置き換える（95% ルーティング再現率をセントロイドより約 1.9 倍速く、1.74 ms 対 3.36 ms）——と **KeyNet**、最良一致キーを直接予測して標準索引の前の "query rewriter" として機能する（99% 再現率は "takes up to ~8× less time with the largest model (0.23 ms vs 1.8 ms)"、走査キーは約 11 倍少ない）。Natural Questions（約 260 万パッセージ）で学習。

**Why it matters:** 固定されて頻繁に使われるコーパス——RAG の一般ケース——には、検索そのものを償却する道があり、数字は具体的だ。適合性を決めるのは明示された限界だ：この手法は既知の "stable, well-characterized query distribution" を前提とし、データベースごとの学習コストを払う——つまり同じ形のクエリを一日中投げる本番コーパスのための技術であり、差し替える索引ではない。

[`🔗 Apple ML: Faster Retrieval for Better, More Efficient RAG`](https://machinelearning.apple.com/research/faster-retrieval) · [`🔗 HN での議論`](https://news.ycombinator.com/item?id=50455633)

---

## 17. OpenSSL が 5 件の CVE 記録を公開——QUIC のメモリバグ 2 件、CMS の無限ループ、AES-GCM-SIV のペア

- **Velocity:** ▮ steady
- **Source:** OpenSSL · NVD 5 記録 · 11 月 10 日（11 月 11 日 ~03:21 UTC+8）
- **Tags:** `openssl` `quic` `cve`

OpenSSL の CNA は 11 月 10 日に 5 件の記録を公開した。すべて `Awaiting Analysis`、どの記録にも CVSS スコアはない。**CVE-2026-107496**："Encrypting a CMS message to an EC certificate whose group order is 1 may cause CMS_encrypt() … to loop indefinitely"——CMS 暗号化を行うアプリケーションは、渡された受信者証明書経由で到達可能な DoS。QUIC のペア：**CVE-2026-88822**、自動ピア検出が "may allow uninitialized stack data to leak into the received address which is then used as the destination for outgoing packets"、**CVE-2026-95691**、"a retransmitted QUIC CRYPTO frame can release packet storage while the TLS record layer retains a direct pointer into that storage causing use after free"——悪意あるサーバーが OpenSSL QUIC クライアントの heap-UAF 読み出しを引き起こす。AES-GCM-SIV のペア：ゼロ長 AAD 更新がリセットとして扱われる（**CVE-2026-88823**）のと、短い IV が heap out-of-bounds read を起こす（**CVE-2026-95692**）。

**Why it matters:** すべての記録の参照に直接の修正コミットが付いているので、運用者への問いは「どのブランチを走らせているか」に単純化される——QUIC クライアントの UAF と CMS ループは、一般的な設定で信頼できない入力から到達可能だ。記録自身の文章は到達可能性について正確で（"a malicious QUIC server can cause a heap-use-after-free read"）、ブランチのトリアージを推測ではなく機械的な作業にしている。

[`🔗 NVD: CVE-2026-95691（QUIC UAF）`](https://nvd.nist.gov/vuln/detail/CVE-2026-95691) · [`🔗 修正コミット dd90ceb`](https://github.com/openssl/openssl/commit/dd90ceb99a3c2ddba336bb4a00be9ebabd84c2a1)

---

## 18. Intel の TDX 移行トラストドメインが自分のプロトコルに 3 通りで敗れる——1 つのアドバイザリに 9.x が 3 件

- **Velocity:** ▮ steady
- **Source:** Intel SA-01580 · NVD 3 記録 · 11 月 10 日（11 月 11 日 ~02:17 UTC+8）
- **Tags:** `intel` `tdx` `confidential-computing`

Intel の SA-01580 は、**TDX Migration Trust Domain（MigTD）**——機密コンピューティングにおいて信頼された VM のホスト間移行を認証するコンポーネント——の 3 つの脆弱性をカバーし、それぞれ Intel の CNA により CVSS 4.0 で採点、すべて "Ring 0: Hypervisor" 内の権限昇格だ：**CVE-2026-61887（9.4）**、"missing critical step in authentication in the MigTD SPDM rebind implementation"、相手は**未認証ユーザーのネットワーク攻撃者**；**CVE-2026-44685（9.3）**、リバインドプロトコルでのなりすましによる認証バイパス；**CVE-2026-61473（9.2）**、キャプチャリプレイによる認証バイパス。このランの読み取り時点で 3 件すべて NVD により未分析（CVE-2026-44685 は `Awaiting Analysis`、他の 2 件は `Received`）——数字は Intel 自身のものだ。

**Why it matters:** 機密コンピューティングのセキュリティストーリーは認証ハンドシェイクの上に立ち、これらのバグはまさに*移行*経路のリバインド/認証ステップにある——稼働中の VM がどのホストに移れるかを証明する瞬間だ。ライブマイグレーション付き TDX を動かすなら、このアドバイザリがパッチソースだ。機密 VM の信頼をモデリングするなら、移行チャネルが TCB の一部だという確認だ。

[`🔗 Intel SA-01580`](https://intel.com/content/www/us/en/security-center/advisory/intel-sa-01580.html) · [`🔗 NVD: CVE-2026-61887`](https://nvd.nist.gov/vuln/detail/CVE-2026-61887)

---

## 19. herdr：5 万スターの Rust ランタイム、コーディングエージェントが復元可能で観察可能な端末に住む

- **Velocity:** ▮ steady
- **Source:** GitHub Trending 週間 · 今週 +2,196 · 5.03 万スター
- **Tags:** `agents` `terminal` `rust`

**herdrdev/herdr** は 50,277 スター、週間 +2,196："the runtime your coding agents live on." クライアントを閉じたり SSH を切ってもエージェントの端末を生かし続けるバックグラウンドサーバーで、マシン再起動後に保存されたレイアウトを復元し（元のプロセスは生き残らない）、**すべてのペインに working、blocked、idle の印を付ける**——"when an agent stops and needs an answer, herdr says so."。明示的にエージェントネイティブだ：エージェントは CLI とソケット API で駆動し "spawn panes, prompt each other, and wait until another agent is genuinely blocked"、そして既に走らせているもの——Claude Code、Codex、Cursor、OpenCode、Grok——をそのまま走らせ、端末を所有するのであって置き換えない。1 つの Rust バイナリ、Electron なし、Apache-2.0、tmux 式プレフィックスキーとマウスの両方が第一級、プラグインは marketplace 経由。

**Why it matters:** 出現しつつあるマルチエージェントワークフローには、*エージェント*を理解するプロセススーパーバイザが必要だ——blocked と working の区別、エージェント間のプロンプティングは、まさに tmux が欠いているものだ——そして herdr の数字は需要の実在を示している。README 自身の正直な注記（"the original processes do not survive"）が、端末の永続化とセッションの永続化の境界を画している。後者が上の Atuin Threads の領分だ。

[`🔗 herdrdev/herdr`](https://github.com/herdrdev/herdr) · [`🔗 herdr.dev ドキュメント`](https://herdr.dev/docs/)

---

## 20. Addy Osmani の agent-skills が 11.5 万スターを超える——/spec から /ship までの 9 つのライフサイクルコマンド

- **Velocity:** ▮ steady
- **Source:** GitHub Trending 日次 · 本日 +788 · 11.58 万スター
- **Tags:** `agent-skills` `claude-code` `engineering`

**addyosmani/agent-skills**——"Production-grade engineering skills for AI coding agents"——は本日のトレンドボード第 5 位で +788 スター、合計 115,812。このコレクションはシニアエンジニアのワークフローをライフサイクルに対応する 9 つのスラッシュコマンドへパッケージする——`/spec`、`/plan`、`/build`、`/test`、`/constraints`、`/review`、`/webperf`、`/code-simplify`、`/ship`——スキルは文脈で自動起動する（"designing an API triggers `api-and-interface-design`"）。注目は **`/build auto`** だ："you approve the plan once, then it runs autonomously… It removes the human stepping *between* tasks, not the verification: every task is still test-driven and committed individually, and it pauses on failures or risky steps."。Claude Code ではプラグインコマンドとしてインストールされ、内蔵と名前が衝突する箇所は `/agent-skills:review` の形を使う。

**Why it matters:** スキルコレクションはエンジニアリングプロセスの事実上の配布チャネルになった（このフィードも何セットか取り上げた）が、ここでの差別化はライフサイクルの枠組みと `/build auto` の誠実な自律性の境界だ——タスクごとの検証ゲート付きのバッチ実行であり、長い無人の実行ではない。11.5 万スターはそれ自体がデータポイントだ：プロセス・アズ・スキルは主流の採用を得ている。

[`🔗 addyosmani/agent-skills`](https://github.com/addyosmani/agent-skills) · [`🔗 AddyOsmani.com: Agent Skills`](https://addyosmani.com/blog/agent-skills/)

---

## 21. WSJ が報じる：Nvidia 取締役会が Jensen Huang の解任を準備——11月9日の調査が解任報道に発展、時間外取引で株価下落

- **Velocity:** ▮▮▮ trending
- **Source:** WSJ · HN 681 ポイント · 5.7 時間前（~06:31 UTC+8）
- **Tags:** `nvidia` `industry` `governance`

ウォール・ストリート・ジャーナルは 11 月 11 日（米国時間）遅く、Nvidia の取締役会が **CEO Jensen Huang の解任を準備している**と報じた——Reuters と The Verge が同じ時間帯に伝え、会社側は確認していない。その数時間前、ニューヨーク・タイムズが 2 件目の不倫を報道——The Verge の NYT 記事要約によれば、相手は「彼に直属する幹部」。**これは本フィードが 2026-11-09 に取り上げた弧線のエスカレーションだ：**「外国情報活動」をめぐる取締役会の独立調査——その時は侵害の証拠がないと明言していた。報道はこの幹部 Alice Huang を、3 年間で約 75 億ドル規模の Nvidia AI GPU の中国輸入——大半が H100 と H200 という輸出禁止チップ約 24 万個——に結び付ける（Tom's Hardware の見出しレベルの主張。本文はメンバーウォールの内側）。報道の 1 時間以内に、NVDA は時間外取引で通常終盤の約 168 ドルから約 159 ドルへ下落——約 6%——四半期決算は数日以内に控える。

**Why it matters:** もはやガバナンスの脚注ではない——本フィードが追う AI インフラの大部分を形作る会社（CUDA スタック、NVKE などのオープンソースリリース、対中輸出姿勢）の CEO 交代が報じられている。上記はすべて**報道**で、署名付き、未確認。検証可能な数字は時間外価格と決算日であり、Nvidia が発するまでは残りを WSJ・NYT の報道として扱うこと。

[`🔗 WSJ：Nvidia is preparing to oust Jensen Huang`](https://www.wsj.com/business/nvidia-is-preparing-to-oust-nvidia-ceo-jensen-huang-30f421ad) · [`🔗 The Verge：Nvidia is reportedly preparing to fire Jensen Huang`](https://www.theverge.com/tech/1031652/jensen-huang-rumor) · [`🔗 Tom's Hardware：Alice Huang と 24 万個の禁止チップ`](https://www.tomshardware.com/tech-industry/policy/alice-huang-reportedly-instrumental-in-securing-over-usd7-5-billion-of-nvidia-ai-gpu-imports-during-three-year-relationship-with-jensen-huang-helped-move-240-000-banned-chips-into-china-mostly-h100-and-h200) · [`🔗 HN での議論`](https://news.ycombinator.com/item?id=50459703)

---

## 22. ユナイテッド航空が AI エージェントによる予約を禁止——個人エージェントへの最初の明示的な航空会社拒否、資格情報と連邦チェックイン規則を挙げて

- **Velocity:** ▮▮▮ trending
- **Source:** CBS News · HN 453 ポイント · 6.7 時間前（11 月 11 日 ~21:20 UTC+8）
- **Tags:** `ai-agents` `policy` `travel`

ユナイテッドは水曜、**AI エージェントが旅行者に代わって航空券を予約することを禁止する**と発表した。理由はセキュリティリスクと連邦規則。"sharing account credentials with personal, third-party, AI assistants can expose sensitive information, and actions taken by these tools may result in unintended purchases, account changes, or use of MileagePlus miles" ——さらに、エージェントによるチェックインは、手荷物に禁制品がないことを本人がその場で確認することを求める規則と衝突しうるという点。執行は両側からだ："United is taking steps to restrict access — directly within our digital platforms and indirectly via travel agencies and aggregators — to prohibit use by unauthorized, third-party personal AI agents or assistants." 対照例も名指しされた：サウスウエスト航空は ChatGPT ユーザーに自社の運賃在庫を表示可能にしている。アナリスト Henry Harteveldt の読み：ユナイテッドは「さらに強力かもしれないもう一つの仲介者」を欲しない——ボット駆動の航空券検索は航空会社の金を焼く。

**Why it matters:** 大手航空会社による個人 AI エージェントの最初の明示的な禁止は、エージェント商取引がどのように門衛されるかの具体的な形を示す：既存業者はエージェントを壁の外に置く（ユナイテッド）か、公認の表面を造る（サウスウエストの ChatGPT 統合）。エージェント開発者にとって、名指しされた 2 つの失敗モード——資格情報の共有と未承認の購入——は、旅行アカウントに触れる前にエージェントが検出し拒否すべきものそのものだ。

> "…prohibit use by unauthorized, third-party personal AI agents or assistants." — ユナイテッド、CBS News へ

[`🔗 CBS News：United Airlines bans AI agents from booking flights`](https://www.cbsnews.com/news/united-airlines-bans-ai-agents-booking-flights/) · [`🔗 HN での議論`](https://news.ycombinator.com/item?id=50458900)

---

## 23. Apache HTTP Server が重大な mod_http2 レースを含む 2.4.71 をリリース——Anthropic の OSS Scanner が発見、報告から 16 日で修正

- **Velocity:** ▮▮ rising
- **Source:** oss-security / httpd 2.4.71 · HN 33 ポイント · 2 時間前（~10:11 UTC+8）
- **Tags:** `apache` `http2` `cve`

Apache は 11 月 11 日に **2.4.71** をリリースし、3 件の CVE を含む（プロジェクト自身のページで重大 1・重要 1・低 1）。重大なのは **CVE-2026-119618**："Concurrent Execution using Shared Resource with Improper Synchronization vulnerability in Apache HTTP Server's mod_http2 in assign_headers() can lead to RCE" ——レースコンディションがヒープ破損を生み、Wiz は「リモートの未認証攻撃者」による悪用を評価。その執筆時点で既知のエクスプロイトはなく、野良悪用の報告もない。影響範囲：httpd **2.4.55–2.4.70**、スタンドアロンの **mod_h2 2.0.8–2.0.42**。注目すべきはクレジット行："Anthropic's OSS Scanner, as vulnerability ANT-2026-MAPKT6MZ (finder); Anthony Weems and Simon Scannell of the Google Cloud Vulnerability Research (finder)" ——2026-10-26 に報告され、16 日後に修正・公開された。NVD 記録（11 月 11 日公開）はまだ `Received` で **CVSS スコアなし**——「critical」はプロジェクト自身の深刻度ラベルであり、数値ではない。すぐにパッチを当てられないなら：`Protocols http/1.1` で HTTP/2 を無効化すれば攻撃経路は消える。Wiz の広く読まれた解説には自身の混乱がある——「What is CVE-2026-111497?」という見出しが説明しているのは 119618 だが、**CVE-2026-111497 は 10 月の Google Brotli デコーダ CVE** で Apache とは無関係だ。

**Why it matters:** ほとんどのディストリビューションで HTTP/2 はデフォルト有効であり、修正は日常的なバージョンアップだ——トリアージは 2.4.70 以前のままのホストを探すこと（Wiz 自身のテレメトリでは、クラウド環境の 64% に脆弱なリソースがあり 51% が公開暴露）。そして発見者のクレジットは指標だ：自動化された OSS スキャナが、Google VR の研究者 2 名と並んで Apache のアドバイザリに名を連ねている——これが自動脆弱性発見が実地に降りてきた姿だ。

[`🔗 oss-security：CVE-2026-119618 発表`](https://www.openwall.com/lists/oss-security/2026/11/11/13) · [`🔗 httpd 2.4.71 脆弱性リスト`](https://httpd.apache.org/security/vulnerabilities_24.html) · [`🔗 NVD：CVE-2026-119618`](https://nvd.nist.gov/vuln/detail/CVE-2026-119618) · [`🔗 Wiz 分析`](https://www.wiz.io/blog/cve-2026-119618-rce-apache-http-server-vulnerability)

---

## 24. GitHub Actions がワークフローロックファイルをサポート——フル SHA ピン時代の終わり、読めるタグの復帰

- **Velocity:** ▮▮ rising
- **Source:** hugovk.dev · HN 171 ポイント · 6 時間前（~06:15 UTC+8）
- **Tags:** `github-actions` `supply-chain` `security`

GitHub Actions が**ワークフローロックファイル**をサポートし、Hugo van Kemenade の記事が設定全体を歩く：新しい公式 `gh` 拡張 **`github/gh-actions-lock`**（★332）が `uses:` 行を読める `@vX.Y.Z` タグに戻し、`.github/workflows/actions.lock` を生成する——各タグを正確なコミット SHA と `owner_id`/`repo_id` にピン留めする。タグは可変という SHA ピンのアンチサプライチェーン保証を保ちながら、読めない diff はなくなる。エコシステムの支持は既にある："Good news, both already support lockfiles" ——**Renovate と Dependabot**。GitHub は `gh actions-lock --verify` の CI ジョブを推奨し、ロックが同期外れ、またはピンが上流で検証不能のときに失敗する。**zizmor v1.32.0** がロックファイル対応の最初のリリース——それ以前はハッシュピンを勧めていた。

**Why it matters:** 可変タグは Actions サプライチェーンの穴で、SHA ピンは誰もレビューできないワークフローの diff と十六進数だらけの Renovate PR という代償を払ってそれを直した。ロックファイルは読めるピンを復活させ、検証は保つ——Cargo と uv でロックファイルがやったのと同じ動きが、CI で最も攻撃される表面に降りてきた。

> "All forks on github are the same repo you can pin any commit, merged upstream or not." — HN コメンテーター、SHA ピンが実際に信頼しているものについて

[`🔗 hugovk.dev：Lock your GitHub Actions`](https://hugovk.dev/blog/2026/lock-github-actions/) · [`🔗 github/gh-actions-lock`](https://github.com/github/gh-actions-lock) · [`🔗 HN での議論`](https://news.ycombinator.com/item?id=50459485)

---

## 25. Huawei が MACaQ をオープンソース化——122B モデルを 64 分・32.5 GB で量子化すると主張するモデル非依存量子化

- **Velocity:** ▮▮ rising
- **Source:** huawei-csl/MACaQ · HN 70 ポイント · 7.8 時間前（11 月 11 日 ~04:20 UTC+8）
- **Tags:** `quantization` `local-inference` `gguf`

Huawei の CSL グループが **MACaQ**（"Model Agnostic Calibrated Quantization"）を公開した——リポジトリは 11 月 10 日作成、Apache-2.0、C++、arXiv **2611.10649**（11 月 7 日提出）："MACaQ: Fast, Model Agnostic Calibrated Quantization for Low-Precision Weights and Activations". 目玉の主張（論文自身の数値）：**わずか 32.5 GB のデバイスメモリで 64 分**という量子化で 1220 億パラメータのモデルを処理し、"lower perplexity than MR-GPTQ and DuQuant++, or match their best Llama-3-8B perplexity with **11× less quantization time**"。広さが要だ：llama.cpp（2/3/4-bit GGUF）、vLLM（W4A4 または weight-only）、Diffusers（W4A4 の画像/動画/音声生成）、PyTorch（音声、W4A4）——そして **Ascend** バックエンド。Hugging Face コレクションが量子化済みモデルを提供する。README はめったに見ない一文で閉じる："Whether you're a human or an AI agent, if you use MACaQ to quantize a model, please star this repository to support the project."

**Why it matters:** ローカル推論の量子化は学術の系譜（GPTQ → AWQ → DuQuant）だった。制裁下のベンダーが、寛容ライセンスでマルチモーダル、llama.cpp/vLLM の経路——加えて Ascend バックエンド——を持つ量子化ツールを出したことは、実用ツールであると同時に Huawei のオープン AI スタックの行き先を示す信号だ。パープレキシティ比較はベンダー自身の論文であり、面白い独立検証は、同じビット幅でこれらの GGUF が llama.cpp の標準量子に勝つかだ。

[`🔗 huawei-csl/MACaQ`](https://github.com/huawei-csl/MACaQ) · [`🔗 arXiv 2611.10649`](https://arxiv.org/abs/2611.10649) · [`🔗 HN での議論`](https://news.ycombinator.com/item?id=50458166)

---

## 26. Vercel の agent-desktop：スクリーンショットなしの computer use——アクセシビリティツリーをエージェントのデスクトップ API として

- **Velocity:** ▮ steady
- **Source:** GitHub Trending 週間 · 今週 +7,772 · 22.2k スター
- **Tags:** `computer-use` `agents` `accessibility`

**vercel-labs/agent-desktop** は 22,215 スター・今週 +7,772 で週間ボードに座る："Computer use for AI agents: see and operate desktop apps on macOS, Windows, and Linux through the OS accessibility tree." アクセシビリティツリーを読み JSON で返し、"with a ref for every element the agent can act on" ——エージェントは ref をクリックや入力し、UI を読み直して結果を確認し、繰り返す。スクリーンショットなし、ピクセルマッチングなし、そしてモデルなし："The loop lives in your agent; agent-desktop has no model inside." CLI と **C ライブラリ**として出荷され、スナップショット、クリップボード読み取り、スクリーンショット、コマンド実行がツリーの傍らにある。`agent-browser`（11 月 6 日扱い）のデスクトップ兄弟だ——Vercel Labs は同じ ref ベースの決定論的パターンを両レイヤーで持つことになった。

**Why it matters:** アクセシビリティツリーの computer use はスクリーンショット＋ビジョンループの型付きで速い代替であり、その境界も同じくらい具体的だ：OS のアクセシビリティ層が公開しないもの（canvas 主導のアプリ、ゲーム、独自描画 UI）はすべて見えない。こうしたツール全般の開いた問いは OS ごとのアプリカバレッジで、README はそれを表にしていない。

[`🔗 vercel-labs/agent-desktop`](https://github.com/vercel-labs/agent-desktop) · [`🔗 npm：agent-desktop`](https://www.npmjs.com/package/agent-desktop)

---

## 27. Stela が x86-64 PC で macOS を起動——arm64e トランスレータと NVIDIA 上の Metal ドライバを持つ UEFI レベルの Apple Silicon レイヤー

- **Velocity:** ▮ steady
- **Source:** tylertms/Stela · HN 73 ポイント · 5.1 時間前（~07:05 UTC+8）
- **Tags:** `reverse-engineering` `macos` `emulation`

**tylertms/Stela**（Rust、GPL-2.0、v0.1.0、687 スター）は自らを "A general purpose Apple Silicon layer for x86-64 PCs" と呼ぶ——**UEFI ブートプログラム**（下にホスト OS はない）で、3 部構成だ：arm64e を x86-64 に翻訳する ahead-of-time **および** just-in-time コンパイラ（"covers more than 3,000 AArch64 instruction encodings, maps guest registers to host registers and caches translated code"、x86-64-v2 CPU なら動く）；**NVIDIA GPU 向け Metal ドライバ**（GTX 16 / RTX 20 シリーズ以降）は "compiles AIR, Metal's shader IR, directly to NIR, Mesa's IR"；そして Apple シリコンハードウェアのモデル——現時点で **Mac mini（M2）、macOS 27 を実行**。要件は控えめだ：RAM 8 GB、NVIDIA GPU、60 GB の GPT パーティション。セットアップは macOS を USB スティックにダウンロードする。README 自身の警告は正直だ："Stela is still in development. It is slow and still may not boot on supported hardware."（まだ開発中：速度は遅く、対応ハードウェアでも起動しないことがある）

**Why it matters:** これは逆 Rosetta だ：Rosetta が ARM Mac の上で x86 アプリを生かしたように、Stela は ARM を x86 に翻訳して、Apple に見捨てられた Intel 時代の PC の上で macOS 自身を生かそうとする。研究グレードの v0.1.0 で、プロジェクト自身が低い期待値の警告を出している——だが注目すべき成果物はそのアーキテクチャ（トランスレータ＋GPU ドライバ＋プラットフォームモデルを一つのブートバイナリに）だ。

[`🔗 tylertms/Stela`](https://github.com/tylertms/Stela) · [`🔗 HN での議論`](https://news.ycombinator.com/item?id=50460154)

---

## 28. OpenAI の Codex Security CLI/SDK が 0.10.0 をリリース——脆弱性スキャンをエージェントワークフローとして再構築、GitHub Action と専用クラウド付き

- **Velocity:** ▮ steady
- **Source:** GitHub Trending 日次 · 今日 +52 · 11.8k スター
- **Tags:** `security` `codex` `sast`

**openai/codex-security**（Apache-2.0、TypeScript、11,847 スター）が、**npm 0.10.0**（02:18Z）と対応する GitHub Action 0.10.0（02:23Z）を出した朝にトレンドボードに乗った。売りは "find, investigate, and fix vulnerabilities in your code" ——Codex 内のセキュリティワークフローか、`@openai/codex-security` CLI と TypeScript SDK による自動化で行う。Standard と **Deep スキャン**（deep は standard を繰り返して重複を除く）、候補 findings の検証、パッチ生成、既存修正の検証；`SECURITY.md` の起草と脅威モデルの保存；深刻度は "against your own rubric" で評価；SARIF/JSON/CSV エクスポート；findings を Linear・Jira・GitHub で追跡；対応レポートを **Codex Security Cloud** に公開；サードパーティスキャナの findings をインポートガイドでプレビュー。

**Why it matters:** このパイプライン——スキャン → 検証 → パッチ → 再検証——は、トレンドのセキュリティ監査 *スキル* たちが手で編成していたもので、イシュートラッカーと CI を付けて製品化された。荷重を支えるのは「候補 findings の検証」のステップだ：自らの候補を確認するスキャナは、エージェント駆動セキュリティツールが判定される場所そのものだから、既知の集合上で偽陽性率が測られるまでは「検証済みの数」を主張として扱うこと。

[`🔗 openai/codex-security`](https://github.com/openai/codex-security) · [`🔗 npm：@openai/codex-security`](https://www.npmjs.com/package/@openai/codex-security)

---

## 29. Klad がコーディングエージェントに本物のブラシを渡す——エージェントと人間が同じキャンバスに描くペイントアプリ、画像モデルなし

- **Velocity:** ▮ steady
- **Source:** klad-app/klad · HN 74 ポイント · 12.1 時間前（11 月 12 日 ~00:00 UTC+8）
- **Tags:** `creative-tools` `agents` `gui`

Show HN の一つ：**klad**（Rust、ソース利用可能）——"A drawing app built for agent/human collaboration." 人間はエディタでペンで描く；エージェントは `klad` コマンドラインから描く。"with the same brushes, on the same drawing, and each of you sees the other's strokes instantly" ——レイヤー、グループ化、アニメーション用タイムライン込みだ。設計原則は欠如の形で述べられる："**There is no image model in klad.**" キャンバス上のすべては構造化されたまま——"a stroke with its path, pressure, brush and colour, a shape with its points, a fill with its region" ——だから「一枚の葉がおかしければ、その一枚を直す」。サイコロを振り直して祈るのではない。ビルド済みアプリは klad.studio で待つ。

**Why it matters:** エージェントの創造性デモはほぼ prompt → 画像だった；klad はそれを逆にする——エージェントが人間と同じツール API をストローク粒度で操作するので、エージェントの編集はすべてアプリ自身の意味で検査可能で取り消し可能だ。GUI エージェントパターンのクリエイティブソフトウェアへの適用であり、構造化キャンバスの設計こそがそれを生成的でなく審査可能にしている。

[`🔗 klad-app/klad`](https://github.com/klad-app/klad) · [`🔗 HN での議論`](https://news.ycombinator.com/item?id=50454951)

---

## 30. Red Hat Quay：9.9 の LIKE パターンによるテナント横断漏えいと 9.8 の token → 署名鍵チェーン——どちらも Red Hat 自身の CNA が採点

- **Velocity:** ▮ steady
- **Source:** NVD · 2 件の記録 · 11 月 11 日
- **Tags:** `quay` `containers` `cve`

11 月 11 日に公開された 2 件の記録は、どちらも `Awaiting Analysis` で、スコアは Red Hat 自身の CNA（`secalert@redhat.com`）による。**CVE-2026-110697（9.9）**：Quay のロボットアカウント一覧機能は "constructs a SQL LIKE pattern from user-controlled namespace names without escaping wildcard metacharacters" ——アンダースコアを含む名前空間は名前空間を跨いで一致し、攻撃者は自分のテナント外のロボットアカウントを列挙できる。**CVE-2026-123710（9.8）**："An unauthenticated client can obtain an anonymous registry token with an audience it controls, present that token to the service key rotation endpoint, and install its own approved signing key with no expiry" ——トークンオーディエンスの取り違えが、レジストリ機構そのものへの恒久鍵の設置で終わる。

**Why it matters:** Quay は OpenShift デプロイの下にあるイメージレジストリなので、両バグともサプライチェーンに隣接する：一方はテナント横断のメタデータ露出、もう一方は思い込んでいた全ローテーションを生き延びる署名鍵だ。スコアは Red Hat のもので NVD の分析は保留。レジストリレベルの制御を信頼する前に、自分の Quay ストリームの修正状態を Red Hat の CVE ページで確認すること。

[`🔗 Red Hat：CVE-2026-110697`](https://access.redhat.com/security/cve/CVE-2026-110697) · [`🔗 Red Hat：CVE-2026-123710`](https://access.redhat.com/security/cve/CVE-2026-123710) · [`🔗 NVD：CVE-2026-123710`](https://nvd.nist.gov/vuln/detail/CVE-2026-123710)

---

## 31. Fortinet の波：FortiMail 9.8 のペア、FortiAnalyzer 9.8、FortiOS の認証欠落——一日に 9.6 以上が少なくとも 7 件、スコアはすべて CNA 自身のもの

- **Velocity:** ▮ steady
- **Source:** NVD · 7 件以上の記録 · 11 月 11 日
- **Tags:** `fortinet` `fortimail` `cve`

NVD は 11 月 11 日に **9.6–9.8 の Fortinet 記録を少なくとも 7 件**公開した。すべて Fortinet 自身の CNA（`psirt@fortinet.com`）が採点し、すべてまだ `Received`。先頭は FortiMail のペア：**CVE-2026-126147（9.8）**——FortiMail 8.0.x・7.6.x・7.4.x・7.2 全バージョンに渡る未認証パス・トラバーサル（FG-IR-26-199）；**CVE-2026-126148（9.8）**——FortiMail 8.0.x/7.6.x の未認証 OS コマンドインジェクション（FG-IR-26-200）。続いて **CVE-2026-126170（9.8）**、Cloud と BigData 変種を含む FortiAnalyzer 8.0.x/7.6.x の出力エンコーディング不備（FG-IR-26-219）；**CVE-2026-126259（9.8）**、FortiOS の重要機能への認証欠落——"may allow an unauthenticated attacker with HA FGSP + standalone-config-sync, or autoscale to execute command as super admin via crafted HA packets"（FG-IR-26-273）；**CVE-2026-126254（9.6）**、"a configured ibgp neighbor" が接続先ピアに不正属性を押し込める数値切り捨てエラー（FG-IR-26-268）；同じ波に 9.8 の SQL インジェクションがさらに 2 件（CVE-2026-126262、細工した OFTP パケットで FortiAnalyzer/FortiManager 上を未認証で；CVE-2026-126263、FortiMail 上で認証付き）。

**Why it matters:** FortiMail と FortiAnalyzer はメールとログ保持の経路に座っており、パス・トラバーサル＋コマンドインジェクションのペアは古典的な未認証 RCE の形だ——インターネットに露出した Fortinet アプライアンスはパッチ待ち行列の先頭に置くべきだ。数値は採点者とストッピングポイント付きで引用すること：ここでの 9.8 は NVD が再提供する**ベース**スコア；Fortinet 自身のコンテナはうち 2 件の脅威調整コピー（FGSP バグ 9.0、OFTP SQL インジェクション 9.3）を保存している——同一ベクトルに、どちらも誠実な数字。

[`🔗 Fortinet FG-IR-26-199（FortiMail パス・トラバーサル）`](https://fortiguard.fortinet.com/psirt/FG-IR-26-199) · [`🔗 Fortinet FG-IR-26-200（FortiMail コマンドインジェクション）`](https://fortiguard.fortinet.com/psirt/FG-IR-26-200) · [`🔗 NVD：CVE-2026-126147`](https://nvd.nist.gov/vuln/detail/CVE-2026-126147)

---

## 32. Terence Tao が 2018 年の論理ゲームを "Lean Grimoire" として再構築——作業したのはコーディングエージェント、ゲーム状態は Lean 証明として描画される

- **Velocity:** ▮ steady
- **Source:** terrytao.wordpress.com · HN 12 ポイント · 1.5 時間前（~10:37 UTC+8）
- **Tags:** `lean` `math` `agents`

Terence Tao の 11 月 11 日の記事：7 月から彼は "experimenting with using modern coding agents to build a number of mathematical visualization applets"；時間が見つかり、2018 年の JavaScript 対話型教科書 **"QED"** ——命題論理と一階述語論理をクラフティングゲームとして教える——をコーディングエージェントで **Lean Grimoire** として再構築した。新機能には "the option to show an in-progress Lean proof of one's game state" と、"mathematical statements become 'potions', mathematical expressions become 'scrolls'" というファンタジーモードがある。彼は "to make it more useful as a means to teach logical proofs and/or Lean" を目指した playtesting を募集している。

**Why it matters:** 一つのブラウザアプリに収まった QED → Lean-4 パイプラインは、Lean に興味を持つ人にちょうど向いた希少な教材アーティファクトだ——そして数学者がそれについて論文を書くのではなくエージェント構築のツールを出荷するというパターンの、もう一つのデータポイントだ。HN での小さな反応（12 ポイント、UI には批判が集まった）自体が正直な読みだ：価値は Lean 証明ビューにあり、ゲームの磨きにはない。

[`🔗 Terence Tao：Lean Grimoire`](https://terrytao.wordpress.com/2026/11/11/lean-grimoire/) · [`🔗 Lean Grimoire アプリ`](https://teorth.github.io/tao-web/apps/grimoire.html) · [`🔗 HN での議論`](https://news.ycombinator.com/item?id=50462375)

---

## 33. Anthropic が IPO を正式申請——8.25 億株、想定 70〜78 ドル、ナスダック銘柄コード "ANT"、ロードショーはすでに始動

- **Velocity:** ▮▮▮ trending
- **Source:** Anthropic · HN 新着 · 0.3 時間前（~20:00 UTC+8）
- **Tags:** `anthropic` `ipo` `industry`

Claude を擁する会社が公開会社への申請を済ませた。**ipo.anthropic.com** が本日アクセス可能になり、ページの meta description は上場申請を告げ、創業者レターを指している。具体的な条件は Anthropic 自身の 11 月 10 日のロードショー告知に載っている。**Class A 普通株式 825,000,000 株**の提案発行——うち 801,351,354 株は Anthropic が、23,648,646 株は既存株主が売り出す——想定発行価格は **1 株 70.00〜78.00 ドル**、**ナスダック・グローバル・セレクト・マーケットに銘柄コード "ANT"** で上場申請。30 日間のオーバーアロットメント・オプションは最大 123,750,000 株、主幹事はゴールドマン・サックスとモルガン・スタンレー。申請主体は "Anthropic, **PBC**"——パブリック・ベネフィット・コーポレーションの構造が株式とともに公開になる。登録届出は SEC に提出済みだが、まだ効力を生じていない。ウォール・ストリート・ジャーナル（11 月 10 日）は **1.3 兆ドルの企業価値目標**を報じた——この数字は WSJ の報道であって Anthropic の発表ではない。会社自身のページには企業価値の記載はない。

**Why it matters:** これはこのサイクル最大の AI ラボの流動性イベントであり、開発者に関わる部分は、それに伴う開示マシンだ。このフィードが毎週追いかけているモデルリリース・価格設定・安全性コミットメントの背後の経済数値が、四半期開示に入る。PBC 構造に注目したい——公益会社が株主リターンと掲げた安全ミッションの間でどう折り合いをつけるかは、宣言の一行ではなく、生きた法問題になる。

[`🔗 Anthropic：ロードショー開始の告知`](https://www.anthropic.com/news/roadshow-launch) · [`🔗 ipo.anthropic.com（申請書類 + 創業者レター）`](https://ipo.anthropic.com/us/) · [`🔗 HN での議論`](https://news.ycombinator.com/item?id=50465829)

---

## 34. Node.js の 3 リリースラインが同時にセキュリティリリース——16 件の CVE、そのひとつは他のコネクションの TLS 秘密鍵が読める

- **Velocity:** ▮▮▮ trending
- **Source:** nodejs/node releases · 11 月 11 日 16:44Z（11 月 12 日 ~00:44 UTC+8）
- **Tags:** `nodejs` `cve` `tls`

Node.js は 11 月 11 日、**v26.13.1、v24.22.3、v22.23.5** の 3 線で同期したセキュリティリリースを出した——計 16 件の CVE（High 7、Medium 6、Low 3）。その多くは Matteo Collina と Tim Perry の手による。最悪なのは **CVE-2026-123864**："a re-entrancy flaw in Node.js HTTPS lets an unauthenticated client **read memory belonging to other connections, including TLS private keys and other users' requests**"——`TLSWrap::DoWrite()` が `ClearOut()` を呼ぶ際、パーサーが再入できる。隣には **CVE-2026-123872**、クライアント証明書認証のバイパス——"lets a client change the servername during TLS 1.2 renegotiation to reach endpoints it was not authorized for"（1 つの CVE がセッション再開/HRR/再ネゴシエーションの 3 つの SNI 変更経路をカバー）。**CVE-2026-126051** は遅延コールバックの use-after-destroy で、"allows a remote, unauthenticated attacker to terminate the server process"——`SNICallback` を使う TLS サーバーすべてが対象。さらに **CVE-2026-123863** は HTTP/2 セッション解放の到達可能なアサーションで、"lets any unauthenticated client abort the server"。残る High は http2 バッファ一族（nghttp2 に捨てられたストリーム、pending write 中に保持されるバッファ）。確認した NVD レコードはすべてまだ `Received` で CVSS なし——"High" は Node 自身のラベルだ。

**Why it matters:** メモリ露出で TLS 鍵が読めるのは Heartbleed 型の脆弱性であり、SNI/再ネゴシエーションバイパスは mTLS デプロイが依存する証明書バインディングの前提を壊す。Node サーバーを動かしているなら、これはサポート全ラインで「今日パッチ」のリリースだ。レコードに CVSS が載るのは NVD の分析後——スコア未取り込みのスキャナではなく、release notes でトリアージすること。

[`🔗 Node.js v26.13.1 セキュリティリリース`](https://github.com/nodejs/node/releases/tag/v26.13.1) · [`🔗 NVD：CVE-2026-123864`](https://nvd.nist.gov/vuln/detail/CVE-2026-123864)

---

## 35. Humble Bundle のリニューアル、2FA を積んだまま出荷——パスワード変更に現行パスワード不要、メール変更は誰も検証しない

- **Velocity:** ▮▮▮ trending
- **Source:** Kotaku · HN 297+ ポイント · 5.5 時間前（~14:55 UTC+8）
- **Tags:** `account-security` `2fa` `supply-chain`

IGN 傘下のチャリティゲームストア、Humble Bundle がサイトのリニューアルをプッシュし、Reddit のユーザーが**中核的なアカウントセキュリティの剥離**を発見した。二要素認証は "entirely missing under security settings"（Kotaku が自アカウントで確認："the choice to add or remove the feature is entirely missing"）。さらに Kotaku の実測では "there are no authentication checks when changing passwords or email addresses"——"If logged in you can simply enter a new password without having to know the current one" で、メールアドレス変更の検証は**新しいアドレスにのみ**送られ、旧アドレスには何も届かない。ログイン状態の保持オプションも、購入履歴の「使用済み/未使用キー」の区別も消えた。Kotaku は Humble にコメントを求めたが、執筆時点で回答はない。コミュニティはこのデザインを "reminiscent of other Claude interfaces" と読み、297+ HN ポイントの「vibe-coded リニューアル」論が生まれた——しかしそれは字義通り「読み」であって、**リニューアルが AI 書きだと示した者はいない**。AI 由来かどうかにかかわらず、検証可能なのはセキュリティ退行のほうだ。

**Why it matters:** 決済カードとゲームキーを預かるストアが、3 つの基線アカウント制御（2FA、パスワード変更確認、旧メール検証）を一度に壊す退行を出荷した——しかもそれを捉えたのはユーザーであって、リリースプロセスではなかった。どんなリニューアルパイプラインを持っていても、これを捉えたはずのテストは、認証チェックがマイグレーションを生き延びるかどうかだ。アカウントを持っているなら、当面の助言は保存済み決済情報を外しておくこと。2FA が戻るまで。

> "If logged in you can simply enter a new password without having to know the current one." ——実測後の Kotaku

[`🔗 Kotaku：Humble Bundle のリニューアル、アカウントセキュリティを取り忘れる`](https://kotaku.com/humble-bundle-vibe-coded-ai-redesign-account-security-password-email-2000756085) · [`🔗 HN での議論`](https://news.ycombinator.com/item?id=50463899)

---

## 36. CopilotKit の OpenBot：AI の同僚がそれぞれ専用のコンピュータを持つ——11.2k スター、v1.0.2、計画→実行に監査証跡

- **Velocity:** ▮▮ rising
- **Source:** GitHub Trending daily · 11.2k スター · v1.0.2（11 月 11 日）
- **Tags:** `agents` `self-hosted` `ag-ui`

AG-UI プロトコルのチームによる **CopilotKit/OpenBot** が、v1.0.2 リリース（11 月 11 日）の翌日、日次トレンド 3 位に 11,217 スターで乗った。売り込みはこうだ："Open-source AI coworkers that each get a computer of their own: a browser, files and tools, with every action decided before it happens and recorded after. Bring any AG-UI agent." 具体形は：各 bot を自分のサンドボックス化されたコンピュータ（ブラウザ、ファイルシステム、ツール）で走らせるセルフホスト可能なワークスペース、送信前の承認フロー（リリースノートの移行パスには今も `0088_approval_reviewer_guidance` の名が残る）、そしてデスクトップアプリ——Apple Silicon/Intel 両対応の公証付き macOS DMG、署名付き Windows インストーラ、"no terminal or developer tools needed"——で、フロントエンドと Docker バックエンドを一体化し、チーム向けには Kubernetes デプロイ経路もある。"OpenBot for Business" は会社のサインイン、ツール権限、承認、監査を追加する。

**Why it matters:** エージェントワークスペースというカテゴリは急速に混み合っている（CompanyOS、Paradev、herdr）。OpenBot の差別化は、監査可能な計画→実行ループと、既に走らせているエージェントを受け入れる AG-UI 標準だ——セルフホストのエンタープライズ配備という形は、このフィードの読者が実際に必要としているものだ。"every action decided before it happens and recorded after" という言い回しは、ベンダー全員に向けられるべき要求だ：録画を見せてもらえ。

[`🔗 CopilotKit/OpenBot`](https://github.com/CopilotKit/OpenBot) · [`🔗 open.bot`](https://open.bot)

---

## 37. Jane Street が Socratic Tutor スキルを公開——1 つの SKILL.md に完結した教授プロトコル、ガードレール付き

- **Velocity:** ▮▮ rising
- **Source:** janestreet/agent_skills · HN 305+ ポイント · 50 時間前（11 月 10 日 ~18:00 UTC+8）
- **Tags:** `agent-skills` `education` `prompting`

量的トレーディングで知られる Jane Street が **janestreet/agent_skills**（MIT、11 月 3 日作成、約 7k スター）を公開した。収められている単独のスキルは、本物のエンジニアリングが施された成果物だ。**socratic-tutor**——LLM を "a strict personal tutor" に変える SKILL.md で、完全なプロトコルを含む。何を教える前に 3〜5 問の**診断**、各サブスキルを 0〜5 で採点する**スキルマップ**（"0 unaware . 1 heard of it . 2 can follow along . 3 can do with help . 4 can do independently . 5 can teach it"）、教育ループは "**Ask ONE question at a time. End the message immediately after the question and wait for the answer; do not add hints, example answers, or teaching content after it**"、そして誤答に対する反幻覚規則："do not give the answer. Ask a narrower question that exposes the contradiction in their reasoning."。白眉は意図ガードだ。一回性の "explain X" には普通に答えるべし——"A false start costs the user an unwanted quiz; a confirmation costs one word."。HN 305 ポイントの反響は、単一のプロンプトファイルが今週得た最大級の声だ。

**Why it matters:** これは教授法をスキル仕様として書いたものだ——そして学ぶべきエンジニアリングはすべて、エージェントが実際に踏む失敗モードにある：単純な質問への横取り、答えの漏洩、浅い説明の受け入れ。エージェントへの指示を書くすべてのチームが、この構造を盗める：明示的なトリガー句、コストの非対称を明記した意図ガード、可視の状態モデル、そしてモデル自身の失敗モードへの規則。

> "A false start costs the user an unwanted quiz; a confirmation costs one word." ——SKILL.md

[`🔗 socratic-tutor SKILL.md`](https://github.com/janestreet/agent_skills/blob/master/socratic-tutor/SKILL.md) · [`🔗 janestreet/agent_skills`](https://github.com/janestreet/agent_skills)

---

## 38. Qwen Code が 1.0 プレビューに到達——Qoder のエージェント能力をターミナル CLI に統合、ネイティブパッケージも

- **Velocity:** ▮▮ rising
- **Source:** QwenLM/qwen-code · リリース 11 月 11 日 03:55Z（~11:55 UTC+8）
- **Tags:** `qwen` `cli` `coding-agents`

アリババの **QwenLM/qwen-code**（29.5k スター、"an open-source AI coding agent that lives in your terminal"）が 11 月 11 日に **v1.0.0-preview** をリリースした——1.0 系最初のリリースで、プロジェクト自身が "some interfaces, configuration options, and behaviors may change during Preview" と但し書きする。見出しは "**Brings together the agent capabilities of Qoder and Qwen Code** for code understanding, implementation, debugging, and testing"——アリババの Qoder IDE エージェントスタックをターミナル CLI に統合——に加え、Qwen と Qoder の両アカウントログイン、複数モデルプロバイダ、カスタム互換エンドポイント、npm のみだったインストールを置き換えるネイティブパッケージ。前日の 0.27.2 は、このエージェントがエディタの外へ向かう方向を示す：その Web Shell は "can configure WeChat, QQ, and Email channels, including QR login, scan progress, identity display, and logout where supported"——コーディングエージェントがメッセージングチャネルに常駐する存在になる。

**Why it matters:** ターミナル型コーディングエージェントはプラットフォーム入口へ収斂しつつあり、Qwen Code が 1.0 に達したのはオープンウェイト生態系の回答だ。Qoder 統合により、Gemini CLI や Claude Code が各陣営のそれであるように、アリババのエージェントスタックのワン CLI 表面になる。Preview のラベルは実際に機能している：インターフェースが落ち着くまで、これを基盤に作る者はバージョンを固定し changelog を読むべきだ。

[`🔗 QwenLM/qwen-code`](https://github.com/QwenLM/qwen-code) · [`🔗 v1.0.0-preview リリースノート`](https://github.com/QwenLM/qwen-code/releases/tag/v1.0.0-preview) · [`🔗 v0.27.2 リリースノート（Web Shell）`](https://github.com/QwenLM/qwen-code/releases/tag/v0.27.2)

---

## 39. hMailServer に一挙 18 件の CVE レコード——8.8 の SQL インジェクション、未認証の送信者がバウンスメールから到達可能

- **Velocity:** ▮▮ rising
- **Source:** NVD · 18 レコード · 11 月 11 日 09:17Z（11 月 11 日 ~17:17 UTC+8）
- **Tags:** `hmailserver` `cve` `mail`

Windows 用メールサーバーの hMailServer——現在は GitLab 上で Progressive Robot が開発——に **11 月 11 日、18 件の CVE レコードが一斉公開**された。すべて `Received`、スコアはすべて GitLab 自身の CNA（`cve@gitlab.com`）による。先頭は **CVE-2026-126617（8.8）**：6.0.0-B1〜6.2.18 で MySQL/MariaDB か PostgreSQL を使う際のデータベース層 SQL インジェクション。"on those two engines parameters are not bound" ため、パラメータ値は 1 パラメータごとの文字列置換でステートメントテキストに埋め込まれ、値が後続パラメータの名前を含むとリテラルが早期に閉じて SQL が注入される。デフォルト構成での到達にはメールボックスがひとつあれば足りる：受取人アドレスは queued メッセージの行に "carries the recipient's address twice"。greylisting かメッセージインデックスが有効なら、**リモートの未認証送信者**が "through a message the server sends to the envelope sender, such as a delivery failure notice or an automatic reply" で同じステートメントに到達できる。PostgreSQL では "further statements can follow it"。パラメータがバインドされる SQL Server/Compact は影響なし。波の残り：TLS 検証の欠落（7.8/7.5/7.4/7.0）、Windows インストーラのローカル権限昇格（7.8/7.5/7.3）、JSON リーダーの DoS、auto-ban のバイパス。修正は **v6.2.19 と v6.3.8（11 月 2 日リリース）**で既に出ている——書類の 9 日前だ。

**Why it matters:** メールサーバーは設計上、未認証攻撃者のテリトリーであり、バウンスメールの送信で SQL インジェクションに到達できるのは、ほぼ最悪の形だ。6.3.8 未満の hMailServer 6.x を動かしているなら、修正ビルドは 11 月 2 日から存在する——パッチ待ちではなく、バージョン確認のタスクだ。資産棚卸ツールへの注意：アクティブなリポジトリは **GitLab** で、GitHub ミラーの最新リリース（5.7.2-b3144）は legacy 線——GitHub org を基準にするスキャナはこれを誤って古い扱いにする。

[`🔗 NVD：CVE-2026-126617`](https://nvd.nist.gov/vuln/detail/CVE-2026-126617) · [`🔗 hMailServer v6.3.8 リリース`](https://gitlab.com/hmailserver/hmailserver/-/releases/v6.3.8)

---

## 40. Christian Bird の「活動と成果のギャップ」：AI が押し上げるのは活動指標であって出荷指標ではない——講演とその論文連鎖

- **Velocity:** ▮▮ rising
- **Source:** cabird.com · HN 118 ポイント · 19.5 時間前（11 月 12 日 ~00:30 UTC+8）
- **Tags:** `research` `developer-productivity` `ai`

Christian Bird——実証ソフトウェア工学で最も論文を出版している研究者のひとり、現在は Dryden Technology Group——が、UC アーバインのソフトウェア工学セミナーでの講演（10 月 30 日、21 分、スライド付き）を、その論点全体であるタイトルのまま公開した："**Why aren't we shipping faster now? AI, activity, and outcomes in software engineering.**" 講演は投稿中の論文を錨とする：Cha、Badea、Baym、Bird、Butler、Murphy-Hill、Hadley による "**The Activity-Outcome Gap: Why AI Does Not Solve Software Engineering**"、30 のインタビューに基づく。ページはその周囲の公開エビデンスも束ねる：NBER ワーキングペーパー "Writing Code vs. Shipping Code: Productivity Effects Across Generations of AI Coding Tools"（Demirer、Musolff、Yang、w35275）、"What Has AI Let Developers Unlock?"（arXiv 2610.23708）、"(When) Should a Software Factory Be Lights-Off? Benchmarking Code Review Agents on Bug Detection"（arXiv 2610.13668）、そして "You Shall Not Pass! Where and Why Developers Draw the Line on AI Autonomy"（arXiv 2607.00533）。

**Why it matters:** 「AI は活動指標を膨らませ、成果は追いつかない」という主張が、この分野で最もキャリアのある測定グループの口から、公開論文を添えて為されている——どちらの陣営の「雰囲気」論にも差し出すべき引用だ。正直な限界：看板の論文は未公刊でインタビューも未公開であり、タイトルは強い著者リスト付きの仮説として扱うべきだ。今日検証可能なのは NBER と arXiv のリンクのほうだ。

[`🔗 Christian Bird：Why aren't we shipping faster now?`](https://cabird.com/talks/shipping-faster/) · [`🔗 NBER w35275：Writing Code vs. Shipping Code`](https://www.nber.org/papers/w35275) · [`🔗 HN での議論`](https://news.ycombinator.com/item?id=50455332)

---

## 41. 魔法時代の Emacs：1 年の Claude Code、高校生の Rust ターミナルエミュレータ、そして「どう動くかは誰も知らない」

- **Velocity:** ▮▮ rising
- **Source:** commandlinesystems.com · HN 249 ポイント · 16 時間前（~04:00 UTC+8）
- **Tags:** `essay` `emacs` `ai`

249 ポイントを集めたこのエッセイは、Claude Code 賛歌として始まる（"Its handling of all aspects of the coding process blew my socks off then, and it's an order of magnitude more capable now"）。途中で "Mathocalypse"（Scott Aaronson の造語——エッセイが引用しているのは同ポストの**初期版**で "OpenAI's latest model took all of three hours to carpet bomb 8,000 research problems, resulting in 372 likely hits"。Aaronson のポスト自体は現在 **約 4,000 問・1 回の 3 時間試行で約 10% を解いた**とし、訂正はポスト内に明記されている："An earlier version of this post said 8,000 problems and ~5% success rate, but commenters since corrected me"——372 件の結果は不変）に寄り道し、最後に全編最高の話に着く。著者が AI で書いた Emacs のターミナルモードを r/emacs に投稿すると、ある高校生が Claude で "over a coffee break" 書いた **cooked.el** で返した——"its full-blown, self-contained implementation of a terminal emulator, in Rust no less"。著者の評： "the holmes replicated over a coffee break what a billionaire with infinite resources had been toiling over the last five years. It probably never occurred to the high schooler that a custom built Boeing materialized in the backyard when all he intended was a new flight stick design."。結びはこう着地する："AI has turned Stallman's goal of software freedom on its head. Having your computer do whatever your imagination can think up — that's real freedom. **The only catch is you'll have no idea how it works. No one does.**"

**Why it matters:** Emacs はこのエッセイのトロイの木馬で、主題はソフトウェア文化だ：個人のための使い捨てソフトウェアが、機能への不満より安くなったとき何が起きるか（"Loud bellyaching, or massaging a nice-to-have into a should-have-had... You get all the attention and none of the work"）。cooked.el の逸話は "a custom built Boeing materialized in the backyard"（裏庭に現れた特注ボーイング）という非対称の、いま最も端的な単一例であり、結びの一文は、このフィードが道具の形で繰り返し出会ってきた「個人ソフトウェア論」の正直版だ。

[`🔗 Emacs in the Age of Magic`](https://commandlinesystems.com/magic.txt) · [`🔗 Aaronson の dump 元ポスト（修正後の数字）`](https://scottaaronson.blog/?p=10169) · [`🔗 HN での議論`](https://news.ycombinator.com/item?id=50458208)

---

## 42. TensorFold：Python なしの Zig 推論エンジン——そして AI 貢献者のための "Agent Traffic Control" プロトコル

- **Velocity:** ▮ steady
- **Source:** GitHub Trending daily · 1.8k スター
- **Tags:** `inference` `zig` `agents`

**ashhart/TensorFold**（1.8k スター、日次トレンド入り）は "serves language models from a Zig binary on Apple Silicon and NVIDIA GPUs — the engine reads checkpoints, tokenizes requests and runs Metal or CUDA kernels directly. Serving needs no Python or MLX installation"（リポジトリ説明には Vulkan も名前がある。README で確認できる経路は Metal/CUDA）。クイックスタートは 4-bit の Qwen3.5-2B で "checked on Metal and a GB10"。本当に新しい部分は貢献ワークフローで、エージェントファーストに書かれている："Building with a coding agent? Have it load the contributor skill before it writes any code"。さらにどの issue に触れる前にも、エージェントは **Agent Traffic Control**（`ashhart/ATC`）を走らせねばならない——`atc check` で重複作業を確認、`atc claim` で issue を獲得、エージェントの作業中は **5 分ごとの pulse**（"Pulse only while the agent is working, before its five-minute check-in expires"）、そして tensorfold.dev/atc に誰が何をしているか示す**ライブのエージェントレーダー**。

**Why it matters:** エンジン自体はすでに飽和領域に踏み込んでいる（llama.cpp、MLX）。しかし ATC プロトコルは新しい成果物だ：オープンソースプロジェクトが、AI エージェント貢献者を管理すべき並行性の問題として扱っている——認証、リース、ハートビート、重複検出、公開レーダー——人間の連携を当てにするのではなく。エージェント執筆の PR が増え続けるなら、このパターン（期限付き issue リース）はより多くのプロジェクトに現れるはずだ。TensorFold は注視すべきリファレンス実装だ。

[`🔗 ashhart/TensorFold`](https://github.com/ashhart/TensorFold) · [`🔗 ライブエージェントレーダー（ATC）`](https://tensorfold.dev/atc)

---

## 43. BusyBox に一括 7 件の CVE レコード——DHCPv6 オーバーフロー 7.6、httpd スタックオーバーフロー 7.5、そして間違ったパスを読む認証チェック

- **Velocity:** ▮ steady
- **Source:** NVD · 7 レコード · 11 月 11 日 10:16–12:19Z（11 月 11 日 ~18:16–20:19 UTC+8）
- **Tags:** `busybox` `cve` `embedded`

7 件の BusyBox レコードが 11 月 11 日に NVD に載った。すべて Red Hat の CNA（`secalert@redhat.com`）による採点で、すべてまだ `Awaiting Analysis`。最重量は **CVE-2026-124741（7.6）**：udhcpc6 DHCPv6 クライアントが "does not properly validate the size of network options sent by a server before copying them into memory"——ローカルネットワーク上の悪意ある DHCPv6 サーバーひとつで、BusyBox でアドレスをリースするすべての組込み機器に届く。**CVE-2026-124739（7.5）**：httpd のサブディレクトリ設定処理——"an overly long index page name can trigger a stack-based buffer overflow"。**CVE-2026-124737（7.5）**：TFTP クライアントが独自の小ブロックサイズを要求して標準の応答を受け取ると、既定のブロックサイズへフォールバックして過小なバッファに書き込む。静かだが陰湿なのは **CVE-2026-124738（5.3）**：httpd のプリ圧縮ファイル対応を有効にすると "authentication checks are evaluated only against the requested URL path rather than the pre-compressed file"——認証チェックは URL パスを見て、実際に吐き出すファイルを見ていない。残り：udhcpc6 の use-after-free（4.3）、細工した FAT/HFS+ ファイルシステムに対するボリューム識別の検証欠落 2 件（5.5）。

**Why it matters:** BusyBox はルータ、カメラ、IoT、initramfs のありとあらゆる場所に居て、このうち 3 件は隣接ネットワークの攻撃者から到達できる（DHCP、TFTP）——フラットな LAN と、決して更新されないファームウェアで効く種類だ。スコアは NVD 分析待ちの Red Hat 版。組込み屋は等級ではなくベクトルを読むこと。

[`🔗 NVD：CVE-2026-124741（udhcpc6 7.6）`](https://nvd.nist.gov/vuln/detail/CVE-2026-124741) · [`🔗 NVD：CVE-2026-124738（httpd 認証 5.3）`](https://nvd.nist.gov/vuln/detail/CVE-2026-124738)

---

## 44. Directus の 9.2：public-mode WebSocket 上の認証失敗メッセージで権限チェックをスキップ可能に

- **Velocity:** ▮ steady
- **Source:** NVD · 11 月 11 日 01:17Z（~09:17 UTC+8）
- **Tags:** `directus` `cve` `authorization`

**CVE-2026-126539（9.2、CVSS 4.0）**——11 月 11 日公開、VulnCheck の CNA（`disclosure@vulncheck.com`）採点、レコードはまだ `Received`："Directus before 12.1.0 contains an authorization bypass vulnerability that allows unauthenticated attackers to **skip permission checks by sending a failed auth message on public-mode WebSocket connections**." Directus は権限モデルそのものが製品であるオープンソースのデータプラットフォーム/ヘッドレス CMS——コレクション、フィールド、アイテムがすべてロールでフィルタされる——であり、このバグは WebSocket の public モードが認証失敗の経路を誤り、拒否ではなくスキップにしてしまうことにある。修正は 12.1.0 に降りており、現在のリリースラインは **12.6.1**（11 月 4 日）——まだ 12.0.x 以下のデプロイは、未認証の権限越え面に晒されている。

**Why it matters:** このパターンは Directus を超えて名指しする価値がある：故障は認証フローの*エラー*経路（未認証データも扱うソケットで認証が失敗したとき何が起きるか）にある——テストスイートが最も重み付けを欠く分岐だ。Directus を動かしているなら、バージョンの問いは二値だ：12.1.0 以降か否か。そして分析が降りるまで、このスコアは NVD のではなく VulnCheck のものだ。

[`🔗 NVD：CVE-2026-126539`](https://nvd.nist.gov/vuln/detail/CVE-2026-126539) · [`🔗 directus/directus リリース`](https://github.com/directus/directus/releases)

---

## 45. Waline の自分の管理者への stored XSS：アドバイザリは 7 月 2 日、CVE レコードは 11 月 11 日、そしてまだ修正版の記載なし

- **Velocity:** ▮ steady
- **Source:** NVD · 2 レコード · 11 月 11 日 05:19Z（~13:19 UTC+8）
- **Tags:** `waline` `xss` `cve`

中国語ブログ圏のコメント欄の大半を支える Waline に、11 月 11 日付で 2 件のレコードが出た：**CVE-2026-64670（9.3、CVSS 3.1）** と **CVE-2026-64671**、どちらも **@waline/client ≤ 3.15.2** 向け。最初のものが刺さる：コメントエディタのライブプレビューは "with marked and no sanitizer (utils/markdown.ts), and the preview is injected with v-html" で描画され、コメント編集時には生の本文がエディタに種として入れられる——つまり "an administrator who clicks Edit on an attacker's comment renders that attacker's raw HTML in their own session: an unauthenticated commenter achieves privilege-escalation stored XSS against a moderator with a single Edit click."。2 件目：UserList ウィジェットがサーバー返却のコメント者フィールドを連結して DOM を組む。物語は時間線だ：リポジトリアドバイザリ **GHSA-crj3-q72p-ggqm** の公開は **7 月 2 日**——CVE レコードの 4 ヶ月以上前——で、メンテナ lizheming が Critical とし、いまも "**Patched versions: None**" のままだ。npm の `latest` は 3.16.2（11 月 3 日）で、影響範囲より上に位置するが、アドバイザリにもリリースノートにも、どのリリースが修正だと主張する記述はない——プロジェクトが口を開くまで、3.16.x は未確認として扱うべきだ。

**Why it matters:** コメントシステムのモデレーションフローにおける管理者セッション XSS は、ワンクリックの「ゲストから管理者」横移動であり、そのソフトウェアは数千の個人ブログに配備されている——GHSA が 7 月、NVD が 11 月という二つの時計の間隔は、CVE フィードでトリアージしていたすべての人に 4 ヶ月の遅れを意味した。Waline を動かしているなら、レコードの CVSS を待たないこと：アドバイザリ自体の「修正版なし」が、いまの有効な状態だ。

[`🔗 NVD：CVE-2026-64670`](https://nvd.nist.gov/vuln/detail/CVE-2026-64670) · [`🔗 GHSA-crj3-q72p-ggqm（リポジトリアドバイザリ）`](https://github.com/walinejs/waline/security/advisories/GHSA-crj3-q72p-ggqm)

---

## 46. GitHub、週内 2 度目のインシデント：Webhooks・Actions・Pages・Copilot が 33 分低下——RCA の約束はまた

- **Velocity:** ▮ steady
- **Source:** githubstatus · HN 81 ポイント · 11 月 11 日 20:48Z（11 月 12 日 ~04:48 UTC+8）
- **Tags:** `github` `incident` `ci`

GitHub は 11 月 11 日 20:48Z に **critical** のインシデントを宣言——"issues impacting multiple GitHub products including Actions, Pages, and Copilot"、最初は Webhooks の性能低下として現れた——21:21Z に解決し、端から端まで **33 分**だった。興味深いのは回復の形だ：21:07Z に緩和が着地し、その後 "the backlog of Actions jobs has been fully processed"——つまり修正後もキューの排出が続いた——14 分後に完全回復を宣言。締めの注記は先週の言い回しを繰り返す："A detailed root cause analysis will be shared as soon as it is available."。これは 7 日で 2 度目の GitHub インシデントだ：11 月 5 日の障害（Pull Requests、Git 操作、Issues、約 2 時間）は**いまだ**に根因を一切公表していない。

**Why it matters:** 業界のほとんどがその上に build する forge での週 2 度のインシデントは、ポストモーテムに値するはずのパターンだ——そしてそれこそ、どちらのインシデントもまだ届けていないものだ。CI を重く使うチームへの運用上の教訓はより小さいが実用的だ：「回復」の宣言後も約 14 分、Actions のバックログは処理を続けた——パイプラインが本当にきれいなのは、インシデントの終了時刻ではなく、キューの排出が終わる時刻だ。

[`🔗 GitHub インシデント：Actions/Pages/Copilot/Webhooks`](https://www.githubstatus.com/incidents/dvy0t3mvh1lg) · [`🔗 GitHub ステータス履歴`](https://www.githubstatus.com/history)

---

## Metadata

| Field | Value |
|-------|-------|
| Generated | 2026-11-12T12:35:50Z |
| Items | 46 |
| Sources tracked | 46（Hacker News、GitHub Trending、NVD、CISA KEV、arXiv、oss-security、Apache httpd、ベンダーブログ、セキュリティアドバイザリ） |
| Update schedule | 04:03, 12:03, 20:03 UTC+8（1 日 3 回） |
| Ranking | 速度加重（即時性 × エンゲージメント加速度 × 情報源の権威） |
| License | [CC-BY 4.0](https://creativecommons.org/licenses/by/4.0/) |

---

[前日](2026-11-11.md) · [生 .md](https://trending.md/jp/feed/2026-11-12.md) · [アーカイブ](../archive/)
