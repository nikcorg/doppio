import debug from "debug";
import * as types from "../constants/action-types";

const log = debug("doppio:reducers:profile");

export function profile(state = null, action) {
    switch (action.type) {
    case types.CREATE_PROFILE:
        return { name: action.name, email: action.email, balance: 0 };
    case types.CLEAR_PROFILE:
        return null;
    default:
        return state;
    }
}
