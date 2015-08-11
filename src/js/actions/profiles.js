import uuid from "node-uuid";
import { CREATE_PROFILE } from "../constants/action-types";

export function createProfile(props) {
    return Object.assign({ type: CREATE_PROFILE }, { id: uuid(), balance: 0 }, props);
}
