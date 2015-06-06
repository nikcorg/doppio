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

    getSessionsAsListItems() {
        const sessions = this.state.sessions;

        return Object.keys(sessions).
            map(k => sessions[k]).
            filter(s => s.isOpen).
            map(s => <li key="s.id">{s.createdBy} <button>join this session</button></li>);
    }

    render() {
        if (this.state.fetching) {
            return <div><p>Syncing, please hold...</p></div>;
        }

        return (
            <div>
                <ul>{this.getSessionsAsListItems()}</ul>
                <button>create session</button>
            </div>
        );
    }
}
