const express = require("express");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const app = express();
app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));
app.use(cors({
    origin: true,
    // methods: ['GET', 'POST', 'PUT', 'DELETE'], 
    // allowedHeaders: ['Content-Type', 'Authorization'],
  }));
app.use(express.json());
app.use(cookieParser());
require('./routes')(app)

module.exports = { app }