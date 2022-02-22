import Axios from 'axios';
import { all, call, fork, put, takeEvery } from 'redux-saga/effects';
import { LANGUAGES_API } from '../../constants/routeAPI';
import { /* GET ALL */ GET_LANGUAGES } from '../action-types';
import {
  /* GET ALL */
  getLanguagesSuccess,
  getLanguagesError,
} from './actions';

const MSG_ERROR = 'Languages : An error has occurred';

/* GET ALL */
export function* watchGetLanguages() {
  yield takeEvery(GET_LANGUAGES, getLanguages);
}

const getLanguagesAsync = async () =>
  await Axios.get(LANGUAGES_API)
    .then((result) => result)
    .catch((error) => error);

function* getLanguages() {
  try {
    const result = yield call(getLanguagesAsync);
    if (result?.status === 200) {
      yield put(getLanguagesSuccess(result.data['hydra:member']));
    } else {
      yield put(getLanguagesError(MSG_ERROR));
    }
  } catch (error) {
    yield put(getLanguagesError(MSG_ERROR));
  }
}

export default function* rootSaga() {
  yield all([fork(watchGetLanguages)]);
}
