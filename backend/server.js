const http = require("http");
require('dotenv').config();
const app = require("./app");

const port = 4200;
app.set("port", port);

const server = http.createServer(app);

server.listen(port);