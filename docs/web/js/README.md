# 手写Promise

### 简易版 `Promise` 

```` javascript
const PENDING = 'pending';
const RESOLVER = 'resolved';
const REJECTED = 'rejected';

function MyPromise(fn){
    const that = this;
    that.state = PENDING;
    that.value = '';
    that.resolvedCallbacks = [];
    that.rejectedCallbacks = [];
}
````
::: tip
* 首先声明3个常量表示状态, 对于一些经常使用的值 都应该通过常量管理, 便于开发及后期维护
* 在函数体 内部 用 `that` 获取正确的 `this` 指向, 因为代码会异步执行.
* 一开始 `Promise` 的状态 是`pending `
* `value` 保存`resolve` 或者 `reject` 中传入的值.
* `resCallback `和 `rejCallback` 用于保存 `then` 的回调, 因为当执行完 `promise` 时 状态可能还是等待挂起中, 这时候应该把 `then` 中的回调保存力气用于改变状态.
:::
**接下来完善 resolve reject 函数, 添加在MyPromise 内部**
```js
function resolve(value) {
    if (that.state === PENDING){
        that.state = RESOLVED;
        thia.value = value;
        that.resolvedCallbacks.map(cb -= >cb(that.value));
    }
};

function reject(fn) {
    if (that.state === PENDING){
        that.state = REJECTED;
        that.value = value;
        that.rejectedCallBacks.map(cb => cb(that.value))
        
    }
}

```
::: tip
- 两个函数都必须先判断是否为挂起, 因为规范规定 只有挂起状态 才可改变.
- 将当前状态改变, 并赋值value
- 遍历回调数组 执行.
:::
**然后实现then 函数**
``` javascript
    MyPromise.prototype.then = function (onFulfilled, onRejected) {
        const that = this;
        onFulfilled = typeof onFilfilled === 'function' ? onFulfilled : v => v;
        onRejected = typeof onRejected === 'function' ? onRejected : r => { throw r };
        
        if (that.state === PENDING) {
          that.resolvedCallbacks.push(onFulfilled)
          that.rejectedCallbacks.push(onRejected)
        }
        if (that.state === RESOLVED) {
          onFulfilled(that.value)
        }
        if (that.state === REJECTED) {
          onRejected(that.value)
        }  
    }
```

