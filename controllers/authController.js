const bcrypt = require("bcrypt");
const passport = require("passport");
const User = require("../models/User");

exports.signup = async (req, res) => {
  try {
    const { fullName, username, password, confirmPassword } = req.body;
    const admin = req.body.admin === "on";
    const membershipStatus = req.body.admin === "on";

    const existingUser = await User.findOne({ username });
    if (existingUser) {
      return res.render("signup", {
        error: "Username or password is incorrect",
      });
    }

    if (password !== confirmPassword) {
      return res.render("signup", {
        error: "Username or password is incorrect",
      });
    }
    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = new User({
      fullName,
      username,
      admin,
      password: hashedPassword,
      membershipStatus,
    });

    await newUser.save();
    res.redirect("/login");
  } catch (error) {
    console.log(error);
    res.render("signup", { error: "Internal Server Error" });
  }
};

exports.login = passport.authenticate("local", {
  successRedirect: "/",
  failureRedirect: "/login",
  failureFlash: true,
});

exports.logout = (req, res) => {
  req.session.destroy((err) => {
    if (err) {
      return next(err);
    }
    res.redirect("/");
  });
};

exports.isAdmin = (req, res, next) => {
  if (req.user.admin) {
    next();
  } else {
    res.redirect("/");
  }
};

exports.isNotMember = (req, res, next) => {
  if (req.user.membershipStatus) {
    res.redirect("/");
  } else {
    next();
  }
};

exports.renderJoinClubForm = (req, res) => {
  res.render("join-club");
};

exports.joinClub = async (req, res) => {
  try {
    const user = req.user;
    const { passcode } = req.body;
    const PASSKEY = process.env.PASSKEY;
    if (passcode != PASSKEY) {
      res.render("join-club", { error: "An error occurred" });
    }
    user.membershipStatus = true;
    await user.save();

    res.redirect("/");
  } catch (error) {
    console.log(error);
    res.render("join-club", { error: "An error occurred" });
  }
};
