import { combineReducers } from 'redux';
import user from './user';
import meetingRoom from './room'
import { routerReducer as routing } from 'react-router-redux';

// Combine reducers with routeReducer which keeps track of
// router state
const rootReducer = combineReducers({
  user,
  meetingRoom,
  routing
});

export default rootReducer;
