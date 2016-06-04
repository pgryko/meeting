import expect from 'expect';
import md5 from 'spark-md5';
import reducer from '../../reducers/room';
import * as types from '../../types';

describe('Rooms reducer', () => {
  const s = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';

  function createRoom() {
    return Array(5).join().split(',').map(() => {
      return s.charAt(Math.floor(Math.random() * s.length));
    }).join('');
  }

  const room = createRoom();

  function createData() {
    return {
      text: createRoom(),
      id: md5.hash(createRoom()),
      count: Math.floor(Math.random() * 100)
    };
  }

  const data = createData();

  function createRooms(x) {
    const arr = [];
    for (let i = 0; i < x; i++) {
      arr.push(createData());
    }
    return arr;
  }

  it('Should return the initial state', () => {
    expect(
      reducer(undefined, {})
    ).toEqual(
      {
        rooms: [],
        newRoom: ''
      }
    );
  });

  it('Should add a new room to an empty initial state', () => {
    expect(
      reducer(undefined, {
        type: types.CREATE_ROOM_REQUEST,
        id: data.id,
        count: 1,
        text: room
      })
    ).toEqual({
        rooms: [
          {
            id: data.id,
            count: 1,
            text: room
          }
        ],
        newRoom: ''
    });
  });

  it('Should handle TYPING', () => {
    expect(
      reducer(undefined, {
        type: types.TYPING,
        newRoom: room
      })
    ).toEqual({
        rooms: [],
        newRoom: room
    });
  });

  it('Should handle GET_ROOMS_REQUEST', () => {
    expect(
      reducer(undefined, {
        type: types.GET_ROOMS_REQUEST
      })
    ).toEqual({
        isFetching: true,
        rooms: [],
        newRoom: ''
    });
  });

  it('Should handle GET_ROOMS_SUCCESS', () => {
    expect(
      reducer(undefined, {
        type: types.GET_ROOMS_SUCCESS,
        req: {
          data: room
        }
      })
    ).toEqual({
        isFetching: false,
        rooms: room,
        newRoom: ''
    });
  });

  it('Should handle GET_ROOMS_FAILURE', () => {
    expect(
      reducer(undefined, {
        type: types.GET_ROOMS_FAILURE,
        error: 'Error',
        id: data.id
      })
    ).toEqual({
        rooms: [],
        newRoom: '',
        error: 'Error',
        isFetching: false
    });
  });

  it('Should handle CREATE_ROOM_REQUEST', () => {
    const rooms = createRooms(20);
    const newRooms = [...rooms, data];
    expect(
      reducer({
        rooms
      },
      {
        type: types.CREATE_ROOM_REQUEST,
        id: data.id,
        count: data.count,
        text: data.text

      })
    ).toEqual({
        newRoom: '',
        rooms: newRooms
    });
  });

  it('should handle CREATE_ROOM_FAILURE', () => {
    const rooms = createRooms(20);
    rooms.push(data);
    const newRooms = [...rooms];
    expect(
      reducer({
        rooms,
        newRoom: room
      },
      {
        type: types.CREATE_ROOM_FAILURE,
        id: data.id
      })
    ).toEqual({
        rooms: newRooms.pop() && newRooms,
        newRoom: room
    });
  });

  it('should handle DESTROY_ROOM', () => {
    const rooms = createRooms(20);
    rooms.push(data);
    const newRooms = [...rooms];
    expect(
      reducer({
        rooms,
        newRoom: room
      },
      {
        type: types.DESTROY_ROOM,
        index: rooms.length - 1
      })
    ).toEqual({
        rooms: newRooms.pop() && newRooms,
        newRoom: room
    });
  });

  it('should handle INCREMENT_COUNT', () => {
    const rooms = createRooms(20);
    const newRooms = [...rooms];
    rooms.push(data);
    const newData = Object.assign({}, data);
    newData.count++;
    newRooms.push(newData);

    expect(
      reducer({
        rooms,
        newRoom: room
      },
      {
        type: types.INCREMENT_COUNT,
        index: rooms.length - 1,
      })
    ).toEqual({
        rooms: newRooms,
        newRoom: room
    });
  });

  it('should handle DECREMENT_COUNT', () => {
    const rooms = createRooms(20);
    const newRooms = [...rooms];
    rooms.push(data);
    const newData = Object.assign({}, data);
    newData.count--;
    newRooms.push(newData);

    expect(
      reducer({
        rooms,
        newRoom: room
      },
      {
        type: types.DECREMENT_COUNT,
        index: rooms.length - 1
      })
    ).toEqual({
        rooms: newRooms,
        newRoom: room
    });
  });
});
