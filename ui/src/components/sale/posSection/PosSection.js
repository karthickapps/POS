import React, { Component, Fragment } from "react";
import { connect } from "react-redux";
import { withStyles } from "material-ui/styles";
import CartTable from "./cartTable";
import SearchBox from "./searchbox";
import Footer from "./footer";
import * as cartActions from "../../../actions/cart";
import { getCartItemsArraySelector } from "../../../selectors";

// eslint-disable-next-line
const styles = theme => ({});

class PosSection extends Component {
  state = {};

  render() {
    const {
      cartObj,
      addItemsToCart,
      updateCartItem,
      cartArray,
      removeItemFromCart,
      emptyCart
    } = this.props;

    return (
      <Fragment>
        <SearchBox
          cartObj={cartObj}
          addItemsToCart={addItemsToCart}
          updateCartItem={updateCartItem}
        />
        <CartTable
          cartArray={cartArray}
          cartObj={cartObj}
          removeItemFromCart={removeItemFromCart}
          updateCartItem={updateCartItem}
          emptyCart={emptyCart}
        />
        <Footer />
      </Fragment>
    );
  }
}

function mapStateToProps(state) {
  return {
    cartArray: getCartItemsArraySelector(state),
    cartObj: state.cart
  };
}

const mapDispatchToProps = {
  addItemsToCart: cartActions.addItemsToCart,
  removeItemFromCart: cartActions.removeItemFromCart,
  updateCartItem: cartActions.updateCartItem,
  emptyCart: cartActions.emptyCart
};

const component = withStyles(styles, { withTheme: true })(PosSection);

export default connect(mapStateToProps, mapDispatchToProps)(component);
