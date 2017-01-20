/**
* @Date:   2016-08-25T10:37:34+08:00
* @Author: Li'Zhuo
* @Email:  topgrd@outlook.com
* @Last modified time: 2016-08-26T10:26:09+08:00
*/

/**
 * Validator 验证类
 * 支持链式调用
 */
function Validator() {
  // 针对一个键值是否可继续验证（isNotRequired是为空）
  this.canValidate = true;
  // 验证结果
  this.result = true;
}

/**
 * Validator 数据注入
 * @param  {Object} data 需要验证的数据
 * @return {Validator}      [链式]
 */
Validator.prototype.injector = function(data) {
  if (data === null || typeof data === 'undefined' || data === '') {
    this.throwError('请传入校验数据 type [Object]');
  }
  this.data = data;
  return this;
};

/**
 * 抛出错误
 * @param  {String} message 错误信息
 * @return {Object}         返回错误信息
 */
Validator.prototype.throwError = function(message) {
  this.result = false;
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
  if (!rules) {
    this.throwError('没有添加验证规则');
    this.canValidate = false;
    return;
  }

  for (var i = 0; i < rules.length; i++) {
    if (this.canValidate) {
      this.validate(key, rules[i]);
    }
  }
  this.canValidate = true;
  return this;
};

/**
 * 验证分发
 * @param  {String} key   检测数据的键值
 * @param  {String} rules 验证规则
 * @return {Validator}
 */
Validator.prototype.validate = function(key, rule) {
  var reg = /([a-zA-Z]+)\((\d+)\)/;
  rule = rule.toString();
  var arr = rule.match(reg);

  if (!isNaN(Number(rule))) {
    this.isLength(key, rule);
    return this;
  } else if (arr != null) {
    this[arr[1]](key, arr[2]);
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
  if (
    this.data[key] === null || typeof this.data[key] === 'undefined' ||
      this.data[key] === ''
  ) {
    this.throwError(key + '不能为空');
  }

  return this;
};

/**
 * 非必需参数
 * @param  {String} key   检测数据的键值
 * @return {Validator}
 */
Validator.prototype.isNotRequired = function(key) {
  if (
    this.data[key] === null || typeof this.data[key] === 'undefined' ||
      this.data[key] === ''
  ) {
    this.canValidate = false;
  }
};

/**
 * 数字类型验证
 * @param  {String} key   检测数据的键值
 * @return {Validator}
 */
Validator.prototype.isNumber = function(key) {
  if (isNaN(Number(this.data[key]))) {
    this.throwError(key + '必须为Number类型');
  }

  return this;
};

/**
 * 字符串类型验证
 * @param  {String} key   检测数据的键值
 * @return {Validator}
 */
Validator.prototype.isString = function(key) {
  if (Object.prototype.toString.call(this.data[key]) !== '[object String]') {
    this.throwError(key + '必须为String类型');
  }
  return this;
};

/**
 * 数组类型验证
 * @param  {String} key   检测数据的键值
 * @return {Validator}
 */
Validator.prototype.isArray = function(key) {
  if (Object.prototype.toString.call(this.data[key]) !== '[object Array]') {
    this.throwError(key + '必须为Array类型');
  }
  return this;
};

/**
 * 长度检验
 * @param  {String} key   检测数据的键值
 * @param  {Number} length   长度
 * @return {Validator}
 */
Validator.prototype.isLength = function(key, length) {
  if (this.data[key] === null || typeof this.data[key] === 'undefined') {
    this.throwError(key + '不存在');
  } else if (this.data[key].toString().length != length) {
    this.throwError(key + '长度必须为' + length);
  }
  return this;
};

/**
 * 日期验证
 * @param  {String} key   检测数据的键值
 * @return {Validator}
 */
Validator.prototype.isDate = function(key) {
  var format = /[1|2]\d{3}[0|1][1-9][0-3]\d/;
  if (!format.test(this.data[key])) {
    this.throwError(key + '必须为YYYYMMDD格式或日期错误');
  }

  return this;
};

/**
 * 最大长度验证
 * @param  {String} key 检测数据的键值
 * @param  {Number} len 长度
 * @return {Validator}
 */
Validator.prototype.maxLength = function(key, len) {
  if (this.data[key].toString().length > len) {
    this.throwError(key + '的最大长度为' + len);
  }
  return this;
};

/**
 * 大于等于
 * @param  {String} key 检测数据的键值
 * @param  {Number} max 比较值
 * @return {Validator}
 */
Validator.prototype.large = function(key, max) {
  if (this.data[key] < max) {
    this.throwError(key + '小于' + max);
  }
  return this;
};

/**
 * 小于等于
 * @param  {String} key 检测数据的键值
 * @param  {Number} min 比较值
 * @return {Validator}
 */
Validator.prototype.less = function(key, min) {
  if (this.data[key] > min) {
    this.throwError(key + '大于' + min);
  }
  return this;
};
