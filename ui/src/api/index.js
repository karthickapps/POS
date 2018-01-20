import axios from "axios";
import crudApi from "./crudApiBuilder";
import { setAuthorizationHeader } from "../utils";

setAuthorizationHeader(sessionStorage.getItem("token"));

const customers = crudApi("customers");

const expense = crudApi("expense");

const expenseTypes = crudApi("expenseTypes");

const productTypes = crudApi("productTypes");

const products = crudApi("products");

const user = crudApi("user");

user.login = ({ id, password }) =>
  axios.post("/api/signin", { id, password }).then(res => {
    const token = res.data.payload.token;

    if (!token) {
      throw new { error: "Invalid credentials" }();
    } else {
      return token;
    }
  });

export default {
  user,
  products,
  productTypes,
  expense,
  expenseTypes,
  customers
};
