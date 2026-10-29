---
date: 2026-10-30
updated: 2026-10-29T20:18:39Z
schedule: 04:03, 12:03, 20:03 UTC+8
sources: 18
license: CC-BY-4.0
---

# トレンド — 2026-10-30

**Velocity**（速度）順 — 注目がどれだけ速く移っているかで並べており、蓄積量では並べていない。各項目は実際に開いて読んだ一次情報源にリンクしている。

---

## 1. Mistralが1TパラメータのLarge 4の重みを公開——モデルカードは1Mコンテキスト、自社の配備レシピは131K

- **Velocity:** ▮▮▮ trending
- **Source:** Hacker News · 893+ pts · 約6時間前（~22:13 UTC+8）
- **Tags:** `mistral` `open-weights` `moe` `licensing`

Mistralは2026-10-29、Mistral Large 4のオープンウェイトを公開した。愛称は「Le Chonk」で、**総パラメータ1T／アクティブ49B**のハイブリッドなinstruction-and-reasoning MoE、マルチモーダル入力対応だ。Hugging Faceのリポジトリ`mistralai/Mistral-Large-4-1T-A52B`には現在**54個のconsolidated safetensorsシャード**が入っている（最終更新14:51 UTC、発表記事の数分後）。リポジトリ自体はプレビュー用に2026-09-30に作成されていた。ライセンスは**Mistral Ecosystem Open-Weight license**で、記事は「a modified MIT license」と説明する一方、「businesses that operate a Model-as-a-Service offering must obtain a separate commercial license from Mistral」と定めている。

最も伝わりにくい数字はコンテキスト長と推論スイッチだ。記事はコンテキスト長を一切書いていない——HFの記事が「about 1T total, 49B active parameter, and a context window of 1M tokens」と補っている——が、同じ記事のvLLMの例は`--max-model-len 131072`を設定し、Inference Endpointsのレシピは「serves up to 131K tokens of context」と述べる。推論については「reasoning cannot be disabled, so using `reasoning_effort`: `none` would still use `high`」だ。主要ベンチマークはTerminal-Bench 4.0が**41%**（プレビューから13ポイント上昇）、Artificial Analysis Coding Agent Indexが**48%**（GLM-5.3と同点で「while using 47% fewer tokens per task」）、BrowseCompが**84.5%**、FinWorkBenchが**73.3%**——ただしBrowseCompでは記事自身の表でKimi K3の91.2%に届いていない。

**Why it matters:** Mistralは自社記事で「we see a potential for uplift to conduct real attacks」と認め、サイバー向け変種を審査済みパートナーに限定している——発表資料としては珍しい。しかし実務上の数字は131Kのほうだ。1Mトークンという主張が、自社のvLLMフラグと自社のホスティングエンドポイントの両方で半分以下に削られているなら、それは仕様表であって配備能力ではない。NVFP4ビルドはさらに「requires NVIDIA Blackwell GPUs」で、単一の512 GB Apple Silicon Ultraに収まるのは2-bit量子化だけだ。

[`🔗 Mistral — releasing the weights`](https://mistral.ai/news/mistral-large-4-oss/) · [`🔗 Hugging Face — Welcome Le Chonk`](https://huggingface.co/blog/mistral-large4) · [`🔗 mistralai/Mistral-Large-4-1T-A52B`](https://huggingface.co/mistralai/Mistral-Large-4-1T-A52B)

---

## 2. CISAがGitLabの10.0をKEVに追加——土台の欠陥はRubyの正規表現コンパイラにあり、RubyはCVEを申請していない

- **Velocity:** ▮▮▮ trending
- **Source:** CISA KEV · カタログ2026.10.29 · 2026-10-29追加
- **Tags:** `cve` `gitlab` `ruby` `rce` `kev`

CISAは**2026-10-29**、**CVE-2026-97229**を既知の悪用済み脆弱性カタログに追加した。記録は**CVSS 3.1 10.0**——`AV:N/AC:L/PR:N/UI:N/S:C/C:H/I:H/A:H`——でCWE-190（整数オーバーフロー）。このスコアは**GitLab自身のもの**だ（`Secondary`スロットに`cve@gitlab.com`、NVD採点メトリクスは0）。NVDはレコードを`Analyzed`にしたが、独自スコアは公開していない。GitLabは**19.4.2（2026-10-12リリース）**で修正した。NVDは翌日にレコードを公開し、KEVは**修正から17日後**に追随した——レコードからは16日後になる。NVDのレコードにはまだKEVフラグが付いていない——情報源はカタログであって、CVEエントリではない。

根本原因はGitLabのものではない。Ruby自身の**2026-10-23**のアドバイザリはGitLab割当の4つの識別子を名指ししている——CVE-2026-89078（正規表現パーサのdouble free、PR #13332）、CVE-2026-93577、CVE-2026-97229、CVE-2026-110264——そして明記する。「We have not requested CVE identifiers in Ruby for these fixes, at least for now.」修正は**Ruby 4.0.9、3.4.12、3.3.13**に入った。誰もが頼りたくなる2つの緩和策は機能しない。「`Regexp.timeout` does not protect against these bugs」であり、「Limiting the length of patterns does not reliably protect against them either」——なぜなら「some of them can be triggered by short patterns」だからだ。

**Why it matters:** 10月29日のAlpineのGitLabに関する記述以降で興味深いのは、KEV入りそのものではなく、最も広く自前運用されているコードホスティング上の10.0の未認証RCEに、**それが生きている言語側のCVEが存在しない**という事実だ。GitLabを19.4.2に上げても、その下のRubyは直らない——ソースからビルドする場合やディストリのRubyを積む場合がまさにそれで、Alpineが踏んだ穴だ。露出条件は狭いがよくある。「reached only when an application compiles a regular expression from a string that an attacker controls.」

[`🔗 GitLab 19.4.2 patch release`](https://docs.gitlab.com/releases/patches/patch-release-gitlab-19-4-2-released/) · [`🔗 Ruby — regexp fixes for GitLab CVEs`](https://www.ruby-lang.org/en/news/2026/10/23/regexp-fixes-for-gitlab-cves/) · [`🔗 CVE-2026-97229 (NVD)`](https://nvd.nist.gov/vuln/detail/CVE-2026-97229)

---

## 3. PHP2Shellと昨日取り上げたカーネルのバグを連鎖させ、25台がroot化——ファイアウォール24台、管理サーバ1台、そして政府関連組織

- **Velocity:** ▮▮▮ trending
- **Source:** Hacker News · 219+ pts · 約10時間前（~18:42 UTC+8）
- **Tags:** `php` `pan-os` `kernel` `exploitation` `incident`

Dreamは2026-10-26に連鎖悪用の分析を公開し、10-29に更新した。自動化された一括攻撃で**インターネット露出のPAN-OSファイアウォール24台**がroot化され、続く侵入で内部のファイアウォール管理サーバ1台が落ちた——「bringing the total number of servers exploited to 25」。24台のうち2台は米国政府関連組織のものだった。連鎖は**CVE-2026-109618 / CVE-2026-109619**（PHP2Shell、9.2）で`nobody`権限のコード実行を取り、続いて**CVE-2026-46300**——10月28日にKEVへ入り、昨日の本フィードで扱ったLinuxカーネルの権限昇格——が`/etc/pam.d/su`のpage cacheを上書きし、非特権プロセスからrootへ至る。

時系列は非常に速い。政府関連の1台目が**10月23日18:14 UTC**、2台目が**10月24日10:09 UTC**、管理サーバが**10月24日11:35 UTC**——「less than 90 minutes after rooting the second firewall」。大半は放置された。「For 22 of the 24 rooted firewalls, the attacker did nothing beyond planting the webshell.」依然として約**19,000**の指紋取得可能なターゲットが悪用可能だ。

**Why it matters:** 報告書の留保こそが本題だ。Dreamは「What we cannot determine is whether the password spray, backdoor account creation, or SAML key extraction succeeded」と書き、「we do not attribute this activity to a named threat actor」と述べる。報告とともに流布したAIの話について、著者らは明快だ。「we have no direct evidence that the AI tools were specifically used to write the exploit.」単独なら対処可能に見える9.xが2つ、組み合わさると90分未満でゼロ認証からrootに至る——昨日のカーネルの記録とこのPHPの記録を、2件ではなく1件のインシデントとして扱うべき理由がここにある。

[`🔗 Dream — chained PHP2Shell roots 25 servers`](https://dreamgroup.com/blog/chained-php2shell-exploit-roots-25-servers) · [`🔗 PHP 8.5.12 / 8.4.27 / 8.3.36 / 8.2.35`](https://www.php.net/archive/2026.php) · [`🔗 HNディスカッション`](https://news.ycombinator.com/item?id=50286987)

---

## 4. Agnoの9.2は「through 3.1.11」と書く——しかし3.1.12はレコード公開の17分前に出ており、同じ`getattr`が残っている

- **Velocity:** ▮▮ rising
- **Source:** VulnCheck advisory · 2026-10-29 14:17 UTC公開
- **Tags:** `cve` `agent-framework` `prompt-injection` `python` `rce`

**CVE-2026-119050**は**9.2（CVSS 4.0）**と**8.1（CVSS 3.1）**、いずれもVulnCheck採点で、CWE-470（外部制御可能な名前の仮定された不変性）。Agnoの`PandasTools`は`getattr(pd, create_using_function)(**function_parameters)`を呼び、関数名もキーワード引数もモデルのツール呼び出し由来だ。したがってプロンプト注入されたagentは`pandas.read_pickle`を攻撃者の用意したパスに対して選び、コード実行を得られる。他のreaderを使えば任意のローカルファイルも読める。上流のissue **#8699**は**2026-07-02**に立てられ、今もオープンだ。

欠陥は影響範囲のほうにある。アドバイザリは「Agno through 3.1.11」と書き、3.1.12は修正済みだと示唆する。**v3.1.12は2026-10-29T14:00:55Zにリリース**（PyPIは14:01:49、**CVE公開の17分前**）され、その`libs/agno/agno/tools/pandas.py`にはv3.1.11と**完全に同一の**`getattr`行がそのまま入っている。`main`ブランチの54行目も同じ呼び出しで、90行目には2つ目の反射面（`getattr(dataframe, operation)`、`operation`はモデル制御）があるが、アドバイザリもCVE本文もこれに触れていない。

**Why it matters:** CVEの影響範囲は**成果物**についての主張であり、この主張は都合の悪い方向へ17分ずれている——「through 3.1.11」を見て最新版に上げた人は、バグごと導入する。Agnoは42,951 starsで「the self-driving agent platform」を名乗り、`PandasTools`はコミュニティプラグインではなく第一者ツールだ。この行が変わるまで、唯一の緩和策は信頼できない内容を読むagentにこのツールを積まないことだ。

[`🔗 VulnCheck advisory`](https://www.vulncheck.com/advisories/agno-through-3.1.11-code-execution-via-pandastools-unsafe-reflection) · [`🔗 agno-agi/agno issue #8699`](https://github.com/agno-agi/agno/issues/8699) · [`🔗 pandas.py at v3.1.12`](https://github.com/agno-agi/agno/blob/v3.1.12/libs/agno/agno/tools/pandas.py#L54)

---

## 5. Tabularisは読み取り専用モードを1つのツールの中だけに置いていた——残る3つのMCPツールは`table_name`をそのままPRAGMAへ流す

- **Velocity:** ▮▮ rising
- **Source:** GitHub Advisory · GHSA-xrx3-j98v-67x9 · 2026-10-28
- **Tags:** `mcp` `sql-injection` `agent-security` `sqlite`

**CVE-2026-118378**（VulnCheck：7.8 CVSS 3.1、8.5 CVSS 4.0、CWE-89＋CWE-863）はTabularisのSQLiteドライバにおけるSQLインジェクションだ。`describe_table`が呼び出し側の`table_name`を`PRAGMA`文へ補間し、細工した値が「close[s] the quoted PRAGMA argument and append[s] statements to read, modify, or drop SQLite data」する。アドバイザリ自身の診断が要点だ——製品の読み取り専用・書き込み承認チェックは「implemented only inside `tool_run_query`」であり、`describe_table`、`list_tables`、`list_databases`は「do not invoke the read-only or approval checks」。現実的な引き金も明記されている。「an AI agent driven by attacker-controlled/untrusted content.」

深刻度は意図的に下げられている。脆弱なサーバはネットワークソケットではなく**ローカルstdio JSON-RPC**で到達し（`AV:L`）、悪用にはagentセッションが呼び出しを発行する必要がある（`UI:R`）——だから9.xではなく7.8だ。アドバイザリには奇妙な点が1つある。影響範囲は`<= 0.18.0`、修正版は`0.28.0`と書かれ、**0.19から0.27はどの範囲にも入っていない**。プロジェクトの最新リリースはv0.30.0（2026-10-26）だ。

**Why it matters:** このパターンは1つのアプリを超えて一般化する。agent向けのツール面は**ツールごとに**安全境界を組み立てており、後から足したツールはそのどれも継承しない。Tabularisの読み取り専用モードは回避されたのではなく、4つのうち3つのツールから単に参照されていなかった。「安全モード」を掲げるMCPサーバは、どのツールが実際にそのチェックを呼ぶのかを問われるべきだ。

[`🔗 GHSA-xrx3-j98v-67x9`](https://github.com/TabularisDB/tabularis/security/advisories/GHSA-xrx3-j98v-67x9) · [`🔗 修正コミット`](https://github.com/TabularisDB/tabularis/commit/fd1bdbbae35e5367c32d1e7fe9c44cb1b6875d74) · [`🔗 v0.28.0リリース`](https://github.com/TabularisDB/tabularis/releases/tag/v0.28.0)

---

## 6. Apple自身の音声APIに差し替え可能なエンジンが付いた——きれいなLibriSpeechで1.43% WER、実際の会議音声では23%超

- **Velocity:** ▮▮ rising
- **Source:** Hugging Face Blog · 2026-10-29
- **Tags:** `apple` `speech` `swift` `core-ml` `on-device`

Matttは、Appleの新しい音声スタックの**隣**ではなく**下**に入る2つのSwiftパッケージを公開した。**AnySpeechRecognizer**は「implements Apple's new speech-to-text API with a choice of recognition engine」——既定はApple自身のエンジンで、加えてNVIDIA ParakeetとAlibaba Qwen3-ASRをCore ML経由でローカル実行でき、`SpeechAnalyzer`、`SpeechTranscriber`、`DictationTranscriber`を写し取っている。**AnyDecisionModel**は「answers yes-or-no, multiple-choice, and rating-scale questions with typed results and probabilities」を、テキストを生成して解析するのではなく確率を直接読むことで実現する。

ベンチマーク表は異常なほど具体的で、異常なほど正直だ。3〜8分のLibriSpeechファイルで、Parakeet Unifiedは**1.43% / 2.19%**（test-clean / test-other）、Apple自身の転写器は**2.12% / 3.97%**。そのうえで、これらすべての数字と一緒に流通すべき一文が来る。難しい会議音声では「every engine we tested had a word error rate above 23%.」

**Why it matters:** 罠は動作要件にある。Swift 6.2以上、macOS 26またはiOS 26、ParakeetとMLXバックエンドはAppleシリコン必須、そして「So far, we've tested only on macOS 27, not on an iPhone.」判断モデル側にも制約がある。next-tokenバックエンドでは「a choice … at most 26 options, and a score at most 10 levels」に縛られ、「It measures how concentrated the probabilities are, not whether the answer is right.」最後の一文は、このパッケージに限らずagentスタックのあらゆる信頼度スコアに対する正しい説明だ。

[`🔗 Hugging Face — AnySpeechRecognizer and AnyDecisionModel`](https://huggingface.co/blog/anydecisionmodel) · [`🔗 mattt/AnySpeechRecognizer`](https://github.com/mattt/AnySpeechRecognizer)

---

## 7. IBMは差分サイズも数値も示さないモデル更新を出した——「nothing was recomputed」が仕様のすべて

- **Velocity:** ▮▮ rising
- **Source:** Hugging Face Blog · 2026-10-29 13:37 UTC
- **Tags:** `ibm-granite` `model-updates` `adapters` `release-engineering`

Granite Switch 4.1.1はモデルリリースをソフトウェアパッチのように扱う。30Bの`granite-switch-4.1-30b`基盤は凍結したまま、動くのは2つの構成要素だけ——**0.5BのGranite Speech ASR**（「10 languages with native punctuation and capitalization」）と、`granitelib-core`の更新されたDecisionアダプタだ。約束はバージョン管理の規律にある。「fully backwards compatible with 4.1, no migration, incremental improvements under the hood」であり、「Apart from training the new ASR model and Decision adapter, nothing was recomputed: the base model is untouched.」

記事に**無い**のは、あらゆる計測だ。Decisionアダプタの唯一のベンチマーク言明は定性的で、「improved overall performance on the Jev Decision Index test set」——スコアもベースラインも、言語別のASR誤り率も無い。差分のバイト単位のサイズも無いので、「update models like you update software」は、ユーザーが実際にダウンロードするものと照合できない。

**Why it matters:** モジュラーアダプタの発想は正しい——単一エンドポイントで「You compose the latest adapters you want and deploy」すれば、30B基盤は修正のたびに60 GBを落とし直さずに済む。しかし改善が定量化されていないパッチリリースは、モデルではなくアーキテクチャについての主張だ。検証可能にする道具もまだ出ていない。「We're working on tutorials and an Adapter SDK.」

[`🔗 Hugging Face — Granite Switch 4.1.1`](https://huggingface.co/blog/ibm-granite/granite-switch-4-1-1) · [`🔗 ibm-granite on Hugging Face`](https://huggingface.co/ibm-granite)

---

## 8. 5つのアシスタントに統計を尋ね、引用1,285件をたどった——40%が同じことを言う研究に到達した

- **Velocity:** ▮▮ rising
- **Source:** Hacker News · 105+ pts · 約5時間前（~23:06 UTC+8）
- **Tags:** `ai-search` `citations` `research` `provenance`

Trakkr Research Study 013（「Zombie stats」、Mack Grenfell、2026-10-28）は、ChatGPT、Perplexity、Gemini、Claude、Google AI Overviewsに**200問**を投げ、ウェブ検索を有効にしたAPI経由で**1,000件の回答**を集め、引用された統計のうちランダム標本**1,285件**を最大5ページ深くまでたどった。結果は、**40%**が同じことを述べる研究に到達（95%レンジ34〜46%）、**8%**は研究には到達したが数字か文脈が変わっており、**40%**は検証不能な情報源に当たり、**11%**は研究にまったく到達せず、**1%**は開かないページだった。

機構は捏造ではなく来歴だ。「The cited page contained the figure」は**82%**で成り立つが、引用ページのうち元の研究だったのは**21%**だけで、半分以上は企業ブログだった。だからこそこの一文になる。「A citation tells you where the AI found a number, not where the number came from.」典型例のゾンビは「44% of salespeople give up after just one follow-up attempt」で、5つすべてが出したが、たどると2020年の営業支援会社の統計ページと2017年のフリーライターの記事に行き着き、どちらの背後にも研究は無い。マーケティング自動化の導入率では5者が**49–51%、62%、70–79%、81%**、そして**96%**と答えた。5者すべてが割合を出した71問のうち、28問で4つか5つの異なる数字が並んだ。

**Why it matters:** 引用する前に、研究自身の限界を読むこと。結果はAPI経由で、質問は**2026年10月25日**に一度だけ投げられた。AI判定者は「was stricter than a person」で、モデル単独では23%しか出典ありと判定せず、人手補正で40%に上がった——つまり見出しの数字は補正後のものだ。TrakkrはAI検索可視性モニタリングを販売しており、ページに利益相反の開示は無い。持ち帰るべき規則は報告書末尾の一文だ。「Five assistants giving the same number isn't five sources.」

[`🔗 Trakkr Research — Zombie stats`](https://trakkr.ai/trakkr-research/zombie-stats) · [`🔗 HNディスカッション`](https://news.ycombinator.com/item?id=50290283)

---

## 9. SkyPilotの27%は計測ではなくモデル——計測された数字は14.4%のほうだ

- **Velocity:** ▮▮ rising
- **Source:** Hacker News · 101+ pts · 約4時間前（~23:45 UTC+8）
- **Tags:** `gpu-scheduling` `nvl72` `infrastructure` `training`

SkyPilotの主張は、NVL72のラック全体NVLinkはマルチノードジョブが1ラック内に収まる場合にしか効かず、現行のスケジューラはそれを無視している、というものだ。見出しは**使用可能GPUが27%増**——そしてこれはモデルであってA/B実測ではない。NVIDIAは**128ラック、2,304ノード**のクラスタを、ノード不可用率約2%、「Each slice must fit within a single rack」という制約でモデル化し、**16ノードスライスで2,037ノード、18ノードスライスで1,602ノード**という結果を得た。2%という入力は実測だ——「on production NVL72 clusters we have measured unavailability rates of around 2%」——が、27%はその入力に対するモデルの出力だ。

別途計測された数字はもっと小さく、しかし実在する。**128ノード、512基のGB300**でのGR00T N1.7事前学習でスループットが**14.4%**向上し、1イテレーションが**1.59 sから1.39 s**になった。補助的な比較は条件付きだ。16ノードは9ノードより4%良く、8ノードに対してはNVLinkドメインを2倍にしつつ「sacrificing under 1% of usable capacity until unavailability exceeds about 3.3%」。

**Why it matters:** 予備ノード2台にはコストがかかり、記事もそう書く——「two nodes per rack sit idle while everything is healthy」——そしてデフラグは安全に再起動できる作業しかプリエンプトしない。したがって正直な整理は、値札の付いたスケジューリングのトレードオフであって、無料の27%ではない。「128ラック・停止率2%」でないクラスタにこの見出しの数字を当てる人は、他人の構成を引用している。

[`🔗 SkyPilot — Grace Blackwell needs a new scheduler`](https://skypilot.ai/blog/grace-blackwell-needs-a-new-scheduler) · [`🔗 HNディスカッション`](https://news.ycombinator.com/item?id=50290912)

---

## 10. t3dotggがagent skillを9つ公開——`full-send`は誰も見ていない状態でPRをマージする

- **Velocity:** ▮▮ rising
- **Source:** GitHub · 2,372 stars · 2026-10-24作成
- **Tags:** `agent-skills` `claude-code` `codex` `pull-requests`

`t3dotgg/tstack`はMITライセンスの9つのskillで、「work in Claude Code and Codex」とされる。2026-10-24公開で、すでに**2,372 stars**、オープンissue 6件、オープンPR 5件。skillは実行する動詞で名付けられ——`file-pr`、`babysit-pr`、`takeover`、`modernize`、`council`、`sol-loop`——互いに組み合わさる。`full-send`は`sol-loop`、`file-pr`、`babysit-pr`を呼び、`takeover`はさらに`modernize`と`leaving-pr-comments`を引き込む。

興味深いのは`full-send`だ。「Takes a change to a merged PR with nobody watching: proves it, reviews it, files it, babysits it, merges it.」`full-stop`は同じパイプラインからマージだけを外したもの。`council`は「Gets review from three models from different providers, and loops until they agree」で、他社モデル上のサブエージェントが必要になる。READMEもそう書く——T3 Codeの`delegate_task`か、「a harness that can run those models」。要件は認証済みの`gh`と`python3`。

**Why it matters:** 無人マージを一級の動詞として出荷し、しかも大量のstarを集めた初めてのskill群であり、それを成立させている設計上の選択は依存グラフだ——レビューは独立したskillで、入れないという選択ができる。他のリポジトリが省きがちなREADMEの助言がこれだ。「These are starting points. Edit them.」個人設定は`CLAUDE.md`や`AGENTS.md`に置き、skillの更新で上書きされないようにする。

[`🔗 t3dotgg/tstack`](https://github.com/t3dotgg/tstack) · [`🔗 skills/ ディレクトリ`](https://github.com/t3dotgg/tstack/tree/main/skills)

---

## 11. gpu-unlockはRTX 4090でテンソル発行レート2倍に到達——README自身がcuBLASの伸びは12〜34%だと言う

- **Velocity:** ▮▮ rising
- **Source:** GitHub · 4,502 stars (repo: `JustAResearcher/gpu-unlock-ada`) · 2026-10-23作成
- **Tags:** `gpu` `rtx-4090` `firmware` `benchmarking`

`JustAResearcher/gpu-unlock-ada`（GPL-2.0）はLinuxカーネルモジュールで、RTX 4090（`10de:2684`、AD102）において「enables the SM speed-select override before the stock NVIDIA driver starts」し、FP32アキュムレートのワークロードでテンソルコアの発行スループットを取り戻す。実験的なAda対象は明示的なオプトインフラグの背後に並ぶ。10月25日に扱ったアプローチの延長で、固定版のNVIDIA `610.43.03`入力を取得しSHA-256を検証してファームウェアをローカル生成し、AD102ペイロードをZagitta/gpu-unlockのモジュールへ統合したうえで「writes SS0 `0x88888888` and SS1 `0x8`, then performs FLR before the unmodified NVIDIA driver binds」。

2倍という見出しは本物だが、加速率ではない。FP16→FP32は**165.6→331.6 TF/s**、BF16→FP32は**165.5→330.6 TF/s**で、リポジトリ自身が単位を明示する——「These are register-resident issue rates, not application GEMM or inference speedups.」実際のcuBLAS GEMMの伸びはFP16が**12〜34%**、BF16が**16〜20%**、「essentially unchanged at 4096³」で、量子化MoEワークロードでは伸びず、FP8の証拠は混在している。さらにコールドブートが要る。「Loading the module manually after NVIDIA has bound the card cannot unlock it.」実験対象はPCIアドレスで明示的に選ぶ必要があり、「`targets=all` never selects them」。

**Why it matters:** 命令発行レートとアプリケーションの数字を同じREADMEに並べ、どちらがどちらかを明言する稀なプロジェクトだ。2倍と12〜34%の隔たりは、合成上の上限から実際の学習が見るものまでの距離そのもの——ライセンスの注記も重要で、カーネルモジュールはGPL-2.0-only、「NVIDIA firmware remains under its own terms」、ビルド済みファームウェアは配布されない。

[`🔗 JustAResearcher/gpu-unlock-ada`](https://github.com/JustAResearcher/gpu-unlock-ada) · [`🔗 実測効果のセクション`](https://github.com/JustAResearcher/gpu-unlock-ada#measured-effect)

---

## 12. 単純なagenticループがLeanの未解決問題を8つ解いた——そして論文は、功績はループではなくLeanインターフェースにあると言う

- **Velocity:** ▮▮ rising
- **Source:** arXiv 2610.35962 · 2026-10-25
- **Tags:** `theorem-proving` `lean4` `agents` `scaling`

**h1**は「苦い教訓」の問いを真正面から立てる。「can a simple agentic loop that scales test-time compute match these workflows?」モデルに効率的なLean 4インターフェースを与え、検証器のフィードバックと自己内省を通じて動かし続ける——「without imposing a decomposition or search structure」。結果は**PutnamBench、FATE-X、FormalConjectures100-Solved**でのSOTA、FormalConjecturesの未解決問題8つの解決、そして同一モデル条件下で「matches or outperforms specialized workflows such as Goedel-Architect and AlphaProof Nexus」——さらに「a single attempt (pass@1) can often scale to solve open problems」という驚くべき所見まで。

そのあと論文はアブレーションで見出しを撤回していく。Claude CodeとAxProverBaseとの同一モデル比較では「simplicity alone is not enough: an efficient Lean interface largely determines cost and solve rate」。そこから出る勧告が有用な部分だ。ワークフローを規定する前に、まず効率的な実行フィードバックでフロンティアモデルを評価せよ、「at the risk of bitter lessons」。

**Why it matters:** 著者5名（Moalla、Rammal、Patel、Munos、Kempe）の論文がSOTAを報告し、そのうえで功績をアーキテクチャではなくインターフェースに帰す——本フィードが繰り返し求めてきた「どの変数を操作したのかを明示する」という作法そのものだ。実務的な読みは、harnessのツール人間工学的な質がオーケストレーションのグラフを上回るということ。agentインフラのチームが逆方向から繰り返し到達している結論と同じだ。

[`🔗 arXiv 2610.35962`](https://arxiv.org/abs/2610.35962) · [`🔗 全文（HTML）`](https://arxiv.org/html/2610.35962v1)

---

## 13. Outcome RLが買う「到達」は最大2.1ポイント——「新たに」解いた問題のうち再サンプルに耐えたのは3.5%

- **Velocity:** ▮▮ rising
- **Source:** arXiv 2610.34894 · 2026-10-26
- **Tags:** `reinforcement-learning` `evaluation` `reasoning` `benchmarks`

単著論文（Shan Yang）は、**公開済みRLモデル20種（1.5B〜32B）**の、出発点である思考モデルに対するpass@1の伸びを3つに分解する。**finishing**（トークン予算を使い切る前に答える）、**reliability**（答え終わったときに正しい）、**reach**（基盤モデルが8回すべて誤答した問題をRLが解けるようになった分から、逆方向を引いたもの）。固定トークン予算の物理・数学問題では、RLが主に動かすのは前2つだ。

基盤モデルが予算内に答え終わらないことが多い領域では「most of the change, gain or loss, is finishing (82% at 4k and 8k)」であり、「Given more tokens, the base closes most of the finishing gap itself」。トークンが足りている領域では伸びはreliability。reachは小さい。「Reach adds at most 2.1 percentage points on any of our four physics and math sets」で、RLモデルだけが解いた**144**問のうち「3.5% hold up when resampled or read」。無作為標本では「nine of ten new RL steps a human confirmed also appear in the base's samples」。

**Why it matters:** これは「RLの1回の実行が何を買うのか」を定義し直すもので、本フィードが今週ずっと追ってきた「harnessかモデルか」という問いと同じ地点に着地する。見かけのRLの進歩の大半が予算管理と採点の一貫性だとしたら、トークン予算を固定しないベンチマークや、1回の試行しか採点しないベンチマークは、間違った軸を測っている。論文自身の最後の所見が最も正直だ。8Bモデルでの小規模RLでは、新しい問題での伸びはfinishingで、reliabilityは横ばいだった。

[`🔗 arXiv 2610.34894`](https://arxiv.org/abs/2610.34894) · [`🔗 全文（HTML）`](https://arxiv.org/html/2610.34894v1)

---

## 14. NetBSDがベースシステムに48キロバイトのエディタを追加——レスキューイメージに入る大きさ

- **Velocity:** ▮ steady
- **Source:** Hacker News · 141+ pts · 約8時間前（~19:59 UTC+8）
- **Tags:** `netbsd` `editors` `base-system` `posix`

NetBSD財団は2026-10-28、`-current`が「now includes an alternative editor to vi(1) and xedit(1) in its base system, atto(1)」と発表した。nano/pico/xedit系のモードレスなスクリーンエディタで、存在理由は異例なほど率直に書かれている。「It is only 48 kilobytes, making it suitable for inclusion in the rescue system.」発表は自嘲で締めくくられる——「(This is real, but I'm honestly missing an opportunity by not posting it on 1 April. Let the editor wars commence!)」

**Why it matters:** ベースシステムの構成は、数十KBが丸め誤差ではなく設計制約であり続ける数少ない場所のひとつで、レスキューメディアはその制約が最も鋭く効く場面だ——端末やキーボードが正常でなくなると、viは使いやすくなくなる。48 KBのモードレスエディタはどちらの代替より依存面が小さく、一次情報源は発表ではなくman pageのほうだ。

[`🔗 NetBSDの発表（Mastodon）`](https://mastodon.sdf.org/@netbsd/117518160563539748) · [`🔗 atto(1) man page`](https://man.netbsd.org/atto.1)

---

## 15. OpenIDEAはJetBrains流のワークフローをRustで作り直した——169 MB対2,011 MB、ただしベンチマークはREADME自身が限定を付ける

- **Velocity:** ▮ steady
- **Source:** GitHub · 1,024 stars · 2026-10-21作成
- **Tags:** `ide` `rust` `tauri` `performance`

`l0ng-ai/openidea`（Apache-2.0）は、IntelliJ IDEAの流儀——キーマップ、ツールウィンドウ、どこでも検索——をRustコア＋Tauriのネイティブアプリに移植し、エディタ、コードインサイト、デバッガ、Git、ターミナル、データベース、HTTPクライアントを60言語以上でカバー、macOS・Windows・Linuxで動く。作成から1週間で**1,024 stars**、オープンissue 46件、オープンPR 9件。「IDEを作り直す」系で今のところ最も具体的な作品だ。

公開ベンチマークは`freqtrade`（Python、約770ファイル）をウォームキャッシュで開き、5回の中央値、Windows 11上のIntelliJ IDEA 2026.2.3との比較。プロジェクトを開くのが**0.9 s対3.1 s**、readyが**1.1 s対13.2 s**、メモリ（USS、全プロセス）が**169 MB対2,011 MB**、readyまでのCPU時間が**2.4 s対47.9 s**、終了が**0.3 s対5.9 s**。そしてREADMEは自分の表を打ち消す。「IDEA analyses Python more deeply, so 'ready' doesn't mean the same work on both sides.」

**Why it matters:** その限定こそが発見だ。12倍の「ready」高速化の一部は、「readyと称する前に何をするか」の12倍の違いに由来する。それを表と同じ節に書くプロジェクトは、書かないプロジェクトより信頼できる。耐久性のある主張としてはメモリの行を読むべきだ——169 MB対2,011 MBはスケジューリングの差ではなく、種類の差だ。

[`🔗 l0ng-ai/openidea`](https://github.com/l0ng-ai/openidea) · [`🔗 ベンチマークの節`](https://github.com/l0ng-ai/openidea#benchmark)

---

## 16. OpenAPIドキュメントが生成Goコードに`func init()`を書き込める——注入点はoapi-codegenのenumテンプレート

- **Velocity:** ▮ steady
- **Source:** VulnCheck advisory · CVE-2026-119028 · 2026-10-29
- **Tags:** `go` `openapi` `code-generation` `supply-chain`

**CVE-2026-119028**（8.8 CVSS 3.1、8.7 CVSS 4.0、いずれもVulnCheck、状態`Awaiting Analysis`）は`oapi-codegen`の**2.0.0 before 2.8.1**に影響する。OpenAPIドキュメントを制御する攻撃者が、整数・数値・ブールのschemaに非リテラルのenumエントリを仕込み、それが「closes the const block in `constants.tmpl` and injects a `func init()`, executing code when the generated package is built and imported」する。生成ファイルを手で編集する必要も、通常以外のビルド手順も要らない——ペイロードはパッケージ初期化時に走る。

修正は**2.8.1**（PR #2626、コミット`068f1bcd`）で、差分の位置はアドバイザリの記述と一致する。`pkg/codegen/templates/constants.tmpl`がv2.0.0の12行目からv2.8.0の16行目へ移っている。

**Why it matters:** OpenAPIドキュメントは第三者から来る——ベンダーの仕様、パートナーのリポジトリ、公開APIレジストリ——そして通常はデータとして扱われる。これにより、そのうちの1つが「import時に実行される」コードの供給源になる。動かすべき信頼境界は「誰のspecで生成器を回すのか」であり、レコードはまだ未分析なのでスコアはVulnCheck単独のものだ。

[`🔗 VulnCheck advisory`](https://www.vulncheck.com/advisories/oapi-codegen-2.0.0-before-2.8.1-code-injection-via-non-string-enum-values) · [`🔗 GHSA-g2vv-83pm-v2hc`](https://github.com/oapi-codegen/oapi-codegen/security/advisories/GHSA-g2vv-83pm-v2hc) · [`🔗 constants.tmpl`](https://github.com/oapi-codegen/oapi-codegen/blob/v2.8.0/pkg/codegen/templates/constants.tmpl#L16)

---

## 17. agentサービスはツールの返却で止まる、だからTAOはまとめてスケジュールする——レイテンシ最大26.8%減

- **Velocity:** ▮ steady
- **Source:** arXiv 2610.37230 · 2026-10-27
- **Tags:** `agents` `serving` `scheduling` `inference`

TAOは多くのサービングスタックが見落としている点から出発する。agentサービスは「alternate[s] between model inference on clustered GPUs and external tools on distributed CPUs」であり、既存システムは「overlook tool-return readiness in service evaluation」しつつ、GPUの受入と配置にはヒューリスティクスを使っている。そのvalue interfaceは、近い将来のツール準備度、時間減衰付きのノード固有cache credit、トークン占有量を統合し、動的計画法が容量制約下で待機中セッションの選択と配置を同時に行う。

報告される結果は12通りの「モデル・ワークロード・並行度」設定にわたる「最大」の数字だ。レイテンシ**26.8%**減、平均TTFT**36.3%**減、デコードスループット**29.5%**増——いずれも「relative to the best evaluated state-of-the-art baseline for each metric」。

**Why it matters:** 指標ごとに最良のベースラインを取るのは正しい報告の作法であり、最も要約しにくい作法でもある。3つの割合は同じ比較実行から出たものではないので、「TAOは26〜36%速い」と足し合わせることはできない。本当の貢献はスケジューリングの単位の定義だ。agentのリクエストはトークン列ではなく、周期的にCPUでブロックするトークン列であり、そのブロックが見えないスケジューラはワークロードの半分しか見ていない。

[`🔗 arXiv 2610.37230`](https://arxiv.org/abs/2610.37230) · [`🔗 全文（HTML）`](https://arxiv.org/html/2610.37230v1)

---

## 18. 10月28日のggml-rpcの記述の続報：2件目のレコード、今回はDoS——影響範囲はビルドb2877から

- **Velocity:** ▮ steady
- **Source:** NVD · CVE-2026-119052 · 2026-10-29 14:17 UTC公開
- **Tags:** `llama-cpp` `cve` `rpc` `denial-of-service`

**CVE-2026-119052**（8.7 CVSS 4.0、7.5 CVSS 3.1、いずれもVulnCheck）は、10月28日に扱ったスタックオーバーフローから2日後の2件目のggml-rpcレコードだ——同じ露出した`rpc-server`、別の欠陥。HELLOハンドシェイク後、クライアントは`SET_TENSOR`などのコマンドを`std::vector::max_size()`を超える長さで送れ、「triggering an uncaught `std::length_error` that aborts the process and denies service to all clients」する。今回は認証もRDMA能力も不要で、修正はビルドb11935（PR #31204）。

注目すべきは影響範囲で、**b2877 before b11935**——RDMAのバグのb8841よりはるかに古くまで及ぶ。深刻度は正しく低い。4.0ベクトルでは`VC:N/VI:N/VA:H`で、可用性のみに影響する。

**Why it matters:** 同じRPC面に対する未認証のレコードが2日で2件というのは、2つの出来事ではなくパターンだ。`rpc-server`は信頼されたクラスタ内コンポーネントとして書かれ、いまはインターネット露出のコンポーネントとして報告されている。`--rpc-server`をプライベートネットワークの外に出しているなら、両方のレコードが該当し、9を超えるスコアなのは片方だけだ。

[`🔗 CVE-2026-119052 (NVD)`](https://nvd.nist.gov/vuln/detail/CVE-2026-119052) · [`🔗 修正PR #31204`](https://github.com/ggml-org/llama.cpp/pull/31204)

---

## 19. 未認証の`GET /api/flows/:id`がディスク上の任意のYAMLを読めた——OpenHopのidは許可リスト無しで`path.join`へ

- **Velocity:** ▮ steady
- **Source:** GitHub Advisory · CVE-2026-59179 · 2026-10-28
- **Tags:** `path-traversal` `nodejs` `cve` `web-apps`

**CVE-2026-59179**（8.3、GitHubのアドバイザリチーム採点）は**0.3.7**未満の`@openhop/server`に影響する。`GET /api/flows/:id`と`DELETE /api/flows/:id`がルートパラメータを`FlowStore.filePath()`へ「without an identifier allow-list」で渡し、ルータが`decodeURIComponent`を適用したうえで`path.join()`が「normalizes traversal outside the configured flow directory after appending the .yaml extension」する。攻撃者はアクセス可能な任意の`.yaml`ファイルをYAML解析済みJSONとして読める——あるいは削除できる。`DELETE`という動詞が、これを情報漏えいであると同時に破壊的な問題にしている。どちらのルートにも認証は無い。

**Why it matters:** 欠陥は2行の組合せ失敗だ——decodeして、joinする——それぞれ単独では妥当で、組み合わせると妥当でない。拡張子を付けた後に`path.join`が正規化するというのが、素朴な「.yamlで終わるか」チェックを破るまさにその詳細で、修正（PR #190、コミット`c8190fb`）はv0.3.7に入った。小規模プロジェクトはこの形をしばしば出荷する。ここが特殊なのは、未認証のルートに削除の動詞が付いている点だけだ。

[`🔗 CVE-2026-59179 (NVD)`](https://nvd.nist.gov/vuln/detail/CVE-2026-59179) · [`🔗 修正PR #190`](https://github.com/naorsabag/openhop/pull/190) · [`🔗 v0.3.7リリース`](https://github.com/naorsabag/openhop/releases/tag/v0.3.7)

---

## 20. FowlerはLLMの文章に不気味の谷があると言う——そして言い換え提案を受け入れること自体が既に誤りだとも

- **Velocity:** ▮ steady
- **Source:** Hacker News · 221+ pts · 約5時間前（~22:57 UTC+8）
- **Tags:** `writing` `llm` `craft` `culture`

Martin Fowlerのblikiの記事は、LLMが生成した散文が人間の反応を引き起こすと主張する——「that sense that we are in an uncanny valley of prose」——そして検出ツールは誤った対応だという。読者の反応は、どんなチェッカーが動くよりも先に起きるからだ。勧告はよくある「書かせるな」より強硬だ。「I strongly recommend that authors should not fall into the trap of getting the LLM to write a draft」であり、「Even accepting suggestions of rephrasing is dangerous」。理由は文体ではなく理解にある。「the act of wrestling with the words forces me to overcome my confusions」——言葉を外注すれば、思考も外注することになる。

**Why it matters:** 記事に数字は無く、Fowlerもそれを装わない。検出器については「skepticism about their accuracy」を口にするだけで、実測を引かない。限定も明示される。「it isn't an absolute one」であり、アクセシビリティは実際の例外だ（Jim Highsmithはパーキンソン病に対してLLMを用いる）。行政的な文書が機械生成されるのは妥当だとも書く。末尾の開示こそ真似る価値がある。「I did not use AI or LLMs in any way while writing this post.」

[`🔗 martinfowler.com — LLM Voice`](https://martinfowler.com/bliki/LLM-Voice.html) · [`🔗 HNディスカッション`](https://news.ycombinator.com/item?id=50290177)

---

## Metadata

| Field | Value |
|-------|-------|
| Generated | 2026-10-29T20:18:39Z |
| Items | 20 |
| Sources tracked | 18（Hacker News、GitHub、NVD、CISA KEV、ベンダーアドバイザリ、arXiv、Hugging Face、ベンダーブログ） |
| Update schedule | 04:03, 12:03, 20:03 UTC+8（1日3回） |
| Ranking | Velocity-weighted（新しさ × エンゲージメントの加速度 × 情報源の権威） |
| License | [CC-BY 4.0](https://creativecommons.org/licenses/by/4.0/) |

---

[前日](2026-10-29.md) · [生の .md](2026-10-30.md) · [アーカイブ](../archive/)
