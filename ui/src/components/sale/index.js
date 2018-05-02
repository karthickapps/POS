import React, { Component } from "react";
import { withStyles } from "material-ui/styles";
import { connect } from "react-redux";
import AutoSuggestWithApiDatasource from "../controls/autoSuggestWithApiDatasource";
import api from "../../api";
import Message from "../controls/Message";
import Grid from "./Grid";
import {
  addItemsToCart,
  removeItemFromCart,
  updateCartItem,
  emptyCart
} from "../../actions/cart";

// eslint-disable-next-line
const styles = theme => ({
  root: {
    padding: 10
  },
  flexContainer: {
    display: "flex",
    flexWrap: "wrap",
    width: "100%",
    height: "auto",
    minHeight: "100%"
  },
  pos: {
    width: "460px",
    margin: "10px",
    minHeight: "500px"
  },
  posContent: {
    minHeight: "100%",
    marginBottom: "-100px"
  },
  // https://css-tricks.com/couple-takes-sticky-footer/
  posFooter: {
    height: "100px"
  },
  items: {
    flex: 1,
    margin: "20px",
    minWidth: "300px"
  }
});

class Sale extends Component {
  state = {
    showMessage: false,
    searchText: "",
    products: []
  };

  onChange = async e => {
    const searchText = e.target.value;

    if (!searchText || searchText.length < 3) {
      this.setState({ products: [], searchText });
      return;
    }

    try {
      const res = await api.product.Search(searchText);
      this.setState({ products: res.data, searchText });
    } catch (error) {
      this.setState({ showMessage: true, searchText });
    }
  };

  onSelected = selectedItem => {
    this.setState({ searchText: "" });
    this.updateCart(selectedItem);
  };

  updateCart = item => {
    const { cart } = this.props;
    const existingItem = cart[item.id];

    if (existingItem) {
      const clone = {};
      Object.assign(clone, existingItem);
      clone.qty += 1;
      clone.totalPrice = clone.price * clone.qty;
      this.props.updateCartItem(clone);
    } else {
      const clone = {};
      Object.assign(clone, existingItem);
      clone.totalPrice = clone.price;
      this.props.addItemsToCart(clone);
    }
  };

  onMessageCloseClick = () => {
    this.setState({ showMessage: false });
  };

  render() {
    const { classes } = this.props;
    const { products, showMessage, searchText } = this.state;

    return (
      <div className={classes.flexContainer}>
        <div className={classes.pos}>
          <div className={classes.posContent}>
            <Message
              style={{ width: 430 }}
              title="Message"
              message="Something went wrong. Please try again later"
              show={showMessage}
              isError={true}
              onCloseClick={this.onMessageCloseClick}
            />

            <AutoSuggestWithApiDatasource
              searchText={searchText}
              width="450px"
              onLeave={this.onLeave}
              onChange={this.onChange}
              onSelected={this.onSelected}
              datasource={products}
            />
            <Grid />
          </div>
          <div className={classes.posFooter}>shan</div>
        </div>
        <div className={classes.items}>items list</div>
      </div>
    );
  }
}

function mapStateToProps({ cart }) {
  return {
    cart
  };
}

const component = withStyles(styles, { withTheme: true })(Sale);

export default connect(mapStateToProps, {
  addItemsToCart,
  removeItemFromCart,
  updateCartItem,
  emptyCart
})(component);
