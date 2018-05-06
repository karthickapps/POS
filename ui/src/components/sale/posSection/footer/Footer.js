import React, { Component } from "react";
import { withStyles } from "material-ui";

const styles = () => ({
  root: {
    marginTop: "25px"
  }
});

class Footer extends Component {
  state = {};

  render() {
    const { classes } = this.props;

    return <div className={classes.root}>Footer</div>;
  }
}

export default withStyles(styles)(Footer);
