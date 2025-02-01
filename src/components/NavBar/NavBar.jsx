import React from 'react';
import './NavBar.css';
import { assets } from '../../assets/assets';
import { IoLogOutOutline } from "react-icons/io5";
import { useNavigate } from 'react-router-dom';

const NavBar = () => {
  const navigate = useNavigate();

  const logout = () => {
    if (window.confirm('Are you sure you want to log out?')) {
      localStorage.removeItem('token');
      navigate('/login');
    }
  };

  return (
    <div className="navbar">
      <img className="logo" src={assets.logo} alt="Logo" />
      <div className="navbar-profile">
        <img className="profile" src={assets.profile_image} alt="Profile" />
        <ul className="nav-profile-dropdown">
          <li onClick={logout}>
            <IoLogOutOutline />
            <p>Logout</p>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default NavBar;
