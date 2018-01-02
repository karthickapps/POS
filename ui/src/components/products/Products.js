import React, { Component } from "react";
import { connect } from "react-redux";
import { Tab } from "semantic-ui-react";

import Dialog from "./Dialog";
import { Loader, Searchbox, Datagrid } from "../controls";
import { fetchAllProducts } from "../../actions/products";
import "./products.css";

class Products extends Component {
  state = {
    isLoading: false,
    canShowDialog: false,
    headerText: "Create Product"
  };

  componentDidMount() {
    this.fetchProducts();
  }

  fetchProducts = () => {
    this.props
      .fetchAllProducts()
      .then()
      .catch(err => {
        console.log("fetchProducts =>", err);
      });
  };

  onEdit = id => {
    console.log(id);
  };

  onDelete = id => {
    console.log(id);
  };

  onCreateNew = () => {
    console.log("hey new product");
    this.setState({ canShowDialog: true });
  };

  onDialogClose = () => {
    this.setState({ canShowDialog: false });
  };

  render() {
    const datasource = {
      headers: ["Id", "Title", "Price", "Measure", "Product type", "Action"],
      filter: key =>
        key !== "created_at" && key !== "updated_at" && key !== "user_id",
      actions: {
        onEdit: id => console.log(id),
        onDelete: id => console.log(id)
      },
      data: this.props.products
    };

    const panes = [
      {
        menuItem: "Products",
        render: () => (
          <Tab.Pane>
            <Loader isLoading={this.state.isLoading} />
            <Searchbox
              searchText="Enter product id..."
              onCreateNew={this.onCreateNew}
            />
            <Datagrid datasource={datasource} />
            <Dialog
              canShow={this.state.canShowDialog}
              onClose={this.onDialogClose}
              headerText={this.state.headerText}
            />
          </Tab.Pane>
        )
      },
      {
        menuItem: "Product Type",
        render: () => <Tab.Pane>Tab 2 Content</Tab.Pane>
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

function mapStateToProps(state) {
  return {
    products: state.products
  };
}

export default connect(mapStateToProps, {
  fetchAllProducts
})(Products);
