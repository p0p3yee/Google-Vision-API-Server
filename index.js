#!/bin/node
require("dotenv").config();
const bodyParser = require("body-parser")
const server = require("./src/Server");
const router = require("./src/Routes");
const PORT = process.env.port || 8080;

server.use(bodyParser.json({ limit: "50mb" }));
server.use(bodyParser.urlencoded({ extended: true, limit: "50mb" }));
server.use("/", router);
server.listen(PORT, console.log(`Server Started. Listening on PORT: ${PORT}`));