import axios from "axios";

const products = {
  fetchAll: () =>
    axios
      .get("/api/products")
      .then(res => res.data.payload)
      .catch(err => {
        throw new { error: err.message }();
      }),

  search: query =>
    axios
      .get(`/api/products/search/${query}`)
      .then(res => res.data.payload)
      .catch(err => {
        console.log(err);
        throw new { error: err.message }();
      }),

  createNew: product => axios.post("api/products", product),

  update: (id, product) => axios.put(`api/products/${id}`, product),

  delete: id => axios.delete(`api/products/${id}`)
};

export default products;
