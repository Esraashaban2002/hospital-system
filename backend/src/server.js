const app = require("./app");
const http = require("http");
const connection = require("./db/connection");
const { Server } = require("socket.io");

const PORT = process.env.PORT || 3000;
const server = http.createServer(app);

connection;

server.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
