import React, { Component } from "react";
import { Form, Dropdown, Button } from "semantic-ui-react";
import * as moment from "moment";

import { MessageBox } from "../controls";
import api from "../../api";
import { isValidDateChange } from "../../utils";

class ExpenseTab extends Component {
  defaultData = {
    expense_type: "",
    description: "",
    amount: "",
    date: ""
  };

  state = {
    errors: {},
    selectedExpenseType: "",
    data: this.defaultData,
    canShowMessageBox: false,
    message: ""
  };

  onCancel = () => {};

  onSubmit = async () => {
    const errors = this.validate();

    if (Object.keys(errors).length > 0) {
      this.setState({
        errors
      });
      return;
    }

    this.state.data.date = moment(
      this.state.data.date,
      "DD-MM-YY",
      true
    ).toDate();

    const res = await api.expense.createNew(this.state.data);

    // Refractor this to Utils.
    let message = "";
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
    this.setState({ data: this.defaultData, selectedExpenseType: "" });
  };

  showMessageBox = message => {
    this.setState({
      message,
      canShowMessageBox: true
    });
  };

  validate = () => {
    // eslint-disable-next-line camelcase
    const { expense_type, description, amount, date } = this.state.data;
    const errors = {};

    if (expense_type.length === 0) errors.expense_type = "Select expense type";

    if (description.length === 0) errors.description = "Enter description";

    if (amount.length === 0) errors.amount = "Enter amount";

    if (date.length === 0) errors.date = "Enter date";

    return errors;
  };

  onExpenseTypesSelectionChanged = (e, { value }) => {
    let idx = 0;

    if (value === 0) idx = value;
    else idx = value - 1;

    this.setState({
      selectedExpenseType: value,
      data: {
        ...this.state.data,
        expense_type: this.props.expenseTypes[idx].id
      },
      errors: { ...this.state.errors, product_type: "" }
    });
  };

  onAmountChange = e => {
    let amount = e.target.value;

    if (isNaN(amount)) {
      return;
    }

    amount = amount.length === 0 ? (amount = "") : Number(amount);

    this.setState({
      data: { ...this.state.data, amount },
      errors: { ...this.state.errors, amount: "" }
    });
  };

  onDescriptionChange = e => {
    this.setState({
      data: { ...this.state.data, description: e.target.value },
      errors: { ...this.state.errors, description: "" }
    });
  };

  onDateChange = e => {
    const date = e.target.value;

    if (!isValidDateChange(date)) {
      // eslint-disable-next-line no-alert
      alert("Enter a valid date in DD-MM-YY format");
      return;
    }

    this.setState({
      data: { ...this.state.data, date: e.target.value },
      errors: { ...this.state.errors, date: "" }
    });
  };

  render() {
    const { errors, data } = this.state;

    return (
      <div>
        <br />
        <Form>
          <Form.Field error={!!errors.expense_type}>
            <label>Expense Type</label>
            <Dropdown
              onChange={this.onExpenseTypesSelectionChanged}
              options={this.props.expenseTypes}
              placeholder="Choose an option"
              selection
              value={this.state.selectedExpenseType}
            />
          </Form.Field>

          <Form.Field error={!!errors.description}>
            <label>Description</label>
            <input
              name="description"
              placeholder="Expense description"
              onChange={this.onDescriptionChange}
              value={data.description}
            />
          </Form.Field>

          <Form.Field error={!!errors.amount}>
            <label>Amount</label>
            <input
              name="amount"
              placeholder="Amount spent"
              onChange={this.onAmountChange}
              value={data.amount}
            />
          </Form.Field>

          <Form.Field error={!!errors.date}>
            <label>Date</label>
            <input
              name="date"
              placeholder="Date of expense (DD-MM-YY) => 11-01-1988"
              onChange={this.onDateChange}
              value={data.date}
            />
          </Form.Field>

          <Button.Group style={{ float: "right" }}>
            <Button onClick={this.onCancel} size="small">
              Cancel
            </Button>
            <Button color="violet" onClick={this.onSubmit} size="small">
              Submit
            </Button>
          </Button.Group>
        </Form>
        <MessageBox
          message={this.state.message}
          open={this.state.canShowMessageBox}
          onClose={() => this.setState({ canShowMessageBox: false })}
        />
      </div>
    );
  }
}

export default ExpenseTab;
