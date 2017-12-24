import update from "immutability-helper";
import { USER_LOGGED_IN } from "../types";

export default function user(state = {}, action = {}) {
  switch (action.type) {
    case USER_LOGGED_IN:
      return update(state, {
        token: { $set: action.token }
      });
    default:
      return state;
  }
}
