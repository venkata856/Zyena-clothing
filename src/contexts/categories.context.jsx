import { createContext, useState, useEffect } from "react";

import { getCategoriesAndDocuments } from "../util/firebase/firebase.utils.js";

export const CategoryContext = createContext({
  categoriesMap: {},
});

// eslint-disable-next-line react/prop-types
export const CategoriesProvider = ({ children }) => {
  const [categoriesMap, setCategoriesMap] = useState({});

  useEffect(() => {
    const getCategoriesMap = async () => {
      const categoryMap = await getCategoriesAndDocuments();
      setCategoriesMap(categoryMap);
    };
    getCategoriesMap();
  }, []);

  const value = { categoriesMap, setCategoriesMap };

  return (
    <CategoryContext.Provider value={value}>
      {children}
    </CategoryContext.Provider>
  );
};
