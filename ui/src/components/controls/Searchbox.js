import React from "react";
import { withStyles } from "material-ui/styles";
import { InputAdornment } from "material-ui/Input";
import IconButton from "material-ui/IconButton";
import Search from "material-ui-icons/Search";
import CustomTextField from "./CustomTextField";

// eslint-disable-next-line
const styles = theme => ({
  root: {
    [theme.breakpoints.up("xs")]: {
      float: "none"
    },
    [theme.breakpoints.up("md")]: {
      float: "right"
    }
  },
  textfield: {
    width: 200
  }
});

const Searchbox = props => (
  <form onSubmit={props.onSubmit} className={props.classes.root}>
    <CustomTextField
      style={{ width: 200 }}
      placeholder="Enter ID"
      InputProps={{
        startAdornment: (
          <InputAdornment position="start">
            <IconButton onClick={props.onSubmit}>
              <Search />
            </IconButton>
          </InputAdornment>
        )
      }}
    />
  </form>
);

export default withStyles(styles, { withTheme: true })(Searchbox);
