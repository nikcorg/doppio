import uuid from "node-uuid";
import { CREATE_SESSION, CANCEL_SESSION, JOIN_SESSION, UNJOIN_SESSION, CHECKOUT_SESSION } from "../constants/action-types";

export function createSession(host) {
    return {
        type: CREATE_SESSION,
        id: uuid(),
        host
    };
}

export function joinSession(id, profile) {
    return {
        type: JOIN_SESSION,
        id,
        profile
    };
}

export function unjoinSession(id, profile) {
    return {
        type: UNJOIN_SESSION,
        id,
        profile
    };
}

export function cancelSession(id) {
    return {
        type: CANCEL_SESSION,
        id
    };
}

export function checkoutSession(id, profile) {
    return {
        type: CHECKOUT_SESSION,
        id,
        profile
    };
}
