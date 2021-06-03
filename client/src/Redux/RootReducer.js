import {combineReducers} from 'redux';
import ItemReducer from './Reducers/ItemReducer';

export default combineReducers({
    items: ItemReducer
});