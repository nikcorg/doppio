import React from "react";
import { alt } from "../alt";

export class Home extends React.Component {
    signOut(evt) {
        evt.preventDefault();
        evt.stopPropagation();

        alt.getActions("CurrentUserActions").resetCurrent();
    }

    render() {
        const currentUser = alt.getStore("CurrentUser").getState().currentUser;
        const persons = alt.getStore("PersonStore").getState().persons;
        const balance = persons[currentUser].balance;

        return (
            <div>
                <p>Welcome back, {currentUser}!</p>
                <p>Your current balance is {balance}</p>
                <p><button type="button" onClick={this.signOut.bind(this)}>Log out</button></p>
            </div>
        );
    }
}
