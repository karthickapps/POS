import React from "react";
import { Dimmer, Loader as SemanticLoader } from "semantic-ui-react";

const Loader = ({ isLoading }) => (
  <Dimmer active={isLoading} inverted>
    <SemanticLoader content="Loading" />
  </Dimmer>
);

export default Loader;
