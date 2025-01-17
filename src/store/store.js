/* eslint-disable no-undef */
import { compose, createStore, applyMiddleware } from "redux";
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";
import logger from "redux-logger";
import { rootReducer } from "./root-reducer";
import { thunk } from "redux-thunk";

const persistconfig = {
  key: "root",
  storage,
  whiteList: ["cart"],
};

const persistReducerr = persistReducer(persistconfig, rootReducer);

const middleWares = [
  process.env.NODE_ENV !== "production" && logger,
  thunk,
].filter(Boolean);

const composedEnhancers = compose(applyMiddleware(...middleWares));

export const store = createStore(persistReducerr, undefined, composedEnhancers);

export const persistor = persistStore(store);

//root reducer
