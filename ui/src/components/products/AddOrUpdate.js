import React, { Component } from "react";
import { Form, Dropdown } from "semantic-ui-react";

class AddOrUpdate extends Component {
  state = {
    options: [
      { key: 1, text: "Printing", value: 1 },
      { key: 2, text: "Design", value: 2 },
      { key: 3, text: "Stationery", value: 3 }
    ]
  };

  handleChange = (e, { value }) => this.setState({ value });

  render() {
    return (
      <Form>
        <Form.Field>
          <label>Id</label>
          <input placeholder="Product Id" />
        </Form.Field>
        <Form.Field>
          <label>Category</label>
          <Dropdown
            onChange={this.handleChange}
            options={this.state.options}
            placeholder="Choose an option"
            selection
            value={this.state.value}
          />
        </Form.Field>
        <Form.Field>
          <label>Description</label>
          <input placeholder="Desciption" />
        </Form.Field>
        <Form.Field>
          <label>Price</label>
          <input placeholder="Price" />
        </Form.Field>
        <br />
      </Form>
    );
  }
}

export default AddOrUpdate;
