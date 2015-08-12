import debug from "debug";
import uuid from "node-uuid";
import Promise from "bluebird";
import { CREATE_PROFILE, CREATE_PROFILE_REQUEST, CREATE_PROFILE_SUCCESS, CREATE_PROFILE_FAILURE } from "../constants/action-types";
import { API_CALL } from "../middleware/api-call";

const log = debug("doppio:actions:profiles");

export function createProfile(props) {
    return (dispatch, getState) => {
        if (null != getState().profiles.find(p => p.email === props.email)) {
            throw new Error("Profile already exists");
        }

        dispatch({
            type: CREATE_PROFILE,
            [API_CALL]: true,
            types: [CREATE_PROFILE_REQUEST, CREATE_PROFILE_SUCCESS, CREATE_PROFILE_FAILURE],
            promise: new Promise(function (resolve) {
                setTimeout(() => {
                    resolve(Object.assign({ type: CREATE_PROFILE }, { id: uuid(), balance: 0 }, props));
                }, 1500);
            })
        });
    };
}
