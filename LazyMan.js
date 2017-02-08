class LazyManProto {
  constructor(name) {
    this.name = name;
    this.tasks = [];
    this.tasks.push(() => {
      console.log('Hi, this is ' + this.name);
      this.next();
    });

    setTimeout(() => {
      this.next();
    }, 0);
  }

  next() {
    let fn = this.tasks.shift();
    fn && fn();
  }

  sleep(time) {
    this.tasks.push(() => {
      setTimeout(() => {
        console.log('wait! i sleep ' + time + 'ms');
        this.next();
      }, time);
    });
    return this;
  }

  sleepFirst(time) {
    this.tasks.unshift(() => {
      setTimeout(() => {
        console.log('sleep first ' + time + 'ms');
        this.next();
      }, time);
    });
    return this;
  }

  eat(food) {
    this.tasks.push(() => {
      console.log('eat' + food);
      this.next();
    });
    return this;
  }
}

var LazyMan = name => new LazyManProto(name);
