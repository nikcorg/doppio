import debug from "debug";
import uuid from "node-uuid";
import * as types from "../constants/action-types";

const log = debug("doppio:reducers:session");

export function sessions(state = [], action) {
    switch (action.type) {
    case types.CREATE_SESSION:
        return [...state, {
            id: action.id,
            host: action.host.id,
            members: [action.host.id],
            outchecker: null
        }];

    case types.CANCEL_SESSION:
        return state.filter(s => s.id !== action.id);

    case types.JOIN_SESSION:
        return state.filter(s => s.id !== action.id).concat(
            Object.assign(
                {},
                state.filter(s => s.id === action.id).pop(),
                {
                    members: [
                        ...state.filter((s) => s.id === action.id).pop().members,
                        action.profile.id
                    ]
                }
            )
        );

    case types.UNJOIN_SESSION:
        log("unjoin", action);
        let filtered = Object.assign(
            {},
            state.filter(s => s.id === action.id).pop(),
            {
                members: state.filter(s => s.id === action.id).pop().members.filter(p => p !== action.profile.id)
            }
        );

        log("filtered session", filtered);
        return state.filter(s => s.id !== action.id).concat(filtered);

    case types.CHECKOUT_SESSION:
        return state.filter(s => s.id !== action.id).concat(
            Object.assign(
                {},
                state.filter(s => s.id === action.id).pop(),
                {
                    outchecker: action.profile.id
                }
            )
        );

    default:
        return state;
    }
}
