// Core Module
const path = require("path");

// External Module
const express = require("express");
const session = require("express-session");
const MongoDBStore = require("connect-mongodb-session")(session);
const DB_URL =
  "mongodb+srv://root:Govind@completecoding.pclg6rk.mongodb.net/airbnb?retryWrites=true&w=majority&appName=CompleteCoding";
const { default: mongoose } = require("mongoose");
const multer = require("multer");

// Local Module
const storeRouter = require("./routes/storeRouter");
const hostRouter = require("./routes/hostRouter");
const errorControllers = require("./controllers/errors");
const rootDir = require("./utils/pathUtils");
const authRouter = require("./routes/authRouter");

const app = express();

app.set("view engine", "ejs");
app.set("views", "views");

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/"); // Directory where files will be stored
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + "-" + file.originalname);
  },
});

const fileFilter = (req, file, cb) => {
  // Accept images only
  if (
    file.mimetype === "image/jpg" ||
    file.mimetype === "image/jpeg" ||
    file.mimetype === "image/png"
  ) {
    cb(null, true);
  } else {
    cb(new Error("Only .jpg, .jpeg and .png files are allowed!"), false);
  }
};
const multerOptions = {
  storage,
  fileFilter,
};

app.use(express.urlencoded());
app.use(multer(multerOptions).single("photo")); // For single file upload with field name 'photo'
app.use(express.static(path.join(rootDir, "public")));
app.use("/uploads", express.static(path.join(rootDir, "uploads")));
app.use("/host/uploads", express.static(path.join(rootDir, "uploads")));
app.use("/homes/uploads", express.static(path.join(rootDir, "uploads")));

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
