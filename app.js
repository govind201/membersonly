const express = require("express");
const mongoose = require("mongoose");
const passport = require("passport");
const session = require("express-session");
const flash = require("express-flash");
const User = require("./models/User");
const routes = require("./routes");
const initializePassport = require("./utils/passport-config");

const DB_URL = process.env.DB_URL;
const API_SECRET = process.env.API_SECRET;

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
app.use(flash());
app.use(
  session({
    secret: API_SECRET,
    resave: false,
    saveUninitialized: false,
  })
);
app.use(passport.initialize());
app.use(passport.session());
app.use("/", routes);

// Start the server
app.listen(3000, () => {
  console.log("Server started on port 3000");
});
