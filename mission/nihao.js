//
const http = require("http");
const fs = require("fs");
const path = require("path");

const server = http.createServer((req, res) => {
  const url = req.url;
  console.log("#" + req + "#");
  console.log(url);
  console.log(req.headers);
  console.log(req.method);
  console.log(req.query);
  console.log(req.cookies);

  //html
  if (url === "/") {
    const htmlPath = path.join(__dirname, "misson.html");
    return pullFile(htmlPath, "text/html", res);
  }
  //css
  else if (url === "/misson.css") {
    const cssPath = path.join(__dirname, "misson.css");
    return pullFile(cssPath, "text/css", res);
  }
  //js
  else if (url === "/misson-1.js") {
    const jsPath = path.join(__dirname, "misson-1.js");
    return pullFile(jsPath, "application/javascript", res);
  }
  //source
  else if (url.startsWith("/source/")) {
    const sourcePath = path.join(__dirname, url);
    return pullFile(sourcePath, "image/png", res);
  }
  //else
  res.writeHead(404, { "Content-Type": "text/plain; charset=utf-8" });
  res.end("没有找到请求的文件");
});

function pullFile(filePath, contentType, res) {
  fs.readFile(filePath, (err, content) => {
    if (err) {
      console.log(err);
      res.writeHead(500, { "Content-Type": "text/plain; charset=utf-8" });
      res.end("读取文件错误");
    } else {
      res.writeHead(200, { "Content-Type": contentType });
      res.end(content);
    }
  });
}

server.listen(3000, "0.0.0.0", () => {
  console.log(`服务启动，地址http://118.195.213.9:3000`);
});
