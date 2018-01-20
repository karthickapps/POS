import React, { Component } from "react";
import PropTypes from "prop-types";

import { Form, Segment, Button, Message } from "semantic-ui-react";
import "./login.css";

class LoginForm extends Component {
  state = {
    data: {
      id: "",
      password: ""
    },
    errors: {},
    loading: false
  };

  onChange = e => {
    this.setState({
      data: { ...this.state.data, [e.target.name]: e.target.value }
    });
  };

  onSubmit = e => {
    e.preventDefault();

    const errors = this.validate(this.state.data);
    this.setState({ errors });

    if (Object.keys(errors).length === 0) {
      this.setState({ loading: true });
      this.props.submit(this.state.data).catch(() => {
        this.setState({
          errors: { global: "Invalid credentials, please try again." },
          loading: false
        });
        this.clear();
      });
    } else {
      this.clear();
    }
  };

  clear = () => this.setState({ data: { id: "", password: "" } });

  validate = data => {
    const errors = {};
    if (!data.id) errors.id = "Invalid id";
    if (!data.password) errors.password = "Can't be blank";
    return errors;
  };

  render() {
    const { data, errors, loading } = this.state;

    return (
      <div id="login-container">
        <div id="login">
          <Segment inverted color="blue" attached="top">
            Welcome to Acoounts book!.
          </Segment>
          <Segment attached>
            <Form size="small" onSubmit={this.onSubmit} loading={loading}>
              {errors.global && (
                <Message negative>
                  <Message.Header>Something went wrong</Message.Header>
                  <p>{errors.global}</p>
                </Message>
              )}
              <Form.Input
                id="id"
                name="id"
                fluid
                icon="user"
                iconPosition="left"
                placeholder="User name"
                value={data.id}
                error={!!errors.id}
                onChange={this.onChange}
              />
              <Form.Input
                id="password"
                name="password"
                fluid
                icon="lock"
                iconPosition="left"
                placeholder="Password"
                type="password"
                value={data.password}
                error={!!errors.password}
                onChange={this.onChange}
              />

              <Button color="blue" fluid size="large">
                Login
              </Button>
            </Form>
          </Segment>
        </div>
      </div>
    );
  }
}

LoginForm.propTypes = {
  submit: PropTypes.func.isRequired
};

export default LoginForm;
