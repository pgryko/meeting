/* eslint consistent-return: 0, no-else-return: 0*/
import { polyfill } from 'es6-promise';
import request from 'axios';
import md5 from 'spark-md5';
import * as types from '../types';

polyfill();

/*
 * Utility function to make AJAX requests using isomorphic fetch.
 * You can also use jquery's $.ajax({}) if you do not want to use the
 * /fetch API.
 * Note: this function relies on an external variable `API_ENDPOINT`
 *        and isn't a pure function
 * @param Object Data you wish to pass to the server
 * @param String HTTP method, e.g. post, get, put, delete
 * @param String endpoint
 * @return Promise
 */
export function makeRoomRequest(method, id, data, api = '/room') {
  return request[method](api + (id ? ('/' + id) : ''), data);
}

export function increment(index) {
  return { type: types.INCREMENT_COUNT, index };
}

export function decrement(index) {
  return { type: types.DECREMENT_COUNT, index };
}

export function destroy(index) {
  return { type: types.DESTROY_ROOM, index };
}


export function typing(text) {
  return {
    type: types.TYPING,
    newRoom: text
  };
}

/*
 * @param data
 * @return a simple JS object
 */
export function createRoomRequest(data) {
  return {
    type: types.CREATE_ROOM_REQUEST,
    id: data.id,
    count: data.count,
    text: data.text
  };
}

export function createRoomSuccess() {
  return {
    type: types.CREATE_ROOM_SUCCESS
  };
}

export function createRoomFailure(data) {
  return {
    type: types.CREATE_ROOM_FAILURE,
    id: data.id,
    error: data.error
  };
}

export function createRoomDuplicate() {
  return {
    type: types.CREATE_ROOM_DUPLICATE
  };
}

// This action creator returns a function,
// which will get executed by Redux-Thunk middleware
// This function does not need to be pure, and thus allowed
// to have side effects, including executing asynchronous API calls.
export function createRoom(text) {
  return (dispatch, getState) => {
    // If the text box is empty
    if (text.trim().length <= 0) return;

    const id = md5.hash(text);
    // Redux thunk's middleware receives the store methods `dispatch`
    // and `getState` as parameters
    const { room } = getState();
    const data = {
      count: 1,
      id,
      text
    };

    // Conditional dispatch
    // If the room already exists, make sure we emit a dispatch event
    if (room.rooms.filter(roomItem => roomItem.id === id).length > 0) {
      // Currently there is no reducer that changes state for this
      // For production you would ideally have a message reducer that
      // notifies the user of a duplicate room
      return dispatch(createRoomDuplicate());
    }

    // First dispatch an optimistic update
    dispatch(createRoomRequest(data));

    return makeRoomRequest('post', id, data)
      .then(res => {
        if (res.status === 200) {
          // We can actually dispatch a CREATE_ROOM_SUCCESS
          // on success, but I've opted to leave that out
          // since we already did an optimistic update
          // We could return res.json();
          return dispatch(createRoomSuccess());
        }
      })
      .catch(() => {
        return dispatch(createRoomFailure({ id, error: 'Oops! Something went wrong and we couldn\'t create your room'}));
      });
  };
}

// Fetch posts logic
export function fetchRooms() {
  return {
    type: types.GET_ROOMS,
    promise: makeRoomRequest('get')
  };
}


export function incrementCount(id, index) {
  return dispatch => {
    return makeRoomRequest('put', id, {
      isFull: false,
      isIncrement: true
    })
      .then(() => dispatch(increment(index)))
      .catch(() => dispatch(createRoomFailure({id, error: 'Oops! Something went wrong and we couldn\'t add your room'})));
  };
}

export function decrementCount(id, index) {
  return dispatch => {
    return makeRoomRequest('put', id, {
      isFull: false,
      isIncrement: false
    })
      .then(() => dispatch(decrement(index)))
      .catch(() => dispatch(createRoomFailure({id, error: 'Oops! Something went wrong and we couldn\'t add your room'})));
  };
}

export function destroyRoom(id, index) {
  return dispatch => {
    return makeRoomRequest('delete', id)
      .then(() => dispatch(destroy(index)))
      .catch(() => dispatch(createRoomFailure({id,
        error: 'Oops! Something went wrong and we couldn\'t add your room'})));
  };
}
