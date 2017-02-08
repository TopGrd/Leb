class Leb {
  constructor(options) {
    this.init(options);
  }

  init(options) {
    this.$options = options;3
    this.$el = document.querySelector(options.el);
    this.$data = options.data;
    this.$methods = options.methods;
    this.parseData(this.$data);
    this.parseFun(this.$methods);
  }

  convert(key, val) {
    Object.defineProperty(this.$data, key, {
      enumerable: true,
      configurable: true,
      get: function () {
        console.log(`get ${val}`);
        return val;
      },
      set: function (newVal) {
        console.log(`set ${newVal}`);
        val = newVal;
      }
    });
  }

  parseData(obj) {
    var value;
    for (let key in obj) {
      if (obj.hasOwnProperty(key)) {
        value = obj[key];
        if(typeof value ==='object'){
          this.parseData(value);
        }
        this.convert(key,value);
      }
    }
  }

  parseFun(methods) {
    var _this = this;
    for (let key in methods) {
      if (methods.hasOwnProperty(key)) {
        var fun = methods[key];
        methods[key] = (function () {
          return function () {
            fun.apply(_this.$data, arguments);
          }
        })();
      }
    }
  }
}
