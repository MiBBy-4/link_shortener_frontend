import { combineReducers } from 'redux';
import { statusReducer } from './statusReducer';
import { usersReducer } from './usersReducer';

export const allReducers = combineReducers({
  status: statusReducer,
  user: usersReducer,
});
