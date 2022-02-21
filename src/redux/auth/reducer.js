import {
  /* CHANGE LOCALE */
  CHANGE_LOCALE_USER,
  CHANGE_LOCALE_USER_ERROR,
  CHANGE_LOCALE_USER_SUCCESS,
  EMPTY_ERROR_LOGIN,
  EMPTY_FORGOT_PASSWORD_LOGIN,
  /* NOTIFCATION */
  EMPTY_SUCCESS_USER,
  /* FORGOT PASSWORD */
  FORGOT_PASSWORD,
  FORGOT_PASSWORD_ERROR,
  FORGOT_PASSWORD_SUCCESS,
  LOGIN_USER,
  LOGIN_USER_COOKIE,
  LOGIN_USER_ERROR,
  LOGIN_USER_ERROR_COOKIE,
  LOGIN_USER_SUCCESS,
  /* SIGN IN WITH COOKIE */
  LOGIN_USER_SUCCESS_COOKIE,
  /* LOG OUT */
  LOGOUT_USER,
  /* RESET PASSWORD */
  RESET_PASSWORD,
  RESET_PASSWORD_ERROR,
  RESET_PASSWORD_SUCCESS,
  /* UPDATE */
  UPDATE_USER,
  UPDATE_USER_ERROR,
  UPDATE_USER_SUCCESS,
  /* VERIF TOKEN */
  VERIFY_TOKEN,
  VERIFY_TOKEN_ERROR,
  VERIFY_TOKEN_SUCCESS,
} from '../action-types';

const INIT_STATE = {
  currentUser: null,
  forgotUserMail: false,
  loading: false,
  error: null,
  registerValid: false,
  isUpdate: false,
  isVerifToken: false,
  isResetPassword: false,
  success: false,
};

export const AuthReducer = (state = INIT_STATE, action) => {
  switch (action.type) {
    /* VERIF TOKEN */
    case VERIFY_TOKEN:
      return { ...state, loading: true, error: '' };
    case VERIFY_TOKEN_SUCCESS:
      return { ...state, loading: false, isVerifToken: action.payload };
    case VERIFY_TOKEN_ERROR:
      return { ...state, loading: false, error: action.payload };
    /* SIGN IN WITH COOKIE */
    case LOGIN_USER_COOKIE:
      return { ...state, loading: true, error: '' };
    case LOGIN_USER_SUCCESS_COOKIE:
      return {
        ...state,
        loading: false,
        currentUser: action.payload,
        error: '',
      };
    case LOGIN_USER_ERROR_COOKIE:
      return {
        ...state,
        loading: false,
        currentUser: null,
        error: action.payload,
      };
    /* SIGN IN */
    case LOGIN_USER:
      return { ...state, loading: true, error: '' };
    case LOGIN_USER_SUCCESS:
      return {
        ...state,
        loading: false,
        currentUser: action.payload,
        error: '',
      };
    case LOGIN_USER_ERROR:
      return {
        ...state,
        loading: false,
        currentUser: null,
        error: action.payload.message,
      };
    /* FORGOT PASSWORD */
    case FORGOT_PASSWORD:
      return { ...state, loading: true, error: '' };
    case FORGOT_PASSWORD_SUCCESS:
      return {
        ...state,
        loading: false,
        forgotUserMail: action.payload,
        error: '',
      };
    case FORGOT_PASSWORD_ERROR:
      return {
        ...state,
        loading: false,
        forgotUserMail: false,
        error: action.payload,
      };
    case EMPTY_FORGOT_PASSWORD_LOGIN:
      return { ...state, forgotUserMail: false };
    /* RESET PASSWORD */
    case RESET_PASSWORD:
      return { ...state, loading: true, error: '' };
    case RESET_PASSWORD_SUCCESS:
      return {
        ...state,
        loading: false,
        isResetPassword: action.payload,
        error: '',
      };
    case RESET_PASSWORD_ERROR:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    /* CHANGE LOCAL */
    case CHANGE_LOCALE_USER:
      return { ...state, loading: true };
    case CHANGE_LOCALE_USER_SUCCESS:
      const userCurrent = state.currentUser;
      userCurrent.language = action.payload;
      return { ...state, loading: false, currentUser: userCurrent };
    case CHANGE_LOCALE_USER_ERROR:
      return { ...state, loading: false, error: action.payload };
    /* LOG OUT */
    case LOGOUT_USER:
      return { ...state, currentUser: null, error: '' };
    /* UPDATE */
    case UPDATE_USER:
      return { ...state, loading: true, isUpdate: true };
    case UPDATE_USER_SUCCESS:
      const item = action.payload;
      return {
        ...state,
        loading: false,
        currentUser: item,
        success: true,
        isUpdate: false,
      };
    case UPDATE_USER_ERROR:
      return {
        ...state,
        loading: false,
        error: action.payload,
        isUpdate: false,
      };
    /* NOTIFCATION */
    case EMPTY_SUCCESS_USER:
      return { ...state, success: false };
    case EMPTY_ERROR_LOGIN:
      return { ...state, error: '' };
    default:
      return { ...state };
  }
};
