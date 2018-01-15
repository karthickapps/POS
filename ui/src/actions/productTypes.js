import { PRODUCT_TYPE_FETCHED, PRODUCT_TYPE_SEARCH } from "../types";
import api from "../api";

const productsTypeFetched = productTypes => ({
  type: PRODUCT_TYPE_FETCHED,
  productTypes
});

const search = productTypes => ({
  type: PRODUCT_TYPE_SEARCH,
  productTypes
});

export const fetchAllProductTypes = () => dispatch =>
  api.productTypes.fetchAll().then(productTypes => {
    dispatch(productsTypeFetched(productTypes));
  });

export const fetchBySearchQuery = query => dispatch =>
  api.productTypes.search(query).then(productTypes => {
    dispatch(search(productTypes));
  });
