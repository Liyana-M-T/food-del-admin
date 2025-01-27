import React, { useState } from 'react';
import { Route, Routes, useLocation } from 'react-router-dom';
import NavBar from './components/NavBar/NavBar';
import SideBar from './components/SideBar/SideBar';
import Login from "./pages/Login/Login";
import Add from './pages/Add/Add';
import List from './pages/List/List';
import Edit from './pages/Edit/Edit';
import Orders from './pages/Orders/Orders';
import { ToastContainer } from 'react-toastify';
import Users from './pages/Users/Users';
import PromoCode from './pages/PromoCode/PromoCode';

const App = () => {
  const url = "http://localhost:4000";
  const [showLogin, setShowLogin] = useState(false);
  const location = useLocation();
  const isLoginPage = location.pathname === '/login';

  return (
    <>
      {showLogin ? <LoginPopup setShowLogin={setShowLogin} /> : null}
      <div>
        <ToastContainer />
        {!isLoginPage && <NavBar />}
        <hr />
        <div className="app-content">
          {!isLoginPage && <SideBar />}
          <Routes>
            <Route path='/login' element={<Login url={url}/>} />
            <Route path='/add' element={<Add url={url} />} />
            <Route path='/list' element={<List url={url} />} />
            <Route path='/edit/:id' element={<Edit url={url} />} />
            <Route path='/orders' element={<Orders url={url} />} />
            <Route path='/user' element={<Users url={url} />} />
            <Route path='/promocode' element={<PromoCode url={url} />} />
          </Routes>
        </div>
      </div>
    </>
  );
};

export default App;
