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
  /* GET NB PACKAGES NO HANDED OVER */
  GET_PACKAGES_COUNT_NO_HANDEDOVER,
  GET_PACKAGES_COUNT_NO_HANDEDOVER_SUCCESS,
  GET_PACKAGES_COUNT_NO_HANDEDOVER_ERROR,
} from '../action-types';

const INIT_STATE = {
  all: null,
  loading: false,
  error: null,
  current: null,
  success: false,
  nbHandedOver: null,
};

export const PackageReducer = (state = INIT_STATE, action) => {
  switch (action.type) {
    /* GET NB PACKAGES NO HANDED OVER */
    case GET_PACKAGES_COUNT_NO_HANDEDOVER:
      return { ...state, loading: true };
    case GET_PACKAGES_COUNT_NO_HANDEDOVER_SUCCESS:
      return {
        ...state,
        loading: false,
        nbHandedOver: action.payload,
        error: null,
      };
    case GET_PACKAGES_COUNT_NO_HANDEDOVER_ERROR:
      return { ...state, error: action.payload, loading: false };
    /* GET ALL */
    case GET_PACKAGES:
      return { ...state, loading: true };
    case GET_PACKAGES_SUCCESS:
      return {
        ...state,
        loading: false,
        all: action.payload,
        error: null,
      };
    case GET_PACKAGES_ERROR:
      return { ...state, error: action.payload, loading: false };
    /* GET FIND */
    case GET_PACKAGE_CURRENT:
      return { ...state, loading: true };
    case GET_PACKAGE_CURRENT_SUCCESS:
      const indexCurrent = state.all.findIndex((c) => c.id === action.payload);
      return {
        ...state,
        loading: false,
        current: indexCurrent !== -1 ? state.all[indexCurrent] : null,
        error: null,
      };
    case GET_PACKAGE_CURRENT_ERROR:
      return { ...state, error: action.payload, loading: false };
    /* POST */
    case REGISTER_PACKAGE:
      return { ...state, loading: true };
    case REGISTER_PACKAGE_SUCCESS:
      return {
        ...state,
        loading: false,
        success: true,
        all: [action.payload].concat(state.all),
      };
    case REGISTER_PACKAGE_ERROR:
      return { ...state, loading: false, error: action.payload };
    /* NOTIFICATION */
    case EMPTY_SUCCESS_PACKAGE:
      return { ...state, success: false };
    case EMPTY_ERROR_PACKAGE:
      return { ...state, error: null };
    default:
      return { ...state };
  }
};
