import React from "react";
import PropTypes from "prop-types";
import { withRouter } from "react-router";
import { connect } from "react-redux";
import LoginForm from "./LoginForm";
import { login } from "../../actions/user";

class LoginPage extends React.Component {
  submit = data =>
    this.props.login(data).then(() => this.props.history.push("/home"));

  componentWillMount() {
    if (this.props.isLoggedIn) {
      this.props.history.push("/home");
    }
  }

  render() {
    return <LoginForm submit={this.submit} />;
  }
}

LoginPage.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func.isRequired
  }).isRequired,
  login: PropTypes.func.isRequired,
  isLoggedIn: PropTypes.bool.isRequired
};

function mapStateToProps(state) {
  return {
    isLoggedIn: !!state.user.token
  };
}

export default withRouter(connect(mapStateToProps, { login })(LoginPage));
