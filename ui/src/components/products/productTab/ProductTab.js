import React, { Component } from "react";
import Button from "material-ui/Button";
import { withRouter } from "react-router";
import { withStyles } from "material-ui/styles";
import Searchbox from "../../controls/Searchbox";
import api from "../../../api";
import ApiAutoFetchDatagrid from "../../controls/datagrid/ApiAutoFetchDatagrid";
import YesNo from "../../controls/dialog/YesNo";
import CircularLoader from "../../controls/loader/CircularLoader";
import Message from "../../controls/Message";

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
    serachQuery: "",
    showConfirmDeleteDialog: false,
    isLoading: false,
    message: "",
    showMessage: false,
    isError: false
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

  onDelete = itemToDelete => {
    this.setState({ showConfirmDeleteDialog: true, itemToDelete });
  };

  onConfirmDelete = async () => {
    const { id } = this.state.itemToDelete;

    try {
      this.setState({ isLoading: true });

      const res = await api.product.delete(id);

      if (res.status === 204) {
        this.setState({
          isLoading: false,
          isError: false,
          showMessage: true,
          message: "Deleted successfully.",
          showConfirmDeleteDialog: false
        });
      } else {
        throw new Error(
          `Couldn't delete the record. The status code is ${res.status}`
        );
      }
    } catch (error) {
      this.setState({
        isLoading: false,
        isError: false,
        showMessage: true,
        message: error.message,
        showConfirmDeleteDialog: false
      });
    }
  };

  onMessageCloseClick = () => {
    this.setState({ showMessage: false });
  };

  onCancelConfirmDelete = () => {
    this.setState({ showConfirmDeleteDialog: false });
  };

  getApiPromise = () => {
    const { serachQuery } = this.state;

    if (serachQuery.length === 0) {
      return api.product.fetchByPages();
    }

    return api.product.searchByIdAndGetByPages(serachQuery);
  };

  render() {
    const {
      clearSearch,
      showConfirmDeleteDialog,
      isLoading,
      message,
      showMessage,
      isError
    } = this.state;
    const { classes } = this.props;

    return (
      <div className={classes.wrapper}>
        <CircularLoader isLoading={isLoading} />
        <YesNo
          open={showConfirmDeleteDialog}
          message="Are you sure wan't to delete the selected item"
          onOk={this.onConfirmDelete}
          onCancel={this.onCancelConfirmDelete}
        />
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

        <Message
          style={{ width: "98%" }}
          title="Message"
          message={message}
          show={showMessage}
          isError={isError}
          onCloseClick={this.onMessageCloseClick}
        />

        <div className={classes.wrapper}>
          <ApiAutoFetchDatagrid
            datasourcePromise={this.getApiPromise}
            actions={["del", "edit"]}
            onEdit={this.onEdit}
            onDelete={this.onDelete}
            headers={this.productColumns}
          />
        </div>
      </div>
    );
  }
}

export default withRouter(withStyles(styles, { withTheme: true })(ProductTab));
