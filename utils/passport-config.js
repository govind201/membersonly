const LocalStrategy = require("passport-local").Strategy;
const bcrypt = require("bcrypt");
const User = require("../models/User");

function initializePassport(passport) {
  const authenticateUser = async (req, username, password, done) => {
    try {
      const user = await User.findOne({ username });

      if (!user) {
        req.flash("error", "No user with that username");
        return done(null, false);
      }

      const passwordMatched = await bcrypt.compare(password, user.password);

      if (passwordMatched) {
        return done(null, user);
      } else {
        req.flash("error", "Password incorrect");
        return done(null, false);
      }
    } catch (error) {
      return done(error);
    }
  };

  passport.use(
    new LocalStrategy({ usernameField: "username",  passReqToCallback: true, }, authenticateUser)
  );

  passport.serializeUser((user, done) => {
    done(null, user.id);
  });

  passport.deserializeUser(async (id, done) => {
    try {
      const user = await User.findById(id);
      done(null, user);
    } catch (error) {
      done(error);
    }
  });
}

module.exports = initializePassport;
