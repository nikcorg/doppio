import debug from "debug";
import * as types from "../constants/action-types";

const log = debug("doppio:reducers:profiles");

export function profiles(state = [], action) {
    switch (action.type) {
    case types.CREATE_PROFILE_SUCCESS:
        let payload = action.payload;
        log("profile created successfully", payload);
        return [...state, { id: payload.id, name: payload.name, email: payload.email, balance: payload.balance }];
    default:
        return state;
    }
}
