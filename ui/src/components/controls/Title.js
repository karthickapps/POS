import React from "react";
import Typography from "material-ui/Typography";
import { withStyles } from "material-ui";

// eslint-disable-next-line
const styles = theme => ({
  title: {
    fontWeight: "lighter",
    color: "#1b1c1d",
    fontSize: "18px",
    borderBottom: "1px solid #eceaea",
    padding: "0px 0px 10px 0px"
  }
});

function Title({ classes, title }) {
  return (
    <Typography className={classes.title} variant="title" gutterBottom>
      {title}
    </Typography>
  );
}

export default withStyles(styles, { withTheme: true })(Title);
