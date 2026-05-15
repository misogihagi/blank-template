# OpenTofuの導入

## はじめに

* [決定](#決定)
* [ステータス](#ステータス)
* [背景](#背景)
* [想定される影響](#想定される影響)
* [検討した他の選択肢](#検討した他の選択肢)
* [参考文献](#参考文献)
* [結果](#結果)

## 決定

インフラストラクチャの管理を自動化し、構成の再現性と透明性を確保するため、**IaCツールとして「OpenTofu」を採用し、新規導入する。**

## ステータス

<!-- to render SVG file trick -->
<!-- markdownlint-disable MD013 MD033 MD013 -->
### <img src="https://raw.githubusercontent.com/FortAwesome/Font-Awesome/refs/heads/6.x/svgs/regular/circle-check.svg" width="10" alt="承認済み" /> 承認済み

## 背景

* **インフラの手動管理の限界**：GitHubの設定を共有するにあたり、変更履歴の追跡が困難であるという**状況において**、
* **ライセンス継続性への懸念**：Terraformに比べ、ライセンス変更（BSLへの移行）に伴う将来的な利用制限やコスト増の**懸念事項に直面し**、
* **オープンソースによる柔軟性と中立性**：Linux Foundationの下で管理される完全なオープンソースプロジェクトとして、長期的なベンダーロックインの回避と**品質を達成するために**、
* **初期のコミュニティ成熟度**：Terraform本家と比較した際のドキュメント量や周辺ツールの対応速度にわずかな**欠点を受け入れ**、
* **OpenTofuの導入を決定した。**

## 想定される影響

### 何が簡単になるか

* **インフラのコード化**: Gitによるバージョン管理が可能になり、レビュープロセスを導入できる。
* **ライセンスの透明性**: MPLv2（Mozilla Public License）であるため、商用利用や将来の拡張において法的・コスト的なリスクを最小限に抑えられる。
* **Terraformとの互換性**: Terraform（v1.5.x以前）と高い互換性があるため、既存のモジュールや知見の多くをそのまま活用できる。

### 何が難しくなるか

* **学習コスト**: IaC未導入の状態からスタートするため、チーム全体のスキルアップが必要。
* **エコシステムの追随**: 一部のサードパーティ製ツールやSaaS（例：Terraform Cloud専用機能など）がOpenTofuを即座にサポートしない場合がある。

## 検討した他の選択肢

* **CLIによる管理**:
* 手順をわざわざ書き出すのが手間なのと、状態を管理できない。

* **HashiCorp Terraform (v1.6以降)**:
* 業界標準ではあるが、BSLライセンスへの変更により、将来的な利用形態（特にマネージドサービスの提供など）に制約が出ないよう、見送り。

* **Pulumi**:
* 汎用プログラミング言語（TypeScript, Python等）で記述できる魅力はあるが、既存の「HCL（HashiCorp Configuration Language）」というデファクトスタンダードな学習リソースの多さを重視し、今回は見送り。

* **CloudNativeなツール (AWS CloudFormation / CDK等)**:
* 特定のクラウドプロバイダーに強く依存するため、マルチクラウドやサードパーティSaaS管理への拡張性を考慮し、非採用。

## 参考文献

* [OpenTofu 公式ドキュメント](https://opentofu.org/docs/)
* [The OpenTofu Manifesto](https://opentofu.org/manifesto/)
* [Linux Foundation - OpenTofu Project](https://www.linuxfoundation.org/press/announcing-opentofu)

## 結果

<!-- この変更によって、もたらされた結果を後で書き込む -->
