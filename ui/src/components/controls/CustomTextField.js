import React, { Fragment } from "react";
import { withStyles } from "material-ui/styles";
import TextField from "material-ui/TextField";

// eslint-disable-next-line
const styles = theme => ({
  textField: {
    [theme.breakpoints.up("xs")]: {
      width: 250
    },
    [theme.breakpoints.up("sm")]: {
      width: 300
    },
    [theme.breakpoints.up("md")]: {
      width: 500
    },
    marginRight: 10
  },
  textFieldFormLabel: {
    fontSize: "1.05rem"
  }
});

const CustomTextField = props => {
  const { classes, autoComplete, ...rest } = props;
  let ac = "off";
  if (autoComplete !== undefined) ac = autoComplete;

  return (
    <Fragment>
      <TextField
        {...rest}
        InputLabelProps={{
          shrink: true,
          className: classes.textFieldFormLabel
        }}
        className={classes.textField}
        margin="normal"
        autoComplete={ac}
      />
      <br />
    </Fragment>
  );
};

export default withStyles(styles, { withTheme: true })(CustomTextField);
