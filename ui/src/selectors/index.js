import { createSelector } from "reselect";

const getProductTypeSelector = () =>
  createSelector(
    state => state.productType,
    productType => {
      if (productType.list) {
        return productType;
      }
      return {
        list: [],
        pagination: {},
        meta: {}
      };
    }
  );

const getProductTypeDataForDropdownSelector = () =>
  createSelector(
    state => state.productType,
    productType => {
      if (productType.list) {
        return productType;
      }
      return {
        list: [],
        pagination: {},
        meta: {}
      };
    }
  );

export { getProductTypeSelector, getProductTypeDataForDropdownSelector };
