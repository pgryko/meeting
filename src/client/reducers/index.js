import { combineReducers } from 'redux';
import user from './user';
import room from './room'
import { routerReducer as routing } from 'react-router-redux';

// Combine reducers with routeReducer which keeps track of
// router state
const rootReducer = combineReducers({
  user,
  room,
  routing
});

export default rootReducer;
