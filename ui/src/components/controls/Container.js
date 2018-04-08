import React from "react";
import { withStyles } from "material-ui/styles";
import Title from "./Title";

const styles = () => ({
  root: {
    borderTop: "1px solid #3f50b5",
    padding: "10px 5px 5px 5px"
  }
});

const Container = props => (
  <div className={props.classes.root}>
    <Title title={props.title} />
    <br />
    {props.children}
  </div>
);

export default withStyles(styles, { withTheme: true })(Container);
