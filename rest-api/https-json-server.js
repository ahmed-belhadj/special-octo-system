// https-json-server.js
const jsonServer = require("json-server");
const https = require("https");
const path = require("path");
const fs = require("fs");

const server = jsonServer.create();
const router = jsonServer.router(path.join(__dirname, "data/db.json"));

const keyFile = path.join(__dirname, "server.key");
const certFile = path.join(__dirname, "server.cert");

server.use(middlewares);
server.use(router);

https
  .createServer(
    {
      key: fs.readFileSync(keyFile),
      cert: fs.readFileSync(certFile),
    },
    server
  )
  .listen(3001, () => {
    console.log("Running on https://localhost:3001/");
  });
