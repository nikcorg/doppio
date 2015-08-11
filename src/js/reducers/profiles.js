import debug from "debug";
import * as types from "../constants/action-types";

const log = debug("doppio:reducers:profiles");

export function profiles(state = [], action) {
    switch (action.type) {
    case types.CREATE_PROFILE:
        return [...state, { id: action.id, name: action.name, email: action.email, balance: action.balance }];
    default:
        return state;
    }
}
