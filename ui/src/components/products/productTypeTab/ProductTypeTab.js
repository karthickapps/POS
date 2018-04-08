import React, { Component, Fragment } from "react";
import Button from "material-ui/Button";
import { withRouter } from "react-router";
import { withStyles } from "material-ui/styles";
import { CircularProgress } from "material-ui/Progress";
import Searchbox from "../../controls/Searchbox";
import Datagrid from "../../controls/datagrid/Datagrid";

const styles = theme => ({
  leftIcon: {
    marginRight: theme.spacing.unit
  },
  button: {
    margin: theme.spacing.unit
  },
  iconSmall: {
    fontSize: 20
  },
  wrapper: {
    marginTop: 20,
    position: "relative"
  },
  overlay: {
    top: 0,
    position: "absolute",
    background: "#ffffffad",
    height: "100%",
    width: "100%"
  },
  buttonProgress: {
    color: "#3f50b5",
    position: "absolute",
    top: "50%",
    left: "50%",
    marginTop: -12,
    marginLeft: -12
  }
});

let id = 0;
function createData(name, calories, fat, carbs, protein) {
  id += 1;
  return { id, name, calories, fat, carbs, protein };
}

const data = [
  createData("Frozen yoghurt", 159, 6.0, 24, 4.0),
  createData("Ice cream sandwich", 237, 9.0, 37, 4.3),
  createData("Eclair", 262, 16.0, 24, 6.0),
  createData("Cupcake", 305, 3.7, 67, 4.3),
  createData("Gingerbread", 356, 16.0, 49, 3.9),
  createData("Frozen 2", 159, 6.0, 24, 4.0),
  createData("2 Ice cream sandwich", 237, 9.0, 37, 4.3),
  createData("3 Eclair", 262, 16.0, 24, 6.0),
  createData("4 Cupcake", 305, 3.7, 67, 4.3),
  createData("5 Gingerbread", 356, 16.0, 49, 3.9)
];

class ProductTypeTab extends Component {
  productColumns = [
    "Dessert (100g serving)",
    "Calories",
    "Fat (g)",
    "Carbs (g)",
    "Protein (g)"
  ];

  state = {};

  onCreateNewClick = () => {
    this.props.history.push("productType/new");
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
        <Searchbox onSubmit={this.onSearchSubmit} />

        <div className={classes.wrapper}>
          <Datagrid data={data} headers={this.productColumns} />
          <div className={classes.overlay}>
            <CircularProgress size={24} className={classes.buttonProgress} />
          </div>
        </div>
      </Fragment>
    );
  }
}

export default withRouter(
  withStyles(styles, { withTheme: true })(ProductTypeTab)
);
