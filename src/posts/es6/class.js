// super调用之前你没法给this 的属性赋值

class TaskWrapper {
    constructor() {
      console.log("父类构造");
      this.run();
    }
  }
  
  class DemoTask extends TaskWrapper {
    data;
    constructor() {
      // super执行的的时候，那个同步的newFn 实际上打印的是父类的实例上的data
      // 然后父类创建好了再回到子类的构造函数，然后成为了子类的实例
      // 子类的data就是undefined
      // 覆盖了
      // new的时候，先调用子类的构造函数，再调用父类的构造函数，
      // 父类的构造函数给子类的实例的data赋值为小明，
      // 同步代码中打印的是小明，父类构造函数调用完后，子类的构造函数又重新给data赋值了。
      super();
    }
  
    run() {
      return this.task();
    }
  
    task() {
      this.data = { name: "小明" };
  
      console.log(
        `in init', this.data);function fn(){console.log( in init fn`,
        this.data
      );
  
      function fn(){
          console.log( 'in init fn', this.data)
      }
  
      const newFn = fn.bind(this);
  
      // 这里打印:in init fn { name:'小明’}
  
      newFn();
  
      // 这里打印:in init fn undefined
  
      setTimeout(newFn, 2000);
  
      setTimeout(() => {
        //这里打印:in init Interval undefined
        console.log("in init Interval", this.data);
      }, 2000);
    }
  }
  
  new DemoTask();
  