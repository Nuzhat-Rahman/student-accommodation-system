import React, { useState } from 'react';
import axios from 'axios';
import "../../styles/auth.css";


const Register = () => {
  const [userData, setUserData] = useState({
    name: '',
    email: '',
    password: '',
    role: 'student', // default role (could be 'student' or 'landlord')
  });

  const [error, setError] = useState('');

  const handleChange = (e) => {
    setUserData({ ...userData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('/api/auth/register', userData);
      alert('Registration successful, please check your email to verify.');
      // Redirect to login page
    } catch (error) {
      setError(error.response.data.message || 'Something went wrong!');
    }
  };

  return (
    <div className="auth-form-container">
      <h2>Register</h2>
      <form className="auth-form">
        <input type="text" placeholder="Full Name" required />
        <input type="email" placeholder="Email Address" required />
        <input type="password" placeholder="Password" required />
        <button type="submit">Register</button>
      </form>
    </div>
  );
};

export default Register;
