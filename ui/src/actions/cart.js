import {
  ADD_TO_CART,
  REMOVE_ITEM_FROM_CART,
  UPDATE_QTY_IN_CART,
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

export const updateQtyIncart = (item, qty) => ({
  type: UPDATE_QTY_IN_CART,
  payload: { item, qty }
});
