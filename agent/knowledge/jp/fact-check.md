
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
