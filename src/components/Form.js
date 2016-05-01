/**
 * Created by pgryko on 29/04/16.
 */

import React from 'react';
import Dialog from 'material-ui/lib/dialog';
import TextField from 'material-ui/lib/text-field';
import FlatButton from 'material-ui/lib/flat-button';

export default class Form extends React.Component {

  constructor(props) {
    super(props);
    this.state = {title: '', url: ''};
  }

  onTitleChange(value) {
    this.setState({title: value});
  }

  onURLChange(value) {
    this.setState({url: value});
  }

  handleSubmit() {
    if (this.props.onSubmit) {
      this.props.onSubmit(this.state.title, this.state.url);
    }
  }

  render() {
    var self = this;

    const actions = [
      <FlatButton
        label="Cancel"
        secondary={true}
        onTouchTap={() => this.props.onCancel()} />,
      <FlatButton
        label="Submit"
        primary={true}
        keyboardFocused={true}
        onTouchTap={() => this.handleSubmit()} />,
    ];

    return (
      <Dialog
        title="Add item"
        actions={actions}
        open={this.props.open}
        onRequestClose={() => this.props.onCancel()}>

        <TextField
          ref="title"
          value={this.state.title}
          onChange={() => { self.onTitleChange(self.refs.title.getValue()); }}
          hintText="Title" />

        <br />

        <TextField
          ref="url"
          value={this.state.url}
          onChange={() => { self.onURLChange(self.refs.url.getValue()); }}
          hintText="URL" />

      </Dialog>
    );
  }
}
