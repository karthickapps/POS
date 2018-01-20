import React, { Component } from "react";
import { Input, Button, Icon } from "semantic-ui-react";
import "../controls.css";

class GridTopBar extends Component {
  state = { searchQuery: "" };

  handleChange = e => {
    this.setState({ searchQuery: e.target.value });
  };

  onSearchClick = () => {
    if (this.state.searchQuery.length === 0) {
      // eslint-disable-next-line no-alert
      alert("Please enter a text to search");
      return;
    }
    this.props.onSearch(this.state.searchQuery);
    this.setState({ searchQuery: "" });
  };

  onFetchAllClick = e => {
    this.props.onFetchAll();
  };

  onFormSubmit = e => {
    e.preventDefault();
  };

  render() {
    const { onCreateNew, searchText = "Search..." } = this.props;

    return (
      <form onSubmit={this.onFormSubmit}>
        <Input
          className="searchbar"
          labelPosition="right"
          type="text"
          placeholder={searchText}
          value={this.state.searchQuery}
          action
          onChange={this.handleChange}
        >
          <Button.Group>
            <Button
              type="button"
              color="blue"
              onClick={this.onFetchAllClick}
              size="small"
              style={{ marginRight: 0 }}
            >
              Get All
            </Button>
            <Button type="button" onClick={onCreateNew} size="small">
              Create
            </Button>
          </Button.Group>

          <input />
          <Button color="blue" icon onClick={this.onSearchClick} size="mini">
            <Icon name="search" />
          </Button>
        </Input>
      </form>
    );
  }
}

export default GridTopBar;
