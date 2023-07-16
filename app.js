const express = require("express");
const mongoose = require("mongoose");
const passport = require("passport");
const session = require("express-session");
const flash = require("express-flash");
const routes = require("./routes");
const errorHandler = require('./utils/errorHandler');
const initializePassport = require("./utils/passport-config");
require('dotenv').config();

const DB_URL = process.env.DB_URL;
const API_SECRET = process.env.API_SECRET;
const PORT = process.env.PORT || 3000;

mongoose
  .connect(DB_URL)
  .then(() => console.log("Connected to the db"))
  .catch((err) => {
    console.log("Erro while connecting to the db", err);
  });

const app = express();

initializePassport(passport);
app.set("view engine", "ejs");

app.use(express.urlencoded({ extended: true }));
app.use(
  session({
    secret: API_SECRET,
    resave: false,
    saveUninitialized: false,
  })
);
app.use(passport.initialize());
app.use(passport.session());
app.use(flash());
app.use("/", routes);
app.use(errorHandler.handleNotFound);
app.use(errorHandler.handleError);


// Start the server
app.listen(PORT, () => {
  console.log("Server started on port", 3000);
});
