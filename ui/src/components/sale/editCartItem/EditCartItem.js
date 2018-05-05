import React, { Component, Fragment } from "react";
import { connect } from "react-redux";
import FormDialog from "../../controls/dialog/FormDialog";
import CustomTextField from "../../controls/textfields/CustomTextField";
import NumberTextField from "../../controls/textfields/NumberTextField";
import { updateCartItem } from "../../../actions/cart";
import { isValueExists } from "../../../utils";
import Footer from "./Footer";

class EditCartItem extends Component {
  state = {
    errors: {}
  };

  onChange = e => {
    this.setState({
      errors: { ...this.state.errors, [e.target.name]: "" }
    });

    this.props.onChange(e);
  };

  onSave = () => {
    const errors = isValueExists(this.props.item);

    if (Object.keys(errors).length > 0) {
      this.setState({ errors });
      return;
    }

    this.setState({ errors: {} });
    this.props.onSave();
  };

  render() {
    const { errors } = this.state;
    const { onCancel, open, item } = this.props;

    return (
      <Fragment>
        <FormDialog onSave={this.onSave} onCancel={onCancel} open={open}>
          <CustomTextField
            error={!!errors.id}
            name="id"
            value={item.id}
            label="Product Id"
            onChange={this.onChange}
            disabled={true}
          />

          <CustomTextField
            error={!!errors.name}
            name="name"
            value={item.name}
            label="Name"
            onChange={this.onChange}
            disabled={true}
          />

          <div style={{ display: "flex" }}>
            <NumberTextField
              error={!!errors.qty}
              name="qty"
              value={item.qty}
              label="Qty"
              onChange={this.onChange}
            />

            <NumberTextField
              error={!!errors.price}
              name="price"
              value={item.price}
              label="Unit Price"
              onChange={this.onChange}
              disabled={true}
            />

            <NumberTextField
              error={!!errors.discount}
              name="discount"
              value={item.discount}
              label="Discount"
              onChange={this.onChange}
            />
          </div>

          <Footer item={item} />
        </FormDialog>
      </Fragment>
    );
  }
}

function mapStateToProps(state) {
  return {
    cartObj: state.cart
  };
}

export default connect(mapStateToProps, { updateCartItem })(EditCartItem);
