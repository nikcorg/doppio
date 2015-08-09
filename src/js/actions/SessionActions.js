import { CREATE_SESSION, JOIN_SESSION, UNJOIN_SESSION, CHECKOUT_SESSION } from "../constants/ActionTypes";

export function createSession(host) {
    return {
        type: CREATE_SESSION,
        host
    };
}

export function joinSession(host, profile) {
    return {
        type: JOIN_SESSION,
        host,
        profile
    };
}

export function unjoinSession(host, profile) {
    return {
        type: UNJOIN_SESSION,
        host,
        profile
    };
}

export function checkoutSession(host, profile) {
    return {
        type: CHECKOUT_SESSION,
        host,
        profile
    };
}
