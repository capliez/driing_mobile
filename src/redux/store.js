import { applyMiddleware, createStore } from 'redux';
import createSagaMiddleware from 'redux-saga';
import thunk from 'redux-thunk';
import reducers from './reducers';
import sagas from './sagas';
import {
  /* SIGN IN WITH COOKIE */ LOGIN_USER_COOKIE,
  LOGIN_USER_ERROR_COOKIE,
  /* GET ALL LANGUAGES */ GET_LANGUAGES,
} from '../redux/action-types';
import { STORAGE } from '../../utils/STORAGE';
import { nameTokenAuth } from '../utils';

//Create Middleware Saga
const sagaMiddleware = createSagaMiddleware();

//Array Middleware
const middlewares = [sagaMiddleware];

//Create Store with Middleware
const createStoreWithMiddleware = applyMiddleware(
  thunk,
  ...middlewares,
)(createStore);

//Add Reducers in the store
const store = createStoreWithMiddleware(
  reducers,
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__(),
);

export function configureStore() {
  const storeNew = store;
  sagaMiddleware.run(sagas);

  const isUserCookie = STORAGE.getItem(nameTokenAuth, LOGIN_USER_ERROR_COOKIE);

  if (isUserCookie)
    store.dispatch({
      type: LOGIN_USER_COOKIE,
    });

  store.dispatch({
    type: GET_LANGUAGES,
  });

  if (module.hot) {
    module.hot.accept('./reducers', () => {
      const nextRootReducer = require('./reducers');
      storeNew.replaceReducer(nextRootReducer);
    });
  }

  return storeNew;
}
