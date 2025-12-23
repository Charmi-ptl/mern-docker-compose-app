import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';

const StudentRegister = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleRegister = async (e) => {
    e.preventDefault();

    try {
      const res = await fetch('http://localhost:5000/api/students/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      const data = await res.json();

      if (res.ok) {
        // ✅ Set email and password to prefill login page
        localStorage.setItem('prefillEmail', formData.email);
        localStorage.setItem('prefillPassword', formData.password);

        // Optional: remove token from here if login isn't automatic
        // localStorage.setItem('studentToken', data.token); ❌ Remove this

        navigate('/student-login');
      } else {
        alert(data.message || 'Registration failed');
      }
    } catch (error) {
      console.error('Registration error:', error);
      alert('Something went wrong. Please try again.');
    }
  };

  return (
    <div style={styles.container}>
      <form onSubmit={handleRegister} style={styles.form}>
        <h2 style={styles.heading}>Register</h2>

        <input
          type="text"
          name="name"
          placeholder="Full Name"
          value={formData.name}
          onChange={handleChange}
          style={styles.input}
          required
        />
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

        <button type="submit" style={styles.button}>Register</button>

        <p style={styles.loginText}>
          Already have an account?{' '}
          <Link to="/student-login" style={styles.loginLink}>Log in</Link>
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

export default StudentRegister;
