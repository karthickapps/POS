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

const getCartItemsArraySelector = createSelector(
  state => state.cart,
  cart => {
    const keys = Object.keys(cart);
    const cartArray = [];
    for (let i = 0; i < keys.length; i++) {
      cartArray.push(cart[keys[i]]);
    }

    return cartArray;
  }
);

export {
  getProductTypeSelector,
  getProductTypeDataForDropdownSelector,
  getCartItemsArraySelector
};
