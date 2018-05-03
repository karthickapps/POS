import update from "immutability-helper";
import {
  ADD_ITEM_TO_CART,
  REMOVE_ITEM_TO_CART,
  UPDATE_CART_ITEM,
  EMPTY_CART
} from "../types";

export default function cart(state = {}, action = {}) {
  switch (action.type) {
    case ADD_ITEM_TO_CART:
      return {
        ...state,
        [action.data.id]: action.data
      };

    case UPDATE_CART_ITEM:
      return update(state, {
        [action.data.id]: { $set: action.data }
      });

    case REMOVE_ITEM_TO_CART:
      return update(state, {
        $unset: [action.data.id]
      });

    case EMPTY_CART:
      return {};

    default:
      return state;
  }
}
