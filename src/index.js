"use strict";
var regexs = {
    rule: /^(.+?)\((.+)\)$/,
    numericRegex: /^[0-9]+$/,
    email: /^[a-zA-Z0-9]+([._\\-]*[a-zA-Z0-9])*@([a-zA-Z0-9]+[-a-zA-Z0-9]*[a-zA-Z0-9]+.){1,63}[a-zA-Z0-9]+$/,
    ip: /^(\d{1,2}|1\d\d|2[0-4]\d|25[0-5])((\.(\d{1,2}|1\d\d|2[0-4]\d|25[0-5])){3}|(\.(\d{1,2}|1\d\d|2[0-4]\d|25[0-5])){5})$/,
    fax: /^(([0\+]\d{2,3}-)?(0\d{2,3})-)(\d{7,8})(-(\d{3,}))?$/,
    phone: /^1[0-9]{10}$/,
    url: /[a-zA-z]+:\/\/[^\s]/,
    money: /^(0|[1-9]\d*)(\.\d+)?$/,
    english: /^[A-Za-z]+$/,
    chinese: /^[\u0391-\uFFE5]+$/,
    percent: /^(?:[1-9][0-9]?|100)(?:\.[0-9]{1,2})?$/,
    id: /(^[1-9]\d{5}(18|19|([23]\d))\d{2}((0[1-9])|(10|11|12))(([0-2][1-9])|10|20|30|31)\d{3}[0-9Xx]$)|(^[1-9]\d{5}\d{2}((0[1-9])|(10|11|12))(([0-2][1-9])|10|20|30|31)\d{3}$)/
};
var _testHook = {
    is_email: function (field) {
        return regexs.email.test(backVal(field));
    },
    is_ip: function (field) {
        return regexs.ip.test(backVal(field));
    },
    is_fax: function (field) {
        return regexs.fax.test(backVal(field));
    },
    is_tel: function (field) {
        return regexs.fax.test(backVal(field));
    },
    is_phone: function (field) {
        return regexs.phone.test(backVal(field));
    },
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
    is_id: function (field) {
        return regexs.id.test(backVal(field));
    },
    required: function (field) {
        var value = backVal(field);
        if (field.type === "checkbox" || field.type === "radio") {
            return field.checked === true;
        }
        return value !== null && value !== "";
    },
    max_length: function (field, length) {
        if (!regexs.numericRegex.test(length))
            return false;
        return backVal(field).length <= parseInt(length, 10);
    },
    min_length: function (field, length) {
        if (!regexs.numericRegex.test(length))
            return false;
        return backVal(field).length >= parseInt(length, 10);
    },
    same: function (field, newField) {
        var value1 = backVal(field);
        var value2 = backVal(newField);
        return value1 == value2;
    },
    different: function (field, newField) {
        return !this.same(field, newField);
    },
    contains: function (field, value) {
        var value1 = backVal(field);
        return value1 == value;
    },
    accepted: function (field) {
        var value = backVal(field);
        return "YES" == value.toUpperCase() || "ON" == value.toUpperCase() || 1 == value || false == value ? true : false;
    }
};
function attributeValue(element, attributeName) {
    var i, elementLength;
    if (element.length > 0 && (element[0].type === "radio" || element[0].type === "checkbox")) {
        for (i = 0, elementLength = element.length; i < elementLength; i++) {
            if (element[i].checked) {
                return element[i][attributeName];
            }
        }
        return;
    }
    return element[attributeName];
}
function camelCase(string) {
    return string.replace(/\_([a-z])/g, function (all, letter) {
        return letter.toUpperCase();
    });
}
function backVal(field) {
    return typeof field === "string" ? field : field.value;
}
function _formElm(elm) {
    return typeof elm === "object" ? elm : document.forms[elm];
}
function addField(self, field, nameValue) {
    self.fields[nameValue] = {
        name: nameValue,
        display: field.display || nameValue,
        rules: field.rules,
        id: null,
        element: null,
        type: null,
        value: null,
        checked: null
    };
    for (var a in field) {
        if (field.hasOwnProperty(a) && /^regexp\_/.test(a)) {
            regexs[a] = field[a];
        }
    }
}
var verify_wxp = (function () {
    function verify_wxp(formelm, fields, callback) {
        for (var key in _testHook) {
            this[camelCase(key)] = _testHook[key];
        }
        this.callback = callback || function () {
        };
        this.errors = [];
        this.fields = {};
        this.handles = {};
        if (!formelm)
            return;
        this.form = _formElm(formelm) || {};
        for (var i = 0, fieldLength = fields.length; i < fieldLength; i++) {
            var field = fields[i];
            if (!field.name && !field.names || !field.rules) {
                console.warn(field);
                continue;
            }
            addField(this, field, field.name);
        }
        var _onsubmit = this.form.onsubmit;
        this.form.onsubmit = function (that) {
            return function (evt) {
                try {
                    return that.validate(evt) && (_onsubmit === undefined || _onsubmit());
                }
                catch (e) {
                    console.log(e);
                }
            };
        }(this);
    }
    verify_wxp.prototype.validate = function (evt) {
        if (this._passes)
            return this;
        this.handles["ok"] = true;
        this.handles["evt"] = evt;
        this.errors = [];
        for (var key in this.fields) {
            if (this.fields.hasOwnProperty(key)) {
                var field = this.fields[key] || {}, element = this.form[field.name];
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
        if (this.errors.length > 0) {
            if (evt && evt.preventDefault) {
                evt.preventDefault();
            }
            else if (event) {
                event.returnValue = false;
            }
        }
        return this;
    };
    verify_wxp.prototype.passes = function () {
        this._passes = true;
    };
    verify_wxp.prototype._validateField = function (field) {
        var rules = field.rules.split("|"), isEmpty = !field.value || field.value === "" || field.value === undefined;
        var _loop_1 = function (i, ruleLength) {
            var method = rules[i];
            var parts = regexs.rule.exec(method);
            var param = null;
            var failed = false;
            if (parts)
                method = parts[1], param = parts[2];
            if (isEmpty && rules.indexOf("required") === -1) {
                return "continue";
            }
            if (typeof _testHook[method] === "function") {
                if (!_testHook[method].apply(this_1, [field, param])) {
                    failed = true;
                }
            }
            if (regexs[method] && /^regexp\_/.test(method)) {
                if (!regexs[method].test(field.value)) {
                    failed = true;
                }
            }
            if (failed) {
                var message = function () {
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
                if (!existingError)
                    this_1.errors.push(errorObject);
            }
        };
        var this_1 = this;
        for (var i = 0, ruleLength = rules.length; i < ruleLength; i++) {
            _loop_1(i, ruleLength);
        }
        return this;
    };
    return verify_wxp;
}());
//# sourceMappingURL=index.js.map