import React, { useState } from 'react';
import axios from 'axios';

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
    <div>
      <h2>Register</h2>
      <form onSubmit={handleSubmit}>
        {error && <p>{error}</p>}
        <input
          type="text"
          name="name"
          placeholder="Name"
          onChange={handleChange}
          value={userData.name}
          required
        />
        <input
          type="email"
          name="email"
          placeholder="Email"
          onChange={handleChange}
          value={userData.email}
          required
        />
        <input
          type="password"
          name="password"
          placeholder="Password"
          onChange={handleChange}
          value={userData.password}
          required
        />
        <select name="role" onChange={handleChange} value={userData.role}>
          <option value="student">Student</option>
          <option value="landlord">Landlord</option>
        </select>
        <button type="submit">Register</button>
      </form>
    </div>
  );
};

export default Register;
