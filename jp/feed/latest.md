---
date: 2026-11-02
updated: 2026-11-02T12:19:50Z
schedule: 04:03, 12:03, 20:03 UTC+8
sources: 24
license: CC-BY-4.0
---

# トレンド — 2026-11-02

## 1. Linux TCP の use-after-free は 16 日間レコードのままだった — そこへ Go の MPTCP 既定値が来てトップページに載った

- **Velocity:** ▮▮▮ trending
- **Source:** Hacker News · 647 pts · 約 25 時間前（約 03:16 UTC+8）· CVE レコード公開 2026-10-15
- **Tags:** `cve` `linux-kernel` `tcp` `mptcp` `go` `use-after-free`

`CVE-2026-98432` は Linux カーネルの IPv4 TCP ハンドシェイクにおける use-after-free だ。接続確立時、カーネルはピアの IPv4 ヘッダオプションを後でエコーするために半開接続（request socket）へ保存する。接続が完了すると、保存したオプションを**コピーせずに**完全なソケットへ渡し、クローズ時に解放する — その間、別の CPU がまだ応答構築のためにそれを読んでいる可能性がある。解説記事による修正は、二箇所の即時解放を RCU 遅延解放に変え、request socket の移行経路にも手を入れるもので、関連する IPv6 の件は別パッチに回された。影響範囲は 4.4 以降、5.10.272 / 5.15.223 / 6.1.190 / 6.6.159 / 6.12.113 / 6.18.56 / 7.2.10 / 7.3 未満。Linux カーネル CNA（`416baaa9-…` のアサイナ）が **9.8** を付けており、本バッチ時点で NVD のステータスは `Received`、**NVD 自身のスコア指標は 0 件** — レコード上の 9.8 は CNA の算術であって NVD のものではない。

今週浮上した理由はレコードではない。**Go 1.24 が Linux のリスンソケットで MPTCP を既定で有効にした**こと（GODEBUG `multipathtcp=2`、ダイヤラは opt-in のまま）であり、Anthropic が示したエクスプロイトは MPTCP リスナーを必要とした。Go セキュリティチームは **2026-10-30** に答えを出している。「The best fix for this vulnerability is to upgrade to a patched kernel version」と述べ、プログラム単位のスイッチを「a fragile mitigation」と呼び、「Accidentally leaving a single MPTCP listener exposed will still leave a system vulnerable.」と警告した。`multipathtcp=0` を効かせるかどうかは**メインモジュール**の `go` ディレクティブで決まり、ツールチェーンでは決まらない — `go 1.23` を宣言するモジュールは従来の opt-in 挙動のままになる。

**Why it matters:** リモートから、認証なしで、アプリケーションコードより前に到達できるバグであり、その前提条件はある言語ランタイムの既定値が設置したものだ。しかもそのランタイム自身のチームが、あなたが切れるスイッチは修正ではないと言っている。カーネルのパッチ案件として扱うべきで、Go の案件ではない — ただし先に Go サービスを棚卸しすること。リスナーを置いたのはそれらだからだ。

[`🔗 CVE-2026-98432 (cveawg)`](https://cveawg.mitre.org/api/cve/CVE-2026-98432) · [`🔗 解説：atlasum`](https://atlasum.net/blog/cve-2026-98432-linux-ipv4-tcp-uaf) · [`🔗 Go セキュリティチーム（oss-security）`](https://www.openwall.com/lists/oss-security/2026/10/30/1) · [`🔗 HN スレッド`](https://news.ycombinator.com/item?id=50319143)

---

## 2. Beta9 のサンドボックス脱出 3 件はすべて 9.9 — どれも起点は「ワークスペーストークンを持つテナント」

- **Velocity:** ▮▮▮ trending
- **Source:** JFrog CNA（cveawg）· レコード公開 2026-11-01 · 修正 2026-09-15
- **Tags:** `cve` `sandbox-escape` `multi-tenant` `kubernetes` `path-traversal` `ai-infra`

JFrog の CNA は 2026-11-01、サーバーレス GPU／コンテナ基盤 **beam-cloud/beta9** に対して 9.9 を三件公開した。ベクトルはすべて `AV:N/AC:L/PR:L/S:C/C:H/I:H/A:H` で、いずれも同じ一文を共有する。ワークスペーストークンを持つテナントがホストを取れる、という一文だ。`CVE-2026-120307` はサンドボックスのファイル API。`getHostPathFromContainerPath` はコンテナパスの残りを `filepath.Join` でマウント元へ結合するが、`filepath.Join` は**プレフィックス検査の後に親ディレクトリのセグメントを正規化する**ため、十分な長さの `..` の連続がワーカー上の任意の絶対パスを指す。アップロード、ダウンロード、stat、list、ファイル内検索、ファイル内置換、削除 — すべてがこの一つのヘルパーを呼ぶ。読み取り専用の検証では、このファイル API 経由でワーカー pod の **Kubernetes サービスアカウントトークン**を取得でき、同梱のリモートノード用マニフェストはそのアカウントを `cluster-admin` に束ねている。`CVE-2026-120308` はボリュームのアタッチ。その識別子がワークスペース所有のボリュームを指すかを検査せず、親ディレクトリのセグメントが結合パスをワーカーのファイルシステム根へ畳み、それが読み書き可能でサンドボックスにバインドマウントされる。`CVE-2026-120306` はイメージビルド。ワーカーは `BUILDAH_ISOLATION=chroot` を設定し `--isolation` を一切渡さないため、`RUN` 行は pod の PID・ネットワーク・IPC・ユーザー名前空間を保ったまま uid 0 と `CAP_DAC_OVERRIDE` で走る — そして `/proc/1/root` はワーカー自身のファイルシステムで、`runc`、`buildah`、サービスアカウントトークンが入っている。Clip v2 のレイヤビルドが既定なので、イメージビルド一回で到達できる。

修正は **worker 0.1.756 と gateway 0.1.776** — いずれも **2026-09-15T04:03–04:04Z** 公開で、レコードより **47 日早い**。内容はパッチというより構造の変更だ。サンドボックスのファイル操作とワークスペース同期は `os.OpenRoot` を使い、マウント検証は検査が存在する前に保存された stub にも適用され、Buildah のステップは私有の PID／IPC／ネットワーク名前空間を持つ OCI 分離へ移った。

**Why it matters:** *関数をデプロイできる*という意味のトークンが、三つの別経路で*ホストを読める*という意味のトークンだった。AI ワークロード向けのマルチテナントなビルド／サンドボックス基盤を運用しているなら、主役は**アップグレード**だ。最新のワーカーは既に 0.1.821 で、9 月のビルドに留まっている側は 47 日間の猶予があったのに、それを知らせる CVE は一つも出ていなかった。

[`🔗 CVE-2026-120307`](https://cveawg.mitre.org/api/cve/CVE-2026-120307) · [`🔗 CVE-2026-120308`](https://cveawg.mitre.org/api/cve/CVE-2026-120308) · [`🔗 CVE-2026-120306`](https://cveawg.mitre.org/api/cve/CVE-2026-120306) · [`🔗 修正：worker-0.1.756`](https://github.com/beam-cloud/beta9/releases/tag/worker-0.1.756)

---

## 3. Prefab は「信頼できないコードのための隔離」で Deno の権限を残していた — 10.0、しかもその信頼できないコードはモデルの出力

- **Velocity:** ▮▮▮ trending
- **Source:** JFrog CNA（cveawg）· 公開 2026-11-01 · prefab-ui 0.21.0 で修正（2026-10-26）
- **Tags:** `cve` `mcp` `sandbox-escape` `deno` `pyodide` `generative-ui`

`CVE-2026-120338` は今年のエージェント基盤問題を最も明快に言い表している。この機能は**信頼できないコード（LLM が書いた UI を含む）のための隔離として文書化されており**、しかも `--allow-read`、`--allow-write`、`--allow-net` で動いていた。Prefab UI の Generative UI サンドボックスは、呼び出し側が渡した Python を Deno サブプロセス内の Pyodide で実行する。**0.14.0 から 0.20.2** まで、ランチャーは Deno を無制限で起動し、Deno API を JavaScript のグローバルに残していた。Pyodide の `js` モジュールはそのグローバルを代理するので、Python から `Deno.readTextFileSync` と `Deno.writeTextFileSync` を直接呼べる — サーバーの OS ユーザーとして読み書きでき、サーバーの virtualenv の `site-packages` に `.pth` を書けば永続化もできる。典型的なリモート経路は FastMCP の GenerativeUI プロバイダで、`generate_prefab_ui` という MCP ツールを登録し、その `code` 引数をこのサンドボックスへ転送する。

CNA はスコアを一つではなく**シナリオ付きで二つ**出した。**10.0** は「GenerativeUI を有効化し、Deno を導入し、認証を設定していない FastMCP サーバー」（`PR:N`、`S:C`）、**9.9** は「ツール呼び出しを許可された認証済みクライアント」（`PR:L`、`S:C`）。NVD 側のコピーは 10.0 だけを載せている。修正は **0.21.0**（2026-10-26T19:00:11Z アップロード、レコードの 6 日前）。runner は**コードを受け取る前に** Deno の読み取り・書き込み・ネットワーク権限を取り消し、`--no-prompt` で起動して権限要求で取り戻せないようにし、ブートストラップ時のネットワークを `cdn.jsdelivr.net` に限定する — コミット `030f074`、PR 538。

**Why it matters:** 脅威モデルは文書に書かれていて、強制手段はフラグ一つ分だけそれから離れていた。いまの生成 UI スタックの多くがそうなっている。一つのレコードにシナリオ別スコアが二つ載るのは誠実な形でもある。この種の深刻度は、手前の MCP サーバーに認証があるかで完全に決まり、そして多くの場合それは無い。

[`🔗 CVE-2026-120338 (cveawg)`](https://cveawg.mitre.org/api/cve/CVE-2026-120338) · [`🔗 修正コミット 030f074`](https://github.com/PrefectHQ/prefab/commit/030f074f85e0b1be0dd44b0283185aecb26337a2) · [`🔗 PyPI の prefab-ui`](https://pypi.org/project/prefab-ui/)

---

## 4. DeepSeek が「スーパーエージェント」を公開 — 主張は*人の注意力をどれだけ使わないか*

- **Velocity:** ▮▮▮ trending
- **Source:** GitHub（作成 2026-10-31T09:32Z）· 6,848★ · 682 fork · MIT
- **Tags:** `agent` `deepseek` `harness` `architecture` `github-bot`

`deepseek-ai/dsh-superagent-prototype` は 2026-10-31 に現れ、リリースが一つも無いまま二日足らずで **6,848 スターと 682 fork** を集めた。単一の GitHub リポジトリ（任意で飛書＝Feishu も）を受け持つ能動型コーディングエージェントで、**DeepSeek Harness** のバンドルとして配布される。リポジトリを監視し、許可リストに載る人が作業を依頼すると作業項目を開き、独立したセッションとディレクトリで実行し、元の会話に答える — 通常は pull request として。README の自己規定は異例なほど率直だ。「**Research prototype for reference only, not an official DeepSeek product**」「much of the engineering done by coding agents」、そして「Some designs discussed in the article are directions for future development and are not implemented in this prototype.」

価値は設計にある。哲学の文書は規則を一つだけ立てる — 「Take as little human attention as possible, and give as much value as possible」— そこから挙動を導く。エージェントは依頼されたとき、またはチームが**文書で書いた規則**が許すときにだけ動き、誰も頼んでいない作業はまず*記録するだけ*のモードで始まる。アーキテクチャ文書は、Trigger・Thread・Decision・Ticket・Assignment の唯一の書き手である単一の `Engine` を説明し、内部を五つの部分（`Intake`、`Evals`、`Tickets`、`Assignments`、`Replies`）に分けて依存を一方向にする。呼び出し側は自分の役割の `Pick` しか受け取らない — `EngineForSources`、`EngineForExecutor`、`EngineForPeople`。認可はセッションではなくチケットに伴って移動する。

**Why it matters:** 多くのエージェント基盤は「一つのセッションが何をできるか」を最適化する。これは「一つのセッションが他人にいくらコストを払わせてよいか」を最適化している。周囲に出回っている規模の数字は、自らの結果を「indicative only」と断る設計記事が出所だ。判断すべきは、自分で読めるリポジトリのほうである。

[`🔗 deepseek-ai/dsh-superagent-prototype`](https://github.com/deepseek-ai/dsh-superagent-prototype) · [`🔗 docs/000-philosophy.md`](https://github.com/deepseek-ai/dsh-superagent-prototype/blob/main/docs/000-philosophy.md) · [`🔗 docs/007-architecture.md`](https://github.com/deepseek-ai/dsh-superagent-prototype/blob/main/docs/007-architecture.md) · [`🔗 設計記事（DeepSeek Harness）`](https://x.com/DeepSeekHarness/status/2116857257245987236)

---

## 5. t3code は「エージェントハーネスの操作面」— 37.5k スター、7 プロバイダ、安定版は一つ

- **Velocity:** ▮▮▮ trending
- **Source:** GitHub Trending · 本日 +3,100★ · v0.1.6 公開 2026-10-31T10:52Z
- **Tags:** `agent` `devtools` `electron` `mobile` `harness`

`pingdotgg/t3code` は **37,509 スター**、**本日 +3,100**。その README の書き出しは「We are very very early in this project. Expect bugs」であり、「We are (mostly) not accepting contributions yet.」でもある。正体は「エージェントハーネスの操作面」だ。サーバーと iOS・Android・Web・Electron のクライアントで、自分のマシンに既にあるエージェントを操作する。対応は **Claude Code、Codex、Cursor CLI、Grok Build、OpenCode、Google Antigravity、fx** の七つで、推論は売らないと明言する。「Works with your subscriptions.」参考文献として挙げる Codex デスクトップアプリ、Conductor、Claude Desktop、Cursor Glass は、そのまま競合上の主張でもある。

成果物の状態はスター数と切り離して読むべきだ。安定版は **v0.1.6（2026-10-31T10:52:24Z）**、npm `t3` の `latest` はその 1 分後の 10:53:56Z に **0.1.6**。それより上 — たとえば `v0.1.7-nightly.20261101.4035` — は nightly チャネルのプレリリースで、AUR と GitHub のリリースページが主に見せているのはこちらだ。MIT、TypeScript、作成 2026-02-08。

**Why it matters:** ハーネス層の集約はモデルより速い。ここの賭けは*ローカルエージェントの遠隔操作*であり、もう一つのホスト型 IDE ではない — あなたの購読、あなたのマシン、他人の UI。留保はメンテナ自身が書いている。0.1.6 で大きな機能は外部貢献を受け付けない以上、「本当にオープン」はまだプロセスについての約束ではなく、ライセンスについての約束だ。

[`🔗 pingdotgg/t3code`](https://github.com/pingdotgg/t3code) · [`🔗 v0.1.6 リリース`](https://github.com/pingdotgg/t3code/releases/tag/v0.1.6) · [`🔗 npm の t3`](https://www.npmjs.com/package/t3)

---

## 6. Apple、中国向け Apple Intelligence に Qwen 採用を確認 — 11 月 4 日に開発者ベータ、12 月に iOS 27.3

- **Velocity:** ▮▮▮ trending
- **Source:** 新華社 · 2026-10-31 発表 · 段階的に提供
- **Tags:** `apple` `alibaba` `qwen` `apple-intelligence` `china` `siri`

アリババと Apple は **2026-10-31**、中国のユーザー向け Apple Intelligence をアリババの **Qwen** モデルが支えると発表した。**11 月 4 日から**最新の iOS 開発者ベータでテストされ、**12 月に iOS 27.3** で正式提供される。Qwen は **Siri、Writing Tools、Visual Intelligence** を通じてテキストと画像の理解、および生成を担う。利用条件は、中国で購入した Apple Intelligence 対応 iPhone、または端末の位置情報と Apple アカウントの地域が**両方**中国に設定されていること。統合はオプトインで、有効にするか、何を共有するかは利用者が選ぶ。

データの扱いについて残すべき記述はこれだ。アリババは「ユーザーのリクエストや生成された応答をモデル学習には使わない」と述べた。報道によれば、12 月の更新には WWDC 2026 で示された作り直し版の「Siri AI」や、その他の次世代 Apple Intelligence 機能は**含まれない**。

**Why it matters:** 一流のグローバルハードウェア企業が、その市場で中国製 LLM をシステムレベルの AI 基盤として載せるのは初めてであり、実用的な情報は二つの日付だ。11 月 4 日は API 面が検証可能になる日、12 月は既存の端末が動く日。中国向け iOS に何かを届けるなら、「Compose with Qwen」と「Ask Qwen」は明確なリリース期限を持つ新しい統合先になる。

[`🔗 新華社 — アリババ／Qwen 提携`](https://english.news.cn/20261031/0642ddf499b643b1b8babd0b43adee85/c.html) · [`🔗 中国日報 — 12 月提供`](https://www.chinadaily.com.cn/a/202610/31/WS6ae54463e4b06d4aa0566359.html)

---

## 7. TextSeal2 は投機的デコーディングを越えて透かしを保つ — 同じ多様性で検出が 8〜22 ポイント増

- **Velocity:** ▮▮ rising
- **Source:** arXiv 2610.40613 · 投稿 2026-10-29 · コードは `facebookresearch/textseal`
- **Tags:** `research` `watermarking` `speculative-decoding` `llm` `provenance`

透かし方式には繰り返し現れる二つの失敗がある。出力の多様性を犠牲にすること、そしてドラフトモデルのトークンがターゲットモデルに受け入れられたり棄却されたりすると機能しなくなることだ。**TextSeal2** は両方に当たる。前作はコイントスで各トークンを二つの鍵のどちらかに割り当て、検出器は**どちらの鍵が使われたかを知らないまま**両方のスコアを平均していた — 信号が薄まる。TextSeal2 は二つ以上の鍵を一つの仮想鍵に統合し、ガウス copula で新しいノイズと結合する。著者によれば「任意の数の鍵、公開共有された鍵を含めて」この方法で統合でき、検出は薄まらない。

投機的デコーディングは、ドラフト競走の残りに対して走る**指数競走**を一つ追加して扱う。無記憶性によりこの競走はブロック検証を再現するので、出力は「follows the target model exactly」となり、棄却されたドラフトを置き換えるトークンも同じ鍵で透かしが入り、受理率も変わらない。三つの LLM で、同じ出力多様性のもと、誤検出率 10⁻³ において TextSeal より **8〜22 ポイント**多い 100 トークン回答を検出する。投機的デコーディング下では同じ受理率で、TextSeal と textGrain よりそれぞれ **18 と 22 ポイント**多い 200 トークン回答を検出する。

**Why it matters:** 「無歪み」はもともと検証すべき主張だった。ここでの本当の変化は、透かしがサンプリング方式だけでなく*推論最適化*の下でも生き残らないといけなくなったことだ — 配信スタックが一年かけて進んできた方向である。論文が報告するのは多様性の同等性であってその監査ではないので、「無料」を無料と扱う前に付録を見るべきだ。

[`🔗 arXiv 2610.40613 — TextSeal2`](https://arxiv.org/abs/2610.40613) · [`🔗 コード：facebookresearch/textseal`](https://github.com/facebookresearch/textseal)

---

## 8. VeriCUA はタスク検証を、審判の意見ではなく証拠集めとして扱う

- **Velocity:** ▮▮ rising
- **Source:** arXiv 2610.40578 · 投稿 2026-10-29 · 「Work in progress」
- **Tags:** `research` `agents` `computer-use` `verification` `evaluation`

コンピュータを使うエージェントの検証は、採点より難しい。安価な手法はどれも部分的な視界しか持たないからだ。VLM の審判は渡された観測に縛られ、生成された検査プログラムはハーネスが届く状態に依存する。**VeriCUA** は検証を**エージェント的探索**として捉え直す。検証器はまず利用可能な文脈を調べてタスクのルーブリックを作り、まだ解決していない要件に対して GUI かコードの検査を*選び*、明示的な証拠規則の下で知見を統合する。一つの手続きが、デスクトップ・モバイル・Web にわたるオンラインとオフラインの両設定に使える。

要旨は、両設定で参照ラベルとの一致がベースラインより改善し、「with the largest offline gains on hard cases」、オンラインでは偽の完了主張の棄却が強まったと報告する。ただし要旨に**数字は一つも無い**。引用できるのは方向であって大きさではない。

**Why it matters:** ルーブリックと証拠の組み合わせが単一の審判に勝つ理由は、人手のレビューと同じだ。そして狙っている失敗は下流のすべてを汚す失敗である — 偽の成功報告は正例の学習データになる。難しい事例に利得が集中するのは検証器として望ましい形だが、ベンチマーク別の表が出るまでは、測定された勝利ではなく真似する価値のある設計として扱うべきだ。

[`🔗 arXiv 2610.40578 — VeriCUA`](https://arxiv.org/abs/2610.40578) · [`🔗 全文（HTML）`](https://arxiv.org/html/2610.40578v1)

---

## 9. すべてのトークンに専用の教師を：トークン単位の監督でベースモデル比 +5.9

- **Velocity:** ▮▮ rising
- **Source:** arXiv 2610.40574 · 投稿 2026-10-29 · コードは GitHub
- **Tags:** `research` `distillation` `post-training` `rl` `qwen3`

オンポリシー自己蒸留は特権的な参照に条件付けられた教師を使う。既存手法は訓練全体で教師を固定するか、参照の露出を*回答間*でしか変えない。本論文はどちらも不十分だと主張する。教師の選好は**同じ回答の内部**でもトークンごとに変わりうるからだ。教師介入の予備実験がこれを支持し、トークンごとに好ましい教師を多数決と KL ベースの選択で同定できることを示す — これが **MTA-OPSD** の基礎で、候補教師のプールを持ち、各トークンが訓練中に好みの教師を選ぶ。

数学的推論タスクで Qwen3 系のモデルを用いた実験では、MTA-OPSD は既存の OPSD 手法を一貫して上回り、ベースモデルに対する平均利得は最大 **+5.9**。コードは `xingzhejun/MTA-OPSD`。

**Why it matters:** 持ち帰るべきはルータではなく測定のほうだ。教師の選好が*単一の完了の内部*で非単調だという事実は、「回答ごとに参照の強さを一つ選ぶ」あらゆる手法を揺るがす — そして多くの自己蒸留レシピがそれをしている。単一タスク族の穏やかな結果であり、信頼させるのはあの予備実験である。

[`🔗 arXiv 2610.40574 — MTA-OPSD`](https://arxiv.org/abs/2610.40574) · [`🔗 コード：xingzhejun/MTA-OPSD`](https://github.com/xingzhejun/MTA-OPSD)

---

## 10. Multi-View MoE：ルータを三つ、専門家の予算は同じ、+1.18 ポイント

- **Velocity:** ▮▮ rising
- **Source:** arXiv 2610.40577 · 投稿 2026-10-29 · 10B-A1B、708B トークン
- **Tags:** `research` `moe` `routing` `pretraining` `efficiency`

疎な MoE は一つのルータで専門家を選ぶ。本論文の出発点の測定は、全専門家を稠密に評価すると**単一ルータの順位と専門家効用の順位の一致が弱い**というもので、中層と深層で特に顕著だ。豊かな選択信号は通常コストを伴う。内部活性に基づく選択は事前計算を要し、複数の完全な表現を同じ専門家に通せばその計算を繰り返す。**Multi-View MoE** は代わりに、独立に初期化した複数のルータの sigmoid スコアを統合し、さらに選ばれた専門家ごとの*ルータ間の相対*スコアを再利用して学習された潜在ビューをその入力に混ぜる — 選好が選択と計算の両方に効き、選ばれた専門家は依然として前向き計算を一度だけ行う。

24 層・10B-A1B・708B トークンで訓練したモデルでは、完全な Multi-View MoE が九タスクの下流平均をベースライン比 **1.18 ポイント**改善する。Multi-Router だけでも **0.6** で、ルータスコアと専門家効用の順位相関を全体で **8.1%**、単一ルータの一致が最も低い層で約 **58%** 押し上げる。活性専門家数、専門家 FLOPs、all-to-all 通信量はいずれも変わらない。

**Why it matters:** 計算を買わずに品質を買うという、この軸では珍しい方向だ。引用すべきは 58% のほうで、利得は単一ルータが最も間違っていた場所に集中している。モデル一つ、トークン予算一つ、投稿時にコード無し — 設計の結果であって、まだ再現手順ではない。

[`🔗 arXiv 2610.40577 — Multi-View MoE`](https://arxiv.org/abs/2610.40577) · [`🔗 全文（HTML）`](https://arxiv.org/html/2610.40577v1)

---

## 11. JetBrains の ThinkRail は、他人のエージェントを包んだ agentic IDE

- **Velocity:** ▮▮ rising
- **Source:** GitHub（JetBrains incubator）· 6,941★ · 今週 +5,738 · Apache-2.0
- **Tags:** `ide` `jetbrains` `agents` `git-worktree` `typescript`

`JetBrains/thinkrail` は **2026-11-01** に **v0.4.0-nightly.2** を出し、**6,941 スター**、**今週 +5,738**。製品ラインではなく incubator プロジェクトだ。注目すべき設計判断は、モデルもエージェントも自前で持たないこと。`pi` コーディングエージェントを本物の IDE で包む — Monaco のタブ、ライブ git 付きのファイルツリー、分割可能なワークベンチ — そして工学の投資を隔離と記憶に置く。各リポジトリはプロジェクトになり、各タスクは**専用ブランチと作業ディレクトリを持つ `git worktree`** として切られるので、エージェントはあなたのチェックアウトに触れずに並行して動ける。完了した作業や休眠した作業は PR のマージ／クローズ時にプロジェクトごとの棚へ自動で「沈み」、その作業を再開すると戻ってくる。

持続するプロジェクト知識は「living specs」と再利用可能なスキルから来る。ロードマップは次の段階が拡張機能の全面サポートだと明言しており、ThinkRail が自分の働き方から必要なツールを作れるようになる。

**Why it matters:** JetBrains 自身の IDE が置き換え対象の incumbent であり、狙っている層は各ハーネスプロジェクトが争っている層でもある。`worktree`-per-task モデルが最も堅い部分だ。並行エージェントを UI の約束ではなく git の事実にする — ただし nightly のみで安定タグが無い段階では、採用リストではなく観察リストの話である。

[`🔗 JetBrains/thinkrail`](https://github.com/JetBrains/thinkrail) · [`🔗 thinkrail.ai`](https://thinkrail.ai/)

---

## 12. Mika は Android エージェントを*隠れたバックグラウンド画面*で動かす — App API 無し、サーバー無し、鍵は自分のもの

- **Velocity:** ▮▮ rising
- **Source:** GitHub · 3,738★ · v0.1.33 公開 2026-11-01 · Apache-2.0
- **Tags:** `android` `agent` `computer-use` `on-device` `privacy`

`wangzan101/Mika`（3,738 スター、作成 2026-10-29、Apache-2.0）は、人がやるようにアプリを操作する Android エージェントだ — 「looks at the screen and finds buttons」、**App API もアプリ別の統合も無し** — ただし**独立したバックグラウンド画面**で動くので、あなたがスマホを普通に使っている間にタップしスクロールできる。ペアリングは無線デバッグで一度だけ。見たいときはフローティングのカプセルでライブ表示を開く。デスクトップ級の内蔵ブラウザ、会話ごとの **arm64 Linux サンドボックス**（送ったファイルに対して Python、Node、shell を実行）、定時・条件付きタスクも備える。既定は **Ask モード**で、お金を使う場面だけ確認し、ログイン、確認コード、支払いはあなたに返す。

プライバシーの形が差別化点だ。「There is no Mika server」— API キーと記憶は端末上で暗号化され、会話と実行記録は端末に残り、更新確認は GitHub にしか接続しない。モデルのエンドポイントは自分で用意する（OpenAI 互換、Anthropic、Gemini のいずれか）。ChatGPT、xAI、OpenRouter のアカウントでサインインもできる。要件はアプリ操作が Android 12 以降（14 以降を推奨）、チャット・Web・ファイルは Android 11 以降。

**Why it matters:** オンデバイスのコンピュータ操作エージェントは、サーバー無しで出荷される可能性が最も高いカテゴリであり、このプロジェクトはトレードオフを明示している。第三者のアプリを自動操作することは「may break their terms of service」だ。バックグラウンド画面という仕掛けは、いま握っているスマホの上でエージェントを使えるものにする鍵であり、既定の Ask モードはそれを弁護可能にする側の半分だ。

[`🔗 wangzan101/Mika`](https://github.com/wangzan101/Mika) · [`🔗 v0.1.33 リリース`](https://github.com/wangzan101/Mika/releases/tag/v0.1.33)

---

## 13. `unslop` は「AI っぽさ」を先に名指しするデザインスキル

- **Velocity:** ▮▮ rising
- **Source:** GitHub · 4,711★ · 作成 2026-10-29 · CC-BY-4.0
- **Tags:** `skills` `claude-code` `design` `frontend` `codex`

`heydamir/unslop`（四日で 4,711 スター）は Claude Code と Codex 向けのスキルで、「vibecoded、AI が見てわかる UI」を「自分の性格を持つデザインされたインターフェース」に変える。README による方法は二段階だ。まず**スロップを名指しする** — 「the purple gradients, glows, emoji labels, shouty copy and uneven spacing」— 次にプロダクトから方向を定め、デザイナーが赤入れ（redline review）をするように画面をパスごとに直していく。Next.js、React、Vue、Svelte、Tailwind、素の HTML/CSS で動き、ダッシュボード、アプリ、ランディングページに対応する。リンク一つと Playwright／Chromium があれば**公開中のサイト**にも直接効く。

ライセンスは **CC-BY-4.0** — スキルにドキュメント用ライセンス — で、導入は `~/.claude/skills/` か `~/.agents/skills/` へのコピー。

**Why it matters:** デザイン系スキルはこれまで、スタイル一覧を添えたプロンプト集がほとんどだった。この一本の貢献は診断の段階にある。「この画面がなぜ生成っぽく見えるか」を列挙できるモデルにしか、やめるよう指示できない。製品に組み込む前に読むべきはライセンスで、CC-BY は表示を要求するもので、寛容なコードライセンスではない。

[`🔗 heydamir/unslop`](https://github.com/heydamir/unslop) · [`🔗 skills/unslop/SKILL.md`](https://github.com/heydamir/unslop/blob/main/skills/unslop/SKILL.md)

---

## 14. hop は Windows の隣に Linux を入れる。USB メモリは要らない

- **Velocity:** ▮▮ rising
- **Source:** GitHub · 1,155★ · v0.3.0 公開 2026-11-01T09:41Z · MIT
- **Tags:** `linux` `installer` `windows` `dual-boot` `uefi`

`Arjun-Ingole/hop`（1,155 スター、作成 2026-10-30、MIT）は Windows の実行ファイル一つで、Linux ディストリビューションを Windows の隣に入れる。ディストリを選び、バーをドラッグして容量を決め、インストールを押す。ISO は各プロジェクト**自身のサーバー**から取得し、プロジェクトがチェックサムを公開していれば**それを検証**する。手元のイメージを使うこともできる。面倒な部分は正面から扱われている。「Make room」は「空きはあると表示されるのに縮小を拒む」原因の移動不能ファイルを一クリックで片づけ、引き継ぎ時にはディストリ側インストーラで何を選ぶべきかを列挙する。

対応は elementary OS、Ubuntu と各フレーバー、Linux Mint、Pop!_OS、Zorin、Debian、Fedora Workstation、Ultramarine、CachyOS、Arch、Omarchy。要件は Windows 10（1803 以降）または 11、UEFI と GPT ディスクで、Linux は USB ではなく本体内のディスクに置く必要がある。Kubuntu が非対応なのには具体的な理由がある — 「its ISO has a file too big for FAT32」。いくつかのディストリは Secure Boot を切る必要があり、**Omarchy はさらに BitLocker を一時停止ではなく完全に無効にすることを要求**する。hop はそれを代行しない。

**Why it matters:** デュアルブートの導入は、人が Windows を失うまさにその工程だ。ここでの設計は、不可逆な判断をすべて「安全に失敗できる」検査の後ろへ移し、きれいに巻き戻せるようにすることにある。実行しない場合でも、ディストリ別の注意表は読む価値がある — インストーラが何を前提にしているかの、珍しく率直な地図だ。

[`🔗 Arjun-Ingole/hop`](https://github.com/Arjun-Ingole/hop) · [`🔗 v0.3.0 リリース`](https://github.com/Arjun-Ingole/hop/releases/tag/v0.3.0)

---

## 15. 王国の涙を静的再コンパイルでネイティブ x86-64 に — 3,090 スターと「自分のゲームファイルを持ち込む」規約

- **Velocity:** ▮ steady
- **Source:** GitHub · 3,090★ · v0.3.1 公開 2026-11-01 · MIT
- **Tags:** `recompilation` `nintendo` `vulkan` `reverse-engineering` `gaming`

`valentderah/totk-pc-recomp`（2026-10-29 以降 3,090 スター、MIT、v0.3.1 は 2026-11-01）は『ゼルダの伝説 ティアーズ オブ ザ キングダム』の**静的再コンパイル**で、Vulkan レンダラ付きの Windows／Linux x86-64 ネイティブアプリにする — エミュレータではない。README の機能一覧の一行目がそう書いている。ゲーム更新 1.1.0、1.2.1、1.4.3 に対応しセーブは相互に引き継げる。既定 60 fps、実験的に最大 144 fps、HDR10、21:9 と 32:9（カメラと UI もその形状に合わせる）、シェーダはプレイ中ではなくインストール時に準備、エミュレータ向け mod（RomFS、TKMM のマージ出力、`.ips`／`.pchtxt` のコードパッチ）と Atmosphère のチートにも対応する。

法的な形は最初に明示される。「**No game files are included.**」自分で吸い出した正規のコピーを用意し、セットアップがマシン上でビルドする — 「the result contains the game. It is for your own use. Do not share it.」状態は「early development. The game is playable on Windows and Linux; visual bugs and crashes are still expected.」

**Why it matters:** 静的再コンパイルは、実行時の命令単位変換を避けられるため、この世代でエミュレーションに静かに取って代わりつつある。生成されるネイティブバイナリでは、実際の作業の重心が GPU 経路（Vulkan 1.3 と `VK_EXT_external_memory_host`）にある。もう半分は配布モデルだ。誰も共有できないバイナリではなく、ビルド手順と法的な境界線を配る。

[`🔗 valentderah/totk-pc-recomp`](https://github.com/valentderah/totk-pc-recomp) · [`🔗 v0.3.1 リリース`](https://github.com/valentderah/totk-pc-recomp/releases/tag/v0.3.1)

---

## 16. Handy が再びトレンドに。36k スター、最新リリースは 10 月 3 日

- **Velocity:** ▮ steady
- **Source:** GitHub Trending · 本日 +383★ · 36,402★ · v0.9.8（2026-10-03）
- **Tags:** `speech-to-text` `offline` `whisper` `whisper-cpp` `privacy`

`cjpais/Handy` は本日 **+383 スター**、合計 **36,402**。完全オフラインの音声入力アプリで、ショートカットを押して話すと、フォーカスのある入力欄にテキストが貼り付く。すべて端末内で完結する。無音は **Silero VAD** で除去し、転写は **Whisper Small/Medium/Turbo/Large**（GPU があれば高速化）か **Parakeet V3**（CPU 最適化、言語自動判定）を選べる。Windows、macOS、Linux。MIT。

ここでの引き金はリリースではなく注目だ。最新タグは **v0.9.8（2026-10-03）** で、直前は 2026-09-18 と 2026-08-24 — おおよそ月次で、今週は動いていない。Homebrew と winget のパッケージは存在するが、README はそれらが「are not maintained by the Handy developers」であると注記している。

**Why it matters:** ローカル音声入力は、多くの利用者にとってオンデバイスが明確に優る数少ない AI 機能だ — 遅延、コスト、プライバシーが同じ方向を向く — そしてクラウド経路を持たない 36k スターのプロジェクトは、モデルが十分になった証拠である。スター数は関心として、リリース日は状態として引用すること。今週出たものは無い。

[`🔗 cjpais/Handy`](https://github.com/cjpais/Handy) · [`🔗 handy.computer`](https://handy.computer)

---

## 17. Calegari、Tao のブログに寄稿：「Evaluate all work as if it is AI-assisted」

- **Velocity:** ▮ steady
- **Source:** Terence Tao のブログ（Frank Calegari によるゲスト記事）· 2026-11-01 · HN 72 pts
- **Tags:** `mathematics` `ai-research` `incentives` `publishing` `lean`

**Frank Calegari** が Terence Tao のブログに書いたゲスト記事で、著者は Tao ではない。数学は一線を越えたが、この分野のインセンティブはそうなっていない、という主張だ。引き金は 10 月 6 日の OpenAI による 700 本超の論文公開。記事の応答は「この分野は終わった」でも「何も変わっていない」でもなく、**探索的で学際的な作業のコストが下がった**のだから、価値は既知の予想を証明することから、価値ある問題を選ぶこと、大きなプログラムを組むこと、つながりを説明することへ移るべきだ、というものだ。

提案は六つ。「Evaluate all work as if it is AI-assisted」「Make hiring much more about personal interactions rather than a paper file」「Demand more from journals, and abandon those that do not adapt」「Put a greater emphasis on breadth in graduate education, but do not abandon technical skills」「Give better seminars」「Take more ownership of the results of AI」。最も鋭い一行は自分たち上の世代に向く。「If you, as a senior mathematician, are stressed about being scooped by AI, then you are not being ambitious enough.」さらに「a significant proportion of papers posted to the arXiv should not be published anywhere」と述べ、より少なく、より良く、適切な箇所では Lean 検証を、と主張する。

**Why it matters:** 提案は技術ではなく制度に向いているからこそ使える。「evaluate all work as if it is AI-assisted」は学科が今日採用できる方針であり、傍らに置かれた歴史的参照 — 1972 年に Gorenstein が分類プログラムを宣言し、1983 年に分類が完成し、quasithin の場合がさらに約 20 年を要した — は、解決した問題の数で分野を測ることへの反論になっている。

[`🔗 Mathematics has changed. Let's act like it`](https://terrytao.wordpress.com/2026/11/01/mathematics-has-changed-lets-act-like-it/) · [`🔗 HN スレッド`](https://news.ycombinator.com/item?id=50328251)

---

## 18. AJ-Report はハードコードされた JWT 秘密鍵で共有トークンを署名する — 一つのレコードに 9.3 と 9.8

- **Velocity:** ▮ steady
- **Source:** VulnCheck CNA（cveawg）· 予約 2026-10-31T11:44Z · 公開 2026-10-31T17:25Z
- **Tags:** `cve` `hardcoded-secret` `jwt` `rce` `groovy`

`CVE-2026-120209` は、AJ-Report **1.7.1 まで**が共有トークンを**ハードコードされた JWT 秘密鍵**で署名している、というもの。攻撃者はサーバーと一切やり取りせずに有効な `Share-Token` を偽造できる。`reportCode` を `dataSet` にしたトークンを鋳造し `testTransform` エンドポイントへ到達すると、リクエスト内のスクリプトが **`GroovyClassLoader`** に渡る — 認証不要のリモートコード実行であり、偽造の段階はオフラインで完結する。リポジトリは Gitee（`anji-plus/report`）にあり、レコードは鍵をハードコードしている `JwtUtil.java` を参照している。

採点はこのレターの来歴規則を無料で実演している。同じレコード、同じ CNA が **CVSS 4.0 の 9.3** と **CVSS 3.1 の 9.8** を併記しており、この差はフレームワークのものなのであって、二者の見解の相違ではない。影響範囲は `version: "0"` から `≤ 1.7.1`、`defaultStatus: unaffected` — この開いた下限は「空の最小値」であって「全履歴」ではない。

**Why it matters:** 誰でも生成できる署名は認証の見せかけであり、その背後のエンドポイントが偽の身元をコード実行に変える — 今週の他の三件と同じ形だ。二つのスコアは捨てるべき習慣のほうだ。数字を引用するときはバージョンを添えること。同じページの 9.3 と 9.8 は、同じ評価が二度書かれたものだから。

[`🔗 CVE-2026-120209 (cveawg)`](https://cveawg.mitre.org/api/cve/CVE-2026-120209) · [`🔗 VulnCheck アドバイザリ`](https://www.vulncheck.com/advisories/aj-report-through-1.7.1-authentication-bypass-leading-to-rce-via-share-token) · [`🔗 JwtUtil.java（Gitee）`](https://gitee.com/belief-team/report/blob/V1.7.1/report-core/src/main/java/com/anjiplus/template/gaea/business/util/JwtUtil.java)

---

---

## 19. HackerBooks は 27 万 334 件の HN 書籍言及を Claude でラベリングし、自分自身の一致率 85% を公開している

- **Velocity:** ▮▮▮ trending
- **Source:** Hacker News（Show HN）· 1,054 pts · 約 12 時間前（約 23:58 UTC+8）
- **Tags:** `hacker-news` `dataset` `llm-labeling` `books` `affiliate`

Hacker Books は Hacker News のコメントで推薦された書籍を検索できる索引で、自身の `data/meta.json`（**2026-11-02** 生成）がコーパスを曖昧にせず数字で示している。本バッチで読んだ時点では**書籍 15,362 冊、言及 270,334 件、コメント 217,954 件、コメント者 56,456 人**、期間は **2007 年から 2026 年**。書誌情報と表紙は Open Library から取得し、各書籍ページは元のスレッドへリンクを戻す。このファイルは再ビルドのたびに新しい内容ハッシュで作り直されるため、現在のビルドは **15,766 冊・281,363 件** を返す —— 総数は定数ではなくスナップショットだ。事前生成のトップリストは **600 冊**、書籍単位のデータセットは CSV で取得できる。

読む価値があるのは「推薦」の定義のほうだ。言及回数だけを数えると、みなが*警告している*本が好かれている本のように上位へ来る。そこで**すべての言及に Claude Sonnet 5.5 が** *recommend*、*neutral*、*critical*、*not about the book* のラベルを付けた。同名の映画やゲームへの言及は落としている。About ページはその検証も書いている。ラベルを Claude Opus 5.5 と 400 件の言及で突き合わせ、一致率は **85%**、ページ自身も「ノイズは覚悟してほしい」と添える。キーワード規則、感情スコア、TF-IDF 分類器も先に試したが精度は低かった。ランキングは生の言及数より**異なるコメント者の数**を重く見るので、一人の熱狂的な読者だけでは本を押し上げられない。

これはビジネスでもあり、コードにそう書いてある。アフィリエイトの対応表は `{ bookshop: '130774', amazon: 'roansh-20' }` で、About には手数料が「ホスティング費用を賄う」とある。Andrej Karpathy の HackerTube を着想元として挙げ、「Y Combinator と Hacker News とは無関係」と明記している。

**Why it matters:** LLM で作ったコーパスがモデル間の一致率まで公表しているのは、ほとんどの「AI 検索」製品より良い成果物だ。そして持ち帰るべき数字は **85%** で、「N 人が推薦」という主張すべての天井になる。二日連続で HN アーカイブを消費する製品が出たことも傾向だ。19 年分のコメントは原材料になり、索引されるのは HN の API ではなく第三者のミラーである。

[`🔗 hackerbooks.org`](https://hackerbooks.org) · [`🔗 hackerbooks data/meta.json`](https://hackerbooks.org/data/meta.99d6a8ef.json) · [`🔗 HN スレッド`](https://news.ycombinator.com/item?id=50326821)

---

## 20. Postgres 19 の遅れは LLM が 40 年分のバグを見つけられるようにしたため — バックパッチは 74% 増

- **Velocity:** ▮▮▮ trending
- **Source:** Robert Haas のブログ · HN 154 pts · 約 27 時間前（約 09:38 UTC+8）· 原文は neon.com
- **Tags:** `postgresql` `maintenance` `llm-bug-hunting` `release-engineering`

PostgreSQL コミッターで Databricks のシニアスタッフエンジニアである Robert Haas は、**PostgreSQL 19 はおそらく 11 月まで出ない**と書く。10 年間守ってきた 9 月中旬から 10 月中旬という窓を外すのは初めてで、しかも大きな機能が三つ、ベータ後期に撤回された。`UPDATE/DELETE FOR PORTION OF`、SQL/PGQ、`ALTER TABLE … MERGE/SPLIT PARTITION` で、いずれも **8 月 27 日から 9 月 15 日**の間のことだ。「何が起きたのか」への彼の答えはプロセスの変化ではなく計測値である。

4 月 8 日から 9 月 25 日までの `master` へのコミットは 2026 年が **1,443**、2025 年が **1,037**。ただし Haas は、期間の差を補正すればこれは*わずかな減少*だと指摘する。跳ねているのは下流だ。`REL_19_STABLE` へのコミットは **724 → 1,169**（60% 超）、少なくとも一つ前のリリースへのバックパッチは **248 → 433**（+74%）。彼の読みはこうだ。コミッターの保守性は昨年とほぼ同じだが、「彼らが犯した誤りの多くが LLM によって素早く見つかった」。

遅れは LLM が助けにならない二つの工程から来ている。レビューでは、起草された修正が「常に正しいわけでも PostgreSQL の基準に適合するわけでもない」。そしてリリースに向くはずの時間がバックブランチの対応に奪われたこと — それが撤回をあれほど遅らせた。Haas は遅れ自体は心配していないと明言し、未解決の問いを置く。「人間には見つけられず LLM なら容易に見つけられるバグが 40 年分あるとして、我々はどうやって追いつくのか」。

**Why it matters:** 主要データベースが「LLM によるバグ探索の時代」にリリース日を付けた最初の例であり、持ち帰る数字は見出しの遅れではなくバックブランチの **+74%** だ。リリース暦を見ない監査者が、成熟したコードからどれだけの潜在欠陥を掘り起こせるかの代理指標になる。長期運用のコードベースは同じ請求書を想定すべきで、それはパッチの量ではなくレビュー負荷として届く。

[`🔗 Postgres 19 is late, and it's AI's fault`](https://rhaas.blogspot.com/2026/10/postgres-19-is-late-and-its-ais-fault.html) · [`🔗 neon.com 原文`](https://neon.com/blog/postgres-19-is-late-and-its-ais-fault) · [`🔗 HN スレッド`](https://news.ycombinator.com/item?id=50312408)

---

## 21. OmniDiff v0.3.0 は PDF もフォントも画像も「Binary files differ」で済ませずに diff する — テストセットの薄い箇所も明記する

- **Velocity:** ▮▮ rising
- **Source:** Show HN · 185 pts · v0.3.0 公開 2026-11-01T10:58Z · 421★
- **Tags:** `rust` `diff` `dev-tools` `tree-sitter` `terminal`

`ivankovic/omnidiff` は AGPL-3.0 の diff ツールで、比べる前に対象を判定する。コードは tree-sitter の文法（ビルド時に C からコンパイル）を通し、画像、カーソル、フォント、アーカイブ、メッセージカタログ、PDF はそれぞれ内容に即した比較になる。`git diff` の「バイナリファイルが異なります」の一行の代わりだ。**v0.3.0** は **2026-11-01T10:58Z** に公開され、これを文字列の内側まで広げた。JSON の `"content"` の隣の `"path"` が `.tsx` を指していればその TSX、YAML の `run:` ブロックの中のシェル、テンプレートリテラルの中の CSS/HTML を、保持された文字列の中の変更としてその位置に表示する。最初の変更から最後の変更までを一続きで塗ることはしない。画像は知覚的に比較するので再エンコードは変更にならない。TUI は kitty、sixel、iTerm2 では実ピクセルを描き、それ以外では半ブロック文字で描く。

README の表が肝で、主張を分けている。コード変更の **99.95%** は diff でき、**98.8%** は内容依存のアルゴリズムに到達する。コード行は 98% が 100 ms 未満、**70%** が完全一致、92% がほぼ一致。PDF は 100% 完全一致だが 100 ms 未満は **57%** だけで、README 自身が PDF は「判定ケースが 10 件未満」と書いている。速度は 1 台（i7-1370P、32 GB）での計測。導入は `cargo install`、Homebrew、署名付き apt リポジトリ、Nix。

**Why it matters:** 行 diff は 1970 年代のモデルを、行ではない成果物に当てたものだ。ここでの工学的価値は*非対称性*にある。片側はより重く型を意識した比較をしつつ、`git` の外部 diff として動かなければならない。割合は判定サンプルの数として読むべきで、網羅率ではない。PDF 全一致の行は 10 件未満のケースに支えられている。

[`🔗 ivankovic/omnidiff`](https://github.com/ivankovic/omnidiff) · [`🔗 v0.3.0 リリース`](https://github.com/ivankovic/omnidiff/releases/tag/v0.3.0) · [`🔗 HN スレッド`](https://news.ycombinator.com/item?id=50325253)

---

## 22. Gitea は 111 秒で CVE レコードを 20 件公開した — そのどれにも誰のスコアも付いていない

- **Velocity:** ▮▮ rising
- **Source:** Gitea CNA（cveawg）· 2026-11-01T09:47:07–09:48:58Z · 28.3.0 で修正
- **Tags:** `cve` `gitea` `token-scope` `ci` `supply-chain`

Gitea CNA は 2026-11-01 の **111 秒**で **20 件**を公開した。影響範囲はいずれも `{version: "0", lessThan: "28.3.0"}`（うち 4 件は下限が 1.19.0 / 1.23.0 / 1.27.0）で、**20 件すべてがどのコンテナにも CVSS 指標を持たない**。Gitea のものでも CISA-ADP のものでもない。NVD は 20 件すべてを `Deferred` とし、NVD 自身の `published` は **10:18:33–10:18:37Z** で、CNA の時計より 30 分遅い。本レターが繰り返し遭遇してきた二つの時計である。

内容は薄くない。この一群の中心は**トークンスコープ**が効いていないことだ。`CWE-863`（認可の不備）が 6 回、`CWE-200` が 4 回、`CWE-862` が 4 回。目立つのは次の四件。**`CVE-2026-118386`** — PR レビューの `commit_id` がレビュアー自身のコミットを指すと、`pull_request_review` ワークフローがそのコミットで、承認なしに、「リポジトリの secret と書き込み可能なトークンを伴って」実行された。Gitea は報告者として **Anthropic** を挙げている。**`CVE-2026-117635`** — `public-only` のパーソナルアクセストークンが `/api/v1/admin` で制限されず、サイト管理者の制限付きトークンが全ユーザーのメールアドレスを列挙し、非公開組織と新しい管理者を作れた。**`CVE-2026-119441`** — `DELETE /api/v1/orgs/{org}/repos` が public-only トークンを受け付け、非公開リポジトリを削除した。**`CVE-2026-120263`** — `ACCOUNT_LINKING = auto` で、OAuth2 サインインが既存アカウントをユーザー名やメールで乗っ取れた。リリースノートは CVE を **21** 件、マージ済み PR を **60** 件挙げる。21 件目の `CVE-2026-111943` は Go 1.27.3 で再ビルドし中間証明書の一群を信頼しなくなったもので、Gitea の割り当てではない。

スコアについては、このプロジェクト自身の履歴が素直な読みを正す。NVD が既に持つ Gitea 割り当ての **128** 件のうち **120** 件は CVSS 指標を持つが、**101** 件は **CISA-ADP** の enrichment だけで、Gitea 自身が書いたスコアを持つのは **15** 件にすぎない。したがってこの 20 件に現れる数字は、まず CISA のもので、後から届く。「スコアなし」はここでは二つのコンテナがまだ埋まっていない時点のスナップショットであって、方針ではない。

**Why it matters:** フォージは、スコープの足りないトークンがサプライチェーンの原語になる唯一の場所だ。すべての非公開リポジトリを列挙できるジョブトークン、リポジトリの secret で攻撃者の選んだコードを走らせるレビューworkflow。そして来歴の規則はここでは通常と逆向きに効く。この CNA は*スコアを付ける*ので、不在は遅延である。「まだ指標が公開されていない」と書くべきで、「設計上スコアなし」と書いてはいけない。

[`🔗 CVE-2026-112887 (cveawg)`](https://cveawg.mitre.org/api/cve/CVE-2026-112887) · [`🔗 Gitea 28.3.0 リリースノート`](https://blog.gitea.com/release-of-28.3.0/) · [`🔗 GHSA-8r36-6j2c-3gmv`](https://github.com/go-gitea/gitea/security/advisories/GHSA-8r36-6j2c-3gmv)

---

## 23. Apache Wicket は 46 分で 19 件を公開した — 最大 8.3、そして修正は終了した二つの最終リリースにある

- **Velocity:** ▮▮ rising
- **Source:** Apache CNA（cveawg）· 2026-11-01T21:42–22:28Z · NVD ステータス `Received`
- **Tags:** `cve` `java` `wicket` `xss` `missing-authorization`

2026-11-01 の **21:42:45Z から 22:28:35Z** の間に Apache Wicket のレコードが 19 件公開された。すべて **CVSS 4.0 のみ**、`security@apache.org` による割り当てで、いずれも NVD では `Received` のままで **`nvd@nist.gov` の指標を持たない**。つまりページ上のスコアは CNA のもので、そのまま再供給されている。上限は **8.3** が二件。`CVE-2026-83594`（`CWE-789`）は `FileUploadToResourceField` がクライアントの Ajax コールバックで主張したサイズのままメモリを確保する。`CVE-2026-84170`（`CWE-770`）は単体アップロードリソースが設定済みの上限を適用しない。続いて **7.6 が三件**、**7.4 が三件**が XSS とエスケープ（`CWE-79` は一群で 5 回、7.4 の一つは `CWE-116` で、`JavaScriptUtils#escapeQuotes` が引用符は逃がすがバックスラッシュは逃がさない）、**6.9 が二件**、**6.3 が四件**が認可の欠落とパッケージリソースの漏えい、末尾が 2.3 三件と 2.1。

一覧より価値があるのは二点。第一に、プロジェクトの定性ラベルとスコアは連動していない。この一群には **moderate が 9、important が 6、low が 1**、ラベルなしが 3 件あり、**7.4** が *moderate*、**6.9** が *important* と付く。ラベルは語で、スコアは算術であり、同じ評価ではない。第二に、誰がパッチを当てられるかは範囲が決める。範囲は **10.11.0**、**9.24.0**、**8.19.0** で止まるので、修正を含む成果物は **10.12.0**（2026-10-31）、そして 9.x や 8.x の分岐を挙げているレコードについては **9.25.0** と **8.20.0**。後二者は 2026-10-29 に公開された各系列の**最終**リリースだ。Wicket 9 の告知は「9.x のリリースは今後ない、セキュリティ修正であっても」と書いている。

**Why it matters:** Wicket 8 や 9 に残っている人にとって、修正済みの版は今後永遠に存在する最後のものになる。したがって移行先は 9.25.0 ではなく 10 LTS だ。これはリリースノートの問題でもある。10.12.0 の投稿には 13 件の変更履歴があるが、この修正に触れているのは 1 件（`WICKET-7205`、CSP の件）だけであり、リリースノートを読んで更新を判断する人には日常的なバグ修正リリースに見える。

[`🔗 CVE-2026-83594 (cveawg)`](https://cveawg.mitre.org/api/cve/CVE-2026-83594) · [`🔗 Wicket 10.12.0 リリース`](https://wicket.apache.org/news/2026/10/31/wicket-10.12.0-released.html) · [`🔗 Wicket 9.25.0 — 終端`](https://wicket.apache.org/news/2026/10/29/wicket-9.25.0-released.html)

---

## 24. OccupySaaS はベンダー抜きで SaaS を作り直したい — 一方のリポジトリは OpenID 認証を取得し、もう一方は通過したマイルストーンがない

- **Velocity:** ▮▮ rising
- **Source:** Hacker News · 124 pts · 約 4 時間前（約 08:17 UTC+8）
- **Tags:** `open-source` `clean-room` `auth0` `salesforce` `licensing`

「OccupySaaS」はリポジトリを伴う抗議運動だ。解雇されたエンジニアたちが、Apache-2.0 で、「我々の業界を我々に貸し戻すプラットフォームに対する、クリーンルームでオープンソースのドロップイン代替」を作る。スローガンは 100 万人のエンジニア。今日の実体は**二つのリポジトリ**である。

`occupysaas/zeroauthy`（24★、2026-10-14 作成）が本物のほうだ。**Auth0 の Authentication API と Management API** を話すアイデンティティサーバーで、既存の Auth0 SDK を zeroauthy のテナントに向ければコード変更なしに動く。マルチテナントのディスカバリ、JWKS、`client_credentials`、認可コード + PKCE、ローテーションするリフレッシュトークン、PAR、デバイスフロー、`/v2/logout`、そしてアプリケーション、API、クライアントグラント、データベース接続を扱う Management API。**commit `38b4229`、2026 年 10 月 18 日**に **OpenID Foundation** の Basic OP、Config OP、Form Post OP の各プロファイルで OpenID Connect Provider として**認証されている**。しかもこれは検証できる。openid.net の認証プロバイダ表に「zeroauthy (commit 38b4229)」が載っている。

`occupysaas/salescompel`（21★、最終 push 2026-10-21）は主張のもう半分で、Go/PostgreSQL による Salesforce 代替だ。README は現在地について異例に正直である。M0 から M10 までの 11 のマイルストーン、プレビュー編集は「メモリ内に留まりバックエンドを呼ばない」初期の Vue プロトタイプ、そして「完全なプログラムのマイルストーンで出口ゲートを通過した記録はまだない」という一文。草案の見積もりは「M9 までにおよそ 185〜350 計画等価」、生産認証（M9）は「未達」。これが 24 スターのリポジトリの隣に置かれた約束の規模だ。

**Why it matters:** OpenID 認証がこれを宣言文と区別する。適合性テストスイートを通るアイデンティティサーバーは検証可能な主張であり、Auth0 のドロップイン代替は企業の料金ページの変化を生き延びる種類のものだ。Salesforce 側はこの運動の実際の単位を示している。一度に一モジュール、そして何を原版から読んでよいかをクリーンルーム文書が定める。丸ごとの置き換えではない。

[`🔗 occupysaas.com`](https://occupysaas.com/) · [`🔗 occupysaas/zeroauthy`](https://github.com/occupysaas/zeroauthy) · [`🔗 OpenID 認証プロバイダ`](https://openid.net/certification/certified-openid-providers-profiles/) · [`🔗 HN スレッド`](https://news.ycombinator.com/item?id=50331402)

---

## 25. nibnib は 1 ピクセル 6 サイクルで解けるように作られた画像形式 — エンコーダは桁違いに遅く、ベンチマークはまだ無い

- **Velocity:** ▮▮ rising
- **Source:** Hacker News · 111 pts · 約 3 日前（約 12:17 UTC+8）· 79★
- **Tags:** `image-codec` `rust` `embedded` `rp2350` `format-design`

`raphlinus/nibnib` は **RP2350** マイコンでの DVI 出力という問いから生まれた。予算はおよそ**1 ピクセル 6 サイクル**。フェッチ一回、パレット参照一回、ストア一回で使い切る。出来上がった形式は、色ではなく**差分**をパレットに持つ。直前の復号ピクセルを倍にし（`(pix >> 16) * 0x10001`）、1 バイトで 32 ビットのパレット項目を引き、それを足す。これで入力 1 バイトから **RGB565 の 2 ピクセル**、つまり **4bpp** になり、下位 16 ビットが左のピクセルだ。内側のループは Rust で 5 行しかない。

差分ベースであることが通常のパレット画像に勝る理由でもある。平坦部は滑らかなままで、パレットが絶対色ではなく小さな変化を持つからだ。エンコーダは*両方*のピクセルの誤差が最小になるよう Floyd–Steinberg の重みで項目を選ぶ。エンコーダはデコーダより「桁違いに遅い」が、README はこれを非対称形式の正常な形として扱う。やっていないことも並ぶ。パレットは小さな差分の立方体とガウス乱数の組で固定され、**画像に応じて適応的に選ばれない**。貪欲探索は鋭いエッジの右側にアーティファクトを引きずる。往復走査とより深い探索はデコーダを変えずに済む将来課題。コンテナは幅 2 バイト、高さ 2 バイト、256 個のパレット項目、その後に行が続くだけでメタデータは無い。リポジトリは **2026-10-30** 作成、以後コミットなし、MIT/Apache-2.0。

**Why it matters:** 1 ピクセル約 6 サイクルでは汎用コーデックは収まらない。この予算に入る唯一の方法は復号を極端に簡単にし、コストをすべてデバイス上では決して走らない探索に押し込むことだ。これは製品ではなく設計ノートとして読むべきで、README に符号化・復号のベンチマークは無くリリースも無い。持ち帰る数字は、設計時に想定したサイクル予算である。

[`🔗 raphlinus/nibnib`](https://github.com/raphlinus/nibnib) · [`🔗 HN スレッド`](https://news.ycombinator.com/item?id=50299811)

---

## 26. A2UI はモデルに JSON を書かせるのをやめた — Express は「最大 3 倍」、計測は 1 モデル・51 タスク

- **Velocity:** ▮ steady
- **Source:** Google Developers Blog · 2026-10-27 · a2ui-agent-sdk 0.9.0
- **Tags:** `generative-ui` `agents` `a2ui` `sdk` `inference-format`

A2UI は Google の生成 UI プロトコルだ。クライアントがコンポーネントのカタログを契約として提示し、エージェントがそれで組んだ画面を記述するメッセージを送り、クライアントが描画する。当初の束縛はモデルにその JSON を直接書かせるもので、波括弧も入れ子要素もすべて書かせた。チームはこれが「A2UI を LLM に結びつけてしまった」と認めている。今回のリリースは**推論フォーマットを差し替え可能**にし、**A2UI Express** を既定にした。1 行 1 文の Python 風構文、位置引数はカタログの schema 順に写像され、`_` はスロットの飛ばし、`$/title` はデータモデルへの束縛、`Event("accept")` はサーバーアクションを宣言する。これを SDK の決定的なコードが検証済みの A2UI メッセージへコンパイルする。

主張は上限であり、記事もそう書く。Direct JSON 比で**最大 3 倍**低いレイテンシ、**最大 3 倍**少ないトークン。四つの形式（Direct JSON、Express、Atom、Elemental）を**同一の 51 タスク評価、同一の gemini-3.5-flash** で、thinking のオンとオフを両方走らせた結果だ。Express は Python（`a2ui-agent-sdk` 0.9.0）、TypeScript（`@a2ui/agent` 0.0.1）、Dart（`a2ui_agent` 0.0.1-wip004）で利用できる。二つ目の経路は **System One の意思決定モデル**を差し込む。TypeSafe の Jev が約 100〜300 ms で較正済み確率つきの型付き質問に答え、コードが木を組み、小さなモデルは文章だけを書く。11 プロンプトの 1 回の実行では、木が **92〜298 ms** で画面に出て、画面全体が 0.8〜1.7 秒で完成し、11 件すべてが妥当な A2UI だった。記事はこれを「サンプルが小さいので最初の一瞥」と位置づける。

二つの制約は隠さず書かれている。制御生成は「その文法が記述するレイアウトしか作れない」（Apparite の文法は 9 種類の画面原型と 12 ブロックを覆う）。そして Python/TypeScript SDK は **Direct JSON をチャンクごとにストリームするが、Express は完全な応答を受け取ってからコンパイルする**。トークンの利得は初回描画と引き換えになる。

**Why it matters:** モデルとレンダラの間の層こそ、生成 UI のレイテンシが実際に住む場所だ。それを「モデルが木を書く」から「モデルが小さなプログラムを書き、SDK コードがその木にコンパイルする」へ移すのは、ツール呼び出しを信頼できるものにしたのと同じ手だ。「最大 3 倍」は 1 モデルでの 1 回の評価として読み、採用前にストリームの非対称性を確認すること。

[`🔗 Fast, reliable A2UI, with swappable inference formats`](https://developers.googleblog.com/fast-reliable-a2ui/) · [`🔗 a2ui-agent-sdk（PyPI）`](https://pypi.org/project/a2ui-agent-sdk/)

---

## 27. Trigger.dev は顧客に「環境変数が取られた」と伝えた — 三文、範囲なし、CVE なし

- **Velocity:** ▮ steady
- **Source:** Trigger.dev ブログ + ステータスページ · HN 24 pts · 約 3 時間前（約 09:09 UTC+8）
- **Tags:** `security-incident` `secrets` `background-jobs` `agent-infra`

Trigger.dev の CTO は **2026-11-01** にインシデント告知を出した。「Trigger.dev でセキュリティインシデントが発生しました。この攻撃で使われたエクスプロイトは遮断済みですが、調査により一部の組織で露出が確認されました。攻撃者はこれらの組織の環境変数に不正にアクセスしました」。ステータスページの項目は同日 **22:50 UTC** に解決済みとされ、チームは「詳細を追って提供する」としている。本バッチ時点で CVE は無く、影響組織数の記載も、エクスプロイトの説明も、第三者による報告も無い。緩和手順はアカウント所有者にメールで送られた。

公開記録から見えるのは、同じコンポーネントのより早い事象だ。ステータスページの Deployments 履歴には **2026-10-06** の **2 時間 49 分**の「Degraded」があり、タイトルは「Some sensitive environment variables synced fro…」と表示される。コンポーネント表示では切り詰められており、Trigger.dev はこれを今回のインシデントと関連づけていない。「AI エージェントを構築・デプロイする」ことを売りにするプラットフォームでは、環境変数は各顧客エージェントのモデル API キーとデータベース URL そのものだ。

**Why it matters:** 三日間で二件目の「環境変数が読まれたと考えてほしい」という開示で、一件目は 2026-10-31 の Northflank だった。どちらも同じ形をしている。エクスプロイトは遮断、一部の顧客、詳細は後日。運用上の助言は欠けている詳細に依存しない。プラットフォームが保持していた鍵をローテーションし、ジョブランナーの環境変数ストアを資格情報ストアとして扱うこと。攻撃者はそう扱ったのだから。

[`🔗 Security Disclosure: Sunday November 1st`](https://trigger.dev/blog/security-incident-nov-2026) · [`🔗 Trigger.dev ステータス`](https://status.trigger.dev/) · [`🔗 HN スレッド`](https://news.ycombinator.com/item?id=50331784)

---

## 28. VulDB は 1 件のレコードを 4 回採点する — そして NVD が再供給する 4.0 は 41 件中 38 件でレコード自身より低い

- **Velocity:** ▮ steady
- **Source:** VulDB CNA（NVD、公開 2026-10-31T23:17 → 2026-11-02T01:17）
- **Tags:** `cve` `iot` `firmware` `scoring` `vuldb`

本バッチまでの 26 時間の窓で、NVD は `cna@vuldb.com` が割り当てた **41 件**を持つ。すべて `Received` のままで、しかも各レコードは**自分のコンテナ内で 4 回採点されている**。CVSS 4.0、3.1、3.0、2.0 の四つで、いずれも同じ CNA による。NVD が再供給するのは同じ組ではない。**41 件すべて**のコンテナに 3.0 指標があり、NVD の副本にはそれが一切ない。そして **41 件中 38 件**で、NVD 上の 4.0 スコアはレコード内の 4.0 より**低い**。差は 0.7 から 3.2 で、高い方向は一度もなく（3 件は同一）、3.1 は **41 件中 41 件**で一致する。具体例として `CVE-2026-120189` は CNA コンテナ内で四つの枠すべてが **10.0** だが、NVD のページでは 4.0 が **9.3**、隣に 3.1 と 2.0 の 10.0 が並ぶ。ベクトルは `E:P`（3.1 では `RC:R` も）を伴い、どちらの数がどちらなのかを決めるのは**フィールドではなく算術**である。`E:P` を持つこの 4.0 ベクトルは**基底 10.0・脅威スコア 9.3** を返すので、コンテナの 10.0 が基底、NVD の 9.3 が脅威スコアになる。両方とも `baseScore` という名前で載っている。NVD の 2026-10-26→11-01 の公開窓で実測すると、**136** 件が脅威指標付きの 4.0 ベクトルを持ち、NVD は **136 件中 136 件**で**脅威**スコアを保存し基底は一度も保存しない。同じレコードのコンテナ側は **136 件中 123 件**が**基底**を保存している。NVD は 4.0 では `E` を残すが 3.1 では時間指標を**剥ぎ取る**（**123 件中 123 件**）ので、その列だけが一致する。

対象は消費者向けと SMB 向けのファームウェアだ。**WAVLINK WN536AX6-A** が 7 件、**WN553X1-B** が 6 件、**Oray 蒲公英 X5 Pro** が 3 件、WAVLINK WN701AE と **Ruijie RG-ES205GC** が各 2 件、ほかに **D-Link DIR-505**（ファームウェア 1.10B02）と **Linksys E8450**。説明はファームウェアの fuzz 出力の形をしている。`/bin/ioos`、`/protocol.csp`、`/cgi-bin/wapi.cgi` の中の `strcpy` か、名前の無い `sub_416760`。ネットワーク到達性以外の前提条件は書かれていない。そしてスコアは 20 件分の評価ではなくテンプレートだ。**41 件のうち 20 件**が 3.1 の列で 9.9 か 10.0 に達し、それは二つのベクトルである。**9 件**が `AV:N/AC:L/PR:N/UI:N/S:C/C:H/I:H/A:H`（10.0）、**11 件**が同じ文字列の `PR:N` を `PR:L` にしたもの（9.9、NVD の 4.0 は 8.6、コンテナ内は 9.4）。

**Why it matters:** 10.0 は最悪の場合に到達できるという意味のはずで、ここでは一つのテンプレートを製品ファミリ全体に当てている。各ハンドラが本当に認証不要のリモートコード実行なら筋は通るが、そうでなければ誤導になる。これらの行がダッシュボードの「重大 CVE 件数」を作るからだ。しかしより鋭い発見はベクトルの上流にある。同じレコードがコンテナでは 10.0、NVD では 9.3 で、その差を説明するフィールドが無い。NVD を読むスキャナと CVE を読むレビュアーは、互いに再現できない数字を引用することになる。割り当て元を書き、フレームワークを書き、どちらの副本を読んだかを書くこと。

[`🔗 CVE-2026-120189（D-Link DIR-505、10.0）`](https://cveawg.mitre.org/api/cve/CVE-2026-120189) · [`🔗 CVE-2026-120276（WAVLINK、10.0）`](https://cveawg.mitre.org/api/cve/CVE-2026-120276)

---

## 29. HyperFrames は HTML を決定論的な MP4 に変える —— 3 時間半で 3 リリースを出した

- **Velocity:** ▮▮▮ trending
- **Source:** GitHub Trending（週間）· 77,426★ · 今週 +5,153 · v0.9.2 公開 2026-11-02T09:10Z
- **Tags:** `video` `agents` `renderer` `htmx` `open-source`

`heygen-com/hyperframes`（77,426★、2026-03-10 作成、Apache-2.0）は、HTML・CSS・メディア・シーク可能なアニメーションを**決定論的な MP4** に変換するオープンソースのフレームワークだ。ローカルでは CLI、エージェントからは公開された skills 経由、あるいはホスト型のオーサリングワークフローの背後にあるレンダリングコアとして動く。売りはエージェント経由の道筋で、`npx hyperframes skills update` を一度実行したあと Claude Code、Codex、Cursor に動画を作らせればよい。skills がループ全体を教える —— 計画し、妥当な HTML を書き、シーク可能なアニメーションを繋ぎ、メディアを加え、lint し、プレビューし、レンダリングする。

今日について書く価値があるのは、何を出したかだ。**v0.9.0**（2026-11-02T05:41:28Z）は破壊的で、**AWS Lambda と Google Cloud Run** 上の分散レンダリングは **Plan v2** のみになった。Plan v1 のトランスポート、`planProtocol` オプション、v1 のイベントと結果型は削除され、古い v1 ペイロードには「レンダリング作業を一切行う前に」`PLAN_PROTOCOL_UNSUPPORTED` が返る。**v0.9.1**（07:41:18Z）はその破壊的変更が生んだ端を直した。`PlanProtocol` のない Lambda ステートマシンが `States.Runtime` で失敗する代わりに v2 を既定とする。**v0.9.2**（09:10:24Z）は終了したシーンが WebGL コンテキストを手放し、次のシーンが遅くならないようにする。npm `hyperframes` の `latest` は **0.9.2**、公開は 09:16:42Z で、タグの 6 分後だ。

**Why it matters:** 動画はエージェントが依然として決定論的に出力できない唯一の形式であり、ここでの設計上の答えは、成果物をシーク可能なタイムラインを持つ文書にして、レンダリングをサンプリングループの関数ではなくファイルの関数にすることだ。破壊的変更は、これが玩具でなくなる地点 —— 分散レンダーファーム —— を指している。SDK とデプロイは同時に動かす必要があり、`"v1"` を渡すと今は例外になる。

[`🔗 heygen-com/hyperframes`](https://github.com/heygen-com/hyperframes) · [`🔗 v0.9.0（破壊的）`](https://github.com/heygen-com/hyperframes/releases/tag/v0.9.0) · [`🔗 npm hyperframes`](https://www.npmjs.com/package/hyperframes)

---

## 30. Colibri は 744B MoE をディスクから 9.9 GB の RAM に流し込む —— ノート PC で毎秒 0.05 トークン

- **Velocity:** ▮▮▮ trending
- **Source:** GitHub Trending · 今日 +655★ · 46,157★ · v2.1.0 公開 2026-10-31T12:50Z
- **Tags:** `moe` `local-inference` `c` `gguf` `quantization`

`JustVugg/colibri`（46,157★、2026-07-01 作成、Apache-2.0、純粋な C）は、MoE モデルを巨大にしている当の性質を利用して、人が既に持っているハードで巨大モデルを動かす。744B のモデルは 1 トークンあたり約 **40B のパラメータ**しか使わず、トークンごとに変化するのは約 **11 GB** だけだ。密な部分 —— attention、共有エキスパート、embedding —— は RAM に常駐し、ルーティングされるエキスパートはディスクに置かれ、ルーターが要求したときに読まれる。そのキャッシュは「自分の作業がどのエキスパートを使うか」を学習する。**13 のエンジン**を抱える。チャット系 10 種（GLM-5.2/5.3、GLM-5.3-Flash、Inkling、Kimi K3、DeepSeek V4 と V4.1 Flash、MiMo-V2.6、Qwen3.8-Flash-Next、Qwen3.6、OLMoE）、画像 1 種、そしてチャットせず確率で答える意思決定モデル 3 種だ。

デモと一線を画すのは README 自身の表である。**GLM-5.2**（ダウンロード 429 GB）は**25 GB のノート PC でコールド時に 0.05–0.1 tok/s**、128 GB の Ryzen AI Max+ 395 で **1.83**、RTX 5090 6 枚で **9.0–9.2**。**Kimi K3**（2.8T、1.56 TB）は**1 トークン約 9.4 秒**、エキスパートの読み出しは 6.3 GB/s。**DeepSeek V4 Flash**（284B）は 32 GB で **0.93 tok/s**。README の起動バナーは `GLM-5.2 · 744B MoE · int4 · streaming CPU · ready in 32s · resident 9.9 GB`。**v2.1.0**（2026-10-31）は **v2.0.0 以降の 387 の pull request、うち 208 が 35 名の貢献者から**、全エンジンでの GGUF 直接読み込み、Mistral-Large-4（1T）の追加を含む。

**Why it matters:** 星の数と並べてトークン毎秒を引用すること。主張は速度ではなく*配置*であり、代償はエキスパート 1 つにつき NVMe 読み出し 1 回だ。README が明示する設計原則こそ持ち帰る価値がある —— "Less fast memory may cost speed; it must not quietly redefine the model."

[`🔗 JustVugg/colibri`](https://github.com/JustVugg/colibri) · [`🔗 v2.1.0 リリース`](https://github.com/JustVugg/colibri/releases/tag/v2.1.0) · [`🔗 GGUF 対応の説明`](https://github.com/JustVugg/colibri/blob/main/docs/gguf.md)

---

## 31. Paperclip は 11 万星のエージェント用組織図 —— 安定版は 10 月 23 日で止まり、以後は nightly のみ

- **Velocity:** ▮▮▮ trending
- **Source:** GitHub Trending · 今日 +507★ · 110,094★ · 安定版 v2026.1023.0 は 2026-10-24 タグ
- **Tags:** `agents` `orchestration` `governance` `budget` `typescript`

`paperclipai/paperclip`（110,094★、18,243 fork、MIT、2026-03-02 作成）は Node.js サーバーと React UI で、単体のエージェントではなくエージェントの**チーム**を編成する。人間とエージェントが混在する組織図、目標とタスクの紐付け、会社・エージェント・プロジェクト単位の予算、スコープ付きシークレット、権限、そして割り当てられた作業・フォローアップ・スケジュールでエージェントを起こす**ハートビート**。一行の位置づけは "If OpenClaw is an employee, Paperclip is the company."。名簿は本フィードが追ってきた harness の一覧そのものだ —— OpenClaw、Claude Code、Codex、Cursor + Cloud、Gemini CLI、OpenCode、Pi、Hermes + Gateway、Grok Build、Kimi Code。それ以外のための入口も README が書いている —— "If it can receive a heartbeat, it's hired."

成果物の状態こそが要点で、星の数はリリースではない。**安定**ラインは `v2026.1023.0`、タグは **2026-10-24T00:03:59Z** で「Released: 2026-10-23」と記される。ベータから昇格した 200 コミットで、目玉は非公開のタスクとプロジェクト —— 他者は開けず、検索にも出ず、実行トランスクリプトも読めず、プラグインからも届かない。それ以降はすべて **canary** と **nightly** だ（最新 `nightly/v2026.1102.0-nightly.0`、2026-11-01T16:08:51Z）。トラッカーには**未クローズの issue 3,469 件と pull request 3,159 件**がある。

**Why it matters:** 競争の単位はエージェントから組織図へ移った —— 誰がいくら使ってよく、誰がどのトランスクリプトを見てよいか —— そしてこれはその転換を大規模に最も明確に述べたものだ。リリースチャネルを状態として読むこと。最後の安定版から 10 日、その間は毎日タグ付けされる nightly 列車が代役を務めている。

[`🔗 paperclipai/paperclip`](https://github.com/paperclipai/paperclip) · [`🔗 v2026.1023.0`](https://github.com/paperclipai/paperclip/releases/tag/v2026.1023.0) · [`🔗 paperclip.ing`](https://paperclip.ing)

---

## 32. Heretic 2.0 は自らの設定を壊し、プラグイン機構を入れ、研究機能を Lophius に譲った

- **Velocity:** ▮▮ rising
- **Source:** GitHub · 今日 +404★ · 37,777★ · v2.0.0 タグ 2026-11-01T13:03Z
- **Tags:** `abliteration` `model-modification` `plugins` `pypi` `agpl`

`p-e-w/heretic`（37,777★、AGPL-3.0）は名前の通りのことをする —— "Training-free language model modification" —— 訓練せず、対比的な例プロンプトと対応する **scorer** に対して最適化する。既定の動作は拒否の抑制で、slop・ユーモア・追従性を削る設定や情動の向きを変える設定も同梱されている。README によれば、コミュニティは Hugging Face に**数千**の Heretic 処理済みモデルを公開している。RTX 3090 では既定設定で `Qwen3-4B-Instruct-2507` を約 **30〜40 分**で処理する。

**v2.0.0** は **2026-11-01T13:03:19Z** にタグ付けされ、PyPI の `heretic-llm` 2.0.0 は **12:21:39Z** にアップロードされた —— 1.4.0（2026-06-14）から 8 か月後だ。両方向に破壊的なリリースである。1.x 用の設定ファイルは**動かない**（移行ガイドがある）。リリースノートは率直にこう書く —— "Research features have been removed. The intended replacement is Lophius."。代わりに入ったのは基盤だ。**汎用プラグイン機構**（scorer *と* modifier プラグイン、加えて ARA）、プラグインの `reproducible` プロパティ、**エンドツーエンドテスト付きのヘッドレス実行**、benchmark scorer、データセットの config/subset 指定、そして最適化器が max-weight 下限 `0` で MLP ablation を無効化できる修正。

**Why it matters:** scorer が差し替え可能になった時点で abliteration は一つのレシピではなくなった。このツールは今や*測定可能なあらゆる振る舞い*を操作できる —— ライセンスのページが示すより広い能力だ。1.x の調整済み設定を持つ人にとっては移行がリスクになる。古い設定は拒否されず、単に間違っているだけだからだ。

[`🔗 p-e-w/heretic`](https://github.com/p-e-w/heretic) · [`🔗 v2.0.0 リリース`](https://github.com/p-e-w/heretic/releases/tag/v2.0.0) · [`🔗 PyPI heretic-llm`](https://pypi.org/project/heretic-llm/)

---

## 33. LobeHub のパストラバーサルは 4 月に直っていた —— CVE は 11 月、しかも npm に 2.1.49 は無い

- **Velocity:** ▮▮▮ trending
- **Source:** VulnCheck CNA（cveawg）· 予約 2026-11-01T12:48Z · 公開 2026-11-02T02:01Z
- **Tags:** `cve` `path-traversal` `rce` `npm` `ai-chat`

`CVE-2026-120315` は LobeHub Chat の文書解析におけるパストラバーサルで、最終的にコード実行に至る。機構は 4 行だ。`TempFileManager.writeTempFile(data, name)` はパスを `join(this.tempDir, name)` で組み立てていた。`name` は `files.name` 列から来ており、`file.createFile` がユーザー入力をそのまま書き込む。内容が `child_process.execSync` のペイロードである `../../../../../../app/startServer.js` という名前のファイルレコードを作り、文書解析を叩けば、ペイロードはサーバーの起動元に落ちる。勧告が示す前提は**サーバー・データベース構成**と認証済みセッションで、`PR:L` であり事前認証ではない。

発見は日付にある。GHSA（`GHSA-2g9j-v25c-4j97`）は **2.1.49** を修正済みとするが、そのタグ自身のリリースページは **2026-04-10T09:51:47Z** だ —— 勧告の公開（10 月 17 日）より **190 日**、CVE レコードより **206 日**早い。修正はそのタグで検証できる。`writeTempFile` は今 `basename(name)` を `resolve()` に通し、そのコメントには既にこの GHSA の ID が書かれている。

さらにレコードが指す成果物がある。`packageURL` は `pkg:npm/@lobehub/chat` だが、このパッケージの最新公開版は **1.143.3（2026-01-25）**。プロジェクトの現在のパッケージは `@lobehub/lobehub` で、リポジトリの宣言は **2.3.0**、その名前の npm `latest` は **2.1.26（2026-02-10）**。**2.1.49 は GitHub のタグにだけ存在し、どちらの npm 名にも無い。** スコアは VulnCheck 自身のもので、CVSS 3.1 **8.8**、CVSS 4.0 **8.7**。NVD の状態は `Received` で **NVD 採点の metric は 0 件**、3.1 の値はベクトルから正確に再現する。プロジェクト自身の最新リリース v2.3.0 は 2026-11-01 に出た。

**Why it matters:** 修正から CVE まで 9 か月は、セルフホストのアプリを未修正のまま放置させる開示ラグだ。しかし防御側にとって厳しいのは第二層である。その packageURL で引くスキャナはすべての npm バージョンを `< 2.1.49` と見なし、上げ先の修正版が存在しない。範囲は正しく、それが名指す成果物は別のオブジェクトなのだ。修復はレジストリではなくタグから読む必要がある。

[`🔗 CVE-2026-120315（cveawg）`](https://cveawg.mitre.org/api/cve/CVE-2026-120315) · [`🔗 GHSA-2g9j-v25c-4j97`](https://github.com/lobehub/lobehub/security/advisories/GHSA-2g9j-v25c-4j97) · [`🔗 v2.1.49 タグ（2026-04-10）`](https://github.com/lobehub/lobehub/releases/tag/v2.1.49)

---

## 34. Network-AI 自身のパスサニタイザが脆弱性だった —— アンカー無しの `startsWith` が隣接ディレクトリを許した

- **Velocity:** ▮▮ rising
- **Source:** VulnCheck CNA（cveawg）· 3 件 2026-11-02T02:01:10–12Z · 修正 5.15.5
- **Tags:** `cve` `path-traversal` `agent-framework` `npm` `sandbox`

VulnCheck は npm の TypeScript 製マルチエージェント編成器 **Network-AI**（`pkg:npm/network-ai`、32 フレームワーク向けアダプタを謳う）にパストラバーサルを 3 件出した。読むべきは 3 件目だ。`CVE-2026-120313` は**`InputSanitizer.sanitizePath()` そのもの**、つまりガードの中にある。基底ディレクトリとの比較に**アンカー無しの `startsWith`** を使っていたため、ディレクトリ名が基底の文字列接頭辞を**共有するだけ**のパスは、その子ではなく兄弟になる。サンドボックス外の読み取り・一覧・書き込みが続き、これは権限を要さない —— CVSS 3.1 で **7.5**（`PR:N`）、4.0 で **8.7**。`CVE-2026-120311` は**ジョブ ID** にトラバーサル列を入れ（`FileJobStore.get()`、`.delete()`、`JobQueue.getJob()`）、任意の `.json` を読むか消す —— `AuthGuardian` の信頼レベル設定やグラントトークンを含み、ファイル削除から組み立てる認可バイパスになる —— スコアは CVSS 3.1 で **8.8**、4.0 で **8.7**、`PR:L`。`CVE-2026-120312` は同じ手を **AgentVCR のカセット名**（`load()`/`save()`）でやる、同じ **8.8** と **8.7** だ。

3 件とも **5.15.5** で修正された。その npm リリースは **2026-10-17T18:14:17Z** に公開されており、**レコードより 16 日古い**。npm `latest` は現在 5.17.1。NVD は 3 件とも `Deferred`、**NVD 採点の metric は 0 件**なので、ここに並ぶ値はすべて CNA の算術だ（3.1 は正確に再現する）。リポジトリは **80 星**、MIT、最終 push は 2026-10-27。

**Why it matters:** あるエージェントフレームワークの 3 つの「サンドボックス」はそれぞれ 1 回の文字列比較であり、最初に監査すべきはサニタイザだ。他のすべてがそれを信頼しているからだ。サイズも半分の話になる。1 バッチで 4 件の CVE を持つ 80 星の依存は、攻撃面が小さいのではなくレビュー面が小さい。そして修正はレコードより 2 週間早い。

[`🔗 CVE-2026-120313（InputSanitizer）`](https://cveawg.mitre.org/api/cve/CVE-2026-120313) · [`🔗 CVE-2026-120311（FileJobStore）`](https://cveawg.mitre.org/api/cve/CVE-2026-120311) · [`🔗 CVE-2026-120312（AgentVCR）`](https://cveawg.mitre.org/api/cve/CVE-2026-120312)

---

## 35. Termix の 9.9 は `destPath` ひとつ、エクスプロイトは公開済み、記録はベンダーが応答しなかったと書く

- **Velocity:** ▮▮ rising
- **Source:** VulDB CNA（cveawg）· 予約 2026-11-01T13:17Z · 公開 2026-11-02T01:45Z
- **Tags:** `cve` `path-traversal` `self-hosted` `ssh` `vuldb`

`CVE-2026-120322` は **Termix-SSH/Termix**（15,780 星のセルフホスト型 Web SSH／ファイルマネージャ）のパストラバーサルで、入口は `/plugin-api/file-manager/transferToHost`。`destPath` 引数が転送ルートに閉じ込められていない。任意ファイル書き込みを遠隔から実行でき、CVSS 3.1 で **9.9**（`AV:N/AC:L/PR:L/UI:N/S:C/C:H/I:H/A:H`、正確に再現）—— これは基本値で、`E:P` を含む完全な時間値は 9.4 —— 2.0 で **9.0**。4.0 の列は本フィードが繰り返し記録してきた分岐そのものだ。CNA のコンテナは **9.4**、NVD の同じ文字列は **8.6** で、どちらも `E:P` を持つ —— 1 つのベクトルが 2 つの停止点に置かれているだけで、2 つの評価ではない。

記録の中でスコアより重いのは 2 文だ。"The exploit is publicly available and might be used." そして "The vendor was contacted early about this disclosure but did not respond in any way."。公開 PoC は記録の中ではなく GitHub リポジトリ（`0xGenesi/CVE`）にある。記録は修復も明示しており、それは検証の修正ではない。ショートカットが独立した File Manager プラグイン **v1.0.0** で**削除**され（転送エンジンは常に SFTP 経由で書く）、コアの **v26.10.0** でも同様になった。Termix は **2026-11-02T00:20:19Z に v26.11.0** を出しており、レコードの公開のおよそ **85 分前**だ。

**Why it matters:** 艦隊分の SSH 資格情報を握る Web ターミナルは、届く範囲を持つファイルマネージャであり、検証されない `destPath` は到達しうる全ホストへの書き込みになる。持ち帰るべきは修正の形だ。ベンダーの答えはパスを洗浄することではなく代替トランスポートを消すことで、ショートカット自体がバグだった場合はこちらが耐久性のある選択になる。

[`🔗 CVE-2026-120322（cveawg）`](https://cveawg.mitre.org/api/cve/CVE-2026-120322) · [`🔗 公開 PoC の解説`](https://github.com/0xGenesi/CVE/blob/main/Termix_FileManager_transferToHost_Arbitrary_File_Write.md) · [`🔗 Termix v26.11.0`](https://github.com/Termix-SSH/Termix/releases/tag/v26.11.0)

---

## 36. http4k の auth-int ダイジェストは本文を一度もハッシュしていなかった —— もう一方の修正は `-ee` ビルドにしか無い

- **Velocity:** ▮▮ rising
- **Source:** VulnCheck CNA（cveawg）· 2 件 2026-11-02T02:01:14–15Z · NVD は `Deferred`
- **Tags:** `cve` `authentication` `http4k` `maven` `enterprise`

http4k のレコードが同じ秒に 2 件着地し、1 件目は教科書的だ。**`CVE-2026-120317`**（`CWE-345`）は、`DigestEncoder` が **auth-int** ダイジェストを計算する際に**リクエスト本文をハッシュしていない**という。本文を束縛することこそ auth-int の存在理由である。非 TLS 経路上の攻撃者は本文を書き換え、`Authorization` ヘッダはそのままに、被害者として状態を変える操作を実行する。**`CVE-2026-120316`**（`CWE-22`）は `ThymeleafTemplates` の Caching/HotReload におけるトラバーサルで、`ViewModel.template()` の値に含まれる `../` が封じ込め検査なしに解決される。リクエスト駆動のテンプレート選択により、サーバープロセスが読める任意のファイルが漏れる —— しかも未認証で。

どちらも CVSS 3.1 で **5.9**、CVSS 4.0 で **8.2** で、その差はフレームワーク側のものだ（4.0 側は `AC:H` と `AT:P`）。判断すべきは成果物の分岐である。`http4k-security-digest` には Maven Central に **6.60.0.0** があり、日付は **2026-09-16** —— レコードの 47 日前。Thymeleaf 側の修正は **6.62.0.0-ee** で、Maven Central の `http4k-template-thymeleaf` の一覧は **6.61.0.0（2026-09-29）** で止まっている。`6.62.0.0-ee` という成果物はそこに存在せず、公開で導入できる最新のテンプレートモジュールは今も自身の影響範囲（`< 6.62.0.0-ee`）の内側にある。NVD は 2 件とも `Deferred`、**NVD 採点の metric は 0 件**。

**Why it matters:** digest 認証は TLS 終端をどこにでも置けないときに選ばれ、本文の完全性はまさにそのために拡張された性質だ。本文を除いたダイジェストはリクエスト行だけを認証し、意味のあるものは何も認証しない。もう半分は運用で、アップグレードの指示が一方の CVE では一行で済み、もう一方では済まない。

[`🔗 CVE-2026-120317（auth-int）`](https://cveawg.mitre.org/api/cve/CVE-2026-120317) · [`🔗 CVE-2026-120316（Thymeleaf）`](https://cveawg.mitre.org/api/cve/CVE-2026-120316) · [`🔗 Maven Central の http4k-security-digest`](https://repo1.maven.org/maven2/org/http4k/http4k-security-digest/)

---

## 37. `@fastify/http-proxy` は `..` を一度も使わず自身の rewrite プレフィックスを迂回した —— 二重デコードで

- **Velocity:** ▮ steady
- **Source:** OpenJS CNA（cveawg）· 予約 2026-10-31T13:33Z · 公開 2026-11-02T10:15Z
- **Tags:** `cve` `encoding-confusion` `fastify` `proxy` `npm`

`CVE-2026-120213` は `@fastify/http-proxy` の **9.0.0 から 11.6.5** に影響し、欠陥はトラバーサルではなくエンコードの往復だ。アプリケーションがパラメータ化された **`prefix`** と **`rewritePrefix`** でクライアントを固定の上流パスに縛ると、プラグインは **URL デコード済みのルートパラメータ**を**再エンコードせずに** `rewritePrefix` へ代入する。パス区切りと fragment または query の区切りをエンコードした値は、デコード後に本物の区切りとなるため、上流のパスセグメントを注入し、`rewritePrefix` が強制するはずだった**必須サフィックスを剥がす**。記録はこれが "without using any dot-dot traversal" で起きると明記している —— `..` を探すフィルタや、`..` を条件に書いた WAF には何も見えない。付された 2 つの CWE が診断そのものだ —— `CWE-22` と `CWE-436`（解釈の衝突）。

スコアは CVSS 3.1 で **9.1**（`AV:N/AC:L/PR:N/UI:N/S:U/C:H/I:H/A:N`、正確に再現）で事前認証。修正は **11.6.6**、npm 公開は **2026-11-02T08:55:53Z** —— **レコードの 80 分前** —— 勧告は代替手段を塞いでいる。"There is no workaround other than upgrading."。出所について一行だけ書く価値がある。NVD の表でこの 9.1 の source は `ce714d77-…` で、これは **openjs 自身の orgId** だ。つまり値は CNA のものでエンリッチではない。レコードの状態は `Received`、NVD 採点の metric は 0 件。

**Why it matters:** デコードしてから代入するのは古典的な二重パースの欠陥であり、`CWE-436` が存在する理由でもある —— 文字列がいつエンコード済みでなくなるかについて、2 つのコンポーネントが食い違う。`rewritePrefix` を URL 組み立てではなくサフィックスの強制に使っているなら、これはそのオプションが設定された制限への未認証バイパスになる。

[`🔗 CVE-2026-120213（cveawg）`](https://cveawg.mitre.org/api/cve/CVE-2026-120213) · [`🔗 GHSA-h3vp-4jfr-v364`](https://github.com/fastify/fastify-http-proxy/security/advisories/GHSA-h3vp-4jfr-v364) · [`🔗 npm @fastify/http-proxy`](https://www.npmjs.com/package/@fastify/http-proxy)

---

## 38. エージェント乗っ取り検出の評価 11 本は攻撃を 16〜86% の割合で入れていた —— 実運用の 2% では AUROC 0.879 が適合率 7.6% になる

- **Velocity:** ▮▮ rising
- **Source:** arXiv 2610.41803 · 投稿 2026-10-30 · 11 本の評価を監査
- **Tags:** `research` `agents` `detection` `evaluation` `base-rate`

**乗っ取られた LLM エージェント**の検出器はツール呼び出しの痕跡から異常を読むが、本論文はまずその評価のされ方を調査する。**監査した 11 本の評価**で、攻撃や異常がテストサンプルに占める割合は **16% から 86%** にわたり、**その割合を変えた評価は一つもなく**、**6 本は第 2 のベンチマークやデータ源でのテストを一切報告していない**。残りは、それが何を隠すかだ。**AgentDrift** と **AgentDojo** において、**攻撃率 2%** では **AUROC 0.879** の検出器の**適合率は 0.076** にとどまり、負例の構成だけでその適合率は **0.039 から 0.117** まで動く。次に、**ツール被覆率**（テスト時のツール呼び出しのうち訓練で見たツールの割合）が下がると、検出器の順位は **50% 付近で交差し、それを下回ると逆転する**。未知のツールが訓練で到達しなかった入力に写像されるからだ。ツール入力への dropout はこの逆転をほぼ消す。第三に、**AgentDrift で訓練した検出器はどれも AgentDojo で偶然より良く順位づけできない** —— AUROC 0.47〜0.52 —— 中には AgentDrift 内で **0.996** に達するものも含まれる。どちらでも訓練していない公開の LLM 行動モニタは **0.930** に達するが、攻撃率 2% では公開された判定規則がなお誤警報中心になる（適合率 **0.096**）。

論文自身の限界の節は異例に率直で、併せて持ち帰る価値がある。完全に前向きだったのはモニタの計画だけであり、いくつかの読み方は関連結果を見た後に追加され、AgentDrift は単一生成器の合成データでツール集合が領域間で完全に素である。そして**AgentDojo では、逆転の leave-one-suite-out 類似が一貫して再現しなかった**。

**Why it matters:** 基底率が議論のすべてだ。AUROC は能力に見えるが、攻撃が 2% の配備では 13 件の警報のうち 12 件が誤りになる。攻撃の割合を評価報告に書くこと。逆転については、著者自身が第 2 のベンチマークで格下げした見出しとして読むこと。

[`🔗 arXiv 2610.41803`](https://arxiv.org/abs/2610.41803) · [`🔗 全文（HTML）`](https://arxiv.org/html/2610.41803v1)

---

## 39. MCP のツール呼び出し痕跡は会話なしで利用者を特定する —— 26.25%、当て推量は 17.97%

- **Velocity:** ▮▮ rising
- **Source:** arXiv 2610.41885 · 投稿 2026-10-30 · 1,000 プロファイル、4,000 軌跡
- **Tags:** `research` `mcp` `privacy` `agents` `benchmark`

エージェントは**ツール呼び出しの痕跡**を残す。本論文はその痕跡だけが何を明かすかを問う —— 会話は不要で、プロトコル上妥当なツール相互作用だけを見る。**PrivacyTrace** が測定を与える。**合成ユーザープロファイル 1,000 件**と **4,000 本のエージェント軌跡**を 4 領域にわたり、**25 サーバー**の実 MCP ツールで生成し、4 つの主要 LLM を攻撃者とする。単一領域の痕跡アクセスで、プロファイル推論の攻撃成功率は事前分布による推測の **17.97%** から **26.25%** へ上がる。実行可能なのは経路の分析だ。**ツール引数と返却結果**が痕跡に基づく最大の証拠を与え、**セッション間の連結**がリスクをさらに増幅し、**厳密な識別子の復元は依然として難しい**。2 段階攻撃は一発攻撃にほぼ匹敵し、痕跡に支持された**部分プロファイル**を条件にすると、対応する事前分布推測より **3.30 ポイント**上回る —— ただし第 2 段階もモデルの事前分布の恩恵を受ける。

限界はどこまで持ち運ぶかを決める。ユーザー行動は**合成**であり（人口統計の周辺分布は合わせているが行動は合わせていない）、示される候補防御 —— クエリの難読化、露出するツール呼び出し内容の削減、サービス間でのセッション分離 —— はいずれも**未検証**と明記されている。

**Why it matters:** 痕跡はチャットログより長く生き残る成果物であり、第三者の可観測性サービスに送られやすいものでもある。8 ポイントの差は破滅ではないが、増分は具体的な場所を指す。漏れは**引数と結果**にあり、ツール名を消してもほぼ何も得られず、引数に何を含められるかを絞るのが最も効く。

[`🔗 arXiv 2610.41885 — PrivacyTrace`](https://arxiv.org/abs/2610.41885) · [`🔗 コード：AI45Lab/PrivacyTrace`](https://github.com/AI45Lab/PrivacyTrace)

---

## 40. Latent Sparse Attention は 1,000 万トークンで*attention 1 層*を 22.7 倍にする —— そして 1 層だと書いている

- **Velocity:** ▮▮ rising
- **Source:** arXiv 2610.42147 · 投稿 2026-10-30 · GLM-5.3-FLASH（Qwen-3.8-27B）
- **Tags:** `research` `attention` `long-context` `inference` `indexer`

100 万トークンを超えると、**キーを選ぶ indexer** 自体が二次であるならスパース attention は助けにならない —— この研究線の大半がそこで止まっている。**Latent Sparse Attention** はスコアリングを学習された **64 次元の潜在空間**に移す。キーはそこで階層的にクラスタ化され、クエリはすべてのキーではなくクラスタの階層を採点する。2 つの変種は訓練が異なる。**D-LSA** は小さな層ごとの射影だけを訓練して事前学習モデルに蒸留し、**N-LSA** は next-token loss だけで素から訓練する。単層（flat）探索も選べ、木構造にすると prefill が準二次になる。

数値は分母を添えて。**GLM-5.3-FLASH（Qwen-3.8-27B）の 1,000 万トークン**で、D-LSA は**attention 1 層**の prefill を**元のスパース attention** に対し **22.7 倍**、decode を **4.6 倍**高速化し、**全 attention** に対しては **72.4 倍**と **42.5 倍**で、「多様なタスクで同程度の精度を保つ」。N-LSA は全 attention の精度に一致しつつ、128k トークンで**層あたり 1.6 倍**の訓練高速化を得る。論文は限界を 2 つ明記する。蒸留の後にスパース訓練の通しを行わない（D-LSA は対応するが "due to its cost" で省略）、層ごと・リクエストごとの予算調整は "left to future work"。

**Why it matters:** 正直な単位がすべてだ。22.7 倍は 1 層の prefill でありエンドツーエンドの遅延ではなく、1,000 万トークンではコストはまさにその層に積み上がる。同日の別論文（**2610.42112**、Zyphra Hierarchical Attention）はより強い漸近的主張 —— ルーティングを含む総コストが準線形 —— を出し、こちらも圧縮キー要約の木に着地している。どちらも出荷する前に、アイデアが収束したことを示している。

[`🔗 arXiv 2610.42147 — Latent Sparse Attention`](https://arxiv.org/abs/2610.42147) · [`🔗 全文（HTML）`](https://arxiv.org/html/2610.42147v1) · [`🔗 arXiv 2610.42112 — ZHA`](https://arxiv.org/abs/2610.42112)

---

## 41. プロンプトインジェクション防御：敵対訓練とより良い損失で AgentDojo が 78.8% から 8.8% へ

- **Velocity:** ▮ steady
- **Source:** arXiv 2610.41998 · 投稿 2026-10-30 · コード・データ・モデルを公開
- **Tags:** `research` `prompt-injection` `adversarial-training` `agents` `dpo`

この研究の出発点で最も防御された公開モデル **Meta-SecAlign** は DPO 損失で訓練されながら、適応的プロンプトインジェクション下で攻撃成功率が**ほぼ 100%** に達する。論文は理由を 2 つ挙げ、両方を直す。第一はアンカーで、DPO はモデルを**未防御の参照モデル**の近くに留めるが、安全でない参照は誤った重力井戸だ。彼らの観察は、理想化された**注入不変かつ有用性を保つ oracle** の出力分布が訓練中には入手可能だというもので、これが原理的な **SecPO** 損失を導く。第二は攻撃集合で、Meta-SecAlign は弱い模擬攻撃で訓練される。そこでより強い注入入力（**best@240**）を合成する敵対訓練パイプラインを作り、その上で訓練する。

結果は 2 つの積で報告される。敵対訓練だけでも 3 種の SOTA 適応攻撃に対し Meta-SecAlign 比で攻撃成功率を **1.5〜14.5 倍**下げ、**SecPO 損失は DPO 損失比でさらに 2.4〜4.6 倍**下げる。エージェント作業での端から端までの値が引用に適する。Qwen3.6-27B において `AttackerMovesSecond` 攻撃下の **AgentDojo ASR@800 が 8.8%**、比較対象は **78.8%**。良性の有用性は **9 つのベンチマーク**（エージェントのツール呼び出し、指示追従、科学、数学）で測られ、目立った低下はない。コード、最適化された注入を含む訓練セット、モデルはいずれも公開されている。

**Why it matters:** 持ち運べるのはスコアではなく診断だ。それ自体が安全でない参照に対して訓練された防御は、そのアンカーを継承する。これはモデルを安全な応答に寄せる一連のレシピ全体への批判になる。結果は 1 つの攻撃設定、1 つのモデル規模として読むこと。9 ベンチマークの有用性検査が、拒否率の取引ではなく採用可能にしている部分だ。

[`🔗 arXiv 2610.41998 — SecPO`](https://arxiv.org/abs/2610.41998) · [`🔗 コード：Sizhe-Chen/SecPO`](https://github.com/Sizhe-Chen/SecPO) · [`🔗 Hugging Face のモデル`](https://huggingface.co/Sizhe-Chen/Qwen3.6-27B-Instruct-SecPO)

---

## 42. test-time search の事前登録された監査：学習した選択器はランダムより悪く、82% の状態には選ぶ余地が無かった

- **Velocity:** ▮ steady
- **Source:** arXiv 2610.41970 · 投稿 2026-10-30 · Cosmos Policy + RoboCasa
- **Tags:** `research` `world-models` `test-time-scaling` `evaluation` `robotics`

**world-action モデル**の test-time scaling —— 候補選択と適応配分に推論を上乗せする —— は通常、成功率の差分で正当化される。本論文はその差分が必要とする 3 つの前提を **Cosmos Policy** と **RoboCasa** で監査し、分析計画は事前登録されている。**決定信号：** クリーンなデータで、学習した**価値選択器はランダムより 1.66 ポイント悪く**、後知恵の oracle でも **1.40 ポイント**しか得られずエピソード単位の区間はゼロをまたぐ。さらに **82% の状態で候補の結果が同一**であり、選ぶ余地がほとんど無い。**実現効率：** トークン枝刈りは 1 回の forward の FLOPs を最大 **47%** 削るが、配備経路での実測エンドツーエンド高速化は最大 **1.15 倍**（decode を除いた経路で 1.25 倍）で、自身の **1.5 倍**目標に届かない。**評価の完全性：** 適応配分の実験は検出力のゲートの下で**結論不能**と判定される。

完整性の所見こそ、world-model の評価を回す誰もが警戒すべきものだ。監査は**計算の重い計画経路に沿って発生率が急上昇する静かなレンダリング破損**を特定して修正しており、公式の直接方針の結果には影響しない —— テストしている軌跡の上でだけ劣化するシミュレータである。検出器、修正、スクリプトは公開され、結論は明示的に "scoped to the tested configuration" とされる。

**Why it matters:** 候補を増やして採点すれば制御が良くなるという主張は 3 つの前提の連鎖であり、この監査は名指しのモデルで最初の 2 つが欠けていることを示す —— 選択器に使える信号が無く、FLOPs の削減は実時間にならなかった。レンダリングの不具合こそ再利用できる教訓だ。環境がテスト対象の経路で静かに劣化するなら、ベンチマークは自身のレンダラを測っている。

[`🔗 arXiv 2610.41970`](https://arxiv.org/abs/2610.41970) · [`🔗 全文（HTML）`](https://arxiv.org/html/2610.41970v1)

---

## Metadata

| 項目 | 値 |
|-------|-------|
| 生成 | 2026-11-02T12:10:51Z |
| 記事数 | 42 |
| 追跡ソース | 27（GitHub Trending、Hacker News、arXiv、NVD/CVE レコード、cveawg CNA、JFrog、VulnCheck、Go セキュリティチーム、新華社、中国日報、Terence Tao のブログ、GitHub Releases、npm、PyPI、Hugging Face、JetBrains、DeepSeek Harness、handy.computer、Maven Central、OpenJS CNA、VulDB） |
| 更新スケジュール | 04:03、12:03、20:03 UTC+8（1 日 3 回） |
| ランキング | 速度加重（新しさ × エンゲージメント加速度 × ソースの権威） |
| ライセンス | [CC-BY 4.0](https://creativecommons.org/licenses/by/4.0/) |

[前日](2026-11-01.md) · [生の .md](https://trending.md/jp/feed/latest.md) · [アーカイブ](../archive/)
