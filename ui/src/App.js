import React from "react";
import PropTypes from "prop-types";

import { Route, Switch, BrowserRouter as Router } from "react-router-dom";

import ProtectedRoute from "./components/routes/ProtectedRoute";
import Home from "./components/Home";
import Products from "./components/Products";
import NotFound from "./components/NotFound";

const App = ({ location }) => (
  <div className="ui container" style={{ marginTop: "25px" }}>
    <Router>
      <Switch>
        <Route path="/" exact component={Home} />
        <Switch>
          <ProtectedRoute
            location={location}
            path="/products"
            exact
            component={Products}
          />
          <Route exact={false} component={NotFound} />
        </Switch>
      </Switch>
    </Router>
  </div>
);

App.propTypes = {
  location: PropTypes.shape({
    pathname: PropTypes.string.isRequired,
  }).isRequired,
};

export default App;
