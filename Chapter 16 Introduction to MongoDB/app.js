// Core Module
const path = require("path");

// External Module
const express = require("express");

// Local Module
const storeRouter = require("./routes/storeRouter");
const hostRouter = require("./routes/hostRouter");
const errorControllers = require("./controllers/errors");
const rootDir = require("./utils/pathUtils");
const { mongoConnect } = require("./utils/databaseUtils");

const app = express();

app.set("view engine", "ejs");
app.set("views", "views");

app.use((req, res, next) => {
  console.log(req.url, req.method);
  next();
});

app.use(express.urlencoded());

app.use(storeRouter);

app.use(hostRouter);

app.use(express.static(path.join(rootDir, "public")));

app.use(errorControllers.pageNotFound);

const PORT = 3000;
mongoConnect((client) => {
  console.log("Conected to mongoDB", client);
  app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
});
