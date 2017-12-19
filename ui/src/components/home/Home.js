import React, { Component } from "react";
import { Grid } from "semantic-ui-react";
import { withRouter, Switch, Route } from "react-router";

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
              <div>
                <Switch>
                  <Route exact path="/products" component={Products} />
                </Switch>
              </div>
            </Grid.Column>
          </Grid.Row>
        </Grid>
      </div>
    );
  }
}

export default withRouter(Home);
