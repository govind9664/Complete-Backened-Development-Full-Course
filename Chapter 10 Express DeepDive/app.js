const express = require("express");
const bodyParser = require("body-parser");

const app = express();

app.use((req, res, next) => {
  console.log("First Dummy Middleware", req.url, req.method);
  next();
});

app.use((req, res, next) => {
  console.log("Second Dummy Middleware", req.url, req.method);
  next();
});

// app.use((req, res, next) => {
//   console.log("Third Dummy Middleware", req.url, req.method);
//   res.send("<h1> Welcome to the Third Middleware</h1>");
//   next();
// });

app.get("/", (req, res, next) => {
  console.log("Handling / for get", req.url, req.method);
  res.send("<h1> Welcome to the Home Page</h1>");
});

app.get("/contact-us", (req, res, next) => {
  console.log("Handling /contact-us for get", req.url, req.method);
  res.send(`<h1> Please give your details here for contact</h1>
            <form action='/contact-us' method = 'POST'>
                <input type="text" name="Username" placeholder="Enter your name" />
                <input type="text" name="Email" placeholder="Enter your email" />
                <input type="submit" value="Submit"/>
            </form>
            `);
});

app.post("/contact-us", (req, res, next) => {
  console.log(
    "First Handling /contact-us for post",
    req.url,
    req.method,
    req.body
  );
  next();
});

app.use(bodyParser.urlencoded());

app.post("/contact-us", (req, res, next) => {
  console.log("Handling /contact-us for post", req.url, req.method, req.body);
  res.send(
    "<h1> Thank you for your details. We will will contact you shortly...</h1>"
  );
});

const PORT = 3002;

app.listen(PORT, () => {
  console.log(`Server running on address http://localhost:${PORT}`);
});
