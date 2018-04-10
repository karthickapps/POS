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

  state = {};

  async componentDidMount() {
    if (this.props.productType.list.length > 0) {
      return;
    }

    this.setState({ isLoading: true });

    const res = await api.productType.fetchAll();
    const paginationInfo = getPaginationInfo(res.headers.link);
    const list = res.data;
    const productType = {
      list,
      paginationInfo
    };

    this.props.loadProductType(productType);
    this.setState({ isLoading: false });
  }

  onCreateNewClick = () => {
    this.props.history.push("productType/new");
  };

  render() {
    const { isLoading } = this.state;
    const { classes, productType } = this.props;

    return (
      <Fragment>
        <div>
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
        </div>

        <div className={classes.wrapper}>
          <AutoFetchDatagrid
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
