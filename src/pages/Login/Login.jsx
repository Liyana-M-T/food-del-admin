import React, { useContext, useState } from 'react';
import './Login.css';
import axios from 'axios';
import {useNavigate } from 'react-router-dom';

const Login = ({ url }) => {
  
  const navigate = useNavigate(); 
  const [data, setData] = useState({
    email: '',
    password: '',
  });
  const [token,setToken] = useState("");
  
  const onChangeHandler = (event) => {
    const { name, value } = event.target;
    setData((prev) => ({ ...prev, [name]: value }));
  };
       

  const onLogin = async (event) => {
    event.preventDefault();
    const adminLogin= `${url}/api/admin/login`; 

    try {
      const response = await axios.post(adminLogin, data);

      if (response.data.success) {
        setToken(response.data.token);
        localStorage.setItem('token', response.data.token);
        alert('Login successful!');
        navigate('/')
      } else {
        alert(response.data.message);
      }
      
    } catch (error) {
      console.error('Error during login:', error);
      alert('Failed to log in. Please try again.');
    }
  };

  return (
    <div className="login-page">
      <form onSubmit={onLogin} className="login-page-container">
        <div className="login-page-title">
          <h2>Admin Login</h2>
        </div>
        <div className="login-page-inputs">
          <input
            name="email"
            onChange={onChangeHandler}
            value={data.email}
            type="email"
            placeholder="Admin Email"
            required
          />
          <input
            name="password"
            onChange={onChangeHandler}
            value={data.password}
            type="password"
            placeholder="Password"
            required
          />
        </div>
        <button type="submit">Login</button>
      </form>
    </div>
  );
};

export default Login;
