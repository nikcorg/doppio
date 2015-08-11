import debug from "debug";
import React, { Component } from "react";
import { connect } from "react-redux";
import { SignupForm } from "./signup-form";
import { Home } from "./home";
// import { Persons } from "./persons";
import { Sessions } from "./sessions";

import { signOut, signIn } from "../actions/current-user";
import { createProfile } from "../actions/profiles";
import { createSession, cancelSession, joinSession, unjoinSession } from "../actions/session";

const log = debug("doppio:components:app");

class AppView extends Component {
    constructor(props) {
        super(props);
    }

    anonymousView() {
        let dispatch = this.props.dispatch;
        return (
            <div>
                <SignupForm onSubmit={s => dispatch(createProfile(s))} />
                <hr />
                <ul>
                {
                    this.props.profiles.map(p => {
                        return (
                            <li id={p.id}>
                                <button onClick={() => dispatch(signIn(p))}>Sign in as <b>{p.name}</b></button>
                            </li>
                        );
                    })
                }
                </ul>
            </div>
        );
    }

    signedInView() {
        let { dispatch, currentUser } = this.props;

        return (
            <div>
            <Home currentUser={this.props.currentUser} onSignOut={() => dispatch(signOut()) }/>

            <hr />
                <h2>Sessions</h2>
                <Sessions
                    currentUser={this.props.currentUser}
                    sessions={this.props.sessions}
                    profiles={this.props.profiles}
                    onJoinSession={session => dispatch(joinSession(session, currentUser))}
                    onUnjoinSession={session => dispatch(unjoinSession(session, currentUser))}
                    onCreateSession={() => dispatch(createSession(currentUser))}
                    onCancelSession={id => dispatch(cancelSession(id))}
                />

            </div>
        );
    }

    render() {
        const { currentUser } = this.props;
        const isUserKnown = null != currentUser;

        return isUserKnown ? this.signedInView() : this.anonymousView();
    }
}

function select(state) {
    return Object.assign(
        {},
        state,
        {
            currentUser: null != state.currentUser ? state.profiles.find(u => u.id === state.currentUser.id) : null,
            sessions: state.sessions.filter(s => null == s.outchecker)
        }
    );
}

export default connect(select)(AppView);
