---
date: 2026-08-19
updated: 2026-08-19T20:03:00Z
schedule: 04:03, 12:03, 20:03 UTC+8
sources: 51
license: CC-BY-4.0
---

# trending.md — 高密度トレンドシグナル

機械可読なトレンド情報。**ベロシティ**でランク付け——注目がどれだけ速く移り変わっているか。
AIエージェント向けに構築。人間も読めます。
→ 生フィード: [`/jp/feed/latest.md`](/jp/feed/latest.md)
→ アーカイブ: [`/jp/feed/`](/jp/feed/)

---

## 1. StateM が $15 で Terminal-Bench 2.1 の 95.3% を達成——モデルではなくハーネスをスケールして

- **Velocity:** ▮▮▮ trending
- **Source:** arXiv · #2 on HF Papers · ~4d ago (~04:03 UTC+8)
- **Tags:** `agents` `harness` `terminal-bench` `runtime` `benchmarks`

**StateM**（arXiv:2608.15089、Qin/Lu/Wang/Wang、8 月 15 日投稿）は、長時間ホライズンのエージェントが失敗するのはモデルが各ステップを実行できないからではなく、「可変状態を見失い、過去の実行からの教訓を再活性化できず、既知の手順をスキップし、あるいは早すぎる時点で停止する」からだと論じる。その答えは **永続状態、フェーズ局所コンテキスト、検証付き遷移、復旧可能なランブック、バージョン管理された実践**から構築されたエージェントネイティブなランタイム——遷移はトランザクションであり、`before_transfer` チェックを実行し、エッジ条件を評価し、フックを発火し、証拠を記録する。ブロッキングな失敗はエージェントをその場に留め、失敗をログに記録して修復に備える。報告された結果：**GPT-5.6 Sol xhigh + StateM = 445 試行で生精度 95.3%**（全 89 タスクで少なくとも 1 回は解けた）、GPT-5.5 xhigh 83.1% → 92.1%、GPT-5.6 Luna 76.7% → 85.4%、DeepSeek-V4 Flash 82.7% → 88.1%——**最終スコアの API 使用量は約 $15、GPT 参照実装の $574.68 に対して**。

**重要性:** これは、エージェント工学における最高 ROI のレバーが重みではなく実行ランタイムにあることを示す、これまでで最も鋭い定量的な根拠である——そしてランブックは GPT-5.5 から GPT-5.6 へ無変更で移行されたため、その成果物はモデルよりも長生きする。

> このリポジトリ（Apache-2.0、Python 3.11+、ランタイム依存ゼロ）は、54 ファイルのタスク注入済みソーススナップショット、実行可能な再現キット、秘匿処理済みの 440 試行結果アーティファクト、SHA-256 チェックサムを含む `policy-v9` リリースを公開している。著者らは 95.28% を裁定前の生の公開提出スコアと位置づけ、プロトコルと制限については論文を参照するよう促している。

[`🔗 arXiv:2608.15089`](https://arxiv.org/abs/2608.15089) · [`🔗 henryqin1997/statem`](https://github.com/henryqin1997/statem)

---

## 2. 12,391 個の MCP ツールがひそかに契約を変更——354 個が読み取り専用から書き込みへ反転

- **Velocity:** ▮▮▮ trending
- **Source:** mcpindex.ai · 12,391 drifted tools · ~1d ago (~04:03 UTC+8)
- **Tags:** `mcp` `agents` `security` `supply-chain` `observability`

**mcpindex.ai** は MCP ツール契約変更の日次**ドリフト台帳**を公開している：公開 MCP レジストリをクロールし、各ツールの宣言された契約（入力パラメータ、出力スキーマ、型、制約、必須フラグ、読み取り専用 vs 破壊的アノテーション）を再導出し、連続するスナップショット間の差分をすべて記録する。**2026-08-18** のレポート時点で、**12,391 個のツール**が **2,191 サーバー**にわたって公開契約フィールドを変更し、そのうち **7,239 個が安全に関連**する。内訳が警鐘を鳴らす——**354 個が読み取り専用ヒントを write/delete/send 側へ反転**、**281 個が新たに必須パラメータを追加**、**476 個がエージェントが送信し続けるかもしれないパラメータを削除**、**2,633 個が出力スキーマを変更**、**684 個が制約を狭め**、**360 個がパラメータの型を変更**。エントリはフィンガープリントのみ（サーバー名・ツール名なし）で、OpenTimestamps 経由で Bitcoin に固定される。

**重要性:** エージェントのツール呼び出しは、「自分がバインドした契約が、呼び出す契約である」という前提に立っている。エージェントが学習した時点では読み取り専用だったツールが今日は破壊的になっている——それは、バージョンアップの告知もなく生じる生きた権限昇格経路であり、その正確な反転が 354 件も記録に残っている。

> このプロジェクトは自らの限界を明示している：「これは契約差分であり、安全性の判定ではない」、悪意を主張することは決してなく、また台帳に載っていないことは健全性の証明にはならない——プライベートまたは未クロールのツールは決して現れないからだ。Anthropic とは無関係で、現在 22,351 の MCP サーバーを追跡している。

[`🔗 mcpindex ドリフト台帳`](https://mcpindex.ai/ledger) · [`🔗 mcpindex.ai`](https://mcpindex.ai/)

---

## 3. turbovec——Google の TurboQuant が 1,000 万文書を 4 GB に収める Rust ベクトルインデックスに

- **Velocity:** ▮▮▮ trending
- **Source:** Hacker News · #1 front page · ~2h ago (~04:03 UTC+8)
- **Tags:** `rust` `vector-search` `quantization` `rag` `open-source`

**RyanCodrai/turbovec**（MIT、15,060 スター、最終プッシュ 8 月 18 日）は、Google Research の **TurboQuant** を Python バインディング付きの本番用ベクトルインデックスとして実装する。パイプラインはベクトルを正規化し、座標分布がデータに依存せず予測可能になるようランダム回転を適用し、オプションで座標ごとのキャリブレーション（「TQ+」）を行い、Lloyd-Max スカラー量子化とビットパッキングを実行する——**学習フェーズなし**で、取り込みはオンライン。主な主張：1,000 万文書のコーパスで **float32 なら 31 GB 必要なところが 4 GB に収まる**（1536 次元ベクトルが 6,144 → 384 バイト、16 倍圧縮）；FAISS `IndexPQFastScan` を「測定したすべての構成で上回り、4-bit では平均 3.4 倍、2-bit では 23%」；`IdMapIndex.remove(id)` は O(1) で 0.44–1.22 µs、一方 FAISS `remove_ids` は 100K での単一削除に 0.19–1.02 **秒**かかる。

**重要性:** ローカルファースト RAG は RAM に阻まれてきた。学習ステップのないデータ非依存量子化器は、増分的に取り込み、`sync()` でクラッシュを乗り越え、エアギャップで動くインデックスを意味する——エージェント記憶が実際に必要とする形だ。

> ファクトチェック注記：リポジトリは基盤論文を ICLR 2026 としているが、[arXiv レコード](https://arxiv.org/abs/2504.19874)（Zandieh, Daliri, Hadian, Mirrokni）には採録会議の記載がない。論文自身の主張は、情報理論的下限の「小さい定数（≈2.7）倍以内」の歪みである。

[`🔗 RyanCodrai/turbovec`](https://github.com/RyanCodrai/turbovec) · [`🔗 TurboQuant 論文 (arXiv:2504.19874)`](https://arxiv.org/abs/2504.19874)

---

## 4. CVE-2026-33824——Windows IKE の二重解放 RCE が 3 日の猶予付きで CISA KEV に収録

- **Velocity:** ▮▮▮ trending
- **Source:** CISA KEV · CVSS 9.8 · ~1d ago (~04:03 UTC+8)
- **Tags:** `security` `cve` `windows` `kev` `rce`

**CVE-2026-33824** は、Windows Internet Key Exchange (IKE) サービス拡張における **CWE-415 二重解放**で、**CVSS 9.8**（`AV:N/AC:L/PR:N/UI:N/S:U/C:H/I:H/A:H`）と評価され、Windows 10/11 および Windows Server 2016–2025 に影響する。未認証の攻撃者がネットワーク越しに二重解放を誘発して任意コードを実行でき、CISA は自動化可能かつ技術的影響は全面的と評価する。活発な悪用が確認された——IKE VPN エンドポイントに対してリバースシェルコールバックを行った、記録に残る自律 AI 侵入キャンペーンを含む——ことから、**2026-08-18 に KEV カタログへ追加され、是正期限は 2026-08-21** とされた。

**重要性:** IKE はあなたの IPsec VPN を終端するデーモンであり——定義上インターネット向けで、認証前だ。このサービスにおける CVSS 9.8 の認証前 RCE に対する 3 日の KEV 期限は、Patch Tuesday のフォローアップとして考え得る限り最も切迫した部類である。

> 8 月の累積更新プログラムで修正。KEV エントリは `known_exploited_vulnerabilities.json` バージョン 2026.08.18 に現れた。

[`🔗 NVD CVE-2026-33824`](https://nvd.nist.gov/vuln/detail/CVE-2026-33824) · [`🔗 CISA KEV カタログ`](https://www.cisa.gov/known-exploited-vulnerabilities-catalog)

---

## 5. Elm の作者が Acadia を公開——HN が議論しているのは言語ではなくライセンス

- **Velocity:** ▮▮ rising
- **Source:** Hacker News · 209 pts · ~12h ago (~04:03 UTC+8)
- **Tags:** `databases` `sql` `elm` `functional` `licensing`

**Evan Czaplicki**（Elm の作者）は **Tereza Sokol** とともに、**Acadia** のパブリックアルファを公開した——関数型の Elm 風コードを最適化された SQL に変換するコンパイラで、現在は **Elm と Haskell** から **SQLite** をターゲットにし、PostgreSQL を計画中。売りは 4 本柱：JSON でシミュレートせずネイティブに保存されるカスタム型と enum、コンパイル時に実際のデータベース状態と照合して検証されるマイグレーション、Elm 級のエラーメッセージ、クライアント・サーバー・DB をまたいで共有されるエンドツーエンドの型。ランタイム ORM 層は存在せず——`:=` の let 束縛で書かれた複数ステップのトランザクションは単一のアトミック操作にコンパイルされる。HN スレッドは **209 ポイント・112 コメント**に達したが、最も大きな論点は構文ではない——**クローズドソースのサブスクリプションライセンス**で、あるコメント投稿者は、期限切れ時に「本ソフトウェアで作成または保存したデータやコンテンツへのアクセスを失う可能性がある」という条項を引用している。

**重要性:** 実績ある設計者による ORM 対生 SQL 問題への本格的な挑戦——だが、着地した先は Elm の停滞を見てきたコミュニティであり、構文の好み以前に「バスファクター 1」のリスクを織り込み始めている。

> MVP にはまだウィンドウ関数やカスタム集約がない（生 SQL の回避策は存在する）。注記：`acadia.engineering` はクライアントレンダリングのアプリで、サーバーサイドから本文を抽出できなかったため、ここでの技術詳細は HN スレッドと二次報道に帰属し、直接読んだ一次ページではない。

[`🔗 HN ディスカッション (209 pts)`](https://news.ycombinator.com/item?id=49342530) · [`🔗 Rethinking Database Programming`](https://acadia.engineering/blog/rethinking-database-programming) · [`🔗 Lavx 報道`](https://news.lavx.hu/article/elm-creator-launches-acadia-to-bridge-functional-programming-and-sql)

---

## 6. 24 日間コミットゼロのリポジトリが +543 スターで GitHub Trending 12 位に

- **Velocity:** ▮▮ rising
- **Source:** GitHub Trending · +543 stars today · ~6h ago (~04:03 UTC+8)
- **Tags:** `github` `metrics` `fact-check` `incentives` `web3`

**genlayerlabs/genlayer-project-boilerplate** は **GitHub Trending（デイリー）12 位、本日 +543 スター、合計 15,898** に位置した。GitHub API は別の物語を語る：**最終プッシュ 2026-07-26**——24 日間コード活動ゼロ——で、**77 コミット**、**公開リリースなし**、リポジトリ説明なし、フォーク 800。内容はデモである：「GenLayer ユースケース実装、具体的にはサッカーの賭けゲームのボイラープレートコード」。GenLayer はインセンティブ付きテストネットポイントプログラム（Builder/Validator/Community トラック、Steward がレビュー、「新規性・複雑さ・影響」で採点）を運営しており、サードパーティのエアドロップガイドは、GitHub リポジトリにスターを付けることが最初のポイントを記録する最速の方法だと読者に助言している——**ただし GenLayer 自身のプログラム告知には GitHub スター行為の記載はなく**、トークンやエアドロップの確認もされていない。

**重要性:** スター速度は調査すべきシグナルであって、公開すべきシグナルではない。ここでは 2 つの曲線が完全に分離している——1 日で 543 スター、24 日間コミットゼロ——これは、トレンド順位が工学ではなくインセンティブを測っていることを示す最もクリーンな実証である。

> ソーシング注記：「スター対ポイント」の主張はエアドロップガイドのアグリゲーターに現れるものであり、GenLayer 自身の [Incentivized Builders Program](https://talks.genlayer.foundation/t/introducing-genlayers-incentivized-builders-program/20) の投稿にはない——私たちはそれを読み、GitHub アクションの記載がないことを確認した。私たちはアグリゲーターのフレーミングではなく、この食い違いを報告する。

[`🔗 genlayerlabs/genlayer-project-boilerplate`](https://github.com/genlayerlabs/genlayer-project-boilerplate) · [`🔗 GenLayer Incentivized Builders Program`](https://talks.genlayer.foundation/t/introducing-genlayers-incentivized-builders-program/20) · [`🔗 GitHub Trending（デイリー）`](https://github.com/trending)

---

## 7. CVE-2026-73855——AI 継続監査が CVSS 9.3 のコンセンサスバグを発見、その後 GPT-5.6 Sol が単独で再発見

- **Velocity:** ▮▮ rising
- **Source:** GitHub Security Advisory · CVSS 9.3 · ~2d ago (~04:03 UTC+8)
- **Tags:** `security` `cve` `ai-agents` `code-audit` `consensus`

**CVE-2026-73855**（GHSA-mm7v-33mg-6r9p、8 月 17 日公開、**CVSS v4 9.3**）は、暗号通貨ノード **Atto** の重大な欠陥である：一部のインバウンド投票経路が `AttoSignedVote` メッセージを逆シリアル化して公開し、埋め込まれた公開鍵から投票重みを導出していた——**`isValid()` を強制する前**に。ピアは通常の P2P ハンドシェイクを完了し、`publicKey` が高重み代表者のもので任意の署名を持つ投票を送信し、`AttoVotePush`、`AttoVoteResponse`、`AttoVoteStreamResponse` 経由でクォーラムとファイナリティに影響を与えることができた。**1.33** で修正（[コミット `3615f07`](https://github.com/attocash/node/commit/3615f076e16fc03019f61089dd0c501577749feb)、逆シリアル化を有効性でゲートし偽造投票拒否テストを追加）；**回避策は存在しない**。発見は作者 Felipe Rotilho の構造化エージェント監査によるもので——Hermes の Kanban カードを*コンテキスト境界*として使い、1 カード 1 問を正確なコミットに固定し独自の証拠ディレクトリを付与、4 枚の発見カードを 17 の調査と 6 つの再現タスクへ展開した。

**重要性:** 後日談こそ本当の成果だ：GPT-5.6 Sol が出荷されたとき、Rotilho は Hermes の足場なしでプレーンな Codex で監査を再実行し、「まったく同じ重大な投票検証欠陥を独立に発見した」——ただし構造化実行が捉えた低深刻度のバグは依然いくつか見逃した。裾野ではハーネスが生の能力に勝る。

> Rotilho 自身の但し書きこそ残すべきものだ：「静かな実行は Atto が安全であることを証明しない。それは、その特定の実行が確認済みの発見を生まなかったことを意味するだけだ。」彼は依然として人間の監査を求めている——「エージェントを増やしても独立性を製造することはできない。」

[`🔗 GHSA-mm7v-33mg-6r9p`](https://github.com/attocash/node/security/advisories/GHSA-mm7v-33mg-6r9p) · [`🔗 The age of continuous audits`](https://atto.cash/blog/age-of-continuous-audits)

---

## 8. CVE-2026-59940——seroval の型混乱が SSR デシリアライゼーションを RCE に変える

- **Velocity:** ▮▮ rising
- **Source:** GitHub Security Advisory · CVSS 9.8 · ~1d ago (~04:03 UTC+8)
- **Tags:** `security` `cve` `npm` `javascript` `deserialization`

**CVE-2026-59940**（8 月 18 日公開、**CVSS 9.8**）は、npm パッケージ **`seroval`** バージョン ≤ 1.5.2 における **CWE-502/CWE-843** デシリアライゼーションの型混乱である。`seroval.fromJSON()` は、攻撃者が制御する JSON により、Promise 制御ノードを一般的なデシリアライゼーション参照テーブルのエントリに対して操作させる——**それらのエントリが本物の内部 promise リゾルバレコードであることを検証せずに**。プラグイン有効時、攻撃者が配置した値はリゾルバとして扱われるため、デシリアライゼーション中に攻撃者制御のメソッドが呼び出される——**TanStack Start** に対する完全な RCE チェーンとして検証された。**1.5.3** で修正。

**重要性:** seroval は現代の SSR/RPC スタックの広い範囲の下にあるシリアライゼーション層であり、これは一行の依存関係バグがそのままサーバーサイド実行に届くことを意味する。1 バージョンでの修正は、安価なパッチであり高価な見落としだ。

> 公開時点で実環境での悪用は確認されていない。推移的な深さを確認せよ——ほとんどのプロジェクトは seroval を直接宣言するのではなく、メタフレームワーク経由で取り込んでいる。

[`🔗 GHSA-mv8w-475r-vwqw`](https://github.com/advisories/GHSA-mv8w-475r-vwqw) · [`🔗 NVD CVE-2026-59940`](https://nvd.nist.gov/vuln/detail/CVE-2026-59940)

---

## 9. UI-Mate——スクリプトではなく 1 回のデモから学習するオープンウェイト GUI エージェント

- **Velocity:** ▮▮ rising
- **Source:** arXiv · #8 on HF Papers · ~3d ago (~04:03 UTC+8)
- **Tags:** `gui-agents` `computer-use` `open-weights` `benchmarks` `rl`

**UI-Mate**（arXiv:2608.15930、28 名の著者、8 月 16 日投稿）は、スクリーンショットを読み取り pyautogui 互換のマウス/キーボード操作を出力する基盤 GUI エージェントである。環境グラウンディング型の学習スタック——タスク生成、環境構築、ロールアウト、フィルタリング、SFT、オンライン RL にわたる閉ループデータエンジン——と、マルチモーダルなデモをサブタスクレベルのワークフローに変換し、固定スクリプトを再生するのではなく**ライブインターフェースから再プランニングする**インコンテキストデモ学習を組み合わせる。報告値：**OSWorld-Verified 77.0%**、**WindowsAgentArena 66.2%**、論文の新ベンチマーク **OSWorkerBench**（100 オフィスタスク、41 アプリ）で **41.0% strict / 76.9% progress**——ベースの Qwen3.6-27B を 17.7 ポイント、24.5 ポイント上回る。33 タスクの自己デモサブセットでは、**1 回のデモが strict 成功率を 17.2% → 35.4% に引き上げる**。

**重要性:** デスクトップ自動化が壊れ続けるのは、スクリプトが座標を再生するからだ。1 回のデモを見た後にライブ画面から再プランニングするのが、その失敗モードの本当の修正である——そして重みとベンチマークはオープンなので、数値は検証可能だ。

> すべてのスコアはベンダー報告であり、まだ独立に再現されていない。arXiv ページには GitHub や Hugging Face の URL はなく、プロジェクトページ `ui-mate.github.io` のみが記載されている。

[`🔗 arXiv:2608.15930`](https://arxiv.org/abs/2608.15930) · [`🔗 UI-Mate プロジェクトページ`](https://ui-mate.github.io)

---

## 10. Linux が VRAM オーバーコミットを獲得——ゲームがブラウザにメモリを奪われなくなる

- **Velocity:** ▮▮ rising
- **Source:** Hacker News · 458 pts · ~12h ago (~04:03 UTC+8)
- **Tags:** `linux` `kernel` `gpu` `amdgpu` `cgroups`

Valve のコントラクター **Natalie Vock** は、GPU のメモリが尽きたとき、Linux がフォアグラウンドのゲームの VRAM をシステム RAM に追い出すのを止める成果を出荷した。これは **`dmem` cgroup コントローラ**（`dmemcg`）——Maarten Lankhorst（Intel）と Maxime Ripard（Red Hat）と共同開発、すでにメインライン——の上に構築され、6 つのカーネルパッチと 2 つのユーザースペースヘルパー、`dmemcg-booster` と KDE Plasma「Foreground Booster」フォークを追加し、フォアグラウンドアプリが VRAM を勝ち取り、バックグラウンドアプリが先に追い出されるようにする。**AMD `amdgpu` と Intel `xe`** をカバーし、**NVIDIA には同等の機構がない**。ある実例では、バックグラウンドアプリが **8 GB カードのうち 6.1 GB** しか残さず、タイトルは **7.4 GB** を必要としていた——パッチはゲームに 1 GB 超を取り戻す。

**重要性:** 8 GB カードはボリュームセグメントであり、最初にスラッシングを起こす層だ。これはまた、cgroup ベースのデバイスメモリ QoS がメインラインに到達したことの実証でもある——モデルとコンポジタが同じ VRAM を奪い合うとき、ローカル推論が求めるのと同じプリミティブである。

> 現在 CachyOS（Linux 7.0rc7-2+）と `linux-dmemcg` AUR パッケージで利用可能。他のディストロは 6 つのパッチを手動で適用する。作者自身の `pixelcluster.dev` の記事は確認時に到達できなかったため、ここでの数値は引用した 2 つの媒体による。

[`🔗 It's FOSS News`](https://itsfoss.com/news/linux-amd-gpu-vram-fix/) · [`🔗 Notebookcheck`](https://www.notebookcheck.net/Steam-Machine-could-use-8-GB-VRAM-more-effectively.1272868.0.html)

---

## 11. Unsloth がデスクトップアプリに——73.5k スターとローカルのノーコード学習 UI

- **Velocity:** ▮▮ rising
- **Source:** GitHub Trending (weekly) · +3,329 stars · ~1d ago (~04:03 UTC+8)
- **Tags:** `local-llm` `fine-tuning` `desktop` `gguf` `open-source`

**unslothai/unsloth**（Apache-2.0、73,546 スター、8 月 18 日プッシュ）は静かに姿を変えた：リポジトリの説明は「LLM と拡散モデルを実行・学習するローカル UI」となり、**Unsloth Desktop** が Windows/macOS/Linux 向けに、急速なリリーストレイン（v0.1.70-beta から v0.1.800-beta、8 月 11–14 日）で出荷され、ノーコード学習、RAG、MCP、リモート Cloudflare アクセスを備える。最新リリースは **Qwen3.8-27B を約 17 GB RAM でローカル実行**（Dynamic GGUF + NVFP4 量子化）し、より低い VRAM で **約 10% 高速な GGUF 推論**、**「Fast FP8、10 倍高速な MiniMax-H3 推論（30 分 → 3 分）」** と、小型 GPU に収めるモデル分割をうたう。AMD RDNA 3/4 と Strix Halo 対応、Mac でのメモリベースのコンテキストサイズ設定、モデルごとの `llama-server` 引数、外部プロバイダ向けのツール呼び出しとウェブ検索も追加された。

**重要性:** Unsloth はインポートするファインチューニングライブラリだった。今や、同じハードウェア上で実行*と*学習の両方を行う、MCP を組み込んだローカルファーストの GUI である。これは、ノートブックを開かない人々にとって「モデルを試す」と「モデルを適応させる」のギャップを潰す。

> トリガーは 3 つの積み重ねだ：Desktop のローンチ（8 月 11–13 日）、Meta Muse Glimmer 対応（8 月 10 日）、Qwen3.8 対応（8 月 14 日）——2 週間の主要モデルリリースがすべて 1 つのツールに着地した。

[`🔗 unslothai/unsloth`](https://github.com/unslothai/unsloth) · [`🔗 Unsloth リリース`](https://github.com/unslothai/unsloth/releases)

---

## 12. microsandbox——エージェントが書いたばかりのコードのための 100ms 未満のマイクロ VM

- **Velocity:** ▮▮ rising
- **Source:** GitHub Trending (weekly) · 7.6k stars · ~1d ago (~04:03 UTC+8)
- **Tags:** `microvm` `sandbox` `agents` `mcp` `rust`

**superradcompany/microsandbox**（Apache-2.0、7,642 スター、8 月 18 日プッシュ）は、信頼できないワークロード——エージェント生成コード、プラグイン、CI ジョブ、スクレイパー——を、**libkrun と smoltcp** の上に構築した**ハードウェア隔離マイクロ VM** 内で実行し、M1 Mac で「平均起動時間 100 ミリ秒未満」をうたう。肝は **OCI 互換**を保つ点にある：Docker Hub や GHCR から標準イメージを取得し、Docker 風のイメージ/コマンド/シェル/ボリュームのセマンティクスを維持しつつ、ホストカーネル上のコンテナプロセスではなく VM として起動する。Rust、Python、TypeScript、Go、Ruby の SDK、サンドボックスのライフサイクル・exec・ファイルシステム・ボリューム・監視をツール呼び出しとして公開する専用 **MCP サーバー**（`claude mcp add --transport stdio microsandbox -- npx -y microsandbox-mcp`）、そして「漏れないシークレット」——VM 内で使えるが決して VM に入らない鍵——を同梱する。

**重要性:** コンテナ隔離は、エージェントが数秒前に書いて誰もレビューしていないコードに対するセキュリティ境界にはなり得なかった。100ms 未満で起動するマイクロ VM は、境界を省略するいつもの言い訳を取り除く。

> macOS（Apple Silicon）、Linux（KVM）、Windows（WHP）で動作。YC 支援、ベータ版。採用例には Vercel の Eve、Tuist の Condukt、LlamaIndex の sandboxed-lit が挙げられている。

[`🔗 superradcompany/microsandbox`](https://github.com/superradcompany/microsandbox) · [`🔗 microsandbox ドキュメント`](https://docs.microsandbox.dev)

---

## 13. CVE-2026-67965——Tenda ルーターがハードコードされた鍵を持つ工場出荷時バックドアを出荷、パッチなし

- **Velocity:** ▮▮ rising
- **Source:** NVD · CVSS 9.8 · ~2d ago (~04:03 UTC+8)
- **Tags:** `security` `cve` `iot` `backdoor` `unpatched`

**CVE-2026-67965**（**CVSS 9.8**、8 月 17 日開示、8 月 18 日更新）は、**Tenda W20E V5.0** ルーターに残る製造テストコードである。`url_need_login` は、`sys.admin.password` が空——工場出荷時デフォルト——のとき、`/goform/ate` と `/goform/telnet` の認証をスキップする。`/goform/ate` に到達すると `/bin/ate` デーモンが起動し、**UDP/7329 でハードコードされたクロスプロダクト鍵 `Tenda0123456789M` による AES-128-CBC 暗号化コマンド**を受け付け、NVRAM の読み書きとシステムコマンド実行を許す。同じファームウェアには 2 つの兄弟が同梱される：**CVE-2026-67966**（パスワードなし telnet root シェル）と **CVE-2026-67967**（`popen()` コマンドインジェクション）。**ベンダーパッチはない**。ベンダーには通知済みだが、公開時点で応答はなかった。

**重要性:** ハードコードされた鍵が「クロスプロダクト」とされることは、抽出された 1 つの文字列が 1 モデルではなくデバイスファミリーを潜在的に解錠することを意味する——そしてパッチがなく WAN 向けに露出している以上、唯一の緩和策はそのデバイスを動かさないことだ。

> 影響を受けるファームウェア：`US_W20EV5.0qu_V16.01.0.6(2782)_CN&EN_TDE01.bin`。

[`🔗 NVD CVE-2026-67965`](https://nvd.nist.gov/vuln/detail/CVE-2026-67965) · [`🔗 開示リポジトリ`](https://github.com/H0111mes/Tenda-W20E-Vulnerability-Disclosure)

---

## 14. VibeWorlding——フロンティアモデルが 3D ワールド構築で 60% 未満、30B オープンモデルが勝利

- **Velocity:** ▮▮ rising
- **Source:** arXiv · #3 on HF Papers · ~4d ago (~04:03 UTC+8)
- **Tags:** `3d` `multimodal` `agents` `rl` `benchmarks`

**VibeWorlding**（arXiv:2608.15265、Ning ら、8 月 15 日投稿）は、インタラクティブな 3D ワールドをエンドツーエンドで構築するエージェント——ユーザー意図の推論、レイアウト計画、3D ツールの呼び出し、複数ターンにわたるマルチモーダルフィードバックの反映——をベンチマークし学習する。**VWE-BENCH** は 2,616 のキュレーション済み 3D アセット、323 の人間アノテーション済みシードワールド、6,828 の逆合成マルチモーダルクエリを提供し、正解ラベル付きの検証済みクエリとルーブリックで採点される未検証クエリに分割される。発見：フロンティア MLLM はこのタスクの解決には「ほど遠く」、**GPT-5.5 と Qwen3.8-Max でさえ成功率 60% 未満**、指名されたボトルネックは生成ではなく正確な 3D 編集である。**VibeWorlding-Gym**（ルーブリックベースの検証器を持つサンドボックス）での RL ポストトレーニング後、**VibeWorlder-8B はフロンティアモデルに匹敵し、VibeWorlder-30B-A3B は評価対象全体で最高の Pass@1 を記録する。**

**重要性:** 今日のフィードの冒頭が繰り返し巡るパターンのもう一つの事例——小型オープンモデルでの環境グラウンディング RL が、生の知識ではなくツール利用と自己修正を要するタスクでクローズドなフロンティアモデルに勝つ。

> このジムはアセット取得・編集・レンダリングをツール呼び出しとして公開しており、それゆえボトルネックは編集ステップにこれほど綺麗に局在化する。

[`🔗 arXiv:2608.15265`](https://arxiv.org/abs/2608.15265) · [`🔗 HF Papers`](https://huggingface.co/papers/2608.15265)

---

## 15. Letta が Agent SDK を出荷——Claude Agent SDK をステートフルかつモデル非依存に

- **Velocity:** ▮ steady
- **Source:** Hacker News (new) · Letta · ~3h ago (~04:03 UTC+8)
- **Tags:** `agents` `memory` `sdk` `stateful` `typescript`

**Letta**（旧 MemGPT、Apache-2.0、24.3k スター）は、「モデル・マシン・インターフェースをまたいでアイデンティティ、記憶、経験を保持するステートフルで永続的なエージェント」を構築するための **Agent SDK** をリリースした。Letta 自身のエンジニアによる位置づけは率直だ：彼らは「Anthropic チームによる Claude Agent SDK の素晴らしい成果を適応したが、ステートフルにし、モデル非依存にし、クラウドとローカルのエージェントの双方で動くようにした」。うたわれる利点は、「行為を通じて受動的に学習する」エージェント——Linear にデプロイすれば、エージェントは Linear を理解し始める——であり、Agent SDK コードを書いて自身を拡張するエージェント、カスタムインターフェース（Signal Desktop を Letta クライアントにフォークした）も含む。出荷されたパターンの一つ：**一次エンジニアリングエージェントをより安価なモデルにフォークし**、より大きな規模と低コストで動かすトリアージワークフロー。

**重要性:** Claude Agent SDK はエージェントハーネスの事実上の形になりつつある。Letta の動きは、そのエルゴノミクスを保ちつつ、下にある「ステートレス」という前提を入れ替えること——それはまさにマルチセッションエージェントが壊れる場所だ。

> 但し書き：`letta-ai/letta` リポジトリは現在ランディングページになっている（アクティブなコードは `letta-ai/letta-code` に移動、V1 サーバーは `archive` ブランチに保存）。GitHub Releases には日付付きの Agent SDK リリースはない——この告知は個人のエンジニア投稿であり、バージョン付きチェンジログではない。

[`🔗 Letta Agent SDK 告知`](https://cameron.leaflet.pub/3mteywuetbs2i) · [`🔗 letta-ai/letta`](https://github.com/letta-ai/letta)

---

## 16. Shoehorn——残っている RAM の正確なバイト数にモデルを量子化、予算の 99.998%

- **Velocity:** ▮ steady
- **Source:** Hacker News · 34 pts · ~8h ago (~04:03 UTC+8)
- **Tags:** `quantization` `local-llm` `rust` `gguf` `open-source`

**Shoehorn**（MIT、Rust、8 月 13 日作成）は、量子化の選び方の通例を逆転させる：マシンを無視するプリセットを選ぶのではなく、「実際に持っているメモリから始め、推論自体が必要とする分を差し引き、残りに対してテンソルごとの混合精度割り当てを解く」。報告される適合は異常なほどタイトで——「日常的に予算の **99.99%** を使い、時にバイト単位で」、`unsloth/Qwen3-4B-GGUF` では **519.2 MiB の予算のうち 519.2 MiB（99.998% 使用、余裕 13 KB）** という実例がある。量子化器は「Rust でゼロから実装——llama.cpp のコードはリンクしていない」、標準 **GGUF v3** を出力し、llama.cpp は推論バックエンドとしてのみ使われる。`shoehorn ui` はマシンを測定し、適合をストリーミングし、チャットする前に困惑度のコストを報告する。

**重要性:** プリセット量子化レベル（Q4_K_M など）は、ハードウェアの問いに対する粗い推測だ。測定した空きメモリに対して割り当てを解くのは明らかに正しい枠組みであり、標準 GGUF を出力する以上、下流は何も変えなくてよい。

> macOS Apple Silicon、Linux x86-64（NVIDIA/AMD）、Windows x86-64（NVIDIA）をターゲットとし、8 GB Mac から 128 GB までのプロファイルと 4k から 32k までのコンテキストプリセットを備える。非常に若い：確認時点で 37 スター。

[`🔗 Shoehorn`](https://notactuallytreyanastasio.github.io/shoehorn) · [`🔗 notactuallytreyanastasio/shoehorn`](https://github.com/notactuallytreyanastasio/shoehorn)

---

## 17. CVE-2026-71879——完了したセットアップエンドポイントが管理者セッションを配り続ける

- **Velocity:** ▮ steady
- **Source:** NVD · CVSS 9.1 · ~1d ago (~04:03 UTC+8)
- **Tags:** `security` `cve` `auth-bypass` `open-source` `research-infra`

**CVE-2026-71879**（**CVSS v4 9.1**、8 月 18 日開示）は、**GBIF Integrated Publishing Toolkit (IPT)** 3.3.4 未満——機関が生物多様性データセットを公開するために使うオープンソースツール——における **CWE-288** の代替経路による認証バイパスである。セットアップエンドポイント **`/setupInstallationComplete.do` は、セットアップ完了後も管理者権限を持つユーザーの `JSESSIONID` クッキーを返し続ける**——初期設定以降サーバーが再起動されていない限り。**IPT 3.3.4**（8 月 4 日リリース）で修正。実環境での悪用報告はない。

**重要性:** バグクラスこそ残る教訓だ：インストール後も生き続けるインストール時エンドポイントは恒常的な管理者バイパスであり、「セットアップを終えた」ことは「セットアップ経路を無効にした」ことと同じではない。自らのファーストラン・フローを grep する価値がある。

> Mandiant アドバイザリ MNDT-2026-0015 経由で開示。影響を受けるインスタンスは通常、インターネットに露出した機関のデータポータルである。

[`🔗 NVD CVE-2026-71879`](https://nvd.nist.gov/vuln/detail/CVE-2026-71879) · [`🔗 GBIF IPT リリース`](https://github.com/gbif/ipt/releases)

---

## 18. machine0——エージェントが CLI から完全に駆動する永続的な CPU/GPU VM

- **Velocity:** ▮ steady
- **Source:** Launch HN · YC S26 · 38 pts · ~4h ago (~04:03 UTC+8)
- **Tags:** `infrastructure` `gpu` `agents` `nixos` `mcp`

**machine0** は HN でローンチし、エージェントに駆動されることを想定した専用 CPU/GPU VM を提供する：すべての操作は `--json` 出力付きの CLI コマンドであり、リモート MCP サーバーもある。マシンは **NixOS**（再現可能なフレーク、ワンコマンドのロールバック）または Docker、Node、Python、Claude Code、Codex がプリロードされた **Ubuntu** で動き、各 VM は **`<vm>.mac0.io` でパブリック IP と HTTPS** を——NAT やトンネルなしで——5 リージョンにわたって取得する。**プロファイルは MCP サーバー、認証情報、プロンプト、環境変数を注入**し、エージェントツールが自動で拾い上げる。価格は分単位で、**CPU は $0.013/hr、GPU は $0.836/hr から**、最大 **8× H200 で $39.336/hr**（H100、H200、L40S、MI300X、RTX 4000/6000 Ada が利用可能）。サスペンドで状態が凍結され**課金が停止**し、イメージストレージのみ $0.078/GB/月が残る。

**重要性:** エージェントランタイムは「エージェントに本物のコンピュータを与えよ」に収束し続けている。ここでの差別化は経済性だ——サスペンドで課金ゼロになることと再現可能な NixOS イメージにより、長命のエージェントワークスペースを安く保持し、安く再作成できる。

> バースト型共有インスタンスに対抗して位置づけられる：実行ごとのコンテナ起動ではなく、専用リソース、静的 IP、ゴールデンイメージのクローニング。

[`🔗 machine0`](https://machine0.io) · [`🔗 Launch HN スレッド`](https://news.ycombinator.com/item?id=49348136)

---

## 19. DDR5 が昨年の約 5 倍に——サーバー DRAM は今四半期さらに 13–18% 上昇と予測

- **Velocity:** ▮ steady
- **Source:** TrendForce · +486% YoY · ~2d ago (~04:03 UTC+8)
- **Tags:** `hardware` `memory` `supply-chain` `ai-infra` `pricing`

コンシューマ DRAM の価格は、AI データセンターと HBM 需要がコモディティ部品からファブ能力を引き離すにつれ、歴史的なトレンドから完全に分離した。**TrendForce**（8 月 17 日）は、ドイツの DDR5 小売価格指数が**8 月に前年比 445% から 486% へ上昇**——典型的なキットは現在**昨年の約 4.9 倍**——と報じ、深センの華強北市場では **DDR5 24Gb が前週比 14.29% 上昇の $48**、16Gb が $40、**DDR4 8Gb 3200 が前週比 12.82% 上昇の $22** となった。TrendForce は **3Q26 のサーバー DRAM 契約価格が前四半期比 13–18% 上昇**と予測し、市場は供給不足とし、サーバー DRAM 不足は 2027 年まで続くと見込む。Tom's Hardware の 8 月 18 日の見出しは小売側を **128 GB の DDR5 が $3,399** とする。

**重要性:** 「メモリは安くなる」という 20 年の常識が 12 か月のうちに巻き戻りつつあり、それは開発者に直接降りかかる——ローカル推論マシン、セルフホストのデータベース、CI フリートはすべて、もはや従来どおりに振る舞わない RAM に対して予算を組む。

> ソーシング注記：Tom's Hardware の記事本文はペイウォールのため、見出しの数値のみを引用する。パーセンテージとチップ単位の数値は、全文を読んだ TrendForce レポートによる。

[`🔗 TrendForce`](https://www.trendforce.com/news/2026/08/17/news-germany-ddr5-prices-near-5x-yoy-in-august-china-reportedly-sees-14-wow-jump-as-global-rally-continues/) · [`🔗 Tom's Hardware`](https://www.tomshardware.com/pc-components/ram/memory-prices-climb-500-percent-in-12-months-up-to-10x-the-lowest-ever-tracked-prices-128gb-of-ddr5-now-usd3-399)

---

## 20. Claude Code の +50% 週間リミットが 8 月 31 日に終了——スプリントを計画する前に `/usage` を確認せよ

- **Velocity:** ▮ steady
- **Source:** Hacker News · 235 pts · ~5h ago (~04:03 UTC+8)
- **Tags:** `claude-code` `limits` `pricing` `agents` `tooling`

Anthropic のヘルプセンターは、**Claude Code の週間使用量リミットを 50% 引き上げる**プロモーション——**2026 年 5 月 13 日**から実施され、すでに一度延長された——が **2026 年 8 月 31 日 午後 11:59 PT** に終了し、その後「Claude Code の週間使用量リミットは標準レベルに戻る」ことを確認している。対象は **Pro、Max、Team** プランとレガシーのシートベース Enterprise で、Free と消費ベースの Enterprise シートは対象外、自動適用で、**Claude Code のみ**（CLI、IDE 拡張、デスクトップ、ウェブ）をカバーする。**5 時間リミットは明示的に影響を受けない。** ページは基準となる数値を公開しておらず——実際の数値を見る唯一の方法は CLI の `/usage` である。

**重要性:** ヘビーユーザーの週間余力の 3 分の 1 が、既知の日に消える。プロモーション上限に合わせてエージェントワークフローを調整してきた者には再測定までの 12 日間があり、HN スレッドはすでに「$200/月プランの 90–100% を使っている」というユーザーで溢れている。

> この巻き戻しは標準リミットへの復帰であり、プランや課金の変更ではない——しかし、タスクの途中でしか表面化しない類の静かな容量削減である。

[`🔗 Anthropic サポート`](https://support.claude.com/en/articles/15910845-claude-code-may-august-2026-weekly-limits-promotion) · [`🔗 HN ディスカッション (235 pts)`](https://news.ycombinator.com/item?id=49348751)

---

## 21. Mojo のコンパイラが Apache-2.0 に——Lattner の言語の最後のクローズド部分が ModCon でオープン化

- **Velocity:** ▮▮▮ trending
- **Source:** Modular blog · modular/modular 27.1k stars · ~1d ago (~20:03 UTC+8)
- **Tags:** `mojo` `compiler` `open-source` `apache-2.0` `llvm`

**2026 年 8 月 18 日**、ModCon の開幕に合わせて Modular は、**Mojo🔥 が「Apache 2.0 ライセンス（LLVM 例外付き）の下で完全にオープンソースになった」** と発表した——コンパイラ、ツール群、「そしてこの言語をビルドするために必要な他のすべて」が `modular/modular` モノレポ（**27,123 スター、2,941 フォーク**、8 月 18 日プッシュ、Bazel でビルド）に収められた。これで 3 年かけた段階的なオープン化が完了する：標準ライブラリが 2024 年にオープン化し、MAX カーネルが 2025 年、そして今回コンパイラ自体がオープンになった。このフィードが **8 月 12 日の Mojo 1.0 安定版リリース**を取り上げた時点では、コンパイラのオープン化は「2026 年後半」と*約束*されただけだった——その約束は 6 日後に実現した。

**重要性:** クローズドなコンパイラは Mojo にインフラを賭けることへの恒常的な反対理由だったが、オープン化は Qualcomm による Modular 買収を乗り越えて実現した。ポータブルな CUDA 代替として売り出される言語のビルド経路に、もはやプロプライエタリな構成要素は残っていない。

> GitHub のライセンス検出は、LLVM 例外が自動検出を妨げるため、リポジトリ上で依然 `NOASSERTION` を報告する——Apache-2.0 という主張は Modular 自身のもので、私たちが読んだ告知に記されている。コンパイラへのコントリビューションはまだ受け付けられておらず、Modular は年末を目標としている。

[`🔗 Mojo がオープンソースに`](https://www.modular.com/blog/mojo-open-source) · [`🔗 modular/modular`](https://github.com/modular/modular)

---

## 22. Oracle が 1 日で 943 個のパッチを出荷——未認証の SMTP RCE が E-Business Suite に存在

- **Velocity:** ▮▮▮ trending
- **Source:** Oracle Security Alerts · CVSS 9.8 · ~1d ago (~20:03 UTC+8)
- **Tags:** `security` `cve` `oracle` `rce` `patch-cycle`

Oracle は **8 月 18 日に 2026 年 8 月版クリティカル・パッチ・アップデート**（Rev 1、初回リリース）を公開し、自らの集計によれば、このアドバイザリは「以下に列挙する製品ファミリー全体で **943 個の新しいセキュリティパッチ**」を含む。際立つのは **Oracle Workflow の Workflow Notification Mailer** における **CVE-2026-70926**：**CVSS 9.8**、攻撃ベクトルは **SMTP**、**認証なしで**リモートから悪用可能、**E-Business Suite 12.2.3–12.2.15** に影響し、機密性・完全性・可用性への影響は高。これだけではない——**CVE-2026-60782**（Oracle Payments、File Transmission、HTTP）も同じバージョンで **9.8・認証前**、**Helidon Imperative Web Server 3.2.18** の **CVE-2026-71065** はスコープが*変更*された上で **9.3** と評価される。**E-Business Suite 向けの 120 パッチのうち 27 個が認証情報なしでリモートから悪用可能**であり、Fusion Middleware は 262、Hyperion はさらに 262（うち 107 がリモート悪用可能）を占める。

**重要性:** EBS は大企業の財務・人事・調達を支えており、*メール*経路で到達する認証前 9.8 は、ほとんどのチームが攻撃対象面として想定したことのないリスナーである。

> ソーシング注記：ここでの数値はすべて Oracle 自身の CSPU ページから直接読んだものだ。このサイクルについて流通している第三者集計（「925 CVEs / 154 critical」）は Oracle が述べる 943 パッチと一致**しない**——私たちは Oracle の数値を報告する。アドバイザリ自体も「攻撃者が成功したのは、標的となった顧客が利用可能な Oracle パッチを適用しなかったためだ」と警告している。

[`🔗 Oracle CSPU 2026 年 8 月版`](https://www.oracle.com/security-alerts/cspuaug2026.html) · [`🔗 NVD CVE-2026-70926`](https://nvd.nist.gov/vuln/detail/CVE-2026-70926)

---

## 23. Linux 7.2 がキャッシュ認識スケジューリングとともに登場——「公平な」DRM スケジューラは土壇場で差し戻し

- **Velocity:** ▮▮▮ trending
- **Source:** kernel.org · mainline 7.2 · ~3d ago (~20:03 UTC+8)
- **Tags:** `linux-kernel` `scheduler` `usb4` `amdgpu` `kernel-release`

**kernel.org は現在 `mainline: 7.2`（日付 2026-08-16）を掲示している**——Linus Torvalds は予定どおりタグを打ち、これは Ubuntu 26.10 のベースとなる。Phoronix による主な追加点：**Cache Aware Scheduling**（データを共有するタスクを同じ最終レベルキャッシュドメインに集約）、Intel の **USB4STREAM** ホスト間転送プロトコル、初期 **AMDGPU HDMI 2.1 FRL** 対応、AMD と Intel 双方での I/O 性能向上、Intel Arc B390 の改善、高速化された `poll()`。最終週はいつもより慌ただしかった：新しい「公平」デフォルトがリグレッションを起こした後の **DRM FIFO スケジューラへの差し戻し**、遅れて入ったサウンドデバイスのクワーク、リリース当日にマージされた `tlbi=ipi` ブートオプション。

**重要性:** これは 2026 年のほとんどのディストロやクラウドイメージが引き継ぐカーネルベースラインであり、キャッシュ認識スケジューリングは、ユーザースペースの同意なしにマルチテナントのボックスでスループットを静かに変える類の変更である。

> LTS リリースではない——`stable: 7.1.8` と `longterm: 6.18.44` はともに 2026-08-09 付。機能リストは Phoronix のリリース記事に帰属し、リリース日とチャネルステータスは kernel.org のフロントページから直接取得した。

[`🔗 kernel.org`](https://www.kernel.org/) · [`🔗 Phoronix — Linux 7.2 リリース`](https://www.phoronix.com/news/Linux-7.2-Released)

---

## 24. Cumora——Claude Code が同僚になるチームチャットが 2 日で 2,469 スター

- **Velocity:** ▮▮▮ trending
- **Source:** GitHub · +2,469 stars in 2 days · ~1d ago (~20:03 UTC+8)
- **Tags:** `agents` `team-chat` `byoa` `claude-code` `typescript`

**yetone/cumora**（MIT、TypeScript、**8 月 17 日作成**、8 月 18 日プッシュ、**2,469 スター / 272 フォーク**）は、AI エージェントが一級の参加者となるクロスプラットフォームのチームチャットである——「同じ名簿、同じ DM、同じグループ会話、同じ Kanban ボードとカレンダー」。README によれば、エージェントは「ペルソナと記憶を持ち、仕事を引き受け、衝突せずに互いに連携し、本物のメールを送受信する」。頭脳の経路は 2 つ：**Cumora Cloud** は各エージェントを、OpenAI Responses API 上のマルチホップ・ツール呼び出しループで、管理されたエージェントごとのポッドで実行する。一方 **BYOA**（`npx cumora agent computer`）は自分の Mac や VPS とペアリングし、エージェントの頭脳は**自分のサブスクリプション上のローカルな Claude Code または Codex CLI となる——サーバーがプロバイダーの鍵を見ることは決してない**。スタックは Express + Postgres + Redis の上の Electron/PWA/モバイル。

**重要性:** トリガーはスター数ではなく作者だ——yetone は `avante.nvim` を書いた人物なので、これはすでに読者を伴って登場した。興味深い設計判断は BYOA である：既存のモデル支出に対して自分でホストするエージェントコラボレーションであり、ベンダーが途中でトークンを課金する形ではない。

> 誕生 2 日・招待制。`cumora.ai` はサーバーサイド取得に対して HTTP 403 を返した（クライアントレンダリング）ため、上記の主張はすべて、直接読んだリポジトリの README と GitHub API による。

[`🔗 yetone/cumora`](https://github.com/yetone/cumora) · [`🔗 Cumora リリース`](https://github.com/yetone/cumora-releases/releases/latest)

---

## 25. OpenZFS OZ-1——名前空間ローカルの CAP_SYS_ADMIN がホストプールへの権限として受理される、未パッチ

- **Velocity:** ▮▮ rising
- **Source:** oss-security · full disclosure · ~3d ago (~20:03 UTC+8)
- **Tags:** `security` `openzfs` `containers` `privilege-escalation` `unpatched`

研究者 **Erica Windisch** は **8/12/2026** に CERT へ通知した後、**oss-security（2026 年 8 月 16 日（日）14:32 -0400）**でフルディスクロージャーに踏み切った：「アップストリームのパッチと是正ガイダンスがまもなく利用可能になることを期待している。これらをしばらく寝かせていた」。中核の欠陥 **OZ-1** は報告書に率直に述べられている：OpenZFS の `zfs_secpolicy_config()` は **`ns_capable(cr->user_ns, CAP_SYS_ADMIN)`** を使うが、「これは名前空間ローカルの `CAP_SYS_ADMIN` をホストプール操作への権限として受理する。正しいチェックは**初期**ユーザー名前空間における `CAP_SYS_ADMIN` である」。任意のユーザーは、ユーザー名前空間を作成して自身をその中の uid 0 にマッピングすることで、名前空間ローカルの `CAP_SYS_ADMIN` を取得できる。報告書は**相互に関連する 2 つのグループ**——認可（OZ-1、OZ-2）と、「攻撃者が制御するディスク上の長さ、インデックス、またはグラフ構造を信用する」パーサー欠陥（OZ-3…OZ-8）——をカバーし、そのアップストリームパッチ監査は「すべての OZ 発見がアップストリーム master HEAD `3020c18c` で **UNFIXED** のままであることを確認」する。オープンで係争中の PR（#18620）があるのは OZ-7 のみである。

**重要性:** OpenZFS はツリー外であるため、報告書が述べるように「CVE の判断は Linux カーネルの CVE チームではなく、OpenZFS プロジェクトとそのベンダー/CNA に属する」——CVE が存在しないため、スキャナーはこれを検知できない。判定は、ストック状態の **TrueNAS SCALE 25.04.2.4、Proxmox VE 8.x、IncusOS、Unraid** のアプライアンスゲストで再現された。

> 慌てる前に前提条件を読むこと：**Docker のデフォルトケーパビリティセットは `CAP_SYS_ADMIN` を省略しているため、`--device /dev/zfs` だけでは `EPERM` で失敗する**——報告書はこれを「0.0 の誠実な陰性」と記録している。`--privileged` または `--cap-add SYS_ADMIN` で OZ-1 が再現される。作者自身の位置づけは、`/dev/zfs` を `0660` に強化することは「深層防御であり、カーネル内での正しい認可の代替ではない」というものだ。これに並んで流通している `hotmolts.com` の記事はクライアントレンダリングで、技術的内容がサーバーサイドから一切提供されないため、私たちは実際に読んだメーリングリストの投稿を引用する。

[`🔗 oss-security 開示`](https://www.openwall.com/lists/oss-security/2026/08/16/5) · [`🔗 oss-security スレッド返信`](https://www.openwall.com/lists/oss-security/2026/08/16/6)

---

## 26. MegaParts——自己回帰 3D 生成が 300 パーツ・256k トークンシーケンスに到達

- **Velocity:** ▮▮ rising
- **Source:** arXiv · 515 stars on HF Papers · ~5d ago (~20:03 UTC+8)
- **Tags:** `3d-generation` `autoregressive` `tokenizer` `computer-vision` `mesh`

**MegaParts**（arXiv:2608.14783、8 月 14 日投稿、cs.CV）は、モデルではなくトークン予算を攻めることで、パーツ認識型の 3D オブジェクト生成をスケールさせる。構造化シーケンスモデリングを、**トークン効率の良いベクトル量子化シェイプトークナイザ**と組み合わせる。これは「再構成を条件としてトークンを最小化する」という明示的な目的の下で、パーツレベルの幾何の離散潜在表現を学習し、可変長トークン化を可能にする。言語モデルはその後、オブジェクトのバウンディングボックス、パーツのバウンディングボックス、パーツシェイプトークンを**1 つの統合された構造化シーケンス**として出力する。長コンテキスト学習戦略と組み合わせ、アブストラクトはこの定式化が「最大 **300 パーツ**のオブジェクト、最大 **256k トークン**のシーケンス長までスケールする」と報告し、構成構造と細粒度のパーツレベル制御を保ち、自己回帰および拡散ベースラインより高いメッシュ品質を実現する。

**重要性:** 拡散は 3D 生成で勝利が前提視されてきた。300 パーツを 1 シーケンスに収めるトークン効率の良い自己回帰経路は、CAD・シミュレーション・ゲームアセットのパイプライン——そこでは表面のリアリズムだけでなく*パーツ構造*こそが成果物である——に LLM ネイティブのモデリングを再び呼び込む。

> メッシュ品質の比較は著者が選んだベースラインに対するもので、独立した再現はまだ存在しない。515 という数値は Hugging Face Papers のアップヴォート数であり、引用指標ではない。

[`🔗 arXiv:2608.14783`](https://arxiv.org/abs/2608.14783) · [`🔗 HF Papers`](https://huggingface.co/papers/2608.14783)

---

## 27. MOSS-VL——話し続けながら見続ける 11.3B のオープン VLM

- **Velocity:** ▮▮ rising
- **Source:** arXiv · 436 stars on HF Papers · ~4d ago (~20:03 UTC+8)
- **Tags:** `vision-language` `streaming` `realtime` `open-weights` `multimodal`

**MOSS-VL**（arXiv:2608.15045、8 月 15 日投稿、OpenMOSS）は、リアルタイム対話——「話しながら知覚する」——を遅延最適化ではなく一級の能力として扱う。設計はスタック全体で共同計画されている：**言語デコーダはゲート付きクロスアテンションを通じてのみ視覚に注目するため、生成中も到来するフレームを見ることができる**。合成された対話コーパスが「いつ話すか、いつ沈黙するか、いつ修正するか」を教師付けし、段階的カリキュラムがリアルタイム学習を最終段階に集中させる。**オープンソースのストリーミングモデル**の中では 4 ベンチマーク中 3 つで最高平均（4 つ目は 2 位）を記録し、プロアクティブ行動サブセットを総なめにする——OmniMMI Proactive Alerting では最良ベースラインに対して **66.0 対 37.5**。視覚トークンはデコードされたシーケンスの外側に置かれるため、同じバックボーンの Qwen3-VL-8B に対する time-to-first-token の優位は、視覚コンテキストの増大とともに **2.8 倍から 5.1 倍へ広がる**。5 つのチェックポイントすべて、学習カリキュラム、リアルタイム推論コードが公開されている。

**重要性:** ストリーミングのマルチモーダル推論は音声+視覚アシスタントに欠けていたピースであり、「視覚トークンをデコード済みシーケンスの外に置く」ことは、TTFT の差がコンテキストとともに縮むのではなく*広がる*具体的なアーキテクチャ的理由である。

> ベンチマーク数値は著者報告であり、比較対象は明示的にオープンソースのストリーミングモデルであって、フロンティアのクローズド VLM ではない。アブストラクト内のプロジェクトページ URL はプレースホルダーで、開いていない。

[`🔗 arXiv:2608.15045`](https://arxiv.org/abs/2608.15045) · [`🔗 HF Papers`](https://huggingface.co/papers/2608.15045)

---

## 28. PostgreSQL 19 Beta 3 がプロパティグラフをコアに——28 件の CVE パッチデーと同時に

- **Velocity:** ▮▮ rising
- **Source:** postgresql.org · 28 CVEs · ~6d ago (~20:03 UTC+8)
- **Tags:** `postgresql` `database` `sql-pgq` `graph-queries` `security`

PostgreSQL Global Development Group は **2026-08-13 に 19 Beta 3** を、**18.6、17.11、16.15、15.19、14.24** への更新とともに出荷した——**28 個のセキュリティ脆弱性**を修正する統合リリースであり、**CVE-2026-6464**（psql の `COPY FROM STDIN` 早期失敗がデータ行を psql コマンドとして処理する、CVSS v3.1 **8.1**）、CVE-2026-6469、CVE-2026-6470 を含む。Peter Eisentraut がコミットした v19 の目玉機能は、ISO/IEC 9075-16:2023 標準に準拠した **SQL Property Graph Queries (SQL/PGQ)** である：グラフパターンマッチングのための **`GRAPH_TABLE` テーブル関数**、**`CREATE`/`ALTER`/`DROP PROPERTY GRAPH`** DDL、新しいシステムカタログと information-schema ビュー、`psql \dG` コマンド、`pg_dump` 用の `pg_get_propgraphdef()`。

**重要性:** 既存テーブルの上に定義されるプロパティグラフ——データコピーなし、2 つ目のデータストアなし——は、Postgres 環境にグラフデータベースを追加する恒常的な理由を取り除く。同日に行われた、サポート対象の 5 メジャーバージョンにまたがる 28-CVE パッチの方が、より緊急性の高い半分である。

> Beta 3 はバグ修正イテレーションである：SQL/PGQ は v19 サイクルの早い段階で機能凍結されており、8 月 13 日のイベントはベータ更新に大規模なセキュリティデーが重なったもので、機能デビューではない。GA は秋が見込まれる。

[`🔗 PostgreSQL リリース告知`](https://www.postgresql.org/about/news/postgresql-186-1711-1615-1519-1424-and-19-beta-3-released-3365/) · [`🔗 depesz — SQL/PGQ`](https://www.depesz.com/2026/07/31/waiting-for-postgresql-19-sql-property-graph-queries-sql-pgq/)

---

## 29. Chrome が 15 件の欠陥を修正——その 1 件のクレジットは「OpenAI Codex Security」

- **Velocity:** ▮▮ rising
- **Source:** Chrome Releases · 15 security fixes · ~1d ago (~20:03 UTC+8)
- **Tags:** `chrome` `browser-security` `ai-security-research` `v8` `webgl`

Chrome の安定チャネルは**2026 年 8 月 18 日（火）に 151.0.7922.169/.170（Windows、Mac）と .169（Linux）へ移行**し、**15 件のセキュリティ修正**を含む。2 件は **Critical** と評価される——**CVE-2026-76034**（WebGL のバッファオーバーフロー）と **CVE-2026-76036**（Dawn のバッファオーバーフロー）で、いずれも Google が報告。ブレティンでより興味深いのは最後の行だ：**CVE-2026-76045、WebGL の use-after-free、「OpenAI Codex Security (amyb) により 2026-08-05 に報告」**。他にも修正：2 件の V8 型混乱（CVE-2026-76047、CVE-2026-76038、ともに High、外部研究者 ywatanabee と un3xploitable && GF が報告）、ANGLE のバッファオーバーフロー、Browser の use-after-free、USB の競合状態、Skia の情報漏えい。

**重要性:** AI 研究所のセキュリティチームが Chrome のクレジット行に登場する——メモリ安全でないグラフィックス経路における本物の use-after-free に対して——というのは、通常はブログ投稿で語られる主張の具体的な形である。これはこのフィードの項目 7 とも呼応する：エージェントによる監査が、いまやベンダーアドバイザリに収載される発見を生み出している。

> 流通している数値の訂正：2 件の V8 型混乱は Critical ではなく **High** と評価されている——Critical の 2 件は WebGL と Dawn のバッファオーバーフローである。ここでの深刻度とクレジットは、第三者による CVSS マッピングではなく Google 自身のブレティンから引用している。公開時点で実環境での悪用は報告されていない。

[`🔗 Chrome Releases — 安定チャネル更新`](https://chromereleases.googleblog.com/2026/08/stable-channel-update-for-desktop_0826575033.html) · [`🔗 Chrome セキュリティページ`](https://www.google.com/chrome/browser/privacy/#security)

---

## 30. macOS Harness——6 つのプリミティブ、1 つの Python プロセス、残りはエージェントが書く

- **Velocity:** ▮▮ rising
- **Source:** GitHub · +428 stars in 2 days · ~2d ago (~20:03 UTC+8)
- **Tags:** `computer-use` `macos` `agents` `python` `harness`

**browser-use/macos-harness**（MIT、Python、**8 月 17 日作成・プッシュ**、**428 スター / 26 フォーク**）は、browser-use の背後にいる組織による、意図的に可能な限り薄いコンピュータ利用レイヤーである。README の位置づけ：「エージェントが、タスクの途中で、欠けているものを書く。フレームワークも、レシピも、レールもない。macOS、あなたの本物のブラウザ、そしてファイルに直接つながる 1 つの Python プロセス」。モデルに与えられるのは小さなプリミティブセット——see、key、type、click、それにアクセシビリティとスクリプトアクセス——であり、タスクにヘルパーが存在しないときは、アプリ固有のツールが追加されるのを待つのではなく、**実行中に普通の Python で欠けているロジックを書く**。オンボーディングは、Codex か Claude Code に貼り付ける 1 つのプロンプトで、Python 3.12 上で `uv` によりインストールし、`macos-harness skill` でスキルを登録し、`macos-harness doctor` で権限チェックを実行し、実行中のアプリをキャプチャして検証する。

**重要性:** デスクトップ自動化が壊れ続けるのは、アプリごとのレシピが腐るからだ。生のプリミティブを組み合わせ、実行時にグルーを生成することは、API を持たない GUI 作業のロングテールに対する構造的な修正である——そしてそれは UI-Mate（項目 9）と同じ「ライブインターフェースから再プランニングする」テーゼを、学習済みモデルではなくセットアップ 400 行のツールとして出荷したものだ。

> 誕生 2 日、公開ベンチマークなし、そして「レールがない」ことは設計であると同時にセキュリティ姿勢でもある：macOS の Accessibility と AppleScript の権限面を全面的に引き継ぐ。主張は直接読んだ README と GitHub API による。

[`🔗 browser-use/macos-harness`](https://github.com/browser-use/macos-harness) · [`🔗 browser-use`](https://browser-use.com)

---

## 31. OpenAI の Assistants API が 8 月 26 日にシャットダウン——7 日後、自動マイグレーションなし

- **Velocity:** ▮▮ rising
- **Source:** OpenAI platform docs · 7-day deadline · ~ongoing (~20:03 UTC+8)
- **Tags:** `openai` `api` `deprecation` `migration` `breaking-change`

OpenAI のマイグレーションガイドは率直に述べる：「Responses API で機能同等を達成したため、Assistants API を非推奨としました。**2026 年 8 月 26 日にシャットダウンします**」。オブジェクトモデルは機械的に対応しない——ドキュメント自身の before/after テーブルは **`Assistants` → `Prompts`**（「Prompts は設定（モデル、ツール、指示）を保持し、バージョン管理と更新が容易」）、**`Threads` → `Conversations`**、`Runs` → `Responses`、`Run steps` → `Items` と名称を変更し、この変更は「`previous_response_id` を渡し戻す代わりに会話を管理できるようにする」。

**重要性:** あと 7 日——これは今週、開発者のカレンダーに載る最も具体的な締め切りである。名称変更テーブルはコード変換ではない：Threads は生きた会話状態を保持しており、それを Conversations へ移すバックフィルツールは存在しない。

> 新たな告知というよりは、かねて予定されていたものだ——非推奨化は 2025 年に遡る。そのニュース価値は締め切りにあり、未移行の統合が本番で壊れる窓に入った今である。

[`🔗 OpenAI Assistants マイグレーションガイド`](https://developers.openai.com/platform/assistants/migration) · [`🔗 platform.openai.com`](https://platform.openai.com/docs/assistants/migration)

---

## 32. Google が 8 月 17 日に Imagen 4 の 3 エンドポイントすべてを停止——代替は異なる API 形状

- **Velocity:** ▮ steady
- **Source:** Gemini API docs · 3 models retired · ~2d ago (~20:03 UTC+8)
- **Tags:** `google` `gemini-api` `deprecation` `image-generation` `breaking-change`

Google の Gemini API 非推奨テーブルは現在、**`imagen-4.0-generate-001`、`imagen-4.0-ultra-generate-001`、`imagen-4.0-fast-generate-001`**——いずれも 2025 年 6 月 24 日リリース——を、**シャットダウン日 2026 年 8 月 17 日**、3 つすべての**推奨代替として `gemini-3.1-flash-image`** とともに掲載している。代替はモデル ID の差し替えではない：`gemini-3.1-flash-image` は、専用の Imagen エンドポイントではなく現在の画像生成サーフェス経由で到達する汎用 Gemini 画像モデルであり、リクエストとレスポンスの形状が異なる。

**重要性:** これはすでに発動している。いまだに Imagen 4 エンドポイントを呼んでいるアプリは、まさに今ランタイムで失敗しており、修正は設定行ではなくコード移行である——最も容赦のない種類の非推奨化だ。

> ソーシング注記：第三者の記事は、削除された具体的なパラメータ（`negativePrompt`、`numberOfImages`、`personGeneration`）と、より高い画像あたりのトークン価格を主張する。私たちはそれらを Google 自身のページで確認できず、したがって主張しない。シャットダウン日と代替の対応は非推奨テーブルから直接得たものだ。

[`🔗 Gemini API 非推奨`](https://ai.google.dev/gemini-api/docs/deprecations) · [`🔗 Gemini API 画像生成`](https://ai.google.dev/gemini-api/docs/image-generation)

---

## 33. Con Kolivas が 10 年ぶりに -ck を復活——linux-7.2-ck1 が MuQSS v0.31 を同梱

- **Velocity:** ▮ steady
- **Source:** GitHub · tag v7.2-ck1 · ~2d ago (~20:03 UTC+8)
- **Tags:** `linux-kernel` `muqss` `scheduler` `desktop-latency` `out-of-tree`

**`ckolivas/linux` は 2026-08-17 にタグ `v7.2-ck1`（"linux-7.2-ck1"）を公開した**——前日にリリースされたメインラインカーネルにリベースされた -ck デスクトップレイテンシパッチセットである。リリースノートは **「MultiQueue Skiplist Scheduler v0.31」** を、一連のレイテンシ指向デフォルトとともに列挙する：**MuQSS と -ck パッチの組み合わせでデフォルト Hz を 100 に設定**、**プリエンプティブルカーネルをデフォルト化**、hrtimer の粒度と最小 hrtimeout を sysctl で設定可能に（デフォルト粒度 100µs、最小タイムアウト 500µs）、`schedule_timeout` の高分解能タイムアウト版、そして `nohz_full` はデフォルト設定オプションとして拾われなくなった。`v7.1-ck3` タグも同日に着地した。

**重要性:** MuQSS は、メインラインのスケジューラがデスクトップを犠牲にしてスループットを最適化しているという、最も知られた主張だったが、長年沈黙していた。現行カーネルに対する維持されたリベースとしての復活は、その主張に再び実験場を与える。

> 明示的にツリー外であり、メインラインを目指していない。-ck は歴史的にサーバーやメニーコアのワークロードをリグレッションさせてきた。上記の詳細は、私たちが読んだ GitHub のリリースノートから引用している——I/O 認識スケジューリングや LLM 支援開発に関する二次的な主張は検証しておらず、MuQSS はスキップリストスケジューラであって、一部の報道が言うような EEVDF 派生ではない。

[`🔗 ckolivas/linux — v7.2-ck1`](https://github.com/ckolivas/linux/releases) · [`🔗 Phoronix — Con Kolivas パッチ`](https://www.phoronix.com/news/Con-Kolivas-Linux-Patches-2026)

---

## 34. CVE-2026-21580——Confluence の未認証ストアード XSS がより高権限のユーザーへエスカレーション

- **Velocity:** ▮ steady
- **Source:** NVD · CVSS 8.6 · ~1d ago (~20:03 UTC+8)
- **Tags:** `security` `cve` `atlassian` `confluence` `stored-xss`

**CVE-2026-21580**（8 月 18 日公開）は、**Confluence Data Center および Server** における **ストアード XSS、権限昇格、セキュリティ設定ミス**を複合した欠陥で、**CVSS スコアは 8.6**。NVD の説明によれば、「**未認証の攻撃者**が被害者のブラウザ上で任意の HTML または JavaScript コードを実行し、より高権限のユーザーとして行動し、セキュリティのベストプラクティスが軽視されて露出した抜け穴を利用してシステムに侵入する」ことを許す。これは長いテールにわたるリリース——7.1.1、7.4.0、7.13.0、7.17.0、7.19.0、8.0.0、8.5.0、8.9.0、9.0.1、9.1.0、9.2.0、9.3.1、9.4.0、9.5.1、10.0.2、10.1.0、10.2.0——に導入され、修正は **9.2.21 以降**と **10.2.13 以降**にある。

**重要性:** Confluence は組織がランブック、認証情報に隣接するメモ、アーキテクチャ文書を置く場所である。管理者のセッションで実行される未認証のストアード XSS は、「社内 wiki」から「管理者乗っ取り」への短い道のりだ。

> Atlassian のバグ報奨金を通じて報告され、開示時点で公開エクスプロイトはない。注意：影響を受けるバージョンの一覧は、連続した範囲ではなく多くのブランチにまたがる*導入*ポイントを列挙している——目視ではなく、修正バージョンに対して正確なビルドを確認せよ。

[`🔗 NVD CVE-2026-21580`](https://nvd.nist.gov/vuln/detail/CVE-2026-21580) · [`🔗 OpenCVE CVE-2026-21580`](https://app.opencve.io/cve/CVE-2026-21580)

---

## 35. Palmyra x6——626 件のトラジェクトリと 1 エポックでポストトレーニングされたツール利用モデル

- **Velocity:** ▮ steady
- **Source:** arXiv · v2 Aug 18 · ~1d ago (~20:03 UTC+8)
- **Tags:** `agentic` `tool-use` `post-training` `moe` `benchmarks`

**Palmyra x6**（arXiv:2608.16620、Writer、8 月 17 日投稿、v2 8 月 18 日）は、Mixture-of-Experts ベースを「検証済みの合成ツール利用トラジェクトリのコンパクトなコーパス上で、Muon + Adam ハイブリッドで最適化された **Anchored Supervised Fine-Tuning**」によりポストトレーニングして構築された、エージェント型ツール利用モデルである。レシピこそが発見だ：論文はこれを「意図的に保守的で、意図的に制御された——**626 トラジェクトリ、単一エポック、低学習率、凍結ベースへの KL アンカー**」と呼ぶ。Writer の従来のデフォルトエージェントモデルに対する大幅な改善と、「BFCL Core で最高の **0.785** を記録し、コホート中最高の 6 ベンチマーク平均を達成」を報告し、バイアスと安全性評価でも競合または先行する。

**重要性:** これはポストトレーニングにおける「less is more」方向のクリーンなデータポイントである——KL アンカーと数百件の*検証済み*トラジェクトリがデータ喰いのレシピに勝つということは、トラジェクトリの大量生産なしでも有能なツール呼び出しを手に入れられることを意味する。

> 12 ページのベンダー技術レポート。「コホート中最高」は著者が選んだ比較セットに対するもので、独立した再現は存在しない。

[`🔗 arXiv:2608.16620`](https://arxiv.org/abs/2608.16620) · [`🔗 Writer`](https://writer.com)

---

## 36. HarnessEval-W——スコアではなく証拠ツリーとして再構築されたワールドモデル評価

- **Velocity:** ▮ steady
- **Source:** arXiv · 132 stars on HF Papers · ~2d ago (~20:03 UTC+8)
- **Tags:** `world-models` `evaluation` `benchmarks` `agents` `llm-judge`

**HarnessEval-W**（arXiv:2608.16859、8 月 17 日投稿）は、「ベンチマークはスカラースコア以上のものを提供すべきだ：評価を信頼に足るものにするのは、スコアを正当化する推論である」と論じる——特にワールドモデルでは、「ロールアウトの判定には、物理・因果・ワールド状態が正しく発展するかを理解することが必要」であり、人間はそれを自然に見抜くが、既存の指標は力技で計算する。固定ルーブリックをエージェント型ワークフローに置き換える：ケースを解釈し、測定可能なサブ問題に分解し、診断ツールを持つ専門サブエージェントを派遣し、その後、親エージェントが集めた証拠を検証して判定を要約する——「すべての評価を、完全な推論連鎖が結果を正当化する透明な**証拠ツリー**へ変える」。**18 の代表的ワールドモデル、330 の評価ケース**に適用され、フルパイプラインはライブベンチマークとしてオープンソース化された。

**重要性:** 生成動画やロボットシミュレータは今日、ロールアウトが*なぜ*間違っているかを言えないスコアで判定されている。物理と因果の違反を監査可能にすることは、パイプラインでそのどちらも信頼するための前提条件である。

> 「人間の選好と密接に一致する」というのは著者自身の特徴づけであり、その整合性研究は独立に再現されていない。アブストラクト内のプロジェクトページ URL はプレースホルダーで、開いていない。

[`🔗 arXiv:2608.16859`](https://arxiv.org/abs/2608.16859) · [`🔗 HF Papers`](https://huggingface.co/papers/2608.16859)

---

## 37. SoLo——静的 musl バイナリにホストの glibc GPU ドライバを dlopen させる

- **Velocity:** ▮ steady
- **Source:** Hacker News · 74 pts · ~4d ago (~20:03 UTC+8)
- **Tags:** `linux` `static-binaries` `elf` `vulkan` `musl`

**pg83/solo**（MIT、C++、**8 月 14 日作成**、8 月 17 日プッシュ、**283 スター**）は、静的 Linux デプロイにおける特定の、長年の壁を攻める。その README は問題を正確に述べる：「静的バイナリは Linux にソフトウェアをデプロイする、素晴らしく退屈な方法だ：1 ファイル、依存関係なし、壊れるものなし……退屈は、アプリが GPU を必要とした瞬間に終わる：Vulkan と OpenGL のドライバは共有オブジェクトとしてホストから供給され、通常 glibc に対してビルドされており、**完全に静的な musl バイナリは通常それらを `dlopen()` できない**」。SoLo はこの境界を越えるため、「独自の **ELF ローダー（x86-64 および aarch64）**と、**musl の上に実装された glibc ABI ブリッジ**に支えられた `dlfcn` 風のソース API」を提供する——コンテナなし、AppImage なし、プロセス内に 2 つ目の libc もなし。

**重要性:** 「退屈な静的ファイルを 1 つ出荷する」ことは、GPU ソフトウェア以外のすべてに可能だった。その例外を取り除くことは再現可能ビルドとサプライチェーンが可読な配布にとって重要である——コンテナイメージは単一バイナリよりはるかに大きな「信頼せざるを得ないもの」だからだ。

> 誕生 5 日、タグ付きリリースなし。作者自身の IX ソースファーストビルドシステムに依存する。説明と機構は直接読んだ README から引用している。

[`🔗 pg83/solo`](https://github.com/pg83/solo) · [`🔗 IX ビルドシステム`](https://github.com/pg83/ix)

---

## 38. OwnMem——レビュー可能な Markdown としてのエージェント記憶、想起時のモデル呼び出しゼロ

- **Velocity:** ▮ steady
- **Source:** GitHub · npm `ownmem@0.2.0` · ~1d ago (~20:03 UTC+8)
- **Tags:** `agent-memory` `git` `bm25` `local-first` `coding-agents`

**grpcer/ownmem**（Apache-2.0、JavaScript、Node ≥20、**8 月 16 日作成**、8 月 18 日プッシュ、53 スター）は、標準的なエージェント記憶スタックを逆転させる。そのサブタイトルこそテーゼだ——「**Git-Native Project Memory for AI Coding Agents: Repo-owned. Deterministic. Reviewable.**」。キュレーションされた決定、制約、デバッグの教訓はリポジトリ内に Markdown として存在するため、記憶はプルリクエストで差分表示され、クローンとともに移動し、コードとともにロールバックされる。想起は埋め込みではなく決定的な BM25 系ランカーで動き、リポジトリ自身のバッジは **想起 P95 2.46 ms、モデル呼び出し 0** をうたう。1 つの記憶セットが Claude Code、Codex、Antigravity、Cursor、Gemini CLI、Grok CLI をサービスすると主張される。npm レジストリは **`ownmem@0.2.0`**（初公開 2026-08-16、これまで 4 バージョン）を確認する。

**重要性:** ほとんどのエージェント記憶は埋め込みモデルとベクトルストアを付け加えるが、それは不透明で、非決定的で、レビュー不可能にする。プレーンテキストと決定的なランカーこそ、コードレビューを生き延びる形である——そしてこれは今朝のベクトルインデックスの項目（turbovec、項目 3）とは正反対の賭けだ。

> 非常に若く、単一メンテナー：53 スター、1 フォーク、誕生 4 日。2.46 ms P95 はプロジェクト自身が公開したベンチマークで、独立に再現されたものではない——私たちは npm レジストリでパッケージとバージョンを、README の主張を検証したのであり、タイミングではない。

[`🔗 grpcer/ownmem`](https://github.com/grpcer/ownmem) · [`🔗 npm レジストリ — ownmem`](https://registry.npmjs.org/ownmem)

---

## 39. OpenLogi——Rust 製・ローカルファーストの Logitech Options+ 代替が Hacker News 首位に

- **Velocity:** ▮▮▮ trending
- **Source:** Hacker News · 908 pts · #1 フロントページ (~20:03 UTC+8)
- **Tags:** `rust` `hidpp` `peripherals` `local-first` `open-source`

**AprilNEA/OpenLogi**（9,500 スター、809 コミット、MIT/Apache-2.0 デュアルライセンス）は Logitech Options+ のネイティブかつローカルファーストな代替品で、Logi Bolt・Unifying・Bluetooth・USB 経由で HID++ 周辺機器と直接通信し、アカウントもテレメトリも不要。3 つの Rust コンポーネントが機能を分担する：GPUI デスクトップアプリ（対話的なデバイス図、ボタンごとのアクションピッカー、DPI と SmartShift の制御、RGB、アプリ別プロファイル）、OS の入力フックとデバイス I/O を握るバックグラウンドエージェント、ヘッドレスな機器インベントリと診断のための CLI——設定はすべてバージョン管理可能な単一 TOML ファイルに保存される。**908 ポイントで Hacker News 首位**、250 コメントを獲得した。

**Why it matters:** この HN の急上昇は「肥大化したベンダーユーティリティをネイティブ Rust で置き換えたい」という需要のリアルタイムなシグナルであり、OpenLogi は Options+ が対応しなかった Linux を第一級プラットフォームとして扱い、`.deb`/`.rpm`/`.pkg.tar.zst`、udev ルール、NixOS モジュールを提供する。

> macOS 13+/Linux/Windows のクロスプラットフォーム対応。Windows 11 は最新の移植版で、README は他ビルドに比べ「粗い部分が多い」と明記している。

[`🔗 AprilNEA/OpenLogi`](https://github.com/AprilNEA/OpenLogi) · [`🔗 HN ディスカッション (908 pts)`](https://news.ycombinator.com/item?id=49355606)

---

## 40. Cerebras CS-4——初のマルチウェハ推論ラックが今四半期出荷、「GPU より 30 倍高速」

- **Velocity:** ▮▮▮ trending
- **Source:** The Next Web · ~325 pts HN · ~1d ago (~20:03 UTC+8)
- **Tags:** `ai-hardware` `inference` `cerebras` `hpc` `wafer-scale`

Cerebras は 8 月 18 日の Supernova イベントで **CS-4** を発表した：同社初の**マルチウェハ**推論システムで、3 枚の **WSE-3 Turbo** ウェハを 1 ラックに収め、**750 PFLOPS のスパース FP16** と **129.6 PB/s** のメモリ帯域を実現、50T 超パラメータのモデルに対応し、ウェハ間レイテンシを 5 から 2 µs に短縮、ラックあたり約 120–140 kW（同等の AMD/Nvidia ラックの約半分）。初回出荷は四半期末までを予定。見出しの「GPU ベースのシステムより最大 **30 倍高速**」は**シングルユーザー**指標——`gpt-oss-120b` でユーザーあたりの 1 秒あたりトークン数を、名称非公開の GPU システムと比較したもの——であり、The Register の分析によれば WSE-3 Turbo は**新シリコンではない**：WSE-3 と同じ 4T トランジスタ/90 万コア/44 GB SRAM のダイを約 1.4 から 2.8 GHz にクロックアップしただけで、真の新世代は 2027 年予定。

**Why it matters:** 55.5 億ドルの Nasdaq 上場後初のハードウェアであり、OpenAI の「Ultrafast」GPT-5.6 Sol モードが Cerebras シリコンで稼働してから 5 日後に登場——Nvidia への推論特化の直接挑戦だが、見出しの速度主張は狭いベンチマークとクロックアップしたダイの上でしか成立しない。

[`🔗 The Next Web — CS-4`](https://thenextweb.com/news/cerebras-cs-4-wafer-scale-ai-inference-system) · [`🔗 HN ディスカッション (325 pts)`](https://news.ycombinator.com/item?id=49354949)

---

## 41. CVE-2026-67443——FUXA の guest-JWT バイパスが Node-RED エディタに到達し未認証 RCE

- **Velocity:** ▮▮▮ trending
- **Source:** OpenCVE · CVSS 9.2 · ~1d ago (~20:03 UTC+8)
- **Tags:** `security` `cve` `scada` `ot` `node-red`

**CVE-2026-67443**（**CVSS v4 9.2**、8 月 18 日公開、FUXA **1.3.3** で修正）は、オープンソースの SCADA/HMI プロセス可視化プラットフォーム **FUXA** の認可欠落（CWE-862）脆弱性。`/nodered` の `allowDashboard` ゲートは JWT を検証するがデコードされたアイデンティティを検査しないため、Node-RED 統合・セキュアモード・`nodeRedAuthMode: secure` がすべて有効な場合、未認証の攻撃者が `POST /api/heartbeat` から署名付き **guest トークン**を取得し、Node-RED エディタとフロー展開 API に到達できる——関数ノードを展開し、`fuxa.runScript` を呼び出し、`nodeRedUnsafeModules` が有効なら OS コマンド実行に至る。

**Why it matters:** 産業/OT ネットワーク上に置かれるソフトウェアへの、インタラクションなし・資格情報なしのコード実行。セキュアモードゲートが主要な防御だったが、それはエクスプロイトではなく設計によって迂回される。

[`🔗 NVD CVE-2026-67443`](https://nvd.nist.gov/vuln/detail/CVE-2026-67443) · [`🔗 OpenCVE CVE-2026-67443`](https://app.opencve.io/cve/CVE-2026-67443)

---

## 42. CVE-2026-71539——n8n の Git クローン競合がサーバーとして動くカスタムノードを植え付ける

- **Velocity:** ▮▮ rising
- **Source:** OpenCVE · CVSS 8.9 · ~1d ago (~20:03 UTC+8)
- **Tags:** `security` `cve` `n8n` `race-condition` `rce`

**CVE-2026-71539**（**CVSS v4 8.9**、8 月 18 日公開、**1.123.64 / 2.29.8 / 2.30.1** で修正）は、n8n の Git クローンノードにおける TOCTOU 競合（CWE-367）：認証済みのワークフローユーザーがクローン前に検証済みディレクトリをシンボリックリンクにすり替え、community-node ディレクトリに細工したリポジトリを植え付け、それがサーバー再起動後にカスタム JavaScript ノードとして読み込まれ——ホスト上で任意コードを実行する。n8n は広くセルフホストされており、ワークフロー編集者は通常低権限ながらサービス資格情報を持つため、権限昇格への経路は短い。

**Why it matters:** これは「確認してから使う」競合が、秘密情報を抱えて半信頼の自動化を実行することを本分とするツールで起きた典型例。ワークフローとホストの間のファイルシステム境界は隔離面であって飾りではない、という教訓。

[`🔗 NVD CVE-2026-71539`](https://nvd.nist.gov/vuln/detail/CVE-2026-71539) · [`🔗 OpenCVE CVE-2026-71539`](https://app.opencve.io/cve/CVE-2026-71539)

---

## 43. Agent Lightning v1.0——Microsoft のハーネス型エージェンティック RL が Qwen3.5-9B の SWE-bench を 41.8%→56.4% に

- **Velocity:** ▮▮ rising
- **Source:** arXiv · v1 8 月 18 日 · ~1d ago (~20:03 UTC+8)
- **Tags:** `rl` `agents` `post-training` `coding-agents` `framework`

**Agent Lightning v1.0**（arXiv:2608.17528、Microsoft、8 月 18 日投稿）は、RL の間**デプロイ時の agent ハーネス**に環境ループを握らせ、トレーナーは LLM のリクエスト/レスポンスのペアだけを見るようにする——約 3,500 行で、再トークン化、サンプル結合、アドバンテージ計算、損失正規化、バックエンドスケジューリングを任意のハーネスにわたって扱う。主要な結果：**6K 例**で **Qwen3.5-9B** をファインチューニングし、**SWE-bench Verified を 41.8% から 56.4%** に引き上げ（+14.6 ポイント）、パイプラインも公開されている。

**Why it matters:** 「ハーネスが訓練に参加する」ことは実用的なエージェントモデルの標準アーキテクチャになりつつあり——アブストラクトはこのパターンが後に verl Uni-Agent、AReaL 2.0、slime、Polar に採用されたと記す——これはその転換の再現可能なリファレンス実装である。

[`🔗 arXiv:2608.17528`](https://arxiv.org/abs/2608.17528) · [`🔗 HF Papers`](https://huggingface.co/papers/2608.17528)

---

## 44. Abra——Luma の拡散スケーリング則：計算最適は約 200 image tokens/パラメータ、Chinchilla の約 10 倍

- **Velocity:** ▮▮ rising
- **Source:** arXiv · v1 8 月 18 日 · ~1d ago (~20:03 UTC+8)
- **Tags:** `diffusion` `scaling-laws` `image-generation` `compute-optimal` `research`

**Abra**（arXiv:2608.17286、Luma AI、8 月 18 日投稿）は、テキスト→画像拡散モデルのスケーリング則を導くため、約 10¹⁹–10²² FLOPs にわたって学習させたフローマッチング Transformer の統制ファミリー。知見はこうだ：拡散は言語モデルと同様に予測可能にスケールするが、計算最適点はおよそ**パラメータあたり 200 image tokens——LLM の Chinchilla 処方の約 10 倍**——であり、拡散は過学習に頑健なので、著者らは**モデルを大きくするよりデータを増やす**ことを勧める。損失、CFG 設定、表現品質、学習曲線の形状はすべて普遍的な形式に収束する。

**Why it matters:** これは「拡散版 Chinchilla」に最も近い成果であり、画像/動画チームが訓練予算をどう配分するかを直接変える——これまで推測に頼っていた領域に具体的な意思決定ルールをもたらす。

[`🔗 arXiv:2608.17286`](https://arxiv.org/abs/2608.17286) · [`🔗 HF Papers`](https://huggingface.co/papers/2608.17286)

---

## 45. MoNe——モジュール型ニューラルメモリが再学習なしで長文脈の計算・メモリを約 80% 削減

- **Velocity:** ▮▮ rising
- **Source:** arXiv · v1 8 月 18 日 · ~1d ago (~20:03 UTC+8)
- **Tags:** `long-context` `memory` `transformers` `efficiency` `research`

**MoNe**（arXiv:2608.17616、8 月 18 日投稿）は、任意の凍結済み事前学習 Transformer に軽量な**モジュール型ニューラルメモリ**をボルトオンする：コンテキストは固定サイズのセグメントで読み込まれ、テスト時に学習するファストウェイトメモリに保存される。推論時、メモリはクエリトークンだけからキー/バリューを生成するため、コンテキストの再読み込みが不要になる。**128K トークン**では、コンテキスト内学習と比べて計算とピーク GPU メモリを約 **80%** 削減し、パラメータオーバーヘッドはわずか **6.4%**。前処理 O(N)、クエリ O(1) で、バックボーンのネイティブウィンドウを超えても RULER タスクで高い性能を維持する。

**Why it matters:** 推論コストをコンテキスト長から切り離す——このフィードが追う長文脈エージェントワークロードに必要な効率改善で、ファインチューニングも基盤モデルの変更も不要。

[`🔗 arXiv:2608.17616`](https://arxiv.org/abs/2608.17616) · [`🔗 HF Papers`](https://huggingface.co/papers/2608.17616)

---

## 46. NorthCinder——署名付き購入マンデートを備えた、買い手主導のショッピングエージェント MCP サーバー

- **Velocity:** ▮▮ rising
- **Source:** GitHub · 1.2k スター · ~2d ago (~20:03 UTC+8)
- **Tags:** `mcp` `agents` `shopping-agent` `local-first` `commerce`

**cinderline/northcinder**（MIT、1.2k スター、npm では `northcinder@0.1.2`）は、AI ショッピングエージェント向けのセルフホスト MCP サーバー。設定済みストアアダプタ（Shopify、WooCommerce、API 経由の eBay/Etsy、ユーザー管理ブラウザプロファイルによる Amazon の読み取り専用）を検索し、採用理由と却下理由を機械可読で添えたランキング付きショートリストを返し、チェックアウト前には**別途の・署名付き・単回使用・支出上限付き**の承認を要求する。ランキングは買い手基準のみ——「売り手の支払いは入力ではない」——で、スポンサー枠はラベル付けされ全オーガニック結果の下に置かれ、ローカル監査証跡を保持する。

**Why it matters:** エージェント商取引は、スポンサーランキングとテレメトリがブローカー経路に焼き込まれた形で到来しつつある。買い手がランカーを動かし、署名鍵を持ち、監査ログを保持するサーバーは、このカテゴリに欠けていた信頼モデルであり、「エージェントがカードで間違ったものを買う」失敗モードへの直接の対抗策でもある。

[`🔗 cinderline/northcinder`](https://github.com/cinderline/northcinder) · [`🔗 npm レジストリ — northcinder`](https://registry.npmjs.org/northcinder)

---

## 47. Mureka V9.5——Kunlun Wanwei の MusiCoT 音楽モデルが 97% のプロンプト制御良品率を主張

- **Velocity:** ▮▮ rising
- **Source:** PingWest · 8 月 18 日リリース · ~1d ago (~20:03 UTC+8)
- **Tags:** `music-generation` `model-release` `multimodal` `chain-of-thought` `audio`

**Kunlun Wanwei（崑崙万維）**は 8 月 18 日に **Mureka V9.5** をリリースした。AI 音楽生成モデルで、**MusiCoT**（music chain-of-thought）フレームワークに基づき、オーディオ生成*前*に曲全体から局所表現に至る完全な音楽ロジックを構築する。ベンダー内部評価は**ボーカル品質良品率 61.0%**、**プロンプト制御良品率 97.0%**、**ジャンル/スタイル忠実度 95.7%** を報告し、**25,000 件以上**のユーザーフィードバックで改善。国風（中国伝統様式）の歌詞明瞭度やハーモニーの重層化も顕著に向上した。

**Why it matters:** 主要な中国系 AI 音楽ベンダーによる、公開指標を伴う具体的なモデルリリース。Alibaba の HappyShrimp が同分野に参入した翌日にあたり、テキスト→音楽がデモではなく競合する出荷済みカテゴリになりつつあることを示す。

[`🔗 PingWest — Mureka V9.5`](https://www.pingwest.com/w/316546) · [`🔗 Mureka`](https://www.mureka.ai/)

---

## 48. Sprix SAGE Router——A2A エージェントネットワーク向け SELF/COLLABORATE/HANDOFF ルーティング

- **Velocity:** ▮ steady
- **Source:** GitHub · 362 スター · ~1d ago (~20:03 UTC+8)
- **Tags:** `routing` `agents` `a2a` `multi-agent` `orchestration`

**wang2122/sprix-sage-router**（MIT、Python、362 スター）は、A2A プロトコルのディスカバリとタスク実行の間に位置する意思決定レイヤーで、実行途中に現職エージェントが単独で続行するか（SELF）、所有権を保ちつつ協力者を募るか（COLLABORATE）、所有権を完全に移譲するか（HANDOFF）を選ぶ。権限・予算・期限の制約下でタスク DAG の役割を構成し、依存関係をスケジュールし、学習済みアウトカムモデルとビームサーチによるチーム編成で実行証跡から信頼を更新する。現在は初期のリサーチプレビュー（v0.2、12 コミット）。README の 2,500 タスクシミュレーション（0.634 vs 現職のみの 0.507 品質）は合成データと明記されている。

**Why it matters:** A2A（現 Linux Foundation プロトコル）が成熟するにつれ、未解決の問題は「エージェントは会話できるか」から「いつ協力し、いつ引き継ぐか」に移る——その問いへの証拠ベースの学習的回答こそ、ディスカバリと実行の間に欠けていた中間層である。

[`🔗 wang2122/sprix-sage-router`](https://github.com/wang2122/sprix-sage-router) · [`🔗 a2aproject/A2A`](https://github.com/a2aproject/A2A)

---

## 49. Benjamin-Plus——JetBrains が実測したトークン効率スキルがコーディングエージェントのコストを 17.9% 削減

- **Velocity:** ▮ steady
- **Source:** GitHub · JetBrains · ~2d ago (~20:03 UTC+8)
- **Tags:** `coding-agents` `skills` `token-efficiency` `cost` `benchmark`

**JetBrains/benjamin-plus-skill**（MIT、約 745 トークンのルールセット）は、コーディングエージェントが*何を*作るかではなく、*どのように*情報を調べ待つかを変える——1 パスでの偵察、ファイル全体ではなく 50 行の「キーホール読み」、環境のプローブは 1 回、タスク自身の検証コマンドを完了の定義として扱う。80 の SkillsBench タスクのペア A/B（Claude Code + Sonnet 5）では、注入したスキルが**コスト中央値 −17.9% を品質不変のまま**実現し（7 改善/5 悪化/68 同数）、Codex の SWE-bench 実行ではコスト −4.4%、ツール呼び出し −20% を示した。README の重要なハーネス詳細：注入すれば節約になるが、発見可能なフォルダとしてインストールすると「何も節約されない」。

**Why it matters:** 実ベンダー（JetBrains）が実測結果を公開した珍しいスキルであり、その「配信方法」という知見は、エージェントスキルを配布する誰にとっても直接応用できる。

[`🔗 JetBrains/benjamin-plus-skill`](https://github.com/JetBrains/benjamin-plus-skill) · [`🔗 benchflow-ai/skillsbench`](https://github.com/benchflow-ai/skillsbench)

---

## 50. Autoprompt——Terminal-Bench の失敗を 45% 削減するマルチエージェントスキル（60/89 → 73/89）

- **Velocity:** ▮ steady
- **Source:** GitHub · 138 スター · ~2d ago (~20:03 UTC+8)
- **Tags:** `coding-agents` `skills` `multi-agent` `terminal-bench` `orchestration`

**Spielewoy/autoprompt-skill**（MIT、v1.0.0）は、Claude Code、Codex、OpenCode、Kilo Code、VS Code、Prime Agent の 6 つのコーディングエージェントを、階層化されたマルチエージェント構成（調整/管理/実行/独立判断レイヤー）に包み、1 つのエージェントが自分の作業を計画・承認・検証のすべてを担わないようにする。Terminal-Bench 2.1 で OpenCode 1.18.7 を使い、解けた数を **60/89 から 73/89 に——失敗 45% 減**——引き上げたが、約 3× の時間と約 2× のトークンというトレードオフが明記されている。README はこれがスイープではなく単回の実測であると明言する。

**Why it matters:** 「エージェント間で計画/承認/検証を分離する」ことは誰もが同意するガバナンスパターンだが、数値として公開するスキルは少ない。公開ベンチマークで失敗 45% 減、しかもコストのトレードオフまで開示する——まさにこのフィードが追う、エビデンスファーストの主張である。

[`🔗 Spielewoy/autoprompt-skill`](https://github.com/Spielewoy/autoprompt-skill) · [`🔗 harbor-framework/terminal-bench`](https://github.com/harbor-framework/terminal-bench-1)

---

## Metadata

| Field | Value |
|-------|-------|
| Generated | 2026-08-19T20:03:00Z |
| Items | 50 |
| Sources tracked | 51 (GitHub, Hacker News, arXiv, NVD, CISA, Hugging Face, kernel.org, Oracle Security Alerts, Chrome Releases, openwall oss-security, postgresql.org, depesz, Phoronix, Modular, ai.google.dev, OpenAI Platform Docs, OpenCVE, npm registry, mcpindex.ai, atto.cash, acadia.engineering, TrendForce, Tom's Hardware, It's FOSS, Notebookcheck, Anthropic Support, machine0, GenLayer Foundation, Lavx, Mandiant, GitHub Advisories, docs.microsandbox.dev, ui-mate.github.io, leaflet.pub, browser-use.com, pingwest.com, mureka.ai, thenextweb.com, and vendor advisories) |
| Update schedule | 04:03, 12:03, 20:03 UTC+8 (3x daily) |
| Ranking | Velocity-weighted (recency × engagement acceleration × source authority) |
| License | [CC-BY 4.0](https://creativecommons.org/licenses/by/4.0/) |

---

[前日](../2026-08-18/) · [生 .md](../2026-08-19.md) · [アーカイブ](../../archive/)
