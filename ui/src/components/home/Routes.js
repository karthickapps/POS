import React from "react";
import { Switch, Route } from "react-router";
import customer from "../customers";
import product from "../products";
import NotFound from "../notFound/NotFound";

const Routes = () => (
  <Switch style={{ overflow: "auto" }}>
    <Route exact path="/" component={() => <div />} />

    {/* Customer */}
    <Route exact path="/customers" component={customer.Customers} />
    <Route exact path="/customers/new" component={customer.AddNew} />
    <Route exact path="/customers/edit/:id" component={customer.AddNew} />

    {/* Product */}
    <Route exact path="/products" component={product.Products} />
    <Route exact path="/products/new" component={product.AddNewProduct} />
    <Route exact path="/products/edit/:id" component={product.AddNewProduct} />

    {/* Product Type */}
    <Route exact path="/producttypes" component={product.Products} />
    <Route
      exact
      path="/producttypes/new"
      component={product.AddNewProductType}
    />
    <Route
      exact
      path="/producttypes/edit/:id"
      component={product.AddNewProductType}
    />

    {/* Catch : Not found */}
    <Route path="/" component={NotFound} />
  </Switch>
);

export default Routes;
