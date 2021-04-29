const fs = require('fs');
const path = require('path');
const FilePath = '/home/file/other';
// const FilePath = './test';
const uploadimg = (ctx) => {
    console.log(JSON.stringify(ctx.request, null, ' '));
    let remotefilePath = null;
    if (ctx.request.files['file']) {
      // 创建可读流
      const reader = fs.createReadStream(ctx.request.files['file']['path']);
      let filePath = `${path.resolve(__dirname, FilePath)}/${ctx.request.files['file']['name']}`;
      remotefilePath = `https://www.zhanglongfeng.cn/file/other/${ctx.request.files['file']['name']}`;
      // 创建可写流
      const upStream = fs.createWriteStream(filePath);
      // 可读流通过管道写入可写流
      reader.pipe(upStream);
    }
    return remotefilePath;
  }
  
  module.exports = uploadimg;