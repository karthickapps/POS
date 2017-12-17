import axios from "axios";

export default {
  user: {
    login: ({ id, password }) =>
      axios
        .post("/api/signin", { id, password })
        .then(res => res.data.payload.token),
  },
};
