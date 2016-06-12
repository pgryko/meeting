import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { createRoom, typing, incrementCount,
  decrementCount, destroyRoom, fetchRooms } from '../actions/rooms';
import ListRooms from '../components/ListRooms';
import EntryBox from '../components/EntryBox';



class DashBoard extends React.Component{


  //Data that needs to be called before rendering the component
  //This is used for server side rending via the fetchComponentDataBeforeRender() method
  static need = [  // eslint-disable-line
    fetchRooms
  ];

  constructor(props){
    super(props);
    this.state = {
    }
  }


  render() {
    // const token = auth.getToken();
    const token = "Add a meeting room";

    const {newRoom, rooms, typing, createRoom, destroyRoom, incrementCount, decrementCount } = this.props;

    return (
      <div>

        {/*<!-- Content --> */}
        <section className="container">
          <h2 className="block-title text-center">
            Dashboard
            <small>{token}</small>
          </h2>
          <EntryBox room={newRoom}
                    onEntryChange={typing}
                    onEntrySave={createRoom} />

          {/*<!-- Filters --> */}
          <div className="text-center padding-top">
            <ul className="nav-filters space-bottom-2x text-center">
              <li className="active"><a href="#" data-filter="*">Show All</a></li>
              <li><a href="#" data-filter=".apps">Recent</a></li>
              <li><a href="#" data-filter=".identity">Art Room</a></li>
            </ul>{/*<!-- .nav-filters --> */}
          </div>

          <ListRooms rooms={rooms}
                       onIncrement={incrementCount}
                       onDecrement={decrementCount}
                       onDestroy={destroyRoom} />


          {/*<!-- Load More Button --> */}
          <div className="text-center padding-top">
            <a href="#" className="btn btn-default btn-ghost waves-effect">Load More</a>
          </div>
        </section>{/*<!-- .container --> */}

        {/*<!-- Scroll To Top Button --> */}
        <a href="#" className="scroll-to-top-btn">
          <i className="icon-arrow-up"></i>
        </a>{/*<!-- .scroll-to-top-btn --> */}
      </div>
    )
  }
}

DashBoard.propTypes = {
  rooms: PropTypes.array.isRequired,
  typing: PropTypes.func.isRequired,
  createRoom: PropTypes.func.isRequired,
  destroyRoom: PropTypes.func.isRequired,
  incrementCount: PropTypes.func.isRequired,
  decrementCount: PropTypes.func.isRequired,
  newRoom: PropTypes.string
};

function mapStateToProps(state) {
  return {
    rooms: state.room.rooms,
    newRoom: state.room.newRoom
  };
}

// Read more about where to place `connect` here:
// https://github.com/rackt/react-redux/issues/75#issuecomment-135436563
export default connect(mapStateToProps, { createRoom, typing, incrementCount, decrementCount, destroyRoom })(DashBoard);


/*

 Note to self, ideally we wil want to retrieve a list of dashboard items and pass them onto components,
 something along these lines

 ** A key is required for generating dom from loops**

 createListItem: function(user) {
 return (
 <li key={user.id}>
 <Link to="{'/users/' + user.id}">{user.name}</Link>
 </li>
 );
 }
 });

 class DashBoardList extends React.Component{
 render: function() {
 return (
 <ul className="user-list">
 {this.props.users.map(this.createListItem)}
 </ul>
 );
 }
 };

 */
