import debug from "debug";
import { combineReducers, createStore, applyMiddleware } from "redux";
import { sessions } from "../reducers/session";
import { profiles } from "../reducers/profiles";
import { currentUser } from "../reducers/current-user";
import { logger, thunk, apiCall } from "../middleware";

const log = debug("doppio:stores:doppio");

let initialState = {
    sessions: [],
    profiles: [],
    currentUser: null
};

let doppioApp = combineReducers({ sessions, profiles, currentUser });

export function getStore(state = initialState) {
    return applyMiddleware(logger, thunk, apiCall)(createStore)(doppioApp, state);
}
