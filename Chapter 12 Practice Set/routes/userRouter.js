// Core Module
const path = require("path");

// External Module
const express = require("express");

// Local Module
const userRouter = express.Router();

const { registeredHomes } = require("./hostRouter");

userRouter.get("/", (req, res, next) => {
  console.log(registeredHomes);
  res.render("home", {
    registeredHomes: registeredHomes,
    pageTitle: "airbnb Home",
    currentPage: "home",
  });
});

module.exports = userRouter;
