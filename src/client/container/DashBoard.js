import React from 'react'
import axios from 'axios'
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
/*

Note to self, ideally we wil want to retrieve a list of dashboard items and pass them onto components,
something along these lines

** A key is required for generating dom from loops**

 createListItem: function(user) {
   return (
     <li key={user.id}>
      <Link to="{'/users/' + user.id}">{user.name}</Link>
     </li>
   );
   }
 });

 class DashBoardList extends React.Component{
   render: function() {
   return (
     <ul className="user-list">
     {this.props.users.map(this.createListItem)}
     </ul>
   );
 }
 };

 */


export default class DashBoard extends React.Component{

  constructor(props){
    super(props);
    this.state = {
      dashboards: [],
      pollInterval: 2000
    }
  }

  // loadCommentsFromServer() {
  //   axios.get('/path/to/user-api').then( response => {
  //     this.setState({dashboards: response.data})
  //   });
  // }



  // componentDidMount() {
  //   this.loadCommentsFromServer();
  //   setInterval(this.loadCommentsFromServer.bind(this), this.state.pollInterval);
  // }


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
}
