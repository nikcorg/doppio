import debug from "debug";
import * as types from "../constants/action-types";

const log = debug("doppio:reducers:current-user");

export function currentUser(state = null, action) {
    switch (action.type) {
    case types.SIGN_IN:
    case types.CREATE_PROFILE_SUCCESS:
        return { id: action.payload.id };
    case types.SIGN_OUT:
        return null;
    default:
        return state;
    }
}
