const express = require('express');
const router = express.Router();

// Define the homepage route
router.get('/', (req, res) => {
    res.render('membership'); // Render the 'membership' template
});
module.exports = router;