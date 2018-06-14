import { combineReducers } from 'redux';
import filter from './filter';
import Chat from './Chat'
import Common from './Common'

const reducers = combineReducers({
  filter, // example
  Chat,
  Common
});

export default reducers;
