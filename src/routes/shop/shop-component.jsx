import { Routes, Route } from "react-router";

import CategoreisPreview from "../categories-preview/categories-preview.component";
import Category from "../category/category.component";
import { useDispatch } from "react-redux";

import { useEffect } from "react";
import { fetchCatergoriesStart } from "../../store/categories/category.action";

import "./shop.styles.scss";

const Shop = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchCatergoriesStart());
  }, []);
  return (
    <Routes>
      <Route index element={<CategoreisPreview />} />
      <Route path=":category" element={<Category />} />
    </Routes>
  );
};

export default Shop;
