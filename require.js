

(function (root) {
  var context = {
    topModule: '',
    modules: {},
    loaded: [],
    waiting: []
  };

  function genId() {
    var time = new Date().getTime();
    return time.toString(36);
  }

  function checkLoaded(dep) {
    return context.loaded.indexOf(dep) > -1;
  }

  function checkAllLoaded() {
    return context.waiting.length === 0;
  }

  root.define = function (name, deps, callback) {
    // 无name require(['a', 'b'], function() {})
    if (typeof name !== 'string') {
      callback = deps;
      deps = name;
      name = null;
    }

    // 无deps require('a', function() {}) || require(function() {})
    if (!Array.isArray(deps)) {
      callback = deps;
      deps = null;
    }

    name ? name : name = genId();

    var module = {
      name: name,
      deps: deps,
      callback: callback,
      callbackReturn: null,
      args: []
    };

    context.modules[name] = module;
    if (deps !== null) {
      deps.map(function(item) {
        if (!checkLoaded(item)) {
          context.waiting.push(item);
        }
        return item;
      });
    }

  }

  root.require = function (deps, callback) {
    if (!Array.isArray(deps)) {
      callback = deps;
      deps = null;
    }
    var topId = genId();
    context.topModule = topId;

    var obj = {};
    obj = {
      name: topId,
      deps: deps,
      callback: callback,
      callbackReturn : null,
      args: []
    };

    context.modules[topId] = obj;

    deps.map(function(item) {
      if (!checkLoaded(item)) {
        context.waiting.push(item);
      }
      return item;
    });

    context.waiting.map(function (dep) {
      loadScript(dep);
    });
  }

  function loadScript(dep) {
    var script = document.createElement('script');
    script.src = './js/' + dep + '.js';;
    script.setAttribute('data-module', dep);
    script.async = true;
    document.querySelector('head').appendChild(script);
    script.onload = loadAfter;
  }

  function loadAfter(e) {
    console.log(e.target.dataset.module);
    var loadModule = e.target.dataset.module;
    context.loaded.push(loadModule);
    var index = context.waiting.indexOf(loadModule);
    context.waiting.splice(index, 1);

    if (!checkAllLoaded()) {
      return;
    } else {
      var topModule = context.modules[context.topModule];
      execCallback(topModule);
    }
  }

  // 执行回调
  function execCallback(module) {
    var args = module.args;
    if (module.deps && module.deps.length !== 0) {
      module.deps.map(function (item, i) {
        args[i] = execCallback(context.modules[item]);
      });
    }
    return module.callback.apply(module, args);
  }
})(this);
