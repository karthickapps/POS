import React, { Component } from "react";
import { withRouter } from "react-router";
import { withStyles } from "material-ui/styles";
import { connect } from "react-redux";
import Container from "../controls/Container";
import Form from "../controls/Form";
import CustomTextField from "../controls/CustomTextField";
import { loadProductType } from "../../actions/productType";
import { getProductTypeDataForDropdownSelector } from "../../selectors";
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
      paginationInfo,
      isFiltered: false
    };

    this.props.loadProductType(productType);
    this.setState({ isLoading: false });
  }

  onCancelClick = () => {
    this.props.history.push("/products");
  };

  onSubmit = e => {
    e.preventDefault();
  };

  render() {
    const { classes, productType } = this.props;
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

function mapStateToProps(state) {
  const selector = getProductTypeDataForDropdownSelector();
  return {
    productType: selector(state)
  };
}

let component = withStyles(styles, { withTheme: true })(AddNewProduct);
component = connect(mapStateToProps, { loadProductType })(component);

export default withRouter(component);
