import React, { Component } from "react";
import { connect } from "react-redux";
import { Tab } from "semantic-ui-react";

import AddOrUpdate from "./AddOrUpdate";
import { Loader, Datagrid } from "../controls";
import { fetchAllProducts, fetchBySearchQuery } from "../../actions/products";
import "./products.css";

class ProductTab extends Component {
  state = {
    isLoading: false,
    canShowDialog: false,
    datasource: {
      headers: ["Id", "Title", "Price", "Measure", "Product type", "Action"],
      filter: key =>
        key !== "created_at" && key !== "updated_at" && key !== "user_id",
      actions: {
        onEdit: id => console.log(id),
        onDelete: id => console.log(id),
        onCreateNew: () => this.onCreateNew(),
        onFetchAll: () => this.onFetchAll(),
        onSearch: query => this.onSearch(query)
      },
      data: null
    }
  };

  componentWillMount() {
    this.setDataSource();
  }

  setDataSource = () => {
    const datasource = this.state.datasource;
    datasource.data = this.props.products;
    this.setState({ datasource });
  };

  onSearch = query => {
    this.props
      .fetchBySearchQuery(query)
      .then(() => this.setDataSource())
      .catch(err => {
        console.log("onSearch =>", err);
      });
  };

  onFetchAll = () => {
    this.props
      .fetchAllProducts()
      .then(() => {
        this.setDataSource();
      })
      .catch(err => {
        console.log("fetchProducts =>", err);
      });
  };

  onSubmit = () => {
    console.log("onSubmit");
  };

  onDelete = id => {
    console.log(id);
  };

  onCreateNew = () => {
    this.setState({ canShowDialog: true });
  };

  onDialogClose = () => {
    this.setState({ canShowDialog: false });
  };

  render() {
    return (
      <Tab.Pane>
        <Loader isLoading={this.state.isLoading} />
        <Datagrid datasource={this.state.datasource} />
        <AddOrUpdate
          canShowDialog={this.state.canShowDialog}
          onDialogClose={this.onDialogClose}
          onSubmit={this.onSubmit}
          headerText="Create Product"
        />
      </Tab.Pane>
    );
  }
}

function mapStateToProps(state) {
  return {
    products: state.products
  };
}

export default connect(mapStateToProps, {
  fetchAllProducts,
  fetchBySearchQuery
})(ProductTab);
