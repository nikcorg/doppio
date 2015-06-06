import debug from "debug";
import React from "react";
import { alt } from "../alt";

const log = debug("doppio:signup-form");

export class SignupForm extends React.Component {
    constructor(props) {
        super(props);
        this.state = { email: "" };
    }

    onComponentWillMount() {
        this.unlisten = alt.getStore("PersonStore").listen(_ => log("store event", _));
    }

    onComponentWillUnmount() {
        this.unlisten();
    }

    onFormSubmitted(evt) {
        const { updatePerson } = alt.getActions("PersonActions");

        evt.preventDefault();

        log("form submitted", this.state);

        try {
            updatePerson(this.state);

            const current = alt.getStore("PersonStore").getState().persons[this.state.email];

            alt.getActions("CurrentUserActions").setCurrent(current);
        } catch (err) {
            debug("update failed", err);
        }
    }

    onEmailChanged(evt) {
        this.setState({ email: evt.target.value });

        log("email changed", evt.target.value);
    }

    render() {
        return (
            <form action="/sign-up" method="post" onSubmit={this.onFormSubmitted.bind(this)}>
                <p>Sign up with your e-mail.</p>
                <p><label><span>Your e-mail</span>
                <input
                    ref="email"
                    onChange={this.onEmailChanged.bind(this)}
                    type="email"
                    name="email"
                    placeholder="email@example.com"
                    autoFocus
                    required
                /></label></p>
                <p><button type="submit">Sign up!</button></p>
            </form>
        );
    }
}
