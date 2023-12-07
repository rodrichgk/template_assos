// src/routes/index.js

const express = require('express');
const router = express.Router();

// Define the homepage route
router.get('/', (req, res) => {
    res.render('home'); // Render the 'home' template
});

module.exports = router;
