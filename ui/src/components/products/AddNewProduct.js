import React, { Component } from "react";
import * as equal from "fast-deep-equal";
import { withRouter } from "react-router";
import { withStyles } from "material-ui/styles";
import Container from "../controls/Container";
import Form from "../controls/Form";
import CustomTextField from "../controls/textfields/CustomTextField";
import Dropdown from "../controls/dropdown/Dropdown";
import CircularLoader from "../controls/loader/CircularLoader";
import api from "../../api";
import NumberTextField from "../controls/textfields/NumberTextField";
import { isValueExists } from "../../utils";
import Message from "../controls/Message";

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
  initialData = {
    id: "",
    description: "",
    costPrice: "",
    sellingPrice: "",
    productType: ""
  };

  state = {
    data: this.initialData,
    errors: {},
    isLoading: false,
    productTypeIds: [],
    showMessage: false
  };

  constructor(props) {
    super(props);
    window.onbeforeunload = () => {
      sessionStorage.setItem("form", JSON.stringify(this.state.data));
    };
  }

  async componentDidMount() {
    this.setState({ isLoading: true });

    const res = await api.productType.fetchAll();
    const productTypeIds = res.data.map(d => ({
      value: d.id,
      label: d.id
    }));

    this.setState({ isLoading: false, productTypeIds });
  }

  onChange = e => {
    this.setState({
      data: { ...this.state.data, [e.target.name]: e.target.value },
      errors: { ...this.state.errors, [e.target.name]: "" }
    });
  };

  onProductTypeDropdownChange = value => {
    const productType = value === null ? "" : value;

    this.setState({
      data: { ...this.state.data, productType },
      errors: { ...this.state.errors, productType: "" }
    });
  };

  onCancelClick = () => {
    const isDirty = !equal(this.initialData, this.state.data);

    if (isDirty === false) {
      this.props.history.goBack();
    }
  };

  onSubmit = async e => {
    e.preventDefault();

    const errors = isValueExists(this.state.data);

    if (Object.keys(errors).length > 0) {
      this.setState({ errors });
      return;
    }

    try {
      this.state.data.costPrice = Number(this.state.data.costPrice);
      this.state.data.sellingPrice = Number(this.state.data.sellingPrice);
      const res = await api.product.createNew(this.state.data);
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
    const { classes } = this.props;
    const {
      data,
      errors,
      isLoading,
      productTypeIds,
      showMessage,
      isError,
      message
    } = this.state;

    return (
      <Container title="New product">
        <CircularLoader isLoading={isLoading} />
        <Message
          title="Message"
          message={message}
          show={showMessage}
          isError={isError}
          onCloseClick={this.onMessageCloseClick}
        />

        <Form
          id="product"
          onSubmit={this.onSubmit}
          onCancel={this.onCancelClick}
          className={classes.form}
        >
          <CustomTextField
            inputRef={input => {
              this.idRef = input;
            }}
            error={!!errors.id}
            name="id"
            value={data.id}
            label="Product Id"
            helperText="This should be unique"
            onChange={this.onChange}
          />

          <Dropdown
            name="productType"
            value={data.productType}
            error={!!errors.productType}
            datasource={productTypeIds}
            onChange={this.onProductTypeDropdownChange}
            placeholder=""
            label="Product type"
          />

          <CustomTextField
            error={!!errors.description}
            name="description"
            value={data.description}
            label="Description"
            onChange={this.onChange}
          />

          <NumberTextField
            error={!!errors.costPrice}
            name="costPrice"
            value={data.costPrice}
            label="Cost price"
            onChange={this.onChange}
          />

          <NumberTextField
            error={!!errors.sellingPrice}
            name="sellingPrice"
            value={data.sellingPrice}
            label="Selling price"
            onChange={this.onChange}
          />
        </Form>
      </Container>
    );
  }
}

const component = withStyles(styles, { withTheme: true })(AddNewProduct);

export default withRouter(component);
