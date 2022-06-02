import {
  /* GET ALL */
  GET_RESIDENTS,
  GET_RESIDENTS_ERROR,
  GET_RESIDENTS_SUCCESS,
  /* GET FIND */
  GET_RESIDENT_CURRENT,
  GET_RESIDENT_CURRENT_ERROR,
  GET_RESIDENT_CURRENT_SUCCESS,
  /* POST */
  REGISTER_RESIDENT,
  REGISTER_RESIDENT_ERROR,
  REGISTER_RESIDENT_SUCCESS,
  /* SEARCH */
  SEARCH_RESIDENT,
  SEARCH_RESIDENT_ERROR,
  SEARCH_RESIDENT_SUCCESS,
  SEARCH_RESIDENT_EMPTY,
  /* UPDATE */
  UPDATE_RESIDENT,
  UPDATE_RESIDENT_ERROR,
  UPDATE_RESIDENT_SUCCESS,
  /* NOTIFICATION */
  EMPTY_ERROR_RESIDENT,
  EMPTY_SUCCESS_RESIDENT,
} from '../action-types';

const INIT_STATE = {
  all: null,
  allSearch: null,
  loading: false,
  error: null,
  current: null,
  success: false,
};

export const ResidentReducer = (state = INIT_STATE, action) => {
  switch (action.type) {
    /* SEARCH */
    case SEARCH_RESIDENT:
      return { ...state, loading: true };
    case SEARCH_RESIDENT_SUCCESS:
      return {
        ...state,
        loading: false,
        allSearch: action.payload,
        error: null,
      };
    case SEARCH_RESIDENT_ERROR:
      return { ...state, error: action.payload, loading: false };
    case SEARCH_RESIDENT_EMPTY:
      return {
        ...state,
        allSearch: null,
      };
    /* GET ALL */
    case GET_RESIDENTS:
      return { ...state, loading: true };
    case GET_RESIDENTS_SUCCESS:
      return {
        ...state,
        loading: false,
        all: action.payload,
        error: null,
      };
    case GET_RESIDENTS_ERROR:
      return { ...state, error: action.payload, loading: false };
    /* GET FIND */
    case GET_RESIDENT_CURRENT:
      return { ...state, loading: true };
    case GET_RESIDENT_CURRENT_SUCCESS:
      const indexCurrent = state.all.findIndex((c) => c.id === action.payload);
      return {
        ...state,
        loading: false,
        current: indexCurrent !== -1 ? state.all[indexCurrent] : null,
        error: null,
      };
    case GET_RESIDENT_CURRENT_ERROR:
      return { ...state, error: action.payload, loading: false };
    /* POST */
    case REGISTER_RESIDENT:
      return { ...state, loading: true };
    case REGISTER_RESIDENT_SUCCESS:
      return {
        ...state,
        loading: false,
        success: true,
        all: [action.payload].concat(state.all),
      };
    case REGISTER_RESIDENT_ERROR:
      return { ...state, loading: false, error: action.payload };
    /* UPDATE */
    case UPDATE_RESIDENT:
      return { ...state, loading: true };
    case UPDATE_RESIDENT_SUCCESS:
      const item = action.payload;
      const newAll = state.all;
      const index = state.all.findIndex((c) => c.id === item.id);
      if (index !== -1) newAll[index] = item;
      return {
        ...state,
        loading: false,
        all: newAll,
        current: item,
        success: true,
      };
    case UPDATE_RESIDENT_ERROR:
      return { ...state, loading: false, error: action.payload };
    /* NOTIFICATION */
    case EMPTY_SUCCESS_RESIDENT:
      return { ...state, success: false };
    case EMPTY_ERROR_RESIDENT:
      return { ...state, error: null };
    default:
      return { ...state };
  }
};
