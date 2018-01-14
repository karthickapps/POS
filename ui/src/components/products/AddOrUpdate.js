import React, { Component } from "react";
import { Form, Dropdown } from "semantic-ui-react";

import api from "../../api";
import { Dialog } from "../controls";

class AddOrUpdate extends Component {
  state = {
    productTypes: [],
    selectedProduct: null,
    errors: {},
    data: {}
  };

  componentWillReceiveProps(nextProps) {
    const selectedProductIndex = this.getSelectedProductIndex(
      nextProps.data.product_type
    );
    this.setState({
      selectedProduct: selectedProductIndex,
      data: nextProps.data
    });
  }

  getSelectedProductIndex = productType => {
    for (let idx = 0; idx < this.state.productTypes.length - 1; idx++) {
      const element = this.state.productTypes[idx];
      if (element.type === productType) {
        return idx;
      }
    }
    return null;
  };

  componentWillMount() {
    // TODO This has to be changed into a different mechanism.
    api.productTypes.fetchAll().then(res => {
      const productTypes = res.map((item, idx) => {
        const temp = item;
        temp.key = idx;
        temp.text = temp.type;
        temp.value = idx;
        return temp;
      });
      this.setState({ productTypes });
    });
  }

  onInputChange = e =>
    this.setState({
      ...this.state,
      data: { ...this.state.data, [e.target.name]: e.target.value },
      errors: { ...this.state.errors, [e.target.name]: "" }
    });

  onProductSelectionChanged = (e, { value }) => {
    let idx = 0;

    if (value === 0) idx = value;
    else idx = value - 1;

    this.setState({
      selectedProduct: value,
      data: {
        ...this.state.data,
        product_type: this.state.productTypes[idx].type
      },
      errors: { ...this.state.errors, product_type: "" }
    });
  };

  onNumberInputChange = e => {
    const price = e.target.value;

    this.setState({
      errors: { ...this.state.errors, price: null }
    });

    if (price.length === 0 || !isNaN(price)) {
      this.setState({
        data: {
          ...this.state.data,
          price: Number(price)
        }
      });
    }

    if (isNaN(price)) {
      this.setState({
        data: {
          ...this.state.data
        }
      });
    }
  };

  validate = () => {
    // eslint-disable-next-line camelcase
    const { id, product_type, description, price } = this.state.data;
    const errors = {};

    if (id.length === 0) errors.id = "Enter product id";

    if (product_type.length === 0)
      errors.product_type = "Select any product type";

    if (description.length === 0) errors.description = "Enter description";

    if (price.length === 0) errors.price = "Enter price";

    return errors;
  };

  onSubmitForm = () => {
    const errors = this.validate();

    if (Object.keys(errors).length > 0) {
      this.setState({
        errors
      });
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
          <Form.Field error={!!errors.id}>
            <label>Id</label>
            <input
              name="id"
              placeholder="Product Id"
              onChange={this.onInputChange}
              value={data.id}
            />
          </Form.Field>
          <Form.Field error={!!errors.product_type}>
            <label>Category</label>
            <Dropdown
              onChange={this.onProductSelectionChanged}
              options={this.state.productTypes}
              placeholder="Choose an option"
              selection
              value={this.state.selectedProduct}
            />
          </Form.Field>
          <Form.Field error={!!errors.description}>
            <label>Description</label>
            <input
              name="description"
              placeholder="Description"
              onChange={this.onInputChange}
              value={data.description}
            />
          </Form.Field>
          <Form.Field error={!!errors.price}>
            <label>Price</label>
            <input
              name="price"
              placeholder="Price"
              onChange={this.onNumberInputChange}
              value={data.price}
            />
          </Form.Field>
          <br />
        </Form>
      </Dialog>
    );
  }
}

export default AddOrUpdate;
