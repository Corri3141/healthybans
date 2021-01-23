import React from 'react';
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Redirect
  } from "react-router-dom"
import UserEditor from "../pages/userMutator/index"
import UserData from "../containers/User/index"
import Navbar from "../pages/navbar/index"
import Home from "../pages/home/index"
import Login from "../pages/Login/index"

export default class Routes extends React.Component{
    render(){
        return(
            <Router>
                <Switch>
                    <Route path="/home" component={Home} />
                </Switch>
                <Redirect to="/home" />
                <Switch>
                    <Route path="/" component={Navbar} />
                </Switch>
                <Switch>
                    <Route path="/edit" component={UserEditor} />
                </Switch>
                <Switch>
                    <Route path="/profile" component={UserData} />
                </Switch>
                <Switch>
                    <Route path="/login" component={Login} />
                </Switch>
            </Router>
        )
    }
}