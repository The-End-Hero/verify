## verify-wxp

一款小巧无依赖的表单验证库，支持独立字符串验证，支持UMD。

[![MIT Licence](https://camo.githubusercontent.com/1e5d6c593654e3673fe4323032b7af9656157b1e/68747470733a2f2f6261646765732e66726170736f66742e636f6d2f6f732f6d69742f6d69742e7376673f763d313033)](https://opensource.org/licenses/mit-license.php) [![badge](https://camo.githubusercontent.com/9d907bd614d48c42a199fc644f5b9c4c842918e3/68747470733a2f2f696d672e736869656c64732e696f2f62616467652f637970726573732e696f2d74657374732d677265656e2e7376673f7374796c653d666c61742d737175617265)](https://cypress.io/) [![Build Status](https://travis-ci.org/The-End-Hero/verify.svg?branch=master)](https://travis-ci.org/The-End-Hero/verify)

### 安装/使用

1. script引入

```html
<script scr="./dist/verify.min.js">
```

2. npm 引入

```javascript
npm i --save verify-wxp
```



### 表单验证



### 独立字符串验证

```javascript
var v = new Validator();
v.isEmail('wowohoo@qq.com'); // -> 验证合法邮箱  |=> 返回布尔值
v.isIp('192.168.23.3'); // -> 验证合法 ip 地址  |=> 返回布尔值
v.isFax(''); // -> 验证传真  |=> 返回布尔值
v.isPhone('13622667263'); // -> 验证手机  |=> 返回布尔值
v.isTel('021－324234-234'); // -> 验证座机  |=> 返回布尔值
v.isUrl('http://JSLite.io'); // -> 验证URL  |=> 返回布尔值
v.maxLength('JSLite',12); // -> 最大长度  |=> 返回布尔值
v.minLength('JSLite',3); // -> 最小长度  |=> 返回布尔值
v.required('23'); // -> 是否为必填(是否为空)  |=> 返回布尔值
```




MIT License
