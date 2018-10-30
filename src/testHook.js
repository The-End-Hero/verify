import regexs from "./regexs";
import {backVal} from './utils'
export default _testHook = {
    // 验证合法邮箱
    is_email: function (field) {
        return regexs.email.test(backVal(field));
    },
    // 验证合法 ip 地址
    is_ip: function (field) {
        return regexs.ip.test(backVal(field));
    },
    // 验证传真
    is_fax: function (field) {
        return regexs.fax.test(backVal(field));
    },
    // 验证座机
    is_tel: function (field) {
        return regexs.fax.test(backVal(field));
    },
    // 验证手机
    is_phone: function (field) {
        return regexs.phone.test(backVal(field));
    },
    // 验证身份证
    is_id: function (field) {
        return this.regexs.id.test(this.backVal(field));
    },
    // 验证URL
    is_url: function (field) {
        return regexs.url.test(backVal(field));
    },
    is_money: function (field) {
        return regexs.money.test(backVal(field));
    },
    is_english: function (field) {
        return regexs.english.test(backVal(field));
    },
    is_chinese: function (field) {
        return regexs.chinese.test(backVal(field));
    },
    is_percent: function (field) {
        return regexs.percent.test(backVal(field));
    },
    // 是否为必填
    required: function (field) {
        let value = backVal(field);
        if (field.type === "checkbox" || field.type === "radio") {
            return field.checked === true;
        }
        return value !== null && value !== "";
    },
    // 最大长度
    max_length: function (field, length) {
        if (!regexs.numericRegex.test(length)) return false;
        return backVal(field).length <= parseInt(length, 10);
    },
    // 最小长度
    min_length: function (field, length) {
        if (!regexs.numericRegex.test(length)) return false;
        return backVal(field).length >= parseInt(length, 10);
    },
    // 指定字段内容是否相同
    same: function (field, newField) {
        let value1 = backVal(field);
        // let value2 = backVal(this.fields[newField].element);
        let value2 = backVal(newField);
        return value1 == value2;
    },
    // 拒绝与某个字段相等,比如登录密码与交易密码情况
    different: function (field, newField) {
        return !this.same(field, newField);
    },
    // 直接判断字符串是否相等
    contains: function (field, value) {
        let value1 = backVal(field);
        return value1 == value;
    },
    // 用于服务条款,是否同意时相当有用,不限制checkbox与radio,有可能submit button直接附带value情况
    accepted: function (field) {
        let value = backVal(field);
        return "YES" == value.toUpperCase() || "ON" == value.toUpperCase() || 1 == value || false == value ? true : false;
    }
}
