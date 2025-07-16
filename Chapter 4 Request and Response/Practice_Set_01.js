const http = require("http");

const server = http.createServer((req, res) => {
  console.log(req.url, req.method, req.headers);
  if (req.url.toLowerCase() === "/home") {
    res.setHeader("Content-Type", "text/html");
    res.write("<html>");
    res.write("<head>");
    res.write("<title>Myntra Project</title>");
    res.write("</head>");
    res.write("<body> <h1>Welcome to the Home</h1> </body>");
    res.write("</html>");
    return res.end();
  } else if (req.url.toLowerCase() === "/women") {
    res.setHeader("Content-Type", "text/html");
    res.write("<html>");
    res.write("<head>");
    res.write("<title>Myntra Project</title>");
    res.write("</head>");
    res.write("<body> <h1>Welcome to the Women</h1> </body>");
    res.write("</html>");
    return res.end();
  } else if (req.url.toLowerCase() === "/kids") {
    res.setHeader("Content-Type", "text/html");
    res.write("<html>");
    res.write("<head>");
    res.write("<title>Myntra Project</title>");
    res.write("</head>");
    res.write("<body> <h1>Welcome to the Kids</h1> </body>");
    res.write("</html>");
    return res.end();
  } else if (req.url.toLowerCase() === "/cart") {
    res.setHeader("Content-Type", "text/html");
    res.write("<html>");
    res.write("<head>");
    res.write("<title>Myntra Project</title>");
    res.write("</head>");
    res.write("<body> <h1>Welcome to the Cart</h1> </body>");
    res.write("</html>");
    return res.end();
  } else if (req.url.toLowerCase() === "/men") {
    res.setHeader("Content-Type", "text/html");
    res.write("<html>");
    res.write("<head>");
    res.write("<title>Myntra Project</title>");
    res.write("</head>");
    res.write("<body> <h1>Welcome to the Men</h1> </body>");
    res.write("</html>");
    return res.end();
  }
  res.setHeader("Content-Type", "text/html");
  res.write("<html>");
  res.write("<head>");
  res.write("<title>Myntra Project</title>");
  res.write("</head>");
  res.write("<body>");
  res.write("<h1>Welcome to the Myntra Page</h1><br><br>");
  res.write("<nav><ul>");
  res.write("<li><a href='/home'>Home</a></li><br><br>");
  res.write("<li><a href='/men'>Men</a></li><br><br>");
  res.write("<li><a href='/Women'>Women</a></li><br><br>");
  res.write("<li><a href='/Kids'>Kids</a></li><br><br>");
  res.write("<li><a href='/cart'>Cart</a></li><br><br>");
  res.write("</ul></nav>");
  res.write("</body>");
  res.write("</html>");
  return res.end();
});

const port = 3003;
server.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
