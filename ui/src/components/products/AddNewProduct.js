import React, { Component } from "react";
import { withRouter } from "react-router";
import { withStyles } from "material-ui/styles";
import Container from "../controls/Container";
import Form from "../controls/Form";
import CustomTextField from "../controls/CustomTextField";
import Dropdown from "../controls/dropdown/Dropdown";
import CircularLoader from "../controls/loader/CircularLoader";
import api from "../../api";

// eslint-disable-next-line
const styles = theme => ({
  form: {
    marginLeft: 20
  },
  wrapper: {
    position: "relative"
  }
});

class AddNewProduct extends Component {
  state = {
    data: {},
    errors: {},
    isLoading: false
  };

  async componentDidMount() {
    this.setState({ isLoading: true });

    const res = await api.productType.fetchAll();
    const paginationInfo = {};
    const list = res.data;
    const productType = {
      list,
      paginationInfo
    };

    // eslint-disable-next-line react/no-unused-state
    this.setState({ isLoading: false, productType });
  }

  onCancelClick = () => {
    this.props.history.push("/products");
  };

  onSubmit = e => {
    e.preventDefault();
  };

  render() {
    const { classes } = this.props;
    const { data, errors, isLoading } = this.state;

    return (
      <Container title="New product">
        <CircularLoader isLoading={isLoading} />
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

          <Dropdown />
        </Form>
      </Container>
    );
  }
}

const component = withStyles(styles, { withTheme: true })(AddNewProduct);

export default withRouter(component);
