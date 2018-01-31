import React, { Component } from "react";
import { Input, Button, Message } from "semantic-ui-react";
import { connect } from "react-redux";
import { withRouter } from "react-router";
import { Titlebar } from "../controls";
import cartTotalSelector from "../../selectors/cart";
import { emptyCart } from "../../actions/cart";

class SaleSummary extends Component {
  state = {
    discount: "",
    netBillAmount: ""
  };

  componentWillMount() {
    this.setState({ netBillAmount: this.props.totalBillAmount });
  }

  onDiscountChange = e => {
    const discountValue = e.target.value;

    if (!discountValue && discountValue.length === 0) {
      this.setState({
        discount: "",
        netBillAmount: this.props.totalBillAmount
      });
    } else if (
      !isNaN(discountValue) &&
      discountValue <= this.props.totalBillAmount
    ) {
      this.setState({
        discount: Number(discountValue),
        netBillAmount: this.props.totalBillAmount - discountValue
      });
    }
  };

  onCancelSale = () => {
    this.props.emptyCart();
    this.props.history.push("/sale");
  };

  render() {
    if (this.props.totalBillAmount === 0) {
      return (
        <div>
          <Titlebar title="Sale Summary" />

          <Message info>
            <Message.Header>Oops, sorry</Message.Header>
            <p>No items in the cart!</p>
          </Message>
        </div>
      );
    }

    return (
      <div>
        <Titlebar title="Sale Summary" />
        <br />
        <div className="row">
          <div className="col1">
            <span>Total bill amount</span>
          </div>
          <div className="col2">
            <span>{`₹ ${this.props.totalBillAmount}`}</span>
          </div>
        </div>

        <div className="row">
          <div className="col1">
            <span>Discount</span>
          </div>
          <div className="col2">
            <Input
              placeholder="₹"
              value={this.state.discount}
              onChange={this.onDiscountChange}
            />
          </div>
        </div>

        <div className="row">
          <div className="col1">
            <span>Net bill amount</span>
          </div>
          <div className="col2">
            <span className="netBillLabel">{`₹ ${
              this.state.netBillAmount
            }`}</span>
          </div>
        </div>

        <div className="row line center" />

        <div className="row center">
          <Button.Group className="btnGroup-sales">
            <Button onClick={this.onCancelSale}>Cancel Sale</Button>
            <Button color="blue">Finish Sale</Button>
          </Button.Group>
        </div>

        <div className="row line center" />
      </div>
    );
  }
}

const mapStateToProps = state => ({
  totalBillAmount: cartTotalSelector(state)
});

export default withRouter(connect(mapStateToProps, { emptyCart })(SaleSummary));
