import { combineReducers } from 'redux';
import { connectRouter } from 'connected-react-router';
import { History } from 'history';
// eslint-disable-next-line import/no-cycle
import configReducer from './configSlice';
import userReducer from './userSlice';

export default function createRootReducer(history: History) {
  return combineReducers({
    router: connectRouter(history),
    config: configReducer,
    user: userReducer,
  });
}
