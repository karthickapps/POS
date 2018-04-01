import axios from "axios";

const auth = {
  login: async ({ username, password }) => {
    try {
      const res = await axios.post("/api/login", { username, password });
      const { authToken } = res.data;

      if (!authToken) throw new { error: "Invalid credentials" }();
      else return res.data;
    } catch (error) {
      if (error.response && error.response.status === 401)
        throw new Error("Invalid credentials.");
      if (error.response && error.response.status > 200)
        throw new Error("Server error, please try again after sometime.");
      else throw error;
    }
  }
};

export default { auth };
