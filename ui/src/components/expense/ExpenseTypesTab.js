import React, { Component } from "react";
import { Tab } from "semantic-ui-react";

import AddOrUpdateExpenseTypes from "./AddOrUpdateExpenseTypes";
import { Loader, Datagrid, MessageBox, YesNo } from "../controls";
import api from "../../api";

import "../controls/commonTabs.css";

class ExpenseTypesTab extends Component {
  currentExpenseType = {};

  expenseTypeDefault = {
    id: ""
  };

  gridSource = {
    headers: ["Expense type"],
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
    expenseType: this.expenseTypeDefault,
    datasource: this.gridSource
  };

  // TODO Bad way. Needs to change this very soon in refractoring.
  // Currently its done this way, since even the tab change trigerrs this event.
  // So to load data intially it's passed from the props.
  componentWillMount() {
    this.setDataSource(this.props.expenseTypes);
  }

  onFetchAll = async () => {
    const expenseTypes = await api.expenseTypes.fetchAll();
    this.setDataSource(expenseTypes);
  };

  onSearch = async query => {
    const expenseTypes = await api.expenseTypes.search(query);
    this.setDataSource(expenseTypes);
  };

  setDataSource = data => {
    const { datasource } = this.state;
    datasource.data = data;
    this.setState({ datasource });
  };

  onCreateNew = () => {
    this.setState({
      canShowAddOrUpdate: true,
      isEdit: false,
      expenseType: this.expenseTypeDefault
    });
  };

  onEdit = expenseType => {
    this.currentExpenseType.id = expenseType.id;
    this.setState({ canShowAddOrUpdate: true, isEdit: true, expenseType });
  };

  onDelete = expenseType => {
    this.currentExpenseType = expenseType;
    this.setState({ canShowConfirmDelete: true });
  };

  deleteExpenseType = async () => {
    try {
      this.setState({ canShowConfirmDelete: false, isLoading: false });
      await api.expenseTypes.delete(this.currentExpenseType.id);
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
      this.setState({ expenseType: data, isLoading: true });

      let res = "";
      let message = "";

      if (this.state.isEdit)
        res = await api.expenseTypes.update(this.currentExpenseType.id, data);
      else res = await api.expenseTypes.createNew(data);

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
        <AddOrUpdateExpenseTypes
          isEdit={this.state.isEdit}
          data={this.state.expenseType}
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
            onYes={this.deleteExpenseType}
          />
        ) : null}
      </Tab.Pane>
    );
  }
}

export default ExpenseTypesTab;
