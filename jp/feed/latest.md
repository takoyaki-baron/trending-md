---
date: 2026-10-23
updated: 2026-10-23T04:10:00Z
schedule: 04:03, 12:03, 20:03 UTC+8
sources: 14
license: CC-BY-4.0
---

# 今日のトレンド — 2026-10-23

## 1. eMudhra がグローバル SSL/TLS 事業から撤退 — CA 秘密鍵が「数字の 4」だったと判明してから 5 日

- **Velocity:** ▮▮▮ trending
- **Source:** Hacker News · 800+ pts · 6 時間前 (~21:33 UTC+8)
- **Tags:** `security` `pki` `ca` `trust-store` `emudhra`

eMudhra の取締役会は 10 月 22 日、グローバル SSL/TLS 証明書事業から自主的に撤退することを決議した。発端は 1 週間前、独立研究者が 8 本の中間 CA 秘密鍵をそれぞれ 1 秒未満で復元したことにある（すべて 2025 年 4 月 30 日生成）。Google、Apple、Microsoft、Mozilla は該当証明書を信頼しないと表明しており、G3 ECC ルートは外れ、G1 RSA ルートは移行期間中サービスを継続する。同社は影響を受けた CA を 14 時間以内に失効させ、そこからエンドエンティティ証明書は発行しておらず、インフラもデータも侵害されていないとし、ルートプログラム向けの根本原因報告書を約束した。同事業はグローバル売上の約 1%（FY26 売上 ₹701.6 Cr）。株価は 2 日間で 36〜40% 下落し、取引所のサーキットブレーカーを 2 度発動させた。

**Why it matters:** 暗号の事故が 5 日で事業撤退に変わった。そして「信頼されていない」は常に**特定のストアにおける**主張であって、認証局そのものの属性ではない。10 月 22 日に私たちがこのチェーンを実測したところ、`emSign ECC Root CA - G3` は macOS のキーチェーンと Java の `cacerts` には依然アンカーされており、Mozilla・certifi・curl からは消えていた。つまり**プログラム**からの退出は**アンカー**を取り除かず、この発表自体は何も失効させていない。露出は種別ではなく信頼ソースで切ること。

[`🔗 eMudhra プレスリリース`](https://emudhra.com/en/press-release/emudhra-to-exit-global-ssl-tls-certificate-business) · [`🔗 The Hindu`](https://www.thehindu.com/business/emudhra-to-exit-overseas-web-security-certificate-business-as-stock-takes-beating/article71611983.ece) · [`🔗 CNA`](https://www.channelnewsasia.com/business/indian-firm-emudhra-exits-global-digital-certificates-business-after-vulnerability-disclosure-6482671)

---

## 2. Arista、今年 3 つ目の VeloCloud ゼロデイ：9.9 の SQL インジェクションが悪用中、しかもどの CVE レジストリにも未収載

- **Velocity:** ▮▮▮ trending
- **Source:** BleepingComputer / securityonline.info · 約 1 時間前 (~03:30 UTC+8)
- **Tags:** `cve` `arista` `sd-wan` `exploited` `sql-injection`

Arista セキュリティアドバイザリ 0199 は CVE-2026-114625 を扱う。オンプレミス VeloCloud Orchestrator の SQL インジェクションで、認証済みの任意のユーザー（読み取り専用ユーザーを含む）がオペレータ権限へ昇格し、ローカルの「superuser operator」になりすませる。修正版は VCO 5.2.3.18、6.1.3.10、6.4.2.12。ホスト版 VCO は修正済み。Arista は活発な悪用を確認しており、VCO の Web インターフェースを管理ネットワークに限定すること、74.82.197.86 と 38.54.50.151 をブロックすること、侵害が疑われる場合は修復前にログを保全することを勧告している。今年 3 つ目の VCO 脆弱性であり、OS コマンドインジェクションの CVE-2026-16812 は 7 月に、入力検証不備の CVE-2026-93952 は 9 月に CISA KEV 入りしている。

**Why it matters:** この 9.9 は **Arista 自身のスコア**である。本稿執筆時点で、NVD にも CVE Program の cveawg API にも CVE-2026-114625 のレコードは**存在しない**。つまり NVD を情報源とするスキャナは、いま悪用されている脆弱性を何も表示しない。私たちが最初に読んだアグリゲータは NCSC-NL のアドバイザリを引用していたが、それは**9 月**の VCO 脆弱性（CVE-2026-93952）向けのものだった。リンクされたアドバイザリが、隣に並ぶ CVE のアドバイザリであるとは限らない。

[`🔗 securityonline.info`](https://securityonline.info/velocloud-orchestrator-cve-2026-114625-exploited/) · [`🔗 pwn.watch インシデント`](https://pwn.watch/i/arista-velocloud-orchestrator-cve-2026-114625)

---

## 3. Next.js が重大な未認証 RCE 2 件を公表 — 修正版は 8 日前に出ていた

- **Velocity:** ▮▮▮ trending
- **Source:** GitHub Advisory Database · 約 3.5 時間前 (~00:42 UTC+8)
- **Tags:** `cve` `nextjs` `rce` `sharp` `advisory-lag`

Vercel は 10 月 22 日、数時間差で 2 件の critical アドバイザリを公開した。GHSA-2464-fhr4-w9xw は画像最適化 API 経由の未認証 RCE。librsvg の use-after-free（CVE-2026-96889、重複したエンティティ宣言を含む SVG XInclude で発火）で、Next.js が glibc ベースの Linux で動く場合に `sharp` 経由で到達可能。影響は next 10.0.0〜15.5.27 および 16.0.0〜16.4.0。GHSA-673q-mjm6-r5xr は、複数の型付き配列を返す `use cache` 関数を使う App Router アプリでの RCE で、16.0.0〜16.4.0 が影響を受け、**回避策は存在しない**（アップグレードのみ）。いずれも 15.5.28 と 16.4.1 で修正済み。

**Why it matters:** npm の公開タイムスタンプでは 15.5.28 と 16.4.1 は **10 月 14 日**に出ている。それらを critical と名指すアドバイザリが来たのは 10 月 22 日で、開示ラグのルールが通常捕まえない**逆向き**の 8 日間だ。アドバイザリの日付でトリアージする人はこれを今日の新規案件として起票するが、パッチは 1 週間以上インストール可能だった。`sharp` の側は、10 月 21 日に NVD へ出た 8.4〜8.9 の 3 件（同梱の libheif、librsvg、libvips）も説明する。同じ根本原因、別の書類。

[`🔗 GHSA-2464-fhr4-w9xw`](https://github.com/advisories/GHSA-2464-fhr4-w9xw) · [`🔗 GHSA-673q-mjm6-r5xr`](https://github.com/advisories/GHSA-673q-mjm6-r5xr) · [`🔗 CVE-2026-96889 (NVD)`](https://nvd.nist.gov/vuln/detail/CVE-2026-96889)

---

## 4. Quad9、11 月 24 日にフランスから撤退 — 準拠は「技術的に不可能」

- **Velocity:** ▮▮ rising
- **Source:** Hacker News · 639+ pts · 5 時間前 (~22:32 UTC+8)
- **Tags:** `dns` `policy` `privacy` `quad9` `france`

フランスの裁判所は 10 月 21 日、beIN が提起した訴訟で Quad9 に不利な判決を下し、フランス国内のユーザーに対する一部ドメインの再帰 DNS 解決をブロックするよう命じた。裁判所は制裁金を 58 万ユーロから 1 日 1,000 ユーロへ減額したが、Quad9 は「改変されていない DNS 応答を返す」という使命と準拠は両立しないとし、11 月 24 日（火）をもってフランスから完全撤退すると発表した。減額は決め手ではなかったと明言している。

**Why it matters:** 公開リカーシブリゾルバはインフラであり、一国からの撤収は 9.9.9.9 を指す ISP 側・デバイス側の設定すべてを動かす。ハードコードされた `resolv.conf` やコンテナのデフォルトも含まれる。技術的な帰結は原則論より地味だ。フランスのユーザーはフィルタするかログを取るか両方のリゾルバへ戻り、Quad9 の脅威ブロックに依存していたフランス国内のデプロイは静かにその層を失う。

[`🔗 Quad9 — フランスに別れを`](https://quad9.net/news/blog/au-revoir-france/) · [`🔗 Hacker News スレッド`](https://news.ycombinator.com/item?id=50195959)

---

## 5. 「Header Accordions」：小さな HTTP/3 HEADERS フレームが Bun 上で約 4,000 倍に膨張、QPACK 実装 10 種中 7 種が脆弱

- **Velocity:** ▮▮ rising
- **Source:** FoxIO の研究 · 約 6 時間前 (~22:00 UTC+8)
- **Tags:** `http3` `qpack` `dos` `cve` `quic`

Sébastien Féry は、QPACK のデコード後ヘッダ制限が実装間で欠落・不完全・あるいは適用が遅すぎることを見つけた。その結果、小さな圧縮ヘッダブロックがメモリ上で数十万のヘッダオブジェクトに膨張する。1 本の接続でデフォルト設定のサーバを OOM にするか固まらせることができ、実測最大の増幅は Bun 上の約 4,000 倍だった。修正済み：quic-go 0.57.0（CVE-2025-64702）、Cloudflare quiche 0.29.3（CVE-2026-12523）、lsquic 4.9.0（CVE なし）、Wireshark 4.6.2 / 4.4.12（CVE-2025-13945）。公開時点で未修正：Bun 1.4.3、`h3` crate、aioquic/mitmproxy。IIS、Envoy、ngtcp2/nghttp3 は元々非該当。

**Why it matters:** 4 件の修正のうち 3 件は 2025 年付の CVE ID を持つ。ニュースなのは調整された開示と PoC であり、「新種の HTTP/3 DoS」という枠組みではない。実務的な指示は短い。mitmproxy は `--set http3=false`、`h3` は妥当な `max_field_section_size` を設定、Bun は HTTP/3 を外部に晒さないこと。

[`🔗 FoxIO — Header Accordions`](https://foxio.io/blog/header-accordions-qpack-amplification-attacks-against-http-3-servers) · [`🔗 oss-security の告知`](https://www.openwall.com/lists/oss-security/2026/10/22/1)

---

## 6. GhostAction 再燃：約 1,900 の乗っ取られたアカウントが「セキュリティ監査」を装う workflow を 30,000 以上のリポジトリへ

- **Velocity:** ▮▮ rising
- **Source:** GitGuardian · 約 9 時間前 (~19:00 UTC+8)
- **Tags:** `supply-chain` `github-actions` `secrets` `github`

GitGuardian が 2025 年 9 月に初めて記録したキャンペーンが、より大きな規模で戻ってきた。2026 年 8〜9 月に 772 リポジトリを襲い、10 月 8〜12 日に急増。約 1,900 の侵害された GitHub アカウントが、セキュリティ監査を装う workflow を 30,000 以上の問題リポジトリに push した。ペイロードは元の版より広い。リポジトリの Actions secrets に加え、**git 履歴全体**から見つかるあらゆる資格情報を窃取し、平文 HTTP で 193.32.204.199 へ送出する。GitHub は 10 月 9 日頃から当該 workflow の実行を阻止し始めた。運営側は my-github.com の GitHub 風フィッシングと、94 リポジトリで見つかった VS Code の `tasks.json` に偽の `.woff2` フォントを組み合わせた窃取器へ移行している。

**Why it matters:** この件では CI secrets のローテーションだけでは不十分な是正になる。本当に効くのは**これまでに一度でもコミットされた**資格情報の集合で、後のコミットで「削除」されたが履歴からは依然取得できる秘密を含む。侵害されたコントリビュータのアカウント経由で届く workflow は、「PR が何を変えたか」をレビューする通常の防御も無効化する。監査ツールに見えるからだ。

[`🔗 GitGuardian`](https://blog.gitguardian.com/ghostaction-github-actions-supply-chain-attack-returns/) · [`🔗 StepSecurity`](https://www.stepsecurity.io/blog/ghostaction-returns) · [`🔗 Socket`](https://socket.dev/blog/ghostaction-cloud-credentials)

---

## 7. Zeabur：平文の資格情報から環境変数 322 万件が読まれた — しかもプラットフォームは終了する

- **Velocity:** ▮▮ rising
- **Source:** Zeabur インシデント報告 · 約 4 時間前 (~00:00 UTC+8)
- **Tags:** `breach` `secrets` `paas` `zeabur` `shutdown`

Zeabur は 10 月 14〜15 日のインシデントを開示した。攻撃者は平文で保存されていた漏洩した内部資格情報を使い、9 リージョンの共有クラスタへ到達、101 台の Zeabur 管理下 GCP 専用サーバに root で侵入し、プラットフォームのデータベースを読んだ。その結果、321,810 アカウントにまたがる約 322 万件の環境変数レコードが露出した。報告書によれば攻撃者は約 53 件の本番 secrets を読み、SSH 鍵の 1 本が無効化された後に鍵を再追加した。最後に記録された活動は 10 月 15 日 21:05。同社は段階的に終了する。12 月 1 日から共有クラスタのサービスを停止し専用サーバの更新を終了、12 月 31 日に全サービスを停止してサービスデータを削除、返金とインシデント請求の受付は 11 月 30 日まで。

**Why it matters:** PaaS の侵害は全顧客の鍵管理の問題を同時に増幅する。今回はさらに終了日が重なるため、「ローテーションと監視」と「移行」が同じ作業になり、期限は 69 日になる。データベース URL、署名鍵、API トークンを一度でも Zeabur の環境変数に設定したなら、公開済みとして扱うべきだ。

[`🔗 Zeabur 暫定インシデント報告`](https://zeabur.com/blogs/october-2026-security-incident) · [`🔗 Zeabur 終了のお知らせ`](https://zeabur.com/blogs/zeabur-is-shutting-down) · [`🔗 移行・返金・請求`](https://zeabur.com/blogs/migration-refunds-and-security-claims)

---

## 8. 米大手銀行が顧客口座内で第三者 AI エージェントを検知 — 同意と自律を区別できない

- **Velocity:** ▮▮ rising
- **Source:** Axios · 約 7 時間前 (~21:00 UTC+8)
- **Tags:** `agents` `banking` `identity` `policy` `mcp`

Axios は 10 月 22 日、Morgan Stanley、JPMorgan Chase、Bank of America、Wells Fargo、Citi が顧客口座内で第三者 AI エージェントの動作を検知したと報じた。多くは顧客自身の資格情報でログインしており、「口座名義人本人がログインすること」を求める規則に反する。銀行はどの資格情報が使われたかは分かるが、その活動が人間の指示によるものかエージェント主導かは判断できない場合が多い。Morgan Stanley は第三者エージェントを全面的にブロックし始め、JPMorgan、BofA、Citi は制限をかけている。Charles Schwab は MCP サーバとして公開する、範囲を限定した読み取り専用接続を計画していると報じられた。

**Why it matters:** エージェントの認証がクライアント側ではなく**相手方**で解かれ始めた最初の広範な兆候だ。資格情報は誰が持っているかを証明しないので、エージェントに何を許すかを銀行が決める。ただし 2 つの但し書きが付く。ロイターは Axios の報道を独自検証できなかったと述べており、後続報道の多くは単一の原報のアグリゲーションであって独立確認ではない。したがってインシデント件数は「出典あり」であって「検証済み」ではない。

[`🔗 Axios`](https://www.axios.com/2026/10/22/ai-agents-banks-unauthorized-accounts-access) · [`🔗 pwn.watch インシデント`](https://pwn.watch/i/us-banks-unauthorized-ai-agents-customer-accounts)

---

## 9. NVIDIA が OpenShell をオープンソース化：カーネル強制のサンドボックスと、ポリシー変更前の定理証明器

- **Velocity:** ▮▮ rising
- **Source:** Hacker News · 134+ pts · 2 時間前 (~01:44 UTC+8)
- **Tags:** `agents` `sandbox` `security` `nvidia` `formal-verification`

OpenShell は自律エージェント群向けの Apache-2.0 ランタイム。現在 v0.1.5（10 月 20 日）で 1 万 7,400 スター。エージェントのポリシーを 2 層で強制する。第 1 にカーネルレベルの制御で、ファイルアクセス、システムコール、外向きネットワーク接続のすべてに適用され、サンドボックス内のエージェントはポリシーが承認していないホストや API に到達できない。第 2 に、ポリシー変更が受理される**前に**形式検証を走らせ、リスクの高い新規許可（資格情報付きで到達できる新規ホスト、新しい API メソッドなど）を人間のレビュー待ちにする。エージェントは実際の資格情報を保持せず、OpenShell が承認済みエンドポイント宛のリクエストにだけ注入する。Linux、Apple Silicon の macOS、WSL 2 上の Windows で動作し、Docker、Podman、ホスト仮想化をバックエンドに使う。

**Why it matters:** 面白いのは証明器の側だ。多くのエージェントサンドボックスは強制のみで、あるポリシーが何を許すかはその下でエージェントを走らせて初めて分かる。ポリシー変更をデプロイ**前**にレビュー対象にすることは、サンドボックスと変更管理システムの違いであり、競合が設定ではなく再実装を迫られる部分でもある。

[`🔗 NVIDIA/OpenShell`](https://github.com/NVIDIA/OpenShell) · [`🔗 OpenShell ドキュメント`](https://docs.nvidia.com/openshell/latest/index.html)

---

## 10. Recursive が Flint を公開：40B-A2.5B、Apache-2.0 のコーディングモデル。自社の研究システムが主に構築したと主張

- **Velocity:** ▮▮ rising
- **Source:** Ollama v0.40.8 / Hugging Face · 約 1 日前 (~22:00 UTC+8)
- **Tags:** `llm` `open-weights` `coding` `moe` `local`

Richard Socher 率いる Recursive は 10 月 21 日、Flint を Apache 2.0 で公開した。総パラメータ 398 億、トークンあたり約 25 億が活性。49 層（2 層 dense、47 層 MoE、256 のルーテッドエキスパートから 6 を選択）、262,144 トークンのコンテキスト、BF16 と NVFP4 のチェックポイントを提供する。Recursive は Terminal-Bench 2.1 で 54.9%、SWE-bench Verified で 74.2% を報告し、4 か月足らずで構築、その大半を自動研究システム Eureka Machine が担い、アーキテクチャ探索、学習、量子化、推論最適化に寄与したとしている。Ollama は同日対応。まず macOS、他 GPU は後続。

**Why it matters:** 上記の数字はすべて**ベンダー報告**であり、Recursive 自身のリリース評価で、独立検証はなく、OpenHands の公開前テストもベンチマークには及んでいない。注目すべきはスコアではなく来歴だ。アーキテクチャ探索と量子化が機械生成された 400 億パラメータのモデルは、自動研究パイプラインの産物が自前の評価ハーネスの外で生き残るかという実験になる。

[`🔗 Hugging Face の RecursiveSI/flint`](https://huggingface.co/RecursiveSI/flint) · [`🔗 Ollama v0.40.8`](https://github.com/ollama/ollama/releases/tag/v0.40.8)

---

## 11. iFlytek の Spark X2.6：293B-A30B、100 万コンテキスト、完全に国内の計算資源で学習

- **Velocity:** ▮▮ rising
- **Source:** iFlytek 1024 Developer Festival · 約 18 時間前 (~10:00 UTC+8)
- **Tags:** `llm` `china` `moe` `open-weights` `iflytek`

iFlytek は 10 月 22 日、北京の 1024 グローバル開発者フェスティバルで Spark X2.6 を発表した。293B-A30B の MoE で 100 万トークンのコンテキストを持ち、完全に国内（非 NVIDIA）の計算資源で学習され、国内の 1 万基の推論クラスタから提供される。価格は入力 100 万トークンあたり 0.9 元、キャッシュヒット 0.08 元、出力 100 万トークンあたり 3.6 元。同時に Spark X2.6-4B をオープンソース化した。ロボット、車載、AI PC 向けのエッジモデルで、3 段階の推論バジェットモードを持つ。前世代の X2.5-4B（9 月 1 日オープンソース化）は 256 万ダウンロードとされる。SWE Pro と SWE Multilingual で 1 位、SWE Verified では DeepSeek-V4.1-Flash に次ぐ 2 位と主張している。

**Why it matters:** 見出しはベンチマーク表ではなくサプライチェーンだ。NVIDIA ハードウェアなしで学習されたフロンティア規模の MoE は、「国内計算資源」という主張が待っていた具体的な成果であり、価格は入力・出力の両方で DeepSeek-V4.1-Flash を下回る。SWE 関連の主張はベンダー報告として扱うこと。オープンソース化されたのは 4B のエッジモデルであり 293B のクラウドモデルではないので、これらの数値はダウンロードして検証できないものを記述している。

[`🔗 Global Times`](https://www.globaltimes.cn/page/202610/1372798.shtml) · [`🔗 新浪科技`](https://finance.sina.cn/tech/2026-10-22/detail-iniwarrp5932585.d.html)

---

## 12. ISC BIND 9：GSS-TSIG メッセージの再送で `named` のメモリが破壊されうる

- **Velocity:** ▮▮ rising
- **Source:** ISC / NVD · 約 15 時間前 (~21:21 UTC+8)
- **Tags:** `cve` `dns` `bind` `rce` `isc`

CVE-2026-94300。攻撃者が GSS-TSIG 署名付き UDP メッセージ（Active Directory 形式の動的 DNS 更新に使われる Kerberos 署名）を捕捉できれば、ネゴシエートされた TSIG 鍵が有効な間にそれを再送できる。さらに攻撃者が管理するゾーンへの細工したクエリを組み合わせることで、`named` のメモリを破壊し、リモートコード実行に至る可能性がある。影響範囲は広い。9.11.0〜9.18.50、9.20.0〜9.20.29、9.21.0〜9.21.26、および対応する -S1 ブランチ。修正版は 9.20.30 と 9.21.27。

**Why it matters:** スコアは **CVSS 8.1 で、CNA である ISC が付与**したもの（`security-officer@isc.org`）。NVD の状態は `Awaiting Analysis` で NVD 自身のメトリクスはなく、レコード上の数値はベンダーのものであって独立評価ではない。露出はバージョン一覧が示すより狭い。GSS-TSIG が設定されている必要がある。ただし AD ドメインの前面で動的更新を有効にした BIND 配備が、まさに対象となる母集団だ。

[`🔗 ISC アドバイザリ`](https://kb.isc.org/docs/cve-2026-94300) · [`🔗 NVD レコード`](https://nvd.nist.gov/vuln/detail/CVE-2026-94300)

---

## 13. HackiOS、Apple の XNU カーネルと未改変の iOS 16.5 ユーザ空間を Android 端末で起動

- **Velocity:** ▮ steady
- **Source:** Show HN · 214+ pts · 4 時間前 (~23:26 UTC+8)
- **Tags:** `kernel` `xnu` `ios` `android` `reverse-engineering`

HackiOS は `xnu-8796.121.2`（iOS 16.5 のカーネル）を Android ハードウェア上で動かし、その上で未改変の iOS 16.5 ユーザ空間を立ち上げる。launchd、backboardd、SpringBoard、そしてアプリ。プロジェクトは独自の EFI ローダ、UEFI ポート、Apple の非公開ドライバの代替実装、互換層の上で動く Linux Wi-Fi ドライバを同梱する。POCO X5 Pro 5G（Snapdragon 778G、コードネーム redwood）では何もフラッシュしない。UEFI は `fastboot boot` で起動し、システム全体が RAM 上に載り、再起動すれば端末は Android に戻る。同じものが任意の Linux マシンの QEMU `virt` でも動くので、実機は不要。どちらのリポジトリにも Apple のファイルは含まれず、取得スクリプトが Apple の CDN から IPSW をあなたのマシンにダウンロードして展開する。

**Why it matters:** Apple 製シリコン以外で launchd と SpringBoard を動かすことは長年の壁であり、面白いのはそのために何を置き換える必要があったかだ。UEFI ポートと、Linux の Wi-Fi ドライバを XNU に使わせる互換層。リポジトリは作成から 1 日、403 スターであり、「アプリが動く」は現時点では作者の主張であって独立に再現された結果ではない。

[`🔗 oosexgang/hackios-xnu-kernel`](https://github.com/oosexgang/hackios-xnu-kernel) · [`🔗 Hacker News スレッド`](https://news.ycombinator.com/item?id=50196718)

---

## 14. K-Dense の科学スキル集が 5 万 3,900 スターで急上昇 — ただし自身の論文はタスク評価を行っていないと明記

- **Velocity:** ▮ steady
- **Source:** GitHub Trending（週間）· 今週 4,719+ スター
- **Tags:** `agent-skills` `science` `arxiv` `provenance`

`K-Dense-AI/scientific-agent-skills` は研究エージェント向けの手続き的知識のライブラリで、MIT ライセンス。ゲノミクス、ケモインフォマティクス、医用画像、研究デザイン、科学コミュニケーションを扱う。各スキルはディレクトリで、中核はバージョン管理された人間可読な指示ファイル。エージェントはタスクが必要とするときだけそれを読み込み、ディレクトリには参照資料や実行可能スクリプトが入っていることが多い。README は「177 のすぐ使える検証済みスキルと 100 以上の科学データベース」「世界 25 万人以上の科学者が使用」と宣伝している。

**Why it matters:** このライブラリの背後の論文は README よりずっと慎重だ。arXiv 2609.00065 は 16 領域で **163** の手続きを記述しており（177 ではない）、さらに明記している。「私たちはタスクレベルの評価も、ホスト選択率も報告しない」。実際に測っているのはコンテキストコストだ。常駐するスキル記述は 20 万トークン窓の 7.1% を占め、文書化されたワークフローの中央値は 23.9% に収まるが、46 件中 29 件は参照ファイルをすべて読み込むと溢れる。これは実際のエージェント問題について有用で正直な数字であり、スター数の下にある論文を読むべきだという戒めでもある。

[`🔗 K-Dense-AI/scientific-agent-skills`](https://github.com/K-Dense-AI/scientific-agent-skills) · [`🔗 arXiv 2609.00065`](https://arxiv.org/abs/2609.00065)

---

## 15. GoDaddy、自社の規則と一致しないとして 404,607 枚の証明書を失効

- **Velocity:** ▮ steady
- **Source:** GoDaddy / Mozilla Bugzilla · 約 12 時間前 (~16:00 UTC+8)
- **Tags:** `pki` `tls` `godaddy` `certificates` `cabf`

GoDaddy（Starfield）は、404,607 枚の TLS 証明書が、自社が公開している CP/CPS と一致しないポリシー情報（ポリシー OID と CPS URI）を含んでいたことを確認した。CA/Browser Forum のベースライン要件ではこれは 5 日以内の失効トリガーにあたる。GoDaddy は 10 月 21 日に失効させたと述べており、10 月 18 日の期限から 3 日遅れている。侵害も鍵の漏洩もなく、証明書が主張する内容と発行者が表明する内容のプロファイル不一致だ。

**Why it matters:** 影響は完全に運用面で、古い証明書を提供し続けている側に降りかかる。多くのブラウザはこの種の失効ではフェイルオープンするが、厳格なクライアントやピンニング設定はそうではなく、症状は原因の分からない TLS エラーに見える。確認すべきはアラートを受け取ったサイトではなく、期限内に再発行しなかったサイトだ。

[`🔗 GoDaddy — CP/CPS プロファイルの不具合`](https://www.godaddy.com/help/what-is-the-cpcps-certificate-profile-bug-43095) · [`🔗 Mozilla Bug 2083191`](https://bugzilla.mozilla.org/show_bug.cgi?id=2083191)

---

## 16. 10 月 18 日の OpenCode 鍵漏洩の記録以降：悪意ある MCP サーバが OAuth サインイン時に Windows で PowerShell を実行可能 — 修正は CVE なし

- **Velocity:** ▮ steady
- **Source:** pwn.watch / Anomaly · 約 20 時間前 (~07:00 UTC+8)
- **Tags:** `agents` `mcp` `opencode` `rce` `windows`

OpenCode AI コーディングエージェントに、2 つ目の無関係な欠陥が見つかった。コマンドインジェクションにより、悪意ある（あるいは後から乗っ取られた）リモート MCP サーバが、開発者が MCP の OAuth サインインフローを開始した瞬間に Windows または WSL のマシンで PowerShell コマンドを実行できた。サーバ供給の認可エンドポイントが、エスケープされないまま古いバージョンの `open` パッケージに渡されていた。Anomaly は **9 月 28 日に 1.18.33 で修正**しており、CVE も公開アドバイザリもない。これは 10 月 18 日に私たちが扱った 10 月の API 鍵漏洩とは別件で、修正はその漏洩より 2 週間早い。

**Why it matters:** 脆弱性の類型はありふれている。MCP サーバは exec に到達するリモート入力だ。しかし是正の類型はそうではない。CVE も GHSA もアドバイザリもないため、依存スキャナは 1.18.32 を永遠に検出せず、可能な検出方法はリリースノートに対するバージョン確認だけになる。Windows または WSL で OpenCode を動かしているなら、問いは「露出したか」ではなく「1.18.33 を超えているか」だ。

[`🔗 pwn.watch インシデント`](https://pwn.watch/i/opencode-mcp-oauth-rce-windows) · [`🔗 anomalyco/opencode リリース`](https://github.com/anomalyco/opencode/releases)

---

## 17. Environment Duels：最も強い解答者と最も強い環境の作者は別人

- **Velocity:** ▮ steady
- **Source:** arXiv 2610.30116 · 約 14 時間前 (~20:00 UTC+8)
- **Tags:** `arxiv` `benchmark` `agents` `co-evolution` `rl`

Shibo Jin、Zhiqiu Xu、Yiling Zou、Shangyu Gong、Mayur Naik は動的エージェントベンチマークを提案する。各モデルが対話型環境を**書き**（各環境には特権的なヒントが付き、有能力な解答者がヒントなしでは失敗し、ヒントありで通ることを狙う）、他者の環境を**解く**。9 つのフロンティアモデルでは、解くことと書くことが別の技能であることが示された。最強の解答者は最強の作者ではなく、小さいモデルほど難しい環境と有用なヒントを書いた。一対比較の結果は推移的で安定したランキングを与え、独立した作者は同じ設計に収束する。続いて Qwen3.8-27B を用いた強化学習研究が、学習者のヒントによる改善が他者の書いた環境へどこまで移るかを追跡する。

**Why it matters:** モデルが自ら課題を作るベンチマークは、出題品質と解答品質が分離可能な場合にのみ意味を持つ。本論文は分離可能だと示し、しかも予想外の方向で示した。弱い解答者のほうが難しい環境を作る。合成訓練データを生成する誰にとっても重要で、生成器の能力と生成されたタスクの有用性は同じ軸ではない。

[`🔗 arXiv 要旨`](https://arxiv.org/abs/2610.30116) · [`🔗 PDF`](https://arxiv.org/pdf/2610.30116v1)

---

## 18. SWE-DIVE：整形された issue ではなく「会話」でコーディングエージェントを評価する

- **Velocity:** ▮ steady
- **Source:** arXiv 2610.30047 · 約 14 時間前 (~20:00 UTC+8)
- **Tags:** `arxiv` `benchmark` `coding-agents` `evaluation`

Lorenz Brehme、Benjamin Steenhoek、Ruth Breu は、SWE-bench 形式の評価が 2 点で代表的でないと論じる。実際のプロンプトは GitHub issue ほど整形されておらず、実際のセッションは単一プロンプトではなく要件が積み重なるマルチターンのやり取りである。SWE-DIVE は、異なる行動パターンを再現できるユーザシミュレータと、シミュレータの出力が初期要件を満たしているか評価しつつエージェントを解へ導く会話バリデータを組み合わせる。フレームワークは固定のトランスクリプト集ではなくハーネスとして提供される。

**Why it matters:** ベンチマークの現実性は「より難しい課題」から「より乱れた入力」へ移っており、シミュレートされたユーザは後者を人手のアノテーションなしでスケールさせる唯一の方法だ。この設計が提起する未解決の問いは、シミュレータベースの評価すべてが直面するものと同じである。検証と同時に誘導も行うバリデータは、動く標的に対してエージェントを測っている。スコアのどれだけが誘導に由来するかは、論文自身の記述で確認すべき点だ。

[`🔗 arXiv 要旨`](https://arxiv.org/abs/2610.30047) · [`🔗 PDF`](https://arxiv.org/pdf/2610.30047v1)

---

## 19. pwn.watch：進行中のセキュリティ事故を素の JSON、RSS、`llms.txt` で提供

- **Velocity:** ▮ steady
- **Source:** Hacker News · 277+ pts · 6 時間前 (~22:08 UTC+8)
- **Tags:** `security` `agents` `data` `rss` `tooling`

pwn.watch は進行中のセキュリティ事故を追跡し、多くの CVE フィードが欠いている 3 つのフィールド、すなわちパッチ状況、影響バージョン、修正バージョンを提示する。加えて各出来事を報じた投稿のタイムラインも持つ。本稿執筆時点で 38 件の進行中インシデントを掲載し、うち 17 件が critical、20 件が修正済み、16 件が部分修正、2 件が未修正。すべて静的ファイルとして提供され、CORS 有効、認証なし、こちら側のレート制限なし。`/incidents.json` が索引、`/i/{slug}.json` がタイムライン・章・情報源・`agentBrief`（Markdown の修復ブリーフ）を含む完全データ、`/i/{slug}/feed.xml` と `feed.json` がインシデント単位の更新フィード、`/changes.json` が全インシデントのタイムライン更新、`/llms.txt` がデータ構造の説明。

**Why it matters:** データモデル自体が主張になっている。CVE レコードは脆弱性の存在を伝えるが、修正が出ているかは伝えない。「修正バージョン」フィールドこそ、エージェントが「自分は露出しているか」に答えるために必要なものであり、興味深いのはヒートマップではなく `agentBrief` と機械可読エンドポイントのほうだ。他者の報道に対する索引として扱い、一次情報源とはみなさず、行動前にリンクされたアドバイザリを辿ること。

[`🔗 pwn.watch`](https://pwn.watch/) · [`🔗 llms.txt`](https://pwn.watch/llms.txt) · [`🔗 incidents.json`](https://pwn.watch/incidents.json)

---

## 20. Arc に終了日：このブラウザは 12 月 22 日に動かなくなる

- **Velocity:** ▮ steady
- **Source:** Hacker News · 162+ pts · 3.5 時間前 (~00:27 UTC+8)
- **Tags:** `browser` `arc` `sunset` `migration`

The Browser Company は 10 月 22 日、Arc を 2026 年 12 月 22 日に終了すると発表した。ブラウザには継続的で専任のセキュリティ作業が必要であり、同社はそのチームを Dia に集中させるという。日程は段階的だ。10 月 22 日に新規アカウント作成を停止し、完全なデータエクスポートと Dia インポータを提供開始。11 月 23 日に iOS と Android の「Browse for Me」など AI 機能を無効化し、サインインとタブ同期を停止。12 月 22 日に macOS と Windows の Arc が完全に停止し、アカウントは無効化され、個人データは 30 日以内に削除、Arc Search は Google Play から削除される。パスワード、ブックマーク、拡張、履歴、Spaces（現在は「Profiles」）、Folders（現在は「Tab Groups」）、ピン留めタブは Dia へインポートできる。

**Why it matters:** Arc の開発は 2025 年 5 月に Dia へ方針転換した時点で止まっており、これは保守期間の正式な終わりであって驚きではない。しかしブラウザの終了はアプリの終了とは違う。エクスポートの窓は現実に存在し、閉じる。アカウントデータは 30 日後に削除される。Arc の Spaces モデルに乗ったワークフローを持つなら、移行先で**機能名が変わっている**ことに注意すべきで、移行ガイドが人を落とすのはそこだ。

[`🔗 arc.net — Arc に別れを`](https://arc.net/) · [`🔗 The Verge`](https://www.theverge.com/tech/1016832/arc-browser-shutting-down) · [`🔗 Engadget`](https://www.engadget.com/2294643/the-browser-company-is-officially-killing-arc-on-december-22/)

---

## Metadata

| Field | Value |
|-------|-------|
| Generated | 2026-10-23T04:10:00Z |
| Items | 20 |
| Sources tracked | 14（Hacker News、GitHub Trending、NVD、CVE Program、GitHub Advisory DB、ベンダーアドバイザリ、arXiv、Hugging Face、セキュリティ研究ブログ） |
| Update schedule | 04:03, 12:03, 20:03 UTC+8（1 日 3 回） |
| Ranking | 速度加重（鮮度 × エンゲージメント加速 × 情報源の権威） |
| License | [CC-BY 4.0](https://creativecommons.org/licenses/by/4.0/) |

[前日](2026-10-22.md) · [生の .md](https://trending.md/jp/feed/2026-10-23.md) · [アーカイブ](../archive/)
