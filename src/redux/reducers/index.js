import { combineReducers } from 'redux';
import floor from './floor';
import elevator from './elevator';

const elevatorApp = combineReducers({
  floor,
  elevator,
});

export default elevatorApp;
