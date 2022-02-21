import Axios from 'axios';
import { all, call, fork, put, takeEvery } from 'redux-saga/effects';
import { RESIDENTS_API } from '../../constants/routeAPI';
import {
  /* GET ALL */ GET_RESIDENTS,
  /* GET FIND */ GET_RESIDENT_CURRENT,
  /* POST */ REGISTER_RESIDENT,
  /* UPDATE */ UPDATE_RESIDENT,
} from '../action-types';
import {
  /* GET FIND */
  getResidentCurrrentSuccess,
  getResidentCurrrentError,
  /* GET ALL */
  getResidentsSuccess,
  getResidentsError,
  /* POST */
  registerResidentSuccess,
  registerResidentError,
  /* UPDATE */
  updateResidentError,
  updateResidentSuccess,
} from './actions';

const MSG_ERROR = 'Residents : An error has occurred';

/* GET ALL */
export function* watchGetResidents() {
  yield takeEvery(GET_RESIDENTS, getResidents);
}

const getResidentsAsync = async () =>
  await Axios.get(RESIDENTS_API)
    .then((result) => result)
    .catch((error) => error);

function* getResidents() {
  try {
    const result = yield call(getResidentsAsync);
    if (result.status === 200) {
      yield put(getResidentsSuccess(result.data['hydra:member']));
    } else {
      yield put(getResidentsError(MSG_ERROR));
    }
  } catch (error) {
    yield put(getResidentsError(MSG_ERROR));
  }
}

/* GET FIND */
export function* watchGetResidentCurrent() {
  yield takeEvery(GET_RESIDENT_CURRENT, getResidentCurrent);
}

function* getResidentCurrent({ payload }) {
  const id = payload;
  try {
    yield put(getResidentCurrrentSuccess(id));
  } catch (error) {
    yield put(getResidentCurrrentError(MSG_ERROR));
  }
}

/* POST */
export function* watchRegisterResident() {
  yield takeEvery(REGISTER_RESIDENT, registerResident);
}

const registerResidentAsync = async (item) => {
  const { lastName, email, phone, building } = item;
  return await Axios.post(RESIDENTS_API, {
    lastName,
    email,
    phone,
    building: `/api/buildings/${building}`,
  })
    .then((result) => result)
    .catch((error) => error.response);
};

function* registerResident({ payload }) {
  try {
    const result = yield call(registerResidentAsync, payload);
    if (result.status === 201) {
      yield put(registerResidentSuccess(result.data));
    } else {
      yield put(registerResidentError('An error has occurred'));
    }
  } catch (error) {
    yield put(registerResidentError('An error has occurred'));
  }
}

/* UPDATE */
export function* watchUpdateResident() {
  yield takeEvery(UPDATE_RESIDENT, updateResident);
}

const updateResidentAsync = async ({ item, id }) => {
  return await Axios.put(`${RESIDENTS_API}/${id}`, {
    lastName: item.lastName,
    email: item.email,
    phone: item.phone,
  });
};

function* updateResident({ payload }) {
  const { id } = payload;

  try {
    const result = yield call(updateResidentAsync, id);
    if (result.status === 200) {
      yield put(updateResidentSuccess(result.data));
    } else {
      yield put(updateResidentError(MSG_ERROR));
    }
  } catch (error) {
    yield put(updateResidentError(MSG_ERROR));
  }
}

export default function* rootSaga() {
  yield all([
    fork(watchGetResidents),
    fork(watchGetResidentCurrent),
    fork(watchRegisterResident),
    fork(watchUpdateResident),
  ]);
}
