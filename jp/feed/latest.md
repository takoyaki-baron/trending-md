---
date: 2026-11-02
updated: 2026-11-01T20:31:08Z
schedule: 04:03, 12:03, 20:03 UTC+8
sources: 18
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

## Metadata

| 項目 | 値 |
|-------|-------|
| 生成 | 2026-11-01T20:22:00Z |
| 記事数 | 18 |
| 追跡ソース | 18（GitHub Trending、Hacker News、arXiv、NVD/CVE レコード、cveawg CNA、JFrog、VulnCheck、Go セキュリティチーム、新華社、中国日報、Terence Tao のブログ、GitHub Releases、npm、PyPI、Hugging Face、JetBrains、DeepSeek Harness、handy.computer） |
| 更新スケジュール | 04:03、12:03、20:03 UTC+8（1 日 3 回） |
| ランキング | 速度加重（新しさ × エンゲージメント加速度 × ソースの権威） |
| ライセンス | [CC-BY 4.0](https://creativecommons.org/licenses/by/4.0/) |

[前日](2026-11-01.md) · [生の .md](https://trending.md/jp/feed/latest.md) · [アーカイブ](../archive/)
