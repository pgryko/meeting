import React from 'react'
// import auth from '../utils/auth'

export default React.createClass({
  render() {
    // const token = auth.getToken();
    const token = "token";

    return (
      <div>
        <h1>Dashboard</h1>
        <p>You made it!</p>
        <p>{token}</p>
        {/*<!-- Content --> */}
        <section className="container">
          <h2 className="block-title text-center">
            Portfolio Standard
            <small>Our latest works</small>
          </h2>

          {/*<!-- Filters --> */}
          <div className="text-center padding-top">
            <ul className="nav-filters space-bottom-2x text-center">
              <li className="active"><a href="#" data-filter="*">Show All</a></li>
              <li><a href="#" data-filter=".apps">Apps</a></li>
              <li><a href="#" data-filter=".identity">Identity Design</a></li>
            </ul>{/*<!-- .nav-filters --> */}
          </div>

          {/*<!-- Portfolio Grid --> */}
          <div className="grid isotope-grid col-3 filter-grid">
            <div className="grid-sizer"></div>
            <div className="gutter-sizer"></div>

            {/*<!-- Portfolio Item --> */}
            <div className="grid-item apps">
              <a href="#" className="portfolio-item">
                <div className="thumbnail waves-effect waves-light">
                  <img src="img/portfolio/01.jpg" alt="Portfolio"/>
                </div>
                <h3 className="portfolio-title">Mobile App</h3>
              </a>
            </div>{/*<!-- .grid-item.apps --> */}

            {/*<!-- Portfolio Item --> */}
            <div className="grid-item identity">
              <a href="#" className="portfolio-item">
                <div className="thumbnail waves-effect waves-light">
                  <img src="img/portfolio/02.jpg" alt="Portfolio"/>
                </div>
                <h3 className="portfolio-title">Identity Design</h3>
              </a>
            </div>{/*<!-- .grid-item.identity --> */}

            {/*<!-- Portfolio Item --> */}
            <div className="grid-item identity">
              <a href="#" className="portfolio-item">
                <div className="thumbnail waves-effect waves-light">
                  <img src="img/portfolio/03.jpg" alt="Portfolio"/>
                </div>
                <h3 className="portfolio-title">Package Design</h3>
              </a>
            </div>{/*<!-- .grid-item.identity --> */}

            {/*<!-- Portfolio Item --> */}
            <div className="grid-item apps">
              <a href="#" className="portfolio-item">
                <div className="thumbnail waves-effect waves-light">
                  <img src="img/portfolio/04.jpg" alt="Portfolio"/>
                </div>
                <h3 className="portfolio-title">App Prototype</h3>
              </a>
            </div>{/*<!-- .grid-item.apps --> */}

            {/*<!-- Portfolio Item --> */}
            <div className="grid-item identity">
              <a href="#" className="portfolio-item">
                <div className="thumbnail waves-effect waves-light">
                  <img src="img/portfolio/05.jpg" alt="Portfolio"/>
                </div>
                <h3 className="portfolio-title">Stationery Design</h3>
              </a>
            </div>{/*<!-- .grid-item.identity --> */}

            {/*<!-- Portfolio Item --> */}
            <div className="grid-item apps">
              <a href="#" className="portfolio-item">
                <div className="thumbnail waves-effect waves-light">
                  <img src="img/portfolio/06.jpg" alt="Portfolio"/>
                </div>
                <h3 className="portfolio-title">Watch App</h3>
              </a>
            </div>{/*<!-- .grid-item.apps --> */}
          </div>{/*<!-- .isotope-masonry-grid --> */}

          {/*<!-- Load More Button --> */}
          <div className="text-center padding-top">
            <a href="#" className="btn btn-default btn-ghost waves-effect">Load More</a>
          </div>
        </section>{/*<!-- .container --> */}

        {/*<!-- Scroll To Top Button --> */}
        <a href="#" className="scroll-to-top-btn">
          <i className="icon-arrow-up"></i>
        </a>{/*<!-- .scroll-to-top-btn --> */}
      </div>
    )
  }
})
