import React, { Component } from "react";

class Products extends Component {
  state = {
    products: []
  };

  async componentDidMount() {
    try {
      const url = `api/Products/All`;
      const response = await fetch(url);
      const products = await response.json();
      if (products) {
        this.setState({ products });
      }
    } catch (error) {
      console.log(error);
    }
  }

  renderProducts() {
    return (
      <ul>
        {this.state.products.map(product => <li key={product}>{product}</li>)}
      </ul>
    );
  }

  render() {
    return (
      <div>
        <h4>Products</h4>
        {this.renderProducts()}
      </div>
    );
  }
}

export default Products;
