import React, { Component } from "react";
import { Table, Button, Icon } from "semantic-ui-react";
import { connect } from "react-redux";

import { removeItemFromCart, updateItemInCart } from "../../actions/cart";

import "./sale.css";

class SalesGrid extends Component {
  state = {};

  renderHeaderRow = () => (
    <Table.Row>
      <Table.HeaderCell>No</Table.HeaderCell>
      <Table.HeaderCell>Item</Table.HeaderCell>
      <Table.HeaderCell>Price</Table.HeaderCell>
      <Table.HeaderCell>Qty</Table.HeaderCell>
      <Table.HeaderCell>Net Price</Table.HeaderCell>
      <Table.HeaderCell>Action</Table.HeaderCell>
    </Table.Row>
  );

  updateItemInCart = (item, count) => {
    const t = {};
    Object.assign(t, item);
    t.qty += count;

    if (t.qty === 0) {
      return;
    }

    t.netPrice = t.pricePerQty * t.qty;
    this.props.updateItemInCart(t);
  };

  renderRowActionButtons = val => (
    <Table.Cell>
      <Button.Group>
        <Button
          icon
          size="mini"
          color="red"
          compact
          onClick={() => this.props.removeItemFromCart(val)}
        >
          <Icon name="trash" />
        </Button>
      </Button.Group>
    </Table.Cell>
  );

  renderQtyCell = val => (
    <div className="qtyCell">
      <span>{val.qty}</span>
      <Button.Group className="left">
        <Button
          icon
          size="mini"
          color="blue"
          compact
          onClick={() => this.updateItemInCart(val, 1)}
        >
          <Icon name="plus" />
        </Button>

        <Button
          icon
          size="mini"
          compact
          onClick={() => this.updateItemInCart(val, -1)}
        >
          <Icon name="minus" />
        </Button>
      </Button.Group>
    </div>
  );

  renderRows = () =>
    this.props.cart.ids.map((id, idx) => {
      const val = this.props.cart.listOfItems[id];
      return (
        <Table.Row key={val.id}>
          <Table.Cell>{idx + 1}</Table.Cell>
          <Table.Cell>{val.id}</Table.Cell>
          <Table.Cell>{`₹ ${val.pricePerQty}`}</Table.Cell>
          <Table.Cell>{this.renderQtyCell(val)}</Table.Cell>
          <Table.Cell>{`₹ ${val.netPrice}`}</Table.Cell>
          {this.renderRowActionButtons(val)}
        </Table.Row>
      );
    });

  renderTable = () => (
    <Table compact className="gridview">
      <Table.Header>{this.renderHeaderRow()}</Table.Header>
      <Table.Body>{this.renderRows()}</Table.Body>
    </Table>
  );

  render() {
    return <div>{this.renderTable()}</div>;
  }
}

function mapStateToProps(state) {
  return {
    cart: state.cart
  };
}

export default connect(mapStateToProps, {
  removeItemFromCart,
  updateItemInCart
})(SalesGrid);
