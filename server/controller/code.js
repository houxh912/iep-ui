const fs = require('fs');
const path = require('path');

exports.getCode = async function (ctx) {
  console.log(ctx)
  const res = await readImg();
  // res 为 Buffer流
  if (res) {
    ctx.type = "application/octet-stream";
    ctx.body = res;
  }
}

function readImg () {
  // 创建可读流
  let data = [];
  return new Promise((res, rej) => {
    const realPath = path.resolve(__dirname, './code.jpg')
    const readerStream = fs.createReadStream(realPath);
    readerStream.on("data", function (chunk) {
      data.push(chunk);
    });
    readerStream.on("end", function () {
      const finalData = Buffer.concat(data); // 合并Buffer
      res(finalData);
    });
  });
}
