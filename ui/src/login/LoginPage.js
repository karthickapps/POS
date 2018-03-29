import React, { Component } from "react";
import { withStyles } from "material-ui/styles";
import Paper from "material-ui/Paper";
import TextField from "material-ui/TextField";
import Button from "material-ui/Button";

// eslint-disable-next-line
const styles = theme => ({
  root: {
    background: "#efefef",
    height: "calc(100vh)"
  },
  paper: {
    minWidth: 300,
    display: "flex",
    flexDirection: "column",
    width: "auto",
    height: "auto",
    margin: "auto",
    alignItems: "center",
    padding: "20px 30px 30px 30px"
  },
  loginContainer: {
    display: "flex",
    height: "calc(90vh)"
  },
  button: {
    marginTop: "25px"
  },
  textFieldFormLabel: {
    fontSize: 14
  },
  textFieldInput: {
    fontSize: 14
  },
  textFieldRoot: {}
});

class LoginPage extends Component {
  state = {};

  render() {
    const { classes } = this.props;

    return (
      <div className={classes.root}>
        <div className={classes.loginContainer}>
          <Paper className={classes.paper}>
            <div>
              <span>Welcome to Easy POS</span>
            </div>
            <TextField
              fullWidth
              label="Username"
              placeholder="Username"
              margin="normal"
              InputProps={{
                classes: {
                  root: classes.textFieldRoot,
                  input: classes.textFieldInput,
                  fontSize: "10px"
                }
              }}
              InputLabelProps={{
                className: classes.textFieldFormLabel
              }}
            />

            <TextField
              fullWidth
              label="Password"
              placeholder="Password"
              type="password"
              margin="normal"
            />

            <Button variant="raised" color="primary" className={classes.button}>
              Login
            </Button>
          </Paper>
        </div>
      </div>
    );
  }
}

export default withStyles(styles, { withTheme: true })(LoginPage);
