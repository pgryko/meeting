import React from 'react'
import Menu from '../components/Menu'

//Menu Container for front page

export default React.createClass({
  render() {
    return (
      <div>
        <Menu/>
        {this.props.children}
      </div>
    )
  }
});
