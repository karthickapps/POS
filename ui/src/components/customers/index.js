import React, { Component } from "react";
import { Titlebar, Datagrid, Loader, MessageBox, YesNo } from "../controls";
import AddOrUpdateCustomer from "./AddOrUpdateCustomer";
import api from "../../api";

class Customers extends Component {
  currentCustomer = {};

  customerDefault = {
    id: "",
    name: "",
    description: "",
    address: ""
  };

  gridSource = {
    headers: ["Customer Id", "Name", "Details", "Adress", "Actions"],
    filter: key =>
      key !== "created_at" && key !== "updated_at" && key !== "user_id",
    actions: {
      onEdit: id => this.onEdit(id),
      onDelete: id => this.onDelete(id),
      onCreateNew: () => this.onCreateNew(),
      onFetchAll: () => this.onFetchAll(),
      onSearch: query => this.onSearch(query),
      onFetchNextBatch: idx => this.onFetchNextBatch(idx)
    },
    data: null,
    pagination: {
      showPagination: true,
      totalRecords: 0
    }
  };

  state = {
    isLoading: false,
    canShowAddOrUpdate: false,
    canShowError: false,
    canShowConfirmDelete: false,
    errorMessage: "",
    isEdit: false,
    customer: this.customerDefault,
    datasource: this.gridSource
  };

  async componentWillMount() {
    this.onFetchAll();
  }

  setDataSource = (customers, count) => {
    const { datasource } = this.state;
    datasource.data = customers;
    datasource.pagination.totalRecords = count;
    this.setState({ datasource, isLoading: false });
  };

  onFetchNextBatch = async idx => {
    const customers = await api.customers.getPage(idx);
    return customers;
  };

  onFetchAll = async () => {
    this.setState({ isLoading: true });
    const res = await api.customers.count();
    const customers = await api.customers.getPage(1);
    this.setDataSource(customers, res[0].count);
  };

  onSearch = async query => {
    const res = await api.customers.count(query);
    const customers = await api.customers.search(query);
    this.setDataSource(customers, res[0].count);
  };

  onCreateNew = () => {
    this.setState({
      canShowAddOrUpdate: true,
      isEdit: false,
      customer: this.customerDefault
    });
  };

  onEdit = customer => {
    this.currentCustomer.id = customer.id;
    this.setState({ canShowAddOrUpdate: true, isEdit: true, customer });
  };

  onDelete = customer => {
    this.currentCustomer = customer;
    this.setState({ canShowConfirmDelete: true });
  };

  deleteCustomer = async () => {
    try {
      this.setState({ canShowConfirmDelete: false, isLoading: false });
      await api.customers.delete(this.currentCustomer.id);
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
      this.setState({ customer: data, isLoading: true });

      let res = "";
      let message = "";

      if (this.state.isEdit)
        res = await api.customers.update(this.currentCustomer.id, data);
      else res = await api.customers.createNew(data);

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
      customer: this.customerDefault,
      isLoading: false
    });
  };

  render() {
    return (
      <div>
        <Titlebar title="Customers" />
        <Loader isLoading={this.state.isLoading} />
        <Datagrid datasource={this.state.datasource} />
        <AddOrUpdateCustomer
          isEdit={this.state.isEdit}
          data={this.state.customer}
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
            message="Are you sure want to delete the selected expense type?"
            onNo={() => this.setState({ canShowConfirmDelete: false })}
            onYes={this.deleteCustomer}
          />
        ) : null}
      </div>
    );
  }
}

export default Customers;
