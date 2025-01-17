import { createAction } from "../../util/firebase/reducer/reducer.utils";
import { CATEGORY_ACTION_TYPES } from "./category.types";
import { getCategoriesAndDocuments } from "../../util/firebase/firebase.utils";
export const setCategories = (categoriesArray) =>
  createAction(CATEGORY_ACTION_TYPES.FETCH_CATEGORIES_SUCCESS, categoriesArray);

export const fetchCatergoriesStart = () =>
  createAction(CATEGORY_ACTION_TYPES.FETCH_CATEGORIES_START);

export const fetchCatergoriesSucess = (categoriesArray) =>
  createAction(CATEGORY_ACTION_TYPES.FETCH_CATEGORIES_SUCCESS, categoriesArray);

export const fetchCatergoriesFailed = (error) =>
  createAction(CATEGORY_ACTION_TYPES.FETCH_CATEGORIES_SUCCESS, error);

export const fetchCategoriesAsync = () => async (dispatch) => {
  dispatch(fetchCatergoriesStart);
  try {
    const categoryArray = await getCategoriesAndDocuments();
    dispatch(fetchCatergoriesSucess(categoryArray));
  } catch (error) {
    dispatch(fetchCatergoriesFailed(error));
  }
};
