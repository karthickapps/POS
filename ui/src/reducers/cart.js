import update from "immutability-helper";
import { combineReducers } from "redux";

import {
  ADD_TO_CART,
  REMOVE_ITEM_FROM_CART,
  UPDATE_CART_ITEM,
  EMPTY_CART
} from "../types";

const ids = (state = [], action = {}) => {
  switch (action.type) {
    // eslint-disable-next-line no-case-declarations
    case ADD_TO_CART:
      if (state.listOfItems && state.listOfItems[action.payload.id]) {
        return state;
      }

      const isAvail = state.filter(o => o === action.payload.id);
      
      if (isAvail.length > 0) {
        return state;
      }

      return update(state, { $push: [action.payload.id] });

    case REMOVE_ITEM_FROM_CART:
      return state.filter(o => o !== action.payload.id);

    case EMPTY_CART:
      return [];

    default:
      return state;
  }
};

const listOfItems = (state = {}, action = {}) => {
  switch (action.type) {
    case ADD_TO_CART:
      return update(state, { $merge: { [action.payload.id]: action.payload } });

    case REMOVE_ITEM_FROM_CART:
      return update(state, { $unset: [action.payload.id] });

    case UPDATE_CART_ITEM:
      return update(state, {
        [action.payload.id]: { $set: action.payload }
      });

    case EMPTY_CART:
      return {};

    default:
      return state;
  }
};

const cart = combineReducers({
  ids,
  listOfItems
});

export default cart;
