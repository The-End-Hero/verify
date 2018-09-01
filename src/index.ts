interface IFOBJ {
    [index: string]: any
}

/**
 * regexs {} 正则对象
 * _testHook {} 正则验证钩子
 * Validator func
 */
const regexs: IFOBJ = {
    // 匹配 max_length(12) => ["max_length",12]
    rule: /^(.+?)\((.+)\)$/,
    // 数字
    numericRegex: /^[0-9]+$/,
    /**
     * @descrition:邮箱规则
     * 1.邮箱以a-z、A-Z、0-9开头，最小长度为1.邮箱只有小写，哪怕大写能发出去，最后也会转为小写。
     * 2.如果左侧部分包含-、_、.则这些特殊符号的前面必须包一位数字或字母。
     * 3.@符号是必填项
     * 4.右则部分可分为两部分，第一部分为邮件提供商域名地址，第二部分为域名后缀，现已知的最短为2位。最长的为6为。
     * 5.邮件提供商域可以包含特殊字符-、_、.
     */
    email: /^[a-zA-Z0-9]+([._\\-]*[a-zA-Z0-9])*@([a-zA-Z0-9]+[-a-zA-Z0-9]*[a-zA-Z0-9]+.){1,63}[a-zA-Z0-9]+$/,
    /**
     * [ip ipv4、ipv6]
     * "192.168.0.0"
     * "192.168.2.3.1.1"
     * "235.168.2.1"
     * "192.168.254.10"
     * "192.168.254.10.1.1"
     */
    ip: /^(\d{1,2}|1\d\d|2[0-4]\d|25[0-5])((\.(\d{1,2}|1\d\d|2[0-4]\d|25[0-5])){3}|(\.(\d{1,2}|1\d\d|2[0-4]\d|25[0-5])){5})$/,
    /**
     * @descrition:判断输入的参数是否是个合格的固定电话号码。
     * 待验证的固定电话号码。
     * 国家代码(2到3位)-区号(2到3位)-电话号码(7到8位)-分机号(3位)
     **/
    fax: /^(([0\+]\d{2,3}-)?(0\d{2,3})-)(\d{7,8})(-(\d{3,}))?$/,
    /**
     *@descrition:手机号码段规则
     * 由于可能新增的号段太多，改为1开头11位数字
     * 国际码 如：中国(+86)
     */
    // phone: /^((\+?[0-9]{1,4})|(\(\+86\)))?(13[0-9]|14[57]|15[012356789]|17[03678]|18[0-9])\d{8}$/,
    phone: /^1[0-9]{10}$/,
    /**
     * @descrition 匹配 URL
     */
    url: /[a-zA-z]+:\/\/[^\s]/,
    money: /^(0|[1-9]\d*)(\.\d+)?$/,
    english: /^[A-Za-z]+$/,
    chinese: /^[\u0391-\uFFE5]+$/,
    percent: /^(?:[1-9][0-9]?|100)(?:\.[0-9]{1,2})?$/
}
interface IFtesthook {
    [index: string]: any
    is_email: any,
    is_ip: any,
    is_fax: any,
    is_tel: any,
    is_phone: any,
    is_url: any,
    is_money: any,
    is_english: any,
    is_chinese: any,
    is_percent: any,
    required: any,
    max_length: any,
    min_length: any,
    same: any,
    different: any,
    contains: any,
    accepted: any,
}
const _testHook: IFtesthook = {
    // 验证合法邮箱
    is_email: function (field: any) {
        return regexs.email.test(backVal(field));
    },
    // 验证合法 ip 地址
    is_ip: function (field: any) {
        return regexs.ip.test(backVal(field));
    },
    // 验证传真
    is_fax: function (field: any) {
        return regexs.fax.test(backVal(field));
    },
    // 验证座机
    is_tel: function (field: any) {
        return regexs.fax.test(backVal(field));
    },
    // 验证手机
    is_phone: function (field: any) {
        return regexs.phone.test(backVal(field));
    },
    // 验证URL
    is_url: function (field: any) {
        return regexs.url.test(backVal(field));
    },
    is_money: function (field: any) {
        return regexs.money.test(backVal(field));
    },
    is_english: function (field: any) {
        return regexs.english.test(backVal(field));
    },
    is_chinese: function (field: any) {
        return regexs.chinese.test(backVal(field));
    },
    is_percent: function (field: any) {
        return regexs.percent.test(backVal(field));
    },
    // 是否为必填
    required: function (field: any) {
        let value = backVal(field);
        if (field.type === "checkbox" || field.type === "radio") {
            return field.checked === true;
        }
        return value !== null && value !== "";
    },
    // 最大长度
    max_length: function (field: any, length: any) {
        if (!regexs.numericRegex.test(length)) return false;
        return backVal(field).length <= parseInt(length, 10);
    },
    // 最小长度
    min_length: function (field: any, length: any) {
        if (!regexs.numericRegex.test(length)) return false;
        return backVal(field).length >= parseInt(length, 10);
    },
    // 指定字段内容是否相同
    same: function (field: any, newField: any) {
        let value1 = backVal(field);
        // let value2 = backVal(this.fields[newField].element);
        let value2 = backVal(newField);
        return value1 == value2;
    },
    // 拒绝与某个字段相等,比如登录密码与交易密码情况
    different: function (field: any, newField: any) {
        return !this.same(field, newField);
    },
    // 直接判断字符串是否相等
    contains: function (field: any, value: any) {
        let value1 = backVal(field);
        return value1 == value;
    },
    // 用于服务条款,是否同意时相当有用,不限制checkbox与radio,有可能submit button直接附带value情况
    accepted: function (field: any) {
        let value = backVal(field);
        return "YES" == value.toUpperCase() || "ON" == value.toUpperCase() || 1 == value || false == value ? true : false;
    }
}


/**
 * [attributeValue 获取节点对象的属性]
 * @param  {[type]} element       [传入节点]
 * @param  {[type]} attributeName [需要获取的属性]
 * @return {[type]}               [返回String，属性值]
 */
function attributeValue(element: any, attributeName: any) {
    let i, elementLength;
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

/**
 * [camelCase 将样式属性字符转换成驼峰。]
 * @param  {[type]} string [字符串]
 * @return {[type]}        [字符串]
 */
function camelCase(string: any) {
    // Support: IE9-11+
    return string.replace(/\_([a-z])/g, function (all: any, letter: any) {
        return letter.toUpperCase();
    });
}

/**
 * [backVal 判断 field 是否为字符串 ]
 * @param  {[type]}              [Object or String]
 * @return {[type]}              [String]
 */
function backVal(field: any) {
    return typeof field === "string" ? field : field.value;
}

/**
 * [_formElm 获取 dome 节点对象]
 * @param  {[type]} elm [字符串或者节点对象]
 * @return {[type]}     [返回dom节点]
 */
function _formElm(elm: any) {
    return typeof elm === "object" ? elm : document.forms[elm];
}

/**
 * [addField 构建具有所有需要验证的信息的主域数组]
 * @param {[type]} self      [Validator自己]
 * @param {[type]} field     [description]
 * @param {[type]} nameValue [description]
 */
function addField(self: any, field: any, nameValue: any) {
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
    for (let a in field) {
        if (field.hasOwnProperty(a) && /^regexp\_/.test(a)) {
            regexs[a] = field[a];
        }
    }
}

/**
 * 表单验证
 * @constructor
 * @param {string} 表单form元素name/id
 * @param {array} 表单验证规则
 * @param {function} 回调函数
 */
export class Validator {
    public callback: any
    public errors: any
    public fields: any
    public handles: any
    public form: any
    public _passes: any
    constructor(formelm: any, fields: any, callback: any) {
        for (let key in _testHook) {
            this[camelCase(key)] = _testHook[key];
        }
        this.callback = callback || function () {
        };
        this.errors = [];
        this.fields = {};
        this.handles = {};
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

        let _onsubmit = this.form.onsubmit;
        this.form.onsubmit = function (that) {
            return function (evt: any) {
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

    validate(evt: any) {
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
    }

    passes() {
        this._passes = true;
        return this;
    }

    _validateField(field: any) {
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
}

