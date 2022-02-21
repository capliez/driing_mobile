import {
  /* GET ALL */
  GET_LANGUAGES,
  GET_LANGUAGES_ERROR,
  GET_LANGUAGES_SUCCESS,
  /* NOTIFICATION */
  EMPTY_ERROR_LANGUAGE,
  EMPTY_SUCCESS_LANGUAGE,
} from '../action-types';

const INIT_STATE = {
  all: null,
  loading: false,
  error: null,
  current: null,
  success: false,
};

export const LanguageReducer = (state = INIT_STATE, action) => {
  switch (action.type) {
    /* GET ALL */
    case GET_LANGUAGES:
      return { ...state, loading: true };
    case GET_LANGUAGES_SUCCESS:
      return {
        ...state,
        loading: false,
        all: action.payload,
        error: null,
      };
    case GET_LANGUAGES_ERROR:
      return { ...state, error: action.payload, loading: false };
    /* NOTIFICATION */
    case EMPTY_SUCCESS_LANGUAGE:
      return { ...state, success: false };
    case EMPTY_ERROR_LANGUAGE:
      return { ...state, error: null };
    default:
      return { ...state };
  }
};
