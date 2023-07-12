// config/passportConfig.js
const LocalStrategy = require('passport-local').Strategy;
const bcrypt = require('bcrypt');
const User = require('../models/User');

function initializePassport(passport) {
  const authenticateUser = async (username, password, done) => {
    try {
      const user = await User.findOne({ username });

      if (!user) {
        return done(null, false, {error: 'No user with that username' });
      }

      const passwordMatched = await bcrypt.compare(password, user.password);

      if (passwordMatched) {
        return done(null, user);
      } else {
        return done(null, false, {error: 'Password incorrect' });
      }
    } catch (error) {
      return done(error);
    }
  };

  passport.use(
    new LocalStrategy({ usernameField: 'username' }, authenticateUser)
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
