import React, { Component } from "react";
import { Grid, Segment } from "semantic-ui-react";
import { Switch, Route } from "react-router";

import Header from "./header/Header";
import Sidebar from "./sidebar/Sidebar";
import ProductsContainer from "../products/ProductsContainer";
import ExpenseContainer from "../expense/ExpenseContainer";
import Customers from "../customers";
import Sale from "../sale";
import "./home.css";

class Home extends Component {
  render() {
    return (
      <div>
        <Header />
        <Grid columns={2} divided="vertically">
          <Grid.Row id="container">
            <Grid.Column width={2} style={{ marginBottom: 0 }}>
              <Sidebar />
            </Grid.Column>
            <Grid.Column
              id="grid-wrapper"
              width={14}
              style={{ marginBottom: 0 }}
            >
              <Segment id="segment-container" color="violet">
                <Switch>
                  <Route exact path="/products" component={ProductsContainer} />
                  <Route exact path="/expense" component={ExpenseContainer} />
                  <Route exact path="/customers" component={Customers} />
                  <Route exact path="/sale" component={Sale} />
                </Switch>
              </Segment>
            </Grid.Column>
          </Grid.Row>
        </Grid>
      </div>
    );
  }
}

export default Home;
