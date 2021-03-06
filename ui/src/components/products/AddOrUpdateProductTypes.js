import React, { Component } from "react";
import { Form } from "semantic-ui-react";

import { Dialog } from "../controls";

class AddOrUpdateProductTypes extends Component {
  state = {
    error: "",
    data: { id: "" }
  };

  componentWillReceiveProps(nextProps) {
    this.setState({
      data: nextProps.data
    });
  }

  onInputChange = e => {
    const id = e.target.value;

    this.setState({ error: "" });

    this.setState({ data: { id } });
  };

  onSubmitForm = () => {
    const error = this.validate();

    if (error.length > 0) {
      this.setState({ error });
      return;
    }

    this.props.onSubmit(this.state.data);
  };

  validate = () => {
    const id = this.state.data.id;

    if (id.length === 0) return "Please enter the product type name";

    return "";
  };

  render() {
    const { error, data } = this.state;

    return (
      <Dialog
        canShow={this.props.canShowDialog}
        onClose={this.props.onDialogClose}
        headerText={this.props.headerText}
        onSubmit={this.onSubmitForm}
      >
        <Form>
          <Form.Field error={!!error}>
            <label>Product Type</label>
            <input
              name="id"
              placeholder="Enter product type name"
              onChange={this.onInputChange}
              value={data.id}
            />
          </Form.Field>
        </Form>
      </Dialog>
    );
  }
}

export default AddOrUpdateProductTypes;
