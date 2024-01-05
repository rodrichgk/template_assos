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

      // date without time
      const today = new Date();
      const todayWithoutTime = new Date(today.getFullYear(), today.getMonth(), today.getDay());

      const location = "city, country";
      const language = request.headers['accept-language']||"en-US,en;q=0.5";
      const image_profile = "https://d30y9cdsu7xlg0.cloudfront.net/png/138926-200.png";

      // Create a new user
      const newUser = await User.create({
        first_name: profile.name.givenName,
        last_name: profile.name.familyName,
        birth_date: todayWithoutTime,
        location: location,
        language: language,
        email: profile.emails[0].value,
        email_verified : false,
        image_profile: image_profile,
        role : "user",
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
  