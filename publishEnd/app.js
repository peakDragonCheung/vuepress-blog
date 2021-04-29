const Koa = require('koa');
const cors = require('@koa/cors');
const static = require('koa-static');
const koaBody = require('koa-body');
const path = require('path');
const upLoadImage = require('./upload.js');
var fs = require('fs');
const { publish } = require('./publish')
const app = new Koa();
app.use(cors());
app.use(koaBody({
  multipart:true, // 支持文件上传
  encoding:'gzip',
  formidable:{
  //   uploadDir:path.join(__dirname,'public/upload/'), // 设置文件上传目录
    keepExtensions: true,    // 保持文件的后缀
    maxFieldsSize:2 * 1024 * 1024, // 文件上传大小
    onFileBegin:(name,file) => { // 文件上传前的设置
    },
  }
}));
app.use(static(path.join(__dirname,'./web')));

app.use(async (ctx, next)=> {
  if(ctx.path === '/publish') {
    const result = await publish();
    ctx.body = result;
  } else {
    next();
  }
});

app.use(async ctx => {
  if(ctx.req.url === '/upload') {
      const url = await upLoadImage(ctx);
      ctx.body = url;
      return
  }
});

console.log('开始监听......');

app.listen(3000);