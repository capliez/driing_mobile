import Axios from 'axios';
import { all, call, fork, put, takeEvery } from 'redux-saga/effects';
import { BUILDINGS_API } from '../../constants/routeAPI';
import {
  /* GET ALL */ GET_BUILDINGS,
  /* GET FIND */ GET_BUILDING_CURRENT,
} from '../action-types';
import {
  /* GET FIND */
  getBuildingCurrrentSuccess,
  getBuildingCurrrentError,
  /* GET ALL */
  getBuildingsSuccess,
  getBuildingsError,
} from './actions';

const MSG_ERROR = 'Buildings : An error has occurred';

/* GET ALL */
export function* watchGetBuildings() {
  yield takeEvery(GET_BUILDINGS, getBuildings);
}

const getBuildingsAsync = async () =>
  await Axios.get(BUILDINGS_API)
    .then((result) => result)
    .catch((error) => error);

function* getBuildings() {
  try {
    const result = yield call(getBuildingsAsync);
    console.log(result);
    if (result.status === 200) {
      yield put(getBuildingsSuccess(result.data['hydra:member']));
    } else {
      yield put(getBuildingsError(MSG_ERROR));
    }
  } catch (error) {
    yield put(getBuildingsError(MSG_ERROR));
  }
}

/* GET FIND */
export function* watchGetBuildingCurrent() {
  yield takeEvery(GET_BUILDING_CURRENT, getBuildingCurrent);
}

function* getBuildingCurrent({ payload }) {
  const id = payload;
  try {
    yield put(getBuildingCurrrentSuccess(id));
  } catch (error) {
    yield put(getBuildingCurrrentError(MSG_ERROR));
  }
}

export default function* rootSaga() {
  yield all([fork(watchGetBuildings), fork(watchGetBuildingCurrent)]);
}
