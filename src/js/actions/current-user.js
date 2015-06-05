import { alt } from "../alt";
import debug from "debug";

const log = debug("doppio:actions/current-user");

log("initialize");

class CurrentUserActions {
    setCurrent({ email }) {
        this.dispatch({ email });
    }

    resetCurrent() {
        this.dispatch();
    }
}

export const actions = alt.createActions(CurrentUserActions);
export default actions;
