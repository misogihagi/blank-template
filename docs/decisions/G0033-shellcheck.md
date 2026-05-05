# ShellCheckの導入

## はじめに

* [決定](#決定)
* [ステータス](#ステータス)
* [背景](#背景)
* [想定される影響](#想定される影響)
* [検討した他の選択肢](#検討した他の選択肢)
* [参考文献](#参考文献)
* [結果](#結果)

## 決定

シェルスクリプトの品質向上とバグの早期発見を目的として、ShellCheckを導入する。

1. ローカル開発環境でのチェック（VS Code拡張機能やCLIの活用）
2. CI（GitHub Actions等）での自動実行によるマージブロック

## ステータス

<!-- to render SVG file trick -->
<!-- markdownlint-disable MD013 MD033 MD013 -->
### <img src="https://raw.githubusercontent.com/FortAwesome/Font-Awesome/refs/heads/6.x/svgs/regular/circle-check.svg" width="10" alt="承認済み" /> 承認済み

## 背景

* **ユースケース：** Dockerfile等、シェルを扱う状況において、
* **懸念事項：** 実行するまで気づかない構文ミス、クォートの欠如による変数展開の不備、移植性の低い記述といった潜在的なバグに直面し、
* **品質：** 信頼性の高いスクリプト運用とメンテナンス性の向上を達成するために、
* **欠点：** 既存の動くスクリプトに対しても修正コストが発生することを受け入れ、
* **オプション：** 業界標準であるShellCheckの導入を決定した。

## 想定される影響

* **簡単になること：**
  * 構文エラーや推奨されない書き方をコードレビュー前に自動で検知できる。
  * シェルスクリプト特有の落とし穴（`set -e` の不備など）を学習コストをかけずに回避できる。
* **難しくなること：**
  * 古い慣習で書かれたスクリプトを修正、またはインラインコメント（`# shellcheck disable=...`）で意図的に無視する手間が発生する。

## 検討した他の選択肢

* **手動レビューのみ：** シェルスクリプト特有の難解な挙動（スペースの有無による挙動変化など）を人間が完璧に検知するのは効率が悪いため却下。
* **shfmt（フォーマッタ）のみ：** コードの見た目は整うが、論理的な誤りやバグの検知はできないため、ShellCheckを優先すべきと判断。

## 参考文献

* [koalaman/shellcheck: ShellCheck, a static analysis tool for shell scripts](https://github.com/koalaman/shellcheck)
* [Google Shell Style Guide](https://google.github.io/styleguide/shellguide.html)

## 結果

<!-- この変更によって、もたらされた結果を後で書き込む -->
