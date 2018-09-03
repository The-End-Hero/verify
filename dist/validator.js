(function(f) {
    if (typeof exports === "object" && typeof module !== "undefined") {
        module.exports = f();
    } else if (typeof define === "function" && define.amd) {
        define([], f);
    } else {
        var g;
        if (typeof window !== "undefined") {
            g = window;
        } else if (typeof global !== "undefined") {
            g = global;
        } else if (typeof self !== "undefined") {
            g = self;
        } else {
            g = this;
        }
        g.Validator = f();
    }
})(function() {
    var define, module, exports;
    (function(factory) {
        if (typeof module === "object" && typeof module.exports === "object") {
            var v = factory(require, exports);
            if (v !== undefined) module.exports = v;
        } else if (typeof define === "function" && define.amd) {
            define([ "require", "exports", "./regexs", "./_testHook", "./util" ], factory);
        }
    })(function(require, exports) {
        "use strict";
        Object.defineProperty(exports, "__esModule", {
            value: true
        });
        var regexs_1 = require("./regexs");
        var _testHook_1 = require("./_testHook");
        var util_1 = require("./util");
        /**
     * 表单验证
     * @constructor
     * @param {string} 表单form元素name/id
     * @param {array} 表单验证规则
     * @param {function} 回调函数
     */        var Validator = /** @class */ function() {
            // public _testHook: any
            function Validator(formelm, fields, callback) {
                for (var key in _testHook_1._testHook) {
                    this[util_1.camelCase(key)] = _testHook_1._testHook[key];
                }
                this.callback = callback || function() {};
                this.errors = [];
                this.fields = {};
                this.handles = {};
                if (!formelm) return;
 // 若formelm不存在,则不继续执行
                                this.form = util_1._formElm(formelm) || {};
 // 获取form表单元素
                                for (var i = 0, fieldLength = fields.length; i < fieldLength; i++) {
                    var field = fields[i];
                    // 如果通过不正确，我们需要跳过该领域。
                                        if (!field.name && !field.names || !field.rules) {
                        console.warn(field);
                        continue;
                    }
                    util_1.addField(this, field, field.name);
                }
                var _onsubmit = this.form.onsubmit;
                this.form.onsubmit = function(that) {
                    return function(evt) {
                        try {
                            return that.validate(evt) && (_onsubmit === undefined || _onsubmit());
                        } catch (e) {
                            console.log(e);
                        }
                    };
                }(this);
            }
            Validator.prototype.validate = function(evt) {
                // 特殊情况直接通过
                if (this._passes) return this;
                this.handles["ok"] = true;
                this.handles["evt"] = evt;
                this.errors = [];
                for (var key in this.fields) {
                    if (this.fields.hasOwnProperty(key)) {
                        var field = this.fields[key] || {}, element = this.form[field.name];
                        if (element && element !== undefined) {
                            field.id = util_1.attributeValue(element, "id");
                            field.element = element;
                            field.type = element.length > 0 ? element[0].type : element.type;
                            field.value = util_1.attributeValue(element, "value");
                            field.checked = util_1.attributeValue(element, "checked");
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
            };
            Validator.prototype.passes = function() {
                this._passes = true;
                // return this;
                        };
            Validator.prototype._validateField = function(field) {
                var rules = field.rules.split("|"), isEmpty = !field.value || field.value === "" || field.value === undefined;
                var _loop_1 = function(i, ruleLength) {
                    var method = rules[i];
 // 单个rules
                                        var parts = regexs_1.regexs.rule.exec(method);
 // 匹配 max_length(12) => ["max_length",12]
                                        var param = null;
                    var failed = false;
                    // 解析带参数的验证如 max_length(12)
                                        if (parts) method = parts[1], param = parts[2];
                    if (isEmpty && rules.indexOf("required") === -1) {
                        // 空值 && 没有required规则
                        return "continue";
                    }
                    if (typeof _testHook_1._testHook[method] === "function") {
                        if (!_testHook_1._testHook[method].apply(this_1, [ field, param ])) {
                            failed = true;
                        }
                    }
                    // if (this.hasOwnProperty(camelCase(method))) {
                    //     if (!(this as any)[camelCase(method)].apply(this, [field, param])) {
                    //         failed = true;
                    //     }
                    // }
                                        if (regexs_1.regexs[method] && /^regexp\_/.test(method)) {
                        if (!regexs_1.regexs[method].test(field.value)) {
                            failed = true;
                        }
                    }
                    if (failed) {
                        var message = function() {
                            return field.display.split("|")[i] && field.display.split("|")[i].replace("{{" + field.name + "}}", field.value);
                        }();
                        var existingError = void 0, j = void 0;
                        for (j = 0; j < this_1.errors.length; j += 1) {
                            if (field.element === this_1.errors[j].element) {
                                existingError = this_1.errors[j];
                            }
                        }
                        var errorObject = existingError || {
                            id: field.id,
                            display: field.display,
                            element: field.element,
                            name: field.name,
                            message: message,
                            messages: [],
                            rule: method
                        };
                        errorObject.messages.push(message);
                        if (!existingError) this_1.errors.push(errorObject);
                    }
                };
                var this_1 = this;
                for (var i = 0, ruleLength = rules.length; i < ruleLength; i++) {
                    _loop_1(i, ruleLength);
                }
                return this;
            };
            return Validator;
        }();
        exports.Validator = Validator;
    });
});
