import React, { Component, Fragment } from "react";
import Button from "material-ui/Button";
import { withRouter } from "react-router";
import { withStyles } from "material-ui/styles";
import Searchbox from "../../controls/Searchbox";
import Datagrid from "../../controls/datagrid/Datagrid";
import api from "../../../api";

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

  state = {
    data: []
  };

  async componentDidMount() {
    const product = await api.productType.fetchAll();
    const linkHeader = product.headers.link;
    const links = linkHeader.split(",");
    const paginationInfo = {
      next: links[0].split(";")[0],
      prev: links[1].split(";")[0],
      first: links[2].split(";")[0],
      last: links[3].split(";")[0],
      count: links[4].split(";")[0]
    };

    console.log(paginationInfo);
  }

  onCreateNewClick = () => {
    this.props.history.push("productType/new");
  };

  render() {
    const { classes } = this.props;
    const { data } = this.state;

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
          <Datagrid
            data={data}
            headers={this.productColumns}
            isLoading={true}
          />
        </div>
      </Fragment>
    );
  }
}

export default withRouter(
  withStyles(styles, { withTheme: true })(ProductTypeTab)
);
