import debug from "debug";
import * as types from "../constants/action-types";

const log = debug("doppio:reducers:session");

export function sessions(state = [], action) {
    switch (action.type) {
    case types.CREATE_SESSION:
        return [...state, {
            host: action.host,
            members: [action.host],
            outchecker: null
        }];

    case types.JOIN_SESSION:
        return state.filter((s) => s.host !== action.host).concat(
            Object.assign(
                {},
                state.filter((s) => s.host === action.host).pop(),
                {
                    members: [...state.filter((s) => s.host === action.host).pop().members, action.profile]
                }
            )
        );

    case types.UNJOIN_SESSION:
        return state.filter((s) => s.host !== action.host).concat(
            Object.assign(
                {},
                Object.assign(
                    {},
                    state.filter((s) => s.host === action.host).pop(),
                    {
                        members: state.
                            filter((s) => s.host === action.host).
                            pop().
                            members.
                            filter((p) => p !== action.profile)
                    }
                )
            )
        );

    case types.CHECKOUT_SESSION:
        return state.filter((s) => s.host !== action.host).concat(
            Object.assign(
                {},
                state.filter((s) => s.host === action.host).pop(),
                {
                    outchecker: action.profile
                }
            )
        );

    default:
        return state;
    }
}
