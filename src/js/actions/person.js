import { alt } from "../alt";
import debug from "debug";
const log = debug("doppio:actions/person");

log("initialize");

class PersonActions {
    updatePerson({ email }) {
        this.dispatch({ email });
    }
}

export const actions = alt.createActions(PersonActions);
export default actions;
