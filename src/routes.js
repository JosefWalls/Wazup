import React from "react";
import {Switch, Route} from "react-router-dom";

import LoginSignUp from "./Components/LoginSignUp";
import Chat from "./Components/Chat";
import Search from "./Components/Search";


export default (
    <Switch>
        <Route exact path="/" component={LoginSignUp}/>
        <Route exact path="/Chat/:UserId" component={Chat}/>
        <Route exact path="/Search" component={Search}/>
    </Switch>
)