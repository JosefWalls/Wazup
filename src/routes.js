import React from "react";
import {Switch, Route} from "react-router-dom";

import LoginSignUp from "./Components/LoginSignUp";


export default (
    <Switch>
        <Route exact path="/" component={LoginSignUp}/>
    </Switch>
)