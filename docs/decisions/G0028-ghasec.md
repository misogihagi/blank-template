# GitHub Actions のセキュリティスキャナ (ghasec) の導入

## はじめに

* [決定](#決定)
* [ステータス](#ステータス)
* [背景](#背景)
* [想定される影響](#想定される影響)
* [検討した他の選択肢](#検討した他の選択肢)
* [参考文献](#参考文献)
* [結果](#結果)

## 決定

GitHub Actions のワークフロー定義におけるセキュリティリスク（Action の未固定バージョン、機密情報の取り扱い不備など）を自動検知するため、ghasecを導入する。

具体的には以下の運用を実施：

1. **CI での自動チェック**: `ghasec-action` を利用し、プルリクエスト時にワークフローファイルの静的解析する。
2. **SARIF 連携**: 解析結果を GitHub Code Scanning に統合し、セキュリティタブで一元管理する。

## ステータス

<!-- to render SVG file trick -->
<!-- markdownlint-disable MD013 MD033 MD013 -->
### <img src="https://raw.githubusercontent.com/FortAwesome/Font-Awesome/refs/heads/6.x/svgs/regular/circle-check.svg" width="10" alt="承認済み" /> 承認済み

## 背景

* **GitHub Actions を使用する開発環境**において、
* **「Action のバージョンが SHA で固定されていない」「意図しない ID トークンの許可」といったセキュリティ設定の不備が混入するリスク**に直面し、
* **サプライチェーン攻撃の防止および安全な自動化パイプラインの品質**を達成するために、
* **スキャン実行時間のわずかな増加や、誤検知に対する無視（Ignore）コメントの管理コスト**を受け入れ、
* **GitHub Actions 専用の軽量セキュリティスキャナである ghasec の導入**を決定した。

## 想定される影響

### 改善される点

* **セキュリティの可視化**: ワークフローの脆弱性がコードレビュー前に自動で指摘されるようになる。
* **修正コストの低下**: Markdown 出力機能により、AI エージェント（Claude Code 等）を用いた自動修正との親和性が高まる。
* **一貫したルール適用**: 開発者個人の知識に依存せず、プロジェクト全体で一定のセキュリティ基準を維持できる。

### 懸念される点

* **CI 実行時間の増加**: わずかではあるが、CI のステップが増える（通常数秒程度）。
* **メンテナンス**: `ghasec-ignore` コメントが過剰に増えないよう、運用ルールを定める必要がある。

## 検討した他の選択肢

* **手動レビューのみ**: ヒューマンエラーを防ぎきれず、スケーラビリティに欠けるため却下。

## 参考文献

* [koki-develop/ghasec - GitHub Repository](https://github.com/koki-develop/ghasec)
* [GitHub - Security hardening for GitHub Actions](https://docs.github.com/ja/actions/security-guides/security-hardening-for-github-actions)
* [GitHub Actions 向け静的解析ツールの紹介 (actionlint/ghalint/zizmor)](https://zenn.dev/kou_pg_0131/articles/gha-static-checker)
* [セキュリティ重視の GitHub Actions 静的解析ツール「ghasec」の紹介](https://zenn.dev/kou_pg_0131/articles/ghasec-introduction)

## 結果

<!-- この変更によって、もたらされた結果を後で書き込む -->
