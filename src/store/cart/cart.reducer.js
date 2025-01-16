import { CART_ACTION_TYPES } from "./cart.types";
const CART_INTIAL_STATE = {
  cartItems: [],
  isCartopen: false,
};

export const cartReducer = (state = CART_INTIAL_STATE, action) => {
  const { type, payload } = action;
  switch (type) {
    case CART_ACTION_TYPES.SET_CART_ITEMS:
      return { ...state, cartItems: payload };
    case CART_ACTION_TYPES.SET_IS_CART_OPEN:
      return { ...state, isCartopen: payload };

    default:
      return state;
  }
};
