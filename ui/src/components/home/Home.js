import React, { Component } from "react";
import { withStyles } from "material-ui/styles";
import Header from "./header/Header";
import Sidebar from "./sidebar/Sidebar";
import MainContainer from "../controls/MainContainer";
import Routes from "./Routes";

// eslint-disable-next-line
const styles = theme => ({
  root: {
    zIndex: 1,
    // overflow: "auto",
    display: "flex",
    // width: "100%",
    height: "calc(100vh - 1px)", // TODO needs to figure why. For now its a hack :)
    borderBottom: "1px solid #e0e0e0"
  }
});

class Home extends Component {
  state = {
    mobileOpen: false
  };

  handleDrawerToggle = () => {
    this.setState({ mobileOpen: !this.state.mobileOpen });
  };

  render() {
    const { classes } = this.props;
    const { mobileOpen } = this.state;

    return (
      <div className={classes.root}>
        <Header handleDrawerToggle={this.handleDrawerToggle} />
        <Sidebar
          mobileOpen={mobileOpen}
          handleDrawerToggle={this.handleDrawerToggle}
        />
        <MainContainer>
          <Routes />
        </MainContainer>
      </div>
    );
  }
}

export default withStyles(styles, { withTheme: true })(Home);
