// Core Module
const path = require("path");

// External Module
const express = require("express");

// Local Module
const rootDir = require("../utils/pathUtils");

const userRouter = express.Router();

userRouter.get("/", (req, res, next) => {
  res.sendFile(path.join(rootDir, "views", "home.html"));
});

module.exports = userRouter;
