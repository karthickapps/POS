import products from "./products";
import productTypes from "./productTypes";
import user from "./user";
import setAuthorizationHeader from "../utils";

setAuthorizationHeader(sessionStorage.getItem("token"));

export default {
  user,
  products,
  productTypes
};
