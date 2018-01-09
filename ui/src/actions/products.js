/* eslint-disable no-unused-vars */

import { PRODUCTS_FETCHED, PRODUCT_SEARCH } from "../types";
import api from "../api";

const productsFetched = products => ({
  type: PRODUCTS_FETCHED,
  products
});

const search = products => ({
  type: PRODUCT_SEARCH,
  products
});

export const fetchAllProducts = () => dispatch =>
  api.products.fetchAll().then(products => {
    dispatch(productsFetched(products));
  });

export const fetchBySearchQuery = query => dispatch =>
  api.products.search(query).then(products => {
    dispatch(search(products));
  });
