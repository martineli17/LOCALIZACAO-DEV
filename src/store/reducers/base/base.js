import {combineReducers} from 'redux';
import DeveloperReducer from '../developer/index'

export default combineReducers({
    Developers: DeveloperReducer,
});