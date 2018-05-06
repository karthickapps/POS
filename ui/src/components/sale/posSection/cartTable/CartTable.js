import React, { Component } from "react";
import { connect } from "react-redux";
import { withStyles } from "material-ui/styles";
import { Paper } from "material-ui";
import Table from "material-ui/Table";
import YesNo from "../../../controls/dialog/YesNo";
import EditCartItem from "../editCartItem/EditCartItem";
import CartHeader from "./cartHeader";
import CartBody from "./cartBody";
import CartFooter from "./cartFooter";
import * as cartActions from "../../../../actions/cart";
import * as billingActions from "../../../../actions/billing";

import {
  getCartItemsArraySelector,
  getTotalSelector
} from "../../../../selectors";

const styles = theme => ({
  root: {
    width: "100%",
    marginTop: theme.spacing.unit * 3
  }
});

class CartTable extends Component {
  initialCartItem = {
    id: "",
    name: "",
    qty: "",
    price: "",
    discount: ""
  };

  state = {
    showConfirmDeleteDialog: false,
    showEditDialog: false,
    itemToEdit: this.initialCartItem
  };

  // onChange event for edit cart item form.
  onChange = e => {
    const { itemToEdit } = this.state;
    const clone = {};

    Object.assign(clone, itemToEdit);

    let { qty, discount } = clone;

    if (e.target.name === "discount") {
      discount = e.target.value;
    } else {
      qty = e.target.value;
    }

    if (discount > clone.price) {
      // eslint-disable-next-line
      discount = clone.discount;
    }

    const sellingPrice = clone.price - discount;
    const totalPrice = sellingPrice * qty;

    clone.qty = qty === "" ? "" : Number(qty);
    clone.discount = discount === "" ? "" : Number(discount);
    clone.sellingPrice = sellingPrice === "" ? "" : Number(sellingPrice);
    clone.totalPrice = totalPrice === "" ? "" : Number(totalPrice);

    this.setState({ itemToEdit: clone });
  };

  // Empty cart dialog
  onConfirmDeleteClick = () => {
    this.props.emptyCart();
    this.props.resetBilling();
    this.setState({ showConfirmDeleteDialog: false });
  };

  onDeleteAllClick = () => {
    this.setState({ showConfirmDeleteDialog: true });
  };

  onDeleteCartItemClick = row => {
    const { billing } = this.props;
    const discount = billing.discount - row.discount;
    this.props.updateDiscount({ discount });
    this.props.removeItemFromCart(row);
  };

  onCancelConfirmDeleteClick = () => {
    this.setState({ showConfirmDeleteDialog: false });
  };

  // Edit cart item dialog
  onProductItemClick = itemToEdit => {
    this.setState({ itemToEdit, showEditDialog: true });
  };

  onCancelEditItemClick = () => {
    this.setState({ showEditDialog: false, itemToEdit: this.initialCartItem });
  };

  onSaveItemClick = () => {
    const { itemToEdit } = this.state;

    const clone = {};

    Object.assign(clone, itemToEdit);
    clone.sellingPrice = clone.price - clone.discount;
    clone.totalPrice = clone.sellingPrice * clone.qty;

    this.updateDiscount(clone);
    this.props.updateCartItem(clone);
    this.setState({ showEditDialog: false, itemToEdit: this.initialCartItem });
  };

  updateDiscount = updatedCartItem => {
    const { cartObj, billing } = this.props;

    const isDiscountChanged =
      cartObj[updatedCartItem.id].discount !== updatedCartItem.discount;

    if (isDiscountChanged === false) {
      return;
    }

    const oldDiscount = cartObj[updatedCartItem.id].discount;
    const newDiscount = updatedCartItem.discount;
    const discount = billing.discount - oldDiscount + newDiscount;

    this.props.updateDiscount({ discount });
  };

  render() {
    const { showConfirmDeleteDialog, showEditDialog, itemToEdit } = this.state;
    const { classes, cartObj, cartArray, total, billing } = this.props;

    return (
      <Paper className={classes.root}>
        <YesNo
          open={showConfirmDeleteDialog}
          message="Are you sure wan't to empty the cart?"
          onOk={this.onConfirmDeleteClick}
          onCancel={this.onCancelConfirmDeleteClick}
        />

        <EditCartItem
          cartObj={cartObj}
          open={showEditDialog}
          item={itemToEdit}
          onSave={this.onSaveItemClick}
          onCancel={this.onCancelEditItemClick}
          onChange={this.onChange}
        />

        <Table>
          <CartHeader
            isCartEmpty={cartArray.length === 0}
            onDeleteAll={this.onDeleteAllClick}
          />
          <CartBody
            cartArray={cartArray}
            onDeleteCartItem={this.onDeleteCartItemClick}
            onProductItemSelect={this.onProductItemClick}
          />
        </Table>
        <CartFooter total={total} billing={billing} />
      </Paper>
    );
  }
}

function mapStateToProps(state) {
  return {
    cartArray: getCartItemsArraySelector(state),
    total: getTotalSelector(state),
    cartObj: state.cart,
    billing: state.billing
  };
}

const mapDispatchToProps = {
  emptyCart: cartActions.emptyCart,
  removeItemFromCart: cartActions.removeItemFromCart,
  updateCartItem: cartActions.updateCartItem,
  updateDiscount: billingActions.updateDiscount,
  resetBilling: billingActions.resetBilling
};

const component = withStyles(styles, { withTheme: true })(CartTable);

export default connect(mapStateToProps, mapDispatchToProps)(component);
