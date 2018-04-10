import React from "react";
import { Switch, Route } from "react-router";
import customer from "../customers";
import product from "../products";
import NotFound from "../notFound/NotFound";

const Routes = () => (
  <Switch style={{ overflow: "auto" }}>
    <Route exact path="/" component={() => <div />} />
    <Route exact path="/customers" component={customer.Customers} />
    <Route exact path="/customers/new" component={customer.AddNew} />
    <Route exact path="/products" component={product.Products} />
    <Route exact path="/products/new" component={product.AddNewProduct} />
    <Route exact path="/productType" component={product.Products} />
    <Route
      exact
      path="/productType/new"
      component={product.AddNewProductType}
    />
    <Route
      exact
      path="/productType/edit/:id"
      component={product.AddNewProductType}
    />
    <Route path="/" component={NotFound} />
  </Switch>
);

export default Routes;
