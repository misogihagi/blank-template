# ghalintの導入によるGitHub Actionsのセキュリティ向上

## はじめに

* [決定](#決定)
* [ステータス](#ステータス)
* [背景](#背景)
* [想定される影響](#想定される影響)
* [検討した他の選択肢](#検討した他の選択肢)
* [参考文献](#参考文献)
* [結果](#結果)

## 決定

GitHub Actionsのワークフローにおけるセキュリティ上のベストプラクティスを強制し、設定ミス（特に脆弱な権限設定や、サードパーティ製Actionのハッシュ固定の欠如）を未然に防ぐため、ghalintを導入する。

## ステータス

<!-- to render SVG file trick -->
<!-- markdownlint-disable MD013 MD033 MD013 -->
### <img src="https://raw.githubusercontent.com/FortAwesome/Font-Awesome/refs/heads/6.x/svgs/regular/circle-check.svg" width="10" alt="承認済み" /> 承認済み

## 背景

この決定の動機となっている問題は以下の通り。

* **GitHub Actionsを利用する状況において、**
* **意図しない特権（`permissions`）の付与や、Actionのタグ書き換えによるサプライチェーン攻撃のリスクに直面し、**
* **「最小権限の原則」の適用と、パイプラインの不変性（品質）を達成するために、**
* **CI実行時間のわずかな増加と、既存のワークフロー修正という一時的な工数（欠点）を受け入れ、**
* **ghalintによる自動チェックを導入することを決定した。**

## 想定される影響

### 何が簡単になるか

* **レビューの自動化:** `permissions` の記述漏れや `pull-request: write` などの強い権限の不用意な付与を、人間がレビューする前に機械的に検知できる。
* **セキュリティレベルの平準化:** チームメンバー全員がGitHub Actionsの最新のセキュリティベストプラクティスに詳しくなくても、ツールが修正箇所を提示する。

### 何が難しくなるか

* **初期導入時の修正:** 既存のワークフローがベストプラクティスに準拠していない場合、大量の警告が発生し、それらを修正する工数が発生する。
* **柔軟性の制限:** 特定のケースで意図的にベストプラクティスを外れる場合、無視設定（ignore）の記述が必要になる。

## 検討した他の選択肢

* **actionlint:**
  * 非常に優れたツールであり、構文チェックや型チェックには最適。しかし、ghalintはより「セキュリティポリシー（権限設定やハッシュ固定）」に特化した厳格なルールセットを持っているため、セキュリティ強化の観点からghalintとactionlintを併用することとした。
* **手動コードレビュー:**
  * 人的ミスを完全に防ぐことは難しく、特にGitHub Actionsの権限周りは複雑であるため、自動化が不可欠だと判断した。

## 参考文献

* [ghalint GitHub Repository](https://github.com/suzuki-shunsuke/ghalint)
* [GitHub公式: GitHub Actions のセキュリティ強化](https://docs.github.com/ja/actions/security-guides/security-hardening-for-github-actions)

## 結果

<!-- この変更によって、もたらされた結果を後で書き込む -->
