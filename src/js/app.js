/* fubar */
import debug from "debug";
import React from "react";

import App from "./components/app";

import { alt } from "./alt";

import "./stores/person";
import "./stores/session";
import "./stores/current-user";

const log = debug("doppio:app");

function bootstrapStores() {
    const storesData = localStorage.getItem("__stores");

    if (null != storesData) {
        log("boostrapping stores", storesData);
        alt.bootstrap(storesData);
    }
}

function serializeStores() {
    const snapshot = alt.takeSnapshot();

    clearTimeout(serializeStores.__timer);

    serializeStores.__timer = setTimeout(function () {
        log("storing snapshot", typeof snapshot, snapshot);
        localStorage.setItem("__stores", snapshot);
    }, 200);
}

export function start() {
    log("starting");

    bootstrapStores();

    // Bind serializer for all changes to stores
    Object.keys(alt.stores).
        map(alt.getStore.bind(alt)).
        forEach(store => store.listen(serializeStores));

    // Fetch state for sessions currently accepting joins
    alt.getActions("SessionActions").fetchSessions();

    React.render(React.createElement(App, null), document.querySelector("main"));
}
