import React, { Component } from "react";
import { connect } from "react-redux";
import { withStyles } from "material-ui/styles";
import { Paper, IconButton } from "material-ui";
import DeleteIcon from "material-ui-icons/Delete";
import Table, { TableBody, TableHead, TableRow } from "material-ui/Table";
import CustomTableCell from "./CustomTableCell";
import NoItemsTableCell from "./NoItemsTableCell";
import SelectButton from "./SelectButton";
import * as cartActions from "../../../actions/cart";
import { getCartItemsArraySelector } from "../../../selectors";
import YesNo from "../../controls/dialog/YesNo";

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
  state = {
    showConfirmDeleteDialog: false
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
              <SelectButton text={n.name} />
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

  onConfirmDeleteClick = () => {
    this.props.emptyCart();
    this.setState({ showConfirmDeleteDialog: false });
  };

  onCancelConfirmDeleteClick = () => {
    this.setState({ showConfirmDeleteDialog: false });
  };

  render() {
    const { showConfirmDeleteDialog } = this.state;
    const { classes } = this.props;

    return (
      <Paper className={classes.root}>
        <YesNo
          open={showConfirmDeleteDialog}
          message="Are you sure wan't to empty the cart?"
          onOk={this.onConfirmDeleteClick}
          onCancel={this.onCancelConfirmDeleteClick}
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
