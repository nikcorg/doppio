import { CREATE_PROFILE, CLEAR_PROFILE } from "../constants/action-types";

export function createProfile(props) {
    return Object.assign({ type: CREATE_PROFILE }, props);
}

export function clearProfile() {
    return { type: CLEAR_PROFILE };
}
