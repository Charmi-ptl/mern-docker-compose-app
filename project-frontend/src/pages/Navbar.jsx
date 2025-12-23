import React, { useEffect, useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';

const Navbar = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [isStudentLoggedIn, setIsStudentLoggedIn] = useState(false);

  useEffect(() => {
    const checkToken = () => {
      const token = localStorage.getItem('studentToken');
      setIsStudentLoggedIn(!!token);
    };

    checkToken();

    // ✅ Also listen for storage changes (in case of multi-tab or manual localStorage edits)
    window.addEventListener('storage', checkToken);

    return () => {
      window.removeEventListener('storage', checkToken);
    };
  }, [location]);

  const handleLogout = () => {
    localStorage.removeItem('studentToken');
    setIsStudentLoggedIn(false);
    navigate('/student-login');
  };

  const commonFont = { fontFamily: "'Playfair Display', serif" };
  const navStyle = {
    ...commonFont,
    background: '#725CAD',
    color: '#fff',
    height: '80px',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: '0 40px',
    position: 'fixed',
    top: 0,
    left: 0,
    right: 0,
    zIndex: 1000,
    boxShadow: '0 2px 6px rgba(0, 0, 0, 0.15)',
  };
  const logoStyle = {
    ...commonFont,
    fontWeight: 'bold',
    fontSize: '22px',
    color: '#fff',
    textDecoration: 'none',
  };
  const navLinksStyle = {
    display: 'flex',
    gap: '25px',
    alignItems: 'center',
  };
  const linkStyle = {
    ...commonFont,
    color: '#fff',
    textDecoration: 'none',
    fontSize: '16px',
    fontWeight: 500,
    transition: 'color 0.3s',
    cursor: 'pointer',
  };
  const buttonStyle = {
    ...commonFont,
    backgroundColor: '#000',
    color: '#fff',
    border: 'none',
    padding: '8px 16px',
    borderRadius: '8px',
    fontWeight: '600',
    cursor: 'pointer',
    textDecoration: 'none',
    transition: 'background-color 0.3s ease',
  };

  const handleMouseEnter = (e) => (e.target.style.color = '#d1d1e0');
  const handleMouseLeave = (e) => (e.target.style.color = '#fff');

  return (
    <nav style={navStyle}>
      <Link to="/" style={logoStyle}>🎓 Ignitia</Link>
      <div style={navLinksStyle}>
        <Link
          to="/"
          style={linkStyle}
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
        >
          Home
        </Link>
        <Link
          to="/projects"
          style={linkStyle}
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
        >
          Projects
        </Link>

        {isStudentLoggedIn ? (
          <button onClick={handleLogout} style={buttonStyle}>
            Logout
          </button>
        ) : (
          <Link to="/student-login" style={buttonStyle}>
            Login/Register
          </Link>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
