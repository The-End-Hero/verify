## verify-wxp

一款小巧无依赖的表单验证库，支持独立字符串验证。

[![MIT Licence](https://camo.githubusercontent.com/1e5d6c593654e3673fe4323032b7af9656157b1e/68747470733a2f2f6261646765732e66726170736f66742e636f6d2f6f732f6d69742f6d69742e7376673f763d313033)](https://opensource.org/licenses/mit-license.php)

### 安装/使用



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
