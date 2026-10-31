---
date: 2026-11-01
updated: 2026-10-31T20:38:42Z
schedule: 04:03, 12:03, 20:03 UTC+8
sources: 14
license: CC-BY-4.0
---

# トレンド — 2026-11-01

## 1. Delinea が Secret Server の認証修正を一日で三件公開 — 最もスコアの低い一件が「フィッシング耐性 MFA」を崩す

- **Velocity:** ▮▮▮ trending
- **Source:** Delinea CNA レコード（cveawg）· 公開 2026-10-30 · 予約 2026-10-23
- **Tags:** `cve` `authentication-bypass` `pam` `jwt` `fido2`

Delinea は **2026-10-30** に Secret Server 向けの CVE を三件公開した。修正対象はいずれも「12.3.1 より前のバージョン」で、三件とも認証経路が認証をやめてしまう類のものだ。`CVE-2026-115829` は部分ログイン・バイパスで、「ユーザーは最初のログイン段階を飛ばし、第二要素ログイン段階の交渉に成功するだけで認証できた」。スコアは **8.7**（`CVSS:4.0/AV:N/AC:H/AT:N/PR:H/UI:N/VC:H/VI:H/VA:N`）。`CVE-2026-115830` は JWT 発行の問題で、ユーザーは「署名のない JWT を送信し、その見返りに **cloudadmin** 権限を受け取ることができた」。こちらも同じベクトルで **8.7**。そして `CVE-2026-115828` は、Secret Server が「FIDO2 準拠デバイスを使う際に PIN や生体認証のチェックを常には行っていなかった」というもので、**5.1**。

スコアの付け方が肝だ。FIDO2 の一件は三件のうち攻撃複雑度が**最も低く**（`AC:L`）、それでもスコアは最小になる。影響成分が `VC:L/VI:L` だからだ。管理者権限を鋳造する二件は `AC:H/PR:H` を背負い、CISA の SSVC エンリッチメントが `Technical Impact: total` と書いているにもかかわらず 8.7 に抑えられている。この二つの数字は「計算されたシナリオの深刻さ」として読み、「結果の深刻さ」として読んではいけない。第二要素それ自体を十分条件にしてしまう PAM アプライアンスは、5.1 の問題とは別のカテゴリにある。

**Why it matters:** 「フィッシング耐性 MFA」は調達チェックリストの一項目であり、それが当てはまるのはまさにこの製品カテゴリだ。そして FIDO2 のレコードは、PIN／生体認証の検証が常に実行されていたわけではないと言っている。パスワード保管庫にとってこれは「部分点」の話ではない。保証の議論そのものが 5.1 として登録されているのだ。12.3.1 に更新し、自分の MFA ポリシーが何を前提にしているかを読み直すべきだ。

[`🔗 CVE-2026-115829 (cveawg)`](https://cveawg.mitre.org/api/cve/CVE-2026-115829) · [`🔗 CVE-2026-115830 (cveawg)`](https://cveawg.mitre.org/api/cve/CVE-2026-115830) · [`🔗 CVE-2026-115828 (cveawg)`](https://cveawg.mitre.org/api/cve/CVE-2026-115828) · [`🔗 Delinea セキュリティアドバイザリ`](https://delinea.com/security-advisories)

---

## 2. Drupal は Commerce の欠陥が実悪用されていると言う。しかしレコード上の唯一のスコアは CISA の 6.5 で、悪用フラグは「none」

- **Velocity:** ▮▮▮ trending
- **Source:** Drupal SA-CONTRIB-2026-254 · CVE レコード公開 2026-10-30T03:09Z
- **Tags:** `cve` `drupal` `ecommerce` `access-bypass` `provenance`

`CVE-2026-118539` は Drupal Commerce Core の認可欠落で、`drupal` CNA により **2026-10-30** に割り当てられた。「特定のルートとエンティティフィールドを十分に保護しておらず」、それが「ベンダーの財務に影響しうる」。影響範囲は `<2.41` と `>=3.0.0 <3.3.13`。Drupal 自身のアドバイザリはこれを **「Highly critical — 21 ∕ 25」** と評価し、こう明言する。**「This vulnerability is being actively exploited in the wild.」** 回避策の記載はなく、推奨は最新版の導入と「注文に不整合がないか監査する」ことだ。

問題はレコードの側にある。CNA コンテナには **metrics が一切ない**。この CVE 上で唯一のスコアは **CISA-ADP Vulnrichment** コンテナにあり、`CVSS:3.1/AV:N/AC:L/PR:N/UI:N/S:U/C:L/I:L/A:N` = **6.5**。並ぶ SSVC ブロックは `Exploitation: **none**`、`Automatable: yes`、`Technical Impact: partial` で、タイムスタンプは `2026-10-30T00:00:00+00:00` である。この値は**日付であって時計ではない**。瞬間として読むと話が一つ出来上がってしまう——03:09Z の公開より 3時間09分**前**に見えるが、このフィードが引用した他の記録では同じ真夜中の形が**翌日**の真夜中に落ち（それぞれの公開より **0.2〜10.4 時間後**）、この記録自身の ADP コンテナの `dateUpdated` は `2026-10-31T03:56:19Z`——公開の丸一日後だ。このフィードが引用した SSVC ブロックを持つ **271** 件を数えると、**206** 件が本物の瞬間値で、そのうち **196 件が公開より後、公開より前はゼロ**。残る **65** 件が真夜中への丸めだ。つまり enrichment は勧告が存在してから走っており、`none` は Drupal の「実際に悪用されている」がすでにページに載っている状態で CISA が出した答えである。この脆弱性について最も重要な二つの文——どれくらい悪いか、誰かが使っているか——は依然として逆向きの出所から来ており、スキャナに届くのは自動化された方だ。

**Why it matters:** この一件でプロヴェナンス問題が全部出ている。ここでの「CVSS 6.5」は CISA の第三者エンリッチメントであってベンダーの評価ではなく、それが「実悪用中」と書かれたページに載っている。ベンダーの警告から一日後に書かれた `Exploitation: none` は第二の意見ではない。同じトリアージの問いに一度だけ「none」と答えたもので、誰も問い直していないのだ。トリアージがレコードのスコアで並べるなら、Commerce サイトは WordPress プラグインより下に沈む——ベンダーのテレメトリが「今日叩かれている」と言っている間に。

[`🔗 Drupal SA-CONTRIB-2026-254`](https://www.drupal.org/sa-contrib-2026-254) · [`🔗 CVE-2026-118539 (cveawg)`](https://cveawg.mitre.org/api/cve/CVE-2026-118539)

---

## 3. Windows の情報窃取マルウェアが被害者の身上書を `claude-opus-4.6` に POST する — 断られたら Kimi と Gemini へ自動で切り替える

- **Velocity:** ▮▮▮ trending
- **Source:** Cisco Talos · 206+ pts · 約 6 時間前（~22:29 UTC+8）
- **Tags:** `malware` `llm-abuse` `infostealer` `opsec` `talos`

Talos の **VOLTA-AUTODOXER** に関する分析は、自己削除型の情報窃取マルウェアを描いている。ブラウザの認証情報、ウォレットのシード、Discord／Telegram／Steam のセッション、クラウドトークンを集めたあと、盗んだセッションを使って被害者プロファイルを濃くする。Gmail の Amazon・DoorDash・Uber Eats・Walmart・PayPal の領収書から自宅住所を裏取りし、フードデリバリーの注文履歴を引き、Roblox の在庫をリアルタイムで評価する。そして `Identity_Report.txt` を書き、JSON にシリアライズし、**被害者自身のマシンとネットワークから OpenRouter の chat-completions エンドポイントへ POST する**。既定モデルは `anthropic/claude-opus-4.6`、フォールバックは `moonshotai/kimi-k2` そして `google/gemini-2.5-flash`、temperature は `0.2`。システムプロンプトはモデルに「a forensic intelligence analyst drafting a target assessment」の役を求め、「WHAT THEY'RE WORTH」と「THEIR OPSEC」を出させる。

残すべきは拒否の扱いだ。サンプルは応答に「I can't」「I'm not able」のような文字列がないか調べ、あれば次のモデルへ移る。Talos はこの意味を慎重に留保する——「This suggests it's a builder model」、そして「**If** VOLTA is indeed a commoditized malware」——さらに攻撃者自身のインフラは存在しないと述べる。「All the observed endpoints for this malware are third-party controlled.」サンプルは一つで、SHA256 は `57ef4242666d78c50df145b34023df564f0fad38812d6a580e66433d427e2279`、初観測は 2026-10-11。

**Why it matters:** モデルがやっていることは表計算でもできる。だがモデルは**トリアージ**をやっている——スクレイプした束を、引用付きで順位付けされた「奪う価値のある相手」の一覧に変えている。持ち帰るべき事実はフェイルオーバー・ループの方だ。あるフロンティアモデルの拒否が、いまや商品化されたマルウェアにおけるルーティング判断になっている。「モデルが断った」は制御ではなく、レイテンシだ。

[`🔗 Talos — Appraisal by AI: model-driven victim prioritization in the VOLTA infostealer`](https://blog.talosintelligence.com/appraisal-by-ai-model-driven-victim-prioritization-in-the-volta-infostealer/) · [`🔗 議論（Hacker News）`](https://news.ycombinator.com/item?id=50316531)

---

## 4. Jepsen が ParticleDB で 96 件の問題を見つけ、利用者に移行を勧告する — ベンダーが金を払った報告書で

- **Velocity:** ▮▮▮ trending
- **Source:** Hacker News · 113+ pts · 約 6 時間前（~21:39 UTC+8）
- **Tags:** `database` `jepsen` `correctness` `acid` `testing`

Jepsen による **ParticleDB 1.1.4**（Orkes）の分析は **96 件の問題**を報告しており、そのうち **93 件は健全なシングルノードで、しばしばクライアント一つ、障害注入なしの状態で**発生した。クラッシュ、デッドロック、`WHERE 4 = 5` が行に一致する、`WHERE TRUE` が無視される、`NOT NULL`／`UNIQUE`／主キーが強制されない、join が誤る、行が消せない、文字列が整数として返る、そして中断されたトランザクションがコミットされる。並行性の下では G1a、G1b、G-single、Lost Update、読み取りスキュー、陳腐化読み取りを検出し、確認済みの書き込みが消えた。`1.1.18.11.rc-22` までに「これらの問題は十件を除いて解決したように見えた」が、ParticleDB は「既定の `occ` トランザクションモードでの通常運用中にコミット済みの書き込みを失い続け」、「`serializable`（最強の設定）でも内部異常と Lost Update を許した」。Orkes は 1.1.19-rc.13 がすべてを解決すると述べるが、Jepsen は「1.1.18.11.rc-22 より後のバージョンは評価していない」。勧告に含みはない。**「Jepsen は利用者に対し ParticleDB のさらなる配備を中止し、可能な限り速やかに他のデータベースへ移行することを勧告する。」**

留保はすべて埋めずに開示されている。この作業は **Orkes（ベンダー）の資金提供**を受けており、それでも「出て行け」と言っている。レプリケーションは一切試験されていない。「Orkes が提供したビルドはレプリケーションをサポートしていなかったため、本報告はシングルノードの挙動のみを扱う。」「形式的に証明済み」というマーケティングの裏に TLA+ 仕様はない。非決定的な失敗の一群は「テストスイート自体のバグの産物かもしれない」。認識論も明記される。「我々はバグの存在を証明できるが、その不在は証明できない。」

**Why it matters:** 「Full ACID」はマーケティングの言葉であり、これを一度検証するコストがこれだ。データベースのベンチマークを読む人にとって有用なのはこの順序だ——シングルノード、既定設定、障害なし、それでも書き込みを失う。この線より上で公表される分散システムの数字はすべて、基盤エンジンがまだ稼いでいない何かを測っている。

[`🔗 Jepsen — ParticleDB 1.1.4`](https://jepsen.io/analyses/particledb-1.1.4) · [`🔗 議論（Hacker News）`](https://news.ycombinator.com/item?id=50316100)

---

## 5. NVIDIA の新しいオンデバイスモデルは Q4 の方が BF16 より**高スコア** — 21 ベンチマーク中 7 項目で。そして「4GB」はパラメータ数でもファイルサイズでもない

- **Velocity:** ▮▮▮ trending
- **Source:** Hugging Face モデルカード · 公開 2026-10-23 · 300 いいね、7.5 万ダウンロード
- **Tags:** `quantization` `small-language-model` `nvidia` `on-device` `benchmarks`

`nvidia/NVIDIA-Nemotron-3.5-Bolt-E4B-4GB` は「Gemma-4-E4B-it からさらに対話後学習した」モデルで、「8B（4B 実効）」、Q4_K_M、入出力各 64K、ライセンスは OpenMDW-1.1。カードは BF16 と Q4_K_M を並べて公開しており、**21** 行のベンチマークのうち **7** 行で量子化版が勝つ。MultiChallenge **53.10 → 55.60**、RoleBench **67.05 → 71.21**、ToolSandbox **68.77 → 74.13**、RelyToolBench **63.16 → 69.29**、さらに 0.5 点未満の僅差が三つ（Brevity 82.52 → 82.84、IFBench 63.79 → 64.00、RAGTruth 77.59 → 77.88）。残り 14 行は負けで、Tau2-Bench 55.10 → 52.32、LongBench v2 50.50 → 48.67、RULER 86.99 → 85.76 が最も大きい下落。

二つを切り離して読む。第一に名前。「4B」は Gemma-4-E4B という疎モデルの**実効**パラメータ数で、総量は 8B、Q4_K_M ファイルは **6.18 GB** と記載されている。つまり「4GB」はブランド名であって、カード上の何かの測定値ではない。第二にカード自身の言い回し。「Accuracy numbers are measured by NVIDIA under a consistent harness」であり「他社の自己申告値とは異なりうる」、評価は「RoleBench、EQ-Bench v3、RULER を除き推論モードで実施」。量子化版が MultiChallenge で BF16 を 2.9 点上回るのは、後学習の組み合わせの実効果か、ハーネスの産物か。「consistent harness」と書くカードは後者ではないと告げているが、分散は示していない。

**Why it matters:** オンデバイスは、量子化が最適化から配備そのものに変わる場所だ。Q4 こそが実際に出荷される成果物なら、その**自身**の数字が主役であるべきで、注記の一列であるべきではない。そしてこのカードの正直な読みは「四位ビルドは単純な劣化ではない」であって、「量子化は無料だ」とは別の主張だ。

[`🔗 nvidia/NVIDIA-Nemotron-3.5-Bolt-E4B-4GB`](https://huggingface.co/nvidia/NVIDIA-Nemotron-3.5-Bolt-E4B-4GB) · [`🔗 Hugging Face トレンドモデル`](https://huggingface.co/models?sort=trending)

---

## 6. 「プラトン的表現仮説」が定理になった — そして証明は、次トークン予測こそ**非効率**な道だと言う

- **Velocity:** ▮▮ rising
- **Source:** arXiv 2610.39302 · HF Papers 58 アップボート
- **Tags:** `research` `representation-learning` `jepa` `multimodal` `scaling-laws`

論文は**プラトン的表現定理**を証明する。任意の数のモダリティで別々に訓練された Joint-Embedding Predictive Architecture（JEPA）は、その正例ペアが同一 scene の二つの観測——すなわち**良い視点**——である限り「回転一つを除いて同じ表現を学び」、そうでなければミスアラインメントは有界になる。この枠組みでは、次トークン予測は**悪い視点**を持つ JEPA である——同一文書の断片だ——そしてそれが「言語モデルがスケールによってのみ視覚と整列する理由を説明する」。経験的な主張が突き抜けている。同じコーパスで同じ整列に到達するのに、良い視点は次トークン予測より **42 分の 1** の訓練サンプルで済む。そして **1.09 億パラメータのテキスト JEPA** は、評価したすべての言語モデル（最大 720 億パラメータ）よりも、CLIP のテキストエンコーダよりも、DINOv2 と CLIP の画像エンコーダとよく整列する。検証は 14.5 万件のキャプションから 9.4 億枚のウェブ画像のテキストまで及び、「シードノイズの範囲で未見の実行を予測する」スケーリング則を示す。

ショーケースは意図的に小さい。回転一つで、別々に訓練されたエンコーダが画像キャプショナに変わる（COCO で CIDEr .838）。ペア不要のベンチマークでは、テキスト JEPA は ImageNet-100 top-5 で 64% を報告し、80 億パラメータまでの言語モデルは「at most 56%」だ。

**Why it matters:** モダリティ間の整列がスケールではなく**視点の構成**の性質なら、スケールを積むのは、指定できたはずの表現を高く買う方法でしかない。42 倍は単一コーパス上のサンプル効率の主張であり、訓練コストの主張として読むべきではない。だがこの仮説が、観察ではなくレシピを伴って現れた最初の版だ。

[`🔗 arXiv 2610.39302 — Proving and Improving the Platonic Representation Hypothesis with JEPAs`](https://arxiv.org/abs/2610.39302) · [`🔗 HF Papers（トレンド）`](https://huggingface.co/papers/2610.39302)

---

## 7. imgproxy の 9.8 には CVE がなく、修正から八日後に届き、次のリリースが同じローダーを再び直した

- **Velocity:** ▮▮ rising
- **Source:** GitHub Advisory Database · 公開 2026-10-06 · レビュー 2026-10-30
- **Tags:** `cve` `go` `libvips` `heap-overflow` `image-processing`

`GHSA-hff9-5pqw-6w9f` は imgproxy の ICO ローダーにおける **9.8**（`CVSS:3.1/AV:N/AC:L/PR:N/UI:N/S:U/C:H/I:H/A:H`）のヒープオーバーフローで、細工した `.ico` を送るネットワーククライアントなら誰でも到達できる。機構はファイルが供給するサイズフィールドでの整数ラップだ。ICO ローダーは 32 ビットの攻撃者制御 `data_size` を読んだあと `data_size + BMP_FILE_HEADER_LEN` バイトを確保するが、`data_size > UINT32_MAX - 14` で加算がラップする——`0xfffffff5` は **3 バイト**の確保になる——それでもローダーは宣言された数ギガバイトの範囲を 14 バイト目から書き込む。影響範囲は `>= 4.0.0, < 4.0.16`、ベースのモジュールパスと `/v2`、`/v3` の三つすべて。

揃えるべき日付は三つ。imgproxy **4.0.16** は **2026-09-28** に「Fixed several vulnerabilities in ICO image loader」として出た。**4.0.17** が **2026-09-30** に「Fixed a possible out-of-bounds read in the ICO image loader」で続く。そしてアドバイザリは **2026-10-06 に公開**され、**2026-10-30 にようやくデータベースへレビュー**された——24 日後、しかも **CVE ID なし**。さらにこの画像プロキシは三週間で他にも二度、セキュリティ色の濃いリリースをしている。4.0.18（2026-10-14）は SVG サニタイズのバイパスを直し（「via control-character entities in `href`, SMIL animations of link attributes, and DOCTYPE entities」）、4.0.19（2026-10-21）は「(docker) Untrust compromised eMudhra CA certificates」を加えた——4.0.16 のアドバイザリが名指す問題とは別物の修正だ。

**Why it matters:** Go モジュールにとって、アドバイザリが指すのは `4.0.16` で、存在するのは `4.0.20` だ。GHSA で照合するスキャナは `4.0.17` を clean と判定するが、その直前に照合したローダーには、一つ上のパッチでまだアウトオブバウンズ読み取りが残っていた。そして公開からデータベース投入までの 24 日の空白は、十月のいつかの日において「アドバイザリが見つからない」がキューについての陳述でしかなかったことを意味する。

[`🔗 GHSA-hff9-5pqw-6w9f`](https://github.com/advisories/GHSA-hff9-5pqw-6w9f) · [`🔗 imgproxy リリース`](https://github.com/imgproxy/imgproxy/releases)

---

## 8. OpenSearch の SQL プラグインがクライアント提供の cursor をデシリアライズしていた — 予約から開示まで 106 日、読み取り権限が唯一の壁

- **Velocity:** ▮▮ rising
- **Source:** CVE レコード（アサイナ `GitHub_M`）· 公開 2026-10-30T22:22Z
- **Tags:** `cve` `opensearch` `deserialization` `rce` `sql`

`CVE-2026-63393` は OpenSearch SQL プラグインの任意コード実行だ。「基本的な読み取り／検索権限を持つリモートの認証済みユーザーが、`plugins/sql` エンドポイントに細工した `cursor` パラメータを渡すことで、信頼できないデータの安全でないデシリアライズを引き起こす」。2.x 系は `2.8.0.0` から `2.19.6.0` まで、3.x は `3.7.0.0` より前が影響を受け、**2.19.6.0** と **3.7.0.0** で修正される。CNA のスコアは **8.7**、`CVSS:4.0/AV:N/AC:L/AT:N/PR:L/UI:N/VC:H/VI:H/VA:H`——この `PR:L` が設計そのものだ。読み取り専用の検索権限が、普通のユーザーとサーバー側実行の間にある唯一の障壁である。

レコードの細部を二つ。**予約は 2026-07-16**、**公開は 2026-10-30**——ID が押さえられてから説明が読めるようになるまで 106 日あり、「新しい脆弱性」と「新しいレコード」はまた別の文だ。CNA は分類も示している。**`CWE-502`（信頼できないデータのデシリアライズ）**で、`problemTypes` に載っている。

**Why it matters:** クライアントが供給する値の無制限なデシリアライズは、クエリエンジンで繰り返し出てくる cursor 処理の欠陥と同じ形だ。そして cursor は、ページング API が呼び出し元に必ず返すあのパラメータである。クラスタが `plugins/sql` を公開しているなら、`PR:L` は緩和策ではない——「任意のアナリスト」という意味だ。

[`🔗 CVE-2026-63393 (cveawg)`](https://cveawg.mitre.org/api/cve/CVE-2026-63393) · [`🔗 OpenSearch リリース`](https://github.com/opensearch-project/OpenSearch/releases)

---

## 9. OpenDeepWiki は管理者署名鍵を `appsettings.json` に同梱していた — だから誰でも Admin トークンを鋳造できる

- **Velocity:** ▮▮ rising
- **Source:** CVE レコード（アサイナ `VulnCheck`）· 公開 2026-10-30T13:18Z
- **Tags:** `cve` `hardcoded-secret` `jwt` `dotnet` `self-hosted`

`CVE-2026-119597`：OpenDeepWiki は **2.0.6** まで**ハードコードされた JWT 署名鍵**を持ち、レコードはファイル名まで挙げる——`appsettings.json` の `Jwt:SecretKey`——そしてそれを「公然と知られている」と述べる。未認証の攻撃者は `Admin` ロールクレームを持つ HS256 bearer トークンを鋳造し、`/api/admin` に到達して「ユーザー、ロール、リポジトリ、設定、API キー」を制御する。レコードには**二つのスコアが二つのベクトルで**載る。CVSS 4.0 で **9.3**（`AV:N/AC:L/AT:N/PR:N/UI:N/VC:H/VI:H/VA:H`）、3.1 で **9.8**（`AV:N/AC:L/PR:N/UI:N/S:U/C:H/I:H/A:H`）——同じ CNA、同じバグ、二つのフレームワーク、0.5 の差はフレームワークのものであって事実認識の相違ではない。

「出荷時シークレット」の所見としては異例に完全なレコードだ。`references[]` は `appsettings.json` の該当行、それを消費する `Program.cs`、修正コミット、上流 issue #403 を指す。**予約と公開は同一日**——11:46Z と 13:18Z、二時間足らず。リポジトリは今も 3,651 スター、MIT、最終プッシュ 2026-10-23。

**Why it matters:** 既定の署名鍵は「セルフホストがむしろ悪化させる」失敗モードだ。どの配備も同じ秘密を継承し、悪用は `curl` 一発で済む。この二重スコアのレコードは有用なリマインダでもある。9.3 と 9.8 が同時に正しいのは今や通常であり、どちらかを CVSS バージョンなしで引用することこそが誤りだ。

[`🔗 CVE-2026-119597 (cveawg)`](https://cveawg.mitre.org/api/cve/CVE-2026-119597) · [`🔗 AIDotNet/OpenDeepWiki — 修正コミット`](https://github.com/AIDotNet/OpenDeepWiki/commit/1bf0f4b5ef8d972ca640e5df145b5813a9492544)

---

## 10. Vercel Labs が `agent-desktop` 1.0 を公開：エージェントはアクセシビリティツリー経由で実アプリを操作し、ピクセル照合をしない

- **Velocity:** ▮▮ rising
- **Source:** GitHub · 3,979 スター · v1.0.0 2026-10-28、v1.0.2 2026-10-30
- **Tags:** `agent-infra` `computer-use` `rust` `accessibility` `desktop`

`vercel-labs/agent-desktop`（Apache-2.0、Rust、作成 2026-02-19）は macOS、Windows、Linux 向けの CLI と C ライブラリで、エージェントに「computer use for AI agents: read and operate desktop apps through the OS accessibility tree」を与える。スナップショットは操作可能な要素ごとに ref を持つ JSON を返し、エージェントは ref に作用してから再びスナップショットを取る——「The agent acts on a ref and snapshots again to check, with no pixel matching; the loop stays in your agent.」重要な設計判断はこれだ。「Ref actions go through the accessibility API without moving the pointer or taking focus」、そして既定で**ヘッドレス**、`--headed` で初めて物理入力になる。

失敗モードが曖昧でなく型付けされているのは、実際の利用に合わせて作られたハーネスの印だ。ref はスナップショットスコープで、UI が変われば `STALE_REF` か `AMBIGUOUS_TARGET` を返し、対処は新規スナップショット。複数ウィンドウでは window id を渡さない限り `AMBIGUOUS_TARGET`。macOS はアクセシビリティ権限が必要で「The host exits after 15 idle minutes」、`TMPDIR` は現在のユーザー所有かつモード `0700` でなければならない。72 時間で 1.0.0 から 1.0.2 へ進んだ。

**Why it matters:** 「スクリーンショットしてクリック」は computer use のうち信頼できるようにできない半分であり、アクセシビリティツリーはできる半分だ——ref は安定し、操作は安全に再試行できる。機能と一緒に語るべき警告が二つある。「Snapshots, clipboard reads, screenshots, command output and debug artifacts can contain private desktop content.」そして「The optional JEV helper sends screen descriptions to a configured model provider」——ネイティブ CLI にはないネットワーク経路だ。

[`🔗 vercel-labs/agent-desktop`](https://github.com/vercel-labs/agent-desktop) · [`🔗 リリース`](https://github.com/vercel-labs/agent-desktop/releases)

---

## 11. Molly は 7 月 31 日以降リリースがなく、本家 Signal は 8.27 で修正済み — そしてリポジトリには以後コミットが一つだけ

- **Velocity:** ▮▮ rising
- **Source:** Hacker News · 259+ pts · 約 10 時間前（~18:23 UTC+8）
- **Tags:** `signal` `fork` `supply-chain` `maintenance` `messaging`

主張はこうだ。強化版 Signal フォークの Molly は「3 か月更新されておらず、本家 Signal で修正済みの攻撃に対して脆弱」である——具体的には十月に開示された欠陥で、通話終了後も音声、場合によっては映像が続きうるもので、上流では **Signal 8.27** で修正された。数字は投稿ではなく出所で確認できる。Molly の最新リリースは **`v8.19.2-4`、公開 2026-07-31T11:56Z**。そのタグ以降、既定ブランチのコミットは**一つだけ**——`2026-09-08T08:32:13Z`、同期ワークフローで上流の安定版を追跡する CI 変更だ。リポジトリは放棄されていない（`pushed_at` は 2026-10-30）。三か月ビルドを切っていないだけだ。Signal のそのバグに CVE は割り当てられていない。

**Why it matters:** プライバシー・フォークの価値提案はまるごと「自分で上流を監査するより速く上流を追う」ことにある。三か月のリリース空白はそれを反転させ、パッチを当てられない土台に利用者を置き去りにする。測るべき量は「リポジトリは生きているか」ではなく「利用者が最後にバイナリを受け取ったのはいつか」であり、ここではその二つの答えが 91 日離れている。

[`🔗 Molly — リリース`](https://github.com/mollyim/mollyim-android/releases) · [`🔗 議論スレッド`](https://piefed.world/post/1503394)

---

## 12. Orkas は 16 人の専門エージェントと Commander をデスクトップに置く — MIT、ローカルファースト、ただし OSS ビルドはクラウド機能を落とす

- **Velocity:** ▮▮ rising
- **Source:** GitHub Trending · 6,051 スター · 本日 +1,118 · 作成 2026-04-29
- **Tags:** `multi-agent` `desktop` `local-first` `mit` `orchestration`

`Orkas-AI/Orkas` は「an open-source (MIT), local-first AI team for your desktop: a Commander turns your goal into to-dos and coordinates 16 built-in specialist agents plus Claude Code, Codex, OpenCode, OpenClaw and Hermes」。2026-04-29 以降 820 コミット、366 フォーク、**未クローズ 7 件（issue 3、PR 4）**、マーケットプレイスには「30+ agents」。プロジェクトメモリ、スケジュール自動化、Gmail・Notion・Slack・Shopify・Stripe のコネクタを備え、パッケージ版には「500 credits for the built-in Orkas model」が含まれる。

README は「OSS ビルドが何でないか」を異例に正確に書く。共有プロジェクト、クラウド同期、Web アプリ公開は「the open-source build doesn't support them yet」で、パッケージ版はサインインが必要。自動化はマシンが起きていてアプリが動いていることを要求し、取りこぼした実行は「within 12 hours when the computer wakes or Orkas starts」の範囲でしか回復しない。Linux はソースからで「with no installer yet」、そして「Alpine and other musl-based distributions are not supported」。タスクの誠実さについては「an admitted or queued task is not treated as a completed result.」

**Why it matters:** 面白いのはエージェント数ではなく、デスクトップ・オーケストレータというカテゴリが安定したアーキテクチャに収束したことだ——ToDo を書くプランナ、実行する専門家、外部 CLI へのブリッジ。競争はオーケストレーション研究ではなくパッケージングとコネクタに移っている。6,051 スターに未クローズ 7 件という数字は注視に値する。若いバックログを表しており、硬化したランタイムを表してはいない。

[`🔗 Orkas-AI/Orkas`](https://github.com/Orkas-AI/Orkas) · [`🔗 GitHub Trending（デイリー）`](https://github.com/trending?since=daily)

---

## 13. Youtu-Parsing-Omni は一つのエンコーダと一つのスキーマで十の解析タスクを貫く — 5B チェックポイントで OmniDocBench v1.6 の 96.96

- **Velocity:** ▮▮ rising
- **Source:** arXiv 2610.39301 · HF Papers 67 アップボート
- **Tags:** `research` `multimodal` `document-parsing` `audio` `video`

Youtu-Parsing-Omni は全モダリティ解析器で、文書、画像、音声、映像を「空間と時間に基礎づけられた構造化レコード」に変換する。「a perception layer for agents that read, locate, and cite evidence across modalities」という位置づけだ。設計の不変条件は二つ。**すべてのモダリティに一つのエンコーダ**（テキスト読み取りを強化するため事前学習済み言語モデルから初期化し、共有重みで統一的な時空間座標系に符号化する）と、**すべてのタスクに一つのスキーマ**（`OmniSchema` が十の解析タスクを統一し、単一の後学習手続き OmniSchema-Aware On-Policy Distillation がすべてに奉仕する）。

単一の **5B** チェックポイントが **OmniDocBench v1.6 で 96.96 Overall** の SOTA を報告し、**OmniParsingBench で 75.08 Avg.** と開放重みモデルをリードする——「with its advantage concentrated on audio and video」——さらに総合チャート解析で最高スコア（**95.02**）、「the highest exact chemical-fingerprint agreement among compared systems」、そして「matches a dedicated optical-music model in character-level transcription of typeset sheet music while staying far ahead of general-purpose systems」。

**Why it matters:** 「with its advantage concentrated on audio and video」という一句が重い。文書リーダーボードの数字とマルチモーダルの主張は別のものを測っており、単一エンコーダの論拠は誰も競合していないモダリティの上に築かれている。コードと重みは公開されており、この具体的な主張は引用可能であるだけでなく検証可能だ。

[`🔗 arXiv 2610.39301 — Youtu-Parsing-Omni`](https://arxiv.org/abs/2610.39301) · [`🔗 HF Papers（トレンド）`](https://huggingface.co/papers/2610.39301)

---

## 14. PAPERBENCHX は 93 本の実論文の再現をエージェントに課す — 最良の構成でも完全再現は 14%

- **Velocity:** ▮ steady
- **Source:** arXiv 2610.39744
- **Tags:** `research` `benchmark` `agents` `reproduction` `science`

PAPERBENCHX は **93 の専門家構築タスク、12 の研究領域**にまたがるベンチマークだ——電磁気、フォトニクス、化学、材料科学、生物学、ロボティクス——「each task provides the source paper, a public task specification, and a domain-native scientific environment involving specialized scientific software」。評価が厳格な側だ。「we replay every submission from scratch and score only regenerated evidence against expert-validated criteria」なので、もっともらしい文章は零点になる。**10 のフロンティア・エージェント構成**のうち「the best configuration fully reproduces only **14%** tasks under the 90% threshold」、一方「mean rubric scores range from 27.53% to 59.08%」。

この開きが発見そのものだ。エージェントはルーブリックの半分以上を日常的に取るが、完遂はまれで、著者はこれを「a large gap between paper understanding and reliably producing reproducible scientific evidence」と読む。部分的な進展は「rarely translates into complete scientific reproduction」。

**Why it matters:** 既存の再現ベンチマークは機械学習に集中しており、実験は同じスタックを共有する。このベンチマークはエージェントに領域固有の科学ソフトを駆動させ、長時間の計算を診断させ、妥当な証拠ともっともらしい出力を区別させる。「90% 閾値で 14%」という枠組みも正直な方だ——平均ルーブリックだけを公表すれば、存在しない 59% の能力を報告することになる。

[`🔗 arXiv 2610.39744 — PAPERBENCHX`](https://arxiv.org/abs/2610.39744) · [`🔗 全文（arXiv HTML）`](https://arxiv.org/html/2610.39744v1)

---

## 15. GPT-5.6 Sol は 13.5 ゲーム時間で Factorio のロケットを打ち上げた — ただし投稿曰く、多くは手作業の運搬だった

- **Velocity:** ▮▮ rising
- **Source:** Hacker News · 74+ pts · 約 1 時間前（~02:50 UTC+8）
- **Tags:** `agents` `benchmark` `codex` `games` `long-horizon`

Ryan Madden は「GPT-5.6 Sol, running in Codex with low thinking level」を、リーチとフォグ・オブ・ウォーを強制するマネージャ層と小さな Python ライブラリ越しに Factorio の一局に走らせた。目標は「complete a peaceful (i.e. no biters) Factorio run in 13.5 hours of game time」で、ロケット打ち上げで終わった。ゲーム全体の「production statistics throughout the game」を記録し、研究マイルストーンを注記した。

留保はコメンタが掘り当てたのではなく、書き手が書いている。平和モードなので虫はおらず、防御タスクは存在しない。計画より長引いた——Madden は「had planned to terminate the run after blue science research」だったが「Sol's surprising effectiveness」のため続行した——しかし後半のスケーリングは「slowed Sol's relative progress significantly」。そして、**「The rocket launch was only achieved through significant 'manual' effort on Sol's part」**。Sol は「failures to connect certain production systems」を「repeatedly ferrying supplies between areas of the factory」で回避した。比較対象は GPT-5.5 の「failures to use transport belts at all」。

**Why it matters:** 終状態が実在するタスクで測った長距離のエージェント性であり、正直な結果は「モデルは構造的失敗から、愚直な方法を何度も繰り返して回復した」だ。それは本物の粘り強さであって計画性ではない。切り分ける価値がある——どちらでもこの一局は成功し、一般化するのは片方だけだ。

[`🔗 GPT-5.6 Sol can beat Factorio on peaceful mode`](https://ryanmadden.net/gpt-56-beats-factorio/) · [`🔗 議論（Hacker News）`](https://news.ycombinator.com/item?id=50318871)

---

## 16. kube32 は ESP32-S3 の上で Kubernetes コントロールプレーンと Wasm Pod ランタイムを動かす — PSRAM 2 MB、`kubectl` は Wi-Fi 越し

- **Velocity:** ▮ steady
- **Source:** Hacker News（Show HN）· 50+ pts · 約 2 日前
- **Tags:** `kubernetes` `esp32` `wasm` `embedded` `apache-2`

`arterialist/kube32` は ESP32 マイコン向けの Apache-2.0、Kubernetes 互換コントロールプレーン＋kubelet エージェント＋WebAssembly Pod ランタイム。27 スター、作成 2026-10-26。リポジトリ自身の説明も「Kubernetes-compatible control plane, Kubelet agent, and WebAssembly runtime for ESP32 microcontrollers」だ。「Pods are WebAssembly modules executed by the wasm3 interpreter」であり、「One firmware image runs on every board」。コントロールプレーンは「ESP32-S3, 8 MB flash, 2 MB or more quad SPI PSRAM」を要求し、「Any ESP32-S3 with 8 MB flash」がワーカーとして参加できる。Pod、Node、Namespace、Service、EndpointSlice、Ingress、Deployment、DaemonSet、Job、ConfigMap、Secret、Lease、Event、metrics の API を「including watch streams, Table output, OpenAPI v3 validation, and log tailing」で提供し、サービスルーティング、HTTP ingress、PVC 風ボリューム、再起動バックオフ、任意の bearer 認証、「automatic self-signed ECDSA P-256 TLS on port 6443」、ファームウェアのロールアウトまで備える。`kubectl` と `k9s` が Wi-Fi または USB シリアル越しに操作し、macOS／Linux 用シミュレータ `kube32-sim` も同梱される。

**Why it matters:** README が主張するのは適合性であって準拠ではなく、未対応 API の一覧もない——コントローラが動くと決めつける前に API リファレンスを読むべきだ。本当に有用なのはその形だ。PSRAM 2 MB に収まる API サーバーは、「Kubernetes のどれだけがプロトコルで、どれだけが機構か」を試す試験であり、このプロジェクトが出す答えは「プロトコルの大半は収まる」だ。

[`🔗 arterialist/kube32`](https://github.com/arterialist/kube32) · [`🔗 Show HN の議論`](https://news.ycombinator.com/item?id=50291812)

---

## 17. bootgpt はマスターブートレコードからニューラルネットを起動する — 11.5 KB の int8 重みを 23 セクタに

- **Velocity:** ▮ steady
- **Source:** Hacker News（Show HN）· 11+ pts · 約 7 時間前（~20:58 UTC+8）
- **Tags:** `llm` `bootloader` `quantization` `assembly` `tiny`

PC を「boots your PC」する文字レベルモデル。MBR は手書きアセンブリ 512 バイトのうち使用可能 510 バイトで、「It loads an 11.5 KB int8 model from the next 23 sectors and runs it in 16-bit real mode on a 386」。「The boot sector is code only」——「Strings, weights and the vocab table all live in the data sectors」——ネットワークは文字埋め込み、隠れ層一つ、softmax で、2 の冪スケールで int8 に量子化されている。やることは一つだけ。「hallucinating the boot log of the machine it wakes up on」——タイムスタンプ、PCI バー、「ACPI events for hardware that never existed」を生成する。任意のキー押下で再起動。MIT、コミット 3、スター 6。

作者は売り込まない。「With 8 chars of context and one hidden layer this is roughly the quality you get」、「the model is not a general story teller」。訓練コーパスは 3 MB の合成 fake `dmesg` で、カーネル版一つ、起動セッションごとにディスク一枚。

**Why it matters:** これは配備スペクトルの床であり、有用な床だ。ブートセクタに載る 11.5 KB のモデルは、「モデルサイズ」という主張が実際に何を買っているかの健康診断になる。面白い成果物はテキストの品質ではなく、重みと語彙表と推論ループが MBR と第一パーティションの間の隙間に実際に収まることだ。

[`🔗 kerlenton/bootgpt`](https://github.com/kerlenton/bootgpt) · [`🔗 Show HN の議論`](https://news.ycombinator.com/item?id=50315782)

---

## 18. ziwei-doushu は 674,976 枚の命盤と 877 万件の解読をオープンデータセットとして公開する — そして存在しない日付の 2,520 件を名指しする

- **Velocity:** ▮ steady
- **Source:** GitHub Trending · 12,227 スター · 作成 2026-05-01
- **Tags:** `dataset` `typescript` `astrology` `chinese-oss` `licensing`

`Renhuai123/ziwei-doushu` は倪海厦『天紀』体系に基づくオープンソースの紫微斗数命盤エンジンとデータスナップショットで、v4.0 の解読データセットが規模の話そのものだ。**674,976 枚 × 13 次元 = 8,774,688 件の解読**、約 204 億字、**非圧縮 56.6 GB／圧縮 161 MB**、1950–2026 を覆う 77 の年次ファイル。v3.0 は別に 518,400 件、1924–1983 を覆い非圧縮 33.1 GB。エンジン自体は十四主星、輔星、大限・流年、四化、十二神煞、真太陽時補正、1986–1991 年中国の夏時間検出、四つの閏月規約、そして「1100+ 行格局知識庫」——1,100 以上の命名格局ではなく、1,100 行以上のルール——を扱う。コードは MIT、データセットは CC BY 4.0、古典籍はパブリックドメイン、倪の講義抜粋は CC BY-NC-SA（非商業）——そして README は、それらが解読文中に現れる場合でもデータセットのライセンスから除外されると明記する。

引用可能にしているのは開示のほうだ。UI はデモにすぎない。「本仓库的界面是一套最小可运行示例」。v4.0 は本命盤のみで「未按出生地做真太阳时校正」。旧来の輝度デフォルト（「按旧默认「现代修正 v2」生成」）で生成されている一方、エンジンの既定は現在『全書』であり、輝度ラベルと解読が食い違う。そして v3.0 には約 2,520 件、存在しない日付のサンプルがある——2 月 30 日と非閏年の 2 月 29 日——これらは 3 月 1–2 日のサンプルと重複しており、除外すべきだ。

**Why it matters:** 56 GB の合成コーパスは、README ごと捨てられて下流に再公開される類のものだ。この一件は欠陥リストを先に公開している。存在しない日付、エンジンと既に一致しない輝度デフォルト、データの内側に鎮座するライセンスの例外。エンジン自体も継続保守される製品ではない——README がそう言っている——これが「アルゴリズムを使い、製品は使うな」の正直な版だ。

[`🔗 Renhuai123/ziwei-doushu`](https://github.com/Renhuai123/ziwei-doushu) · [`🔗 GitHub Trending（デイリー）`](https://github.com/trending?since=daily)

---

## 19. dsh-purge は DeepSeek 自身のハーネスにパッチを当てて脱獄プロンプトを差し替える — Apache-2.0 に転売禁止条項付き

- **Velocity:** ▮ steady
- **Source:** GitHub Trending · 14,529 スター · 今週 +6,665 · Apache-2.0
- **Tags:** `jailbreak` `harness` `licensing` `deepseek` `plugins`

`YuJunZhiXue/dsh-purge` は自らを「公式 DeepSeek Harness 向けのサイバーセキュリティ・レッドチームプラグイン」と称し、DSH 0.2.1-rc.2 と 0.2.0、公式の Web 版とデスクトップ版を対象にする。機構はリモートサービスではなくローカルパッケージへのパッチだ。「apply」は一致した `@deepseek-ai` ファイルを `.dshpurge.bak` としてバックアップし、置き換え、shim を上書きし、同梱プロンプトを注入する。毎ターンの選択順は、`prompt-inject.md` が非空ならそれ、なければローカルの `AGENTS.md`／`CLAUDE.md`、それもなければ「the encrypted prompt shipped in the plugin, the text the prompt box shows by default」。ワークスペースポリシーの strict／fallback／always が DSH 基底セクションを残すかを制御する。OSS ビルドは「only allows localhost/private nets」。

ライセンスこそ二度読むべき部分だ。Apache-2.0 に**追加条件**が付く。「Forks and redistributions must keep the copyright notice and NOTICE」、「Forks must attribute and name the source repository」、そして「The original build may not be resold」——リブランドしてストアに並べることも団体販売も不可で、名前・アイデア・コード・プロンプトを借りた場合も帰属表示が必要。

**Why it matters:** 自分が入れたソフトウェアに直接パッチを当てるリポジトリは、ハーネス拡張性という問いの最も尖った形だ。ベンダーに許可を求めず、アップグレード一回で死ぬ。「Apache-2.0」に転売禁止条項が付いたものは Apache-2.0 ではない。ライセンスフィールドと README が別のことを言っており、再配布を計画するならまさにその区別が効く。

[`🔗 YuJunZhiXue/dsh-purge`](https://github.com/YuJunZhiXue/dsh-purge) · [`🔗 GitHub Trending（ウィークリー）`](https://github.com/trending?since=weekly)

---

## 20. SAP の悪用ウィンドウは 489 日から 1〜3 日に収縮した — そしてその中央値は「悪用済み」と「PoC あり」を静かに併合している

- **Velocity:** ▮ steady
- **Source:** Onapsis Research Labs + Recorded Future · 公開 2026-10-29
- **Tags:** `sap` `exploitation` `ransomware` `threat-intel` `methodology`

共同報告書「Days to Zero」は、SAP Security Note の公開から最初の公開悪用までの間隔を測る。**2025–2026** 年に修正された欠陥の中央値は **1〜3 日**、2021 年のパッチでは **489 日**。対象は「more than 1.2 million threat-intelligence events」、2023 年から 2026 年前半まで。SAP に言及する地下文書は 419 件（2023）から **933 件（2025）** へ +123%。SAP 関連コンテンツに現れるランサムウェア／恐喝グループは 8 から **26** へ増え、期間全体では 30 グループが少なくとも一度は登場した。Qilin の暗号化ツールは暗号化の前に SAP のバックグラウンドサービスを終了させ、2026 年初頭の 40 日間に 11 の Qilin リークサイト被害者が「explicitly labeled 'SAP'」の外泄ファイルを持っていた。侵害された SAP アクセスは **500〜30,000 ドル**で取引される。

見出しに注意が必要なのは方法論の側で、報道もそう書いている。公開サマリは「does not provide the sample size behind each annual median」、中央値は「combines two milestones: verified public exploitation and publication of a proof-of-concept」、公開デモは「is not necessarily evidence of an attack against a production system」、数値は「with observed milestones, rather than every SAP vulnerability」を覆う。文書数とグループ数は「do not represent a count of successful SAP breaches」。

**Why it matters:** 489 → 1〜3 という方向は正しく、桁もおそらく正しい。そしてそれは脅威の変化であると同時に**定義**の変化だ——2021 年の中央値は確認済みの悪用だけを数え、2026 年の数字は公開された PoC も算入している。どちらの読み方でも運用上の結論は生き残る。パッチから悪用までの窓が日単位なら、四半期ごとのパッチ運用は間違った区間を測っている。

[`🔗 ERP News — SAP exploit window shrinks to days`](https://erpnews.com/sap-exploit-window-shrinks-to-days-onapsis-and-recorded-future-research-finds/) · [`🔗 Onapsis — Days to Zero（レポートイベント）`](https://onapsis.com/event/days-to-zero-recored-future-research-onapsis/)

---

## Metadata

| Field | Value |
|-------|-------|
| Generated | 2026-10-31T20:38:42Z |
| Items | 20 |
| Sources tracked | 14（GitHub Trending、Hacker News、arXiv、Hugging Face、NVD／CVE レコード、ベンダーアドバイザリ、セキュリティ研究） |
| Update schedule | 04:03, 12:03, 20:03 UTC+8（1 日 3 回） |
| Ranking | 速度加重（新しさ × エンゲージメント加速度 × 出所の権威） |
| License | [CC-BY 4.0](https://creativecommons.org/licenses/by/4.0/) |

[前日](2026-10-31.md) · [生の .md](https://trending.md/jp/feed/latest.md) · [アーカイブ](../archive/)
