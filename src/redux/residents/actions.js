import {
  /* GET ALL */
  GET_RESIDENTS,
  GET_RESIDENTS_ERROR,
  GET_RESIDENTS_SUCCESS,
  /* GET FIND */
  GET_RESIDENT_CURRENT,
  GET_RESIDENT_CURRENT_ERROR,
  GET_RESIDENT_CURRENT_SUCCESS,
  /* SEARCH */
  SEARCH_RESIDENT,
  SEARCH_RESIDENT_ERROR,
  SEARCH_RESIDENT_SUCCESS,
  SEARCH_RESIDENT_EMPTY,
  /* POST */
  REGISTER_RESIDENT,
  REGISTER_RESIDENT_ERROR,
  REGISTER_RESIDENT_SUCCESS,
  /* UPDATE */
  UPDATE_RESIDENT,
  UPDATE_RESIDENT_ERROR,
  UPDATE_RESIDENT_SUCCESS,
  /* NOTIFICATION */
  EMPTY_ERROR_RESIDENT,
  EMPTY_SUCCESS_RESIDENT,
} from '../action-types';

/* SEARCH */
export const searchResident = (idBuilding, lastName, isHandedOver) => ({
  type: SEARCH_RESIDENT,
  payload: { idBuilding, lastName, isHandedOver },
});
export const searchResidentSuccess = (residents) => ({
  type: SEARCH_RESIDENT_SUCCESS,
  payload: residents,
});
export const searchResidentError = (message) => ({
  type: SEARCH_RESIDENT_ERROR,
  payload: message,
});
export const searchResidentEmpty = () => ({
  type: SEARCH_RESIDENT_EMPTY,
});

/* GET ALL */
export const getResidents = (idBuilding) => ({
  type: GET_RESIDENTS,
  payload: idBuilding,
});
export const getResidentsSuccess = (residents) => ({
  type: GET_RESIDENTS_SUCCESS,
  payload: residents,
});
export const getResidentsError = (message) => ({
  type: GET_RESIDENTS_ERROR,
  payload: message,
});

/* GET FIND */
export const getResidentCurrrent = (id) => ({
  type: GET_RESIDENT_CURRENT,
  payload: id,
});
export const getResidentCurrrentSuccess = (building) => ({
  type: GET_RESIDENT_CURRENT_SUCCESS,
  payload: building,
});
export const getResidentCurrrentError = (message) => ({
  type: GET_RESIDENT_CURRENT_ERROR,
  payload: message,
});

/* POST */
export const registerResident = (location) => ({
  type: REGISTER_RESIDENT,
  payload: location,
});
export const registerResidentSuccess = (location) => ({
  type: REGISTER_RESIDENT_SUCCESS,
  payload: location,
});
export const registerResidentError = (message) => ({
  type: REGISTER_RESIDENT_ERROR,
  payload: message,
});

/* UPDATE */
export const updateResident = (item, id) => ({
  type: UPDATE_RESIDENT,
  payload: { item, id },
});
export const updateResidentSuccess = (resident) => ({
  type: UPDATE_RESIDENT_SUCCESS,
  payload: resident,
});
export const updateResidentError = (message) => ({
  type: UPDATE_RESIDENT_ERROR,
  payload: message,
});

/* NOTIFCATION */
export const getEmptySuccessResident = () => ({
  type: EMPTY_SUCCESS_RESIDENT,
});
export const getEmptyErrorResident = () => ({
  type: EMPTY_ERROR_RESIDENT,
});
