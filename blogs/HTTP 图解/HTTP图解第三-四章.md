---
title: 《图解http》第三-四章
date: 2020-11-02
tags:
 - HTTP
categories:
 -  图解http
---

# 第三章 报文内的HTTP信息
### 简要
用于HTTP 协议交互的信息被称为HTTP 报文。 请求的端的HTTP 报文叫做请求报文。同理，响应端的叫做响应报文。HTTP 报文本身是多行（用CR + LF作换行符）数据构成的字符串文本。

而HTTP 报文一般分为 头部和主体部分，头部就是一些简要信息和关键信息。
一般请求头包括: 请求的方法 URL 和HTTP 版本
响应头包括：响应的状态码，原因短语和HTTP版本。
除了请求和响应的特殊头部，还有一些特殊的通用头，以及之后 新增的cookie ，以及 后来在其他端使用的token（自定义头）。

### 编码提升速率
一般在传输的时候，服务端会将数据进行编码，等降低传输的报文大小方法能够提升效率，但是会给计算增加压力。

### 压缩传输的内容编码

压缩传输，就是在我们传输的文件进行压缩传递，
压缩的方式有以下几种：

gzip(GUN zip)
compress(UNIX系统的标准压缩)
deflate(zlib)
identity(不进行编码)

### 分割发送的分块传输编码

顾名思义，也就是需要传输的内容，进行分割传输，这种分块传输编码（Chunked TransferCodeing）.
其实这种在其他层传输的也有用，在我们日常的 大块物件物流的时候也是这么进行分块传输的，但是这里，HTTP ,不仅可以分块传输，还可以分块显示。

### 发送多种数据的多部分对象集合
发送邮件时，使用了 MIME 机制，这个机制允许我们邮件可以传输多种不同类型的数据，图片等二进制数据以ASCII 码字符串编码的方式指明，

这种机制在web端的 表单上传的时候，广泛应用，
multipart/form-data 格式， 运行上传各种类型的文件。
multipart/byterangers 格式用来响应 部分资源的格式，

### 内容协商返回最合适的内容

一般在前后端传输数据的时候，请求头会携带一些
Accept
Accept-Charset 接受的字符集
Accept-Encoding 接受的编码方式
Accept-Language 接受的语言
Content-language 传递的语言


# 第四章 返回结果的HTTP状态码

这一章主要介绍响应码的类别和相关常用响应码

如下图响应码的首数字代表类型：

![响应类型](https://www.zhanglongfeng.cn/file/HTTP/4.1.png "响应类型")
所以一般 常用的是 2 开头， 4 开头 3 开头 5开头
其实发现一共的类型就这么些，

接下来详细接受不同数字的具体含义，

### 2XX 成功

2XX 一般就是成功请求，

#### 200 OK 
表示请求成功，且成功返回响应数据。

#### 204 No Content
表示请求成功，但是服务端没有返回主体，没有返回内容，只返回了响应头。

#### 206 Partial Content
这个对应前面说的，HTTP 进行了范围请求，服务端进行 范围回复，

### 3XX 重定向
一般告诉浏览器端，客户端，进行特殊的处理，再正确的处理请求。

#### 301 Moved Permanently
永久性重定向，该状态码，请求的资源已经被永久的转移到另外一个url, 以后使用资源应该是用响应头部的Location 首部字段提示的URL 重新保存
浏览器端需要重新记录url,如果你使用书签访问的话，就会更新书签。

#### 302 Found
临时性重定向，就是告诉浏览器，该资源临时换地址，现在可以跳过去，但是之后可能不一定还是这个地址，不要保存这个地址。

#### 303 See Other
303 和302 差不多，但是303 强调希望客户端（浏览器）去使用GET方法去请求重定向的资源。

#### 304 Not Modified
这个和重定向没有任何关系，是命中了强缓存，这个在后面说到浏览器的缓存的时候会说到，告诉浏览器之前的资源没有过去，继续使用缓存的资源。

#### 307 Temporary Redirect
临时重定向，和302 一样的意思， 禁止POST 变成GET，在307 这边就做到了大多数执行了这个标准， 302是完全不受标准，但是大家都使用302 多一点。

### 4XX 客户端错误

#### 400 Bad Request
客户端这边在请求的报文中存在语法错误，服务器识别不了，就会报错。

#### 401 Unauthorized
这个报错表示请求需要有HTTP 认证（BASIC 认证，DIGEST 认证） 用户认证失败， 并且第一次报401 的时候会弹窗提示对话窗口。

#### 403 Forbidden
服务端拒绝访问

#### 404 Not Found
这个一般都是我们 前端最常遇到的，一般是前端的url 写错了, 而找不到后台的资源。

### 5XX 服务端错误

#### 500 Internal Server Error
一般是服务器内部的错误，导致的，在前后端联调的时候一般直接就是后台的问题。

#### 503 Service Unavailable
该状态码表明服务器暂时处于超负载或正在进行停机维护，现在无法处理请求。如果事先得知解除以上状况需要的时间，最好写入Retry-After首部字段再返回给客户端。