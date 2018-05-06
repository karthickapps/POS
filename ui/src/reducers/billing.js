import update from "immutability-helper";
import { UPDATE_DISCOUNT, UPDATE_TAX } from "../types";

export default function billing(state = {}, action = {}) {
  switch (action.type) {
    case UPDATE_DISCOUNT:
      return update(state, { discount: { $set: action.data.discount } });

    case UPDATE_TAX:
      return update(state, { tax: { $set: action.data.tax } });

    default:
      return state;
  }
}
