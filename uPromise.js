/**
 * Promise的三种状态
 * @type {Number}
 */
var PENDING = 0;
var FULFILLED = 1;
var REJECTED = 2;
var noop = function () {};
/**
 * Promise类
 * @param  {Function} resolver
 */
function uPromise(resolver) {
  console.log(resolver);
  if (!_.isFunction(resolver)) {
    throw new TypeError(' Promise resolver undefined is not a function!')
  }

  this.state = PENDING; // 当前promise状态
  this.value = void 0; // state为FULFILLED时存储返回值 为REJECTED时返回错误值
  this.queue = []; // 回调队列
  if (resolver !== noop) {
    runResolverSafely(this, resolver)
  } else {
    return;
  }
}

/**
 * 安全执行resolver函数
 * @param  {Object} ctx  上下文执行环境，Promise实例
 * @param  {Function} then resolver
 * @return {Object}    Promise实例
 */
function runResolverSafely(ctx, then) {
  // 控制执行一次
  var called = false;
  try {
    then(function (value) {
      if (called) {
        return;
      }
      called = true;
      runResolve(ctx, value);
    }, function (error) {
      if (called) {
        return;
      }
      called = true;
      runReject(ctx, error);
    });
  } catch (error) {
    if (called) {
      return;
    }
    called = true;
    runReject(ctx, error);
  }
}

/**
 * 执行resolver函数里的resolve函数参数
 * @param  {Object} ctx   Promise实例的上下文执行环境
 * @param  {Any} value resolve函数的参数
 * @return {Promise}      此次Promise实例
 */
function runResolve(ctx, value) {
  try {
    var then = getThen(value);
    if (then) {
      runResolve(ctx, then);
    } else {
      ctx.state = FULFILLED;
      ctx.value = value;
      ctx.queue.map(function (item) {
        item.callFulfilled(value);
      });
    }
    return ctx;
  } catch (e) {
    return runReject(value);
  }
}

/**
 * 执行resolver函数里的reject函数参数
 * @param  {Object} ctx   Promise实例的上下文执行环境
 * @param  {Error} error 错误对象
 * @return {Promise}      此次Promise实例
 */
function runReject(ctx, error) {
  ctx.state = REJECTED;
  ctx.value = error;
  ctx.queue.map(function (item) {
    item.callRejected(error);
  });
  return ctx;
}

/**
 * 获取then
 * @param  {Object} obj
 * @return {Function}
 */
function getThen(obj) {
  var then = obj && obj.then;
  if (obj && (_.isObject(obj) || _.isFunction(obj)) && _.isFunction(then)) {
    return function appyThen() {
      then.apply(obj, arguments);
    };
  }
}

uPromise.prototype.then = function (onFulfilled, onRejected) {
  if (_.isFunction(onFulfilled) && this.state === FULFILLED || _.isFunction(onRejected) && this.state === REJECTED) {
    return this;
  }

  var promise = new this.constructor(noop);

  if (this.state !== PENDING) {
    var resolver = this.state === FULFILLED ? onFulfilled : onRejected;
    unwrap(promise, resolver, this.value);
  } else {
    this.queue.push(new QueueItem(promise, onFulfilled, onRejected));
  }

  return promise;
};

uPromise.prototype.catch = function (onRejected) {
  return this.then(null, onRejected);
};

function QueueItem(promise, onFulfilled, onRejected) {
  this.promise = promise;
  this.callFulfilled = function (value) {
    runResolve(this.promise, value);
  };
  this.callRejected = function (error) {
    runReject(this.promise, error);
  };

  if (_.isFunction(onFulfilled)) {
    this.callFulfilled = function (value) {
      unwrap(this.promise, onFulfilled, value);
    };
  }

  if (_.isFunction(onRejected)) {
    this.callRejected = function (error) {
      unwrap(this.promise, error);
    };
  }

}

function unwrap(promise, func, value) {
  _.defer(function () {
    var returnValue;
    try {
      returnValue = func(value);
    } catch (error) {
      return runReject(promise, error);
    }
    if (returnValue === promise) {
      runReject(promise, new Error('Cannot resolve promise with itself'));
    } else {
      runResolve(promise, returnValue);
    }
  });
}
