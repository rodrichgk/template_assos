const express = require('express');
const passport = require('passport');
require('../services/passport');
const router = express.Router();

/* function isLoggedIn(req,res,next){
    req.user ? next() : res.sendStatus(401);
} */


/**
 * SignIn with Google.
 */
router.get('/google', passport.authenticate('google', {
  scope: ['profile', 'email']
}));

/**
 * Callback from Google.
 */
router.get('/google/callback', 
    passport.authenticate('google', { failureRedirect: '/login' }),
    function(req, res) {
    // Successful authentication, redirect home.
    req.session.userId = req.user._id;
    res.redirect('/');
});

/**
 * Logout.
 */
router.get('/logout', (req, res) => {
    req.logout((err) => {
      if (err) {
        return res.status(500).json({ error: 'Error logging out' });
      }
      res.redirect('/');
    });
  });
  

/**
 * Get current user.
 */
router.get('/current_user', (req, res) => {
    if (req.user) {
        // User is authenticated, return user data
        res.json(1);
    } else {
    // User is not authenticated, return an empty object or a specific response
    res.json(0);
    }
});

module.exports = router;
