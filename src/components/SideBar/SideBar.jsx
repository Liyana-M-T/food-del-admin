import React from 'react'
import './SideBar.css'
import { assets } from '../../assets/assets'
import { NavLink } from 'react-router-dom'
import { FaUserCog } from "react-icons/fa";
import { FaShoppingCart } from "react-icons/fa";
import { CiDiscount1 } from "react-icons/ci";

const SideBar = () => {
  return (
    <div className='sidebar'>
      <div className="sidebar-options">
        <NavLink to='/add' className="sidebar-option">
            <img src={assets.add_icon} alt="" />
            <p>Add Items</p>
        </NavLink>
        <NavLink to='/list' className="sidebar-option">
            <img src={assets.order_icon} alt="" />
            <p>list Items</p>
        </NavLink>
        <NavLink to='/orders' className="sidebar-option">
        <FaShoppingCart className='icons'/>
            <p>Orders</p>
        </NavLink>
        <NavLink to='/user' className="sidebar-option">
        <FaUserCog className='icons'/>
            <p>User Management</p>
        </NavLink>
        <NavLink to='/promocode' className="sidebar-option">
        <CiDiscount1 className='icons' />
            <p>Promo Codes</p>
        </NavLink>
      </div>
    </div>
  )
}

export default SideBar
