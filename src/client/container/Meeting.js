import React, {PropTypes} from 'react';
import { connect } from 'react-redux';

import Avatar from 'material-ui/Avatar';
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

class Live extends React.Component {

  constructor(props) {
    super(props);
    this.state = {items: []};
  }

  engineStateObserver = (state) => {
    this.setState(state);
  };

  componentDidMount() {
    engine.addStateObserver(this.engineStateObserver);
  }

  componentWillUnmount() {
    engine.removeStateObserver(this.engineStateObserver);
  }

  render() {
    return (
      <MeetingGridView
        items={this.state.items}
        onRemoveItem={(index) => engine.removeItem(index)}
        selection={this.state.selection}
        onSelect={(uuid) => engine.setSelection(uuid)}
        onDeselect={() => engine.clearSelection()}/>
    );
  }

}


class Meeting extends React.Component {

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
    engine.connect(this.props.routeParams.roomID);
    console.log("Rooms array contains");
    console.log(this.props.rooms);

  }

  componentWillUnmount() {
    engine.removeStateObserver(this.engineStateObserver);
    engine.disconnect();
  }

  //Used to extract room name from slugURL
  mapSlugURLToRoomTitle = (rooms,slugURL) => {
    let roomTitle = rooms.map((room) => {
      if (room.slugURL === slugURL) {
        return (room.name);
      }
    });
    return roomTitle;
  };

  uploadFiles(files) {
    this.setState({showProgress: true});
    engine.uploadFiles(files, () => {
      this.setState({showProgress: false});
    });
  }

  render() {
    var self = this;

    const menuItems = [
      <MenuItem
        key="add-url-menu-item"
        primaryText="Add URL"
        leftIcon={<InsertLink />}
        onTouchTap={() => this.setState({showAddItemDialog: true})} />,
      <MenuItem
        key="add-file-menu-item"
        primaryText="Add file"
        leftIcon={<FileUpload />}
        onTouchTap={() => this.refs.input.click()} />,
      <MenuItem
        key="add-photo-menu-item"
        primaryText="Add photo"
        leftIcon={<Photo />}
        onTouchTap={() => this.refs.input.click()} />,
      <Divider
        key="divider-1" />,
      <MenuItem
        key="add-shared-notes-menu-item"
        primaryText="Add shared notes"
        leftIcon={<ModeEdit />}
        onTouchTap={() => engine.addItem({
                    title: "Shared Notes",
                    url: "https://commcell-etherpad.unipart.digital/p/development"
                })} />,
      <Divider
        key="divider-2" />,
      <MenuItem
        key="leave-meeting-menu-item"
        primaryText="Log out"
        leftIcon={<ExitToApp />}
        onTouchTap={() => {
                    window.location.href = "/logout";
                }} />
    ];

    const defaultNavigationItems = [
      <MenuItem
        key="menu-item-navigation-item"
        primaryText="Live"
        leftIcon={<RemoveRedEye />}
        onTouchTap={() => {
                    this.context.route.push(`/meeting/${this.props.uuid}`);
                    this.setState({showNavigation: false});
                }} />,
      <Divider
        key="divider-3" />,
    ];

    var navigationItems = defaultNavigationItems.concat([
      <List
        key="connected-users-list">
        <Subheader>Connected users</Subheader>

        {this.state.users.map(function(item, index) {
          return (
            <ListItem
              key={item.uuid}
              primaryText={item.name}
              leftAvatar={<Avatar src={item.avatar} />} />
          );
        })}
      </List>
    ]);

    return (
      <div>
        <input
          type="file"
          accept="image/*"
          id="file"
          name="file"
          ref="input"
          onChange={(event) => this.uploadFiles(event.target.files)}
          hidden />

        <MeetingDragTarget
          onDropFile={(files) => this.uploadFiles(files)}/>

        <MeetingProgressView
          style={{
                        position: 'fixed',
                        top: '0px',
                        left: '0px',
                        width: '100%',
                        height: '100%',
                        zIndex: '1200',
                    }}
          open={this.state.showProgress}/>

        <MeetingAppScreen
          title={this.mapSlugURLToRoomTitle(this.props.rooms,this.props.routeParams.roomID)}
          navigationItems={navigationItems}
          menuItems={menuItems}
          showNavigation={this.state.showNavigation}
          onShowNavigation={(show) => this.setState({showNavigation: show})}>

          <Live/>

        </MeetingAppScreen>

        <MeetingAddItemDialog
          open={this.state.showAddItemDialog}
          onSubmit={(title, url) => {
                        this.setState({showAddItemDialog: false});
                        //The http:// prevents localhost from being added to url
                        engine.addItem({title: title, url: "https://" + url});
                    }}
          onCancel={() => this.setState({showAddItemDialog: false})} />

      </div>
    );

  }
}

function mapStateToProps(state, ownProps) {
  return {
    id: ownProps.params.id,
    filter: ownProps.location.query.filter,
    rooms: state.room.rooms
  };
}

// Connects React component to the redux store
// It does not modify the component class passed to it
// Instead, it returns a new, connected component class, for you to use.
export default connect(mapStateToProps)(Meeting);



Meeting.contextTypes = {
  history: React.PropTypes.object.isRequired,
};

Meeting.propTypes = {
  rooms: PropTypes.array.isRequired
};

Meeting.childContextTypes = {
  muiTheme: React.PropTypes.object,
};
