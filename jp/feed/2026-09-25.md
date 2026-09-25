---
date: 2026-09-25
updated: 2026-09-25T12:15:00+08:00
schedule: 04:03, 12:03, 20:03 UTC+8
sources: 27
license: CC-BY-4.0
---

## 1. F-Droid 2.0：10 年で最大のアップデート、FOSS アプリストアを作り直す

- **Velocity:** ▮▮▮ trending
- **Source:** F-Droid · HN 622+ pts · 187 comments · 約9時間前 (~19:30 UTC+8)
- **Tags:** `f-droid` `android` `open-source` `release`

F-Droid が 2.0 をリリース（9月24日発表、14 回のテストリリースを経て今後数週間で展開）——クライアント10 年で最大のアップデートです。Kotlin/Jetpack Compose による全面書き直し、「発見 / 検索 / マイアプリ」の 3 エリアへのナビゲーション簡素化、カテゴリの大幅拡張、説明文と翻訳コンテンツのインデックス化による CJK 検索の大幅改善。目玉機能は、Android の新しい事前承認 API（一部は EU デジタル市場法の圧力によって実現）の上に構築された統合インストーラーで、ダウンロード完了前にインストールを承認でき、バックグラウンド自動更新チェックがデフォルトに。発表は後退項目にも率直です。Android 6 サポート終了、Privileged Extension 無視、パニック起動のアプリ消去（Ripple）の一時欠落、計算機偽装の簡素化、Nearby 共有は初回リリースに未搭載。開発は NLnet の Mobifree ファンドと OTF が資金支援。OTF Security Lab によるセキュリティ監査は完了し、報告書は公開待ちです。

**なぜ重要か:** EU のアプリストア議論は商業ストア視点で語られがちです——今回は DMA がボランティア運営の FOSS ストアの状況も静かに改善したことを示すと同時に、書き直しがアクセシビリティ機能で支払った代価を更新履歴が正直に示しています。

[`🔗 F-Droid 発表`](https://f-droid.org/2026/09/24/f-droid-2.0-a-new-chapter-for-android-freedom.html) · [`🔗 HN 議論`](https://news.ycombinator.com/item?id=49831968)

---

## 2. 英国の「二層暗号化」：政府が締め出した iCloud ユーザー

- **Velocity:** ▮▮▮ trending
- **Source:** MacAnorak · HN 320+ pts · 328 comments · 約11時間前 (~17:30 UTC+8)
- **Tags:** `encryption` `privacy` `uk` `policy`

2025 年 1 月に英国が Apple に出した Technical Capability Notice の顛末を詳解した記事です。Apple がバックドア構築より英国の新規ユーザー向け ADP（Advanced Data Protection）撤去を選んだ結果、英国民は二層に分かれました。撤去前の 2025 年 2 月までに ADP を有効にしていた「アリス」は 23 カテゴリの iCloud データでエンドツーエンド暗号化を維持——ADP はユーザー自身の信頼済みデバイスでしか無効化できないよう意図的に設計され、サーバー側からは遠隔解除できないためです。新規ユーザー「ビル」は ADP を一切有効化できず、デフォルトで E2EE の 14 カテゴリに留まる標準データ保護のまま。記事は Cook の 2014 年「バックドアは存在しない」発言からサンバナーディーノ事件、縮小された英国限定通知、Apple の 2026 年 7 月の調査権限法廷（IPT）への申し立て、9月11日の Wyden・Davidson 両議員の公開要求書簡までを追います。著者の結論：正規アクセスを可能にする仕組みは必ず発見され悪用される仕組みでもあり、不公正の責任は Apple ではなく政府の決定にある、というものです。

**なぜ重要か:** 「暗号化かバックドアか」の対峙が実際に何を生むかの最も明快な実例——勝者はおらず、秘密裏に確定した恒久的な二層ユーザー体制だけが残る、ということです。

[`🔗 MacAnorak`](https://macanorak.com/two-tier-encryption-in-the-uk/) · [`🔗 HN 議論`](https://news.ycombinator.com/item?id=49828731)

---

## 3. ファームウェア更新で Samsung スマート冷蔵庫が文字通り cold dead——中の食材も一緒に

- **Velocity:** ▮▮▮ trending
- **Source:** Ars Technica · HN 250+ pts · 244 comments · 約12時間前 (~16:30 UTC+8)
- **Tags:** `iot` `firmware` `samsung` `reliability`

Samsung スマート冷蔵庫に配信された SmartThings ソフトウェア更新が、9月22日午後から本体を完全に起動しなくなる事例を連発（被害は主に韓国）——冷蔵庫は完全停止し、中の食材は腐敗しました。Samsung は「社内テスト中のエラー」と原因を説明し、韓国コミュニティフォーラムへの報告が殺到した後に配信を停止。HN の議論（244 コメント）は今週の「家電のネット接続」をめぐる総決選挙になりました。冷蔵庫は食品安全機器であり、その障害モードが今や「リモートコード配信」であること。2,000 ドル超の家電の所有者が、更新経路が単一障害点だと身をもって知ったこと。被害食材の補償や復旧の時期はまだ未発表です。

**なぜ重要か:** ローカルファーストな家電ファームウェアの、近年最も力強い論拠——冷蔵庫が低温を保つのにクラウドを必要とするなら、ベンダーのテストミスはすべて物理世界の損失イベントになります。

[`🔗 Ars Technica`](https://arstechnica.com/gadgets/2026/09/owners-mourn-spoiled-food-after-firmware-update-bricks-samsung-smart-fridges/) · [`🔗 HN 議論`](https://news.ycombinator.com/item?id=49829960)

---

## 4. GitHub が悪意ある模倣ソフトを削除——HN フロントページ到達からわずか 10 分で

- **Velocity:** ▮▮▮ trending
- **Source:** Successful Software · HN 211+ pts · 88 comments · 約7時間前 (~21:30 UTC+8)
- **Tags:** `supply-chain` `github` `malware` `trust-safety`

Andy Brice のデータ処理製品 Easy Data Transform の名前とロゴをコピーしたリポジトリが GitHub に出現。偽の Mac .dmg は VirusTotal で複数のマルウェア警告をトリガーし、攻撃者はディスクイメージの背景画像すら差し替え、「マルウェア警告は無視せよ」とダウンロード者に伝えていました。Brice は 8月31日に通報し自動返信のみ。9月10日に VirusTotal の証拠を追加提出。23 日間の沈黙の後に「This is pisspoor. Do better GitHub」と公開——投稿が HN フロントページに到達してから約 10 分でリポジトリは削除されました（「全くの偶然です、間違いなく！」）。コメント欄には 6月から未解決の類似事例の報告も。著者の教訓はユーザーに向けたものです。ベンダー公式サイトから直接ダウンロードし、プラットフォームが模倣品を能動的に取り締まるのは期待するな、と。

**なぜ重要か:** GitHub 上のブランド模倣マルウェア配信は「危害」ではなく「拡散力」でスケールするサプライチェーン経路であり——削除の SLA は「Hacker News のフロントページ」であるように見えます。

[`🔗 Successful Software`](https://successfulsoftware.net/2026/09/24/github-has-not-removed-malicious-imitation-software-after-3-weeks/) · [`🔗 HN 議論`](https://news.ycombinator.com/item?id=49832406)

---

## 5. CVE-2026-61732：自律型レッドチームエージェントにおける CVSS 10.0 のプロンプトインジェクション RCE

- **Velocity:** ▮▮▮ trending
- **Source:** NVD / GitHub advisories · CVSS 10.0 (GitHub CNA, NVD Secondary) · 9月24日公開、1.1.17 で修正
- **Tags:** `cve` `prompt-injection` `agent-security` `chatml`

BitterSecurity の Decepticon（レッドチーム向け自律攻撃エージェント）は、Web クロール結果——自らの偵察の出力——を LLM メッセージにラップする際、ChatML の特殊トークンリテラルを無害化していませんでした。BYOK（ユーザー自身のキーを任意の OpenAI 互換エンドポイントに設定）モデルでは、自己ホスト系推論サーバー（vLLM、SGLang、Ollama、LM Studio、text-generation-webui など）の大半がデフォルトでユーザー内容中の特殊トークンリテラルをフィルタしないため、それらは構造的なロール境界トークンとして解釈されます。結果、標的 Web ページに仕込まれた文字列が「オペレーター」ターンを偽装し、モデルが権威あるものとして扱う——エージェントの Kali サンドボックス内での任意コマンド実行に至ります。1.1.17 で修正済み（NVD に修正コミットと GHSA-g5f9-3xfg-p9mf を参照）。CISA 調整の SSVC 評価も記録済み：悪用「PoC」、自動化可能「はい」、技術的影響「完全」。

**なぜ重要か:** プロンプトインジェクションからシェルまでのパイプラインが正式に CVE として採番されました——この攻撃的エージェントの CVE は、Web 内容を「特殊トークンをフィルタしない自己ホストモデル」に流し込むすべてのエージェントツールへの警告でもあります。

[`🔗 NVD レコード`](https://nvd.nist.gov/vuln/detail/CVE-2026-61732) · [`🔗 GHSA-g5f9-3xfg-p9mf`](https://github.com/BitterSecurity/Decepticon/security/advisories/GHSA-g5f9-3xfg-p9mf)

---

## 6. 最新 ESP32 がついに Linux をネイティブ起動——Raspberry Pi に肉薄

- **Velocity:** ▮▮ rising
- **Source:** XDA Developers · HN 195+ pts · 95 comments · 約8時間前 (~20:30 UTC+8)
- **Tags:** `esp32` `hardware` `linux` `riscv`

ESP32-P4 世代は Linux をネイティブ起動できます——これまで限定的な模倣しかなかったファミリーでは初です。デュアルコア RISC-V コアを核に、Wi-Fi 6 + Bluetooth 5.4 はペアの ESP32-C5 コンパニオンチップが担当し、Thread/Zigbee、Ethernet、USB 2.0 OTG、32–64 MB PSRAM 構成を備えます。記事が強調するのはペリフェラル対応です。Pi 互換の CSI カメラコネクタ、microSD、そして ESP-KVM のようにすでに P4 を Pi クラス部品として使うプロジェクト。HN の公正な評価：これは SBC に隣接するようになったマイコンであり Pi の代替ではない——メモリ上限や GPU クラスのワークロードは依然 Pi の領域——ただし「ESP32 は Linux を実行できない」時代は公式に終わりました。

**なぜ重要か:** 5 ドル級 RISC-V マイコンが「Linux 起動可」の線を超えたことで、ネットワーク接続可能な Linux デバイスのコスト下限がさらに一段下がりました。

[`🔗 XDA Developers`](https://www.xda-developers.com/newest-esp32-run-linux-close-to-raspberry-pi/) · [`🔗 HN 議論`](https://news.ycombinator.com/item?id=49828969)

---

## 7. Bastardica：OpenType リガチャで動く「呪われた」混合フォントの鋳造所

- **Velocity:** ▮▮ rising
- **Source:** Show HN · 185+ pts · 32 comments · 約14時間前 (~14:30 UTC+8)
- **Tags:** `fonts` `typography` `web` `pyodide`

Times New Bastard 流の「bastard フォント」をブラウザで作るツールです。ベースフォントとミックスインフォントを選ぶと、指定グリフを差し替えたフォントを生成（定番例：「Th」以降はすべて Comic Sans）。巧妙なのは配信方式で、グリフ差し替えは全スクリプトに登録された `liga` 文脈置換として実装されており、ブラウザはデフォルトで有効化するため、テキストが整形される場面ならどこでも動作します。デザインツールも印刷も含む。すべて Pyodide（WASM 上の Python）と fontTools でローカル実行——フォントはサーバーに送られない——TTF/OTF/WOFF2 でエクスポート可能。明記された制限：リガチャを無効化するアプリでは効果が見えない、3 フォント以上では共有区間で衝突しうる（素数ステップを推奨）、ライセンス注記は誠実——混合フォントは全ソースフォントの派生物です。

**なぜ重要か:** 愉快なフォントエンジニアリングでありながら、本当の教訓は OpenType 文脈置換が過小評価されているクライアントサイド描画プリミティブだ、ということです。

[`🔗 Bastardica`](https://bastardica.mitpit.com) · [`🔗 HN 議論`](https://news.ycombinator.com/item?id=49823738)

---

## 8. Show HN：Whiteboard（YC W26）——人間とエージェントが一緒にソフトウェアを設計するオープンソース IDE

- **Velocity:** ▮▮ rising
- **Source:** Show HN · 114+ pts · 35 comments · 約4時間前 (~00:30 UTC+8)
- **Tags:** `ide` `agents` `developer-tools` `yc-w26`

Whiteboard は MIT ライセンスのデスクトップ IDE で、Code - OSS をベンダリングしたフォークとして構築（作者曰く、素の VS Code の約 45% は不要な Copilot コード）されています。Claude Code や Codex などのエージェントが SDK 経由で、記述対象のコードの隣のキャンバスにフローチャート・シーケンス図・ER 図を描けます。図の要素やエージェントトレースの引用は基礎コードへジャンプ。Rust 製の AST 認識セマンティック diff ビューアーは大きな新規関数を擬似コードとして描画しテストを折りたたむ。ディシジョンログはエージェントが自らのトレースをリンクでき、要件・実装・自律的判断が追跡可能。README は限界も正直に列挙：ファイル編集は未対応、複数リポジトリのレビューは弱い、共有後の更新は伝播しない。匿名テレメトリにコード・diff・プロンプト・モデル出力は含まれず、無効化可能です。

**なぜ重要か:** エージェント IDE のフロンティアは「エージェントがファイルを編集する」から「エージェントと人間が設計面を共有する」へ移りつつあり、これはキャンバスだけでなく diff とトレースの配管ごと届けています。

[`🔗 devdotfast/whiteboard`](https://github.com/devdotfast/whiteboard) · [`🔗 HN 議論`](https://news.ycombinator.com/item?id=49833867)

---

## 9. Fearless SIMD 1.0：8 年の歳月をかけ SIMD から `unsafe` を取り除く

- **Velocity:** ▮▮ rising
- **Source:** Linebender · HN 89+ pts · 15 comments · 約2時間前 (~02:00 UTC+8)
- **Tags:** `rust` `simd` `graphics` `release`

Linebender の `fearless_simd` が安定版 Rust で 1.0 に到達：`#[simd]` マクロによる関数マルチバージョニング付きのポータブル SIMD 抽象、ゼロオーバーヘッドでのプラットフォーム intrinsics への安全なアクセス、そして場当たり的な `unsafe` ブロックゼロ——クレート全体が 2 つの監査済みプリミティブ（target feature 1.1 を使う `kernel!` マクロ、`bytemuck`/`zerocopy` に着想を得た安全な transmute モジュール）の上に立っています。エッジケースに敏感な演算にはプラットフォーム間で一貫した「precise」とプラットフォーム最速の「fast」の両変体を提供し、標準ライブラリがカバーしないハードウェアネイティブのベクトル幅にも対応。過程で Rust と LLVM への上流最適化も貢献。30 クレートが直接、1,000 以上が間接に利用。コミットメント：3 年間のセキュリティ更新、API を壊さないまま `f16`・Arm SVE・RISC-V ベクトル拡張へ至る道筋の明示。

**なぜ重要か:** 安全な Rust における SIMD は C++ と Rust のグラフィックス/オーディオスタック間の十年のギャップでした——安定性の約束付き 1.0 こそ、エコシステムが待っていたものです。

[`🔗 Linebender ブログ`](https://linebender.org/blog/fearless-simd-1-0/) · [`🔗 HN 議論`](https://news.ycombinator.com/item?id=49800085)

---

## 10. 「シュレーディンガーのコードリポジトリ」：SWE-bench のエージェントは暗記されたリポジトリに頼っている

- **Velocity:** ▮▮ rising
- **Source:** arXiv / Hugging Face デイリーペーパー · 約70 upvotes、本日のトレンド 1 位
- **Tags:** `benchmark` `swe-bench` `memorization` `evaluation`

上海交通大学の論文（arXiv:2609.27891）が問うのは、コーディングエージェントは SWE-bench を学んだのか、それとも暗記したのか。SchrodingerRepo は各テストリポジトリを評価時にインスタンス化される潜在変数として扱い、動作を保ったまま 4 段階の変換を施します。問題文の再構築、名前空間のリマッピング、ファイル内レイアウトの並べ替え、機能保持コード書き換え——実行可能な挙動は完全に同一のまま、識別可能な手がかりを剥ぎ取る。SWE-bench Verified と SWE-QA 上でのモデル横断の結果：リポジトリの手がかりを除去すると性能が一貫して低下し、インタラクションコストが大幅に増加。コストはリポジトリ探索とローカライズに集中します。アブストラクトは定性的表現に留め——誇張した低下率の数字は主張せず——結論も慎重に「エージェントは記憶されたリポジトリ側の手がかりに部分的に依存している」としています。

**なぜ重要か:** SWE-bench への暗記批判に、ようやくクリーンな因果手法が登場——控えめな表現（誇張された単一数字なし）ゆえに、かえって反論しにくくなっています。

[`🔗 arXiv:2609.27891`](https://arxiv.org/abs/2609.27891) · [`🔗 Hugging Face デイリーペーパー`](https://huggingface.co/papers)

---

## 11. WaveDigger：Apple の非公開 Wi-Fi 位置情報サービスを照会する Web UI

- **Velocity:** ▮ steady
- **Source:** Show HN · 67+ pts · 10 comments · 約28時間前 (~00:30 UTC+8)
- **Tags:** `wifi` `geolocation` `privacy` `nextjs`

WaveDigger は、Apple の非公開 WPS エンドポイント（`gs-loc.apple.com/clls/wloc`）に protobuf エンコードしたリクエスト（中国リージョン変体を含む）を直接送り、BSSID で Wi-Fi アクセスポイントを、ネットワークパラメータで LTE/5G NR 基地局を対話地図上に特定します。apple-corelocation-experiments プロジェクトのリバースエンジニアリング成果（protobuf 定義、座標エンコーディング、リクエストに必須のバイトプレフィックス）の上に構築。TypeScript/Next.js 15 + deck.gl、AGPL-3.0——このツールが晒す能力を考えれば、AGPL のネットワークサービス条項はことのほか切実です。本当の物語はプライバシーへの示唆：Apple のクラウドソーシング位置情報データベースは事実上、誰でもプロトコルを実装すれば照会できる公開 BSSID 検索エンジンです。

**なぜ重要か:** Google の WPS がジオロケーションオラクルとして知られてきたのに対し、洗練され自己ホスト可能な Apple 版の登場は、「MAC アドレス → 物理位置」能力をあらゆる攻撃者から fork 一つにしました。

[`🔗 christianrowlands/wavedigger`](https://github.com/christianrowlands/wavedigger) · [`🔗 HN 議論`](https://news.ycombinator.com/item?id=49815370)

---

## 12. デバッガが嘘をつくとき：J-Link のメモリキャッシュ vs DMA 的ペリフェラル

- **Velocity:** ▮ steady
- **Source:** Daniel Mangum · HN 61+ pts · 17 comments · 約30時間前 (~22:30 UTC+8)
- **Tags:** `embedded` `debugging` `jlink` `hardware`

Mangum が SEGGER J-Link デバッガ経由で Nordic nRF54L15 の Key Management Unit（KMU）にキーをプロビジョニングしたところ、読み出しが古い値を返し続け——デバイス消去後ですら、最初のキー書き込みしかメモリに現れませんでした。根本原因：KMU は停止中の CPU とは独立に RAM へ書き込む（DMA 的）一方、JLinkGDBServer のメモリキャッシュ（`SetEnableMemCache`、デフォルト有効）はコアが進まないため決して無効化されないこと。AHB-AP アクセスポート経由の `ReadMemAP` リクエストはキャッシュをバイパスして新鮮なデータを返します。`monitor exec SetEnableMemCache = 0` でキャッシュを切るか、コアをシングルステップすれば解決。「なぜ稀か」の診断：キャッシュ問題はペリフェラルがコア停止中にメモリを書き換えられる構成でしか顕在化しない——そしてまさにその構成を、MCU のセキュリティ作業が作り続けている、というものです。

**なぜ重要か:** 移植可能なデバッグの教訓：CPU の背後でメモリに書き込むハードウェアは、CPU の視点でキャッシュするあらゆるデバッガを裏切ります。

[`🔗 When the Debugger Lies`](https://danielmangum.com/posts/when-the-debugger-lies/) · [`🔗 HN 議論`](https://news.ycombinator.com/item?id=49799306)

---

## 13. FxEmbed が +165 星/日で再トレンド入り：X と Bluesky のリンクプレビュー修正屋

- **Velocity:** ▮ steady
- **Source:** GitHub Trending (daily) · 5.3k★ · 本日 +165
- **Tags:** `embed` `bluesky` `twitter` `cloudflare-workers`

FxEmbed——FxTwitter、Fixupx、FxBluesky の本拠地——は、X と Bluesky の投稿が Discord・Telegram 等で壊れるリンクプレビューを修正します。実際の動画、複数画像、投票、引用ポスト、翻訳に対応し、プレフィックスドメイン（`fxtwitter.com`、`fixupx.com`、`fx` + `bsky.app`）を使うだけ。TypeScript 製で Cloudflare Worker 上に構築、Docker セルフホスト経路あり。MIT ライセンス、4,207 コミット、CI 活動中。再トレンドの波に乗っているのは X 自身の embed サポートの継続的劣化——クライアント側 embed の退化ごとに、新しいユーザーの波がプレフィックスドメインへ流れます。リポジトリは X Corp と無関係であることを明記——同社は埋め込み可能データへのサードパーティアクセスを締め付けています。

**なぜ重要か:** コミュニティインフラが、プラットフォームが放棄した仕事を静かにこなしている——しかもホストインスタンスが消えたらセルフホストするという逃げ道を自分で用意しています。

[`🔗 FxEmbed/FxEmbed`](https://github.com/FxEmbed/FxEmbed) · [`🔗 GitHub デイリートレンド`](https://github.com/trending)

---

## 14. Web ベースの IBM 1620 エミュレータ——1963 年の十進法コンピュータのソフトウェア復元

- **Velocity:** ▮ steady
- **Source:** Show HN · 42+ pts · 11 comments · 約34時間前 (~18:30 UTC+8)
- **Tags:** `emulation` `retrocomputing` `ibm` `web`

pkimpel/retro-1620 は IBM 1620 Model 2 をブラウザでエミュレートします——1960 年代のトランジスタ、**十進法**、可変フィールド長マシンで、ソフトウェアアクセス可能なレジスタを持たず、命令長は 12 桁——周辺の稼働環境（SPS アセンブラと FORTRAN II の時代、Monitor バッチシステム、カード読取/穿孔機、1443 ラインプリンター、1311 ディスク）込み。Model 2 は 10µs のメモリサイクルを持ち、乗算はメモリ内ルックアップテーブルによるハードウェア実装。両モデル合計で約 2,000 台のみ製造され、1970 年までサポートされました。MIT ライセンス、ソフトウェア復元素材は bitsavers 由来。小規模プロジェクト（17 星、170 コミット）ですが——HN 投稿が、実際に動く計算機史の保存品の運搬役になっています。

**なぜ重要か:** 十進法・可変フィールド長アーキテクチャは現代の開発者が決して触れない系譜です——ブラウザで動くエミュレータは、そこへの最も容易な窓です。

[`🔗 pkimpel/retro-1620`](https://github.com/pkimpel/retro-1620) · [`🔗 HN 議論`](https://news.ycombinator.com/item?id=49809935)

---

## 15. ほぼ SNFS 時間での 1024 ビット RSA 署名の偽造——鍵の素因数分解は一切不要

- **Velocity:** ▮ steady
- **Source:** IACR ePrint · HN 30+ pts · 2 comments · 約10時間前 (~18:30 UTC+8)
- **Tags:** `cryptography` `rsa` `hsm` `research`

Laura Shea、Miro Haller、Adam Suhl、Nadia Heninger（UC San Diego）と Emmanuel Thomé（INRIA）は、2007 年の Joux–Naccache–Thomé 攻撃を実機 HSM 上でエンドツーエンド実装しました。生の RSA 署名/復号オラクルへの一時的なアクセスさえあれば、攻撃者は鍵を一度も素因数分解せずに任意メッセージの署名を偽造できます。1024 ビットの実証には 5 か月・1,380 CPU コア年・2³² 回のオラクル照会。事前計算後は、選択した署名を 180 コア年でオフライン偽造可能。1024–4096 ビットへの外挿では、この攻撃モデル下での RSA の実効セキュリティは素因数分解ベースの標準推定より 15–30 ビット低く——4096 ビット RSA ですら 128 ビットセキュリティに届かない可能性があります。適用条件は明示され、これが命です。生オラクルアクセス（HSM API、ブラインド署名サービス）が必要で、「素因数分解のみ」の RSA シナリオには無関係。大鍵の数字は外挿です。著者の結論は移行ガイダンス：ポスト量子移行で RSA から離れる、もう一つの理由。

**なぜ重要か:** 「API 経由で偽造、鍵には触れない」という脅威モデルは、HSM 支撑の PKI が実際に RSA を晒しているまさにその方法です——そしてセキュリティマージンの削減幅は、長寿命署名に影響するほど大きい。

[`🔗 ePrint 2026/2131`](https://eprint.iacr.org/2026/2131) · [`🔗 HN 議論`](https://news.ycombinator.com/item?id=49831098)

---

## 16. Project Suncatcher の初の TPU 衛星がまもなく軌道へ——Google の「宇宙機械学習」ムーンショットに打ち上げ日が付く

- **Velocity:** ▮▮▮ trending
- **Source:** Google Research ブログ · HN 139+ pts · 254 comments · 約14時間前 (~21:53 UTC+8)
- **Tags:** `google` `space` `ml-infrastructure` `tpu`

Google の Project Suncatcher——スケーラブルな ML 計算資源を低軌道に置けるかを探るムーンショット（衛星は「地上の最大 8 倍」の太陽光を捕えられる）——が、初のハードウェア検証まであと数日に迫りました。SpaceX の次期 Transporter-18 ライドシェアに原型衛星を搭載し、Planet と共同開発します。技術記事はテスト内容に異例なまで具体的です。持続約 10 g の打ち上げ荷重（チップ局部は 50–100 g）を 3 軸振動試験で生存。UC Davis の Crocker 核実験室でワークロードを動かしながら陽子を照射された Trillium TPU は、5 年ミッション相当の全線量（TID）を超えて持ちこたえました。一方、ヒートパイプとラジエーターによる真空冷却は、まだ熱真空チャンバー内での検証にとどまります。2027 年のマイルストーンは 2 基の衛星による高帯域・短距離レーザーリンクの試験。チーム自身の注意書きは率直です。「一部のことは宇宙でしか試せない」、この打ち上げは実証ではなく探索である、そして今日のレーザーシステムは正反対の領域（低帯域・長距離）向けに作られている、と。

**なぜ重要か:** この記事は「TPU を載せた衛星」と「軌道上のデータセンター」の間の実際のギャップを値付けします。放射線と打ち上げは予想外に生存可能で、未証明の耐荷重部は冷却とレーザー相互接続だ、と。

[`🔗 Google Research ブログ`](https://blog.google/innovation-and-ai/models-and-research/google-research/google-project-suncatcher-facts/) · [`🔗 HN 議論`](https://news.ycombinator.com/item?id=49830606)

---

## 17. SourceHut アカウント乗っ取り：CI ビルドログ内の ANSI エスケープシーケンスが 4.5 年間、ライブ XSS として描画されていた

- **Velocity:** ▮▮▮ trending
- **Source:** Arusekk · HN 90+ pts · 13 comments · 約8時間前 (~03:54 UTC+8)
- **Tags:** `security` `xss` `ci` `ansi2html`

Arusekk の記事は、builds.sr.ht が CI ログ描画に使う `ansi2html` の脆弱性（CVE-2026-92973）を追跡します。このライブラリは ANSI OSC 8 ハイパーリンクシーケンスを `<a>` タグへ変換する際、属性からの脱出を正しく処理せず、`javascript:` URL も遮断していませんでした。攻撃者は `onfocus=` ハンドラを仕込め、ジョブページを閲覧した人のセッション内で実行されます。注入にアカウントは不要——CI を有効化した公開メーリングリストへのパッチ投稿や、ログに印字される任意のリモートリソースで十分でした。ページには被害者の CSRF トークンが載り、builds.sr.ht は sr.ht 本体のデプロイキーも保持するため、著者はこれをアカウント乗っ取りかつワーム可能と評定。欠陥は約 4.5 年間放置され、builds.sr.ht は 8月4日に自動サニタイズの暫定対応、本修正は 9月2日の ansi2html 1.9.4 で提供されました。示唆的な後日談：著者は「単なる中程度ではなく高または重大」と主張する CVSS 4.0 ベクトルを提案したのに、VulnCheck がそれを勝手に改変したことに公然と苛立ちを示しています。

**なぜ重要か:** 描画レイヤーを通じて届く信頼できないテキストは、最も古い形の XSS です。そして CI ログは、ほぼすべてのフォージにおいて攻撃者が書き込める入力です。

[`🔗 blog.arusekk.pl`](https://blog.arusekk.pl/posts/srht-account-takeover/) · [`🔗 HN 議論`](https://news.ycombinator.com/item?id=49835996)

---

## 18. browser-use が「jev-ultrafast」をリリース：すべての観測をインデックス化されたアクション空間にする Web エージェント——9 日で 19.9k★

- **Velocity:** ▮▮▮ trending
- **Source:** GitHub · browser-use/jev-ultrafast · 19.9k★ · 9月16日作成、本日プッシュ
- **Tags:** `agents` `browser-automation` `jev` `system-1`

browser-use の新リポジトリは、TypeSafe の Jev 決定モデルを組み替えたエージェントループと組み合わせます。各ページ観測は番号付き要素テーブルになり、Jev への 1 リクエストが操作（CLICK / TYPE_TEXT / SELECT / SCROLL / WAIT / DONE / BLOCKED）とターゲットの両方を選択——ターゲットヘッドには互換要素のみが含まれるため、2 つの決定が 1 回のネットワークラウンドトリップで済みます。テキストは `TYPE_TEXT` が選ばれたときだけ小さな補助モデルが生成（録画デモでは推論無効の `inception/mercury-2.5` を使用）。リポジトリ自身の測定は異例なほど誠実です。看板の Google Flights デモは 7.073 秒で検証済み、6 ラン対照比較の中央値は 9.45 秒 → 7.09 秒（25% 低減、ブラウザプロトコル呼び出し 1,092 → 101）——ただし README 自ら「3 ペアでは強い統計的主張には足りない（両側符号検定 p = 0.25）」、これは「広範なエージェントベンチマークではなく小規模な制御入力比較」だと明記しています。MIT ライセンス、Browser Use Cloud のウェイトリスト付き。

**なぜ重要か:** System-1 決定モデルのパターン（ラウンドトリップごとに 1 回のスコア付き選択、必要なときだけテキスト生成）が、本物のエージェントランタイムアーキテクチャになりつつあります——そしてこのリポジトリは、見出しの数字の隣に自らの弱い統計を並べて publish しています。速度以上に珍しいのはこちらです。

[`🔗 browser-use/jev-ultrafast`](https://github.com/browser-use/jev-ultrafast) · [`🔗 パフォーマンス測定`](https://github.com/browser-use/jev-ultrafast/blob/main/docs/performance.md)

---

## 19. GitLab の荒れた夜：GitLab.com が約 2.5 時間の障害——同じ日に CVSS 9.9 の RCE を 2 件修正するパッチリリース

- **Velocity:** ▮▮ rising
- **Source:** status.gitlab.com · HN 58+ pts · 28 comments · 約5時間前 (~07:10 UTC+8)
- **Tags:** `gitlab` `outage` `security-release` `cve`

GitLab.com は 9月24日 23:02 UTC から 503 エラーを大規模に返し始め、Web サイト、API、Git 操作、両レジストリ、Pages、CI/CD ランナー、SAML SSO に波及。25 分後に原因を特定し、9月25日 03:36 UTC までに全 23 コンポーネントが復旧——約 2.5 時間の障害で、現在は監視中です。同じ日、GitLab のパッチリリース（19.2.7 / 19.3.3 / 19.4.1）は、CI/CD 設定パースにおける CVSS 9.9 の認証済みリモートコード実行を 2 件修正しました。特別細工された正規表現で発生する double free（CVE-2026-89078）と整数オーバーフロー（CVE-2026-93577）。両方とも HackerOne 経由で、GitLab が CNA としてスコアリング。メカニズムは無関係ですが——今夜パッチを当てているセルフホスト管理者と、503 を見つめていた SaaS ユーザーは、自分のフォージについての同じメッセージを受け取りました。

**なぜ重要か:** 認証済みユーザーなら誰でも CI 設定経由で到達できる CVSS 9.9 が 2 件は、すべてのセルフホスト GitLab にとって「今すぐアップグレード」の領域です。障害のおかげで、このリリースが確実に読まれることになりました。

[`🔗 NVD：CVE-2026-89078`](https://nvd.nist.gov/vuln/detail/CVE-2026-89078) · [`🔗 NVD：CVE-2026-93577`](https://nvd.nist.gov/vuln/detail/CVE-2026-93577) · [`🔗 GitLab ステータス`](https://status.gitlab.com/)

---

## 20. 日本の古書店で売上が 5 倍——背景には「トン単位」で買い上げ、海外の AI スキャン&シュレッダー施設に回される本

- **Velocity:** ▮▮ rising
- **Source:** Tom's Hardware · HN 77+ pts · 122 comments · 約13時間前 (~22:51 UTC+8)
- **Tags:** `ai-training-data` `publishing` `copyright` `japan`

Tom's Hardware が報じたのは、学習データ争奪戦の驚くべき副作用です。日本の古書店で売上が平時の約 5 倍に増加。買っているのは読者ではなく、正体不明の「トン単位」の大量購入者——その中には米国へ送られた 50 トンの一注文もあり、書物を AI 学習用にスキャンした後に破棄する施設へ回されたと疑われています。AI 向けという点は疑いであり確認されたわけではなく、報道も購入者を匿名と描述。記録されているのは購入の規模とパターン、そして印刷物がデータセットの原料として物理的に消費されることへの日本国内の文化的懸念です。HN の議論は即座に、「AI for research」論者が繰り返し指摘するアーカイブアクセスのボトルネックと結びつけました。学習に最も価値のある写本こそ、誰もデジタル化していないもの——そしてこのパイプラインは「デジタル化と破棄」を一工程で行う、と。

**なぜ重要か:** 物理的な書物が「スクレイピング」対象になりつつあります——しかもその「スクレイパー」はシュレッダーです。データ収集の物語であると同時に、文化財保存の物語でもあります。

[`🔗 Tom's Hardware`](https://www.tomshardware.com/tech-industry/artificial-intelligence/japanese-used-bookstores-see-5x-sales-surge-as-books-are-being-bought-by-the-ton-one-50-ton-order-sent-to-the-us-for-ai-scanning-and-destruction-multitude-of-suspicious-bulk-buys-thought-to-end-up-in-foreign-ai-scan-and-shred-facilities) · [`🔗 HN 議論`](https://news.ycombinator.com/item?id=49831456)

---

## 21. 「AI ラボは歴史研究に資金を注ぐべき」：歴史学者がフロンティアモデルを 17 世紀のアーカイブに走らせ、どこで壊れるかも書き留めた

- **Velocity:** ▮▮ rising
- **Source:** Res Obscura（Benjamin Breen）· HN 97+ pts · 14 comments · 約9時間前 (~03:14 UTC+8)
- **Tags:** `llm` `digital-humanities` `research` `history`

歴史学者 Benjamin Breen のエッセイは、フロンティアモデルがアーカイブ研究で閾値を超えたと主張し、実証を添えます。Opus エージェントは Samuel Hartlib のデジタル化アーカイブから 5,000 以上のファイルをダウンロードし、Google Books を検索するサブエージェントを生やした。GPT-6 Astra は John Dee の『Liber Loagaeth』が暗号ではなく大部分が無意味な音節だと結論——文字頻度分析で Edward Kelley が時とともに手を抜くようになったことを示し、Dee の日記とクロスチェックしました。さらに、Newton と Hartlib が同じ物質（ハンガリー・ヴィトリオール）に**異なる**アナグラムを使い、数量も一致していたという、おそらく新しい発見も。一方で Breen は採点を誠実に保ちます。Opus が部分的に解読した Charles V の暗号文はすでに解読済み（1 通は 1530 年代に、1 通は 1916 年に）——モデルは「机調査」を飛ばした。Newton の発見は「新しいように見える」だけ。そして本当のボトルネックは、近世初期の写本の大半が未デジタル化であること。彼の提案は 3 つ。アーカイブをデジタル化して開放する、歴史学者に無償コンピュートを与える、歴史学者が解ける「ミレニアム問題」をノミネートする、です。

**なぜ重要か:** LLM エージェントがどこでアーカイブ研究に本当に価値を追加し、どこで既解決の問題につまずくか——ベンダーのデモが決して語らない後者まで含めた、現場研究者の抑制された記録です。

[`🔗 Res Obscura`](https://resobscura.substack.com/p/ai-labs-need-to-start-funding-historical) · [`🔗 HN 議論`](https://news.ycombinator.com/item?id=49835531)

---

## 22. 「Dynamic Abliteration」：重みを凍結したまま推論時の拒否抑制——自分が何であるかを認めている PoC

- **Velocity:** ▮▮ rising
- **Source:** Madhukar Anand（Solvy Tech ブログ）· HN 105+ pts · 40 comments · 約13時間前 (~22:33 UTC+8)
- **Tags:** `alignment` `llm` `steering` `open-weights`

恒久的な重み変更を行う従来の abliteration の代わりに、この記事は推論時に拒否挙動へ介入します。PyTorch の forward hook が Qwen3-4B の 12–20 層で残差ストリームを遮り、`ゲート × 射影(n-gram メモリ)` を注入する——Engram に着想を得たモジュール（動的 sigmoid ゲート、O(1) の 4 テーブル n-gram ハッシュ、学習された層ごとの射影）は、拒否トリガーが現れたときだけ発火します。学習は PKU-SafeRLHF の 2,000 サンプルで A100 1 枚・8.92 分、ベース重みは凍結したまま。記事は動機となった失敗にも率直です。alpha 1.2 の単一層 steering でも拒否が再生成される——下流の層が挙動を再構成するためです。評価されていないのは：悪用に関する何らかの評価——著者は steered モデルが有害な要求に従うことを明言し、全体を 1 モデル上の概念実証と位置づけ、コードが AI 生成であることも注記しています。

**なぜ重要か:** 重み凍結のランタイム steering は、しばしば「破壊行為」として語られる技術のデプロイ可能版です——そして統計的・安全上の限界への率直さが、この記事を使える参照点にしています。

[`🔗 Solvy Tech ブログ`](https://blog.madhukaraphatak.in/non-destructive-refusal-supression-using-engram) · [`🔗 HN 議論`](https://news.ycombinator.com/item?id=49831201)

---

## 23. ワルシャワ近郊の Starlink 地上局で火災——重要インフラを狙った放火の疑いとして扱われる

- **Velocity:** ▮▮ rising
- **Source:** Notes from Poland · HN 167+ pts · 172 comments · 約18時間前 (~17:52 UTC+8)
- **Tags:** `starlink` `infrastructure` `sabotage` `poland`

水曜日の午後 9 時頃、ワルシャワ南方の Wola Krobowska にある地上局で火災が発生。同施設はポーランド国営通信 Exatel が所有し、デジタル大臣 Krzysztof Gawkowski によれば「ポーランド国内の通信、そしてウクライナへの伝送」を担い、リトアニアの局とともに中東欧地域をサービスしています。警察と国内保安庁（ABW）は故意の放火の疑いで出動。Gawkowski は「重要通信インフラに打撃を与える意図の放火攻撃」で「犯行手法は明らかにロシア的」と述べた一方、他の当局者は慎重です。保安報道官 Jacek Dobrzyński は「原因や動機を語るにはまだ早すぎる」と。帰属の控えめさがこの記事の誠実な部分ですが、戦略的事実は曖昧ではありません。戦場にある Starlink の地上インフラが物理的に攻撃されており、ウクライナの接続はポーランドの建物を経由している、ということです。

**なぜ重要か:** 衛星インターネットの地上局への依存は、「宇宙インフラ」をありふれた、燃える、政治的に読める不動産へと変え続けています。

[`🔗 Notes from Poland`](https://notesfrompoland.com/2026/09/24/starlink-ground-station-in-poland-hit-by-fire-in-suspected-arson-attack/) · [`🔗 HN 議論`](https://news.ycombinator.com/item?id=49828409)

---

## 24. mammoth.js：.docx スタイルのプロトタイプ汚染がローカルファイル漏洩に連鎖——1.12.2 で修正

- **Velocity:** ▮ rising
- **Source:** NVD · CVE-2026-97151 · CVSS 8.4 (CVSS 4.0, MITRE CNA) · 9月24日公開
- **Tags:** `cve` `prototype-pollution` `nodejs` `docx`

広く使われる docx→HTML コンバーター mammoth は、細工されたドキュメントのスタイル定義を読む際、`Object.prototype` への任意プロパティ追加を許しました。より鋭いのは連鎖の方です。1.11.0〜1.12.1 では、同一プロセス内で複数ドキュメントを変換し変換後 HTML を返すアプリケーションが、`externalFileAccess: true` への汚染を経由して、サーバーのローカルファイルの内容をドキュメント提供者へ漏洩しえました。1.12.2 で修正（NVD に 2 つのコミットを参照）。影響を受けるパターン——ユーザーアップロード文書をサーバーが HTML に変換して送り返す——はウェブ上で最も一般的な文書処理形態の一つであり、プロトタイプ汚染はまさにテンプレートレイヤーより下で発生するため、フレームワークレベルのサニタイズをすり抜ける種類のバグです。

**なぜ重要か:** 「docx を変換しておいて」はあらゆる文書パイプラインの耐荷重インフラです。今月 2 度目のリマインダー：変換ステップはユーティリティではなく攻撃面です。

[`🔗 NVD レコード`](https://nvd.nist.gov/vuln/detail/CVE-2026-97151) · [`🔗 mwilliamson/mammoth.js`](https://github.com/mwilliamson/mammoth.js)

---

## 25. SigNoz：空のデフォルト JWT シークレットで誰でも管理者セッションを偽造可能——取り消せない 30 日のリフレッシュトークン込み

- **Velocity:** ▮ rising
- **Source:** NVD / VulnCheck · CVE-2026-97055 · CVSS 9.2 (CVSS 4.0, VulnCheck) / 8.1 (v3.1) · 9月24日公開、v0.143.0 で修正
- **Tags:** `cve` `signoz` `jwt` `observability`

オープンソースのオブザーバビリティプラットフォーム SigNoz は、JWT トークナイザーの署名シークレット（`SIGNOZ_TOKENIZER_JWT_SECRET`）がデフォルトで空文字列のまま出荷され、`Config.Validate()` は空値を拒否しないため、未設定のデプロイは空の HMAC キーでセッショントークンへ署名・検証していました。JWT プロバイダーがデフォルトだったため、そのようなデプロイはすべて露出していました。既存ユーザーの ID（組織 ID とともに `/api/v2/sessions/context` から認証なしで取得可能）を知っている認証なしの攻撃者が、そのユーザー——管理者を含む——の有効なトークンを偽造できます。`/api/v2/sessions/rotate` で交換される偽造リフレッシュトークンは取り消し不能で、デフォルトで 30 日間有効です。v0.143.0 は jwt プロバイダー選択時にシークレットを必須とし、デフォルトを opaque トークンへ切り替えました。オブザーバビリティプラットフォームは、この種のバグにとって最悪の宿主です。スタックが出力するすべてのログ、トレース、メトリクスを保持しているのですから。

**なぜ重要か:** 「空のデフォルト認証情報」バグはセルフホスト可能なインフラに落ち続けています——そして 30 日間取り消し不能なセッションに換わる偽造プリミティブは、オブザーバビリティツールを永続化されたアクセスへ変えます。

[`🔗 NVD レコード`](https://nvd.nist.gov/vuln/detail/CVE-2026-97055) · [`🔗 修正コミット`](https://github.com/SigNoz/signoz/commit/67895d366d)

---

## 26. m3e-canvas：ブラウザで Material 3 Expressive 画面をスケッチし、プロンプトとしてコーディングエージェントへ——8.2k★、Trendshift 当日 1 位

- **Velocity:** ▮ rising
- **Source:** GitHub Trending · lnkiai/m3e-canvas · 8.2k★ · Trendshift 当日 1 位
- **Tags:** `material-design` `design-tools` `generative-ui` `vibe-coding`

m3e-canvas は、Material 3 Expressive の UI 画面を完全にブラウザ内で作れるドラッグ＆ドロップエディタです（Next.js 静的エクスポート、React 19、すべて localStorage に保存、バックエンドなし）。タップ/スワイプ遷移付きの複数画面フロー、M3E の 4 軸（カラー、シェイプ、タイポグラフィ、モーション）にわたるテーマ設定、マグネット接続を備えます。効いている設計判断：コードは意図的に生成しません。日本語・英語・中国語・韓国語の自然言語プロンプト（Android または Web 向け）を出力し、それを Claude Code、Codex、Gemini CLI、Cursor に貼り付けます。オプションの AI アシスタントは自分の API キーを使い、プロバイダーと直接通信。明記された制限：モバイル編集は単一画面・ボタンのみ、共有リンクと AI 下書きはベータ版です。

**なぜ重要か:** デザインからエージェントへのハンドオフは、コードではなくプロンプトに落ち着きつつあります。キャンバスは意図を、コーディングエージェントは実装を担う、という分担です。

[`🔗 lnkiai/m3e-canvas`](https://github.com/lnkiai/m3e-canvas) · [`🔗 ライブデモ`](https://lnkiai.github.io/m3e-canvas/)

---

## 27. Compositor：無料オープンソースの「Mac 向け Photoshop 代替」が 3 日で 3 リリース

- **Velocity:** ▮ rising
- **Source:** GitHub · robbietilton/Compositor · 5.4k★ · 9月23–24日に v1.2.9–v1.2.11 をリリース
- **Tags:** `macos` `image-editing` `open-source` `native-apps`

Compositor はネイティブ macOS の画像エディタ（MIT、macOS 26.5+ 必須）で、合成と後処理のために作られています。GPU 描画のレイヤーエフェクトを持つレイヤーシステム、クリッピングマスク、調整レイヤー、Photoshop の全ブレンドモード、非破壊トランスフォーム、レタッチツール（スポット修復、コピースタンプ、コンテンツ対応塗りつぶし）、Camera Raw フィルター、Photoshop 風のリマップ可能なショートカット付き PSD/PSB インポート。作者の動機は明言済み：Photoshop の価格と、合成ワークフローを乱す GIMP。リリースのペース——3 日で署名・公証済み DMG の 3 リリース——は機能リストと同じくらい重要です。README はインポート忠実度に正直です。PSD/PSB は 8 ビット RGB のみ（CMYK は明示的に非対応）、ベクターと縦書きテキストはインポート時にピクセル化し、フォルダ・マスク・ブレンドモード・シンプルな横書きテキストだけが編集可能のまま残ります。

**なぜ重要か:** 説得力のあるネイティブの Photoshop 型エディタは、オープンソースクリエイティブスタックの最後の大穴です。PSD 往復のこれらの制限こそが、現役のプロを転換させるかどうかを決めます。

[`🔗 robbietilton/Compositor`](https://github.com/robbietilton/Compositor) · [`🔗 リリース`](https://github.com/robbietilton/Compositor/releases)

---

## 28. Search：ツールバーなし、アカウントなし、テレメトリーなし——約 3 MB の macOS WebKit ブラウザ

- **Velocity:** ▮ steady
- **Source:** Show HN · 62+ pts · 24 comments · 約19時間前 (~17:11 UTC+8)
- **Tags:** `browser` `macos` `webkit` `minimalism`

Office Commun の Search（MIT、約 12,700 行の Swift、サードパーティ依存ゼロ）は、macOS のシステム WebKit に載った意図的に最小主義なブラウザです。アドレス/検索フィールド 1 つとタブ、それだけ——ツールバー、スタートページ、サイドバー、アカウント、同期は一切なし。エンジニアリングはコンセプト以上に中身があります。リクエスト発火前に動く `WKContentRuleList` によるネットワークレベル広告ブロック、遅延タブ復元（クリックされるまで再開タブはコストゼロ）、サイトごとの永続的要素非表示、独立した Cookie ジャーを持つプライベートタブ、そして WebKit 純正拡張エンジンと API シムによる Chrome 拡張サポート。パスワードは macOS キーチェーンに置かれ、Chrome・Arc・Brave・Edge からのワンクリックインポートに対応。ページ読み込み以外の外部通信は 1 日 1 回の更新チェックのみです。

**なぜ重要か:** ブラウザがエージェントやワークスペース、AI サイドバーを積み上げるなか、2010 年代のコア機能セットをネイティブでこなす 3 MB のブラウザは、「モダンブラウザのどれだけが実はオプションなのか」についての有効な声明です。

[`🔗 driceroland/Search`](https://github.com/driceroland/Search) · [`🔗 HN 議論`](https://news.ycombinator.com/item?id=49828120)

---

## 29. Best LLM for every budget：毎日更新される価格/知能フロンティアチャート——自分の限界にも正直

- **Velocity:** ▮ steady
- **Source:** Show HN · 167+ pts · 105 comments · 約14時間前 (~22:09 UTC+8)
- **Tags:** `llm` `benchmarks` `pricing` `data-visualization`

terryds/bestvaluemodel は、Artificial Analysis の Intelligence Index の全モデルをブレンド API 価格（3:1 の入出力比、100 万トークンあたり）に対して対数スケールでプロットし、GitHub Actions の cron で毎日更新、「何が変わったか」の差分をスナップショット間で表示します。中核は「バリューフロンティア」：「より安くてより賢い」ものが存在しないモデル——すべての安価なモデルより高スコアのモデルを残す計算方式で、モデルごとに 1 行（ベスト effort バリアントのみ）、低スコアフィルターで超安価な低知能モデルがラインを引っ張らないよう配置。手法ページは自らの限界を明記します。キャッシュ入力割引、バッチ価格、高速モードは除外。Index はバージョン間でベースが張り直されるため、スコアは同一スナップショット内でしか比較できません。

**なぜ重要か:** 多くの LLM リーダーボードは「何が最強か」を最適化します。これは人々が実際に予算を組む問いに答え、ランキングの雰囲気ではなくフロンティアの計算過程を見せます。

[`🔗 bestmodelforyourbudget`](https://bestmodelforyourbudget.terrydjony.com/) · [`🔗 terryds/bestvaluemodel`](https://github.com/terryds/bestvaluemodel)

---

## Metadata

| フィールド | 値 |
|-------|-------|
| Generated | 2026-09-25T12:15:00+08:00 |
| Items | 29 |
| Sources tracked | 27 (Hacker News, GitHub Trending, GitHub repos/advisories, F-Droid, MacAnorak, Ars Technica, Successful Software, NVD, XDA Developers, Bastardica, Linebender, arXiv, Hugging Face, IACR ePrint, danielmangum.com, Google Research, blog.arusekk.pl, status.gitlab.com, Tom's Hardware, Res Obscura, Solvy Tech blog, Notes from Poland, bestmodelforyourbudget.terrydjony.com) |
| Update schedule | 04:03, 12:03, 20:03 UTC+8 (1日3回) |
| Ranking | Velocity-weighted (recency × engagement acceleration × source authority) |
| License | [CC-BY 4.0](https://creativecommons.org/licenses/by/4.0/) |

[前日](../archive/2026-09-24.md) · [Raw .md](./2026-09-25.md) · [アーカイブ](../archive/index.md)
