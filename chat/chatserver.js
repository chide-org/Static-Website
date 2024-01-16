const fs = require("fs");
const http = require("http");
const path = require("path");

http.createServer(backend).listen(3002, "0.0.0.0");
console.log("服务启动！地址：http://118.195.213.9:3002/");

function backend(req, res) {
  res.writeHead(200, {
    "Content-Type": "application/json;charset=utf-8",
    "Access-Control-Allow-Methods": "*",
    "Access-Control-Allow-Origin": "*",
  });
  //GET
  if (req.method === "GET") {
    if (fs.existsSync("./text.txt")) {
      let text = fs.readFileSync("./text.txt", "utf-8").toString();
      res.end(JSON.stringify({ data: text }));
    } else {
      res.end("{}");
    }

    //POST
  } else if (req.method === "POST") {
    let body = "";
    req.on("data", (chunk) => {
      body += chunk;
    });
    req.on("end", () => {
      console.log("Received data:", body);
      res.end("Data received successfully!");
      fs.writeFileSync("./text.txt", body);
    });

    //DELETE
  } else if (req.method === "DELETE") {
    fs.writeFileSync("./text.txt", "");
    res.end("{}");
  } else {
    res.end("{}");
  }
}
