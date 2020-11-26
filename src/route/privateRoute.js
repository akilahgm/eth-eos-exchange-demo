import React from "react";
import { Route, Redirect } from "react-router-dom";
import firebase from "../config/firebase";
import { getCurrentUser } from "../services/userService";

const PrivateRoute = (props) => {
    var user = getCurrentUser()
    console.log("Private route check user", user);
    const condition =  user?true:false;
    return condition ? (
      <Route
        path={props.path}
        exact={props.exact}
        component={props.component}
      />
    ) : (
      <Redirect to="/login" />
    );
//   });
};
export default PrivateRoute;
