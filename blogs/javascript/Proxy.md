---
title: Proxy
date: 2021-04-10
tags:
 - javascript
categories:
 -  javascript
---

# Proxy

## 概念 

代理的概念，可能就和设计模式中的代理模式很像，利用代理对象去操作实际的对象或者实例，在代理中进行拦截或者校验防止出现一些无效的行为。

es6 中新增的这个概念就是完全新出的特性，是无法使用 es5中的代码进行模拟的，尽管可以模拟出get 和set 的获取器，但是其他的特性是无法模拟的，如数组的操作，Vue2.0 中的数据中的拦截操作是使用 `Object.defineProperties` 或者 `Object.defineProperty`, 进行属性的 set 和 get 的操作，从而拦截属性，收集依赖，进行数据响应式的变化， 美中不足的是，无法监听数组中 元素的添加和删除，只能监听整个数组的替换，从而达到重新渲染。 

但是在Vue 3 中可以使用 `Proxy` 的特性进行模拟，达到更好的效果，即使是数组也可以进行监听。

接下来就和我一起进行Proxy的学习吧。

## 创建代理
代理是使用 `Proxy` 函数创建的，

例子如下：

```typescript
    const target: {
        name?: string;
        age?:number
    } = {
        name: 'zhanglongfeng'
    }
    const hander = {
    }
    const proxy = new Proxy(target,hander);
    console.log('target.name',target.name); // target.name zhanglongfeng
    console.log('proxy.name',proxy.name); // proxy.name zhanglongfeng

    target.age = 25;
    console.log('target.age',target.age); // target.age 25
    console.log('proxy.age',proxy.age); // proxy.age 25

    // hasOwnProperty
    proxy.hasOwnProperty('name'); // true
    target.hasOwnProperty('name'); // true

    // Proxy.prototype 是 undefined

    console.log( target instanceof Proxy) // 
    /**
     * VM346:1 Uncaught TypeError: Function has non-object prototype 'undefined' in instanceof check
        at Function.[Symbol.hasInstance] (<anonymous>)
        at <anonymous>:1:21
        (anonymous) @ VM346:1
    */

    console.log( proxy instanceof Proxy) // 如上错误

    console.log(proxy === target) // false
 
```
这个是一个空代理， 不做任何的拦截，对代理对象的操作就和操作原对象一样的操作，打印一样的结果。

说玩普通的代理对象如何操作，那么接下来开始要做一些特殊的拦截啦，称作 捕捉器

## 捕捉器

捕捉器就是可以定义在普通对象中基本操作的拦截器，意思就是，基本对象的一些基本操作，如赋值，取值，等基本操作，在对象在进行基本操作之前，运行的相应的函数，从而进行拦截，进行校验。

### get 捕捉器

顾名思义，就行进行获取值操作的时候设置的，

```typescript

const target = {
    name: '何雅虹'
};

const hander = {
    get() {
        return '何雅虹是猪'
    }
}

const proxy = new Proxy(target, hander);
console.log(proxy.name); // 何雅虹是猪
target.age = 11;
console.log(target.age) // 何雅虹是猪
```
这里会拦截所有的获取操作,不管是是否先后赋值操作， 只要是获取值操作都会走这个拦截器， 这个和 es5 的 `defineProperty` 不一样, `defineProperty` 只能定义单个字段的 get set 操作。

说一下如何触发这个get 的形式，ECMAScript 中获取对象中值的操作有许多， 如 proxy.propert proxy[propert] Object.create(proxy)[propert] 等操作，只要是获取值操作。

这里就不举例列举代码了。在这里是否有疑问，Vue 如何通过这个简单的 get 去收集依赖呢，如何判断获取的是哪个属性，就像上面的例子一样，获取 age 和 name 时都只会返回一个相同的字符串。肯定是不符合实际场景的，我们要根据不同的 key 返回不同的值。

