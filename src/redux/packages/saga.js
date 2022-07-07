import Axios from 'axios';
import { all, call, fork, put, takeEvery } from 'redux-saga/effects';
import { PACKAGES_API } from '../../constants/routeAPI';
import {
  /* GET ALL */ GET_PACKAGES,
  /* GET FIND */ GET_PACKAGE_CURRENT,
  /* POST */ REGISTER_PACKAGE,
  /* PUT */ UPDATE_PACKAGE,
  /* GET NB PACKAGES NO HANDED OVER */ GET_PACKAGES_COUNT_NO_HANDEDOVER,
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
  /* PUT */
  updatePackageSuccess,
  updatePackageError,
  /* GET NB PACKAGES NO HANDED OVER */
  getPackagesNoHandedOverError,
  getPackagesNoHandedOverSuccess,
} from './actions';
import { getResidentsAsync } from '../residents/saga';
import { getResidentsSuccess } from '../residents/actions';

const MSG_ERROR = 'Packages : An error has occurred';

/* GET NB PACKAGES NO HANDED OVER */
export function* watchGetCountPackagesNoHandedOver() {
  yield takeEvery(GET_PACKAGES_COUNT_NO_HANDEDOVER, getCountPackagesHandedOver);
}

const getCountPackagesHandedOverAsync = async (idBuilding) =>
  await Axios.get(`${PACKAGES_API}/count/handedover/${idBuilding}`)
    .then((result) => result)
    .catch((error) => error);

function* getCountPackagesHandedOver({ payload }) {
  try {
    const result = yield call(getCountPackagesHandedOverAsync, payload);
    if (result?.status === 200) {
      yield put(
        getPackagesNoHandedOverSuccess(
          parseInt(
            result.data['hydra:member'][0] ? result.data['hydra:member'][0] : 0,
          ),
        ),
      );
    } else {
      yield put(getPackagesNoHandedOverError(MSG_ERROR));
    }
  } catch (error) {
    yield put(getPackagesNoHandedOverError(MSG_ERROR));
  }
}

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
    isHandedOver: false,
    nbPackage,
    resident: `/api/residents/${resident.id}`,
    building: `/api/buildings/${building.id}`,
    guardian: `/api/users/${guardian.id}`,
  })
    .then((result) => result)
    .catch((error) => error.response);
};

function* registerPackage({ payload }) {
  const { building } = payload;

  try {
    const result = yield call(registerPackageAsync, payload);
    const residents = yield call(getResidentsAsync, building.id);

    if (result.status === 201 && residents.status === 200) {
      yield put(getResidentsSuccess(residents.data['hydra:member']));

      yield put(registerPackageSuccess(result.data));
    } else {
      yield put(registerPackageError(MSG_ERROR));
    }
  } catch (error) {
    yield put(registerPackageError(MSG_ERROR));
  }
}

/* PUT */
export function* watchUpdatePackage() {
  yield takeEvery(UPDATE_PACKAGE, updatePackage);
}

const updatePackageAsync = async (id) => {
  return await Axios.put(`${PACKAGES_API}/${id}`, {
    isHandedOver: true,
  })
    .then((result) => result)
    .catch((error) => error.response);
};

function* updatePackage({ payload }) {
  const { id, idBuilding } = payload;
  try {
    const result = yield call(updatePackageAsync, id);

    if (result.status === 200) {
      yield put(updatePackageSuccess(result.data));
      const nbPackages = yield call(
        getCountPackagesHandedOverAsync,
        idBuilding,
      );
      const residents = yield call(getResidentsAsync, idBuilding);
      const packages = yield call(getPackagesAsync, idBuilding);
      if (
        packages?.status === 200 &&
        nbPackages?.status === 200 &&
        residents?.status === 200
      ) {
        yield put(getResidentsSuccess(residents.data['hydra:member']));

        yield put(
          getPackagesNoHandedOverSuccess(
            parseInt(
              nbPackages.data['hydra:member'][0]
                ? nbPackages.data['hydra:member'][0]
                : 0,
            ),
          ),
        );
        yield put(getPackagesSuccess(packages.data['hydra:member']));
      } else {
        yield put(getPackagesError(MSG_ERROR));
      }
    } else {
      yield put(updatePackageError(MSG_ERROR));
    }
  } catch (error) {
    yield put(updatePackageError(MSG_ERROR));
  }
}

export default function* rootSaga() {
  yield all([
    fork(watchGetPackages),
    fork(watchGetPackageCurrent),
    fork(watchRegisterPackage),
    fork(watchGetCountPackagesNoHandedOver),
    fork(watchUpdatePackage),
  ]);
}
