import React, { Component, Fragment } from "react";
import Button from "material-ui/Button";
import { withRouter } from "react-router";
import { withStyles } from "material-ui/styles";

const styles = theme => ({
  leftIcon: {
    marginRight: theme.spacing.unit
  },
  button: {
    margin: theme.spacing.unit
  },
  iconSmall: {
    fontSize: 20
  }
});

class ProductTab extends Component {
  state = {};

  onCreateNewClick = () => {
    this.props.history.push("products/new");
  };

  render() {
    const { classes } = this.props;

    return (
      <Fragment>
        <Button
          className={classes.button}
          variant="raised"
          color="default"
          size="small"
        >
          List
        </Button>

        <Button
          className={classes.button}
          variant="raised"
          color="primary"
          size="small"
          onClick={this.onCreateNewClick}
        >
          Create New
        </Button>
      </Fragment>
    );
  }
}

export default withRouter(withStyles(styles, { withTheme: true })(ProductTab));
