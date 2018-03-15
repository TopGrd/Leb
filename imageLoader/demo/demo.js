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

function createProcess() {
  const div = document.createElement('div')
  div.style.width = '0px'
  div.style.height = '50px'
  div.style.backgroundColor = 'blue'
  div.style.border = '1px solid #000'
  document.body.appendChild(div)
  return div
}

const bar = createProcess()

const loader = new ImageLoader({
  urls: imgs,
  timeout: 0,
  update(val) {
    bar.style.width = `${val * 300}px`
  },
  completed() {
    console.log('已完成')
  },
})

loader.start()
