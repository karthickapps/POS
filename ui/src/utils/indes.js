import React from "react";
import { withStyles } from "material-ui";
import PropTypes from "prop-types";
import classNames from "classnames";

export default function styled(Component) {
  return (style, options) => {
    function StyledComponent(props) {
      const { classes, className, ...other } = props;
      return (
        <Component className={classNames(classes.root, className)} {...other} />
      );
    }
    StyledComponent.propTypes = {
      // eslint-disable-next-line react/forbid-prop-types
      classes: PropTypes.object.isRequired,
      // eslint-disable-next-line react/require-default-props
      className: PropTypes.string
    };
    const styles =
      typeof style === "function"
        ? theme => ({ root: style(theme) })
        : { root: style };
    return withStyles(styles, options)(StyledComponent);
  };
}
