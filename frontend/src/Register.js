// src/Register.js

import React, { useState } from 'react';

const Register = ({ onRegisterSuccess, onSwitchToLogin }) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    if (password !== confirmPassword) {
      setError('Passwords do not match');
      setLoading(false);
      return;
    }

    try {
      const response = await fetch('http://localhost:5000/api/users/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ name, email, password }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || 'Registration failed');
      }

      onRegisterSuccess(data);
    } catch (err) {
      console.error('Registration error:', err);
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{
      maxWidth: '400px',
      margin: '3rem auto',
      padding: '2.5rem',
      backgroundColor: '#1e1e1e',
      borderRadius: '1rem',
      boxShadow: '0 8px 16px rgba(0, 0, 0, 0.4)',
      border: '1px solid #333'
    }}>
      <h2 style={{
        fontSize: '2.2rem',
        fontWeight: '700',
        color: '#6a5acd',
        marginBottom: '2rem',
        textAlign: 'center',
        textShadow: '0 2px 4px rgba(0,0,0,0.2)'
      }}>Register for CineBook</h2>
      <form onSubmit={handleSubmit}>
        <div style={{ marginBottom: '1.5rem' }}>
          <label htmlFor="name" style={{
            display: 'block',
            color: '#c0c0c0',
            fontSize: '0.9rem',
            fontWeight: '600',
            marginBottom: '0.6rem'
          }}>Full Name:</label>
          <input
            type="text"
            id="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
            style={{ width: '100%' }}
          />
        </div>
        <div style={{ marginBottom: '1.5rem' }}>
          <label htmlFor="email" style={{
            display: 'block',
            color: '#c0c0c0',
            fontSize: '0.9rem',
            fontWeight: '600',
            marginBottom: '0.6rem'
          }}>Email Address:</label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            style={{ width: '100%' }}
          />
        </div>
        <div style={{ marginBottom: '1.5rem' }}>
          <label htmlFor="password" style={{
            display: 'block',
            color: '#c0c0c0',
            fontSize: '0.9rem',
            fontWeight: '600',
            marginBottom: '0.6rem'
          }}>Password:</label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            style={{ width: '100%' }}
          />
        </div>
        <div style={{ marginBottom: '2rem' }}>
          <label htmlFor="confirmPassword" style={{
            display: 'block',
            color: '#c0c0c0',
            fontSize: '0.9rem',
            fontWeight: '600',
            marginBottom: '0.6rem'
          }}>Confirm Password:</label>
          <input
            type="password"
            id="confirmPassword"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            required
            style={{ width: '100%' }}
          />
        </div>
        {error && <p style={{ color: '#ff6b6b', fontSize: '0.85rem', marginBottom: '1.5rem', textAlign: 'center', backgroundColor: '#3a1a1a', padding: '0.8rem', borderRadius: '0.5rem' }}>{error}</p>}
        <button
          type="submit"
          disabled={loading}
          style={{
            width: '100%',
            backgroundColor: '#6a5acd',
            color: 'white',
            fontSize: '1.1rem',
            letterSpacing: '0.05em',
          }}
        >
          {loading ? 'Registering...' : 'Register'}
        </button>
      </form>
      <p style={{
        marginTop: '2rem',
        textAlign: 'center',
        color: '#b0b0b0',
        fontSize: '0.9rem'
      }}>
        Already have an account?{' '}
        <button
          onClick={onSwitchToLogin}
          style={{
            background: 'none',
            border: 'none',
            color: '#8a7acd',
            cursor: 'pointer',
            textDecoration: 'underline',
            padding: 0,
            fontSize: '0.9rem',
            fontWeight: '600',
            boxShadow: 'none',
            transform: 'none',
            margin: 0,
            display: 'inline'
          }}
        >
          Login here
        </button>
      </p>
    </div>
  );
};

export default Register;