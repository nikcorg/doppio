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
        const sync = "pending";

        // A unique id for session is required. As we can probably create that
        // realiably in the client with a prefix (email is a unique property)
        // we don't need to wait for the server to sync. But we need to keep
        // track of whether the session is eventually synced, as otherwise it
        // will be client-local and thus useless

        this.dispatch({ email, sync });

        // TODO: start server-sync (?)
    }

    joinSession({ id, email }) {


        this.dispatch({ id, email });
    }
}

export const actions = alt.createActions(SessionActions);
export default actions;
