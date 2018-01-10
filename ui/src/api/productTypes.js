import axios from "axios";

const productTypes = {
  fetchAll: () =>
    axios
      .get("/api/productTypes")
      .then(res => res.data.payload)
      .catch(() => {
        throw new { error: "Unable to fetch the products" }();
      })
};

export default productTypes;
