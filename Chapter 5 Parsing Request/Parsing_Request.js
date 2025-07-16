const { error } = require("console");
const fs = require("fs");

const userRequestHandler = (req, res) => {
  console.log(req.url, req.method);

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
    // Reading Chunks
    const body = [];
    req.on("data", (chunks) => {
      console.log(chunks);
      body.push(chunks);
    });

    // Parsing Request
    req.on("end", () => {
      const parseBody = Buffer.concat(body).toString();
      console.log(parseBody);
      const params = new URLSearchParams(parseBody);
      //   const bodyObject = {};
      //   for (const [key, val] of params.entries()) {
      //     bodyObject[key] = val;
      //   }
      const bodyObject = Object.fromEntries(params);
      console.log(bodyObject);
      fs.writeFile("user.txt", JSON.stringify(bodyObject), (error) => {
        console.log("Data written successfully");
        res.statusCode = 302;
        res.setHeader("Location", "/");
        res.end();
        return;
      });
    });
  } else {
    res.setHeader("Content-Type", "text/html");
    res.write("<html>");
    res.write("<head>");
    res.write("<title>My First Page</title>");
    res.write("</head>");
    res.write("<body> <h1>Hello World</h1> </body>");
    res.write("</html>");
    res.end();
  }
};

module.exports = userRequestHandler;
