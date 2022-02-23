import Axios from 'axios';
import { all, call, fork, put, takeEvery } from 'redux-saga/effects';
import { PACKAGES_API } from '../../constants/routeAPI';
import {
  /* GET ALL */ GET_PACKAGES,
  /* GET FIND */ GET_PACKAGE_CURRENT,
  /* POST */ REGISTER_PACKAGE,
} from '../action-types';
import {
  /* GET FIND */
  getPackageCurrrentSuccess,
  getPackageCurrrentError,
  /* GET ALL */
  getPackagesSuccess,
  getPackagesError,
  /* POST */
  registerPackageSuccess,
  registerPackageError,
} from './actions';

const MSG_ERROR = 'Packages : An error has occurred';

/* GET ALL */
export function* watchGetPackages() {
  yield takeEvery(GET_PACKAGES, getPackages);
}

const getPackagesAsync = async (idBuilding) =>
  await Axios.get(`${PACKAGES_API}/handedover/${idBuilding}`)
    .then((result) => result)
    .catch((error) => error);

function* getPackages({ payload }) {
  try {
    const result = yield call(getPackagesAsync, payload);
    if (result?.status === 200) {
      yield put(getPackagesSuccess(result.data['hydra:member']));
    } else {
      yield put(getPackagesError(MSG_ERROR));
    }
  } catch (error) {
    yield put(getPackagesError(MSG_ERROR));
  }
}

/* GET FIND */
export function* watchGetPackageCurrent() {
  yield takeEvery(GET_PACKAGE_CURRENT, getPackageCurrent);
}

function* getPackageCurrent({ payload }) {
  const id = payload;
  try {
    yield put(getPackageCurrrentSuccess(id));
  } catch (error) {
    yield put(getPackageCurrrentError(MSG_ERROR));
  }
}

/* POST */
export function* watchRegisterPackage() {
  yield takeEvery(REGISTER_PACKAGE, registerPackage);
}

const registerPackageAsync = async (item) => {
  const { resident, nbPackage, isBulky, guardian, building } = item;
  return await Axios.post(PACKAGES_API, {
    isBulky,
    nbPackage,
    resident: `/api/residents/${resident}`,
    building: `/api/buildings/${building}`,
    guardian: `/api/users/${guardian}`,
  })
    .then((result) => result)
    .catch((error) => error.response);
};

function* registerPackage({ payload }) {
  try {
    const result = yield call(registerPackageAsync, payload);
    if (result.status === 201) {
      yield put(registerPackageSuccess(result.data));
    } else {
      yield put(registerPackageError('An error has occurred'));
    }
  } catch (error) {
    yield put(registerPackageError('An error has occurred'));
  }
}

export default function* rootSaga() {
  yield all([
    fork(watchGetPackages),
    fork(watchGetPackageCurrent),
    fork(watchRegisterPackage),
  ]);
}
