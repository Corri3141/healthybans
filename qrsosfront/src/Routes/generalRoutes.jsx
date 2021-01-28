import React from 'react';
import {
    BrowserRouter as Router,
    Switch,
    Route,
  } from "react-router-dom"
import UserDataFromUrl from "../pages/userFromUrl/index"

export default class GeneralRoutes extends React.Component{
    render(){
        return(
            <Router>         
                <Switch>
                    <Route path="/url" component={UserDataFromUrl} />
                </Switch>
            </Router>
        )
    }
}