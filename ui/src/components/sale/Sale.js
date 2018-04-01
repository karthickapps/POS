import React, { Component } from "react";
import { withStyles } from "material-ui/styles";
import CustomTabs from "../controls/Tabs";
import TabContainer from "../controls/TabContainer";

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

class Sale extends Component {
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
          {/* <div
            style={{
              position: "absolute",
              height: "100%",
              width: "100%",
              flexGrow: 1,
              backgroundColor: "black",
              zIndex: 100
            }}
          >
            sfk rocks
          </div> */}
          <CustomTabs
            onChange={this.handleChange}
            value={value}
            items={["Products", "Product Types"]}
          />
          {value === 0 && <TabContainer>Product</TabContainer>}
          {value === 1 && <TabContainer>Product Types</TabContainer>}
        </div>
      </div>
    );
  }
}

export default withStyles(styles, { withTheme: true })(Sale);
