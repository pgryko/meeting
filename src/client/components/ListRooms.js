import React, { PropTypes } from 'react';
import RoomItem from './RoomItem';


const ListRooms = ({onIncrement, onDecrement, onDestroy, rooms}) => {
  const roomItems = rooms.map((room, key) => {
    return (
      <RoomItem index={key}
                 id={room.id}
                 key={key}
                 name={room.name}
                roomUrl={room.slugURL} // Pull slug URL from server
                  image="img/portfolio/01.jpg"
                  title="CommCell 1"
                 onIncrement={onIncrement}
                 onDecrement={onDecrement}
                 onDestroy={onDestroy} />);
  });

  return (
  <div className="grid isotope-grid col-3 filter-grid">
    <div className="grid-sizer"></div>
    <div className="gutter-sizer"></div>
    {roomItems}
  </div>
  );
};

ListRooms.propTypes = {
  rooms: PropTypes.array.isRequired,
  onIncrement: PropTypes.func.isRequired,
  onDecrement: PropTypes.func.isRequired,
  onDestroy: PropTypes.func.isRequired
};

export default ListRooms;
