import debug from "debug";
import React, { Component } from "react";
import { connect } from "react-redux";
import { SignupForm } from "./signup-form";
import { Home } from "./home";
// import { Persons } from "./persons";
import { Sessions } from "./sessions";

import { createProfile, clearProfile } from "../actions/profile";
import { createSession, joinSession } from "../actions/session";

const log = debug("doppio:components:app");

class AppView extends Component {
    constructor(props) {
        super(props);
    }

    anonymousView() {
        let dispatch = this.props.dispatch;
        return <SignupForm onSubmit={s => dispatch(createProfile(s))} />;
    }

    signedInView() {
        let { dispatch, profile } = this.props;

        function dispatchCP() {
            log("clear profile");
            dispatch(clearProfile());
        }

        return (
            <div>
            <Home currentUser={this.props.profile} onSignOut={dispatchCP}/>

            <hr />
                <h2>Sessions</h2>
                <Sessions
                    sessions={this.props.sessions}
                    onJoinSession={(h) => dispatch(joinSession(h, profile))}
                    onCreateSession={() => dispatch(createSession(profile))}
                />

            </div>
        );
    }

    render() {
        log("props", this.props);

        const { profile } = this.props;
        const isUserKnown = null != profile;

        return isUserKnown ? this.signedInView() : this.anonymousView();
    }
}

function select(state) {
    return state;
}

export default connect(select)(AppView);
