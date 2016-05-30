import React from 'react'
import {Link} from 'react-router'

export default class Footer extends React.Component {
  render() {
    return <div>
      {/*<!-- Footer --> */}
      <footer className="footer">
        <div className="top-footer">
          <div className="container">
            <div className="tools">
              <div className="cell">
                <i><img src="img/footer/icons/help.png" alt="Email"/></i>
                <span><a href="mailto:piotr.gryko@unipart.io">piotr.gryko@unipart.io</a></span>
              </div>
              <div className="cell">
                <i><img src="img/footer/icons/phone.png" alt="Phone"/></i>
                <span><a href="#">+44 (0) 7904049491</a></span>
              </div>
              <div className="cell">
                <i><img src="img/footer/icons/chat.png" alt="Chat"/></i>
                <span><a href="#">Live Chat</a></span>
              </div>
            </div>
            <div className="subscribe">
              <div className="subscribe-form">
                <i><img src="img/footer/icons/envelope.png" alt="Subscribe"/></i>
                <form action="list-manage.com" method="post" target="_blank" novalidate autocomplete="off">
                  <label for="subscr_email" className="sr-only">Subscribe to latest news</label>
                  <input type="email" className="form-control" id="subscr_email" placeholder="Your Email"/>
                    {/*<!-- real people should not fill this in and expect good things - do not remove this or risk form bot signups--> */}
                    <div style={{"position": "absolute", "left": "-5000px"}}>
                      <input type="text" name="b_168a366a98d3248fbc35c0b67_011a3332a0" tabindex="-1" value=""/>
                    </div>
                    <button type="submit"><i className="icon-mail"></i></button>
                </form>
              </div>
            </div>
          </div>{/*<!-- .container --> */}
        </div>{/*<!-- .top-footer --> */}
      </footer>{/*<!-- .footer -->*/}
    </div>;
  }
}
