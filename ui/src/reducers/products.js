// import update from "immutability-helper";
import { PRODUCTS_FETCHED } from "../types";

export default function products(state = [], action = {}) {
  switch (action.type) {
    case PRODUCTS_FETCHED:
      return action.products;
    default:
      return state;
  }
}
