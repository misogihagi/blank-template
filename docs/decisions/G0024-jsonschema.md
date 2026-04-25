# JSONスキーマ検証における check-jsonschema の採用

## はじめに

* [決定](#決定)
* [ステータス](#ステータス)
* [背景](#背景)
* [想定される影響](#想定される影響)
* [検討した他の選択肢](#検討した他の選択肢)
* [参考](#参考)
* [参考文献](#参考文献)
* [結果](#結果)

## 決定

check-jsonschemaを導入する。

## ステータス

<!-- to render SVG file trick -->
<!-- markdownlint-disable MD013 MD033 MD013 -->
### <img src="https://raw.githubusercontent.com/FortAwesome/Font-Awesome/refs/heads/6.x/svgs/regular/circle-check.svg" width="10" alt="承認済み" /> 承認済み

## 背景

* **ユースケース：** 複数のプロジェクトで共通のJSON/YAML設定ファイルを利用している状況において、
* **懸念事項：** 手動更新によるタイポや構造の誤りがランタイムエラーを引き起こすリスクに直面し、
* **品質：** 設定の整合性と開発時のフィードバックサイクルの高速化を達成するために、
* **欠点：** 開発環境へのPythonランタイムの依存というコストを受け入れ、
* **オプション：** 汎用性が高く、スキーマとの連携が強力な `check-jsonschema` の採用を決定した。

## 想定される影響

* **簡単になること：**
  * GitHub ActionsやDependabotの設定ファイルなど、一般的な設定ファイルの妥当性チェックがワンコマンドで実行可能になる。
  * カスタムスキーマを用いた独自設定ファイルのバリデーションが容易になる。
* **難しくなること：**
  * Pythonランタイムを使うので、実行環境の管理が手間になる

## 検討した他の選択肢

[参考](#参考)を参照。

## 参考

開発プロジェクトにおいて、設定ファイルの妥当性を担保するために最適なバリデーションツールを検討した。

### 比較対象

本比較では、以下の3つのCLIツールを対象とした。

| ツール名 | 特徴 | リポジトリ |
| :--- | :--- | :--- |
| **ajv-cli** | Node.jsエコシステムで最も有名な「Ajv」のCLI版。 | [ajv-validator/ajv-cli](https://github.com/ajv-validator/ajv-cli) |
| **schemalint** | giantswarm氏作成。見た時点でGitHubのスター数は13と少ないが、未だにコミットがあってメンテされているようだった。 | [giantswarm/schemalint](https://github.com/giantswarm/schemalint) |
| **check-jsonschema** | Python製。結論から言うとこれしか選択肢がない。 | [python-jsonschema/check-jsonschema](https://github.com/python-jsonschema/check-jsonschema) |

#### 検討はしたものの比較から除外したツール

* **jsonschema-lint** ([jacksmith15/jsonschema-lint](https://github.com/jacksmith15/jsonschema-lint)): 長期間更新が停止しているため。
* **TypeSpec** ([microsoft/typespec](https://github.com/microsoft/typespec)): データモデリング言語としての側面が強く、スキーマから検証しないため。
* **json-schema-org/json-schema-linting** ([json-schema-org/json-schema-linting](https://github.com/json-schema-org/json-schema-linting)): 実装が未完了。

### 比較方法

今回の検証では、よく使う **devbox** のスキーマを使用する。
できればJSONスキーマファイルを用意せずとも`$schema`プロパティを自動で参照してくれたらよかったが、`schemalint`以外はどのツールもやってくれなかった。

よって事前にスキーマ定義ファイルをダウンロードし、ローカルに`devbox.schema.json`として保存した上で検証をする。

また、テストデータには正当なJSON (`valid.json`)と、不正なプロパティを含むJSON (`invalid.json`)を使う。もちろん、両方ともJSONとしては正しく、スキーマに沿っているかどうかの違いのみ。

```json:valid.json
{
    "$schema": "https://raw.githubusercontent.com/jetify-com/devbox/0.17.1/.schema/devbox.schema.json",
    "packages": [],
    "shell": {
      "init_hook": [
        "echo 'Welcome to devbox!' > /dev/null"
      ],
      "scripts": {
        "test": [
          "echo \"Error: no test specified\" && exit 1"
        ]
      }
    }
  }
```

```json:invalid.json
{
    "$schema": "https://raw.githubusercontent.com/jetify-com/devbox/0.17.1/.schema/devbox.schema.json",
    "packages": [],
    "foo": "bar",
    "shell": {
      "init_hook": [
        "echo 'Welcome to devbox!' > /dev/null"
      ],
      "scripts": {
        "test": [
          "echo \"Error: no test specified\" && exit 1"
        ]
      }
    }
  }
```

また、それぞれの比較には以下のコマンドを使った。

#### ajv-cli

```bash
ajv validate -s devbox.schema.json -d valid.json
ajv validate -s devbox.schema.json -d invalid.json
```

#### schemalint

```bash
schemalint verify valid.json
schemalint verify invalid.json
```

#### check-jsonschema

```bash
check-jsonschema --schemafile devbox.schema.json valid.json
check-jsonschema --schemafile devbox.schema.json invalid.json
```

### 比較結果

#### ajv-cli: スキーマを読み込めない

```bash
$ ajv validate -s devbox.schema.json -d valid.json
schema devbox.schema.json is invalid
error: no schema with key or ref "http://json-schema.org/draft-04/schema#"
error: "ajv" exited with code 1

$ ajv validate -s devbox.schema.json -d invalid.json
schema devbox.schema.json is invalid
error: no schema with key or ref "http://json-schema.org/draft-04/schema#"
error: "ajv" exited with code 1
```

AjvはDraft-04形式のスキーマを読み込もうとするとエラーになる。
AjvにはAjv独自のスキーマを描く必要がある。
そもそも、更新が５年前で止まっているのはどうかと。

#### schemalint: そもそも実装されてないかも

```bash
$ schemalint verify valid.json

Errors (1)

Schema is not normalized. Run 'schemalint normalize valid.json -o valid.json --force'.

---

Verification result

[SUCCESS] Input is valid JSON Schema.
[ERROR] Input is not normalized.

$ schemalint verify invalid.json

Errors (1)

Schema is not normalized. Run 'schemalint normalize invalid.json -o invalid.json --force'.


---

Verification result

[SUCCESS] Input is valid JSON Schema.
[ERROR] Input is not normalized.
```

検証した結果、`schemalint`はスキーマに沿っているかどうかを見てないことがわかる。
リポジトリをよく見たらテストケースが存在せず、どう使うのかもわからないままです。よくメンテされていないと判断。

#### check-jsonschema: 実用的で最も正確なエラー表示

```bash
$ check-jsonschema --schemafile devbox.schema.json valid.json
ok -- validation done

$ check-jsonschema --schemafile devbox.schema.json invalid.json
Schema validation errors were encountered.
  invalid.json::$: Additional properties are not allowed ('foo' was unexpected)
```

非常に優秀。正当なデータはパスし、不正なデータ（`invalid.json`）については、追加した`foo`プロパティが許可されていないことを明確に指摘。これが最も信頼できる選択肢。

今回の比較結果をまとめると以下の通り。

| 評価項目 | ajv-cli | schemalint | check-jsonschema |
| :--- | :--- | :--- | :--- |
| **バリデーション成否** | × (エラー停止) | × (データ未検証) | **○ (正確に検証)** |
| **偽陽性の発生** | **あり** (Draftバージョンの不一致) | なし | なし |
| **偽陰性の発生** | なし | **あり** (中身を無視する) | なし |
| **エラーメッセージ** | 難解 (内部エラー) | 紛らわしい (成功と表示) | **明快 (行数・原因を特定)** |

### まとめ

今回の比較から、**`check-jsonschema` が唯一信頼できるツールである**ことが証明された。

開発プロジェクトに組み込むのであれば、迷わず **check-jsonschema** を採用すべきだ。GitHub ActionsなどのCI環境でも導入が容易であり、バリデーションツールとしての完成度が頭ひとつ抜けている。

## 参考文献

* [check-jsonschema GitHub Repository](https://github.com/python-jsonschema/check-jsonschema)
* [SchemaStore.org](https://json.schemastore.org/) - 多くの標準的なJSONスキーマを提供しているリポジトリ

## 結果

<!-- この変更によって、もたらされた結果を後で書き込む -->
