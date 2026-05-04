# Dev Containersの導入

## はじめに

* [決定](#決定)
* [ステータス](#ステータス)
* [背景](#背景)
* [想定される影響](#想定される影響)
* [検討した他の選択肢](#検討した他の選択肢)
* [参考文献](#参考文献)
* [結果](#結果)

## 決定

リポジトリ内に `.devcontainer/` 設定ファイルを同梱する。
プロジェクトの開発環境としてはほぼDevboxで事足りるものの、VS Codeへの対応や、PaaSの対応状況を見るに、Dev Containersはあったほうがいい。
これにより、VS CodeやGitHub Codespacesを利用して、OSに依存しない再現可能な開発環境をワンクリックで構築可能になる。

## ステータス

<!-- to render SVG file trick -->
<!-- markdownlint-disable MD013 MD033 MD013 -->
### <img src="https://raw.githubusercontent.com/FortAwesome/Font-Awesome/refs/heads/6.x/svgs/regular/circle-check.svg" width="10" alt="承認済み" /> 承認済み

## 背景

* **状況**: 複数の開発者が異なるOS（macOS, Windows, Linux）を使用しており、言語のランタイムバージョンやツール、ミドルウェアの差異が原因で「自分のマシンでは動く」問題がある。
* **懸念事項**: 新規メンバーのオンボーディング時、環境構築の手順書が古くなっていたり、複雑な依存関係のインストールに数日を要したりすることで、生産性が低下しうる。
* **品質**: すべての開発者が同一の環境（コンテナ）で開発・テストを行うことで、環境差異に起因するバグを排除し、環境構築の自動化を達成したい。
* **欠点**: Docker DesktopやRancher Desktopなどのコンテナ実行環境が必要になり、ローカルリソース（メモリ・CPU）の消費が増えることを受け入れる。
* **オプション**: 設定のポータビリティとVS Codeとの親和性が高いDev Containersを選択した。

## 想定される影響

### よくなること

* **オンボーディングの迅速化**: リポジトリをクローンして「Reopen in Container」を押すだけで、必要な拡張機能、リンター、ツールがすべて揃った状態で開発を開始できる。
* **環境の一貫性**: CI環境や本番環境に近いLinuxベースの環境で開発できるため、デプロイ後の不具合リスクが低減する。
* **設定の共有**: 推奨されるVS Code拡張機能やエディタ設定（`.vscode/settings.json`相当）をチームで強制・共有できる。

### 課題・難しくなること

* **リソース消費**: コンテナを実行するため、物理マシンのリソースを消費する。
* **学習コスト**: Dockerの基礎知識が必要となり、問題発生時にコンテナ内と外のどちらに原因があるか切り分ける知識が求められる。
* **ファイルシステムのパフォーマンス**: 特にWindows (WSL2) や古いmacOSにおいて、バインドマウントのパフォーマンスが低下しやすい。

## 検討した他の選択肢

* **Vagrant (VirtualBox)**:
  * メリット：完全な仮想化。
  * デメリット：コンテナに比べて非常に重く、セットアップに時間がかかる。現代の開発エコシステムでは主流ではない。

## 参考文献

* [Development Containers 公式サイト](https://containers.dev/)
* [Visual Studio Code - Developing inside a Container](https://code.visualstudio.com/docs/devcontainers/containers)
* [Spec: Development Containers Specification](https://containers.dev/implementors/spec/)

## 結果

<!-- この変更によって、もたらされた結果を後で書き込む -->
