import React from 'react'

class Teammate extends React.Component {

  constructor(props) {
    //  call super() to pass the props to React.Component.
    super(props);
  }


  render() {
    return (
      <div>
        {this.props}
      </div>
    );
  }
}

Teammate.PropTypes = {
  imgURL: React.PropTypes.string,
  email: React.PropTypes.string
};

export default React.createClass({
  render() {
    return (
      <div>
        {/*<!-- Team Type 1 --> */}
        <section className="container padding-bottom-3x">
          <h2 className="block-title text-center">
            Smart people. Brilliant ideas.
            <small>Who's behind all this?</small>
          </h2>
          <div className="row padding-top">
            {/*<!-- Teammate -->*/}
            <div className="col-lg-3 col-sm-6">
              <div className="teammate-1 text-center">
                <div className="thumbnail">
                  <div className="flipper">
                    <div className="front">
                      <img src="img/team/04.jpg" alt="Team"/>
                    </div>
                    <div className="back">
                      <p className="padding-top">Lorem ipsum dolor sit amet, consectetur adipisicing elit. Delectus
                        natus,
                        reiciendis vel exercitationem error.</p>
                      <div className="social-bar">
                        <a href="#" className="sb-skype" data-toggle="tooltip" title="Skype">
                          <i className="fa sb-email"></i>
                        </a>
                        <a href="#" className="sb-facebook" data-toggle="tooltip" title="Facebook">
                          <i className="fa fa-facebook"></i>
                        </a>
                        <a href="#" className="sb-twitter" data-toggle="tooltip" title="Twitter">
                          <i className="fa fa-twitter"></i>
                        </a>
                      </div>
                    </div>
                  </div>
                </div>
                <h3 className="teammate-name">Lil Huston</h3>
                <p>Co-founder &amp; CEO</p>
              </div>
            </div>
            {/*<!-- Teammate -->*/}
            <div className="col-lg-3 col-sm-6">
              <div className="teammate-1 text-center">
                <div className="thumbnail">
                  <div className="flipper">
                    <div className="front">
                      <img src="img/team/05.jpg" alt="Team"/>
                    </div>
                    <div className="back">
                      <p className="padding-top">Lorem ipsum dolor sit amet, consectetur adipisicing elit. Delectus
                        natus,
                        reiciendis vel exercitationem error.</p>
                      <div className="social-bar">
                        <a href="#" className="sb-facebook" data-toggle="tooltip" title="Facebook">
                          <i className="fa fa-facebook"></i>
                        </a>
                        <a href="#" className="sb-dribbble" data-toggle="tooltip" title="Dribbble">
                          <i className="fa fa-dribbble"></i>
                        </a>
                        <a href="#" className="sb-behance" data-toggle="tooltip" title="Behance">
                          <i className="fa fa-behance"></i>
                        </a>
                      </div>
                    </div>
                  </div>
                </div>
                <h3 className="teammate-name">Amy Rollhouse</h3>
                <p>Co-founder &amp; CTO</p>
              </div>
            </div>
            {/*<!-- Teammate -->*/}
            <div className="col-lg-3 col-sm-6">
              <div className="teammate-1 text-center">
                <div className="thumbnail">
                  <div className="flipper">
                    <div className="front">
                      <img src="img/team/06.jpg" alt="Team"/>
                    </div>
                    <div className="back">
                      <p className="padding-top">Lorem ipsum dolor sit amet, consectetur adipisicing elit. Delectus
                        natus,
                        reiciendis vel exercitationem error.</p>
                      <div className="social-bar">
                        <a href="#" className="sb-stackoverflow" data-toggle="tooltip" title="Stack Overflow">
                          <i className="fa fa-stack-overflow"></i>
                        </a>
                        <a href="#" className="sb-facebook" data-toggle="tooltip" title="Facebook">
                          <i className="fa fa-facebook"></i>
                        </a>
                        <a href="#" className="sb-google-plus" data-toggle="tooltip" title="Google Plus">
                          <i className="fa fa-google-plus"></i>
                        </a>
                      </div>
                    </div>
                  </div>
                </div>
                <h3 className="teammate-name">Josh</h3>
                <p>VP of Infrastructure</p>
              </div>
            </div>
            {/*<!-- Teammate -->*/}
            <div className="col-lg-3 col-sm-6">
              <div className="teammate-1 text-center">
                <div className="thumbnail">
                  <div className="flipper">
                    <div className="front">
                      <img src="img/team/07.jpg" alt="Team"/>
                    </div>
                    <div className="back">
                      <p className="padding-top">Lorem ipsum dolor sit amet, consectetur adipisicing elit. Delectus
                        natus,
                        reiciendis vel exercitationem error.</p>
                      <div className="social-bar">
                        <a href="#" className="sb-skype" data-toggle="tooltip" title="Skype">
                          <i className="fa sb-email"></i>
                        </a>
                        <a href="#" className="sb-facebook" data-toggle="tooltip" title="Facebook">
                          <i className="fa fa-facebook"></i>
                        </a>
                        <a href="#" className="sb-twitter" data-toggle="tooltip" title="Twitter">
                          <i className="fa fa-twitter"></i>
                        </a>
                      </div>
                    </div>
                  </div>
                </div>
                <h3 className="teammate-name">Kim Kurdasha</h3>
                <p>General Counsel</p>
              </div>
            </div>
          </div>
          {/*<!-- .row -->*/}
          <div className="row">
            {/*<!-- Teammate -->*/}
            <div className="col-lg-3 col-sm-6">
              <div className="teammate-1 text-center">
                <div className="thumbnail">
                  <div className="flipper">
                    <div className="front">
                      <img src="img/team/08.jpg" alt="Team"/>
                    </div>
                    <div className="back">
                      <p className="padding-top">Lorem ipsum dolor sit amet, consectetur adipisicing elit. Delectus
                        natus,
                        reiciendis vel exercitationem error.</p>
                      <div className="social-bar">
                        <a href="#" className="sb-facebook" data-toggle="tooltip" title="Facebook">
                          <i className="fa fa-facebook"></i>
                        </a>
                        <a href="#" className="sb-dribbble" data-toggle="tooltip" title="Dribbble">
                          <i className="fa fa-dribbble"></i>
                        </a>
                        <a href="#" className="sb-behance" data-toggle="tooltip" title="Behance">
                          <i className="fa fa-behance"></i>
                        </a>
                      </div>
                    </div>
                  </div>
                </div>
                <h3 className="teammate-name">Andy Cabana</h3>
                <p>Designer</p>
              </div>
            </div>
            {/*<!-- Teammate -->*/}
            <div className="col-lg-3 col-sm-6">
              <div className="teammate-1 text-center">
                <div className="thumbnail">
                  <div className="flipper">
                    <div className="front">
                      <img src="img/team/09.jpg" alt="Team"/>
                    </div>
                    <div className="back">
                      <p className="padding-top">Lorem ipsum dolor sit amet, consectetur adipisicing elit. Delectus
                        natus,
                        reiciendis vel exercitationem error.</p>
                      <div className="social-bar">
                        <a href="#" className="sb-stackoverflow" data-toggle="tooltip" title="Stack Overflow">
                          <i className="fa fa-stack-overflow"></i>
                        </a>
                        <a href="#" className="sb-facebook" data-toggle="tooltip" title="Facebook">
                          <i className="fa fa-facebook"></i>
                        </a>
                        <a href="#" className="sb-google-plus" data-toggle="tooltip" title="Google Plus">
                          <i className="fa fa-google-plus"></i>
                        </a>
                      </div>
                    </div>
                  </div>
                </div>
                <h3 className="teammate-name">Kale Lake</h3>
                <p>Support</p>
              </div>
            </div>
            {/*<!-- Teammate -->*/}
            <div className="col-lg-3 col-sm-6">
              <div className="teammate-1 text-center">
                <div className="thumbnail">
                  <div className="flipper">
                    <div className="front">
                      <img src="img/team/10.jpg" alt="Team"/>
                    </div>
                    <div className="back">
                      <p className="padding-top">Lorem ipsum dolor sit amet, consectetur adipisicing elit. Delectus
                        natus,
                        reiciendis vel exercitationem error.</p>
                      <div className="social-bar">
                        <a href="#" className="sb-skype" data-toggle="tooltip" title="Email">
                          <i className="fa fa-envelope"></i>
                        </a>
                        <a href="#" className="sb-facebook" data-toggle="tooltip" title="Mobile">
                          <i className="fa fa-mobile"></i>
                        </a>
                        <a href="#" className="sb-twitter" data-toggle="tooltip" title="Twitter">
                          <i className="fa fa-twitter"></i>
                        </a>
                      </div>
                    </div>
                  </div>
                </div>
                <h3 className="teammate-name">James Birkins</h3>
                <p>Developer</p>
              </div>
            </div>
          </div>
          {/*<!-- .row --> */}
          {/*<!-- Quotation -->*/}
          <h3 className="text-muted text-center space-bottom">Team Philosophy</h3>
          <div className="row space-bottom-2x">
            <div className="col-md-10 col-md-offset-1">
              <blockquote>
                <p>He who works with his hands is a laborer.
                  He who works with his hands and his head is a craftsman.
                  He who works with his hands and his head and his heart is an artist.</p>
                <cite>Louis Nizer</cite>
              </blockquote>
              {/*<!-- block quote -->*/}
            </div>
            {/*<!-- .col-md-10.col-md-offset-1 -->*/}
          </div>
          {/*<!-- .row -->*/}
          <p>Its that last part that is hard to bridge for a lot of engineers.
            The thing that did it for me was sitting through a LOT of formal usability studies.
            Seeing folks actually use an application you made, where they make mistakes, get stuck,
            will change your relationship with your code. Even if you work purely on the back end building APIs,
            you have customers (other developers in this case).
            Focus on the what the code does, and why someone would use it,
            care about your customer... the how only matters to your fellow engineer,
            and if it is that bad they are going to give you grief for it and you can fix it.</p>
        </section>
        {/*<!-- .container --> */}
      </div>

    )
  }
})

