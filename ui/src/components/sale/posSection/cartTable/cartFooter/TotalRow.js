import React from "react";
import FooterTableCell from "./FooterTableCell";
import FooterTableRow from "./FooterTableRow";

const TotalRow = ({ total }) => (
  <FooterTableRow style={{ paddingTop: "20px" }}>
    <FooterTableCell numeric>Total Items</FooterTableCell>
    <FooterTableCell numeric>{total.qty}</FooterTableCell>
    <FooterTableCell numeric />
    <FooterTableCell style={{ paddingLeft: "15px" }}>
      Total{" "}
      <span style={{ fontWeight: "400", fontSize: "11px" }}>(discounted)</span>
    </FooterTableCell>
    <FooterTableCell numeric>{total.price}</FooterTableCell>
  </FooterTableRow>
);

export default TotalRow;
