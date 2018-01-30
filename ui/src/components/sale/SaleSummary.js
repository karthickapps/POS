import React, { Component } from "react";
import { Input, Button } from "semantic-ui-react";
import { connect } from "react-redux";
import { withRouter } from "react-router";
import { Titlebar } from "../controls";

class SaleSummary extends Component {
  state = {};

  render() {
    console.log(this.props.cart);

    return (
      <div>
        <Titlebar title="Sale Summary" />
        <br />
        <div className="row">
          <div className="col1">
            <span>Total bill amount</span>
          </div>
          <div className="col2">
            <span>₹ 10</span>
          </div>
        </div>

        <div className="row">
          <div className="col1">
            <span>Discount</span>
          </div>
          <div className="col2">
            <Input placeholder="Discount..." />
          </div>
        </div>

        <div className="row">
          <div className="col1">
            <span>Net bill amount</span>
          </div>
          <div className="col2">
            <span className="netBillLabel">₹ 10</span>
          </div>
        </div>

        <div className="row line center" />

        <div className="row center">
          <Button.Group className="btnGroup-sales">
            <Button>Cancel Sale</Button>
            <Button color="blue">Finish Sale</Button>
          </Button.Group>
        </div>

        <div className="row line center" />
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    cart: state.cart
  };
};

export default withRouter(connect(mapStateToProps, null)(SaleSummary));
