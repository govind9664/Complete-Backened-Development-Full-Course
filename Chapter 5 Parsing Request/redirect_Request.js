const http = require("http");
const fs = require("fs");

const server = http.createServer((req, res) => {
  console.log(req.url, req.headers, req.method);

  if (req.url === "/") {
    res.setHeader("Content-Type", "text/html");
    res.write("<html>");
    res.write("<head>");
    res.write("<title>Taking User Input</title>");
    res.write("</head>");
    res.write("<body> <h1>Enter your Details</h1><br><br>");
    res.write("<form action='/submit-details' method = 'POST'>");
    res.write(
      '<input type="text" name="username"  placeholder = "Enter your name" ><br>'
    );
    res.write('<label for="male">Male</label>');
    res.write('<input type="radio" id="male" name="gender" value="male"> ');
    res.write('<label for="female">Female</label>');
    res.write(
      '<input type="radio" id="female" name="gender" value="female"><br> '
    );
    res.write('<input type="submit" value="Submit">');
    res.write("</form>");
    res.write("</body");
    res.write("</html>");
    res.end();
    return;
  } else if (
    req.url.toLowerCase() === "/submit-details" &&
    req.method == "POST"
  ) {
    fs.writeFileSync("user.txt", "Govind Raj");
    res.statusCode = 302;
    res.setHeader("Location", "/");
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

const port = 3002;
server.listen(port, () => {
  console.log(`Server running on "http://localhost:${port}"`);
});
