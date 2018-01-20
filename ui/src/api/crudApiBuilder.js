import axios from "axios";

const crudApi = mainRouteName => ({
  fetchAll: async () => {
    const res = await axios.get(`api/${mainRouteName}`);
    return res.data.payload;
  },

  getPage: async page => {
    const res = await axios.get(`api/${mainRouteName}/page/${page}`);
    return res.data.payload;
  },

  search: async query => {
    const res = await axios.get(`/api/${mainRouteName}/search/${query}`);
    return res.data.payload;
  },

  createNew: product => axios.post(`api/${mainRouteName}`, product),

  update: (id, product) => axios.put(`api/${mainRouteName}/${id}`, product),

  delete: id => axios.delete(`api/${mainRouteName}/${id}`)
});

export default crudApi;
