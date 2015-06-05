import { alt } from "../alt";
import SessionActions from "../actions/session";
import debug from "debug";
const log = debug("doppio:stores/session");

log("initialize");

class SessionStore {
    constructor() {
        this.bindListeners({
            createSession: SessionActions.createSession,
            joinSession: SessionActions.joinSession
        });

        this.sessions = {};
    }

    createSession({ email }) {
        const sessions = this.sessions;
        let id = Date.now() + "-" + Math.round(Math.random() * 9999);

        sessions[id] = {
            createdBy: email,
            participants: [email],
            payer: null,
            isOpen: true
        };

        this.setState({ sessions });
    }

    joinSession({ id, email }) {
        const sessions = this.sessions;

        if (null == sessions[id]) {
            throw new Error("Invalid session id");
        }
        else if (-1 < sessions[id].participants.indexOf(email)) {
            throw new Error("Already a participant");
        }

        sessions[id].participants.push(email);

        this.setState({ sessions });
    }
}

export const store = alt.createStore(SessionStore, "SessionStore");
export default store;
