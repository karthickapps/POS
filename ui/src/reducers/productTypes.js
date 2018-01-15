import { PRODUCT_TYPE_FETCHED, PRODUCT_TYPE_SEARCH } from "../types";

export default function productTypes(state = [], action = {}) {
  switch (action.type) {
    case PRODUCT_TYPE_FETCHED:
    case PRODUCT_TYPE_SEARCH:
      return action.productTypes;
    default:
      return state;
  }
}
