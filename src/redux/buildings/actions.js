import {
  /* GET ALL */
  GET_BUILDINGS,
  GET_BUILDINGS_ERROR,
  GET_BUILDINGS_SUCCESS,
  /* GET FIND */
  GET_BUILDING_CURRENT,
  GET_BUILDING_CURRENT_ERROR,
  GET_BUILDING_CURRENT_SUCCESS,
  /* NOTIFICATION */
  EMPTY_ERROR_BUILDING,
  EMPTY_SUCCESS_BUILDING,
} from '../action-types';

/* GET ALL */
export const getBuildings = () => ({
  type: GET_BUILDINGS,
});
export const getBuildingsSuccess = (buildings) => ({
  type: GET_BUILDINGS_SUCCESS,
  payload: buildings,
});
export const getBuildingsError = (message) => ({
  type: GET_BUILDINGS_ERROR,
  payload: message,
});

/* GET FIND */
export const getBuildingCurrrent = (id) => ({
  type: GET_BUILDING_CURRENT,
  payload: id,
});
export const getBuildingCurrrentSuccess = (building) => ({
  type: GET_BUILDING_CURRENT_SUCCESS,
  payload: building,
});
export const getBuildingCurrrentError = (message) => ({
  type: GET_BUILDING_CURRENT_ERROR,
  payload: message,
});

/* NOTIFCATION */
export const getEmptySuccessBuilding = () => ({
  type: EMPTY_SUCCESS_BUILDING,
});
export const getEmptyErrorBuilding = () => ({
  type: EMPTY_ERROR_BUILDING,
});
