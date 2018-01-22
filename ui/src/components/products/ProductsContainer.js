import React, { Component } from "react";
import { Tab } from "semantic-ui-react";

import api from "../../api";
import ProductTab from "./ProductTab";
import ProductTypesTab from "./ProductTypesTab";
import "../controls/commonTabs.css";

class ProductsContainer extends Component {
  state = { products: [], productTypes: [] };

  componentWillMount = async () => {
    const products = await api.products.fetchAll();
    const productTypes = await api.productTypes.fetchAll();
    this.setState({ products, productTypes });
  };

  render() {
    const panes = [
      {
        menuItem: "Products",
        render: () => <ProductTab products={this.state.products} />
      },
      {
        menuItem: "Product Type",
        render: () => <ProductTypesTab productTypes={this.state.productTypes} />
      }
    ];

    return (
      <div>
        <Tab
          menu={{ secondary: true, pointing: true }}
          id="tabContainer"
          panes={panes}
        />
      </div>
    );
  }
}

export default ProductsContainer;
