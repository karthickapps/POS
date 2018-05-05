import React from "react";
import { withStyles } from "material-ui/styles";
import FooterPriceLabel from "./FooterPriceLabel";

const styles = () => ({
  root: { margin: "20px 10px 10px 0px", float: "right" }
});

const Footer = ({ item, classes }) => (
  <div className={classes.root}>
    <FooterPriceLabel price={item.price * item.qty} title="Net Price" />
    <br />
    <br />
    <FooterPriceLabel price={item.totalPrice} title="Selling Price" />
  </div>
);

export default withStyles(styles)(Footer);
