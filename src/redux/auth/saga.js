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
import { STORAGE } from '../../utils/STORAGE';

export const MSG_ERROR = 'Auth : An error has occurred';

/* SIGN IN */
export function* watchLoginUser() {
  yield takeEvery(LOGIN_USER, loginWithEmailPassword);
}

const loginWithEmailPasswordAsync = async (email, password) =>
  await Axios.post(LOGIN_API, { username: email, password })
    .then((user) => user)
    .catch((error) => error.response);

function* loginWithEmailPassword({ payload }) {
  const { email, password, remember } = payload;
  try {
    const result = yield call(loginWithEmailPasswordAsync, email, password);
    if (result.status === 200) {
      const token = result.data.token;

      const { id, lastName, firstName, email, roles, lang } = jwtDecode(token);

      Axios.defaults.headers['Authorization'] = 'Bearer ' + token;

      if (remember) {
        STORAGE.setItem(nameTokenAuth, token, loginUserError);
      }

      yield put(
        loginUserSuccess({ id, lastName, firstName, email, roles, lang }),
      );
    } else {
      yield put(
        loginUserError(
          result.data.message ? 'Les identifiants sont incorrects' : MSG_ERROR,
        ),
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
    const token = STORAGE.getItem(nameTokenAuth, loginUserErrorCookie);

    const { exp: expiration } = jwtDecode(token);

    if (expiration * 1000 > new Date().getTime()) {
      //Si pas expiré on ajoute le token dans les requêtes axios
      Axios.defaults.headers['Authorization'] = 'Bearer ' + token;

      const result = yield call(loginWithCookieAsync);

      if (result.status === 200) {
        const userCurrent = result.data['hydra:member'][0];
        yield put(loginUserSuccessCookie(userCurrent));
      } else {
        STORAGE.removeItem(nameTokenAuth, loginUserErrorCookie);
        yield put(loginUserErrorCookie(MSG_ERROR));
      }
    } else {
      STORAGE.removeItem(nameTokenAuth, loginUserErrorCookie);
      yield put(loginUserErrorCookie(MSG_ERROR));
    }
  } catch (error) {
    STORAGE.removeItem(nameTokenAuth, loginUserErrorCookie);
    yield put(loginUserErrorCookie(MSG_ERROR));
  }
}

/* LOG OUT */
export function* watchLogoutUser() {
  yield takeEvery(LOGOUT_USER, logout);
}

const logoutAsync = async () => {
  const token = STORAGE.getItem(nameTokenAuth, loginUserErrorCookie);
  if (token) {
    STORAGE.removeItem(nameTokenAuth, loginUserErrorCookie);
  }
};

function* logout() {
  yield call(logoutAsync);
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
  const { lang, avatar } = item;

  return await Axios.put(`${USERS_API}/${id}`, {
    avatar: `/api/avatars/${avatar}`,
    language: `/api/language/${lang}`,
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
    const user = item.security
      ? yield call(updateUserPasswordAsync, item, id)
      : yield call(updateUserAsync, item, id);
    if (user.status === 200) {
      let newUser = user.data;
      const newRoles = [];
      newUser.userRoles.length > 0 &&
        newUser.userRoles.map((r) => newRoles.push(r.name));
      newUser.roles = newRoles;
      yield put(updateUserSuccess(newUser));
    } else {
      const message =
        user.data.violations[0].propertyPath === 'email'
          ? 'Cette adresse email est déjà utilisé'
          : user.data.violations[0].message;
      yield put(updateUserError(message));
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
