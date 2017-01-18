/**
* @Date:   2017-01-16T14:30:47+08:00
* @Email:  topgrd@outlook.com
* @Last modified time: 2017-01-17T10:41:24+08:00
*/

const sBtn = $('slideBtn');
const dh = $('dh');
const leftBox = $('leftBox');
const result = $('result');
var slideStartHandler, slideMoveHandler, slideEndHandler;
class Captcha {
  constructor(options) {
    this.options = options;
    this.isMobile = checkMobile();
    this.mousedown = false;
    this.result = false;
  }

  /**
   * 初始化
   */
  init() {
    let capt = this.createConcave();
    slideStartHandler = this.slideStartHandler.bind(this);
    slideMoveHandler = this.slideMoveHandler.bind(this);
    slideEndHandler = this.slideEndHandler.bind(this);
    this.view = capt;
    dh.style.top = this.options.uTop + 'px';
    if (this.isMobile && !this.result) {
      this.addEvent(sBtn, 'touchstart', slideStartHandler);
      this.addEvent(document, 'touchmove', slideMoveHandler);
      this.addEvent(document, 'touchend', slideEndHandler);
    } else {
      this.addEvent(sBtn, 'mousedown', slideStartHandler);
      this.addEvent(document, 'mousemove', slideMoveHandler);
      this.addEvent(document, 'mouseup', slideEndHandler);
    }
  }
  /**
   * 创建验证码区域
   */
  createConcave() {
    var cap = document.createElement('div');
    cap.id = 'noHave';
    this.setStyle(cap);
    var box = $('con');
    box.appendChild(cap);
    return cap;
  }

  /**
   * 设置元素样式
   */
  setStyle(element) {
    const options = this.options;
    const styleObj = {
      width: '32px',
      height: '32px',
      left: options.uLeft + 'px',
      top: options.uTop + 'px',
      background: options.background,
      position: 'absolute'
    };

    for (let attr in styleObj) {
      element.style[attr] = styleObj[attr];
    }
  }

  addEvent(target, event, handler) {
    target.addEventListener(event, handler, false);
  }

  releseEvent(target, event, handler) {
    target.removeEventListener(event, handler, false);
  }

  slideStartHandler(e) {
    this.mousedown = true;
    this.mouseup = false;
    e.preventDefault();
    this.diffX = (this.isMobile ? e.touches[0].clientX : e.clientX) -
      sBtn.offsetLeft;
  }

  slideMoveHandler(e) {
    if (!this.mousedown) {
      return;
    }

    this.left = (this.isMobile ? e.touches[0].clientX : e.clientX) - this.diffX;

    if (this.left < 0) {
      this.left = 0;
    } else if (this.left > 300 - sBtn.offsetWidth) {
      this.left = 300 - sBtn.offsetWidth;
    }

    sBtn.style.left = this.left + 'px';
    dh.style.left = this.left + 'px';
    leftBox.style.width = this.left + 'px';
  }

  slideEndHandler(e) {
    let distance = sBtn.offsetLeft - this.view.offsetLeft;
    if (distance >= 0 && distance <= 1 || distance <= 0 && distance >= -1) {
      this.mousedown = false;
      this.result = true;
      result.style.backgroundImage = 'url(./ok.png)';
      console.log('ok');
      if (this.isMobile) {
        this.releseEvent(sBtn, 'touchstart', slideStartHandler);
        this.releseEvent(document, 'touchmove', slideMoveHandler);
      } else {
        this.releseEvent(sBtn, 'mousedown', slideStartHandler);
        this.releseEvent(document, 'mousemove', slideMoveHandler);
      }

      return false;
    }

    if (!this.result) {
      sBtn.style.left = 0 + 'px';
      dh.style.left = 0 + 'px';
      leftBox.style.width = 0 + 'px';
    }

    this.mousedown = false;
    if (typeof sBtn.releaseCapture != 'undefined') {
      sBtn.releaseCapture();
    }
  }
}

/**
 * 获取元素
 * @param  {string} id
 * @return {dom}    dom元素
 */
function $(id) {
  let element = document.getElementById(id);
  return element;
}

function checkMobile() {
  var userAgentInfo = navigator.userAgent;
  var Agents = [
    'Android',
    'iPhone',
    'SymbianOS',
    'Windows Phone',
    'iPad',
    'iPod'
  ];
  var flag = false;
  for (var v = 0; v < Agents.length; v++) {
    if (userAgentInfo.indexOf(Agents[v]) > 0) {
      flag = true;
      break;
    }
  }
  return flag;
}

function selectRandom(start, end) {
  let choice = end - start + 1;
  return Math.floor(Math.random() * choice + start);
}

var uLeft = selectRandom(70, 300 - 50);
var uTop = selectRandom(0, 210 - 32);
var cap = new Captcha({ uLeft: uLeft, uTop: uTop, background: 'url(jc.png)' });
cap.init();
