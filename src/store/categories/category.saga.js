import { takeLatest, all, call, put } from "redux-saga/effects";

import { getCategoriesAndDocuments } from "../../util/firebase/firebase.utils";
import {
  fetchCatergoriesSucess,
  fetchCatergoriesFailed,
} from "./category.action";

import { CATEGORY_ACTION_TYPES } from "./category.types";

export function* fetchCategoriesAsync() {
  try {
    const categoryArray = yield call(getCategoriesAndDocuments, "categories");
    yield put(fetchCatergoriesSucess(categoryArray));
  } catch (error) {
    yield put(fetchCatergoriesFailed(error));
  }
}
export function* onFetchCategories() {
  yield takeLatest(
    CATEGORY_ACTION_TYPES.FETCH_CATEGORIES_START,
    fetchCategoriesAsync,
  );
}

export function* categoriesSaga() {
  yield all([call(onFetchCategories)]);
}
