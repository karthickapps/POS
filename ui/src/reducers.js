import { combineReducers } from "redux";
import { USER_LOGGED_OUT } from "./types";

import auth from "./reducers/auth";

const appReducer = combineReducers({
  auth
});

const rootReducer = (state, action) => {
  if (action.type === USER_LOGGED_OUT) {
    return {};
  }
  return appReducer(state, action);
};

export default rootReducer;
