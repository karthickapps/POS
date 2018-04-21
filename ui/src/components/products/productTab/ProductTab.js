import React, { Component, Fragment } from "react";
import Button from "material-ui/Button";
import { withRouter } from "react-router";
import { withStyles } from "material-ui/styles";
import Searchbox from "../../controls/Searchbox";
import api from "../../../api";
import ApiAutoFetchDatagrid from "../../controls/datagrid/ApiAutoFetchDatagrid";

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
  }
});

class ProductTab extends Component {
  productColumns = ["ID", "Description", "Cost price", "Selling price", "Type"];

  state = {
    clearSearch: false,
    serachQuery: ""
  };

  onListClick = () => {
    this.setState({ clearSearch: true, serachQuery: "" });
  };

  onSearchSubmit = async id => {
    this.setState({ clearSearch: false, serachQuery: id });
  };

  onCreateNewClick = () => {
    this.props.history.push("products/new");
  };

  onEdit = row => {
    this.props.history.push(`products/edit/${row.id}`);
  };

  onDelete = row => {
    console.log(row);
  };

  getApiPromise = () => {
    const { serachQuery } = this.state;

    if (serachQuery.length === 0) {
      return api.product.fetchByPages();
    }

    return api.product.searchByIdAndGetByPages(serachQuery);
  };

  render() {
    const { clearSearch } = this.state;
    const { classes } = this.props;

    return (
      <Fragment>
        <div>
          <Button
            className={classes.button}
            variant="raised"
            color="default"
            size="small"
            onClick={this.onListClick}
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
          <Searchbox
            clear={clearSearch}
            onChange={this.onSearchChange}
            onSubmit={this.onSearchSubmit}
          />
        </div>
        <div className={classes.wrapper}>
          <ApiAutoFetchDatagrid
            datasourcePromise={this.getApiPromise}
            actions={["del", "edit"]}
            onEdit={this.onEdit}
            onDelete={this.onDelete}
            headers={this.productColumns}
          />
        </div>
      </Fragment>
    );
  }
}

export default withRouter(withStyles(styles, { withTheme: true })(ProductTab));
