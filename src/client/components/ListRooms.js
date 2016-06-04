import React, { PropTypes } from 'react';
import RoomItem from './RoomItem';


const ListRooms = ({onIncrement, onDecrement, onDestroy, rooms}) => {
  const roomItems = rooms.map((room, key) => {
    return (
      <RoomItem index={key}
                 id={room.id}
                 key={key}
                 text={room.text}
                 onIncrement={onIncrement}
                 onDecrement={onDecrement}
                 onDestroy={onDestroy} />);
  });

  return (
    <div className={'main-section'}>
      <h3 className={'header'}>Create a CommCell Meeting Room</h3>
      <ul className={'list'}>{roomItems}</ul>
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
