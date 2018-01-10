import axios from "axios";

const products = {
  fetchAll: () =>
    axios
      .get("/api/products")
      .then(res => res.data.payload)
      .catch(() => {
        throw new { error: "Unable to fetch the products" }();
      }),
  search: query =>
    axios
      .get(`/api/products/search/${query}`)
      .then(res => res.data.payload)
      .catch(() => {
        throw new { error: "Unable to fetch the products" }();
      })
};

export default products;
