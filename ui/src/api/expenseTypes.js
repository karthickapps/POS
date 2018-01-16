import axios from "axios";

const expenseTypes = {
  fetchAll: () =>
    axios
      .get("/api/expenseTypes")
      .then(res => res.data.payload)
      .catch(err => {
        throw new { error: err.message }();
      }),

  search: query =>
    axios
      .get(`/api/expenseTypes/search/${query}`)
      .then(res => res.data.payload)
      .catch(err => {
        console.log(err);
        throw new { error: err.message }();
      }),

  createNew: product => axios.post("api/expenseTypes", product),

  update: (id, product) => axios.put(`api/expenseTypes/${id}`, product),

  delete: id => axios.delete(`api/expenseTypes/${id}`)
};

export default expenseTypes;
