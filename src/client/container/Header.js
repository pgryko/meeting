import React, { PropTypes } from 'react';
import Menu from './Menu';
import Message from './Message';

//Menu Container for front page

/*
 * React-router's <Router> component renders <Route>'s
 * and replaces `this.props.children` with the proper React Component.
 *
 * Please refer to `routes.jsx` for the route config.
 *
 * A better explanation of react-router is available here:
 * https://github.com/rackt/react-router/blob/latest/docs/Introduction.md
 */
const Header = ({children}) => {
  return (
    <div >
      <Menu />
      <Message />
      {children}
    </div>
  );
};

Header.propTypes = {
  children: PropTypes.object
};

export default Header;
