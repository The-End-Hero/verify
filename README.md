# [verify](https://github.com/The-End-Hero/verify)
[![](https://img.shields.io/badge/Powered%20by-jslib%20base-brightgreen.svg)](https://github.com//The-End-Hero/verify)
[![license](https://img.shields.io/badge/license-MIT-blue.svg)](https://github.com//The-End-Hero/verify/blob/master/LICENSE)
[![Build Status](https://travis-ci.org/xiping.wang/verify.svg?branch=master)](https://travis-ci.org/xiping.wang/verify)
[![npm](https://img.shields.io/badge/npm-0.1.0-orange.svg)](https://www.npmjs.com/package/verify)
[![NPM downloads](http://img.shields.io/npm/dm/verify.svg?style=flat-square)](http://www.npmtrends.com/verify)
[![Percentage of issues still open](http://isitmaintained.com/badge/open/xiping.wang/verify.svg)](http://isitmaintained.com/project//The-End-Hero/verify "Percentage of issues still open")

多环境的，简单无依赖的表单验证库，支持独立字符串验证。

## 使用者指南
通过npm下载安装代码

```bash
$ npm install --save verify
```

如果你是node环境

```js
var base = require('verify');
```

如果你是webpack等环境

```js
import base from 'verify';
```

如果你是requirejs环境

```js
requirejs(['node_modules/verify/dist/index.aio.js'], function (base) {
    // xxx
})
```

如果你是浏览器环境

```html
<script src="node_modules/verify/dist/index.aio.js"></script>
```



## 独立字符串验证

-  邮箱（小写，邮箱无论大小写，在实际发送中都会被转成小写）
-  ip地址
-  传真地址
-  手机号（1开头的11位数字）
-  座机号
-  URL
-  最大长度
-  最小长度
-  必填
-  身份证（15位/18位且最后一位可为X）



## 表单验证





## 

## 文档

- [API](https://github.com/xiping.wang/verify/blob/master/doc/api.md)
- [2018年如何写一个现代的JavaScript库](https://xiping.wang.com/javascript/2018/08/17/2020-js-lib/)

## 更新日志
[CHANGELOG.md](https://github.com/xiping.wang/verify/blob/master/CHANGELOG.md)

## 计划列表
[TODO.md](https://github.com/xiping.wang/verify/blob/master/TODO.md)

- https://github.com/jsmini/console)
