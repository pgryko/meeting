import React from 'react'

/*
Routing has to be included here for server side refrence. Otherwise backwards
button on browser will not work correctly.
The routes here should be the same as in components/App.js
*/

export default React.createClass({
  render() {
    return (
      <div>
        {children}
      </div>
    )
  }
})
