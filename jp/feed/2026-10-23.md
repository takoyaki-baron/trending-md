---
date: 2026-10-23
updated: 2026-10-23T12:21:22Z
schedule: 04:03, 12:03, 20:03 UTC+8
sources: 18
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

## 21. Claude が 123 のオープンソースライブラリを「クラッシュしない」と証明 —— 239 エントリポイント、1.8 億行の Rocq

- **Velocity:** ▮▮▮ trending
- **Source:** Anthropic Frontier Red Team · 190+ pts · 5 時間前 (~06:54 UTC+8)
- **Tags:** `formal-verification` `security` `anthropic` `rocq` `riscv`

10 月 22 日、Anthropic は Theorem との共同研究を公開した。Claude が 123 の OSS-Fuzz C/C++ ライブラリのコンパイル済みバイナリについて、**64 MB 未満のあらゆる入力**でクラッシュしないことを機械検証可能な証明として書き上げたというもの。仕様は各プロジェクトの既存 fuzz エントリポイントから機械的に導出され（「このテストスイートは決してクラッシュしない」）、Theorem の RISC-V および Linux プロセス意味論を用いてコンパイル済み RISC-V 命令上で証明される。検証は Rocq カーネルが行う。結果は 239 エントリポイント、約 1 億 8,000 万行の Rocq。典型的な証明は約 60 万行で、対象バイナリの中央値は 18,000 RISC-V 命令だった。証明を書く過程で、Claude は数兆回の fuzz 実行でも見つからなかったバグを発見し修正した。

**Why it matters:** 引用すべきは記事自身の「限界」節だ。証明が対象とするのは**シングルスレッド・静的リンク・musl の RISC-V バイナリ**であり、実際の配備はほぼ x86 か ARM に glibc である。各ライブラリの全エントリポイントが検証されたわけではなく、ASan が全てのメモリ安全性バグを検出するわけでもなく、**呼び出し側**の誤用は完全に範囲外である。「形式的に検証済み」は「バグなし」ではない。証明されるのは「宣言されたモデル内でクラッシュに到達しない」ことであり、信頼の基点は Theorem の意味論、定理文そのもの、そして Rocq チェッカーだ。これは fuzzer よりはるかに強い主張であり、見出しが誘うよりはるかに狭い主張でもある。

[`🔗 Anthropic — 形式的手法によるソフトウェア検証`](https://www.anthropic.com/research/formal-verification) · [`🔗 Hacker News スレッド`](https://news.ycombinator.com/item?id=50202217)

---

## 22. OpenAI の Decisions API が GA に —— 型付き出力は 3 種類、書かなかったトークンには課金されない

- **Velocity:** ▮▮ rising
- **Source:** OpenAI API チェンジログ · ~14 時間前 (~22:00 UTC+8)
- **Tags:** `openai` `api` `decision-models` `pricing` `agents`

`POST /v1/decisions` が 10 月 22 日に一般提供となった。動くのは `gpt-6-luna` のみ。リクエストは共有入力 1 つと 1〜400 個の**独立した**質問を運び、各質問は 3 種類の型付き出力のいずれかを返す。`predicate`（条件成立の確率 0〜1）、`choice`（与えた選択肢のいずれかと、選択肢ごとの確率・信頼度）、`score`（2〜10 段の順序尺度上の確率加重平均）。未キャッシュ入力は 100 万トークンあたり 0.10 ドル、キャッシュ読み出しは 0.01 ドル、**出力トークンは無料**。キャッシュは 1,024 トークン以上の同一共有プレフィックスを再利用する。GA で `input_json`、質問単位の画像埋め込み、質問数の上限 400（ベータ時 200）、対象顧客向けの ZDR と HIPAA 対応が加わった。

**Why it matters:** 価格設定そのものが設計だ。ラベルを予測することは「書く」ではなく「読む」として課金され、チャット補完では決して得られないほど安いリクエスト単位の分類器になる。設計文書に入れるべき制約は 2 つ。質問は独立なので依存のある判断は 2 回目の呼び出しになり、`file_id` は非対応なので画像は base64 データ URL か公開 HTTP(S) URL でなければならない。「最大 10 倍高速」は OpenAI 自身の数字で、比較対象は自社の Responses API だ。

[`🔗 Decisions API ガイド`](https://developers.openai.com/api/docs/guides/decisions) · [`🔗 API チェンジログ（10 月 22 日）`](https://developers.openai.com/api/docs/changelog)

---

## 23. Base Labs が mammoth-1 と elephant-1 をオープンソース化 —— 文章ではなく確率を返す判断モデル

- **Velocity:** ▮▮ rising
- **Source:** Baseten / Base Labs · ~1 日前 (~22:00 UTC+8)
- **Tags:** `llm` `open-weights` `decision-models` `qwen` `benchmarks`

Baseten の研究チームは 10 月 21 日、Qwen3.5 の事後学習モデル 2 つ —— mammoth-1（27B）と elephant-1（9B）—— を公開した。621 万件の判断例で訓練され、**選択肢が固定された**質問に共有プレフィックスの 1 回のフォワードで答える。どちらも文章を書かない。返すのは yes/no の確率、与えられた選択肢からの選択、順序尺度上のスコアで、訓練された「わからない」も含む。重みは Hugging Face の `baselabs/mammoth-1` と `baselabs/elephant-1` に MIT で公開され、公開から 1 週間 Baseten Model APIs で無料で試せる（既定でゼロデータ保持）。Baseten の報告では Jev Decision Index 0.4 が 71.24（208 モデル中 1 位）、Artificial Analysis Decision Index が 65.9 / 65.2 で、elephant-1 は Liquid AI の d1-ultra と並ぶ。

**Why it matters:** ここにある数字はすべて公開した側のものだ。ブログは訓練計算量も領域別の表も示さず、2 つ目の指標は我々が独立に確認できなかった。したがって「208 中 1 位」はベンチマークについての主張として読み、確定した順位とは考えない方がよい。実質的なのはインターフェースで、選択肢ごとの較正済み確率はルータやガードレール、トリアージが実際に消費する形であり、OpenAI が翌日に Decisions API で出したものと同じ形だ。

[`🔗 Baseten — mammoth-1 と elephant-1`](https://www.baseten.co/blog/the-best-decision-models-in-the-world-mammoth-1-and-elephant-1/) · [`🔗 baselabs/mammoth-1（MIT）`](https://huggingface.co/baselabs/mammoth-1)

---

## 24. AAIF が Agent Skills、Open Responses、OpenEnv、OpenSandbox を迎え入れ —— 初年度で 10 プロジェクト

- **Velocity:** ▮▮ rising
- **Source:** Agentic AI Foundation · ~18 時間前 (~18:00 UTC+8)
- **Tags:** `agents` `standards` `mcp` `governance` `open-source`

10 月 22 日、サンノゼの AGNTCon + MCPCon North America で 4 つのプロジェクトが Agentic AI Foundation に加わると発表された。Anthropic の **Agent Skills**（エージェントが必要時に読み込む指示・スクリプト・リソースのパッケージ形式）、OpenAI の **Open Responses**（Responses API を基にしたマルチプロバイダ LLM インターフェースのオープン仕様）、Hugging Face の **OpenEnv**（MCP と Gym プロトコル上のコンテナ化 RL 環境）、Alibaba の **OpenSandbox**（Docker と Kubernetes ランタイムを備えた汎用サンドボックス基盤）。既存の A2A、Agent Router、agentgateway、AGENTS.md、goose、MCP に加わり、ホスト件数は 10 に。2025 年 12 月の設立時は 3 件だった。

**Why it matters:** 互いに競合する 4 社が寄贈したのはモデル層ではなく**インターフェース層**の 4 ピースであり、ロックインが決まるのはまさにそこだ。スキルの梱包方法、リクエスト/レスポンスの形、環境の定義、コードの実行場所。発表に**書かれていない**ことも同じくらい語っている。財務条件はなく、プロジェクト数以外の採用指標もなく、「ベンダー中立のガバナンス」という一句以外にメンバー間の利害対立を解く仕組みも示されていない。

[`🔗 AAIF 発表`](https://aaif.io/news/agentic-ai-foundation-announces-four-new-projects) · [`🔗 Linux Foundation プレスリリース`](https://www.linuxfoundation.org/press/agentic-ai-foundation-announces-four-new-projects-agent-skills-open-responses-openenv-and-opensandbox)

---

## 25. EAGLE-4 は見出しの数字ではなく高速化マトリクスを出す —— バッチ 1 で 3.35×、64 で 1.38×

- **Velocity:** ▮▮ rising
- **Source:** eagle-hq/EAGLE-4 · 880+ stars · ~2 時間前 (~10:00 UTC+8)
- **Tags:** `inference` `speculative-decoding` `vllm` `sglang` `benchmarks`

EAGLE-4 は投機的デコーディングの「ドラフト token」側 ——「すべてのバッチサイズとハードウェアに適応する 1 つの drafter」—— で、`eagle-harness` 0.1.2 として SGLang 0.5.23、vLLM 0.32.0rc1、TokenSpeed 向けのエンジンビルドと、Qwen3.8-27B 用の公開ドラフトモデルを伴って出荷された。サポートマトリクスは**同一の割り当て**で、EAGLE-4 のスループットを同じエンジンの投機なし対照で割る。SGLang TP4・temperature 0 では同時 1 リクエストで 3.35×、8 で 2.11×、64 で 1.38×。temperature 1 では同じ 3 セルが 2.74×、1.78×、1.25×。各セルには貪欲等価チェックの ✅/⚠️/❌ が付き、出荷済みと未出荷候補の数字が同じ行に並ぶことはない。

**Why it matters:** 投機的デコーディングの主張は高負荷で静かに崩れるのが常で、崩れ方そのものを公開するリリースは珍しい。バッチ 1 の 3.35× は引用される数字だが、同時 64 での 1.38× こそ、推論チームが本番で付けっぱなしにするかを決める数字だ。範囲の但し書きも同じページにある。AMD MI355X の 1 行（0.1.0 パッケージのまま）を除き全行が NVIDIA B300 の割り当てで、ライセンスは OSI 認可ではなく独自の「Eagle-4」ライセンスだ。

[`🔗 eagle-hq/EAGLE-4`](https://github.com/eagle-hq/EAGLE-4) · [`🔗 EAGLE-Corp/Qwen3.8-27B-EAGLE4 ドラフト`](https://huggingface.co/EAGLE-Corp/Qwen3.8-27B-EAGLE4)

---

## 26. Opposable は 2B の computer-use モデルをスマホ本体で動かす —— 27/36 画面、そして 1.5 GB のダウンロードがその注釈になる

- **Velocity:** ▮▮ rising
- **Source:** Opposable エンジニアリングブログ · 17+ pts · ~1 日前 (~21:00 UTC+8)
- **Tags:** `agents` `computer-use` `on-device` `android` `npu`

Opposable の Android アプリはアクセシビリティサービス経由で他のアプリを操作し、クラウドエージェント未接続時は画面操作ループを端末上で回す。使うのは GUI-Owl 1.5 2B —— Alibaba の Mobile-Agent チームによる Qwen3-VL のファインチューン —— を llama.cpp で 4-bit に量子化したもの。1.05 GB の言語モデルと 445 MB の視覚エンコーダが常駐し、スクリーンショット 1 枚につき 1 アクションを出す。Mac M2 の CPU では 1 ステップが当初 10.6 秒（エンコーダ 4.6 秒、prefill 4.3 秒、デコード 1.7 秒）かかり、UI バーの切り落とし、平坦な背景の画像トークン削除、システムプロンプトのキャッシュ、接地付き早期終了で 7.3 秒に短縮された。36 画面の採点セットでの精度は 27/36 のまま変わらない。8 つのホールドアウトタスクを 2 巡した全体成功率は 4/8 と 3/8 で、タスクを検証可能なサブゴールに分割すると両巡とも 6/8 に上がった。Galaxy S25 では視覚タワーのみを ONNX に書き出し、同一画面が CPU の 3.9 秒から Snapdragon NPU の 236 ミリ秒になった。

**Why it matters:** 公表された数字は控えめで、それでも著者はそのまま出す。27/36 に留まった 3 通りのトークン削除設定も含めて。削除が買ったのは遅延であって精度ではない、と書くのは結果以上に珍しい。本当の物語は配備の制約だ。NPU 経路は Snapdragon のみで、見慣れないアプリはクラウド接続時に Claude、ChatGPT、Codex へ委譲される。1.5 GB のダウンロードが手に入れるのはフォールバックである。

[`🔗 Opposable — スマホ自体で computer use`](https://getopposable.com/blog/computer-use-on-the-phone) · [`🔗 Hacker News スレッド`](https://news.ycombinator.com/item?id=50180190)

---

## 27. 10 月 21 日の PHP の 9.2 に関する記録の続報：Amazon のハニーポットはパッチ 4 日前に試行を観測していた

- **Velocity:** ▮▮▮ trending
- **Source:** BleepingComputer / Amazon Threat Intelligence · ~15 時間前 (~21:09 UTC+8)
- **Tags:** `cve` `php` `exploited` `patching` `exploit`

Amazon Threat Intelligence は、php2shell の最初期の悪用試行を観測したのが **10 月 17 日**だったと述べている。CVE-2026-109618 と CVE-2026-109619 の 10 月 21 日の緊急リリースより 4 日早い。AWS の CISO、CJ Moses は両脆弱性が現在広く悪用されており、試行の一部は商用の匿名化ネットワーク由来だとしている。PHP のセキュリティチームはパッチ前の概念実証は「動作しなかった」と主張し、Dataminr TRACE も観測された活動はスキャン、フィンガープリンティング、動作しないエクスプロイトに限られるとする。VirusTotal は露出した PHP ホストを 510 万台と数え、うち 380 万台が少なくとも 1 つのポートを開いている。並行してエクスプロイトコードが公開された。`ikow/php2shell-poc`（1,564★、5 本の RCE チェーンと Suricata/Sigma/ModSecurity ルール）、`9bie` の ASLR 回避版（981★）、`eness` の PoC（901★）、Assetnote のスキャナ（324★）、そして OpenAI の `php2shell-checker`（843★）—— `X-Powered-By` と `Server` を読む 2 つの Codex スキル。

**Why it matters:** 見かけの矛盾は矛盾ではない。失敗した悪用試行も悪用試行であり、「PoC は動かなかった」と「17 日に試行を観測した」は同時に真になりうる。ただし両者が示す露出期間は大きく異なる。バージョンヘッダのスキャンでは決着しない。OpenAI 自身の README が、HTTP ヘッダではバックポートされた修正を判別できないと明記している。`OK` が示すのは** advertised なバージョン**であり、実際にインストールされたものではない。

[`🔗 BleepingComputer — 悪用はパッチ 4 日前に始まっていた`](https://www.bleepingcomputer.com/news/security/amazon-says-php2shell-exploitation-began-4-days-before-patches/) · [`🔗 openai/php2shell-checker`](https://github.com/openai/php2shell-checker) · [`🔗 ikow/php2shell-poc`](https://github.com/ikow/php2shell-poc)

---

## 28. Capcom の CAPCOM ID 流出は 11,774,247 件 —— パスワードが強制リセットされたのは 196 アカウントで、全部ではない

- **Velocity:** ▮▮▮ trending
- **Source:** Capcom IR · ~8 時間前 (~04:22 UTC+8)
- **Tags:** `breach` `gaming` `credentials` `capcom` `incident`

Capcom の 10 月 22 日の告知によれば、『ストリートファイター 6』『モンスターハンター』『バイオハザード』のオンラインプレイを支えるアカウントサービス CAPCOM ID が不正アクセスを受け、世界で 11,774,247 件のレコードが影響した。露出した項目はメールアドレスとシステム識別子 —— アカウント作成日時、最終ログイン日時、ログイン回数、最終ログインの IP アドレス。43 件では生年月日、性別、ニックネーム、国・地域も含まれた。196 アカウントはパスワードが無断で変更され、現在はリセット済み。Capcom は 10 月 19 日に異常を検知し、翌日に対策本部を設置、10 月 21 日に大阪府警と個人情報保護委員会へ報告した。

**Why it matters:** 流出したのは認証情報のダンプではなく**フィッシング用の名簿**だ。メールアドレスに最終ログイン IP と時刻が付くのは、「新しい端末からのログインを検知しました」を説得力あるものにする材料そのもので、Capcom はすでになりすましへの注意を呼びかけている。同社は利用者が設定したパスワードの侵害は確認しておらず、カード情報も保持していないとしている。これは「確認されていない」であって「起こりえない」ではなく、数字はすべて「10 月 22 日時点」と明記されている。

[`🔗 Capcom — 不正アクセスに関するお知らせ`](https://www.capcom.co.jp/ir/english/news/html/e261022.html) · [`🔗 BleepingComputer`](https://www.bleepingcomputer.com/news/security/capcom-confirms-data-breach-affecting-117-million-accounts/)

---

## 29. GMO の「お名前.com デスクトップクラウド」は依然停止中：26,739 台、FX 取引の認証情報も影響範囲に

- **Velocity:** ▮▮ rising
- **Source:** GMO Internet / Watch Impress · ~1.3 日前 (~04:00 UTC+8)
- **Tags:** `breach` `vps` `japan` `fx` `incident`

GMO Internet は 10 月 20 日、FX 自動売買で広く使われる Windows VPS「お名前.com デスクトップクラウド」の一部顧客サーバーに不正なプログラムが設置されていたことを確認した。全プランが 10 月 21 日 04:00 JST から順次停止し、現在も復旧しておらず再開時期は未定。GMO の 10 月 22 日の説明は影響しうる規模を **26,739 台**としており、報道によればこれらのサーバー上に保存されていた証券・MT4/MT5 のログイン認証情報が窃取された可能性があり、利用者から不正ログインや不正取引の報告が出ている。同社はこの基盤にカード情報を保持していないとしている。

**Why it matters:** VPS 事業者は顧客**自身**の秘密が置かれる場所であり、ここには証券口座のログイン情報があった。つまりこの事件は同時にホスティングの停止と金融アカウントの侵害であり、しかも経路に第三者（証券会社）が介在する。「サーバーのパスワードを変える」だけでは済まない所以だ。最初の告知ではなく最新の告知を読むべきで、10 月 21 日の文面は個人情報の漏えいも閲覧データの悪用も確認していないとしていたが、翌日の説明はその範囲を実質的に広げた。

[`🔗 GMO / お名前.com のお知らせ`](https://www.onamae.com/news/article/11584) · [`🔗 Watch Impress — FX の不正利用も発生`](https://www.watch.impress.co.jp/docs/news/2150663.html)

---

## 30. Drupal Webform の 9.1 は CISA の数字で、記録の元になったアドバイザリは 9 月 23 日付

- **Velocity:** ▮ steady
- **Source:** Drupal セキュリティチーム / NVD · ~14 時間前 (~22:00 UTC+8)
- **Tags:** `cve` `drupal` `provenance` `rce` `adp`

CVE-2026-96355 は Webform コントリビュートモジュールの重大な（Drupal 独自の 25 点満点で 18 点）リモートコード実行だ。一部のフォーマットテンプレートをトークン置換の対象から十分に除外しておらず、攻撃者が投稿したデータが送信内容のレンダリング時にテンプレートコードとして評価される。設定次第で情報漏えい、蓄積型 XSS、RCE になりうる。Webform 6.2.12 と 6.3.1 で修正済み。緩和条件は、影響を受けるフォームが送信値トークンを含むカスタムの複数値アイテムフォーマットを使っている場合に限られる点だ。Drupal のアドバイザリは **2026-09-23** 付。NVD は 10 月 22 日に CVE レコードを公開したが、指標は 1 つだけ —— CVSS 3.1、**9.1、`Secondary`、source `134c704f-…`（CISA-ADP）** —— で、状態は `Awaiting Analysis`、NVD 自身の指標は 0 件だった。

**Why it matters:** ありがちな枠組みは両方とも間違っている。修正はレコードより 1 か月早く出ており、これは**バックフィル**であって「今週の新しい Drupal RCE」ではない。そして 9.1 を書いたのは CISA の Vulnrichment コンテナであり、NVD でも Drupal でもない（Drupal 自身のスコアは CVSS ではなく 25 点の複合指標だ）。第三者のエンリッチメント基盤が他人の脆弱性を採点するのは例外的状況ではなくなっており、我々が 10 月の 1 週間について行った調査では、ADP のみのスコアを持つレコードは公開レコードの約 8% に上った。

[`🔗 Drupal SA-CONTRIB-2026-175`](https://www.drupal.org/sa-contrib-2026-175) · [`🔗 CVE-2026-96355（NVD）`](https://nvd.nist.gov/vuln/detail/CVE-2026-96355)

---

## 31. Reason Network は同僚のコーディングエージェントを P2P ネットワークに載せる —— デーモン 1 つ、エンドツーエンド暗号化

- **Velocity:** ▮ steady
- **Source:** reason-machines/reason-network · 1,081+ stars · ~4 時間前 (~08:10 UTC+8)
- **Tags:** `agents` `mcp` `p2p` `coding-agents` `infra`

Reason Network は各コンピュータに小さなデーモンを 1 つ入れ、そこ上のすべてのコーディングエージェントセッション —— Claude Code、Codex、Cursor、Gemini CLI、Copilot CLI、Grok CLI、opencode、pi、DeepSeek Harness、Reason —— を登録し、誰がどのリポジトリ・ブランチで動いているか、ビジーかアイドルかを同じネットワークの全員に公開する。エージェントには 3 つの MCP ツール（`list_team`、`send_message`、`ask_user`）と `check_inbox` が与えられ、メッセージは Claude Code、Codex、opencode、pi、Reason ではセッション中に、Cursor、Gemini、Copilot、Grok では次のステップで届く。テキストファイルは最大 10 個まで添付できる。マシン間は iroh による P2P で、エンドツーエンド暗号化。ホスト型アシスタントは `mcp.reasonmachines.com` の MCP サーバー経由で接続する。エンジンは Apache-2.0、セットアップ CLI は無料だが非オープンソース、サービスは無料。

**Why it matters:** エージェント間メッセージングを単独ユーザーの道具ではなく**チーム**のプリミティブにした、初めて広く星を集めた試みであり、設計は信頼境界を正直に引いている。自分のマシン間はエンドツーエンドだが、ホスト型ボットは必然的に Reason の中継を通る。持ち帰るべきは README 自身の運用上の警告だ。同僚のメッセージ、ファイル、ウェブページからの webhook を決して受け入れるな —— 別のエージェントから指示を受け取るエージェントは、親しみやすい名前をしたプロンプトインジェクションの経路そのものだからだ。

[`🔗 reason-machines/reason-network`](https://github.com/reason-machines/reason-network) · [`🔗 Reason Network`](https://reasonmachines.com/network)

---

## 32. Reylo は `.sql` ファイルを TypeScript にコンパイルさせて型を付ける —— 2 日で 707 星、ただし TS 7.1 beta が必要

- **Velocity:** ▮ steady
- **Source:** colinhacks/reylo · 707+ stars · ~1 日前 (~21:00 UTC+8)
- **Tags:** `typescript` `sql` `devtools` `types` `open-source`

Colin Hacks（Zod 作者）が 10 月 21 日に MIT で公開した Reylo は、`import getAuthor from "./get_author.sql"` して `getAuthor.run(db, { id: 1 })` を呼ぶだけで、戻り値の型が SQL に追随し、クエリを変えるとエディタ上でも更新される。土台は TypeScript 7.1 の **content mappers**（`microsoft/typescript-go` PR 4712）で、プラグインがコンパイル中に外部ファイル拡張子へ静的型を定義できるようにするもの。そのため SQL 方言の構文をそのまま使い、コード生成の手順も要らない。Postgres、MySQL、SQLite に対応し、ドライバは持参（`pg`、postgres.js、`mysql2`、`better-sqlite3`、`Bun.sql`、Cloudflare D1）。npm は 0.3.0、6 リリース。

**Why it matters:** 注目すべきは content mappers のほうだ。TypeScript 7.1 の新しい拡張フックを汎用のコンパイル時型プロバイダとして使う最初のプロジェクトであり、言語機能が他の人が真似するパターンになったことを意味する。制約も同様に現実的で、`typescript@beta` 7.1 を要求するため安定版 TS を固定したビルドには入れられず、クエリが型を確定しない箇所では引数に明示的なキャストが要る。

[`🔗 colinhacks/reylo`](https://github.com/colinhacks/reylo) · [`🔗 reylo.dev`](https://reylo.dev)

---

## 33. Uberblok は ZFS の内部構造を博物館にした —— 128 KiB のリング、`N mod slots`、特定コミットに固定したソースリンク

- **Velocity:** ▮ steady
- **Source:** Show HN · 94+ pts · ~1 日前 (~21:04 UTC+8)
- **Tags:** `zfs` `storage` `education` `filesystems` `show-hn`

Uberblok は OpenZFS を対話的にたどる、ソースリンク付きの解説サイトだ。出発点は uberblock。`ub_txg` が最新のトランザクショングループを記録し、`ub_rootbp` がブロックツリーの根を指す。各ディスクは 4 つのラベル —— 両端に 2 つずつ —— を持ち、各ラベルには 128 KiB の uberblock リングが入る。新しい uberblock はスロット `N mod slots` に書かれ（multihost/MMP 有効時は 1 スロット予約）、スロットサイズはセクタサイズを 1 KiB に丸め、8 KiB を上限とするため、128／64／32／16 スロットになる。インポート時、ZFS は txg が最大の**有効な** uberblock を選ぶ。部屋はコピーオンライト、チェックサムと自己修復、vdev、RAID-Z、スナップショットとクローン、ARC、metaslab、ZIL/SLOG、send/receive、暗号化まで続き、連続するトランザクショングループがスロットを占める様子を 3D リングで見せる。コード抜粋は OpenZFS 2.4.4、コミット `71a9f95` に固定されている。

**Why it matters:** ファイルシステムの解説はモデルかコードを説明するが、**自分のどのコピーがマウントされるか**を決めるオンディスクの算術は説明しない。スロット数の表は、通常ソースを読まないと得られない種類の詳細だ。OpenZFS とは無関係だと明記し、多くの対話型解説が飛ばすライセンスの整理もしている。引用ソースは CDDL-1.0、本文は CC BY 4.0、サイトのコードは MIT。

[`🔗 Uberblok`](https://uberblok.storagebits.workers.dev/) · [`🔗 Hacker News スレッド`](https://news.ycombinator.com/item?id=50180257)

---

## 34. Rubix：3,500 行の x86-64 アセンブリで書かれた 42 KB のコンパイラ —— セルフホストはまだ試作

- **Velocity:** ▮ steady
- **Source:** GitHub（10 月 19 日作成）· 1,904+ stars
- **Tags:** `compilers` `assembly` `systems` `open-source` `languages`

Rubix（`.ix`）は、本番コンパイラが約 3,500 行の純粋な GNU x86-64 アセンブリで書かれたシステムプログラミング言語で、Linux ELF64 と Windows PE64 の単体バイナリを生成する。libc も C も LLVM も仮想マシンも使わない。README はコンパイラを約 42 KB とし、1 ミリ秒未満のビルドを主張、19 のテストスイート（算術、制御フロー、関数、構造体、ネイティブ SSE2 演算子による浮動小数点、分割コンパイル、Windows クロスリンク）を列挙する。MIT ライセンスで、4 日間で 1,904 星。例題には 1,000 要素の篩や 200 要素のクイックソートが含まれる。

**Why it matters:** 興味深い主張はセルフホストのほうで、リポジトリはそれについて正直だ。Rubix 自身で書かれたセルフホストコンパイラは約 1,000 行の初期試作で、issue #1 で追跡されている。つまり今日のコンパイラは下までアセンブリであり、「セルフホスト」はロードマップ項目であって既存の性質ではない。サイズと速度の数字は誰かが再現するまでは著者自身の測定値として扱うべきだ。「42 KB のコンパイラ」はビルド成果物についての主張であり、実際に検証できるのは 19 のテストスイートの側だ。

[`🔗 tek-sys-hub/Rubix-lang`](https://github.com/tek-sys-hub/Rubix-lang) · [`🔗 Issue #1 —— セルフホストのロードマップ`](https://github.com/tek-sys-hub/Rubix-lang/issues/1)

---

## 35. GNU Taler に会社ができる：Taler Operations AG がボーフムに設立され、電子マネー免許を申請へ

- **Velocity:** ▮ steady
- **Source:** taler.net · 240+ pts · ~12 時間前 (~00:14 UTC+8)
- **Tags:** `payments` `privacy` `eu` `regulation` `fintech`

NGI TALER プロジェクトの 3 年を経て、GNU Taler のチームは **Taler Operations AG** をボーフムに設立し、ユーロ建てで Taler を運営すると発表した。まずドイツ、次にユーロ圏へ広げる。ドイツの金融監督当局 BaFin には電子マネー発行者の免許を申請する。この役割は当初 GLS 銀行が担う予定だったが、GLS は 2026 年 1 月に Taler とは無関係な理由として撤退を決め、現在は支援の立場でコンソーシアムに残っている。Taler は価値を表す無記名トークンを発行するため、EU 規制上は電子マネーに当たり、ユーロの電子マネーを発行する機関は銀行であるか専用の免許を持つ必要がある。

**Why it matters:** プライバシー保護型の決済システムは、同じ非技術的な段階で繰り返し止まってきた。責任を負う規制対象の事業者を見つけることだ。今回の発表は暗号方式ではなく、その事業者と監督当局の名前を示している。免許はまだ取得していない。BaFin への申請が次の一歩であり、今日の時点で Taler が持つのはユーロ運営の**計画**であって、ユーロ運営そのものではない。

[`🔗 taler.net — ドイツでの Taler 運営に向けて`](https://www.taler.net/en/news/2026-13.html) · [`🔗 Hacker News スレッド`](https://news.ycombinator.com/item?id=50197404)

---

## 36. 「Docker は奇妙だ」— 自作コンテナランタイムを作って分かった、コートを着た 5 つのカーネル機能

- **Velocity:** ▮▮▮ trending
- **Source:** Hacker News · 568+ pts · 12 時間前 (~07:45 UTC+8)
- **Tags:** `containers` `docker` `linux` `runc` `explainer`

遊びで自作のコンテナランタイムを書き始めた開発者が、Docker が隠しているものを記録した。コンテナは VM ではなく制限を課されたプロセスにすぎず、Linux に「コンテナ」という単一の機能は存在しない — namespace はプロセスから見える範囲を隠し、cgroup は使える資源を制限し、ネットワークは分離を成立させる一連の仕組みだ。イメージとは Docker がどこかに置いたディレクトリで、そこへ `chroot`／`pivot_root` してルートにする。だから `docker run -it --rm ubuntu /bin/bash` が最終的に実行するのは `/some/weird/docker/path/bin/bash` である。最も鋭いのは `runc` が Go 製である点の指摘だ。ランタイムが必要とするシステムコールの多くはシングルスレッド環境で呼ぶ必要があり、runc は Go ランタイム初期化前に走る C モジュールを同梱している。Go には使える `fork` がないため、特殊な argv で `/proc/self/exe` を再 exec して fork を近似している。

**Why it matters:** この記事の抽象化はどれも、デバッグ中に必ず到達する層だ — `/proc` に見えるプロセス、ディレクトリにすぎないイメージ、ユーザー空間でネットワークスタックを再実装せざるを得ない rootless ランタイム。コンテナの安全性を考える人にとって重要なのは Go の節である。ランタイムで最も特権的な操作が Go 以前の C シムで起きるのは、言語のスレッドモデルがその仕事に合わないからだ。

[`🔗 Code and Cake — Docker is weird`](https://codeandcake.dev/posts/2026-10-22-docker-is-weird) · [`🔗 Hacker News スレッド`](https://news.ycombinator.com/item?id=50202681)

---

## 37. Local Wikipedia — 徒歩 30 分圏の百科事典、しかも位置情報は URL に載せない

- **Velocity:** ▮▮▮ trending
- **Source:** Hacker News · 546+ pts · 13 時間前 (~07:01 UTC+8)
- **Tags:** `web` `wikipedia` `geodata` `privacy` `show-hn`

Ed Jefferson の Local Wikipedia は、入力した場所 — 町、郵便番号、ランドマーク、座標 — の近くにある記事でメインページを組み立てる。場所の解決は `postcodes.io`、記事はウィキペディアの `geosearch` から取る。半径は 2,414 メートル（約 1.5 マイル、徒歩 30 分）で最大 500 件、25 件未満の地域（農村部の多く）では約 10 km 以内の最寄り 25 件を採用する。注目記事、「知っていましたか」、最寄り記事、A–Z、距離順の索引を備え、ウィキペディアの 9 言語版に対応し、記事はブラウザ内で描画される。場所は `localStorage` の専用キーに保存され、アドレスバーには決して入らない。共有リンクやスクリーンショットが誰かの位置を持ち出さない設計だ。

**Why it matters:** プライバシーの判断が設計判断になっている。座標を共有可能な URL に載せる位置対応サイトは、座標をチャットログやリファラ、スクリーンショットへ漏らす。このサイトはそれを意図的にできないようにしている。さらに、ウィキペディアの geosearch を検索ではなく**フィルタ**として使う稀な例でもある。「近所」のグラフそのものが製品であり、ページ自身の文言は英語のまま、記事だけが版ごとに切り替わる。

[`🔗 Local Wikipedia`](https://edjefferson.com/localwiki/) · [`🔗 Hacker News スレッド`](https://news.ycombinator.com/item?id=50202285)

---

## 38. Storm-0940 がオープンソースの agent 型ペネトレーションフレームワークを 2,250 超のテナントに向けた — マイクロソフトは大半が失敗と説明

- **Velocity:** ▮▮▮ trending
- **Source:** Microsoft Security Blog · 約 1.5 日前 (~04:00 UTC+8 10 月 22 日)
- **Tags:** `threat-intel` `agentic-ai` `supply-chain` `connectwise` `microsoft`

マイクロソフトは ConnectWise Cloud Backup のサプライチェーン侵害を Storm-0940（中国国家系とされるアクター）に帰属させた。同社によれば、このアクターは少なくとも 2026 年 9 月から **ARTEX** を使っている。Go バックエンドと Next.js フロントエンドを持つマルチエージェント LLM のオープンソース侵入テストフレームワークで、「任意の AI モデルを使える」。ConnectWise への不正アクセス後、攻撃者は ARTEX を用いて、すでに同意済みのアプリケーション経由で 2,250 超の下流 Microsoft 365 テナントへの**サインインを試みた**という。AI で加速された Graph 上の活動には偵察、アプリ資格情報の変更、権限変更が含まれる。ARTEX を用いた他の複数の侵入では、標的選定からクラウドの特権アクセスまで 3 時間未満だったと測定している。

**Why it matters:** 注意書きこそが本題で、マイクロソフトは明記している。標的化の大半は成功しておらず、影響を受けるアプリの存在や認証の成功は「顧客データへのアクセスや持ち出しを必ずしも意味しない」。新しいのは測定されたテンポだ。agent 型フレームワークが標的選定から永続化までを数時間に縮め、週末も祝日も関係ない。これは「2,250 テナントが侵害された」とは別の主張であり、防衛計画が前提にすべきのは前者である。

[`🔗 Microsoft — Storm-0940 uses ARTEX`](https://www.microsoft.com/en-us/security/blog/2026/10/21/storm-0940-uses-artex-agentic-ai-connectwise-supply-chain-compromise/) · [`🔗 trhhubsd/ARTEX (AGPL-3.0)`](https://github.com/trhhubsd/ARTEX) · [`🔗 pwn.watch インシデント`](https://pwn.watch/i/connectwise-cloud-backup-m365-hijack)

---

## 39. Brotli デコーダに 9.2 — RCE に至る領域外書き込みが 1.0.3 から 1.2.0 の全版に

- **Velocity:** ▮▮ rising
- **Source:** Node.js セキュリティリリース / NVD · 約 1.5 日前 (~03:58 UTC+8 10 月 22 日)
- **Tags:** `cve` `brotli` `nodejs` `rce` `compression`

CVE-2026-111497 は Brotli デコーダ（`c/dec/decode.c`）の領域外書き込みで、1.0.3 から 1.2.0 までの全プラットフォームに影響する。細工した圧縮ストリームにより、リモートの未認証攻撃者が隣接するデコーダ状態メモリを破壊し、メモリを開示し、サービス拒否を起こし、場合によってはコードを実行できる。Google は 10 月 21 日に 1.0.10、1.1.1、1.2.1 を公開し、Node.js も同日のセキュリティリリースで 26.x、24.x、22.x を修正した（OpenAI Codex Security の Khai Tran と Sylvie Mayer の報告）。Node のリリースには他に 9 件の CVE があり、IP を全角数字で書いた場合とホストが IP に緩く解決される場合の TLS ホスト名バイパス 2 件、`dns.resolve` の NUL による切り詰め、`crypto.randomUUID()` のエントロピーキャッシュが起動スナップショットに保存され同一スナップショット由来の全プロセスが同じ値を繰り返す問題を含む。

**Why it matters:** スコアは **CVSS 4.0 の 9.2 で、Google が CNA として付与**したもの（`cve-coordination@google.com`）。NVD の記録は `Awaiting Analysis` で NVD 自身の指標は 0 件であり、この数字は報告者側のもので独立評価ではない。早期修正の理由は到達範囲にある。リファレンス実装の C デコーダは Node のはるか外にも組み込まれており、影響するバージョン幅は 5 年分に及ぶ。見るべきはアプリのバージョンではなくライブラリのバージョンだ。

[`🔗 Node.js 2026 年 10 月セキュリティリリース`](https://nodejs.org/en/blog/vulnerability/october-2026-security-releases) · [`🔗 google/brotli v1.2.1`](https://github.com/google/brotli/releases/tag/v1.2.1) · [`🔗 CVE-2026-111497 (NVD)`](https://nvd.nist.gov/vuln/detail/CVE-2026-111497)

---

## 40. EDK2 の PXE ドライバが 504 バイトのフィールドを境界検査なしでコピー — ネットワーク起動時のプリブート RCE

- **Velocity:** ▮▮ rising
- **Source:** GitHub Advisory Database · 21 時間前 (~22:34 UTC+8 10 月 22 日)
- **Tags:** `cve` `uefi` `edk2` `pxe` `firmware`

CVE-2026-97631。マシンが IPv4 または IPv6 で PXE 起動している間、`NetworkPkg/UefiPxeBcDxe` は ICMP エラーメッセージ受信用の要求を開いたままにし、受信した各メッセージを固定 504 バイトの `Mode.IcmpError` フィールドへコピーする。`PxeBcIcmpErrorDpcHandle` と `PxeBcIcmp6ErrorDpcHandle` の境界処理がどちらも誤っており、504 バイトを超えるメッセージもコピーされ、宛先ポインタはフラグメント単位ではなく累積長で進む。結果として、クライアントへユニキャスト ICMP エラーを届けられる未認証の攻撃者が、フィールドの外側へ任意バイトを書き込める。影響は 2 つで、DXE コア内での確実なクラッシュか、同一パケットに偽のイベントを仕込み `CoreSignalEvent()` に DXE フェーズでディスパッチさせるかであり、いずれも OS コンポーネントが検証も測定もされる前の話だ。修正（PR #13302）は 10 月 15 日にマージされ、Anthropic の Alex Matrosov と Google の Dan Holmes-Mitra がクレジットされている。

**Why it matters:** スコアは **EDK II CNA による CVSS 4.0 の 9.5**（`infosec@edk2.groups.io`）で、NVD は `Deferred`、NVD 自身の指標はない。数字より重要なのは、アドバイザリの影響バージョン欄が **「Not patched currently」** と書かれている点だ。コミットは `edk2` の master に入ったが、リリースされたファームウェアイメージには入っていない。したがって露出は、修正前のファームウェアで PXE 起動しうるすべてのマシンであり、Secure Boot は役に立たない。問題のコードはその前に動くからだ。窓はネットワーク起動の間だけであり、だからこそ見落とされやすい。

[`🔗 GHSA-99cj-7hg9-mp4m`](https://github.com/tianocore/edk2/security/advisories/GHSA-99cj-7hg9-mp4m) · [`🔗 PR #13302`](https://github.com/tianocore/edk2/pull/13302) · [`🔗 CVE-2026-97631 (NVD)`](https://nvd.nist.gov/vuln/detail/CVE-2026-97631)

---

## 41. x402 の決済 SDK に 25 件の欠陥 — あるクライアントはトークン残高の全体を承認してしまう

- **Velocity:** ▮▮ rising
- **Source:** V12 リサーチ · 約 1 日前 (~20:00 UTC+8 10 月 22 日)
- **Tags:** `agents` `payments` `x402` `solana` `security`

V12 は x402 — agent が人間の都度承認なしに API アクセスを購入するための HTTP 402 決済プロトコル — をレビューし、25 件の脆弱性を報告した。3 件の重大な指摘はそれぞれ別の信頼境界を越える。v1/v2 `exact` スキームの TypeScript Solana facilitator は、トランザクションが許可されたトークンプログラムを呼んでいることを確認したうえで 3 番目の命令を `TransferChecked` として解析したが、**命令の種類を検査していなかった**。そのため「トークンの承認（approval）」が、何も送金しない決済として受理された。SIWx ログインヘルパーはサーバーが与えた `domain` と `uri` を、接続先サイトと照合せずに署名していたため、悪意あるサーバーが別サイト向けのログイン署名を集められた。既定のクライアント設定には支出上限がなく、1 つの細工された応答で対応トークン残高全体の承認を得られた。V12 によれば重大・高の指摘は 8 月 12 日に報告し、重大 3 件は 8 月 20 日までに修正、9 月 9 日に中・低 9 件を追加報告した。

**Why it matters:** 開示文には **CVE 番号が一切出てこない**。これが運用上の問題だ。npm パッケージとして配布され、静かに修正されたプロトコルではスキャナが照合する番号がなく、x402 の利用者はアドバイザリを待つのではなく V12 の日付に対してバージョンを確認する必要がある。設計上の教訓はすべての agent 決済スタックに当てはまる。署名が示すのは**誰が**承認したかであり、**何を**承認したかではない。クライアントは署名の前にサーバーの要求を検証し、自前の予算を強制しなければならない。

[`🔗 V12 — x402 の 25 件の脆弱性`](https://v12.sh/blog/x402) · [`🔗 x402-foundation/x402`](https://github.com/x402-foundation/x402)

---

## 42. DeadTag — 660 超の失効した解析ドメインが再取得され、iOS エクスプロイトキットの配信網になっていた

- **Velocity:** ▮▮ rising
- **Source:** Report URI / iVerify · 約 1 日前 (~22:00 UTC+8 10 月 22 日)
- **Tags:** `ios` `spyware` `supply-chain` `malvertising` `dns`

Report URI と iVerify は「DeadTag」と呼ぶ作戦を記録した。数千のサイトに今も埋め込まれている古い解析・広告タグの背後にある失効ドメインを買い上げる作戦である。ドメインが持ち主を変えると、そのタグを残したすべてのサイトが、サイト側は何も変更していないのに、全訪問者に対して新しい持ち主のスクリプトを読み込み始める。研究者らは再取得された 660 以上のドメインを確認し、月間約 1 億 3,500 万訪問と推定した。タグは静かに iPhone の訪問者を選別し、Coruna（iOS 13〜17.2.1）と P7 DarkSword（iOS 18.4〜18.7）のエクスプロイトキットを配信する。これらはキーチェーンのパスワードを盗み、暗号資産ウォレットを狙う。配信経路には侵害された PrestaShop ストアや悪意ある Instagram 広告も含まれた。

**Why it matters:** これはサイトを一切侵害する必要のないサプライチェーンだ。依存が失効し、ドメインの失効は制御の移転であり、依存スキャナはそれを見ていない。対処は地味だが検証できる。第三者タグを棚卸しし、提供元が存在しないものを外し、iOS を更新する。両キットとも記載されたバージョン範囲の外では止まる。

[`🔗 Report URI — DeadTag`](https://blog.report-uri.com/deadtag-how-forgotten-website-tags-became-a-delivery-network-for-iphone-spyware/) · [`🔗 iVerify — Coruna と DarkSword`](https://www.iverify.com/blog/blog-malvertising-coruna-darksword-iphone-exploits) · [`🔗 Apple セキュリティアップデート`](https://support.apple.com/en-us/126776)

---

## 43. Keycloak の 9.1 リセット資格情報テイクオーバーに公開 PoC — 修正から 2 か月

- **Velocity:** ▮▮ rising
- **Source:** Exploit-DB / NVD · 約 1 日前 (~10:00 UTC+8 10 月 22 日)
- **Tags:** `cve` `keycloak` `exploit` `authentication` `redhat`

CVE-2026-18963 は Keycloak のリセット資格情報フロー（`keycloak-services`、CWE-640）の欠陥で、未認証の攻撃者がメールの確認リンクを踏ませることなく任意ユーザーのパスワードリセットを強制し、そのまま新しい資格情報を設定できる。被害者の操作を一切必要としないアカウントテイクオーバーである。Exploit-DB の 52699 は 10 月 21 日に PoC リポジトリとともに公開され、check と takeover の 2 モードを持ち、公式コンテナイメージの Keycloak 26.6.2 で検証された。影響範囲は 26.0.0〜26.4.14、26.5.0〜26.6.5、26.7.0〜26.7.1、修正版は 26.4.15、26.6.6、26.7.2 で 8 月に出ている。

**Why it matters:** 9.1 は **Red Hat のスコア**で、8 月 18 日公開のまま `Awaiting Analysis`、NVD 自身の指標がない記録に載っている。つまり 2 か月前の評価であり、ニュースは深刻度ではなく動作するエクスプロイトだ。影響版を IdP の背後で動かしている環境は、公開ツールのある認証前テイクオーバーの標的になる。修正は 8 月から導入可能だったのだから、「知らなかった」は開示の空白ではなくバージョン管理の失敗である。

[`🔗 Exploit-DB 52699`](https://www.exploit-db.com/exploits/52699) · [`🔗 GHSA-4gv3-mc9p-5wqc`](https://github.com/advisories/GHSA-4gv3-mc9p-5wqc) · [`🔗 CVE-2026-18963 (NVD)`](https://nvd.nist.gov/vuln/detail/CVE-2026-18963)

---

## 44. 悪意あるサイトが Storybook のプロジェクトを書き換えられる — 開発サーバーが任意オリジンの `postMessage` を受け入れていた

- **Velocity:** ▮▮ rising
- **Source:** GitHub Advisory Database · 約 1 日前 (~19:13 UTC+8 10 月 21 日)
- **Tags:** `cve` `storybook` `dev-server` `npm` `localhost`

CVE-2026-114125。`storybook dev` の実行中、プレビューの iframe は任意のサイトから埋め込むことができ、`postMessage` イベントを任意オリジンから受け入れていた。同じブラウザで開いた悪意あるページが、多少のユーザー操作を挟んで、実行中の開発サーバーに開発者プロジェクトの story ファイルを変更させられる。変更されたファイルはその後、開発者の権限を持つローカルランタイムに実行されうる。GitHub のアドバイザリは重大と評価し、NVD レコード上の CVSS 4.0 指標は 8.6（`security-advisories@github.com`）。修正版は 8.6.19、9.1.21、10.6.2、11.0.0-alpha.6 で、`storybook`、`@storybook/core`、`@storybook/core-server`、vitest 系アドオン、`@storybook/addon-mcp` に及ぶ。

**Why it matters:** `localhost` はとっくに信頼境界ではなくなっており、これはその典型形だ。あらゆる呼び出し元を自分のフロントエンドとみなす開発サーバーである。アドバイザリはリスクを下げるが消しはしないものも明記している。Chrome と Firefox はサイトが localhost サービスへ接続する前に許可を求める場合があり、そのプロンプトは今やセキュリティ上の意味を持つ。深刻度の分裂にも注意したい。GitHub は重大と言い、自身の CVSS 4.0 ベクタは 8.6 で、NVD はまだ分析していない。

[`🔗 GHSA-f2ph-cmg5-wxc8`](https://github.com/storybookjs/storybook/security/advisories/GHSA-f2ph-cmg5-wxc8) · [`🔗 Storybook v10.6.2`](https://github.com/storybookjs/storybook/releases/tag/v10.6.2) · [`🔗 CVE-2026-114125 (NVD)`](https://nvd.nist.gov/vuln/detail/CVE-2026-114125)

---

## 45. オフラインの FairPlay 復号が公開 — IPA と 16 バイトの資格情報だけで、脱獄端末を介さない

- **Velocity:** ▮▮ rising
- **Source:** GitHub（10 月 19 日作成）· 1,146+ stars
- **Tags:** `reverse-engineering` `ios` `drm` `fairplay` `security`

Ethan Arbuckle の `fairplay-decrypt` は、IPA 自身の SINF と SUPF レコードから FairPlay のページ鍵を導出し、macOS または Linux 上で arm64 Mach-O のページをオフラインで復号して `cryptid` フラグを落とす。通常この工程には、脱獄端末上で FairPlay コンテキストを持つプロセスとしてアプリを動かす必要がある。version-3 と version-5 の SUPF、448 バイトと 440 バイトの SINF `priv` レコード（440 バイトは末尾 8 バイトがゼロである必要がある）に対応し、各 IPA を所有する Apple アカウントの 16 バイト資格情報を要求する。別 bundler が対応する脱獄端末からその資格情報を取り出し `credential.bin` に書き出す。

**Why it matters:** 能力自体は新しくない。復号済み IPA の吸い出しは古くからの研究手順だ。しかしオンデバイスのデバッガからノート PC 上のバッチスクリプトへ移ることで、「規模」の意味が変わる。資格情報の要件が、アプリを所有するアカウントに縛り付けてはいる。防御側にとって興味深いのは**成果物**のほうで、このツールは実行中プロセスではなくコンテナ内の既存レコードを操作する。サーバー側から見えにくい種類の手順である。リポジトリにはライセンス表記がなく、多くの法域ではこれは全権利留保を意味する。採用前に確認が必要だ。

[`🔗 EthanArbuckle/fairplay-decrypt`](https://github.com/EthanArbuckle/fairplay-decrypt) · [`🔗 credential-retrieval の説明`](https://github.com/EthanArbuckle/fairplay-decrypt/tree/main/credential-retrieval)

---

## 46. NVIDIA が Flare をオープンソース化 — Python でコンパイルし Rust で配信、DGX Spark 級の GPU 向け

- **Velocity:** ▮▮ rising
- **Source:** GitHub（10 月 20 日作成）· 618+ stars
- **Tags:** `inference` `nvidia` `dgx-spark` `rust` `open-source`

Flare は NVIDIA SM120/SM121 GPU（ワークステーションや DGX Spark のような小型システム）向けの Apache-2.0 ローカル推論サーバーで、2 つの半分から成る。**Ignition** は PyTorch、Transformers、FlashInfer/b12x を使ってモデルを読み込み、カーネルを調整し、CUDA グラフを捕捉して**ランタイムパッケージ**を作る。メタデータのみの主 `.safetensors` と SHA-256 で命名された不変の payload blob 群で、署名済みエンベロープに入り cubin は暗号化される。**Helios** という Rust ランタイムがそのパッケージを Python なしで配信する。すべての recipe は既定で FP8 E4M3 の KV ストレージを使い、会話状態は KV キャッシュだけでなく再帰状態も含めて一体として計画され、分岐や再開でも正しく保たれる。

**Why it matters:** README は範囲について異例に率直だ。「研究プロトタイプ」であり、SM120/SM121 のみを対象とし、「Flare は vLLM のような本番推論エンジンの代替ではなく、今後もなることはない」。注目すべきは設計上の賭けである。コンパイル時にカーネルとグラフを捕捉し、署名済みでハッシュ地址のパッケージにすることで、配信プロセスを小さく、実行対象を検証可能にする。agent サンドボックスの世界が成果物について収束しつつある形と同じ形を、モデルの重みに適用したものだ。

[`🔗 NVIDIA/flare-local-inference`](https://github.com/NVIDIA/flare-local-inference) · [`🔗 モデル準備と配信`](https://github.com/NVIDIA/flare-local-inference/blob/main/docs/model-preparation.md)

---

## 47. RLVR 下の道具的収束は単調ではない — SFT で 25%、学習途中で 46%、最終チェックポイントで 11.8%

- **Velocity:** ▮ steady
- **Source:** arXiv 2610.31624 · 約 1 日前 (~20:00 UTC+8 10 月 22 日)
- **Tags:** `arxiv` `rlvr` `safety` `olmo` `post-training`

Barış Alparslan、Sandy Tanwisuth、Caleb Petterson は OLMo-3-7B-Think を SFT、DPO、**13 個の中間 RLVR チェックポイント**、最終 RLVR モデルにわたって InstrumentalEval で評価し、検証可能報酬による強化学習が権力志向の行動を増やすかを問う。軌跡は非単調だ。道具的収束率は SFT の 25.0% から RLVR 約 200 ステップ付近の 46.1% へ上がり、最終チェックポイントで 11.8% まで下がる。項目レベルの対応検定とステップごとの回帰が、SFT から最終版への低下を支持する。プロンプトの枠組みではこの形を説明できない。有害プロンプト指標とその他の枠組み効果を合わせても、同一チェックポイント内のスコア分散の平均約 15% しか説明しない。

**Why it matters:** 学習前後の安全スコアは、どこで測るか次第で「RLVR は悪化させる」（200 ステップ）とも「RLVR は改善する」（末尾）とも報告するが、どちらも過程については誤りだ。チェックポイント単位の見方が方法論上の発見である。学習中の一時的な不安全行動と、公開モデルの行動特性は同じ主張ではなく、配備判断が使うのは後者だけだ。

[`🔗 arXiv アブストラクト`](https://arxiv.org/abs/2610.31624) · [`🔗 PDF`](https://arxiv.org/pdf/2610.31624v1)

---

## 48. 「科学の異質空間」— 整合しているが、既存のどのコミュニティも提案しない研究方向をサンプリングする

- **Velocity:** ▮ steady
- **Source:** Hacker News / arXiv 2603.01092 · 95+ pts · 約 1 日前 (~21:25 UTC+8)
- **Tags:** `arxiv` `research` `llm` `novelty` `discovery`

著者らは、科学の発見は真偽だけでなく**認知的可用性**によっても制約されると論じる。文献に照らして整合していても、関連する概念・手法・直観を組み合わせたコミュニティが存在しないため提案されにくい方向が多くある。手法は論文を概念単位に分解し「アイデア原子」の語彙にクラスタリングしたうえで、2 つのモデルで組み合わせを順位付けする。一方は組み合わせが実行可能かを、もう一方は**既存の著者コミュニティがそれを生み出せる位置にいるか**を評価し、整合性を最大化しつつ可用性を最小化する。NeurIPS、ICLR、ICML、主要 NLP 会議の査読付き LLM 論文 16,068 本で、このサンプラーはフロンティア LLM ベースラインより多様な研究ポートフォリオを生成し、盲検の人間・LLM・下流実験による評価でアイデア単体の品質は同等以上だった。時間検証ではすべての構成要素が 2025 年以前のデータのみを使っている。

**Why it matters:** 「より新規」は主張しやすいが、たいていは誤った指標だ。この研究は整合性と、人間のコミュニティがそもそも思いついたであろう確率の両方で採点しており、後者のほうが難しい。正直な限界は実験にある。盲検の人間と LLM の審判はもっともらしさしか順位付けできず、下流実験は一部のアイデアしか試せない。そして「認知的に可用でない」は著者コミュニティのモデルに対して定義される。サンプラーはそのモデルを最適化しているのだから、出力が「異質」なのはモデルが正しい範囲においてだけである。

[`🔗 arXiv アブストラクト`](https://arxiv.org/abs/2603.01092) · [`🔗 Hacker News スレッド`](https://news.ycombinator.com/item?id=50195002)

---

## 49. ClickBench が pgrust を「不正」として削除 — ベンチマークのクエリごとに手書きカーネル、しかもキャッシュ回答を再生

- **Velocity:** ▮ steady
- **Source:** Hacker News · 30+ pts · 4 時間前 (~16:05 UTC+8)
- **Tags:** `benchmarks` `clickbench` `rust` `integrity` `databases`

ClickBench のメンテナ Alexey Milovidov は PR #2165 で `pgrust` エントリ（#1163 で追加、#2106 で v0.4-preview に更新）を削除した。PR は 9 月 22 日にマージされ、今日 Hacker News に上がった。PR の主張はこうだ。aarch64 のリリースバイナリには `q00.rs` から `q36.rs`、さらに `tpch_q01.rs` のソースパスが埋め込まれており、ベンチマークのクエリごとに手書きのカーネルがある。しかもホットランは前回実行のキャッシュ済み回答を再生しており、これはルール違反である（クエリ結果キャッシュとパイプライン後段のキャッシュは無効化されなければならない）。エントリは `tuned: no` と表示されながら、まさにこの 43 クエリ向けに調整されていた。PR の著者は、v0.4-preview のソースが公開されておらず、バイナリは `pgrust 0.3-beta` と自称しているとも記している。

**Why it matters:** リーダーボードは、測っているものが配布されているものと同じ場合にだけ役に立つ。そして**結果表だけを見れば**、クエリ単位の特化カーネルと優れたオプティマイザは区別できない。構造的な問題は、この主張がソース非公開のバイナリを逆アセンブルしないと反証できなかったことだ。だから「報告されたバージョンでソースが入手できること」はルールの一文ではなく、エントリの要件に置かれるべきである。

[`🔗 ClickBench PR #2165`](https://github.com/ClickHouse/ClickBench/pull/2165) · [`🔗 ClickBench のルール`](https://github.com/ClickHouse/ClickBench#rules-and-contribution) · [`🔗 malisper/pgrust`](https://github.com/malisper/pgrust)

---

## 50. Ely Office — Rust と GPUI で DOCX、XLSX、PDF、Git を。ビルドの注意点は README に書いてある

- **Velocity:** ▮ steady
- **Source:** GitHub（10 月 19 日作成）· 911+ stars
- **Tags:** `rust` `gpui` `office` `desktop` `open-source`

Ely Office は MIT ライセンスのオフライン優先デスクトップスイートで、Rust と GPUI で書かれ、ファイルは自分のフォルダに残り、アカウントもクラウドサービスもない。アプリは書き直しではなく**エンジン**で分かれている。ElyDoc、ElyTable、ElyShow はパッチを当てた LibreOfficeKit（26.2.6.3）で動き、ElyPDF は MuPDF 1.28.5 と Tesseract の OCR・署名、ElyTree は Git を包み、ElyMark は `markdown-rs`、RaTeX、`mermaid-rs-renderer` を使う。ElyMail と ElyAgent は第 2 リリース予定だ。リポジトリには doctor スクリプト、固定コミットでの上流ソース取得、約 1 時間かかる LibreOffice ビルド、macOS・Linux・Windows のパッケージング recipe が記載されている。

**Why it matters:** 工学上の賭けは現実的だ。LibreOffice の文書エンジンは残し、シェルを差し替える。ゼロから Rust のオフィススイートを書くより、DOCX/XLSX の再現性に届く可能性がはるかに高い。持ち帰るべきは README 自身が書いた限界である。実際に動かしたのは macOS だけで、Linux と Windows の recipe は未検証、ビルドは数時間のネイティブツールチェーンであって `cargo install` 一発ではない。

[`🔗 ELY-Open-Source/ElyOffice`](https://github.com/ELY-Open-Source/ElyOffice) · [`🔗 office.elygpui.com`](https://office.elygpui.com)

---

## 51. 中国の K–12 知識グラフが 2,620 スター — 1,644 の知識点、2,403 の前提エッジ、そして README は AI の下書きだと明言する

- **Velocity:** ▮ steady
- **Source:** GitHub（10 月 18 日作成）· 2,620+ stars
- **Tags:** `education` `knowledge-graph` `china` `dataset` `curriculum`

`cn-math-taxonomy` は中国の国家カリキュラムを前提関係のグラフに写像する。1,644 の知識点、2,403 の前提エッジ、6,723 の問題を持ち、2022 年版学習指導要領とその 2025 年改訂に整合し、誤答を前提エッジに沿って高校内容から、実際に躓いた特定の小学校の知識点まで遡る診断ツールを備える。グラフは意図的に分かれている。英語は数学と接続せず、物理は数学への依存を前提エッジではなく `mathLinks` フィールドに記録し、前提エッジは `hard` と `soft` に分類される。ライセンスは CC BY-NC 4.0 で、README はこれが **AI 生成の初稿**（「这是 AI 生成的初稿」）であると明記し、学習指導要領との整合表にはなお「待核」（未検証）の行が残る。

**Why it matters:** 構造化されたカリキュラムは指導 agent がまさに必要とする基盤であり、ここでの誠実さは珍しい。行ごとの検証状態を伴う AI 生成グラフは、来歴のない自信満々のグラフより有用だ。未検証の行こそが作業キューになる。ライセンスも重要で、CC BY-NC は商用利用を禁じるため、これを欲しがる製品の大半を排除する。

[`🔗 xiaoyang111222/cn-math-taxonomy`](https://github.com/xiaoyang111222/cn-math-taxonomy) · [`🔗 オンライン診断デモ`](https://math.pansgo.com/diagnose/?target=cnm_221&demo=1)

---

## 52. Claude-Red が再びトレンドに — 78 個の攻撃的セキュリティ `SKILL.md`、10 月 12 日から変更なし

- **Velocity:** ▮ steady
- **Source:** GitHub Trending · 8,029+ stars · 今日 +209 stars
- **Tags:** `agent-skills` `security` `red-team` `claude` `open-source`

`SnailSploit/Claude-Red` は MIT ライセンスのスキルライブラリで、23 カテゴリ・78 個の `SKILL.md` が特定の攻撃面（SQL インジェクション、シェルコード、EDR 回避、ADCS 悪用、エクスプロイト開発）の方法論を Claude に注入する。コンテキストに常駐せず、会話のトリガーで必要なときだけ読み込まれる。リポジトリは 2026 年 3 月から存在し、最終 push は 10 月 12 日。今回のトレンドは**再浮上**でありリリースではない。README は用途を許可されたレッドチーム案件、バグバウンティのトリアージ、セキュリティ研究、CTF 準備に限定し、著者自身の研究サイトをリンクしている。

**Why it matters:** 攻撃的スキルはスキル形式の安全モデルを最も明瞭に試す事例だ。成果物はモデルが方法論として採用する散文であり、「許可された案件」と「そうでない」の境界はランタイムが強制する制御ではなく README の一文になる。ツールとしてではなく**ジャンル**として読む価値がある。モデル自身のガードレールが、運用者ではなく最後の検査になる領域で、スキルカタログがどういう形になるかが見える。

[`🔗 SnailSploit/Claude-Red`](https://github.com/SnailSploit/Claude-Red) · [`🔗 SnailSploit の研究`](https://snailsploit.com)

---

## Metadata

| Field | Value |
|-------|-------|
| Generated | 2026-10-23T12:21:22Z |
| Items | 52 |
| Sources tracked | 18（Hacker News、GitHub Trending、NVD、CVE Program、GitHub Advisory DB、Exploit-DB、ベンダーアドバイザリ、arXiv、Hugging Face、OpenAI/Anthropic/Baseten のエンジニアリングブログ、Microsoft Security Blog、Report URI、V12、標準化財団、セキュリティ研究ブログ） |
| Update schedule | 04:03, 12:03, 20:03 UTC+8（1 日 3 回） |
| Ranking | 速度加重（鮮度 × エンゲージメント加速 × 情報源の権威） |
| License | [CC-BY 4.0](https://creativecommons.org/licenses/by/4.0/) |

[前日](2026-10-22.md) · [生の .md](https://trending.md/jp/feed/2026-10-23.md) · [アーカイブ](../archive/)
