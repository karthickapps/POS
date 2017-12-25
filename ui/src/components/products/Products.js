import React, { Component } from "react";
import { connect } from "react-redux";

import { Titlebar, Loader, Searchbox, Datagrid } from "../controls";
import { fetchAllProducts } from "../../actions/products";
import "./products.css";

class Products extends Component {
  state = {
    isLoading: false
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

    return (
      <div>
        <Titlebar title="Products" />
        <Loader isLoading={this.state.isLoading} />
        <Searchbox searchText="Enter product id..." />
        <Datagrid datasource={datasource} />
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
