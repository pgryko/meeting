/* eslint no-unused-vars: 0 */ // since fetch is needed but not used
import configureStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import md5 from 'spark-md5';
import { polyfill } from 'es6-promise';
import axios from 'axios';
import expect from 'expect';
import * as actions from '../../actions/rooms';
import * as types from '../../types';
import Slug from  'slug';

polyfill();

const middlewares = [thunk];
const mockStore = configureStore(middlewares);

describe('Room Actions', () => {
  describe('Asynchronous actions', () => {
    let sandbox;

    const index = 0;
    const name = 'A time machine';
    const slugURL = Slug(name);
    const description = 'A mad man in a blue box, who goes around kidnaping women';
    const id = md5.hash(name);
    const data = {
      id,
      count: 1,
      name: name,
      slugURL: slugURL,
      description: description
    };

    const initialState = {
      room: {
        rooms: [],
        newroom: ''
      }
    };

    beforeEach(() => {
      sandbox = sinon.sandbox.create(); // eslint-disable-line
    });

    afterEach(() => {
      sandbox.restore();
    });

    it('dispatches request and success actions when status is 200', done => {
      const expectedActions = [
        {
          type: types.CREATE_ROOM_REQUEST,
          id,
          count: 1,
          name: data.name,
          slugURL: data.slugURL,
          description: data.description
        }, {
          type: types.CREATE_ROOM_SUCCESS
        }
      ];

      sandbox.stub(axios, 'post').returns(Promise.resolve({ status: 200 }));

      const store = mockStore(initialState);
      store.dispatch(actions.createRoom(name,description))
        .then(() => {
          expect(store.getActions()).toEqual(expectedActions);
        }).then(done).catch(done);
    });

    it('dispatches request and failed actions when status is NOT 200', done => {
      const expectedActions = [
        {
          type: types.CREATE_ROOM_REQUEST,
          id,
          count: 1,
          name: data.name,
          slugURL: data.slugURL,
          description: data.description
        }, {
          type: types.CREATE_ROOM_FAILURE,
          id,
          error: 'Oops! Something went wrong and we couldn\'t create your room'
        }
      ];
      sandbox.stub(axios, 'post').returns(Promise.reject({status: 404, data: 'Oops! Something went wrong and we couldn\'t create your room'}));

      const store = mockStore(initialState);
      store.dispatch(actions.createRoom(name,description))
        .then(() => {
          expect(store.getActions()).toEqual(expectedActions);
        }).then(done).catch(done);
    });

    it('dispatches a duplicate action for a duplicate room', () => {
      initialState.room.rooms.push(data);

      const expectedActions = [
        {
          type: types.CREATE_ROOM_DUPLICATE
        }
      ];

      const store = mockStore(initialState);
      store.dispatch(actions.createRoom(name,description));
      expect(store.getActions()).toEqual(expectedActions);
      initialState.room.rooms.pop();
    });

    it('incrementCount dispatches an increment count action on success', done => {
      const expectedActions = [
      {
        type: types.INCREMENT_COUNT,
        index
      }];
      sandbox.stub(axios, 'put').returns(Promise.resolve({ status: 200 }));
      const store = mockStore();
      store.dispatch(actions.incrementCount(data.id, index))
        .then(() => {
          expect(store.getActions()).toEqual(expectedActions);
        }).then(done).catch(done);
    });

    it('incrementCount should not dispatch a failure action on failure', done => {
      const expectedActions = [
      {
        type: types.CREATE_ROOM_FAILURE,
        id: data.id,
        error: 'Oops! Something went wrong and we couldn\'t add your room'
      }];
      sandbox.stub(axios, 'put').returns(Promise.reject({ status: 400 }));
      const store = mockStore();
      store.dispatch(actions.incrementCount(data.id, index))
        .then(() => {
          expect(store.getActions()).toEqual(expectedActions);
        }).then(done).catch(done);
    });

    it('decrementCount dispatches an decrement count action on success', done => {
      const expectedActions = [
      {
        type: types.DECREMENT_COUNT,
        index
      }];
      sandbox.stub(axios, 'put').returns(Promise.resolve({ status: 200 }));
      const store = mockStore();
      store.dispatch(actions.decrementCount(data.id, index))
        .then(() => {
          expect(store.getActions()).toEqual(expectedActions);
        }).then(done).catch(done);
    });

    it('decrementCount should not dispatch a decrement count action on failure', done => {
      const expectedActions = [
      {
        type: types.CREATE_ROOM_FAILURE,
        error: 'Oops! Something went wrong and we couldn\'t add your room',
        id: data.id
      }];
      sandbox.stub(axios, 'put').returns(Promise.reject({ status: 400 }));
      const store = mockStore(initialState);
      store.dispatch(actions.decrementCount(data.id, index))
        .then(() => {
          expect(store.getActions()).toEqual(expectedActions);
        }).then(done).catch(done);
    });

    it('destroyRoom dispatches a decrement count action on success', done => {
      const expectedActions = [
      {
        type: types.DESTROY_ROOM,
        index
      }];
      sandbox.stub(axios, 'delete').returns(Promise.resolve({ status: 200 }));
      const store = mockStore();
      store.dispatch(actions.destroyRoom(data.id, index))
        .then(() => {
          expect(store.getActions()).toEqual(expectedActions);
        }).then(done).catch(done);
    });

    it('destroyRoom should not dispatch an decrement count action on failure', done => {
      const expectedActions = [
      {
        type: types.CREATE_ROOM_FAILURE,
        id: data.id,
        error: 'Oops! Something went wrong and we couldn\'t add your room'
      }];
      sandbox.stub(axios, 'delete').returns(Promise.reject({ status: 400 }));
      const store = mockStore();
      store.dispatch(actions.destroyRoom(data.id, index))
        .then(() => {
          expect(store.getActions()).toEqual(expectedActions);
        }).then(done).catch(done);
    });
  });
  //
  describe('Action creator unit tests', () => {
    const index = 0;
    const name = 'A time machine';
    const slugURL = Slug(name);
    const description = 'A mad man in a blue box, who goes around kidnaping women';
    const id = md5.hash(name);
    const data = {
      id,
      count: 1,
      name: name,
      slugURL: slugURL,
      description: description
    };
    let sandbox;

    beforeEach(() => {
      sandbox = sinon.sandbox.create(); // eslint-disable-line
    });

    afterEach(() => {
      sandbox.restore();
    });

    it('should create an action object to increment the count', () => {
      const expectedAction = {
        type: types.INCREMENT_COUNT,
        index
      };
      expect(actions.increment(index)).toEqual(expectedAction);
    });

    it('should create an action object to decrement count', () => {
      const expectedAction = {
        type: types.DECREMENT_COUNT,
        index
      };
      expect(actions.decrement(index)).toEqual(expectedAction);
    });

    it('should create an action object to destroy a room', () => {
      const expectedAction = {
        type: types.DESTROY_ROOM,
        index
      };
      expect(actions.destroy(index)).toEqual(expectedAction);
    });

    it('should create an action object with a new room request', () => {
      const expectedAction = {
        type: types.CREATE_ROOM_REQUEST,
        id: data.id,
        count: data.count,
        name: data.name,
        slugURL: data.slugURL,
        description: data.description
      };
      expect(actions.createRoomRequest(data)).toEqual(expectedAction);
    });

    it('should create an action object on a new room success', () => {
      const expectedAction = {
        type: types.CREATE_ROOM_SUCCESS
      };
      expect(actions.createRoomSuccess()).toEqual(expectedAction);
    });

    it('should create an action object on a new room failure', () => {
      const dataFail = Object.assign({}, {
        error: 'Oops! Something went wrong and we couldn\'t create your room',
        id: data.id
      });
      const expectedAction = {
        type: types.CREATE_ROOM_FAILURE,
        id: dataFail.id,
        error: dataFail.error
      };
      expect(actions.createRoomFailure(dataFail)).toEqual(expectedAction);
    });

    it('should create an action on a room duplicate', () => {
      const expectedAction = {
        type: types.CREATE_ROOM_DUPLICATE
      };
      expect(actions.createRoomDuplicate()).toEqual(expectedAction);
    });

    it('should create an action when fetching rooms', () => {
      sandbox.stub(axios, 'get').returns('hello');
      const expectedAction = {
        type: types.GET_ROOMS,
        promise: 'hello'
      };
      expect(actions.fetchRooms()).toEqual(expectedAction);
    });
  });
});
