const mongoose = require('mongoose');

const projectSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String },
  link: { type: String },
  images: [{ type: String }], // multiple images
  developerName: { type: String },
  enrollmentNo: { type: String }
}, { timestamps: true });

module.exports = mongoose.model('Project', projectSchema);
