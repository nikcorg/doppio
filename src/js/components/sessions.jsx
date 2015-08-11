import debug from "debug";
import React, { Component, PropTypes } from "react";

const log = debug("doppio:components:sessions");

export class Sessions extends Component {
    constructor(props) {
        super(props);
    }

    getSessionsAsListItems() {
        const { sessions, profiles, currentUser, onJoinSession, onUnjoinSession, onCancelSession } = this.props;
        const lookupName = id => profiles.find(p => p.id === id).name;

        const sessionAction = s => {
            if (!s.isMember) {
                return (
                    <button onClick={onJoinSession.bind(this, s.id)}>join</button>
                );
            } else if (!s.isHost) {
                return (
                    <button onClick={onUnjoinSession.bind(this, s.id)}>leave</button>
                );
            } else {
                return (
                    <button onClick={onCancelSession.bind(this, s.id)}>cancel</button>
                );
            }
        };

        const normalizeSession = s => {
            return {
                id: s.id,
                host: lookupName(s.host),
                members: s.members.map(lookupName),
                isHost: s.host === currentUser.id,
                isMember: s.members.some(m => m === currentUser.id)
            };
        };
        const renderSession = s => {
            return (
                <li key={s.id}>
                    {s.members.join(", ")} (Hosted by {s.host})
                    {sessionAction(s)}
                </li>
            );
        };

        return Object.keys(sessions).
            map(k => sessions[k]).
            map(normalizeSession).
            map(renderSession);
    }

    render() {
        log("props", this.props);

        return (
            <div className="sessions">
                <ul>{this.getSessionsAsListItems()}</ul>
                <button onClick={this.props.onCreateSession}>host session</button>
            </div>
        );
    }
}

Sessions.propTypes = {
    onCreateSession: PropTypes.func.isRequired,
    onJoinSession: PropTypes.func.isRequired,
    onUnjoinSession: PropTypes.func.isRequired,
    onCancelSession: PropTypes.func.isRequired,
    sessions: PropTypes.arrayOf(PropTypes.shape({
        id: PropTypes.string.isRequired,
        host: PropTypes.shape({
            email: PropTypes.string.isRequired,
            name: PropTypes.string.isRequired
        }).isRequired,
        members: PropTypes.arrayOf(PropTypes.shape({
            name: PropTypes.string.isRequired
        }))
    })).isRequired,
    profiles: PropTypes.arrayOf(PropTypes.shape({
        name: PropTypes.string.isRequired
    })).isRequired,
    currentUser: PropTypes.shape({
        id: PropTypes.string.isRequired
    })
};
