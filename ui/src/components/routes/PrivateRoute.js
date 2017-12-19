import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";

class PrivateRoute extends Component {
  componentWillMount() {
    this.validationCheck();
  }

  shouldComponentUpdate() {
    this.validationCheck();
    return true;
  }

  validationCheck() {
    if (this.props.isAuthenticated === false) {
      this.props.history.push("/");
    }
  }

  render() {
    let toRender = null;
    if (this.props.isAuthenticated === true) {
      toRender = this.props.children;
    }

    return <div>{toRender}</div>;
  }
}

PrivateRoute.propTypes = {
  // eslint-disable-next-line
  location: PropTypes.shape({
    pathname: PropTypes.string.isRequired
  }).isRequired,
  isAuthenticated: PropTypes.bool.isRequired
};

function mapStateToProps(state) {
  return {
    isAuthenticated: !!state.user.token
  };
}

export default withRouter(connect(mapStateToProps)(PrivateRoute));
