import React from "react";
import { alt } from "../alt";

export class Sessions extends React.Component {
    constructor(props) {
        super(props);

        this.store = alt.getStore("SessionStore");
        this.state = this.store.getState();
    }

    componentDidMount() {
        function updateState() {
            this.setState(this.store.getState());
        }

        this.unlisten = this.store.listen(updateState.bind(this));
    }

    componentWillUnount() {
        this.unlisten();
    }

    onJoinSession(id) {
        const sessions = this.store.getState().sessions;
        const session = sessions.filter(s => s.id === id).shift();

        if (null == session) {
            throw new Error("Invalid session id");
        }
    }

    onCreateSession() {
        const currentUser = alt.getStore("CurrentUser").getCurrentUser();
        const createSession = alt.getActions("SessionActions").createSession;

        createSession(currentUser);
    }

    getSessionsAsListItems() {
        const sessions = this.state.sessions;

        return Object.keys(sessions).
            map(k => sessions[k]).
            filter(s => s.isOpen).
            map((s, idx) => <li key={s.createdBy + "-" + idx} className={"sync-" + s.sync}>
                {s.createdBy}
                <button onClick={this.onJoinSession.bind(this, s.id)}>join this session</button>
                </li>
            );
    }

    render() {
        if (this.state.fetching) {
            return <div><p>Syncing, please hold...</p></div>;
        }

        return (
            <div className="sessions">
                <ul>{this.getSessionsAsListItems()}</ul>
                <button onClick={this.onCreateSession.bind(this)}>create session</button>
            </div>
        );
    }
}
