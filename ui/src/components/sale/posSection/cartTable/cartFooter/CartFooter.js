import React, { Component } from "react";
import { Table, TableBody } from "material-ui";
import TotalRow from "./TotalRow";
import TaxDiscountRow from "./TaxDiscountRow";
import TotalPayableRow from "./TotalPayableRow";

class CartFooter extends Component {
  state = {};

  render() {
    const { total } = this.props;

    if (total.qty === 0) {
      return null;
    }

    return (
      <Table style={{ marginTop: "50px" }}>
        <TableBody>
          <TotalRow total={total} />
          <TaxDiscountRow />
          <TotalPayableRow />
        </TableBody>
      </Table>
    );
  }
}

export default CartFooter;
