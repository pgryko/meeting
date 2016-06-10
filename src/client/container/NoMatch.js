import React from 'react'
import {Link} from 'react-router'

export default class NoMatch extends React.Component {
  render() {
    return <div>
      {/* Container --> */}
      <div className="container text-center padding-top-3x">
        <div className="row">
          <div className="col-lg-6 col-lg-offset-3 col-md-8 col-md-offset-2 col-sm-10 col-sm-offset-1">
            <h2 className="text-thin space-top">404 Page not found</h2>
            <p className="text-xs text-muted text-uppercase space-bottom-2x">You may want to head back to the homepage. If you think something is broken, please do not hesitate to report a problem.</p>
            <Link to="/" className="btn btn-default waves-effect waves-light">Back to Homepage</Link>
            <img className="block-center space-top-2x" src="/img/404.png" alt="404"/>
          </div>
        </div>{/* .row --> */}
      </div>{/* .container --> */}
    </div>;
  }
}
