import React, { Component } from "react";
import { Tab } from "semantic-ui-react";

import { Loader, Datagrid, MessageBox, YesNo } from "../controls";
import AddOrUpdateProductTypes from "./AddOrUpdateProductTypes";
import api from "../../api";

import "../controls/commonTabs.css";

class ProductTypeTab extends Component {
  currentProductType = {};

  productTypesDefault = {
    id: ""
  };

  gridSource = {
    headers: ["Product Type", "Action"],
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
    productType: this.productTypesDefault,
    datasource: this.gridSource
  };

  componentWillReceiveProps(nextProps) {
    this.setDataSource(nextProps.productTypes);
  }

  componentWillMount() {
    this.setDataSource(this.props.productTypes);
  }

  onFetchAll = async () => {
    try {
      const productTypes = await api.productTypes.fetchAll();
      this.setDataSource(productTypes);
    } catch (error) {
      this.showMessageBox(error.message);
    }
  };

  setDataSource = data => {
    const datasource = this.state.datasource;
    datasource.data = data;
    this.setState({ datasource });
  };

  onSearch = async query => {
    const productTypes = await api.productTypes.search(query);
    this.setDataSource(productTypes);
  };

  onCreateNew = () => {
    this.setState({
      canShowAddOrUpdate: true,
      isEdit: false,
      productType: this.productTypesDefault
    });
  };

  onEdit = productType => {
    this.currentProductType.id = productType.id;
    this.setState({ canShowAddOrUpdate: true, isEdit: true, productType });
  };

  onDelete = productType => {
    this.currentProductType = productType;
    this.setState({ canShowConfirmDelete: true });
  };

  deleteProduct = async () => {
    try {
      this.setState({ canShowConfirmDelete: false, isLoading: true });
      await api.productTypes.delete(this.currentProductType.id);
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
      this.setState({ productType: data, isLoading: true });

      let res = "";
      let message = "";

      if (this.state.isEdit)
        res = await api.productTypes.update(this.currentProductType.id, data);
      else res = await api.productTypes.createNew(data);

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
      productType: this.productTypesDefault,
      isLoading: false
    });
  };

  render() {
    return (
      <Tab.Pane>
        <Loader isLoading={this.state.isLoading} />
        <Datagrid datasource={this.state.datasource} />
        <AddOrUpdateProductTypes
          isEdit={this.state.isEdit}
          data={this.state.productType}
          canShowDialog={this.state.canShowAddOrUpdate}
          onDialogClose={this.onAddOrUpdateDialogClose}
          onSubmit={this.onSubmitForm}
          headerText="Create product type"
        />
        <MessageBox
          message={this.state.errorMessage}
          open={this.state.canShowError}
          onClose={() => this.setState({ canShowError: false })}
        />
        {this.state.canShowConfirmDelete ? (
          <YesNo
            message="Are you sure want to delete the selected product type?"
            onNo={() => this.setState({ canShowConfirmDelete: false })}
            onYes={this.deleteProduct}
          />
        ) : null}
      </Tab.Pane>
    );
  }
}

export default ProductTypeTab;
