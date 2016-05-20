import React from 'react'
export default React.createClass({
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
                <a href="">Home</a>
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
})
