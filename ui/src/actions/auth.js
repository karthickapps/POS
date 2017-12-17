/* eslint-disable no-unused-vars */

import { USER_LOGGED_IN, USER_LOGGED_OUT } from "../types";
import api from "../api";
import setAuthorizationHeader from "../utils";

export const userLoggedIn = token => ({
  type: USER_LOGGED_IN,
  token,
});

export const userLoggedOut = () => ({
  type: USER_LOGGED_OUT,
});

export const login = credentials => dispatch =>
  api.user.login(credentials).then(token => {
    setAuthorizationHeader(token);
    dispatch(userLoggedIn(token));
  });

export const logout = () => dispatch => {
  setAuthorizationHeader();
  dispatch(userLoggedOut());
};
