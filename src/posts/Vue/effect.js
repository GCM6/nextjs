

let activeEffect = null 
const bucket = new WeakMap();
const effectStack = [];
const jobQueue = new Set();

let arrInstrumentations = {};
let shouldTrack = true;
['push'].forEach(method => {
    const originMethod = Array.prototype[method];

    console.log("originMethod", originMethod);
    
    arrInstrumentations[method] = function(...args){
        shouldTrack = false;
       const res =  originMethod.apply(this, args);
        shouldTrack = true;
        return res;
    }
})



const p = Promise.resolve();
let isFlushing = false;
const flushJob = () => {
    if(isFlushing) return;
    isFlushing = true;
    // 微任务实现异步更新
    p.then(() => {
        jobQueue.forEach(job => job());
    }).finally(() => {
        isFlushing = false;
    })
}


const clearup = (effectFn) => {
    for(let i = 0; i < effectFn.deps.length; i++){
        const deps = effectFn.deps[i];
        deps.delete(effectFn);
    }
    effectFn.deps.length = 0;
}

const effect = (fn, options = {}) => {

    const effectFn = () => {
        clearup(effectFn);
        activeEffect = effectFn;
        effectStack.push(effectFn);
       const res =  fn();
        effectStack.pop();
        activeEffect = effectStack[effectStack.length - 1];
        return res;
    }
    effectFn.options = options;
    effectFn.deps = [];
    
    // 如果lazy为true 则不立即执行
    if(!options.lazy){
        effectFn()
    }
    return effectFn;
}

const track = (target, key) => {

    console.log("shouldTrack", shouldTrack, key,target);
    

    if(!activeEffect || !shouldTrack) return 

        let depsMap = bucket.get(target)
        if(!depsMap) {
            bucket.set(target, (depsMap = new Map()))
        }

        let deps = depsMap.get(key);
        if(!deps) {
            depsMap.set(key, deps = new Set())
        }

        deps.add(activeEffect);

        activeEffect.deps.push(deps)
        
        // console.log(1, activeEffect.deps);
        
        return target[key]
        
}

 const trigger = (target, key) => {
       const depsMap = bucket.get(target)
       if (!depsMap) return
       const effects = depsMap.get(key)
       const effectsToRun = new Set(effects);
       
       effects&&effects.forEach(effectFn => {
        if(effectFn !== activeEffect){
            effectsToRun.add(effectFn)
        }
        
       })

       effectsToRun.forEach(effectFn => {
        if(effectFn.options.scheduler){
            effectFn.options.scheduler(effectFn)
        }else{
            effectFn()
        }
       })
    
}

// 实现computed
const computed = (getter) => {
    // 缓存上一次的值
    let value;
    // 是否需要重新计算，默认为需要
    let dirty = true;

    const effectFn = effect(getter, {
        // 调度器
        scheduler(){
            if(!dirty){
                dirty = true;
                console.log("obj", obj);
                
                trigger(obj, 'value')
            }
        },
        lazy: true
    })
    
    const obj = {
        get value(){
            if(dirty){
                value = effectFn()
                dirty = false;
                track(obj, 'value')
            }
            return value;
        }
    }
    return obj
}

// 实现watch
const watch = (source, cb) => {
    let getter;
    if(typeof source === 'function'){
        getter = source;
    }else{
        getter = () => traverse(source)
    }

    let oldValue, newValue;
    
    const effectFn = effect(() => getter(), {
        lazy: true,
        scheduler(){
            console.log("scheduler", oldValue);
            newValue = effectFn();
            cb(newValue, oldValue);
            oldValue = newValue;//更新旧值，不然下一次会得到错误的旧值
        }
    });

    // 手动调用拿到的值就是旧值
    oldValue = effectFn();
    console.log("oldValue", oldValue);
    

}

const traverse = (source, seen = new Set()) => {
    if(typeof source !== 'object' || source === null || seen.has(source)) return;

    
    seen.add(source);
    console.log("seen", source);
    for(const key in source){
        traverse(source[key], seen)
    }

    return source;
}


const data = {
    name: '张三',
    age: 20,
    foo: 1,
    bar: 2
}
const reactiveMap = new Map();
function reactive(obj){
    const existProxy = reactiveMap.get(obj);
    if(existProxy) return existProxy;
    const proxy = createReactive(obj);
    reactiveMap.set(obj, existProxy);
    return proxy;
}

function createReactive(obj){
    return new Proxy(obj, {
        get(target, key, receiver){
            if(Array.isArray(target) && arrInstrumentations.hasOwnProperty(key)){
                return Reflect.get(arrInstrumentations, key, receiver)
            }

            track(target, key);
            
            return Reflect.get(target, key, receiver)
        },
        set(target, key, newVal){
            console.log("set--------", target, newVal);
            
            target[key] = newVal
            trigger(target, key)
        }
    })
}

const obj = new Proxy(data, {
    get(target, key, receiver){
    //    console.log("get", target === receiver.raw);
       
        track(target, key)
        return Reflect.get(target, key, receiver)
    },
    set(target, key, newVal){
        // 如果是true则是set 不然是add 新属性
        const tyep = Object.prototype.hasOwnProperty.call(target, key)
        target[key] = newVal
        trigger(target, key)
    },
    deleteProperty(target, key){
        const type = Object.prototype.hasOwnProperty.call(target, key)
        
    }
})

watch(obj, (newValue, oldValue) => {
    console.log('newValue', newValue, 'oldValue', oldValue);
})

const sum = computed(() => obj.foo + obj.bar);
// console.log('computed', sum.value);

effect(() => {
    console.log("sum-->", sum.value);
}
// ,{ scheduler: (effectFn) => {

//     jobQueue.add(effectFn)
//     flushJob()
// },

// }
)

setTimeout(() => {
    obj.foo++;
}, 1000)




const arr = reactive([1]);
effect(() => {
    // console.log('effect', arr);
    arr.push(1);
})


