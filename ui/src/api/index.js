import products from "./products";
import productTypes from "./productTypes";
import expense from "./expense";
import expenseTypes from "./expenseTypes";
import user from "./user";
import { setAuthorizationHeader } from "../utils";

setAuthorizationHeader(sessionStorage.getItem("token"));

export default {
  user,
  products,
  productTypes,
  expense,
  expenseTypes
};
