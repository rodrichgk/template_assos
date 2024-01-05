const mongoose = require('mongoose');


const projectSchema = new mongoose.Schema({
    title: { type: String, required: true },
    description: { type: String, required: true },
    editorContent: { type: Object, required: true },
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  });

const Project = mongoose.model('Project', projectSchema);

module.exports = Project;