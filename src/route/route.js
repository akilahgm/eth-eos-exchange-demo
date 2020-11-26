/* eslint-disable import/no-named-as-default */
import { Route, Switch,BrowserRouter } from "react-router-dom";
import NotFoundPage from "../pages/notFoundPage";
import PropTypes from "prop-types";
import React from "react";
import Login from '../pages/login'
import PrivateRoute from './privateRoute'
import Main from '../pages/main'
import SignUp from '../pages/signup'
import history from './history';

class RouteModule extends React.Component {
  render() {
    return (
      <div>
          <BrowserRouter history={history}>
        <Switch>
          <PrivateRoute exact path="/" component={Main} />
          <Route exact path="/login" component={Login} />
          <Route exact path="/signup" component={SignUp} />
          <Route component={NotFoundPage} />
        </Switch>
        </BrowserRouter>
      </div>
    );
  }
}

RouteModule.propTypes = {
  children: PropTypes.element
};

export default RouteModule;
