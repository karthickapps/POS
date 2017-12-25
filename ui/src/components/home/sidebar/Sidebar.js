import React, { Component } from "react";
import { withRouter } from "react-router";
import { Menu, Icon } from "semantic-ui-react";
import { Link } from "react-router-dom";
import "./sidebar.css";

class Sidebar extends Component {
  state = {};

  handleItemClick = (e, { name }) => this.setState({ activeItem: name });

  render() {
    const { activeItem } = this.state;

    const isActive = name =>
      activeItem === name || this.props.location.pathname === `/${name}`;

    return (
      <Menu fluid vertical id="menu">
        <Menu.Item
          as={Link}
          to="/customers"
          name="customers"
          active={isActive("customers")}
          onClick={this.handleItemClick}
        >
          <div>
            <Icon name="address book" size="large" />
            Customers
          </div>
        </Menu.Item>

        <Menu.Item
          as={Link}
          to="/products"
          name="products"
          active={isActive("products")}
          onClick={this.handleItemClick}
        >
          <div>
            <Icon name="currency" size="large" />
            Products
          </div>
        </Menu.Item>

        <Menu.Item
          as={Link}
          to="/pos"
          name="pos"
          active={isActive("pos")}
          onClick={this.handleItemClick}
        >
          <div>
            <Icon name="shopping cart" size="large" />
            Point Of sale
          </div>
        </Menu.Item>
      </Menu>
    );
  }
}

export default withRouter(Sidebar);
