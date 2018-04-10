import { createSelector } from "reselect";

const productTypeSelector = createSelector(
  state => state.productType,
  productType => {
    if (productType.list) {
      return productType;
    }
    return {
      list: [],
      pagination: {}
    };
  }
);

// eslint-disable-next-line
export { productTypeSelector };
