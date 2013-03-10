
# FontSizeManager

## これはなに

ページのベースフォントサイズの変更を管理するライブラリです。

## 主な機能

- html要素に font-size-normal のようなクラス名をあててベースフォントサイズを設定します。
- このライブラリにフォントサイズ自体を変更する機能はありません。クラスをあてるだけです。
- フォントの選択をcookieに保存します。

## 使い方

jqueryと共にロードします。

```html
<script src="./assets/js/jquery.min.js"></script>
<script src="./assets/js/font-size-manager.min.js"></script>
```

ロードするとhtml要素に次のようなクラスが設定されます。

```html
<html class="font-size-normal">
```

$.fontSizeManager.set() を使う事でこのクラスの切り替えが出来ます。
「小」「中」「大」等としたボタンのクリックイベントで使用すると良いでしょう。
変更されたフォントサイズはcookieに保存され、次回訪問時にも適用されます。

```javascript
$.fontSizeManager.set("large"); // "font-size-normal"
$.fontSizeManager.set("small"); // "font-size-small"
```

このライブラリはクラスの切り替えまでしか行いませんので、
それぞれのクラスをCSSで宣言しておきましょう。

```css
.font-size-small { font-size: 13px; }
.font-size-normal { font-size: 16px; }
.font-size-large { font-size: 20px; }
```

サイズ変更ボタンのトグル効果も、これらのクラスの子孫セレクタを活用して実装できます。

```css
.font-size-small .button-small,
.font-size-normal .button-normal,
.font-size-large .button-large
{
	/* アクティブ時のスタイル */
}
```


## オプションの設定

オプションの設定変更は、 $.fontSizeManagerOption を宣言する事で可能です。
初期化前（font-size-manager.jsを読み込む前）に宣言しておく必要があります。

```
$.fontSizeManagerOption = {
	cookie : false,
	defaultSize : "small"
};
```

### オプション

- classPrefix : String ("font-size-") - クラス名の接頭辞
- defaultSize : String ("normal") - デフォルトサイズ
- sizes : Array (["small", "normal", "large"]) - サイズ名リスト
- cookie : Boolean (true) - cookieに保存する・しない
- cookieName : String ("fontSize") - cookieのキー
- cookiePath : String ("/") - cookieのパス
- cookieExpireDays : Integer (7) - cookie保存期間（日）

## 作者

mach3

- [Website](http://www.mach3.jp)
- [Blog](http://blog.mach3.jp)
- [Twitter](http://twitter.com/mach3ss)
