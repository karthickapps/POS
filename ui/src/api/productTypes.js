import axios from "axios";

const productTypes = {
  fetchAll: () =>
    axios
      .get("/api/productTypes")
      .then(res => res.data.payload)
      .catch(() => {
        throw new { error: "Unable to fetch the products" }();
      }),
  search: query =>
    axios
      .get(`/api/productTypes/search/${query}`)
      .then(res => res.data.payload)
      .catch(err => {
        console.log(err);
        throw new { error: "Unable to fetch the products" }();
      }),
  createNew: productType => axios.post("api/productTypes", productType),

  update: (id, productType) => axios.put(`api/productTypes/${id}`, productType),

  delete: id => axios.delete(`api/productTypes/${id}`)
};

export default productTypes;
