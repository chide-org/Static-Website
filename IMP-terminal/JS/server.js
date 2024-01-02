let http = require("http");
let fs = require("fs");

function backend(req, res) {
  res.writeHead(200, {
    "Content-Type": "application/json;charset=utf-8",
    "Access-Control-Allow-Methods": "*",
    "Access-Control-Allow-Origin": "*",
  });

  if (req.method === "GET") {
    if (fs.existsSync("text.txt")) {
      let text = fs.readFileSync("text.txt", "utf-8").toString();
      res.end(JSON.stringify({ data: text }));
    } else {
      res.end("{}");
    }
  } else if (req.method === "POST") {
    let newText = decodeURI(req.url.substring(1));
    console.log(newText); //检查substring
    fs.writeFileSync("text.txt", newText);
    res.end("{}");
  } else if (req.method === "DELETE") {
    fs.writeFileSync("text.txt", "");
    res.end("{}");
  } else {
    res.end("{}");
  }
}

http.createServer(backend).listen(3000);
console.log("服务启动！地址：http://localhost:3000/");
