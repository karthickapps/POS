import { combineReducers } from "redux";
import { USER_LOGGED_OUT } from "./types";

import auth from "./reducers/auth";
import productType from "./reducers/productType";

const appReducer = combineReducers({
  auth,
  productType
});

const rootReducer = (state, action) => {
  if (action.type === USER_LOGGED_OUT) {
    return {};
  }
  return appReducer(state, action);
};

export default rootReducer;
