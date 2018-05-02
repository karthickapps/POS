import axios from "axios";
import apiBuilder from "./apiBuilder";
import "./axiosClient";

const auth = {
  login: async ({ username, password }) => {
    try {
      const res = await axios.post("/api/login", { username, password });
      const { authToken } = res.data;

      if (!authToken) throw new { error: "Invalid credentials" }();
      else return res.data;
    } catch (error) {
      if (error.response && error.response.status === 401)
        throw new Error("Invalid credentials.");
      if (error.response && error.response.status > 200)
        throw new Error("Server error, please try again after sometime.");
      else throw error;
    }
  }
};

const productType = apiBuilder("producttypes");

const expenseType = apiBuilder("expensetypes");

const expense = apiBuilder("expense");

const product = apiBuilder("products");
product.Search = id => axios.get(`/api/products/search?q=${id}`);

const customer = apiBuilder("customers");

const vendor = apiBuilder("vendors");

const receiving = apiBuilder("receivings");

export default {
  auth,
  productType,
  product,
  customer,
  expense,
  expenseType,
  vendor,
  receiving
};
