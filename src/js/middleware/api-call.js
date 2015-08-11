export const API_CALL = Symbol("API CALL");

let apiCall = () => next => action => {
    if ("undefined" === typeof action[API_CALL]) {
        return next(action);
    }

    let promise = action.promise;
    let [PENDING, SUCCESS, FAILURE] = action.types;

    next({
        type: PENDING
    });

    promise.then(
        r => next({ type: SUCCESS, payload: r }),
        e => next({ type: FAILURE, error: e })
    );
};

export default apiCall;
