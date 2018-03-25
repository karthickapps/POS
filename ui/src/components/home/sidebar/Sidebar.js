import React, { Component, Fragment } from "react";
import { withStyles } from "material-ui/styles";
import Hidden from "material-ui/Hidden";
import Drawer from "material-ui/Drawer";
import List from "material-ui/List";
import ShoppingCart from "material-ui-icons/ShoppingCart";
import Divider from "material-ui/Divider";
import {
  mailFolderListItems,
  otherMailFolderListItems
} from "./getSidebarMenus";

const drawerWidth = 200;

// eslint-disable-next-line
const styles = theme => ({
  drawerPaper: {
    width: drawerWidth,
    [theme.breakpoints.up("md")]: {
      position: "relative"
    }
  },
  logo: {
    height: "64px",
    background: "#3f51b5"
  },
  logoContainer: {
    padding: "18px 5px 5px 15px",
    display: "flex",
    color: "white",
    "&:only-child > span": {
      padding: "4px 0px 0px 10px",
      fontWeight: "lighter"
    }
  }
});

class Sidebar extends Component {
  state = { mobileOpen: false };

  handleDrawerToggle = () => {
    this.setState({ mobileOpen: !this.state.mobileOpen });
  };

  render() {
    const { classes, theme } = this.props;

    const drawer = (
      <div>
        <div className={classes.logo}>
          <div className={classes.logoContainer}>
            <ShoppingCart />
            <span>Point Of Sale</span>
          </div>
        </div>
        <Divider />
        <List>{mailFolderListItems}</List>
        <List>{otherMailFolderListItems}</List>
      </div>
    );

    return (
      <Fragment>
        <Hidden mdUp>
          <Drawer
            variant="temporary"
            anchor={theme.direction === "rtl" ? "right" : "left"}
            open={this.state.mobileOpen}
            onClose={this.handleDrawerToggle}
            classes={{
              paper: classes.drawerPaper
            }}
            ModalProps={{
              keepMounted: true // Better open performance on mobile.
            }}
          >
            {drawer}
          </Drawer>
        </Hidden>
        <Hidden smDown implementation="css">
          <Drawer
            variant="permanent"
            open
            classes={{
              paper: classes.drawerPaper
            }}
          >
            {drawer}
          </Drawer>
        </Hidden>
      </Fragment>
    );
  }
}

export default withStyles(styles, { withTheme: true })(Sidebar);
