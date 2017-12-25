import axios from "axios";
import setAuthorizationHeader from "../utils";

setAuthorizationHeader(sessionStorage.getItem("token"));

export default {
  user: {
    login: ({ id, password }) =>
      axios.post("/api/signin", { id, password }).then(res => {
        const token = res.data.payload.token;

        if (!token) {
          throw new { error: "Invalid credentials" }();
        } else {
          return token;
        }
      })
  },
  products: {
    fetchAll: () =>
      axios
        .get("/api/products")
        .then(res => res.data.payload)
        .catch(() => {
          throw new { error: "Unable to fetch the products" }();
        })
  }
};
