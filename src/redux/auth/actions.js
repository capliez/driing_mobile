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

/* SIGN IN */
export const loginUser = (user) => ({
  type: LOGIN_USER,
  payload: user,
});
export const loginUserSuccess = (user) => ({
  type: LOGIN_USER_SUCCESS,
  payload: user,
});
export const loginUserError = (message) => ({
  type: LOGIN_USER_ERROR,
  payload: { message },
});

/* SIGN IN WITH COOKIE */
export const loginUserCookie = (user, history) => ({
  type: LOGIN_USER_COOKIE,
  payload: { user, history },
});
export const loginUserSuccessCookie = (user) => ({
  type: LOGIN_USER_SUCCESS_COOKIE,
  payload: user,
});
export const loginUserErrorCookie = (message) => ({
  type: LOGIN_USER_ERROR_COOKIE,
  payload: message,
});

/* UPDATE */
export const updateUser = (item, id) => ({
  type: UPDATE_USER,
  payload: { item, id },
});
export const updateUserSuccess = (item) => ({
  type: UPDATE_USER_SUCCESS,
  payload: item,
});
export const updateUserError = (message) => ({
  type: UPDATE_USER_ERROR,
  payload: message,
});

/* FORGOT PASSWORD */
export const forgotPassword = (email, lang) => ({
  type: FORGOT_PASSWORD,
  payload: { email, lang },
});
export const forgotPasswordSuccess = (email) => ({
  type: FORGOT_PASSWORD_SUCCESS,
  payload: email,
});
export const forgotPasswordError = (message) => ({
  type: FORGOT_PASSWORD_ERROR,
  payload: message,
});
export const emptyForgotPasswordLogin = () => ({
  type: EMPTY_FORGOT_PASSWORD_LOGIN,
});

/* RESET PASSWORD */
export const resetPassword = (token, id, password) => ({
  type: RESET_PASSWORD,
  payload: { token, id, password },
});
export const resetPasswordSuccess = (result) => ({
  type: RESET_PASSWORD_SUCCESS,
  payload: result,
});
export const resetPasswordError = (message) => ({
  type: RESET_PASSWORD_ERROR,
  payload: message,
});

/* LOG OUT */
export const logoutUser = () => ({
  type: LOGOUT_USER,
});

/* VERIF TOKEN */
export const verifyTokenUser = (token, id) => ({
  type: VERIFY_TOKEN,
  payload: { token, id },
});
export const verifyTokenUserSuccess = (result) => ({
  type: VERIFY_TOKEN_SUCCESS,
  payload: result,
});
export const verifyTokenUserError = (message) => ({
  type: VERIFY_TOKEN_ERROR,
  payload: message,
});

/* CHANGE LOCAL */
export const changeLocaleUser = (idUser, idLang) => ({
  type: CHANGE_LOCALE_USER,
  payload: { idUser, idLang },
});
export const changeLocaleUserSuccess = (lang) => ({
  type: CHANGE_LOCALE_USER_SUCCESS,
  payload: lang,
});
export const changeLocaleUserError = (message) => ({
  type: CHANGE_LOCALE_USER_ERROR,
  payload: message,
});

/* NOTIFICATION */
export const emptyErrorLogin = () => ({
  type: EMPTY_ERROR_LOGIN,
});
export const emptySuccessUser = () => ({
  type: EMPTY_SUCCESS_USER,
});
