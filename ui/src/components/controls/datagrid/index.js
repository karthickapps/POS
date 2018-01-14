import React from "react";
import { Table, Button, Icon } from "semantic-ui-react";

import GridTopBar from "./GridTopBar";

const Datagrid = ({ datasource }) => {
  const { headers, actions, filter, data } = datasource;

  const actionButtons = val => (
    <Table.Cell>
      <Button.Group>
        <Button icon size="mini" compact onClick={() => actions.onEdit(val)}>
          <Icon name="write" />
        </Button>
        <Button
          icon
          size="mini"
          color="red"
          compact
          onClick={() => actions.onDelete(val)}
        >
          <Icon name="trash" />
        </Button>
      </Button.Group>
    </Table.Cell>
  );

  const cols = val =>
    Object.keys(val)
      .filter(k => filter(k))
      .map(key => <Table.Cell key={key}>{val[key]}</Table.Cell>);

  const headerCols = () =>
    headers.map(col => <Table.HeaderCell key={col}>{col}</Table.HeaderCell>);

  const rows = () =>
    data.map(val => (
      <Table.Row key={val.id}>
        {cols(val)}
        {actionButtons(val)}
      </Table.Row>
    ));

  const getTable = () => {
    if (data == null) {
      return null;
    }

    return (
      <Table celled compact>
        <Table.Header>
          <Table.Row>{headerCols()}</Table.Row>
        </Table.Header>
        <Table.Body>{rows()}</Table.Body>
      </Table>
    );
  };

  return (
    <div>
      <GridTopBar
        searchText="Enter product id..."
        onSearch={actions.onSearch}
        onCreateNew={actions.onCreateNew}
        onFetchAll={actions.onFetchAll}
      />
      {getTable()}
    </div>
  );
};

export default Datagrid;
