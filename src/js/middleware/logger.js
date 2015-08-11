import debug from "debug";

const log = debug("doppio:middleware:logger");

let logger = () => next => action => {
    log("dispatching", action);

    return next(action);
};

export default logger;
