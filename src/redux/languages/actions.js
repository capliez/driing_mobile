import {
  /* GET ALL */
  GET_LANGUAGES,
  GET_LANGUAGES_ERROR,
  GET_LANGUAGES_SUCCESS,
  /* NOTIFICATION */
  EMPTY_ERROR_LANGUAGE,
  EMPTY_SUCCESS_LANGUAGE,
} from '../action-types';

/* GET ALL */
export const getLanguages = () => ({
  type: GET_LANGUAGES,
});
export const getLanguagesSuccess = (buildings) => ({
  type: GET_LANGUAGES_SUCCESS,
  payload: buildings,
});
export const getLanguagesError = (message) => ({
  type: GET_LANGUAGES_ERROR,
  payload: message,
});

/* NOTIFCATION */
export const getEmptySuccessLanguage = () => ({
  type: EMPTY_SUCCESS_LANGUAGE,
});
export const getEmptyErrorLanguage = () => ({
  type: EMPTY_ERROR_LANGUAGE,
});
