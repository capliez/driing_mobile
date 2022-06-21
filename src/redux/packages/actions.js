import {
  /* GET ALL */
  GET_PACKAGES,
  GET_PACKAGES_ERROR,
  GET_PACKAGES_SUCCESS,
  /* GET FIND */
  GET_PACKAGE_CURRENT,
  GET_PACKAGE_CURRENT_ERROR,
  GET_PACKAGE_CURRENT_SUCCESS,
  /* POST */
  REGISTER_PACKAGE,
  REGISTER_PACKAGE_ERROR,
  REGISTER_PACKAGE_SUCCESS,
  /* PUT */
  UPDATE_PACKAGE,
  UPDATE_PACKAGE_ERROR,
  UPDATE_PACKAGE_SUCCESS,
  /* NOTIFICATION */
  EMPTY_ERROR_PACKAGE,
  EMPTY_SUCCESS_PACKAGE,
  /* GET NB PACKAGES NO HANDED OVER */
  GET_PACKAGES_COUNT_NO_HANDEDOVER,
  GET_PACKAGES_COUNT_NO_HANDEDOVER_SUCCESS,
  GET_PACKAGES_COUNT_NO_HANDEDOVER_ERROR,
} from '../action-types';

/* GET NB PACKAGES NO HANDED OVER */
export const getPackagesNoHandedOver = (id) => ({
  type: GET_PACKAGES_COUNT_NO_HANDEDOVER,
  payload: id,
});
export const getPackagesNoHandedOverSuccess = (buildings) => ({
  type: GET_PACKAGES_COUNT_NO_HANDEDOVER_SUCCESS,
  payload: buildings,
});
export const getPackagesNoHandedOverError = (message) => ({
  type: GET_PACKAGES_COUNT_NO_HANDEDOVER_ERROR,
  payload: message,
});

/* GET ALL */
export const getPackages = (id) => ({
  type: GET_PACKAGES,
  payload: id,
});
export const getPackagesSuccess = (packages) => ({
  type: GET_PACKAGES_SUCCESS,
  payload: packages,
});
export const getPackagesError = (message) => ({
  type: GET_PACKAGES_ERROR,
  payload: message,
});

/* GET FIND */
export const getPackageCurrrent = (id) => ({
  type: GET_PACKAGE_CURRENT,
  payload: id,
});
export const getPackageCurrrentSuccess = (building) => ({
  type: GET_PACKAGE_CURRENT_SUCCESS,
  payload: building,
});
export const getPackageCurrrentError = (message) => ({
  type: GET_PACKAGE_CURRENT_ERROR,
  payload: message,
});

/* POST */
export const registerPackage = (items) => ({
  type: REGISTER_PACKAGE,
  payload: items,
});
export const registerPackageSuccess = (items) => ({
  type: REGISTER_PACKAGE_SUCCESS,
  payload: items,
});
export const registerPackageError = (message) => ({
  type: REGISTER_PACKAGE_ERROR,
  payload: message,
});

/* PUT */
export const updatePackage = (id) => ({
  type: UPDATE_PACKAGE,
  payload: id,
});
export const updatePackageSuccess = (items) => ({
  type: UPDATE_PACKAGE_SUCCESS,
  payload: items,
});
export const updatePackageError = (message) => ({
  type: UPDATE_PACKAGE_ERROR,
  payload: message,
});

/* NOTIFCATION */
export const getEmptySuccessPackage = () => ({
  type: EMPTY_SUCCESS_PACKAGE,
});
export const getEmptyErrorPackage = () => ({
  type: EMPTY_ERROR_PACKAGE,
});
