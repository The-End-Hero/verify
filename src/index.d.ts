declare class _test {
    isEmail(field: any): any;
    isIp(field: any): any;
    isFax(field: any): any;
    isTel(field: any): any;
    isPhone(field: any): any;
    isUrl(field: any): any;
    isMoney(field: any): any;
    isEnglish(field: any): any;
    isChinese(field: any): any;
    isPercent(field: any): any;
    required(field: any): boolean;
    maxLength(field: any, length: any): boolean;
    minLength(field: any, length: any): boolean;
    same(field: any, newField: any): boolean;
    different(field: any, newField: any): boolean;
    contains(field: any, value: any): boolean;
    accepted(field: any): boolean;
}
/**
 * 表单验证
 * @constructor
 * @param {string} 表单form元素name/id
 * @param {array} 表单验证规则
 * @param {function} 回调函数
 */
declare class Validator extends _test {
    callback: any;
    errors: any;
    fields: any;
    handles: any;
    form: any;
    _passes: any;
    constructor(formelm: any, fields: any, callback: any);
    validate(evt: any): this;
    passes(): this;
    _validateField(field: any): this;
}
export { Validator, _test };
