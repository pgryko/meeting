/**
 * React Starter Kit (https://www.reactstarterkit.com/)
 *
 * Copyright © 2014-2016 Kriasoft, LLC. All rights reserved.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE.txt file in the root directory of this source tree.
 */

import React from 'react';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import s from './Header.scss';
import Link from '../Link';
import Navigation from '../Navigation';

function Header() {
  return (
    <div className={s.root}>
    <Navigation className={s.nav} />
      <div className={s.container}>
        <Link className={s.brand} to="/">
          {/*<img src={require('./logo-small.png')}  alt="React" />*/}
          {/*<span className={s.brandTxt}>Unipart</span>*/}
        </Link>
        <div className={s.banner}>
          <div >
          <h1 className={s.bannerTitle}>Unipart CommCell</h1>
          <p className={s.bannerDesc}>Communication Made Easy</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default withStyles(Header, s);
