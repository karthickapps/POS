import React, { Component } from "react";
import { withStyles } from "material-ui";
import Paper from "material-ui/Paper";

const styles = theme => ({
  container: {
    flexGrow: 1,
    backgroundColor: theme.palette.background.default,
    padding: "70px 10px 15px 10px"
  },
  paper: {
    [theme.breakpoints.up("xs")]: {
      width: "calc(100vw - 20px)"
    },
    [theme.breakpoints.up("md")]: {
      width: "100%"
    },
    [theme.breakpoints.up("lg")]: {
      width: "100%"
    },
    height: `calc(100vh - 80px)`,
    overflowX: "auto",
    overflowY: "auto",
    borderRadius: "0px"
  }
});

class MainContainer extends Component {
  state = {};

  render() {
    const { classes, children } = this.props;

    return (
      <main className={classes.container}>
        <Paper className={classes.paper} elevation={4}>
          {children}
        </Paper>
      </main>
    );
  }
}

export default withStyles(styles, { withTheme: true })(MainContainer);
