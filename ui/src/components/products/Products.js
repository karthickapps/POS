import React, { Component } from "react";
import { withRouter } from "react-router";
import { withStyles } from "material-ui/styles";
import CustomTabs from "../controls/Tabs";
import TabContainer from "../controls/TabContainer";
import ProductTab from "./ProductTab";

const styles = theme => ({
  root: {
    padding: 10
  },
  tabHolder: {
    flexGrow: 1,
    backgroundColor: theme.palette.background.paper
  },
  tab: {
    boxShadow: "none"
  },
  tabItem: {
    fontSize: "12px"
  },
  indicator: {
    backgroundColor: "#3f51b5"
  }
});

class Products extends Component {
  state = {
    value: 0
  };

  handleChange = (event, value) => {
    this.setState({ value });
  };

  render() {
    const { classes } = this.props;
    const { value } = this.state;

    return (
      <div>
        <div className={classes.tabHolder}>
          <CustomTabs
            onChange={this.handleChange}
            value={value}
            items={["Products", "Product Types"]}
          />
          {value === 0 && (
            <TabContainer>
              <ProductTab />
            </TabContainer>
          )}
          {value === 1 && <TabContainer>Product Types</TabContainer>}
        </div>
      </div>
    );
  }
}

export default withRouter(withStyles(styles, { withTheme: true })(Products));
