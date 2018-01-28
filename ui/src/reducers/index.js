import { combineReducers } from "redux";

import user from "../reducers/user";
import cart from "../reducers/cart";

import { USER_LOGGED_OUT } from "../types";

const appReducer = combineReducers({
  user,
  cart
});

const rootReducer = (state, action) => {
  if (action.type === USER_LOGGED_OUT) {
    return {};
  }
  return appReducer(state, action);
};

export default rootReducer;
