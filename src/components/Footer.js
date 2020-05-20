import React from 'react'
import logo from '../logo.png'

function Footer () {
  return (
    <footer>
      <div className='footer_container'>
        <div className='leftNav'>
          <img className='logo' src={logo} alt='Ecom Experts' />
          <span>Copyright 2020, Ecom Experts, All Rights Reserved.</span>
        </div>
      </div>
    </footer>
  )
}
export default Footer
