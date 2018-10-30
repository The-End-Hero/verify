import regexs from './regexs'
import _testHook from './testHook'
import {attributeValue, camelCase, _formElm, addField} from './utils'

/**
 * 表单验证函数
 * @constructor
 * @param {string} 表单form元素name/id
 * @param {array} 表单验证规则
 * @param {function} 回调函数
 */
let Verify = function (formelm, fields, callback) {
    
    // 将验证方法绑到 Verify 对象上去
    for (let a in _testHook) this[camelCase(a)] = _testHook[a];
    this.callback = callback || function () {
    };
    // console.log(this.form, 'this.form')
    this.errors = [];
    this.fields = {};
    this.handles = {};
    // 如果不存在 form 对象
    if (!formelm) return this;
    this.form = _formElm(formelm) || {};
    for (let i = 0, fieldLength = fields.length; i < fieldLength; i++) {
        let field = fields[i];
        // 如果通过不正确，我们需要跳过该领域。
        if (!field.name && !field.names || !field.rules) {
            console.warn(field);
            continue;
        }
        addField(this, field, field.name);
    }
    // 使用 submit 按钮拦截
    let _onsubmit = this.form.onsubmit;
    this.form.onsubmit = function (that) {
        return function (evt) {
            // console.log(1)
            try {
                // console.log(2)
                // console.log(_onsubmit, '_onsubmit')
                return that.validate(evt) && (_onsubmit === undefined || _onsubmit());
            } catch (e) {
                console.log(e)
            }
        };
    }(this);
}

Verify.prototype = {
    /**
     * [_validator 在提交表单时进行验证。或者直接调用validate]
     * @param  {[type]} evt [description]
     * @return {[type]}     [JSON]
     */
    validate: function (evt) {
        // 特殊情况直接通过
        if (this._passes) return this;
        this.handles["ok"] = true;
        this.handles["evt"] = evt;
        this.errors = [];
        for (let key in this.fields) {
            if (this.fields.hasOwnProperty(key)) {
                let field = this.fields[key] || {}, element = this.form[field.name];
                if (element && element !== undefined) {
                    field.id = attributeValue(element, "id");
                    field.element = element;
                    field.type = element.length > 0 ? element[0].type : element.type;
                    field.value = attributeValue(element, "value");
                    field.checked = attributeValue(element, "checked");
                    this._validateField(field);
                }
            }
        }
        if (typeof this.callback === "function") {
            this.callback(this, evt);
        }
        // 如果有错误，停止submit 提交
        if (this.errors.length > 0) {
            if (evt && evt.preventDefault) {
                evt.preventDefault();
            } else if (event) {
                // IE 使用的全局变量
                event.returnValue = false;
            }
        }
        return this;
    },
    passes: function () {
        this._passes = true;
        return this;
    },
    _validateField: function (field) {
        let rules = field.rules.split("|"),
            isEmpty = !field.value || field.value === "" || field.value === undefined;
        for (let i = 0, ruleLength = rules.length; i < ruleLength; i++) {
            let method = rules[i];
            let parts = regexs.rule.exec(method);
            let param = null;
            let failed = false;
            // 解析带参数的验证如 max_length(12)
            if (parts) method = parts[1], param = parts[2];
            if (isEmpty && rules.indexOf("required") === -1) {
                continue;
            }
            if (typeof _testHook[method] === "function") {
                if (!_testHook[method].apply(this, [field, param])) {
                    failed = true;
                }
            }
            if (regexs[method] && /^regexp\_/.test(method)) {
                if (!regexs[method].test(field.value)) {
                    failed = true;
                }
            }
            if (failed) {
                let message = function () {
                    return field.display.split("|")[i] && field.display.split("|")[i].replace("{{" + field.name + "}}", field.value);
                }();
                let existingError, j;
                for (j = 0; j < this.errors.length; j += 1) {
                    if (field.element === this.errors[j].element) {
                        existingError = this.errors[j];
                    }
                }
                let errorObject = existingError || {
                    id: field.id,
                    display: field.display,
                    element: field.element,
                    name: field.name,
                    message: message,
                    messages: [],
                    rule: method
                };
                errorObject.messages.push(message);
                if (!existingError) this.errors.push(errorObject);
            }
        }
        return this;
    }
};


export default Verify
