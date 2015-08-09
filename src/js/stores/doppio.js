import debug from "debug";
import { combineReducers, createStore, applyMiddleware } from "redux";
import { sessions } from "../reducers/session";
import { profile } from "../reducers/profile";

const log = debug("doppio:stores:doppio");

let initialState = {
    sessions: [],
    profile: null
};

let logger = store => next => action => {
    log("dispatching", action);
    return next(action);
};

let doppioApp = combineReducers({ sessions, profile });

export function getStore(state = initialState) {
    return applyMiddleware(logger)(createStore)(doppioApp, state);
}
