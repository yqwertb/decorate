import React from "react";
import './style/App.css';

export default class App extends React.Component {
    constructor(props) {
        super(props);

    }

    render() {
        return (
            <div className="App">
                {this.props.children}
            </div>
        );
    }

}
