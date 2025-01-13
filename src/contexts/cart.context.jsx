/* eslint-disable react/prop-types */
import { createContext, useState, useEffect } from "react";
import CartItem from "../components/cart-item/cart-item.component";

const addCartItem = (cartItems, productToAdd) => {
  const existingCartItem = cartItems.find(
    (item) => Number(item.id) === Number(productToAdd.id),
  );

  if (existingCartItem) {
    return cartItems.map((cartItem) =>
      Number(cartItem.id) === Number(productToAdd.id)
        ? {
            ...cartItem,
            quantity: cartItem.quantity + 1,
          }
        : cartItem,
    );
  }

  return [...cartItems, { ...productToAdd, quantity: 1 }];
};

export const CartContext = createContext({
  isCartopen: false,
  setIsCartopen: () => {},
  cartItems: [],
  addItemToCart: () => {},
  cartCount: 0,
});

export const CartProvider = ({ children }) => {
  const [isCartopen, setIsCartopen] = useState(false);
  const [cartItems, setCartItems] = useState([]);
  const [cartCount, setCartCount] = useState(0);

  useEffect(() => {
    const newCartCount = cartItems.reduce(
      (total, cartItem) => total + cartItem.quantity,
      0,
    );
    setCartCount(newCartCount);
  }, [cartItems]);

  const addItemToCart = (productToAdd) => {
    console.log("adding item to cart");
    console.log(cartItems);
    setCartItems(addCartItem(cartItems, productToAdd));
  };

  const value = {
    isCartopen,
    setIsCartopen,
    addItemToCart,
    cartItems,
    cartCount,
  };

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
};
