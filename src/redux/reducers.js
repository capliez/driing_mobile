import { combineReducers } from 'redux';
import { BuildingReducer } from './buildings/reducer';

const reducers = combineReducers({
  buildings: BuildingReducer,
});

export default reducers;
