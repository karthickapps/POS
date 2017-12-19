import axios from "axios";

export default {
  user: {
    login: ({ id, password }) =>
      axios.post("/api/signin", { id, password }).then(res => {
        const token = res.data.payload.token;

        if (!token) {
          throw new { error: "Invalid credentials" }();
        } else {
          return token;
        }
      })
  }
};
