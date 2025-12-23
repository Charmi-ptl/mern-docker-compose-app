// App.jsx
import React, { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate, useNavigate, useLocation } from 'react-router-dom';

import Navbar from './pages/Navbar';
import Hero from './pages/Hero';
import About from './pages/About';
import FeaturedProjects from './pages/FeaturedProjects';
import Footer from './pages/Footer';
import AdminPanel from './pages/AdminPanel';
import AdminLogin from './pages/AdminLogin';
import Projects from './pages/Projects';
import StudentLogin from './pages/StudentLogin';
import StudentRegister from './pages/StudentRegister';

import AOS from 'aos';
import 'aos/dist/aos.css';

// ✅ Route protection for students
const StudentPrivateRoute = ({ children }) => {
  const studentToken = localStorage.getItem('studentToken');
  return studentToken ? children : <Navigate to="/student-login" />;
};

// ✅ Route protection for admin
const AdminPrivateRoute = ({ children }) => {
  const token = localStorage.getItem('token');
  return token ? children : <Navigate to="/admin-login" />;
};

// ✅ Hide Navbar on specific routes
const Layout = ({ children }) => {
  const location = useLocation();
  const hideNavbarRoutes = [
    '/admin-login',
    '/admin',
    '/student-login',
    '/student-register',
  ];

  const showNavbar = !hideNavbarRoutes.includes(location.pathname);

  return (
    <>
      {showNavbar && <Navbar />}
      {children}
    </>
  );
};

// ✅ Admin Wrapper to support useNavigate for logout
const AdminWrapper = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate('/admin-login');
  };

  return <AdminPanel onLogout={handleLogout} />;
};

// ✅ AdminLogin Wrapper to support useNavigate for login redirect
const AdminLoginWrapper = () => {
  const navigate = useNavigate();

  const handleLogin = () => {
    navigate('/admin');
  };

  return <AdminLogin onLogin={handleLogin} />;
};

const App = () => {
  useEffect(() => {
    AOS.init();
  }, []);

  return (
    <Router>
      <Layout>
        <Routes>
          {/* ✅ Public Homepage */}
          <Route path="/" element={
            <>
              <Hero />
              <FeaturedProjects />
              <About />
              <Footer />
            </>
          } />

          {/* 🔒 Student Protected Route */}
          <Route path="/projects" element={
            <StudentPrivateRoute>
              <Projects />
            </StudentPrivateRoute>
          } />

          {/* 🔓 Student Auth */}
          <Route path="/student-login" element={<StudentLogin />} />
          <Route path="/student-register" element={<StudentRegister />} />

          {/* 🔓 Admin Auth Login */}
          <Route path="/admin-login" element={<AdminLoginWrapper />} />

          {/* 🔒 Admin Protected Route */}
          <Route path="/admin" element={
            <AdminPrivateRoute>
              <AdminWrapper />
            </AdminPrivateRoute>
          } />

          {/* 🔁 Catch-all fallback */}
          <Route path="*" element={<Navigate to="/" />} />
        </Routes>
      </Layout>
    </Router>
  );
};

export default App;
