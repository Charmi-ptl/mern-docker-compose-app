const express = require('express');
const router = express.Router();
const upload = require('../middlewares/upload'); // must support .array('images', 5)
const auth = require('../middlewares/auth');
const {
  getProjects,
  getProjectById,
  addProject,
  updateProject,
  deleteProject
} = require('../controllers/projectController');

// Public Routes
router.get('/', getProjects);
router.get('/:id', getProjectById);

// Protected Routes (with multiple image upload and auth)
router.post('/', auth, upload.array('images', 5), addProject);
router.put('/:id', auth, upload.array('images', 5), updateProject);
router.delete('/:id', auth, deleteProject);

module.exports = router;
