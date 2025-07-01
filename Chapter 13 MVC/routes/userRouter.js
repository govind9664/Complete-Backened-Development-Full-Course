// Core Module
const path = require("path");

// External Module
const express = require("express");

// Local Module
const userRouter = express.Router();

const { getHomes } = require("../controllers/home");

userRouter.get("/", getHomes);

module.exports = userRouter;
