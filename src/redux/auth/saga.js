import Axios from 'axios';
import jwtDecode from 'jwt-decode';
import { all, call, fork, put, takeEvery } from 'redux-saga/effects';
import { LOGIN_API, USERS_API } from '../../constants/routeAPI';
import {
  /* CHANGE LOCAL */
  CHANGE_LOCALE_USER,
  /* FORGOT PASSWORD */
  FORGOT_PASSWORD,
  /* SIGN IN */
  LOGIN_USER,
  /* SIGN IN WITH COOKIE */
  LOGIN_USER_COOKIE,
  /* LOG OUT */
  LOGOUT_USER,
  /* RESET PASSWORD */
  RESET_PASSWORD,
  /* UPDATE */
  UPDATE_USER,
  /* VERIF TOKEN */
  VERIFY_TOKEN,
} from '../action-types';
import {
  /* CHANGE LOCAL */
  changeLocaleUserError,
  changeLocaleUserSuccess,
  /* FORGOT PASSWORD */
  forgotPasswordError,
  forgotPasswordSuccess,
  /* SIGN IN WITH COOKIE */
  loginUserErrorCookie,
  /* SIGN IN */
  loginUserSuccess,
  loginUserSuccessCookie,
  loginUserError,
  /* LOG OUT */
  logoutUserError,
  logoutUserSuccess,
  /* RESET PASSWORD */
  resetPasswordError,
  resetPasswordSuccess,
  /* UPDATE */
  updateUserError,
  updateUserSuccess,
  /* VERIF TOKEN */
  verifyTokenUserError,
  verifyTokenUserSuccess,
} from './actions';
import { nameTokenAuth } from '../../utils';
import { STORAGE } from '../../utils/localStorageSecure';
import { getBuildings } from '../buildings/actions';
export const MSG_ERROR = 'Auth : An error has occurred';

/* SIGN IN */
export function* watchLoginUser() {
  yield takeEvery(LOGIN_USER, loginWithEmailPassword);
}

const loginWithPhonePasswordAsync = async ({ phone, password }) =>
  await Axios.post(LOGIN_API, { username: phone, password })
    .then((result) => result)
    .catch((error) => error.response);

function* loginWithEmailPassword({ payload }) {
  try {
    const result = yield call(loginWithPhonePasswordAsync, payload);
    console.log(result);
    if (result?.status === 200) {
      const token = result.data.token;

      Axios.defaults.headers['Authorization'] = 'Bearer ' + token;

      yield STORAGE.setItem(nameTokenAuth, token, loginUserError);

      try {
        const result = yield call(loginWithCookieAsync);
        if (result?.status === 200) {
          yield put(loginUserSuccess(result.data['hydra:member'][0]));
          yield put(getBuildings());
        } else yield put(loginUserError(MSG_ERROR));
      } catch (error) {
        yield put(loginUserError(MSG_ERROR));
      }
    } else {
      yield put(
        loginUserError(result?.data?.message ? result.data.message : MSG_ERROR),
      );
    }
  } catch (error) {
    yield put(loginUserError(MSG_ERROR));
  }
}

/* SIGN IN WITH COOKIE */
export function* watchLoginUserCookie() {
  yield takeEvery(LOGIN_USER_COOKIE, loginWithCookie);
}

const loginWithCookieAsync = async () =>
  await Axios.get(USERS_API)
    .then((result) => result)
    .catch((error) => error.response);

function* loginWithCookie() {
  try {
    const token = yield STORAGE.getItem(nameTokenAuth);
    if (token) {
      const { exp: expiration } = jwtDecode(token);

      if (expiration * 1000 > new Date().getTime()) {
        //Si pas expiré on ajoute le token dans les requêtes axios
        Axios.defaults.headers['Authorization'] = 'Bearer ' + token;

        const result = yield call(loginWithCookieAsync);

        if (result?.status === 200) {
          const userCurrent = result.data['hydra:member'][0];
          yield put(loginUserSuccessCookie(userCurrent));
          yield put(getBuildings());
        } else {
          yield STORAGE.removeItem(nameTokenAuth, loginUserErrorCookie);
          yield put(loginUserErrorCookie(MSG_ERROR));
        }
      } else {
        yield STORAGE.removeItem(nameTokenAuth, loginUserErrorCookie);
        yield put(loginUserErrorCookie(MSG_ERROR));
      }
    } else {
      yield put(loginUserErrorCookie(null));
    }
  } catch (error) {
    yield STORAGE.removeItem(nameTokenAuth, loginUserErrorCookie);
    yield put(loginUserErrorCookie(MSG_ERROR));
  }
}

/* LOG OUT */
export function* watchLogoutUser() {
  yield takeEvery(LOGOUT_USER, logout);
}

const logoutAsync = async () => {
  const token = await STORAGE.getItem(nameTokenAuth, loginUserErrorCookie);
  if (token) {
    await STORAGE.removeItem(nameTokenAuth, loginUserErrorCookie);
    return true;
  }

  return false;
};

function* logout() {
  try {
    const result = yield call(logoutAsync);
    if (result) yield put(logoutUserSuccess());
  } catch (error) {
    yield put(logoutUserError(MSG_ERROR));
  }
}

/* FORGOT PASSWORD */
export function* watchForgotPasswordUser() {
  yield takeEvery(FORGOT_PASSWORD, forgotPassword);
}

const forgotPasswordAsync = async ({ email, lang }) => {
  return await Axios.get(`${USERS_API}/forgotpassword/${email}/${lang}`)
    .then((user) => user)
    .catch((error) => error.response);
};

function* forgotPassword({ payload }) {
  try {
    const result = yield call(forgotPasswordAsync, payload);
    if (result.status === 200) {
      const isSend = result.data['hydra:member'][0];
      const isUser = result.data['hydra:member'][1];

      if (isUser && !isSend) {
        yield put(forgotPasswordError('FORGOT_PASSWORD_EMAIL_ALREADY_SENT'));
      } else {
        yield put(forgotPasswordSuccess(isSend));
      }
    } else {
      yield put(forgotPasswordError(MSG_ERROR));
    }
  } catch (error) {
    yield put(forgotPasswordError(MSG_ERROR));
  }
}

/* RESET PASSWORD */
export function* watchResetPasswordUser() {
  yield takeEvery(RESET_PASSWORD, resetPassword);
}

const resetPasswordAsync = async ({ token, id, password }) => {
  return await Axios.post(`${USERS_API}/resetpassword/${token}/${id}`, {
    password,
  })
    .then((user) => user)
    .catch((error) => error.response);
};

function* resetPassword({ payload }) {
  try {
    const result = yield call(resetPasswordAsync, payload);
    if (result.status === 201) {
      yield put(resetPasswordSuccess(result.data['hydra:member'][0]));
    } else {
      yield put(resetPasswordError(MSG_ERROR));
    }
  } catch (error) {
    yield put(resetPasswordError(MSG_ERROR));
  }
}

/* VERIF TOKEN */
export function* watchVerifyTokenUser() {
  yield takeEvery(VERIFY_TOKEN, verifyToken);
}

const verifyTokenAsync = async ({ token, id }) => {
  return await Axios.get(`${USERS_API}/verifytoken/${token}/${id}`)
    .then((user) => user)
    .catch((error) => error.response);
};

function* verifyToken({ payload }) {
  try {
    const result = yield call(verifyTokenAsync, payload);
    if (result.status === 200) {
      yield put(verifyTokenUserSuccess(result.data));
    } else {
      yield put(verifyTokenUserError(MSG_ERROR));
    }
  } catch (error) {
    yield put(verifyTokenUserError(MSG_ERROR));
  }
}

/* CHANGE LOCAL */
export function* watchChangeLocaledUser() {
  yield takeEvery(CHANGE_LOCALE_USER, changeLocaleUser);
}

const changeLocaleUserAsync = async ({ idUser, idLang }) => {
  return await Axios.put(`${USERS_API}/${idUser}`, {
    lang: `/api/languages/${idLang}`,
  })
    .then((user) => user)
    .catch((error) => error.response);
};

function* changeLocaleUser({ payload }) {
  try {
    const result = yield call(changeLocaleUserAsync, payload);
    if (result.status === 200) {
      yield put(changeLocaleUserSuccess(result.data.lang.shortname));
    } else {
      yield put(changeLocaleUserError(MSG_ERROR));
    }
  } catch (error) {
    yield put(changeLocaleUserError(MSG_ERROR));
  }
}

/* UPDATE */
export function* watchUpdateUser() {
  yield takeEvery(UPDATE_USER, updateUser);
}

const updateUserAsync = async (item, id) => {
  const { lang, isOnboarding } = item;

  return await Axios.put(`${USERS_API}/${id}`, {
    language: `/api/languages/${lang}`,
    isOnboarding,
  })
    .then((result) => result)
    .catch((error) => error.response);
};

const updateUserPasswordAsync = async (item, id) => {
  const { password, security } = item;
  return await Axios.put(`${USERS_API}/${id}`, {
    password,
    isNewPass: security,
  })
    .then((user) => user)
    .catch((error) => error.response);
};

function* updateUser({ payload }) {
  const { item, id } = payload;
  try {
    const result = item.security
      ? yield call(updateUserPasswordAsync, item, id)
      : yield call(updateUserAsync, item, id);
    if (result?.status === 200) {
      yield put(updateUserSuccess(result.data));
    } else {
      yield put(updateUserError(MSG_ERROR));
    }
  } catch (error) {
    yield put(updateUserError(MSG_ERROR));
  }
}

export default function* rootSaga() {
  yield all([
    fork(watchLoginUser),
    fork(watchLogoutUser),
    fork(watchLoginUserCookie),
    fork(watchForgotPasswordUser),
    fork(watchVerifyTokenUser),
    fork(watchResetPasswordUser),
    fork(watchChangeLocaledUser),
    fork(watchUpdateUser),
  ]);
}
