import React, { Component } from "react";
import { withRouter } from "react-router";
import { withStyles } from "material-ui/styles";
import Container from "../controls/Container";
import Form from "../controls/Form";
import CustomTextField from "../controls/CustomTextField";

// eslint-disable-next-line
const styles = theme => ({
  form: {
    marginLeft: 20
  }
});

class AddNewProduct extends Component {
  state = {
    data: {},
    errors: {}
  };

  onCancelClick = () => {
    this.props.history.push("/products");
  };

  onSubmit = e => {
    e.preventDefault();
  };

  render() {
    const { classes } = this.props;
    const { data, errors } = this.state;

    return (
      <Container title="New product">
        <Form
          id="product"
          onSubmit={this.onSubmit}
          onCancel={this.onCancelClick}
          className={classes.form}
        >
          <CustomTextField
            error={!!errors.productId}
            name="productId"
            value={data.productId}
            label="Product Id"
            helperText="This should be unique"
            onChange={this.onChange}
          />
        </Form>
      </Container>
    );
  }
}

export default withRouter(
  withStyles(styles, { withTheme: true })(AddNewProduct)
);
