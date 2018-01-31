import { createSelector } from "reselect";

const idsSelector = state => state.cart.ids;

const listOfItemsSelector = state => state.cart.listOfItems;

const cartTotalSelector = createSelector(
  idsSelector,
  listOfItemsSelector,
  (ids, listOfItems) => {
    let total = 0;

    for (let idx = 0; idx < ids.length; idx++) {
      const element = listOfItems[ids[idx]];
      total += element.netPrice;
    }

    return total;
  }
);

export default cartTotalSelector;
