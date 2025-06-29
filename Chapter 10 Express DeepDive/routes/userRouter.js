// Core module
const path = require("path");

// External module
const express = require("express");

// Local Module
const rootDir = require("../utils/pathUtils");
const userRouter = express.Router();

userRouter.get("/contact-us", (req, res, next) => {
  res.sendFile(path.join(rootDir, "views", "contactDetails.html"));
});

userRouter.post("/contact-us", (req, res, next) => {
  console.log(req.body);
  res.sendFile(path.join(rootDir, "views", "submitSuccessful.html"));
});

module.exports = userRouter;
