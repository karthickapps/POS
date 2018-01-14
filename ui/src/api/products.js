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
      .catch(err => {
        console.log(err);
        throw new { error: "Unable to fetch the products" }();
      }),
  createNew: product => axios.post("api/products", product),

  updateProduct: product => axios.put(`api/products/${product.id}`, product),

  deleteProduct: id => axios.delete(`api/products/${id}`)
};

export default products;
