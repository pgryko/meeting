import React from 'react'
import {Link,Route} from 'react-router'
import PageTitle from '../components/PageTitle'

class HelpItem extends React.Component {

  constructor(props, context, index){
    super(props);
  }

  render()
  {
    return  <div className="col-sm-4">
      <Link to= {"/help/" + this.props.title} className="image-box">
        <img src={this.props.imgSrc} alt={this.props.title}/>
        <div className="ib-text">
          <h3 className="ib-title">{this.props.title}</h3>
        </div>
      </Link>
    </div>
  }
}

HelpItem.contextTypes = {
  router: React.PropTypes.object,
  title: React.PropTypes.string,
  imgSrc: React.PropTypes.string
};

export default React.createClass({
  render() {
    return <div>
      {/*<!-- Content -->*/}
      <div className="container">

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
              </div>
              {/* <!-- .column -->*/}
            </div>
          </div>
        </section>
        {/* <!-- .page-title -->*/}

        {/*<!-- Help Search -->*/}
        <form method="get" className="help-search">
          <input type="text" className="form-control" placeholder="Search Help Center"/>
            <button type="submit" className="waves-effect waves-light"><i className="icon-search"></i></button>
        </form>{/*<!-- .help-search -->*/}

        {/*<!-- Topics -->*/}
        <h2 className="block-title text-center padding-top-3x">
          How can we help you?
          <small>Choose a category to find the help you need</small>
        </h2>
        <div className="row padding-top">
          <div className="col-lg-10 col-lg-offset-1">
            <div className="row padding-bottom-2x">
              <HelpItem title="Manage Account" imgSrc="img/help-center/01.png"/>
              <HelpItem title="Syncing and uploads" imgSrc="img/help-center/02.png"/>
              <HelpItem title="DashBoard" imgSrc="img/help-center/03.png"/>
              <HelpItem title="Security and Privacy" imgSrc="img/help-center/04.png"/>
              <HelpItem title="HardWare" imgSrc="img/help-center/05.png"/>
              <HelpItem title="Network and Connectivity" imgSrc="img/help-center/06.png"/>
            </div>{/*<!-- .row -->*/}

            {/*<!-- FAQ -->*/}
            <h6 className="text-normal text-muted">Frequently Asked Questions</h6>
              <div className="row">
                <div className="col-sm-4">
                  <ul className="list-featured">
                    <li><a href="" className="no-border">Common Questions 1</a></li>
                    <li><a href="" className="no-border">How Do I Check Item Compatibility?</a></li>
                    <li><a href="" className="no-border">Item Installation Guide &amp; Help Documentation</a></li>
                    <li><a href="" className="no-border">Manage account</a></li>
                  </ul>
                </div>
                <div className="col-sm-4">
                  <ul className="list-featured">
                    <li><a href="" className="no-border">How do I share files with other people?</a></li>
                    <li><a href="" className="no-border">How Do I Check Item Compatibility?</a></li>
                    <li><a href="" className="no-border">Item Installation Guide &amp; Help Documentation</a></li>
                    <li><a href="" className="no-border">Manage account</a></li>
                  </ul>
                </div>
                <div className="col-sm-4">
                  <ul className="list-featured">
                    <li><a href="" className="no-border">How do I download a file?</a></li>
                    <li><a href="" className="no-border">How Do I Check Item Compatibility?</a></li>
                    <li><a href="" className="no-border">Item Installation Guide &amp; Help Documentation</a></li>
                    <li><a href="" className="no-border">Manage account</a></li>
                  </ul>
                </div>
              </div>
          </div>
          {/*<!-- .col-lg-10.col-lg-offset-1 -->*/}
        </div>
        {/*<!-- .row -->*/}
      </div>
      {/*<!-- .container -->*/}

      {/*<!-- Scroll To Top Button -->*/}
      <a href="" className="scroll-to-top-btn">
        <i className="icon-arrow-up"></i>
      </a>
      {/*<!-- .scroll-to-top-btn -->*/}
    </div>
  }
})
