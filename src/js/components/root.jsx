import { default as debug } from "debug";
import React, { Component } from "react";
import { Provider } from "react-redux";
import App from "./app";

const log = debug("doppio:components:root");

export class RootComponent extends Component {
    render() {
        log("store", this.props.store);

        return (
            <Provider store={this.props.store}>
                {() => <App />}
            </Provider>
        );
    }
}
