import React from 'react'

export default React.createClass({
  render() {
    return <div>
      {/*<!-- Content -->*/}
      <div className="container">

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
              <div className="col-sm-4">
                <a href="" className="image-box">
                  <img src="img/help-center/01.png" alt="Topic"/>
                    <div className="ib-text">
                      <h3 className="ib-title">Manage account</h3>
                    </div>
                </a>
              </div>
              <div className="col-sm-4">
                <a href="" className="image-box">
                  <img src="img/help-center/02.png" alt="Topic"/>
                    <div className="ib-text">
                      <h3 className="ib-title">Syncing and uploads</h3>
                    </div>
                </a>
              </div>
              <div className="col-sm-4">
                <a href="" className="image-box">
                  <img src="img/help-center/03.png" alt="Topic"/>
                    <div className="ib-text">
                      <h3 className="ib-title">Mobile dashboard</h3>
                    </div>
                </a>
              </div>
              <div className="col-sm-4">
                <a href="" className="image-box">
                  <img src="img/help-center/04.png" alt="Topic"/>
                    <div className="ib-text">
                      <h3 className="ib-title">Security and privacy</h3>
                    </div>
                </a>
              </div>
              <div className="col-sm-4">
                <a href="" className="image-box">
                  <img src="img/help-center/05.png" alt="Topic"/>
                    <div className="ib-text">
                      <h3 className="ib-title">Hardware</h3>
                    </div>
                </a>
              </div>
              <div className="col-sm-4">
                <a href="" className="image-box">
                  <img src="img/help-center/06.png" alt="Topic"/>
                    <div className="ib-text">
                      <h3 className="ib-title">Network settings</h3>
                    </div>
                </a>
              </div>
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
