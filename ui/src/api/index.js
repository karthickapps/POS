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

const productType = apiBuilder("productType");

const product = apiBuilder("product");

export default { auth, productType, product };
