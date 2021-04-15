const Koa = require('koa');
const cors = require('@koa/cors');
const { publish } = require('./publish')
const app = new Koa();
app.use(cors());
app.use(async ctx => {
  if(ctx.path === '/publish') {
    const result = await publish();
    ctx.body = result;
  } else {
    ctx.body = '大佬能不能别连我的服务器，我是一个弟弟啊'
  }
});

console.log('开始监听......');

app.listen(3000);