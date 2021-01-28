import React from 'react';
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Redirect,
  } from "react-router-dom"
import Login from "../pages/Login/index"
import CreateUser from "../pages/createUser/index"

export default class PublicRoutes extends React.Component{
    render(){
        return(
            <Router>         
                <Switch>
                    <Route path="/login" component={Login} />
                </Switch>
                <Switch>
                    <Route path="/create" component={CreateUser} />
                </Switch>
                <Redirect to="/login" />
            </Router>
        )
    }
}