import * as types from "../types";

export const addToCart = item => ({
  type: types.ADD_TO_CART,
  payload: item
});

export const emptyCart = () => ({
  type: types.EMPTY_CART
});

export const removeItemFromCart = item => ({
  type: types.REMOVE_ITEM_FROM_CART,
  payload: item
});

export const updateItemInCart = item => ({
  type: types.UPDATE_CART_ITEM,
  payload: item
});

export const setTransId = transId => ({
  type: types.SET_TRANS_ID,
  payload: transId
});
