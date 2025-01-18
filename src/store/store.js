/* eslint-disable no-undef */
import { compose, createStore, applyMiddleware } from "redux";
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";
import logger from "redux-logger";
import { rootReducer } from "./root-reducer";

import createSagaMiddleware from "redux-saga";
import { rootSaga } from "./root-saga";

const persistconfig = {
  key: "root",
  storage,
  whiteList: ["cart"],
};

const sagaMiddleWare = createSagaMiddleware();
const persistReducerr = persistReducer(persistconfig, rootReducer);

const middleWares = [
  process.env.NODE_ENV !== "production" && logger,
  sagaMiddleWare,
].filter(Boolean);

const composedEnhancers = compose(applyMiddleware(...middleWares));

export const store = createStore(persistReducerr, undefined, composedEnhancers);
sagaMiddleWare.run(rootSaga);

export const persistor = persistStore(store);

//root reducer
