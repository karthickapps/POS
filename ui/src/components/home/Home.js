import React, { Component } from "react";
import { Grid } from "semantic-ui-react";
import PropTypes from "prop-types";
import { Route, Switch, BrowserRouter as Router } from "react-router-dom";

import ProtectedRoute from "../routes/ProtectedRoute";
import Header from "./header/Header";
import Sidebar from "./sidebar/Sidebar";
import Products from "../products/Products";

import "./home.css";

class Home extends Component {
  render() {
    return (
      <div>
        <Header />
        <Grid columns={2} divided="vertically">
          <Grid.Row id="container">
            <Grid.Column width={3} style={{ marginBottom: 0 }}>
              <Sidebar />
            </Grid.Column>
            <Grid.Column width={13} style={{ marginBottom: 0 }}>
              <Switch>
                <Route path="/products" exact component={Products} />
              </Switch>
            </Grid.Column>
          </Grid.Row>
        </Grid>
      </div>
    );
  }
}

Home.propTypes = {
  location: PropTypes.shape({
    pathname: PropTypes.string.isRequired
  }).isRequired
};

export default Home;
