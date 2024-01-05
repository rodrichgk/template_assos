const express = require('express');
const Project = require('../models/project');
const router = express.Router();

// Define the homepage route
router.get('/', (req, res) => {
    res.render('project'); // Render the 'home' template
});

//Define the (new-project) route
router.get('/new-project', (req, res) => {
    res.render('new-project'); // Render the 'new-project' template
});

router.post('/save-project', async (req, res) => {
    try {
        const user = req.session.userId;
        const editorContent = req.body; // Assuming the entire savedData is sent as the request body

        // Save the project with the associated user
        const project = new Project({
            title: 'Project Title', // Replace with the actual title
            description: 'Project Description', // Replace with the actual description
            user: user, // Associate the project with the user
            editorContent: editorContent, // Save the editor content
            // Add other project-related information
        });

        //const savedProject = await project.save();

        // Display the saved project content in the console for verification
        //console.log('Saved Project Content:', editorContent);
        console.log('Saved Project:', project);

        res.status(200).send('Project saved successfully.');
    } catch (error) {
        console.error('Error saving project:', error);
        res.status(500).send('Internal Server Error');
    }
});

module.exports = router;