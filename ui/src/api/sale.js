import axios from "axios";

export default {
  getTransId: async () => {
    const res = await axios.get("api/sale");
    return res.data.payload;
  }
};
