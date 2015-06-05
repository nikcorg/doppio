import { alt } from "../alt";
import PersonActions from "../actions/person";
import CurrentUserStore from "./current-user";

import debug from "debug";

const log = debug("doppio:stores/person");

log("initialize");

class PersonStore {
    constructor() {
        this.bindListeners({
            updatePerson: PersonActions.updatePerson
        });

        this.persons = {};
    }

    createPerson({ email }) {
        const persons = this.persons;
        const created = Date.now();
        const updated = created;
        const balance = 0;

        persons[email] = { email, created, updated, balance };

        this.setState({ persons });
    }

    updatePerson({ email, balanceAdjust = 0 }) {
        const persons = this.persons;
        const updated = Date.now();

        if (null == persons[email]) {
            return this.createPerson({ email });
        }

        this.waitFor(CurrentUserStore);

        const currentUser = CurrentUserStore.getState().currentUser;

        if (null == currentUser || email !== currentUser) {
            throw new Error("An existing user can only be updated after logging in");
        }

        persons[email] = { email, updated, balance: persons[email].balance + balanceAdjust };

        this.setState({ persons });
    }
}

export const store = alt.createStore(PersonStore, "PersonStore");
export default store;
