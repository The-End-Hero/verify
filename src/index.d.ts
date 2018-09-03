/**
 * 表单验证
 * @constructor
 * @param {string} 表单form元素name/id
 * @param {array} 表单验证规则
 * @param {function} 回调函数
 */
export declare class Validator {
    callback: any;
    errors: any;
    fields: any;
    handles: any;
    form: any;
    _passes: any;
    _testHook: any;
    constructor(formelm: any, fields: any, callback: any);
    validate(evt: any): this;
    passes(): this;
    _validateField(field: any): this;
}
