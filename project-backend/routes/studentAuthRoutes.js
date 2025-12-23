const express = require('express');
const router = express.Router();

const {
  registerStudent,
  loginStudent,
  googleLogin
} = require('../controllers/studentAuthController');

const protectStudent = require('../middlewares/authMiddleware'); // 🔐 Optional for protected routes

// ✅ Register new student
router.post('/register', registerStudent);

// ✅ Login with email/password
router.post('/login', loginStudent);

// ✅ Google OAuth Login
router.post('/google-login', googleLogin);

// 🔐 Example protected route (test purpose)
router.get('/dashboard', protectStudent, (req, res) => {
  res.json({
    message: `Hello ${req.student.name}, you're authorized!`,
    student: req.student
  });
});

module.exports = router;
