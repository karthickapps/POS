import React, { Component } from "react";
import { withRouter } from "react-router";
import { Menu } from "semantic-ui-react";
import { connect } from "react-redux";
import { logout } from "../../../actions/user";

import "./header.css";

class Header extends Component {
  state = {};

  onSettings = (e, { name }) => {
    this.setState({ activeItem: name });
  };

  onLogout = (e, { name }) => {
    this.setState({ activeItem: name });
    this.props.logout();
    this.props.history.push("/login");
  };

  render() {
    const { activeItem } = this.state;

    return (
      <Menu id="header" inverted color="violet">
        <Menu.Item id="logo" header name="logo">
          My Pointofsale
        </Menu.Item>

        <Menu.Menu position="right">
          <Menu.Item
            name="settings"
            active={activeItem === "settings"}
            onClick={this.onSettings}
          >
            Settings
          </Menu.Item>

          <Menu.Item
            name="logout"
            active={activeItem === "logout"}
            onClick={this.onLogout}
          >
            Sign out
          </Menu.Item>
        </Menu.Menu>
      </Menu>
    );
  }
}

export default connect(null, { logout })(withRouter(Header));
