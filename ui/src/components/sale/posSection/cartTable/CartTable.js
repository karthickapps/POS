import React, { Component } from "react";
import { withStyles } from "material-ui/styles";
import { Paper, IconButton } from "material-ui";
import DeleteIcon from "material-ui-icons/Delete";
import Table, {
  TableBody,
  TableHead,
  TableRow,
  TableFooter
} from "material-ui/Table";
import CustomTableCell from "./CustomTableCell";
import NoItemsTableCell from "./NoItemsTableCell";
import SelectButton from "./SelectButton";
import YesNo from "../../../controls/dialog/YesNo";
import EditCartItem from "../editCartItem/EditCartItem";

const styles = theme => ({
  root: {
    width: "100%",
    marginTop: theme.spacing.unit * 3
  },
  deleteIcon: {
    color: "#949494"
  },
  footerTableCell: {
    fontSize: "14px",
    padding: "5px",
    fontWeight: "bold",
    color: "black"
  },
  footerRow: {
    backgroundColor: theme.palette.background.default
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
        <CustomTableCell numeric style={{ width: 30, paddingRight: "5px" }}>
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
            <CustomTableCell numeric style={{ width: 30, paddingRight: "5px" }}>
              {this.deleteCartItem(n)}
            </CustomTableCell>
          </TableRow>
        ))}
      </TableBody>
    );
  };

  renderFooterRowOne = () => {
    const { classes } = this.props;

    return (
      <TableRow className={classes.footerRow}>
        <CustomTableCell className={classes.footerTableCell} numeric>
          Total
        </CustomTableCell>
        <CustomTableCell className={classes.footerTableCell} numeric>
          20
        </CustomTableCell>
        <CustomTableCell className={classes.footerTableCell} numeric>
          20
        </CustomTableCell>
        <CustomTableCell
          numeric
          className={classes.footerTableCell}
          style={{ color: "#b53f3f", fontSize: "18px" }}
        >
          2000
        </CustomTableCell>
        <CustomTableCell numeric className={classes.footerTableCell} />
      </TableRow>
    );
  };

  renderFooter = () => {
    const { cartArray } = this.props;

    if (cartArray.length === 0) {
      return null;
    }

    return <TableFooter>{this.renderFooterRowOne()}</TableFooter>;
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

  render() {
    const { showConfirmDeleteDialog, showEditDialog, itemToEdit } = this.state;
    const { classes, cartObj, updateCartItem } = this.props;

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
          updateCartItem={updateCartItem}
          open={showEditDialog}
          item={itemToEdit}
          onSave={this.onSaveItemClick}
          onCancel={this.onCancelEditItemClick}
          onChange={this.onChange}
        />

        <Table className={classes.table}>
          {this.renderHeader()}
          {this.renderBody()}
          {this.renderFooter()}
        </Table>
      </Paper>
    );
  }
}

export default withStyles(styles, { withTheme: true })(CartTable);
