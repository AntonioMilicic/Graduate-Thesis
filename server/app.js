const express = require("express");
const bodyParser = require("body-parser");
const path = require("path");
const jsend = require("jsend");

const api = require("./routes");

// Database
const db = require("./config/database");

// TEST db
db.authenticate()
  .then(() => console.log("Database connected..."))
  .catch((err) => console.log("Error" + err));

const app = express();

// bodyParser
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use("/api", api);

app.get("/", (req, res) => res.send("INDEX"));

const PORT = process.env.PORT || 5000;

app.listen(PORT, console.log(`server on ${PORT}`));
