import React from 'react';
// Used for closing menu

/*
 Search bar for main page

 Currently the
 */

export default class SearchBar extends React.Component {

  constructor(props) {
    //  call super() to pass the props to React.Component.
    super(props);
    this.state = {isOpen: false};
  }


  componentDidMount() {
    this.focusInput();
  }

  componentDidUpdate() {
    this.focusInput();
  }

  onChange(event) {
    if (this.props.onRequestChange) {
      this.props.onRequestChange(event.target.value);
    }
  }

  focusInput() {
    if (this.refs.input) {
      this.refs.input.focus();
      console.log("Focus input ran");
    }
  }


  render() {
    if (this.state.isOpen) {
      return (
        <div className="search-btn"
             onBlur={() => this.setState({ isOpen: false })}
             autoFocus>
          <i className="icon-search"/>
          {/* OnClick search-box should have open added on it*/}
          <form method="post" className="search-box open">
            <input
              type="text"
              className="form-control input-sm" placeholder="Search"
              value={this.props.value}
              onChange={(event) => this.onChange(event)}
              onBlur={() => this.setState({ isOpen: false })}
              autofocus
            />
            <button type="submit"><i className="icon-search"/></button>
          </form>
        </div>
      );
    } else {
      return (
        <div className="search-btn"
             onClick={() => {
                    this.setState({ isOpen: true });
                  }}
        >
          <i className="icon-search"/>
        </div>
      );
    }
  }
}

SearchBar.PropTypes = {
  onRequestChange: React.PropTypes.func
};
