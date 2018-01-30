import React from "react";
import { Table, Button, Icon } from "semantic-ui-react";

import "./sale.css";

const SaleGrid = props => {
  const renderHeaderRow = () => (
    <Table.Row>
      <Table.HeaderCell>No</Table.HeaderCell>
      <Table.HeaderCell>Item</Table.HeaderCell>
      <Table.HeaderCell>Price</Table.HeaderCell>
      <Table.HeaderCell>Qty</Table.HeaderCell>
      <Table.HeaderCell>Net Price</Table.HeaderCell>
      <Table.HeaderCell>Action</Table.HeaderCell>
    </Table.Row>
  );

  const renderRowActionButtons = val => (
    <Table.Cell>
      <Button.Group>
        <Button
          icon
          size="mini"
          color="red"
          compact
          onClick={() => props.removeItemFromCart(val)}
        >
          <Icon name="trash" />
        </Button>
      </Button.Group>
    </Table.Cell>
  );

  const renderQtyCell = val => (
    <div className="qtyCell">
      <span>{val.qty}</span>
      <Button.Group className="left">
        <Button
          icon
          size="mini"
          color="blue"
          compact
          onClick={() => props.updateItemInCart(val, 1)}
        >
          <Icon name="plus" />
        </Button>

        <Button
          icon
          size="mini"
          compact
          onClick={() => props.updateItemInCart(val, -1)}
        >
          <Icon name="minus" />
        </Button>
      </Button.Group>
    </div>
  );

  const renderRows = () =>
    props.cart.ids.map((id, idx) => {
      const val = props.cart.listOfItems[id];
      return (
        <Table.Row key={val.id}>
          <Table.Cell>{idx + 1}</Table.Cell>
          <Table.Cell>{val.id}</Table.Cell>
          <Table.Cell>{`₹ ${val.pricePerQty}`}</Table.Cell>
          <Table.Cell>{renderQtyCell(val)}</Table.Cell>
          <Table.Cell>{`₹ ${val.netPrice}`}</Table.Cell>
          {renderRowActionButtons(val)}
        </Table.Row>
      );
    });

  const renderTable = () => (
    <Table compact className="gridview">
      <Table.Header>{renderHeaderRow()}</Table.Header>
      <Table.Body>{renderRows()}</Table.Body>
    </Table>
  );

  return <div>{renderTable()}</div>;
};

export default SaleGrid;
