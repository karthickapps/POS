import { USER_LOGGED_IN } from "../types";

// eslint-disable-next-line
export const userLoggedIn = user => ({
  type: USER_LOGGED_IN,
  user,
});
