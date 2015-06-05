import debug from "debug";
import * as app from "./app";

const debugMask = process.env.DEBUG;

if ("production" !== process.env.NODE_ENV) {
    debug.enable(void 0 == debugMask ? "*" : debugMask);
} else {
    debug.disable();
}

function startApp() {
    app.start();
}

function domready(callback) {
    if ("undefined" === typeof document) {
        throw new Error("main.js should only run in a browser enviroment");
    }

    if (/interactive|complete/.test(document.readyState)) {
        callback();
    } else {
        document.addEventListener("DOMContentLoaded", callback);
    }
}

domready(startApp);
