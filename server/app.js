const express = require("express");
const bodyParser = require("body-parser");
const shrinkRay = require('shrink-ray-current');
const path = require("path");
const jsend = require("jsend");
const cors = require("cors");

const api = require("./controllers");

// Import of DB and Controllers
const db = require("./models");
const controller = require("./controllers/index.js");

const app = express();

app.use('client/src/assets/images/uploads/users', express.static('users'));
// bodyParser
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// compression for faster loading
app.use(shrinkRay());


// CORS
app.use(function (req, res, next) {
  res.header("Access-Control-Allow-Credentials", true);
  res.header("Access-Control-Allow-Origin", req.headers.origin);
  res.header("Access-Control-Allow-Methods", "GET,PUT,POST,DELETE");
  res.header(
    "Access-Control-Allow-Headers",
    "X-Requested-With, X-HTTP-Method-Override, Content-Type, Accept"
  );
  if (req.method === "OPTIONS") {
    res.sendStatus(200);
  } else {
    next();
  }
});

app.use("/api", api);

app.get("/", (req, res) => res.send("INDEX"));

const PORT = process.env.PORT || 5000;
app.listen(PORT, console.log(`server on ${PORT}`));
