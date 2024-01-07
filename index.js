const http = require("http");
const fs = require("fs");
const url = require("url");

const myServer = http.createServer((req, res) => {
  if ((req, url === "/favicon.ico")) return res.end();
  const log = `${Date.now()}:${req.method}:${req.url} New Request Received \n`;
  const myUrl = url.parse(req.url, true);
  console.log(myUrl); // Log outside the callback

  fs.appendFile("log.txt", log, (err) => {
    if (err) {
      console.error(err);
      res.status(500).end("Internal server error");
      // Exit the switch
    }

    switch (myUrl.pathname) {
      case "/":
        if (req.method === "GET") res.end("Homepage");
        res.end("Homepage");
        break;
      case "/about":
        const username = myUrl.query.myname;
        if (username) {
          res.end(`Hi ${username}`);
        } else {
          res.status(400).end("Invalid username");
        }
        break;
      case "/signup":
        if (req.method === "GET") res.end("This is signup form");
        else if (req.method === "POST");
        // DB Querry
        res.end("success");
      default:
        res.end("Not found");
    }
  });
});

myServer.listen(8000, () => console.log("Server started"));
