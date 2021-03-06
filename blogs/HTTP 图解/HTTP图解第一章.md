---
title: 《图解http》第一章
date: 2020-11-01
tags:
 - HTTP
categories:
 -  图解http
---

# 第一章 了解Web 及网络基础 《图解http》


Web 是使用 HTTP 来进行通讯交流数据和知识的，Web页面就是用来展示你从别人那里获取到的知识，或者资源，来展示的。而进行通讯，网络端有很多人，为了让不同的人，都能相互通讯，必然是大家都要用同一种技术或者标准进行通讯，换句话说，我怎么知道你给我的是什么，我怎么给你，你才能接受到我想给你的，这个就是标准，

HTTP 协议就出生了，（HyperText Transfer Protocol,超文本传输协议）将大家彼此之间通讯的一些默认步骤，给统一下来了，大家只管给出自己想要分享的内容即可，其他的走专门的标准协议即可，浏览器和服务器自然帮我们处理好。

这里省略了两个概念，客户端和服务端，其实没有绝对的客户端和服务端，只是在传输消息时，扮演的角色和作出相应的反应不同而来命名的。

我要把我的电话号码给你，那我就是 广义的客户端，你就是广义的服务端，或者是，我向你询问去万达广场的路怎么走， 你回答我，那我便是客户端，你便是服务端。一个发问一个回答。

`HTTP 通常为超文本传输协议，其实这个翻译是不标准的， 严谨一点的翻译，应当是 “超文本转移协议”。`

## 网络基础TCP/IP

TCP/IP 其实是 一种泛指叫法， HTTP 其实只是 网络通讯中上层的协议标准其中的一种，我们要学习HTTP 当然也要学习 它下层的协议。

就如同我们写代码一样，学习框架一样，Vue 框架，是如果创造出来的，使用框架的路上如果发生了一些内部的一些bug 如果不同框架实现的细节，也很难去定位，去优化代码。

学过计算机网络的就知道，网络传输过程中，分为多个层，多层架构，方便我们去修复问题，方便我们去升级标准，不用动一发而牵全身。


#### 应用层

HTTP协议，FTP协议，DNS 域名系统 等等，

#### 传输层
传输层对上层传下来的 数据报，进行封装，有 TCP（传输控制协议） UDP（用户数据报协议）详细这两种有什么不同，可以自行去查阅，

#### 网络层

网络其实就有点像我们的 物流系统，定义了一些 网络 ip地址，和电脑的物理地址，就是所谓的MAC地址，你可以理解为 你身份证上的 家里地址，基本就不会有重复的。在这一层，将数据进行加工，分段，标记，通过寻找 发送的目标地址。

#### 链路层
属于硬件范畴了，光纤，双绞线，电话线，等等，这里就离得比较远了，可以深入学习 计算机网络 进行了解

这四层的关系如下图

![TCP/IP 图解](https://www.zhanglongfeng.cn/file/HTTP/1.1.png "TCP/IP 图解")

清晰明了，每一层对应处理每一层的数据，而且每一层都无感自己到底是第几层，不用关心，分层架构，也是广泛的应用在我们的软件开发过程中，

例子1. 书写 vue react 代码的时候，jsx ，es6 ，等高级用法，浏览器不适配，识别不了，就可以在打包时进行转化，编译成浏览器识别的静态资源。 也方便了浏览器去升级，不用管渲染的上层技术是 什么。

例子2. React-native 的实现， 在原生层，安卓 或者ios，我们我们可以通过 书写js代码 去控制native 页面的绘制，在上层，也就是 react-native 层面去写我们的代码。 RN 会将代码编译好，编译成jsbundle，原型端去执行这个代码，facebook 的工程师帮我们 写好安卓和 ios 对接的代码。

服务端也有很多类似的架构，都是基于分层架构，spring， 据我了解， controller 层，service 层，dao层。 不同层做不同的事情。


## 与HTTP 密切相关的是，IP TCP， DNS

通过在浏览器上输入 URL 统一定位符，前面说到，网络层负责寻找想要传递的计算机或者目标服务器，网络层需要知道ip地址进行寻找，那么URL不一定就是 ip地址， 一般都是 字符和数字的组合，这种方便人们记忆，此时就需要，DNS服务器 去记录相应 域名（也就是字母和数字的组合名称）和ip地址的映射关系，这里区分好几种 域名服务器，IP间的通讯是通过MAC地址， 在一个局域网中 情况很小，一般是通过 路由器转发，寻找，ARP 就是用来 解析地址的协议，用在网络层， 通过IP地址 反查出对应计算机的MAC地址。





