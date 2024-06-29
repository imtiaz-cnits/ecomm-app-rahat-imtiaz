const express = require("express");
const app = new express();
const router = require("./src/routes/api");
const rateLimit = require("express-rate-limit");
const cors = require("cors");
const hpp = require("hpp");
const helmet = require("helmet");
const cookieParser = require("cookie-parser");
const xss = require("xss-clean");
const mongoose = require("mongoose");
const mongoSanitize = require("express-mongo-sanitize");
const path = require("path");

// Database Connection
let URI =
  "mongodb+srv://ia64744:HOflMo4i6uVll7E7@e-commapp.bv3ueny.mongodb.net/";
let OPTION = {
  user: "",
  pass: "",
  autoIndex: true,
};

mongoose
  .connect(URI, OPTION)
  .then((res) => {
    console.log("Database Connected Successfully.");
  })
  .catch((err) => {
    console.log(err);
  });

app.use(cookieParser());
app.use(cors());
app.use(helmet());
app.use(mongoSanitize());
app.use(xss());
app.use(hpp());

const limiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 3000,
});

app.use(limiter);

app.use("/api/v1/", router);

app.use(express.static("client/dist"));

// Add React front-end routing
app.get("*", (req, res) => {
  res.sendFile(path.resolve(__dirname, "client", "dist", "index.html"));
});

module.exports = app;
