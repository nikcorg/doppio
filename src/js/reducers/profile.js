import * as types from "../constants/ActionTypes";

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
