---
date: 2026-11-12
updated: 2026-11-11T20:43:46Z
schedule: 04:03, 12:03, 20:03 UTC+8
sources: 21
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

Pietro Miotti の記事——この日の HN 最大の話題で 843 ポイント——は、ペルー旅行中の「とりとめのない考え」（10 月 18 日）からメキシコ INAH の公式回答まで**72 時間未満**しかかからなかったと語る。マヤ地域の公開 NASA LiDAR 約 1,200 km² を、画像として描画した LiDAR ストリップを **48 体のエージェント**が目視検査して一晩で分析した（"There was no special model or classifier involved: the agents literally looked at the pictures"）。エージェントは、整地された広場、高さ 8–12 m の楕円形ピラミッド、盛り上げた中庭、雨溜まりと思われる構造を持つ山頂遺跡を検出し、10 月 21 日に INAH の登録簿がその座標に登録遺跡がないことを確認した。**11 月 11 日のアップデートが見出しが省いた部分だ：**考古学者から、同じ遺跡は **Estrada-Belli ら 2025 年の論文**ですでに公開されていたと指摘された——"they rediscovered it rather than discovered it (it just wasn't in INAH's register yet)."

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

## Metadata

| Field | Value |
|-------|-------|
| Generated | 2026-11-11T20:43:46Z |
| Items | 20 |
| Sources tracked | 21（Hacker News、GitHub Trending、NVD、CISA KEV、arXiv/ICML、ベンダーブログ、セキュリティアドバイザリ） |
| Update schedule | 04:03, 12:03, 20:03 UTC+8（1 日 3 回） |
| Ranking | 速度加重（即時性 × エンゲージメント加速度 × 情報源の権威） |
| License | [CC-BY 4.0](https://creativecommons.org/licenses/by/4.0/) |

---

[前日](2026-11-11.md) · [生 .md](https://trending.md/jp/feed/2026-11-12.md) · [アーカイブ](../archive/)
