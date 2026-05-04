# hadolintの導入

## はじめに

* [決定](#決定)
* [ステータス](#ステータス)
* [背景](#背景)
* [想定される影響](#想定される影響)
* [検討した他の選択肢](#検討した他の選択肢)
* [参考文献](#参考文献)
* [結果](#結果)

## 決定

Dockerfileの静的解析ツールとしてhadolintを導入し、CI（GitHub Actions等）およびローカル開発環境でのチェックを自動化する。

## ステータス

<!-- to render SVG file trick -->
<!-- markdownlint-disable MD013 MD033 MD013 -->
### <img src="https://raw.githubusercontent.com/FortAwesome/Font-Awesome/refs/heads/6.x/svgs/regular/circle-check.svg" width="10" alt="承認済み" /> 承認済み

## 背景

* **状況**: Dev containersをDockerfileで管理している。
* **懸念事項**: Dockerfileの非推奨な書き方をする。
* **達成したい品質**: ベストプラクティス（Docker公式の推奨事項）に準拠した、安全で軽量なコンテナイメージの継続的な作成。
* **受け入れる欠点**: 既存のDockerfileで警告が出る場合、その修正コストが発生する。また、CIの実行時間がわずかに増加する。
* **決定事項**: 業界標準で知見も多く、Haskell製で高速に動作する **hadolint** を採用する。

## 想定される影響

* **簡単になること**:
  * Dockerのベストプラクティスに沿っているかの自動判定。
  * レビュー時に基本的な記述ミス（`apt-get install` のキャッシュ削除漏れ等）を指摘する手間の削減。
* **難しくなること**:
  * 特定のルールに意図的に違反する必要がある場合、インラインでの無視設定（`# hadolint ignore=...`）の記述が必要になる。
  * 既存の警告が多い場合、初期のクリーンアップ作業が必要。

## 検討した他の選択肢

* **dockerfile-utils (npm)**:
  * 検討理由: Node.js環境との親和性。
  * 却下理由: hadolintに比べ、ルールの網羅性やセキュリティに特化したチェックが限定的であったため。
* **Conftest (OPA/Rego)**:
  * 検討理由: 独自のポリシーを詳細に定義できる。
  * 却下理由: Dockerfile専用のルールを一から記述・維持するコストが高く、汎用的なベストプラクティスを適用する目的にはオーバースペックと判断。

## 参考文献

* [hadolint GitHub Repository](https://github.com/hadolint/hadolint)
* [Best practices for writing Dockerfiles (Docker Documentation)](https://docs.docker.com/develop/develop-images/dockerfile_best-practices/)

## 結果

<!-- この変更によって、もたらされた結果を後で書き込む -->
