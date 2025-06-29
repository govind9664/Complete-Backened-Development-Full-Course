const http = require("http");
const testingSyntax = require("./syntax");
const runtimeError = require("./runtime_error");
const logicalError = require("./logical_error");

const server = http.createServer((req, res) => {
  console.log(req.url, req.method);
  // testingSyntax();
  // runtimeError();
  logicalError();
});

const PORT = 3001;
server.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
