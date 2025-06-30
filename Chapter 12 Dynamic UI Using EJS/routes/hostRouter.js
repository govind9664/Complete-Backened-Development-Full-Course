// Core Module
const path = require("path");

// External Module
const express = require("express");

// Local Module

const hostRouter = express.Router();

hostRouter.get("/add-home", (req, res, next) => {
  res.render("addHome", { pageTitle: "Add Home to airbnb" });
});

const registeredHomes = [];

hostRouter.post("/add-home", (req, res, next) => {
  console.log(
    "Home Registration successful for:",
    req.body,
    req.body.houseName
  );
  registeredHomes.push({ houseName: req.body.houseName });
  res.render("homeAdded", { pageTitle: "Home Added Successfully" });
});

exports.registeredHomes = registeredHomes;
exports.hostRouter = hostRouter;
