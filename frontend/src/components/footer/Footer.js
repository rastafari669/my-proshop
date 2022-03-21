import React from 'react'
import './footer.css'

const Footer = () => {
    return (
        <div className='footer'>
            <ul className='nav'>
                <li className='nav__item'><a href='/' className='nav__link'>Find your Pruduct</a></li>
                <li className='nav__item'><a href='/' className='nav__link'>Request Proposal</a></li>
                <li className='nav__item'><a href='/' className='nav__link'>About Us</a></li>
                <li className='nav__item'><a href='/' className='nav__link'>Contact Us</a></li>
                <li className='nav__item'><a href='/' className='nav__link'>Come Work with Us</a></li>
            </ul>
            <p className="copyright">
                &copy; Copyright 2021 by Joey Kraus
            </p>
        </div>
    )
}

export default Footer
