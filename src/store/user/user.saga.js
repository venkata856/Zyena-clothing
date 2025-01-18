import { takeLatest, put, all, call } from "redux-saga/effects";

import { USER_ACTION_TYPES } from "./user.types";

import { singInSucess, singInFailed } from "./user.action";
import {
  getCurrentUser,
  createUserDocumentFromAuth,
} from "../../util/firebase/firebase.utils";

export function* getSnapShotFromUserAuth(userAuth, additionalDetails) {
  try {
    const userSnapshot = yield call(
      createUserDocumentFromAuth,
      userAuth,
      additionalDetails,
    );
    yield put(singInSucess({ id: userSnapshot, ...userSnapshot }));
  } catch (error) {
    yield put(singInFailed(error));
  }
}
export function* isUserAuthenticated() {
  try {
    const userAuth = yield call(getCurrentUser);

    if (!userAuth) return;

    yield call(getSnapShotFromUserAuth, userAuth);
  } catch (error) {
    yield put(singInFailed(error));
  }
}

export function* onCheckUserSessions() {
  yield takeLatest(USER_ACTION_TYPES.CHECK_USER_SESSION, isUserAuthenticated);
}

export function* userSagas() {
  yield all([onCheckUserSessions]);
}
