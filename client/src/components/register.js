// client/src/pages/Register.js

import React, { useState } from 'react';
import axios from 'axios';
import { Navigate, useNavigate } from 'react-router-dom';
import './register.css'
const Register = ({ history }) => {
  const [formData, setFormData] = useState({
    username: '',
    password: '',
  });
const navigate=useNavigate()
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post('http://localhost:3001/auth/register', formData);
      localStorage.setItem('token', response.data.token);
      navigate('/'); 
    } catch (error) {
      console.error('Error during registration:', error.message);
    }
  };

  return (
    <div className='container'>
      <div className='cardContainer'>
      <h2 className='register'>Register</h2>
      <form onSubmit={handleSubmit}>
        <label>
          Username:
          <input type="text" name="username" value={formData.username} onChange={handleChange} className='userNam' />
        </label>
        <br />
        <label>
          Password:
          <input type="password" name="password" value={formData.password} onChange={handleChange} className='pass'/>
        </label>
        <br />
        <button type="submit" className='button'>Register</button>
      </form>
    </div>
    </div>
  );
};

export default Register;
