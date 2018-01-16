import React, { Component } from "react";
import { Tab } from "semantic-ui-react";

import ProductTab from "./ProductTab";
import ProductTypesTab from "./ProductTypesTab";
import "../controls/commonTabs.css";

class ProductsContainer extends Component {
  render() {
    const panes = [
      {
        menuItem: "Products",
        render: () => <ProductTab />
      },
      {
        menuItem: "Product Type",
        render: () => <ProductTypesTab />
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
