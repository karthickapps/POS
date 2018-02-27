import axios from "axios";

export default {
  getTransId: async () => {
    try {
      const res = await axios.get("api/sale/transId");
      return res.data.payload;
    } catch (error) {
      return { error: error.message }
    }
  },

  addItemToCart: async item => {
    try {
      const t = {};
      Object.assign(t, item);
      delete t.netPrice;
      delete t.pricePerQty;
      const response = await axios.post("api/sale", t);
      return response.data.payload;
    } catch (error) {
      return { error: error.message }
    }
  },

  emptyCart: async transId => {
    try {
      const response = await axios.delete("api/sale", { data: { transId } });
      return response.data.payload;
    } catch (error) {
      return { error: error.message }
    }
  }
};
