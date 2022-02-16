const express = require("express");
const bodyParser = require("body-parser");
const app = express();

const person = require("./routes/person");

app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use("/api/person", person);
module.exports = app;
