import React, { Component } from "react";
import { Form, TextArea } from "semantic-ui-react";

import { Dialog } from "../controls";

class AddOrUpdateCustomer extends Component {
  state = {
    errors: {},
    data: {}
  };

  componentWillReceiveProps(nextProps) {
    this.setState({ data: nextProps.data });
  }

  onInputChange = e => {
    this.setState({
      ...this.state,
      data: { ...this.state.data, [e.target.name]: e.target.value },
      errors: { ...this.state.errors, [e.target.name]: "" }
    });
  };

  validate = () => {
    const { id, name } = this.state.data;
    const errors = {};

    if (id.length === 0) errors.id = "Enter mobile no.";

    if (name.length === 0) errors.name = "Enter customer name.";

    return errors;
  };

  onSubmitForm = () => {
    const errors = this.validate();
    if (Object.keys(errors).length > 0) {
      this.setState({ errors });
      return;
    }

    this.props.onSubmit(this.state.data);
  };

  render() {
    const { errors, data } = this.state;

    return (
      <Dialog
        canShow={this.props.canShowDialog}
        onClose={this.props.onDialogClose}
        headerText={this.props.headerText}
        onSubmit={this.onSubmitForm}
      >
        <Form>
          <Form.Group widths="equal">
            <Form.Field error={!!errors.name}>
              <label> Name</label>
              <input
                name="name"
                placeholder="Customer name"
                onChange={this.onInputChange}
                value={data.name}
              />
            </Form.Field>
            <Form.Field error={!!errors.id}>
              <label>Mobile </label>
              <input
                name="id"
                placeholder="Mobile No."
                onChange={this.onInputChange}
                value={data.id}
              />
            </Form.Field>
          </Form.Group>
          <Form.Field>
            <label>Comments </label>
            <input
              name="description"
              placeholder="Comments"
              onChange={this.onInputChange}
              value={data.description}
            />
          </Form.Field>
          <Form.Field
            name="address"
            control={TextArea}
            label="Address"
            placeholder="Address."
            value={data.address}
            onChange={this.onInputChange}
          />
        </Form>
      </Dialog>
    );
  }
}

export default AddOrUpdateCustomer;
