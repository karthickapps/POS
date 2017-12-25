import React from "react";
import { Header } from "semantic-ui-react";

const Titlebar = ({ title }) => (
  <Header color="grey" dividing>
    {title}
  </Header>
);

export default Titlebar;
