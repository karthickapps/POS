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
    height: `calc(100vh - 80px)`,
    overflowX: "auto",
    overflowY: "auto",
    borderRadius: "0px"
  }
});

class Container extends Component {
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

export default withStyles(styles, { withTheme: true })(Container);
