import { combineReducers } from 'redux';
import user from './user';
import room from './room'
import message from './message'
import { routerReducer as routing } from 'react-router-redux';

// Combine reducers with routeReducer which keeps track of
// router state
const rootReducer = combineReducers({
  user,
  room,
  message,
  routing
});

export default rootReducer;
