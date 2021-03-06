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

const INIT_STATE = {
  all: null,
  loading: false,
  error: null,
  current: null,
  success: false,
};

export const BuildingReducer = (state = INIT_STATE, action) => {
  switch (action.type) {
    /* GET ALL */
    case GET_BUILDINGS:
      return { ...state, loading: true };
    case GET_BUILDINGS_SUCCESS:
      return {
        ...state,
        loading: false,
        all: action.payload,
        error: null,
      };
    case GET_BUILDINGS_ERROR:
      return { ...state, error: action.payload, loading: false };
    /* GET FIND */
    case GET_BUILDING_CURRENT:
      return { ...state, loading: true };
    case GET_BUILDING_CURRENT_SUCCESS:
      const indexCurrent = state.all.findIndex((c) => c.id === action.payload);
      return {
        ...state,
        loading: false,
        current: indexCurrent !== -1 ? state.all[indexCurrent] : null,
        error: null,
      };
    case GET_BUILDING_CURRENT_ERROR:
      return { ...state, error: action.payload, loading: false };
    /* NOTIFICATION */
    case EMPTY_SUCCESS_BUILDING:
      return { ...state, success: false };
    case EMPTY_ERROR_BUILDING:
      return { ...state, error: null };
    default:
      return { ...state };
  }
};
