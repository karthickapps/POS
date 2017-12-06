import React from "react";
import ReactDOM from "react-dom";
import "semantic-ui-css/semantic.min.css";

import { Provider } from "react-redux";
import { BrowserRouter, Route } from "react-router-dom";

import App from "./App";
import store from "./store";

import registerServiceWorker from "./registerServiceWorker";

ReactDOM.render(
  <BrowserRouter>
    <Provider store={store}>
      <Route component={App} />
    </Provider>
  </BrowserRouter>,
  document.getElementById("root"),
);

registerServiceWorker();
