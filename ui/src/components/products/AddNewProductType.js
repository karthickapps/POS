import React, { Component } from "react";
import { withRouter } from "react-router";
import { withStyles } from "material-ui/styles";
import Container from "../controls/Container";
import Form from "../controls/Form";
import CustomTextField from "../controls/CustomTextField";
import { isValueExists } from "../../utils";
import api from "../../api";
import Message from "../controls/Message";

// eslint-disable-next-line
const styles = theme => ({
  form: {
    marginLeft: 20
  }
});

class AddNewProductType extends Component {
  initialData = {
    id: "",
    description: ""
  };

  state = {
    data: this.initialData,
    showMessage: false,
    errors: {}
  };

  onChange = e => {
    this.setState({
      data: { ...this.state.data, [e.target.name]: e.target.value },
      errors: { ...this.state.errors, [e.target.name]: "" }
    });
  };

  onCancelClick = () => {
    this.clearForm();
    this.onMessageCloseClick();
  };

  onSubmit = async e => {
    e.preventDefault();

    const errors = isValueExists(this.state.data, ["description"]);

    if (Object.keys(errors).length > 0) {
      this.setState({ errors });
      return;
    }

    try {
      const res = await api.productType.createNew(this.state.data);
      if (res.status === 201) {
        this.showMessage("Saved successfully");
        this.clearForm();
      }
    } catch (error) {
      this.showError(error);
    }
  };

  clearForm = () => {
    this.setState({ data: this.initialData });

    if (this.idRef) {
      this.idRef.focus();
    }
  };

  onMessageCloseClick = () => {
    this.setState({
      showMessage: false,
      message: "",
      isError: false
    });
  };

  showMessage = message => {
    this.setState({
      showMessage: true,
      message,
      isError: false
    });
  };

  showError = error => {
    this.setState({
      showMessage: true,
      message: error.message,
      isError: true
    });
  };

  render() {
    const { data, errors, showMessage, isError, message } = this.state;

    return (
      <Container title="New product type">
        <Message
          title="Message"
          message={message}
          show={showMessage}
          isError={isError}
          onCloseClick={this.onMessageCloseClick}
        />

        <Form
          id="productType"
          onSubmit={this.onSubmit}
          onCancel={this.onCancelClick}
        >
          <CustomTextField
            inputRef={input => {
              this.idRef = input;
            }}
            error={!!errors.id}
            name="id"
            value={data.id}
            label="Product type Id"
            helperText="This should be unique"
            onChange={this.onChange}
          />
          <br />

          <CustomTextField
            name="description"
            value={data.description}
            label="Description"
            onChange={this.onChange}
          />
        </Form>
      </Container>
    );
  }
}

export default withRouter(
  withStyles(styles, { withTheme: true })(AddNewProductType)
);
