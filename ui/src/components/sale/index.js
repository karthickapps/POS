import React, { Component } from "react";
import { withStyles } from "material-ui/styles";

const styles = theme => ({
  root: {
    padding: 10
  },
  tabHolder: {
    flexGrow: 1,
    backgroundColor: theme.palette.background.paper
  },
  tab: {
    boxShadow: "none"
  },
  tabItem: {
    fontSize: "12px"
  },
  indicator: {
    backgroundColor: "#3f51b5"
  }
});

class Sale extends Component {
  render() {
    return <div>Sale</div>;
  }
}

export default withStyles(styles, { withTheme: true })(Sale);
