import React, { Component } from "react";
import { withStyles } from "material-ui/styles";
import Paper from "material-ui/Paper";
import TextField from "material-ui/TextField";
import { CircularProgress } from "material-ui/Progress";
import Button from "material-ui/Button";
import ErrorMessage from "../controls/ErrorMessage";

// eslint-disable-next-line
const styles = theme => ({
  root: {
    background: "#efefef",
    height: "100vh"
  },
  paper: {
    minWidth: 300,
    display: "flex",
    flexDirection: "column",
    width: "350px",
    minHeight: "230px",
    margin: "auto",
    alignItems: "center",
    padding: "20px 30px 30px 30px"
  },
  loginContainer: {
    display: "flex",
    height: "calc(90vh)"
  },
  errorMessage: {
    width: "90%",
    marginTop: 20
  },
  wrapper: {
    marginTop: 20,
    position: "relative"
  },
  buttonProgress: {
    color: "black",
    position: "absolute",
    top: "50%",
    left: "50%",
    marginTop: -12,
    marginLeft: -12
  }
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

            <ErrorMessage
              show={true}
              className={classes.errorMessage}
              message="Invalid credentials"
            />

            <TextField
              fullWidth
              label="Username"
              placeholder="Username"
              margin="normal"
            />
            <TextField
              fullWidth
              label="Password"
              placeholder="Password"
              type="password"
              margin="normal"
            />

            <div className={classes.wrapper}>
              <Button variant="raised" color="primary" disabled>
                Login
              </Button>
              <CircularProgress size={24} className={classes.buttonProgress} />
            </div>
          </Paper>
        </div>
      </div>
    );
  }
}

export default withStyles(styles, { withTheme: true })(LoginPage);
