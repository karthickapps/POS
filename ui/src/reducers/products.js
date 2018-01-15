// import update from "immutability-helper";
import { PRODUCTS_FETCHED, PRODUCT_SEARCH } from "../types";

export default function products(state = [], action = {}) {
  switch (action.type) {
    case PRODUCTS_FETCHED:
    case PRODUCT_SEARCH:
      return action.products;
    default:
      return state;
  }
}
