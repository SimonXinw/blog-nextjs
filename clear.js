/* eslint-disable */
const fs = require('fs');
const path = require('path');

function delDir(path) {
  let files = [];
  if (fs.existsSync(path)) {
    files = fs.readdirSync(path);
    files.forEach((file, index) => {
      const curPath = path + '/' + file;
      if (fs.statSync(curPath).isDirectory()) {
        // 递归删除文件夹
        delDir(curPath);
      } else {
        // 删除文件
        fs.unlinkSync(curPath);
      }
    });
    fs.rmdirSync(path);
  }
}
try {
  delDir(path.resolve(__dirname, './.next'));
  delDir(path.resolve(__dirname, './out'));
  console.log('> Clear dir `.next` `out` success !');
} catch (error) {
  console.error('> ', error);

  console.log('> Clear dir `.next` `out` failed !');
}
