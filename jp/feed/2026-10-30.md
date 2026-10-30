---
date: 2026-10-30
updated: 2026-10-30T12:16:26Z
schedule: 04:03, 12:03, 20:03 UTC+8
sources: 32
license: CC-BY-4.0
---

# トレンド — 2026-10-30

**Velocity**（速度）順 — 注目がどれだけ速く移っているかで並べており、蓄積量では並べていない。各項目は実際に開いて読んだ一次情報源にリンクしている。

---

## 1. Mistralが1TパラメータのLarge 4の重みを公開——カードは1M、配備レシピは131K、同日の2文書でベンチマークも食い違う

- **Velocity:** ▮▮▮ trending
- **Source:** Hacker News · 893+ pts · 約6時間前（~22:13 UTC+8）
- **Tags:** `mistral` `open-weights` `moe` `licensing`

Mistralは2026-10-29、Mistral Large 4のオープンウェイトを公開した。愛称は「Le Chonk」で、**総パラメータ1T／アクティブ49B**のハイブリッドなinstruction-and-reasoning MoE、マルチモーダル入力対応だ。Hugging Faceのリポジトリ`mistralai/Mistral-Large-4-1T-A52B`には現在**54個のconsolidated safetensorsシャード**が入っている（最終更新14:51 UTC、発表記事の数分後）。リポジトリ自体はプレビュー用に2026-09-30に作成されていた。ライセンスは**Mistral Ecosystem Open-Weight license**で、記事は「a modified MIT license」と説明する一方、「businesses that operate a Model-as-a-Service offering must obtain a separate commercial license from Mistral」と定めている。

最も伝わりにくい数字はコンテキスト長と推論スイッチだ。記事はコンテキスト長を一切書いていない——HFの記事が「about 1T total, 49B active parameter, and a context window of 1M tokens」と補っている——が、同じ記事のvLLMの例は`--max-model-len 131072`を設定し、Inference Endpointsのレシピは「serves up to 131K tokens of context」と述べる。推論については「reasoning cannot be disabled, so using `reasoning_effort`: `none` would still use `high`」だ。主要ベンチマークはTerminal-Bench 4.0が**41%**（プレビューから13ポイント上昇）、Artificial Analysis Coding Agent Indexが**48%**（GLM-5.3と同点で「while using 47% fewer tokens per task」）、BrowseCompが**84.5%**、FinWorkBenchが**73.3%**——ただしBrowseCompでは記事自身の表でKimi K3の91.2%に届いていない。

**同じ日に出た2本目の発表文書は食い違う。** 同日公開のHugging Faceの記事は「As of October 29, 2026, the model is the fifth best open weights model on Artificial Analysis Intelligence index」と述べたうえで、「**28.3% on Terminal-Bench 4**」と合成「Coding Agent Index score of **49.8%**」を報告する——ニュース記事の41%と48%に対してだ。ニュース記事自身のグラフはプレビュー版の**28%**を「self reported」と明記してML4を41%に置いており、2つの文書のうち片方がプレビュー期の数字を正式モデル名で載せていることになる。

**Why it matters:** Mistralは自社記事で「we see a potential for uplift to conduct real attacks」と認め、サイバー向け変種を「rigorous vetting」付きでデザインパートナーに限定している——発表資料としては珍しい。しかし131KはMistralの数字ではない。**モデルカード**は3か所で1Mと書き、Vibe設定では`max_context_length = 1048576`、カード自身のFP8 vLLMレシピは上限を一切設定していない。131Kの2つはどちらも**Hugging Face**の文書（NVFP4レシピの`--max-model-len 131072`と、HF Inference Endpointsの「131K tokens of context」）に由来する。つまり「配備できる数字」は第三者がメモリ節約のために選んだ設定であり、より鋭い欠陥は誰も指摘していないほうだ——同じ発表の2文書が、このリリースの売りであるベンチマークで12.7ポイント食い違っている。NVFP4ビルドはさらに「requires NVIDIA Blackwell GPUs」で、単一の512 GB Apple Silicon Ultraに収まるのは2-bit量子化だけだ。

[`🔗 Mistral — releasing the weights`](https://mistral.ai/news/mistral-large-4-oss/) · [`🔗 Hugging Face — Welcome Le Chonk`](https://huggingface.co/blog/mistral-large4) · [`🔗 mistralai/Mistral-Large-4-1T-A52B`](https://huggingface.co/mistralai/Mistral-Large-4-1T-A52B)

---

## 2. CISAがGitLabの10.0をKEVに追加——土台の欠陥はRubyの正規表現コンパイラにあり、RubyはCVEを申請していない

- **Velocity:** ▮▮▮ trending
- **Source:** CISA KEV · カタログ2026.10.29 · 2026-10-29追加
- **Tags:** `cve` `gitlab` `ruby` `rce` `kev`

CISAは**2026-10-29**、**CVE-2026-97229**を既知の悪用済み脆弱性カタログに追加した。記録は**CVSS 3.1 10.0**——`AV:N/AC:L/PR:N/UI:N/S:C/C:H/I:H/A:H`——でCWE-190（整数オーバーフロー）。このスコアは**GitLab自身のもの**だ（`Secondary`スロットに`cve@gitlab.com`、NVD採点メトリクスは0）。NVDのレコードは依然**`Undergoing Analysis`**で、メトリクスはその1件だけ——比較できるNVDスコアはまだ存在しない。これは**「追認」のケースではない**（分析済みレコードにCNAのスコアだけが残る形）。GitLabは**19.4.2（2026-10-12リリース）**で修正した。NVDは翌日にレコードを公開し、KEVは**修正から17日後**に追随した——レコードからは16日後になる。NVDのレコードにはまだKEVフラグが付いていない——情報源はカタログであって、CVEエントリではない。

根本原因はGitLabのものではない。Ruby自身の**2026-10-23**のアドバイザリはGitLab割当の4つの識別子を名指ししている——CVE-2026-89078（正規表現パーサのdouble free、PR #13332）、CVE-2026-93577、CVE-2026-97229、CVE-2026-110264——そして明記する。「We have not requested CVE identifiers in Ruby for these fixes, at least for now.」修正は**Ruby 4.0.9、3.4.12、3.3.13**に入った。誰もが頼りたくなる2つの緩和策は機能しない。「`Regexp.timeout` does not protect against these bugs」であり、「Limiting the length of patterns does not reliably protect against them either」——なぜなら「some of them can be triggered by short patterns」だからだ。

**Why it matters:** 10月29日のAlpineのGitLabに関する記述以降で興味深いのは、KEV入りそのものではなく、最も広く自前運用されているコードホスティング上の10.0の未認証RCEに、**それが生きている言語側のCVEが存在しない**という事実だ。GitLabを19.4.2に上げても、その下のRubyは直らない——ソースからビルドする場合やディストリのRubyを積む場合がまさにそれで、Alpineが踏んだ穴だ。露出条件は狭いがよくある。「reached only when an application compiles a regular expression from a string that an attacker controls.」

[`🔗 GitLab 19.4.2 patch release`](https://docs.gitlab.com/releases/patches/patch-release-gitlab-19-4-2-released/) · [`🔗 Ruby — regexp fixes for GitLab CVEs`](https://www.ruby-lang.org/en/news/2026/10/23/regexp-fixes-for-gitlab-cves/) · [`🔗 CVE-2026-97229 (NVD)`](https://nvd.nist.gov/vuln/detail/CVE-2026-97229)

---

## 3. PHP2Shellと昨日取り上げたカーネルのバグを連鎖させ、25台がroot化——ファイアウォール24台、管理サーバ1台、そして政府関連組織

- **Velocity:** ▮▮▮ trending
- **Source:** Hacker News · 219+ pts · 約10時間前（~18:42 UTC+8）
- **Tags:** `php` `pan-os` `kernel` `exploitation` `incident`

Dreamは2026-10-26に連鎖悪用の分析を公開し、10-29に更新した。自動化された一括攻撃で**インターネット露出のPAN-OSファイアウォール24台**がroot化され、続く侵入で内部のファイアウォール管理サーバ1台が落ちた——「bringing the total number of servers exploited to 25」。24台のうち2台は米国政府関連組織のものだった。さらに攻撃者が横展開した管理サーバは「a third government server」と記されており、政府関連システムは合計**3台**（全体25台）になる。連鎖は**CVE-2026-109618 / CVE-2026-109619**（PHP2Shell、9.2）で`nobody`権限のコード実行を取り、続いて**CVE-2026-46300**——10月28日にKEVへ入り、昨日の本フィードで扱ったLinuxカーネルの権限昇格——が`/etc/pam.d/su`のpage cacheを上書きし、非特権プロセスからrootへ至る。

時系列は非常に速い。政府関連の1台目が**10月23日18:14 UTC**、2台目が**10月24日10:09 UTC**、管理サーバが**10月24日11:35 UTC**——「less than 90 minutes after rooting the second firewall」。大半は放置された。「For 22 of the 24 rooted firewalls, the attacker did nothing beyond planting the webshell.」依然として約**19,000**の指紋取得可能なターゲットが悪用可能だ。

**Why it matters:** 報告書の留保こそが本題だ。Dreamは「What we cannot determine is whether the password spray, backdoor account creation, or SAML key extraction succeeded」と書き、「we do not attribute this activity to a named threat actor」と述べる。報告とともに流布したAIの話について、著者らは帰属を留保したうえで、同じ文の中で逆方向の推論を述べる。「While we have no direct evidence that the AI tools were specifically used to write the exploit or the post-exploitation scripts, the code structure, commenting style, and consistency across ~40 scripts suggest AI-assisted development.」単独なら対処可能に見える9.xが2つ、組み合わさると90分未満でゼロ認証からrootに至る——昨日のカーネルの記録とこのPHPの記録を、2件ではなく1件のインシデントとして扱うべき理由がここにある。

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
- **Source:** GitHub · 1,239 stars（2026-10-30 04:25 UTC 実測）· 2026-10-21作成
- **Tags:** `ide` `rust` `tauri` `performance`

`l0ng-ai/openidea`（Apache-2.0）は、IntelliJ IDEAの流儀——キーマップ、ツールウィンドウ、どこでも検索——をRustコア＋Tauriのネイティブアプリに移植し、エディタ、コードインサイト、デバッガ、Git、ターミナル、データベース、HTTPクライアントを60言語以上でカバー、macOS・Windows・Linuxで動く。作成から9日で**1,239 stars**、オープンissue 63件、オープンPR 9件——同日朝の時点では1,024 / 46 / 9で、カウンタはまだ動いている。「IDEを作り直す」系で今のところ最も具体的な作品だ。

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

## 21. Binance はホットウォレットから 63 億ドルが流出したと発表 — 同社自身の説明は「DevOps エンジニアのノート PC」で、漏れた鍵ではない

- **Velocity:** ▮▮▮ trending
- **Source:** Hacker News · 913+ pts · ~6h ago (~05:38 UTC+8)
- **Tags:** `binance` `exchange` `incident` `custody` `ethereum`

Binance は被害を「**around $6.3 billion in stolen assets**」と見積もり、「**Some $3 billion of assets were frozen**」、そのうち「$2.3 billion in USDT and USDC stablecoins altogether」だと述べた。各社の数字は一致せず、しかも同じものを測っていない。Chainalysis は「roughly **$5.9 billion** at the time of the theft」、Arkham は「more than **$5.7 billion** in various cryptos」だがこれはハッカーのウォレットが「at one point」保有していた額 — 残高のスナップショットであって損失ではない。Coinbase の Conor Grogan は「up to **$5.8 billion**」とした。Tether は「over $1.57 billion in USDT」、Circle は「over $800 million in USDC」を凍結した。

争点は仕組みであり、Binance の説明は最初に流れたオンチェーンの物語とは違う。同社の「initial investigation」は、事案が「may involve a **compromised DevOps engineer's laptop**」であり、攻撃者がそれを使って「gain access to a service container and submit unauthorized withdrawal transactions」に至ったとする。直後の一文がこの種の欠陥の見方を変える —「**We have found no evidence of any wallet private key leak.**」同日の早い時点で、SecurityAffairs は未解決の問いを「whether credentials or signing mechanisms were compromised」と列挙し、「Large transfers alone don't prove a hack.」と注意を促していた。

**Why it matters:** 三つの数字が一つの数字として引用される — Binance 自身の影響見積もり、第三者が盗難時点で評価した額、Arkham のウォレットスナップショット — ので、まず直すべきは単位だ。次に仕組み。*サービスコンテナから送信された出金トランザクション*で 63 億ドルが流出する取引所は、署名経路と鍵が別の対象であるアーキテクチャであり、破れた統制は HSM ではなくコンテナ側にある。CoinDesk は見出しが落とした留保も残している —「would be the largest ever crypto attack」は条件付きで、「The transfers alone, however, don't establish whether the funds have become impossible to freeze or recover.」も添えられている。市場はビットコインが「dropped 4.8% to below $77,000」、イーサ −5.7%、BNB −8%、AAVE −11%。

[`🔗 CoinDesk — Binance loses $5.7 billion in largest crypto hack to date`](https://www.coindesk.com/business/2026/10/29/potential-multi-billion-binance-hack-hitting-crypto-markets) · [`🔗 Security Affairs — Binance investigates suspicious transfers worth up to $5.8 billion`](https://securityaffairs.com/202089/hacking/binance-investigates-suspicious-crypto-transfers-worth-up-to-5-8-billion.html) · [`🔗 HNディスカッション`](https://news.ycombinator.com/item?id=50296470)

---

## 22. YC が Minecraft と Mindustry でエージェント群を走らせた — GPT が 6 対 1 で勝ち、ゲームのソースコードまで読んだ

- **Velocity:** ▮▮▮ trending
- **Source:** Hacker News · 215+ pts · ~6h ago (~05:40 UTC+8)
- **Tags:** `multi-agent` `agent-harness` `benchmark` `minecraft` `mindustry`

YC Labs と Olam Labs は三つのマルチエージェント実験を行い、その背後のハーネスをすべて公開した。`yc-software/minecraft-agent-harness`（MIT、2026-10-29 作成、24 スター）、`olamlabs/multi-agent-mindustry`（GPL-3.0）、`olamlabs/harbor-multiagent`（Apache-2.0、Terminal-Bench の背後にある Harbor フレームワークのフォーク。記事はこれを「runs multiple agents in any environment」と説明する）。

数字は具体的だ。**Civ50**：GPT-6.1 Sol エージェント 50 体、3 時間、目標は一つ「Build a thriving civilization」、約 **5,900 メッセージ**、配給台帳と擬似政府が生まれた。階層はエージェントディレクトリの順序から生じ、「Ada, who was first, became the de facto leader」となった。エージェントの死は計 34 回、うち **初夜に 22 回** — そしてページは自らのグラフに照らして訂正を入れる：「The first-night count in the text is the 22 deaths before minute 20. Two of them fall outside the shaded band.」**Bed Wars**：45 分 × 9 戦、Claude Opus 5.5 が 10 体 対 GPT-6.1 Sol が 10 体 —「GPTs won our series **6–3**.」**Mindustry**：7 戦、約 9.5 時間 —「The GPTs (GPT-6.1 Sol in Codex) won **6-1** against the Claudes (Claude Opus 5.5 in Claude Code) in the 7 games」。第 3 戦は 4 時間 16 分だった。

本当の成果は行動の差だ。GPT 陣営はスペースが消えるまでメッセージを圧縮し（`G7T5FIRSTcourierLIVE`）、Claude 陣営は「+1」による提案・投票の仕組みを発達させた。最も含意の広い発見は「When stuck, GPTs read the source code」 — 行き詰まると Mindustry の公開ソースをウェブから取得し、ユニットと仕組みを理解しようとした。「This did not let them alter the source code of the game.」そして「The Claudes never searched up game code from the web.」

**Why it matters:** あらゆる「エージェント群」の主張を測る物差しは方法論の一文だ —「**We intentionally do no harness-level customization or special memory work.**」これが実験を可読で再現可能にする一方、モデル比較にはならない。モデルは別々のハーネス（Codex と Claude Code）で走っており、6 対 1 は*組み合わせ*についての言明であって、本誌が逆方向から繰り返し行き着いている結論そのものだ。戦術の細部は誠実である — Claude は第 6 戦で防空タレットの「55 of them were loaded with COPPER」で負け、第 7 戦では「a ring of 207 duos fed with graphite」を築いて「the same 24-zenith strike」を止めた。賢いモデルではなく、測定された修正である。

[`🔗 YC Labs — Agents in Games`](https://labs.ycombinator.com/projects/games/index.html) · [`🔗 yc-software/minecraft-agent-harness`](https://github.com/yc-software/minecraft-agent-harness) · [`🔗 olamlabs/multi-agent-mindustry`](https://github.com/olamlabs/multi-agent-mindustry) · [`🔗 HNディスカッション`](https://news.ycombinator.com/item?id=50296486)

---

## 23. IBM は 151 秒で 33 件の Langflow CVE を公開した — そのうち 3 件は 198 日前に修正済みだった

- **Velocity:** ▮▮▮ trending
- **Source:** NVD / IBM PSIRT · 33 records, 2026-10-29 16:17:35–16:20:06 UTC
- **Tags:** `cve` `langflow` `agent-platform` `mcp` `disclosure-lag`

「IBM Langflow OSS」に対する 33 件の CVE が、**2 分半の窓**で NVD に入った。Critical が 6 件（**9.9 が 3 件、9.8 が 3 件**）、High が 11 件、Medium が 16 件。スコアはすべて同一の主体 — `psirt@us.ibm.com` によるもので、あるレコードでは `Primary` スロットに、別のレコードでは `Secondary` に置かれている。これはまさにスロットが来歴ではないことの証拠だ。NVD 自身のスコアは公開されていない。その窓のレコードはすべて **`Undergoing Analysis`** のままで（9.9 の一つ CVE-2026-107328 も同様）、`configurations` は全件 null であり、この一群には CPE の範囲が一つも存在しない。製品は `langflow-ai/langflow` — **156,149 スター、MIT**、v1.13.0 は 2026-10-22 公開。ブリテンのコマンドも同じ成果物を指す：`pip install --upgrade "langflow==1.13.0"` と `langflowai/langflow:1.13.0`。

この一群は実際には**三つのブリテン**であり、参照リストは修正の波ごとにきれいに分かれる。`node/7293015`（16 件、「1.0.0 - 1.12.3」→ **1.12.4** へ）、`node/7293016`（13 件、「1.0.0 - 1.12.4」→ **1.12.5**）、`node/7294467`（Langflow 4 件に加え、`security-advisories@github.com` が採点した **Hono** 依存の CVE 3 件、「1.0.0 - 1.12.8」→ **1.13.0**）。これらのリリースは 2026-09-29、2026-10-06、2026-10-22 — 公開の **30、23、7 日前**にあたる。

そして範囲が成立しなくなる。ブリテン 7293016 はこう明言する：「**This bulletin also discloses fixes delivered in prior releases: CVE-2026-107366 was fixed in version 1.9.0; CVE-2026-18894 was fixed in version 1.11.2; and CVE-2026-77817 was fixed in version 1.11.5.**」該当リリースは 2026-04-14、2026-08-04、2026-08-25 — レコードより **198、86、65 日前** — にもかかわらず、各 CVE の説明は今も「1.0.0 through 1.12.4」と書いており、`configurations` が null である以上、この訂正を運ぶフィールドはレコードのどこにもない。CVE-2026-107366 が最悪で、この一群より九日早い **2026-10-20 に単独で公開**され、同じ過大な範囲を抱えたままだ。

**Why it matters:** Langflow の運用者が今日読むべきは MCP 関連の緩和策である。ブリテン 7293016 はこう書く —「Set `LANGFLOW_MCP_SERVER_INTERPRETER_HARDENING=true` to reject direct shell-script execution, and set `LANGFLOW_CUSTOM_COMPONENT_ADMIN_ONLY=true` to block non-admin MCP stdio access」、そして「**These controls do not replace the upgrade**」と添え、さらにそれを打ち消すフラグを名指しする：「Explicitly enabling `LANGFLOW_ALLOW_PUBLIC_CUSTOM_COMPONENTS` permits custom component execution and changes the default protection described for CVE-2026-18894.」ブリテン 7294467 の要約は「**unauthenticated remote code execution exploitable through model context protocol tool enumeration**」を、まとめた四つの問題の一つとして挙げている。そして上限は重大度ではなく開示遅延の測定値だ — 同じ午後に四月・八月・九月・十月の修正が並んだのであり、「今日 33 件の CVE」は書類がいつ閉じたかを述べているにすぎず、コードがいつ変わったかではない。

[`🔗 IBM ブリテン node/7293015（16 件 → 1.12.4）`](https://www.ibm.com/support/pages/node/7293015) · [`🔗 IBM ブリテン node/7293016（13 件 → 1.12.5、MCP 緩和策）`](https://www.ibm.com/support/pages/node/7293016) · [`🔗 IBM ブリテン node/7294467（4 件 + Hono 依存 → 1.13.0）`](https://www.ibm.com/support/pages/node/7294467) · [`🔗 CVE-2026-107328（NVD）`](https://nvd.nist.gov/vuln/detail/CVE-2026-107328)

---

## 24. CVE-2019-25781 の ID は 2019、`dateReserved` は 2026-10-29 — そして修正方針は「そのうちリファクタする」

- **Velocity:** ▮▮ rising
- **Source:** NVD / cveawg / GitHub · published 2026-10-29 13:08 UTC
- **Tags:** `cve` `python` `markdown` `redos` `maintenance`

VulnCheck は 2026-10-29 に **CVE-2019-25781** を公開した。**CVSS 3.1 7.5** と **CVSS 4.0 8.7**、いずれも VulnCheck による採点で、CWE-407。説明はこうだ —「Python-Markdown 3.0 through 3.11.2 contains an algorithmic complexity vulnerability in inline link parsing that allows remote attackers to exhaust CPU through unmatched brackets」、`LinkInlineProcessor.getText()` と `getLink()` を「quadratic scans that keep workers busy for minutes」に追い込む。

ID の年は確保された年ではない。このレコードの cveawg `dateReserved` は **2026-10-29T11:51:49.648Z** — 公開の **77 分前**である。2019 という数字は、VulnCheck が原報告を指すために使ったものだ。issue **#798「Parsing [[[[[[… takes quadratic time」は 2019-03-06 に開かれ、今日もオープンのまま**である。

レコードは修正版を一つも挙げていない。CNA コンテナは `affected: [{version: "3.0", lessThanOrEqual: "3.11.2"}]`、`defaultStatus: "unaffected"` で、`unaffected` の項目も `changes[]` もなく、**3.11.2 が PyPI の `latest`**（2026-10-19 アップロード）だ。上流の経緯が理由を語る。2026-10-13、報告者が六つの二次時間ペイロード形状を一つの issue にまとめて **#1654** を開き、「One line of input is enough.」と書いた。メンテナは 71 分後にそれを閉じた —「I would duplicate link discusion to https://github.com/Python-Markdown/markdown/issues/798 … We just need to get around to the refactor」、そして広く引用される一文を添えた：「I know it is easy to tell AI to find every performance issue, but then just posting a novel of them all in a single issue isn't very helpful.」

**Why it matters:** これは日付の形をした信号がそれぞれ別方向に誤る事例で、正直に言えるのはフィールドが支える範囲だけだ。ID は 2019 と言い、`dateReserved` は 2026 年 10 月 29 日と言い、コードは 2019 年に報告され 2026 年 10 月に再報告され、そしてインストールできる唯一のバージョンがレコードの言う「影響を受ける」バージョンである。7.5 と 8.7 の差も同源の組 — 同じ CNA、二つの CVSS バージョン、1.2 ポイント差 — なので、バージョンを添えずにどちらかを引用すれば、誰も責任を負わなくてよい数字が生まれる。ユーザーの Markdown を描画するものすべて — MkDocs、wiki、ドキュメントパイプライン、そして取得した README を変換するあらゆるエージェントハーネス — にとっての実際の結論は、緩和はアップグレードではなくレンダラのタイムアウトだということ。アップグレード先が存在しないからだ。

[`🔗 CVE-2019-25781（NVD）`](https://nvd.nist.gov/vuln/detail/CVE-2019-25781) · [`🔗 Python-Markdown issue #798（2019-03-06 開設、未クローズ）`](https://github.com/Python-Markdown/markdown/issues/798) · [`🔗 Issue #1654（2026-10-13 開設・クローズ）`](https://github.com/Python-Markdown/markdown/issues/1654)

---

## 25. Evo 2 の 40B チェックポイントは Blackwell で 25.7% — 欠けているのは重みではなく、ある一つの射影の総和順序

- **Velocity:** ▮▮ rising
- **Source:** arXiv 2610.39415 · 2026-10-29
- **Tags:** `quantization` `fp8` `reproducibility` `gpu` `checkpoints`

著者二名（Xun Ding、Ziyuan Qin）は、仕様の欠陥のように読める一文から始める —「**FP8 formats specify how values are stored, not how products are summed; this gap can break checkpoints.**」DNA 言語モデル Evo 2 は 1B と 40B のチェックポイントに Hopper FP8 を要求すると明記している。二枚の Blackwell（sm_120）GPU 上で両方が開発者自身の前向きテストに落ち（7B は通る）、「on an RTX 5070 Ti the 40B's next-base accuracy is **25.7%**, near guessing」となる。

結論は、この失敗が算術に由来し、数値ノイズではないということだ。Hopper 上では「natively, **99.996%** of one projection's outputs are correctly rounded (**H100: about 30%**), and fp32 accumulation of the same operands fails」 — つまり*精度を上げる*と悪化する。モデルは特定の丸めに対して検証されていたからだ。彼らの H100 FP8 GEMM エミュレータ（mmaemu、「bit-exact on captured 1B projections」）は依存を **1B の 21 個ある射影のうち最初の一つ**に局在させ、そこでは「exact sums fail but pass when shrunk by the H100's 1.4% (measured in-sample), not 2.1%」だという。その一つの射影だけを、重みはそのままでエミュレートすると、「40B BRCA1 variant-classification AUROC from **0.434 to 0.869** (H100: 0.868)」が RTX 5070 Ti で成立し、RTX PRO 6000 では 0.481 から 0.867 に上がる。

**Why it matters:** 限界は著者自身が述べており、主張の外枠をなす —「We tested one model family but not training origin」、そして 1.4% の縮小はサンプル内で測られたものだ。しかし再利用できるのはこの提言である —「**releases should specify reference arithmetic**」。ある GPU の累積順序でのみ再現するチェックポイントは、そのライセンスとファイル形式が示唆する可搬性を持たない。FP8 の重みを配備する人への手がかりは、参照カーネルをエミュレートすると消える大きなベンチマーク低下は、モデルではなくベンダーが検証した matmul を測っているということだ。開発者のハードで前向きテストが通ることは、あなたのハードに対する互換性の言明ではない。

[`🔗 arXiv 2610.39415`](https://arxiv.org/abs/2610.39415) · [`🔗 全文（HTML）`](https://arxiv.org/html/2610.39415v1)

---

## 26. 世界モデルとそのプレイヤーが Pico 2 W に同居する — 26k〜131k パラメータ、1 フレーム 2〜8M 乗加算

- **Velocity:** ▮▮ rising
- **Source:** Hacker News · 163+ pts · ~8h ago (~04:32 UTC+8)
- **Tags:** `world-models` `edge` `microcontroller` `transformers` `games`

`SheepSeb/tinyworldformer`（138 スター、2026-10-22 作成、**ライセンスファイルなし**）は二つのネットワークを Raspberry Pi Pico 2 W に載せ、同じコアで動かす。一つ目は現在のフレームと行動から次のフレームと報酬を予測する — **looped transformer、int8、26k〜131k パラメータ、1 フレームあたり 2〜8M 乗加算**。二つ目は行動を選ぶ — 隠れ層二つの MLP、float32、**9k〜16k パラメータ**。どちらもブラウザで WebAssembly として動くので、夢の中を自分で操作できる。

五つのゲームはいずれも数百行の numpy で、ホールドアウト精度表が付く。Breakout **99.99%**、Flappy Bird **100%**、Pong **99.45%**、Pac-Man lite **86.4%**、Doom-lite **83.6%**。ここで「Exact frames」は「the share of held-out transitions where every cell of the predicted frame matches the real game」と定義され、ランダムイベント直後のフレームは除外される。チップ上では「the actor only sees frames the world model generates, and the world model only gets actions from the actor」 — コア 1 が両方を担い、コア 0 が USB と表示を扱う。

**Why it matters:** 精度表の最も弱い行には説明が付いており、それが他の四行を信用できる理由になっている —「Doom-lite's 3D view has 768 cells and a single shaded wall pixel off counts the whole frame as wrong, so its number looks worse than it plays; the game state is almost always right.」これは完全一致指標が当然の挙動をしており、それを黙って再定義せず開示している。面白いのは設計上の制約のほうだ — 一フレームがゲーム状態の全体を保持しなければならないため、隠れ状態はフレームに*描き込む*必要がある（「the ball's heading is part of its token, and Doom-lite has a minimap」）— これは世界モデルとは何かを、ほとんどの論文より明快に述べている。

[`🔗 tinyworldformer — research demo`](https://sheepseb.github.io/stealth/posts/tinyworldformer.html) · [`🔗 SheepSeb/tinyworldformer`](https://github.com/SheepSeb/tinyworldformer) · [`🔗 HNディスカッション`](https://news.ycombinator.com/item?id=50295450)

---

## 27. ElementaryUI は三日間で SSR・永続リアクティブ・keyed リストを揃えた — ブラウザの中の Swift、Apache-2.0

- **Velocity:** ▮ steady
- **Source:** Hacker News · 74+ pts · ~7h ago (~04:56 UTC+8)
- **Tags:** `swift` `webassembly` `frontend` `reactive-ui`

`elementary-swift/elementary-ui`（**557 スター、Apache-2.0**、2024-09-29 作成）は「SwiftUI-style apps that run in the browser」を作る — 宣言的 Swift を Embedded Swift 経由で WebAssembly にコンパイルし、`@State`、`@Environment`、`@Reactive` がリアクティブ模型を担う。サイズについて重要な一文は「Full Embedded Swift support means **kB-sized wasm bundles instead of MB**」。v0.8.1 は 2026-10-27 公開。Hacker News に載せたのはその後の三日間のコミットだ —「basic support for SSR/SSG rendering of ElementaryUI views (#145)」「persistent reactive listeners (#146)」「cheaper listener fan-in and inline tracked dependencies (#147)」「allocation-free listener callback for schedulable nodes (#148)」「keyed `ForEach` with `id:` and per-row tracking (#149)」。

**Why it matters:** SSR/SSG と keyed リストの同一性は、デモ用フレームワークと出荷できるフレームワークを分ける二つの機能だ。前者は wasm が読み込まれる前にページが描画されるかを、後者は並べ替えのあと状態が生き残るかを決める。その両方が二歳のプロジェクトに一週間で入った。範囲も暗黙にせず明記されている —「ElementaryUI is an open-source project and not affiliated with or endorsed by Apple Inc.」wasm バンドルが本当に数 KB なら、興味深い問いは Swift がブラウザで動くかではなく、wasm へコンパイルする UI フレームワークが仮想 DOM なしに同一性とハイドレーションの意味論を保てるかであり、それはまさに #146 から #149 が検証しているものだ。

[`🔗 elementary.codes`](https://elementary.codes) · [`🔗 elementary-swift/elementary-ui`](https://github.com/elementary-swift/elementary-ui) · [`🔗 v0.8.1 リリース`](https://github.com/elementary-swift/elementary-ui/releases/tag/0.8.1)

---

## 28. RetroChessBench は棋譜の復元を問い、GPT 6 Astra は 24 回中 22 回失敗 — コード実行を渡しても 18 回

- **Velocity:** ▮ steady
- **Source:** arXiv 2610.39341 · 2026-10-29
- **Tags:** `benchmark` `reasoning` `chess` `tool-use`

単著論文（Tidor-Vlad Pricope）は逆行チェスに **12 問**のベンチマークを組む — 合法な履歴を再構成し「distinguish possible events from forced ones」— 「references, rubrics, and a terminal-reward environment」を備え、「exact-length constructions, unique endings, and exhaustive answer sets」を扱う。「two trials per task and condition, **GPT 6 Astra High fails to produce the required final answer in 22/24 attempts without tools and 18/24 with code execution**; mean terminal RL rewards are **14.75% and 27.19%**, respectively.」

失敗の型は採点で消さずに名指しされる —「failed responses reject legal histories and treat temporary obstructions as permanent.」仮説も仮説として提示される。すなわち「limited exposure to these missing explanations in web-derived training data contributes to the observed reasoning failures」であり、なぜなら「online retrograde archives often provide puzzles and final move sequences without detailed derivations」だからだ。

**Why it matters:** 逆行チェスは、本誌が繰り返し戻ってくる問いのきれいな版だ — 明示的で検証可能な規則があり、解の解説がウェブ上にほとんどない領域。数学研究に寄与しながら合法な履歴を再構成できないモデルは矛盾ではない。それは数学的成績が解法の*形*の検索に一部依存している証拠であり、論文自身の結論でもある —「Claims of general intelligence require evidence that models can transfer learnt principles to areas with few worked examples.」14.75% から 27.19% への跳ねは、モデルの結果として読む前にハーネスの結果として読むべきでもある — 同じ課題、同じモデル、道具が一つ増えただけだ。

[`🔗 arXiv 2610.39341`](https://arxiv.org/abs/2610.39341) · [`🔗 全文（HTML）`](https://arxiv.org/html/2610.39341v1)

---

## 29. Pico CSS がアーカイブされた — 16,828 スター、最終リリースは十九か月前、理由として挙がったのは AI

- **Velocity:** ▮ steady
- **Source:** Hacker News · 62+ pts · ~2h ago (~09:58 UTC+8)
- **Tags:** `css` `open-source` `maintenance` `frameworks`

「Pico CSS is no longer maintained」という投稿は 2026-10-30 に Hacker News に届いたが、決定はそれより古い。リポジトリは **2026-10-04** にアーカイブされ、投稿も同じ日のものだ。`picocss/pico` は現在 `archived: true`、**16,828 スター**。理由は異例に率直である —「**Today, AI can generate lightweight, standalone, accessible HTML with just the CSS it needs, so a Minimal CSS Framework for Semantic HTML matters less than it used to.**」もう一つの道は書き直しだったが、それは選ばなかった —「plain modern CSS instead of Sass, built on features it doesn't use today (OKLCH colors, cascade layers, Popover, anchor positioning)」に加え「a native compiler that strips unused CSS」が必要で、それは「would be a different project.」だったからだ。

残るもの：「Nothing breaks. npm, the jsDelivr CDN and picocss.com stay online for the long term.」止まるもの：「The repositories are archived. No new issues, PRs or releases.」そしてフォークの条件は、多くのプロジェクトが間違える部分だ —「Pico CSS is MIT licensed. You're free to fork it,」の直後に「**The Pico CSS name and logo are not covered by the MIT license. Please give your fork its own name**, so users don't confuse it with the original.」

**Why it matters:** この理由を引用する前に、タイムラインと突き合わせて読むべきだ。最終リリース **v2.1.1 は 2025-03-15 公開** — GitHub でも npm でも — つまりプロジェクトはアーカイブされる前に**十九か月間**リリースを出していない。「AI が不要にした」という説明は、その説明より前から存在した空白に対して与えられている。だからといって理由が誤りなわけではないが、検証できない。そして本誌の記録では、機能ではなく停止の原因として AI を挙げた最初の広く使われるフレームワークである。きれいに切り分けられるのはライセンスの分割 — コードは MIT、名称は商標 — で、これは正しい取り決めであり、フォークが自分を選んでいない利用者を引き継がない唯一の方法だ。

[`🔗 picocss/pico discussion #754`](https://github.com/picocss/pico/discussions/754) · [`🔗 picocss/pico（アーカイブ済み）`](https://github.com/picocss/pico) · [`🔗 HNディスカッション`](https://news.ycombinator.com/item?id=50298964)

---

## 30. Cursorのマーケットプレイスにあった公式Claude Code拡張の2.1.313にSSHバックドアが仕込まれていた

- **Velocity:** ▮▮▮ trending
- **Source:** Hacker News · 143+ pts · ~1h ago (~19:05 UTC+8)
- **Tags:** `supply-chain` `claude-code` `cursor` `ssh-backdoor` `incident`

Phorionは2026-10-30、**Cursorマーケットプレイス**上の**公式Claude Code for VS Code**拡張が侵害されていたとするセキュリティアドバイザリ（Calum Hall）を公開した。バックドア入りのバンドルには永続的なSSHバックドアが含まれ、macOS・Linux・Windowsそれぞれのセットアップ経路を持ち、バージョンは**2.1.313**とされている。注入はミニファイされた`extension.js`の先頭に付加されたIIFEで、`child_process`、`fs`、`os`、`path`、`http`、`crypto`を読み込み、「Nodeがファイルを読み込んだ時点で実行され、拡張の通常の`activate`コールバックより先に走る。ユーザーが拡張を操作する必要はない」という。Cursorは当該リリースを削除し、npmとVS Codeレジストリからも2.1.313を撤去したと記事は述べている。

連鎖は4段階。**第1段**は、攻撃者が用意したEd25519公開鍵を`svc-telemetry`というコメント付きで`~/.ssh/authorized_keys`に追記する（ディレクトリ0700、ファイル0600）。追記前のチェックは鍵そのものではなく**コメント文字列**を見ている。続いてsshdの起動を試みる——Linuxは`systemctl`／`service`／init.d、macOSは`sudo -n systemsetup -setremotelogin on`、WindowsはPowerShellでOpenSSH Serverを導入する。**第2段**は2つ目の埋め込み秘密鍵（`svc-telemetry-tun`）を`$TMPDIR/.stk_<16進10桁>`に書き出し、ユーザー`tunnel`として`134.209.82[.]225`へ`-R *:0:localhost:22`でリバーストンネルを張る。これはデタッチされた60秒リトライループに包まれ、IDEを閉じても生き残る。**第3段**は永続化で、`~/Library/LaunchAgents/com.apple.sysmond.plist`（`RunAtLoad`と`KeepAlive`）、`@reboot`のcronエントリ、または`SysMon`スケジュールタスクを置く。**第4段**はビーコンで、ホスト名・ユーザー名・プラットフォーム・アーキテクチャ・カレントディレクトリ・`git config --global user.email`・公開IP、そして`/KEY|TOKEN|SECRET|PASS|AWS|GCP/i`に一致する**環境変数名**を最大**40個**、`134.209.82[.]225:8099`の`/beacon`へPOSTする——**名前であって値ではない**。同時に`127.0.0.1:8099`へも送るが、スクリプト自身はそのポートで待ち受けていない。

**2つの独立したレジストリ確認がこのバージョン番号を裏づける。** npmの`@anthropic-ai/claude-code`は553バージョンを持ち、`dist-tags`は`latest: 2.1.314`。**2.1.312は2026-10-27T18:36:10Z、2.1.314は2026-10-30T00:12:56Zに公開され、その間に2.1.313は存在しない**。上流の`CHANGELOG.md`は`## 2.1.314`から`## 2.1.312`へ直接飛び、文字列`2.1.313`の出現回数は**ゼロ**。AnthropicとCursorの双方について公開声明は見つけられず、このアドバイザリにCVEもない。

**Why it matters:** 影響範囲を縛っている実装バグが3つあるが、いずれも防御ではない。macOSでは`systemsetup -getremotelogin`を**権限昇格せずに**実行するため、一般ユーザーには標準出力へ`You need administrator access to run this tool... exiting!`が出て終了コードは0、`/Off/i`は決して一致せず、有効化の段が丸ごと飛ばされる——マルウェアは「SSHが切れているか確認する権限がない」を「SSHは既に有効」と解釈している。これは元々リモートログインが無効だったMacで inbound 経路を断つだけであり、鍵とLaunchAgentはそのまま残る。Windowsの経路はPowerShellを`/bin/sh`をハードコードしたヘルパーに渡している。Linuxのcrontabチェックは「繰り返し実行すると既存のユーザーcronジョブを消し得る」。拡張をアンインストールしてもどれも消えない——アドバイザリの対処手順は、トンネルのプロセスを殺し、LaunchAgentをアンロードし、`~/.config/.smt`と`.smtk`を削除し、鍵を外し、あの環境変数フィルタに一致する認証情報をローテートすることだ。そして構造的な点は今回の事件より長く残る。IDE拡張はIDEの権限で動くので、拡張ホストがバックグラウンドで`~/.ssh/authorized_keys`を書き換えること自体がシグナルになる。なぜなら「IDEのバイナリ自体は正しく署名されている」からで、`echo`や`tee`を見張るプロセスルールでは`fs.appendFileSync`は捕まらない。

[`🔗 Phorion — Official Claude Code Extension Compromise`](https://phorion.io/blog/offical-claude-code-vsx-compromise/) · [`🔗 GossiTheDog（Mastodon）`](https://cyberplace.social/@GossiTheDog/117528831681803563) · [`🔗 HNディスカッション`](https://news.ycombinator.com/item?id=50302334)

---

## 31. Herdrがネイティブアプリを公開——ウィンドウはファイルツリーで、閉じてもエージェントは止まらない

- **Velocity:** ▮▮▮ trending
- **Source:** Hacker News · 241+ pts · ~11h ago (~08:42 UTC+8)
- **Tags:** `agent-infra` `terminal` `multiplexer` `rust`

`herdrdev/herdr-app`（Apache-2.0、Rust）はターミナルとコーディングエージェントのためのデスクトップアプリで、2026-10-16作成、現在**582 stars**、44フォーク、未クローズ83件、**v0.1.9は2026-10-30公開**——CHANGELOGには同日の0.1.8、10-29の0.1.7も並ぶ。**herdr-core**のクライアントで、READMEはcoreを「マシン上の小さなサーバ」と説明する。「ウィンドウがターミナルを並べ、coreがそれらを動かす。ウィンドウを閉じても動き続ける。」

tmux的な選択肢と分ける設計判断が2つある。第一に、**エージェントがエージェントを起動するのが一級の動詞**であること——`hc run --bg codex "review my diff. Done: hc send t1"`でヘルパーを起動し、報告方法を指定する。`hc send t3 "take another look"`で実行中に方向を変える。「報告も終了も『あなたが必要』も、親エージェントの入力に落ちる。」サイドバーは各エージェントをWorking／Blocked／Done／Idleに分類する。第二に、**UIがディレクトリそのもの**であること。すべては`~/.config/herdr-app`配下の`settings.json`、`keys.json`、`layouts/`、`themes/`、そしてパネルやメニューを描く小さなJavaScriptである`mods/`に入り、「エージェントが何を変えてよいか」を書いた`AGENTS.md`が添えられる。プラグインAPIも、維持すべきフォークもない。SSHマシンは同じサイドバーに合流し、リモートのエージェントは「リモートマシンとcoreが動いている限り」動き続ける。

**Why it matters:** 正直な一文はランディングページではなくREADMEにある。「再起動やcoreのクラッシュ後、残したペインは元のフォルダで新しいシェルを得る。元のプログラムではない。」つまり「閉じても動き続ける」はウィンドウを閉じる操作に対しては真で、ホストの再起動に対しては真でない——tmux利用者が最初に聞くのはまさにその区別だ。さらに2つの注意も明記されている。「どちらのインストーラもコードをダウンロードして実行する」（curlパイプと`irm … | iex`）、そしてmacOSのプリビルドはApple Siliconのみで、Intel Macはソースからビルドするよう案内される。HNのスレッドは長年のマルチプレクサ利用者が中心で、最も鋭い問いは機能一覧ではなくデーモンと資金調達に向いている——あなたとエージェントが持つ全認証情報の間に今や座っているツールにとって、それは正しい問いだ。

[`🔗 herdrdev/herdr-app`](https://github.com/herdrdev/herdr-app) · [`🔗 herdr.dev`](https://herdr.dev) · [`🔗 HNディスカッション`](https://news.ycombinator.com/item?id=50298436)

---

## 32. Clover-35B-A3B-Previewが拡散LMを35Bへ——そして速度の数字は「社内エージェント負荷」で測られている

- **Velocity:** ▮▮ rising
- **Source:** Hugging Face Blog · published 2026-10-30
- **Tags:** `diffusion-lm` `moe` `open-weights` `agentic-coding`

DiffuSpace——Dream 7Bのチームで、あのモデルは2025年4月にHKU NLPグループから公開され、記事によればDreamファミリはHubで**270万ダウンロード**を超えた——は2026-10-30、**Clover-35B-A3B-Preview**を公開した。MoEの**拡散**言語モデルで、総パラメータ35B／アクティブ3B、思考モード付き、Apacheライセンス、重みはHugging Face・GitHub・ModelScopeにあり、推論はSGLangとllama.cppに対応する。

ベンチマーク表は、この規模で拡散モデルが出した中で最も競争力のあるものだ。**SWE-bench Verified 73.6**、**Terminal-Bench 2.1 51.7**、**τ³ Overall 65.3**、GPQA Diamond 83.8、ZebraLogic 95.8、AA-LCR 72.0——自身の比較において6つのエージェントベンチマークすべてで最高スコアだと主張し、相手はLLaDA2.2 flash、Mercury 2.5、Qwen3.6-35B-A3B、Qwen3.5-35B-A3Bだ。

効率の主張は分母が問題になる。**680 tokens/s**は「**社内エージェント負荷**、単一のNVIDIA GB300、BF16精度、バッチサイズ1」で測定されており、公開スイートではない。しかもバッチ1は拡散の並列デコードが最も有利な領域だ。H200での比較**515対365 tokens/s**は「DFlash2構成」の同規模Qwenとの比較で、ある特定の高速化スタックとの比較であり、そのモデルの出荷時形態ではない。オンデバイスの数字が最もきれいだ。**16GB VRAMのRTX 5070 Ti**にINT4で載せ、MATH-500で**101.8 tokens/s**、「同規模のMiniCPMとQwenモデル」の48.5に対して。

**Why it matters:** 速度の主張を成立させているのはアーキテクチャの変更で、しかも検証できる程度に具体的に書かれている。**双方向Gated DeltaNet**では「生成済みのコンテキストはGDNの再帰状態へ効率的に圧縮され、現在のブロック内のトークンは細粒度の双方向softmaxアテンションで相互作用する」。記憶の**読み出しは独立した情報単位として同じsoftmaxに参加**し、学習可能なブロックスサイズ校正と、右側コンテキスト用のゼロ初期化畳み込み分岐が加わる。注意点は名前に入っている——これは**Preview**であり、6つのエージェントスコアに独立評価はまだ存在しない。持ち帰るべき読み方は、「速い」はデコード**領域**（バッチ1、拡散、GB300）と特定のベースラインの加速スタックの性質だということ。配信チームは680を、ある一種の負荷形状に対する上限として扱うべきである。

[`🔗 Hugging Face — Clover-35B-A3B-Preview`](https://huggingface.co/blog/Diffuspace/clover-35b-a3b-preview) · [`🔗 Diffuspace/Clover-35B-A3B-Preview`](https://huggingface.co/Diffuspace/Clover-35B-A3B-Preview) · [`🔗 DiffuSpace/Clover-35B-A3B-Preview`](https://github.com/DiffuSpace/Clover-35B-A3B-Preview)

---

## 33. Elixirの標準ライブラリが午前中に3件のCVEを出した——しかも自身のドキュメントが既定値を間違えている

- **Velocity:** ▮▮ rising
- **Source:** NVD / EEF CNA · published 2026-10-30
- **Tags:** `elixir` `stdlib` `denial-of-service` `cve`

Erlang Ecosystem FoundationのCNA（`6b3ad84c-e1a6-4bf7-a703-f496b71e49db`）からの3件が2026-10-30に着地した。いずれもCNA採点で、NVD上はいずれも`Received`、**NVD独自の指標は0**。運用上まず対処すべきは**CVE-2026-115274**（6.9、CVSS 4.0、CWE-1284）だ。`JSON.decode/1`と`decode!/1`は各整数リテラルを長さ無制限で`erlang:binary_to_integer/1`に渡すため、「100万桁のリテラルは正常にデコードされるが、同長の文字列の100〜300倍のCPUを要し、数MBのリクエストボディがスケジューラを約1秒占有する」。約129万桁を超えると`SystemLimitError`を送出する。露出についての一文は二度読む価値がある。「`phx.new`が生成したアプリケーションは`Plug.Parsers`で`JSON`を使ってリクエストボディをデコードする。**ルーティングと認証より前**に。」

**CVE-2026-109821**（6.3、CVSS 4.0、`AT:P`）は同じ「数量が無制限」の形が`URI.parse/1`に現れたものだ。`split_authority/1`がポートを`String.to_integer/1`で長さ無制限に変換し、最大1,262,592桁の10進ポートが巨大整数になる。URIをテキストへ戻す際の`:erlang.integer_to_binary/1`はErlang/OTP 27、28、29.0で二次関数的で、「40万桁のポートは約2.6秒、1MBのポートは約18秒で描画される」。65535を超えるポートも受け付ける。**CVE-2026-97209**（5.4、`AV:L`）は性質が異なる。`Mix.Tasks.Deps.Partition.server/4`は共有のシステム一時ディレクトリ下の固定名ディレクトリ経由でパーティション設定を渡し、読み戻した内容を信頼する。一方`File.mkdir_p/1`は「既存ディレクトリを所有者を確認せずに受け入れる」ため、同じホストの別ユーザーが先にそのディレクトリを作れば、コンパイル中のユーザーとしてコードを実行できる。影響は`1.20.0-rc.4`から`1.20.5`の手前までのみ。

**Why it matters:** EEF自身の技術分析に、一般化する価値のある一文がある。「`JSON.decode/3`のドキュメントは既定値として`&String.to_integer/1`を挙げており、**変換の仕方は同じだ**」——しかしコードは`erlang:binary_to_integer/1`を呼んでいる。ドキュメントは振る舞いについては正しく、関数名については間違っている。これがレビューをすり抜ける類のバグだ。修正版は**1.18.6、1.19.7、1.20.5**で3本のブランチにまたがる。6.9はCVE-2026-115274を過小評価している。この不具合はリクエストデコーダ内で発火し、どのルートもplugも認証チェックもそれを見られない。したがってルート単位のレート制限は緩和策にならず、緩和策はアップグレードだけだ。

[`🔗 EEF CNA — CVE-2026-115274（JSON）`](https://cna.erlef.org/cves/CVE-2026-115274.html) · [`🔗 EEF CNA — CVE-2026-109821（URI）`](https://cna.erlef.org/cves/CVE-2026-109821.html) · [`🔗 CVE-2026-115274（NVD）`](https://nvd.nist.gov/vuln/detail/CVE-2026-115274)

---

## 34. AzureのAPI Connectionsが5件の完全なクロステナント侵害を許した——そして一方の修正が前の穴を開け直した

- **Velocity:** ▮ steady
- **Source:** Hacker News · 10+ pts · ~2h ago (~18:06 UTC+8)
- **Tags:** `azure` `cloud-security` `cross-tenant` `logic-apps`

Binary SecurityのHaakon Wik Gulbrandsrudが**2026-10-02**に公開し、2026-10-30にHacker Newsへ届いた。主張は大きく、機構は小さい。Azureの**API Connections**（Logic Appsの背後にある共有コンポーネント）は、あるテナントが別テナントの接続を操作し、ひいてはその接続が認証しているバックエンド——Key Vault、Azure SQL、Jira、Salesforce、「実質的に無制限」——を操作できる。連鎖が成立するのは、ARMの`DynamicInvoke`と`/extensions/proxy/`エンドポイントが共有APIMインスタンスに到達でき、そのインスタンスが全接続に対する権限を持つためだ。したがって要求パス内のトラバーサル（`path/%2e%2e/%2e%2e/%2e%2e/%2e%2e/apim/keyvault/<id>/secrets/<name>/value`）で被害テナントの秘密を読める。報告によれば最初の修正は「基盤のトークン問題ではなく、許可されるパスを制限したように見えた」。著者はその後Standard Logic AppへSSHしてコードを取り出し、**文書化されていない4つのエンドポイント**（`DynamicInvoke`、`DynamicList`、ほか2つ）を見つけ、`DynamicList`で被害者のAzure SQLに対して任意の`INSERT`を実行した。

さらに2つ続く。Consumption Logic AppにはマネージドIDがなく、したがって**すべての**Version 1 API Connectionへの暗黙のアクセスを持つ。それを止めているのは入力検証だけであり、`host.api.RuntimeUrl`パラメータは、ホスト名が`azure-apihub.net`で終わる限り、接続自身の値とは異なる`runtimeUrl`をワークフローに指定させる。Microsoftの修正はこのURLを**パスの正規化より前に**検証したため、トラバーサル片を足せば検証を通り、APIMインスタンスは別の接続として解釈した。

**Why it matters:** 回帰そのものが持ち帰るべき教訓だ。「Microsoftがどうにかこのパストラバーサルの修正をまとめ上げたとき、驚くべきことが起きた。元の`RuntimeUrl`パスが**もはや検証されていなかった**」——2度目の修正が1度目を打ち消した。パッチを原始的な性質ではなく特定のペイロードに合わせたときに起きる故障モードである。著者自身が述べる注意点は、多くの組織が飛ばす緩和策だ。「もちろん、これらの接続を設定する人がアクセストークンや鍵の権限を絞り、API Connectionをバックエンドで最小権限にすることは可能だ。ただし、そうしている例は稀だろう。」すべて修正済みと報告されている。記事は1か月前のもので、本誌にとっては新しいが、インターネットにとっては新しくない。

[`🔗 Binary Security — Azure's Weakest Link`](https://www.binarysecurity.no/posts/2026/10/one-root-case) · [`🔗 HNディスカッション`](https://news.ycombinator.com/item?id=50301854)

---

## 35. Cloud Foundryの`/internal/v3/`ステージングコールバックはv4とv5が得た拒否ルールを取り損ねた——しかも監査役がGUIDを列挙できる

- **Velocity:** ▮ steady
- **Source:** NVD / Cloud Foundry Foundation · CVE-2026-59387 · 記録公開 2026-10-30
- **Tags:** `cloud-foundry` `access-control` `cve` `privilege-escalation`

**CVE-2026-59387**は**8.8（CVSS 3.1）**——`AV:N/AC:L/PR:L/UI:N/S:U/C:H/I:H/A:H`——で、`security@vmware.com`が割り当て、NVDでは`Received`、**NVD独自のスコアはない**。欠陥は2度拡張され3度目に漏れた拒否リストだ。「Cloud ControllerのNginxルーティング設定は`/internal/v4/`と`/internal/v5/`への未認証アクセスを遮断しているが、`/internal/v3/`に対する同等のルールを欠いている。」結果として`/internal/v3/staging/:guid/droplet_completed`と`/internal/v3/staging/:guid/build_completed`が「OAuthも相互TLSもなしに公開APIリスナーから到達可能」になる。

それで何が買えるか。「有効なbuildまたはdropletのGUIDを持つ攻撃者は、偽造したステージングコールバックを送信し、dropletをSTAGEDへ遷移させ、関連するpackageもactorも持たない任意のprocess metadataとsidecarデータを永続化できる。」しかもGUIDは難しくない。「**SpaceAuditorは書き込み権限なしにGUIDを列挙できる**ため、これは意図されたロール境界を越える実効的な権限昇格になる。」読み取り専用ロールが書き込みになる。

**Why it matters:** 2つの日付を切り離して読むべきだ。Cloud Foundryのアドバイザリは**2026-10-20**付、CVEレコードの公開は**2026-10-30**——10日後であり、これが今日のバッチに現れる理由である。影響範囲は「CAPI **v1.245.0**（含む）まで」、修正は**CAPI v1.246.0以上**と**cf-deployment v60.7.0以上**（CAPI v1.247.0を含む）。報告者はMinseong Kim（mak3bread）。一般化できるバグは、本誌の「内部エンドポイント」記事すべてに共通するものだ。制御を**遮断するパスの一覧**として表現すると、兄弟のバージョンプレフィックスが存在した瞬間に破れる。そしてバージョンプレフィックスこそ内部APIが溜め込むものだ。

[`🔗 Cloud Foundry — CVE-2026-59387 アドバイザリ`](https://www.cloudfoundry.org/blog/cve-2026-59387-broken-access-control-restriction-in-cloud-controller-api/) · [`🔗 CVE-2026-59387（NVD）`](https://nvd.nist.gov/vuln/detail/CVE-2026-59387)

---

## 36. ClickHouseの9.5は未認証RCE——そしてベンダーの公開説明は28語しかない

- **Velocity:** ▮▮ rising
- **Source:** NVD / ClickHouse CNA · CVE-2026-116366 · published 2026-10-30 11:00 UTC
- **Tags:** `clickhouse` `cve` `rce` `disclosure`

**CVE-2026-116366**は**9.5（CVSS 4.0）**——`AV:N/AC:H/AT:N/PR:N/UI:N/VC:H/VI:H/VA:H/SC:H/SI:H/SA:H`——で、`ClickHouse`自身が割り当て、**2026-10-26T07:54:23Z**に予約、**2026-10-30T11:00:11Z**に公開された。4日だ。NVDのレコードは`Received`のままで、指標を1つだけ持つ。CNAの9.5が`Secondary`スロットにあり、`nvd@nist.gov`の指標はゼロ——つまりこの数字はClickHouseのものでNVDのものではない。CNAコンテナにCWEはない。`AC:H`だけがこのベクトルと10.0の間にある。

機械可読な部分は正確だ。4本のブランチ範囲はいずれも排他的な`lessThan`上限で、`packages.clickhouse.com`と`github.com/ClickHouse/clickhouse`に紐づく。`26.3 → 26.3.62.3-lts`、`26.8 → 26.8.36.3-lts`、`26.9 → 26.9.27.3-stable`、`26.10 → 26.10.3.7-stable`。ベンダーの変更履歴が日付と配備の注記を補う。「**Fixed in ClickHouse v26.10.3.7, 2026-10-30**」、そして「本脆弱性の修正はすべてのClickHouse CloudおよびBYOC配備に適用済み」。クレジットは**Elshad Toklayev**。

**Why it matters:** 脆弱性そのもの以外はすべて揃っている。公開された説明は一文だけ——「An issue has been discovered in ClickHouse Server that, under certain conditions, could allow an unauthenticated user with network access to execute arbitrary code on the ClickHouse Server」——28語で、**どの条件か**が書かれていない。すると運用者が問う2つの質問は逆向きに解決する。「自分は露出しているか」は開示から答えられないが、「パッチは当たっているか」は4つの正確なバージョン境界から、当日に答えられる。平均より良い開示プロセス（予約・公開・修正が1週間以内、範囲は散文ではなくCNAコンテナ内）に、平均より悪い説明が付いた形であり、実務的な帰結はこうだ。ネットワークにリスナーを開いているClickHouseは、自分の脅威モデルではなくスコアと範囲に従ってアップグレードすべきである。

[`🔗 ClickHouse セキュリティ変更履歴`](https://clickhouse.com/docs/resources/changelogs/security-changelog) · [`🔗 CVE-2026-116366（NVD）`](https://nvd.nist.gov/vuln/detail/CVE-2026-116366)

---

## 37. Prefix Executability：エージェントはタスクを完了できる。計画が最初から最後まで実行不能でも

- **Velocity:** ▮▮ rising
- **Source:** arXiv 2610.40444 · 2026-10-29
- **Tags:** `agents` `evaluation` `tool-use` `benchmarks`

著者4名（Amir H. Rezaeian、Weiyi Sun、Yassine Benajiba、Dan Roth）は、最終的なタスク成功が本当に知りたいことを隠すと主張する。中間のツール呼び出し軌跡が実行可能だったかどうか、である。彼らのプロトコルは「予測されたツール呼び出し列のすべてのプレフィックスが、ツールschema、状態の事前条件、データ依存の下で実行可能であり続けるか」を検査し、5つの統計量で要約する。Prefix Executability曲線、**First-Error Depth**、Trajectory Executability Rate、horizon正規化AUC-PEC、Recovery Rateだ。

**BFCL-v3 multi-turn**と**ToolSandbox**の層化サンプル、および**τ³-bench**のAirline/Retail base全分割で実装された。中心的な結果は順位の逆転である。「結果のみとプレフィックス水準の順位は分岐する。未検証の計画を条件に実行するエージェントは、計画を条件にしないベースラインより高い最終成功の点推定を得る一方で、**TERとAUC-PECを大きく下げる**。」検証的介入としては、「明示的な実行前の計画検査が、競争力のある最終成功を保ちながら実行可能プレフィックスの生存率を改善し得る」。

**Why it matters:** 手法論文として読むべきだ。まさにその通りで、要旨はこの分岐を定性的に報告するだけで、スコアもベンチマーク別の表も効果量も出していない。だから誰もここから数字を引用すべきではない。それでも主張しているのは、本誌が別方向から何度も到達している点だ。先に計画するエージェントはスコアが高く、しかも実行はより頻繁に破綻する。つまり2つの指標は同じものの2つの解像度ではなく、トレードオフの関係にある別物だ。これが成り立つなら、終状態だけを採点する評価は、生産システムなら拒否する軌跡を持つエージェントを体系的に選び出していることになる。そしてFirst-Error Depthが、誤りがどこで入るかを告げる数字だ。

[`🔗 arXiv 2610.40444`](https://arxiv.org/abs/2610.40444) · [`🔗 全文（HTML）`](https://arxiv.org/html/2610.40444v1)

---

## 38. 投機的デコードがエネルギーを節約するのはドラフトが受理される間だけ——バッチが大きいと損失に転じる

- **Velocity:** ▮▮ rising
- **Source:** arXiv 2610.40287 · 2026-10-29
- **Tags:** `inference` `energy` `speculative-decoding` `serving`

著者5名（Bole Ma、Ayesha Afzal、Jan Eitzinger、Harald Koestler、Gerhard Wellein）は、いま実際に制約している単位で投機的デコードを計上する。「大規模言語モデルの配信は施設の電力で制限される。トークンあたりのエネルギーがデータセンターで配信できるトークン数を決め、レイテンシ目標が各ユーザーがどれだけ早く受け取るかを縛る。」測定は本番条件——**SGLangでCUDA graphsを有効、H100とH200、バッチサイズ最大64、5つのコーパス**——で行われ、結論は加速比ではなく条件の集合だ。

4つの知見はいずれも通説と逆向きだ。第一に、「密なモデルでは、**起草ではなく検証がエネルギーコストを支配する**」。第二に、「節約はバッチが大きくなるほど縮む。バッチ処理がすでに、投機が受理トークン間で分割しようとしていた重み読み出しを共有してしまっているからだ」。第三に、「大きなバッチではブロックドラフタが検証を算術とメモリトラフィックの平衡点より押し出し、計算律速領域に入る。**そこでは節約が損失になる**。受理率の低いドラフタはトークンあたりのエネルギーを上げる」。第四に、「より厳しいレイテンシ目標を投機で満たすと、追加のエネルギーがかかる」——レイテンシの勝ちとエネルギーの勝ちが同じ動作点で逆向きを指す。

受理率はドラフタ単独の性質でもなく、これが最も移植しやすい点だ。「我々が評価したすべてのドラフタは会話でコードより多くを受理し、すべての学習済みドラフタは英語より低資源言語のロマンシュ語で少なく受理する。」

**Why it matters:** 要旨は比率を一つも出していない——受理トークンあたりのジュールも、交叉するバッチサイズもない。だからこれは公表前に読む論文であり、要旨から引用する論文ではない。確立しているのは、投機の主張の正しい単位は**所与のバッチサイズとレイテンシ目標における、受理されたトークンあたりのエネルギー**であり、同じ構成が省にも損にもなり得るのは、どのコーパスを配信しているか次第だということだ。チューニングする人にとって有用なのは最後の観察だ。「大きなバッチは投機なしでもトークンあたりのエネルギーを下げる。投機は受理率が高いときにだけその節約に上乗せし、我々が試したモデルではレイテンシを保つDVFSの余地をほとんど残さなかった。」

[`🔗 arXiv 2610.40287`](https://arxiv.org/abs/2610.40287) · [`🔗 全文（HTML）`](https://arxiv.org/html/2610.40287v1)

---

## 39. プローブは漏洩するエージェント呼び出しの82%を書き出し前に捕まえる——bag-of-words分類器がほぼ並ぶ

- **Velocity:** ▮▮ rising
- **Source:** arXiv 2610.40588 · 2026-10-29
- **Tags:** `agent-safety` `interpretability` `monitoring` `multi-agent`

単著論文（Leonidas Raghav）は、エージェントの共謀について狭く検証可能な問いを立てる。「出力フィルタはエージェントがすでに書いたものしか検査しない。監督者は、エージェントがまさに屈しようとしていることを事前に知れるのか。」設定は6つのシナリオで、同侪が最大20ラウンドにわたって目標を圧迫し、秘密——たとえばデプロイトークン——を明かさせようとする。「目標はしばしば拒否し、それから屈する。」プローブは各モデル呼び出しで、出力が書かれる前に活性化を読む。

数字は強い。ホールドアウトの**Qwen3-32B**エピソードで、良性呼び出しの**5%**をflaggedにする閾値において、プローブは「漏洩呼び出しの**82%**を捕まえる」。同程度のflag率で「ゼロショットの決定モデル監視は**26%**」だった。**gpt-oss-20b**では、その推論に対するプローブが**AUROC 0.91**に達する。

そして論文は自分の見出しを分解する。ここに載せている理由がそれだ。「同じ呼び出しで学習したbag-of-words分類器が近い性能を出す。つまり**利得の大半は活性化ではなくラベルによる学習から来ている**。」「プローブは許可された開示もflagする。読んでいるのは違反そのものより、これから来る開示だ。」そして「警告は短距離で、あらゆる警報で停止すると良性エピソードの大半が止まる。二度目のテキスト検査ではそれを直せない。」

**Why it matters:** 82対26は**監督の方式**についての主張——学習済みプローブ対ゼロショット監視——であり、bag-of-wordsの結果は持ち上げの大半がラベル由来だと示す。これは貢献を「機械的解釈性が効く」から「安価な教師あり監視が効き、活性化は便利な特徴量にすぎない」へと読み替える。それでも有用だ。生成前の警告は出力フィルタとは別の制御点であり、「生成前に発せられた警告は、他のエージェントがそのメッセージに基づいて動いたり、勧誘が群れに広がったりする前に、屈しようとするエージェントを監督者が止めることを可能にする」というのが、検出器をそこに置く論拠そのものだ。ただし82%を「モデルの内部表現が必要だ」と読まないこと。

[`🔗 arXiv 2610.40588`](https://arxiv.org/abs/2610.40588) · [`🔗 全文（HTML）`](https://arxiv.org/html/2610.40588v1)

---

## 40. 325Mモデルを推論専用NPUでゼロから事前学習、B200の双子とloss差0.0001——そして手法は特許出願中

- **Velocity:** ▮▮ rising
- **Source:** Hugging Face Blog · published 2026-10-26
- **Tags:** `pretraining` `npu` `hardware` `reproducibility`

VIDRAFTのFINAL-Benchは、325.6Mパラメータのdecoder-onlyモデル**VKORE-325M-NPU-Base**を、**商用の推論専用NPU上でランダム初期化から**事前学習した。「逆伝播はチップ上で実行」され、「事前学習済みの重みは一切使っていない」。実行はFineWeb-Eduの**50億byteトークン**、**76,292ステップ、約4日間**。並行してB200 GPU上で「同じ初期化、データ、バッチ、学習率スケジュール」の対照を訓練した。

**どちらのモデルも見たことのないFineWeb-Eduの1,024ウィンドウ**において、NPUのlossは**0.7993**、GPUは**0.7994**、対応のある差は**−0.0001、標準誤差0.0007**、「NPUモデルは**50.1%**のウィンドウでより低い」。両方の重みと評価スクリプトが公開されており、この主張は数分で検証できる。

**Why it matters:** 記事が自分に課した枠組みの問いこそ本題だ——「受け入れられている見解は、そうしたチップは訓練できないというものだ……訓練には逆伝播、オプティマイザ状態、そして数万ステップにわたる数値的に安定した更新が必要で、推論スタックはそのいずれも提供するようには作られていない」——そして結果は対照比較であり、ハードウェア発表では稀だ。しかしこれを引用可能にしているのは、記事自身の「我々が主張しないこと」の節である。「**有能なアシスタントではない。**これは5Bトークンで訓練した325Mのベースモデルで、訓練ハードウェアの結果として公開している。**速度記録ではない。**……**手法そのものではない。**訓練ループと安定化技法は社内にあり、**特許出願中**だ。重み、データレシピ、ハイパーパラメータ、評価は完全に公開している。」つまり結果は再現可能で手法は再現不可能——誰でもlossは検証できるが、伏せられた部分なしにこの実行を再現できる者はいない。0.0001は「この規模なら推論専用NPUが事前学習をGPU同等まで運べる」と読むべきで、「これがやり方だ」と読むべきではない。

[`🔗 Hugging Face — 推論専用NPUで325Mモデルをゼロから事前学習`](https://huggingface.co/blog/FINAL-Bench/pretraining-a-325m-language-model-from-zero-on-an) · [`🔗 FINAL-Bench/VKORE-325M-NPU-Base`](https://huggingface.co/FINAL-Bench/VKORE-325M-NPU-Base)

---

## 41. Ai2：新規性ジャッジのプロンプトを数語変えると、GPT-5.4は93.5%から40.9%へ——偶然以下に

- **Velocity:** ▮▮ rising
- **Source:** Hugging Face Blog / arXiv 2610.02022 · published 2026-10-27
- **Tags:** `evaluation` `research` `benchmarks` `llm-judges`

Ai2の**「Old Ideas, Novel Problems」**（Kyle WiggersとAi2Comms、論文・データ・コードを公開）は、AI-for-scienceシステムが依存しながらほとんど検証してこなかった部品を試す。**新規性ジャッジ**、つまり「この研究アイデアは新しいか」とLLMに問う部品だ。ラベルは採択ではなく**ICLR 2026の査読**から作る。**高新規性プール**は**154**の人間のアイデアで、所属領域の評価上位10%の採択論文から、査読者が新規性を明示的に肯定し誰も異議を唱えなかったもの。**低新規性プール**は**145**で、下位10%の不採択論文から、査読者が独自性への懸念を示し誰も肯定しなかったもの。査読マイニングの確認では、アノテータが抽出した極性と**50例中47例**で一致した。

6つのジャッジを比較した——GPT-5.1、GPT-5.2、GPT-5.4、Claude Sonnet 4.5、Claude Opus 4.5、Claude Opus 4.6——プロンプト、推論予算、検索、整形、集約を1要素ずつ変えながら。見出し級の不安定さはこうだ。Human+Generatedのペアで、「各ペアでちょうど1つが新しいと査読者が判断した」と告げられたGPT-5.4は**93.5%**。より単純な「どちらが新しいか」に変えると**40.9%**、偶然を下回り、「同じペアの半数以上で判断を変えた」。人間が書いたペアも無傷ではない——同じ変更でClaude Opus 4.6はHuman-Onlyで**21ポイント**動いた——そして「普遍的に優れたプロンプトも存在しない」。

**Why it matters:** 持ち帰るべき一文は、すでに動いているシステムについてのものだ。「**検索と追加の推論は判断を一貫して改善せず、専用に作られた2つの新規性評価システムは、単純なプロンプトのClaude Opus 4.6ベースラインより性能が低い。**」ただしその割合を引用する前にラベルの質を読む。Human+Generatedでは「生成アイデアは人間のものより新規性が低いと仮定した。これは**弱いラベル**であり、すべてのアイデアについて検証された判断ではない」。論文はこの反論を先回りする——専門家が30ペアを、最強ジャッジが誤った事例に重みを置いてレビューし、30ペアすべてで人間のアイデアを選び、生成アイデアのどれも新規とは判定しなかった——そして「我々の中核的知見の多くはラベルに依存しない」とも述べる。なぜなら「2つの合理的な評価設定が同じペアに対して相反する答えを出すなら、その不一致自体が不安定さを明らかにする」からだ。文言一つで50ポイント動くジャッジは、新規性を測っていない。

[`🔗 Hugging Face — LLMに研究アイデアの新規性判断を任せられるか`](https://huggingface.co/blog/allenai/novelty-bench) · [`🔗 arXiv 2610.02022`](https://arxiv.org/abs/2610.02022) · [`🔗 allenai/novelty-eval`](https://github.com/allenai/novelty-eval)

---

## 42. DOOMFORMERはDOOMマップの中でニューラルネットを動かす——MNISTテスト10,000枚すべて一致、許容誤差0

- **Velocity:** ▮▮ rising
- **Source:** Hacker News · 99+ pts · ~13h ago (~07:25 UTC+8)
- **Tags:** `doom` `verification` `neural-networks` `demoscene`

`mottopanikeiku/doomformer`（MIT、Python 3.11+、**36 stars**、2026-10-20作成、v0.4.0）は整数ニューラルネットをDOOMマップへコンパイルし、ゲームエンジンに実行させる。「ブードゥー人形が算術を担い、明るさレベルと床の高さが値を保持する。」数は人形の群れ、重みは床の線、和は明るさレベルか高さ、活性化は階段、アテンションは天井だ。MNISTマップは**1,355体のブードゥー人形**を使う。マップはZDoom（UDMFとACS）を必要とし、リポジトリはViZDoom 1.3.2とFreedoomアセットで動かす。

公表された成績は、MNISTテスト画像**10,000 / 10,000**が完全一致、20,000のランダムネットで不一致**0**、「博物館」マップは**他4つの**DOOMエンジンでも完全に一致する。`doomformer mnist`はテスト画像4枚か自分の画像を1.5〜3分で読み、`doomformer ask "what does iddqd do"`は189のDOOM事実から答え、`doomformer machine subleq all`はマップ上で小さな計算機を走らせる。

**Why it matters:** このプロジェクトは自分の検査を攻撃し、それを表にしている。見出しの数字を信じられる理由がそれだ。重みの線を1本改ざんする → 「検査はちょうどその線を越える入力で失敗する」。範囲限界で20,000のランダムネットをファズする → 不一致0、しかもCIは毎プッシュで新しいシードをファズする。マップの1行を**1,004回**変異させる → **297件を捕捉**し、「生存したものが無害だと証明された例はない」。DOOMなしでマップから重みを抽出する → 元のネットと等しい。各読み出しページを毒値で守る → 「一度も実行されていないページは古い値を通過できない」。そして限界が明示される。「各実行は、マップが露出するすべての値をNumPyと比較する。**それは走った入力について証明するだけで、それ以上のことは何も証明しない。**」MNISTマップが露出するのは248の値で、903の階段カウントと1,351のゲート比較は露出しない。それらは供給先の和を通じてのみ検査される。そして「ファジングとテストはコンパイラ内に4つのバグを見つけた。すべて修正済みだ」。デモシーンの作品でありながら、検証の節が多くの本番テストスイートより優れている。

[`🔗 mottopanikeiku/doomformer`](https://github.com/mottopanikeiku/doomformer) · [`🔗 プロジェクトサイト`](https://mottopanikeiku.github.io/doomformer/) · [`🔗 HNディスカッション`](https://news.ycombinator.com/item?id=50297697)

---

## 43. LasmはLean 4をWebAssemblyへコンパイルする——RealWorldアプリに117の証明済み定理、実行時にはカーネルなし

- **Velocity:** ▮ steady
- **Source:** Hacker News · 31+ pts · ~10h ago (~10:05 UTC+8)
- **Tags:** `lean4` `webassembly` `formal-verification` `dev-tools`

`Millillion/lasm`（MIT、**66 stars**、2026-09-23作成）は通常のLean 4をAOTでWebAssemblyへコンパイルする。「1つのLeanコードベースが、Nodeサーバにも、サーバーレスやエッジ関数にも、WASI/Fastlyモジュールにも、ブラウザアプリにもなる。Leanだから、配備するコードの性質を証明できる。」`@lasm/cli`は**0.3.5**、npmに**2026-10-28T19:07:10Z**公開、Leanを厳密に**4.35.0**（`leanprover/lean4:v4.35.0`）へ固定し、ツールチェーン自体を導入するのでelanは不要だ。0.xのプロジェクトとしては異例に広いターゲット表を持ち、各行はそのプラットフォーム自身のローカルランタイム・イメージ・エミュレータでCI検証済みとされる。Node、AWS Lambda（zipとコンテナ）、Lambda@Edge、Vercel、Netlify、Azure Functions、Google Cloud Functions gen2、Cloudflare Workers、Vercel Edge、Netlify Edge、Deno Deploy、Supabase Edge、Bun、Deno、Fastly Compute、WASI、wasi-http、そしてブラウザ。

**Why it matters:** 興味深いのは制限の列で、READMEはそれを脚注ではなく速見表に置いている。「**実行時には利用不可：**elaboration、`#eval`的評価、`.olean`の読み込み、Leanカーネル——これらはすべてビルド時に動作する。」つまり配備される成果物は証明チェッカを積んでいない。定理はあなたが出荷したビルドの性質であり、動いているプロセスの性質ではない。さらにエッジ／Bun/Deno/WASI/ブラウザのターゲットは「Leanをシングルスレッドで、ソケットもプロセスもなしに実行する（WASI以外はファイルもなし）」——Node行の「完全なランタイム（スレッド、ファイル、プロセス、ソケット）」よりずっと小さい。旗艦の主張——「**117の証明済み定理**」を持つConduit RealWorldアプリ——はプロジェクト自身のREADME内のカウントで、独立に再現されたものではない。誠実な読み方は、フルスタックアプリをこの方法で書けるということの証拠として読むことだ。真似る価値のある細部が1つある。「プロジェクト方針により、CIは実際のクラウドアカウントへ決してデプロイしない。」

[`🔗 Millillion/lasm`](https://github.com/Millillion/lasm) · [`🔗 npmの@lasm/cli`](https://www.npmjs.com/package/@lasm/cli) · [`🔗 HNディスカッション`](https://news.ycombinator.com/item?id=50299004)

---

## 44. Transformerをループさせるのは一様に良いわけではない——利得はやがて飽和し、反転し、不安定になる

- **Velocity:** ▮ steady
- **Source:** arXiv 2610.40325 · 2026-10-29
- **Tags:** `transformers` `looped-models` `training` `inference`

著者8名（Chanakya Ekbote、Artidoro Pagnoni、Devendra Singh Sachan、Shruti Bhosale、Mike Lewis、Maryam Fazel-Zarandi、Shashank Rajput、Sujan Kumar Gonugondla）は、互いにトレードオフする3つの制約の下でループを統合的に研究する。ゼロから訓練した密なdecoder-only transformerで、最大**1Bパラメータ**、最大**155Bトークン**、最大**1.07×10²¹ FLOPs**、最大**32ループ**。枠組みは正しい。「ループが有用かどうかは、どの制約が支配しているかで決まる。モデルサイズ、訓練計算量、それとも自己回帰推論の効率か。」

知見はレシピではなく条件だ。「固定のパラメータ予算では、transformer全体をループさせるのが一般に最良の品質を与えるが、訓練FLOPsが制約される場合は中間の層ブロックをループさせるほうが良い見返りを生む。」「ループを増やすことは一様に有益ではない。利得はやがて**飽和し、反転し、あるいは不安定になる**。」ループ固有の小さな低ランクアダプタは助けになり、「ループが増えるほど利得が大きい」。ループモデルはループ数に比例してデコードが遅くなり、自明な修正はきれいに効かない。Parallel Loop Transformerは隣接トークン位置をまたいで隠れ状態を渡して各段を並行実行するが、「元の定式化は通常のループの品質利得を一貫して保持しない」。取り戻すには、現在トークンの埋め込みを保ち、それと前トークンの隠れ状態を結合前に別々に正規化する必要があった。

**Why it matters:** 要旨はベンチマークスコアも差分も一切出していない。だから誠実な読み方は、これは設計空間の論文であって引用すべき結果ではない、ということになる。価値は負の結果にある。「ループを増やす」は資源制約下の工学判断であり、両側に故障モードがある。そして並行変体への論文自身の修正は、2つの隠れ状態を単に同時に走らせるのではなく、正規化の仕方を変えることだった。ループ重みに手を伸ばす誰もが——今週本誌の別の2本が、より多くのテスト時計算で小さなモデルが何をできるかを測っている——「利得はやがて飽和し、反転し、あるいは不安定になる」を、この1つのアブレーションの要約ではなく、ジャンル全体の要約として読むべきだ。

[`🔗 arXiv 2610.40325`](https://arxiv.org/abs/2610.40325) · [`🔗 全文（HTML）`](https://arxiv.org/html/2610.40325v1)

---

## Metadata

| Field | Value |
|-------|-------|
| Generated | 2026-10-30T12:16:26Z |
| Items | 44 |
| Sources tracked | 32（Hacker News、GitHub、NVD、CISA KEV、cveawg、PyPI、npm、ベンダーアドバイザリ、CNAアドバイザリ、arXiv、Hugging Face、セキュリティ研究ブログ、セキュリティ報道、ベンダーブログ） |
| Update schedule | 04:03, 12:03, 20:03 UTC+8（1日3回） |
| Ranking | Velocity-weighted（新しさ × エンゲージメントの加速度 × 情報源の権威） |
| License | [CC-BY 4.0](https://creativecommons.org/licenses/by/4.0/) |

---

[前日](2026-10-29.md) · [生の .md](2026-10-30.md) · [アーカイブ](../archive/)
