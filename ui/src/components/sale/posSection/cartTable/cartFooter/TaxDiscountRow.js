/* eslint-disable jsx-a11y/anchor-is-valid */
import React from "react";
import FooterTableCell from "./FooterTableCell";
import FooterTableRow from "./FooterTableRow";
import LinkButton from "../controls/LinkButton";

const TaxDiscountRow = ({ billing }) => (
  <FooterTableRow>
    <FooterTableCell numeric style={{ width: "150px" }}>
      <LinkButton text="Discount" />
    </FooterTableCell>
    <FooterTableCell numeric>{billing.discount}</FooterTableCell>
    <FooterTableCell numeric />
    <FooterTableCell style={{ paddingLeft: "15px" }}>
      <LinkButton text="Tax" />
    </FooterTableCell>
    <FooterTableCell numeric>{billing.tax}</FooterTableCell>
  </FooterTableRow>
);

export default TaxDiscountRow;
