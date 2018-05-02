import {
  ADD_ITEM_TO_CART,
  REMOVE_ITEM_TO_CART,
  UPDATE_CART_ITEM,
  EMPTY_CART
} from "../types";

export const addItemsToCart = data => ({
  type: ADD_ITEM_TO_CART,
  data
});

export const removeItemFromCart = data => ({
  type: REMOVE_ITEM_TO_CART,
  data
});

export const updateCartItem = data => ({
  type: UPDATE_CART_ITEM,
  data
});

export const emptyCart = () => ({
  type: EMPTY_CART
});
