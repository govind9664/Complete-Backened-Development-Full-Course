const http = require("http");

const server = http.createServer((req, res) => {
  console.log(req.url, req.method, req.headers);

  if (req.url === "/") {
    res.setHeader("Content-Type", "text/html");
    res.write("<html>");
    res.write("<head>");
    res.write("<title>My First Page</title>");
    res.write("</head>");
    res.write("<body> <h1>Welcome to the Home</h1> </body>");
    res.write("</html>");
    res.end();
    return;
  } else if (req.url === "/products") {
    res.setHeader("Content-Type", "text/html");
    res.write("<html>");
    res.write("<head>");
    res.write("<title>My First Page</title>");
    res.write("</head>");
    res.write("<body> <h1>Check out our Products</h1> </body>");
    res.write("</html>");
    res.end();
    return;
  }
  res.setHeader("Content-Type", "text/html");
  res.write("<html>");
  res.write("<head>");
  res.write("<title>My First Page</title>");
  res.write("</head>");
  res.write("<body> <h1>Hello World</h1> </body>");
  res.write("</html>");
  res.end();
});

const Port = 3001;
server.listen(Port, () => {
  console.log(`Server running on address http://localhost:${Port}`);
});
