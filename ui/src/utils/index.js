import axios from "axios";
import * as moment from "moment";

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

  if (isNaN(date)) return false;

  if (idate.length === 8 && !isValidDDMMYY(idate)) return false;

  return true;
};

export {
  setAuthorizationHeader,
  isValidDDMMYY,
  isValidDateChange,
  invertShowHide
};
