## verify-wxp

一款小巧无依赖的表单验证库，支持独立字符串验证。

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
