import axios from "axios";

const user = {
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

export default user;