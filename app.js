const http = require("http");

const requestHandler = require("./Parsing_Request");
const server = http.createServer(requestHandler);

const port = 3002;
server.listen(port, () => {
  console.log(`Server running on "http://localhost:${port}"`);
});
