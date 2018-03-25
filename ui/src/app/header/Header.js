import React, { Component, Fragment } from "react";
import { withStyles } from "material-ui/styles";
import AppBar from "material-ui/AppBar";
import Toolbar from "material-ui/Toolbar";
import IconButton from "material-ui/IconButton";
import MenuIcon from "material-ui-icons/Menu";
import Menus from "./Menus";

const drawerWidth = 200;

// eslint-disable-next-line
const styles = theme => ({
  appBar: {
    position: "absolute",
    marginLeft: drawerWidth,
    [theme.breakpoints.up("md")]: {
      width: `calc(100% - ${drawerWidth}px)`
    }
  },
  flex: {
    flex: 1
  },
  navIconHide: {
    [theme.breakpoints.up("md")]: {
      display: "none"
    }
  }
});

class Header extends Component {
  state = {};

  render() {
    const { classes, handleDrawerToggle } = this.props;

    return (
      <Fragment>
        <AppBar className={classes.appBar}>
          <Toolbar>
            <IconButton
              color="inherit"
              aria-label="open drawer"
              onClick={handleDrawerToggle}
              className={classes.navIconHide}
            >
              <MenuIcon />
            </IconButton>
            <div className={classes.flex}>
              <Menus />
            </div>
          </Toolbar>
        </AppBar>
      </Fragment>
    );
  }
}

export default withStyles(styles, { withTheme: true })(Header);
