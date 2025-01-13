/* eslint-disable react/prop-types */
import { createContext, useState, useEffect } from "react";

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

const removeCartItem = (cartItems, cartItemToRemove) => {
  const existingCartItem = cartItems.find(
    (item) => Number(item.id) === Number(cartItemToRemove.id),
  );

  if (existingCartItem) {
    if (existingCartItem.quantity === 1) {
      return cartItems.filter(
        (cartItem) => Number(cartItem.id) !== Number(cartItemToRemove.id),
      );
    }
  }

  return cartItems.map((cartItem) =>
    cartItem.id === cartItemToRemove.id
      ? { ...cartItem, quantity: cartItem.quantity - 1 }
      : cartItem,
  );
};

const clearCartItem = (cartItems, cartItemToClear) => {
  return cartItems.filter(
    (cartItem) => Number(cartItem.id) !== Number(cartItemToClear.id),
  );
};

export const CartContext = createContext({
  isCartopen: false,
  setIsCartopen: () => {},
  cartItems: [],
  addItemToCart: () => {},
  removeItemFromCart: () => {},
  clearItemFromCart: () => {},
  cartCount: 0,
  cartTotal: 0,
});

export const CartProvider = ({ children }) => {
  const [isCartopen, setIsCartopen] = useState(false);
  const [cartItems, setCartItems] = useState([]);
  const [cartCount, setCartCount] = useState(0);
  const [cartTotal, setCartTotal] = useState(0);

  useEffect(() => {
    const newCartCount = cartItems.reduce(
      (total, cartItem) => total + cartItem.quantity,
      0,
    );
    setCartCount(newCartCount);
  }, [cartItems]);

  useEffect(() => {
    const newCartTotal = cartItems.reduce(
      (total, cartItem) => total + cartItem.quantity * cartItem.price,
      0,
    );
    setCartTotal(newCartTotal);
  }, [cartItems]);

  const addItemToCart = (productToAdd) => {
    setCartItems(addCartItem(cartItems, productToAdd));
  };

  const removeItemFromCart = (cartItemToRemove) => {
    setCartItems(removeCartItem(cartItems, cartItemToRemove));
  };
  const clearItemFromCart = (cartItemToClear) => {
    setCartItems(clearCartItem(cartItems, cartItemToClear));
  };

  const value = {
    isCartopen,
    setIsCartopen,
    addItemToCart,
    removeItemFromCart,
    clearItemFromCart,
    cartItems,
    cartCount,
    cartTotal,
  };

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
};
