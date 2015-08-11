import { SIGN_IN, SIGN_OUT } from "../constants/action-types";

export function signOut() {
    return { type: SIGN_OUT };
}

export function signIn(props) {
    return Object.assign({ type: SIGN_IN }, props);
}
