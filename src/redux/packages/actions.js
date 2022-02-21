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
  /* NOTIFICATION */
  EMPTY_ERROR_PACKAGE,
  EMPTY_SUCCESS_PACKAGE,
} from '../action-types';

/* GET ALL */
export const getPackages = () => ({
  type: GET_PACKAGES,
});
export const getPackagesSuccess = (buildings) => ({
  type: GET_PACKAGES_SUCCESS,
  payload: buildings,
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
export const registerPackage = (location) => ({
  type: REGISTER_PACKAGE,
  payload: location,
});
export const registerPackageSuccess = (location) => ({
  type: REGISTER_PACKAGE_SUCCESS,
  payload: location,
});
export const registerPackageError = (message) => ({
  type: REGISTER_PACKAGE_ERROR,
  payload: message,
});

/* NOTIFCATION */
export const getEmptySuccessPackage = () => ({
  type: EMPTY_SUCCESS_PACKAGE,
});
export const getEmptyErrorPackage = () => ({
  type: EMPTY_ERROR_PACKAGE,
});
