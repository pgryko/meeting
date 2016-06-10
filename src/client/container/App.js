import React from 'react'
export default class App extends React.Component {
  //Container for application
  render() {
    return (
      <div>
        {this.props.children}
      </div>)
  }
}
