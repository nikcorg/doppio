import { alt } from "../alt";
import debug from "debug";
const log = debug("doppio:actions/session");

log("initialize");

class SessionActions {
    fetchSessions() {
        let updateSessions = this.actions.updateSessions;

        fetch("/api/sessions").
        then(function (res) {
            if (200 !== res.status) {
                throw new Error("Server returned " + res.status);
            }

            return res.json();
        }).
        then(function (sessions) {
            updateSessions(sessions);
        }).
        catch(function (err) {
            log("error fetching sessions", err.stack || err.message);
        });
    }

    updateSessions(sessions) {
        this.dispatch(sessions);
    }

    createSession({ email }) {
        // unique id for session is required


        this.dispatch({ email });
    }

    joinSession({ id, email }) {


        this.dispatch({ id, email });
    }
}

export const actions = alt.createActions(SessionActions);
export default actions;
