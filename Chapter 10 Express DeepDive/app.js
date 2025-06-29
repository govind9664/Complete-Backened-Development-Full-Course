// core module
const path = require("path");

// External module
const express = require("express");
const bodyParse = require("body-parser");
// Local module
const rootDir = require("./utils/pathUtils");
const dummyRouter = require("./routes/dummyRouter");
const userRouter = require("./routes/userRouter");
const homeRouter = require("./routes/homeRouter");

const app = express();

app.use(dummyRouter);

// app.use((req, res, next) => {
//   console.log("Third Dummy Middleware", req.url, req.method);
//   res.send("<h1> Welcome to the Third Middleware</h1>");
//   next();
// });

app.use(express.urlencoded());

app.use(homeRouter);

app.use(userRouter);

app.use((req, res, next) => {
  res.sendFile(path.join(rootDir, "views", "404.html"));
});

const PORT = 3002;

app.listen(PORT, () => {
  console.log(`Server running on address http://localhost:${PORT}`);
});
