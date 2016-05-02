// modules/MenuItem.js

/*
 Automatically sets active link to "current-menu-item"
 Based on:
 http://stackoverflow.com/questions/35053161/how-to-set-activeclassname-for-wrapper-element-of-link-or-indexlink-in-react-rou
 */
import React from 'react'
import {Link, IndexLink, History} from 'react-router'


export default class MenuItem extends React.Component{
  constructor(props, context, index){
    super(props);
    this.state = {
    }
  }

  componentDidMount() {
    // this.state.isActive = this.context.router.isActive(this.props.to);
    // console.log(this.context);
  }

  render() {
    // const { router } = this.context;
    // const { index, onlyActiveOnIndex, to, children, props } = this.props;

    // const isActive = this.context.router.isActive(this.props.to);
    const isActive = this.context.router.isActive(this.props.to);
    const LinkComponent = this.props.index ? IndexLink : Link; //If its true you want an IndexLink

    return (
      <li className={isActive ? "current-menu-item" : ''}>
        <LinkComponent onlyActiveOnIndex {...this.props} />
      </ li >
    )
  }

}
//        {/*<LinkComponent {...this.props} activeClassName="active" /> */}

MenuItem.contextTypes = {
  router: React.PropTypes.object,
  index: React.PropTypes.bool
};

MenuItem.defaultProps = {
  index: false
};
