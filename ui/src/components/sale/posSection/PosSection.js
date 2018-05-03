import React, { Component, Fragment } from "react";
import { withStyles } from "material-ui/styles";
import CartTable from "../cartTable/CartTable";
import SearchBox from "../Searchbox/Searchbox";

// eslint-disable-next-line
const styles = theme => ({});

class PosSection extends Component {
  state = {};

  render() {
    return (
      <Fragment>
        <SearchBox />
        <CartTable />
      </Fragment>
    );
  }
}

export default withStyles(styles, { withTheme: true })(PosSection);
