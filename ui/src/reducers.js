import { combineReducers } from "redux";
import { LOGOUT_USER } from "./types";

import user from "./login/reducer";

const appReducer = combineReducers({
  user
});

const rootReducer = (state, action) => {
  if (action.type === LOGOUT_USER) {
    return {};
  }
  return appReducer(state, action);
};

export default rootReducer;
