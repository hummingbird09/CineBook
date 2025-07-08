// src/Login.js

import React, { useState } from 'react';

const Login = ({ onLoginSuccess, onSwitchToRegister }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const response = await fetch('http://localhost:5000/api/users/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || 'Login failed');
      }

      onLoginSuccess(data);
    } catch (err) {
      console.error('Login error:', err);
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
      backgroundColor: '#1e1e1e', /* Slightly lighter than body for contrast */
      borderRadius: '1rem',
      boxShadow: '0 8px 16px rgba(0, 0, 0, 0.4)',
      border: '1px solid #333'
    }}>
      <h2 style={{
        fontSize: '2.2rem',
        fontWeight: '700',
        color: '#6a5acd', /* Purple accent */
        marginBottom: '2rem',
        textAlign: 'center',
        textShadow: '0 2px 4px rgba(0,0,0,0.2)'
      }}>Login to CineBook</h2>
      <form onSubmit={handleSubmit}>
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
            style={{ width: '100%' }} /* Global input styles apply */
          />
        </div>
        <div style={{ marginBottom: '2rem' }}>
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
            style={{ width: '100%' }} /* Global input styles apply */
          />
        </div>
        {error && <p style={{ color: '#ff6b6b', fontSize: '0.85rem', marginBottom: '1.5rem', textAlign: 'center', backgroundColor: '#3a1a1a', padding: '0.8rem', borderRadius: '0.5rem' }}>{error}</p>}
        <button
          type="submit"
          disabled={loading}
          style={{
            width: '100%',
            backgroundColor: '#6a5acd', /* Purple accent */
            color: 'white',
            fontSize: '1.1rem',
            letterSpacing: '0.05em',
          }}
        >
          {loading ? 'Logging In...' : 'Login'}
        </button>
      </form>
      <p style={{
        marginTop: '2rem',
        textAlign: 'center',
        color: '#b0b0b0',
        fontSize: '0.9rem'
      }}>
        Don't have an account?{' '}
        <button
          onClick={onSwitchToRegister}
          style={{
            background: 'none',
            border: 'none',
            color: '#8a7acd', /* Lighter purple for link */
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
          Register here
        </button>
      </p>
    </div>
  );
};

export default Login;