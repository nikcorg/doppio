import React from "react";

import { alt } from "../alt";
import { SignupForm } from "./signup-form";
import { Home } from "./home";
import { Persons } from "./persons";
import { Sessions } from "./sessions";

export class AppView extends React.Component {
    constructor(props) {
        super(props);
        this.store = alt.getStore("CurrentUser");
        this.state = this.store.getState();
    }

    componentDidMount() {
        function updateState() {
            this.setState(this.store.getState());
        }

        this.unlisten = this.store.listen(updateState.bind(this));
    }

    componentWillUnmount() {
        this.unlisten();
    }

    anonymousView() {
        return <SignupForm/>;
    }

    signedInView() {
        return (
            <div>
            <Home/>

            <hr />
                <h2>Sessions</h2>
                <Sessions />
            <hr />
                <h2>Persons</h2>
                <Persons />
            </div>
        );
    }

    render() {
        const state = this.state;
        const isUserKnown = null != state.currentUser;

        return isUserKnown ? this.signedInView() : this.anonymousView();
    }
}

export default AppView;
