import update from "immutability-helper";
import { USER_LOGGED_IN, USER_LOGGED_OUT } from "../types";

export default function user(state = {}, action = {}) {
  switch (action.type) {
    case USER_LOGGED_IN:
      return update(state, {
        token: { $set: action.token },
      });
    case USER_LOGGED_OUT:
      return {};
    default:
      return state;
  }
}
