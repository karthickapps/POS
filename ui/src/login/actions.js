import { USER_LOGGED_IN } from "../types";

export const userLoggedIn = token => ({
  type: USER_LOGGED_IN,
  token
});

// eslint-disable-next-line  no-unused-vars
export const loginUser = credentials => dispatch =>
  Promise.resolve().then(() => {
    dispatch(userLoggedIn("credentials"));
  });

export default loginUser;
