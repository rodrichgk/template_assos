const mongoose = require('mongoose');


const projectSchema = new mongoose.Schema({
    title: { type: String, required: true },
    description: { type: String, required: true },
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    // Add any other project-related information
  });

const Project = mongoose.model('Project', projectSchema);

module.exports = Project;