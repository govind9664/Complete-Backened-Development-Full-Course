// External Module
const express = require("express");

// Local Module
const authRouter = express.Router();

const authController = require("../controllers/authController");

authRouter.get("/login", authController.getLogin);
authRouter.post("/login", authController.postLogin);
authRouter.post("/logout", authController.postLogout);

module.exports = authRouter;
