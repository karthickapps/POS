import { UPDATE_DISCOUNT, UPDATE_TAX, RESET_BILLING } from "../types";

export const updateDiscount = data => ({
  type: UPDATE_DISCOUNT,
  data
});

export const updateTax = data => ({
  type: UPDATE_TAX,
  data
});

export const resetBilling = () => ({
  type: RESET_BILLING
});
