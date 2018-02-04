import React from "react";
import { Header } from "semantic-ui-react";

const Titlebar = props => (
  <Header
    color="grey"
    dividing
    style={{ marginTop: 7, fontSize: 15, fontWeight: "normal" }}
  >
    {props.title}
  </Header>
);

export default Titlebar;
