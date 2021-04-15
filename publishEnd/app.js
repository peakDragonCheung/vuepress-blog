const Koa = require('koa');
const cors = require('@koa/cors');
var fs = require('fs');
const { publish } = require('./publish')
const app = new Koa();
app.use(cors());
app.use(async ctx => {
  if(ctx.path === '/') {
    ctx.res.setHeader('Content-type','text/html;charset=utf-8');
    const result = fs.readFileSync('./publishEnd/publish.html','utf8');
    ctx.status = 200;
    ctx.res.end(result);
  }
  if(ctx.path === '/publish') {
    const result = await publish();
    ctx.body = result;
  }
  if(ctx.path !== '/' && ctx.path !== '/publish') {
     ctx.body = '大佬别连我的服务器啊。。。。。。。。。';
  }
  
});

console.log('开始监听......');

app.listen(3000);