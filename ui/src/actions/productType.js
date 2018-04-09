import { LOAD_PRODUCT_TYPE } from "../types";

// eslint-disable-next-line
export const loadProductType = productType => ({
  type: LOAD_PRODUCT_TYPE,
  productType
});
