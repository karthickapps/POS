import {
  ADD_TO_CART,
  REMOVE_ITEM_FROM_CART,
  UPDATE_CART_ITEM,
  EMPTY_CART
} from "../types";

export const emptyCart = () => ({
  type: EMPTY_CART
});

export const addToCart = item => ({
  type: ADD_TO_CART,
  payload: item
});

export const removeItemFromCart = item => ({
  type: REMOVE_ITEM_FROM_CART,
  payload: item
});

export const updateItemInCart = item => ({
  type: UPDATE_CART_ITEM,
  payload: item
});
