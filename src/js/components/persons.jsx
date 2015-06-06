import React from "react";
import { alt } from "../alt";

export class Persons extends React.Component {
    constructor(props) {
        super(props);

        this.store = alt.getStore("PersonStore");
        this.state = this.store.getState();
    }

    storeDidUpdate() {
        this.setState(this.store.getState());
    }

    componentDidMount() {
        this.unlisten = this.store.listen(this.storeDidUpdate.bind(this));
    }

    componentWillUnmount() {
        this.unlisten();
    }

    getPersonsListItems() {
        return Object.keys(this.state.persons).
            map(email => this.state.persons[email]).
            sort((b, a) => a.updated - b.updated).
            map(p => <li key={p.email}>{p.balance} {p.email} {p.created} {p.updated}</li>);
    }

    render() {
        return <ul>{this.getPersonsListItems()}</ul>;
    }
}
