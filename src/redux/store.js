import { applyMiddleware, createStore } from 'redux';
import createSagaMiddleware from 'redux-saga';
import thunk from 'redux-thunk';
import reducers from './reducers';
import sagas from './sagas';

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

  if (module.hot) {
    module.hot.accept('./reducers', () => {
      const nextRootReducer = require('./reducers');
      storeNew.replaceReducer(nextRootReducer);
    });
  }

  return storeNew;
}
