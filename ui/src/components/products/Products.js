import React, { Component } from "react";
import { connect } from "react-redux";
import { Header } from "semantic-ui-react";
import { fetchAllProducts } from "../../actions/products";

class Products extends Component {
  componentDidMount() {
    this.fetchProducts();
  }

  fetchProducts() {
    this.props
      .fetchAllProducts()
      .then()
      .catch(err => {
        console.log("fetchProducts =>", err);
      });
  }

  render() {
    return (
      <div>
        <Header as="h4" color="grey" dividing>
          Accounts Book - Products
        </Header>
        <p>{this.props.products.length}</p>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    products: state.products
  };
}

export default connect(mapStateToProps, { fetchAllProducts })(Products);
