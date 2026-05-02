# Markdownリンクチェックツールとしてlycheeを導入する

## はじめに

* [決定](#決定)
* [ステータス](#ステータス)
* [背景](#背景)
* [想定される影響](#想定される影響)
* [検討した他の選択肢](#検討した他の選択肢)
* [参考文献](#参考文献)
* [結果](#結果)

## 決定

ドキュメント内のリンク切れを自動検出し、メンテナンスコストを削減するためにlycheeを導入する。

## ステータス

<!-- to render SVG file trick -->
<!-- markdownlint-disable MD013 MD033 MD013 -->
### <img src="https://raw.githubusercontent.com/FortAwesome/Font-Awesome/refs/heads/6.x/svgs/regular/circle-check.svg" width="10" alt="承認済み" /> 承認済み

## 背景

* **ユースケース**: プロジェクトのドキュメント（Markdown）が増大する中で、
* **懸念事項**: 手動でのリンク確認が困難になり、デッドリンク（リンク切れ）が増加して情報の信頼性が損なわれるという課題に直面し、
* **品質**: 高い高速性と多機能性（柔軟な設定）を達成するために、
* **欠点**: Rust製のバイナリを管理する手間（CIでのセットアップ時間など）を許容し、
* **オプション**: 非常に高速で多機能なリンクチェッカーである **lychee** を導入することを決定した。

## 想定される影響

* **簡単になること**:
  * CI/CDパイプラインでの高速なリンクチェック。
  * ローカルファイル、ネットワークリンク、メールアドレス、リポジトリ内の相対パスなど、多様なリンク形式の一括検証。
  * 正規表現を用いた特定のドメインやパスの除外設定。
* **難しくなること**:
  * 外部サイトのレート制限（Rate Limit）に抵触する場合があり、適切なリトライ設定や除外設定のチューニングが必要になる。

## 検討した他の選択肢

* **[markdown-link-check](https://github.com/tcort/markdown-link-check)**:
  * Node.js製で広く使われているが、大規模なドキュメント群に対しては処理速度が `lychee` に劣る。
* **[mlc (markdown-link-check)](https://github.com/becheran/mlc)**:
  * 同じくRust製で高速だが、`lychee` の方がよりアクティブに開発されており、サポートするプロトコルや出力フォーマット（JSON, Markdown等）が豊富である。

## 参考文献

* [lychee 公式リポジトリ (GitHub)](https://github.com/lycheeverse/lychee)
* [markdown-link-check (GitHub)](https://github.com/tcort/markdown-link-check)
* [mlc (GitHub)](https://github.com/becheran/mlc)

## 結果

<!-- この変更によって、もたらされた結果を後で書き込む -->
