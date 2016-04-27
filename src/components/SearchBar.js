import React from 'react'
import ReactDom from 'react-dom'

/*
Search bar for main page
*/

export default class SearchBar extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            isOpen: false,
        }
    }

    focusInput() {
        if (this.refs.input) {
            this.refs.input.focus();
        }
    }

    onChange(event) {
        if (this.props.onRequestChange) {
            this.props.onRequestChange(event.target.value);
        }
    }

    componentDidMount() {
        this.focusInput();
    }

    componentDidUpdate() {
        this.focusInput();
    }


    render() {
        if (this.state.isOpen) {
            return (
              <div className="search-btn">
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

}
