/* eslint-disable jsx-a11y/anchor-is-valid */
import React from "react";
import { withStyles } from "material-ui/styles";
import FooterTableCell from "./FooterTableCell";
import FooterTableRow from "./FooterTableRow";

const styles = () => ({
  root: {
    backgroundColor: "white",
    borderTop: "1px solid #e0e0e0"
  }
});

const TaxDiscountRow = () => (
  <FooterTableRow>
    <FooterTableCell numeric style={{ width: "150px" }}>
      <a href="">Discount</a>
    </FooterTableCell>
    <FooterTableCell numeric>20000</FooterTableCell>
    <FooterTableCell numeric />
    <FooterTableCell style={{ paddingLeft: "15px" }}>
      <a href="">Tax</a>
    </FooterTableCell>
    <FooterTableCell numeric>200000000</FooterTableCell>
  </FooterTableRow>
);

export default withStyles(styles)(TaxDiscountRow);
