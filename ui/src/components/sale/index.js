import _ from "lodash";
import React, { Component } from "react";
import { Search, Button, Icon } from "semantic-ui-react";
import { connect } from "react-redux";

import SalesEntryForm from "./SalesEntryForm";
import SalesGrid from "./SalesGrid";
import api from "../../api";
import { Titlebar, Loader } from "../controls";
import { addToCart } from "../../actions/cart";

import "./sale.css";

class Sale extends Component {
  defaultCartItem = {
    id: "",
    qty: "",
    netPrice: "",
    pricePerQty: ""
  };

  testCartItem = {
    id: "pen",
    qty: 12,
    netPrice: 120,
    pricePerQty: 10
  };

  state = {
    isLoading: false,
    error: "",
    cartItem: this.defaultCartItem,
    selectedCartItem: {},
    cart: [this.testCartItem],
    source: [],
    results: []
  };

  componentWillMount() {
    this.resetComponent();
    this.fetchProducts();
  }

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

  resetComponent = () =>
    this.setState({
      isLoading: false,
      results: [],
      selectedProduct: "",
      cartItem: this.defaultCartItem
    });

  onProductSelectionChanged = (e, { result }) => {
    this.setState({
      selectedProduct: result.title,
      cartItem: {
        ...this.defaultCartItem,
        pricePerQty: result.amount,
        id: result.title
      }
    });
  };

  onProductSearchChange = (e, { value }) => {
    this.setState({ isLoading: true, value, error: "" });

    // eslint-disable-next-line consistent-return
    setTimeout(() => {
      if (this.state.value.length < 1) return this.resetComponent();

      const re = new RegExp(_.escapeRegExp(this.state.value), "i");
      const isMatch = result => re.test(result.title);
      const results = _.filter(this.state.source, isMatch);

      this.setState({
        isLoading: false,
        results
      });
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

  onUpdateQtyInCartItem = (val, qty) => {
    this.setState({ isLoading: true });
    const idx = _.findIndex(this.state.cart, o => o.id === val.id);
    const cart = this.state.cart;

    if (cart[idx].qty > 1) {
      cart[idx].qty += qty;
      cart[idx].netPrice = cart[idx].pricePerQty * cart[idx].qty;
    }

    setTimeout(() => {
      this.setState({ cart, isLoading: false });
    }, 50);
  };

  onRemoveItemFromCart = val => {
    this.setState({ isLoading: true });
    const cart = _.filter(this.state.cart, o => o.id !== val.id);

    setTimeout(() => {
      this.setState({ cart, isLoading: false });
    }, 50);
  };

  onAddToCartClick = () => {
    const cart = this.state.cart;
    const item = _.cloneDeep(this.state.cartItem);
    cart.push(item);

    this.setState({
      cart,
      cartItem: this.defaultCartItem,
      selectedProduct: ""
    });
  };

  render() {
    const { isLoading, selectedProduct, results } = this.state;

    return (
      <div>
        <Loader isLoading={this.state.isLoading} />
        <Titlebar title="Sale" />
        <div className="saleContainer">
          <Search
            placeholder="Product Id"
            style={{ paddingRight: 10 }}
            loading={isLoading}
            onResultSelect={this.onProductSelectionChanged}
            onSearchChange={this.onProductSearchChange}
            results={results}
            value={selectedProduct}
          />
          <SalesEntryForm
            error={this.state.error}
            cartItem={this.state.cartItem}
            onQtyChange={this.onQtyChange}
            onAddToCartClick={this.onAddToCartClick}
          />
        </div>
        <br />
        <SalesGrid
          cart={this.state.cart}
          onUpdateQtyInCartItem={this.onChangeQtyInCartItem}
          onRemoveItemFromCart={this.onRemoveItemFromCart}
        />
        <br />
        <Button color="blue" style={{ float: "right" }}>
          <Icon name="cart" /> Checkout Sale
        </Button>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    cartInStore: state.cart
  };
}

export default connect(mapStateToProps, { addToCart })(Sale);
