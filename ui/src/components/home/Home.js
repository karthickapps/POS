import React, { Component } from "react";
import { Grid } from "semantic-ui-react";

import Header from "./header/Header";
import Sidebar from "./sidebar/Sidebar";

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
              Content goes here
            </Grid.Column>
          </Grid.Row>
        </Grid>
      </div>
    );
  }
}

export default Home;
