import React from 'react'
import SearchBar from '../components/SearchBar'
import MenuItem from '../components/MenuItem'
import {Link} from 'react-router'
// import Form from './Form'

export default React.createClass({

  render()
  {
    return (
      <div>
        {/*<!-- Navbar -->*/}
        {/*<!-- Add className ".navbar-sticky" to make navbar stuck when it hits the top of the page.
        Another modifier className is: "navbar-fullwidth" to stretch navbar and make it occupy 100% of the page width.
        The screen width at which navbar collapses can be controlled through the variable "$nav-collapse" in sass/variables.scss -->*/}
        <header className="navbar navbar-sticky navbar-fullwidth">

          {/*<!-- Toolbar -->*/}
          <div className="topbar">
            <div className="container">
                <img  className="site-logo" src="/img/logo.png" alt="Unipart Digital Comm Cell"/>
              {/*<!-- .site-logo -->*/}


              {/*<!-- Mobile Menu Toggle -->*/}
              <div className="nav-toggle"><span></span></div>

              <div className="toolbar">
                <Link to="#" className="text-sm" data-toggle="modal" data-target="#loginModal">Sign up</Link>
                <Link to="#" className="btn btn-sm btn-default btn-icon-right waves-effect waves-light"
                   data-toggle="modal" data-target="#loginModal">Log In <i className="icon-head" /></Link>
                <SearchBar/>
                {/*<!-- .search-btn -->*/}
              </div>
              {/*<!-- .toolbar -->*/}
            </div>
            {/*<!-- .container -->*/}
          </div>
          {/*<!-- .topbar -->*/}

          {/*<!-- Main Navigation -->*/}
          <div className="container">
            <nav className="main-navigation">
              <ul className="menu">
                  <MenuItem onlyActiveOnIndex={false} index={true} to="/">Home</MenuItem>
                  <MenuItem to="/features">Features</MenuItem>
                  <MenuItem to="/help">Help</MenuItem>
                  <MenuItem to="/about">About Us</MenuItem>
                  <MenuItem to="/dashboard">Dashboard</MenuItem>
              </ul>
              {/*<!-- .menu -->*/}
            </nav>
            {/*<!-- .main-navigation -->*/}
          </div>
          {/*<!-- .container -->*/}
        </header>
        {/*<!-- .navbar -->*/}
      </div>

    )
  }
});
