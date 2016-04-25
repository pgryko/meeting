import React from 'react'

//Menu Container for front page

export default React.createClass({
  render() {
    return (
      <div>
      {/* Navbar */}
          {/* Add class ".navbar-sticky" to make navbar stuck when it hits the top of the page. Another modifier class is: "navbar-fullwidth" to stretch navbar and make it occupy 100% of the page width. The screen width at which navbar collapses can be controlled through the variable "$nav-collapse" in sass/variables.scss */}
          <header class="navbar navbar-sticky">

            {/*<!-- Toolbar -->*/}
            <div class="topbar">
              <div class="container">
                <a href="index.html" class="site-logo">
                  <img src="img/logo.png" alt="Nucleus"/>
                </a>
                {/*<!-- .site-logo -->*/}

                {/*<!-- Mobile Menu Toggle -->*/}
                <div class="nav-toggle"><span></span></div>

                <div class="toolbar">
                  <a href="#" class="text-sm" data-toggle="modal" data-target="#loginModal">Sign up</a>
                  <a href="#" class="btn btn-sm btn-default btn-icon-right waves-effect waves-light" data-toggle="modal" data-target="#loginModal">Log In <i class="icon-head"></i></a>
                  <div class="search-btn">
                    <i class="icon-search"></i>
                    <form method="post" class="search-box">
                      <input type="text" class="form-control input-sm" placeholder="Search"/>
                      <button type="submit"><i class="icon-search"></i></button>
                    </form>
                  </div>
                  {/*<!-- .search-btn -->*/}
                </div>
                {/*<!-- .toolbar -->*/}
              </div>
              {/*<!-- .container -->*/}
            </div>
            {/*<!-- .topbar -->*/}

            {/*<!-- Main Navigation -->*/}
            <div class="container">
              <nav class="main-navigation">
                <ul class="menu">
                  <li class="menu-item-has-children">
                    <a href="#"><i class="flaticon-technology46"></i>Home</a>
                    <div class="mega-menu">
                      <ul>
                        <li><a href="home-hosting.html">Hosting &amp; Cloud Services</a></li>
                        <li><a href="home-app-showcase.html">App Showcase Landing</a></li>
                        <li><a href="home-conference.html">Conference &amp; Meetings</a></li>
                        <li><a href="home-startup.html">Startup Landing Page</a></li>
                        <li><a href="home-shop.html">Shop Homepage</a></li>
                        <li><a href="home-product-promo.html">Product Promo Page</a></li>
                        <li><a href="home-seo.html">SEO Services Landing</a></li>
                      </ul>
                      <div class="content">
                        <img src="img/menu-banner.png" alt="Image"/>
                      </div>
                    </div>
                  </li>
                  <li class="menu-item-has-children">
                    <a href="#"><i class="flaticon-space-ship2"></i>Features</a>
                    <ul class="sub-menu">
                      <li><a href="features.html">Features Page</a></li>
                      <li><a href="tour-scale.html">App Tour Slider Scale</a></li>
                      <li><a href="tour-rotate.html">App Tour Slider Rotate</a></li>
                      <li><a href="tour-gallery.html">App Tour Slider Gallery</a></li>
                      <li><a href="tour-opacity.html">App Tour Slider Opacity</a></li>
                      <li><a href="tour-parallax.html">App Tour Slider Parallax</a></li>
                    </ul>
                  </li>
                  <li class="menu-item-has-children">
                    <a href="#"><i class="flaticon-wireless-internet6"></i>Help</a>
                    <ul class="sub-menu">
                      <li><a href="help-general.html">Help Center General</a></li>
                      <li><a href="help-topic.html">Help Center Topic</a></li>
                    </ul>
                  </li>
                  <li class="menu-item-has-children">
                    <a href="#"><i class="flaticon-chatting"></i>Blog</a>
                    <ul class="sub-menu">
                      <li><a href="blog-no-sidebar.html">Blog No Sidebar</a></li>
                      <li><a href="blog-right-sidebar.html">Blog Right Sidebar</a></li>
                      <li><a href="blog-left-sidebar.html">Blog Left Sidebar</a></li>
                      <li><a href="post-no-sidebar.html">Single Post No Sidebar</a></li>
                      <li><a href="post-right-sidebar.html">Single Post Right Sidebar</a></li>
                      <li><a href="post-left-sidebar.html">Single Post Left Sidebar</a></li>
                    </ul>
                  </li>
                  <li class="menu-item-has-children">
                    <a href="#"><i class="flaticon-drawing33"></i>Portfolio</a>
                    <ul class="sub-menu">
                      <li><a href="portfolio-standard.html">Standard Grid</a></li>
                      <li><a href="portfolio-grid-gap.html">Grid With Gap</a></li>
                      <li><a href="portfolio-grid-no-gap.html">Grid No Gap</a></li>

                    </ul>
                  </li>
                  <li class="menu-item-has-children">
                    <a href="#"><i class="flaticon-cd-player"></i>Shop</a>
                    <ul class="sub-menu">
                      <li><a href="shop-catalog.html">Shop Catalog</a></li>
                      <li><a href="shop-single.html">Single Product</a></li>
                      <li><a href="shopping-cart.html">Shopping Cart</a></li>
                      <li><a href="checkout.html">Checkout</a></li>
                    </ul>
                  </li>
                  <li class="menu-item-has-children current-menu-item">
                    <a href="#"><i class="flaticon-microphone121"></i>Pages</a>
                    <ul class="sub-menu">
                      <li><a href="about.html">About Us</a></li>
                      <li><a href="contacts.html">Contacts</a></li>
                      <li><a href="pricing.html">Pricing</a></li>
                      <li><a href="press-kit.html">Press Kit</a></li>
                      <li class="current-menu-item"><a href="404.html">404</a></li>
                      <li><a href="elements.html">Elements</a></li>
                    </ul>
                  </li>
                </ul>
                {/*<!-- .menu -->*/}
              </nav>
              {/*<!-- .main-navigation -->*/}
            </div>
            {/*<!-- .container -->*/}
            <div class="social-bar mobile-socials">
              <a href="#" class="sb-skype">
                <i class="fa fa-skype"></i>
              </a>
              <a href="#" class="sb-facebook">
                <i class="fa fa-facebook"></i>
              </a>
              <a href="#" class="sb-twitter">
                <i class="fa fa-twitter"></i>
              </a>
            </div>
          </header>
          {/*<!-- .navbar -->*/}

      </div>
    )
  }
})
