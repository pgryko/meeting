import React from 'react'
import {Link,Route} from 'react-router'
import PageTitle from '../components/PageTitle'

export default React.createClass({

  render() {
    return (
      <div>
        <PageTitle  titleName={this.props.params.topicID}/>
        <div className="container padding-bottom">
        {/* <!-- Content --> */}
        <div className="col-lg-8 col-md-8 col-lg-offset-1 col-lg-push-3 col-md-push-4">
          <h2 className="block-title">
            {this.props.params.topicID}
            {/*this.props.params.topicId */}
            <small>Relevant information, topic id is {this.props.params.topicID}</small>
          </h2>
          <src src="img/help-center/image.jpg" className="space-bottom" alt="Image"/>
            <p className="padding-bottom">Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum. Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo. Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur magni dolores eos qui ratione voluptatem sequi nesciunt. Neque porro quisquam est, qui dolorem ipsum.</p>
            <div className="panel-group" id="accordion">
              <div className="panel">
                <div className="panel-heading">
                  <a className="panel-title collapsed" data-toggle="collapse" data-parent="#accordion" to="#collapseOne">
                    How do I link to a file or folder?
                  </a>
                </div>
                <div id="collapseOne" className="panel-collapse collapse">
                  <div className="panel-body">
                    Anim pariatur cliche reprehenderit, enim eiusmod high life accusamus terry richardson ad squid. 3 wolf moon officia aute, non cupidatat skateboard dolor brunch. Food truck quinoa nesciunt laborum eiusmod. Brunch 3 wolf moon tempor, sunt aliqua put a bird on it squid single-origin coffee nulla assumenda shoreditch et. Nihil anim keffiyeh helvetica, craft beer labore wes anderson cred nesciunt sapiente ea proident. Ad vegan excepteur butcher vice lomo.
                  </div>
                </div>
              </div>{/* <!-- .panel --> */}
              <div className="panel">
                <div className="panel-heading">
                  <Link to="#collapseTwo"> className="panel-title collapsed" data-toggle="collapse" data-parent="#accordion" to="#collapseTwo">
                    How do I share folders with other people?
                  </Link>
                </div>
                <div id="collapseTwo" className="panel-collapse collapse" role="tabpanel">
                  <div className="panel-body">
                    Anim pariatur cliche reprehenderit, enim eiusmod high life accusamus terry richardson ad squid. 3 wolf moon officia aute, non cupidatat skateboard dolor brunch. Food truck quinoa nesciunt laborum eiusmod. Brunch 3 wolf moon tempor, sunt aliqua put a bird on it squid single-origin coffee nulla assumenda shoreditch et. Nihil anim keffiyeh helvetica, craft beer labore wes anderson cred nesciunt sapiente ea proident. Ad vegan excepteur butcher vice lomo.
                  </div>
                </div>
              </div>{/* <!-- .panel --> */}
              <div className="panel">
                <div className="panel-heading">
                  <Link className="panel-title" data-toggle="collapse" data-parent="#accordion" to="#collapseThree">
                    How do I sync files between computers?
                  </Link>
                </div>
                <div id="collapseThree" className="panel-collapse collapse in">
                  <div className="panel-body">
                    Anim pariatur cliche reprehenderit, enim eiusmod high life accusamus terry richardson ad squid. 3 wolf moon officia aute, non cupidatat skateboard dolor brunch. Food truck quinoa nesciunt laborum eiusmod. Brunch 3 wolf moon tempor, sunt aliqua put a bird on it squid single-origin coffee nulla assumenda shoreditch et. Nihil anim keffiyeh helvetica, craft beer labore wes anderson cred nesciunt sapiente ea proident. Ad vegan excepteur butcher vice lomo.
                  </div>
                </div>
              </div>{/* <!-- .panel --> */}
              <div className="panel">
                <div className="panel-heading">
                  <Link className="panel-title collapsed" data-toggle="collapse" data-parent="#accordion" to="#collapseFour">
                    How do I enable two-step verification on my account?
                  </Link>
                </div>
                <div id="collapseFour" className="panel-collapse collapse">
                  <div className="panel-body">
                    Anim pariatur cliche reprehenderit, enim eiusmod high life accusamus terry richardson ad squid. 3 wolf moon officia aute, non cupidatat skateboard dolor brunch. Food truck quinoa nesciunt laborum eiusmod. Brunch 3 wolf moon tempor, sunt aliqua put a bird on it squid single-origin coffee nulla assumenda shoreditch et. Nihil anim keffiyeh helvetica, craft beer labore wes anderson cred nesciunt sapiente ea proident. Ad vegan excepteur butcher vice lomo.
                  </div>
                </div>
              </div>{/* <!-- .panel --> */}
            </div>
            {/* <!-- .panel-group --> */}
        </div>{/* <!-- .col-lg-8.col-md-8.col-lg-offset-1.col-lg-push-3.col-md-push-4 --> */}

        {/* <!-- Sidebar --> */}
        <div className="col-lg-3 col-md-4 col-lg-pull-9 col-md-pull-8">
          <div className="space-top-3x visible-sm visible-xs"></div>
          <aside className="sidebar space-bottom-2x">
            <section className="widget widget_categories">
              <h3 className="widget-title">
                <i className="icon-ribbon"></i>
                Help Center
              </h3>
              <ul>
                <li><Link to="#">Support<span>3</span></Link></li>
                <li><Link to="#">Space and storage<span>4</span></Link></li>
                <li><Link to="#">Hosting<span>11</span></Link></li>
                <li><Link to="#">Manage account<span>6</span></Link></li>
                <li><Link to="#">Desctop client and web app<span>13</span></Link></li>
                <li><Link to="#">Security and privacy<span>9</span></Link></li>
                <li><Link to="#">Payments and billing<span>7</span></Link></li>
                <li><Link to="#">Mobile<span>18</span></Link></li>
              </ul>
            </section>{/* <!-- .widget.widget_categories --> */}
          </aside>{/* <!-- .sidebar --> */}
          <h6 className="text-normal text-muted">Relevant articles</h6>
          <hr className="space-bottom"/>
            <ul className="list-featured">
              <li><Link to="#" className="no-border">Common WordPress Installation</Link></li>
              <li><Link to="#" className="no-border">How Do I Check Compatibility?</Link></li>
              <li><Link to="#" className="no-border">Item Installation Guide &amp; Help Documentation</Link></li>
              <li><Link to="#" className="no-border">Manage account</Link></li>
            </ul>
        </div>

  {/* <!-- Topics --> */}

  {/* <!-- Scroll To Top Button --> */}
    <Link to="#" className="scroll-to-top-btn">
      <i className="icon-arrow-up"></i>
    </Link>
    {/* <!-- .scroll-to-top-btn --> */}

          </div> {/*End container */}
  </div>
    )
  }
})
