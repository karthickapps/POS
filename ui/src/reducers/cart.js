import update from "immutability-helper";
import {
  ADD_TO_CART,
  REMOVE_ITEM_FROM_CART,
  UPDATE_QTY_IN_CART,
  EMPTY_CART
} from "../types";

export default function cart(state = [], action = {}) {
  switch (action.type) {
    case ADD_TO_CART:
      return update(state, { $push: [action.payload] });
    case REMOVE_ITEM_FROM_CART:
      return state;
    case UPDATE_QTY_IN_CART:
      return state;
    case EMPTY_CART:
      return [];
    default:
      return state;
  }
}
