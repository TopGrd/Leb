# Leb  
a personal lib for my work.  
# include  
* domReady   (检测dom是否加载好，加载好则运行函数参数).  
```js
  domReady(function () {
    console.log('dom load');
  })
```
* Validator  (一个验证库，支持链式调用.)  
```js
  var validator = new Validator();
  validator.injector({
    mark: 20,
    page: 100,
    count: 1000,
    name: 'javascript'
  });
  validator
    .check('mark', ['isNumber', 'isRequired'])
    .check('name', ['isString', 'isRequired', 10])
    .check('count', ['less(100)']);
```
* swipeCaptch (滑动验证初步Demo，支持电脑与手机，用于校验人机)  
* ajax (ajax用promise封装)  
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
* Element (一个用类似html标签格式创建dom的方法)  

```js  
let fee = '20';
function createDiv() {
  return document.createElement('div');
}
let ul = el('ul', {
  id: 'bookList'
}, [
  // 用函数创建的子元素(HTMLDivElement)
  createDiv(),
  // 用el方法创建的子元素(Element)
  el('li', {
    class: 'item'
  }, [
    el('p', {
      id: 'lip',
      class: 'pen'
    }, 'Hello Virtual Element')
  ]),
  el('li', {
    class: 'item'
  }, 'item1'),
  el('li', {
    class: 'item'
  }, [
    // 纯text的子元素
    '价格',
    el('span', {
      id: 'fee'
    }, '$' + fee),
    el('span', {
      id: 'node'
    }, [
      el('a', {
        id: 'aa',
        href: 'https://www.github.com'
      }, 'github')
    ]),
  ])
]);

let rootEle = ul.render();
let app = document.getElementById('app');
app.appendChild(rootEle);
```
* data-bind (用es5里setter和getter实现数据的绑定)  
```js
var leb = new Leb({
  el: '#app',
  data: {
    count: 0
  },
  methods: {
    increment: function () {
      this.count++;
    }
  }
});
console.log(leb.data.count);
leb.methods.increment();
```
* uPromise (自己动手实现一个Promise类库)
```js
// test case
var a = 'ss';
var p = new uPromise((resolve, reject) => {
  setTimeout(() => {
    resolve(a);
  }, 500);
});
p
.then(a => {
  return a + 'b';
})
.then(res => {
  return res + 'c';
})
.then(res => {
  console.log(res);
});
```
