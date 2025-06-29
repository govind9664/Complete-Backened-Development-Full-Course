const sumRequestHandler = require("./sum");

const requestHandler = (req, res) => {
  console.log(req.url, req.method);
  if (req.url === "/") {
    res.setHeader("Content-Type", "text/html");
    res.write(`
        <html>
        <head>
        <title>Calculator Project</title>
        </head>
        <body>
            <h1> Welcome to Calculator</h1><br>
            <a href='/calculator'>Go to Calculator</a>
        </body>
        </html>
        `);
    return res.end();
  } else if (req.url.toLowerCase() === "/calculator") {
    res.setHeader("Content-Type", "text/html");
    res.write(`
        <html>
        <head>
        <title>Calculator Project</title>
        </head>
        <body>
            <h1> Welcome to Calculator</h1><br>
            <form action='/calculate-result' method='POST'>
                <input type='text' placeholder='First Number' name='first'/>
                <input type='text' placeholder='Second Number' name='second'/>
                <input type='submit' value='Sum'/>
        </body>
        </html>
        `);
    return res.end();
  } else if (
    req.url.toLowerCase() === "/calculate-result" &&
    req.method == "POST"
  ) {
    return sumRequestHandler(req, res);
  }
  res.setHeader("Content-Type", "text/html");
  res.write(`
        <html>
        <head>
        <title>Calculator Project</title>
        </head>
        <body>
            <h1>404 Page does not exist</h1><br>
            <a href='/'>Go to Calculator</a>
        </body>
        </html>
        `);
  return res.end();
};

module.exports = requestHandler;
