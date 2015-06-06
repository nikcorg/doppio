import { alt } from "../alt";
import debug from "debug";
const log = debug("doppio:actions/session");

log("initialize");

class SessionActions {
    fetchSessions() {
        let updateSessions = this.actions.updateSessions;

        // Dispatch right away to set fetching state
        this.dispatch();

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

            // How should the error (or should it?) be communicated to the app
            // state? Perhaps a possibly-out-of-sync state is needed
            updateSessions({});
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
