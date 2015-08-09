import debug from "debug";
import React, { Component, PropTypes } from "react";

const log = debug("doppio:components:home");

export class Home extends Component {
    signOut(evt) {
        evt.preventDefault();
        evt.stopPropagation();
    }

    render() {
        const currentUser = this.props.currentUser;

        log("props", this.props);

        return (
            <div>
                <p>Welcome back, {currentUser.name}!</p>
                <p>Your current balance is {currentUser.balance}</p>
                <p><button type="button" onClick={this.props.onSignOut}>Log out</button></p>
            </div>
        );
    }
}

Home.propTypes = {
    currentUser: PropTypes.shape({
        name: PropTypes.string.isRequired,
        balance: PropTypes.number.isRequired,
        email: PropTypes.string
    }).isRequired,
    onSignOut: PropTypes.func.isRequired
};
