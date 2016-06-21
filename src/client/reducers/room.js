import {
  TYPING,
  CREATE_ROOM_REQUEST,
  CREATE_ROOM_FAILURE,
  DESTROY_ROOM,
  INCREMENT_COUNT,
  DECREMENT_COUNT,
  GET_ROOMS_REQUEST,
  GET_ROOMS_SUCCESS,
  GET_ROOMS_FAILURE } from '../types';


export default function room(state = {
  rooms: [],
  newRoom: ''
}, action) {
  switch (action.type) {
    case TYPING:
      return Object.assign({}, state,
        { newRoom: action.newRoom }
      );
    case GET_ROOMS_REQUEST:
      return Object.assign({}, state, {
        isFetching: true
      });
    case GET_ROOMS_SUCCESS:
      return Object.assign({}, state, {
        isFetching: false,
        rooms: action.res.data
      });
    case GET_ROOMS_FAILURE:
      return Object.assign({}, state, {
        isFetching: false,
        error: action.error
      });
    case CREATE_ROOM_REQUEST:
      return {
        rooms: [...state.rooms, { id: action.id, count: action.count, name: action.name, slugURL: action.slugURL, description: action.description }],
        newRoom: ''
      };
    case CREATE_ROOM_FAILURE:
      return {
        rooms: [...state.rooms.filter((tp) => tp.id !== action.id)],
        newRoom: state.newRoom
      };
    case DESTROY_ROOM:
      return {
        rooms: [...state.rooms.filter((tp, i) => i !== action.index)],
        newRoom: state.newRoom
      };
    case INCREMENT_COUNT:
      return {
        rooms: [
          ...state.rooms.slice(0, action.index),
          Object.assign({}, state.rooms[action.index], {
            count: state.rooms[action.index].count + 1
          }),
          ...state.rooms.slice(action.index + 1)
        ],
        newRoom: state.newRoom
      };
    case DECREMENT_COUNT:
      return {
        rooms: [
          ...state.rooms.slice(0, action.index),
          Object.assign({}, state.rooms[action.index], {
            count: state.rooms[action.index].count - 1
          }),
          ...state.rooms.slice(action.index + 1)
        ],
        newRoom: state.newRoom
      };

    default:
      return state;
  }
}
