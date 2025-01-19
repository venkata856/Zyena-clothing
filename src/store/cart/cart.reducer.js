import { createSlice } from "@reduxjs/toolkit";

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
const CART_INTIAL_STATE = {
  cartItems: [],
  isCartopen: false,
};

export const cartSlice = createSlice({
  name: "cart",
  intialState: CART_INTIAL_STATE,
  reducers: {
    setIsCartopen(state, action) {
      state.isCartopen = action.payload;
    },
    addItemToCart(state, action) {
      state.cartItems = addCartItem(state.cartItems, action.payload);
    },
    removeItemFromCart(state, action) {
      state.cartItems = removeCartItem(state.cartItems, action.payload);
    },
    clearItemFromCart(state, action) {
      state.cartItems = clearCartItem(state.cartItems, action.payload);
    },
  },
});

export const {
  setIsCartopen,
  addItemToCart,
  removeItemFromCart,
  clearItemFromCart,
} = cartSlice.actions;

export const cartReducer = cartSlice.reducer;
