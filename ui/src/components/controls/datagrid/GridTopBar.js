import React from "react";
import { Input, Button, Icon } from "semantic-ui-react";
import "../controls.css";

const Searchbox = ({
  onSearch,
  onCreateNew,
  onFetachAll,
  value,
  onChange,
  searchText = "Search..."
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
    <Button.Group>
      <Button
        color="violet"
        onClick={onFetachAll}
        size="small"
        style={{ marginRight: 0 }}
      >
        Fetch All
      </Button>
      <Button onClick={onCreateNew} size="small">
        Create New
      </Button>
    </Button.Group>

    <input />
    <Button color="violet" icon onClick={onSearch} size="mini">
      <Icon name="search" />
    </Button>
  </Input>
);

export default Searchbox;
