import React, { useContext, useState } from 'react'
import './Navbar.css'
import { assets } from '../../assets/assets'
import { Link, useNavigate } from 'react-router-dom'
import { StoreContext } from '../../context/StoreContext'

const Navbar = ({setShowLogin}) => {

    const [menu,setMenu]= useState("home")
    const {token,setToken, email}=useContext(StoreContext);
    const navigate=useNavigate();

    const logout= ()=>{
      localStorage.removeItem("token");
      setToken("");
      navigate("/")

    }

  return (
    <div className='navbar'>
        <Link to='/'>
      <h2 className='admin'>Admin Panel</h2>
      </Link>
      <ul className="navbar-menu">
        <Link to='#' onClick={() => setMenu("home")} className={menu=="home"?"active":""}>home</Link>
        <a href='#footer' onClick={() => setMenu("contact-us")} className={menu=="contact-us"?"active":""}>contact us</a>
      </ul>
      <div className="navbar-right">
        {!token? <button onClick={()=>setShowLogin(true)}>Sign in</button>
       : (
       <div className='navbar-profile'>
          <div className='userIcon'>
            <img src={assets.profile_icon} alt="" />
            <span>hello, {email}</span>
          </div>
          <ul className='navprofile-dropdown'>
            <li  onClick={logout}><img src={assets.logout_icon} alt="" /><p>Logout</p></li>
          </ul>
       </div>
       )  
      }     
      </div>
    </div>
  )
}

export default Navbar
