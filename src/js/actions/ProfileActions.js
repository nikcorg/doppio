import { CREATE_PROFILE, CLEAR_PROFILE } from "../constants/ActionTypes";

export function createProfile(props) {
    return Object.assign({ type: CREATE_PROFILE }, props);
}

export function clearProfile() {
    return { type: CLEAR_PROFILE };
}
