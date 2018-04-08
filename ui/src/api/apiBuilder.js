import axios from "axios";

const apiBuilder = mainRouteName => ({
  fetchAll: async () => {
    const res = await axios.get(`/api/${mainRouteName}`);
    return res.data;
  },

  fetchById: async id => {
    const res = await axios.get(`/api/${mainRouteName}/${id}`);
    return res.data;
  },

  count: async (query = "") => {
    const res = await axios.get(`/api/${mainRouteName}/count/${query}`);
    return res.data;
  },

  getPage: async page => {
    const res = await axios.get(`/api/${mainRouteName}/page/${page}`);
    return res.data;
  },

  search: async query => {
    const res = await axios.get(`/api/${mainRouteName}/search/${query}`);
    return res.data;
  },

  createNew: item => axios.post(`/api/${mainRouteName}`, item),

  update: (id, item) => axios.put(`/api/${mainRouteName}/${id}`, item),

  delete: id => axios.delete(`/api/${mainRouteName}/${id}`)
});

export default apiBuilder;
