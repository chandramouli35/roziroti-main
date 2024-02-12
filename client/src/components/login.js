// client/src/pages/Login.js

import React, { useState,useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import "./login.css"

const Login = () => {
  const [formData, setFormData] = useState({
    username: '',
    password: '',
  });
  const token = localStorage.getItem('token');
  const navigate = useNavigate();
  useEffect(() => {
   

    if (token) {
      
      navigate('/');
    }
  }, [navigate,token]);
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post('http://localhost:3001/auth/login', formData);
      localStorage.setItem('token', response.data.token);
      localStorage.setItem('userId', response.data.userId); 
      navigate('/');
    } catch (error) {
      console.error('Error during login:', error.message);
    }
  };

  return (
    <div className="container">
      <div className='cardContainer'>
      <h2 className='login'>Login</h2>
      <div>
      <form onSubmit={handleSubmit}>
        <label>
          Username:
          <input type="text" name="username" value={formData.username} onChange={handleChange}  className='userNam'/>
        </label>
        <br />
        <label>
          Password:
          <input type="password" name="password" value={formData.password} onChange={handleChange}  className='pass'/>
        </label>
        <br />
        <button type="submit" className='button'>Login</button>
      </form>
      </div>
      </div>
    </div>
  );
};

export default Login;
