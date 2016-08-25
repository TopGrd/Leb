/**
* @Date:   2016-08-25T10:37:34+08:00
* @Author: Li'Zhuo
* @Email:  topgrd@outlook.com
* @Last modified time: 2016-08-25T17:25:01+08:00
*/

/**
 * Validator 验证类
 * @param [Object] 校验对象
 */
function Validator(data) {
    if (data === null || typeof data === 'undefined') {
        this.throwError('请传入校验数据 type [Object]');
    }
    this.data = data;
}

/**
 * 抛出错误
 * @param  {String} message 错误信息
 * @return {Object}         返回错误信息
 */
Validator.prototype.throwError = function(message) {
    console.error(message);
    return;
};

/**
 * 验证接口
 * @param  {String} key   检测数据的键值
 * @param  {Array} rules 规则数组
 * @return {Validator}
 */
Validator.prototype.check = function(key, rules) {

    if (rules) {
        for (var i = 0; i < rules.length; i++) {
            this.validate(key, rules[i])
        }
    } else {
        this.throwError("没有添加验证规则");
    }

    return this;
};

/**
 * 验证分发
 * @param  {String} key   检测数据的键值
 * @param  {String} rules 验证规则
 * @return {Validator}
 */
Validator.prototype.validate = function(key, rule) {
    if (!isNaN(Number(rule))) {
        this.isLength(key, rule);
        return this;
    } else if (!this.__proto__[rule]) {
        this.throwError('未知的验证规则');
        return this;
    }
    this[rule](key);
    return this;
};

/**
 * 必需验证
 * @param  {String} key   检测数据的键值
 * @return {Validator}
 */
Validator.prototype.isRequired = function(key) {

    if (this.data[key] === null || typeof this.data[key] === 'undefined') {
        this.throwError(key + '不能为空');
    }

    return this;
}

/**
 * 数字类型验证
 * @param  {String} key   检测数据的键值
 * @return {Validator}
 */
Validator.prototype.isNumber = function(key) {

    if (isNaN(Number(this.data[key]))) {
        this.throwError(key + '必须为Number类型')
    }

    return this;
}

/**
 * 字符串类型验证
 * @param  {String} key   检测数据的键值
 * @return {Validator}
 */
Validator.prototype.isString = function(key) {
    if (Object.prototype.toString.call(this.data[key]) !== '[object String]') {
        this.throwError(key + '必须为String类型')
    }
    return this;
}

/**
 * 数组类型验证
 * @param  {String} key   检测数据的键值
 * @return {Validator}
 */
Validator.prototype.isArray = function(key) {
    if (Object.prototype.toString.call(this.data[key]) !== '[object Array]') {
        this.throwError(key + '必须为Array类型')
    }
    return this;
}

/**
 * 长度检验
 * @param  {String} key   检测数据的键值
 * @param  {Number} length   长度
 * @return {Validator}
 */
Validator.prototype.isLength = function(key, length) {
    if (this.data[key] === null || typeof this.data[key] === 'undefined') {
        this.throwError(key + '不存在');
    } else if (this.data[key].toString().length !== length) {
        this.throwError(key + '长度必须为' + length);
    }
    return this;
}

/**
 * 日期验证
 * @param  {String} key   检测数据的键值
 * @return {Validator}
 */
Validator.prototype.isDate = function(key) {
    var format = /[1|2]\d{3}[0|1][1-9][0-3]\d/;
    if (!format.test(this.data[key])) {
        this.throwError(key + '必须为YYYYMMDD格式或日期错误')
    }

    return this;
}

var data = {
    order: '012312321',
    id: '122',
    date: '20161303'
}
var val = new Validator(data);
val.check('order', ['isRequired', 'isNumber']);
val.check('id', ['isRequired', 'isString', 9]);
val.check('id', ['isDate', 'isArray']);
val.check('id', ['isDate', 'isArray']);
