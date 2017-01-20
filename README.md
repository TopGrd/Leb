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
