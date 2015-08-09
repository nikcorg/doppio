import debug from "debug";
import React, { Component, PropTypes } from "react";

const log = debug("doppio:components:sessions");

export class Sessions extends Component {
    constructor(props) {
        super(props);
    }

    getSessionsAsListItems() {
        const sessions = this.props.sessions;

        return Object.keys(sessions).
            map(k => sessions[k]).
            filter(s => null == s.outchecker).
            map((s, idx) => <li key={s.host.name + "-" + idx}>
                {s.members.map(m => m.name).join(", ")} (Hosted by {s.host.name})
                <button onClick={this.props.onJoinSession.bind(this, s.host)}>join this session</button>
                </li>
            );
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
    sessions: PropTypes.arrayOf(PropTypes.shape({
        host: PropTypes.shape({
            email: PropTypes.string.isRequired,
            name: PropTypes.string.isRequired
        }).isRequired,
        members: PropTypes.arrayOf(PropTypes.shape({
            name: PropTypes.string.isRequired
        }))
    })).isRequired
};
