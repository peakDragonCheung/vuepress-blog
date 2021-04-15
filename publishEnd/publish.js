const { exec } = require('child_process');

function publish() {
  return new Promise((res,rej) => {
    const execGit = exec('git pull', {
    });
    execGit.stdout.on('data', (data) => {
      console.log(`stdout: ${data}`);
    });
    
    execGit.on('error', (data) => {
      console.log('----------git pull 代码失败----------')
      console.error(`stderr: ${data}`);
      rej('拉去代码失败请查看服务器git');
    });
    
    execGit.on('close', (code) => {
      console.log('----------git pull 代码成功----------');
      const execPublish = exec('npm run build');
      execPublish.stdout.on('data', (data) => {
        console.log(`stdout: ${data}`);
      });
      
      execPublish.on('error', (data) => {
        console.log('----------发布失败----------')
        console.error(`stderr: ${data}`);
        rej('编译失败，请查看代码或依赖');
      });
      
      execPublish.on('close', (code) => {
        console.log('----------发布成功----------');
        res('ok')
      });
    });
  })
}


module.exports = {
  publish
}