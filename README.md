# Leb

a personal lib for my work.

# include

* domReady (检测 dom 是否加载好，加载好则运行函数参数).

```js
domReady(function() {
  console.log('dom load')
})
```

* Validator (一个验证库，支持链式调用.)

```js
var validator = new Validator()
validator.injector({
  mark: 20,
  page: 100,
  count: 1000,
  name: 'javascript',
})
validator
  .check('mark', ['isNumber', 'isRequired'])
  .check('name', ['isString', 'isRequired', 10])
  .check('count', ['less(100)'])
```

* swipeCaptch (滑动验证初步 Demo，支持电脑与手机，用于校验人机)
* ajax (ajax 用 promise 封装)

```js
var options = {
  type: 'GET',
  url: 'http://5881b4a2b810b0120011a4bf.mockapi.io/jack',
  // 请求数据 为GET 可以是字符串 'xx=11'
  data： {
    id: 12,
    imgUrl: 'xxx'
  },
  // 设置请求头
  headers: {

  }
  // 异步为true
  asyn: true,
  // 发送请求前运行
  beforeSend: () => {
    console.log('before');
  }
};
ajax(options)
  .then(function (res) {
    console.info(res);
  })
  .catch(function (err) {
    console.warn(err);
  });
```

* Element (一个用类似 html 标签格式创建 dom 的方法)

```js
let fee = '20'
function createDiv() {
  return document.createElement('div')
}
let ul = el(
  'ul',
  {
    id: 'bookList',
  },
  [
    // 用函数创建的子元素(HTMLDivElement)
    createDiv(),
    // 用el方法创建的子元素(Element)
    el(
      'li',
      {
        class: 'item',
      },
      [
        el(
          'p',
          {
            id: 'lip',
            class: 'pen',
          },
          'Hello Virtual Element'
        ),
      ]
    ),
    el(
      'li',
      {
        class: 'item',
      },
      'item1'
    ),
    el(
      'li',
      {
        class: 'item',
      },
      [
        // 纯text的子元素
        '价格',
        el(
          'span',
          {
            id: 'fee',
          },
          '$' + fee
        ),
        el(
          'span',
          {
            id: 'node',
          },
          [
            el(
              'a',
              {
                id: 'aa',
                href: 'https://www.github.com',
              },
              'github'
            ),
          ]
        ),
      ]
    ),
  ]
)

let rootEle = ul.render()
let app = document.getElementById('app')
app.appendChild(rootEle)
```

* data-bind (用 es5 里 setter 和 getter 实现数据的绑定)

```js
var leb = new Leb({
  el: '#app',
  data: {
    count: 0,
  },
  methods: {
    increment: function() {
      this.count++
    },
  },
})
console.log(leb.data.count)
leb.methods.increment()
```

* uPromise (自己动手实现一个 Promise 类库)

```js
// test case
var a = 'ss'
var p = new uPromise((resolve, reject) => {
  setTimeout(() => {
    resolve(a)
  }, 500)
})
p
  .then(a => {
    return a + 'b'
  })
  .then(res => {
    return res + 'c'
  })
  .then(res => {
    console.log(res)
  })
```

* require.js AMD 模块加载的简陋实现

```js
// a.js
define('a', ['b'], function(b) {
  return b.name + ' is good'
})
// b.js
define('b', function() {
  return {
    name: 'topgrd',
    job: 'fe',
  }
})
// index.js
require(['a', 'b'], function(a, b) {
  console.log(a.job, b) // fe, topgrd is good;
})
```

* Middleware 中间件

```js
let app = new Middleware()
// 中间件函数参数为 共享的一个变量，和next eg: fn(ctx, next)
app
  .use(fn1)
  .use(fn2)
  .use(fn3)
app.run()
```

* ImageLoader 图片预加载 处理大量图片加载的情况 如 H5 动画

```js
const imgs = [
  'http://jbcdn2.b0.upaiyun.com/2018/02/a686d578afce3926f35c66390e12a98c.png',
  'https://static.oschina.net/uploads/space/2018/0228/150351_GomR_2903254.png',
  'http://jbcdn1.b0.upaiyun.com/2016/09/3652f87582bc97c7c99fb189bea05090.png',
  'http://jbcdn1.b0.upaiyun.com/2016/03/0fd998b50c73eaccea57afccd6d54f3e.png',
  'http://wx1.sinaimg.cn/mw690/bfdcef89gy1fknwaayew7j208c06ywf5.jpg',
  'http://jbcdn2.b0.upaiyun.com/2018/03/2027cffbb76ae2f928f2f1bb267ee1fb.png',
  'http://jbcdn1.b0.upaiyun.com/2016/11/6f247a88a00a924df5e4745fe5b368a1.png',
  'http://jbcdn1.b0.upaiyun.com/2016/09/3652f87582bc97c7c99fb189bea05090.png',
]

const loader = new ImageLoader({
  urls: imgs,
  timeout: 5000,
  update(val) {
    bar.style.width = `${val * 300}px`
  },
  completed() {
    console.log('已完成')
  },
})

loader.start()
```
