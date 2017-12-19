import React, { Component } from "react";
import PropTypes from "prop-types";
import { withRouter } from "react-router";
import { Menu, Icon } from "semantic-ui-react";
import "./sidebar.css";

class Sidebar extends Component {
  state = {};

  handleItemClick = (e, { name }) => this.setState({ activeItem: name });

  onProduct = (e, { name }) => {
    this.handleItemClick(e, { name });
    this.props.history.push("/products");
    console.log("shaan");
  };

  render() {
    const { activeItem } = this.state;

    return (
      <Menu fluid vertical id="menu">
        <Menu.Item
          name="settings"
          active={activeItem === "settings"}
          onClick={this.handleItemClick}
        >
          <div>
            <Icon name="settings" size="large" />
            Settings
          </div>
        </Menu.Item>
        <Menu.Item
          name="customers"
          active={activeItem === "customers"}
          onClick={this.handleItemClick}
        >
          <div>
            <Icon name="address book" size="large" />
            Customers
          </div>
        </Menu.Item>
        <Menu.Item
          name="products"
          active={activeItem === "products"}
          onClick={this.onProduct}
        >
          <div>
            <Icon name="currency" size="large" />
            Products
          </div>
        </Menu.Item>
        <Menu.Item
          name="pos"
          active={activeItem === "pos"}
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

Sidebar.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func.isRequired
  }).isRequired
};

export default withRouter(Sidebar);
