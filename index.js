const http = require("http");
const fs = require("fs");
const url = require("url");
const server = http.createServer((req, res) => {
  const log = `${Date.now()}: ${req.method} ${req.url} - New request received\n`;
  const myurl = url.parse(req.url, true);
  console.log(myurl);

  fs.appendFile("log.txt", log, (err) => {
    if (err) {
      console.error("Error writing to log file:", err);
      res.statusCode = 500;
      return res.end("Internal Server Error");
    }

    switch (req.url) {
      case "/":
        res.end("Hello from the home page");
        break;
      case "/contact":
        res.end("Contact us");
        break;
      default:
        res.statusCode = 404;
        res.end("404 page");
    }
  });
});

server.listen(4000, () => {
  console.log("Server started on http://localhost:4000");
});
