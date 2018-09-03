interface IFOBJ {
    [index: string]: any;
}
/**
 * regexs {} 正则对象
 * _testHook {} 正则验证钩子
 * Validator func
 */
declare const regexs: IFOBJ;
interface IFtesthook {
    [index: string]: any;
    is_email: any;
    is_ip: any;
    is_fax: any;
    is_tel: any;
    is_phone: any;
    is_url: any;
    is_money: any;
    is_english: any;
    is_chinese: any;
    is_percent: any;
    required: any;
    max_length: any;
    min_length: any;
    same: any;
    different: any;
    contains: any;
    accepted: any;
}
declare const _testHook: IFtesthook;
/**
 * [attributeValue 获取节点对象的属性]
 * @param  {[type]} element       [传入节点]
 * @param  {[type]} attributeName [需要获取的属性]
 * @return {[type]}               [返回String，属性值]
 */
declare function attributeValue(element: any, attributeName: any): any;
/**
 * [camelCase 将样式属性字符转换成驼峰。]
 * @param  {[type]} string [字符串]
 * @return {[type]}        [字符串]
 */
declare function camelCase(string: any): any;
/**
 * [backVal 判断 field 是否为字符串 ]
 * @param  {[type]}              [Object or String]
 * @return {[type]}              [String]
 */
declare function backVal(field: any): any;
/**
 * [_formElm 获取 dom 节点对象]
 * @param  {[type]} elm [字符串或者节点对象]
 * @return {[type]}     [返回dom节点]
 */
declare function _formElm(elm: any): any;
/**
 * [addField 构建具有所有需要验证的信息的主域数组]
 * @param {[type]} self      [Validator自己]
 * @param {[type]} field     [description]
 * @param {[type]} nameValue [description]
 */
declare function addField(self: any, field: any, nameValue: any): void;
/**
 * 表单验证
 * @constructor
 * @param {string} 表单form元素name/id
 * @param {array} 表单验证规则
 * @param {function} 回调函数
 */
declare class Validator {
    callback: any;
    errors: any;
    fields: any;
    handles: any;
    form: any;
    _passes: any;
    constructor(formelm: any, fields: any, callback: any);
    validate(evt: any): this;
    passes(): void;
    _validateField(field: any): this;
}
