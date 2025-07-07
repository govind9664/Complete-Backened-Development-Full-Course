// Core Module
const path = require("path");

// External Module
const express = require("express");
const session = require("express-session");
const MongoDBStore = require("connect-mongodb-session")(session);
const DB_URL =
  "mongodb+srv://root:Govind@completecoding.pclg6rk.mongodb.net/airbnb?retryWrites=true&w=majority&appName=CompleteCoding";

// Local Module
const storeRouter = require("./routes/storeRouter");
const hostRouter = require("./routes/hostRouter");
const errorControllers = require("./controllers/errors");
const rootDir = require("./utils/pathUtils");
const { default: mongoose } = require("mongoose");
const authRouter = require("./routes/authRouter");

const app = express();

app.set("view engine", "ejs");
app.set("views", "views");

app.use(express.urlencoded());

const store = new MongoDBStore({
  uri: DB_URL,
  collection: "sessions",
});

app.use(
  session({
    secret: "This is the complete node js course",
    resave: false,
    saveUninitialized: true,
    store: store,
  })
);

app.use((req, res, next) => {
  // When all req.isLoggedIn is replaced by req.session.isLoggedIn , then this middleware is not required
  req.isLoggedIn = req.session.isLoggedIn;
  next();
});

app.use(authRouter);

app.use(storeRouter);

app.use("/host", (req, res, next) => {
  if (req.isLoggedIn) {
    next();
  } else {
    res.redirect("/login");
  }
});
app.use("/host", hostRouter);

app.use(express.static(path.join(rootDir, "public")));

app.use(errorControllers.pageNotFound);

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
