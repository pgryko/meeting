import React from 'react'
import SearchBar from './SearchBar'

export default React.createClass({

  render()
  {
    return (
      <div>
      {/*<!-- Navbar -->*/}
      {/*<!-- Add className ".navbar-sticky" to make navbar stuck when it hits the top of the page. Another modifier className is: "navbar-fullwidth" to stretch navbar and make it occupy 100% of the page width. The screen width at which navbar collapses can be controlled through the variable "$nav-collapse" in sass/variables.scss -->*/}
      <header className="navbar navbar-sticky navbar-fullwidth">

        {/*<!-- Toolbar -->*/}
        <div className="topbar">
          <div className="container">
            <a href="index.html" className="site-logo">
              <img src="img/logo.png" alt="Nucleus"/>
            </a>
            {/*<!-- .site-logo -->*/}

            {/*<!-- Mobile Menu Toggle -->*/}
            <div className="nav-toggle"><span></span></div>

            <div className="toolbar">
              <a href="#" className="text-sm" data-toggle="modal" data-target="#loginModal">Sign up</a>
              <a href="#" className="btn btn-sm btn-default btn-icon-right waves-effect waves-light" data-toggle="modal" data-target="#loginModal">Log In <i className="icon-head"></i></a>
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
              <li className="current-menu-item menu-item-has-children">
                <a href="#">Home</a>
              </li>
              <li className="menu-item">
                <a href="#">Features</a>
              </li>
              <li className="menu-item-has-children">
                <a href="#">Help</a>
                <ul className="sub-menu">
                  <li><a href="help-general.html">Help Center General</a></li>
                  <li><a href="help-topic.html">Help Center Topic</a></li>
                </ul>
              </li>
              <li className="menu-item-has-children">
                <a href="#">Pages</a>
                <ul className="sub-menu">
                  <li><a href="about.html">About Us</a></li>
                  <li><a href="contacts.html">Contacts</a></li>
                </ul>
              </li>
            </ul>
            {/*<!-- .menu -->*/}
          </nav>
          {/*<!-- .main-navigation -->*/}
        </div>
        {/*<!-- .container -->*/}
        <div className="social-bar mobile-socials">
          <a href="#" className="sb-skype">
            <i className="fa fa-skype"></i>
          </a>
          <a href="#" className="sb-facebook">
            <i className="fa fa-facebook"></i>
          </a>
          <a href="#" className="sb-twitter">
            <i className="fa fa-twitter"></i>
          </a>
        </div>
      </header>
      {/*<!-- .navbar -->*/}
      </div>

    )
  }
});
