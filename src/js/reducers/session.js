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
                state.find(s => s.id === action.id),
                {
                    members: state.find(s => s.id === action.id).members.concat(action.profile.id)
                }
            )
        );

    case types.UNJOIN_SESSION:
        let session = state.find(s => s.id === action.id);
        let filtered = Object.assign(
            {},
            session,
            {
                members: session.members.filter(p => p !== action.profile.id)
            }
        );

        return state.filter(s => s.id !== action.id).concat(filtered);

    case types.CHECKOUT_SESSION:
        return state.filter(s => s.id !== action.id).concat(
            Object.assign(
                {},
                state.find(s => s.id === action.id),
                {
                    outchecker: action.profile.id
                }
            )
        );

    default:
        return state;
    }
}
