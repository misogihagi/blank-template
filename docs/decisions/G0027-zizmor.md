# zizmorの導入によるGitHub Actionsのセキュリティ向上

## はじめに

* [決定](#決定)
* [ステータス](#ステータス)
* [背景](#背景)
* [想定される影響](#想定される影響)
* [検討した他の選択肢](#検討した他の選択肢)
* [参考文献](#参考文献)
* [結果](#結果)

## 決定

GitHub Actionsのワークフローにおけるセキュリティ脆弱性（インジェクション攻撃、過剰な権限、安全でないパターンの利用など）を自動検出するため、zizmorをCIパイプラインに導入する。

具体的には、以下の運用を実施する：

* PR作成時にGitHub Actions上でzizmorを実行し、静的解析をする。
* SARIF形式で結果を出力し、GitHubのCode Scanning（Securityタブ）と連携させる。

## ステータス

<!-- to render SVG file trick -->
<!-- markdownlint-disable MD013 MD033 MD013 -->
### <img src="https://raw.githubusercontent.com/FortAwesome/Font-Awesome/refs/heads/6.x/svgs/regular/circle-check.svg" width="10" alt="承認済み" /> 承認済み

## 背景

* **GitHub Actionsを利用したCI/CD**の状況において、
* **ワークフロー定義の不備に起因するシークレットの流出や、悪意のあるプルリクエストによる実行権限の乗っ取り（Pwn Request）などのリスク**に直面し、
* **「Security by Design」に基づいたセキュアなパイプライン運用**を達成するために、
* **誤検知の対応や修正コストという運用負荷**を受け入れ、
* **高速かつ高機能なRust製解析ツールであるzizmorの導入**を決定した。

## 想定される影響

* **簡単になること**:
  * `pull_request_target` の危険な利用や、シェルスクリプトへのコンテキスト注入などの脆弱性をレビュー前に自動で発見できる。
  * GitHubの「Code Scanning」画面で脆弱性の詳細と修正案を視覚的に確認できる。
* **難しくなること**:
  * 既存の脆弱なワークフローが多い場合、導入初期に大量の警告に対処する必要がある。
  * 意図的な実装（特定の条件下での柔軟な設定など）が脆弱性と判定された場合、無視設定（`zizmor:ignore`）の管理が必要になる。

## 検討した他の選択肢

* **Actionlint**: 構文チェックや型チェックには優れているが、複雑なセキュリティロジック（データの流れに起因する脆弱性）の検出能力はzizmorの方が、専門性が高い。
  * 結論：併用が望ましいが、セキュリティ特化としてはzizmorを優先。
* **Checkov**: 多機能なIaCスキャンツールだが、GitHub Actionsに特化したきめ細やかなルール（特定のコンテキストの評価など）では、専用ツールであるzizmorの勝るケースが多い。

## 参考文献

* [zizmor GitHub Repository](https://github.com/woodruffw/zizmor)
* [GitHub Actions Security Best Practices](https://docs.github.com/en/actions/security-guides/security-hardening-for-github-actions)
* [GitHub Actions 向け静的解析ツールの紹介 (actionlint/ghalint/zizmor)](https://zenn.dev/kou_pg_0131/articles/gha-static-checker)

## 結果

<!-- この変更によって、もたらされた結果を後で書き込む -->
