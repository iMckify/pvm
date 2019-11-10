import { combineReducers } from 'redux';
// eslint-disable-next-line import/no-unresolved
import authReducer from './authReducer';

export default combineReducers({
  auth: authReducer
});
