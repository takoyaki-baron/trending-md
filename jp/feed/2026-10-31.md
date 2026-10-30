---
date: 2026-10-31
updated: 2026-10-30T20:14:50Z
schedule: 04:03, 12:03, 20:03 UTC+8
sources: 17
license: CC-BY-4.0
---

# トレンド — 2026-10-31

**Velocity**（速度）順 — 注目がどれだけ速く移っているかで並べており、蓄積量では並べていない。各項目は実際に開いて読んだ一次情報源にリンクしている。

---

## 1. CISAがIvanti Connect Secureの2件をKEVに追加——世間が8.8と引く数字は、記録上は7.0

- **Velocity:** ▮▮▮ trending
- **Source:** CISA KEV · added 2026-10-30 · due 2026-11-02 / 2026-11-13
- **Tags:** `cve` `ivanti` `kev` `exploitation` `vpn`

CISAは**2026-10-30**、**CVE-2026-111357**と**CVE-2026-118527**を既知の悪用脆弱性カタログに追加した。根拠は「based on evidence of active exploitation」だ。どちらもIvanti Connect Secureで、同じ攻撃チェーンにある3件目**CVE-2026-104935**（認証バイパスとアップロード競合、CVSS 8.6）は**2026-10-13**にKEVへ入っている。調査はVolexityによるもので、**2026-10-13**に「A Series of Unauthenticated Events」として公開された。自称**unknown**のアクター**UTA0576**が、当時**完全にパッチ済み**だった`22.8R2.4, Build 19097`のアプライアンスに対して3件を連鎖させ、活動は**2026-10-03**まで遡れる。チェーンは、インメモリで`dsinvoked`ブローカーと`libdsplibs.so`のDSCache設定を書き換えてrootに到達する。

**記録上のスコアは報道のスコアではない。** CVEレコード（state `PUBLISHED`、assigner **MITRE**）が持つメトリクスは**1つ**だけだ。`CVSS:3.1/AV:L/AC:H/PR:L/UI:N/S:U/C:H/I:H/A:H` = **7.0 HIGH**、CWE-829。一方KEV自身のこの項目のタイトルは「Missing Authentication for Critical Function」で、Volexityは権限昇格と呼ぶ——同じ1件に3つのラベルがある。NVD側はいま`Analyzed`（lastModified **2026-10-30T20:29Z**——この項目の起草の15分後）で、しかも**独自のメトリクスは依然ゼロ**だ。これはエンドースの事例である：NVDは記録を分析し、MITREの7.0を横に自前のスコアを並べるのではなく、そのまま残した。二次報道は**8.8**を「the updated advisory」——Ivantiの通告であり、CVEレコードではない——に帰し、CVE-2026-118527には**4.3**を与える。だがその数値の背後に**レコードが存在しない**。NVDにこのCVEはなく、`cveawg`は`CVE_RECORD_DNE`を返し、KEVエントリ自身のnotesが指すNVDの詳細URLも何も解決しない。2026-09-01以降に追加された**79**件のKEVエントリのうち、公開済みレコードを持たないのは**この1件だけ**だ。ベクトル演算が裁定者であり、結果は7.0になる。押し下げているのは`AV:L`と`AC:H`で、欠けている要素があるからではない。Volexity自身の更新メモはCVE-2026-111357を権限昇格の修正として名指しし、**CVSSを一切与えていない**。CVE-2026-118527（認証済み攻撃者が既知のディスクパスへ書き込める、予測可能なファイル名の欠陥）は、そのページに**まったく登場しない**。

**Why it matters:** KEVは悪用についての主張で、深刻度についての主張ではない。ローカルアクセスと競合を要する7.0が9.8の並びに置かれるのは、このカタログが攻撃者が**実際にやったこと**を記録するからであり、スコア順だけでトリアージする人はこれを飛ばす。実務的に重要なのはポストエクスプロイト側の記述だ。攻撃者は**ウェブシェルを置かず**、コマンドごとにチェーンを再生し、結果をHTTPSで返した。そのためIvanti自身のIntegrity Checkerは「may not be able to identify device compromise」であり、Volexityはメモリフォレンジックでしか見られなかった。修正版は**25.1.1.3 / 25.1.3.1 / 22.8R2.6**、22.7.x以下は影響を受けない——ただしここで引用した3ページのどれにもその記載はない。Volexityのページにはなく、NVDの説明は`22.8R2.4`しか挙げておらず、Ivantiの通告は今回JSシェルだった（**1.0 MB**のHTMLに対して本文は**68文字**、`llms.txt`はログインへリダイレクトする）。したがってこの修正版リストはここでは**未検証**である。同じ日にKEVへ入った2件は期限も異なる——**2026-11-02**と**2026-11-13**——時計がチェーン単位ではなくエントリごとのリスクで階層化されているためだ。信頼度のラベルも一緒に読むべきだ。Volexityは「犯罪目的でスパイ目的ではない」を**低**信頼、「LLMを使っている」を**中**信頼とし、アクターの最終目的は「could not be determined」と明記している。

[`🔗 CISA — two KEV additions`](https://www.cisa.gov/news-events/alerts/2026/10/30/cisa-adds-two-known-exploited-vulnerabilities-catalog) · [`🔗 Volexity — chained ICS zero-days`](https://www.volexity.com/blog/2026/10/13/a-series-of-unauthenticated-events-chained-exploitation-of-ivanti-connect-secure-zero-days/) · [`🔗 CVE-2026-111357 (NVD)`](https://nvd.nist.gov/vuln/detail/CVE-2026-111357)

---

## 2. Northflankは全顧客に「環境変数は復号された前提で」と通告——AIキーが使われたと確認したユーザーが出ているとも

- **Velocity:** ▮▮▮ trending
- **Source:** Hacker News · 244+ pts · 約1日前（~2026-10-30）
- **Tags:** `incident` `secrets` `paas` `supply-chain`

Northflankは**2026-10-30 11:43 UTC**、Wizからの脅威アラートを受けて「Security incident」を立ち上げ、2時間足らずで「調査中」から踏み込んだ指示へ移った。原文はこうだ。**「Assume all environment variables have been decrypted. Disable/rotate all keys.」****13:58**までに範囲は「workloads, secret groups and global secrets」と明示され、**15:12**には全ユーザー向けにPostgresとMongoDBのシークレットローテーションを有効化し、addonの公開露出を切るよう推奨した。7つのコンポーネントが**Major outage**とされた。Networking、Certificates、Services、Addons、Jobs、Builds、Logs and Metricsだ。App、API、マーケティングサイト、ドキュメントは稼働を続けた。

最も重要な一文は見出しではなくステータス欄に埋もれている。**「Multiple users are confirming that their AI keys have been used.」** Northflankは顧客数を示しておらず、アクセスされた範囲も確定しておらず、最後の**19:28**更新時点でも調査継続で「no further confirmed findings」としている——ただしそこでの文言は復号を通り越して「assume all environment variables have been **compromised**」に変わっている。

**Why it matters:** PaaSは顧客が考えなくなった認証情報を抱えている。モデルのAPIキー、データベースURL、webhookシークレットだ。ここでの対応が正しいのは、まさに高くつくからで、証明を待つのではなく復号済みと仮定している。ローテーションの指示も開示も動く成果物であり、範囲は「既に限定されている」ではなく「不明」として扱うべきで、「追加の確認事項はない」はお墨付きではなく状態だ。

[`🔗 Northflank — status incident`](https://status.northflank.com) · [`🔗 Hacker News discussion`](https://news.ycombinator.com/item?id=50305025)

---

## 3. GoogleのSleepフレームワークは訓練を「覚醒」と「睡眠」に分ける——10Mトークンの勝ちに制限の節はない

- **Velocity:** ▮▮▮ trending
- **Source:** Hacker News · 92+ pts · 約1日前（~2026-10-30）
- **Tags:** `continual-learning` `moe` `research` `google`

Ali BehrouzとVahab Mirrokniは**2026-10-27**、Google Researchブログで**Sleepフレームワーク**を公開した（論文：arXiv **2606.03979**）。提案は、訓練して凍結する代わりに周期的な学習ライフサイクルを回すことだ。*覚醒*フェーズでモデルはサービスを提供し短期の痕跡を保存する。*睡眠*フェーズでは入力を止め、二つのことを行う。** consolidation**では、低ランクのMoEエキスパートを安定した低頻度の記憶ブロックに追加し、短期の痕跡をon-policy蒸留とRLの「模倣を学ぶ」報酬で長期パラメータへ蒸留し、その後、一時的な高頻度パラメータをリセットする（著者は「シナプス刈り込み」と呼ぶ）。**dreaming**では、MoEルーターが意図的に非典型のエキスパートを起動し、合成サンプルを生成し、勾配に基づく有用性で選別し、最も評価の高いサンプルで微調整する。

報告されている数値は次の通り。未見の**Manchu**と**Kalamang**での継続翻訳において複数段階でほぼ劣化なし、一方ICL、Cartridges、SFTは「showed severe forgetting」。**BABILong 10Mトークン**でほぼ完璧、GPT-4とTitansを上回る。SQuADと継続事前訓練で**48.9%**（単一タスク）と**46.2%**（CPT）、ベースモデル・SFT・SEALを上回る。AIME 24/25とHMMT 25で**79.2% / 69.0% / 46.1%**、SFT・GRPO・OPSDを上回る。

**Why it matters:** この記事には制限の節がなく、特定のモデルファミリ、パラメータ数、計算予算も示されず、クラス増分学習は数値なしのグラフだけだ。したがって正直な読み方は、これは見出し数値を伴う**手法**論文であり、システム間で比較できるアブレーションではない、ということになる。記述自体から二つの構造的な注意点が見える。この手法は事前確保したエキスパート容量とオフラインのフェーズを必要とし、記事はその配備コストを見積もっていない。そして利得は自己生成の合成データと勾配信号による選別に依存しており、それは他人の手に渡ったときに最も静かに失敗しやすい部分だ。理論は説明として提示されており、実測の差を証明するものではない。

[`🔗 Google Research — the Sleep framework`](https://research.google/blog/the-sleep-framework-a-new-way-for-llms-to-retain-knowledge-in-continual-learning/) · [`🔗 arXiv 2606.03979`](https://arxiv.org/abs/2606.03979)

---

## 4. LightpandaはZigで書き直したヘッドレスブラウザ——123 MB対2 GB、そしてAlpine上で動かないAlpine向けバイナリ

- **Velocity:** ▮▮▮ trending
- **Source:** GitHub Trending · 559 stars today · 38,209 total
- **Tags:** `browser` `zig` `agents` `automation`

**`lightpanda-io/browser`**は**Zig**でゼロから書かれたヘッドレスブラウザだ。「Not a Chromium fork. Not a WebKit patch.」グラフィカルなレンダリングエンジンを持たず、JavaScriptはV8で実行し、その上にCDP、WebDriver BiDi、Puppeteer/Playwright風の自動化、ページダンパー、「agent mode」、MCPサーバーを備える。ライセンスは**AGPL-3.0**。READMEのベンチマークはAWS EC2 `m5.large`上で933の実ページを対象にしたもので、100並列ページのピークメモリは**123 MB対2 GB**（約16分の1）、実行時間は**5秒対46秒**（約9倍速）。「16x lighter and 9x faster than Chromium」はここから来ている。

**Why it matters:** 差別化は加速率ではなく制約にある。レンダラーを落とすことがそのメモリ値を可能にしており、同時にこのツールができないこと（レイアウトやピクセルを要する一切）を定義している。READMEは壊れる場所について珍しいほど率直だ。**ネイティブのAndroidビルドはなく**、Bionicにglibcローダーがないためだ。**ネイティブのWindowsバイナリもなく**、WSLのみ。配布されるLinuxバイナリはglibcを要求するため、Alpineのようなmusl系では「cannot execute: required file not found」で失敗する。glibcベースのイメージを選ぶか、Zig 0.17.0とV8、Libcurl、html5everを入れてソースからビルドすることになる。DOMを読みAPIを叩くagentワークロードには妥当な取引で、視覚テストには間違った道具であり、ページ自身がそう書いている。

[`🔗 lightpanda-io/browser`](https://github.com/lightpanda-io/browser) · [`🔗 GitHub Trending`](https://github.com/trending)

---

## 5. Matt Pocockのskillsリポジトリは307kスターと27スキル——バイブコーディングへの反論であって、プロンプト集ではない

- **Velocity:** ▮▮ rising
- **Source:** GitHub Trending · 882 stars today · 307,347 total
- **Tags:** `agent-skills` `engineering` `mit` `claude-code`

**`mattpocock/skills`**（「Skills for Real Engineers. Straight from my .agents directory.」）は**307.3kスター、25.9kフォーク、551コミット**、**MIT**ライセンス。`skills/`以下に**27のスキル——README自身の一覧から数えたもので、ページに総数の記載はない**——を持ち、フェーズと起動方法の二軸で分かれている。**ユーザー起動のエンジニアリングスキル11個**（`ask-matt`、`grill-with-docs`、`triage`、`improve-codebase-architecture`、`to-spec`、`to-tickets`、`implement`、`implement-spec`、`wayfinder`、`retro`、`setup-matt-pocock-skills`）、**モデル起動9個**（`prototype`、`diagnosing-bugs`、`research`、`tdd`、`domain-modeling`、`codebase-design`、`code-review`、`pr`、`wizard`）、**ユーザー起動の生産性スキル5個**（`grill-me`、`handoff`、`teach`、`to-questionnaire`、`wait-what`）、**モデル起動2個**（`grilling`、`writing-for-agents`）。導入はプラグインマーケットプレイスか`npx skills@latest add mattpocock/skills`。

**Why it matters:** 狙いは4つの反復的な失敗モードだ。間違ったものを作る、冗長すぎる、動かないコード、コードベースが「泥団子」になる。対策は意図的に地味で、作る前のインタビュー、共有のドメイン用語集とADR、レッド-グリーン-リファクタのループ、継続的なアーキテクチャ改善になる。真似する価値があるのは起動方法による分割だ。ユーザー起動スキルはワークフローを編成し、モデル起動スキルはエージェントが自分で選べる再利用可能な規律を担う。両者を混ぜると、スキル集は誰も起動しないメニューになる。また「work with any model」と謳っており、この可搬性の約束はリポジトリ構造が支えているが、テストが示しているわけではない。

[`🔗 mattpocock/skills`](https://github.com/mattpocock/skills) · [`🔗 GitHub Trending (weekly)`](https://github.com/trending?since=weekly)

---

## 6. NESformerは約933 MBのQwen重みの中でファミコンを動かす——しかも一度も訓練されていない

- **Velocity:** ▮▮ rising
- **Source:** Hacker News (Show HN) · 118+ pts · 約1日前（~2026-10-30）
- **Tags:** `transformers` `deltanet` `emulation` `weights`

**`dbreunig/nesformer`**は、NESの6502 CPU、2 KBのワークRAM、カートリッジROMを**素の`Qwen3_5ForCausalLM`チェックポイントの中**で動かす。READMEが率直に書く通り、「**Nobody trained these weights; a compiler computed every one.**」ゲート付きDeltaNetの状態行列がメモリとして働く。one-hotキーが128幅の行を1つ上書きし、one-hotクエリがそれを読み戻すので、行はレジスタ、RAM、ROMセルになる。プログラムカウンタは保存されず、ジャンプ先と命令長のカウンタから推論される。チェックポイントは**466.6Mパラメータ、bf16で約933 MB**、非ゼロは**9.3M**のみ、zipで**3.3 MB**。ホストプログラムがPPU、コントローラ入力、vblank/NMIタイミング、APUレジスタを担い、生成されたトレース以外ではCPU状態に触れない。

面白いのは検証のほうだ。参照CPUはnestestのゴールデンログと**3,348命令**で一致し、py65とは**570万のゲーム命令**で一致する。正確な回路はnestestと**283,610**位置のすべての参照トークンを予測し、ThwaiteとFull Gameの完全実行は**300フレーム全部**と**210フレーム全部**を再現した。速度は実用とは程遠い。numbaは1コアで約**1,650トークン/秒**、リアルタイムには約**700,000トークン/秒**が必要で、アイドルループを飛ばしても実機より**150〜290倍**遅い。

**Why it matters:** これは、transformerの状態が**ホストのメモリ**になり得て、その順伝播が**CPU**になり得て、重みが学習されたものではなくコンパイルされた成果物になり得ることを示す、現時点で最も clean な公開実演だ。QwenputerがRISC-Vの状態でやったのと同じ技を、サイクル精度の参照トレースで照合できるコンソールに移している。制限は曖昧さなく書かれている。**NROM / iNES mapper 0のみ**、バンク切り替えなし、非公式オペコードはHALTを出力、APUフレームIRQもDMC IRQもなし、音なし、sprite-0ヒットは近似、そしてPPUは重みに一切入っていない。MITライセンスで、コンパイラの系譜はQwenputerの`chipformer`に由来する。

[`🔗 dbreunig/nesformer`](https://github.com/dbreunig/nesformer) · [`🔗 Hacker News (Show HN)`](https://news.ycombinator.com/item?id=50306442)

---

## 7. OpenAIは5つの価値観でModel Specを書き直した——そして文書自身が、モデルはまだ反映していないと認める

- **Velocity:** ▮▮ rising
- **Source:** OpenAI · Model Spec 2026-10-29 edition
- **Tags:** `openai` `policy` `alignment` `agents`

OpenAIは**2026-10-29**、書き直した**Model Spec**を公開した。5つの名付けられた価値観で再構成されている。**「Be faithful to human intent」「Minimize harm」「Be honest and transparent」「Facilitate human agency」「Act with care」**。意図への忠実さが基盤とされ、モデルは指示を字義通りに実行するのではなく人が実際に何を望むかを理解し、指示が尽きたところで判断を使うべきだとされる。文書は明確な権限階層を持つ**「chain of command」**を残している。**Root、System、Developer、User、Guideline**であり、加えてアシスタントメッセージ、ツールメッセージ、信頼できない内容には**「No authority by default」**を置く。さらに個人対集団の利益、目先の指示対長期目標という2つの均衡フレームを追加した。「Consider context carefully」は会話履歴、記憶、パーソナライズを扱い、前提を可視化して訂正しやすくすることを求める。

**Why it matters:** 持ち帰るべき一文はベンダー自身のものだ。**「Our production models do not yet fully reflect the Model Spec」**。これで文書は「振る舞いの記述」から「訓練目標」に変わる。その読み方が正しく、副作用の制御と伝達に関する拡張は**予約し、購入し、編集するagent**に向けて書かれている。そこでの失敗モードは、意図を読み違えたまま正しく実行された行動だ。構造上の注記も2つある。最も詳細な文体の指針は撤廃され、ユーザー、言語、文化に合わせる方針になった。主体は「the assistant」ではなく**「GPT」**と呼ばれる。なおページはより新しい版が最新だと示し、この版を履歴扱いとしているので、引用時は読んだ版を明示すべきだ。

[`🔗 OpenAI — Model Spec (2026-10-29)`](https://model-spec.openai.com/2026-10-29.html) · [`🔗 TNW — five core values`](https://thenextweb.com/news/openai-model-spec-five-values-update)

---

## 8. RecursiveのFlintは39.8B-A2.5Bのコーディングモデル、Apache 2.0——SWE-bench Pro v2で89.7%、知識カットオフは2026年6月

- **Velocity:** ▮▮ rising
- **Source:** Hugging Face Trending · 19k downloads · 1.26k likes
- **Tags:** `open-weights` `moe` `coding-agent` `apache`

**`RecursiveSI/flint`**はデコーダ専用MoEのコーディングagentモデルで、**総パラメータ39.8B／トークンあたり約2.5B活性**（出力ヘッドを含む。活性本体のみで約2.2B）、**49層**——dense 2層の後にMoE 47層——各MoE層に**256のルーテッドエキスパート**、トークンごとに6個と共有エキスパート1個を選ぶ。アテンションは**35層スライディングウィンドウ／14層フルアテンション**、コンテキストは**262,144トークン**、語彙は**150,144**、ライセンスは**Apache 2.0**。報告ベンチマークはtemperature 1.0 / top-p 0.95 / top-k 20で、**Terminal-Bench 2.1が54.9%、SWE-bench Pro v2が89.7%、SWE-bench Verifiedが74.2%**。

**Why it matters:** SWE-bench Proの数字は慎重に読むべきだ。Pro v2はより難しく汚染耐性のある分割であり、89.7%とTerminal-Benchの54.9%が並ぶ形はリポジトリ内の編集は得意で長いシェル作業は弱い、という姿を示す。これは活性パラメータ数から予想される姿と正反対だ。モデルカード自身の注意書きは言い換えず引用する価値がある。誤った内容や有害な内容、欠陥コード、不適切なツール呼び出しを生成し得ること、長い推論が出力予算を食うこと、コンテキスト上限が「a capacity limit, not a guarantee of uniform accuracy across all sequence lengths or tasks」であること。知識カットオフは**2026年6月**で、それ以降は想起ではなく推論になる。

[`🔗 RecursiveSI/flint`](https://huggingface.co/RecursiveSI/flint) · [`🔗 Hugging Face trending`](https://huggingface.co/models?sort=trending)

---

## 9. 線形プローブは追い詰められたagentの漏洩の82%を生成前に捕まえる——そして bag-of-words 分類器がほぼ同等

- **Velocity:** ▮▮ rising
- **Source:** arXiv · 2610.40588 · 2026-10-30
- **Tags:** `multi-agent` `safety` `interpretability` `research`

「**Pre-Crime for Agents, at the Last Second: Probing When a Recruited Agent Gives In**」（arXiv **2610.40588**、Leonidas Raghav）は、6つのシナリオにわたる統制されたマルチエージェントの圧力実験を組む。仲間が最大20ラウンドにわたり、デプロイトークンのような秘密を明かすよう標的を迫り、標的はしばしば拒否した後に折れる。**線形プローブ**が各モデル呼び出しの**生成前**に活性を読む。ホールドアウトの**Qwen3-32B**エピソードで、良性呼び出しの5%をフラグする閾値において、プローブは漏洩呼び出しの**82%**を検出する。ゼロショットの決定モデル監視は同程度の率で**26%**だ。**gpt-oss-20b**では推論へのプロービングが**AUROC 0.91**に達する。

**Why it matters:** 最も有用なのは論文が自分に不利に報告する結果だ。同じ呼び出しで訓練したbag-of-words分類器が「comes close」であり、「most of the gain comes from training on labels, not activations」を示唆する。さらにプローブは**許可された**開示にも反応し、「違反」よりも「これから来る開示」を読んでいる。出力フィルタはテキストが生まれた後にしか見られないが、これはチェックを前倒しする。ただし警告の距離は短く、警報のたびに止めるのは「would stop most benign episodes」であり、二つ目のテキスト検査ではこのトレードオフを解消できなかった。設定は統制環境であって配備ではなく、82%は上界の形をした数値であって現場の発生率ではない。

[`🔗 arXiv 2610.40588`](https://arxiv.org/abs/2610.40588) · [`🔗 arXiv cs.AI recent`](https://arxiv.org/list/cs.AI/recent)

---

## 10. 検索ではなく「記憶を歩く」としての検索——0.59Mステップで0.95のリターン、絶対アドレッシングは0.94Mから2M超

- **Velocity:** ▮▮ rising
- **Source:** arXiv · 2610.40545 · 2026-10-30
- **Tags:** `memory` `long-context` `agents` `research`

「**Retrieval as Traversal: Value-Indexed Memory for Stateful Long-Context Agents**」（arXiv **2610.40545**、Daniel Strauß、Zhenshan Bing、Alois Knoll）は、記憶の**内容**と**アドレス**を分ける。内容が価値を決め、位置がアクセスコストを決める。検索は、毎ステップで新たに全体探索するのではなく、記憶アドレスに沿った持続的な局所走査になる。提案されるのはコスト正則化付きの索引で、価値ある情報を近くに保ちつつ、局所的に到達可能にした各記憶に罰則を課す。その限界価値の形は、補完的な記憶をまとめて検索するよう促し、それぞれが単独で有用というだけで冗長な記憶が同じ集合に入るのを抑える。

唯一の実験は**MiniGrid Memory**上の最も単純な固定幾何変種による概念実証で、5トークンのコンテキストを使う。持続的局所走査ヘッドは**0.59M訓練ステップで平均リターン0.95**に達した。ガウス型の絶対アドレッシングは**0.94M**ステップ、カテゴリ型の絶対アドレッシングは**2M超**を要した。

**Why it matters:** 正直な枠付けは論文自身のものだ。学習された幾何と反復検索は試されておらず、「to test the full proposed method further experimentation is necessary」とある。したがって支持されるのは、**状態を持つ**検索が状態を持たない検索より学習しやすいかもしれない、という弱い主張だ。それでもagentにとっては有用な方向である。増え続けるコンテキストを毎回探し直すことが主要コストだからだ。1.6〜3.4倍のサンプル効率差は「試す理由」であり「出荷する理由」ではない。

[`🔗 arXiv 2610.40545`](https://arxiv.org/abs/2610.40545) · [`🔗 arXiv cs.AI recent`](https://arxiv.org/list/cs.AI/recent)

---

## 11. 「巻き戻し可能な対話型証明」で弱い検証者が強い証明者を巻き戻せる——得られるのはほぼ線形の検証時間

- **Velocity:** ▮▮ rising
- **Source:** arXiv · 2610.40535 · 2026-10-30
- **Tags:** `scalable-oversight` `proofs` `research`

「**Efficient Scalable Oversight via Rewinding**」（arXiv **2610.40535**、Ziyi Guan、Yael Tauman Kalai、Ron Rothblum、Zoe Xi）は、議論ベースの監督の下にある仮定を攻める。既存の対話型証明が効率的なのは、少なくとも一方の証明者が正直な場合だけで、この仮定を外すのは高くついてきた。彼らの構成である**巻き戻し可能な対話型証明（RIP）**は、検証者が証明者の状態を保存し後で復元できるようにする。これは証明者がAIモデルであるか、チェックポイント可能な環境で動くときにまさに実行可能だ。彼らは暗号を使わずに、「oracleの答えのごく一部を変えても頑健」な計算に対するRIPを構成する。正直な証明者は**元の計算に対して線形**の時間で走り、一回の前処理の後、検証者は「入力長に対してほぼ線形」の時間で走る。

**Why it matters:** これは効率の定理であってベンチマークではない。概要は定量的な高速化を一切示さず、唯一の実証は**予備的なMNIST実験**で、RIPが「a state-of-the-art deployed proof system」を上回り得るというものだ。適用限界は2つ明記されている。構成はoracleの答えのごく一部を変えても頑健な計算のみを対象とし、巻き戻しは検証者が証明者のマシンを制御できるか、チェックポイントと復元ができることに依存する。これは第三者モデルには実質的な制約で、自分でホストするモデルには問題にならない。監督研究がますます後者に寄らざるを得ない場所だ。

[`🔗 arXiv 2610.40535`](https://arxiv.org/abs/2610.40535) · [`🔗 arXiv cs.AI recent`](https://arxiv.org/list/cs.AI/recent)

---

## 12. OpenMausBotは各botに専用のコンピュータを与える——8.4kスター、Apache-2.0、そしてAPIキーは0600のファイルに平文で

- **Velocity:** ▮▮ rising
- **Source:** GitHub Trending · 899 stars today · 8,422 total
- **Tags:** `agents` `desktop` `mcp` `apache`

**`milind-soni/OpenMausBot`**——旧名OpenGrokBot、別名「MausBot」——はGrok Bot / Meta Muse / OpenAI dotsのオープンソース代替で、発想は単純だ。AIエージェントは**チャットアプリの連絡先**であり、それぞれにペルソナ、モデル、会話記憶、コンピュータ、接続アプリがある。botはローカルにインストールした`claude`、`codex`、`grok`のCLIで動き、ローカルのハーネスサーバーがプロセスを管理する。すべてのbotがコンピュータを得る。Boat APIで用意されるクラウドLinuxデスクトップ、分離された「Local VM」、対応していればユーザー自身のマシンだ。ライセンスは**Apache-2.0**だが、`enterprise/`ディレクトリは別ライセンスの「source-available」で、それを削除すればオープンソース版になる。リポジトリは**8.4kスター、1.2kフォーク、7,442コミット**。

セキュリティモデルは同カテゴリの標準より考えられている。権限ブローカーがシェルコマンド、ファイル編集、質問をインラインの「許可／拒否／チャットで回答」カードに変える。認証情報は「write-only」で、UIは値ではなく設定済みフラグを見る。ホストコンピュータの制御は明示的なオプトインで、Ubuntu Waylandではissue #345待ちのため**fail-closed**。MCPコントロールプレーンは承認付与、削除、設定、認証情報、コンピュータのライフサイクルを意図的に除外している。

**Why it matters:** 例外こそが注意点だ。APIキーは**私有の`config.json`に平文で保存**され（Unixでは`0600`）、権限モデル全体がローカルファイルシステムの保護に乗っている。これはキーチェーンとは別の脅威モデルだ。プロジェクトは自ら「early but real」と称し、ギャップを列挙する。Ubuntuはベータ、通話はmacOSのみ、Windowsインストーラは未署名、アプリイベントは同梱のComposioサービスが必要だ。興味深いのはアーキテクチャ上の賭けで、コンピュータを持つagentが製品の形であり、権限ブローカーがそれを売り物にしているという主張だ。

[`🔗 milind-soni/OpenMausBot`](https://github.com/milind-soni/OpenMausBot) · [`🔗 GitHub Trending`](https://github.com/trending)

---

## 13. Tangledが連合型フォージを再構築——インメモリのRust索引器、そしてコードと同じ場所に置かれるGitオブジェクト連鎖のissue

- **Velocity:** ▮▮ rising
- **Source:** Hacker News · 144+ pts · 約1日前（~2026-10-30）
- **Tags:** `git` `federation` `atproto` `forge`

Tangledはコードフォージを再構築したアーキテクチャでリローンチした。かつてのGoモノリス（「appview」）はスウェーデンの1つのSQLiteデータベースから索引、キャッシュ、プロトコル外データ、サーバーサイドレンダリングのUIを担っていた。現在は**エッジに配備したSvelteフロントエンド**と、**bobbin**——完全にインメモリで読み取り専用の新しい**Rust**索引器——に分割され、bobbinは**11以上のリージョン**で動く。**Knot2**もRustで、自作のGitサーバーとSSHサーバーを1つのバイナリに畳み込む。issue、プルリクエスト、コメント、リアクション、ラベルは**コードと同じくknot上**に「collaborative objects」として置かれる。署名付きレコードと完全な履歴を持つGitオブジェクトの連鎖で、AT Protocolのファイアホースで同期する。ユーザー自身のPDSに書かれるattestationにより、knotが記録を改変していないことを双方向に検証できる。組織は独自のDIDを持つ実在のAT Protocolアカウントになり、PRフローはGitとJujutsu双方のスタックPR、バージョン間のinterdiffに対応する。

**Why it matters:** 「連合」は通常、コードはミラーされるが協業レイヤーはされないことを意味する。issueとPRをcommitと同じ署名付きオブジェクトグラフに入れることが、可搬性を名目から実質に変える部分だ。制限は明記されている。bobbinは**読み取り専用**でAT Protocolデータのみを扱う。既存のセルフホスト者はknotを**v1.20.0**に上げる必要がある。組織の代役になっている通常アカウントの移行は開発中。プライベートリポジトリ、CLI、言語SDK、agent skillsは数週間後の約束だ。つまりこれは「発表された再構築」であって「完了した再構築」ではない。

[`🔗 Tangled — the federated code forge`](https://tangled.org/blog/forge/) · [`🔗 Hacker News discussion`](https://news.ycombinator.com/item?id=50305573)

---

## 14. Bunny.netは侵害されたホスティング事業者のサーバー上にCDNノード1台を発見し、管理証明書をすべて再発行へ

- **Velocity:** ▮▮ rising
- **Source:** bunny.net status · incident published 2026-10-28
- **Tags:** `cdn` `tls` `incident` `supply-chain`

bunny.netは**2026-10-28**、インシデントを公開した。あるインフラ事業者がサードパーティ製サーバー管理ソフトに関わる不正アクセスを報告し、bunny.netの**アルメニアにあるCDNノード1台**がその影響を受けたサーバー上でホストされていた。**2026-10-28 11:40 UTC**、bunny.netは20分以内にそのサーバー経由のトラフィックを止め、ログを保全し、サーバーを消去し、アクセスを取り消して恒久的に除外した。調査は「found no evidence of unauthorized access to the CDN node or any of its data」としつつ、「cannot completely rule out the possibility」と認めている——定型表現であり、それでも後続作業が行われている理由でもある。

範囲の記述は狭い。*もし*アクセスがあったとしても、露出し得たのはそのサーバー上の一時キャッシュ内容、Pull Zone設定、TLS証明書に限られ、bunny.netのアカウントデータや内部システムは影響を受けていない。プラットフォームドメインの証明書は失効・再発行され、**2026-10-29 18:40 UTC**の更新では、管理TLS証明書の再発行が新しい秘密鍵で管理されたバッチ単位に進み、**2026-10-31**末までの完了見込みとされた。

**Why it matters:** 単一ノードは小さな爆発半径であり、同時に大きな爆発半径でもある。CDNエッジは他人のドメインの秘密鍵を握っているからだ。「証拠がない」と「排除された」の区別が、ステータスメモを鍵ローテーション作業に変える。この告知が正直なのは、コストが自前証明書を使う顧客に落ちる点だ。彼らは自分で失効・再発行するよう求められており、事業者は代われない。

[`🔗 bunny.net — CDN incident`](https://status.bunny.net/incidents/p6gf1by9kr7m) · [`🔗 Hacker News discussion`](https://news.ycombinator.com/item?id=50308697)

---

## 15. WordPressのインポートプラグインがCISAの enrichment で9.9——そしてNVDのステータスは`Deferred`

- **Velocity:** ▮ steady
- **Source:** NVD · published 2026-10-29
- **Tags:** `cve` `wordpress` `cisa-adp` `path-traversal`

**CVE-2026-113617**（**2026-10-29**公開）は、WordPressプラグイン**Automated Import Products to Cart**の**1.0.4**未満におけるパストラバーサルだ。ユーザー提供のファイルパスを読み取り・削除に使う前にサニタイズせず、権限が最小のユーザー——「such as subscribers」——が任意のファイルを（including ones containing the database credentials）読め、任意のサーバーファイルを削除できる。メトリクスは`CVSS:3.1/AV:N/AC:L/PR:L/UI:N/S:C/C:H/I:H/A:H` = **9.9**。

**この9.9はベンダーのものでもNVDのものでもない。** その出所は`134c704f-9b21-4f2e-91b3-4a467353bcc0`——**CISA-ADP**（Vulnrichment）——で、`Secondary`スロットに入っており、CWE-22も同じ出所に帰される。レコードの`vulnStatus`は**`Deferred`**で、`nvd@nist.gov`のメトリクスは存在しない。これは5番目の出所ケースの最も純粋な形だ。レコード上の数値が第三者の enrichment コンテナによって書かれ、NVDはそのレコードを分析しないと表明している。

**Why it matters:** スコア自体は妥当だ。`PR:L`の読み取り・削除を9.9まで押し上げるのは`S:C`である。ただ「NVD」に帰すのもプラグイン作者に帰すのも誤りで、`Deferred`はその数値が再検討されないことを意味する。同じ24時間の窓からは、**CVE-2026-109516**（`security@wordfence.com`、**9.8**、`Deferred`）も出ている。「Bot for Telegram on WooCommerce」の**1.3.0**までの認証バイパスで、公開RESTエンドポイントがwebhook署名検証を飛ばし、`message.chat.id`を標的のユーザー名にした偽造updateを受け入れ、予測可能なログイントークンが管理者を含む任意のアカウントに認証cookieを設定する。さらに**CVE-2026-42922**（`talos-cna@cisco.com`、**9.8**、`Deferred`）は、**FUXA 1.3.2-2809**の`/nodered`における認可バイパスで、未認証から任意コード実行に到達する。3つのCritical、3つの異なるCNAスコアラー、3つのNVDが延期したレコードだ。

[`🔗 CVE-2026-113617 (NVD)`](https://nvd.nist.gov/vuln/detail/CVE-2026-113617) · [`🔗 CVE-2026-109516 (NVD)`](https://nvd.nist.gov/vuln/detail/CVE-2026-109516) · [`🔗 CVE-2026-42922 (NVD)`](https://nvd.nist.gov/vuln/detail/CVE-2026-42922)

---

## 16. 「AIはSREを置き換えていない、スキルを劣化させている」——そして根拠は内視鏡と航空から借りている

- **Velocity:** ▮▮ rising
- **Source:** Hacker News · 363+ pts · 約1日前（~2026-10-30）
- **Tags:** `sre` `automation` `labor` `analysis`

SigNozのニュースレター記事は、AIがSREに及ぼすより近いリスクは置き換えではなく**スキルの侵食**だと論じる。根拠はBainbridgeの1983年「自動化の皮肉」だ。定型作業を自動化すると人は受動的な監視に置かれ、稀な危機に十分な練習なしで直面することになる。SREの文脈では、AIがアラートのグループ化、ランブック、既知問題の修復、ログ異常、一次的な根本原因候補をますます担うため、人間には新規のカスケード障害——直感が最も重要な場面——だけが残り、それを鍛える機会は減る。著者はその初級版を**「never-skilling」**と呼ぶ。

**裏付けの数値はすべて他分野のものだ。** ある医学研究では、AI支援後に内視鏡医の**支援なし**のポリープ検出率が**28%から22%**へ低下した。航空研究では自動操縦依存の強いパイロットが状況認識と手動操縦の熟練を失い、FAAが手動飛行の増加を求めるに至った。PagerDutyの階層モデルも引かれる。既知の障害は自動化し、部分的な問題はAIの推奨と人間の検証を組み合わせ、新規のカスケード障害は人間主導で残す。

**Why it matters:** 記事の構造そのものが注意点だ。SRE固有の研究は背後になく、根拠は類推的で、「95%」という前提は仮定であり、PagerDutyの枠組みはベンダーのものだ。SigNozの記事として、可観測性ネイティブのAIに商業的利害もある。それでも議論は無効にならない。「human-in-the-loop, not human-on-the-side」は実際の設計制約であり、一部のインシデントを意図的に人間へ回すのは最も安い介入だ。ただし正直な引用は借り物の根拠を持つもっともらしい機構であって、測定された効果ではない。

[`🔗 SigNoz — AI isn't replacing SREs, it's deskilling them`](https://newsletter.signoz.io/p/ai-isnt-replacing-sres-its-deskilling) · [`🔗 Hacker News discussion`](https://news.ycombinator.com/item?id=50305693)

---

## 17. GitHubのActions、Pages、Webhooksが90分間劣化——17:50から19:23 UTC

- **Velocity:** ▮ steady
- **Source:** githubstatus.com · incident 2026-10-30
- **Tags:** `github` `outage` `ci`

GitHubは**2026-10-30 17:50 UTC**、**ActionsとWebhooks**の「性能劣化」で調査を開始し、**Pages**が**18:00**に続いた。**18:06**には影響が具体化し、Actionsワークフロー、Pagesデプロイ、webhookイベントの遅延に加え、**code searchとlive updates**でエラーが出た。緩和が始まり早期の回復兆候が見られ、影響サービスは**18:32**にすべて回復、インシデントは**19:23**に解決し、詳細な根本原因分析が約束された。

**Why it matters:** 爆発半径は依存グラフそのものだ。ActionsはほとんどのOSS CIが走る場所、Pagesは多くのドキュメントが置かれる場所、webhookはあらゆる連携が「何かが変わった」を知る手段だ。したがって90分の劣化は、自分がそれに依存していると知らないリリースやデプロイパイプラインを止める。データ損失やセキュリティ面の記載はなく、解決はサービス復旧と理解し、原因について結論を出す前にRCAを待つべきだ。

[`🔗 GitHub — incident`](https://www.githubstatus.com/incidents/pwxsjgnvrk6b) · [`🔗 Hacker News discussion`](https://news.ycombinator.com/item?id=50307723)

---

## 18. DeepSeek-V4.1-Flash-1017がHugging Faceトレンド1位に再浮上——763B、1Mコンテキスト、MIT、そしてKVキャッシュ圧縮に関する引用

- **Velocity:** ▮ steady
- **Source:** Hugging Face Trending · 146k downloads · 3.99k likes
- **Tags:** `deepseek` `open-weights` `moe` `context`

**`deepseek-ai/DeepSeek-V4.1-Flash-1017`**は今朝Hugging Faceのトレンド1位で、**146kダウンロード、3.99kいいね**を集めるが、新規リリースではない。モデルカードはDeepSeek-V4.1-Flashの**「minor update」**と説明し、コレクションは最終更新を**14日前**と示す。画像テキスト→テキストの**763Bパラメータ**、8-bit / FP8、**MIT**ライセンス、**1Mトークンのコンテキストウィンドウ**、`max_tokens`は少なくとも**256K**。インターリーブ画像、思考モード、ツール呼び出し、数値的なreasoning effort、会話途中のsystem messageに対応する。報告スコアは**HLE ツールなし42.6**（テキストのみ44.0）、**Terminal-Bench 4.0 42.3**、**DeepSWE v1.1 77.0**、**NL2Repo-Bench 68.2**、**Agents' Last Exam 35.4**、**ZeroBench-main ツールあり51.0**。引用タイトルは「Pushing the Limits of KV Cache Compression」を指す。

**Why it matters:** このトレンドは能力の出来事ではなく配布の出来事であり、フィードはそう言うべきだ。バージョン文字列の`-1017`は日付スタンプであって新規性の主張ではない。カードからの実務的な注意が2つある。本リリースには**Jinjaチャットテンプレートが同梱されない**ため、プロンプトのエンコードにはPythonの参照実装か`deepseek-recipe`ライブラリが必要で、素朴な配備設定を壊す。もう1つ、ベンチマークは公開者による自己申告で、いくつかはツール併用やサブセット上で走っており、本フィードのハーネスなしの数値と横比較はできない。

[`🔗 deepseek-ai/DeepSeek-V4.1-Flash-1017`](https://huggingface.co/deepseek-ai/DeepSeek-V4.1-Flash-1017) · [`🔗 Hugging Face trending`](https://huggingface.co/models?sort=trending)

---

## 19. taste-skillは106kスターでアートディレクションに伸びる——スキルは1つだけ、残りは別リポジトリへ

- **Velocity:** ▮ steady
- **Source:** GitHub Trending (weekly) · +4,359 this week · 106,235 total
- **Tags:** `agent-skills` `design` `mit`

**`Leonxlnx/taste-skill`**は、**アートディレクション**、オープンライセンスの参照画像、ブラウザベースの検査を提供するagentスキルで、コーディングagentが凡庸なレイアウトではなくデザインされたページやダッシュボード画面を作れるようにする。**106,235スター、254コミット**、**MIT**ライセンスで、現在は**有効なスキルを1つ**だけ持つ——`design-taste-frontend`——なぜなら著者が他のスキルを別リポジトリへ移したからだ。

**Why it matters:** これは2週間で3番目の、コード生成ではなく**美的**判断に重心を置く大規模agentスキルリポジトリであり、1つに集約されたことが興味深いシグナルだ。価値は参照セットとブラウザ検査（結果が実際に参照画像に似ているか）にあり、プロンプトの数にはない。これは前のデザインスキル流行が示したのと同じ教訓だ。スキルファイル1つに106kスターが付くのは「商品としてのセンス」への需要の尺度であって、そのファイルが機能する証拠ではない。READMEにも決着をつけるベンチマーク主張はない。

[`🔗 Leonxlnx/taste-skill`](https://github.com/Leonxlnx/taste-skill) · [`🔗 GitHub Trending (weekly)`](https://github.com/trending?since=weekly)

---

## 20. この米国tax formプロジェクトは自分の算術を検査し、失敗箇所を公開する——申告者カバレッジ68.6%、157の拒否ゲートのうち148が未測定

- **Velocity:** ▮ steady
- **Source:** Hacker News (Show HN) · 80+ pts · 約2日前（~2026-10-29）
- **Tags:** `verification` `lean` `tax` `open-source`

**`emmilco/us-tax-model`**は、米国連邦個人所得税の様式と記入指示を、公開・引用付き・機械検証可能なデータとして符号化する。**124スター、10フォーク**、コードは**Apache-2.0**、データは**CC0**。様式はYAMLファイルで、各行が約20個の原子（`sum`、`smaller_of`、`table_lookup`など）からなる閉じた語彙の式を持ち、ユーザー定義関数もループも再帰もない。アーカイブ済みの出所への引用（ページハッシュを含む）が付く。金額はすべて整数セントで`BigInt`により評価され、浮動小数点は一切使わない。ビルド時のチェッカーが参照、非循環性、型、網羅的な分岐選択、来歴を検証し、レンダラーが各行の可読な英語を出力する。`lean/TaxFormalization/`では原子が整数上で定義され、`subtractFloor0_nonneg`や`roundHalfUpToUnit_idem`といった性質が証明され、正規JSON上の参照評価器が停止性と決定性を証明される。**PolicyEngine-US**、**Tax-Calculator**、**OpenTaxSolver**とも突き合わせ、「never files, signs or transmits a return」だ。

**Why it matters:** 制限の節こそが、残りを信頼する理由になる。引用は「proves a line points at a page, not that it was read correctly」にすぎない。型が正しい誤ったオペランドは依然として検査を通る。評価器の一致はデータがIRSの原文と一致することを示さず、**BUG-0001**は両方の評価器が一致して誤った和を出した自分たちの事例だ。2つの評価器は「read the same files, so agreement shows the evaluators agree, not that the data is right」であり、スコアボードは**1,515**行のうち**198**行（**13.1%**）を外部ファミリの主張に依拠させている。実測の申告者カバレッジは**68.6%**だが、**157の拒否ゲートのうち148が未測定**で、真のカバレッジはより低い。様式と指示は法律ではなく、曖昧さは解決されず記録される。弁護士はプロジェクトの法的立場を検討していない。これが、どの主張が証明され、どの主張が単に検査されただけかを正直に区別する検証プロジェクトの姿だ。

[`🔗 emmilco/us-tax-model`](https://github.com/emmilco/us-tax-model) · [`🔗 Hacker News (Show HN)`](https://news.ycombinator.com/item?id=50278678)

---

## Metadata

| Field | Value |
|-------|-------|
| Generated | 2026-10-30T20:14:50Z |
| Items | 20 |
| Sources tracked | 17 (Hacker News, GitHub, arXiv, Hugging Face, CISA KEV, NVD, CISA-ADP, Google Research, OpenAI, Volexity, bunny.net, Northflank, GitHub Status, SigNoz, Tangled, TNW) |
| Update schedule | 04:03, 12:03, 20:03 UTC+8 (3x daily) |
| Ranking | Velocity-weighted (recency × engagement acceleration × source authority) |
| License | [CC-BY 4.0](https://creativecommons.org/licenses/by/4.0/) |

---

[Previous day](2026-10-30.md) · [Raw .md](https://trending.md/jp/feed/2026-10-31.md) · [Archive](../archive/)
