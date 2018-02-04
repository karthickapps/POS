import axios from "axios";
import apiBuilder from "./apiBuilder";
import { setAuthorizationHeader } from "../utils";
import sale from "./sale";

setAuthorizationHeader(sessionStorage.getItem("token"));

const customers = apiBuilder("customers");

const expense = apiBuilder("expense");

const expenseTypes = apiBuilder("expenseTypes");

const productTypes = apiBuilder("productTypes");

const products = apiBuilder("products");

const user = apiBuilder("user");

user.login = ({ id, password }) =>
  axios.post("/api/signin", { id, password }).then(res => {
    const token = res.data.payload.token;

    if (!token) {
      throw new { error: "Invalid credentials" }();
    } else {
      return token;
    }
  });

export { user, products, productTypes, expense, expenseTypes, customers, sale };
