import { alt } from "../alt";
import CurrentUserActions from "../actions/current-user";
import PersonStore from "./person";

import debug from "debug";

const log = debug("doppio:stores/current-user");

log("initialize");

class CurrentUserStore {
    constructor() {
        this.bindListeners({
            setCurrent: CurrentUserActions.setCurrent,
            resetCurrent: CurrentUserActions.resetCurrent
        });

        this.exportPublicMethods({
            getCurrentUser: this.getCurrentUser
        });

        this.currentUser = null;
    }

    getCurrentUser() {
        const currentUser = this.getState().currentUser;
        const persons = PersonStore.getState().persons;

        if (null == currentUser || null == persons[currentUser]) {
            throw new Error("User not logged in or unknown person");
        }

        return persons[currentUser];
    }

    setCurrent({ email }) {
        this.waitFor(PersonStore);

        const persons = PersonStore.getState().persons;

        if (null == persons[email]) {
            throw new Error("Unable to log in unknown user");
        }

        this.setState({ currentUser: email });
    }

    resetCurrent() {
        this.setState({ currentUser: null });
    }
}

export const store = alt.createStore(CurrentUserStore, "CurrentUser");
export default store;
