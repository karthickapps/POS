import React from "react";
import { CircularProgress } from "material-ui/Progress";
import { withStyles } from "material-ui/styles";
import Overlay from "../Overlay";

const styles = () => ({
  loader: {
    position: "absolute",
    left: "50%",
    top: "50%"
  }
});

const CircularLoader = props => {
  if (props.isLoading === true) {
    return (
      <div>
        <CircularProgress size={50} className={props.classes.loader} />
        <Overlay />
      </div>
    );
  }

  return null;
};

export default withStyles(styles)(CircularLoader);
