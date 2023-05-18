import React from "react";
import { Route, Switch } from "react-router-dom";
import * as UUID from "uuid"

import AdminRoute from "./AdminRoute";
import SManagerRoute from "./SManagerRoute";
import ManagerRoute from "./ManagerRoute";
import PrivateRoute from "./PrivateRoute";
import GuestRoute from "./GuestRoute";

import RoutesProps from "constant/routesProps";

const Routes: React.FC = (): JSX.Element => {
  const renderRoutes = RoutesProps?.map((routeProp) => {
    if (!routeProp.auth && routeProp.keyRole === "guest") {
      return <GuestRoute {...routeProp} key={`guest__route__${UUID.v4()}`} />;
    }
    if (routeProp.auth && routeProp.keyRole === "user") {
      return <PrivateRoute {...routeProp} key={`private__route__${UUID.v4()}`} />;
    }
    if (routeProp.auth && routeProp.keyRole === "smanager") {
      return <SManagerRoute {...routeProp} key={`SManager__route__${UUID.v4()}`} />;
    }
    if (routeProp.auth && routeProp.keyRole === "manager") {
      return <ManagerRoute {...routeProp} key={`Manager__route__${UUID.v4()}`} />;
    }
    if (routeProp.auth && routeProp.keyRole === "admin") {
      return <AdminRoute {...routeProp} key={`admin__route__${UUID.v4()}`} />;
    }
    return <Route {...routeProp} key={`notfound__route__${UUID.v4()}`} />;
  });

  return <Switch>{renderRoutes}</Switch>;
};

export default Routes;
