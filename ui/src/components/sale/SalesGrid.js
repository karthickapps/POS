import React, { Component } from "react";
import { Table, Button, Icon } from "semantic-ui-react";

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

  renderRowActionButtons = val => (
    <Table.Cell>
      <Button.Group>
        <Button
          icon
          size="mini"
          color="red"
          compact
          onClick={() => this.props.onRemoveItemFromCart(val)}
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
          onClick={() => this.props.onUpdateQtyInCartItem(val, 1)}
        >
          <Icon name="plus" />
        </Button>

        <Button
          icon
          size="mini"
          compact
          onClick={() => this.props.onUpdateQtyInCartItem(val, -1)}
        >
          <Icon name="minus" />
        </Button>
      </Button.Group>
    </div>
  );

  renderRows = () =>
    this.props.cart.map((val, idx) => (
      <Table.Row key={val.id}>
        <Table.Cell>{idx}</Table.Cell>
        <Table.Cell>{val.id}</Table.Cell>
        <Table.Cell>{`₹ ${val.pricePerQty}`}</Table.Cell>
        <Table.Cell>{this.renderQtyCell(val)}</Table.Cell>
        <Table.Cell>{`₹ ${val.netPrice}`}</Table.Cell>
        {this.renderRowActionButtons(val)}
      </Table.Row>
    ));

  renderTable = () => (
    <Table celled compact className="gridview">
      <Table.Header>{this.renderHeaderRow()}</Table.Header>
      <Table.Body>{this.renderRows()}</Table.Body>
    </Table>
  );

  render() {
    return <div>{this.renderTable()}</div>;
  }
}

export default SalesGrid;
