import React, { Component } from "react";
import { Table, Button, Icon } from "semantic-ui-react";

import GridTopBar from "./GridTopBar";
import "./style.css";

const PAGE_SIZE = 10;

const BATCH_SIZE = 50;

const PAGE_MAX_INDEX = 5;

class Datagrid extends Component {
  state = { data: [] };

  page = {
    lastBatchIndex: 0,
    currentBatch: 0,
    currentPage: 0,
    batchData: []
  };

  actions = this.props.datasource.actions;

  pagination = this.props.datasource.pagination;

  componentWillMount() {
    this.loadData(this.props);
  }

  componentWillReceiveProps(nextProps) {
    this.loadData(nextProps);
  }

  loadData = iprops => {
    this.page.currentBatch = 1;
    this.page.currentPage = 1;

    const data = iprops.datasource.data;

    if (data == null) return;

    this.page.batchData = data;

    if (!iprops.datasource.pagination) {
      this.setState({ data });
      return;
    }

    let lastBatchIndex = Math.floor(this.pagination.totalRecords / BATCH_SIZE);
    lastBatchIndex += this.pagination.totalRecords % BATCH_SIZE > 0 ? 1 : 0;
    this.page.lastBatchIndex = lastBatchIndex;
    this.setState({ data: data.slice(0, PAGE_SIZE) });
  };

  fetchNextBatch = async () => {
    this.page.batchData = await this.actions.onFetchNextBatch(
      ++this.page.currentBatch
    );
    this.setState({ data: this.page.batchData.slice(0, PAGE_SIZE) });
  };

  fetchPreviousBatch = async () => {
    this.page.batchData = await this.actions.onFetchNextBatch(
      --this.page.currentBatch
    );
    this.setState({
      data: this.page.batchData.slice(BATCH_SIZE - PAGE_SIZE, BATCH_SIZE)
    });
  };

  onNext = async () => {
    if (this.page.currentPage === PAGE_MAX_INDEX) {
      this.page.currentPage = 1;
      await this.fetchNextBatch();
    } else {
      this.page.currentPage++;
      const startIdx = (this.page.currentPage - 1) * PAGE_SIZE;
      const endIdx = this.page.currentPage * PAGE_SIZE;
      this.setState({ data: this.page.batchData.slice(startIdx, endIdx) });
    }
  };

  onPrev = async () => {
    if (this.page.currentPage - 1 === 0) {
      this.page.currentPage = PAGE_MAX_INDEX;
      await this.fetchPreviousBatch();
    } else {
      this.page.currentPage--;
      const startIdx = (this.page.currentPage - 1) * PAGE_SIZE;
      const endIdx = this.page.currentPage * PAGE_SIZE;
      this.setState({ data: this.page.batchData.slice(startIdx, endIdx) });
    }
  };

  isFirstPage = () =>
    this.page.currentPage === 1 && this.page.currentBatch === 1;

  isLastPage = () => {
    if (this.page.batchData.length <= PAGE_SIZE) {
      return true;
    }

    if (this.page.lastBatchIndex !== this.page.currentBatch) {
      return false;
    }

    let lastPage = Math.floor(this.page.batchData.length / PAGE_SIZE);
    lastPage += this.page.batchData.length % PAGE_SIZE > 0 ? 1 : 0;

    if (lastPage === this.page.currentPage) {
      return true;
    }

    return false;
  };

  hasActions = () => Object.keys(this.actions).length > 0;

  // RENDERS
  renderRowActionButtons = val => {
    if (!this.hasActions()) {
      return null;
    }

    const renderEditButton = () => {
      if (!this.actions.onEdit) {
        return null;
      }

      return (
        <Button
          icon
          size="mini"
          compact
          onClick={() => this.actions.onEdit(val)}
        >
          <Icon name="write" />
        </Button>
      );
    };

    const renderDeleteButton = () => {
      if (!this.actions.onDelete) {
        return null;
      }

      return (
        <Button
          icon
          size="mini"
          color="blue"
          compact
          onClick={() => this.actions.onDelete(val)}
        >
          <Icon name="trash" />
        </Button>
      );
    };

    const renderSelectButton = () => {
      if (!this.actions.onSelect) {
        return null;
      }

      return (
        <Button
          id="grid-select-button"
          icon
          size="mini"
          color="orange"
          compact
          onClick={() => this.actions.onSelect(val)}
        >
          Select
        </Button>
      );
    };

    return (
      <Table.Cell>
        <Button.Group>
          {renderEditButton()}
          {renderDeleteButton()}
          {renderSelectButton()}
        </Button.Group>
      </Table.Cell>
    );
  };

  renderRowData = val =>
    Object.keys(val)
      .filter(k => this.props.datasource.filter(k))
      .map(key => <Table.Cell key={key}>{val[key]}</Table.Cell>);

  renderHeaderRow = () => {
    const headers = this.props.datasource.headers.map(col => (
      <Table.HeaderCell key={col}>{col}</Table.HeaderCell>
    ));
    if (this.hasActions()) {
      headers.push(<Table.HeaderCell key="Actions">Actions</Table.HeaderCell>);
    }
    return headers;
  };

  renderPagination = () => {
    if (!this.pagination) return null;

    const { showPagination } = this.pagination;

    if (!showPagination) return null;

    return (
      <div
        style={{
          float: "right",
          border: "1px lightgrey solid",
          borderRadius: 5
        }}
      >
        <Button.Group>
          <Button
            onClick={this.onPrev}
            disabled={this.isFirstPage()}
            content="<< Prev"
            basic
            style={{ borderRight: "1px lightgrey solid" }}
          />
          <Button
            content="Next >>"
            basic
            onClick={this.onNext}
            disabled={this.isLastPage()}
          />
        </Button.Group>
      </div>
    );
  };

  renderRows = () =>
    this.state.data.map(val => (
      <Table.Row key={val.id}>
        {this.renderRowData(val)}
        {this.renderRowActionButtons(val)}
      </Table.Row>
    ));

  renderTable = () => {
    if (this.props.datasource.data == null) {
      return null;
    }

    return (
      <div>
        <Table celled compact className="gridview">
          <Table.Header>
            <Table.Row>{this.renderHeaderRow()}</Table.Row>
          </Table.Header>
          <Table.Body>{this.renderRows()}</Table.Body>
        </Table>
        {this.renderPagination()}
      </div>
    );
  };

  // Main render.
  render() {
    const { actions } = this.props.datasource;

    return (
      <div>
        <GridTopBar
          searchText={`${this.props.datasource.headers[0]}..`}
          onSearch={actions.onSearch}
          onCreateNew={actions.onCreateNew}
          onFetchAll={actions.onFetchAll}
        />
        {this.renderTable()}
      </div>
    );
  }
}

export default Datagrid;
