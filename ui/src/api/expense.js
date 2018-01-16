import axios from "axios";

const expense = {
  fetchAll: () =>
    axios
      .get("/api/expense")
      .then(res => res.data.payload)
      .catch(err => {
        throw new { error: err.message }();
      }),

  search: query =>
    axios
      .get(`/api/expense/search/${query}`)
      .then(res => res.data.payload)
      .catch(err => {
        console.log(err);
        throw new { error: err.message }();
      }),

  createNew: product => axios.post("api/expense", product),

  update: (id, product) => axios.put(`api/expense/${id}`, product),

  delete: id => axios.delete(`api/expense/${id}`)
};

export default expense;
