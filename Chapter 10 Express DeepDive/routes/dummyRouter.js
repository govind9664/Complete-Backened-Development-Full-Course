// External module
const express = require("express");

const dummyRouter = express.Router();

dummyRouter.use((req, res, next) => {
  console.log("First Dummy Middleware", req.url, req.method);
  next();
});

dummyRouter.use((req, res, next) => {
  console.log("Second Dummy Middleware", req.url, req.method);
  next();
});

module.exports = dummyRouter;
