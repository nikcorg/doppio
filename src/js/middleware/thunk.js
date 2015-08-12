export let thunk = store => next => action => {
    const { dispatch, getState } = store;

    if ("function" !== typeof action) {
        return next(action);
    }

    return action(dispatch, getState);
};

export default thunk;
