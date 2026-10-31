---
date: 2026-10-31
updated: 2026-10-31T12:32:34Z
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

## 21. Anthropic の Claude が Linux カーネルにゼロクリック root RCE を発見 — KASLR リークに 48 分、Akamai は顧客への通知を開始

- **Velocity:** ▮▮▮ trending
- **Source:** Anthropic Frontier Red Team · published 2026-10-27 · CVE record 2026-10-15
- **Tags:** `cve` `linux-kernel` `rce` `anthropic` `mptcp`

**CVE-2026-98432** はカーネルの IPv4 TCP 経路における競合状態由来の use-after-free で、その詳細は Anthropic によるものだ。Frontier Red Team によれば、社内の研究モデルが完全な攻撃チェーンを書き、**Multipath TCP リスナー**を公開しているサーバー上で、資格情報もユーザー操作もなしに root に到達した。レコードは Linux カーネル CNA のもので（assigner `Linux`、`PUBLISHED` **2026-10-15T12:08Z**、予約は **2026-09-25**）、指標は**ひとつだけ** — `CVSS:3.1/AV:N/AC:L/PR:N/UI:N/S:U/C:H/I:H/A:H` = **9.8** — で、**CWE は一切ない**（CNA コンテナの `problemTypes` が `null` なので、この「無い」は NVD の解析結果ではなく CNA 自身のフィールドについての記述だ）。NVD 側は **`Received`**、最終更新は **2026-10-30T16:18Z**。

欠陥はカーネルのコミット名が示すとおりのものだ — `ipv4: free inet_opt and ireq_opt after an RCU grace period`。`tcp_v4_syn_recv_sock()` は `ireq->ireq_opt` の所有権をコピーせずに子ソケットへ移す。別の CPU が**再送された SYN** を処理して `tcp_check_req()` から SYNACK を送るとき、同じオプションを `rcu_read_lock()` の下で読むだけであり、`inet_sock_destruct()` は `kfree_rcu()` ではなく素の `kfree()` で `inet_opt` を解放するため、`ip_options_build()` が解放済みのオブジェクトを読む。CNA の `AV:N` の根拠（度量の `scenarios[]` フィールドに書かれており、description ではない）は前提を正確に述べている — 未認証のピアが TCP SYN に IPv4 Record Route または Timestamp バイトを載せる — そして request socket の**マイグレーション**経路（`net.ipv4.tcp_migrate_req=1` または BPF reuseport セレクタ）が残る半分で、MPTCP が踏むのはそこだ。`references[]` には安定ブランチ向けの修正コミットが 8 本並び、いずれも導入コミット `079096f103fa`（syn_recv リクエストを ehash に載せたコミット）からの `versionType: git` 範囲として書かれている。

**Why it matters:** 今日の主題は点数の話ではなく運用側の波及だ。Anthropic のタイムラインは率直で、48 分でカーネルポインタをリークし、そこから 5 分でシェルコマンド実行に至る。効いている性質は「競合に負けてもハンドシェイクが落ちるだけでマシンは落ちない」ため、成功するまで無限に再試行できることだ。これは共有ホストにおける「パッチを当てる」の意味を変える。**Akamai** は **2026-10-30 18:10 UTC** に Linode 顧客向けのセキュリティ勧告を開き、**10-31 01:55 UTC** には緩和策を展開中であり "At this time, we have no evidence of this vulnerability being exploited on the Akamai Compute platform" と述べ、上流の OS アップデートを適用するよう顧客に伝えた。一方 **Go セキュリティチーム**は、**Go 1.24** 以降 Go プログラムが Linux の listen ソケットで MPTCP を既定で有効にするため、誰も要求していなくても Go サーバーが対象に入り得ると警告した。`GODEBUG=multipathtcp=0` や `go.mod` の `godebug multipathtcp=0` は応急処置だが、同じ投稿が "disabling MPTCP on a program-by-program basis is a fragile mitigation"、そして "The best fix for this vulnerability is to upgrade to a patched kernel version." とも書いている。二つの主張は分けて読むべきだ — Anthropic の PoC は MPTCP を必要とするが、Go の警告は根底のバグが MPTCP 固有ではなく、MPTCP リスナーのないシステムも別経路で到達可能かもしれないという話だ。

[`🔗 Anthropic — discovering and exploiting vulnerabilities with Claude`](https://www.anthropic.com/research/discovering-vulnerabilities-with-claude) · [`🔗 oss-security — protecting Go programs against CVE-2026-98432`](https://www.openwall.com/lists/oss-security/2026/10/30/1) · [`🔗 Akamai/Linode — customer security advisory`](https://status.linode.com/incidents/nt58zhx3pmgm) · [`🔗 CVE-2026-98432 (NVD)`](https://nvd.nist.gov/vuln/detail/CVE-2026-98432)

---

## 22. LXD の相互 TLS はチェーン上の全証明書を信頼していた — 10.0、任意の信頼済みユーザーの公開証明書で足りる

- **Velocity:** ▮▮▮ trending
- **Source:** Ubuntu Discourse · advisory 2026-10-28 · CVE published 2026-10-30
- **Tags:** `cve` `lxd` `tls` `auth-bypass` `canonical`

**CVE-2026-112816** は **LXD**（および **MicroCloud**）の認証バイパスだ。デーモンの相互 TLS 検証は "compared all peer certificates sent by the client to known trust store entries"。つまり HTTPS API に到達でき、**他人の公開クライアント証明書**を入手できる攻撃者は、それを自分のチェーンの**中間**証明書として置くことで、その身元として認証できてしまう。Canonical の勧告は仕組みを一行で言い切る — "only the leaf certificate proves ownership of the signing key" — そして影響はこうだ："The vulnerability allows an attacker that is able to reach the LXD HTTPS API to authenticate as any trusted TLS client, for which the attacker has the public certificate." 被害者の権限次第でこれは**ホストの root** になる。管理者クライアントはデーモンを操作できるからだ。MicroCloud では形がさらに悪く、攻撃者は "intercept the public TLS certificate of a joining cluster member" を行い、そのメンバーとして認証できる。

Canonical はこの欠陥が "was referred to us from the Incus project" だと述べ、`stgraber` に謝辞を記し、**2026-10-29** に LXD 4 チャネルと MicroCloud 2 チャネルで修正を出した — **6.10.1**、**5.21.9**、**5.0.11**、**4.0.15**、**microcloud 2.1.5**、**3.4.1** — `snap refresh lxd` / `snap refresh microcloud` で適用し、ポイントリリースはいまだ `candidate` から `stable` へ段階展開中だ。CVE コンテナ（assigner **canonical**、`PUBLISHED` **2026-10-30T16:42Z**）は **CVSS 4.0 = 10.0**（`security@ubuntu.com` 由来、`AV:N/AC:L/AT:N/PR:N/UI:N` で影響三項目が脆弱側・後続側とも High）と **CWE-295** を持ち、影響範囲は semver で 4 本（`4.0.14 < 4.0.15`、`5.0.10 < 5.0.11`、`5.21.8 < 5.21.9`、`6.9.0 < 6.10.1`）。NVD 側は **`Deferred`** で、独自の度量はひとつも持たない。

**Why it matters:** メモリ破壊でもチェック漏れでもなく、**比較対象の集合を間違えた**ことが原因の 10.0 は珍しい。クライアントが送ってきたチェーン上の全証明書がトラストストアと照合されたので、トラストストアの中身がそのまま署名可能な資格情報になった。ここには綺麗なフィールド単位の注意点もある。勧告の修正表は**二つの**製品にまたがる**六つ**の snap バージョンを挙げるが、CVE レコードの `affected[]` が名指しするのは**一つ**の製品（LXD）と 4 本の範囲だけだ。MicroCloud の 2.1.5 と 3.4.1 は本文ページにしか存在せず、機械可読レコードだけを信じる読者には MicroCloud が対象だと分からない。LXD を特権的な管理プレーンとして動かしているなら、パッチ適用まで全クライアント証明書の公開部分を漏洩済み資格情報として扱い、その snap が実際にどのチャネルを追っているかを再確認すべきだ。段階展開の最中では "latest" と "stable" は同じものではない。

[`🔗 Ubuntu Discourse — Canonical LXD and MicroCloud advisory`](https://discourse.ubuntu.com/t/security-advisory-critical-vulnerability-found-in-canonical-lxd-and-microcloud/90557) · [`🔗 CVE-2026-112816 (NVD)`](https://nvd.nist.gov/vuln/detail/CVE-2026-112816) · [`🔗 Hacker News discussion`](https://news.ycombinator.com/item?id=50310937)

---

## 23. 公式 Ollama ライブラリのコード系 GGUF 305 タグのうち 7 つはほぼ何も解けない — そして未較正の再ビルドとテンソル単位で一致する

- **Velocity:** ▮▮▮ trending
- **Source:** arXiv · 2609.05881 (v3) · code and audit data released
- **Tags:** `quantization` `gguf` `reproducibility` `benchmark` `research`

"**Broken on Arrival: Non-Functional Quantized LLM Artifacts in Public Model Registries and How to Catch Them**"（arXiv **2609.05881**、Aditi Patodiya）は、公式 Ollama ライブラリの **15 モデル系列**にわたる**コード系 GGUF タグ 305 件すべて**と、Hugging Face のコミュニティ人気ファイル **22 件**を対象に、15 個のコードタスクでスクリーニングし、疑わしいものを **HumanEval+ 全 164 タスク**で再評価した。**公式タグ 7 件（2.3%）は最大でも 6 問しか解けなかった** — いずれも**40 億**パラメータ以下のモデルの低ビット量子化だ。論文自身の対照が発見そのものだ。元の重みから再ビルドした 5 件は "matched our uncalibrated rebuilds tensor for tensor, so none was corrupted" であり、続く一文が引用に値する — "**Exact reproducibility did not imply function.**"

機構はビット幅だけでなく較正にある。重み・ツールチェーン・テンソル構成を固定したまま **importance matrix** を加えると、`Qwen2.5-Coder-3B` は 3 つの量子化水準で**ゼロから 164 問中 76〜113 問**へ上がった。同じ未較正レシピでも小さい `Qwen2.5-Coder-1.5B` は動作し続けたので、論文はレシピ単独では失敗を予測できないと述べる。逆側では、スクリーニングを通ったタグのうち標本 66 件について "None of 66 sampled tags that passed the screen was non-functional" — 安価なスクリーニングはこの標本では誤警報を出していない。論文の **v3** は以前の判断をひとつ訂正している。コミュニティの `deepseek-coder-6.7B` ファイル対の失敗はバックエンドではなく**チャットテンプレートの欠如**によるもので、そのためのテストが追加された。

**Why it matters:** レジストリが公開しているのはダウンロード数と「いいね」であって機能テストではない。「ノート PC で動く」という推薦はすべてこの穴を引き継ぐ — ダウンロードした成果物が公開元のビルドとバイト単位で同一でも、スコアはゼロになり得る。運用上の帰結は二つ。**4B 以下の低ビット量子化**では、チェックサムではなくタスクレベルのスモークテストを信頼の前提にすること。そしてタグが失敗したときの対処は、破損を疑うより同一モデルの**較正済み量子化に乗り換える**ことであることが多い。監査データと `quantcheck` ツールが論文とともに公開されており、このスクリーニングは再現可能だ。未確立なのは、15 モデル系列の外やコード以外のタスクで失敗率がどう変わるかで、この研究はそこを測っていない。

[`🔗 arXiv 2609.05881`](https://arxiv.org/abs/2609.05881) · [`🔗 Hugging Face — daily papers`](https://huggingface.co/papers)

---

## 24. pgAdmin の `\copy` ガードは一方の引用方言しか見ておらず、psql はもう一方を解析する — 9.9、しかも 6 月の修正のバイパス

- **Velocity:** ▮▮ rising
- **Source:** NVD / cveawg · CVE published 2026-10-30T20:17Z · assigner PostgreSQL
- **Tags:** `cve` `pgadmin` `postgresql` `command-injection`

**CVE-2026-116241** は pgAdmin 4 の **Import/Export Data** ツールにおけるコマンドインジェクションだ。pgAdmin はユーザーのクエリ出力を `psql \copy (...) TO` で包み、ラッパーから逃げ出せないようクエリの括弧の対応を検査する。この検査は "rejected a backslash inside a single-quoted string but not inside a double-quoted identifier, where it treated the next double quote as closing the identifier"。一方 psql の `\copy` パーサは "applies the connection's escape character to whichever quote opened a token" なので、`standard_conforming_strings` が off のとき、バックスラッシュでエスケープされた二重引用符は識別子を**閉じない**。二つのパーサ、二つの「文字列がどこで終わるか」という信念。そしてそのセッション変数を設定するのは攻撃者だ。

レコードは **PostgreSQL** が割り当て（`PUBLISHED`、**2026-10-30T20:17Z**）、CNA の度量は**二つ** — `CVSS:3.1/…/PR:L/UI:N/S:C/…` = **9.9** と CVSS 4.0 ベクトルで **9.4** — さらに弱点も**二つ**、**CWE-78** と **CWE-115**（入力の解釈誤り**）**。CNA はこれが **CVE-2026-17566** の修正のバイパスであり、その脅威モデルと `S:C` の根拠を引き継ぐと注記している。NVD 側は **`Received`** で `nvd@nist.gov` の度量はない。影響範囲は `{version: "0", lessThan: "9.19"}` と書かれている。

**Why it matters:** 修正はレコードより一週間早く、成果物より一日早い — コミット **`9be31a0`** は **2026-10-23T18:47Z**、pgAdmin **9.19** は **2026-10-29T15:36Z** に PyPI へ上がっている — 一方で追跡 issue **#10663** はいまだ**オープン**で、本文は "Internal tracking: pending fix for 9.19" と "Details will be published with the pgAdmin 4 9.19 release notes"。開示順序はコミット → リリース → レコード → ノートだ。リポジトリのタグフィードは今も `REL-9_18`（2026-09-17）しか示さないので、「直ったか」はタグではなく PyPI で答えるしかない。持ち帰るべき教訓はこのバグの型だ。サニタイザは**消費者側の文法**のモデルが正しいときだけ正しく、呼び出し側が切り替えられるセッション設定（`standard_conforming_strings`）に依存する解析は、反対側からスイッチを切れるサニタイザである。

[`🔗 CVE-2026-116241 (NVD)`](https://nvd.nist.gov/vuln/detail/CVE-2026-116241) · [`🔗 pgAdmin commit 9be31a0`](https://github.com/pgadmin-org/pgadmin4/commit/9be31a019f780647fb689c458408c8803263c812) · [`🔗 pgAdmin issue #10663`](https://github.com/pgadmin-org/pgadmin4/issues/10663)

---

## 25. WordPress のキャッシュプラグインが「公式パッチなし」の 10.0 — 9 月に報告され、NVD に載ったのは 10 月 29 日

- **Velocity:** ▮▮ rising
- **Source:** Patchstack · published 2026-10-13 · NVD record 2026-10-29
- **Tags:** `cve` `wordpress` `rce` `unpatched` `patchstack`

**CVE-2026-61991** は WordPress プラグイン **AjaxLoadMore Cache**（**3.1.1** 以下）の未認証リモートコード実行で、割り当て元 **Patchstack** により **CWE-94**（コードインジェクション）に分類されている。Patchstack のエントリは異例に簡素で、修正状況については異例に直接的な表現をしている。修正バージョンの欄は "**No official patch available**"、エントリは "No VDP"、必要権限は**未認証**、CVSS は **10**。プラグイン自身の配布ページが「まだパッチがない」を確認する場所だ。パッチ不在は失効する主張だからである。

読む価値があるのはタイムラインだ。**Julieta** が **2026-09-12** に報告、Patchstack が **2026-10-13** に公開、NVD に入ったのは **2026-10-29T16:18Z** — 報告からレコードまで **47 日**、うち **16 日**は「攻撃手法が公開済みでコード修正は未提供」だった。NVD 側は **`Deferred`** で、度量はひとつだけ（`CVSS:3.1/AV:N/AC:L/PR:N/UI:N/S:C/C:H/I:H/A:H` = **10.0**、出所 `audit@patchstack.com`、`Secondary`）、`nvd@nist.gov` の度量はない — つまりこの 10.0 は発見者の数字を NVD が再掲したもので、しかもこのレコードは NVD が解析しないと表明している。

**Why it matters:** パッチのない 10.0 に対する誠実な対処は二つしかない — プラグインを外すか、仮想パッチを当てるか。Patchstack の緩和策は後者だ。"Patchstack has issued a mitigation rule to block any attacks until an official patch becomes available." この一文はベンダーの製品であって修正ではなく、彼らの WAF の後ろでしか効かない。採点の細部も効く。`PR:N` のコードインジェクションで **10.0** にするのは `S:C` であり、ここでは妥当だ。プラグイン内のコード実行は WordPress インストール全体とそのデータベースの範囲で走るからである。レコードが答えられないのは、そのプラグインがいま重要度の高い場所に残っているかどうかだ。それはバージョン存在の問いであり、CVE フィードではなく棚卸しの仕事である。

[`🔗 Patchstack — AjaxLoadMore Cache advisory`](https://patchstack.com/database/wordpress/plugin/ajax-load-more-cache/vulnerability/wordpress-ajaxloadmore-cache-plugin-3-1-1-remote-code-execution-rce-vulnerability) · [`🔗 CVE-2026-61991 (NVD)`](https://nvd.nist.gov/vuln/detail/CVE-2026-61991)

---

## 26. Progress の WS_FTP 修正は三か月差で二回 — 10.0 のほうは管理者資格情報を渡してしまう

- **Velocity:** ▮▮ rising
- **Source:** NVD · published 2026-10-29T16:19Z · both `Awaiting Analysis`
- **Tags:** `cve` `ws-ftp` `progress` `credentials` `rce`

Progress **WS_FTP Server** のレコード二件が **2026-10-29** の同じ分に到着した。どちらも Windows、どちらも `security@progress.com` による採点、どちらも NVD では `Awaiting Analysis` のままだ。**CVE-2026-84295** は **CWE-287** の認証不備で、"an unauthenticated remote attacker to access sensitive information, including administrative credentials" — **2024.0.6** と **2025.0.3** より前のバージョンが対象。ベクトルは `CVSS:3.1/AV:N/AC:L/PR:N/UI:N/S:C/C:H/I:H/A:H` = **10.0**。**CVE-2026-90868** は **CWE-78** の OS コマンドインジェクションで `PR:L`、"under certain configurations"、**2024.0.7** と **2025.0.4** より前が対象、**9.9**。CNA コンテナは前者に CWE-287 と並べて **CWE-522**（資格情報の保護不備）も付けている。

**二つの修正水準こそが要点だ。** 認証の欠陥は `2024.0.6` / `2025.0.3` で修正され、コマンドインジェクションは `2024.0.7` / `2025.0.4` で修正される。勧告の最初の修正だけ当てて止めた運用者は、二つ目の欠陥が残るビルドを動かし続ける — そしてファイル転送サーバーは「管理者資格情報」と「任意コマンド実行」が二つの所見ではなく一本のチェーンになる典型だ。両レコードの reference は `progress.lightning.force.com` の Knowledge 記事ひとつだけで、それは SAML ログインへリダイレクトされる。したがって今回ベンダー自身の修正ガイダンスは読めていない。バージョン番号は勧告の主張ではなくレコードの主張として扱い、認証済みセッションでベンダーのページと突き合わせてほしい。

**Why it matters:** `PR:N` の認証バイパスに付く `S:C` は、今月の 10.0 の大半を生んだパターンであり、ここでも正しい — 資格情報ストアは脆弱なコンポーネントの外にあり、影響はセキュリティ境界を越える。実務的な指示はトリアージではなくバージョンの算術だ。`2025.0.3` はあの RCE の**修正版ではない**し、`2024.0.x` と `2025.0.x` が並行する命名は一歩手前で止まりやすくする。どちらも KEV になく、NVD 自前のスコアもないので、ここに悪用の主張はない — 使われる前に当てる項目であり、NVD が解析していないことこそ、レコード自身の CWE を出所付きで引用する価値がある理由だ。

[`🔗 CVE-2026-84295 (NVD)`](https://nvd.nist.gov/vuln/detail/CVE-2026-84295) · [`🔗 CVE-2026-90868 (NVD)`](https://nvd.nist.gov/vuln/detail/CVE-2026-90868)

---

## 27. 同じ道具、二つのインターフェース：MCP と CLI は対応する軌跡の 94.3% で食い違う — 修復層は最大 9 点を稼ぐ

- **Velocity:** ▮▮ rising
- **Source:** arXiv · 2610.34298 · 2026-10-25
- **Tags:** `mcp` `agents` `tool-use` `benchmark` `research`

"**Matched Capabilities, Different Behaviors: A Controlled Study of MCP and CLI Interfaces for Language Agents**"（arXiv **2610.34298**、Zhenning Shi、Liang Pang、Yongqi Li）は **MICA**（Matched Interface Comparison and Analysis）を作る。**共有のセマンティック動作契約**から MCP と CLI を描画し、デコードされた動作を**同じランタイム**に流すことで、能力・環境・実行を固定し、モデルに向き合う表現だけを変える。**6 モデル**と**3 つの対話環境**で、対応するインターフェースは "substantial differences in task performance and interaction cost" を生み、対応付けた自然軌跡では **2,004 エピソードのうち 94.3%** に構造的な分岐が現れ、初期の差がその後の対話へ伝播する。

修復側は **DART** — Decoupled Action Realization and Targeted Repair — で、これは "preserves validated semantic commitments while repairing interface-specific realization"。評価した**全 6 設定**でベンチマークスコアを最大 **9.0 点**改善し、**全 3 環境**で MCP のトークンコストをタスク当たり最大 **27.1k** 削減する。

**Why it matters:** 論文の主張は狭く、狭いからこそ使える。MCP が CLI より良いとも悪いとも言っておらず、インターフェースの選択がすべてのエージェントベンチマークと「ツール利用」比較における**交絡因子**であり、対応状態のプローブが失敗の由来（能力の提示か、実現か、フィードバックか）を局所化できると言っている。運用上の数字はコストのほうだ。同じ意味作業でタスク当たり 27.1k トークンの差は、趣味の問題ではなく予算の行である。摘要が開いたままにしている注意点は二つ。6 モデルと 3 環境は摘要では名指しされておらず、9.0 点は設定をまたぐ上限であって平均ではない。典型値として引用する前に表を読むべきだ。

[`🔗 arXiv 2610.34298`](https://arxiv.org/abs/2610.34298) · [`🔗 Hugging Face — daily papers`](https://huggingface.co/papers)

---

## 28. マルチトークン予測の勾配は半分が自己蒸留、半分がノイズ — ノイズを外すのは一行の変更

- **Velocity:** ▮▮ rising
- **Source:** arXiv · 2610.38331 · preprint
- **Tags:** `training` `mtp` `speculative-decoding` `research`

"**Multi-Token Prediction Done Right**"（arXiv **2610.38331**、Jayden Teoh）は、MTP の交差エントロピー勾配を正確に分解する。各 MTP ヘッドをモデル自身の次トークン分布へ引き寄せる **KL 自己蒸留項**（これが投機的デコードを速くする）と、信号対雑音比の低い**残差**であり、後者は "buries the useful KL signal"、しかも規模とともに強まる。提案される修正は、共有ヘッドについての事実を利用する。二つの分布が同じ線形出力ヘッドを共有するとき、それらの KL ダイバージェンスの勾配は二つの交差エントロピー勾配から straight-through の勾配ルーティングで正確に復元できる。そこで **Soft-MTP** は KL 項だけを逆伝播し、既存の NTP と MTP の交差エントロピー計算を再利用する — 一行のコード変更、追加パラメータなし、語彙サイズの logit 行列不要、測定可能なオーバーヘッドなし、融合交差エントロピーカーネルと互換。

報告結果は **167M から 1.2B パラメータ**にわたる。すべての規模で標準 MTP より NTP パープレキシティが低く、投機的デコードが速く、ゼロショット精度が高い。**689M** 以降は MTP パープレキシティも低い。1.2B では微調整後に数学とコードの推論が強い。多くの指標で KL 直接最小化と同等以上。DeepSeek 型と Meta 型の両方の MTP 構成をサポートする。

**Why it matters:** MTP が標準の事前学習材料になったのは安いからであり、この論文の主張は「安い版が学ぶものの一部はノイズだ」という点にある — モデルを変えずに学習レシピを変える種類の発見だ。ただし強い仮説として扱うべきで、確定した結果ではない。単著のプレプリントで、検証された最大規模は 1.2B — 論文自身が残差の悪化を言う規模よりずっと小さい — そして「測定可能なオーバーヘッドなし」は融合カーネルに関する実装上の主張で、別のスタックで測り直す必要がある。次にやるべき試験は論文がやっていないものだ。標準 MTP が実際に配備される規模で、この優位が残るかどうか。

[`🔗 arXiv 2610.38331`](https://arxiv.org/abs/2610.38331) · [`🔗 Hugging Face — daily papers`](https://huggingface.co/papers)

---

## 29. Baidu の Unlimited-OCR-2 はウィンドウではなく作業集合を有界にする — そして SOTA 表は画像である

- **Velocity:** ▮▮ rising
- **Source:** Hugging Face · baidu/Unlimited-OCR-2 · released 2026-10-27
- **Tags:** `ocr` `vision-language` `long-context` `mit` `baidu`

**`baidu/Unlimited-OCR-2`** は **MIT** ライセンスの画像テキスト→テキストモデルで **2026-10-27** に公開され、Hub で **24,276 ダウンロード**、**457 いいね**。新データセット **MarathonDocBench**（超長期文書解析向け）と同時に登場した。機構は **SR-SWA**（疎な参照スライディングウィンドウ注意）で、モデルは "compresses text-visual attention interactions from ultra-long sequences down to a fixed-size set of working references (e.g., 512 tokens)"。これにより計算量が有界になり、"per-step decoding latency and memory footprint nearly constant regardless of document length" になる。複数ページ解析は単一リクエストで、プロンプトは `"<PAGE><image>" * num_pages + "Multi page parsing."`。ページ間文脈が使え、各ページは順に `<PAGE>` マーカーを 1 つ出力する。

**Why it matters:** "unlimited" は**作業集合**についての主張であって、無界のコンテキストウィンドウについての主張ではない。カードは機構の水準では誠実だが、数値の水準では不透明だ。SOTA の文は "Achieves state-of-the-art performance across both dozens-of-pages benchmarks (e.g. MPDocBench) and extreme hundred-page benchmarks (e.g. MarathonDocBench)" と書き、実際のリーダーボードは **PNG**（`assets/leaderboard.png`）なので、そこにある数字は OCR しない限り引用も検証もできない。今回のリリースで最も有用なのは配備の付録だ。カスタム SGLang wheel、前ウィンドウの KV 末尾を再利用するページウィンドウスケジューラ、32 同時リクエスト超で 0.75 が OOM になるため `--mem-fraction-static 0.7`、そしてページウィンドウを小さくするとピークメモリは下がるがウィンドウ境界でページ間マージを失うという明示的なトレードオフ。これが「unlimited」の実際のコスト — 調整可能なウィンドウとメモリ予算 — であり、多くの長文脈リリースより明確に書かれている。

[`🔗 baidu/Unlimited-OCR-2`](https://huggingface.co/baidu/Unlimited-OCR-2) · [`🔗 baidu/Unlimited-OCR`](https://github.com/baidu/Unlimited-OCR) · [`🔗 Hugging Face — trending`](https://huggingface.co/models)

---

## 30. Firezone は boringtun への 2 年にわたるパッチを sans-IO WireGuard で置き換えた — 45× は比であって測定ではない

- **Velocity:** ▮▮ rising
- **Source:** Firezone blog · 2026-10-31 · firezone/sanstun
- **Tags:** `wireguard` `rust` `networking` `sans-io` `apache`

**`firezone/sanstun`**（Apache-2.0、**2026-10-02** 作成、37 スター）は WireGuard 状態機械の sans-IO Rust 実装で、本日 Thomas Eizinger が発表した。前提は IO、**時間、乱数**をすべてライブラリの外に出すことだ。データグラムを解析する唯一の公開入口は `Interface::receive` で、これがレート制限を適用し、cookie 応答を生成し、型付きメッセージを返す。`HandshakeInitiation` などのコンストラクタは **crate プライベート**なので、呼び出し側はレート制限器を通らずに `Tunnel::handle_handshake_initiation` へ到達できない。これは型システムで強制されたプロトコル不変条件であり、記事の主張は「レート制限を忘れることこそ通常運用では決して露見しないバグだ」という点にある。

性能設計は残る半分だ。`Tunnel::begin_encapsulate` は**暗号化しない**。セッションを確認し、パケットカウンタを予約し、タイマーを進め、`Send` を実装する `PendingEncapsulate` を返す。これにより ChaCha20-Poly1305 の処理をワーカースレッドへ移し、カウンタの記帳はオーナースレッドに残せる。公開された `cargo bench data_path` の数字がその分割を見せる。`begin_encapsulate` は 64 B と 1280 B でともに **20.8 ns**、`encrypt` は 64 B で **226 ns**、1280 B で **933 ns**、`begin_decapsulate` は **37.6 ns**、`commit_decapsulate` は **17.5 ns**。

**Why it matters:** 記事が見出しに出す数字には自前の免責が付いている。"If we move the actual encryption to another thread, this hints at a potential speedup of more than 45x!" の直後に "An effective speedup of 45x is hard to achieve in practice because it ignores the cost of passing `PendingEncapsulate` to another thread and assumes no other overhead is introduced." と続く。つまり 45× は 1280 B における記帳と暗号処理の比であってスループットの結果ではなく、誠実な読み方は「MTU サイズのパケットでは記帳は仕事の **2%** にすぎない」だ。もう一つ記す価値があるのはプロジェクト自身の来歴で、Firezone は依存更新を除いても "more than 70 PRs" に及ぶパッチを 2 年続けた末に、上流との API 互換性こそが制約だと結論した。これはプロトコルライブラリの書き直しを正当化するのに、どんなマイクロベンチマークより有用な論拠である。

[`🔗 Firezone — introducing sanstun`](https://www.firezone.dev/blog/introducing-sanstun) · [`🔗 firezone/sanstun`](https://github.com/firezone/sanstun)

---

## 31. Anthropic の `skills` リポジトリは 185k スターでトップレベルにライセンスがない — ライセンスはフォルダ単位で、うち 4 つはオープンソースではない

- **Velocity:** ▮▮ rising
- **Source:** GitHub Trending (weekly) · +1,888 this week · 185,417 total
- **Tags:** `agent-skills` `anthropic` `licensing` `mit`

**`anthropics/skills`** — "Public repository for Agent Skills" — が今週もトレンド入りしている。**+1,888 スター**（今日 **295**、合計 **185,417**、**21,904** fork、オープン issue **1,450**）、最終 push は **2026-10-28**。ツリーは小さく、しかし要となる。`skills/` にスキルのフォルダが **19** 個 — ディレクトリ一覧から数えたもので、総数を述べるページはない — 加えて `spec/`、`template/`、`.claude-plugin/` があり、**ルートに `LICENSE` はない**（そのパスは 404）。トップレベルでライセンスに近い唯一のファイルは `THIRD_PARTY_NOTICES.md` だ。

ライセンスは README の中にあり、しかも**ひとつのリポジトリに二種類**ある。"Many skills in this repo are open source (Apache 2.0)." だが "We've also included the document creation & editing skills that power Claude's document capabilities … in the `skills/docx`, `skills/pdf`, `skills/pptx`, and `skills/xlsx` subfolders" があり、これらの "These are **source-available, not open source**" として "a reference for more complex skills that are actively used in a production AI application" のために共有されている。README にはさらに、スキルは "provided for demonstration and educational purposes only" であり "the implementations and behaviors you receive from Claude may differ from what is shown" という免責も付く。

**Why it matters:** これはエージェントスキル生態系の大きな部分が写しているリポジトリで、写されているもののライセンスは一様ではない。19 のフォルダのうち 4 つは読めるが再利用できない参照物であり、リポジトリ単位の public バッジでは区別できない。スキルを製品に vendor するなら、リポジトリ単位ではなくフォルダ単位で棚卸しし、README の「一致しないかもしれない」という一文を、出荷される挙動はこのコードではないというベンダーの表明として扱うべきだ。生の数字は単位の取り方も思い出させる。**1,450** はこのリポジトリの issue **と** pull request の合計であり、オープン issue が 1,450 件という意味ではない。

[`🔗 anthropics/skills`](https://github.com/anthropics/skills) · [`🔗 GitHub Trending (weekly)`](https://github.com/trending?since=weekly)

---

## 32. コンテキストはキャッシュされても無料ではない — prefill のエネルギーは入力長に対して二次で伸びる

- **Velocity:** ▮ steady
- **Source:** arXiv · 2610.39621 · 2026-10-30
- **Tags:** `energy` `prefill` `agents` `long-context` `research`

"**The Real Cost of Context: Predicting Compute Time and Energy Consumption in LLM Prefill and Decode Phases**"（arXiv **2610.39621**、Lars Krupp、Daniel Geißler、Francisco M. Calatrava-Nicolas、Stefan Gerd Fritsch、Paul Lukowicz、Jakob Karolus）は測定の問題から始まる。エージェント構成は "substantially increased token consumption" を招いたが、既存の見積もりは生成された**出力**トークンだけを数え、エージェントが抱える大きな入力コンテキストを無視している。著者らは prefill と decode の長さを広く変えて計算時間と消費エネルギーを計測し、その結果に一般化線形モデルを当てた。

結論はスケーリングだ。**decode** の計算時間とエネルギーは出力長に**線形**、**prefill** は入力長に対して**線形と二次の両方**で伸びる。したがって入力コンテキストは "becomes a relevant factor for large-context workloads"。さらに、直接のエネルギー計測ができない場合に計算時間がエネルギーの信頼できる代理になることを示す。これがクローズドな API モデルにこの枠組みを使える理由だ。

**Why it matters:** 設計判断を変えるのは二次の項だ。エージェントの伸び続ける履歴のコストは規模に比例せず、コンテキストを倍にすると二倍より高くつき得る。しかもその罰則は誰もが「読むだけ」と見なす段階に落ちる。取得を減らすのではなくコンテキストを増やして遅延を買う設計すべてに対して、これは検索と圧縮を選ぶ直接の根拠になる。二つの限界は明記すべきだ。当てはめはモデルごと・ハードウェアごとで、係数は配備間で移らない。「計算時間をエネルギー代理とする」も著者自身の計測で較正されたものでベンダーの計量ではないため、ホストされたモデルのエネルギーを見積もる話であり、実際に支払うトークン課金の話ではない。

[`🔗 arXiv 2610.39621`](https://arxiv.org/abs/2610.39621) · [`🔗 arXiv cs.AI recent`](https://arxiv.org/list/cs.AI/recent)

---

## 33. 自律実験室が自分の好ましい結果を棄却した — エージェントは参照測定のドリフトを見つけ、手順を書き換えた

- **Velocity:** ▮ steady
- **Source:** arXiv · 2610.40589 · 2026-10-30
- **Tags:** `ai-for-science` `agents` `self-checking` `research`

"**Collaborative AI agents for autonomous experimental research with solid-state quantum spins**"（arXiv **2610.40589**、El Mustapha Mansouri、Eikichi Kimura、Masato Koga、Keigo Arai）は、LLM ベースのエージェント同士が "assess one another's work and can stop or redirect investigations" する実験室を作る。研究設問を生成し棄却し、独立した理論検証を要求し、自らの主張に挑む実験を設計する。舞台はダイヤモンド中の量子スピン集団で、エージェントはマイクロ波パルス列の族に対する応答を予測するのに必要な**最小の較正設定数**を導き、計算で確認し、競合する予測を判別する実験を設計した。

そこからが面白い。初回の実験は理論予測と**一致**したが、参照測定の反復で収集中に**信号がドリフト**していたことが分かる。エージェントは "therefore treated the result as inconclusive and revised the measurement protocol without relaxing the acceptance criteria" — 改訂した実験はその基準を満たし、予測を支持した。

**Why it matters:** 追認的な実行は作りやすく、疑いにくい。ここで示されている能力は導出ではなく**拒否**だ。自分の対照がドリフトしたという理由で好都合な測定を捨てるエージェント系は、実験ノートとプレスリリースの差そのものになる。論文の枠付けが引用可能にしている点も大きい。冒頭で近年の AI システムは "may draw conclusions that the evidence does not support" と述べており、本研究はその失敗を避けるために組まれている。ひとつの系、ひとつの物理設定、一度の受入基準の引き上げとして読むべきで、検証されていないのは「エージェント自身の理論的主張こそが誤っているとき、同じ不一致の仕組みが機能するか」である。

[`🔗 arXiv 2610.40589`](https://arxiv.org/abs/2610.40589) · [`🔗 arXiv cs.AI recent`](https://arxiv.org/list/cs.AI/recent)

---

## 34. Spark-X2.6-4B は X2.5 のアーキテクチャを保ち、改善はすべて後学習から — 比較は SVG で出荷される

- **Velocity:** ▮ steady
- **Source:** Hugging Face · XHToken/Spark-X2.6-4B · updated 2026-10-31
- **Tags:** `open-weights` `on-device` `agents` `apache`

**`XHToken/Spark-X2.6-4B`** は **4B**、**Apache-2.0**、英語と中国語の汎用モデルで、オンデバイスエージェントを狙う。Hub で **923 いいね**、**12,515 ダウンロード**、カードは本日改訂された。リリースノートはアーキテクチャが変わっていないことを明言する。"Spark-X2.6-4B retains exactly the same architecture as Spark-X2.5-4B, achieving its capability gains through improved post-training." 機能面の追加は**制御可能な思考予算**で、none、low、high の三水準。アプリケーションはリクエストごとに推論と遅延・コストを天秤にかけられる。

主張は大きく、本文に根拠がない。カードは "state-of-the-art performance among similarly sized open-source models, matching or even surpassing models with approximately 9B parameters" と述べ、ベンチマーク節は単一の **SVG**（`images/all_benchmark.svg`）として描画され、隣に表はない。インフラ側の記述はオンデバイスモデルとしては異例に詳しい。`llama.cpp` はビルド **b10828** 以降で `spark2_5` をネイティブサポート、Ollama **0.34.1+**、プロジェクト自身の `Spark-MLX-LLM` 経由の MLX、LM Studio、そして公式 INT4 重みを使ったコミュニティの WebGPU/ONNX デモ。

**Why it matters:** 固定アーキテクチャ上で後学習だけで得た改善は最も安く、最も監査しにくい種類のモデル改良だ。検査すべき新しい機構がなく、あるのは表ひとつ — そしてここではその表が絵である。両方のモデルを同じハーネスで走らせた再現が出るまで、「9B に匹敵」は位置づけの主張として扱うべきだ。一方、三水準の思考予算は実際に出荷できる機能として扱ってよい。固定のトークン予算下でオンデバイスエージェントが何をできるかを変えるのはそこだからだ。正直な信号は配布先の一覧で、llama.cpp、Ollama、MLX、LM Studio が同時対応ということは重みが今日動くということであり、それはベンチマーク画像より多くを語る。

[`🔗 XHToken/Spark-X2.6-4B`](https://huggingface.co/XHToken/Spark-X2.6-4B) · [`🔗 Hugging Face — trending`](https://huggingface.co/models)

---

## 35. 事前学習も SFT も RL もひとつの訓練アルゴリズムで — 段階型訓練は特殊ケースになる

- **Velocity:** ▮ steady
- **Source:** arXiv · 2610.40564 · 67 pages
- **Tags:** `training` `rl` `pretraining` `research`

"**Training Foundation Models with a Single Algorithm**"（arXiv **2610.40564**、Yuda Song、Alvin Zhang、Fahim Tajwar、Daman Arora、Jeff Schneider、Daniel Khashabi、Ruslan Salakhutdinov、J. Andrew Bagnell、Aarti Singh、Andrea Zanette）は、事前学習・midtraining・教師あり微調整・RL の間のアルゴリズム的な分離は "is not fundamental" と主張する。構成は RL の目的関数を**モデルが生成した目標分布への最尤フィッティング**として導出し、四つの段階すべてをひとつの尤度ベース訓練器に収める。従来の段階型訓練は "a special case" になり、ライフサイクルは*どのデータを、どの割合で、いつ訓練するか*の選択に還元される。彼らはこれを、静的データと RL 生成を単一の訓練器で混ぜるシステムとして実装する。

摘要の結果は方向性であって数値ではない。"controlled and real-world experiments" を通じて、統一訓練は "improves the accuracy-compute tradeoff and task coverage while preserving broader capabilities, and provides a stronger starting point for continual learning" とする。論文は **67 ページ**、**31 図**、**22 表**で、アブレーションは存在する — ただ、誰もが引用する段落にはない。

**Why it matters:** この枠組みが成立すれば、パイプラインは四人の担当者が持つ四つの仕事ではなく、データ混合スケジュールを持つひとつの訓練ループになる。それはベンチマークの勝利よりはるかに大きな組織論的主張であり、論文自身も「統一された基盤モデル訓練の科学」の土台として提示していて、出来合いのレシピとは言っていない。主張より先に表を読むべきだ。"preserving broader capabilities" は段階型 RL が通常代償を払う軸そのもので、目的タスクを改善しつつ汎用能力を静かに削る単一アルゴリズム訓練器は、摘要では同じに見える。著者の所属もいつもの理由で注目に値する。これほど構造的な結果は採用ではなく独立再現を必要とする。

[`🔗 arXiv 2610.40564`](https://arxiv.org/abs/2610.40564) · [`🔗 Hugging Face — daily papers`](https://huggingface.co/papers)

---

## 36. Scribd は 10 月 1 日に世界へ、10 月 26 日から顧客ひとりずつへ — 通知は支払い項目を名指ししている

- **Velocity:** ▮ steady
- **Source:** Hacker News · 60+ pts · ~1h ago (~2026-10-31T02:46Z)
- **Tags:** `incident` `breach` `notification` `scribd`

**2026-10-31 02:46 UTC** の **Tell HN** が、Scribd の顧客が **2026-10-26 月曜**に受け取った通知書を掲載している。差出人は通知代行会社 **Epiq** で、"on behalf of Scribd, Inc., the parent company of **Scribd, Slideshare, Everand, and Fable**" とある。範囲は具体的だ。第三者が "may have accessed your email address and the following of your information: last 4 digits of your credit card and country, credit card issuer, credit card expiry date, payment history (not including credit card details)"。文書は "no evidence that this data has been misused" と述べ、コールセンターの番号を案内する。

Scribd 自身のヘルプセンター記事の日付は **2026 年 10 月 1 日**で、同じことを別の解像度で述べている。未承認の第三者が "was able to gain access to our systems"、そして "used their access to reach other internal systems"。さらに "For most accounts, this involved basic account information. For a smaller number of accounts, more sensitive information was involved." 通知は段階的に送付中で、"If you haven't gotten one, it doesn't necessarily mean you weren't affected" とし、四ブランドすべてでのパスワード再設定を勧めている。

**Why it matters:** 開示の日付こそが主題だ。**10 月 1 日**の公開ヘルプページ、**10 月 26 日**に始まった個人宛通知、そして **10 月 31 日**にフロントページへ上がった議論 — そこではコメント投稿者が 10 月 30 日の "a few hours ago" に同じ手紙を受け取ったと書いている。段階的通知は、メールが来ていないことが安全の証拠にならないことを意味する。そして手紙の項目一覧こそが行動すべき部分だ。カードの有効期限、発行会社、下 4 桁にメールアドレスが揃えば、請求やアカウント回復を装う説得力を十分に持つ。だからこそ次の節がフィッシングの話になる。ここに CVE はなく当てるパッチもない。制御点はアカウント側にしかなく、タイムラインはそれが一か月前に済んでいるべきだったと言っている。

[`🔗 Hacker News — Tell HN: Scribd Breached`](https://news.ycombinator.com/item?id=50312756) · [`🔗 Scribd — information about the recent security incident`](https://support.scribd.com/hc/en-us/articles/53787421531284)

---

## 37. 公開共有された ChatGPT の会話ひとつでセッション内でコードが動く — MathLive のリスナー、サンドボックスなしの `srcdoc`、そして CSP 回避に YouTube

- **Velocity:** ▮▮▮ trending
- **Source:** Parameter Labs · published 2026-10-28 · HN 11+ pts (~2026-10-31T10:30Z)
- **Tags:** `security` `chatgpt` `xss` `csp` `disclosure`

**Parameter の Mukul Goyal** は `chatgpt.com` に対する完全な攻撃チェーンを公開した。被害者が攻撃者の**公開共有会話**を開くだけで、ログイン済みの ChatGPT オリジン内でコードが実行され、研究者は会話を列挙し、一度も共有されていない非公開チャットを読むことができた。配信にはアプリのインストールもプロジェクト参加もコードの貼り付けも不要で、自動化版について研究者は "Opening the shared link was the only required action" と書いている。最も安定した再現では、被害者は ChatGPT 標準の Preview ボタンを一度押す必要があった。

連鎖は 5 段階で、どれも単体では筋が通っている。インタラクティブなグラフを含む共有会話は **MathLive** を読み込み、そのコントローラは origin policy が `none` のメッセージリスナーを設置する。2 つ目のブロック **HTML Preview** が `mathlive#virtual-keyboard-message` を送り、生の HTML をキーボードレイアウトのデータとして渡す。MathLive は "accepted a state-changing message without proving which frame sent it." その HTML は `innerHTML` に到達し — 研究者は `createHTML` が "acted as an identity or Trusted Types wrapper, not a sanitizer" だったと明記している — `chatgpt.com` を継承する**サンドボックスなしの `srcdoc` iframe** を作った。CSP はインラインスクリプトを止めたが YouTube は許可していたため、細工した **YouTube oEmbed JSONP** の応答が JavaScript を供給し、`#client-bootstrap` からセッショントークンとアカウント ID を読み、認証済みの `/backend-api/conversations` を呼び、画像リクエストでデータを持ち出した。

**Why it matters:** ここでの失敗はすべて組み合わせで生じており、報告書で最も有用な一文はむしろ構成要素を免責するものだ。"The Preview sandbox itself worked." Preview 内のコードは親ページを読めなかった。壊れていたのは、主ページの*別の*構成要素がその指示を受け入れたことだ。これはエージェント時代の Web アプリに繰り返し現れる形で、埋め込みビューアはすべて特権フレームへの新しいメッセージ経路になる。修復もそれを反映している。OpenAI は **P1** と評価し、**2026-10-26** に両方の Web フロントエンドを修正し、**$5,000** を支払った。CVE はなく、スキャナが照合できるものは何も残らない。持ち帰るべき注意は 2 つ。YouTube 経由は "the final workaround for CSP, not the root cause" であり、そのエンドポイントだけを塞いでも HTML 注入経路は閉じない。持ち出しの証明は応答のごく一部だけを外部送信したが、注入されたコードは全体を読めた。

[`🔗 Parameter Labs — we took over ChatGPT accounts`](https://www.parameter.ai/labs/we-found-a-gap-at-openai) · [`🔗 Hacker News discussion`](https://news.ycombinator.com/item?id=50314699)

---

## 38. SOCFortress CoPilot の 10.0 は「権限不要」と言う — しかし当のルートは admin か analyst のトークンを要求する

- **Velocity:** ▮▮▮ trending
- **Source:** GitHub Advisory · CVE published 2026-10-30T14:36Z · advisory dated 2026-06-24
- **Tags:** `cve` `path-traversal` `cvss` `github-advisory`

**CVE-2026-61738** は socfortress **CoPilot** のパストラバーサルだ。`POST /api/scoutsuite/generate-gcp-report` はアップロード内容を `GCPScoutSuiteJSON` として検証するが、`file.filename` をそのまま `os.path.join` に渡すため、トラバーサルを含むファイル名で JSON がレポートディレクトリの外へ書かれる。バックエンドが root で動くため、研究者は `/tmp` とアプリケーションのソースディレクトリへの root 所有の書き込みを実演した。**0.1.77** で修正。CWE-22、CWE-73、CWE-434。アドバイザリの一行要約は、内容は検証されるがファイル名は検証されない、というものだ。

**スコアと文章は 3 か所で食い違う。** GitHub が付けたベクトルは `CVSS:3.1/AV:N/AC:L/PR:N/UI:N/S:C/C:H/I:H/A:H` = **10.0** で権限不要だが、アドバイザリはこのルートが `admin` または `analyst` スコープの bearer トークンを要求し、"Reachable by a non-administrative role" だと述べている。影響版と修正版の欄はいずれも `latest` で、バージョン境界はまったく示されていない。さらに CVE レコード自身の説明は見出しから後退している。実演されたプリミティブは "does not establish unrestricted executable contents or unconditional cross-tenant confidentiality loss" であり、RCE は root 書き込みからの推測的な昇格だとしている。NVD はレコードを **`Deferred`** に置き、独自の指標を**ゼロ**しか持たない。

**Why it matters:** 10.0 はベクトルを伴わずに引用されやすい数字であり、ここではそのベクトルが認証ありのルートに `PR:N` を仮定している。`S:C` と `C/I/A:H` が残りの計算を済ませる。だから正直な言い方は、スコア上は 10.0、低権限トークンが必要なルート、実演は root ファイル書き込み、となる。コード実行の主張が*確立していない*とレコードが明言している点こそ、10.0 より真似する価値がある。セキュリティ製品が自社アドバイザリで PoC の限界を採点するのは 10.0 より珍しく、実務上の深刻度はバックエンドを root で動かし analyst 資格情報が見える配置かどうかにかかっている — SOC ツールではそれが通常だ。

[`🔗 GHSA-q3g8-3cf7-744f — CoPilot advisory`](https://github.com/socfortress/CoPilot/security/advisories/GHSA-q3g8-3cf7-744f) · [`🔗 CVE-2026-61738 (NVD)`](https://nvd.nist.gov/vuln/detail/CVE-2026-61738)

---

## 39. 6 月のアドバイザリ 2 件が同じ 10 月の午後に CVE レコードを得た — 予約から 111 日、修正から 4 か月

- **Velocity:** ▮▮▮ trending
- **Source:** cveawg / GitHub Advisory · both `PUBLISHED` 2026-10-30, assigner `GitHub_M`
- **Tags:** `cve` `github-advisory` `disclosure-lag` `ssrf` `ai-agent`

GitHub が発行した 2 件のレコードが **2026-10-30** に着地した。いずれも 6 月から公開されていたアドバイザリに対応する。**CVE-2026-61826**（Bazarr）— `bazarr/api/plex/oauth.py` の Plex OAuth 名前空間は "ships with no authentication" で、`Resource` ハンドラが `@authenticate` を欠き、"There is no global auth `before_request` hook" であるため、匿名の呼び出し元が `POST /api/plex/apikey` で攻撃者の選んだキーを永続化し、`POST /api/plex/oauth/logout` で連携を無効化し、PIN フロー経由で攻撃者の Plex アカウントを紐付けられる。state 検証は実効性がなく、攻撃者の `server_url` が保存されると以後のリクエストは設定済み API キーを `X-Plex-Token` に載せる — **SSRF と資格情報漏えい**で、`S:C`/`PR:N` により **10.0**。**CVE-2026-63377**（TAKO AI Agent for Okta）は初回起動の競合で、`POST /api/auth/setup` は "creates the first administrator account without requiring any prior authentication"。守りは `is_setup` フラグだけで、"No bootstrap secret, no IP restriction"、`docker-compose.yml` は "Publishes `8001:8001` on all interfaces by default"、Dockerfile は uvicorn を `0.0.0.0` で起動する — **9.8**。

**時計こそが主題だ。** Bazarr のアドバイザリは **2026-06-24**、ID 予約は **2026-07-10**、レコード公開は **2026-10-30T17:12Z**。TAKO は **2026-06-30**、予約 **2026-07-16**、公開 **2026-10-30T22:18Z** — 予約から公開まで 111 日と 106 日、アドバイザリ公開からは 128 日と 122 日。修正はいずれもはるかに早く出ている。Bazarr **1.5.7-beta.14**、TAKO **3.0.1-beta**。NVD は Bazarr を `Deferred`、TAKO を `Received` に置き、どちらも `nvd@nist.gov` の指標を持たない。

**Why it matters:** ここで未知だったものは何もない。アドバイザリもパッチも PoC も 6 月から公開されている。それでも CVE ID で照合するスキャナは今週まで見えず、`published` で並べるフィードは両方を「新着」と呼ぶ。形も遅延と分けて読むべきだ。Bazarr は 1 つの名前空間にデコレータが 1 つ足りない話で、フレームワークの既定（全ハンドラを認証する）だけがバグを止めていた。TAKO はセットアップ画面を持つ自前ホスト型エージェントが必ず引き継ぐ「先着が管理者になる」競合で、全インターフェースに束縛する compose ファイルがそれを増幅する。どちらかを運用しているなら、レコードの日付ではなく成果物のバージョンを見ること。Bazarr の修正は beta タグで、PIN state 検証はレコード自身が記す未解決の残件だ。

[`🔗 GHSA-fvcv-hh55-x3r4 — Bazarr advisory`](https://github.com/morpheus65535/bazarr/security/advisories/GHSA-fvcv-hh55-x3r4) · [`🔗 GHSA-536w-42p8-3qv9 — TAKO advisory`](https://github.com/fctr-id/okta-ai-agent/security/advisories/GHSA-536w-42p8-3qv9) · [`🔗 CVE-2026-61826 (NVD)`](https://nvd.nist.gov/vuln/detail/CVE-2026-61826) · [`🔗 CVE-2026-63377 (NVD)`](https://nvd.nist.gov/vuln/detail/CVE-2026-63377)

---

## 40. HoneySQL の 9.8 は既に存在していた検査だった — 修正はそれを飛ばしていた formatter に通すこと

- **Velocity:** ▮▮ rising
- **Source:** GitHub Advisory · CVE published 2026-10-30T23:17Z · maintainer-authored
- **Tags:** `cve` `sql-injection` `clojure` `library` `api-design`

**CVE-2026-61620** は **HoneySQL** の SQL インジェクションだ。データ構造を SQL に変換する Clojure ライブラリで、引き金は狭く明示的である。信頼できない入力を `keyword` や `symbol` で DSL に渡す — つまり文字列を*エンティティ名*に変える呼び出し — アプリケーションは、JDBC ドライバがそのまま実行すると注入になる SQL を生成し得る。一部の formatter が、ライブラリに**既にあった**不審文字検査をこれらのエンティティ名に適用していなかった。影響範囲は `>= 2.0.0, < 2.7.1392`、**2.7.1392** の修正は同じ検査をより多くの formatter に適用すること。アドバイザリはメンテナの `seancorfield` 自身が書き、報告者 `koyokr` をクレジットし、ベクトルは `CVSS:3.1/AV:N/AC:L/PR:N/UI:N/S:U/C:H/I:H/A:H` = **9.8**（CWE-89）。NVD は `Received` のままで独自指標を持たない。

**Why it matters:** 興味深いのはスコアではなく回避策のほうだ。呼び出し元は "validate input prior to calling `keyword` / `symbol` when constructing DSL structures" と言われ、メンテナ自身の括弧が続く — "but this is tedious and error prone, if an input is missed"。これは、ここにユーザーデータを渡すなと利用者に告げる API 契約すべての正直な描写である。境界での強制手段がない規則で、失敗は忘れた呼び出し元に落ちる。9.8 は名付ける価値のある仮定も符号化している。`PR:N`/`AC:L` はクエリパラメータを識別子に反映する普通の Web アプリを想定しており、それはまさにライブラリが検出できないケースだ。修正の詳細は「対応済み」という主張への警告でもある。検査はこの CVE より前から存在したので、「エンティティ名はサニタイズ済み」という主張はある経路では真、別の経路では偽であり、formatter ごとの監査でしか差は見つからない。

[`🔗 GHSA-fcfq-xqgp-8v97 — HoneySQL advisory`](https://github.com/seancorfield/honeysql/security/advisories/GHSA-fcfq-xqgp-8v97) · [`🔗 CVE-2026-61620 (NVD)`](https://nvd.nist.gov/vuln/detail/CVE-2026-61620)

---

## 41. OpenMAIC は文書をエージェントの教室に変える — 42k スター、MIT、そして「ポートに届く者はライブラリ全体を所有する」という警告

- **Velocity:** ▮▮ rising
- **Source:** GitHub Trending · 115 stars today · 41,998 total
- **Tags:** `agents` `education` `mit` `typescript` `multi-agent`

**`THU-MAIC/OpenMAIC`**（"Open Multi-Agent Interactive Classroom"）は、プロンプトやトピック、アップロードした文書からインタラクティブな授業を作る。AI 教師と AI クラスメートが話し、ホワイトボードに描き、クイズやシミュレーションを走らせ、学習者とリアルタイムに議論する。スタックは **Next.js 16 / React 19 / TypeScript** の pnpm ワークスペースで、コース DSL、レンダラ、エディタ、PPTX インポータ、生成、ストレージのパッケージに分かれる。生成は 2 段階（アウトライン、次にシーン内容）で、サーバー側のディレクタループが `call_agent` を通じて各ターンをエージェントに渡し、**21 種類のアクション** — 発話、ホワイトボード描画、スポットライト、レーザー — を扱う。**41,998 スター、6,503 フォーク、810 コミット**、ルートは **MIT**（同梱の `mathml2omml` は LGPL-3.0-or-later、`pptxgenjs` は MIT で別扱い）。

**Why it matters:** デモよりリリースノートのほうが有用だ。**v1.3.0（2026-10-29）** はナレッジベースと Pro ワークベンチを追加し、アップグレード指示は "stop all old instances first"、そして "no rollback below 1.3.0" — バージョン慣行ではなくスキーマの決定だ。**1.2.0** 以降は server-first で serverless ではなくなり、長時間動く Node プロセスと **PostgreSQL** を必要とし、"Vercel and other serverless hosts are not supported" と明記する。セキュリティの記述は二度読むべきだ。Docker Compose 構成は既定でループバックを listen する個人向け単一ユーザー導入で、外部に出すと "anyone who can reach the port owns, edits and can delete the whole library"。`ACCESS_CODE` 未設定は "there is no second enforcement point" を意味する。42k スターの MIT プロジェクトが自らの配置がマルチテナントでないと告げるのは読者への親切であり、単一ユーザーツールとして扱い、認証は自分で前に置くべきだ。

[`🔗 THU-MAIC/OpenMAIC`](https://github.com/THU-MAIC/OpenMAIC) · [`🔗 GitHub Trending`](https://github.com/trending)

---

## 42. cfsolve はブラウザなしで Cloudflare Turnstile を解く — そして自ら記した制限が、実際に効く防御である

- **Velocity:** ▮▮ rising
- **Source:** Hacker News · 236+ pts · ~2 days ago (~2026-10-28T17:29Z)
- **Tags:** `security` `rust` `captcha` `scraping` `mit`

**`chris124567/cfsolve`** は **Cloudflare Turnstile** のウィジェットとチャレンジページを素の HTTP で解く Rust ライブラリ兼 CLI だ。ヘッドレスブラウザを使わないことが要点で、記録済みの**ブラウザプロファイル**（同梱は iPhone の Safari）を再生して Cloudflare のブラウザ検査を通し、ウィジェットには Turnstile トークン、チャレンジページには `cf_clearance` Cookie を返す。ライブラリは `Browser`、`solve_turnstile`、`clear`、`solve` を公開し、読み込んだ `Browser` は並行処理で共有できるが接続と Cookie は操作ごとに分かれる。**335 スター、36 フォーク、6 コミット**、**MIT**（ただし `vendor/` のパッチ済み依存は各ライセンス）。

**Why it matters:** 面白いのは運用上の脚注で、これがこの種のソルバに対して唯一耐えるアンチボット制御だからだ。"Send the `cf_clearance` cookie from the same IP address and user agent as the profile, or Cloudflare will reject it." clearance をネットワーク識別子と指紋に結び付けることが、プロファイル再生を高コストにする — 1 プロファイルにつき 1 アドレス — そしてこれはライブラリが回避しているどの視覚チャレンジより強い防御だ。2 点目は保守性で、プロファイルこそが希少資源（README は作成に手作業か AI 支援が要ると書く）であり、Cloudflare が新しいチャレンジビルドを出すと失敗は `Error::Unsupported` として現れる。つまり Turnstile が破られたという話ではなく、プロファイル単位・IP 単位で次のビルドまで回避できるという話であり、スクレイパと WAF の 10 年来の経済学と同じだ。

[`🔗 chris124567/cfsolve`](https://github.com/chris124567/cfsolve) · [`🔗 Hacker News discussion`](https://news.ycombinator.com/item?id=50277379)

---

## 43. OpenFrontiers はエージェントを「再発見」で採点する — 200 問、うち 90 問は未解決、閉本では 40 問中最大 7 問

- **Velocity:** ▮▮ rising
- **Source:** arXiv · 2610.37739 · submitted 2026-10-27
- **Tags:** `benchmark` `math` `agents` `lean` `research`

"**OpenFrontiers: A Collection of Open Research Problems and a Benchmark for Scientific Rediscovery**"（arXiv **2610.37739**、Jiarui Yao、Ruida Wang、Tong Zhang）は、**12,151** 問の未解決研究問題コーパス（問題文、背景、進捗記録）と、回顧的ベンチマーク **200** 問を組み合わせる。うち **110** 問は 2026 年に解決済み、**90** 問は未解決だ。各ベンチマーク項目には **Lean 4** の形式化文が付き、自動検査と 2 名の独立レビューを通り、品質スコアで **HQ-50** の部分集合が選ばれる。**7 つの LLM エージェント**が標準予算の下、閉本・凍結検索・ライブ Web の 3 条件で評価され、証明は隔離サンドボックス内の 2 つの独立チェッカが採点する。

**Why it matters:** このベンチマークが暴くのは*解くこと*と*検索すること*の差だ。閉本での再発見はまれで、解決済み 40 問のうち最大 **7** 問にとどまり、著者らはライブ Web 条件での成功は "mostly reflects retrieval of published solutions" であり独立した再発見ではないと述べる。これは AI が新しい数学を発見すると主張するジャンル全体への正しい対照だ。論文を見つけられるシステムは、見出しが主張する能力を示していない。3 条件を分けることが差を測れるようにする。構成自体も最も強い部分で、2026 年に解決された集合と形式化文・2 名レビューの署名が、曖昧な「フロンティア」主張を採点者が確認できる項目に変える。ただし 200 問は小さく、条件ごとに数問動くだけで割合は大きく変わる。

[`🔗 arXiv 2610.37739`](https://arxiv.org/abs/2610.37739) · [`🔗 arXiv cs.AI new`](https://arxiv.org/list/cs.AI/new)

---

## 44. PoPLi はメッセージを言い換えて符号付き共謀を捕まえる — メッセージだけを見る監視は両方向で失敗した

- **Velocity:** ▮▮ rising
- **Source:** arXiv · 2610.37849 · work in progress
- **Tags:** `multi-agent` `collusion` `safety` `monitoring` `research`

"**Detecting Covert Collusion between AI Agents through Partner-Outsider Positive Listening**"（arXiv **2610.37849**、Kevin Yandoka Denamganaï）は、メッセージ監視が見落とすケースから始める。2 つのエージェントが、無害に見える文章に載せた私的な取り決めで協調する場合だ。提案される検査は意味ではなく行動に基づく。意味を保ったまま言い換えると、符号を知る**パートナー**は正確な文言に反応し、パートナーの役に置かれた**部外者**は反応しないはずだ。**PoPLi** はその 2 つの行動変化の差で、記録済みプロンプトの再生により事後計算される。

5 条件 — 共謀なし、共同報酬＋中立的メッセージ、共同報酬＋公然の意図、隠れた頭文字符号、符号＋公然の意図 — の模擬市場で、符号があるとき PoPLi は **0.48–0.59**（95% 区間はすべて **0.29** 超）、符号がないときは **−0.10 から −0.01** だった。監視の結果が落ちだ。話者メッセージだけを読む監視は **50 市場すべて**で「なし」と答え、全売り手のメッセージを読む監視は**共謀なしの 10 市場のうち 9** を誤検知した。

**Why it matters:** 非対称性こそが発見だ。一方の監視は信号を持たず、他方は偽陽性率がほぼ 1 で、どちらも「もっと注意深く読む」では直らない。PoPLi は自らの境界も明示する。検出するのは私的チャネルの使用であり共謀そのものではなく、インセンティブだけによる共謀や、文言ではなく**意味**に載った符号は見えない。これは*ある種*の隠れたプロトコルの検出器であり、既に持っているログに対して事後で走らせられる点で、オンラインフィルタより配備済みエージェント群の監査に向く。work in progress であり、設定は 1 つの模擬市場、部外者は役を入れ替えたモデルであって人間ではない。0.48–0.59 は統制された設定での分離度であり、現場の率ではない。

[`🔗 arXiv 2610.37849`](https://arxiv.org/abs/2610.37849) · [`🔗 arXiv cs.AI new`](https://arxiv.org/list/cs.AI/new)

---

## 45. 探索を Lean の証明に変えるエージェント — ARC-AGI-3 の 183 軌跡を再生し、6 つの界のうち 4 つは初回で誤り

- **Velocity:** ▮▮ rising
- **Source:** arXiv · 2610.40503 · Guancheng Pan, Qixin Tan, Yang Yuan, Andrew Chi-Chih Yao
- **Tags:** `agents` `lean` `arc-agi` `world-model` `research`

"**Algebraic World Model: From Exploration to Proofs**"（arXiv **2610.40503**、Guancheng Pan、Qixin Tan、Yang Yuan、Andrew Chi-Chih Yao）は、未知の環境の探索を検証可能な明示的数学模型に変える。ループは環境規則についての実行可能な **Python** 仮説を生成し、観測で検証し、共有規則を持つ型付きオブジェクトに整理し、圏論に導かれた変換で簡約し、**Lean 4** に符号化する。これにより到達可能性だけでなく**不可能性** — 探索済み軌跡の外では目標に到達できないこと — を証明できる。

主な結果は ARC-AGI-3 にある。2 つの**不可能**なレベルで、AWM は閉じたカーネル検査済みの Lean 証明を生成し、**6 回すべての実行**で合法な勝利系列を排除した。一方 **Claude Opus 5.5** と **GPT-6 Astra** は**12 回のベースライン実行**でそのような証明を出せなかった。初回の界は見出しが示すより誤りが多く、6 つのうち **4 つ**が正しく、Opus 5.5 は 1 つ、GPT-6 Astra は 0 だった。6 つすべてに届くには「より安い勝利が存在する」とだけ告げられればよかった。公開 ARC-AGI-3 全 **25** ゲームで、そのモデルは Lean に **183** の勝利軌跡を再生させ、未見の遷移を予測し、ゲーム機構の変化を検出した。Claude Opus 5 と組み合わせると全レベルを **99.9** でクリアし、人間ベースラインの行動数の **43%** しか使わなかった。

**Why it matters:** 区別は証明と予測にあり、これが別のワールドモデル結果ではなくこの論文を読む理由だ。「たいてい当たる」学習シミュレータは、目標に到達できないという主張を支えられない。規則を Lean に符号化して検査したモデルはその主張ができ、誤るのは規則自体が誤っているときだけだ — それが初回 6 中 4 の誤りが示すことであり、修正段階が恥ではなく手法の一部である理由でもある。摘要が確立していないのは、99.9 のどこまでが探索から来てどこまでがモデルから来たかだ。著者所属（Yang Yuan と姚期智のグループ）も、AWM を汎用レシピとして扱う前に独立再現を待つべきという信号である。

[`🔗 arXiv 2610.40503`](https://arxiv.org/abs/2610.40503) · [`🔗 arXiv cs.AI new`](https://arxiv.org/list/cs.AI/new)

---

## 46. LRMoE は逆伝播の前に専門家クォータを計画する — MoE 学習時間 21.2–44.8% 減、比較対象は 1 つのベースライン

- **Velocity:** ▮ steady
- **Source:** arXiv · 2610.37720 · submitted 2026-10-27
- **Tags:** `moe` `training` `memory` `systems` `research`

"**LRMoE: Demand-Side Load Re-Calibration for Efficient MoE Training on Memory-Constrained Nodes**"（arXiv **2610.37720**、Jiaming Hu、Zhida Jiang、Zhaolong Xing、Yu Li、Zhen Chen、Ke Zhang）は疎な MoE 学習の非対称性を突く。ルーティングは不均一で、人気の専門家は活性を保持する必要があり、遊んでいる専門家もあり、逆伝播は両方のバッファ代を払う。LRMoE は順伝播中に専門家の保持クォータと配置を計画し、逆伝播中に**寄与度指標**でクォータ内で生き残るトークン–専門家ペアを選ぶ。ルーティングされた順伝播の計算はすべて保ちつつ、容量を意識したルーティングと物理的コンパクションで逆方向の通信・計算・バッファ需要を削る。

実測は **Qwen3-30B-A3B** と **GLM4.5-106B-A12B** で、固定損失目標までの MoE 層累積学習時間が **SYMI** 比 **21.2–44.8%** 減った。

**Why it matters:** 学習時のメモリ圧はふつう offload で答えるが、それは帯域を容量に交換する取引だ。こちらはもう一方のレバーで、バッファが必要になる前に、戻りで再計算または破棄してよいルーティング済みペアを決める。正直な注意は摘要が語らない部分にある。GPU の型番、基数、メモリ量、インターコネクト、クラスタ構成の記述がなく、「メモリ制約ノード」は前提であって特定された設定ではない。比較として名指しされるのも 1 つのベースラインだけだ。21.2–44.8% という広い幅は、利得が対象モデルのルーティング分布に強く依存することをも意味し、自分の MoE も同じだと仮定する前に確認すべき最初の点である。

[`🔗 arXiv 2610.37720`](https://arxiv.org/abs/2610.37720) · [`🔗 arXiv cs.AI new`](https://arxiv.org/list/cs.AI/new)

---

## 47. 4B の Three.js 専任モデルがデータセット・レポート・借り物の視覚プロジェクタを一緒に公開 — 4,146 シーン、"early preview" の表示付き

- **Velocity:** ▮ steady
- **Source:** Hugging Face · 29,615 downloads · 363 likes · card updated 2026-10-30
- **Tags:** `open-weights` `threejs` `3d` `gguf` `apache`

**`ccore/Qwen3.5-4B-3D-Coder`** は Qwen3.5-4B の独立した **Apache-2.0** ファインチューンで、汎用コーディングに 3D 特化を加えたものだ。自己完結した **Three.js** シーンを単一 HTML ファイルとして生成する。カードは "an early preview of a 4B model I am still training" であり、"**not** an official Qwen release." と明記する。重みに加えて**学習データセット** — 4,146 シーン例（**3,933 学習 / 213 検証**）、プロンプト・完全な思考トレース・完全な HTML/JavaScript 応答を含み **MIT** — 技術レポート PDF、4 シャードの FP16 safetensors、Q4_K_M/Q8_0 の GGUF ビルドを公開する。

最も有用な実装詳細は **2026-10-30** に追加された視覚経路だ。2 つの GGUF 量子化は元の Qwen3.5-4B 視覚プロジェクタと組み合わせると画像入力を受け付ける。カードは正確な同梱ファイル（**約 644 MiB**、BF16）とその出所 — `lmstudio-community/Qwen3.5-4B-GGUF` の未改変プロジェクタ — を名指しする。提供手順も具体的で、`llama-server -m … --mmproj … --n-gpu-layers all --flash-attn on --ctx-size 65536`、**llama.cpp b11889** で検証済み、LM Studio では**マルチトークン予測を無効**にしないと挙動が崩れると注記する。

**Why it matters:** 狭域ファインチューンは安く作れて評価が難しく、このリリースは評価を可能にする 3 つの成果物 — データ、4 精度の重み、レポート — を出しており、ほとんどの 4B コミュニティ公開より多い。カードが明示する 2 点と含意する 1 点がある。画像対応は**自分が学習していないプロジェクタ**を継承するので画像品質は Qwen のものでありファインチューンのものではない。ワンショット成功率の主張はスコア付きベンチマークではなく定性的なスクリーンショットに支えられている。例はボクセル風の室内が中心で、それはデータセットの参照レンダーが強化するスタイルでもある。強いローカルデモ生成器として扱い、4B が 3D で大規模コーダに並ぶ証拠とはしないこと。

[`🔗 ccore/Qwen3.5-4B-3D-Coder`](https://huggingface.co/ccore/Qwen3.5-4B-3D-Coder) · [`🔗 ccore/ThreeJS-3D-Scenes dataset`](https://huggingface.co/datasets/ccore/ThreeJS-3D-Scenes) · [`🔗 Hugging Face trending`](https://huggingface.co/models?sort=trending)

---

## 48. 31.5k スターの macOS メニューバーツールキットは GPL-3.0 と商標の別扱い — そしてマイクミュートはプライバシー保証ではないと明言する

- **Velocity:** ▮ steady
- **Source:** GitHub Trending · 499 stars today · 31,525 total
- **Tags:** `macos` `swift` `gpl` `open-source` `utilities`

**`vorssaint/vorssaint-utils`** は無料・オープンソースの **macOS メニューバーツールキット**で、**Swift**（AppKit と SwiftUI）製だ。アプリ別音量ミキサー、システム監視、アプリ/ウィンドウ切替、ウィンドウスナップ、Dock プレビュー、クリップボード履歴、テキストスニペット、ファイルシェルフ、アンインストーラ、画面キャプチャ、メディアツール、Homebrew マネージャ、スリープ防止、ディスプレイ制御を 1 つのアプリにまとめる。**31,525 スター、1,518 フォーク、42 ウォッチャー**、**GPL-3.0-or-later** で、未使用モジュールを無効化して "Install only what you use" できる。

**Why it matters:** 機能一覧を越えて読むべき理由は README の 3 つの開示にある。ライセンスはコードを覆うが、**名称・ロゴ・視覚的アイデンティティは別途商標条項で覆われる** — フォークは合法でも同じ名前で配布するのは違法だ。プラットフォームの下限は厳格で、**Apple Silicon のみ、macOS 14 Sonoma 以降**、Intel Mac はすべて除外される。そして正直な 2 点。**ファン制御は beta と表示**され、カードはマイクミュートがプライバシー保証ではないと明言している。メニューバーのトグルは UI 状態であって音声経路の保証ではなく、そう書くことがユーティリティとセキュリティ主張の境界になる。アプリはローカルファーストでアカウントも分析も追跡もなく、公式ビルドは署名・公証済みであり、アクセシビリティと画面収録の権限を求める 31k スターのツールにとってそこが最も重要な部分だ。

[`🔗 vorssaint/vorssaint-utils`](https://github.com/vorssaint/vorssaint-utils) · [`🔗 GitHub Trending`](https://github.com/trending)

---

## 49. GCC は `switch` を 5 通りに降ろし、コストで選ぶ — case あたり 8 スロット、3 件でビットセット、記号にはビットテスト

- **Velocity:** ▮ steady
- **Source:** xoranth.net · 87+ pts · ~4h ago (~2026-10-31T08:02Z)
- **Tags:** `gcc` `compilers` `optimization` `c`

`pass_lower_switch` を深く辿る記事が、**GCC** が `switch` を機械語に変える過程を説明する。答えは「ジャンプテーブル」だけではない。密な case は基数を引いたジャンプテーブルになり、GCC は密と疎の領域を分割して外れ値に独自の分岐を与え、連続したラベル範囲は範囲検査に畳まれ、非常に疎な文字 case は減算・境界検査・定数に対する**ビットテスト**になる。閾値はラベル数ではなくコスト比較だ。0–87 を覆う 20 ラベルの switch は 88 項目の表に入るが比較は 10 回で済むため、GCC は比較木を出す — ヒューリスティックは表の大きさと比較コストを秤にかけている。

より面白い半分は動的計画法だ。**ビットセット降級**は、各範囲が 64 ビット未満のレジスタに収まり最大 3 つの遷移先辺を覆うという制約の下でビットセット数を最小化し、**遷移先 1 つなら 3 case、2 つなら 5、3 つなら 6** で有益とされる。**ジャンプテーブル選択**も DP で、表が少なく処理 case が多い方を好み、速度最適化で最大成長比 **8**、サイズ最適化で **2**、`casesi` が使える場合の最小 case 数は **4**（なければ **5**）。どちらも勝たなければ、GCC はプロファイルデータや `__builtin_expect_with_probability` を使って**確率で釣り合った二分比較木**を出す。

**Why it matters:** switch が if-else より遅いという俗説もその逆も民間伝承であり、この記事はそれを実際の決定手順 — 5 つの戦略に対する、ターゲットごとに調整されたコストモデル — で置き換える。C をプロファイリングする人への実務的な結論は、case 値の形（密度、連続性、遷移先数）が降級方式を選ぶということだ。switch をより密に書き換えると、意味が同一でも生成コードが変わり得る。著者は移植性の注意も添える。ビットセット降級を除き、これらは **Clang** にも当てはまる。あるコンパイラの戦略が一般化すると仮定したベンチマークは、言語ではなくヒューリスティックを測っている。

[`🔗 xoranth.net — Switch Lowering in GCC`](https://xoranth.net/gcc-switch/) · [`🔗 Hacker News discussion`](https://news.ycombinator.com/item?id=50314085)

---

## Metadata

| Field | Value |
|-------|-------|
| Generated | 2026-10-31T12:32:34Z |
| Items | 49 |
| Sources tracked | 26 (Hacker News, GitHub, GitHub Advisory Database, arXiv, Hugging Face, CISA KEV, NVD, cveawg, CISA-ADP, Google Research, OpenAI, Anthropic, Parameter Labs, Volexity, Ubuntu Discourse, Patchstack, Firezone, Akamai/Linode, Go Security, bunny.net, Northflank, GitHub Status, SigNoz, Tangled, xoranth.net, TNW) |
| Update schedule | 04:03, 12:03, 20:03 UTC+8 (3x daily) |
| Ranking | Velocity-weighted (recency × engagement acceleration × source authority) |
| License | [CC-BY 4.0](https://creativecommons.org/licenses/by/4.0/) |

---

[Previous day](2026-10-30.md) · [Raw .md](https://trending.md/jp/feed/2026-10-31.md) · [Archive](../archive/)
