import React from 'react';
import { Router, Route, IndexRoute, Link, browserHistory } from 'react-router';

import Avatar from 'material-ui/Avatar';
// import Avatar from 'material-ui/avatar';
// import Divider from 'material-ui/divider';
import Divider from 'material-ui/Divider';
import ExitToApp from 'material-ui/svg-icons/action/exit-to-app';
import FileUpload from 'material-ui/svg-icons/file/file-upload';
import InsertLink from 'material-ui/svg-icons/editor/insert-link';
import List from 'material-ui/List';
import ListItem from 'material-ui/List';
import MenuItem from 'material-ui/MenuItem';
import ModeEdit from 'material-ui/svg-icons/editor/mode-edit';
import Photo from 'material-ui/svg-icons/image/photo';
import RaisedButton from 'material-ui/RaisedButton';
import RemoveRedEye from 'material-ui/svg-icons/image/remove-red-eye';
import Star from 'material-ui/svg-icons/toggle/star';
import Subheader from 'material-ui/Subheader';

import MeetingAddItemDialog from '../components/meeting/meeting-add-item-dialog';
import MeetingAppScreen from '../components/meeting/meeting-app-screen';
import MeetingDocumentViewer from '../components/meeting/meeting-document-viewer';
import MeetingDragTarget from '../components/meeting/meeting-drag-target';
import MeetingGridView from '../components/meeting/meeting-grid-view';
import MeetingProgressView from '../components/meeting/meeting-progress-view';

import Engine from '../lib/meeting/engine';

var engine = new Engine();

export default class Meeting extends React.Component {

  constructor(props) {
    super(props);
    this.state = {

      title: "",
      items: [],
      users: [],
      selection: undefined,

      showNavigation: false,
      showAddItemDialog: false,
      showProgress: false,

    };

  }

  engineStateObserver = (state) => {
    this.setState(state);
  };

  componentDidMount() {
    engine.addStateObserver(this.engineStateObserver);
    engine.connect();
  }

  componentWillUnmount() {
    engine.removeStateObserver(this.engineStateObserver);
  }

  uploadFiles(files) {
    this.setState({showProgress: true});
    engine.uploadFiles(files, () => {
      this.setState({showProgress: false});
    });
  }

  render() {
    var self = this;
    return (
      <div>
        Meeting Container
      </div>
    );

  }
}

Meeting.contextTypes = {
  history: React.PropTypes.object.isRequired,
};

Meeting.childContextTypes = {
  muiTheme: React.PropTypes.object,
};
