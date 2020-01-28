import { createStore, applyMiddleware, compose } from 'redux';
import createSagaMiddleware from 'redux-saga';
import logger from 'redux-logger'
import { persistStore, persistCombineReducers } from 'redux-persist';
import storage from 'redux-persist/es/storage';
import middlewareList from '../middleware';


import rootSaga from '../sagas';
import * as reducersList from '../reducers';

const rootReducer = persistCombineReducers({
  key: 'root',
  storage,
  whitelist: ['authReducer'],
}, reducersList);

const middlewares = [...middlewareList];
const enhancers = [];

const sagaMiddleware = createSagaMiddleware();

if(process.env.NODE_ENV !=='production') middlewares.push(logger);

middlewares.push(sagaMiddleware);
enhancers.push(applyMiddleware(...middlewares));

const createAppropriateStore = createStore;

export const store = createAppropriateStore(
  rootReducer,
  compose(...enhancers),
);

export const persistor = persistStore(store);

sagaMiddleware.run(rootSaga);

