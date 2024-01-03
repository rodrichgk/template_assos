// membershiproutes.js

const express = require('express');
const router = express.Router();
const User = require('../models/user');



const ensureAuthenticated = (req, res, next) => {
  if (req.isAuthenticated()) {
    return next();
  } else {
    res.redirect('/auth/google'); 
  }
};


router.use(ensureAuthenticated);

// Define your routes below
router.get('/', async (req, res) => {
    try {

        // Retrieve the user ID from the session
        const userId = req.session.userId;

        // Retrieve the user's data from the database based on the user ID
        let user = await User.findById(userId, { _id: 0});

        // Check if the user exists in the database
        if (!user) {
            throw new Error('User not found');
        }
        
        const [city, country] = user.location.split(', ');
        res.render('membership', { data: { firstName: user.first_name, lastName: user.last_name, UserCity:city, UserCountry:country} });

    } catch (error) {
        console.error(error);
        // Handle the error (e.g., redirect to an error page)
        res.status(500).send('Internal Server Error');
        
    }
  
});


module.exports = router;
