---
title: 创建Vue 应用
date: 2018-05-31
tags:
 - Vue2.0
categories:
 -  Vue2.0
---

# 创建vue的应用

一，每一个应用都是用Vue函数的新建一个新的Vue实例开始的，

```javascript 
    vm = new Vue({
    //选项
    });
```

二，当一个Vue实例被创建的时候，响应式的系统加入了data对象中能被找到的所有属性，当这些属性被改变的时候，视图会得到相应的改变，就是匹配更新，新的值。
如下。例子

```javascript
var object = {
    a: 1
};

var vm = new Vue({
    data:object
});

vm.a == object.a //ture
vm.a = 10;
object.a ==10//ture

```

三，也可以访问vm实例中的属性，而不是data中的属性，即类似于jquery，

```javascript
var vm = new Vue*({
    el:'#mydiv'，
    data:a
});

```

在vm实例中我们可以访问到 实例通过加上美元符号$,

```javascript
vm.$el == document.getElementById('mydiv');//假设存在一个这样一个dom对象

vm.$data == data  //true

```