import React, { Component, Fragment } from "react";
import Button from "material-ui/Button";
import { withRouter } from "react-router";
import { connect } from "react-redux";
import { withStyles } from "material-ui/styles";
import Searchbox from "../../controls/Searchbox";
import api from "../../../api";
import { getPaginationInfo } from "../../../utils";
import { loadProductType } from "../../../actions/productType";
import { productTypeSelector } from "../../../selectors";
import AutoFetchDatagrid from "../../controls/datagrid/AutoFetchDatagrid";

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

class ProductTypeTab extends Component {
  productColumns = ["Product Type ID", "Description"];

  state = { clearSearch: false };

  async componentDidMount() {
    if (
      this.props.productType.list.length > 0 &&
      this.props.productType.meta.isFiltered === false
    ) {
      return;
    }

    await this.fetchAll();
  }

  fetchAll = async () => {
    this.setState({ isLoading: true, clearSearch: true });

    const res = await api.productType.fetchAll();
    const paginationInfo = getPaginationInfo(res.headers.link);
    const list = res.data;
    const productType = {
      list,
      paginationInfo,
      isFiltered: false
    };

    this.props.loadProductType(productType);
    this.setState({ isLoading: false });
  };

  onRefreshClick = async () => {
    await this.fetchAll();
  };

  onSearchSubmit = async id => {
    this.setState({ isLoading: true, clearSearch: false });

    const res = await api.productType.searchByIdAndGetAll(id);
    const paginationInfo = getPaginationInfo(res.headers.link);
    const list = res.data;
    const productType = {
      list,
      paginationInfo,
      isFiltered: true
    };

    this.props.loadProductType(productType);
    this.setState({ isLoading: false });
  };

  onCreateNewClick = () => {
    this.props.history.push("productType/new");
  };

  onEdit = row => {
    console.log(row);
    this.props.history.push("productType/edit/12E");
  };

  onDelete = row => {
    console.log(row);
  };

  render() {
    const { isLoading, clearSearch } = this.state;
    const { classes, productType } = this.props;

    return (
      <Fragment>
        <div>
          <Button
            className={classes.button}
            variant="raised"
            color="default"
            size="small"
            onClick={this.onRefreshClick}
          >
            Refresh
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
          <AutoFetchDatagrid
            actions={["del", "edit"]}
            onEdit={this.onEdit}
            onDelete={this.onDelete}
            data={productType}
            headers={this.productColumns}
            isLoading={isLoading}
            afterDataFetch={this.props.loadProductType}
          />
        </div>
      </Fragment>
    );
  }
}

function mapStateToProps(state) {
  return {
    productType: productTypeSelector(state)
  };
}

let component = withStyles(styles, { withTheme: true })(ProductTypeTab);
component = connect(mapStateToProps, { loadProductType })(component);

export default withRouter(component);
