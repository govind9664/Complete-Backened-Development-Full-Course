// Core Module
const path = require("path");

// External Module
const express = require("express");
const { default: mongoose } = require("mongoose");
const cors = require("cors");
const DB_URL =
  "mongodb+srv://root:Govind@completecoding.pclg6rk.mongodb.net/todo?retryWrites=true&w=majority&appName=CompleteCoding";

//Local Module
const todoItemsRouter = require("./routes/todoItemsRouter");
const errorsController = require("./controllers/errors");
const app = express();

app.use(express.urlencoded());
app.use(express.json());
app.use(cors());

app.use("/api/todo-items", todoItemsRouter);

app.use(errorsController.pageNotFound);

const PORT = 3000;

mongoose
  .connect(DB_URL)
  .then(() => {
    console.log("Conected to mongoDB");
    app.listen(PORT, () => {
      console.log(`Server running on http://localhost:${PORT}`);
    });
  })
  .catch((err) => {
    console.log("Error while connecting to mongoDB : ", err);
  });
