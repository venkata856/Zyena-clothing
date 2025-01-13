/* eslint-disable react/prop-types */
import { createContext, useState } from "react";

export const CartContext = createContext({
  isCartopen: false,
  setIsCartopen: () => {},
});

export const CartProvider = ({ children }) => {
  const [isCartopen, setIsCartopen] = useState(false);

  const value = { isCartopen, setIsCartopen };

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
};
