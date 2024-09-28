import React from 'react'
import './Footer.css'
import { assets } from '../../assets/assets'

const Footer = () => {
  return (
    <div className='footer' id='footer'>
      <div className="footer-content">
        <div className='footer-content-left'>
         <img src={assets.logo} alt="" />
         <p>
            At Tomato, we believe in bringing the freshest ingredients and bold flavors to your table. Our passion for culinary excellence and commitment to quality ensure every bite is an unforgettable experience. Join us on a delicious journey!
        </p>
        <div className="footer-social-icons">
            <img src={assets.facebook_icon} alt="" />
            <img src={assets.twitter_icon} alt="" />
            <img src={assets.linkedin_icon} alt="" />
        </div>
        </div>
        <div className='footer-content-center'>
        <h2>COMPANY</h2>
        <ul>
            <li>Home</li>
            <li>About us</li>
            <li>Delivery</li>
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
      <p className='footer-copyright'>© 2024 Tomato. All rights reserved. Designed with passion for food lovers.
      </p>
    </div>
  )
}

export default Footer
