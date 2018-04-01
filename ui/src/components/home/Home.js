import React, { Component } from "react";
import { withStyles } from "material-ui/styles";
import { Switch, Route } from "react-router";
import Header from "./header/Header";
import Sidebar from "./sidebar/Sidebar";
import MainContainer from "../controls/MainContainer";
import Sale from "../sale/Sale";
import Customer from "../customer/Customer";
import NotFound from "../notFound/NotFound";

// eslint-disable-next-line
const styles = theme => ({
  root: {
    zIndex: 1,
    overflow: "scroll",
    position: "relative",
    display: "flex",
    width: "100%",
    height: "calc(100vh - 1px)", // TODO needs to figure why. For now its a hack :)
    borderBottom: "1px solid #e0e0e0"
  }
});

class Home extends Component {
  state = {};

  render() {
    const { classes } = this.props;

    return (
      <div className={classes.root}>
        <Header />
        <Sidebar />
        <MainContainer>
          <Switch>
            <Route exact path="/home" component={Sale} />
            <Route exact path="/customer" component={Customer} />
            <Route path="/" component={NotFound} />
          </Switch>
        </MainContainer>
      </div>
    );
  }
}

export default withStyles(styles, { withTheme: true })(Home);
