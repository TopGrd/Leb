function noop() {}
class ImageLoader {
  /**
   * Creates an instance of ImageLoader.
   * @param { urls, update, completed, timeout }
   * @param { 图片路径数组, 单张更新, 全部加载完成, 超时时间 }
   * @memberof ImageLoader
   */
  constructor({ urls, update, completed, timeout }) {
    this.$assets = urls
    this.$loaded = 0
    this.$timeout = timeout
    this.updateProcess = update || noop
    this.$percent = 0
    this.completed = completed || noop
  }

  loadImage(url) {
    const img = new Image()
    const self = this
    img.src = url

    img.onload = img.onerror = () => {
      this.update()
    }
  }

  start() {
    this.$assets.forEach(url => this.loadImage(url))
    this.$timer = setTimeout(() => {
      this.completed()
      this.completed = noop
    }, this.$timeout);
  }

  update(i) {
    this.$loaded++
    this.$percent = this.$loaded / this.$assets.length
    this.updateProcess(this.$percent)
    if (this.$percent === 1) {
      this.completed()
      clearTimeout(this.$timer)
    }
  }
}
