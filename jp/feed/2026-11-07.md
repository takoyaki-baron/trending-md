---
date: 2026-11-07
updated: 2026-11-07T12:33:39Z
schedule: 04:03, 12:03, 20:03 UTC+8
sources: 24
license: CC-BY-4.0
---

# トレンド — 2026-11-07

## 1. Cloudflare の security-audit-skill が再び急上昇 —— 監査手順書フォルダに 1 日で 2,088 スター

- **Velocity:** ▮▮▮ trending
- **ソース:** GitHub Trending · 本日 +2,088★ · 累計 64,781
- **タグ:** `security` `agents` `skills` `vulnerability-discovery`

Cloudflare の MIT ライセンスのスキルは、コーディングエージェントを構造化されたセキュリティ監査者に変えるもので、本日約 2,088 の新しいスターを獲得して GitHub Trending の第 2 位に付けています。ワークフローは 6 フェーズから成ります：偵察（`architecture.md` と入力面を記録する `coverage-ledger.json` を書き出す）、隔離されたハンターエージェントによるカバレッジ主導の探索、敵対的な検証、スキーマ検証済みの `findings.json` 出力（`confirmed` / `needs_validation` / `rejected`）、最終記録の独立した再検証、そして報告。実行は追記型——後続の実行は前回の台帳を読んでギャップを狙い、変更されたコードを再確認します。リポジトリにリリースはなく、`main` のコミットは 14 個だけ。今週新しいのは文脈であってコードではありません。11 月 3 日、Cloudflare が Radar 上に**Zero Wire**（公開の脆弱性インテリジェンスハブ）を立ち上げ、このスキルはその基盤となるハーネスの種子と自己説明しているのです。

**なぜ重要か：** README の唯一の定量的主張は意図的に地味です——1 回の実行で見つかるのは、繰り返し実行した合計の半分ほど——これは「エージェントが CVE を見つける」ジャンルの正直な版です。価値があるのは構造的設計のほうです。発見したエージェントは決して検証しない、台帳があるからこそ N 回の実行が N 回の繰り返しではなく 1 回の累積監査になる。スキャナではなく、ネットワーク遮断の OS サンドボックスを要求し、出力には人間のトリアージが要ることも明示しています。

> "The agent that checks a finding is never the agent that found it."

[`🔗 cloudflare/security-audit-skill`](https://github.com/cloudflare/security-audit-skill) · [`🔗 Build your own vulnerability harness（Cloudflare）`](https://blog.cloudflare.com/build-your-own-vulnerability-harness) · [`🔗 Zero Wire（Cloudflare Radar）`](https://blog.cloudflare.com/zero-wire/)

---

## 2. Libghostty 1.0 —— ターミナルエミュレーションコアの C ABI が安定へ

- **Velocity:** ▮▮▮ trending
- **ソース:** Hacker News · 710+ pts · 約 13 時間前（~07:30 UTC+8）
- **タグ:** `terminal` `c` `abi` `libraries`

Mitchell Hashimoto が Ghostty から抽出したターミナルエミュレーションコア `libghostty-vt` の 1.0 をリリースし、ライブラリ本体と C ABI の両方が安定したと発表しました。セマンティックバージョニングと強制された ABI 互換チェック（Linux は libabigail、macOS/WASM はゴールデン型マニフェスト）、バージョン付き ELF シンボル、署名付きソース tarball、pkg-config と CMake 設定を備えます。ツリー全体 MIT で copyleft 依存はゼロ、ランタイムに必要なのは libc のみで、機能フラグでサブシステム（検索、選択、Kitty グラフィックス）をコンパイル時に落とせ、落とされた呼び出しはコードを壊さず `GHOSTTY_UNSUPPORTED` を返します。CI でビルドされるプラットフォームは Linux（glibc/musl）、macOS 13+、iOS 13+、FreeBSD、Windows、Android、freestanding wasm32。サイズ最適化 WASM ビルドは 1 MB 未満。作者は 4 コア 8 GB のサーバーで 10,000 のアクティブターミナルを動かしたと報告し、現在 libghostty 搭載ターミナルの利用者は Ghostty アプリ本体の利用者を上回っていると述べます。投稿に名前のある採用先は JetBrains IDE、libvterm を置き換える承認済み Neovim PR、KDE の実験などです。

**なぜ重要か：** エージェントがターミナルのユーザーになった瞬間から、ターミナルの埋め込みはニッチではなくなりました。それまで各埋め込み先はそれぞれ不完全な VT パーサを育てていたのです。緩いライセンスで ABI 安定、CI 強制の互換性を持つコアは、ターミナル・エディタ・エージェントハーネスが何を再利用できるかを静かに変える種類のインフラです。範囲の正直さも重要です。これは VT コアのみで、レンダリングと UI は埋め込み側に残り、一部のプラットフォームはビルドのみで未テストです。

[`🔗 Libghostty 1.0（mitchellh.com）`](https://mitchellh.com/writing/libghostty-1-0) · [`🔗 ghostty-org/ghostty`](https://github.com/ghostty-org/ghostty) · [`🔗 Hacker News 投稿`](https://news.ycombinator.com/item?id=50399933)

---

## 3. BUI：Blender のウィジェット層をスタンドアロン UI ライブラリに —— GPUI の 3 倍のフレームレートを計測

- **Velocity:** ▮▮▮ trending
- **ソース:** Hacker News · 697+ pts · 約 29 時間前（~15:40 UTC+8）
- **タグ:** `ui` `blender` `gpui` `graphics`

BUI は Blender のインターフェースウィジェットコード（`interface_widgets.cc` の C 移植）を、ブラウザエンジンも Blender インストールも要らないスタンドアロンのツールキットとして切り出し、あらゆる主要言語から駆動できます。完全な tkinter 構文（公開されている tkinter/ttk の 7,846 名称すべてで、既存アプリは無変更で動作）、部分的な Qt レイヤー、Rust は `rs!`/HTML/CSS に Tailwind v4、JavaScript は napi 経由で React 19.3 と Svelte 5、そして C からは本物の Dear ImGui 1.93。同一の Ryzen 7 5800U 上で、同じ gpui 構文のソースを Blender のキットと Zed の gpui 両方でコンパイルすると、初回フレームは約 40 ms 対 約 231 ms、3,000 のアニメーションセルで 59.9 FPS 対 19.9、フレームあたり CPU は 11.6 ms 対 50.5、メモリは 30–40 MB 対 65–77 MB。リリースは速く（11 月 6 日に 0.4.1）、プロジェクトは GPL-3.0-or-later で約 1.8k スターです。

**なぜ重要か：** 注目すべきは「GPUI より速い」ではなく、作者自身が数字は 1 台のマシンのもので、最近の機能の実装前に計測されたと注意を促し、再計測ハーネスを同梱している点です。本質は、1 つの C コアが tkinter、Qt 風、HTML 風、ImGui の方言を同時に話すこと。これは UI ライブラリの本当の問題——描画速度ではなく、言語コミュニティごとにウィジェット層をゼロから作り直していること——を攻撃します。代償は見た目です。どこでも Blender に見え、アクセシビリティ対応はまだなく、macOS は実験的です。

[`🔗 ppmpreetham/BUI`](https://github.com/ppmpreetham/BUI) · [`🔗 Hacker News 投稿`](https://news.ycombinator.com/item?id=50389333)

---

## 4. オランダの ASN 銀行、Wero 移行で Google 非搭載 Android を締め出す —— 責任は「EU 法」に

- **Velocity:** ▮▮▮ trending
- **ソース:** Hacker News · 636+ pts · 約 27 時間前（~17:27 UTC+8）
- **タグ:** `grapheneos` `android` `payments` `attestation`

ASN 銀行の Android アプリは、Google サービスのない端末で Wero 決済を拒否するようになり、オランダ語で「電話またはアプリのインストールがセキュリティ要件を満たしていない」というエラーを表示します——通常のアプリ内銀行機能は動作するとの報告です。銀行アプリ互換性トラッカー（コミュニティ運営、5 月以来静か）にある 2022 年の issue は、この件で 11 月 6 日に再オープンされ、同日再びクローズ、議論は今日も続いています。表明された根本原因は、Wero 運営の EPI が「Android のハードウェア鍵認証は鍵が TEE や StrongBox にあることしか証明せず、アプリや OS の完全性は証明しない」として Google Play Integrity を要求するというもの。コメント投稿者は GrapheneOS の認証ドキュメントを引き、標準的なハードウェア認証は公開鍵経由でサードパーティ OS を含む OS と verified-boot 状態を検証できると反論しています。ASN 銀行の正式な苦情への回答は、オンライン決済に関する厳しい EU の法的要件に言及し、代替 OS の対応を検討中と述べるだけで、約束はありません。

**なぜ重要か：** これは grapheneos 対 Play Integrity の争いが決済分野に到達した件です。代償はアプリの機能欠落ではなく、決済経路そのものの遮断です。技術論争は検証可能——ハードウェア認証は実際に OS 状態を結び付けます——だからこそ「EU 法が要求している」という部分こそ注視に値します。要件が規制ではなく EPI の設計選択なら、修正は政策変更であって、不可能な工学課題ではありません。

[`🔗 banking-apps-compat-report issue #105`](https://github.com/PrivSec-dev/banking-apps-compat-report/issues/105) · [`🔗 Hacker News 投稿`](https://news.ycombinator.com/item?id=50390124)

---

## 5. 調律された曖昧帯で Opus にエスカレートする安価な「決定モデル」—— 98.8% の精度を 4 分の 1 のコストで

- **Velocity:** ▮ rising
- **ソース:** Hacker News · 502+ pts · 約 17 時間前（~03:48 UTC+8）
- **タグ:** `llm` `cascades` `calibration` `cost`

Hightouch のエンジニアリング記事は、アイデンティティ解決の出力の「過剰マージ」——別人のレコードを 1 つのアイデンティティに誤って縫い合わせるケース——の評価を扱います。方式はカスケードです。条件が真である 0–1 の信頼スコアを返す決定モデル Jev が全件を判定し、30–90% の曖昧帯に落ちた案件だけを Claude Opus 5.5 が再判断します。素の状態で決定モデルは最大 90 倍安く、10 倍以上速く（1,000 アイデンティティあたり $0.05–0.10）、精度は 88.8–97.3% ですが、難しいケースでは Opus に約 6 ポイント届きません。ハイブリッドは 98.8% を $0.88/1,000 で達成。Opus 単体は 99.0% で $3.86 です。より難しいテストセットではハイブリッド Jev（95.3%、$2.94）が Opus 単体（95.1%、$5.39）を上回りました。設計の要はキャリブレーションです。Jev の誤りは信頼度 50% 近くに集中し、GPT-6 Luna の誤りは 90–100% に固まります。同じエスカレーション帯が Jev の誤りは拾えても、Luna の誤りは拾えない理由です。

**なぜ重要か：** 再利用可能な結論は、カスケードの閾値が機能するのは安価なモデルが「自分の知らないことを知っている」場合だけ、ということです。Jev で 4 倍のコスト優位を買える同じ帯が、Luna では精度を下げます。注意点も明示されています。ベンチマークは完全に合成データ（模擬町のレコード）で、閾値はコストと精度のトレードで調整可能、プロンプトに文脈を足しても決定モデルには効果がなかった——推論しているようには見えない、と。

[`🔗 Hightouch エンジニアリングブログ`](https://hightouch.com/blog/llm-judges-identity-resolution) · [`🔗 Hacker News 投稿`](https://news.ycombinator.com/item?id=50397429)

---

## 6. Gemini Omni 1.2 Flash が GA へ —— 15 秒動画・マルチターン編集、ベンチマークはなし

- **Velocity:** ▮ rising
- **ソース:** Hacker News · 343+ pts · 約 23 時間前（~21:35 UTC+8）
- **タグ:** `video-generation` `google` `gemini` `release`

Google DeepMind の動画生成・編集モデル（Omni 1.1 の後継）が初めて一般提供に入りました。ネイティブクリップは 3–15 秒、1 秒刻みで選択可能（従来の 10 秒から延長）。会話的なマルチターン編集で再生成なしにクリップを磨け、参照の追従は画像・3 秒までのモーションクリップ・音声キューから。720p で下書きし 4K へアップスケールするワークフローも備えます。価格は 720p で秒あたり $0.07 と Omni 1.1 比 30% 安く、全出力に SynthID ウォーターマーク。Gemini API と AI Studio、Vertex AI、Google Vids、Flow、Gemini アプリ（AI Ultra 購読者へ順次展開）、Google Ads に投入されます。発表にベンチマーク数字はなく、根拠は定性デモです。弱点も明示されています。「development is ongoing」なのは、高速スポーツ動作、脚本の急な変更、複雑な物理。

**なぜ重要か：** GA と秒単位の課金は、これをデモから請求項目へ変えます。注視すべきパターンは、このフィードがモデル発表で繰り返し見つけてきたものと同じです。評価の付いていない能力主張が、$0.07/秒 の計量で提供される。

[`🔗 Google 公式発表`](https://blog.google/innovation-and-ai/technology/developers-tools/introducing-gemini-omni-1-2-flash/) · [`🔗 Hacker News 投稿`](https://news.ycombinator.com/item?id=50392118)

---

## 7. METR：Anthropic は自社の 2× 加速閾値を、おそらく既に超えている

- **Velocity:** ▮ rising
- **ソース:** Hacker News · 322+ pts · 約 16 時間前（~04:27 UTC+8）
- **タグ:** `metr` `rsp` `ai-safety` `evaluation`

METR は 11 月 5 日、独立評価（Anthropic 内部での 11 週間のレビューに基づく）を公表しました。2025 年 10 月〜2026 年 10 月の Anthropic の、明確に仕様化されたタスク上の能力進捗は、前年 12 か月の約 2 倍の速さで進んでおり、Responsible Scaling Policy（RSP）の「劇的に加速された進捗」閾値を、おそらく越えた。3 倍に近づいている可能性もある。加速の約 80% を AI ツールに帰属させています。翌日の Ajeya Cotra の解説は、報告書自身の留保をたどります。根拠資料は大部分が黒塗り（著者らは自分たちが最も情報量が多いと見たものの過半だと述べた）、閾値の定義は繊細、外部的な読者は荷重を支える数字を検証できず信頼するしかない。Anthropic 自身の RSP 文言は「進捗速度の倍化を観測するか、予期する」となっています。

**なぜ重要か：** これはベンチマークではなく、政策の引き金が引かれた話です。閾値を超えることで、RSP が次の等級で約束するより強いセーフガードの義務が発動します。報告の誠実さは両刃です。黒塗りの「80% を AI に帰属」という数字こそ監査可能であるべきで、今は内部からしか監査できません。

[`🔗 METR 評価`](https://metr.org/blog/2026-11-05-anthropic-ai-rd-acceleration-assessment) · [`🔗 Ajeya Cotra：AI is dramatically accelerating AI research`](https://www.planned-obsolescence.org/p/ai-is-dramatically-accelerating-ai) · [`🔗 Hacker News 投稿`](https://news.ycombinator.com/item?id=50397994)

---

## 8. Anthropic がエージェントメモリの 4 コンポーネントを描き、「夢見る」パスで維持する

- **Velocity:** ▮ rising
- **ソース:** Hacker News · 62+ pts · 約 6 時間前（~14:39 UTC+8）
- **タグ:** `agents` `memory` `anthropic` `research`

Anthropic のエンジニアリング投稿は、エージェントメモリを 4 層のヒエラルキーで整理します。生のトランスクリプト、顕著なメモリノート、wiki のようなリンクされた記憶表現、少量の注入コンテキスト。それに「dreaming」——セッション間の遊休計算資源がトランスクリプトを再生し、ノートを訂正し、内容を上層へ昇格させる通過です。証拠は測定されています。ポケモン赤では、Sonnet 3.7 は無差別に書き（413 ファイル、約 978K 文字、バッジ 1 個）、Fable 5 は選択的に書き（10 ファイル、約 43K 文字、バッジ 4 個）、Opus 5.5 はコンパクトなメモリフォルダでゲームをクリアしました。35 万ファイル・約 4.2 億トークン・25 問のコーパスでは、dreaming を 2 セッションから 128 セッションへ拡大するにつれ、wiki のみの成績は 13% から 48% へ、wiki+検索は 54% から 61% へ（検索のみは 53%）。指示より誘導が効きました。「失敗だけ記録せよ」は Opus 5 から 0.234 の報酬を奪い、wiki 構築指示の 1 つを再構成すると採点対象事実が 41/57 から 57/57 へ。失敗モードも自分で名指します。ある wiki は要約元のコーパスより大きくなり、注入された誤りは全セッションに伝播し、セッション中のメモ書きは本題を邪魔する。

**なぜ重要か：** メモリはエージェント製品が静かに差をつけている場所で、これは現時点で最も具体的な公開分解です。「モデルに何を覚えるか選ばせる」が「何を覚えろと指示する」に勝つ、という発見を含みます。wiki が検索に勝つという結果は見出しより狭い。効いたのは文書横断の統合で、単一文書の検索では明確な利得がなかった、とされています。

[`🔗 The components of agent memory（Anthropic）`](https://www.anthropic.com/research/components-of-agent-memory) · [`🔗 Hacker News 投稿`](https://news.ycombinator.com/item?id=50402212)

---

## 9. PwnEscape 第 2 弾、数週間前の Firecracker メモリプリミティブをホストでのコード実行に —— jailer は越えていない

- **Velocity:** ▮ rising
- **ソース:** Hacker News · 248+ pts · 約 17 時間前（~03:33 UTC+8）
- **タグ:** `firecracker` `vm-escape` `microvm` `security`

PWN Research の続編は Firecracker v1.16.1 での脱出の第二段階を実演します。第 1 部の guest→host メモリ読み書きプリミティブを得たあとの道筋はこうです。guest ページにナンスを置き、候補 EPT ルートを突いて host 物理アドレスを特定、host ページテーブルを逆探索して VMM の PGD を復元し、Firecracker 自身の ELF のバイトシグネチャ一致で ASLR を崩す。そして `ioctl(KVM_RUN)` でブロック中の生きた `pt_regs` フレームを見つけ、保存レジスタを上書きします。先仕込みのガジェットが戻り値をゼロにして ioctl が正常に見えるよう工作し、guest からの 1 バイトのシリアル書き込みで `write(2, ...)` が Firecracker のコンテキストで実行されます。ただし注意書きこそが物語です。セットアップは jailer なし、Firecracker は `systemd-run` の下で root として直接起動、guest 側ヘルパーは root と `/dev/mem` を要求します。HN のコメントは帰属で割れました——「Firecracker ではなくカーネルのネットワークスタックのバグだ」という声がある一方で、jailer は破られておらず、現実のホスト支配には 2 つ目の強力な LPE が要る点では一致しています。記事は CVE-2026-99999 を引用しますが、レジストリでその ID の記録は無関係な Linux カーネル ipv4 チェックサムのバグであり、脱出の CVE の同一性は検証できません。パッチの言及もありません。

**なぜ重要か：** エージェントのサンドボックスは microVM のハードウェア分離に賭けている、そのまさにの時点で、KVM を越えた VMM コンテキストでのコード実行を示す公開チェーンが出ました——jailer 境界で止まるとしても。エージェント群を運用する人への問いは、著者らが先送りしたそれです。jailer が実際に有効な状態で VMM を乗っ取ったあと、残る特権と資源は何か。

[`🔗 PwnEscape Part 2（pwn.ai）`](https://pwn.ai/blog/firecracker-escape) · [`🔗 Hacker News 投稿`](https://news.ycombinator.com/item?id=50397219)

---

## 10. Asahi Linux 7.3：M3 が GA に、Thunderbolt が上流へ —— そしてプロジェクト全体が GPLv2 へ再ライセンス

- **Velocity:** ▮ rising
- **ソース:** Hacker News · 200+ pts · 約 7 時間前（~13:20 UTC+8）
- **タグ:** `asahi` `linux` `apple-silicon` `gpl`

Apple シリコン Linux プロジェクトの 11 月報告では、M3 サポートが EXPERT から一般利用へ卒業しました（DCP 有効化：スリープ、性能、ノッチ周辺の表示）。上流へ提出された大物ドライバは 2 つ。macaudio（約 3,100 行）と AVD ディスプレイドライバ（約 13,000 行、3 か月という同プロジェクトの主要コンポーネント最速記録）。Apple 独自コントローラで約 5 年かかった Thunderbolt パッチも上流に着地しました（USB3、XDomain、Thunderbolt Networking。PCIe/DisplayPort トンネリングは未実装で、多くのドックはまだ動きません）。そのほか：m1n1 が M5 の EL1 で 3 つの VM を動かせるようになり、Secure Kernel と Exclaves を含む macOS を仮想化してリバースエンジニアリングに使える。Google の P3S パッチセットをリベースし、4K ページの x86 ゲームが muvm VM の外で動くようになりました。Wolfenstein: The New Order は M2 Max の Mac Studio で 144+ FPS、muvm のペナルティは約 20%。Rust の音声ビームフォーマは手書き SIMD でおよそ 2 倍速く。リリースより長く残る見出しはこれです。すべての Asahi リポジトリは GPLv2-or-later へ移行します。緩い MIT ライセンスが利用されていることを理由に、その中には開発中コードの AI 支援による書き換えが含まれます。

**なぜ重要か：** M3 の GA は、現行 MacBook の設置台数の前に、ほぼ日用可能な Linux を置くことです。しかし他のプロジェクトが感じるのは再ライセンスのほうです。旗艦級のリバースエンジニアリング努力が「緩いライセンスは、未公開の成果の AI 重建版を他者が商品化するのを許す」と結論したことは、ハードウェア隣接コードを巡る MIT 離れの潮流における、重みのあるデータポイントです。

[`🔗 Asahi Linux 進捗レポート 7.3`](https://asahilinux.org/2026/11/progress-report-7-3/) · [`🔗 Hacker News 投稿`](https://news.ycombinator.com/item?id=50401867)

---

## 11. GitHub の新 Git ストレージ：refs だけに合意、他はすべて Blob ストレージへ —— 1 リポジトリで 7,200 プッシュ/秒

- **Velocity:** ▮ rising
- **ソース:** Hacker News · 157+ pts · 約 18 時間前（~02:13 UTC+8）
- **タグ:** `github` `infrastructure` `git` `scale`

GitHub のエンジニアリング記事は、Git データプレーンの下の再構築（コードネーム Rubicon——彼らはこれを業界の agentic 開発における「帰る点のない川」と呼びます）を説明します。使い捨ての仮想レプリカが読み書きを担い、ローカルディスクは再構築可能なキャッシュにすぎない。新しい Ref-CAS サービスが、参照更新とパックマニフェストのための compare-and-swap トランザクションをクオーラムコミットし、トランザクションが触る ref だけをロックします。永続オブジェクトは Azure Blob Storage に置かれ、別個のコンパクション艦隊がパックの統合と GC を、配信から切り離して担います。核心の洞察は、Git オブジェクトは不変で内容アドレス指定なので、合意が必要なのは小さな参照更新だけ、ということです。内部テストでは、5,000 の同時エージェントが単一リポジトリに毎秒 7,200 プッシュを送り、読み取りレイテンシは一貫して低かった。Ref-CAS は参照トランザクションを毎秒数万件処理します。ある実例リポジトリのトラフィックは 2026 年 3 月から 5 月の間に 1 日 4,400 万リクエストから 1 億 8,100 万へ伸びました。設計目標はリポジトリあたり「少なくとも 2 桁多いスケール」で、限定的なプライベートプレビュー中、来年初頭に広く展開予定です。

**なぜ重要か：** 駆動するワークロードは新しい——多くのエージェントによる単一リポジトリへの持続的並列書き込みで、旧設計（リポジトリ全体の合意グループ、配信とコンパクションの結合）はそれのために形作られたことがありません。数字は傾向をインフラ側から測定可能にします。1 リポジトリが 7,200 プッシュ/秒を吸収できるなら、単一リポジトリへの多エージェント書き込みは、仮説ではなくキャパシティ計画の前提になっている、と。

[`🔗 Inside GitHub's new Git storage architecture`](https://github.blog/engineering/architecture-optimization/inside-githubs-new-git-storage-architecture/) · [`🔗 Hacker News 投稿`](https://news.ycombinator.com/item?id=50397099)

---

## 12. 感染確認済み 15,579 サイト、月間合計約 1.35 億アクセス —— そして伝える手段がスケールしない

- **Velocity:** ▮ rising
- **ソース:** Hacker News · 157+ pts · 約 18 時間前（~02:13 UTC+8）
- **タグ:** `web-security` `malware` `supply-chain` `skimming`

Scott Helme（Report URI）は、チームが 100% の確度で悪意ある JavaScript を実行中と確認した稼働サイトの数を公表します。15,579。合計月間アクセスは保守的に約 1.35 億。大半は世界のトップサイトではなく国別 TLD（.fr、.es、.de）の地域の有力サイトです。感染は Magecart 型のカードスキマー、ClickFix の偽認証マルウェア、iOS スパイウェア（DarkSword と Coruna の名前を挙げ）、悪意あるリダイレクトに及びます。侵入経路は WordPress の脆弱性、感染したサードパーティのサプライチェーンスクリプト、XSS、そしてチームが「DeadTag」と名付けたグループ——サイトのスクリプトにまだ参照されたままの失効ドメインを再登録する手口。サイトは浄化されて初めてリストから外れます。通知の問題は未解決です。影響の大きいサイトへの手動の連絡はほぼ無視され、GDPR は WHOIS の連絡先を無力化し、CDN プロキシは本当のホスティング先を隠す。Helme はリストの公開を拒みます。「名指しと恥」の害と、攻撃者への目標リストの贈り物の両方のためです。その代わり欧州の NCSC と CERT に地域リストを提供しています。

**なぜ重要か：** この記事は検出と修復の間の溝を、珍しく率直に見たものです。難しかったのは感染サイトを見つけることではなく、15,579 人の——大半が影響を受けていると知らない——所有者へ伝えるプロトコルが存在しないことです。このフィードにとって最も鋭いのはサプライチェーンの経路です。スクリプトを参照しているページの所有者は、その脚本が置かれたドメインを、もう制御していない。

[`🔗 Scott Helme`](https://scotthelme.co.uk/we-know-15-579-websites-are-infected-how-do-we-tell-them/) · [`🔗 Hacker News 投稿`](https://news.ycombinator.com/item?id=50396064)

---

## 13. 現代の Mac にはすべて、未文書化の親族分類器と、あなたの人生の 51 データベースのグラフが同梱されている

- **Velocity:** ▮ rising
- **ソース:** Hacker News · 122+ pts · 約 3 時間前（~17:46 UTC+8）
- **タグ:** `apple` `privacy` `on-device-ml` `knowledge-graph`

macOS 26 の Apple Intelligence バンドルを調べたセキュリティ研究者は、2 つのデーモン（`knowledgeconstructiond`、`intelligenceplatformd`）が、連絡先・カレンダー・写真・メッセージ・メール・位置情報・ファミリー共有・スクリーンタイムから端末上のパーソナルナレッジグラフを構築するあり方を記録しました。`~/Library/IntelligencePlatform` の下に平文の SQLite データベース 51 個として保存され、守りは Full Disk Access のみ。中心の `graph.db` は 181 のエンティティクラスと 278 の述語を持つトリプルストアです。出荷物の中には、2 つの CoreML モデル（`EntityTagging_Family`、`EntityTagging_FamilyAndFriends`）があり、実際は 144 特徴の XGBoost 分類器でした。`metadata.json` は全特徴を平文で列挙していて、`photosPersonPosteriorProbabilityGivenSaturdayNight` のような時刻条件付きのものも含まれます。1 人あたり 17 列の関係スコアを付け、毎日再計算。著者らはその 17 列のうち 2 列しか出荷済みモデルに追跡できず、残り 15 列を何が埋めているかについて「could not trace」と書いています。自分のストアを検査するためのオープンソースダッシュボード iKnow を公開し、懸念は具体的です。グラフの中の第三者は誰も同意しておらず、ユーザーには文書も、ストアを検査する道も、誤った推論を修正する一般的な手段もない。

**なぜ重要か：** このオンデバイス ML は、プライバシーのマーケティングが約束することを、まさに実行しています。ローカルで、クラウドなしで——その一方で、あなたの人間関係についての推論を生産し、それを表面化し抗議を可能にするものは何もありません。欠落は悪意ではなく API サーフェスの不在です。著者らが監査に必要としたデータは特徴ファイルそのものの中にあり、それは彼らが実演した修正経路でもあります。

> ユーザーが得るのは「no documentation, no way to inspect the store and no general way to correct an inference that is wrong」です。

[`🔗 Apple Intelligence personal knowledge graph（8rank.ai）`](https://8rank.ai/game/apple-intelligence-personal-knowledge-graph) · [`🔗 Hacker News 投稿`](https://news.ycombinator.com/item?id=50403097)

---

## 14. SonicWall SSLVPN の SAML バイパス、記録の翌日に KEV へ

- **Velocity:** ▮ steady
- **ソース:** CISA KEV · 2026-11-06 追加
- **タグ:** `cve` `kev` `vpn` `sonicwall`

CVE-2026-19868 が 11 月 6 日、CISA の既知悪用脆弱性カタログに追加されました。記録（同日 19:17 UTC 公開、状態 `Undergoing Analysis`）は、SonicOS SSLVPN の認証強制の欠陥を説明します。別の認証方式の有効な資格情報を持つユーザーが、SAML 認証制御を回避しうる、というものです。記録上の唯一のスコアは CISA-ADP のエンリッチメントによる CVSS 3.1 **7.5**（`AV:N/AC:H/PR:N/UI:N/S:C/C:H/I:L/A:N`、CISA-ADP コンテナの Secondary メトリック）で、ベンダー側のコンテナは空です。SonicWall の勧告ページ（SNWLID-2026-0014）は素の取得には JavaScript シェルとして応答するため、影響版と修正版は実ブラウザで読む必要があります。

**なぜ重要か：** SSLVPN エンドポイントは KEV の定番の母集団です。インターネットに露出し、資格情報に隣接し、今は連邦の修復期限が付いています。トリアージする人にはスコアの出所が重要です。7.5 はコーディネーターの数字であってベンダーのものではなく、記録の分析状態もまだ動いています。

[`🔗 NVD: CVE-2026-19868`](https://nvd.nist.gov/vuln/detail/CVE-2026-19868) · [`🔗 SonicWall 勧告 SNWLID-2026-0014`](https://psirt.global.sonicwall.com/vuln-detail/SNWLID-2026-0014) · [`🔗 CISA KEV カタログ`](https://www.cisa.gov/known-exploited-vulnerabilities-catalog)

---

## 15. Apache Axis 1.x に未認証 RCE —— 7 月に修正、11 月に開示、誰もインストールできない

- **Velocity:** ▮ steady
- **ソース:** oss-security · 2026-11-06 開示
- **タグ:** `cve` `java` `soap` `deserialization`

CVE-2026-90436（記録は 2026-11-06 公開、状態 `Received`、CVSS はまだ誰からもありません）は、Apache Axis 1.x における inbound SOAP fault の逆シリアル化を説明します。`<Fault>` の `<detail>` が `<exceptionName>` 要素を運ぶと、Axis は攻撃者の指定したクラスをインスタンス化します——未認証のリモートクラスインスタンス化です。記録は `UNSUPPORTED WHEN ASSIGNED` の帯付きで、その周りの 3 つの時計が物語を語ります。修正コミットは **2026-07-12** にマージ済み——記録より 117 日前——なのに、リポジトリ（最終プッシュ 2026-09-07）のリリースページは 2011 年（Axis 1.4）以降何も示しておらず、アップグレードできる成果物が存在しません。開示は 11 月 6 日の oss-security を通りました。

**なぜ重要か：** 1 つの記録に、2 つの異なる「サポート外」の物語が隠れています。コードは 7 月に修正された。記録は 11 月までかかった。成果物の層は 15 年凍結されたまま——だからすべての展開への答えはアップグレードではなく移行であり、4 か月の記録の空白は、この脆弱性パターンが秋の間ずっと「公開的には修正可能だが文書化されず」の状態だったことを意味します。

[`🔗 oss-security 開示`](https://www.openwall.com/lists/oss-security/2026/11/06/12) · [`🔗 NVD: CVE-2026-90436`](https://nvd.nist.gov/vuln/detail/CVE-2026-90436) · [`🔗 修正コミット`](https://github.com/apache/axis-axis1-java/commit/41f3b4e8d04e310ca81f86b92630ab2c11d608bd)

---

## 16. Memorilla は文書コレクションを 16 のメモリトークンに圧縮し、FactKG ではフルコンテキストに勝つ

- **Velocity:** ▮ steady
- **ソース:** Hacker News · 107+ pts · 約 18 時間前（~02:03 UTC+8）
- **タグ:** `arxiv` `memory` `long-context` `retrieval`

スタンフォードのシステム（Leskovec 研究室、arXiv:2610.21375、v3 は 11 月 3 日）は、文書コレクションを一度だけ再利用可能な埋め込みに符号化し、クエリに関連する情報を固定数の **16 メモリトークン**へ圧縮して、凍結された LLM の埋め込み空間へ直接注入します。8 ベンチマークのうち 5 つで、Mem0 や MemoRAG を含むメモリベースラインに勝ちます。FactKG では 84.33% に達し、フルコンテキスト推論の 80.43% を、ソース文書の表現に 108 分の 1 のトークンで上回ります。TextWorld エージェントの実験では、平均成功率が 18.6%（全履歴の in-context learning）から 24.2% へ上がり、探索済みの部屋の再訪問も減りました。

**なぜ重要か：** 面白いのは勝ちそのものではなく、108 倍の圧縮でフルコンテキストに勝ったことです。これはメモリシステムがトークンのために忠実度を交換するという通説を崩します。落とし穴は潜在圧縮研究の常どおりです。16 トークンはハードな上限で、これを有利にするベンチマーク（固定コーパス上の知識集約 QA）は、要約形の損失が最も安い場面でもあります。検索が既に勝っている単一文書の検索こそ、主張していない領域です。

[`🔗 arXiv:2610.21375`](https://arxiv.org/abs/2610.21375) · [`🔗 プロジェクトサイト（スタンフォード）`](https://memory.stanford.edu)

---

## 17. Meta が Astryx を公開 —— 社内で 8 年育ったデザインシステム

- **Velocity:** ▮ steady
- **ソース:** GitHub Trending · 本日 +198★ · 累計 14,123
- **タグ:** `design-systems` `react` `stylex` `meta`

Astryx は Meta の社内デザインシステム——8 年間で 13,000 以上のアプリに使われた——が MIT ライセンスでベータとして公開されたものです。React 19+ と StyleX の上に 150 以上のアクセシブルなコンポーネント、CSS カスタムプロパティによるテーマ、Tailwind・CSS modules・素の CSS でスタイルを上書き可能、コンポーネントのソースをプロジェクトへ取り出す `swizzle` コマンド、そして CLI。「agent ready」の表現は装飾ではなく具体的です。API・ドキュメント・CLI が 1 つの参照として設計され、人間もエージェントも同じページから同じものを構築できます。README は CLI のグローバルインストールを勧め、あらゆるコーディングエージェントがそれを見つけられるようにし、エージェントが CLI を直接呼ぶための `package.json` エイリアスを提案します。リリースは加速しています。11 月 6 日に v0.7.10、2 日で 3 つ目です。

**なぜ重要か：** デザインシステムは AI が構築する UI の静かなボトルネックです。モデルはもっともらしい画面を作れますが、チームはテーマも保守もできません。13,000 の内部アプリを生き延びたそのシステムを出す Meta は、また別のコンポーネントライブラリより強い信号です。検証可能な主張は「ドキュメントをエージェントの参照として設計する」という部分で、未解決の問いはベータの npm パッケージがリポジトリと同期を保てるか——2 日で 3 リリースという速度は、彼ら自身がそれを分かっていることを示唆します。

[`🔗 meta/astryx`](https://github.com/meta/astryx) · [`🔗 releases`](https://github.com/meta/astryx/releases)

---

## 18. billion-context：コーディングエージェントのセッションを 1 か月に伸ばすと主張する圧縮プロキシ

- **Velocity:** ▮ steady
- **ソース:** GitHub Trending · 本日 +185★ · 累計 4,397
- **タグ:** `context-compression` `agents` `proxy` `long-context`

トレンドに入っているプラグイン/プロキシで、任意のコーディングエージェントとモデル API の間に立ち、Anthropic と OpenAI のワイヤ形式を解析し、消費済みの会話を層状の可逆な要約へ折りたたみます。売りは、1 つのコンテキストウィンドウの中で 1 つのセッションを何日も走らせることです。圧縮はモデル駆動です。プロキシがツール（`compress`、`decompress`、`search_context`）を注入し、モデルがコンテキストの成長に応じて呼び、50K トークン付近で穏やかに促し、preflight が受け止めます。README は 95–97% のプレフィックスキャッシュヒット率と 2% 以下の圧縮コストを主張し、174,327 回のモデル呼び出しと累計約 187.6 億入力トークンをカバーする伴走論文、そしてサードパーティベンチマークを引用します。ContextBench 1 位（0.3097 Utilized F1、フルコンテキスト比コスト −58.3%）、LongMemEval-S で最良の RAG アームに +16.6%、1.48M トークンの MemoryAgentBench テストで 100% 生残（フルコンテキストは全試行失敗）。Claude Code、Codex、Gemini CLI などの長いリストに対応。MIT に可視の帰属を要求する追加条項が 1 つ。リポジトリは自らを「Early」と称し、実モデルでの統合テストはまだこれからの状態です。

**なぜ重要か：** この設計の賭けは、今週の Anthropic のメモリ記事の正反対です。Anthropic はモデルにセッション横断で何を残すか選ばせ、billion-context は 1 セッション内で圧縮します。荷重を支える数字はキャッシュヒットとコストの 2 つで、最も正直な旗印は、実モデルでそれらを検証する統合テストがまだ完了していないと明記されている点です。

[`🔗 ranxianglei/billion-context`](https://github.com/ranxianglei/billion-context) · [`🔗 releases`](https://github.com/ranxianglei/billion-context/releases)

---

## 19. Waymark はワークフローのジョブをリプレイではなくバイトコードへコンパイルする

- **Velocity:** ▮ steady
- **ソース:** Show HN · 77+ pts · 約 46 時間前（~22:06 UTC+8）
- **タグ:** `workflows` `durable-execution` `postgres` `rust`

Waymark は完全に Postgres の上に構築された durable execution ライブラリです。デプロイするブローカはありません。差別化は 1 回コンパイルであって 1 回リプレイではないことです。Temporal はワークフローコードを再実行し決定性を要求しますが、Waymark は初回実行時に `run()` メソッドの AST を中間表現へパースし、Rust 実装の永続仮想マシン用バイトコードへ落とし、VM 状態を Postgres にスナップショットします。復旧は最初からではなく、実行の途中から再開します。非決定的なパターンはコンパイル時に捕捉されます。MIT ライセンス、約 109 スターでリリースはまだなく、README は率直です。1.0 前で仕様は急速に変わる、本番、レイテンシ敏感なジョブ、およそ 1 万を超える同時調整アクションには推奨しない、と。

**なぜ重要か：** リプレイ対コンパイルは durable execution の中心的な設計論点で、Postgres を唯一の依存とする動くコンパイル実装は、Temporal モデルへの実データポイントです。コンパイラが強制する決定性と、SDK の規律が強制する決定性は、異なる失敗面です。率直な pre-1.0 の警告こそ、採用ではなく注視に値する理由です。

[`🔗 piercefreeman/waymark`](https://github.com/piercefreeman/waymark) · [`🔗 ドキュメント`](https://waymark.sh) · [`🔗 Hacker News 投稿`](https://news.ycombinator.com/item?id=50379221)

---

## 20. Zalando が AI エージェント向け OAuth 委任ブローカーをオープンソース化

- **Velocity:** ▮ steady
- **ソース:** Show HN · 22+ pts · 約 21 時間前（~23:07 UTC+8）
- **タグ:** `oauth` `agents` `mcp` `identity`

Zalando のインキュベータープロジェクトは、AI エージェントのためのアイデンティティブローカーです。OAuth2 の on-behalf-of フローによるスコープ付き・取り消し可能な委任、トークンボールト、Google・GitHub・Databricks・Linear への粒度の細かいアクセスをエージェントに付与する同意 UI。Agentgateway のようなゲートウェイ経由で呼び出し経路に展開され、トークン交換を透過的に処理します。MCP サーバーの開発者はツールを公開するだけで、認証と同意は集中管理されます——監査証跡付きの一元的ツール承認プロンプト、値の墨消し、fail-closed 設計を含みます。MIT ライセンス、OpenSSF Scorecard バッジ付きで約 59 スター。チームは社内の複数の MCP サーバーで本番運用しており、そのアプローチを検証するために公開で開発していると述べています。

**なぜ重要か：** エージェントのアイデンティティは、すべての MCP 展開がやがて突き当たる穴です。「アクセスなし」と「ユーザーのトークン」の間に何も存在しないため、エージェントは最終的にユーザーの資格情報を握るしかない。同意 UI と取り消しを備え、企業が本番で動かしているブローカーは、そのまま写せる具体的なパターンです。その小ささこそが要点です。これは配管で、配管は伝播します。

[`🔗 zalando-incubator/agentic-identity-broker`](https://github.com/zalando-incubator/agentic-identity-broker) · [`🔗 ドキュメント`](https://agenticidentitybroker.dev) · [`🔗 Hacker News 投稿`](https://news.ycombinator.com/item?id=50393235)

---

## Metadata

| Field | Value |
|-------|-------|
| Generated | 2026-11-07T12:33:39Z |
| Items | 20 |
| Sources tracked | 24（Hacker News、GitHub Trending、NVD、CISA KEV、oss-security/Openwall、SonicWall PSIRT、Cloudflare Blog、Google Blog、Anthropic Research、METR、GitHub Engineering、Asahi Linux、mitchellh.com、Hightouch、pwn.ai（PWN Research）、Scott Helme/Report URI、8rank.ai、arXiv、Stanford、Meta、Zalando、ベンダー勧告ページ、プロジェクトのリリースノート、開発者ブログ） |
| Update schedule | 04:03, 12:03, 20:03 UTC+8（1 日 3 回） |
| Ranking | 速度加重（新しさ × 反応の加速度 × 情報源の権威） |
| License | [CC-BY 4.0](https://creativecommons.org/licenses/by/4.0/) |

---

[前日](../2026-11-06/) · [生の .md](https://trending.md/jp/feed/2026-11-07.md) · [アーカイブ](../../archive/)
