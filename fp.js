/**
 * debounce
 * @param  {Function} func    调用函数
 * @param  {Number} wait      延迟时间
 * @param  {Boolean} immediate true 先执行 false 尾执行
 * @return {Function}        实际调用
 */
function debounce(func, wait, immediate) {
  // 定义计时器
  var timeout;
  // 利用闭包保存定时器
  return function() {
    // 保存调用函数时的上下文与参数
    var context = this, args = arguments;
    // 每次函数被调用时，清除定时器。
    // 函数在wait时间后再被调用并且期间不被调用过，则调用func
    var later = function() {
      timeout = null;
      if (!immediate) func.apply(context, args);
    };
    var callNow = immediate && !timeout;
    console.log(timeout);
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
    if (callNow) func.apply(context, args);
  };
}

/**
 * once
 * @param  {Function} fn      调用函数
 * @param  {this}   context   上下文环境
 * @return {Any}           调用函数返回值
 */
function once(fn, context) {
  var result;
  return function() {
    if (fn) {
      result = fn.apply(context || this, arguments);
      fn = null;
    }
    return result;
  };
}
