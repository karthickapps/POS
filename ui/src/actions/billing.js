import { UPDATE_DISCOUNT, UPDATE_TAX } from "../types";

export const updateDiscount = data => ({
  type: UPDATE_DISCOUNT,
  data
});

export const updateTax = data => ({
  type: UPDATE_TAX,
  data
});
