import React, { Component } from "react";
import { Table, TableBody } from "material-ui";
import TotalRow from "./TotalRow";
import TaxDiscountRow from "./TaxDiscountRow";
import TotalPayableRow from "./TotalPayableRow";

class CartFooter extends Component {
  state = {};

  render() {
    const { cartArray, summary } = this.props;

    if (summary.noOfItems === 0) {
      return null;
    }

    const totalQtyText = `${summary.noOfItems} (${summary.noOfInividualItems})`;
    const totalPrice = summary.netTotal;
    const totalPayablePrice = summary.payableTotal;

    return (
      <Table style={{ marginTop: "50px" }}>
        <TableBody>
          <TotalRow totalQtyText={totalQtyText} totalPrice={totalPrice} />
          <TaxDiscountRow cartArray={cartArray} summary={summary} />
          <TotalPayableRow totalPayablePrice={totalPayablePrice} />
        </TableBody>
      </Table>
    );
  }
}

export default CartFooter;
