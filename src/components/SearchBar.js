import React from 'react'
import ReactDom from 'react-dom'
//Used for closing menu
import onClickOutside from 'react-onclickoutside'

/*
Search bar for main page
*/

var SearchBar = onClickOutside(React.createClass( {

    constructor(props) {
        // super(props);
        this.state = {
            isOpen: false,
        }
    },

    focusInput() {
        if (this.refs.input) {
            this.refs.input.focus();
        }
    },

    onChange(event) {
        if (this.props.onRequestChange) {
            this.props.onRequestChange(event.target.value);
        }
    },

    componentDidMount() {
        this.focusInput();
    },

    componentDidUpdate() {
        this.focusInput();
    },


    render() {
        if (this.state.isOpen) {
            return (
              <div className="search-btn" onBlur={() => this.setState({isOpen: false})} autofocus>
                <i className="icon-square-cross">Square Cross</i>
                <i className="icon-search"></i>
                {/*OnClick search-box should have open added on it*/}
                <form method="post" className="search-box open">
                  <input
                    type="text"
                    className="form-control input-sm" placeholder="Search"
                    value={this.props.value}
                    onChange={(event) => this.onChange(event)}
                    onBlur={() => this.setState({isOpen: false})}
                    autofocus />
                  <button type="submit"><i className="icon-search"></i></button>
                </form>
              </div>
            );
        } else {
            return (
                <div className="search-btn"
                onClick={() => {
                                    this.setState({isOpen: true});
                                }}>
                  <i className="icon-search"></i>
                </div>
            );
        }
    }

}));

module.export = SearchBar;
