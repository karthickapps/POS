import React from "react";
import { Table, Button, Icon } from "semantic-ui-react";

const Datagrid = ({ datasource }) => {
  const getHeaders = () =>
    datasource.headers.map(col => (
      <Table.HeaderCell key={col}>{col}</Table.HeaderCell>
    ));

  const getCells = val =>
    Object.keys(val)
      .filter(k => datasource.filter(k))
      .map(key => <Table.Cell key={key}>{val[key]}</Table.Cell>);

  const getRows = () =>
    datasource.data.map(val => (
      <Table.Row key={val.id}>
        {getCells(val)}
        <Table.Cell>
          <Button.Group>
            <Button
              icon
              size="mini"
              compact
              onClick={() => datasource.actions.onEdit(val.id)}
            >
              <Icon name="write" />
            </Button>
            <Button
              icon
              size="mini"
              color="red"
              compact
              onClick={() => datasource.actions.onDelete(val.id)}
            >
              <Icon name="trash" />
            </Button>
          </Button.Group>
        </Table.Cell>
      </Table.Row>
    ));

  return (
    <Table celled compact>
      <Table.Header>
        <Table.Row>{getHeaders()}</Table.Row>
      </Table.Header>
      <Table.Body>{getRows()}</Table.Body>
    </Table>
  );
};

export default Datagrid;
