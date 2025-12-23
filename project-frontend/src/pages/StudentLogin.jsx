import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { GoogleLogin } from '@react-oauth/google';
import { jwtDecode } from 'jwt-decode';

const StudentLogin = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });

  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const prefillEmail = localStorage.getItem('prefillEmail');
    const prefillPassword = localStorage.getItem('prefillPassword');

    if (prefillEmail && prefillPassword) {
      setFormData({ email: prefillEmail, password: prefillPassword });
      localStorage.removeItem('prefillEmail');
      localStorage.removeItem('prefillPassword');
    }
  }, []);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const res = await fetch('http://localhost:5000/api/students/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      const data = await res.json();

      if (res.ok) {
        localStorage.setItem('studentToken', data.token);
        navigate('/');
      } else {
        alert(data.message || 'Login failed');
      }
    } catch (error) {
      console.error('Login error:', error);
      alert('Something went wrong. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleSuccess = (credentialResponse) => {
    const decoded = jwtDecode(credentialResponse.credential);
    console.log("Google user info:", decoded);

    // Optional: Send credential to backend for real token
    localStorage.setItem('studentToken', 'google-token'); // You can call your backend here
    navigate('/');
  };

  const handleGoogleError = () => {
    alert('Google login failed');
  };

  return (
    <div style={styles.container}>
      <form onSubmit={handleLogin} style={styles.form}>
        <h2 style={styles.heading}>Login</h2>

        <input
          type="email"
          name="email"
          placeholder="Email"
          value={formData.email}
          onChange={handleChange}
          style={styles.input}
          required
        />
        <input
          type="password"
          name="password"
          placeholder="Password"
          value={formData.password}
          onChange={handleChange}
          style={styles.input}
          required
        />

        <button type="submit" style={styles.button} disabled={loading}>
          {loading ? 'Logging in...' : 'Log in'}
        </button>

        <div style={{ margin: '20px 0' }}>
          <GoogleLogin onSuccess={handleGoogleSuccess} onError={handleGoogleError} />
        </div>

        <p style={styles.loginText}>
          Don’t have an account?{' '}
          <Link to="/student-register" style={styles.loginLink}>Register</Link>
        </p>
      </form>
    </div>
  );
};

const primaryColor = 'rgb(114, 92, 173)';

const styles = {
  container: {
    minHeight: '100vh',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    background: '#f0f0f5',
  },
  form: {
    background: '#fff',
    padding: '40px',
    borderRadius: '16px',
    boxShadow: '0 4px 20px rgba(0, 0, 0, 0.1)',
    textAlign: 'center',
    width: '100%',
    maxWidth: '400px',
  },
  heading: {
    marginBottom: '24px',
    fontFamily: 'Playfair Display, serif',
    fontSize: '28px',
    color: '#333',
  },
  input: {
    width: '100%',
    padding: '12px 14px',
    margin: '12px 0',
    borderRadius: '8px',
    border: '1px solid #ccc',
    fontSize: '16px',
    outlineColor: primaryColor,
  },
  button: {
    width: '100%',
    padding: '12px',
    backgroundColor: primaryColor,
    color: '#fff',
    border: 'none',
    borderRadius: '8px',
    fontSize: '16px',
    fontWeight: 'bold',
    cursor: 'pointer',
    transition: 'background 0.3s ease',
  },
  loginText: {
    marginTop: '16px',
    fontSize: '14px',
    color: '#555',
  },
  loginLink: {
    color: primaryColor,
    textDecoration: 'underline',
    cursor: 'pointer',
  },
};

export default StudentLogin;
