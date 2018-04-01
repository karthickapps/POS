import React from "react";
import { withStyles } from "material-ui";
import PropTypes from "prop-types";
import classNames from "classnames";
import axios from "axios";
import * as moment from "moment";

const styled = Component => (style, options) => {
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

const setAuthorizationHeader = (token = null) => {
  if (token) {
    sessionStorage.setItem("token", token);
    axios.defaults.headers.common.authorization = `${token}`;
  } else {
    delete axios.defaults.headers.common.authorization;
  }
};

const isValidDDMMYY = date => moment(date, "DD-MM-YY", true).isValid();

const invertShowHide = val => {
  if (val === "show") return "hide";
  return "show";
};

const isValidDateChange = idate => {
  let date = idate;

  if (
    (date.length === 3 && date[2] !== "-") ||
    (date.length === 6 && date[5] !== "-") ||
    date.length > 8
  )
    return false;

  date = date.replace(/-/g, "");

  // eslint-disable-next-line
  if (isNaN(date)) return false;

  if (idate.length === 8 && !isValidDDMMYY(idate)) return false;

  return true;
};

export {
  styled,
  setAuthorizationHeader,
  isValidDDMMYY,
  isValidDateChange,
  invertShowHide
};
