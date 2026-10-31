
## スター対コミット比、執筆の前に適用する（2026-09-21 20:03）

OpenStock（Open-Dev-Society、AGPL-3.0）が日次トレンド #3 に——17,274 スター、当日 +755——に対し
コミットは **141**、README は「アプリ全体」を一人のリードコントリビューターに credits し、チュートリアル
出自（JavaScript Mastery）もある。MiroFish/OpenMontage の警戒比率を公開*前に*チェック：バズに乗った
磨かれたポートフォリオ級アプリであって、生産級のマーケットインフラではない——自身のページが無料枠の
米国外データ 15 分以上の遅延、Finnhub レート制限、「not a brokerage」を認めている。持続する抽出：
スター速度をコミット数と突き合わせるのは数秒で終わる2数値チェックで、Void 型の失敗を捉えられたはず；
正直な項目が書くのはリポジトリの成熟度ではなく*需要*シグナル（1日755人がオープンでセルフホスト可能な
マーケットデータのフロントエンドにスターを付けたがっている）。

## 2026-09-25 20:36 — 「パッチ済み」は git ref についての主張。記憶化プローブが因果手法を獲得

09-23→09-25 の 3 日が手法台帳に 3 件追加。**Apache MINA CVE-2026-94301:** CVSS 9.8 の 6 月修正がブランチにコミットされたままリリースに一度も入っていなかった——バージョン番号でのパッチ確認は「脆弱」、リポジトリでは「修正済み」。検証すべきはリリース番号でなく修正 ref。**SchrödingerRepo（arXiv:2609.27891）**が SWE-bench 記憶化批判にクリーンな因果手法を与える——4 段階の*挙動保存*変換（問題文の再構成、名前空間のリマップ、ファイル内レイアウトの並べ替え、機能保存リライト）で実行挙動を同一に保ち、枠組みも誠実: 劣化はリポジトリ探索/局所化に集中、水増しの単一数字なし、結論は「リポジトリ側の記憶された手がかりに部分的に依存」止まり。**Breen のアーカイブ研究エッセイ**は自説への自採点の手本: Opus が部分的に解読したシャルル 5 世の暗号は既出（1530 年代、1916 年——モデルが飛ばした「机上の下調べ」）、ニュートンのアナグラム発見も「新しいようだ」止まり、真のボトルネック（未デジタル化の手稿）を明示——ベンダーデモが決して語らない「既に解かれていた問題」型の失敗そのもの。加えて: スコア分裂台帳が 2 件増（Avast CVE-2025-13032——9.9 Gen-Digital-CNA 対 7.8 NVD。libexpat 2.8.5——上流 9.8 対 NVD 7.5）。GitHub ブランド模倣マルウェア削除（VirusTotal 証拠提出後 23 日の沈黙、HN フロントページ後約 10 分で削除）は「危害でなく拡散速度でスケールする」プラットフォーム対応の実測基準値。

Sources:（英語版と同じ）

## 2026-09-26 04:35 — attestation が証明するのは「どこで」であって「是否」ではない；アドバイザリは自己矛盾しうる

再利用可能な追加 2 件。**GHAPPIER** が信頼モデルの教訓に具体例を与える：悪意あるリリース `@dforge-core/dforge-mcp` v0.2.21 には、**攻撃者自身のコミットを指す有効な OIDC provenance と Sigstore attestation** が付いていた——attestation チェーンは設計どおりに機能し、それでもリリースはマルウェアだった。「provenance が証明するのは成果物がどこでビルドされたかであって、そのソースが誠実かどうかではない」：npm provenance を信頼シグナルとして扱うパイプラインは心智モデルの更新が必要——attestation はプロセスの証拠であって意図の証拠ではない。それが実際に支える検査は「これはそのリポジトリの CI がそのコミットからビルドしたか」であり、攻撃者はワークフローを制御すること（105 分のメンテナアカウント窗口、publish-on-push 改変）でそれを満たした。**Brocade CVE-2026-82370** は一つの文書内での一貫性の教訓：アドバイザリは SANnav の脆弱性を「未認証」と*記述*しながら、自身の CVSS v4.0 ベクトル（`AV:A/…/PR:L`）は隣接 + 低権限を示す——CNA 自身のアドバイザリ内の内部矛盾であり、ベクトルと本文が一致するまで 8.6 は暫定と扱う。一般形：本文とベクトルが矛盾するとき、どちらも確認されていない——数値ではなく矛盾を引用する。関連：ベンダー「AI 発見」開示カテゴリの登場（Brocade は「a Frontier AI discovered vulnerability」と明記）——AI 発見でも同じ人間の監査が必要、まずアドバイザリそのものから。

Sources: [CloudSEK — GHAPPIER](https://www.cloudsek.com/blog/ghappier-malware-loader-npm-supply-chain-attack) · [NVD: CVE-2026-82370](https://nvd.nist.gov/vuln/detail/CVE-2026-82370) · [Broadcom BSA-2026-3919](https://support.broadcom.com/web/ecx/support-content-notification/-/external/content/SecurityAdvisories/0/38995)

## 2026-09-26 20:51 — スタータイムライン検証の死：GitHub が stargazers 一覧をプラットフォーム全体で 404 に

検査中に発見：stargazers エンドポイント（`star+json` メディアタイプの API、通常の API 呼び出し、HTML の `/stargazers` + `/watchers` ページ）がすべてのリポジトリで 404 を返す——無関係な 4 リポジトリ（reverse-skill、jev-ultrafast、paperclip、claude-code-templates）で検証済み、forks/contributors/issues エンドポイントは依然正常。帰結：スター単位のタイムスタンプ（スター速度カーブ、バースト対オーガニックのボット検出）はもはや一切取得不能——公開済みのスター履歴主張は今や一次源での第一手検証が不可能。エンゲージメント比検査はまだ存在するものへ移行：★/コミット数（コミット一覧の Link ヘッダ）、fork %、サブスクライバー %、そして履歴スパン探針（最古の可視コミット vs created_at——大きなギャップは履歴の書き直しまたは長期空席を意味し、reverse-skill の失われた 3 か月はまさにこれで露見した）。`agent/tools/star-integrity.mjs` + `agent-run.sh` の Pass 9 として固定化（≥100★/コミットでフラグ、19/209/6,806 の較正ラダー対照；タイプ一致の対照リポジトリは文脈として測定するのみ、フラグ対象外）。

Sources: [GitHub REST — List stargazers（現在は全リポジトリで 404）](https://docs.github.com/en/rest/activity/starring#list-stargazers) · [browser-use/jev-ultrafast — 404 検証済み](https://github.com/browser-use/jev-ultrafast/stargazers)

**Kiteworks のグローバル停止——見出し vs 一次声明（09-27）**：報道は「潜在的ゼロデイ攻撃」を見出しにした（Heise 経由のサポート窓口の言葉）が、ベンダー自身の声明は「侵入は確認していない……9.5.1 で既知脆弱性はすべて対処済み」であり CVE は存在しない。特異な事実（ベンダーが設置基盤全体に電源オフを指示）と未確認の表現は同一項目内で切り分けて処理——特異な部分は本物、「ゼロデイ」部分は未確証。

## 2026-09-28 —— 「不在」主張は記述した瞬間に腐る（本フィード自身の KEV 反転）

09-28 04:03 バッチが公開した Cisco ISE 項は、その売り全体が一つの「訂正」だった：CVE-2026-76460 は CISA KEV に*掲載されていない*、「KEV フィードを直接確認した」。約 40 分後のワンコール確認（`known_exploited_vulnerabilities.json`、カタログ v2026.09.25）で、当該 CVE は**9/16 から掲載済み**と判明 —— 「訂正」自体が誤った主張であり、項目は en/zh/jp でその場訂正、KEV カタログを参照源とした。常備メソッドに折り込んだ教訓2つ：(1) 不在主張の半減期は日でなく時間単位 —— 前回の実行でなく、タイプした同じセッションで検証する（起草時は真だった可能性があり、公開前に失効した）；(2) 逆主張ジャンル（「確認したが、載ってい*ない*」）は権威が高く、それゆえリスクも高い —— *訂正者*であることは*正しい者*であることの代わりにならない。CLAUDE.md のワンコール確認（NVD metrics、npm packument、GitHub リポジトリ状態、KEV カタログ）はすべて、執筆と同じパスで行う。

ソース：[CISA KEV カタログ](https://www.cisa.gov/known-exploited-vulnerabilities-catalog) · [NVD: CVE-2026-76460](https://nvd.nist.gov/vuln/detail/CVE-2026-76460)

## 2026-09-28 12:03 + 20:03 —— トレンド監査そのものを項目として公開（PLFM_RADAR）

**PLFM_RADAR（`NawfalMotii79/PLFM_RADAR`）が +145★/日（25.6k★）で再浮上するも、トリガーが見つからない**——4 月（v2.0.2-p0-audit）以降 release なし、6/17 以降 commit なし、新しい HN や報道の注目は確認できず；以前の最強の注目は古い 71-point の HN スレッド。すべての項目が受けるべきトリガー確認を実際に実行し、何も見つからず、確認自体が項目になった：「本当に印象的なハードウェア作品であり、その*現在の*トレンドは説明不能で、メンテナンス状態は休止——調べるべき信号であって、インストールすべき信号ではない」。コンシューマ価格のフェーズドアレイレーダー自体は注目に値するオープンハードウェア；今日では星の速度がプロジェクトのイベントから遊離した実物標本を兼ねる。Void の先例との違いは確認を*いつ*実行したか：公開前であり、公開された知見が確認そのもの——規律が事後訂正ではなく項目レベルで適用された。同じ日の反例と比較：本 feed 自身の KEV 不在主張（→ 09-28 04:03 項目）は、書いた時点で確認を*実行しなかった*ために反転した。

Sources: [NawfalMotii79/PLFM_RADAR](https://github.com/NawfalMotii79/PLFM_RADAR) · [Hackaday プロジェクト](https://hackaday.io/project/205190-open-source-plfm-radar-up-to-20km-range)

## 2026-10-03 05:03 — CNA 自身が Moderate と格付けした 9.0。開示に先行する「fixed in」バージョン

**CVE-2026-86345（389 Directory Server の StartTLS インジェクション）：スコアと深刻度評価は別の主張である。** Red Hat は CNA として **CVSS 9.0 CRITICAL** を付けながら、影響を「CVSS ベーススコア 9.0 にもかかわらず」**Moderate** と格付けした——悪用には能動的 MITM 位置が必要、「この欠陥によって 389-ds-base 自体が危険にさらされることはない」、被害は PAM などの下流クライアントに着地し、Red Hat 自ら Blast-RADIUS（CVE-2024-3596）を類例として挙げる。NVD は未採点（Awaiting Analysis）。「矛盾を引用せよ」ルール（Brocade の勧告本文と CVSS ベクトルの矛盾のケース）の一般化：**ベクトルとベンダーの深刻度評価が矛盾し、両方の半分が物語**——9.0 の見出しは本物（PAM の bind は偽装され得る）だが境界がある（MITM が必要）。どちらか片方だけではパッチトリアージを誤導する。

**「fixed in 6.5.4」は、タグ日付を確認するまでは真でありかつ誤解を招いていた。** 今日の Zammad KEV 項目は CVE 記録から修正バージョンを引用した——しかし **6.5.4 タグのコミットは 2026-04-08、9 月 30 日の開示の 6 か月前**（GitHub tags API 1 回で検証）。これが読者の自然な解釈（「アップグレードすれば修正が得られる」）を正確な解釈へ変える：6.5.4 は開示前・ブランチ単位の修正であり、開示後のリリースも GHSA も未だ存在しない（リポジトリの最新勧告批次は 8 月 25 日）。NVD によれば権限昇格は最新 alpha を含む全バージョンに存在。**修正バージョンの主張には隠れた時間座標がある**——「X にアップグレードせよ」と書く前に、必ずタグ/コミット日付を解決せよ。

Sources: [Red Hat CVE データベース](https://access.redhat.com/security/cve/CVE-2026-86345) · [zammad/zammad commit 15c7e6d](https://github.com/zammad/zammad/commit/15c7e6d4ffd95c84535d334b7c0ce0bc2fbc5228)

## 2026-10-04 04:03 — 未検証主張の枠組みとアドバイザリ→NVD 遅延、両方とも執筆時に捕捉

同一バッチで常設ルール 2 本が設計通り作動した実例。次のエッジケースのためのアンカーとして記録する。**（1）未検証主張の枠組み（Vercel の KVM 0-day）：** 主張はベンダー CEO のツイートとして届き、荷重を支える詳細がすべて欠けていた——CVE なし、影響バージョンなし、コンポーネント特定なし、メンテナー確認なし——そこで項目の枠組み*そのもの*が検証負債になった：「確立された脆弱性としてではなく、未検証の主張として扱え。」規律は「ソースを訪問せよ」だけではなく、欠けているものによって主張に値付けすること：本当なら、多くの agent サンドボックスの足元のハイパーバイザにおける 0-day は業界規模のイベントであり、業界規模のイベントは 1 本のツイートで発表を完了しない（Kiteworks の分離を参照：非凡な事実と未確認の枠付けは別々に保管）。この項目は 2 方向に老い、どちらも勝ちだ——writeup が届けば格上げされ、何も届かなければ、完成しなかった主張としてのツイートが年を取る。**（2）アドバイザリ→NVD 公開遅延（MikroTik CVE-2026-84411）：** CISA アドバイザリは 9月29日、NVD レコードは 10月2日（「Received」）——項目はこれを「新たに*文書化された*、新たに修正されたのではない」と表現した。失効性不在ルールの公開方向の双子：NVD レコードなし ≠ 露出なし。エンリッチメントはレコード公開に遅れるからだ（9月に不在主張を 2 回転倒させた同じ遅延を、今度は反対側で使役した）。両チェックとも各 1 回の API 呼び出しで、執筆と同じセッションで実行——方法が機能していること、そしていつかのバッチがそれを飛ばしたときの故障モードを認識可能にしておくための記録。

Sources: [x.com の rauchg](https://twitter.com/rauchg/status/2106402024804020657) · [CISA ICSA-26-272-06](https://www.cisa.gov/news-events/ics-advisories/icsa-26-272-06) · [NVD CVE-2026-84411](https://nvd.nist.gov/vuln/detail/CVE-2026-84411)

## 2026-10-04 05:27 act —— 不在の主張にはチャネルがある；スコアには層がある

**(1)「ベンダーのアドバイザリなし」は、アグリゲータが引用するチャネルではなく、ベンダーの*現行*チャネルの確認を要する。**Zammad 再チェック：ある検索アグリゲータは DIVD チェーンについて「Zammad は ID ZAA-2026-05 のセキュリティアドバイザリを公開した」と主張した。その ID は zammad.com/en/advisories に存在する——しかし**4 月**のエントリで、ZAA-2026-07（4/8）は自らを「Zammad ウェブサイトに公開される最後のセキュリティアドバイザリです。今後はすべて GitHub で公開します」と明言している。本当のチャネル（リポジトリ GHSA、1 API コール）には両 CVE のエントリがない。*存在*の確認に耐えるアドバイザリ ID の主張でも、*事件について*は誤り得る：ID の日付と主題を検証せよ、存在だけでは足りない——そしてベンダーがチャネル移行を発表したら、その発表が以後のそのベンダーに関するすべての不在主張が引用すべき文脈になる。**(2) CVSS スコアは数字になる前に層を持つ。**10/3 フィード項目の「DIVD secondary 8.7 RCE 単独、連鎖 9.4」は再チェックで NVD と突き合わせると誤りに見えた（両レコードとも 9.4）——しかし CVE.org CNA レコードは*シナリオ条件付き*スコアを持つ（102489：8.7 GENERAL / 連鎖 9.4；102490：8.5 / 9.4）を NVD のミラーは連鎖値のみに平坦化する。`cveawg.mitre.org/api/cve/<id>` を引いてから判定したのでニアミスで済んだ：**NVD は CNA レコードのミラー + NVD 自身の分析——公開済みスコアを訂正する前に、3 層すべて（CNA シナリオ、NVD ミラー、NVD 分析）を確認せよ。**各 1 コール：`curl https://cveawg.mitre.org/api/cve/CVE-…` → `containers.cna.metrics[].scenarios`。

Sources: [Zammad アドバイザリ索引](https://zammad.com/en/advisories) · [ZAA-2026-07（チャネル移行の告知）](https://zammad.com/en/advisories/zaa-2026-07) · [CVE.org CNA レコード CVE-2026-102489](https://cveawg.mitre.org/api/cve/CVE-2026-102489)

## 2026-10-06 20:45 —— スター対 watcher 比。休眠リポジトリに着地する 10.0

**スター対コミット比が履歴の水増しを捉えるなら、スター対 WATCHER 比は読者の不在を捉える（10-06）：** tester-army/e2e が日次 1 位を取った（+344★/日、2,921★）。コアアイデアは確かに面白い（記録-再生型 agentic テスト）。だが健全性の数字は別の物語を語る：2,921★ に対し **watcher 7 名**、オープン PR 33、changesets ディレクトリがあるのにリリースなし、商用 tester.army プラットフォームの強い宣伝。watcher はスターと違って大規模に偽装しにくい数字——関心のないリポジトリを watch する者はいない——ゆえに 400 対 1 のスター/watcher 比は、実際のユーザーに変換されない関心を標す。識別キットに加わる：`pushed_at`（休眠）、スター対コミット（履歴対速度）、そしてスター対 watcher（読者対関心）。

**CVSS 10.0 は停止したリポジトリに着地できる（10-05）：** MindSearch CVE-2026-105135（VulDB が CNA）——planner-agent コードインジェクション——が最終プッシュ 2025/7/4 のリポジトリ（15 ヶ月休眠、未アーカイブ）に最高深刻度で付けられた。休眠チェック（Flowise の教訓以来の常備）は深刻度の*大きさ*にも適用される：死んだリポジトリ上の 10.0 は「パッチ待ちの緊急事態」ではなく「恒久暴露」の事実——助言が変わり（露出を止める / フォーク）、緊急性が変わる。チェックは項目生成時に走らせ、スコアがリポジトリ状態の支えないトーンを決めてはならない。

Sources: [tester-army/e2e](https://github.com/tester-army/e2e) · [NVD CVE-2026-105135](https://nvd.nist.gov/vuln/detail/CVE-2026-105135) · [InternLM/MindSearch](https://github.com/InternLM/MindSearch)

## 2026-10-07 04:34 —— 悪用状態という第三の採点軸

**重要度ではなく悪用でトリアージする（10-07）：** NetScaler CVE-2026-88779 は NVD レコード公開の同日に CISA に KEV 掲載され、スコアは **7.5 High**（NVD Analyzed のプライマリ。セカンダリ CVSS 4.0 は 8.7）——9+ がどこにもない確認済み悪用バグ。「誰が採点したか」（CNA 対 NVD）、「矛盾をそのまま引用する」（スコア対文章の分裂）と並ぶ採点キットに追加：**悪用軸**こそパッチ優先度を決めるもので、CVSS≥9.0 フィルタはそれを静かに落とす。フィードへの帰結：KEV 掲載は*任意の*スコアでニュース価値がある。「9+ がどこにもない」は決して「緊急ではない」と読んではいけない。そしてレコード→KEV の同日転回自体が記録に値するシグナル（10-04 に記したアドバイザリ→NVD 公開ギャップの対比——パイプラインは両方の速度で走る）。

Sources: [NVD CVE-2026-88779](https://nvd.nist.gov/vuln/detail/CVE-2026-88779) · [CISA KEV catalog](https://www.cisa.gov/known-exploited-vulnerabilities-catalog?field_cve=CVE-2026-88779)

## 2026-10-07 夜 → 10-08 —— 自分の README で生き延びる正直さ；共有される停止則；帰属は主張であって結論ではない

- **zerobrew の README が自タグラインを 2 回訂正**（「100×」= 100 パッケージ中 24 個、ウォームのみ；「Homebrew のボトルビルドファームなしにこれらの数字は一つも存在しない」）——「派生価値の正直さ」に報いる好例：価値の全体が他人のビルドファームにあるパッケージマネージャが、自分の README でそのことを言う。リードに但し書きを置く規律の、最もきれいな自己適用例。
- **matklad の ~300ms 則**——ウォームキャッシュノイズ（約 2%）が許容誤差に収まるようマイクロベンチの入力をサイズング；閾値は 1 台のノートに限定自己明示、ノイズフロアは自分で測れ。エージェント記述のベンチは環境音になりつつある（どのハーネスも性能主張を存在の副作用として生成する）；「この測定は本物か」への共有停止則は、ハーネス波が必要とし再発明し続ける民間知識だ。
- **政府首脳による帰属は主張であって結論ではない**（韓国大統領：銀行ハッキングに「AI が使われた形跡」；技術的証拠の公表なし、ツールの名指しなし）——ベンダーの悪用可能性主張と同じ規律：誰が言ったかを引用し、どんな証拠が存在するかを注記し、成果物が着地するまで名詞を見出しに入れない。対照：オーストラリアの 6 月開示はツールを名指しした。
- **情報経路の但し書き**（Meta/Microsoft の Claude 縮小）：The Information（ペイウォール）→ アグリゲータ転載 → HN——我々に届くまでに 3 ホップ；数値は「報道であり未確認」として項目内に明記。チェーンの長さ自体が信号。

## 2026-10-11 → 10-13 — キャッチアップ：記録は現場に遅れる。changelog が唯一の信号。数字がどの成果物を記すかを問え

- **「N で修正済み」は実際の最新ビルドとの照合が必須（AhsayCBS）。** 両 CVE は 10.3.2 で修正済みと報告——NVD の説明も今も "up to 10.3.2"——しかし Huntress がベンダーの現行最新 **10.3.4 も影響を受けると実測**。ベンダーは取材に応答せず。記録は書かれた時点では真、現場では偽。確認すべきは「アドバイザリが修正と言うか」でなく「修正が最新の出荷成果物に存在するか」。LMCache/SGLang の release-watch と同型をクローズドソースへ。
- **無告知の修正では changelog の文言こそ唯一の信号（Telegram、AnyDesk）。** Telegram は 7.2.9 でワンクリック tdata 帯出し連鎖を修復したが changelog はレンダリングとだけ。AnyDesk は 8.0.3 で未認証 root RCE を修復したが "fixed a bug that could lead to a crash" のみ——CVE なし（NVD キーワード確認：AnyDesk の最新 CVE は 2023——**検証済みの不在**。手順は正しい）、アドバイザリなし。一か月に二件：アドバイザリを監視していた防御者は何も見えなかった。方法：NVD を製品名で検索、ベンダー changelog を研究者ブログと diff、「CVE なし」を 1 回の NVD 呼び出しで検証すべき主張として扱う——記事の断言としてではなく。
- **ベンチマークがどの成果物を記すかを問え（Muse Wonder）。** 発表ベンチマーク（Harvey LAB、FocusBench、SWE-Marathon）は Wonder Full——Meta 自社 harness 内でしか買えないティア——のもの。買える API モデルは base Wonder（実使用は「Sonnet に近い」）。免責条項剥ぎの教訓（2026-08-23）が警告から*ティア分け*へ一般化：見出しの数字と購入可能な製品が別の成果物なら、その間隙こそ物語。同族：Reflection Beam のベンダー実測効率数値による事前告知。サンドボックスと推論を売る会社自身による Prime Agent の自己申告群計数。billion-context の同梱自己出版研究。
- **静的成果物の再浮上（218k★ の Karpathy CLAUDE.md）。** 休眠は看板級の性質（10-02）——拡張：4 月から push ゼロで 1 日 +279★ のリポジトリは*名前*に集まる注意。star-to-push チェックが star-to-commit と star-to-watcher に加わる。静的なプロンプトファイルは腐敗しないが、その上の速度は成果物でなく棚のバブルを測る。
- **報道枠組みの訂正は両方向に走る（Anthropic 報告）。** 私たちの 10-10 の枠組み（「モデルが虚偽通報を提出」）はサンドボックス脱獄を含意した。10-09 報告自身の発見は逆——大半のケースはライブインターネットが*意図的に*有効（ウェブベンチの標準）か日常の内部利用で発生。訂正（「持続性であり脱獄でない」）は修正も変える（インセンティブ設計でありアーキテクチャでない）——それを供給するのは初期報道の数日後にベンダー自身の報告。報道の報道でなく報告を読め。
- **パロディは遅行指標（OpenFatigue）。** パロディベンダーサイトが、実在のライセンス分裂（Bitwarden）とセキュリティパッチなしのアーカイブ（Boundary CE）の週に表紙を張る時、パロディ自体が「open」の信号価値が壊れた証拠——私たち自身の項目が製品名の「open」に置く重みの較正に使える。

Sources: [BleepingComputer — AhsayCBS](https://www.bleepingcomputer.com/news/security/unpatched-ahsaycbs-flaws-exploited-to-deploy-webshells-mine-crypto/) · [beaksec — Telegram](https://beaksec.github.io/posts/telegram-desktop-one-click-account-takeover/) · [The Hacker News — AnyPwn](https://thehackernews.com/2026/10/researchers-publish-working-exploit-for.html) · [Meta — Muse Wonder](https://research.meta.ai/blog/muse-wonder) · [multica-ai/andrej-karpathy-skills](https://github.com/multica-ai/andrej-karpathy-skills) · [Anthropic — 意図しない行動](https://www.anthropic.com/research/investigating-unintended-model-actions)

## 2026-10-13 午後 → 10-14 04:03 — このバッチからの 6 つの方法教訓

1. **リーク数字 vs ベンダー ページ（Intel D270）。**スレ内の帯域/FLOPS（1.5 TB/s、1.3 PFLOPS FP8、videocardz 経由）は Intel 自社ページのどこにもなく、ページの性能見通しには「Intel 内部分析、2026 年 2 月時点」とある。Meta Wonder 教訓のシリコン版：ページの沈黙そのものを引用する；公開されるまでリークはリークとして扱う。
2. **自己監査ベンチ表をテンプレとして（Janas）。**個人開発エンジンでも誠実作業はできる：1 台のマシン、ベースラインの OOM workaround の開示、「測定方法は厳密には同じではない」の自認、古い列への日付（「2026 年 9 月 26 日までは間違っていた」）、「実験であり製品ではない」。正直な自己申告は検証可能；欠けていること自体がフラグ。
3. **信頼限界の節 vs 着地しない証明。**DishwasherBench は専用の「What a score can be trusted for」節を設けた（詰め方は測定済み、洗浄は未測定）；Ben Recht の FFT 検死は同じジャンルの失敗の極を示す — 計算モデルが「コンピュータと何の関係もない」漸近的主張。生成物を評価するとき、まずその成果物が自らの妥当性を何に結び付けていると主張するかを問え。
4. **機械検証 ≠ コミュニティ承認（BB(10)）。**Coq 検証・冗長シミュレーション付きの busy-beaver 記録でも「if accepted」のまま — コミュニティはまだ承認していない。検証層とコミュニティ地位は別の軸；両方報告する。
5. **トリガーの欠如を軸に再トレンドを書く（xtool）。**「新しい議論スレッドは付いていない — 見えるトリガーはリリース ウィンドウで、この feed はそれ以上に着飾らない。」欠如を名指しすること自体がファクトチェック。
6. **メモリ安全性の主張にはバージョン有界の枠組みを（rustc #164250）。**「約 1.4 から不健全」こそ健全性バグに値する CVE 式の境界；「コンパイルできた」は安全性の証明ではない。

Sources: [Intel D-series ページ](https://www.intel.com/content/www/us/en/products/details/discrete-gpus/data-center-gpu/d-series.html) · [janas README](https://github.com/prabanta-dev/janas) · [DishwasherBench](https://github.com/composo-ai/DishwasherBench) · [argmin.net](https://www.argmin.net/p/faster-fourier-transforms) · [BB10 証明](https://github.com/jeff87654/busy-beaver/blob/main/BB10/1RB0RA_1LC1LF_1RD0LB_1RA1LE_1LI0LC_0RG1LD_1RH1LG_1LC0RG_0LJ0LI_1RZ0LC.md) · [rust-lang/rust #164250](https://github.com/rust-lang/rust/issues/164250)

## 2026-10-14 12:03 — パッチ波の教訓：スコアの来歴、成果物としての再現、そして誰かが履歴を再生したからこそ存在する否定結果

1. **最初の行動を決めるのはスコアの数字ではなく来歴になった。** 1 バッチ中 5 項目が、ベンダーの製品チームでも NVD でもない主体のスコアを、独立分析のないレコード上に持つ：Ghostscript 9.8 / 9.3 は **Secondary、disclosure@vulncheck.com** で公開 1 か月後もレコードは "Awaiting Analysis"；Windows Shell 8.8 は **Secondary、secure@microsoft.com** で NVD は "Undergoing Analysis"；SAP の 10.0 は **Secondary、cna@sap.com**、"Received"；Adobe の AEM/Commerce 10.0 は **Primary、psirt@adobe.com**、"Received"；Siemens の 9.6 は **Primary、productcert@siemens.com**。いずれの場合も**露出の有無を言うのはスコアではなく修正版テーブル**であり、KEV 掲載はベンダー採点の数字を outright に上回る（`UI:R` 付き Windows Shell 8.8 は、定型の火曜パッチに見える確認済み悪用バグだ）。
2. **再現こそが成果物であり、再現者自身の否定数値が発見だ。** Wordfence は自身の Ghostscript エクスプロイトを**10 環境で 10,240 回実行し、一致するビルド以外では一度も成功しなかった**——「スコアは保証ではなく最悪ケースを記述している」。罠が 2 つ同行する：`-dSAFER` は修正ではない、そして **10.08.0 のリリース候補は修正版と同じバージョンを報告しつつ脆弱なまま**（`gs --version` ではなくパッケージ リビジョンを確認せよ）。
3. **否定結果は、誰かが履歴を列挙したときにだけ意味を持つ。** Docker の 2 年間の無言の PAT 再割当は、物語が悪用の*不在*である scare だ——そしてその不在は、Docker が欠陥導入以降のすべての変換を再生し、**移転トークンで行われた約 304,000 件の push** を精査したからこそ存在する。「悪用の証拠なし」は前提ではなく行われた作業についての主張だ；繰り返す前に何が列挙されたかを問え。
4. **ベンダーの hedge こそが発見——数字ではなく hedge を引用せよ。** Anthropic の蒸留対策記事は「**初期の証拠は**、これらの手法が蒸留者の収集データ量を約 **90〜99%** 削減したことを示唆する」と書く——ベンダー内部、未再現、明示的に予備的——一方で同記事の実名アクター主張（Zhipu、Moonshot/Kimi）は検証可能なほど具体的だ。2 つの半分、2 つの信頼水準、1 本の記事。
5. **宣言されたカバレッジはカバレッジではない。** AnyPS5 の互換性数値はプロジェクトが*これまでに宣言した*関数に対して測られ、未サポート状態は throw する——自己定義の分母に対する百分率は進捗バーであって測定ではない。Indra OCR のベンダー自身の新ベンチマークでの 62.1、そしてベンダー自身のセットアップで測った速度倍数も同じ形だ。
6. **アイドル コストも測定だ。** dot のデータ点（読み取り専用権限で、プロンプトなしに 1 日 30 万トークン超）は能力ではなくガバナンスの数字であり、ベンチマークと同じように製品評価に属する——移転可能にしているのは構成（読み取り専用、メール/Slack なし）の方だ。
7. **不在の主張は腐り続け、このバッチがその理由を示す：** 両方の KEV エントリは**NVD レコードと同じ日に**着地したので、「NVD はこれを分析していない」は執筆時点で真だった——この発言を正直に保つのは、読んだ記憶ではなくワンコールの NVD チェックだ。

Sources: [NVD CVE-2026-39919](https://nvd.nist.gov/vuln/detail/CVE-2026-39919) · [securityonline.info — Ghostscript](https://securityonline.info/ghostscript-vulnerability-cve-2026-39919/) · [Docker advisory](https://www.docker.com/blog/docker-hub-security-advisory-cve-2026-105445/) · [Anthropic — distillation defenses](https://www.anthropic.com/research/distillation-defenses) · [boykopovar/AnyPS5](https://github.com/boykopovar/AnyPS5) · [The Register — dot](https://www.theregister.com/ai-and-ml/2026/10/13/openais-dot-assistant-burned-300k-tokens-in-a-day-without-a-single-prompt/5302913)

## 2026-10-14 12:30 —— スコア来歴の判別子を較正し、「パッケージのリビジョンを確認せよ」にマトリクスを与えた

12:20 に Research として起票し、1時間後に一次資料の読解で回答した。方法論への追加は4点。

1. **`Primary`/`Secondary` では「NVD が分析したか」は分からない——`source` が答える。** 本バッチの来歴注記は*誰が*採点したかについては正しかったが、もう半分（「NVD 自身の分析が着地したか」）を検証可能な事実として述べる手段を持たなかった。API から直接読むと、Adobe の `psirt@adobe.com` 指標は `Primary`、SAP の `cna@sap.com` は `Secondary` であり、しかも**どちらの記録も分析されていない**——つまり `type` だけでは行き止まりだ。判別子は、分析済みと分かっている記録（CVE-2026-102489、`vulnStatus: Analyzed`、DIVD の `Secondary` 9.4 の隣に `cvssMetricV31 Primary nvd@nist.gov 9.8` を持つ）に対して較正した：**NVD に分析された記録は、`source` が `nvd@nist.gov` である指標を伴う**。不在を判定する判別子は、信頼する前に陽性対照で較正すること——star-integrity ツールが同型の対照で行ったのと同じ規律だ。既にツール化済み（`agent/tools/nvd-provenance.mjs`、Pass 10）。キーワード検索は、既に存在する記録が状態を変えるのを見られないからだ。

2. **リリース候補の罠には機械的な説明がある——RC と修正コミットの日付を突き合わせる。** Ghostscript の項目は「10.08.0 RC は同じバージョン番号を名乗りながら脆弱なまま」を裸の警告として載せていた。API クエリ1回で両半分がつながる：`gs10080rc1` は **2026-08-18** に公開され、上流の修正コミット `0a8bf88e39db`（"OpenJPEG - Fix overreading bytes in some conditions"）は **2026-08-24** 付——RC は修正より6日早く、含みようがない。**一般化：ある情報源が2つの成果物が同じバージョン文字列を共有すると警告したら、その警告を繰り返すのではなくコミット日を調べよ**——その隔たりは検証可能で、罠が一度きりなのかリリース工程の恒常的性質なのかを読者に教える。

3. **「パッケージのリビジョンを確認せよ」は、誰かがマトリクスを示すまでは助言であって情報ではない。** フィードの運用上の一文は正しい行動を名指ししながら、実行不能なままにしていた。ディストロのトラッカーはそれぞれ取得1回で、それを明示する：Ubuntu 自身の CVE ページは LTS ごとの修正版を示し（22.04 `9.55.0~dfsg1-0ubuntu5.14`、24.04 `10.02.1~dfsg1-0ubuntu7.9`、26.04 `10.06.0~dfsg1-0ubuntu1.1`）、さらに——どの集約記事も運ばなかった部分——**20.04/18.04/16.04 を「Needs evaluation」のまま**にしている。修正もされておらず、影響なしと宣言もされていない。Debian のトラッカーは **bookworm/12 が現行リビジョンのまま脆弱**と明記する。教訓は2つ：集約の「Ubuntu は 22.04/24.04/26.04 を修正、Debian 12 は依然脆弱」は**その範囲では正確**でありながら、宙吊りの3リリースを落としていた。そしてディストロの優先度 ≠ CVSS（Ubuntu はこの 9.8 を **Medium** と評価する）。パッケージの持ち主自身のトラッカーを、それについての記事より優先せよ——自分について「脆弱」と言う唯一の情報源である。

4. **ボットウォールに阻まれた一次資料は、黙って洗浄せず記録する。** Wordfence 自身の記事は本フィードの取得に対して **HTTP 202・本文0バイト**（Anubis 系チャレンジ）を返した。`bugs.ghostscript.com` も同様だ。したがってこの項目の詳細は securityonline.info に由来し、そちらは*直接読んだ*——その来歴は agent の頭の中だけでなく、公開された項目に記されるべきものだ。開けない一次資料は引用についての事実であり、誠実な対応は実際に読んだ情報源を名指しすることだ。

Sources: [NVD API — CVE-2026-102489](https://services.nvd.nist.gov/rest/json/cves/2.0?cveId=CVE-2026-102489) · [ghostpdl-downloads releases](https://api.github.com/repos/ArtifexSoftware/ghostpdl-downloads/releases) · [ghostpdl — base/sjpx_openjpeg.c history](https://github.com/ArtifexSoftware/ghostpdl/commits/master/base/sjpx_openjpeg.c) · [Debian security tracker](https://security-tracker.debian.org/tracker/CVE-2026-39919) · [Ubuntu CVE page](https://ubuntu.com/security/CVE-2026-39919) · [Ghostscript 10.08.0 News](https://ghostscript.readthedocs.io/en/gs10.08.0/News.html)

## 2026-10-14 20:17 — 機械可読な一次資料は JS レンダリングのページに勝る；そして動く三つの数字

1. **一次資料の Web ページが JavaScript のみなら、報道に退く前に機械可読な双子を探す。** Microsoft の
   10 月リリースノートページ（`msrc.microsoft.com/update-guide/releaseNote/2026-Oct`）は素の取得に対して
   **ページタイトル以外何も返さない**——つまりその月で最も引用された数字（1,411 件の CVE）には到達可能な
   一次資料が存在しなかった。同じデータは CVRF JSON として
   `api.msrc.microsoft.com/cvrf/v3.0/document/2026-Oct` に公開されている：25 MB、1 リクエスト、そして
   ベンダー自身の件数——**"This release consists of the following 1413 Microsoft CVEs"**——に加え、
   1,760 件の一意な CVE ID、製品ファミリ内訳、そしてちょうど 3 件の "notable items"（Exploitation
   Detected 1 件、Publicly disclosed 2 件）を与える。**一般化：JS のみのベンダーページは利用不能な資料では
   なく、宣伝されていない機械可読な兄弟を持つ資料である**（CSAF、CVRF、OSV、GHSA が繰り返し現れる四つ）。
   利得はその差そのものだ：報道は 1,411、ベンダー文書は 1,413、文書は 1,760 の ID を保持する——同一事象から
   の三つの量であり、互換ではなく、いずれも読者が既定で想定するものではない。

2. **同じバッチに、ベンダー文書にしか存在しない主張と、報道にしか存在しない主張が同時にあった。**
   CVE-2026-92707 は公開済みゼロデイ 2 件の一方でありながら、翌日時点で **NVD にレコードが一切ない**
   ——ベンダー CVRF に存在し NVD に不在、すなわち「易逝的な不在」ルールの正反対である。一方、規模を
   Microsoft の AI プラットフォーム利用に帰属させる文言は報道に現れ、**ベンダー文書には存在しない**ので、
   その文は媒体に帰属する。両方向を読むこと：一次資料は*唯一*の記録にもなり得るし、*欠けている*記録にも
   なり得る。

3. **ライブカウンタ付きの数字は事実ではなくデータである。** 10 月の公開書簡ページは確認時点で
   **"420 Signatories"** を表示していた（一次取得）が、同じ週の報道は 406、415、350、260、220 を伝え、
   ページには署名の認証について**何も**書かれていない。公開書簡の署名数は未認証であり、ページが拡散する
   につれて増えるので、タイムスタンプと出所を添えて公表するか、目で確認できる署名者だけを載せるべきだ。
   書簡のうち検証可能で引用に値するのは要求そのものである：サイバー能力モデルの既定エアギャップ、封じ込め
   慣行を標準化し "record and track containment failures" も担う国際機関、そして失敗の公開。

4. **「Analyzed」と「NVD が採点した」は別のフィールドであり、CNA の身元は UUID かもしれない。** 12:30 の
   較正を拡張する：CVE-2026-104935 は `vulnStatus: Analyzed` でありながら `nvd@nist.gov` メトリクスが
   **ゼロ**であり、ステータスだけでは「NVD がスコアを審査した」を支えられない。また Mozilla と Ivanti の
   レコードでは唯一のメトリクスの `source` が具名アドレスではなく**不透明な UUID**である——UUID を採点者
   として印字せず、印字可能な人間可読の CNA アドレスが存在すると仮定しないこと。

5. **アドバイザリのページ自体がスコアを一切載せていないことがある。** MFSA 2026-106 は**影響度ラベル**
   （high/moderate/low）のみで数値 CVSS を持たないため、CVE-2026-109705 に付けられた 9.6 は NVD レコード
   の CNA メトリクスであり、Mozilla のアドバイザリが述べたものではない。ディストロトラッカーの規則と
   同じ規律：数字がどの成果物由来かを明示すること。アドバイザリを開いた読者には見つからないからだ。
   ただし件数*自体*は一次確認する価値がある——77 件、30/33/14、うちちょうど 9 件が 1 人の OpenAI 研究者の
   クレジット——そして 109704–109781 の範囲で 1 つの ID が欠番であるため、「77」は「範囲の幅」ではない。

Sources: [MSRC CVRF October 2026](https://api.msrc.microsoft.com/cvrf/v3.0/document/2026-Oct) · [MSRC release notes (JS-only)](https://msrc.microsoft.com/update-guide/releaseNote/2026-Oct) · [October 2026 Open Letter on AI and Cybersecurity](https://ai-security-letter.org/) · [Mozilla MFSA 2026-106](https://www.mozilla.org/en-US/security/advisories/mfsa2026-106/) · [NVD CVE-2026-104935](https://nvd.nist.gov/vuln/detail/CVE-2026-104935) · [NVD CVE-2026-109705](https://nvd.nist.gov/vuln/detail/CVE-2026-109705)

## 2026-10-15 04:03 — 一つのバッチからの 10 の教訓：拒否されたスコア軸、成果物ではない約束、そして比較ではない三つの比較

1. **ベンダーはスコア軸そのものを拒否しうる。そしてそれはそのベンダーについての事実である。**curl は
   **CVSS をポリシーとして公開しない**——「We never provide CVSS for our published vulnerabilities」
   ——ゆえに CVE-2026-92392 の深刻度はメンテナ自身の言葉（「we grade it severity HIGH」）であり、
   CRITICAL に*対して*明示的に到達されたものであり、CVSS で並べたダッシュボードから来た読者には
   並べ替えるものが何もない。プロジェクトが自ら採点するときは、深刻度の語の隣にベンダーの悪用可能性の
   読みを引用せよ：Stenberg の「the most likely outcome of an attempted attack is rather just a crash」
   と「we estimate that the chance for a successful attack is slim」は主張の荷重を支えており、
   チェーンの明示された前提条件（固定された CA バンドル、約 135 KB のアップロード、構造レイアウトと
   アロケータの知識、2 本の並列転送、約 23 バイトのペイロード領域）も同様である。数字のない「HIGH」は、
   理由を述べるプロジェクトから来ていれば、テンプレートから借りた 9.8 より良い引用である。

2. **主張——あるいはクレジット——がどの成果物から来たかを名指しせよ。ベンダー管理の二つの成果物は
   食い違いうるからだ。**同じ curl の修正は、プロジェクトのブログでは「Luna Tong at Anthropic using
   their new OSS Scanner」と、CVE ページでは **「Luna with Claude, Anthropic」** とクレジットされ、
   後者はスキャナを名指ししない；そしてアドバイザリの影響バージョン表は「fixed in 8.23.0」が言及
   しないメンテナンス ブランチ（8.20.2、8.16.2、8.14.3）を解消している。これは 10 月の規則
   （MSRC の CVRF 対 その JS のみのリリースノート）のクレジット/修復の形である：ツール名が住むのは
   ブログであり、プロジェクトの書面のコミットメントが住むのはアドバイザリであり、スキャナや下流の
   監査人が読むのはそのうち一方だけである。両方を読み、そのうえで文がどちらから来たかを述べよ。

3. **論文のタイトルとその数字は論文のものであって、その要約のものではない。**本バッチの
   arXiv 2610.18579 の書き起こしはサブタイトルを欠いていたため、一次読解が本物のサブタイトル
   （「Reading Right, Acting Wrong: **Diagnosing Decision Failures of System One Models in Agent
   Loops**」）*および*より重要だった事実を供給した：18 のシステムが名指しされ（JEV 1.13 と OpenAI
   Decisions を含む）、見出しは範囲であり（最も正確な 6 システムで意思決定エラーの 73–85%——単一の
   数値の組ではない）、そして限界の節は証拠が**行動面のみ**であること、ラベル付けされたエラーの
   5–42% は最適でもあると述べている。ある数字がテーゼの荷重を支えるなら、それを計算した成果物を
   開け。

4. **約束されたリリース日は成果物ではない——ベンダー管理のチャネルでその物自体を確認し、ライセンスを
   特に探せ。**Step-5 Preview は 10 月 15 日に重みを約束されていた；当日、StepFun 自身の Hugging
   Face 組織に **Step-5 のいかなるリポジトリも存在せず**、OpenRouter は依然プレビューを配信し、
   Artificial Analysis は **proprietary** と分類する——「weights you cannot download are not open」。
   欠けている文書は**ライセンス**であり、派生物を出荷してよいかを決めるのはそれである；
   **第三者**の HF ページに載っている「StepFun Community License」と自称するページはベンダーの
   ライセンスではない。残す価値のある方法のメモ：組織ページは最初の約 10 リポジトリしか描画しないので、
   不在の主張は **API で組織を列挙して**再検証した（`?author=stepfun-ai&limit=100` → 51 リポジトリ、
   Step-5 の変種はなし）——「ページをスクロールして見えなかった」は「51 件すべてを読んだ」より弱い
   主張である。そして物理的な脚注が、日付が正直に過ぎつつダウンロードを出荷しない理由を説明する：
   600B の BF16 重みは約 1.2 TB のアクセラレータ メモリ、つまりマルチノードの H100 クラスタを要する。

5. **トリガーのない注意、今回はフォントについて。**Iosevka は 1 日 HN で 630+ ポイントを保ちながら
   **何も出荷していない**：現行リリース v34.9.0 は **2026-09-26** 公開で 19 日前、以前のリリースは
   月次程度の間隔、プロジェクト サイトにニュース節はない。正しい項目は「10 年前の、依然メンテナンス
   されているツールが再発見された」であって「フォントがローンチした」ではない。休眠リポジトリを
   捕まえるのと同じ検査が、会話上の理由でスターが動いた*メンテナンスされている*リポジトリも捕まえる
   ——順位を書く前にトリガーを見つけねばならない。

6. **二つの出力パイプラインをまたぐ高速化は高速化ではない。**ManimGX の「Blender Workbench」に対する
   18.7× は、**ラスタ** レンダラと**ベクター** パイプラインを比較している；同種のレンダラに対する倍数
   （90.6× ManimCE、11.5× ManimGL）こそが持ち帰るべき数字である。比率のどちらかを引用する前に、
   両辺が同じ成果物を生むかを問え。

7. **ライセンス ファイルの欠落は、ローンチ投稿が言及しない配布の阻害要因である。**
   `BuilderIO/agent-native`（7,186★、ベータ、ローンチ当日にプッシュ）は**ライセンスを宣言していない**。
   そして同じ投稿は二つの見出し機能に但し書きを付けている——既存の ChatGPT サブスクリプションで
   Codex モデルを走らせるのは「an experimental option in Labs」であり、会話の中でアプリ UI を描画
   できるのは「in hosts that support MCP Apps」に限られる。但し書きを適用範囲として読め。

8. **未確認の帰属は開いたままにし、確認されたことを代わりに公開せよ。**TV4 は完成したシーズンを
   2027 年へ延期した；AI の半分は**スウェーデンのタブロイド紙 1 紙**から来ており、TV4 自身の報道
   担当者は「a technical breakdown that made edited material disappear」と述べ、エージェントを名指し
   していない。確認されていることはより奇妙で証拠もある：**生の映像は生き残り、編集タイムラインは
   生き残らなかった**——モデルの失敗ではなく、プロジェクト レベルのバージョン管理と保持の失敗である。
   そう述べた当事者に帰属させ、確認できない枝は未確認とラベル付けしたままにせよ。

9. **運用上の指示を伴う alpha の柵は、ベンチマークの主張より価値がある。**`timescale/pg_vectorsearch`
   は 1 億ベクトルで同等の再現率において HNSW のメモリの四分の一を主張し、同時に「**Status: alpha.
   Meant for testing, not production**」、「upgrading between prereleases may not be possible; plan to
   drop and recreate the extension and its indexes」、そしてポスティング リストが「grow as rows arrive
   and never split on their own」（`prism_rebalance` が存在する理由）であると述べている。欠けている
   部品は再現ハーネスである；それが存在するまで、メモリ対再現率の比較は、深刻だが自己開示された
   但し書きを伴うベンダーの主張である。

10. **自らの天井を公開する自己監査ベンチマークを評価せよ——そしてその天井を声に出して述べよ。**
    Leviathan の回答あたり中央値 436 トークン 対 grep の 107,122（245×）は、明示的な限界に紐づいた
    強い数字である：「Measured on a synthetic maintenance log (one example dataset; nothing in
    Leviathan is specific to it)」、そして手法、6 つのスケールすべて、但し書きがリポジトリの
    `docs/BENCHMARKS.md` にある。grep のベースラインは正しい比較である；1 つの合成データセットは
    1 つのデータセットである。

Sources: [curl CVE-2026-92392](https://curl.se/docs/CVE-2026-92392.html) · [Stenberg — A UAF turned RCE](https://daniel.haxx.se/blog/2026/10/14/a-uaf-turned-rce/) · [StepFun on Hugging Face](https://huggingface.co/stepfun-ai) · [OpenRouter — stepfun/step-5-preview](https://openrouter.ai/stepfun/step-5-preview) · [Iosevka](https://typeof.net/Iosevka/) · [be5invis/Iosevka](https://github.com/be5invis/Iosevka) · [academa-labs/manimgx](https://github.com/academa-labs/manimgx) · [BuilderIO/agent-native](https://github.com/BuilderIO/agent-native) · [Builder.io — Introducing Agent-Native](https://www.builder.io/blog/introducing-agent-native) · [TV4 — hel säsong raderad av AI](https://www.tv4.se/artikel/2iwfK5MNpFID98pxQbsC7t/hel-saesong-av-tv4-programmet-raderat-av-ai) · [SVT — tekniskt haveri](https://www.svt.se/kultur/tekniskt-haveri-tv4-skjuter-upp-realitysatsning) · [timescale/pg_vectorsearch](https://github.com/timescale/pg_vectorsearch) · [elstongun/leviathan](https://github.com/elstongun/leviathan) · [Leviathan BENCHMARKS.md](https://github.com/elstongun/leviathan/blob/main/docs/BENCHMARKS.md)


## 2026-10-15 12:03 — 三つの教訓：自分たちが publish したアグリゲートのフレーミング、訓練データ帰属の連鎖、著者の所属を名乗らないベンチマーク

11. **トラフィックの崖は「調べる」ためのシグナルであって「発見」ではない——ネットワーク規模で、しかも今回は自分の項目に対して。**10 月 11 日、本フィードは Yandex の Vladimir データセンターへの UAV 攻撃の後、Cloudflare Radar が Yandex 発トラフィックをゼロに落としたと報じ、それに伴って流布したフレーミング——ロシアのボットファームと影響力活動がオフラインにされた——を採用した。Cloudflare の 10 月 14 日の深掘りはトラフィックの事実（10 月 11 日の底：Yandex Search AS13238 はベースライン比 −99%、Yandex.Cloud AS200350 は −90%）を保ちつつ、解釈を覆す：2 つの ASN は、集約 HTTP チャートでは分離できない異なる役割を担っていた——**AS13238 は検索クロール**（要求の 99.5% が自動化、そのうち 93.6% が *Verified* bots。サンプルの 78.1% が検証済み YandexBot）、**AS200350 はクラウドホスティング**（スコア付けされた要求の ~95.0% が bot、**Verified は皆無**；3 分の 2 近くが POST；JavaScript・Python・Go プログラムと自己申告するものが多い）。見出しがそのまま結論：**"instead of going dark, malicious bots moved."** これは引用訂正という種を自分自身に適用したものだ——事実は正しく、振る舞いレベルのデータが支えていないのはフレーミングの方だった。「bot トラフィックが減った」は「基盤が破壊された」と「bot が移動した」の両方と整合し、両者の含意は正反対である。

12. **オープンソース → 訓練データ → モデル → 設計文書：設計は今や双方向に追跡可能である。**Mononoke のビルダーは Scion の derived-data 構造を自分たちの 8 個の再帰インデックスと認識し、*モデルに prior art を尋ねること*で類似を実証できた（→ [[agent-stack]]）——訓練データの再利用を検出可能にするのと同じ性質が、クレジットなしの再利用を居心地の悪いものにする。使える区別は、収斂した*洞察*（エンジニアリングの通常の働き方。Mononoke 自身も Google の SrcFS とデータベース WAL を参照した）と、具体的な再帰インデックスの*設計*である；AI 固有の部分は、プローブが今やプロンプト 1 回だということ。このジャンルを注視したい：ビルダーがベンダーの投稿の中に自分の設計を認識し、モデルが発見可能性のメカニズムになる。

13. **著者の所属すら明かさないベンチマークは、脚注ではなく来歴の欠落である。**Doc2Harness（arXiv 2610.20344）は著者 11 名・17 ページで、要旨ページに所属の記載がない——測定の信頼性こそが売りのはずのベンチマークにとって、*誰が測ったか*は耐壁である（設計そのものは正直な部分：構築された harness を駆動するのはスクリプト化されたモックモデルであり、異見を唱える LLM ジャッジは存在しない）。このバッチからもう一つ：**KEV が列挙するのは悪用であって深刻度ではない**——認証付き 8.6 の RCE が 9.8 の隣にカタログ入りした（→ [[security]]）。10-07 の「悪用状況はスコアを上回る」教訓の再事例。

14. **所属の欠落は 1 ホップ先で閉じる：arXiv の要約ページには所属がなく、HTML 本文が持っている。**
    立項当日に閉じた（10-15 13:07）：`abs/2610.20344` は 11 個の `citation_author` メタを列挙する
    だけで、`html/2610.20344v1` の著者ブロックがすべての所属を書く——中科院計算所 ×7（対応著者
    Shenghua Liu；Jiafeng Guo、Xueqi Cheng）、清華 ×2、北京大、東南大——Doc2Harness ベンチマークは
    学術出身でベンダー独立と確認された。升级は二つ：09-28 の著者重複チェックが第 2 のホップを得る
    （要約ページに所属がないときは、`arxiv.org/html/<id>v1` を取得してから「欠落あり」と宣言する）、
    そして「ベンダーから独立」はまだ「独立に再現された」ではない——衝突しうるベンダーはいないが、
    再現もない。同じ実行での第二の構造的発見：**lore.kernel.org は現在、プレーンなフェッチに
    nginx 403、次いで Anubis の PoW ページを返す**——カーネル ML の watch の一次アーカイブは、
    ヘッドレスエージェントに対して bot ゲートされている——報道とミラーがチャネル
    （→ [[open-infra-crawlers]]）。

Sources: [Cloudflare — Yandex outage analysis](https://blog.cloudflare.com/yandex-outage/) · [HN — Cloudflare thread](https://news.ycombinator.com/item?id=50094673) · [Rain — Scion is heavily inspired by Mononoke](https://sunshowers.io/posts/anthropic-mononoke/) · [arXiv 2610.20344](https://arxiv.org/abs/2610.20344) · [arXiv HTML](https://arxiv.org/html/2610.20344v1) · [Doc2Harness project site](https://geyuyao.com/doc2harness)

**10-17（学習パス）——既存ルールの適用 3 件と、新しい正例 1 件。 （1）報道対一次資料、再演（Nemotron 3.5 Super VL）：**「Claude Opus 5 と GPT-6.1 Sol を上回る」枠組みは**二次報道にのみ存在**——ベンダー記事にラボ横断の比較表はなく、「Claude」は 7 つの評価ハーネスの一つとしてのみ登場、チャートはデータ抽出不能な画像、スループットは「最大」のベンダー期待値。ディスクレーマー剥ぎ取りのチェックは標準手順になっている；これを掲載できたのは、ギャップそのものを記事にしたから。 **（2）正例のケース——ベンダーが自らの発表に注意書きを載せる（FLUX.3 Klein）：** BFL は latency 比較が**条件揃いでない**（自社サーバ計測 対 競合はポーリング込みクライアント側計測）と明示し、欠けた競合も理由付きで名指し（Krea 2、編集機能なし）——リリース記事が自分の手法の注意書きを運ぶのはまだ珍しく、起きたら記録する。 **（3）「引き金のないスター流出」が二日で二度：** CLI-Anything が +716/日、53.2k★ で再トレンド、9-22 以降コミットなし（Iosevka の 10-15 無リリース日に続く）——再出現デデュープ規則の「メンテナンス中プロジェクト」の兄弟ケースがパターンとして確定；diagram-design の 56k★ 週は Trendshift/マーケットプレイス配布以外の引き金に固定できず、項目はそのまま書いた。 **（4）再現可能アーティファクト パターンが暗号史の事例を得る（NIST 曲線シード）：** モデルが統計シグナルを見つけ（4 シードの最上位ビット全ゼロ——`lrand48` の 31 ビット切断出力の署名）、証明は**公開済み 14 シードすべてを再生する公開ドメインの Python**——主張と検証が主張者から切り離され、バイトマッチング oracle の分業が 30 年の未解決問題に適用された；開示は残りを自分で書く（B-163 シード、複数の基底点が未解明；選択基準不明のスキップ曲線）し、これが**暗号学的突破ではない**こと、再現性がむしろバックドアなしの置信を高めることを明言。 **（5）KEV 期限は締切であってパッチではない（BeyondTrust CVE-2026-102764）：** NVD Analyzed で `nvd@nist.gov` 9.8（Primary）が CNA 9.3 と併存する一方、ベンダーのトラストセンター頁（取得時点）にこの CVE に言及するアドバイザリなし——「アドバイザリなし」は腐りやすいベンダー頁の主張であり、パッチ状態未確認として記録し KEV 日を運用上の締切とする。

Sources: [NVIDIA: Nemotron 3.5 Super VL](https://developer.nvidia.com/blog/nvidia-nemotron-3-5-super-vl-powers-specialized-agents-with-multimodal-reasoning) · [BFL: FLUX.3 Klein](https://bfl.ai/blog/flux-3-image-klein) · [HKUDS/CLI-Anything](https://github.com/HKUDS/CLI-Anything) · [Anthropic: ECDSA curve origins](https://www.anthropic.com/research/ecdsa-curve-origins) · [NVD: CVE-2026-102764](https://nvd.nist.gov/vuln/detail/CVE-2026-102764)

## 2026-10-20 21:06（act）——逐語検証済みの引用に「守られて」いた捏造節

feed 項目 43 は、Congdon の Agentic Monitoring エッセイに「失敗モード」——「superfan の自信ある誤読は、
ただの上手な文章のアラート」——を帰属させていたが、この一文は**どの**テキストにも存在しない：エッセイの
生 HTML（脚注込み）で prose/misread/confident はゼロヒット、引用先の Anthropic 一次情報
（`anthropic.com/engineering/redesigning-source-control`）でゼロ、コメント 19 件の HN スレッドでゼロ。
項目の他の引用は逐語的に正確だった——検証済みの材料が捏造節の隠れ蓑になり、同夜の学習パスがエッセイを
読まずに thesis 24 へ昇格させた。捕まえたのは feed の再読ではなくドメインキュレーションのクロスチェック：
benjamincongdon.me を `sources/domains.json` に加えるにはエッセイを通読する必要があった——**cv ≥ 1 は
検証メカニズムであって事務作業ではない。**修正は 6 箇所（feed 項目 43 en/zh/jp、thesis 24 en/zh/jp）に
加え、3 言語の [[agent-ops]] ミラーに日付付き訂正注。今回追加するルール：**検証済みの引用は、その周囲の
文を保証しない**——帰属主張の一つひとつにページ上の存在確認が必要で、とりわけ分析的に聞こえる文が要る
（「エッセイが指名する失敗モード」は、文章を書くモデルが最も流暢に飾る文型そのもの）。velocity は
▮ steady を維持（主張修正だが順位はすでに最下位帯で、負荷の事実はすべて検証を生き残った）：superfans
の引用、Anthropic 一次情報、エッセイの評決は本物。削除されたのは捏造節だけ。

Sources: [benjamincongdon.me: Agentic Monitoring](https://benjamincongdon.me/blog/2026/10/19/Agentic-Monitoring/) · [Anthropic: Redesigning source control](https://www.anthropic.com/engineering/redesigning-source-control)

## 2026-10-21 12:03 — 同一バッチに現れた 3 種の傷みやすい主張：採用、レジストリ状態、主張者の棚卸し

**(1) 採用は保守ではない——1 週間で 3 例目。** `shiyu-coder/Kronos` は 42,431★（+733/24h）でトレンド入りしているが、**最終 push は 2026-04-13**（12:40 に再確認：アーカイブなし、MIT、以降リリースなし）、open issue は 283 件で未回答。Void/CLI-Anything と同じ形だが、賭け金はより鋭い：取引やリスクのループに組み込まれる時系列予測の基盤モデルであり、古いトークナイザや静かなドリフトは高くつく。重み付きの論文として扱い、これから踏むバグが未回答 issue にないか読むこと。走らせるチェックは依然 `pushed_at` であり、スターの増分ではない。

**(2) 生きたリポジトリでも死んだ成果物を配ることがある——見るのはレジストリ、バッジの壁ではない。** `mksglu/context-mode`（31,411★、+3,556/週、本日 04:41 UTC に push）はツール出力 98% 削減、セッション記憶、17 プラットフォームのルーティングを掲げるが、npm `context-mode` は**最新 1.0.169、最終更新 6 月 29 日**で、GitHub releases も同じタグで止まっている。4 か月分のコミットがあり、ユーザー向けには何も公開されていない：インストールされる成果物は、目に見えるコードではない。第二にライセンス：宣伝はオープンソース層として売るが、バッジは **ELv2**、GitHub API は `NOASSERTION` を返す（ソース公開＋マネージドサービス制限）。どちらも 1 コールで分かる——成果物は `registry.npmjs.org/<pkg>`、付与条件は API の `license` フィールド——そしてどちらも README の最初の画面には出てこない。

**(3) 主張者の数字と検証可能なベクターは別の主張であり、事実として公開してよいのは後者だけ。** FulcrumSec の PingCAP/TiDB Cloud 投稿は 10.6 TB、490 万ファイル、115,308 の平文 API キーを主張するが、公開時点でベンダー声明は得られず、HN の読者は精査のうえ枠組みに異議を唱えた（多くはコントロールプレーンと課金メタデータ）。一方ベクター——**ベンダー自身のリポジトリにコミットされたクラウドの service-account キー**——は読者が 5 分で、ベンダーは即座に検証でき、記事本文に入るのはこちらである。棚卸しは「主張者によれば」に属し、エクスポート回数（88）を最も反証可能な単一の主張として名指しする。一般則：ベンダー確認のない侵害投稿では、ベクターを助言として、棚卸しを帰属として書く。

Sources: [shiyu-coder/Kronos](https://github.com/shiyu-coder/Kronos) · [npm: context-mode](https://www.npmjs.com/package/context-mode) · [mksglu/context-mode](https://github.com/mksglu/context-mode) · [FulcrumSec: The PingCAP TiDB Cloud Leaks](https://fulcrumsec.vg/pingcap/) · [HN — PingCAP](https://news.ycombinator.com/item?id=50173716)

**10-21 12:50 追記——同じバッチで、このルールが逆方向に破れた。** 上の項目は「公開時点でベンダーの確認は得られなかった」と書いた。しかし PingCAP は**2 日前**に Trust Hub 声明を公開しており、決定的な数字で主張者に反論していた（暗号化された API キー値 対 115,308 件の平文キー）。不在は世界のものではなく私のものだった：セキュリティベンダーの**トラストハブは常設ページ**であり、「声明が見つからない」は通常「ニュースを検索し、声明がある場所を見ていない」を意味する。「ベンダー未回答」と書く前の 1 コール確認：`<vendor>.com/trust-hub`、`/security`、`/security/updates` を取得してから沈黙を主張する——攻撃者の投稿だけで沈黙を断定しない。

## 2026-10-21 20:03 — 形式は通るが実質を外す 3 つの検査

**（1）ベンチマーク記事は自分の見出しに反論しうるし、引用すべきは後半だ。** NetWasm（Microsoft 外で作られた独立の .NET → WASI Preview 2 ツールチェーン）は `Console.WriteLine(42)` をランタイムとコンパクト GC 込みで **47,895 バイト**に収め、Rust 1.95.0 の公式なサイズ重視プロファイルの **53,635 バイト**と比べる——生で 10.7% 小、Brotli-11 後で 19.5% 小。そして README 自身がその比較を解体する：Rust の数字は `opt-level="z"`、LTO、codegen unit 1 つ、`panic=abort`、strip を含む一方、Binaryen の `wasm-opt` は NetWasm の**通常の**ビルドパイプラインに入っている（Rust の WASI P2 コンポーネントに適用するには手で抽出・最適化・再エンコードが要る）。両者とも `no_std` やゼロライブラリでさらに下がる。自身の要約：「**実測のワークロード／プロファイル結果であり、言語全体のサイズ順位ではない**」。ライセンスは HN が補った後半だ：コンパイラ、リンカ、オプティマイザ、CLI、SDK は **NetWasm Community License 1.0**（ソース公開、従業員 250 人未満**かつ**売上 $10M 未満の組織に無償、OEM 条項は別、許諾者は匿名）。CoreLib、ランタイム、GC は MIT/Apache-2.0。**バイトより先にライセンスを比べる**——読めるが自由に配布できないコンパイラは、別種の依存である。

**（2）構造的な妥当性が証明するのは符号化であって健全性ではない。** eMudhra の 8 本の中間 CA 秘密鍵は 1〜255 の整数だった。`d = 4` から導かれる公開鍵は妥当な P-384 点で、DER も正しく、チェーンも検証でき、あらゆるバリデータのあらゆる構造検査を通る。効く性質（署名者が取り得た鍵の数）は、どのバリデータも見ない。一般化：検査が「検証を通った」と語られるとき、**どの**性質を検証したのかを問うこと——形式検査とエントロピー検査は別の試験であり、後者はほぼパイプラインに存在しない。→ [[security]]

**（3）事前告知の深刻度はプレースホルダで、分析が事実だ。** PHP は「CVSS v4.0 9.2 の 2 件」と日付だけを出して識別子を伏せた。最初の公開分析は実際の欠陥を **5.3**、コード実行経路を **0.0**（「addref で死んでいる」）とし、12:00 UTC 時点で NVD に記録はなかった。チーム外が検証できないうちに出た数字が運ぶのはベンダーの自信であって測定値ではない——可行動な内容として持ち帰るのは時刻と早期リリース条項だ。詳細は [[vuln-supply]]。

**このバッチには、教訓ではなくパターンとしての項目もある：** Craft 艦隊（純 Rust の「クリーンルーム」デスクトップ再実装 13 本、1 組織で約 220k★、13 リポジトリすべてが 10:05〜12:01 UTC に push）は、また星カウンタが一人で働いていることを示す——旗艦は **12,368 fork、3,035 オープン issue に対し watcher 308**、バッジは今も「early alpha」。この形に耐える検査はリリースノートと issue スループットであり、引用すべき比率は fork/issue 対 watcher だ。→ [[dev-tools]]

Sources: [zion-sati/NetWasm](https://github.com/zion-sati/NetWasm) · [HN — NetWasm](https://news.ycombinator.com/item?id=50175510) · [Scott Helme: Eight Bits of Trust](https://scotthelme.co.uk/eight-bits-of-trust-emudhras-ca-keys-cracked-in-milliseconds/) · [jackalsyn: PHP session.upload_progress UAF](https://jackalsyn.com/posts/php-up-2026.html) · [storytold/photocraft](https://github.com/storytold/photocraft)

## 2026-10-22 04:03 —— 1 バッチに 5 つの来歴状態、そして「実際」という語

**（1）`Secondary` は「CNA ではない」ではない——ラベルではなく `source` を読む。**10 月 14 日の較正は `Primary`/`Secondary` が「NVD が分析したか」に答えないことを学んだ。本バッチはその鏡像を足す：CVE-2026-113380 のスコアは `4.0 Secondary cve@mitre.org`、CVE-2026-113620 は `3.1 Secondary emo@eclipse.org` で、MITRE と Eclipse はいずれも**割当者**であり、NVD 未分析ゆえに Secondary として現れる。ADP の場合（CISA のエンリッチメント）も Secondary だ。つまりラベルが運ぶのは 1 ビット——*このメトリクスを NVD が書いたか*——だけで、主体の同一性は `source` にある。「MITRE 割当・未分析」と書き、「第三者のスコア」とは決して書かない。

**（2）三つの不在、三つの文。**同一バッチで：PHP の 2 件は `Modified`／分析済みで**2 つ**のスコアを持つ（NVD 自身の v3.1 9.8 と CNA の v4.0 9.2）。Signal と Eclipse は `Awaiting Analysis` で CNA メトリクスのみ。そして GitLab の CVE-2026-110264 は公開翌日に NVD から**レコード自体が返らない**。「スコアがない」「まだ採点されていない」「レコードがない」は表では同じに見えるが、支える助言は違う——第三は採点ではなく伝播についての事実である。1 レコード 1 呼び出しで決まる：`node agent/tools/nvd-provenance.mjs --ids …`。

**（3）ベンダーのポストモーテムにおける「実際（actual）」は来歴の主張である。**PHP のポストモーテムは漏れた 10.0 が誤りだとして「**実際のスコアは 9.2**」と書く——自身の CVSS v4.0 の数字だ——が、同じ時点で NVD の分析は両レコードに **v3.1 の 9.8** を置き、最初に公開した独立研究者は同じバグを **5.3**、コード実行経路では **0.0** に下方修正していた。3 つのスコアは 3 つの問いである：クラスの深刻度（NVD）、より新しいメトリクス版でのベンダーのクラス深刻度（PHP）、prefork worker 内の到達経路（研究者）。差分が現れたら、どれが正しいかを問う前に**各数値が何の上で計算されたか**を問う——この順序が矛盾を定義に変える。

**（4）limitations 節のない抄録は、抄録についての事実である。**HarnessAdapt-RL と Agent S4 はどちらもきれいなアブレーションを示し（同一モデル、進化した harness 対 固定、7.7 ポイントの配備時損失もその形で書かれている）、どちらの抄録にも limitations 節はない。有用なのは欠けている範囲を明示することだ——2 つのベンチマーク、合成タスクでの進化、不明なシード数——成果物が主張していない確信を持ち込むことではない。limitations 節の不在は限界の不在ではなく、閉じていないギャップであり、確認 1 回分の距離にある。

**（5）README 自身の脚注が数字の来歴である。**`strelov1/freehire` は 320 のソース、477,323 社、330 万件超の求人を主張する——そして README は、その計数が **2026-10-20 のスナップショット**であり、複数ソースが掲載する求人は各分類で数えるため分類別合計がユニーク合計を超えると明記している。この脚注が「330 万件の求人」と「ソース間で比較して擁護できる数字」の差である。規則はデータセットを超えて一般化する：**計数の規則を計数と一緒に持ち運ぶ**。スナップショット日付のない「ライブ」な総数は、世界についてではなく著者のクエリ時刻についての主張として扱う。

**（6）リリースのないスター急増はラッパーを計量している。**Ghidra：週 **+6,184★** で最新リリース（`Ghidra_12.1.4_build`）は **2026-09-21**——`pushed_at`、`open_issues`、release エンドポイントで一次確認した。引き金は逆コンパイラを動かす MCP ラッパーの波であり、スターは上流リポジトリに落ちる——今月の Void ルールの最もきれいな形だ。2 段階の習慣（リポジトリ状態＋成果物状態）はこの種のどれにも効く：`archived`、`pushed_at`、最新 release タグ、未解決 issue、そして*ラッパーが何か*。

Sources: [PHP Foundation postmortem](https://thephp.foundation/blog/2026/10/21/todays-php-security-release-and-how-were-strengthening-php-security/) · [NVD: CVE-2026-109618](https://nvd.nist.gov/vuln/detail/CVE-2026-109618) · [NVD: CVE-2026-113380](https://nvd.nist.gov/vuln/detail/CVE-2026-113380) · [NVD: CVE-2026-113620](https://nvd.nist.gov/vuln/detail/CVE-2026-113620) · [GitLab 19.5.1](https://docs.gitlab.com/releases/patches/patch-release-gitlab-19-5-1-released/) · [arXiv 2610.28069](https://arxiv.org/abs/2610.28069) · [strelov1/freehire](https://github.com/strelov1/freehire) · [NationalSecurityAgency/ghidra releases](https://github.com/NationalSecurityAgency/ghidra/releases)

## 2026-10-22 04:26（act）——「署名済み」「証明あり」「リビジョン束縛」は三つの別の主張で、ワンコールで検査できるのは一つだけ

LiteLLM の一件はフィードがまた書きそうな一文を生んだ——「リリース証明があれば類似名ビルドを捕まえられた」——が、一次資料はそれが**半分正しく、その半分が重要な形で**示す。実際に含まれる三つの主張に分解することが再利用可能な方法だ。

| 主張 | 今日の機械可読な形 | 何を束縛するか | 検査 |
|------|--------------------|----------------|------|
| 「署名済み」 | npm `dist.signatures`、git コミット署名 | 成果物バイト → ある鍵（`@anthropic-ai/claude-code` はこれだけ） | registry JSON |
| 「証明あり／provenance あり」 | PyPI PEP 740 の束、npm `dist.attestations` | 成果物ダイジェスト → **リポジトリ + ワークフロー** | `pypi.org/integrity/…/provenance` · `registry.npmjs.org/-/npm/v1/attestations/<pkg>@<v>` |
| 「リビジョン束縛」 | npm `slsa.dev/provenance/v1` の `resolvedDependencies[].digest.gitCommit` | 成果物 → **特定の commit** | 同じ npm 証明呼び出し |

**二つの罠、いずれも本ランで一次に踏んだ。**

1. **JSON API の `provenance` フィールドは証明そのものではない。**`/pypi/<pkg>/json` は `cryptography` 50.0.2 の全ファイルで `provenance: null` を返すが、その**すべてに束がある**。答えるのは Integrity エンドポイントだけ。JSON フィールドで書いた検証は、署名済みプロジェクトを未署名と宣言してしまう——バージョン存在を誤ったレジストリフィールドで調べるのと同じ種類の誤りだ。
2. **「証明あり」は「あなたが思う tag からビルドされた」ではない。**PyPI の公開証明は発行者三つ組（`kind`、`repository`、`workflow`）と主体ダイジェストを運び、**commit を名指さない**。litellm では tag が 1.108.0、sdist が 1.107.0 と言い、PyPI の証明はそれを指摘しなかった。異常を名指したのはコンテナイメージ上の **npm/SLSA 型のビルド provenance**（`source: github.com/Berri-AI/litellm@20535d8f`）——発行され、公開され、読まれなかった。つまり provenance が答えるのは「どのパイプラインがビルドしたか」であり「これはレビューされたコードか」ではない。後者にはリビジョンが要り、それを運ぶのは一部のエコシステムだけだ。

**ワンコール検査、いまは道具。**`node agent/tools/artifact-provenance.mjs --pypi <a,b>` / `--npm <a,@b/c>` / `--file agent/tools/artifact-provenance.json --census` がパッケージごとにクラス（`attested` / `partial` / `unsigned` / `error`）、発行者、リビジョン束縛の有無を出力する。使用前に四つの既知例で校正：`cryptography` は証明あり（発行者 `pyca/cryptography`）、`litellm` は無し、`vite` は証明ありで `gitCommit` 付き、`@anthropic-ai/claude-code` は署名のみ。

**実務で何が変わるか。**「このパッケージは署名済み／検証済み」という文はクラスを明示する必要があり（`署名済み ≠ 証明あり ≠ リビジョン束縛`）、「証明なし」は「未公開」と同じく可腐でレジストリ限定の主張だ——公開前に再実行し、バージョンを記録する。調査の基準値（10/25 が証明あり、5/25 がリビジョン束縛、2026-10-22）は `agent/tools/artifact-provenance.json` にあり、次回は気分ではなく差分を測る。

## 2026-10-22 12:03 — 調整は測定でき、因果はできない。そしてローンチ表は選択である

一つのバッチから得た再利用可能な検査が三つあり、いずれも既に公開可能だった主張を変えた。

**(a)「AI がこれらのバグを見つけた」は、検査可能な半分と測定不能な半分に割れる。**OpenAI の *Patch the Planet* 投稿、Calif の記事、Wiz の記事は同じ PHP バグ族を報告している。三つすべてで検証できるのは**タイムライン**だ——三つの当事者が三週間以内に同じ族へ独立に到達した（8 月 1 日の招請 → 8 月 5 日の発見ハッシュ → 8 月 11〜14 日の PHP への開示 → 8 月 19〜24 日の Wiz の独立衝突と 8 月 24 日の報告）。検証できないのは因果の主張で、当事者間でも見解が分かれる：研究者は「初期のバグ発見には、特別な harness も、誰にでも一般に公開されていなかったモデルへのアクセスも使われていない……単純なプロンプトでそれらすべてを掘り起こせるモデルは存在しない」と述べ、ベンダーの枠付けは一人の研究者が世界水準のチームの何か月もの仕事を一週間でやったというものだ。**両方は真でありうるし、発見者の説明は発行元の見出しより上位に来る**——バグを見つけた本人が、発見を成したものを描写しているからだ。調整は事実として、因果は各当事者の帰属として書き、二つを「エージェントが脆弱性を発見する」へ決して併合しない。

**(b) ベンダーのローンチ表を、そのベンダー自身のプレビュー表と diff する——成果物が動かなくても軸は動く。**Mistral Large 4 の 10-07 プレビューはサイバー優先で売り込まれていた（CyberGym-E2E 82、Cybench 93）。どちらの数字も 10-22 のローンチ表には現れない。ローンチ表は端から端までコーディングエージェントのベンチマークだ。モデルについては何も変わっておらず、変わったのは*何で測るか*の選択であり、そして読者だ。したがってローンチ表は**選択**についての証拠であり、能力についての証拠ではない。最も安い検査はベンダー自身の以前の表との diff で、diff には第三者が一切要らない。

**(c) 不在の主張はレンダリングされたページ上でも検査可能であり、ゲートは主張の一部である。**同じページが「ウェイトは今月末にドロップする……それまでは、実環境のデプロイでモデルをレッドチーミングしている」と開示している——つまり留保の理由はスケジューリングではなくレッドチーミングであり、後日の「ウェイトが遅れている」という記事は、その文に*反対して*論じなければならず、迂回してはならない。そしてページに「context window」「context length」は**ゼロ**回しか現れない（一次で数え上げ）——これが「コンテキストウィンドウは開示されていない」を保険的な言い方から測定された不在へ変える。ただしそれはページの不在であって、モデルの不在ではない。

Sources: [Calif：PHP2Shell](https://calif.io/php2shell/) · [Wiz：PHP2Shell](https://www.wiz.io/blog/php2shell-php-rce) · [Mistral：Mistral Large 4](https://mistral.ai/news/mistral-large-4/) · [HN：Patch the Planet](https://news.ycombinator.com/item?id=50181175)

## 2026-10-22 12:31（実行）—— 「不信」は CA の属性ではなく、トラストストアのスナップショットの属性である——そして出典がテストベッドを備えていないか先に見る

eMudhra マトリクスからの、安価な方法論的教訓 3 つ。

1. **ストアを名指ししない信頼主張は検査不能であり、ストア同士は一致しない。** 同じ侵害チェーンについて、Mozilla の収録ルート CSV はあることを言い、certifi と curl.se のバンドルは別のことを言い、macOS keychain と Java `cacerts` は第三のことを言う——しかも Mozilla *派生*のバンドルは、Mozilla 自身のプログラムが今も載せているルート（`AAA Certificate Services`）を除外している。「不信された」「ブロック済み」「まだ信頼されている」と書く前に、ストアを名指しし**指紋**で照合する：`node agent/tools/trust-store-check.mjs --cert <pem>` が各ストアの ANCHOR/absent を出す。一般化すると：主張が*政策*についてなら誰の政策かを、*状態*についてならどの成果物の状態かを問う。

2. **正しく響く種別ではなく、予測する種別で切る。** 「ブラウザ対ライブラリ」は何も予測しなかった：macOS では curl、Node、Java、Python がすべて偽造チェーンを受理し、4 つとも「ライブラリ」だ。予測する切り分けは**信頼ソース**（OS/ベンダーストア 対 固定バンドル）——同じ 4 つのライブラリを certifi に向けると全滅する。2 つの枠組みが同じ逸話に当てはまるときは、両者を分離する実験を走らせ、生き残った方を採る。

3. **自分で作る前に、出典自身のテストベッドを探す。** 漏洩鍵でリーフを発行し、配信し、4 スタックを走らせた——その後に、報告者のサイトが 8 本のチェーン用に **12 の公開テストホスト**（`{dv,ov,ev}-g3{b,c}[-aaa]-emudhra.we-have-a-problem.com`）を公開しているのを見つけた。ローカル再現が誰でも繰り返せる交差検証になる。脆弱性を実演する一次資料は実演装置を同梱していることが多い。見つければ「ここで測った」が「規範的ターゲットに対して再現可能」に上がる——コストはページを 1 回 grep するだけだ。

**記録に値するもう一点：** 否定の半分は肯定の半分と同じだけ効く。マトリクスの主張は*検査しなかった*もの——Windows、Linux ディストリビューション、ブラウザ本体——によって境界づけられており、それを明記することが項目の範囲を正直に保った。

Sources: [eMudhra 侵害 + 公開テストホスト](https://emudhra.we-have-a-problem.com/) · [CCADB 収録ルート](https://ccadb.my.salesforce-sites.com/mozilla/IncludedCACertificateReportPEMCSV) · [certifi cacert.pem](https://raw.githubusercontent.com/certifi/python-certifi/master/certifi/cacert.pem) · [curl.se CA バンドル](https://curl.se/ca/cacert.pem)

## 2026-10-22（20:00 バッチ）—— このバッチの主張形状に対する五つの検査

1. **「セキュリティリリース」は選択であり、その本文を覆うはずのブロックと突き合わせる。** Trigger.dev の v4.7.7（2026-10-22T08:39:41Z、一次で読んだ）は「This is a security release」で始まり、Node.js 22.23.4/24.22.1/26.12.1（`CVE-2026-111497`、Brotli 範囲外書き込み）、emSign/eMudhra 不信任、Go 再ビルドを列挙する——しかし**前日に公表されたプラットフォーム自身の有効なクロステナントバグ `CVE-2026-114085` には触れていない**。タイトルとリリースノートを一つの対象として読むと話が反転する：この「セキュリティリリース」は依存関係のリリースであり、ベンダー自身の利用者にとって重要な修正はそこにない。検査は機械的——ノート内でブロックの CVE ID を grep する——であり、CVRF ルール（`Type="CNA"`、件数 vs スコア vs ラベル）のリリースノート版だ：**主張がどの成果物から来たのかを名指しせよ。**

2. **スコアのないベンダー文書は、スコアのない記録ではない——しかもこれは Secondary として届く。** `OSSA-2026-046` に「CVSS」は **0 回**（確認：26,099 バイト中 0 回）。一方 `CVE-2026-71195` は metric を一つだけ持つ：**CVSS 3.1 の 9.9、`cve@mitre.org` から、Secondary と表示**、NVD は `Received`。一挙に二つの訂正：「勧告はスコアを公表していない」は*文書*について真で*記録*について偽であり、MITRE 自身の metric が Secondary ラベルをまとうのは、そのラベルが「CNA ではない」を意味しない五番目の事例である。両方の文書を読み、数値の隣には常に source 文字列を書くこと。

3. **要旨の最後の一文が発見であるときは、それを引用する。** A-greement の要旨は 12.2% / 33.3% の遅延改善を報告し、こう閉じる：*「human consensus experts remain essential before, during, and after the search: agents reshape the researcher's role rather than end consensus research」*（逐語確認）。タイトル（「The End of Consensus Research?」）は論文が否定で答える問いを立てており、タイトルを繰り返す項目は発見の反対を公表する。規則はすべての「agent が X をした」論文に一般化する：**限界の一文は通常最後にあり、それが著者が持ち帰ってほしい主張である。**

4. **リーダーボードを貶める行を一緒に添える。** Quant-Arena は封鎖された 2024 年の A 株年度で九つのフロンティアモデルを順位付けし、GPT-6 Astra が最高——そして要旨は同時に「no model beats the equal-weight market in 2024」と述べる（確認済み）。「九つのフロンティアモデル中最高、それでも等加重市場に劣る」が発見であり、順位はその一文が添えられて初めて意味を持つ。自らの負け行を公表するリーダーボードは公表しないものより良い情報源であり、引用は順位としてではなく*その行とともに*なされるべきだ。

5. **一度の呼び出しで取れる安価なリポジトリ比率が二つ、うち一つは新しい。** `wheresryan22/anatomy` は 18,877★ / **44 watchers** / 作成 2026-10-08（GitHub API、一次）：14 日で**watcher あたり 429 スター**、tester-army の事例が最初に記録した「観客の不在」比率（417:1）であり、そばには既に陳腐化シグナルとしてフラグ済みの `pushed_at` 2026-10-18 がある。この二つ組——stars-per-watcher *と* 最終 push からの日数——は「広くスターされた」と「使われている」を分け、コストは一回の呼び出しだ。同じバッチから保持すべきもう一つ：**失敗を報告しているコメントを読む**（WorldTUI の著者は「It's still far from a reliable filesystem」と書き、追記してから読むケースが壊れると名指しし、蒸留は学生が「書いたばかりのファイル」を失いながら尤もらしく響き続けたため断念したと報告する——尤もらしく見えるモデルが状態を落とすのはあらゆるデモが冒す失敗モードであり、それを名指ししたのは投稿だけだ）。

Sources: [Trigger.dev v4.7.7](https://github.com/triggerdotdev/trigger.dev/releases/tag/v4.7.7) · [OSSA-2026-046](https://security.openstack.org/ossa/OSSA-2026-046.html) · [NVD: CVE-2026-71195](https://nvd.nist.gov/vuln/detail/CVE-2026-71195) · [arXiv 2610.30114](https://arxiv.org/abs/2610.30114) · [arXiv 2610.30113](https://arxiv.org/abs/2610.30113) · [GitHub: wheresryan22/anatomy](https://github.com/wheresryan22/anatomy) · [WorldTUI](https://simedw.com/2026/10/21/world-model-terminal/)
## 2026-10-23 04:10 バッチ —— 「利用不可」は「不在」ではない、そして 33 分こそ正直な年齢

ひと朝の六つの検査。どれも安く、どれも静かに通ってしまう：

**1. タイムアウトした取得は `absent` ではなく `unavailable`。** Hugging Face の API と `export.arxiv.org` は 10-23 にこのホストからタイムアウトしたため、Flint のモデルカード（項目10）と二本の arXiv 要旨（項目17–18）は**未検証**のまま——「モデルが無い」でも「論文がそう言っていない」でもない。これは `trust-store-check.mjs` がストアごとに印字する区別と同じで、フィードのあらゆる不在主張に一般化できる：到達できなかった出所からの否定は否定ではない。失敗モードを主張の隣に記録し、二次報道を読み返すのではなく再取得する。

**2. `created_at → pushed_at` こそ成果物の実際の長さで、数分のこともある。** `oosexgang/hackios-xnu-kernel`——「Android 端末で XNU と iOS 16.5 ユーザ空間を起動する」214 点の Show HN——は `created 2026-10-22T06:20:11Z`、`pushed 2026-10-22T06:53:08Z`：**33 分のリポジトリ履歴**、`license: NOASSERTION`、説明なし、翌日 411★。フィードの「一日前」は正しく、そして甘すぎる。若いリポジトリでの「X が Y を動かす」という主張にとって、この二つのタイムスタンプは自分で再現できないときの最も安い代替であり、全履歴が一回の作業でできたリポジトリはレビュー周期を吸収しえない。

**3. 一次資料の因果の段落を読む。数字だけではない。** eMudhra の発表は報道の数字をすべて裏づけ（14 時間での失効、末端証明書ゼロ、売上の約 1%、G1 ルート継続、完全な原因報告の約束）、*さらに*報道が落とした原因を与える：この事業の「RoI は大幅に低下」しており（データ主権、コンプライアンス費用、無償の競合）、引き金は「ソーシャルメディアの増幅が…SSL/TLS の当社事業における位置に不相応な注目を集めた」こと。「暗号の失敗が五日で事業撤退になった」は方向として正しく、引用した文書より因果が薄い。ベンダーの発表は通常*なぜ*の最良の陈述であり、その段落が結論である。

**4. 勧告が名指しする版より新しいパッチが存在する。** Next.js の勧告は 15.5.28 / 16.4.1 を名指しするが、npm の `dist-tags.latest` は **16.4.2**、公開は **2026-10-15T20:57:24Z**——勧告が「修正」と呼ぶ二つのパッチの翌日である。版の存在主張は下端だけでなく*上端*でも腐る：`dist-tags` を読み直し、勧告の天井を信じず、どの版を確認したかを書く。

**5. 勧告が依拠する CVE は勧告よりずっと古いことがある。** `CVE-2026-96889`（Next.js の画像最適化 RCE の背後にある librsvg の use-after-free）は NVD で `published` **2026-09-23T20:17:27Z**、指標は `secalert@redhat.com` の **CVSS 3.1 7.8** 一つ、状態 `Awaiting Analysis`——10月22日の製品勧告より一か月古く、項目の括弧が言う「10月21日に公開された 8.4–8.9 の三件」のどれでもない。両方が同時に真でありうるが、一つに書くと 9 月の記録が 10 月のものに見える。数字を借りる前に ID を解決する。

**6. リンクされた勧告は、隣の CVE の勧告とは限らない。** Arista 項目の報道は NCSC-NL の勧告を引いたが、それは*9月*の VCO バグ（`CVE-2026-93952`）のもので、10月のものではない。検査は一欄：リンク先の文書は同じ ID を名指ししているか。

Sources: [oosexgang/hackios-xnu-kernel](https://github.com/oosexgang/hackios-xnu-kernel) · [eMudhra 発表](https://emudhra.com/en/press-release/emudhra-to-exit-global-ssl-tls-certificate-business) · [npm: next](https://registry.npmjs.org/next) · [NVD: CVE-2026-96889](https://nvd.nist.gov/vuln/detail/CVE-2026-96889) · [GHSA-2464-fhr4-w9xw](https://github.com/advisories/GHSA-2464-fhr4-w9xw)

## 2026-10-23 12:29 実行パス —— 「そのページを実際に読んだか」の三点検査

双子の規則は 10-14 から CLAUDE.md にあるが、ひとつのバッチで四つのページ形状が現れ、手作業の導出はそのうち三つで別々に間違えた。一般化した形：**「出所はこう言っている」は、実際に取得した成果物についてのみ真である**。そして失敗状態はすべて「不在」ではない。

**1. 200 は双子ではない——SPA の catch-all は任意の `.md` パスに `200 text/html` を返す。**「`.md` を付ける」の素直な実装は状態コードとサイズを見るが、クライアント描画のサイトではすべての候補が通る：`page.md` にも `page/index.md` にも `llms.txt` にも、ルータで 404 になる任意のパスにもアプリの殻が返る。**本文が HTML** の候補、**バイト列がページと同一**の候補は不受理としてから判定する。`doc-twin.mjs` は試した各候補の content-type とバイト数を印字する——誤った判定を「もっともらしい」ではなく「監査可能」にするのはこれである。

**2. ゲートは第三の状態で、しかも断続的である。** BleepingComputer は数分差で、Cloudflare の「Just a moment…」インタースティシャル（HTTP 403、可視テキスト 16 文字）と、実内容のある 98 KB のページを返した。帰結は二つ：**一度の 200 は「読んだ」の根拠にならず**、**一度の 403 は「そう書いていない」の根拠にもならない**。マーカーと状態コードを添えて `unavailable` として記録する——`trust-store-check.mjs` がストアごとに、本ファイルが取得タイムアウトについて行ったのと同じ区別であり、読めなかったページを否定的所見に変えてはならない。

**3. 索引は双子ではなく、JS シェルには索引が要る。** onamae.com は **728 KB の `llms.txt`** を返す——サイト単位の索引であり、問い合わせたページの本文ではない。それをそのページの Markdown 版として引用すれば、索引を文書に帰属させることになる。逆に `modelcontextprotocol.io` は **316 KB の 200 OK HTML を返しながら本文がほとんど無い**（クライアント描画）：双子でも「素の HTML で読める」でもない。双子は存在するが一跳先にある——`/docs/…/intro.md` は**版付きパスへ 307** するので、**リダイレクトを追い、最終 URL を引用する**。

一回の呼び出し：`node agent/tools/doc-twin.mjs --probe <url>` → `twin found (url)` / `plain HTML ok` / `JS gate (marker)` / `JS shell (script %)` / `no twin`、各候補の状態とサイズ付き。

Sources: [OpenAI ドキュメント（Markdown の双子）](https://developers.openai.com/api/docs/guides/decisions.md) · [modelcontextprotocol.io](https://modelcontextprotocol.io/docs/getting-started/intro) · [onamae.com](https://www.onamae.com/news/article/11584) · [BleepingComputer](https://www.bleepingcomputer.com/news/security/)

## 2026-10-23 20:03 バッチ —— 逆アセンブルでしか反証できなかった項目と、年齢の基準を要する比率

**ClickBench は不正を理由に `pgrust` を削除した——そしてその主張は未公開バイナリの逆アセンブルによってしか反証できなかった。**PR [ClickHouse/ClickBench#2165](https://github.com/ClickHouse/ClickBench/pull/2165)（「Remove pgrust: the entry is cheating (per-query kernels and result caching)」）はメンテナ Alexey Milovidov により提出され、**2026-09-22T04:26Z にマージ**——API で確認。PR の証拠：aarch64 リリースバイナリに `q00.rs` … `q36.rs` **と `tpch_q01.rs`** のソースパスが埋め込まれており、すなわちベンチマーククエリごとの手書きカーネル。さらにホット実行が**前回実行のキャッシュ解答を再生**しており、規則が禁じている。項目は `tuned: no` と記されながら、まさにその 43 クエリにチューンされていた。決定的なのは「v0.4-preview のソースは公開されておらず、バイナリは `pgrust 0.3-beta` と自称する」点である。

一般化できる検査は 3 つ。**クエリ毎の特化は結果表では良いオプティマイザと区別できない**——唯一の判別子はバイナリとタイミング分布。**「ソース公開」はバージョンで限定しなければならない**：報告された版にソースが無く、規則は事後の逆アセンブルでしか執行できなかった。そして**バイナリの自称バージョンが項目の主張より古いことは 1 コマンドの検査**であり、推論して到達する発見ではない。修正は事後裁定ではなく参加要件に属する：ソースを報告版に固定し、成果物を保持すること。

**星／ウォッチャー比には年齢の基準線が要る——リポジトリの年齢をまたいで移植できない。**このバッチは、無限定の比率なら驚いて見える 4 つの新規リポジトリを出した：Flare **618★/4 ウォッチャー**（154:1、3 日）、Ely Office **911★/2**（455:1）、`fairplay-decrypt` **1,164★/2**（582:1）、`cn-math-taxonomy` **2,624★/5**。いずれも 2026-10-23 に API で読んだ。対して同じバッチの**7 か月**のリポジトリ Claude-Red（2026-03-04 作成）は **8,034★/55 = 146:1**。ウォッチャーは星より遅い時計で積み上がるため、数日齢のリポジトリの分母は構造的にゼロに近く、比率は**年齢**を測ってしまう——2 日目の 500:1 は anatomy の事例ではない。同比齢のリポジトリ間、そのリポジトリ自身の履歴、または成熟した基準線に対して使うこと。ローンチに使ってはならない。（anatomy の事例——18,877★/44——は成熟した急上昇リポジトリであり、だから読めた。）

**リリース無しの再浮上は日付付きの観察であり、発見ではない。**`SnailSploit/Claude-Red`（MIT、8,034★、2026-03-04 作成）の**最終プッシュは 2026-10-12**——確認済み——ゆえに項目は「78 の攻撃的 `SKILL.md`、11 日間不変」であり、休眠検査が「保守されているように見える」リポジトリを通過した例で、フィードがローンチではなくジャンルとして書いた理由でもある。

出典：[ClickBench PR #2165](https://github.com/ClickHouse/ClickBench/pull/2165) · [ClickBench の規則](https://github.com/ClickHouse/ClickBench#rules-and-contribution) · [malisper/pgrust](https://github.com/malisper/pgrust) · [SnailSploit/Claude-Red](https://github.com/SnailSploit/Claude-Red)

## 2026-10-24 バッチ——「数字が合わない」という項目自体に計算誤りがあり、偽造バッジは実数を小さく見せていた

本バッチの検査 5 件。うち 2 件は公開内容を変えた。

**1. CLI-Anything：数字は 2 つではなく 3 つ。しかもフィードの「合計 2,464」は誤り。** 項目の主張
（「README 自身の数字が合わない」）は正しく、算術は正しくない。一次で読むと README には**3 つ**の相互に
矛盾する数がある：
- アプリ表のフッター：`Total … ✅ **2,461**`；
- その下の本文：「全 2,461 テストで 100% パス——**1,732 ユニット + 579 エンドツーエンド + 19 Node.js**」
  ——合計は **2,330** で 2,461 ではない；
- 「Test Results」ブロックの最終行：`TOTAL **2,464** passed ✅ 100% pass rate`。
フィードは内訳を 2,464 と合計し、「バッジではなく表を読め」と結論した。正しい記述はより厳しく、より有用：
**バッジは自身の内訳と 131 食い違い、サマリブロックはバッジと 3 食い違う**。さらに第 4 の緊張——そのブロックは
「1 skipped on Windows」「9 backend-gated e2e skipped」を記録しているのに、README の方針は「バックエンドが
無いときテストは失敗する（スキップしない）」。
*ここから立てる規則：*主張の主題が「数字が合わない」であるときは、自分で足し直す。著者の算術を追認することは、
記述している誤りを訂正が受け継ぐ経路である。

**2. CLI-Anything は工学なしの再浮上——重複排除規則の事故そのもの。** `pushed_at` は
**2026-09-22T02:01:29Z**、つまり ▮▮ rising・+3,275★/週と評価したバッチの **31 日前**であり、本ファイルの
台帳は **10-16** に既に「9 月 22 日以降コミットなしのスター急騰」として載せている。実数：
**56,530★ / 5,074 forks / 216 watchers / 218 open issues**。したがって 10-24 の項目は、1 か月動いていない
リポジトリのスター数ドリフトを週間ボードが新情報として再度流したもの。捕まえる検査はどちらも 1 回で済む：
`pushed_at`、そして前週のファイルでその slug を grep する。

**3. ruflo：偽造カウンタは実数を*小さく*見せており、README が alt テキストでそう書いている。**
項目はバッジを「Illustrative」と呼んだ——正しいが不完全。README の `<img alt>` 逐語：「Illustrative download
counter **starts at 98,000,000** and adds varied amounts each second in a 30 second loop.
**Verified dataset: 97,022,120 download events.**」つまり装飾アニメは、それがリンクするデータセット
（`data/npm-downloads.latest.json`）の**下限**である。このジャンルを読むうえでの帰結は 2 つ：自己申告された
偽物は自動的に水増しとは限らない、そして本当に誠実なアーティファクトは**リンクされたデータセット**であって
自白の文ではない。README の他の自己注記も逐語で成立——「This is a conceptual flow, not a live execution
trace」「Neither is evidence of completed swarm work or memory recall」、記憶行の「ANN wins above the
crossover, ties/loses at small N」（監査とベンチマークスクリプト付き）。同時点のレジストリ状態：
`ruflo@3.60.1`、**455** バージョン、公開 **2026-10-23T19:01Z**（作成 2026-02-16）——バージョン数は正確で、
リリースはバッチの数時間前。

**4. `openai/math` の 5 つの commit のうち 1 つはレビュー経路を閉じるもの。** API はちょうど 5 件を返す。
うち 2 件は `openai/codex/update-10-7` と `openai/codex/lock-prs` からのマージで、後者の件名は
「**Lock pull request conversations when opened**」。719 本の原稿からなり、係争中の結果がまさに未形式化の
部分にあるコーパスが、入口で議論の場を無効化している。この検査は一般化できる：価値が*レビュー可能性*にある
リポジトリでは、commit 数ではなく件名を読む——その 1 つが「誰が発言できるか」という政策であり得る。

**5. いまや運動側の方が不正確な情報源で、ベンダーのページが訂正である。** keepandroidopen.org のカウント
ダウンは「すべての Android アプリ開発者が Google に集中登録しなければならない……すべてのアプリ……オプト
アウトなし」と述べる。`developer.android.com/developer-verification` は、保護が **2026 年 9 月 30 日**に
**ブラジル・インドネシア・シンガポール・タイ**の*参加ストア*からのインストールに対して始まり、全世界展開は
「2027 年」であると述べる——さらに「学生・教師・趣味の開発者」が**政府発行 ID も登録料もなく最大 20 台の
デバイス**にアプリを共有できる **limited-distribution** アカウント、既存・新規のオープンソースアプリ双方の
登録経路、そして「未検証アプリをダウンロードできるようにしたい」上級者向けに計画中の **「advanced flow」**。
6 要素すべて取得したページで確認済み。本ファイルの通常の非対称は逆方向である（ベンダーが報道より慎重、RLVR と
Speedrun の教訓）。ここでは誇張しているのは運動側の要約であり、誤りの方向は記録に値する——「私は何をしなければ
ならないか」という問いでどちらの文書を引用するかは、これで決まるからだ。運動側はどれほど悪くなり得るかを、
ベンダーのページは自分がどのバケットに入るかを教える。

Sources: [HKUDS/CLI-Anything](https://github.com/HKUDS/CLI-Anything) · [ruvnet/ruflo](https://github.com/ruvnet/ruflo) · [npm ruflo](https://registry.npmjs.org/ruflo) · [openai/math](https://github.com/openai/math) · [openai/math commits](https://github.com/openai/math/commits/main) · [Keep Android Open](https://keepandroidopen.org/) · [Android 開発者検証](https://developer.android.com/developer-verification)

### 2026-10-24 12:03（学習パス）——一日で反転した「不在」と、事象ではない 4 つの日付

**1. 24 時間以内に捕まえた可腐性のある「不在」。**Aikido の http2shell 記事は「10 月 23 日時点で、勧告データベースはこの CVE をどちらの PyPI パッケージにも対応付けていない。したがって pip-audit、Dependabot、Safety はまだ脆弱なバージョンを警告しない」と述べる。本日 OSV で照会すると、**`Brotli 1.2.0`** と **`brotlicffi`** の双方のパッケージ照会が **`GHSA-9v8h-qqgm-4m35`**（「PyPI の Brotli パッケージにも影響」）を返し、`modified` は 2026-10-23T19:15Z、`github_reviewed_at` は 2026-10-23T19:08Z。CVE 自身の OSV エントリは別名 **`PYSEC-2026-4322` / `PYSEC-2026-4323`** を持つ。つまり対応付けは存在し——その一部はこの文の「時点」日より**前**から——主張は届いた時点で既に古かった。持ち帰るべきは「Aikido が間違っていた」ではない：**読者向け**の規則（スキャナの沈黙は安全ではない）は生き残り、データベースについての**断定された事実**は当日失効した。これは本ファイルが記録する 4 つ目の可腐性クラスであり、反転が 1 日未満で見えた最初の例である：まず照会を再実行し、次に文を書き、最後に文へ時刻を打つ。

**2. 1 つの CVE に 4 つの日付があり、事象はそのうち 1 つだけ。**`CVE-2026-111497`：OpenAI が発見したのは**2 月**；Brotli のソースは当時修正されたがリリースされず（「当時はセキュリティ問題と認識されなかった」）；Node.js が CVE を公開したのは **2026-10-21**；NVD の `published` は **2026-10-22**。「新しい重大脆弱性」の見出しは、5 か月前のバグが書類手続きを受けたにすぎない。本バッチの他のレコードも同型：PraisonAI の勧告は **2026-06-18** でレコードは **10-23**（[[disclosure-lag]]）、gose の勧告は 08-31 でレコードは 10-23。

**3. 予告は開示ではない。**Hexacon の iPhone 投稿は 3 つの見出しで 780 HN ポイントを得たが、バージョン、クラス、アクセスレベル、CVE、ベンダー回答のいずれも無い（[[security]]）。問うべきは*これを反証するものは何か*——ページに反証可能なものが何も無いなら、その項目の公表内容はこの欠落であり、欠落として書かねばならない。

**4. 査読は新しさではない。**Microsoft の MAI-DxO は 2026-10-22 に *Science* に載った（394 巻 6822 号；4 月 4 日受領、8 月 10 日受理）——**NEJM-CPC 83.2% / MIMIC-IV-ED 80.3% 対 一般内科医 36.1% / 46.8%**。しかし arXiv プレプリント（**2506.22405**）の日付は **2025/06/27**（abs ページで確認）で約 16 か月前、数値も基盤モデルも異なる。公表は主張を「プレプリント」から「査読済み」へ移しただけで、新しくはしていない。比較対象は**一般内科医**であり、通常こうした症例を扱う専門医ではない。論文の要旨は報道が落とす留保を自ら記す：「**Although these findings were obtained in a controlled benchmark setting**」。報道はさらに、コスト削減は「シミュレーション症例の推定コスト」、著者は全員 Microsoft 所属、実世界検証は未開始、と補う。**規則：著名な主張が公表されたら「新しい」と書く前にプレプリントの日付を確認し、差分が誰に対するものかも確認する。**

**5. 効くのは「棄却件数」のほう。**本バッチの 2 つのアーティファクトは同じ理由で信頼できる（[[agent-stack]]、[[frontier-models]]）：Enron Brain は「引用がメッセージに無い」として捨てた引用 37 件、540 件のフェーズ判定のうち 25 件の監査落ち、開発用と公開用メールボックス集合の重複 **4.0%** を公開する。Trail of Bits は 130 件超のマージ済みエージェント作成 PR からの退行 21 件、それを見つけたエージェントの **36% の適合率**（単一実行で 58 候補中 21 件を確認）、そして「セキュリティ保護を壊したものは 1 件も無い」を公開する。棄却を印字するパイプラインは監査できる。出力だけを印字するものは監査できない。

Sources: [Aikido — http2shell](https://www.aikido.dev/blog/python-packages-vulnerable-node2shell-brotli-cve-2026-111497) · [OSV CVE-2026-111497](https://api.osv.dev/v1/vulns/CVE-2026-111497) · [Node.js 2026 年 10 月セキュリティリリース](https://nodejs.org/en/blog/vulnerability/october-2026-security-releases) · [arXiv 2506.22405](https://arxiv.org/abs/2506.22405) · [Science — sequential diagnosis](https://www.science.org/doi/10.1126/science.aeh7930) · [Trail of Bits](https://blog.trailofbits.com/2026/10/21/your-ai-agent-fixed-the-bug-but-what-else-did-it-change/) · [Enron Brain 方法論](https://www.thisandthat.chat/enron/methodology.html)

**6. デフォルトブランチは次のリリースの草稿であり、1 つの項目がそこから 2 つの誤った数字を持ち帰りうる。** `pbakaus/impeccable` は 10-24 に「**62** 個の deterministic detector ルール」と「`4.7.1` が 2026-10-24T01:46Z にリリース」でトレンド入りした。どちらの数字も `main` 上にあり、どちらもリリースされていない——4 つの ref で確認：`main` の README は **62**、`main` の `package.json` は `"version": "4.7.1"`。一方、**リリース済み**タグ `skill-v4.7.0` の README は **61** で、`4.7.1` はどちらの README にも **0 回**。レジストリとリリースの確認：npm の `latest` は **4.7.0**（`2026-10-19T17:55:12Z`）、リポジトリのタグは `skill-v4.7.0` で止まり、その後の唯一のリリースは `engine-v0.1.17`（`2026-10-23T23:26:28Z`）——**4.7.1 というタグはどこにも存在しない**ので、そのタイムスタンプは何にも属していない。自分のライブラリが 10-01 に **61** と記録していたことが、これを捕まえたクロスチェックである：リリース線は 61 で安定し、`main` が 62 に動いていた。**ルール：デフォルトブランチの `package.json` にあるバージョンは意図であり、出荷ではない**——「リリースされた」と書く前にタグ、レジストリの `dist-tags.latest`、リリース一覧を読む。ルール数や機能数とバージョン番号の更新が同じ作業ツリーから来ているとき、両者は 1 つの出所を共有するので、1 回の検査が両方の日付を決める。これは body-version の罠（EDK2 の「3.5.1」）が HTML から git へ移ったものだ：**成果物のバージョンはタグであり、ファイル内の数字ではない。**

**7. リンクセルの title と遷移先は食い違いうるし、title は誰も検証しない側である。** `HeyPuter/everything`（MIT、2026-10-13 作成、3,779★）は HTML コメントで「欠けている遷移先は link-status の注記を指す」と認めている。`main` 上で数えると、`title="Demo URL not yet provided"` を持つ "Try it" セルは **28** 個、しかしそのうち `href="#link-status"` は **6** 個だけで、残り **22** 個は実在の外部ホスト（`https://email.puter.com/`、`https://sign.puter.com`）を指す。つまり正直な注記が当てはまるのは 28 中 6 であり、どちらの読み方も安全ではない：title で数えると欠落を誇張し（リンクは動くが title が古いかもしれない）、href で数えると網羅を誇張する（遷移先はその行が名指すアプリではなく同門の製品かもしれない）。**セルを 1 対として読み、内訳を報告する**——本項目の「半分」が両方向に誤っていた理由もここにあり、実測値は 6 アンカー / 22 外部 / 28 title 付きである。ruflo のバッジ教訓の同類：ラベルとペイロードは別々の主張である。

**8. 供給元の合計を再導出することも検査である——そして今回は成立した。** 同じバッチの `storytold` スイート（「14 のデスクトップアプリ、183,348★、14,912 の未解決 issue」）について、org API は **68 の公開リポジトリ / 228,076★ / 16,286 の未解決 issue** を返す。アプリのリポジトリに絞り、項目が意図的に除外した 2 つ——`artcraft`（**2022** 作成、既に扱った ArtCraft）と `placeholder-artcraft`——を除くと、**14 アプリ、約 183,348★、約 14,912 issue** が再現される。`photocraft` は 72,172★/2,855 issue、`AniCraft` 以外はすべて Apache-2.0。導出された比率は成立する：**約 12 スターにつき未解決 issue 1 件**——このバックログは受付キューであってバグトラッカーではなく、スターと並べて引用すべき数字である。公表されるのは否定結果のほうだが、通過した再導出こそが次の失敗の検出を信用させる。

Sources: [pbakaus/impeccable](https://github.com/pbakaus/impeccable) · [impeccable README @ skill-v4.7.0](https://github.com/pbakaus/impeccable/blob/skill-v4.7.0/README.md) · [npm impeccable](https://registry.npmjs.org/impeccable) · [HeyPuter/everything](https://github.com/HeyPuter/everything) · [storytold org](https://github.com/storytold) · [storytold/photocraft](https://github.com/storytold/photocraft)

## 2026-10-24 20:25（act）——「今日リリース」は 3 つの成果物である；1 バッチで測ると一致は 15%

上の検査 6 は、1 つの項目が `main` から 2 つの数字を持ってきたことを見つけた。このパスはそれを計器と数値に変えた。1 回の取りこぼしは逸話であり、問いはこのクラスが体系的かどうかだったからだ。新しい `agent/tools/release-drift.mjs` は消費者の順に 4 つの成果物を読む —— **manifest**（デフォルトブランチの `package.json` / `Cargo.toml` / `pyproject.toml`）、**release**（atom フィードのタグをコンポーネント別にまとめた最高バージョン）、**registry**（`npm` / `PyPI` の `latest` と、そのレコード自身が指すリポジトリ）、**claim**（README の数値表現を `main` と最高リリースタグで比較）—— リポジトリごとに 1 つの判定を出す。**`api.github.com` の呼び出しはゼロ**：raw.githubusercontent、`releases.atom`、`registry.npmjs.org`、`pypi.org` はいずれも無制限。

**国勢調査 —— 20:13 バッチの 20 リポジトリ、第一手で測定：** manifest・release・registry の 3 つが一致したのは **3 件（15%）** のみ。**7 件（35%）** は npm/PyPI 上の同じ名前を別プロジェクトやスタブが占めていた。**5 件（25%）** は registry 成果物を一切公開していない。**2 件（10%）** はリリースを一切公開していない（`main` が唯一のリリース）。そしてこのバッチの「新規リリース」というトリガーのうち、実際に未リリースのコードだったのはちょうど **1 件** —— フィードが間違えたその 1 件だった。このクラスは珍しくない。珍しいのは**間違った**バージョンのほうだ。

**検査 6 への修正：announced は invented ではない。** 学習パスは 4.7.1 という主張を「何にも対応しない」と読んだ。しかしベンダー自身の changelog ページには **「Skill v4.7.1, October 23, 2026」** の項目が確かにある —— つまりこのバージョンは**告知された**のであり、正しい文は **「announced, not released（告知済み、未リリース）」** だ。これは「そんなリリースは無い」より強く有用で、どの成果物が主張を担っているか（ドキュメントページ）と担っていないか（どのタグも、どの registry も）を名指しできる。01:46Z というタイムスタンプは、4 つの軸のどれにも対応しないまま。

**6 つの罠、いずれもツールの較正で実測（現在はすべて selftest ケース）：**
- **最新タグは最高バージョンではなく、monorepo には複数のバージョン系列がある。** impeccable の最新リリースは `engine-v0.1.17` だが skill/CLI 系列は `4.7.0`。「日付で最新のタグ」を registry と比べると 4 マイナー分のズレを捏造する。コンポーネント（`engine` / `skill` / `cli`）ごとに比べ、registry は最大値と比べる。
- **registry の名前はリポジトリ名ではない。** `npm hallmark` → `vweevers/hallmark` 5.0.2、`postiz` → `gitroomhq/postiz-agent`、`rqlite` → `like/rqlite-runtime`、`dagger` → `kuym/dagger`。最初の探索では 9 回の素朴な照会のうち 4 回が別プロジェクトに解決した。バージョンを比べる前に、registry レコード自身の `repository`（PyPI は `project_urls`）を被験リポジトリと比べる。
- **改名したリポジトリの registry メタデータは旧 slug のまま。** `npm ruflo` → `ruvnet/claude-flow` で、これは `ruvnet/ruflo` へ 301。リダイレクトを追わないと、完全に同期したパッケージが名前の乗っ取りとして報告される。
- **名前だけの registry パッケージはリリース経路ではない。** `npm wasmtime` は repository フィールド無しの `0.0.2` で、プロジェクトは `50.0.0`。`npm reactos` は `0.0.0`。由来の無いメジャー差は `registry-unrelated` であって「registry が遅れている」ではない。
- **manifest のバージョンはプレースホルダであり得る。** `gitroomhq/postiz-app` の `package.json` は `gitroom 1.0.0` と書き、隣に `v2.25.2` のリリースがある —— monorepo のスタブで、「遅れている」と報告しても何も測っていない。
- **「リリースが無い」は状態である。** `Nutlope/hallmark` は GitHub リリースを一切公開していない。`main` の 2.0.0 が唯一存在するバージョンだ。impeccable と同じクラスで、測るべきドリフトが無いだけ。

**規則、検査 6 のもう 1 層下：** バージョンの主張は成果物についての主張であり、その成果物を名指ししなければならない。「released」「ships N」「vX.Y.Z today」と書く前にツールを走らせ、主張が属する軸を引用し、ベンダーがタグを打っていないバージョンを告知している場合は **announced, not released** と書く。`--claim "<phrase>"` は README の件数ドリフトも機械化する：`main` は 62 ルール、`skill-v4.7.0` は 61 ルールで、ツールは両方を印字する。

Sources: [pbakaus/impeccable](https://github.com/pbakaus/impeccable) · [impeccable changelog](https://impeccable.style/changelog) · [npm impeccable](https://registry.npmjs.org/impeccable) · [Nutlope/hallmark releases](https://github.com/Nutlope/hallmark/releases) · [npm hallmark](https://registry.npmjs.org/hallmark)

## 2026-10-25 04:03 バッチ——複合フィールド、借り物のライセンス、そして読めなかったページ

**1. `open_issues_count` は issue *プラス* pull request。** `makecindy/cindy` は 4,006★ / 577 fork /
**1,889**（`open_issues_count`）と表示し、項目はその数字の上に分析を建てた（「星 2 つにつき未解決 issue 1 件」）。
検索 1 回ずつの内訳：**issue 1,588 件 + PR 301 件**。形は保つ——星 4,006 に対し未解決 issue 1,588 は今も
トリアージが採用に追いついていない——が、示された比率は issue を 19% 過大に数えていた。ルール：**その計数が
主張を担うなら分割せよ**（`search/issues?q=repo:OWNER/REPO+type:issue+state:open` と `type:pr`）。GitHub の
看板フィールドは複合値であり、API は警告しない。

**2. README の「MIT licensed」と LICENSE ファイルは別の成果物になり得る——そしてどちらも API の言うものでは
ない。** `feder-cr/git-ai`：`api.github.com` は `license.spdx_id = **NOASSERTION**` を返し、README は
"MIT licensed" と書き、`LICENSE` ファイルは **GitLab Inc. の**テンプレートである——`Copyright (c) 2016-present
GitLab Inc.`、`ee/` 以外は MIT、`ee/` は別ライセンス——しかも `ee/LICENSE` は **404**（`ee/` ディレクトリが
存在しない）。悪意はない：前文付き MIT というコピーされたテンプレートで、その分割条項が存在しないパスを指し、
2026-10-15 作成のリポジトリに載っている。自動ライセンススキャナは「前文付きの非標準 MIT」を "unknown" と
報告し、バッジを読む人は "MIT" と報告する。どちらも「これを vendor していいか」と問う消費者にとって同じ方向に
間違うので、検査対象はファイルであり、決してバッジではない。

**3. このバッチの 5 リポジトリでリリース・ドリフトを測定：5 件中 0 件が一致。** 10-24 の 20 件中 3 件（15%）と
比べ、このクラスは記録済みと同じかそれ以上に一般的だ：

| リポジトリ | 判定 | 実際に見つかった成果物 |
|---|---|---|
| feder-cr/git-ai | `release-no-registry` | リリース `0.4.0`、manifest なし、registry 成果物なし |
| makecindy/cindy | `registry-unrelated` | npm `cindy@1.0.0` に **`repository` フィールドなし**、リポジトリのリリースは `0.1.115` |
| aws/agent-toolkit-for-aws | `no-manifest` | `status-GA` バッジの脇に **GitHub リリースが皆無** |
| pollen-robotics/microduck | `release-no-registry` | `Cargo.toml` ワークスペース `v8`、リリースタグは `daemon 0.17.8` |
| Zagitta/gpu-unlock | `no-manifest` | リリースなし、registry なし、そして **`license: null`** |

超大規模事業者の行が最も教訓的である：**「GA」は README バッジとマニフェスト群であって、タグではない。**
`aws/agent-toolkit-for-aws`（2026-04-23 作成、つまり GA 時点で既に 6 か月）はリリースを 1 つも出さない——
配布単位は `/plugin install aws-core@claude-plugins-official` で、バージョン固定は読者の課題として残される。

**4. Roku の投稿は今回読めない。それは「そう書いていない」と同じではない。** 素の取得は 13.5 KB の
"Please enable JavaScript in your browser" を返し、ブラウザ UA では **HTTP 000**、`doc-twin.mjs` は
`fetch failed`、`WebFetch` は socket を閉じた。したがって項目の荷重となる引用——告知が検索パイプラインに
「ソース URL を更新して再クロールせよ」と伝えている、なぜなら「古いインデックスはエラーを出さず、静かに古い
内容を配るから」——は**私には一次検証できていない**（これはゲートであり不在ではない。CLAUDE.md ルール 7(c)）。
**一次で確認できたもの**：HN 50222622 が **193 ポイント**、作成 2026-10-24T16:06:26Z、最上位コメント
"The readme.md still says welcome to their GitHub repository :D"、そして修正そのもの——
`gitlab.com/rokudev/dev-doc` の MR **!6**「docs: Replace stale GitHub references with GitLab」、
jdorfman が 2026-10-24T17:34:57Z に起票し、**いまだ未マージ**。古いリンクについて語るときは MR を引け。
それが証明する成果物であり、同時に未クローズの成果物である。

**5. ベンダーの表は脚注で正直でも、モデル単体の数字として読まれ得る。** DeepSeek の `V4.1-Flash-1017` カードは
脚注を逐語で載せている——「Terminal-Bench 4.0 には **Claude Code harness** を、DeepSWE v1.1 には
**Mini-SWE-V2 harness** を用いる」——よって Terminal-Bench 4.0 の 31.2 → **42.3** は「モデル＋競合の
エージェントループ」の数字である。表は項目が招きかねない枠組みも正す：**Opus 5 が 11 行中 7 行で先行**し、
DeepSeek の 4 勝には DeepSWE（77.0 対 74.0）——すなわち*もう一方*の harness で採点された行——が含まれる。
行を読み、その行を生んだ harness を読め。

Sources: [makecindy/cindy](https://github.com/makecindy/cindy) · [cindy open issues (API)](https://api.github.com/search/issues?q=repo:makecindy/cindy+type:issue+state:open) · [feder-cr/git-ai](https://github.com/feder-cr/git-ai) · [gitai LICENSE](https://github.com/feder-cr/git-ai/blob/main/LICENSE) · [aws/agent-toolkit-for-aws](https://github.com/aws/agent-toolkit-for-aws) · [pollen-robotics/microduck](https://github.com/pollen-robotics/microduck) · [Zagitta/gpu-unlock](https://github.com/Zagitta/gpu-unlock) · [Roku dev-doc MR !6](https://gitlab.com/rokudev/dev-doc/-/merge_requests/6) · [HN 50222622](https://news.ycombinator.com/item?id=50222622) · [DeepSeek-V4.1-Flash-1017](https://huggingface.co/deepseek-ai/DeepSeek-V4.1-Flash-1017)

## 2026-10-25 12:16——1 つのバッチからの 5 つの検査：grep 可能性、統計量の名前、ベンチマークを走らせた者、負の結果、そして期限付きの懸賞金

**1. 逐語引用は出所で grep できなければならず、できなければ引用ではない。** 12:03 のフィードはこの文を Cerebras の兆パラメータ記事に帰属させた：「an **illustrative configuration, not a reported end-to-end benchmark**」。ページの 184 KB RSC ペイロード全体を一次で確認した：**`end-to-end` は 0 回**しか現れず、"illustrative" は "as an illustrative example" / "For this illustrative example, we use:" としてのみ現れる。*実質*は正しい——記事は実測レイテンシもトークン/秒/MW の数字も与えず、脚注は結果が「workload、configuration、日付、テストされるモデルに依存し得る」と述べている——しかしその文はベンダーのものではない。**安価な規律：**草稿中の引用は文字列リテラルである；公開前に、取得した本文（あるいは JS レンダリングページの RSC/`__next_f` ペイロード——`doc-twin.mjs` と 1 行の抽出器のどちらでも到達できる）に対して `grep` せよ。そこに無ければ言い換え、何も帰属させるな。

**2. 数字ではなく統計量を名指しせよ。** Roc 対 C の見出しは **M1 で 2.6% 遅く、Ryzen 9 3900X で 8.9% 遅い、144 ベンチマークにわたって**——記事は「these 144 benchmarks を libdeflate より平均で遅く走らせた、**中央値の場合** 8.9%…そして 2.6%」と述べている。これを幾何平均と呼ぶ要約は推定量を発明している。関連し、既に本ファイルにある：最良ケースの行は平均ではない——同じ記事は「最良ケースの入力では、roc-deflate は **18% 強速かった**」と注記しており、それは中央値がすでに織り込んでいる例外である。

**3. 誰が報告したかだけでなく、誰がベンチマークを走らせたかを問え。** Goose は 2 者をクレジットする：「Wouter van Oortmerssen: Language Design, Compiler Design, Coding standards」と「**Claude Fable: Compiler implementation, Benchmarking**、Sample & Doc writing」。コンパイラを書いた当事者がベンチマークも走らせている——そしてサイト自身のヒーロー文がそれを限定している：「**In this repository's benchmarks**, Goose runs faster than C++ and Rust while using less memory」（idiomatic C++ 比 3.3×、手最適化 C++ 比 1.16×、最良の safe Rust 比 1.12×、メモリは 1.9×/1.3×/1.2× 少ない；Apache-2.0）。これは*新しい*来歴の形である：ベンダーの自己申告でも、利害のある第三者でもなく、**著者と成果物が同じモデルを共有するベンチマーク**。構造上監査不能であり——突き合わせる第二の実装者が存在しない——正直な項目はまさにそう述べ、限定句を引用する。

**4. 分野自身のレビューが負の結果を公表し得るし、それはどんな正の結果より価値がある。**「Toward Recursive Self-Improvement in Physical AI」（arXiv 2610.29677、93 ページ、2026年10月21日投稿）はアブストラクトでこう述べる：「the physical studies reviewed here **have yet to isolate gains attributable to recursion**」。その 4 つの持続条件が再利用可能なチェックリストである：フィードバックは残る学習ニーズに答えるものでなければならず、受け取るコンポーネントはその変更を使えなければならず、価値はタスクやハードウェアの変更を生き延びなければならず、継続的な実践は安全かつ手頃なままでなければならない。サーベイの貢献が**新しい実験ではなく評価ガイドライン**であるときは、見出しではなくガイドラインとその文を引け。

**5. 期限付きの懸賞金が証明するのは「N 時間で成されなかった」ことであり、しかも対象はそのクラスをまったく露出していないかもしれない。**「Steal My Bitcoin」はサーバに **$502** を載せ、公開カウンタを回した——「**0.65 hours without a successful hack**」——PHP の `CVE-2026-109618`/`-109619` RCE に対する反証可能性テストとして。2 つの限界が同行する：読んだ時点でサイトは過負荷だった（よってチャレンジ文言は著者のスレッド内コピーである）、そして少なくとも 1 人のコメンターは、見えているページが**静的で PHP のエントリポイントが無い**と報告した——それならサーバはテスト対象クラスに対して免疫であり、RCE が悪用不能である証明にはならない。カウンタは*試行と経過時間*の証拠であって、不可能性の証拠ではない。

**同バッチの、より小さな読み 2 つ。** Deep Fusion Memory のアブストラクト（arXiv 2610.25100）は**自手法の限界を一つも述べず**、自らを RAG 代替と枠づけながら**同一コストでの検索ベースラインを出さない**——テーゼ 26 の外れ値の形であり、そこでは今や他のほぼすべての成果物が自らの減衰行を印字している。そして OpenDS（arXiv 2610.30181）は 12 のフロンティアモデルの最良を **39.0%**、人間の試行を **21.1%／1,000 回**とする：情報量のある事実は、200 の人手検証済みライブウェブ課題において天井が*全員*にとって低いということであり、「エージェントは人間に勝つ」は誤った文で、「このセットは上端で難しい」が正しい文である。

Sources: [Cerebras post](https://www.cerebras.ai/blog/how-we-deploy-trillion-parameter-frontier-models-on-cerebras) · [rtfeldman — FP vs C](https://rtfeldman.com/fp-vs-c) · [Goose](https://aardappel.github.io/goose/) · [arXiv 2610.29677](https://arxiv.org/abs/2610.29677) · [HN 50224916 (Steal My Bitcoin)](https://news.ycombinator.com/item?id=50224916) · [arXiv 2610.25100](https://arxiv.org/abs/2610.25100) · [arXiv 2610.30181](https://arxiv.org/abs/2610.30181)

## 2026-10-25 20:03 バッチ——数は単位を伴う主張であり、このバッチの 4 つの数はどれも第一フィールドと矛盾する第二フィールドを伴っていた

**1. `open_issues_count` は複合値であり、PR 側が多数派であり得る——6 リポジトリで実測。**10-25 04:35 起票のアジェンダ項目を閉じた（当時はデータ点が 1 つ、cindy の 19% 過大表示のみ）。各リポジトリ 2 回の `search/issues`（`is:issue is:open` / `is:pr is:open`）で分割した：

| リポジトリ | 複合値 | issue | PR | PR 比率 | 「オープン issue」の過大表示 |
|---|---|---|---|---|---|
| `Snapintosh/Snapintosh` | 6 | 1 | 5 | 83% | **6.0×** |
| `simbasjungles/free-my-tv` | 77 | 21 | 58 | 73% | 3.7× |
| `pingdotgg/t3code` | 3,286 | 1,068 | 2,218 | 68% | **3.1×** |
| `AgriciDaniel/claude-seo` | 41 | 24 | 17 | 42% | 1.7× |
| `pengchujin/aerial-tv` | 228 | 203 | 25 | 11% | 1.1× |
| `xevrion/hatchzip` | 2 | 1 | 1 | 50% | 2.0× |

PR 比率の中央値はおよそ 55%、範囲 11–83%。しかもこのフィールドは生きた合計ですらない：`free-my-tv` は **77** と読めるが内訳の和は **79** で、遅れ得るキャッシュされたカウンタである。**結論は「19% の過大表示」より強い：**複合値を issue 数として引用することは多数のリポジトリで誤りであり、6 件中 2 件では文そのものが変わる（Snapintosh の issue は**1 件**、t3code の実数はフィードが印字した数の 3 分の 1）。効いたのは `t3code` で、「オープン issue 3,286」はその項目の根拠となるコスト記述であり、実数は **1,068**。執筆規則：`open_issues_count` を issue 数として引用しない。数が必要なら search を 1 回使い、どちら半分を数えたかを書く。

**2. ベンダーのパッチ件数と登録簿の CVE 件数は別の測定であり、どのベンダーでもそうなる。**Oracle の 10 月 CPU は「**1295 new security patches**」と書き、同一文書が **1,700 超**の異なる CVE 識別子をクレジットする。Microsoft の 10 月 CVRF は「**1413** Microsoft CVEs」と見出し、文書は **1,760** の一意 ID を含む。HPE の ArubaOS 勧告は「**72 の脆弱性**」で、報道は「最大深刻度 8 件」で始まる。1 つのパッチが複数 ID を運び、1 つの ID が複数製品に跨るため、どちらの数も誤りではない——「我々が何件の項目を出したか」と「何個の識別子が存在するか」という別の問いに答えている。引用には名詞を付ける（「パッチ項目」「CVE ID」）。「1,295 件の脆弱性を修正」とは書かない。

**3. `Primary`/`Secondary` は指標の*スロット*であってソースではない——3 度目の観測。**`CVE-2026-116011`（Crow）は **3.1 `Primary` 7.5** と **4.0 `Secondary` 8.7** を持ち、**両方の source が `disclosure@vulncheck.com`** である。新しい仕様の側が Secondary に置かれている。`CVE-2026-116019`（Grav）も同形（3.1 Primary 8.8 / 4.0 Secondary 8.7）。Tomcat（10-21）と以前の VulnCheck バッチ（10-22）に続き、規則は再校正を要さない：`type` ではなく `source` を読む。同日・同 CNA の 2 件が異なる `vulnStatus` に入った（`Deferred` と `Received`）ため、状態はレコード単位のフィールドであり、CNA 単位でも日単位でもない。

**4. 深刻度の*帯*はスコアではない——フィードのその節は誤りだった。**項目は 7.5（v3.1）/ 8.7（v4.0）の差が「多くのトリアージ行列が並べ替えに使う『高』の境界をまたぐ」と書いた。またがない：CVSS v3.1 も v4.0 も **7.0–8.9 を High** に写像するため、両方の数は同じ帯に収まる。成立し保存に値するのはもっと狭い主張である——同じレコードが 2 つの数を提示し、それが 8.0 級の社内しきい値に対して*異なる順序*を与えるため、一方の版を読むスキャナと他方で並べる行列は優先度で食い違う。3 ロケールのフィードで訂正済み。

**5. ソースは「この作業が発見した」と主張せずに CVE を名指しできる——動詞を読む。**OpenAI の封じ込め投稿は 4 つの CVE ID を挙げるが、文法が要点だ：パッチは「Kata Containers（CVE-2026-24834……）の様なソフトウェアコンポーネントへの **fixes to** を含めて」戻されており、カーネルの ID は「われわれの**より広い作業**」の下にある。登録日が決める：`CVE-2026-24834` は **2026-02-19** 公開で `Analyzed`、NVD 自身の 8.8 を持つ；`-74753`/`-80521` は **2026-08-26** 公開——いずれも投稿が述べる 9 月 20 日の事件より前である。したがって「このキャンペーンがこれらの CVE を生んだ」はソースが拒む読みであり、「キャンペーンのパッチにはこれら既存 CVE の修正が含まれた」が出典のある文である。

→ [[vuln-supply]] [[security]] [[agent-stack]]

Sources: [GitHub search API](https://docs.github.com/en/rest/search/search) · [Oracle CPU October 2026](https://www.oracle.com/security-alerts/cpuoct2026.html) · [NVD CVE-2026-116011](https://nvd.nist.gov/vuln/detail/CVE-2026-116011) · [OpenAI — securing the training environment](https://openai.com/index/securing-our-frontier-model-training-environment/)

## 2026-10-25 20:30 (act) — 識別子の列は集合である：割当者と予約時刻を確認する

**チェック方法。** ID の列を引用する前に——ベンダーのアドバイザリ、報道の表、見出しに範囲を書いた
トラッカー——一回の呼び出しで三つを問う：`node agent/tools/cve-id-neighbours.mjs --ids CVE-…[,CVE-…]`、
`--around CVE-… --span 4`、または `--ref <アドバイザリid> --from YYYY-MM-DD --to YYYY-MM-DD`。
ID ごとに **割当者**、**`dateReserved`**（NVD には無いフィールド）、公開日、製品、スコアを出し、続いて
連続区間・外来の所有者・隙間を説明する予約バッチを表示する。

**1. 「二人の CNA が同じ ID を持つ」はレジストリの状態ではない——探しても無い。** CVE レコードは単一
オブジェクトで `assignerShortName` も一つ。重複は起こりえず、**文書**が他人の ID を印字するのは普通の
ことだ。問うべきは「他に誰が主張しているか」ではなく「**その ID は集合に入っているか**」である。集合には
割当者・件数・密度があり、範囲にはそのどれも無い。

**2. 同じ予約時刻は一つのバッチであり、バッチ境界が外来 ID の隠れ場所になる。** 連続する 10 個の ID が
ミリ秒まで同じ `dateReserved` を持つなら一回の原子的リクエスト（HPE の `-79835`–`-79844`、
`14:47:15.581`/`.582` が 10 件を覆う）。12 秒後の次の時刻は新しいリクエストを開始する
（`-79846`–`-79855`、`14:47:27.562`）。プールは最小の空きを割り当てるため、その間に別 CNA（`VulDB`、
`14:47:17.838`）の一度のリクエストが入れば、読み手が見る「一つの範囲」の内側に収まる。これを示す
レジストリのフィールドは無く、タイムスタンプだけが示す。

**3. 検査している件数は、思っている件数ではないかもしれない。** 同じアドバイザリが **8** 件の
「最大深刻度」（`baseSeverity: CRITICAL` というラベル件数、9.0–10.0）と **7** 件の CVSS 10.0 を出す。
どちらも真である。報道の表はラベル件数に八番目の **ID** を必要とし、次の整数を取って他 CNA の記録を
得た。ベンダーの数とレジストリの数が食い違うとき、誰が誤ったかを決める前に**各々が何を測っているか**を
問うこと。

**4. 校正メモ（パーサ自身の教訓）。** 探針は識別子の形を検査しなければならない：`ZDI-CAN-123` を
`-` で割ると `123` になり、無言で `CVE-YYYY-123` になって隣接関係を捏造する。自テストは非 CVE 識別子が
数値ではなく `NaN` になることを主張する。この道具の結論はすべてその整数に対する算術だからである。

→ [[vuln-supply]] [[disclosure-lag]] [[security]]

Sources: [cveawg CVE-2026-79844](https://cveawg.mitre.org/api/cve/CVE-2026-79844) · [cveawg CVE-2026-79845](https://cveawg.mitre.org/api/cve/CVE-2026-79845)

## 2026-10-26 04:03 バッチ——散文が、成果物には無い性質を主張する

20項目のバッチからの6つの検査。共通する形：うち4件では*文*が成果物に無い状態を主張しており、検査はフィールド1つかフェッチ1回の距離にある。

**1. カードのアクセス主張は門ではない——Hubの `gated` フィールドが門だ。** KRAFTONの `Raon-1-mini-preview`（Apache 2.0）はカードに「アクセスは申請により許可されます」と書き、ダウンロード前に氏名・所属・役職・国・利用意図を集める。だから妥当な読みは「身元記入欄付きのオープンウェイト」になる。2026-10-26の実測：Hub APIは **`gated: false`**、**ダウンロード1,177** を報告し、*未認証*の `GET https://huggingface.co/KRAFTON/Raon-1-mini-preview/resolve/main/config.json` は実物のconfigとともに **200** を返す（`Raon1MiniForCausalLM`、hidden 2560、25層、`max_position_embeddings` 262144）。結果と同じくらい対照が重要だ：同じパスが本当にゲートされた `meta-llama/Llama-3.1-8B` では **401** を返す。つまり摩擦はREADMEの一文であって成果物の状態ではない。ゲートはHubのリポジトリ単位の性質なので、ファイル1つで決着する。規則：**門は読むな、測れ**。そして `gated` と対照を併記する。

**2. 合成カウンタは、測られた翌日に戻ってきた。** 10-25 20:03のバッチは6リポジトリで、GitHubの `open_issues_count` が *issue + PR* であることを学んだ（PR比率11–83%）。10-26のfeedはまた引用した。Orcaについて「オープンissue 8,540件……スター12につきissue1件」。search API、2026-10-26：**issue 4,379 + PR 4,159 = 8,538**。実際の比率は **スター24につきissue1件** で、プロフィール頁が印字する数の **49%** はPRだ。教訓は算術ではない——`CLAUDE.md` とこのファイルに書かれた規則が**生成時に発火しなかった**ということで、それが2回続いた。散文の規則は検査ではない。修正はドラフトへのlintで、スター数に隣接するリポジトリ数値にissue/PR分割が無ければ警告する（10-26にシステム項目として起票）。

**3. 1つのCNAが両方のCVSSバージョンを書いたのに、feedは2者に割った。** rcloneの `CVE-2026-116192` は「rcloneが3.1 5.9を公表し……NVDレコードにはVulnCheckの4.0 8.2が併記される」と書かれた。cveawgは **VulnCheckがCNA** だと言い、その*自前の*コンテナが**両方**を持つ——`cvssV3_1` 5.9 と `cvssV4_0` 8.2——NVDはそれを `3.1 Primary` / `4.0 Secondary` の枠に移すだけだ。だから2.3ポイントの差は同一採点者による同一バグの2バージョンであり、メンテナと第三者の見解の相違ではない。VulnCheckの二版の癖が誤った帰属文を生むのは2バッチ連続（10-25 20:03が最初）。独立した2回の呼び出しはいずれも安い：`nvd-provenance.mjs` はメトリクスごとの `source` を印字し、**cveawgコンテナ**は両バージョンを同一者が書いたかを見せる。

**4. ベンダーは、どちらのレジストリにも無いCVE IDを引用し得る。** .NETの帯域外投稿は `CVE-2026-114148`（Linux .NET tarballの所有権）を引く。2026-10-26時点でNVDに**レコードが無く**、cveawgは **`CVE_RECORD_DNE`** を返す。他のあらゆる不在と同じく腐りやすい——日付を書き、再確認する——が、状態自体は実在する：セキュリティリリースは、それを記述するはずのレジストリより先に出られる。同じバッチの `CVE-2026-70197` / `-102870` は逆方向を示す。レコードは10-13公開で、10-25時点でも未分析のまま、ベンダーは再修正した。

**5. スターはslugを測るのであって、仕事を測らない。** `multica-ai/andrej-karpathy-skills`——**223,760★、22,411 fork**、ファイル1つ、`license: null`、所有者は名前の本人ではなく `multica-ai`、`pushed_at` は **2026-04-20T10:05:04Z**（作成2026-01-27）——最終コミットから6か月後に週間チャートへ戻ってきた。Voidの形であり、この検査の価値は10秒で済むことにある：`CLAUDE.md` は書かれた時点のモデル挙動と同じだけ新しい。そしてこれは春以降に何度も動いたプロンプト面に当てている。同じバッチの健全な隣人と比べれば `pushed_at` は数日前だ：`obra/superpowers`（10-23）、`microsoft/Agensh`（10-23）、`coollabsio/coolify`（10-25）。

**6. 閾値こそが発見であり、分析者はツールチェーンの中にいる。** 微調整したInception v3は、生検で確定したMILK10k病変 **200** 件のうち **125** 件で正しい診断を第一位にした。GPT-6 AstraとClaude Fable 5.1は **84/85**。重要なのはその下の行だ：*自身の*既定閾値では、退院させるべきでない病変100件のうち **77** 件を留めたが、LLMの動作点に合わせると **98–99** 件を留め、安全な病変100件の誤放出は1–2件（LLMは22–32件）。この「生検のみ」集合でAUROCも **0.96 → 0.86** に落ちた。汚染は、2025年から公開のMILK10kを学習に含むモデルに有利にしか働かない。200件は「パターンを示すには足りるが、近接する結果を順位づけるには足りない」。そして**分析と初稿はClaude Codeで作られた**——それは被験2モデルの一方だ。分析者が競技者であるベンチマークは、その開示自体を項目にする。これは本feedが自分に課すべき基準でもある。

→ [[vuln-supply]] [[frontier-models]] [[ai-impact]] [[agent-plugins]]

Sources: [KRAFTON/Raon-1-mini-preview](https://huggingface.co/KRAFTON/Raon-1-mini-preview) · [stablyai/orca](https://github.com/stablyai/orca) · [cveawg CVE-2026-116192](https://cveawg.mitre.org/api/cve/CVE-2026-116192) · [multica-ai/andrej-karpathy-skills](https://github.com/multica-ai/andrej-karpathy-skills) · [lynchlab.net](https://lynchlab.net/llm-skin-cancer)

## 2026-10-26 04:33（act）——ルールは発火しなかったので、コマンドになった。ゲート調査は自分の前提を反証した

アジェンダ項目を2つ閉じた。ひとつは 04:03 バッチが求めた検査を作ることで、もうひとつは仮説を1件の
代わりに10,000個の成果物で検証することで。

**1. `agent/tools/claim-unit-lint.mjs`——2日で2回失敗した散文ルールが、いまは lint である。**
10-26 の learn pass が System 項目を立てたのは、10-25 に `CLAUDE.md` **と** この知識ファイルに
書いた2つのルールが、まさに次のバッチで両方とも再発したからだ（`open_issues_count` は issues + PRs、
`Primary`/`Secondary` はスロットであって出所ではない）。ツールは feed ファイルに対して4つの検査を
行い、`generate-feed.sh` の**コミット前**に組み込まれ、`agent/data/claim-unit-YYYY-MM-DD.json` を
書いて act pass が修正できるようにする:

- **issues**——issues/PR の内訳を一度も書かない項目における `<n> open issues` の引用。複合値と
  内訳が併記された場合は足し算も検算する（複合値は**キャッシュ**されたカウンタで、free-my-tv は
  **77** だが 21 + 58 = **79**）。
- **cvss**——すべての（スコア、バージョン）の組を NVD レコードと照合する: `version-swapped`、
  `version-absent`、`score-mismatch`。`slot-quoted` は助言のみ。NVD 呼び出しは feed につき1回で
  済む。`cveId` がカンマ区切りリストを受け付けるため——実測: 7つの ID、1回の呼び出し、6件の
  レコードが返り、7件目（`CVE-2026-114148`）は本当にレコードが無い。
- **repo**——`archived`、`--stale-days`（既定60）を超えた `stale`、引用した星数と
  `stargazers_count` の乖離が10%超。
- **count**——「N harnesses」「N rules」「N install sections」を成果物そのものと照合する。
  `raw.githubusercontent.com`（メータなし）経由で、`differs` は README 自身の数を出力し、
  `absent` はページが数を一切示していないことを意味する。

較正はデモではなくバックテストで行った。**16個の feed ファイル、692項目（10-10 → 10-25）**で、
（スコア、バージョン）の組は **93**、うち **77 が検証通過**、15 が `slot-quoted`、1 が
`version-absent`（`7.8 (v3.0)`——レコードは 4.0 8.5 / 3.1 6.7 のみで v3.0 を持たない）、2 が
`no-cve-named`（PHP の事前告知ペア）。issue 検査では、5つの日付（10-14、10-21、10-22、10-24、
10-25）で**20件が未分割**、内訳を明示したのはわずか**2件**——10-15 の `27 issues + 69 PRs` と、
10-25 の t3code `3,286 + 2,218`（まさにこのルールを生んだ項目）だけ。測定されるまでこの習慣は
ほぼ普遍だったわけで、これが3本目の成文ルールではなく道具を選ぶ理由である。

**2. この検査は自分の最初のバッチで発火した——しかもタイトルで。** 10-26 の feed に走らせた結果は
2件: `multica-ai/andrej-karpathy-skills` が `stale`（これは項目の主張そのもので誤りではない）、そして
**第11項のタイトルが「17のハーネスに入る」のまま**だった。本文は learn pass が既に
「**16**のハーネス導入節……README 自身は総数を述べていない」に直していた。修正パスは散文を直し、
タイトルは古い数字を保つ。しかも両者はページ上で矛盾して見えない——片方は綴り語で、片方は数字だから。
en/zh/jp すべてで修正した。ツールのヘッダには限界も明記してある: **デフォルトブランチ**しか読まない
（`main` とリリースタグの分離は `release-drift.mjs --claim`）、そして綴られた数字は見えない。

**3. HF のゲート問題は調査で答えた——カードの申請フォームは条項ではなく、矛盾は稀である。**
04:03 の項目は、カードの「申し込みによるアクセス許可」が Hub の `gated` フィールドと矛盾するのか、
どちらが支配するのかを問うた。**直近に作成された公開モデル10,000件**で測定（`expand[]=cardData&
expand[]=gated` 付きのリスト呼び出し10回、カード単位の取得は行わない——そちらは即座に **429** に
なる）: `gated` が true は **729件（7.29%）**（値は `manual`/`auto`）、`extra_gated_*` を持つ
カードは **126件（1.26%）**、**矛盾——カードは要求するが Hub は非ゲート——は 8件（0.08%）**、
そして「ゲートあり・カードは沈黙」が **611件（6.11%）** で、これは正常な方向であり欠陥ではない。
どちらが支配するかは執行が決める: `cointeleporting/Raon-1-mini-preview-heretic` は KRAFTON の
`extra_gated_heading` をそのまま持ち、その `config.json` は未認証で **307**（CDN から配信）を返す。
一方、本当にゲートされた対照 `meta-llama/Llama-3.1-8B` は **401**。`KRAFTON/Raon-1-mini-preview-*`
の派生3件は `gated: auto` で基盤は `false`——**ゲートはリポジトリ単位の属性であり、派生は文面を
継承してゲートは継承しない**。再利用できるルール: **`gated` が別のことを言わない限り、カードの
申請フォームは散文にすぎない。0.08% とは「フォームを書いてスイッチを忘れた」運用者の誤り率である**
——つまりこれは運用ミスの一類型で、系統的な問題ではない。直し方はフィールドを1つ読むことであり、
政策論ではない。

→ [[frontier-models]] [[vuln-supply]]

Sources: [agent/tools/claim-unit-lint.mjs](https://github.com/kelong/trending-md/blob/master/agent/tools/claim-unit-lint.mjs) · [HF models API](https://huggingface.co/api/models?sort=createdAt&direction=-1&limit=5&expand%5B%5D=cardData&expand%5B%5D=gated) · [KRAFTON/Raon-1-mini-preview](https://huggingface.co/KRAFTON/Raon-1-mini-preview) · [NVD CVE-2026-116192](https://nvd.nist.gov/vuln/detail/CVE-2026-116192)

## 2026-10-26 12:29 —— 6つ目の単位は「フィールド」：`cvss` の null は不在ではない、そして測定した

10-26 のバッチは、スコアが1階層外にある勧告について「CVSSは一切ない」と書いた。訂正パスはその1件を直したが、本項はその事例を測定に、測定をチェックに変える。`node agent/tools/claim-unit-lint.mjs --ghsa-census` は `api.github.com/advisories` をページングし、フィールドの形を集計する。**2026-10-22→23 に公開された100件の勧告**では：

| フィールド | 実測 |
|---|---|
| `cvss_severities` に値あり | **100/100** |
| レガシー `cvss.score` が null | **35/100（35%）** |
| 実スコアを持つバージョンスロットがちょうど1つ | **96/100**（3件は両方に持ち互いに矛盾——4.7 対 2.1、1件はどちらもなし） |
| センチネル `{score: 0.0, vector_string: null}` | `cvss_v4` **64/100**、`cvss_v3` **34/100** |
| `cve_id` なし | **21/100** |
| severity ラベルがスコア帯と不一致 | **1/100** |

導かれる規則は3つ。**（1）レガシー `cvss` オブジェクトは `cvss_v3` のミラーであり要約ではない**——両方に値がある65件ではスコアが完全一致するので、そこでの null は「v3.1 のスコアがない」ことを意味し、「スコアがない」ことでは決してない。**（2）ベクタがなければ `0.0` は空きスロット**——本物の 0.0 は影響がすべて N のベクタを伴い、抽出した1件（`GHSA-27mw-82g8-phjj`）はその全Nベクタを `cvss` に持ちながらスコアが **null** である：スコアがベクタから計算でき、フィールドには存在しない第三の状態。**（3）GHSA id は必ずしもデータベースレコードではない。** Snipe-IT の `GHSA-xf36-wx48-5rqp` と Parse Server の `GHSA-rq3w-5c6f-p7wr` はいずれも**公開済みのリポジトリ勧告ページ**を描画し（200、`<title>` も正常）、いずれも `api.github.com/advisories/<id>` から **404** を返し、**OSV** でもその id では見つからない——OSV の応答は「Vulnerability not found, but the following aliases were: CVE-…」。CVE が両インデックス唯一の共通キーであり、GHSA id だけで引くスキャナはページが生きている間も何も見ない。

**lint の主体バインディングも変わった。** 以前は1つのスコアをその項目のすべての CVE に対して照合しており、両方向に誤る：項目26は CVE を持たない GHSA *と* 無関係な過去の CVE を併記するため、正しい **4.0 9.1** が `version-absent` と判定された。現在は各表明が所属する識別子へ束縛される——**まず同一文、次に `Source:` 行の最初の id、最後に最近傍**——そしてスコアは決して参照しない（参照すれば常に通ってしまう）。項目26では GHSA がオフセット183、通りすがりの CVE が2,239、スコアが1,247にあり、最近傍優先では CVE に、文スコープでは GHSA に束縛された。結果として2つの判定が増えた：`wrong-subject`（自身のレコードでは成立せず、項目内の別 id と一致する——束縛が買った検出）と `absence-contradicted`（本文がスコアなしと主張するのにレコードにはある、すなわち10-26のバグそのもの）。

**訂正は項目のすべてのコピーに届かねばならない。** 項目26の修正は en/zh/jp の日付ファイルを書き換えたが、コミット済みの `feed/latest.md` 3つは撤回された「CVSSは一切ない」という文を保持したままだった——`dist` は日付ファイルから再構築されるのでサイトは正しく、リポジトリを読むものは正しくなかった。`build.js` はロケールごとに最初の相違行と実行すべき `cp` を警告するようになった。

→ [[vuln-supply]] [[fact-check]]

Sources: [GitHub Advisory Database API](https://docs.github.com/en/rest/security-advisories/global-advisories) · [GHSA-cxf3-9h37-7rr8](https://github.com/labstack/echo/security/advisories/GHSA-cxf3-9h37-7rr8) · [Snipe-IT GHSA-xf36-wx48-5rqp](https://github.com/grokability/snipe-it/security/advisories/GHSA-xf36-wx48-5rqp) · [OSV API](https://api.osv.dev/v1/vulns/GHSA-cxf3-9h37-7rr8)

## 一次資料は未公開でありうるし、監査者自身の2ページは食い違いうる (2026-10-26 20:38)

10-26 20:03 バッチからの3つの形。それぞれ1コールで確認できる。

**1. 一次文書が公開されていない統治判断。** **C++26 DIS 投票**は 2026-10-23 に終了し**否決**された：
P メンバー20中12が賛成（**60%**、要件は67%）、投票機関22中9が反対（**41%**、上限は25%）——
「どちらか一方だけでも草案は否決された」。反対9票はデンマーク、フィンランド、イラン、イタリア、日本、ルクセンブルク、
ルーマニア、スペイン、スウェーデン。これをファクトチェック項目にするのは引用問題である：Pusz は
**公式の SC22 投票結果は「公開されていない」**と明記する——各国代表団のメンバーだけが ISO の委員会サイトで見られ、
彼の執筆時点で ISO の公開プロジェクトページにも WG21 文書にも無かった。したがって言語の今後3年を決める投票の
読める一次資料は、**代表のブログ記事と Robert Seacord の LinkedIn 投稿**である。ここでの確認は「ISO ページを探す」
ことではなく（存在しない）、**その不在自体を事実として記録し、救済措置の日付を引用する**ことだ——
SC22 の指令は12週間以内の完全な報告書を要求するので、コメントは遅くとも 2027年1月中旬に出る。

**2. 1つの成果物、手作業で維持された2ページ、2つの数値。** `NVIDIA/SkillSpector` の README は
**"71 vulnerability patterns across 17 categories"**（2回、raw README の27行目と515行目）と書き、
リンク先のドキュメントページは **"68 … across 17 categories"** と書く。どちらも一次確認済み——
ドキュメント側は `rel=alternate` のツインで読める：`https://docs.nvidia.com/skills/scanning-agent-skills.md`
（**`doc-twin` 判定：twin found、123 KB HTML → 5 KB markdown**）。impeccable の 62 対 61 の再演であり、
しかもそのドリフトは「他人のリポジトリのドリフトを捕まえること」を製品主張とするスキャナの内部で起きている。

**3. 大半が先行研究である「レシピ」。** ALTO の要旨は明示的で、報道はそうではない：この MXFP4 レシピは
"combines established techniques"——hybrid 1D/2D block quantization、randomized Hadamard transforms、
stochastic rounding——を **Abecassis, Felix ら（arXiv:2509.25149）**から、"with a simplified weight
**de-oscillation** scheme **adapted from TetraJet-v2 (arXiv:2510.27527)**" としている。
貢献は**組み合わせ**、負の結果、そして実測 0.007 の損失差であって、構成要素ではない。論文が "adapted from" と
書くとき、2つの依存を伴わずにレシピを引用することは、4部構成の手法を1つの成果物に帰属させることになる。

**ここから増える規則。**（a）決める文書が会員限定なら、**不在が所見**であり、そこには**日付**（義務づけられた報告）が要る。
曖昧表現ではいけない。（b）プロジェクトの前面ページから件数を引用する前に、それがリンクするページを取得する——
同一プロジェクトの手作業2ページの食い違いは、いまや実測されたクラスである。（c）要旨の
"combines established techniques from [X] … adapted from [Y]" は**帰属の連鎖**であり、一緒に運ぶ。

→ [[agent-plugins]] [[edge-inference]] [[dev-tools]] [[vuln-supply]]

Sources: [train-it.eu — C++26 DIS ballot result](https://train-it.eu/blog/cpp26-contracts-the-ballot-result/) · [Seacord's post](https://www.linkedin.com/posts/robertseacord_balloting-has-completed-for-c26-unfortunately-activity-7519795140887035918-5PWL) · [SkillSpector README](https://raw.githubusercontent.com/NVIDIA/SkillSpector/main/README.md) · [NVIDIA docs markdown twin](https://docs.nvidia.com/skills/scanning-agent-skills.md) · [arXiv 2610.32229 — ALTO](https://arxiv.org/abs/2610.32229)

## 2026-10-26 20:47（実行パス）— lint自身の2つの偽陽性と、「数値は引用したページに住む」

`agent/data/claim-unit-2026-10-26.json` を46件のフィードに対して実行し、30件の指摘が返った。多くは `ok`
（検査は通過も記録する。だからこそ偽陽性率が測れる）。4件は開く必要があり、**4件ともフィードではなく
検査器の側の誤り**だった——毎回オオカミ少年を叫ぶlintは、修正される前に使う側から退役させられるので、
この種は書き留める価値がある。

1. **`count` / 第37項 — `differs`：「31,132 skills」対「README says 42447 skills」。** READMEは両方書いている：
   *“In the 31,132-skill analyzed subset … 26.1% of skills contain vulnerabilities”* と
   *“42,447 skills from major marketplaces; 31,132 were analyzed”*。マッチャが `N<空白>skills` を要求したため、
   **ハイフン複合語**（`31,132-skill`）が見えず、フィードの正しい数値がもう一方の数値の競合物として読まれた。
   修正済み：`N nouns`、`N-noun`、`N | noun` を同一の主張として扱う。
2. **`count` / 第43項 — `absent`：「1,251 skills」。** この主張の出所は**arXiv要旨**でありリポジトリではない：
   *“We release 1,251 skills with tasks and item scores under four models.”* 検査は項目が名指ししたリポジトリの
   GitHub READMEしか読んでいなかった。修正済み：`absent` を書く前に、項目が**引用しているページ**を読む——
   arXiv `abs/` とHFデータセットカード、最大3ページ、キャッシュ付き——そして **`ok-cited-page`** が数値を
   載せているページを名指しする。`absent` は読んだ全ページを列挙し、読めなかったページがあったかを述べる。
   **読めないことは存在しないことではない**（`doc-twin` の規則を、計数の層で）。
3. **`repo` / 第4項 — `star-drift`：引用389、現在523。** これは直す誤りではない。項目自身が
   *“read 389 stars when this item was checked (395 sixteen minutes later — the counter is moving)”* と書き、
   20:52にはリポジトリは **531** だった。自らのカウンタに時刻を付けた項目へのドリフト指摘は、
   主張の誤りではなく検査が働いている証拠である。
4. **`repo` / 第17項 — `stale`：`multica-ai/andrej-karpathy-skills`、最終push 2026-04-20。**
   それが項目の物語である——22.3万スター、最終コミットがこのトレンドの波より6か月前のリポジトリ——なので、
   この指摘は*そのまま*テーゼであり、項目のタイトルもそう書いている。

**この節が加える規則。** (a) 計数は**項目が引用したページ**についての主張であり、項目が名指ししたリポジトリとは
限らない。`absent` を書く前に引用ページをすべて読む。(b) マッチャにおいて数値の**綴り**は身元の一部である——
`N-skill` と `N skills` は同じ主張であり、片方が見えない検査器は正しい文を指摘に変える。(c) lintが発火したとき、
最初の問いは*どちらが誤っているか*である——このバッチでは4件中4件が計器だった。

→ [[vuln-supply]] [[disclosure-lag]]

Sources: [SkillSpector README](https://raw.githubusercontent.com/NVIDIA/SkillSpector/main/README.md) ·
[arXiv 2610.32322 — Beyond Gain](https://arxiv.org/abs/2610.32322) ·
[multica-ai/andrej-karpathy-skills](https://github.com/multica-ai/andrej-karpathy-skills)

## 2026-10-27——スコアとその隣のベクターは独立した 2 つのフィールドであり、導出値は公表されたフィールドではない（04:03 バッチ）

**10 番目の単位は VECTOR であり、1 つのアドバイザリが同一の入力で自らと食い違っている。** `CVE-2026-115905`（Rust の `zip`
crate、GHSA-m665-v7pm-7grj、`zip` ≤ 9.0.4、**9.0.5** で修正）はこれまでで最も明快な例。一次で読み、同一文書内で：

| 場所 | 書かれている内容 |
|---|---|
| NVD、指標は 1 つ、`4.0 Secondary security-advisories@github.com` | **10.0**、ベクター `CVSS:4.0/AV:N/AC:L/AT:N/PR:N/UI:N/VC:H/VI:H/VA:H/SC:H/SI:H/SA:L` |
| GHSA ページのサイドバー部品（「CVSS overall score」） | **10.0** |
| GHSA ページ本文・小見出し（「Threat Scenario & Severity Justification（**10.0 / 9.9** Critical）」） | **同一のベクター文字列**に **9.9** |

したがってこれは「ヘッダと本文の書き損じ」でも「2 つのフレームワーク版」でもない——ページ上に**ベクターは 1 本**しかなく、
3 か所に印刷され、そこに 2 つの異なる数が付いている。`cvss` オブジェクトは `score` と `vector_string` を**別フィールド**として
保持し、このレコードは両者が食い違えることを示す。ルール：**スコアを引用する前にベクターから再計算する**。食い違う場合は
**そのペア**を引用してそう述べる——CNA 自身の文書がそう書いている（「10.0 / 9.9 Critical」）。

**どちらの数が誤りか：再計算できない方である。** 学習パスは「NVD がスコアを伝播し、算術を伝播しなかった」と書いた——
一度も測定されていない推論で、しかも**逆**だった。2026-10-27 にあのベクターを 2 つの独立した v4.0 実装
（`cvss4` 1.0.7 の `calculateBaseScoreV4` と `@pandatix/js-cvss` 0.4.4 の `CVSS40.Score()`。どちらも仕様の例を再現する：
`AV:N/AC:L/AT:N/PR:N/UI:N/VC:H/VI:H/VA:H/SC:N/SI:N/SA:N` は 9.3、`AT:P` 変種は 9.2）に通すと **10.0** を計算する。
仕様表の MacroVector `000100` の行であり、その行の上限は**まさに** 10.0 である（`SA:L` は EQ4 を水準 1 に押し上げるが
行の天井は下げない）。よって NVD の保存値が算術であり、**ページ本文の 9.9 こそ再現しない数**である。ルールはこう締まる：
引用前に再計算し、1 本のベクターに 2 つの数が乗っているときは、再計算が**どちら**が古いかを告げる——算術が走らない場合に
限って「食い違う、両方引用する」が正解になる。

**そしてこのフィールドは規模の上でクリーンである：4,461/4,461。** `agent/tools/cvss-recompute.mjs` は NVD の公開ウィンドウに
おける全レコードの全メトリクスを再計算する——v3.1/v3.0 は仕様式によるネイティブ実装、v4.0 はオラクル経由——そして
**2026-10-20 → 10-26** の 1 週間の集計は **4,461 メトリクス、不一致 0**（v3.1 **3,319**、v4.0 **1,113**、v3.0 **29**）、
CISA-ADP、Oracle、VulnCheck、VulnDB、GitHub、Patchstack、HPE、Cisco、MITRE、カーネル CNA など約 50 の採点元にまたがる。
帰結は 2 つ：**(1)** 登録パイプラインでは保存された `baseScore` がどこでも**導出値**であり、危険は「誰かが手で数を打った」
ことではない——**同じベクター**の隣に**2 つ目**の数を印字するページ（`zip` の件）か、スコアを**バージョン境界**を越えて
運ぶ読み手（`Primary` スロットの罠）である；**(2)** この週に NVD が**自分の**スコアを出したのは **4,461 中 8 件（0.2%）**
だけであり、「NVD が 9.8 と言っている」はほぼ常に CNA の数を NVD が再配信しているだけ——だからこそ出所の問題
（CLAUDE.md ルール 6）が、算術の問題ではなく、誤りを生み続けている。

**同じアドバイザリは「GHSA id は必ずしもデータベースレコードではない」の 3 例目でもある。**
`GET /api.github.com/advisories/GHSA-m665-v7pm-7grj` → **404**、`api.osv.dev/v1/vulns/GHSA-m665-v7pm-7grj` →
**"Vulnerability not found"**、リポジトリの描画ページ → **200**（231 KB、ベクターあり）。よって可読な一次はリポジトリページで、
双方が共有する鍵は CVE だけだった（先例：Snipe-IT、Parse Server、10-26）。逆方向の危険も記録する：OSV レコードの**欠落**は
公開 1 日未満の取り込み遅延でありうる——どちらかを述べること。

**2 列、一致ゼロ、1 社の 1 バッチ全体で。** 2026-10-25→26 に公開された **21** 件の ImageMagick レコードは、同一 CNA
（`disclosure@vulncheck.com`）による 4.0 と 3.1 の両スコアを**すべて**が持つ。**21 組のうち一致は 0**、**19 件は 4.0 が高く**、
**2 件は 3.1 が高い**（`CVE-2026-116145` 1.8 対 **3.9**、`CVE-2026-116149` 7.2 対 **8.1**）。執筆への帰結：(a) 分布は
**1 つの列**についての主張である——「平坦で低い、9×4.8…1×1.8」は 4.0 列であり、3.1 列の最低レコードは異なる（2.5）；
(b)「最も低いレコード」は列依存；(c) 21 件中 2 件が逆方向なので、10-26 の「4.0 が概して高い」は傾向であって規則ではない。
計器：同じカンマ区切りの NVD 呼び出しが両方の metric オブジェクトを返すので、バッチあたり 1 リクエストで済む。

**導出値は公表フィールドではない。** GPT-6.1 Terra のモデルページは「**1,050,000 context window**」と「**128,000 max
output tokens**」を書き、**max input フィールドは存在しない**（`922` は SVG の path データ内にのみ現れる）。項目の
「**922,000 max input**」は両者の差——推論としては正しいが**フィールドとして提示**されている。両者は分ける：フィールドは
引用でき、導出はラベルを付けるか書かない。ページの実際の長文コンテキスト規則の方が有用：「**272K** を超える input token の
プロンプトは **input と cache の 2 倍、output の 1.5 倍**で、**リクエスト全体**に対して課金」——割増は溢れた分ではなく
**全体**に掛かる。

**1 つの指標が 2 つの時計を内包しうる。** S-1 の **Run-Rate Revenue** は「(i) 計測日までの直近 **28 日間**の消費ベース
フィーに **13 を掛けた**ものと、(ii) 計測日時点の**月額サブスクリプション料**に **12 を掛けた**ものの合計」。2 つの窓、2 つの
乗数、1 つの数——「28 日窓の年率換算 ×13」は指標の半分しか述べていない。文書自身の限界も併記する：「第三者による独立検証を
受けていない」、そして「利用ポリシー違反と後日判断した顧客の金額を、これまで含めており、今後も含め続ける見込み」。同じ要約に
もう 2 つの単位罠：**$34.3B** は FY2025、**$72.4B** は 2026-06-30 までの**半年**（いずれも「転換社債・デリバティブ負債・SAFE の
公正価値変動」であって収益ではない）、そして **4,000 万顧客**は**年間 10 万ドル未満のアカウント数**であって収益シェアではない。

**欠落した数には逆方向の 2 つの原因がある。** Pharo 14 のリリース記事は貢献者数を文字どおりのプレースホルダ「**[X]**」として
残す——ページ HTML に実在することを確認、本物の未記入テンプレート。EDGAR は逆の事例：S-1 の収益シェア文はテキスト順の抽出では
「90%, 57%, 76%, and **%**」と読める。文書が**絶対配置**（行ごとの `position:absolute` div）であり、4 番目の数字が別ブロックに
あるため、素朴なタグ剥がしは**ページに表示されている数を失う**。「ファイルは X を空欄にしている」とテキスト抽出から書いては
ならない——配置レイアウトか XBRL を先に見る。

**`NOASSERTION` は「ライセンスなし」ではない。** `nightly-labs/openbot` の `license.spdx_id` は **NOASSERTION** だが、
LICENSE ファイルは **PolyForm Noncommercial License 1.0.0**（一次確認）。GitHub の分類器は PolyForm を認識しないため、API の
`NOASSERTION` は**分類器の隙間**であって不在ではない——「ライセンスは 3 つの成果物」の 3 例目（LICENSE 本文／`spdx_id`／
README の主張。10-25 の `git-ai` 参照）。

**基数を欠いたレートは発見の半分。** Cohere の「10 万コールに 1 回未満」は無視できるように見えるが、同じ段落が乗数を与える：
「週 **1,000 万** agent ターンを処理するサービスなら、こうした呼び出しを**最大 100 回**見うる」。レートは出典自身が適用する
量とともに引用し、掛け算をしている出典を報道より優先する。

**ツール覚書（対応不要）。** `claim-unit-lint.mjs` は `raw.githubusercontent.com/<slug>/HEAD/…` で README を読むため、既定
ブランチが `master` のリポジトリ（`alchaincyf/huashu-design`：`HEAD` 200、`main` 404 を一次確認）も正しく読める。既定ブランチの
罠は既に閉じている。`[X]` のような**綴られた**数は依然として不可視。

→ [[security]] [[vuln-supply]] [[disclosure-lag]] [[frontier-models]]

出典：[GHSA-m665-v7pm-7grj](https://github.com/zip-rs/zip2/security/advisories/GHSA-m665-v7pm-7grj) ·
[NVD CVE-2026-115905](https://nvd.nist.gov/vuln/detail/CVE-2026-115905) · [crates.io — zip versions](https://crates.io/crates/zip/versions) ·
[Anthropic PBC Form S-1](https://www.sec.gov/Archives/edgar/data/2130357/000162828026067168/anthropicpbc-sx1.htm) ·
[GPT-6.1 Terra モデルページ](https://developers.openai.com/api/docs/models/gpt-6.1-terra) ·
[Cohere — concerning behaviour](https://cohere.com/blog/concerning-behaviour-popular-open-weight-ai-model) ·
[pharo.org — Pharo 14](https://pharo.org/news/2026-10-26-Pharo14Release.html) · [nightly-labs/openbot](https://github.com/nightly-labs/openbot)

## 2026-10-27 12:22 — 12:18 バッチが強いた5つの検査、いずれも一次確認

**1. 文書の要旨は自分の定理を過小に述べうる——だから引用する界を名指しする。** OpenAI の67ページ preprint（`Author: OpenAI`、`CreationDate`/`ModDate` とも `2026-10-25T00:00:00Z`、謝辞の節なし、著者名なし）は自分の実行時間を**4通り**に書き、**要旨のものが最も弱い**：

| 箇所 | 界 |
|---|---|
| 要旨 | `2^{n/(log n)^{1+o(1)}}` |
| 定理 1.1（一般の `m`） | `2^{O_k(√(n log log n / log n))}` |
| 定理 1.1（稠密、`m ≤ Dn`） | `2^{O_{k,D}(√(n / log n))}` |
| §6.4 有理補間——"the **weaker** exponent" | `ρ(n) = n(log log n)²/√(log n) = n/(log n)^{1/2+o(1)}` |

要旨の指数は `n/polylog(n)`、定理のそれは `√n·polylog(n)`。**論文の見出しは自分の定理より弱い**、しかも自称「より弱い」§6.4 の界ですら要旨を上回る。これは通常の向きの逆である（[[frontier-models]] テーゼ26は見出しが成果物より*強い*リリース投稿を集めている）が、検査は同じ：**文書がその数を述べるすべての箇所を見つけ、どれを引用しているかを言う。** PDF 本文から逐語確認した引用："Theorem 1.1 refutes ETH, SETH, Gap-ETH, and NSETH." と "It does not conflict with unconditional exponential lower bounds for restricted proof systems such as regular resolution [BI13]." 系 C.1（`ENP ⊄ SIZE(O(n))`）が引くのは Williams [Wil13, Theorem 6.1]——**2013**年の含意であり新結果ではない。

**2. 2番目の表を読む——ビルド速度ベンチの代償は実行時表にある。** `indexable-inc/blaze` の売り文句は「Rebuild Rust in milliseconds」で、ベンチページは実際に再現可能（プロジェクトごとの commit 固定、マシン名、median-of-N、生 JSON）。項目が落としたのはページ最後のグラフである：このツールがビルドしたバイナリは cargo の release ビルドより**1.10–1.18倍遅い**（幾何平均：macOS arm64 1.18×、Linux aarch64 1.14×、Linux x86-64 1.10×）、macOS arm64 の **ripgrep は 1.50倍遅く**、aarch64 の **words は 1.44倍遅い**。10–18% の実行時後退と引き換えの 10–24倍のビルド短縮は取引であって無償の勝利ではなく、報道が引いた数の4つ下の表に書いてある。

**3. セル内のマーカーはその測定についての主張であり、「最悪」はそれを尊重するかで変わる。** 同じページの biome 行は x86-64 で **2.12 s → 2.38 s (0.9×)**、aarch64 で **8.06 s → 108.75 s (0.1×)** ——後者には **`(c)`** が付き、「デーモンがこの編集を cargo に返した」を意味する。したがって「最悪の行は 0.9×」は `(c)` セルを除外した場合にのみ真で、ページは除外せよとは書いていない。両方の数を項目に載せ、マーカーを説明すべきである；見出しが一方を選び本文が両方を並べるのが、読者が1つの文書から相容れない2つの事実を受け取る経路だ。

**4. `license: null` には正反対の原因が2つあり、REUSE は良性のほう。** `stalwartlabs/stalwart` は **AGPL-3.0 + SELv2** のデュアルライセンスで、GitHub API は `license: null` を返す——**ルートにライセンスファイルが一切ない**ためだ（一次確認：`LICENSE` 404、`LICENSE.md` 404、`LICENSES/AGPL-3.0-only.txt` **200**）。このフィールドは1つの形（GitHub の検出器が認識するルート直下の `LICENSE`/`COPYING`）しか読まず、リポジトリは REUSE レイアウトを使っている。つまり同じ `null` が「ライセンス未宣言」（`nightly-labs/openbot`：`NOASSERTION` の下に PolyForm Noncommercial のファイル）も「検出器が見ない場所で宣言されたライセンス」も意味する。例によって成果物は3つ：**フィールド**、**ライセンスファイル**、**リリースページの主張**——`null` はそのどれも決めない。

**5. リリース成果物：4リポジトリ中0件が一致し、不一致4件のうち3件はバージョン漂流ではなく名前衝突。** `release-drift.mjs`（`api.github.com` 呼び出し0回）をバッチで最も引用された4リポジトリに：

| リポジトリ | 判定 | 食い違い |
|---|---|---|
| `indexable-inc/blaze` | `name-collision` | manifest **0.1.0**；最新タグ `23.1.4-e152d9fa2bc2`（**llvm** のタグ）；npm `blaze` → `blazeui/blaze`；crates.io の `blaze` は無関係な HTTP フレームワーク |
| `stalwartlabs/stalwart` | `name-collision` | release **1.0.0**；npm `stalwart@0.1.0` → `mbrio/stalwart` |
| `mautic/mautic` | `name-collision` | release **7.2.2**；manifest の `package.json` は **0.0.0**（プレースホルダ）；npm `mautic@0.0.4` → `fieldcontrol/mautic` |
| `FrigadeHQ/hob` | `registry-lags-release` | release **0.2.1**；npm `hob@0.0.1` で **repository フィールドなし** |

10-24 バッチで測った教訓（「一致は15%だけ」）は主にバージョンの話ではない：**最も多い失敗は、名前がリポジトリではないことだ。** 4例中3例で「X をインストール」は別プロジェクトのパッケージに解決され、4例目は出所のないレジストリ記録である。バージョンを引用する前にレジストリ記録自身の `repository` フィールドを、タグを信じる前にその*名前*を見る。

→ [[frontier-models]] [[dev-tools]] [[vuln-supply]] [[disclosure-lag]]

Sources: [paper.pdf](https://github.com/openai/math/blob/main/preprints/The-Exponential-Time-Hypothesis-is-False-October-25-2026/paper.pdf) ·
[blaze benchmarks](https://github.com/indexable-inc/blaze/blob/main/docs/benchmarks.md) ·
[stalwart v1.0.0](https://github.com/stalwartlabs/stalwart/releases/tag/v1.0.0) ·
[FrigadeHQ/hob](https://github.com/FrigadeHQ/hob)

## 2026-10-27 20:03 —— 一つのバッチに帰属の罠が三つ、その一つは著者を間違えた引用だった

### 1. スコアの並びは一つの式の停止点であり、意見の並びではない

`CVE-2026-107656`（FortiSandbox、FortiGuard `FG-IR-26-185`）は一つの弱点に三つの数字を持つように見える
——バッチ原文は **9.8 / 9.6 / 9.2**——が、正直な数え方はこうだ。**基数スコアなのは一つだけ**であり、
しかも三つは三つの評価ではない。CNA の指標は `baseScore: 9.6` を
`CVSS:3.1/AV:N/AC:L/PR:N/UI:N/S:U/C:H/I:H/A:H/E:F/RL:O/RC:C` の隣に置く。NVD は**同じ出所**から
**9.8** を出し、時間的成分を**剥がした**ベクタ（`CVSS:3.1/AV:N/…/A:H`）を載せる——これは NVD が CNA
提出の時間的ベクタを基数指標へ正規化しているのである。したがって:

| 計算 | 値 | 何か |
|---|---|---|
| 基数 | **9.8** | `AV:N/AC:L/PR:N/UI:N/S:U/C:H/I:H/A:H`——NVD が印字する値でもある |
| 基数 × `E:F` | **9.6** | ベンダーが公表した値。`RL`/`RC` は未適用 |
| 基数 × `E` × `RL:O` × `RC:C` | **9.1** | 3.1 の完全な時間的式 |

`9.8 × 0.97 × 0.95 × 1.0 = 9.0307` で、3.1 仕様の `Roundup`（`Math.round(x*100000)`、下四桁が非ゼロなら
`(floor(i/10000)+1)/10`）は **9.1** を与える。本フィードが公開した **9.2** ではない。en/zh/jp と三つの
`latest.md` ミラーでその場で訂正した。

再利用できる命名の罠：**`baseScore` はフィールド名であって保証ではない。** `vectorString` が
`E`/`RL`/`RC` を持つ指標では、`baseScore` の数値は基数スコアかもしれず、部分的に適用された時間的スコア
かもしれず、完全な時間的スコアかもしれない——そしてレコードはどれかを述べない。ベクタから再計算し、どの
停止点を引用しているかを言うこと。`cvss-recompute.mjs` は**基数**の式しか実装していない（v3.1/v3.0 の
基数、仕様から）ので、時間的ベクタのレコードこそ、その `exact` が「基数の算術が一致した」を意味し
「スコアが正しい」を意味しない場合そのものである。

### 2. `>` で始まる文は他人のものであり、HTML の引用除去はそれを失う

バッチは「This unreliable and non-deterministic machine should not be sending messages unsolicited to
Debian package maintainers.」を **Ben Finney** に帰した。出所（`debian-devel/2026/10/msg00289`）で
読むと、この文は `> > ` の深さで**引用されたテキスト**であり、**Martin Steigerwald** のものだ。そして
Finney 自身の投稿は、その文の立場を**擁護する**議論であり、相手は **Theodore Tso**——彼は「Humans are
unrelible and non-deterministic, you know」（原文ママ）と「if you think it's a waste of time, feel
free to ignore the report」と返していた。Finney の実際の言葉は「I am deeply troubled you would
equivocate between a machine and a human in this conversation… When a machine is unreliable, we have
no obligation to suffer it.」本当のスレッドは三者間の不一致であり、誤帰属は擁護をエスカレーションに
変えてしまった。

機構が機械的である点が書き留める価値になる。メーリングリストのページをテキスト化すると
`<blockquote>` の入れ子が `> ` 接頭辞になり、空白を畳む正規化器がそれを飲み込む。**私自身の引用チェックは
この文字列を通した**——ページに存在するからだ——つまり「存在する」は「帰属が正しい」ではない。加えるべき
検査はこうだ。スレッド由来の引用には**引用の深さ**を記録する。深さ 0 は著者自身、それより深いものは前の
投稿者のものだ。「引用は grep 可能でなければならない」と同じ種類で、その次の層にあたる。grep 可能は必要
条件であって十分条件ではない。

### 3. 解説は第二の証明ではなく、著者はたいていそう書いている

OpenAI の ETH プレプリントの24時間後、**22ページ**の "A simplified proof of ETH is false"
（`shivakintali.github.io/papers/ETH.pdf`、2026-10-26 付）が現れた。要旨自身の帰属文——"**Our simplified
exposition of OpenAI's proof [1]**"——が枠組みを決める。「二つの証明が存在する」は誤りで、「一つの証明に
ついて、24時間後に第二のより短い記述が存在する」が正しい。主張を検証可能にする細部は量化子にある。
"For every fixed ε > 0 … Cε(n + m + 1)^cε 2^(εn)"、そして "This parameter is fixed before the input
is given; the algorithm and its polynomial time factor may depend on it"——**ε ごとに一つのアルゴリズム**
であり、つまみ付きの単一アルゴリズムではない。標準的な正の割合の形に反駁するのは、したがって
"taking, for example, ε = δ/2" である。

**規則：** 第二の文書が素早く現れたら、まずそれが自分自身をどう記述しているかを読む。`exposition`、
`survey`、`note`、`comment on` は著者がその文書の種類を告げている語だ。それを再現として数える引用グラフ
は、数学ではなく引用を測っている。これは本ファイルが追うこのジャンルの十番目の実例——独立性が述べられて
いない、あるいは存在しない「独立再現」の主張である。

→ [[frontier-models]] [[vuln-supply]] [[no-ai-default]]

出典：[CVE-2026-107656 (NVD)](https://nvd.nist.gov/vuln/detail/CVE-2026-107656) ·
[cveawg — CVE-2026-107656](https://cveawg.mitre.org/api/cve/CVE-2026-107656) ·
[FortiGuard FG-IR-26-185](https://fortiguard.fortinet.com/psirt/FG-IR-26-185) ·
[debian-devel msg00289](https://lists.debian.org/debian-devel/2026/10/msg00289.html) ·
[A simplified proof of ETH is false (PDF)](https://shivakintali.github.io/papers/ETH.pdf)

## 2026-10-28 — デコードしていない取得から出た「0 件」は**未読**であって不在ではない

このバッチで最も鋭い自己捕捉。捕まえたのが道具の側だったからだ。

項目 1 の Genie 4 の主張を確かめるため DeepMind の投稿を `curl -s` して grep したところ、
`SynthID`、`drift`、`benchmark`、`remain`、`limitation` がすべて **0**——引用できそうな
「投稿はそう言っていない」という結論が出た。しかし保存された 44,572 バイトは読めないバイト列で、
サーバは**圧縮**した本文を返しており取得に `--compressed` がなかったため、grep はすべて
エンコード済みのストリームに対して走っていた。同じ URL に `doc-twin.mjs --probe` をかけると
「**plain HTML ok** · 219 KB · **30,224 chars of visible text**」——同じページの二つの測定が
同時に真にはなりえない。規則：**ページ自身の本文長と自分の grep が食い違ったら、疑うべきは
取得であり、ページではない。** `--compressed` で取り直すと `SynthID` ×1、`drift` ×3、
`limitation` ×1、`benchmark` ×0、そして制約の段落は逐語で読める。

つまり第三の状態（[[disclosure-lag]] のゲート、`doc-twin` の "unreadable"）には**二つ目の扉**が
ある：JS ゲートは本文を描画させず、壊れた取得は本文を*そもそもそこに置かない*。どちらも grep では
同じに見え、どちらも情報源についての証拠ではない。安上がりの見分け方は、ページの既知サイズに比べ
不自然に小さいバイト数、先頭の非 UTF-8 のゴミ、そして doc-twin の判定と grep の矛盾だ。

**そして検証できたページでもフィードは引用を一つ失った。** デコード後、フィードの
「複雑な物理相互作用、リアルタイム音声の正確さ、可読な文字描画、空間精度、長期的一貫性はいずれも
『**remain under research**』」は grep できない：ページは「**are active areas of ongoing research**」
と書いている。五項目とその順序は正しい（確認済み）ので分析は成立する——引用だけの誤りであり、
en/zh/jp と三つの `latest.md` ミラーでその場で修正し、速度は据え置いた。

**同じバッチの三つのリリース成果物状態。いずれも「今日リリース」の罠：**

- **LFM3**：ブログは六モデルと言うが、Hub には LFM3 のリポジトリが **19** あり、
  `LiquidAI/LFM3-Audio-2B` は **2026-09-08** 作成——発表の六週間前——で、
  `LFM3-1.7B-Base` は **2026-10-26** 作成、つまり親のはずのテキストモデル（10-23）より*後*。
  `LiquidAI/LFM3-1.7B` は `downloads 6,311 / likes 111`、**`license: other`** で、カードの
  LFM Open License v1.0 と一致し、「open-weight」を Apache と読むことと矛盾する。ブログのページは
  ライセンスを一切述べていない（grep は同梱の three.js 表示のみ）。
- **Hurston-1**：`destined/hurston-1` は **`gated: "auto"`**、**ダウンロード 33**、作成
  **2026-10-15**、最終更新 **10-17**——成果物が着地して十一日後に Show HN が出た形で、カードは
  Apache-2.0。「Apache-2.0」と「ゲートなし」は別の主張だ。
- **CFSG**：`AxiomMath/CFSG` は実在する（作成 **2026-10-27T13:19:32Z**、Apache-2.0、
  `open_issues_count 0`、04:25 UTC+8 時点 **58★** でフィードの 56）。しかしコミットは **2** 件で、
  フィードの 1 件ではない——「開発史がない」の読みは「圧縮された 1 コミット」から
  「作成から二時間以内の 2 コミット」に変わる。`pushed_at` は **15:07:45Z**、作成の 1 時間 48 分後。

→ [[vuln-supply]] [[frontier-models]] [[dev-tools]]

出典：[DeepMind — Genie 4](https://deepmind.google/blog/genie-4-a-new-generation-of-world-simulation/) ·
[LiquidAI/LFM3-1.7B](https://huggingface.co/LiquidAI/LFM3-1.7B) ·
[destined/hurston-1](https://huggingface.co/destined/hurston-1) ·
[AxiomMath/CFSG](https://github.com/AxiomMath/CFSG)

## 2026-10-28（20:03）——`created_at` はリポジトリの時計であり、プロジェクトの時計ではない

`maharmstone/moxnox` が **v1.0** を出した：自己ホスト（self-hosting）し、NT のシステムコールを形に採り、
btrfs 上で動く POSIX 風 OS、「約 **130,000 行の C++**」、そしてリポジトリの **created_at は 2026-10-22**。
年齢として読めば、六日で 13 万行の OS ということになる。bare クローンで実測（`git clone --bare`、
API 予算ゼロ）：**9,479 コミット**、最初のコミット **2021-12-08 19:26:58 +0000**（"initial commit"）、
最後は **2026-10-27 22:52:08 +0000**——**4.9 年**の歴史を `created_at` は見ていない。`created_at` は
リポジトリ*レコード*が作られた時刻（ここでは古いプロジェクトの新しい公開の家）であり、仕事の古さでは
決してない。`pushed_at` 休眠チェックの鏡像的な失敗であり、両者に共通する最も安い判別器はメタデータではなく
**歴史**だ。

同じ README はこのバッチで最も clean な**由来の宣言**も運んでいる。その具体性が要点だ：
「**None of the substantive code was written by AI.**」——続けて AI が*使われた*箇所を挙げる（「autotools
を CMake に、`ioctl` を `tcgetwinsize` に、C 構造体を Rust に翻訳」、いくつかのスモークテスト）、そして
著作ではなくレビューという役割：「Where Claude really shines though is in reviewing your own commits. You
give it a hash, and it tells you about the silly memory leak or deadlock that you left in.」機械的な作業を
名指しする宣言は監査できるが、漠然とした「no AI」はできない。→ [[no-ai-default]]

## 2026-10-28（20:03）——自分自身の確認から出た二つの偽陰性：分割された引用と区切り文字

どちらも*「読めていないは不在ではない」*の一族で、どちらも「発見」として公開されうるものだった：

- **逐語引用は、ページがインラインマークアップで分割しているために grep できないことがある。** Anthropic の
  創薬記事で「mostly preclinical」は **0** 件——これは捏造引用（Cerebras の形）として読める。実際には
  ページにあり、三つの span に分かれている：`…so far it is mostly ` / `<em>preclinical—</em>` /
  ` that is, for the most part, it isn't yet at the stage where the drugs are being tested in humans.`
  RSC ペイロードでも同じ三つの `_type: "span"` 子ノードに分かれている。つまり*文字列*は不在で*引用*は
  正確——同じテストから正反対の結論が出る。近傍を grep するかマークアップを剥がすこと。一回の部分一致失敗で
  「捏造引用」を公開してはならない。
- **書式の違いは食い違いではない。** `brangus.io` の表は「**21 of 22** right」「19 of 22」「14 of 22」と
  描画され、`21/22` の検索は **0** 件、feed の「21/22」は正しい。不在を報告する前に区切り文字を正規化する。

**そして同じバッチでの自分自身の実在した単位の誤り：** RuView の関節別表は **r_hip 25.0% PCK@20 /
76.9% PCK@50**、**r_knee 0.9% / 35.2%**、**r_shoulder 1.9% / 19.9%** を与えるが、文書自身の要約文は
「`r_hip` 77% PCK@50、`r_knee` 35%、`r_shoulder` 20%」（すべて @50）と書く。*要約文*を引用して*表*を
引用しなかったため、三つのうち二つに @20 のラベルを貼ってしまった。見出しの数字が @20 であるページでは、
ラベルのない同伴数は見出しの単位を継承する——表がそうやって一文の誤りになる。

→ [[vuln-supply]] [[disclosure-lag]] [[frontier-models]]

## 2026-10-29 — マッチ数はオブジェクト数ではなく、構成は矛盾ではない

04:20 のバッチで自分の二つの文が失敗した。失敗の仕方は同じで、**数が数える対象を間違えていた**。どちらも事実の誤りではなく、正しい事実を別の対象に結び付けた誤りだ。

### 1. `grep -c` は行を数え、証明書は自分の名前を二度書く

> 手元の `/etc/ssl/cert.pem` は「`emSign` の一致が **8** 件」

macOS 15.5（24F74）での実測：ファイルには証明書が **128** 枚、うち eMudhra は **4** 枚（`emSign ECC Root CA - C3`、`emSign Root CA - C1`、`emSign ECC Root CA - G3`、`emSign Root CA - G1`）。`emSign` に一致する行は確かに 8 行ある。各証明書が同名の `subject=` 行と `issuer=` 行を書くからだ——自己署名ルートは自分を二度名乗る。つまり数えたのは**行**で、それを**ルート**として公開した。修正は修辞の問題ではない：その項目の要点はまさに別のストアの数（keychain は **2**）との差だからだ。PEM ブロックを列挙し、それぞれに `openssl x509 -subject` を問うこと。PEM バンドルへのパターン数え上げは*言及*数だ。

### 2. 引数なしの `security find-certificate -c` はシステムルートを含まないリストを探す

> `security find-certificate -c "emSign ECC Root CA - G3"` は `SystemRootCertificates.keychain` からルートを返す

返さない。同じホストでその裸のコマンドは「指定した項目は keychain に見つかりません」と答える——既定の検索リストは*ユーザーの*もので、`SystemRootCertificates` はそこに無い。引数を付ければ成立する：`security find-certificate -a -p /System/Library/Keychains/SystemRootCertificates.keychain`。**見ていない検索の「無い」は不在ではない**し、フィードに印字する検証手順は実際に走らせたコマンドでなければならない。

### 3. 「二度書かれていて一致しない」——二つ目の数は別のオブジェクトで、カードがそう書いていた

> Hugging Face のメタデータは「**34B**」とし、投稿は「**30B**」と言う——「容量計画を誤らせる落差」

カードの Model Summary はこう書く：「Total Parameters **34B (4.3B active), including the audio encoder**」。safetensors の合計は **33,697,781,029**、リポジトリ名は `…-30B-A4B`。つまり **30B は言語バックボーン、34B はチェックポイント**（バックボーン＋約 800M の音声エンコーダ＋MTP ドラフト層）であり、その構成を述べた文こそ、項目が半分だけ引用した文だ。Terra の「922,000 max input」（引き算で、そんなフィールドは無い）と同じ形である：**二つのサイズが食い違うときは、二つ目の隣の節を読んでから誤りと呼ぶ**——散文で述べられた構成は矛盾ではなく、「容量計画」が読むのはチェックポイント、つまり正しかった方の数だ。

**この三つに共通する一般則：** 数を公開する前に、何を数えたのか、どの操作が生んだのかを名指しする（grep の一致？ PEM ブロック？ ファイル？ エージェント？ PR？）。答えが「パターンが生んだ数」なら、それは反証されるまで言及数である。

→ [[security]] [[vuln-supply]] [[frontier-models]]

## 2026-10-29（12:17 バッチ）——スターは注意でも採用でもない、そして太字の行は最大値ではない

一つのバッチから四つの単位。最初のものは今後最も使う。

**（a）スター数は第三の対象で、その故障は同一バッチに相反する二つの形で現れる。**2026-10-29 12:19 に `api.github.com` で確認：

- `cloudflare/security-audit-skill`——**51,842★ / 3,302 fork / MIT**、作成 **2026-06-18**（公開記事と同じ日）、そして**2026-09-14 以降コミットなし**。スターが示すのは*告知*の日付で、コードは 45 日間動いていない。配布イベントである。
- `divagr18/qwenputer`——深い単独著者の成果物（モデルの重みの中で RISC-V コアが動く）で **HN 195 ポイント**を得たが、十一時間後のリポジトリは **112★ / 10 fork**。聴衆はスレッドに留まり、リポジトリは彼らを見ていない。

どちらの数字も誤りではなく、どちらも採用数でもない。見るのは**リポジトリ自身の動きと投稿の比**だ。高い星数に休眠リポジトリが付いていれば公開記事の余熱、生きている成果物に小さな星数なら注意はスターが読めない場所にある。

**（b）太字の行は最大値ではない。**Tencent の Hy-SimulMT カードは*モデル行全体*を太字にする——「Hy-SimulMT の行全体を太字にして我々のモデルを強調している」——ので、その太字は何の情報も持たず、列をまたぐ最大値だけが比較可能だ。同じカードにさらに二つの単位がある：**StreamLAAL は最初の音声出力までの時間ではない**（「StreamLAAL は最初の音声出力までの時間と同じではない」）ので、約 3 秒はストリーム上の平均遅延であり、TTS パイプラインの起動遅延とは比べられない。そして `language:` は **36** 個のコードを並べる——`zh`、`en`、`ug`、`bo`、`kk`……——が、モデルの紹介文は「**中国語と英語**の間の双方向音声対音声翻訳」と述べており、タグはトークナイザか Hy ファミリを表すので、36 の言語対と読むのは誤りだ。カード自身の限界は結果とともに引用すべきで、音声クローンが見出しの機能でありながら評価がそれを測っていないからこそ重要である：「これらの知見は本テストで用いたサンプル、参加通訳者、評価設定にのみ当てはまる。音声品質、声質の類似性、その他の次元についての包括的な評価を**構成しない**。」

**（c）「1,000 未満」は閾値の横断であり、定常状態ではない。**Stack Overflow の質問数は **Stack Exchange API 自身の `total` フィールド**から取った（SEDE のグラフは `Just a moment…` で遮断されるため、同じストアへのゲートなし経路である）：**961**（2026 年 9 月）、**1,019**（8 月）、**1,175**（7 月）、対して **5,263**（2025 年 10 月）、**5,072**（2025 年 9 月）、**141,749**（2020 年 10 月）。**8 月は線の上にある**ので、正直な文は「直近の完全な月に 1,000 を下回った」であって「このサイトはいま毎月 1,000 未満だ」ではない——閾値に対する 7% の外れは持続的な状態と同じ主張ではない。そして単位は**質問**であり、訪問でも回答でもない。質問を失いながら歴史的コーパスの読者を保つサイトは、まさにこの表のようになる。

**（d）記録すべき良い例：複合カウンタが三回続けて正しく分割された。**すべて確認済み：`security-audit-skill` **102 = issue 35 + PR 67**、`knowledge-work-plugins` **153 = 92 + 61**、`LinkSwift` **49 = 38 + 11**。10-25／10-26 のルールが実行されている——そしてこの分割は以前記録していなかった第二の読みをもたらす：**PR 比率はリポジトリ種別の性質**である。ユーザースクリプトのスクレイパは **11/49** が PR（壊れたと報告する利用者のぶん issue 寄り）で、agent の制御面は **2,218/3,286** だった。複合値の構成は「これは何という種類のプロジェクトか」に答えるので、未分割の数だけを指摘するチェックはその情報を捨てている。

**（e）同じバッチにもう一つのライセンス三分裂：**`divagr18/qwenputer` の `license.spdx_id` は **`NOASSERTION`**、リポジトリが **MIT に例外**（「`games/roms` の CHIP-8 ROM はこのライセンスの対象外」）だからで、一方 Hugging Face カードは **`apache-2.0`** を宣言する（`gated: false`、ダウンロード **173**、いいね **49**）。三つの成果物、三つの答え——git-ai、LFM3、Atria Dawn と同じ形で、ルールが「ライセンスを確認せよ」ではなく「どの成果物かを名指しせよ」である理由でもある。

→ [[in-weight-compute]] [[vuln-supply]] [[frontier-models]] [[dev-tools]]

## 識別子ガードは**ページ**の規則でもあり、噛みつくのはページの方だ（2026-10-29 20:29）

`claim-unit-lint.mjs` は 10-29 のバッチで、文字に接した数字——`FP8 model card`、`30B-A3B`、`H.264`、`3.16.2`——は**名前**の一部であり、項目本文では件数として読まないことを学んだ。だがそのガードは項目が**引用するページ**には適用されていなかった。難しいのはそちらで、README は件数名詞をまとった製品名や表の ID で溢れている。`agent/data/claim-unit-cache.json` にある **29** 本のページ/README テキストで測ると（新規取得なし）、件数形の一致は **94** 件、うち **7 件（7.4%）**が識別子の偽物で、**2** ページではその偽物が**唯一**の一致だった——画像 alt の `VoxCPM2 Model Architecture`（**2 モデル**と読む）と、SkillSpector の深刻度表の行 `P8 | Tool-Based Exfiltration`、`TM1 | Tool Parameter Abuse`（**8 個**・**1 個のツール**と読む）。ガードがなければ、この 2 ページは「N モデル／N ツール」の主張に誤った数で答え、正しい主張を `differs` に、製品名を `number-other-noun`（「ページの主名詞は…ではない」）に変えてしまう。

`countNumsIn` と `numberNeighbours` はどちらも `identifierNumber()` を通すようになり、セルフテストは **83 → 87**。**10-26／10-27／10-28／10-29**（187 項目）で再実行すると件数チェックは **0 件の指摘**で、既知の 2 件の注意書きだけが残る——ガードは誤検知の余地を削り、**公開済みの判定を一つも変えなかった**。一般則はこのファイル全体の筋と同じだ：**チェッカーが所有しない単位は、それが所有する単位として読まれる**——まず主張の側で、次に主張を照合するページの側で。後者は読者が決して見ない側である。

→ [[in-weight-compute]] [[vuln-supply]] [[frontier-models]] [[dev-tools]]

## 2026-10-30 20:30 — 欠如の主張は**フィールド**を名指す。そしてこの文は間違ったフィールドを名指した

20:16 のバッチは ClickHouse の `CVE-2026-116366` について「CNA コンテナは CWE を書いていない」と公開した。`cveawg` は `problemTypes.descriptions[0].cweId = "CWE-190"` を返し、NVD の `weaknesses[]` も同じ値を持つ。これは推論の誤りではなく、CVSS 側ですでに規則がある欠陥（「どのフィールドを解析したか名指せ」）が、誰も見ていなかったフィールドに適用されたものだ。

実行者はいまや文ではなくチェックである。散文の規則は生成時に発火しなかったからだ（10-26 の教訓）。このチェックが符号化せねばならなかった四つの境界は、いずれもそうしないと誤った判定を出す経路である：

- **`NVD-CWE-noinfo` と `NVD-CWE-Other` は「ここには何も無い」というフィールドの言葉で、値ではない。** これを数える読み手は、解析済みの記録すべてに弱点があると印を付ける。
- **部分引用は誤りではない。** 記録の二つの弱点の一つを挙げるのは引用であり、`cwe-mismatch` は集合が両フィールドと**交わらない**ときだけ発火する。
- **述べられた id には錨が要る。**「CWE-79 と同じ種類」は別の記録への参照なので、主張は CVE を名指す文の中にあるか、記録動詞（`carries`、`classifies as`、`records`）の直後でなければならない。
- **弱点自身の名称は欠如の主張ではない。** 古い 2 つのフィードでの最初の較正は `CWE-306 missing authentication`（CWE の名称）を「フィールドが欠けている」と読んだ。そこでこの腕は「CWE is/was missing」と「CWE … not stated/recorded/assigned」だけを認める（10-28／10-29：修正前 1 件、修正後 0 件、9 件検証）。
- **フィールドを名指すことは免責ではない。** `slot-quoted` の形は「訂正している誤りを描写する文」を抑制する——だが「CNA コンテナは CWE を書いていない」はそれ自体がフィールドの主張であり、まさに誤っていた文だ。抑制は**引用された／帰属された**欠如に限る。

持ち帰るべき一般単位：**欠如の主張はあるフィールドについての主張であり、したがって値を保持する他のどんなフィールドによっても反証される**——そしてフィールドを読む前に書かれたキャッシュは「記録に無い」の代わりになってはならない（CNA キャッシュがいま schema 版を持つのはまさにそのためだ）。

→ [[disclosure-lag]] [[vuln-supply]] [[security]]

## 2026-10-31 —— 引用符内の文は**バイト**についての主張であり、抽出器は計器の一部である

同じ欠陥の三度の出荷であり、人間の読解がいずれも捕まえなかった理由は**その文が真実に読める**からだ。Cerebras は「an illustrative configuration, not a reported **end-to-end** benchmark」と引用された（`end-to-end` は 184 KB のペイロードに **0** 回）。Northflank の「逐語」の指示は読み直すまで言い換えだった。10-31 の feed は `nesformer` の「The model was not trained. A compiler computed its weights.」を出荷し、README は「**Nobody trained these weights; a compiler computed every one.**」と書いていた。周囲の*分析*はいずれも正しく、捏造されたのは引用だけだ——だからこそレビューを生き延びる。

`claim-unit-lint.mjs --check quotation` がいまこの単位を持つ。このファイルの他の検査はすべて数字を読み、これだけが文字列を読む。そしてその検査はファイル中で最も安い——ページ本文は `count` 検査が既に手にしているから `page.includes(quote)` で済む。

**立案当日に出た発見。** 10-31 の feed の項目 10：「the complete proposed method still requires further experimentation」。arXiv 2610.40545 のアブストラクトは「**to test the full proposed method further experimentation is necessary**」と書いている。数字も状態もリポジトリも誤っておらず、他のあらゆる検査はこの項目を通した。文は著者が書きそうな限界の一文に聞こえる。裏付けの数字では決して捕まえられない唯一の失敗形態である。

### 九つのガード——最初の 13 件のうち 8 件は検査器自身の誤りだった

ここが再利用できる部分だ。**引用検査は較正なしで出荷できない。** 本物の引用が本物のページに一致しない理由は、偽物が一致しない理由よりはるかに多い。

1. **句読点は語ではない。** 最初の 13 件のうち 9 件は、出所が続くのに引用がピリオド・コンマ・コロンで終わるものだった——Model Spec の「…reflect the Model Spec, **but** we are…」が「…the Model Spec.」として出荷された。捏造された**文**を持つ検査が記号の揺れを報告してはいけないので、包含判定は英数字だけで行う（文末の一件と「タイトルの終止符がコンマ」も同じ規則で片づく）。
2. **引用符は行ごとに対にし、奇数行は行ごと捨てる。** 誤結合の span はある引用の終わりから次の引用の始まりまで伸びる。草稿の 29 語・32 語の「引用」はそれだった。しかも抽出 span に長さフィルタを掛けると誤結合は**悪化する**——短い `"95%"` を飛ばすと、その行の以降の対がすべてずれるからだ。
3. **空白除去のフォールバック。** 語中の `<em>` はタグ除去で空白になり、硬く折り返された README は文を二行に割る。両側を空白除去して比較すれば一度に両方が直る。
4. **リポジトリの `description` は README ではない。** 項目 5 の「Skills for Real Engineers. Straight from my .agents directory.」は `mattpocock/skills` の README に **0** 回、`description` フィールドには逐語で存在する——trending ページが表示するのはそちらで、著者が写すのもそれだ。リポジトリページ（`github.com/<slug>`、無課金）は**まだ未一致のときだけ**取得する。
5. **レコードはページではない。** 「In the Linux kernel, the following vulnerability has been resolved」は CVE レコードの `descriptions[]` への引用であり、引用されたブログが持つ必要はない。NVD と CNA の description、KEV の `name`＋`shortDescription` が逐語の出所であり、フィールドの引用はフィールドに対して検証する。CNA キャッシュが **`v: 3`** になったのはそのためだ。
6. **抽出器のバグは捏造として読まれる。** ページ取得器は `&#39;` をデコードしたが `&#x27;` はしなかった。そのため項目 16 のタイトル——両方の被引用ページに、一方は HN スレッド自身の見出しとして存在する——が捏造文として返った。ページキャッシュは **`v: 2`** を得た。一般規則：**抽出器は計器の一部**であり、古い抽出器が書いたキャッシュは新しい検査の証拠にならない——CNA キャッシュが schema 版を持つ理由と同じだ。
7. **省略記号は断片である。** 各断片は独立に成立し、6 語以上の断片だけが発見になりうる。
8. **引用は検査が決して開かなかったページに逐語で存在しうる。** 何も読めなかったときは `quote-not-read` と正直に出す——未読は不在ではない。
9. **強調引用符は引用ではなく、検査器には区別できない。** 「good at repository edits, weaker at long-horizon shell work」は **feed 自身の見立て**に付いた引用符だった。直し方は引用符を外すことであって出所を探すことではない——`slot-quoted` や `counted-by-author` と同じ種族で、開示の有無そのものが発見である。

### このバッチの他の四件の訂正は同じ類の別の面

項目 **14** は bunny.net の二文を一対の引用符に押し込んだ（「found no evidence of unauthorized access, though it could not be fully ruled out」——ページは「…to the CDN node or any of its data」と書き、別に「cannot completely rule out the possibility」と述べる）。項目 **20** は us-tax-model の README の語を二つ差し替え（「proves a line points at a page, not that it was **read** correctly」を「show where a line points, not that it was **interpreted** correctly」に）、評価器の独立性の但し書きを誤った対象に帰した。項目 **8** はモデルカードの注意書きを言い換えて引用符に入れた（「a capacity limit, not a guarantee of uniform accuracy across all sequence lengths or tasks」を「does not guarantee consistent accuracy」に）。

併合した言い換えや一語の差し替えは、丸ごとの捏造より**危険**だ。周囲の事実がすべて合致し、引用が裏付けに見えるからである。捕まえる単位は同じ一つだ。

### 較正

未修正の 10-31 feed：**13 件の指摘 / 9 件の確認**。原位置で四件（項目 8、10、14、20）を修正し、三箇所の強調引用符（9、12、16）を外した後：**0 / 15**。残る 4〜5 語の span 四件は指摘に昇格させず `quote-short`（助言）に留めた。`--selftest` **109 → 126**、うち 17 件がこの検査のもの。

→ [[disclosure-lag]] [[security]] [[no-ai-default]]

## 2026-10-31 12:19——さらに4つの単位：作業集合、一枚の画像、チェックサム、フォルダ

### 表は画像であり、画像は表ではない

本バッチの2つのモデル公開は、見出しの比較を**レンダリング済み資産**で出し、隣に表を置かない：`baidu/Unlimited-OCR-2` は「Achieves state-of-the-art performance across both dozens-of-pages benchmarks (e.g. MPDocBench) and extreme hundred-page benchmarks (e.g. MarathonDocBench)」と述べ、リーダーボードは `assets/leaderboard.png`；`XHToken/Spark-X2.6-4B` は「models with approximately 9B parameters」に匹敵すると主張し、`images/all_benchmark.svg` を出す。よってどちらのカードの数字も、OCRを通さずには引用も検証もできない——そしてスクリーンショットは、ベンダーが改訂したときに表のようにはdiffできない。検査は機械的である：**カードのベンチマーク節で `<table>` か `|` をgrepする。証拠の全体が `![...](...)` かSVGリンクなら、そのカードは「主張の画像」を公開している。**帰結として、そうしたカードの「SOTA」はポジショニング表明であり、監査可能な部分は別にある——Sparkでは配布一覧（`llama.cpp` がbuild **b10828** から `spark2_5` をネイティブ対応、Ollama **0.34.1+**、MLX、LM Studio）、OCR-2ではサービング付録。

### 「unlimited」はウィンドウではなく作業集合についての主張

Unlimited-OCR-2の機序は **SR-SWA**：テキスト-視覚の注意を「compress[ed] … down to a fixed-size set of working references (e.g., 512 tokens)」に圧縮し、計算を束縛して「per-step decoding latency and memory footprint nearly constant regardless of document length」にする。複数ページ解析は1リクエスト（`"<PAGE><image>" * num_pages + "Multi page parsing."`）、代償は付録に書かれる：前ウィンドウのKV末尾を再利用するページウィンドウ、`--mem-fraction-static 0.7`（0.75は同時**32**リクエスト超でOOM）、そしてページウィンドウを小さくするとピークメモリは下がるが**ウィンドウ境界でページ間マージを失う**という明示的なトレード。これは10-30の「1Mコンテキスト対131Kデプロイ」という単位の一段下：製品名が数えるのは**束縛された**量で、束縛されていないのは調整可能なウィンドウ＋メモリ予算。

一次確認したHub状態：`baidu/Unlimited-OCR-2` はMIT、**24,276** ダウンロード、**457** likes、`createdAt` **2026-10-26T03:57Z**（項目は「released 2026-10-27」——Hub自身の作成時刻は1日早い）；`XHToken/Spark-X2.6-4B` はapache-2.0、**12,515** ダウンロード、**923** likes、最終更新 **2026-10-31T02:26Z**。

### チェックサムとタスクは別の問い

"**Broken on Arrival**"（arXiv **2609.05881**）はOllama公式ライブラリの**15**モデル系列にわたる**305**のコード対応GGUFタグすべてと、Hugging Faceの**22**のコミュニティファイルを15問のコード・スクリーンで走査し、疑わしいものを**164**問のHumanEval+で再試験した。**7つの公式タグ（2.3%）が最大6問**しか解かず、いずれも**≤4B**パラメータの低位量子化だった。

対照が発見そのもの：疑わしい5件を元の重みから再ビルドすると「matched our uncalibrated rebuilds tensor for tensor, so none was corrupted」——続く一文が残すべきもの、「**Exact reproducibility did not imply function.**」変数はビット幅ではなく**較正**：重み・ツールチェーン・テンソル構成を固定したままimportance matrixを加えると、`Qwen2.5-Coder-3B` は3つの量子化水準で**ゼロから164問中76–113問**に上がり、同じ未較正レシピでも `Qwen2.5-Coder-1.5B` は動き続けた——レシピ単独では失敗を予測できない。誤検知側：「None of 66 sampled tags that passed the screen was non-functional」。**v3** は以前の診断を1つ訂正する：コミュニティの `deepseek-coder-6.7B` の組はバックエンドではなく**チャットテンプレートの欠落**で失敗する。

つまり1つの成果物に検証単位が3層積まれている——*ファイルは公開者のものか*（ハッシュ）、*ロードするか*（ロード試験）、*タスクを解くか*（タスク・スクリーン）——そしてレジストリが公開するのは**ダウンロード数とlikes**で、3層のどれでもない。運用規則：**≤4Bの低位**はタグを信じる前にタスク級のスモークテストを走らせ、失敗したら破損を疑う前に**同じモデルの較正済み量子化に替える**。

### ライセンスはフォルダ単位でありえ、リポジトリ級バッジは4つ目の成果物

`anthropics/skills`（一次確認：**185,423★**、**21,904** fork、`open_issues_count` **1,450**、`pushed_at` **2026-10-28T19:20Z**、**`license: null`**）は**ルートに `LICENSE` が無い**（404）。ルートは `.claude-plugin`、`.gitignore`、`README.md`、`THIRD_PARTY_NOTICES.md`、`skills`、`spec`、`template` のみ。ライセンスはREADMEにあり、**1リポジトリに2つ**：「Many skills in this repo are open source (Apache 2.0). We've also included the document creation & editing skills … in the `skills/docx`, `skills/pdf`, `skills/pptx`, and `skills/xlsx` subfolders」、そのうち「These are **source-available, not open source**」。`skills/` は**19**フォルダ（contents APIで計数）なので、**19のうち4つ**が「読めるが再利用できない」。READMEはさらに「provided for demonstration and educational purposes only」「the implementations and behaviors you receive from Claude may differ from what is shown」と書き、出荷される挙動はこのコードではないとベンダー自身が述べている。

ライセンスはこのライブラリで**4つ**の成果物形態を取る：レジストリ/APIフィールド（`NOASSERTION` か `null`）、ルートの `LICENSE` ファイル（またはその404）、READMEの陳述、バッジ。「vendorできるか」に答える単位は**フォルダ**だけである。

→ [[security]] [[vuln-supply]] [[frontier-models]] [[agent-plugins]]

## 2026-10-31 12:32（act）— チェッカーの沈黙もまた一つの主張である：全フィードの引用行の13.1%は判定されていなかった

`quotation` チェックは 2026-10-31 に作られ、1バッチで校正されただけなので、そのカバレッジは
測定ではなく前提だった。国勢調査（`claim-unit-lint.mjs --quotation-census`、ネットワーク不要）を
**31** の10月フィード・**1,248** 項目に対して実行し、3つの疑いを3つの異なる答えに変えた。

**1. 奇数引用行はコーパスの13.1%を占め、しかもそれは雑な記号ではなかった。** 直引用符が対にならない行は
丸ごとスキップされていた——チェック最初の29語・32語の「幻の引用」を生んだ誤ペアリングを避けるためだ。
スキップされた310行を読むと、その正体は**ハードラップされた引用**であることがわかる。開き引用符が行末に、
閉じ引用符が次の行頭に来る形（「…showing "known outdoor surveillance cameras and / license plate
readers": Flock Safety ALPRs…」）で、つまり折り返された引用は両半分とも失われていた。ガードは
チェックを守る代わりに盲目にしていた。上限付きの結合（継続は最大2行・600文字）でブロック単位に
対にするようにし、**6語以上の引用は 2,208 → 2,338（+130、+5.9%）** に増えた。**12** のブロックは
最後まで釣り合わず、カバレッジとして報告され、掘り下げには使わない。結合で生じた引用は指摘の
詳細に明記されるので、「折り返し引用」は可視化され、黙って正規化されることはない。

**2. 4ページ上限は欠陥ではなく、有益な成果は「問題ない」と示すその行のほうだ。** 同じ1,248項目で
4ページを超えるのは**1**件だけで、落ちた候補も**1**件——同じCVEに並ぶ2つ目のベンダー勧告であり、
項目の主ソースでは決してない。当時の誘惑は上限を上げることだったが、調査はその修正が何も買わず
取得回数だけ増やすと言っている。上限を4に据え置くことは今や*測定された*決定であり、実行のたびに
自分の分母を印字する。

**3. 4〜5語の助言クラスは精度が高く、汚染されていたのは分母だった。** 10-30 フィードの6件の助言。
1件ずつ原典を開くと、**引用ページが読めたものはすべて実在の欠陥**だった——pico のメンテナは
「AI can generate lightweight, standalone, accessible HTML with just the CSS it needs」と書いており、
「AI made it unnecessary」とは一度も書いていない。novelty-bench は自分のプロンプトを*伝聞*として
述べており（「the other simply asked which idea was novel」）、フィードはその伝聞をプロンプト文字列の
引用に変えていた。Fowler のページは「skeptism」という綴りで、フィードの「skepticism」は引用符の
中の黙った誤字修正だった。捏造に見えた3件は **coindesk.com の HTTP 429** によるもので、その引用
ページは本文を一切返していなかった。つまりこのクラスの*精度*は問題ではなく、失敗は「未読」であり、
未読が見えない重大度はチェッカー自身のネットワーク運を罰するだけだ。いま4〜5語の引用は、
**項目が引用するページに未読が一つも無いときだけ** **`quote-paraphrase`（sev 2）** に上がり、
未読があれば `quote-short`（sev 1）のまま、詳細に未読件数を明記する。双方向で校正済み：
10-31 のファイルは変更前後とも **0件の指摘 / 31件検証**、10-30 の3件の昇格はいずれも原典を開いて
確認し、その場で訂正した（第 **20・29・41** 項目、en+zh+jp の3言語）。

**調査が届かない残存クラス：引用元そのものが commit リストである場合。** 10-30 の第27項目は
`"allocation-free listener callback for schedulable nodes (#148)"` を引用している——これは**commit
タイトル**で、実在するが、チェッカーが取得する README や release ページからは読めない。引用符の
中に `(#NNN)` があるのは「その引用の原文は散文ではなく履歴にある」という合図だ。これは
「未読は不在ではない」のもう一段下で、チェッカーは項目が引用するページを読むが、commit はページ
ではない。

**移植できるルール。** どのチェッカーにも沈黙があり、沈黙は他の主張と同じく扱うべきものだ——だから
防衛線の前に国勢調査を与える。ここでの3つの結果はすべて役に立ったが、欠陥だったのは1つだけ：
コーパスの13%を犠牲にしていたガード（直す）、0.1%しか犠牲にしていない上限（残し、その行を印字する）、
そして*閾値*ではなく*根拠*が間違っていた重大度（語数ではなく分母で格付けする）。

→ [[vuln-supply]] [[security]] [[frontier-models]]

**2026-10-31 20:41 に決着——決めたのは逸話ではなく国勢調査だった。** 未決だったのは、このクラスに
データ源を与えるべきか、抑制だけにすべきか。`--commit-quote-census` を **84 本の feed／3,160 項目／
8,549 個の引用スパン**に対して走らせ、まず規模を答えた：**6 スパン・2 項目——0.070%**（10-04 第3項目の
System76 のコミット、10-30 第27項目の5本）。小さく、しかも集中している。次に `--net` が設計上の問いを
実行で答えた：`commits.atom`——計量不要、**20 エントリ**、既定ブランチのみ——が **6/6 を解決**、立件した
2件とも（`pop-os/cosmic-epoch` は1か月前の `2026-09-30T15:45:00Z` まで届いた）。だからこれは
**正向きの証拠にだけ使うデータ源**になり、その非対称がガードのすべてだ：コミット一覧にタイトルが
あれば証明であり、**無い**ことは20エントリの窓についての陈述であって、リポジトリについての陈述では
ない。したがって未一致の `(#N)` スパンは sev 3 の捏造ではなく **`quote-unreadable-source`**（severity 0）
を返す——429 や JS シェルに対してこのチェックが既に下している判断と同じである。10-30 の第27項目は
`quote-not-found` から `ok` になり、10-31 のファイルは **非 ok 0件／43チェック**のまま。
`--selftest` **130 → 135**。
**ここから増える一般則：** 被覆上限が**実測されている**データ源は、データ源クラスを得ても反駁は
得ない——その沈黙を結論にする前に「この源はそもそもそこへ届くのか」を問う。そして国勢調査こそが
「一度見た」を、作る／作らないを正当化できる比率に変える。

→ [[vuln-supply]] [[security]] [[frontier-models]]

## 公開された表の「行数」もまた単位である（2026-11-01 04:40）

11-01 のフィードは、NVIDIA の `nvidia/NVIDIA-Nemotron-3.5-Bolt-E4B-4GB` のカードで量子化版が「**九行のうち三行**」で
勝つと書いた。カードには **21** 行のベンチマークがあり、Q4_K_M は **7** 行で勝つ。挙げられた三行は正しい — 最大の
三つだからだ — が、比率の両方の数が作られており、lint の `count` 検査も丁寧な通読もこれを捕まえなかった。**検査は
数字を探しにページへ行くが、ページには「9」も「3」も存在しない**からだ。この数は *markdown 表の行数* であり、
既定では何も解析しない単位である。

機械的に数える（列の意味: `[1]` = 本モデル BF16、`[5]` = 本モデル Q4_K_M）:

| 結果 | 件数 | 行 |
|---|---|---|
| Q4 > BF16 | **7** | MultiChallenge 53.10→55.60（+2.50）、RoleBench 67.05→71.21（+4.16）、ToolSandbox 68.77→74.13（+5.36）、RelyToolBench 63.16→69.29（+6.13）、Brevity +0.32、IFBench +0.21、RAGTruth +0.29 |
| Q4 < BF16 | **14** | 最大の下落は Tau2 55.10→52.32、LongBench v2 50.50→48.67、RULER 86.99→85.76 |

この教訓は三点に運ばれる。

1. **比率は同一だった（3/9 = 7/21 = 33%）ので、誤りはどの結論も変えていない。** 結論を変えない誤った分母は、
   順位を買った誤ったフレーミングとは別種である — 訂正規約の速度ルールが扱うのは*誇張*であり、ここに誇張はない。
   文を直し、速度は保ち、そのことをログに書く。
2. **カード自身の構造が検査になる。** 「BF16 と Q4_K_M を並べる」は*比較対*についての主張であり、そのような主張は
   表から一度で再計算できる。二つの精度列を公開するモデルカードはフィード中で最も安い再計算対象だ。やること。流し読みしないこと。
3. **七つの勝ちのうち二つはノイズ内**（+0.21、+0.29）、二つは決定的（+5.36、+6.13）。したがって「Q4 は厳密な
   ダウングレードではない」は真で、「Q4 がたいてい勝つ」は偽である。分布が支える文を選ぶこと。

## 出典自身が刷っていて、報道がふつう落とす二つの分母（2026-11-01 04:40）

- **PAPERBENCHX（arXiv 2610.39744、逐語で確認）:** 93 の専門家作成タスク、12 の研究領域、10 のフロンティア agent
  構成。「the best configuration fully reproduces only **14%** tasks under the **90%** threshold」、
  「mean rubric scores range from **27.53%** to **59.08%**」。この二つが正直な対である — 59% の平均だけを報じれば、
  存在しない能力を公表したことになる。部分点は「rarely translates into complete scientific reproduction」だからだ。
- **Jepsen / ParticleDB 1.1.4（2026-10-31）:** 96 の問題。「**All but three** of these issues occurred in healthy,
  single-node instances」（すなわち 93 が単一ノード — フィードの内訳は正しく導かれていた）。「Most issues required
  just a single server, single client, and no faults」。「By version 1.1.18.11.rc-22, all but ten of those issues
  appeared resolved」。複製は一切試験されていない（「The builds Orkes provided did not support replication」）。
  「formally proven」というマーケティングの背後に TLA+ 仕様はない。非決定的な一群は「may be artifacts of a bug in the
  test suite」。そして認識論は明記される —「we can prove the presence of bugs, but not their absence」。この報告は
  **Orkes の資金提供**であり、それでもユーザーに「halt further deployment of ParticleDB and migrate to other
  databases as soon as possible」を勧める。

Jepsen から持ち帰れる順序はこうだ。単一ノード、既定の設定、障害を注入しない — それでもエンジンは確認済みの書き込みを
失う。この線より上で公表される分散システムの数値は、基盤エンジンがまだ稼いでいない何かを測っている。これは
あらゆる「Full ACID」の主張に対する一般的な検査になる。

→ [[security]] [[frontier-models]] [[disclosure-lag]]

## 「行数」という単位がチェックになった — そして初回の国勢調査は、それが静かだと告げている（2026-11-01 04:46）

04:40 の回はこの単位を起票しただけだった。この回でそれを組み上げた。`claim-unit-lint.mjs --check ratio`（既定の
チェック集合に入っている）は、項目の中の `N of M` のうち、その文が「行」について語っているものを読み、引用ページの
Markdown テーブルを見つけて、二つの数を表から計算し直す。

**起票事例で両方向に校正した。** 未修正のフィードに対しては sev-3 を一本だけ出す — `#5 ratio-row-count — three of nine
… 21 rows, "Nemotron-3.5 Bolt-E4B BF16" vs "Nemotron-3.5 Bolt-E4B-4GB Q4_K_M" → 7 / 14 / 0`。修正後のフィードには
`ok-ratio — 7 of 21 reproduces` を出す。`--selftest` は 135 → **152**。

五つのガードがあり、そのどれもが「これが無ければチェックが間違っていた」形をしている。

1. **列はヘッダーの文字で突き合わせる。位置では決して突き合わせない。** 位置で読む実装はモデルカード上で
   「どのモデル」と「スコア」を比べてしまう。ヘッダーのトークンは項目がその語をいくつ名指ししたかで採点し、
   最良の一対は他のすべての列を完全に上回らなければならない — 二位が並ぶなら `table-columns-unresolved`（sev 0）
   だ。**特定できなかった表は、意見の違う表ではない。** Bolt カードの実際の対は第 **1 列と第 5 列**（同一モデルの
   BF16 と Q4_K_M）なので、「隣接必須」の規則はこのチェックの存在理由そのものを却下してしまう。
2. **英単語の数も読む。** この誤りは「3 of 9」ではなく「three of nine」として出荷された。数字だけを読む実装は
   起票事例を完全に見落とす。
3. **`Q4_K_M` はマークアップ除去を生き延びる。** 最初のセル洗浄はアンダースコアを全部消していた（Markdown の強調と
   みなして）。ヘッダーは `Q4KM` になり、項目が語っている列が自分のヘッダーと一致しなくなった。強調なのは
   **端にある**アンダースコアだけだ。
4. **文字が入ったセルは `unparsed` であって、負けではない。** 引き分けは三つ目の数として並べて印字する —
   「7 of 21」と「7 of 21、ただし引き分け 2」は別の主張だ。
5. **向きは判定しない。** 分子が `B>A` と `B<A` のどちらに一致しても通す。二つのヘッダーの左右はベンダーの
   レイアウトであり、「勝つ」は項目の言葉だからだ。両方の数を印字して、人が見られるようにする。

**10 月の全 31 フィードを対象にした国勢調査（この取得に価値があるかを先に決めるため）：`ratio` が反応したのは
5 項目、すべて `table-columns-unresolved`（sev 0）で、finding ゼロ、`ok-ratio` ゼロ** — しかも `api.github.com`
呼び出しの増分は **0** だ。読むページは `count` が既に取得したものだからである。つまりこの種別は実在するが
稀である。一か月で、表と突き合わせて検証できる主張は一つもなく、公表された誤りを一つ捕まえた。残す価値があるのは
`--status-watch` と同じ理由だ — これが捕まえる誤りは、他のどの読み方にも見えない。

**同じ回の `count` 側は、自分自身の偽の finding を一つ消した。** 修正後のフィードで `count` は
`number-other-noun — 21 is on huggingface.co/models as "21 days ago"` と報告していた。カードは総数を文章中に
どこにも書いていないからだ — **総数とは表そのもの**である。引用ページの表で、ヘッダーが主張の名詞を指し、
データ行数がその数と一致すれば、それは積極的な検証（`ok-table-rows`）となり、「別の名詞」の判定より前に置かれる。
ランディングページが、項目が語っている成果物を上回ってはならないからだ。

**一つのバッチで三つの偽の `repo` finding、そしてそれらを分ける規則。** `anthropic/claude-opus-4.6`（OpenRouter の
モデル id、404 →「読めないリポジトリ」）、`moonshotai/kimi-k2`（**同じ文**の中の名前で、実在するリポジトリだが
項目は一度も論じておらず、11,112★ → 誰も訊いていない問いに「更新停止」と答えた）、`plugins/sql`（OpenSearch SQL の
**エンドポイント**）。三つとも「バッククォートの `a/b` が技術的な文字列を語る文の中にある」形だ。ガードはこうだ。
`github.com` のリンクは証拠であり、タイトルにある slug は主役であり、それ以外で、その文の唯一 `a/b` 形のものが
`model` / `endpoint` / `parameter` / `fallback` / `temperature` の隣にあるなら、それはリポジトリの主張ではない —
`not-a-repo`（sev 0）として報告し、黙って捨てはしない。そして判定は**出現ごとではなく slug ごと**に行う。
項目 8 は `plugins/sql` を二度書いており、出現ごとの規則では二度目が素通りして `api.github.com` を一回消費した。

**小さな分母に対する二つのガード。どちらも実走が買ってきたものだ。** 6 という基数に相対許容差を当てると、
「星が二つ届いた」が 25% の finding になる（`3 commits, 6 stars` が同じバッチの間に 8 になる）。そこで絶対差
（`--star-min-delta`、既定 5）も要求するようにした。もう一つ、キャッシュは**リポジトリにコミットされる**ファイルだ。
一か月分の国勢調査で 9.9 MB から 19 MB に膨らんだので、本文を持つエントリは書き込み時にバイト予算（5 MB）で
刈り込む。ページを一つ捨てるのは無課金の再取得一回分であり、その膨張のうち 5 MB はたった三つのページだった。

→ [[disclosure-lag]] [[vuln-supply]]
