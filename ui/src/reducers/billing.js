/* eslint-disable no-case-declarations */
import update from "immutability-helper";
import { UPDATE_DISCOUNT, UPDATE_TAX, RESET_BILLING } from "../types";

const initialBillingState = {
  discount: 0,
  tax: 0
};

export default function billing(state = initialBillingState, action = {}) {
  switch (action.type) {
    case UPDATE_DISCOUNT:
      return update(state, { discount: { $set: action.data.discount } });

    case UPDATE_TAX:
      return update(state, { tax: { $set: action.data.tax } });

    case RESET_BILLING:
      return initialBillingState;

    default:
      return state;
  }
}
