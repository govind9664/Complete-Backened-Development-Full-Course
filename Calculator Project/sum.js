const sumRequestHandler = (req, res) => {
  console.log("In Sum Request Handler", req.url);
  const body = [];
  req.on("data", (chunk) => {
    body.push(chunk);
  });

  req.on("end", () => {
    const bodyStr = Buffer.concat(body).toString();
    const params = new URLSearchParams(bodyStr);
    const bodyObject = Object.fromEntries(params);
    const result = Number(bodyObject.first) + Number(bodyObject.second);
    console.log(result);

    res.setHeader("Content-Type", "text/html");
    res.write(`
        <html>
        <head>
        <title>Calculator Project</title>
        </head>
        <body>
            <h1>Your Sum is : ${result}</h1><br>
            <a href='/calculator'>Go to Calculator</a>
        </body>
        </html>
        `);
    return res.end();
  });
};

module.exports = sumRequestHandler;
