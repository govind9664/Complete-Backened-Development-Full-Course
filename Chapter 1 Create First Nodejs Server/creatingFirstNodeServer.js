const http = require("http");

const server = http.createServer((req, res) => {
  console.log(req);
  process.exit();
});

const Port = 3001;
server.listen(Port, () => {
  console.log(`Server running on address http://localhost:${Port}`);
});
