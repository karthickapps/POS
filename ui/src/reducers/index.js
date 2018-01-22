import { combineReducers } from "redux";

import user from "../reducers/user";
import { USER_LOGGED_OUT } from "../types";

const appReducer = combineReducers({
  user
});

const rootReducer = (state, action) => {
  if (action.type === USER_LOGGED_OUT) {
    return {};
  }
  return appReducer(state, action);
};

export default rootReducer;
