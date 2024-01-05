// membershiproutes.js

const express = require('express');
const router = express.Router();
const User = require('../models/user');


router.use(express.urlencoded({ extended: true }));



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
        let user = await User.findById(userId, { _id: 0, role: 0});

        // Check if the user exists in the database
        if (!user) {
            throw new Error('User not found');
        }
        const birthDate = user.birth_date;

        // Extract year, month, and day from the Date object
        const year = birthDate.getFullYear();
        const month = birthDate.getMonth() + 1; // Months are zero-indexed, so add 1
        const day = birthDate.getDate();

        
        const languageString = user.language;

        const languagePriorityPairs = languageString.split(',');

        // Extract language and priority from each pair
        const languageInfo = languagePriorityPairs.map(pair => {
        const [language, priority] = pair.split(';q=');
        return { language, priority: priority || '0' }; // If priority is not present, default to 1
        });

        const filteredLanguageInfo = languageInfo.filter(info => !info.language.includes('-'));

        console.log(filteredLanguageInfo);

        const [city, country] = user.location.split(', ');

        const imageProfile = user.image_profile;
        res.render('membership', 
        { 
            data: 
            {   firstName: user.first_name, 
                lastName: user.last_name, 
                UserCity:city, 
                UserCountry:country,
                BirthYear:year,
                BirthMonth:month,
                BirthDay:day,
                ImageProfile:imageProfile
            } 
        });

    } catch (error) {
        console.error(error);
        // Handle the error (e.g., redirect to an error page)
        res.status(500).send('Internal Server Error');
        
    }
  
});


// Handle form submission to update user information
router.post('/update-user', async (req, res) => {
    try {
      // Extract form data from the request
      const { firstName, lastName, day, month, year, country, city } = req.body;
  
      // Retrieve the user ID from the session
      const userId = req.session.userId;
  
      // Update user information in the database
      await User.findByIdAndUpdate(
        userId,
        {
          first_name: firstName,
          last_name: lastName,
          birth_date: new Date(`${year}-${month}-${day}`),
          location: `${city}, ${country}`,
        },
        { new: true } // Return the updated user document
      );
  
      // Redirect or send a response indicating success
      res.redirect('/membership'); // Redirect to the membership page, for example
    } catch (error) {
      console.error(error);
      res.status(500).send('Internal Server Error');
    }
  });


module.exports = router;
