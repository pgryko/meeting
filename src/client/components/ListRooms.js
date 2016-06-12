import React, { PropTypes } from 'react';
import RoomItem from './RoomItem';
import Slug from 'slug';


const ListRooms = ({onIncrement, onDecrement, onDestroy, rooms}) => {
  const roomItems = rooms.map((room, key) => {
    return (
      <RoomItem index={key}
                 id={room.id}
                 key={key}
                 text={room.text}
                roomUrl={Slug(room.text)}
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
