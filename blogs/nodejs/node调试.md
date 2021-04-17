---
title: node 谷歌浏览器调试
date: 2021-04-17
tags:
 - nodejs
categories:
 - nodejs
---

# nodejs 应用

## 准备一个node 应用 或者一串代码

```js
    // app.js
    const Koa = require('koa');
    const app = new Koa();

    app.use(async ctx => {
    ctx.body = 'Hello World';
    });

    console.log('开始监听')
    app.listen(3000);
```

本地写好nodejs 的代码，然后使用 `node --inspect app.js` 这样运行多了一个 `--inspect`,如下效果，

```
    > react-end-render@1.0.0 debugger E:\person-project\react-end-render
    > node --inspect app.js

    Debugger listening on ws://127.0.0.1:9229/2c20f6c7-45d3-4db1-93c6-ff077203d51b
    For help, see: https://nodejs.org/en/docs/inspector
    开始监听

```

## 打开谷歌浏览器

打开这个链接 `chrome://inspect/#devices`, 等待一会就可以看到 RomoteTarget。如下图：

![node 谷歌浏览器示意图](https://www.zhanglongfeng.cn/file/node/debugger/node-debugger.PNG);


点击这个 `inspect` 就会看到你的node 代码运行在谷歌浏览器的调试工具上了，就和你在浏览器上调试 js 代码一样。

![node 谷歌浏览器示意图](https://www.zhanglongfeng.cn/file/node/debugger/node-debugger2.png);

### 在你的代码中加入 debugger

```js
    const Koa = require('koa');
    const app = new Koa();

    app.use(async ctx => {
        debugger
        ctx.body = 'Hello World';

    });

    console.log('开始监听')
    app.listen(3000);

```

再重新运行刚才的脚本，再打开谷歌浏览器的刚才的链接，
在访问localhost:3000，就会看到代码运行到你的 断点处，就可以尽情的调试了。 如下图：


![node 谷歌浏览器示意图](https://www.zhanglongfeng.cn/file/node/debugger/node-debugger3.png);

这个时候只要丰富你的 node 代码就行可以了。