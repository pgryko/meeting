import React from 'react'
import {Link, IndexLink, History} from 'react-router'
import Home from '../container/Home'


export default class PageTitle extends React.Component{
  constructor(props, context, index){
    super(props);
    this.state = {
    }
  }

  render() {

    return (
      <div>
        {/* <!-- Page Title -->*/}
        {/* <!--Add modifier className : "pt-fullwidth" to stretch page title and make it occupy 100% of the page width. -->*/}
        <section className="page-title">
          <div className="container">
            <div className="inner">
              <div className="column">
                <div className="title">
                  <h1>Help Center</h1>
                </div>
                {/* <!-- .title -->*/}
              </div>
              {/* <!-- .column -->*/}
              <div className="column">
                <div className="breadcrumbs">
                  <Link to={"/"}>Home</Link>
                  <span className="delimiter"><i className="icon-arrow-right"></i></span>
                  <span>Help Center</span>
                </div>
                {/* <!-- .breadcrumbs -->*/}
              </div>
              {/* <!-- .column -->*/}
            </div>
          </div>
        </section>
        {/* <!-- .page-title -->*/}
      </div>
    )
  }

}
//        {/*<LinkComponent {...this.props} activeClassName="active" /> */}

// PageTitle.contextTypes = {
//   router: React.PropTypes.object
// };
