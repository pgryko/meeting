import React from 'react'
var ReactDOM  = require('react-dom');


var durationFn = function(deltaTop) {
  return deltaTop;
};

var Section = React.createClass({
  componentDidMount: function() {


  },
  scrollToTop: function() {
  },
  componentWillUnmount: function() {

  },

  onScroll: function () {
    console.log("Scroll occurred");
  },
  render: function () {

    return (
      <div onScroll={() => console.log("Scroll occurred")}>
          <section className="cd-section visible">
              <div className="content">
                <img src="img/scroll-slideshow/01.png" />
              </div>
          </section>

          <section className="cd-section">
            <div className="content">
              <img src="img/scroll-slideshow/03.png" />
            </div>
          </section>

          <section className="cd-section">
            <div className="content">
              <img src="img/scroll-slideshow/02.png" />
            </div>
          </section>


        {/*<a onClick={this.scrollToTop}>To the top!</a> */}

      </div>
    );
  }
});

export default React.createClass({
  render() {
    return <div>
      <Section />
    </div>
  }
})
