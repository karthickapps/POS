import React, { Component } from "react";
import { Titlebar, Datagrid, Loader } from "../controls";
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
      totalRecords: 167
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

  setDataSource = customers => {
    const { datasource } = this.state;
    datasource.data = customers;
    this.setState({ datasource: this.state.datasource, isLoading: false });
  };

  onFetchNextBatch = async idx => {
    const customers = await api.customers.getPage(idx);
    return customers;
  };

  onFetchAll = async () => {
    this.setState({ isLoading: true });
    const customers = await api.customers.getPage(1);
    this.setDataSource(customers);
  };

  onSearch = async query => {
    const customers = await api.customers.search(query);
    this.setDataSource(customers);
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

  deleteCustomer = async () => {
    try {
      this.setState({ canShowConfirmDelete: false, isLoading: false });
      await api.customers.delete(this.customerDefault.id);
      this.showMessageBox("Deleted successfully.");
    } catch (error) {
      this.showMessageBox(error.message);
    } finally {
      await this.onFetchAll();
      this.setState({ isLoading: false });
    }
  };

  onSubmitForm = async data => {
    //
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
      </div>
    );
  }
}

export default Customers;
