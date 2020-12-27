import React from 'react';
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link
  } from "react-router-dom"
import UserEditor from "../pages/userMutator/index"
import UserData from "../containers/User/index"

export default class Routes extends React.Component{
    render(){
        return(
            <Router>
                <Switch>
                    <Route path="/edit" component={UserEditor} />
                </Switch>
                <Switch>
                    <Route path="/userData" component={UserData} />
                </Switch>
            </Router>
        )
    }
}