import React from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router";
import Home from "./components/home/Home";
import LoginPage from "./components/login/LoginPage";

const App = props => {
  const checkForAuth = () => {
    if (props.isLoggedIn) {
      return <Home />;
    }
    return <LoginPage />;
  };
  return <div>{checkForAuth()}</div>;
};

function mapStateToProps(state) {
  const isLoggedIn = state.user !== undefined ? !!state.user.token : false;

  return {
    isLoggedIn
  };
}

export default withRouter(connect(mapStateToProps, null)(App));
