import axios from "axios";

export default {
  getTransId: async () => {
    const res = await axios.get("api/sale/transId");
    return res.data.payload;
  },

  addItemToCart: async item => {
    const t = {};
    Object.assign(t, item);
    delete t.netPrice;
    delete t.pricePerQty;
    const res = await axios.post("api/sale", t);
    return res.data.payload;
  },

  emptyCart: async transId => {
    const res = await axios.delete("api/sale", { data: { transId } });
    return res.data.payload;
  }
};
