import React from 'react'
// import auth from '../utils/auth'

class DashBoardItem extends React.Component {
  render() {
    return <div className="grid-item apps">
        <a href="#" className="portfolio-item">
          <div className="thumbnail waves-effect waves-light">
            <img src={this.props.image} alt={this.props.title}/>
          </div>
          <h3 className="portfolio-title">{this.props.title}</h3>
        </a>
      </div>;
  }
}

export default React.createClass({
  render() {
    // const token = auth.getToken();
    const token = "Our latest works";

    return (
      <div>
        {/*<!-- Content --> */}
        <section className="container">
          <h2 className="block-title text-center">
            Dashboard
            <small>{token}</small>
          </h2>

          {/*<!-- Filters --> */}
          <div className="text-center padding-top">
            <ul className="nav-filters space-bottom-2x text-center">
              <li className="active"><a href="#" data-filter="*">Show All</a></li>
              <li><a href="#" data-filter=".apps">Recent</a></li>
              <li><a href="#" data-filter=".identity">Art Room</a></li>
            </ul>{/*<!-- .nav-filters --> */}
          </div>

          {/*<!-- Portfolio Grid --> */}
          <div className="grid isotope-grid col-3 filter-grid">
            <div className="grid-sizer"></div>
            <div className="gutter-sizer"></div>

            <DashBoardItem image="img/portfolio/01.jpg" title="CommCell 1" />
            <DashBoardItem image="img/portfolio/02.jpg" title="CommCell 2" />
            <DashBoardItem image="img/portfolio/03.jpg" title="CommCell 3" />
            <DashBoardItem image="img/portfolio/04.jpg" title="CommCell 4" />
            <DashBoardItem image="img/portfolio/05.jpg" title="CommCell 5" />
            <DashBoardItem image="img/portfolio/06.jpg" title="CommCell 6" />

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
