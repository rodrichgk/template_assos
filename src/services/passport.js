const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const GOOGLE_CLIENT_ID = '637654655588-h4vmv8huh5r2scgt6835t8t25ue5kta4.apps.googleusercontent.com';
const GOOGLE_CLIENT_SECRET = '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';
const User = require('../models/user');

passport.use(new GoogleStrategy({
    clientID: GOOGLE_CLIENT_ID,
    clientSecret: GOOGLE_CLIENT_SECRET,
    callbackURL: "http://localhost:3000/auth/google/callback",
    passReqToCallback: true
  },
  async function (request, accessToken, refreshToken, profile, cb) {
    try {
      const existingUser = await User.findOne({ email: profile.emails[0].value });

      if (existingUser) {
        // User already exists
        return cb(null, existingUser);
      }

      // Create a new user
      const newUser = await User.create({
        googleId: profile.id,
        username: profile.displayName, // You might want to adjust this based on the available information from Google profile
        email: profile.emails[0].value,
        email_verified : false
      });

      return cb(null, newUser);
    } catch (error) {
      return cb(error, null);
    }
  }
));

passport.serializeUser(function(user,done){
    done(null,user);
});

passport.deserializeUser(function (id, done) {
    User.findById(id)
      .exec()
      .then((user) => {
        done(null, user);
      })
      .catch((err) => {
        done(err, null);
      });
  });
  