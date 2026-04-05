# Node.js製のツールは基本的にpackage.jsonとpnpmで管理する

## はじめに

- [決定](#決定)
- [ステータス](#ステータス)
- [背景](#背景)
- [想定される影響](#想定される影響)
- [検討した他の選択肢](#検討した他の選択肢)
- [参考文献](#参考文献)
- [結果](#結果)

## 決定

Node.js製のツールは基本的にpackage.jsonとpnpmで管理する。

## ステータス

<!-- to render SVG file trick -->
<!-- markdownlint-disable MD013 MD033 MD013 -->
### <img src="https://raw.githubusercontent.com/FortAwesome/Font-Awesome/refs/heads/6.x/svgs/solid/arrow-right-arrow-left.svg" width="10" alt="置き換え済み" /> 置き換え済み

## 背景

参照：<https://github.com/jetify-com/devbox/issues/2619>

例えばtextlintなどはNode.jsを必要とし、npm i -gでインストールする。
DevboxでNode.jsを管理し、textlintはその中で管理する方法や、Devboxで直接textlintを管理する方法があるが、
Devbox的には言語固有のパッケージは外出しするのが良さそう。

## 想定される影響

<!-- この変更によって、何が簡単になり、何が難しくなるか？ -->

## 検討した他の選択肢

<!-- 後から他の選択肢を考慮したか、気にする必要がないように書いておく -->

## 参考文献

<https://github.com/jetify-com/devbox/issues/2619>

## 結果

Bunのエコシステムが成熟してきたので、Bunに置き換え済み。
