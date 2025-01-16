/* eslint-disable react/prop-types */
import { createContext, useReducer } from "react";
import { createAction } from "../util/firebase/reducer/reducer.utils";

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

const CART_ACTION_TYPES = {
  SET_CART_ITEMS: "SET_CART_ITEMS",
  SET_IS_CART_OPEN: "SET_IS_CART_OPEN",
};

const cartReducer = (state, action) => {
  const { type, payload } = action;
  switch (type) {
    case CART_ACTION_TYPES.SET_CART_ITEMS:
      return { ...state, ...payload };
    case CART_ACTION_TYPES.SET_IS_CART_OPEN:
      return { ...state, isCartopen: payload };

    default:
      throw new Error(`unhandled action ${action} type in cartReducer`);
  }
};

const INTIAL_STATE = {
  cartItems: [],
  isCartopen: false,
  cartCount: 0,
  cartTotal: 0,
};
export const CartProvider = ({ children }) => {
  const [{ cartItems, isCartopen, cartCount, cartTotal }, dispatch] =
    useReducer(cartReducer, INTIAL_STATE);

  const updateCartItemsReducer = (newCartItems) => {
    const newCartTotal = newCartItems.reduce(
      (total, cartItem) => total + cartItem.quantity * cartItem.price,
      0,
    );
    const newCartCount = newCartItems.reduce(
      (total, cartItem) => total + cartItem.quantity,
      0,
    );

    dispatch(
      createAction(CART_ACTION_TYPES.SET_CART_ITEMS, {
        cartItems: newCartItems,
        cartCount: newCartCount,
        cartTotal: newCartTotal,
      }),
    );
  };

  const addItemToCart = (productToAdd) => {
    const newCartItems = addCartItem(cartItems, productToAdd);
    updateCartItemsReducer(newCartItems);
  };

  const removeItemFromCart = (cartItemToRemove) => {
    const newCartItems = removeCartItem(cartItems, cartItemToRemove);
    updateCartItemsReducer(newCartItems);
  };
  const clearItemFromCart = (cartItemToClear) => {
    const newCartItems = clearCartItem(cartItems, cartItemToClear);
    updateCartItemsReducer(newCartItems);
  };

  const setIsCartopen = (bool) =>
    dispatch(createAction(CART_ACTION_TYPES.SET_IS_CART_OPEN, bool));

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
