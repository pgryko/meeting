import React from 'react'
import {Link, IndexLink, History} from 'react-router'


export default class PageTitle extends React.Component{
  constructor(props, context, index){
    super(props);
  }

  render() {
    console.log(this.props);

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
                  <Link to={"/help"}>Help Center</Link>
                  <span className="delimiter"><i className="icon-arrow-right"></i></span>
                  <Link to={"/help/" + this.props.titleName} >{this.props.titleName}</Link>
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

PageTitle.contextTypes = {
  titleName: React.PropTypes.string
};
