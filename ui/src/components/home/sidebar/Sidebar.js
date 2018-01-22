import React, { Component } from "react";
import { withRouter } from "react-router";
import { Menu } from "semantic-ui-react";
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
        <div className="menu-header">
          <span>MASTERS</span>
        </div>

        <Menu.Item
          as={Link}
          to="/customers"
          name="customers"
          active={isActive("customers")}
          onClick={this.handleItemClick}
        >
          Customers
        </Menu.Item>

        <Menu.Item
          as={Link}
          to="/products"
          name="products"
          active={isActive("products")}
          onClick={this.handleItemClick}
        >
          Products
        </Menu.Item>

        <Menu.Item
          as={Link}
          to="/expense"
          name="expense"
          active={isActive("expense")}
          onClick={this.handleItemClick}
        >
          Expense
        </Menu.Item>

        <div className="menu-header">
          <span>SALE</span>
        </div>
        <Menu.Item
          as={Link}
          to="/pos"
          name="pos"
          active={isActive("pos")}
          onClick={this.handleItemClick}
        >
          New Sale
        </Menu.Item>

        <Menu.Item
          as={Link}
          to="/settle"
          name="settle"
          active={isActive("settle")}
          onClick={this.handleItemClick}
        >
          Settle balance
        </Menu.Item>

        <div className="menu-header">
          <span>REPORTS</span>
        </div>
        <Menu.Item
          as={Link}
          to="/dailySales"
          name="dailySales"
          active={isActive("dailySales")}
          onClick={this.handleItemClick}
        >
          Daily Sales
        </Menu.Item>
      </Menu>
    );
  }
}

export default withRouter(Sidebar);
