import React from 'react';

const Footer = () => {
  const fontFamily = { fontFamily: "'Playfair Display', serif" };

  const footerStyle = {
    ...fontFamily,
    background: '#725CAD',
    color: '#eee',
    padding: '40px 20px',
    marginTop: '80px',
    textAlign: 'center',
  };

  const containerStyle = {
    maxWidth: '1000px',
    margin: '0 auto',
  };

  const navLinksStyle = {
    display: 'flex',
    justifyContent: 'center',
    flexWrap: 'wrap',
    gap: '20px',
    marginBottom: '25px',
  };

  const linkStyle = {
    ...fontFamily,
    textDecoration: 'none',
    color: '#fff',
    fontSize: '1rem',
    transition: 'color 0.2s ease',
  };

  const socialStyle = {
    display: 'flex',
    justifyContent: 'center',
    gap: '20px',
    fontSize: '1.2rem',
    marginTop: '10px',
  };

  const copyStyle = {
    ...fontFamily,
    fontSize: '1rem',
    color: '#fff',
    marginTop: '30px',
  };

  const contactStyle = {
    ...fontFamily,
    marginTop: '30px',
    fontSize: '1rem',
    color: '#fff',
  };

  return (
    <footer style={footerStyle} data-aos="fade-up">
      <div style={containerStyle}>
        <div style={socialStyle}>
          <a href="mailto:ignitia2216@gmail.com" style={linkStyle}>✉️ ignitia2216@gmail.com </a>
        </div>

        <div style={contactStyle}>
          Contact: +91 1234567891
        </div>

        <div style={copyStyle}>© 2025 Ignitia. All rights reserved.</div>
      </div>
    </footer>
  );
};

export default Footer;
