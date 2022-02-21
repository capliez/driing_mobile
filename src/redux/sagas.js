import { all } from 'redux-saga/effects';

/* Auth Saga */
import AuthSaga from './auth/saga';

/* Languages Saga */
import LanguagesSaga from './languages/saga';

/* Residents Saga */
import ResidentsSaga from './residents/saga';

/* Buildings Saga */
import BuildingsSaga from './buildings/saga';

/* Packages Saga */
import PackagesSaga from './packages/saga';

export default function* rootSaga() {
  yield all([
    ResidentsSaga(),
    BuildingsSaga(),
    AuthSaga(),
    LanguagesSaga(),
    PackagesSaga(),
  ]);
}
