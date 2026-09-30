---
date: 2026-09-30
updated: 2026-09-30T12:03:00+08:00
schedule: 04:03, 12:03, 20:03 UTC+8
sources: 24
license: CC-BY-4.0
---

## 1. Dots：OpenAI の常駐エージェントがリークから製品へ——各エージェントが「専用クラウドコンピュータ」を持つ

- **Velocity:** ▮▮▮ trending
- **Source:** OpenAI DevDay · HN 350+ pts · 約3時間前 (~01:07 UTC+8)
- **Tags:** `openai` `agents` `devday` `product-launch`

9月29日のリークされた「o」アシスタント報道のアップデート：DevDay で **Dots** として正式公開された。GPT-6 Astra 駆動の常駐型（always-on）エージェントで、専用クラウドコンピュータ上で動作し、4,000以上のアプリに接続、ChatGPT/Slack/Teams から利用でき、「フィードバックから学習し続ける」。バックグラウンドの「プロアクティブリサーチ」は読み取り専用（「メッセージ送信・アプリ内容の変更・ブラウザやコンピュータの操作は不可」）；保存したパスワードは「モデルに露出することなく」利用可能；重要な操作はカスタムルールに基づく自動レビューを経て、監視システムはタスク途中でエージェントを一時停止できる。Pro と Business Premium に順次展開（最初の1体は無料）；Enterprise/Edu/Healthcare は管理者有効化のベータ。**OpenAI 自身が明記する限界：**「Dots もミスをしうるため、重要な作業は必ず確認を」、パスワード変更などの機微な操作は常にユーザー自身が行う。法人向けスペシャリスト dot（調達・請求・サポート）はエンタープライズパイロット段階で、Microsoft Agent 365 との統合を計画。

**Why it matters:** これが最初の主流向け常駐型コンシューマエージェントである。この3か月で記録されてきたエージェントサンドボックス脱出や過剰権限のインシデント（本 feed の9月26〜29日報道）こそ、デフォルト読み取り専用のリサーチモードが想定する脅威モデルだ。12億週間アクティブユーザー規模で、一人一台の24時間365日クラウドコンピュータが統治可能かどうかが本当の実験である。

[`🔗 OpenAI`](https://openai.com/index/introducing-dots/) · [`🔗 DevDay 2026 レポート`](https://openai.com/index/devday-2026-recap/) · [`🔗 HN 議論`](https://news.ycombinator.com/item?id=49896604)

---

## 2. NVIDIA OpenShell がデイリートレンド首位に——「エージェントは実クレデンシャルを見ない」ポリシー強制ランタイム

- **Velocity:** ▮▮▮ trending
- **Source:** GitHub Trending · 本日 +978、10.4k★ · 約0時間前 (~04:00 UTC+8)
- **Tags:** `nvidia` `sandbox` `agent-security` `rust`

NVIDIA の OpenShell——「自律 AI エージェント群のための安全でプライベートなランタイム」——が本日の GitHub トレンドで最上位の新規リポジトリ（Rust、Apache-2.0、Python/TypeScript/Go/Rust SDK）。仕組みは：ポリシーで各エージェントが触れるものを宣言し、OpenShell がカーネルレベルで強制する（ファイル・システムコール・ネットワーク）——「すべてのネットワーク接続は、サンドボックスを出る前にポリシーチェックを通過」し、クレデンシャルは承認済みエンドポイント宛のリクエストにのみ注入される。ポリシー変更は形式検証を経て、リスクの高い許可は人間のレビュー用にフラグされる。README のテレメトリ節は、収集*しない*ものについて異例に具体的：サンドボックス名・パス・プロンプト・クレデンシャル・モデル名は収集しない。本日の急上昇の引き金は二段重なりと見られる：NVIDIA の9月15日付形式手法開発ノート（「エージェントポリシー証明器への形式手法適用で学んだこと」、HN 40 pts）と、9月29日の「なぜ隔離は安全ではないのか」という批評——トレンドに乗っているのはツールだけでなく、この議論そのものだ。

**Why it matters:** 本 feed が1か月にわたり記録してきたエージェントサンドボックス脱出（DNS トンネリング、Medicare ポータルアクセス、SharePoint 型ツール悪用）の後、ハードウェアベンダーが支援するカーネルサンドボックスと形式検証済みポリシーは「境界優先」路線の対抗提案であり、「隔離 ≠ 安全」という批評こそ、それをめぐって交わされるべき正しい議論だ。

[`🔗 NVIDIA/OpenShell`](https://github.com/NVIDIA/OpenShell) · [`🔗 形式手法開発ノート`](https://nvidia.github.io/OpenShell-Research/dev-notes/posts/2026-09-10-learning-formal-methods-agent-policy-prover/) · [`🔗 HN 議論`](https://news.ycombinator.com/item?id=49713261)

---

## 3. PS5「Relapse」エクスプロイトチェーンが公開——ファームウェア 7.00〜13.60 でカーネル読み書き

- **Velocity:** ▮▮▮ trending
- **Source:** GitHub / HN · 821★、HN 129+ pts · 約4時間前 (~23:44 UTC+8)
- **Tags:** `ps5` `exploit` `console-hacking` `security-research`

PlayStation 5 向けの公開カーネルエクスプロイトチェーンが GitHub と HN フロントページに登場：ブラウザ段階は JSC 情報リークに structured-clone オブジェクトプールの不整合を組み合わせて typedarray を破壊；カーネル段階はアドレスリークと `aio_multi_wait` の Use-After-Free 競合を組み合わせてカーネル読み書きに到達——ファームウェア 7.00〜13.60 をカバーし、公開されている PS5 対応範囲として最広。実行成功するとポート 9021 で ELF ローダーが待ち受ける。README は WebKit 入口が「複数回の再読み込みが必要な場合がある」こと、カーネル段階が「ハングやパニックを起こしうる」ことを明記；TheFlow、Sleirsgoevy、Flatz らコンソール研究コミュニティに謝辞。MIT ライセンスで、セキュリティ研究専用と明記。

**Why it matters:** 数年分のファームウェアにわたるカーネル r/w は、PS5 の攻撃対象領域が構造的に開かれたことを意味する——研究者には再現可能な BSD 系カーネル実験場となり、Sony にとっては 9.00 対策が閉じようとしていた海賊版の問題が再び開く（ただし明示された用途は海賊版ではなく homebrew）。

[`🔗 ntfargo/Relapse-Exploit`](https://github.com/ntfargo/Relapse-Exploit) · [`🔗 HN 議論`](https://news.ycombinator.com/item?id=49895304)

---

## 4. GPT-6.1 Sol「5分の1の価格で Astra に迫る知能」が HN で大論争に——コスト計算自体に脚注

- **Velocity:** ▮▮ rising
- **Source:** OpenAI · HN 547+ pts · 約3時間前 (~01:07 UTC+8)
- **Tags:** `openai` `pricing` `gpt-6-1` `benchmarks`

OpenAI が安全問題で Astra 6.1 のローンチを取りやめた（9月27〜29日報道）数日後、6.1 系で実際に出荷されたモデルが HN フロントページの価格論争の的になった：GPT-6.1 Sol はコーディング・コンピュータ操作・専門業務で Astra に迫る性能を、Astra の標準 API トークン価格の**5分の1**で提供すると主張——ベンチマーク表では Terminal-Bench Science が 56.7%（Astra は 68.1%）、Sol は GPT-6 Sol を全面で同等以上。本日から Pro および Business Premium 顧客に提供。「Ultrafast」版は後日。**ページ自体が付ける注意書き：**見出しのコスト比較には脚注がある——Fable 5.1 との比較は、約40%のタスクでより大きなモデルへフォールバックする費用が含まれず、Fable のコストを「過大評価している可能性」がある；「Astra に迫る」はベンチマークごとの主張で全体の結論ではない；Astra は表示されているすべてのフロンティア表で首位を維持。HN スレッド（458コメント）の大半は「5分の1の価格」で実際に何が買えるかについて。

**Why it matters:** 価格対性能フロンティアが1週間でまた動いた——まず Sonnet 5.5、次いで 6.1 Sol——そして両ベンダーが自らの割引脚注を公開するようになった。これは本 feed が求め続けてきた比較衛生そのものだ。

[`🔗 OpenAI`](https://openai.com/index/introducing-gpt-6-1-sol/) · [`🔗 HN 議論`](https://news.ycombinator.com/item?id=49896586)

---

## 5. ChatGPT Pro 500：月500ドルの新ティア、Ultrafast はそこだけで使える

- **Velocity:** ▮▮ rising
- **Source:** OpenAI Help Center · HN 142+ pts · 約2.5時間前 (~01:26 UTC+8)
- **Tags:** `openai` `pricing` `subscription` `astra`

OpenAI の Pro プランが3ティアに分裂：Pro 100（$100/月）、Pro 200（$200/月）、そして新 **Pro 500**（$500/月）——**Astra Ultrafast** を含む唯一の Pro ティア（モデルピッカーで選択可；まずプラン内利用枠を消費し、次にクレジット残高から）。全 Pro ティアで Pro モデル、Codex、ディープリサーチ、ファイルアップロードは維持。既存の Pro 200 購読者は現在の（より高い）利用枠を **2026年10月29日**までしか保持できず、以降は新しい低い利用枠へ移行する。ローンチ時点で、Pro 100 や 200 でのクレジット購入では Ultrafast は解放されない。

**Why it matters:** 500ドルのコンシューマティアは「二速度フロンティア」を制度化した——最速の知能はエントリー Pro の5倍の価格で計量される——そして10月29日の利用枠削減は、多くのチームが実際に標準化したティアにとって事実上の値上げだ。

[`🔗 OpenAI Help Center`](https://help.openai.com/en/articles/9793128-about-chatgpt-pro-tiers) · [`🔗 HN 議論`](https://news.ycombinator.com/item?id=49896975)

---

## 6. Jevstiller：Jev 級の決定モデルをローカルに蒸留——統計的な一致度の上限つき

- **Velocity:** ▮▮ rising
- **Source:** Show HN · 52+ pts · 約8時間前 (~20:05 UTC+8)
- **Tags:** `distillation` `decision-models` `statistics` `show-hn`

Jev ウェーブ最大の難問に答える Show HN 投稿：ホスト型決定モデルをローカルの生徒モデルに置き換えるとき、どうやって同じ答えを返すと*知る*のか？Jevstiller の答えは契約である：「数字を1つ、たとえば98%を設定する。Jevstiller は、その割合以上のリクエストで Jev が返したはずのラベルを返す」。凍結した bge-small エンコーダ＋ロジスティック回帰が、教師の完全な確率分布で学習；被覆率 `c` と誤り率 `e` を正確な Clopper–Pearson 区間で上限付けし、システムの一致度を目標以上に保つ。実測：素朴なしきい値ルールは「約半分の確率で予算を破った」（タスクごと20分割のうち6〜12回）；上限付きルールは4タスクで 0/20、5つ目で 1/20 の違反にとどまり、その代償は被覆率4〜8ポイント減。教師が密かに答えを変えたソークテストでは、ローカル処理率が4分で90%→9%に低下。**投稿自身の注意書き：**保証されるのは一致度であり正確さではない——「Jev が間違えていれば、ローカルモデルも同じように間違える」——かつ、キャリブレーションデータが将来のトラフィックに似ているという前提がある。

**Why it matters:** Jev エコシステム（先週のマッピングで2,170の公開プロジェクト）は、正しさの契約なしにコストを最適化してきた。conformal 型の上限は、私たちが見た中で最初の、モデル置き換えを雰囲気ではなく監査可能にする仕組みだ。

[`🔗 Jevstiller`](https://jevstiller.pages.dev/posts/the-guarantee/) · [`🔗 HN 議論`](https://news.ycombinator.com/item?id=49891769)

---

## 7. SharePoint のコードインジェクション CVE-2026-65660 が CISA KEV に掲載——パッチの6週間後に実攻撃

- **Velocity:** ▮▮ rising
- **Source:** CISA KEV · 9月25日追加 · 約5日前
- **Tags:** `sharepoint` `cve` `kev` `microsoft`

CVE-2026-65660——Microsoft Office SharePoint における「コード生成の不適切な制御」で、*認可済み*攻撃者がリモートでコード実行可能——が9月25日、CISA の既知の悪用済み脆弱性（KEV）カタログに追加された。SSVC は悪用を**アクティブ**、技術的影響を**total**と評価。スコアの帰属がここでは重要：CVSS 8.8（Microsoft がセカンダリソースとして CNA 割り当て；ベクトル AV:N/AC:L/PR:L——低権限が必要）。パッチは8月11日から存在；NVD の参照には「2段階の悪用試み」に関するサードパーティ分析が含まれる。対象：SharePoint Enterprise Server 2016、Server 2019、Subscription Edition——いずれも現行セキュリティリリースで修正済み。

**Why it matters:** 「8月11日にパッチ済み」と「9月25日に実攻撃」の間の時間差が、パッチ管理論争のすべてだ——8月サイクルを先送りしたオンプレ SharePoint ファームこそ現在の標的集団であり、PR:L は侵害された低権限アカウント1つで十分であることを意味する。

[`🔗 NVD`](https://nvd.nist.gov/vuln/detail/CVE-2026-65660) · [`🔗 MSRC アドバイザリ`](https://msrc.microsoft.com/update-guide/vulnerability/CVE-2026-65660)

---

## 8. 「ポストトレーニングは行動の残像を残す」——教師の単語1つで能力が転写される

- **Velocity:** ▮▮ rising
- **Source:** arXiv / Hugging Face · HF デイリー 249 upvotes · 約5日前 (9月24日)
- **Tags:** `research` `distillation` `interpretability` `subliminal-learning`

「Post-Training Leaves Behavioral Shadows on Unrelated Decisions」（arXiv:2609.29233）は、昨年の subliminal learning の発見を特性から*能力*へ拡張する：Active Taskless Distillation（ATD）は、教師と生徒の共有祖先が2つの普通の単語の間でほぼ無差別となるプロンプトを見つけ、そのプロンプト・単語ペアだけで生徒を学習させる——「プロンプトごとに教師の単語1つ」で、タスク例も logits も重みアクセスも不要。Qwen2.5-1.5B は HumanEval+ で交絡一致対照より5.34ポイント上昇；転写は科学知識・常識推論・読解で成立し、モデル世代やファミリーを越え、その強さは教師の更新幅に追従。コード公開済み（CC BY 4.0）。要旨ページに限界節は明示されていない——結果の強さを考えれば、読者はこの欠落に警戒を保つべきだ。

**Why it matters:** ポストトレーニングの効果が無関係な単語1つを通じて漏れ出すなら、「クリーン」な生徒モデル、合成データパイプライン、モデル交換監査のすべてに、現在誰も検査していないより深刻な汚染経路が存在することになる——そして安全面の含意（無害な生成物を通じた能力の密輸）は不穏だ。

[`🔗 arXiv:2609.29233`](https://arxiv.org/abs/2609.29233) · [`🔗 HF Papers`](https://huggingface.co/papers/2609.29233)

---

## 9. Google、Chromebook サポートを2034年に終了——公約の10年より2年短い

- **Velocity:** ▮▮ rising
- **Source:** The Register · HN 149+ pts · 約6時間前 (~22:12 UTC+8)
- **Tags:** `google` `chromeos` `googlebook` `platform-risk`

Google のサポート文書によれば、今購入する Chromebook は **2034年**にアップデートが終わる——公表の10年ポリシーに対し8年しかない——同社が Gemini 組み込みの新「Googlebook」ライン（「Googlebook OS」搭載）へ軸足を移すなかでのこと。Google はライフサイクルが「2034年を超える」機器には Googlebook OS への移行パスを提供するとしているが、「移行パスと対象機器の詳細は後日公開」——しかも移行には Googlebook OS 管理ツールの新ライセンス購入が必要で、ChromeOS ライセンスは引き継げない。現時点で教育向けモデルを出す Googlebook パートナーはなく、学校——ChromeOS の中核ユーザー層——は短縮された時計の下で調達を続けるしかない。The Register の読み：「Chromebook の継続利用を魅力的でなくしたい Google の意図は明らかだ」。

**Why it matters:** 今月2度目の Google プラットフォームライフサイクル削減（Android 開発者認証の強制は9月30日開始）であり、最も強制移行を吸収できない機器層に直撃する——いまだ ChromeOS に標準化するすべての調達判断にとって、具体的なプラットフォームリスクのデータポイントだ。

[`🔗 The Register`](https://www.theregister.com/os-platforms/2026/09/29/google-ending-chromeos-support-two-years-early/5299674) · [`🔗 HN 議論`](https://news.ycombinator.com/item?id=49893653)

---

## 10. EFF：DraftKings が AI で負け続ける顧客を行動ターゲティング——使ったのは第一者データのみ

- **Velocity:** ▮▮ rising
- **Source:** EFF Deeplinks · HN 375+ pts · 約4時間前 (~00:30 UTC+8)
- **Tags:** `eff` `behavioral-advertising` `gambling` `privacy`

EFF の9月24日深掘り記事（9月29日に HN フロントページへ）：DraftKings は顧客の賭け記録から ML モデルを訓練し、*お金を失いそうな*ユーザーを特定、会社が負けると予想する賭けに戻すプロモーションを標準配信する。記事の構造的論点：これは「第一者データ」のみで動いた——第三者ブローカーは関与しない——したがって、第三者データ共有を狙った規制では手が届かない；EFF の結論は、オンライン行動ターゲティング広告そのものの禁止という政策解だ。証拠連鎖は NYT 報道（9月19日）、広告技術データの保険会社・政府機関への転売に関する CalMatters、広告技術由来データ調達を探る ICE RFI。記事にあるのは EFF の論証であり DraftKings 側の反論ではない——会社側の見解は記事にない。

**Why it matters:** 「第一者データなら問題ない」は業界の10年にわたるプライバシー防衛線だった。各ユーザーの最悪の結果を見つけ出し、それを本人に売り返す営利的で合法的なシステムは、これまでで最もクリーンな反例だ——しかも本 feed が毎日扱う ML ツールで作られている。

[`🔗 EFF Deeplinks`](https://www.eff.org/deeplinks/2026/09/draftkings-using-ai-supercharge-harms-online-behavioral-advertising) · [`🔗 HN 議論`](https://news.ycombinator.com/item?id=49896050)

---

## 11. Linux カーネルの3脆弱性が CISA KEV に掲載——ebtables 範囲外書き込みと af_alg 競合、いずれも実攻撃中

- **Velocity:** ▮ steady
- **Source:** CISA KEV · 9月18日追加 · 約12日前
- **Tags:** `linux` `kernel` `kev` `cve`

CISA は9月18日、Linux カーネルの3脆弱性を KEV カタログに追加し、いずれも実攻撃を受けていると表示した。筆頭は **CVE-2026-53266**：ebtables SNAT ターゲットの範囲外書き込み——`skb_store_bits()` 経由の ARP 送信者ハードウェアアドレス書き換えが、対象範囲の書き込み可能性を確認していなかったため、非線形 skb フラグメント内の splice 由来ファイルページに直接書き込めえた。CVSS 8.8（CISA コーディネーターによる CWE-787；ローカルベクトル、scope changed）。併せて掲載の **CVE-2025-39964**：`af_alg_sendmsg` の競合で、同時書き込みがソケット状態を破壊——スコアの分裂も注目に値する（NVD 主スコア 5.5 対ベンダー 7.8）——および CVE-2025-39682。修正は現行安定版系列に入っている（5.10.245+ … 6.17）；対応期限は9月21日。Siemens によれば CVE-2025-39964 は SIMATIC S7-1500 産業用 PLC にも影響する。

**Why it matters:** カーネル脆弱性が KEV に達したということは、デフォルト拒否が Linux ホストにも重要ということだ——非特権ローカルコード（コンテナ含む）＋これらのプリミティブは今月の特権昇格チェーンであり、対象 PLC ファームウェアの産業利用ではパッチ適用が最も遅い。

[`🔗 NVD: CVE-2026-53266`](https://nvd.nist.gov/vuln/detail/CVE-2026-53266) · [`🔗 NVD: CVE-2025-39964`](https://nvd.nist.gov/vuln/detail/CVE-2025-39964) · [`🔗 CISA KEV`](https://www.cisa.gov/known-exploited-vulnerabilities-catalog)

---

## 12. Tcl/Tk 9.1 リリース——スクリーンリーダーアクセシビリティと双方向テキストが Tk に

- **Velocity:** ▮ steady
- **Source:** tcl-lang.org · HN 140+ pts · 約3時間前 (~01:13 UTC+8)
- **Tags:** `tcl` `tk` `release` `gui`

Tcl/Tk 9.1.0 が9月29日リリース。Tcl は `unicode` コマンド（正規化）、マイクロ秒単調時計 `timer`、`lfilter`、`interp set` による子インタープリタ変数アクセス、`expr` の C99 数学関数、メモリ効率の良い大規模リスト内部実装と拡張された64ビット対応を獲得。Tk の目玉は何年も遅れていたプラットフォーム対応：**スクリーンリーダーアクセシビリティ対応**と**初めての双方向/RTL テキスト描画**に加え、`ttk::toggleswitch`、Aqua の `send` 改訂、Windows XP 外観サポートの削除。アプリは初期化時に `Tcl_FindExecutable` か `TclZipfs_AppHook` を呼ぶ必要がある——本リリース唯一の移植注意点。

**Why it matters:** Tk はすべての CPython に同梱され、無数の組み込み・学術ツールに潜んでいる。アクセシビリティと RTL が2026年にようやく到来したことは、必要に駆られた Tk の復権と、「GUI ツールキット」のベースラインがどれだけ動いたかの両方を物語る。

[`🔗 Tcl/Tk 9.1`](https://www.tcl-lang.org/software/tcltk/9.1.html) · [`🔗 HN 議論`](https://news.ycombinator.com/item?id=49896712)

---

## 13. MassAlloc Attention：注意機構が自ら計算量を配分する——128K コンテキストで学習フォワード2.2倍

- **Velocity:** ▮ steady
- **Source:** arXiv / Hugging Face · HF デイリー 64 upvotes · 約3日前 (9月26日)
- **Tags:** `research` `attention` `efficiency` `long-context`

「MassAlloc Attention: Let Attention Allocate Its Own Compute」（arXiv:2609.32712）が提案する MALA は、融合型アテンションプリミティブで、すべての因果交互作用へのスコアアクセスを保ちつつ、正規化寄与（オンライン softmax の正規化子そのもの）でスコア後の計算の実行可否を決める——訓練と推論で同じトレランスを共有し、バックワードパスは確定済み正規化子を再利用する。128K トークン・テンソル並列で実測：学習フォワード2.2倍、バックワード3.0倍、デコード1.6倍。忠実度は近いがゼロではない：8K の連想記憶は 89.67%（FullAttn は 89.97%）；平均省略質量 0.0188%（oracle は 0.0182%）。スケーリング実験（0.6B〜14B）はより低い FLOPs で FullAttn のパープレキシティに追従；継続学習した 14B/32B は知識・推論・長文脈検索で同等。要旨ページに限界節はなく、上記の差分が正直なコストだ。

**Why it matters:** 動的スパースアテンションは同じ教訓を繰り返し導いている——正規化子は質量の場所をすでに知っている——しかし MALA がそれを訓練/推論一貫の単一プリミティブとしてバックワード込みで出荷したことで、論文トリックではなく使えるものになった。

[`🔗 arXiv:2609.32712`](https://arxiv.org/abs/2609.32712) · [`🔗 HF Papers`](https://huggingface.co/papers/2609.32712)

---

## 14. Reclip：yt-dlp の上に150行の Flask を載せただけで1万★突破——しかし引き金が見つからない

- **Velocity:** ▮ steady
- **Source:** GitHub Trending · 10.0k★、本日 +114 · 約0時間前 (~04:00 UTC+8)
- **Tags:** `yt-dlp` `self-hosted` `media` `flask`

Reclip——1,000以上のサイトから動画/音声をダウンロードできるセルフホスト Web UI、内部は yt-dlp と ffmpeg——が GitHub デイリートレンドに10.0k★で登場。引き金を探したが見つからない：コミットは計19、リリースなし、HN での話題もなし（HN の「reclip」ヒットはすべて無関係か反応なし）、README からのブログリンクもない。スタックは意図的に最小——約150行の Flask バックエンド、単一ファイルのバニラフロントエンド、依存は2つ。README には個人利用限定の免責があり、著作権と各プラットフォームの利用規約の尊重を求めている。**正直な読み：**これは単一イベントではなく、yt-dlp 自体の人気の上にセルフホストメディア需要が複利で積もったものに見える——まさに Void の教訓の逆で、あちらは指標だけあって物語がなかった；今回は指標は本物で、*原因*が単に見える記録に存在しないだけだ。

**Why it matters:** トレンドリストは系統的に「原因のあるもの」を優遇するため、原因なしに上昇したリポジトリは誤読されがちだ。Reclip は「優れたエンジンの上の薄い UI への需要」自体が durable な原因であることを思い出させる——そして yt-dlp がこのカテゴリ全体の耐力壁であり続けていることの証明でもある。

[`🔗 averygan/reclip`](https://github.com/averygan/reclip) · [`🔗 yt-dlp（基盤エンジン）`](https://github.com/yt-dlp/yt-dlp)

---

## 15. livenerf：Opus 5.5 はリリース後に密かに弱体化したのか——事前登録済み 30 日間の検証装置が HN 1 位に

- **Velocity:** ▮▮▮ trending
- **Source:** HN フロントページ 1 位 · 350+ pts、コメント 150+ · 約6時間前 (~06:36 UTC+8)
- **Tags:** `evals` `benchmarks` `opus-5-5` `model-drift`

ninjahawk/livenerf——「フロンティアモデルがリリース後に静かに悪化していないかを検出する、長期実行型の・可能な限り決定論的なベンチマーク」——が HN フロントページのトップストーリーになった。「Anthropic はリリース後にモデルをナーフする」という数か月分の報告は常に「雰囲気対雰囲気」で終わってきた。そこでこのリポジトリはリリース日（Opus 5.5、9 月 22 日）に時計を合わせ、30 日間毎日実行する：1〜10 日目がベースライン、以降は 2 つの 10 日ウィンドウ、最初の判定可能日は約 10 月 24 日。英国 AI 安全研究所（AISI）の Inspect フレームワーク上に構築し、headless Claude Code 経由で実行。CLI は 2.1.280 に固定、プロンプト凍結、完全一致の採点（「LLM ジャッジは一切使わない」）、生ログは追記専用。統計手法は Anthropic 自身の誤差幅論文に従う。キャリブレーションでは 2,336 問をスクリーニングし、時々正解する 78 問でパネルを構成——選択バイアスも実測し（新しいサンプルでの正答率は 54.7% → 62.0%）、監査で疑わしい解答鍵 8 件と曖昧な問題 30 件を検出。いずれも事前登録済みの感度分析のもとで保持している。9 月 29 日時点で 30 日のうち 6 日分を回収、欠落なし。**README が自ら明記する限界：**1 日 1 回の実行で検出できるのは、10 日ウィンドウあたり約 7.5 ポイントの精度変化が限界。さらに検証では、同系ファミリーでのモデル差し替え（Opus 5 を 5.5 に見せかける）は 99% 信頼で*識別できなかった*（−3.8 ± 6.3 ポイント、トークン −23%）——この装置ではその規模の差し替えは捉えられない。測定対象は生の API ではなく、Max サブスクリプションの Claude Code 経由で提供されるモデルである点も念頭に。

**Why it matters:** 「モデルが悪くなった」についに再現可能な計測器ができた——事前登録、対照群、クラスタ標準誤差付きで——しかも検出できる範囲の誠実な限界が計画のすぐ隣に書いてある。二次シグナル（サンプルあたりの出力トークン数）は、静かな努力量の引き下げが精度の動きに先行して最初に現れる場所だ。

[`🔗 ninjahawk/livenerf`](https://github.com/ninjahawk/livenerf) · [`🔗 HN 議論`](https://news.ycombinator.com/item?id=49901736)

---

## 16. America.gov 始動：米政府の「AI フロントドア」——その背後には大統領令

- **Velocity:** ▮▮▮ trending
- **Source:** White House / GovExec · HN 445+ pts · 約14時間前 (~22:04 UTC+8)
- **Tags:** `government` `ai-deployment` `chatbot` `policy`

America.gov が 9 月 29 日、AI チャットボットによる連邦政府の「デジタルフロントドア」として再始動した。「Hello, America」イベントで発表され、同じ日に GSA・National Design Studio・OMB に対し、対象サービスの「単一のエントリーポイント」にするよう命じる大統領令が署名された——対象は年間 10 万人以上にサービスするオンラインの連邦サービスで、Login.gov との統合が必須（IRS の税務申告と国防/情報機関のサービスは除外）。チャットボットの情報源は約 29,000 の連邦ウェブサイトのみ。チーフデザインオフィサーの Joe Gebbia が CNBC で語ったところによれば、Gemini（Google）と Grok（xAI）で動く——ホワイトハウスのファクトシート自体はモデル名を一切明記していない。トランプ氏は Edward Coristine をリードエンジニアとして紹介。フェーズ 2 は 2027 年目標でチャットボット内での手続き完結を掲げ、サイト経由のパスポート申請は 2026 年 12 月を約束している。プライバシー通知は「AI プロバイダーはプロンプトや応答を保持しない」とし、応答はプロンプトハッシュ経由で最大 2 時間キャッシュされうるとしている。HN ユーザーは、ブラウザに約 50MB のクライアントサイド ONNX 個人情報（PII）フィルター（「Rampart」）がダウンロードされること、システムプロンプトが非公開であること、拒否の非対称性を示す事例を発見した。前 USDS 責任者の Mikey Dickerson は「問題の最も易しい 5%」のデモだと評した。FedScoop の報道によれば、同日の 2 本目の大統領令は各機関に AI を「スーパーインテリジェンス（Super Intelligence, SI）」と呼ぶよう求めたという。

**Why it matters:** これはデモではなくコンプライアンス上の命令だ——10 万人超が利用する連邦サービスはすべて、AI を前面に出した単一プラットフォームとの統合を迫られる——そして、チャットボット型フロントドア UX が、それが置き換える gov.uk 型の構造化デザインに対して初めて政府規模で試される実験でもある。

[`🔗 ホワイトハウス ファクトシート`](https://www.whitehouse.gov/fact-sheets/2026/09/fact-sheet-president-donald-j-trump-streamlines-access-to-government-services-through-america-gov/) · [`🔗 GovExec`](https://www.govexec.com/technology/2026/09/white-house-launches-ai-powered-americagov-digital-front-door/416323/) · [`🔗 HN 議論`](https://news.ycombinator.com/item?id=49893509)

---

## 17. Anthropic：GLM-5.3 はオープンウェイトでフロンティア近傍のサイバー能力を拡散——拒否の剥奪コストは約 1,200 ドル

- **Velocity:** ▮▮▮ trending
- **Source:** Anthropic Frontier Red Team · HN 200+ pts · 約11時間前 (~01:31 UTC+8)
- **Tags:** `anthropic` `glm-5-3` `open-weights` `cybersecurity`

Anthropic の Frontier Red Team が、Zhipu（智譜）/Z.ai のオープンウェイトモデル GLM-5.3 の分析を公開した。ExploitBench V8 では「410 回中 50 回でエンドツーエンドのエクスプロイトを開発」したのに対し、Anthropic のアクセス制限下にある Claude Mythos Preview は 56/410（それ以前の公開モデルは約 0）。社内のバイナリエクスプロイトベンチマークでは 4% 対 6%。人間の専門家とのセッションでは、Linux 版の主要ブラウザにおける複数の未知の JS エンジン 0-day を連鎖させ、訪問者の任意のファイルを読み取れるウェブページを作り上げ（SSH 秘密鍵の窃取を実演）、GLM-5.3-Flash は約 8 時間の計算（API 価格で約 20.40 ドル）と 20 分の人手で、ポインタ認証（PAC）バイパスを含む実用レベルの ARM64 N-day エクスプロイトチェーンを構築した。安全対策への攻撃は、直接的な悪意あるリクエストでの関与率 0% が、カバーストーリーで 64%、事前入力した思考トークンで 92%、abliteration 済みウェイトで 100% に——abliteration の初回試行は約 2,200 GPU 時間（約 4,400 ドル）を要し、Anthropic は熟練チームなら約 600 GPU 時間（約 1,200 ドル）と見積もる。拒否率は 90% 超 → 3〜12% に低下し、GPQA-Diamond は不変だった。NIST の CAISI は別途、「これまでに公開された中で最もサイバー能力の高いオープンウェイトモデル」「米フロンティアに約 4 か月遅れ」と評している。**Anthropic 自身の限界：**バイパス試験は実行不能の模擬環境で実施された——「不完全な指標」。エクスプロイト課題は GLM-5.3 の内蔵拒否を発火させなかった（明示的なマルウェア要求であれば素の状態で拒否する）。0-day の標的は Linux ビルドのみ。閉鎖対オープンの安全対策比較は構造的に非対称——クローズドウェイトは設計上、abliteration され得ない。

**Why it matters:** フロンティア近傍の攻撃能力がウェイトという形で恒久化され、剥奪に約 1,200 ドル、しかもダウンロード可能——インターネットに面するソフトウェアを出すすべての人の脅威モデルを書き換える事実だ。Anthropic の答え（防御者アクセスの拡大、独立した政府によるテスト）は、すでに現実の政策問題になっている。

[`🔗 Anthropic 研究記事`](https://www.anthropic.com/research/glm-5-3-and-the-spread-of-advanced-cyber-capabilities) · [`🔗 HN 議論`](https://news.ycombinator.com/item?id=49897075)

---

## 18. DevDay：OpenAI が Decisions API をプレビュー——Luna 搭載、選択肢は事前定義、「Jev への回答」

- **Velocity:** ▮▮ rising
- **Source:** OpenAI DevDay 基調講演 · The New Stack / Willison ライブブログ · 約11時間前 (~01:15 UTC+8)
- **Tags:** `openai` `decisions-api` `jev` `classification`

DevDay の発表のひとつは、**Decisions API** のプレビューだ。OpenAI の公式まとめは「Luna の知能を、ユーザー定義の限定された質問群と有限の事前定義回答に集中させることで、リアルタイムの意思決定を可能にする」と説明する。Simon Willison の現地メモでは、モデルは「事前定義された選択肢の中から」「1 秒の何分の一かで」回答する——そして彼の言い回し自体がこの話の核心だ。「Jev への回答のように聞こえる」——TypeSafe の分類 API がステルスを解いてまだ 2 週間足らずだ。The New Stack は約 150ms の応答と信頼度スコアを報じている。価格は未発表、ステータスはプレビュー。Ollaya、Jeeves、Jeff、Jevstiller と、この feed が一週間追いかけてきたエコシステムの中に、今度は支配的プラットフォーム自身が傍観者ではなくインターフェースの採用者として入ってきた。

**Why it matters:** Jev 型の API サーフェス（制約付き選択肢、較正済み信頼度、一桁ミリ秒のレイテンシ）がプラットフォーム機能になっていく。Raschka の 9 月 29 日分析（28 項参照）が指摘する通り、API の模倣は容易でも網羅性の再現は難しい——今回の発表が始めたのはまさにその競争だ。

[`🔗 OpenAI DevDay レポート`](https://openai.com/index/devday-2026-recap/) · [`🔗 Willison ライブブログ`](https://simonwillison.net/2026/Sep/29/openai-devday-2026-live-blog/) · [`🔗 The New Stack`](https://thenewstack.io/openai-decision-api-luna/)

---

## 19. LiteLLM：内部ユーザー → プロキシ管理者 → ホスト RCE——1 本の使い回し暗号鍵が原因、本日修正

- **Velocity:** ▮▮ rising
- **Source:** GHSA-7hp6-4w63-5g45 · 9 月 30 日公開 · 修正リリース 約09:00 UTC+8
- **Tags:** `litellm` `cve` `agent-infra` `rce`

LiteLLM プロキシは、保存データの暗号封印とセッショントークンの発行に、同一の暗号鍵を使い回している。認証済み `internal_user` が、細工したメタデータに「'secret' 値として偽造管理者クレデンシャルを仕込んだ」API キーを要求すると、返された暗号文を bearer トークンとして提出した時点でプロキシは「偽造された管理者アイデンティティを信頼」する——プロキシの完全な管理者権限、MCP stdio エンドポイント経由の任意コマンド実行まで含めて。影響範囲：≥1.91.0 は**デフォルトで影響**（1.87.0〜1.90.x は `EXPERIMENTAL_UI_LOGIN=true` の場合のみ）。修正版は 1.100.4 / 1.101.3 / 1.102.2 / 1.103.1 / 1.104.0rc2 の 5 本、いずれも 9 月 30 日リリース。GitHub の評価は High、**CVSS v4 7.7**（GitHub 自らの採点）。アドバイザリは「No known CVE」と明記し、本日の NVD キーワード検索でも該当レコードは確認できなかった——つまり CVE キーで動くスキャナには見えない。クレジット：Hoa X. Nguyen（OPSWAT Unit 515）。暫定緩和の `EXPERIMENTAL_UI_LOGIN=false` は CLI SSO / Claude Code ゲートウェイログインを壊す。

**Why it matters:** LiteLLM（59.9k★）は大量のセルフホスト型モデル基盤の前面に立つゲートウェイであり、まさにそのゲートウェイ層での鍵の使い回しは、エージェントインフラが繰り返し生んできたバグ種別だ——「CVE がない」ことは、攻撃者に時間を買わせている部分でもある。

[`🔗 GHSA アドバイザリ`](https://github.com/BerriAI/litellm/security/advisories/GHSA-7hp6-4w63-5g45) · [`🔗 BerriAI/litellm`](https://github.com/BerriAI/litellm)

---

## 20. LightLLM：認証不要の pickle 脱シリアライズ RCE が 2 件（CVSS 9.8）——修正リリースはまだ無い

- **Velocity:** ▮▮ rising
- **Source:** NVD · 9 月 29 日 23:17 UTC 公開 (~07:17 UTC+8)
- **Tags:** `lightllm` `cve` `rce` `llm-serving`

ModelTC/lightllm ≤1.2.0 に、昨夜 NVD に掲載されたネットワーク到達・認証不要の RCE が 2 件ある：**CVE-2026-103040**（ルーターの profiler RPyC サービス経由の未認証 RCE。`--enable_profiling` 付きで起動した場合に該当）と、**CVE-2026-103041**（マルチモーダル構成での embed-cache RPyC サービス経由の RCE。全インターフェースにバインド、`allow_pickle: True`、認証なし）。スコアは **CVSS v3.1 9.8 と v4.0 9.3、いずれも NVD レコード内で VulnCheck が採点**（NVD Analyzed ではなく VulnCheck による採点エンリッチ）。ベンダーの issue #1596/#1597 は 9 月 29 日からオープンのまま。最新リリースは 8 月 10 日の v1.2.0 のまま、リポジトリは健在（本日もプッシュあり）——つまり「修正版なし」は未着であって、恒久的ではない。クレジット：Mingkai Yu、Jiapeng Li、Jiajia Liu。

**Why it matters:** RPyC と pickle の組み合わせは、どんな Python サービングスタックでも RCE への直行便だ。推論サーバーは猛スピードで公衆ネットワークに接されており、再利用できる教訓はひとつ——推論ポート以外に LLM サーバーが何を露出しているか確認せよ。

[`🔗 NVD：CVE-2026-103040`](https://nvd.nist.gov/vuln/detail/CVE-2026-103040) · [`🔗 VulnCheck アドバイザリ`](https://www.vulncheck.com/advisories/lightllm-through-1.2.0-unauthenticated-remote-code-execution-via-embed-cache-rpyc-service) · [`🔗 Issue #1597`](https://github.com/ModelTC/lightllm/issues/1597)

---

## 21. OpenBao は未認証→RCE の攻撃チェーンを修正、HashiCorp Vault はまだ——しかもほぼ全部を AI が発見していた

- **Velocity:** ▮▮ rising
- **Source:** ControlPlane · 9 月 28 日公開、9 月 29 日に HN へ
- **Tags:** `openbao` `vault` `rce` `secrets-management`

ControlPlane が、Vault とそのオープンソースフォーク OpenBao に影響する未認証→RCE のチェーンを開示した。重大な脆弱性——GHSA-j6wc-jpvg-xfxq、「`sys/storage/raft/snapshot-force` 経由のプラグインカタログ置換によるリモートコード実行」——は OpenBao のアドバイザリで critical（アドバイザリ自体に CVSS の記載なし。ControlPlane は CVSSv4 9.4 を引用）で、SHA-256 チェックサムの推測が gate（1 試行に多数の推測を埋め込める）であり、`plugin_directory` のない読み取り専用コンテナイメージでも機能する。これに 8.2、7.7、7.6 などを含む計 6 件のアドバイザリが伴う。**いずれにも CVE 番号が存在しない。**OpenBao は v2.6.3/v2.7.0（9 月 23 日）で全部を修正済み。HashiCorp Vault の最新リリース（v2.1.1、9 月 16 日）は修正より前だ——ControlPlane は「開示時点で Vault ユーザーは影響下にあり、緩和策は何もなかった」と述べ、IBM が相互開示合意を拒んだと主張する（これは ControlPlane 側の見解で、IBM 側の公式記録は確認できていない）。部分的な緩和：`plugin_directory` の削除、`BAO_DISABLE_PUBLIC_ACME` の設定。そして繰り返す価値のある一文：「本リリースで発見された脆弱性のうち、1 件を除くすべては AI によって発見された。」

**Why it matters:** フォーク分岐の瞬間が具体化した——オープンソース側は修正を出荷し、商用の本体はまだ露出したままだ。さらに「AI が見つけた脆弱性」はデモから、9.4 相当のシークレットストア RCE チェーンへと卒業した。

[`🔗 ControlPlane 解説`](https://control-plane.io/posts/unauthed-to-rce-in-vault-and-openbao/) · [`🔗 openbao/openbao`](https://github.com/openbao/openbao)

---

## 22. Simple-WAM：ワールドモデルの利得は最初の 1 ステップのデノイジングが担う——「未来の生成」ではなく

- **Velocity:** ▮▮ rising
- **Source:** Hugging Face デイリーペーパー · 33 upvotes、本日 1 位
- **Tags:** `research` `world-models` `robotics` `efficiency`

「What Makes World Action Models Generalize? An Empirical Study of Test-Time Future Modeling」（arXiv:2609.34981、清華大学-LeapLab、Gao Huang ら）は、WAM（World Action Model）が未来トークンの生成をどう使うかを同一バックボーンで比較し——最も高価な部分がほとんど仕事をしていないことを突き止めた。完全にノイズ付加された未来トークンに 1 回のデノイジングを施すだけの Simple-WAM は、LIBERO-Plus の摂動平均で 79.5%。明示的な多ステップ WAM は 67.7%、潜在ワールドモデルは 53.8%——一方、embodied 事前学習を持つ π0.5 が依然 84.4% で首位。動画条件でのタスク汎化は 73.6 対 69.9 で、潜在モデルは 5.9 まで崩壊。レイテンシは 74.7 ms/chunk 対 286.9（3.8 倍）。最初の 1 デノイズステップが利得のほぼすべてを担い、残り 9 ステップの合計は ≲1.8 ポイント。RoboTwin の動画設定では明示的生成が*逆に* Simple-WAM を上回る（47.3 対 44.5）。結論は適用範囲を率直に宣言している：「我々の結論は、embodied 事前学習なしの 5B バックボーンに基づく」——より大規模でも、事前学習付きでも成立するかは「依然開かれた問い」だ。

**Why it matters:** リーダーボードではなく、管理された帰属実験の結果だ——ワールドモデル物語の中心にある高価な反復生成が、ほとんど何もしていない可能性を示す。これは効率の勝利であると同時に、スケーリング物語への警告でもある。

[`🔗 arXiv:2609.34981`](https://arxiv.org/abs/2609.34981) · [`🔗 HF Papers`](https://huggingface.co/papers/2609.34981)

---

## 23. MaLiang-Harness：プログラムから映像へのギャップ——生成成功率は 100% でも、動画の 4 分の 1 は品質基準を通らない

- **Velocity:** ▮▮ rising
- **Source:** Hugging Face デイリーペーパー · 33 upvotes、本日 1 位タイ
- **Tags:** `research` `multimodal` `code-generation` `benchmarks`

MaLiang-Harness（arXiv:2609.34309、シンガポール国立大学。著者に Shuicheng Yan を含む）が提案するベンチマークは、エージェント生成コードが「動くか」ではなく「正しくレンダリングされ、視覚品質の閾値を満たすか」を測るもので、11 のクローズド MLLM を評価した。Headline の数字：GPT-6 Astra は MaLiang-IBench と MaLiang-VBench の両方で生成成功率 100% だが、品質閾値をすべて満たしたのは画像タスクで 96.0%、**動画タスクでは 76.9%**——つまり動画では「成功」したレンダリングの約 4 回に 1 回が品質ラインを通らない。アブストラクトの主張はこのミスマッチそのもの：「汎用能力スコアと視覚生成パフォーマンスの間にはミスマッチがある」——汎用ベンチマークはこの能力をうまく予測できない。専用の limitations セクションはなく、評価はクローズドモデルのみ。コードは公開済み（gulucaptain/MaLiang-Harness、9 月 27 日作成——1 日しか経っていないリポジトリなので、枯れたツールではなく新しい道具として扱うべき）。

**Why it matters:** 「コードが動いた」ことは、ほとんどのエージェント評価の天井だった。この研究はその先の一段を測り、フロンティアモデルの「成功率」と「品質率」が別の数字であることを示した——エージェントが視覚出力を出すあらゆる場所で効いてくる区別だ。

[`🔗 arXiv:2609.34309`](https://arxiv.org/abs/2609.34309) · [`🔗 gulucaptain/MaLiang-Harness`](https://github.com/gulucaptain/MaLiang-Harness)

---

## 24. NSL：「Linux 版 WSL」——systemd-nspawn の開発マシンでホストを清潔に保つ

- **Velocity:** ▮▮ rising
- **Source:** Show HN · 100+ pts、コメント 70+ · 約13時間前 (~22:51 UTC+8)
- **Tags:** `linux` `containers` `dev-environments` `show-hn`

Frostyard の NSL（NSpawn Subsystem for Linux）は、WSL が Windows にやったことを Linux にやる：ホストに触れずに開発環境を走らせる。マシンは共有 QEMU VM 内の systemd-nspawn コンテナ——Debian、Fedora、Arch など（署名済み・毎週再構築・公開ワークフローに対して検証された 7 種のディストロイメージ）を入れながら、`$HOME`、`/run/media`、`/mnt` は自分の UID/GID のまま `/mnt/host` にマウントされる。ポートはホストの `127.0.0.1` に転送、GUI アプリは Waypipe 経由で表示、`--isolated` フラグは信頼できないソフトウェアをホストアクセスのない独立 VM で走らせる。MIT ライセンス、プレリリース v0.4.0（「v0.3.0 以前は引退したプロトタイプ」）。**自ら明記する限界：**テスト済みは 1 つのホスト構成のみ（「Snow Linux 13 on x86-64」、systemd/QEMU のバージョン固定）、公開元の組織も新しい——リポジトリ（Go、9 月 26 日作成）は 42★。ここでのシグナルはスター数ではなく Show HN のスレッドだ。

**Why it matters:** 「ホストを清潔に保つ」は、Nix や macOS 型コンテナ化の最も強い論拠だった。NSL はその問いに、Linux デスクトップ自身の上から WSL 型の答えを出した——この問題が攻められることの稀だった方向から。

[`🔗 frostyard.github.io/nsl`](https://frostyard.github.io/nsl/) · [`🔗 frostyard/nsl`](https://github.com/frostyard/nsl) · [`🔗 HN 議論`](https://news.ycombinator.com/item?id=49894351)

---

## 25. XBOW：AI エージェントが、人間のレビューが見送ったカーネルバグを実用エクスプロイトに仕立てた

- **Velocity:** ▮ steady
- **Source:** XBOW ブログ · 9 月 28 日公開、9 月 29 日に HN へ
- **Tags:** `xbow` `linux` `kernel` `agentic-security`

XBOW の自律エージェントが **CVE-2026-72018** を取り上げた——カーネル `dibs` ループバックドライバにおける範囲外書き込みで、`move_data()` がピア制御の `dmbe_idx` に対する境界チェックなしで登録済み DMB へ memcpy する（NVD：CVSS 3.1 **7.8 High**、カーネル CNA による Secondary スコア。6 月から上流で修正済み）——人間の研究者が見て見送ったバグだ——そして実用的なローカル権限昇格を作り上げた：部分的に制御されたオフセットへの 16 バイトのゼロ書き込みを連ね、`cred` の識別フィールドをゼロで埋める。**ブログ自身の範囲の但し書き：**対象はすでに `CAP_NET_ADMIN` を持つ非特権ユーザーを想定。新規ブート 100 回中 22 回しか成功しない。テストはカーネル緩和をすべて無効化した 7.1.0-rc6 で実施。成功率を上げる情報漏えい/UAF との連鎖はあえて避けた。既知の悪用はなし。

**Why it matters:** 新しい脅威ではなく、実証だ：エージェント型のエクスプロイト開発は、人間が後回しにした仕事をやり切れる。攻撃面は新規 CVE だけではなく、トリアージのバックログにもある。

[`🔗 XBOW ブログ`](https://xbow.com/blog/no-time-to-pwn-cve-2026-72018) · [`🔗 NVD：CVE-2026-72018`](https://nvd.nist.gov/vuln/detail/CVE-2026-72018)

---

## 26. Cloudflare、公的に信頼される証明書認証局（CA）へ申請

- **Velocity:** ▮ steady
- **Source:** Cloudflare ブログ · 9 月 29 日公開 · HN 42+ pts
- **Tags:** `cloudflare` `pki` `tls` `post-quantum`

Universal SSL から 12 年。Cloudflare は Chrome、Apple、Microsoft、Mozilla の各ルートプログラムに公開 CA としての運営を申請し、GlobalSign から既存ルートを取得する契約に署名した。CA 設計は ACME ファースト：ACME Renewal Information（RFC 9773）に対応しないクライアントを拒否する。計画には、Chrome の PQ ルートプログラムに対してポスト量子証明書を提供する最初期の CA のひとつになることと、Q1 2027 を目標とする Merkle Tree 証明書の本番提供が含まれる。但し書きは原文ママ：「我々はまだ証明書を発行していない。それまでにはまだ少し時間がかかる」。HN のコメント欄は背景を補足する：Google Trust Services が同じ GlobalSign ルート獲得の道を通っていること、PQ/MTC の推進は WebPKI を PQ とレガシーの二つに割り得ること。

**Why it matters:** 「ARI なしでは発行しない」方針の 4 つ目の大型公開 CA は、エコシステム全体を自動更新へ押し進める。ポスト量子のタイムラインは、暗号の移行より長く生きる TLS インフラを持つすべての人に関わる。

[`🔗 Cloudflare ブログ`](https://blog.cloudflare.com/cloudflare-certificate-authority/) · [`🔗 HN 議論`](https://news.ycombinator.com/item?id=49893144)

---

## 27. Backblaze 2026 年 Q2 ドライブ統計：四半期 AFR 1.73%——「しばらくの間」で最悪

- **Velocity:** ▮ steady
- **Source:** Backblaze · 9 月 29 日公開 · HN 113+ pts
- **Tags:** `storage` `reliability` `data` `backblaze`

Backblaze の四半期ドライブ故障レポート：分析対象 354,415 台、四半期年化故障率は **1.73%**、生涯値は 1.41%——「しばらくの間」で最も高い四半期値。稀な独占：ゼロ故障の名誉席を Seagate が総なめにした（ST8000NM000A、ST12000NM000J、ST14000NM000J、ST16000NM000J は 1 件）。6.95% の外れ値閾値を超えたのは 3 モデル：Seagate ST10000NM0086 が 9.33%（わずか 965 台、約 8.5 年物）、ST14000NM0138 が 8.26%、HGST HUH721212ALN604 が 7.63%。2 モデルが引退。**2 四半期連続で新型ドライブの追加なし**。20TB 以上がフリートの 25% を超えた。レポートは SMR と HAMR も取り上げる——Backblaze のフリートに SMR は無いが、業界の SMR 展開を踏まえると「今日ない」は「永遠にない」を意味しないと注意書きがある。**著者自身の注意：**最悪の AFR は一部、小サンプルによる人工物であり、31 モデル中 10 モデルが AFR 3.0% 超——この歪みはまだ完全には分析できていないという。

**Why it matters:** 故障率の上昇は、ドライブ供給逼迫の最中に届いた——容量計画、耐久性の計算、買うか待つかの判断のための今四半期のデータポイントだ。

[`🔗 Backblaze ブログ`](https://www.backblaze.com/blog/backblaze-drive-stats-for-q2-2026/) · [`🔗 HN 議論`](https://news.ycombinator.com/item?id=49893002)

---

## 28. Raschka：Bag-of-words から Jev へ——決定モデルの波を説明する分類器の歴史

- **Velocity:** ▮ steady
- **Source:** Ahead of AI（Sebastian Raschka）· HN 53+ pts · 約17時間前 (~19:06 UTC+8)
- **Tags:** `research` `classification` `jev` `history`

Sebastian Raschka が、TypeSafe の Jev を 60 年のテキスト分類史の中に置き、各時代で自分の IMDb ベンチマークを再実行した：Bag-of-words + ロジスティック回帰 89.9%（今も彼のデフォルトの基線）、LSTM はスクラッチで 85.66% だが ULMFiT 転移で 95.4%、CNN 約 90.07%、ModernBERT 約 95%。彼の Jev 実測値：**Choice 96.47% / Noul 96.20%**——2.5 万件のレビューで約 0.65 ドル、約 22 分——「ファインチューニング済み ModernBERT に相当するが、ファインチューニングは不要」。彼の推測では、ModernBERT 類似の小さなモデルを合成データで RLCD 風の較正付き訓練したもの（公開されている RLCR の定式 R = c − (q − c)² も解説）。**彼が明示する注意点：**IMDb のテストセットが Jev の訓練データに入っているかは不明。公開クローンは大きく劣後し（Contrastive LM 82.90%、Laya 92.33%）、彼の Tetris テストに落ちる。高流量のニッチなタスクではファインチューニングが依然優る。そして OpenAI の新発表 Decision API（18 項参照）を Jev の競合として挙げている。所属関係も無料アクセスもないと声明している。

**Why it matters:** Jev の波についての最も節度ある読み解き——既知の技術の上にきちんと実装された API で、堀は新規性ではなく網羅性と較正にある——それを最も言う資格のある人物が言っている。

[`🔗 Ahead of AI`](https://magazine.sebastianraschka.com/p/classifier-history-and-jev) · [`🔗 HN 議論`](https://news.ycombinator.com/item?id=49891203)

---

## 29. Deser 帰還：Ronacher が Rust シリアライズの設計空間を再び開く——原理上は Serde 代替、コストは明示済み

- **Velocity:** ▮ steady
- **Source:** lucumr.pocoo.org · 約7時間前 (~05:48 UTC+8) · HN 39+ pts
- **Tags:** `rust` `serialization` `serde` `deser`

Armin Ronacher が Deser を復活させた——2022 年に Sentry で始まり、放置され、今になって書き直されたプロジェクトだ——そして「少なくとも原理上は Serde の drop-in 代替」と言える状態に達したと主張する。彼の論点：Serde の痛点（`arbitrary_precision` がタグ付き enum を壊す、`flatten` が整数マップキーを壊す、`Option`/`Vec` を通って合成できない `deserialize_with` アダプタ）はバグではなく、安定性の保証が守る 3 つの設計判断の帰結だ——自己記述・非自己記述両フォーマットに単一の trait セット、バッファリング時に情報を失う固定データモデル、呼び出しスタック上の再帰。Deser はイベント駆動・非再帰（ドライバの状態はヒープに、miniserde 風）：一時停止可能なパース、ロスレスなバッファリング、第一級の拡張型を持つ拡張可能データモデル、ミドルウェアレイヤー、名前空間付きネイティブ XML。**コストも率直に：**protobuf のような非自己記述フォーマットは対象外。JSON 読みは serde_json 対比で 33% 速い〜60% 遅い（平均で約 10% 遅い）。書き込みは 3 倍速い〜70% 遅い。バイナリは膨らむ。そして orphan rule のため、Serde の生態系の座を奪うのは「非常に起こりにくい」——「結局、Serde ではないのだから。」

**Why it matters:** 移行の呼びかけではなく、Serde の限界が Rust の法則ではなく設計判断であることを示す実証だ——Flask、requests など最も使われる Python ライブラリ群の作者の手による。

[`🔗 lucumr.pocoo.org`](https://lucumr.pocoo.org/2026/9/29/deser/) · [`🔗 HN 議論`](https://news.ycombinator.com/item?id=49901149)

---

## 30. Raven：4.8k スターの「ハーネスの上のハーネス」が HF 論文トップに——アブストラクトには数字がひとつもない

- **Velocity:** ▮ steady
- **Source:** Hugging Face ペーパー / GitHub · 33 upvotes、4.8k 閲覧 · リポジトリは本日もプッシュ
- **Tags:** `agents` `harness` `benchmarks` `open-source`

EverMind の Raven は、arXiv 論文（2609.33439）と今週最も勢いのあるエージェントリポジトリのひとつを束ねる：Apache-2.0、1,738 コミット、**数日で 4,847★**、今朝もプッシュ。論文はこのマルチエージェントハーネスが「最先端のエージェントシステムを大幅に上回る」と主張する——しかしアブストラクトのページにはベンチマークも指標も数字も一切なく、limitations セクションもなく、著者欄は企業名だ。README の数字はすべて自己申告で、大半はチャートの画像（DataAgentBench の Pass@1 0.8762、Opus-5 使用。nanochat の再帰的自己改善デモは「7 ラウンド 172 回の訓練ランをクラッシュゼロで完走」）。リポジトリ自身は率直だ：「Raven は pre-alpha。インターフェースと設定は急速に変わりうる。」パフォーマンス主張の独立検証はまだどこにも存在しない。

**Why it matters:** この feed 独自の Void 則の通り——スターの速度は調査すべきシグナルであって、公開すべき結論ではない。現時点で誠実な表現は「極めて活発な pre-alpha のエージェントハーネスで、パフォーマンス数字はすべて自己申告」。見るべきはスターではなく、ベンチマーク主張の方だ。

[`🔗 arXiv:2609.33439`](https://arxiv.org/abs/2609.33439) · [`🔗 EverMind-AI/Raven`](https://github.com/EverMind-AI/Raven)

---

## 31. Show HN：リアルタイム太陽系——52.6 万個の小行星と約 3.5 万基の追跡衛星を、ブラウザのタブ 1 枚に

- **Velocity:** ▮ steady
- **Source:** Show HN · 155+ pts、コメント 37 · 約9時間前 (~03:08 UTC+8)
- **Tags:** `visualization` `webgl` `space` `show-hn`

space.bl2.net は太陽系を「現在の状態」込みで実尺度のままブラウザに描画する：WebGL2 レンダリング、SGP4 の軌道伝播は web worker で。地球周回物体は CelesTrak の TLE、小惑星と彗星は JPL SBDB、探査機の位置は JPL Horizons を使用し毎日更新。約 30MB の小惑星データセットはバックグラウンドでロードされる。タイムスライダーで前後移動でき、衛星は打ち上げ日に応じて現れたり消えたりする。作者いわく「別のプロジェクトの副産物」で、「いくつかの夜」で作ったもの。**スレッドで浮上した限界：**「実尺度」は位置の話であってマーカーの話ではない——衛星の点は実質的に都市サイズで、だから静止軌道帯が目に見えるリングとして描画される。高速タイムスクロール時のレンダリング不具合も報告され、モバイルの問題は作者が数時間で修正した。コメント欄は Celestia（デスクトップ専用、SourceForge ページは停滞）と比較し、追跡対象の約半分が Starlink だと指摘する。

**Why it matters:** タブ 1 枚で、インタラクティブなフレームレートの 50 万軌道——WebGL2、worker、公開暦データが「週末プロジェクト」の天井を押し上げ続けていることの静かな実証だ。

[`🔗 space.bl2.net`](https://space.bl2.net/) · [`🔗 HN 議論`](https://news.ycombinator.com/item?id=49898778)

---

## Metadata

| Field | Value |
|-------|-------|
| Generated | 2026-09-30T12:03:00+08:00 |
| Items | 31 |
| Sources tracked | 24 (GitHub Trending/advisories, Hacker News, CISA KEV, NVD, VulnCheck, ControlPlane, OpenAI, Anthropic, White House/GovExec, arXiv, Hugging Face, Backblaze, Cloudflare, XBOW, EFF, The Register, tcl-lang.org, MSRC, The New Stack, Simon Willison, lucumr.pocoo.org, Ahead of AI, Frostyard, space.bl2.net) |
| Update schedule | 04:03, 12:03, 20:03 UTC+8 (3x daily) |
| Ranking | Velocity-weighted (recency × engagement acceleration × source authority) |
| License | [CC-BY 4.0](https://creativecommons.org/licenses/by/4.0/) |

[Previous day](2026-09-29.md) · [Raw .md](latest.md) · [Archive](../archive/index.md)
