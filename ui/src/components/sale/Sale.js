import _ from "lodash";
import React, { Component } from "react";
import { Search, Button, Icon } from "semantic-ui-react";
import { connect } from "react-redux";
import { withRouter } from "react-router";

import SalesEntryForm from "./SalesEntryForm";
import SaleGrid from "./SaleGrid";
import api from "../../api";
import { Titlebar, Loader } from "../controls";
import * as cartActions from "../../actions/cart";

import "./sale.css";

class Sale extends Component {
  defaultCartItem = {
    id: "",
    qty: "",
    netPrice: "",
    pricePerQty: ""
  };

  state = {
    isLoading: false,
    error: "",
    cartItem: this.defaultCartItem,
    source: [],
    results: []
  };

  async componentWillMount() {
    this.resetSalesEntryForm();
    this.fetchProducts();
    this.setTransId();
  }

  componentDidMount() {
    document.getElementById("search_box").focus();
  }

  setTransId = async () => {
    if (this.props.cart.transId) return;
    const res = await api.sale.getTransId();
    this.props.setTransId(res.transId);
  };

  // Featches all products and sets the source for search.
  fetchProducts = async () => {
    const products = await api.products.fetchAll();
    const source = products.map(item => {
      const obj = {};
      obj.title = item.id;
      obj.description = item.description;
      obj.price = `${item.price} ₹`;
      obj.amount = item.price;
      return obj;
    });

    this.setState({ source });
  };

  resetSalesEntryForm = () =>
    this.setState({
      isLoading: false,
      results: [],
      selectedProduct: "",
      cartItem: this.defaultCartItem
    });

  // occurs when selecting an item from search results.
  onProductSelectionChanged = (e, { result }) => {
    this.setState({
      selectedProduct: result.title,
      value: result.title,
      cartItem: {
        ...this.defaultCartItem,
        pricePerQty: result.amount,
        id: result.title
      }
    });
  };

  // occura when typing in the search box.
  onProductSearchChange = (e, { value }) => {
    this.setState({ value, error: "" });

    // eslint-disable-next-line consistent-return
    setTimeout(() => {
      if (this.state.value.length < 1) return this.resetSalesEntryForm();

      const re = new RegExp(_.escapeRegExp(this.state.value), "i");
      const isMatch = result => re.test(result.title);
      const results = _.filter(this.state.source, isMatch);

      this.setState({ results });
    }, 200);
  };

  onQtyChange = e => {
    const qty = e.target.value;

    this.setState({ error: "" });

    if (!qty || qty.length === 0) {
      this.setState({
        cartItem: { ...this.state.cartItem, qty: "", netPrice: "" }
      });
    } else if (!isNaN(qty)) {
      const netPrice = this.state.cartItem.pricePerQty * Number(qty);
      this.setState({
        cartItem: {
          ...this.state.cartItem,
          qty: Number(qty),
          netPrice
        }
      });
    }
  };

  onAddToCartClick = () => {
    const item = _.cloneDeep(this.state.cartItem);
    const previous = _.cloneDeep(this.props.cart.listOfItems)[item.id];

    // This is to check if the item is previously in the cart.
    // If so add to the previous value.
    if (previous) {
      previous.qty += item.qty;
      previous.netPrice += item.netPrice;
      this.props.addToCart(previous);
    } else {
      this.props.addToCart(item);
    }

    this.setState({
      cartItem: this.defaultCartItem,
      selectedProduct: "",
      value: ""
    });
  };

  onCheckout = () => {
    this.props.history.push("/saleSummary");
  };

  updateItemInCart = (item, count) => {
    const t = {};
    Object.assign(t, item);
    t.qty += count;

    if (t.qty === 0) {
      return;
    }

    t.netPrice = t.pricePerQty * t.qty;
    this.props.updateItemInCart(t);
  };

  render() {
    const { isLoading, value, results } = this.state;

    return (
      <div>
        <Loader isLoading={this.state.isLoading} />
        <Titlebar title="Sale" />
        <div className="saleForm">
          <Search
            id="search_box"
            placeholder="Product Id"
            style={{ paddingRight: 10 }}
            loading={isLoading}
            onResultSelect={this.onProductSelectionChanged}
            onSearchChange={this.onProductSearchChange}
            results={results}
            value={value}
          />
          <SalesEntryForm
            error={this.state.error}
            cartItem={this.state.cartItem}
            onQtyChange={this.onQtyChange}
            onAddToCartClick={this.onAddToCartClick}
          />
        </div>
        <br />
        <SaleGrid
          cart={this.props.cart}
          updateItemInCart={this.updateItemInCart}
          removeItemFromCart={this.props.removeItemFromCart}
        />
        <br />
        <Button
          disabled={this.props.cart.ids.length === 0}
          color="blue"
          style={{ float: "right" }}
          onClick={this.onCheckout}
        >
          <Icon name="cart" /> Checkout Sale
        </Button>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  cart: state.cart
});

export default withRouter(
  connect(mapStateToProps, {
    addToCart: cartActions.addToCart,
    removeItemFromCart: cartActions.removeItemFromCart,
    updateItemInCart: cartActions.updateItemInCart,
    setTransId: cartActions.setTransId
  })(Sale)
);
