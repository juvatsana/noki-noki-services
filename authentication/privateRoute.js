import React, {useEffect, userEffect,useSate } from "react";
import {Router,Redirect} from "react-router-dom";
import { AuthContext } from "./auth.js";

const PrivateRoute = ({component: RouteComponent,...rest}) => {

    const {currentUser} = useContext(AuthContext);
    return (
        <Route 
            {...rest} 
            render = {routePRops => !! currentUser?( <RouteComponent {... routeProps}/>) : (<Redirect to={"/home"}/>
            )}/>
    );
};

export default PrivateRoute;
