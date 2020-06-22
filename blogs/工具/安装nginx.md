---
title: nginx的安装步骤
date: 2020-6-18
tags:
 - nginx
categories:
 -  工具
---

# nginx的安装步骤

## 概述
    在Centos下，yum源不提供nginx的安装，可以通过切换yum源的方法获取安装。也可以通过直接下载安装包的方法，
    **以下命令均需root权限执行**：
    首先安装必要的库（nginx 中gzip模块需要 zlib 库，rewrite模块需要 pcre 库，ssl 功能需要openssl库）。选定**/usr/local**为安装目录，以下具体版本号根据实际改变。

### 1. 安装gcc gcc-c++

```shell
# yum install -y gcc gcc-c++
```

### 2. 安装PCRE库
```shell
# cd /usr/local/
# wget http://jaist.dl.sourceforge.net/project/pcre/pcre/8.33/pcre-8.33.tar.gz
# tar -zxvf pcre-8.33.tar.gz
# cd pcre-8.33
# ./configure
# make && make install
```

### 3. 安装SSL库

```shell
# cd /usr/local/
# wget https://www.openssl.org/source/old/1.0.1/openssl-1.0.1j.tar.gz
# tar -zxvf openssl-1.0.1j.tar.gz
# cd openssl-1.0.1j
# ./config
# make && make install
```

### 4. 安装zlib库

```shell
# cd /usr/local/
# wget http://zlib.net/zlib-1.2.11.tar.gz
# tar -zxvf zlib-1.2.11.tar.gz
# cd zlib-1.2.11
# ./configure
# make && make install
```
### 5.  安装nginx(本安装为1.8.0版本)

```shell
# cd /usr/local/
# wget http://nginx.org/download/nginx-1.8.0.tar.gz
# tar -zxvf nginx-1.8.0.tar.gz
# cd nginx-1.8.0 
# ./configure --user=nobody --group=nobody --prefix=/usr/local/nginx --with-http_stub_status_module --with-http_gzip_static_module --with-http_realip_module --with-http_sub_module --with-http_ssl_module --with-pcre=/usr/local/pcre-8.33 --with-zlib=/usr/local/zlib-1.2.11
(注: --with-http_ssl_module:这个不加后面在nginx.conf配置ssl:on后,启动会报nginx: [emerg] unknown directive "ssl" in /opt/nginx/conf/nginx.conf 异常)
# make && make install

```
##  nginx操作命令

### 1 启动nginx服务

::: tip
或者在当前目录下运行nginx 命令也可以
:::

```shell
# /usr/local/nginx/sbin/nginx
```

### 2 重启nginx服务
```shell
# /usr/local/nginx/sbin/nginx –s reload

```
### 3 停止nginx服务

```shell
# /usr/local/nginx/sbin/nginx –s stop
```
### 4  强制关闭nginx服务

```shell
# pkill nginx
```















