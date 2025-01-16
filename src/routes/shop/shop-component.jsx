import { Routes, Route } from "react-router";

import CategoreisPreview from "../categories-preview/categories-preview.component";
import Category from "../category/category.component";
import { useDispatch } from "react-redux";

import { useEffect } from "react";
import { setCategories } from "../../store/categories/category.action";
import { getCategoriesAndDocuments } from "../../util/firebase/firebase.utils";
import "./shop.styles.scss";

const Shop = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    const getCategoriesMap = async () => {
      const categoryArray = await getCategoriesAndDocuments();
      console.log(categoryArray);
      dispatch(setCategories(categoryArray));
    };
    getCategoriesMap();
  }, []);
  return (
    <Routes>
      <Route index element={<CategoreisPreview />} />
      <Route path=":category" element={<Category />} />
    </Routes>
  );
};

export default Shop;
