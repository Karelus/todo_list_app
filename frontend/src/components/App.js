import React, { Component } from "react";
import { render } from "react-dom";
import HomePage from './HomePage';
import TodoPage from './TodoPage';
import UpdatePage from './UpdatePage';
import {
    BrowserRouter as Router, Switch,
    Route
} from "react-router-dom";


export default class App extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <Router>
                <Switch>
                    <Route exact path="/" component={TodoPage}></Route>
                    <Route path="/home" component={HomePage}></Route>
                    <Route path="/todos" component={TodoPage}></Route>
                    <Route path="/update/:id" component={UpdatePage}></Route>
                </Switch>
            </Router>
        )
    }
}

const appDiv = document.getElementById("app");
render(<App />, appDiv);