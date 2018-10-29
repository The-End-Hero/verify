/**
 * [attributeValue 获取节点对象的属性]
 * @param  {[type]} element       [传入节点]
 * @param  {[type]} attributeName [需要获取的属性]
 * @return {[type]}               [返回String，属性值]
 */
function attributeValue(element, attributeName) {
    let i;
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
function camelCase(string) {
    // Support: IE9-11+
    return string.replace(/\_([a-z])/g, function (all, letter) {
        return letter.toUpperCase();
    });
}

/**
 * [backVal 判断 field 是否为字符串 ]
 * @param  {[type]}              [Object or String]
 * @return {[type]}              [String]
 */
function backVal(field) {
    return typeof field === "string" ? field : field.value;
}

/**
 * [_formElm 获取 dome 节点对象]
 * @param  {[type]} elm [字符串或者节点对象]
 * @return {[type]}     [返回dom节点]
 */
function _formElm(elm) {
    return typeof elm === "object" ? elm : document.forms[elm];
}

/**
 * [addField 构建具有所有需要验证的信息的主域数组]
 * @param {[type]} self      [Validator自己]
 * @param {[type]} field     [description]
 * @param {[type]} nameValue [description]
 */
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
    for (let a in field) {
        if (field.hasOwnProperty(a) && /^regexp\_/.test(a)) {
            regexs[a] = field[a];
        }
    }
}

export { attributeValue, camelCase,backVal, _formElm, addField }