import { combineReducers, createStore } from "redux";
import { sessions } from "../reducers/session";
import { profile } from "../reducers/profile";

let initialState = {
    sessions: [],
    profile: null
};

let doppioApp = combineReducers({ sessions, profile });

export function getStore(state = initialState) {
    return createStore(doppioApp, state);
}
