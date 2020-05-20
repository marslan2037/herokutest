import React from 'react'
import logo from '../logo.png'
import {
  BrowserRouter as Router,
  Switch,
  Route,
} from 'react-router-dom'
import About from './About'
import Main from './Main'

function Navbar () {
  return (
    <Router>
      <div>
        <nav>
          <div className='leftNav'>
            <a href={'/home'}><img className='logo' src={logo} alt=''/>
              <span>Ecom Experts</span></a>
          </div>
          <ul className='navbar-nav'>
            {/*<li>*/}
            {/*  <Link to="/about">About Us</Link>*/}
            {/*</li>*/}
            <li className='navbar-nav'>
              <a target={'_empty'} href="https://ecomexperts.io/pages/contact">Contact</a>
            </li>
          </ul>
        </nav>
        <Switch>
          <Route path="/about">
            <About/>
          </Route>
          {/*<Route path="/contact">*/}
          {/*  <Contact/>*/}
          {/*</Route>*/}
          <Route path="/:id" component={Main}/>
          <Route path="/" component={Main}/>
          <Route path="/home">
            <Main/>
          </Route>
        </Switch>
      </div>
    </Router>
  )
}

export default Navbar
