import React, { Component } from "react";
import { withRouter } from "react-router";
import { withStyles } from "material-ui/styles";
import Container from "../controls/Container";
import Title from "../controls/Title";
import SubmitCancel from "../controls/SubmitCancel";
import { isValueExists, isValidEmail } from "../../utils";
import CustomTextField from "../controls/CustomTextField";

// eslint-disable-next-line
const styles = theme => ({
  form: {
    marginLeft: 20
  }
});

class AddNew extends Component {
  state = {
    data: {
      customerId: "",
      customerName: "",
      address: "",
      mobile: "",
      description: "",
      email: ""
    },
    errors: {}
  };

  onChange = e => {
    this.setState({
      data: { ...this.state.data, [e.target.name]: e.target.value },
      errors: { ...this.state.errors, [e.target.name]: "" }
    });
  };

  onMobileInputChange = e => {
    const mobile = e.target.value;

    this.setState({
      errors: { ...this.state.errors, mobile: null }
    });

    if (mobile.toString().length > 10) {
      return;
    }
    if (mobile.toString() === "") {
      this.setState({
        data: {
          ...this.state.data,
          mobile: ""
        }
      });
    } else if (!isNaN(mobile)) {
      this.setState({
        data: {
          ...this.state.data,
          mobile
        }
      });
    }
  };

  onSubmit = async e => {
    e.preventDefault();

    let errors = isValueExists(this.state.data);

    if (this.state.data.mobile.length !== 10) {
      errors = {
        ...errors,
        mobile: "Invalid mobile number."
      };
    }

    if (!isValidEmail(this.state.data.email)) {
      errors = {
        ...errors,
        email: "Invalid email id."
      };
    }

    if (Object.keys(errors).length > 0) {
      this.setState({ errors });
    }

    // TODO API Call.
  };

  onCancelClick = () => {
    this.props.history.push("/customers");
  };

  render() {
    const { classes } = this.props;
    const { data, errors } = this.state;

    return (
      <Container>
        <Title title="New customer" />
        <br />

        <form onSubmit={this.onSubmit} className={classes.form}>
          <CustomTextField
            error={!!errors.customerId}
            name="customerId"
            value={data.customerId}
            label="Customer Id"
            helperText="This should be unique (can give mobile number)"
            onChange={this.onChange}
          />
          <br />
          <CustomTextField
            error={!!errors.customerName}
            name="customerName"
            value={data.customerName}
            label="Customer Name"
            margin="normal"
            onChange={this.onChange}
          />
          <CustomTextField
            name="description"
            value={data.description}
            label="Description"
            margin="normal"
            onChange={this.onChange}
          />
          <CustomTextField
            error={!!errors.address}
            name="address"
            value={data.address}
            label="Address"
            margin="normal"
            onChange={this.onChange}
          />
          <CustomTextField
            error={!!errors.mobile}
            name="mobile"
            value={data.mobile}
            label="Mobile"
            margin="normal"
            onChange={this.onMobileInputChange}
          />
          <CustomTextField
            error={!!errors.email}
            name="email"
            value={data.email}
            label="Email Id"
            margin="normal"
            onChange={this.onChange}
          />

          <SubmitCancel onCancelClick={this.onCancelClick} />
        </form>
      </Container>
    );
  }
}

export default withRouter(withStyles(styles, { withTheme: true })(AddNew));
