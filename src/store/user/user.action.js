import { createAction } from "../../util/firebase/reducer/reducer.utils";
import { USER_ACTION_TYPES } from "./user.types";
export const setCurrentUser = (user) =>
  createAction(USER_ACTION_TYPES.SET_CURRENT_USER, user);

// CHECK_USER_SESSION: "user/CHECK_USER_SESSION",
// GOOGLE_SIGN_IN_START: "user/GOOGLE_SIGN_IN_START",
// EMAIL_SIGN_IN_START: "user/EMAIL_SIGN_IN_START",
// SIGN_IN_SUCESS: "user/SIGN_IN_SUCESS",
// SIGN_IN_FAILURE: "user/SIGN_IN_FAILURE",

export const checkUserSession = () =>
  createAction(USER_ACTION_TYPES.CHECK_USER_SESSION);

export const googleSignInStart = () =>
  createAction(USER_ACTION_TYPES.GOOGLE_SIGN_IN_START);

export const emailSingInStart = (email, password) =>
  createAction(USER_ACTION_TYPES.EMAIL_SIGN_IN_START, { email, password });
export const singInSucess = (user) =>
  createAction(USER_ACTION_TYPES.SIGN_IN_SUCESS, user);

export const singInFailed = (error) =>
  createAction(USER_ACTION_TYPES.SIGN_IN_FAILED, error);
