import React, { Component, Fragment } from "react";
import { withStyles } from "material-ui/styles";
import AccountCircle from "material-ui-icons/AccountCircle";
import Menu, { MenuItem } from "material-ui/Menu";
import IconButton from "material-ui/IconButton";

// eslint-disable-next-line
const styles = theme => ({
  menuLeft: {
    float: "right"
  },
  menuItem: {
    fontSize: "13.5px",
    padding: "5px 20px 5px 20px"
  }
});

class Menus extends Component {
  state = { anchorEl: null };

  handleMenu = event => {
    this.setState({ anchorEl: event.currentTarget });
  };

  handleClose = () => {
    this.setState({ anchorEl: null });
  };

  render() {
    const { anchorEl } = this.state;
    const { classes } = this.props;
    const open = Boolean(anchorEl);

    return (
      <Fragment>
        <IconButton
          className={classes.menuLeft}
          aria-owns={open ? "menu-appbar" : null}
          aria-haspopup="true"
          onClick={this.handleMenu}
          color="inherit"
        >
          <AccountCircle />
        </IconButton>
        <Menu
          id="menu-appbar"
          anchorEl={anchorEl}
          anchorOrigin={{
            vertical: "top",
            horizontal: "right"
          }}
          transformOrigin={{
            vertical: "top",
            horizontal: "right"
          }}
          open={open}
          onClose={this.handleClose}
        >
          <MenuItem className={classes.menuItem} onClick={this.handleClose}>
            My Profile
          </MenuItem>
          <MenuItem className={classes.menuItem} onClick={this.handleClose}>
            Logout
          </MenuItem>
        </Menu>
      </Fragment>
    );
  }
}

export default withStyles(styles, { withTheme: true })(Menus);
