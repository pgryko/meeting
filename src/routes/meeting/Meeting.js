import React, { PropTypes } from 'react';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
// import s from './Register.scss';

function Meeting({ title }) {
  return (
      <div>
        <h1>{title}</h1>
        <p>...</p>
      </div>
  );
}

Meeting.propTypes = { title: PropTypes.string.isRequired };

// export default withStyles(Register, s);
export default Meeting;
