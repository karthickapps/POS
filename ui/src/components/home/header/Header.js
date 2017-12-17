import React, { Component } from "react";
import { Menu } from "semantic-ui-react";
import "./header.css";

export default class Header extends Component {
  state = {};

  handleItemClick = (e, { name }) => this.setState({ activeItem: name });

  render() {
    const { activeItem } = this.state;

    return (
      <Menu id="header" inverted color="violet">
        <Menu.Item id="logo" header name="logo">
          Accounts BOOK
        </Menu.Item>

        <Menu.Menu position="right">
          <Menu.Item
            name="signup"
            active={activeItem === "signup"}
            onClick={this.handleItemClick}
          >
            Settings
          </Menu.Item>

          <Menu.Item
            name="help"
            active={activeItem === "help"}
            onClick={this.handleItemClick}
          >
            Sign out
          </Menu.Item>
        </Menu.Menu>
      </Menu>
    );
  }
}
