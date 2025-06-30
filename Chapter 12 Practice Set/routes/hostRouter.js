// Core Module
const path = require("path");

// External Module
const express = require("express");

// Local Module

const hostRouter = express.Router();

hostRouter.get("/add-home", (req, res, next) => {
  res.render("addHome", {
    pageTitle: "Add Home to airbnb",
    currentPage: "addHome",
  });
});

const registeredHomes = [];

hostRouter.post("/add-home", (req, res, next) => {
  console.log("Home Registration successful for:", req.body);
  registeredHomes.push(req.body);
  res.render("homeAdded", {
    pageTitle: "Home Added Successfully",
    currentPage: "homeAdded",
  });
});

exports.registeredHomes = registeredHomes;
exports.hostRouter = hostRouter;
