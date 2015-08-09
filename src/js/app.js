/* fubar */
import debug from "debug";
import React from "react";

import { RootComponent } from "./components/root";
import { getStore } from "./stores/doppio";

const log = debug("doppio:app");
const LS_KEY = "LS_DOPPIO";

function createStore(f) {
    const snapshot = JSON.parse(localStorage.getItem(LS_KEY));

    if (null != snapshot) {
        log("restore snapshot");
        return f(snapshot);
    }

    log("clean boot");
    return f();
}

function serializeStore(state) {
    const snapshot = JSON.stringify(state);
    localStorage.setItem(LS_KEY, snapshot);
    log("stored snapshot");
}

export function start() {
    log("starting");

    let doppio = createStore(getStore);
    let unsub = doppio.subscribe(() => serializeStore(doppio.getState()));

    log("first render");

    React.render(React.createElement(RootComponent, { store: doppio }), document.querySelector("main"));
}
