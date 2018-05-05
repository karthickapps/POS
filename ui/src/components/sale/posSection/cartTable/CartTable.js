import React, { Component } from "react";
import { connect } from "react-redux";
import { withStyles } from "material-ui/styles";
import { Paper, IconButton } from "material-ui";
import DeleteIcon from "material-ui-icons/Delete";
import Table, { TableBody, TableHead, TableRow } from "material-ui/Table";
import CustomTableCell from "./CustomTableCell";
import NoItemsTableCell from "./NoItemsTableCell";
import SelectButton from "./SelectButton";
import * as cartActions from "../../../../actions/cart";
import { getCartItemsArraySelector } from "../../../../selectors";
import YesNo from "../../../controls/dialog/YesNo";
import EditCartItem from "../editCartItem/EditCartItem";

const styles = theme => ({
  root: {
    width: "100%",
    marginTop: theme.spacing.unit * 3
  },
  deleteIcon: {
    color: "#949494"
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

  renderEmptyCartButton = () => {
    if (this.props.cartArray.length === 0) {
      return null;
    }

    return (
      <IconButton>
        <DeleteIcon
          onClick={() => this.setState({ showConfirmDeleteDialog: true })}
          className={this.props.classes.deleteIcon}
        />
      </IconButton>
    );
  };

  noItems = () => (
    <TableBody>
      <TableRow>
        <NoItemsTableCell />
      </TableRow>
    </TableBody>
  );

  deleteCartItem = row => (
    <IconButton>
      <DeleteIcon
        onClick={() => this.props.removeItemFromCart(row)}
        className={this.props.classes.deleteIcon}
      />
    </IconButton>
  );

  renderHeader = () => (
    <TableHead>
      <TableRow>
        <CustomTableCell style={{ width: 150, textAlign: "center" }}>
          Product
        </CustomTableCell>
        <CustomTableCell numeric>Price</CustomTableCell>
        <CustomTableCell numeric>Qty</CustomTableCell>
        <CustomTableCell numeric>Total</CustomTableCell>
        <CustomTableCell numeric style={{ width: 30 }}>
          {this.renderEmptyCartButton()}
        </CustomTableCell>
      </TableRow>
    </TableHead>
  );

  renderBody = () => {
    const { cartArray, classes } = this.props;

    if (cartArray.length === 0) {
      return this.noItems();
    }

    return (
      <TableBody>
        {cartArray.map(n => (
          <TableRow className={classes.row} key={n.id}>
            <CustomTableCell style={{ width: 150 }}>
              <SelectButton
                text={n.name}
                onClick={() => this.onProductItemClick(n)}
              />
            </CustomTableCell>
            <CustomTableCell numeric>{n.sellingPrice}</CustomTableCell>
            <CustomTableCell numeric>{n.qty}</CustomTableCell>
            <CustomTableCell numeric>{n.totalPrice}</CustomTableCell>
            <CustomTableCell numeric style={{ width: 30 }}>
              {this.deleteCartItem(n)}
            </CustomTableCell>
          </TableRow>
        ))}
      </TableBody>
    );
  };

  // Empty cart dialog
  onConfirmDeleteClick = () => {
    this.props.emptyCart();
    this.setState({ showConfirmDeleteDialog: false });
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
    const clone = {};

    Object.assign(clone, this.state.itemToEdit);
    clone.sellingPrice = clone.price - clone.discount;
    clone.totalPrice = clone.sellingPrice * clone.qty;

    this.props.updateCartItem(clone);
    this.setState({ showEditDialog: false, itemToEdit: this.initialCartItem });
  };

  onChange = e => {
    const { itemToEdit } = this.state;

    let { qty, discount } = itemToEdit;

    if (e.target.name === "discount") {
      discount = e.target.value;
    } else {
      qty = e.target.value;
    }

    if (discount > itemToEdit.price) {
      // eslint-disable-next-line
      discount = itemToEdit.discount;
    }

    const sellingPrice = itemToEdit.price - discount;
    const totalPrice = sellingPrice * qty;

    itemToEdit.qty = qty;
    itemToEdit.discount = discount;
    itemToEdit.sellingPrice = sellingPrice;
    itemToEdit.totalPrice = totalPrice;

    this.setState({ itemToEdit });
  };

  render() {
    const { showConfirmDeleteDialog, showEditDialog, itemToEdit } = this.state;
    const { classes } = this.props;

    return (
      <Paper className={classes.root}>
        <YesNo
          open={showConfirmDeleteDialog}
          message="Are you sure wan't to empty the cart?"
          onOk={this.onConfirmDeleteClick}
          onCancel={this.onCancelConfirmDeleteClick}
        />

        <EditCartItem
          open={showEditDialog}
          item={itemToEdit}
          onSave={this.onSaveItemClick}
          onCancel={this.onCancelEditItemClick}
          onChange={this.onChange}
        />

        <Table className={classes.table}>
          {this.renderHeader()}
          {this.renderBody()}
        </Table>
      </Paper>
    );
  }
}

function mapStateToProps(state) {
  return {
    cartArray: getCartItemsArraySelector(state),
    cartObj: state.cart
  };
}

const mapDispatchToProps = {
  removeItemFromCart: cartActions.removeItemFromCart,
  updateCartItem: cartActions.updateCartItem,
  emptyCart: cartActions.emptyCart
};

const component = withStyles(styles, { withTheme: true })(CartTable);

export default connect(mapStateToProps, mapDispatchToProps)(component);
