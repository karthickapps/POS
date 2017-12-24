/* eslint-disable no-unused-vars */

import { PRODUCTS_FETCHED } from "../types";
import api from "../api";

export const productsFetched = products => ({
  type: PRODUCTS_FETCHED,
  products
});

export const fetchAllProducts = () => dispatch =>
  api.products.fetchAll().then(products => {
    dispatch(productsFetched(products));
  });
