const express = require('express');
const router = express.Router();

// Define the homepage route
router.get('/', (req, res) => {
    res.render('project'); // Render the 'home' template
});

module.exports = router;