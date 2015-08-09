import debug from "debug";
import React, { Component } from "react";

const log = debug("doppio:components:persons");

export class Persons extends Component {
    constructor(props) {
        super(props);
    }

    getPersonsListItems() {
        return Object.keys(this.state.persons).
            map(email => this.state.persons[email]).
            sort((b, a) => a.updated - b.updated).
            map(p => <li key={p.email}>{p.balance} {p.email} {p.created} {p.updated}</li>);
    }

    render() {
        log("props", this.props);

        return <ul>{this.getPersonsListItems()}</ul>;
    }
}
