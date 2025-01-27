import React from 'react'
import './NavBar.css'
import {assets} from '../../assets/assets' 
import { IoLogOutOutline } from "react-icons/io5";

const NavBar = () => {

  const logout = () => {
    if (window.confirm('Are you sure you want to log out?')) {
      localStorage.removeItem('token');
      setToken('');
      navigate('/login');
    }
  }; 

  return (
    <div className='navbar'>
      <img className='logo' src={assets.logo} alt="" />
      <img className='profile' src={assets.profile_image} alt="" />
      <ul className="nav-profile-dropdown">
          <li><IoLogOutOutline /><p>Logout</p></li>
      </ul>
    </div>
  )
}

export default NavBar
