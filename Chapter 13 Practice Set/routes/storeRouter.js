// Core Module
const path = require("path");

// External Module
const express = require("express");

// Local Module
const storeRouter = express.Router();

const storeController = require("../controllers/storeController");
const Module = require("module");

storeRouter.get("/", storeController.getIndex);
storeRouter.get("/bookings", storeController.getBookings);
storeRouter.get("/homes", storeController.getHomes);
storeRouter.get("/favourites", storeController.getFavouriteList);

module.exports = storeRouter;
