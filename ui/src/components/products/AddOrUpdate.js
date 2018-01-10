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

  componentWillReceiveProps() {
    this.setState({ selectedProduct: null });
  }

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
      data: { ...this.state.data, [e.target.name]: e.target.value }
    });

  onProductSelectionChanged = (e, { value }) =>
    this.setState({
      selectedProduct: value,
      data: { ...this.state.data, productType: value }
    });

  onNumberInputChange = e => {
    const price = e.target.value;
    this.setState({
      errors: { ...this.state.errors, price: null }
    });
    if (price.length === 0) {
      return;
    }
    if (isNaN(price)) {
      this.setState({
        errors: { ...this.state.errors, price: "Enter a valid number." }
      });
      return;
    }
    this.setState({ prive: e.target.value });
  };

  render() {
    const { errors, data } = this.state;

    return (
      <Dialog
        canShow={this.props.canShowDialog}
        onClose={this.props.onDialogClose}
        headerText={this.props.headerText}
        onSubmit={this.props.onSubmit}
      >
        <Form>
          <Form.Field error={!!errors.productId}>
            <label>Id</label>
            <input
              placeholder="Product Id"
              onChange={this.onInputChange}
              value={data.productId}
            />
          </Form.Field>
          <Form.Field>
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
              placeholder="Desciption"
              onChange={this.onInputChange}
              value={data.description}
            />
          </Form.Field>
          <Form.Field error={!!errors.price}>
            <label>Price</label>
            <input
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
