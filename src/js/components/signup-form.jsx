import debug from "debug";
import React, { Component, PropTypes } from "react";

const log = debug("doppio:components:signup-form");

export class SignupForm extends Component {
    constructor(props) {
        super(props);
    }

    onFormSubmitted(evt) {
        evt.preventDefault();

        log("form submitted", this.state);

        this.props.onSubmit(this.state);
    }

    onEmailChanged(evt) {
        this.setState({ email: evt.target.value });
    }

    onNameChanged(evt) {
        this.setState({ name: evt.target.value });
    }

    render() {
        log("props", this.props);

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

                <p><label><span>Your name</span>
                <input
                    ref="name"
                    onChange={this.onNameChanged.bind(this)}
                    type="text"
                    name="text"
                    placeholder="John Doe"
                    required
                /></label></p>
                <p><button type="submit">Sign up!</button></p>
            </form>
        );
    }
}

SignupForm.propTypes = {
    onSubmit: PropTypes.func.isRequired
};
