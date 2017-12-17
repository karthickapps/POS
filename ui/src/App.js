import React from "react";
import PropTypes from "prop-types";

import { Route, Switch, BrowserRouter as Router } from "react-router-dom";

import ProtectedRoute from "./components/routes/ProtectedRoute";
import LoginPage from "./components/login/LoginPage";
import Products from "./components/products/Products";
import NotFound from "./components/exceptions/NotFound";

const App = ({ location }) => (
  <div>
    <Router>
      <Switch>
        <Route path="/" exact component={LoginPage} />
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
