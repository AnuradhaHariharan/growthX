import React from 'react'
import './Footer.css'
import { assets } from '../../assets/assets'

const Footer = () => {
  return (
    <div className='footer' id='footer'>
      <div className="footer-content">
        <div className='footer-content-left'>
        <h1 className='company'>Growth <span className='x'>X</span></h1>
         <p>
         GrowthX Education Labs Private Limited
        </p>
        <div className="footer-social-icons">
        
<img
  onClick={() => window.location.href = "https://www.linkedin.com/in/anuradhahariharan13/"}
  src={assets.twitter_icon}
  alt="search"
/>
            <img
  onClick={() => window.location.href = "https://www.linkedin.com/in/anuradhahariharan13/"}
  src={assets.linkedin_icon}
  alt="search"
/>
        </div>
        </div>
        <div className='footer-content-center'>
        <h2>COMPANY</h2>
        <ul>
            <li>Home</li>
            <li>About us</li>
            <li>Privacy policy</li>
        </ul>
        </div>
        <div className='footer-content-right'>
            <h2>GET IN TOUCH</h2>
            <ul>
                <li>+91 8925419205</li>
                <li>anuradhahariharannov5@gmail.com</li>
            </ul>

        </div>
      </div>
      <hr />
      <p className='footer-copyright'>© 2024 GrowthX. All rights reserved. 
      </p>
    </div>
  )
}

export default Footer
