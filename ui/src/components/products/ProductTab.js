import React, { Component } from "react";
import { Tab } from "semantic-ui-react";

import AddOrUpdateProduct from "./AddOrUpdateProduct";
import { Loader, Datagrid, MessageBox, YesNo } from "../controls";
import api from "../../api";

import "../controls/commonTabs.css";

class ProductTab extends Component {
  currentProduct = {};

  productDefault = {
    id: "",
    product_type: "",
    description: "",
    price: ""
  };

  gridSource = {
    headers: ["Id", "Title", "Price", "Product type", "Action"],
    filter: key =>
      key !== "created_at" && key !== "updated_at" && key !== "user_id",
    actions: {
      onEdit: id => this.onEdit(id),
      onDelete: id => this.onDelete(id),
      onCreateNew: () => this.onCreateNew(),
      onFetchAll: () => this.onFetchAll(),
      onSearch: query => this.onSearch(query)
    },
    data: null
  };

  state = {
    isLoading: false,
    canShowAddOrUpdate: false,
    canShowError: false,
    canShowConfirmDelete: false,
    errorMessage: "",
    isEdit: false,
    product: this.productDefault,
    datasource: this.gridSource
  };

  componentWillReceiveProps(nextProps) {
    this.setDataSource(nextProps.products);
  }

  componentWillMount() {
    this.setDataSource(this.props.products);
  }

  setDataSource = data => {
    const datasource = this.state.datasource;
    datasource.data = data;
    this.setState({ datasource });
  };

  onSearch = async query => {
    const products = await api.products.search(query);
    this.setDataSource(products);
  };

  onFetchAll = async () => {
    try {
      const products = await api.products.fetchAll();
      this.setDataSource(products);
    } catch (error) {
      console.log(error);
    }
  };

  onCreateNew = () => {
    this.setState({
      canShowAddOrUpdate: true,
      isEdit: false,
      product: this.productDefault
    });
  };

  onEdit = product => {
    this.currentProduct.id = product.id;
    this.setState({ canShowAddOrUpdate: true, isEdit: true, product });
  };

  onDelete = product => {
    this.currentProduct = product;
    this.setState({ canShowConfirmDelete: true });
  };

  deleteProduct = async () => {
    try {
      this.setState({ canShowConfirmDelete: false, isLoading: true });
      await api.products.delete(this.currentProduct.id);
      this.showMessageBox("Deleted successfully.");
    } catch (error) {
      this.showMessageBox(error.message);
    } finally {
      await this.onFetchAll();
      this.setState({ isLoading: false });
    }
  };

  onSubmitForm = async data => {
    try {
      this.setState({ product: data, isLoading: true });

      let res = "";
      let message = "";

      if (this.state.isEdit)
        res = await api.products.update(this.currentProduct.id, data);
      else res = await api.products.createNew(data);

      console.log(res);

      if (res.data.status === "FAILED") {
        message =
          res.data.message.length === 0
            ? "Something went wrong. Please try again"
            : res.data.message;
      } else {
        message =
          res.data.message.length === 0
            ? "Saved successfully."
            : res.data.message;
      }

      this.showMessageBox(message);
    } catch (error) {
      this.showMessageBox(error.message);
    } finally {
      await this.onFetchAll();
      this.onAddOrUpdateDialogClose();
    }
  };

  showMessageBox = message => {
    this.setState({
      errorMessage: message,
      canShowError: true
    });
  };

  onAddOrUpdateDialogClose = () => {
    this.setState({
      canShowAddOrUpdate: false,
      isEdit: false,
      products: this.productDefault,
      isLoading: false
    });
  };

  render() {
    return (
      <Tab.Pane>
        <Loader isLoading={this.state.isLoading} />
        <Datagrid datasource={this.state.datasource} />
        <AddOrUpdateProduct
          isEdit={this.state.isEdit}
          data={this.state.product}
          canShowDialog={this.state.canShowAddOrUpdate}
          onDialogClose={this.onAddOrUpdateDialogClose}
          onSubmit={this.onSubmitForm}
          headerText="Create Product"
        />
        <MessageBox
          message={this.state.errorMessage}
          open={this.state.canShowError}
          onClose={() => this.setState({ canShowError: false })}
        />
        {this.state.canShowConfirmDelete ? (
          <YesNo
            message="Are you sure want to delete the selected product?"
            onNo={() => this.setState({ canShowConfirmDelete: false })}
            onYes={this.deleteProduct}
          />
        ) : null}
      </Tab.Pane>
    );
  }
}

export default ProductTab;
