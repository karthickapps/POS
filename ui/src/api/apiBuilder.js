import axios from "axios";

const apiBuilder = mainRouteName => ({
  fetchAll: () => axios.get(`/api/${mainRouteName}?per_page=10&page=1`),

  fetchById: id => axios.get(`/api/${mainRouteName}/${id}`),

  count: (query = "") => axios.get(`/api/${mainRouteName}/count/${query}`),

  getPage: page => axios.get(`/api/${mainRouteName}/page/${page}`),

  search: query => axios.get(`/api/${mainRouteName}/search/${query}`),

  createNew: item => axios.post(`/api/${mainRouteName}`, item),

  update: (id, item) => axios.put(`/api/${mainRouteName}/${id}`, item),

  delete: id => axios.delete(`/api/${mainRouteName}/${id}`)
});

export default apiBuilder;
