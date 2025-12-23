const Project = require('../models/Project');
const path = require('path');

// GET all projects with pagination & search
exports.getProjects = async (req, res) => {
  try {
    const { page = 1, limit = 10, search = '' } = req.query;
    const query = search
      ? { title: { $regex: search, $options: 'i' } }
      : {};

    const projects = await Project.find(query)
      .sort({ createdAt: -1 })
      .skip((page - 1) * limit)
      .limit(parseInt(limit));

    const total = await Project.countDocuments(query);
    const totalPages = Math.ceil(total / limit);

    res.json({ projects, totalPages });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// GET single project by ID
exports.getProjectById = async (req, res) => {
  try {
    const project = await Project.findById(req.params.id);
    if (!project) return res.status(404).json({ message: 'Project not found' });
    res.json(project);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// POST new project (supports multiple images)
exports.addProject = async (req, res) => {
  try {
    const { title, description, link, developerName, enrollmentNo } = req.body;

    const images = req.files
      ? req.files.map(file => `/uploads/${file.filename}`)
      : [];

    const newProject = new Project({
      title,
      description,
      link,
      developerName,
      enrollmentNo,
      images // store array of image paths
    });

    const saved = await newProject.save();
    res.status(201).json(saved);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

// PUT update project (supports multiple images)
exports.updateProject = async (req, res) => {
  try {
    const { title, description, link, developerName, enrollmentNo } = req.body;

    const images = req.files
      ? req.files.map(file => `/uploads/${file.filename}`)
      : undefined;

    const updateFields = {
      title,
      description,
      link,
      developerName,
      enrollmentNo
    };

    if (images && images.length > 0) {
      updateFields.images = images;
    }

    const updated = await Project.findByIdAndUpdate(
      req.params.id,
      updateFields,
      { new: true }
    );

    res.json(updated);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

// DELETE a project
exports.deleteProject = async (req, res) => {
  try {
    await Project.findByIdAndDelete(req.params.id);
    res.json({ message: 'Project deleted' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
