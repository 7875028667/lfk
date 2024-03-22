/* eslint-disable prettier/prettier */
// /* eslint-disable prettier/prettier */
import { combineReducers } from 'redux';
import { reducer } from './reducerFolder/reducer';
import authReducer from './reducerFolder/authReducer';
export default combineReducers({
    reducer,
    authReducer,
});
