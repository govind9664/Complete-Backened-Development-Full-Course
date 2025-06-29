// Core module
// const http = require("http");

// Local module
const userRequestHandler = require("./Parsing_Request");

// External module
const express = require("express");

const app = express();

app.get("/", (req, res, next) => {
  console.log("Came in First Middleware", req.url, req.method);
  next();
});

app.post("/submit-details", (req, res, next) => {
  console.log("Came in Second Middleware", req.url, req.method);
  res.send("<p>Welcome to the Express Js");
});

app.use("/", (req, res, next) => {
  console.log("Came in another Middleware", req.url, req.method);
  res.send("<p> Came from another Middleware</p>");
});

const PORT = 3001;
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
