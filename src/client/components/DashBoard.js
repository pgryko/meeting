import React from 'react'
import auth from '../utils/auth'

export default React.createClass({
  render() {
    const token = auth.getToken();

    return (
      <div>
        <h1>Dashboard</h1>
        <p>You made it!</p>
        <p>{token}</p>
      </div>
    )
  }
})
