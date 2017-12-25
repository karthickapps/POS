import React from "react";
import { Input, Button, Icon } from "semantic-ui-react";
import "./controls.css";

const Searchbox = ({
  onSearch,
  onCreateNew,
  value,
  onChange,
  searchText = "Search...",
  showCreateNew = true
}) => (
  <Input
    className="searchbar"
    labelPosition="right"
    type="text"
    placeholder={searchText}
    action
    value={value}
    onChange={onChange}
  >
    {showCreateNew === true ? (
      <Button color="violet" onClick={onCreateNew} size="mini">
        Create New
      </Button>
    ) : null}

    <input />
    <Button color="violet" icon onClick={onSearch} size="mini">
      <Icon name="search" />
    </Button>
  </Input>
);

export default Searchbox;
