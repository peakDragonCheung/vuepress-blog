const { exec } = require('child_process');
const execGit = exec('git pull', {
});
execGit.stdout.on('data', (data) => {
  console.log(`stdout: ${data}`);
});

execGit.on('error', (data) => {
  console.log('----------git pull 代码失败----------')
  console.error(`stderr: ${data}`);
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
  });
  
  execPublish.on('close', (code) => {
    console.log('----------发布成功----------');
  });
});
