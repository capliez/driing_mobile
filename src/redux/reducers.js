import { combineReducers } from 'redux';
import { BuildingReducer } from './buildings/reducer';
import { SettingsReducer } from './settings/reducer';

const reducers = combineReducers({
  buildings: BuildingReducer,
  settings: SettingsReducer,
});

export default reducers;
