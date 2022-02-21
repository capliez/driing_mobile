import { combineReducers } from 'redux';

/* Auth Reducer */
import { AuthReducer } from './auth/reducer';
/* Buildings Reducer */
import { BuildingReducer } from './buildings/reducer';
/* Parameters Reducer */
import { SettingsReducer } from './settings/reducer';
/* Packages Reducer */
import { PackageReducer } from './packages/reducer';
/* Residents Reducer */
import { ResidentReducer } from './residents/reducer';
/* Languages Reducer */
import { LanguageReducer } from './languages/reducer';

const reducers = combineReducers({
  buildings: BuildingReducer,
  settings: SettingsReducer,
  authUser: AuthReducer,
  packages: PackageReducer,
  residents: ResidentReducer,
  languages: LanguageReducer,
});

export default reducers;
