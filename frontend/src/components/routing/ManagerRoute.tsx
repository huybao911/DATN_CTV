import React from "react";
import { Route, Redirect, RouteProps } from "react-router-dom";
import { useSelector } from "react-redux";

import AppLoader from "layouts/AppLoader";
import { RootState } from "redux/reducers";

type Props = {
  component: React.ComponentType<RouteProps>;
};

const ManagerRoute: React.FC<Props> = ({
  component: Component,
  ...rest
}): JSX.Element => {
  const user = useSelector((state: RootState) => state.user);
  const SManager = useSelector((state: RootState) => state.smanager);
  const Manager = useSelector((state: RootState) => state.manager);
  const admin = useSelector((state: RootState) => state.admin);

  return (
    <Route
      render={(props) => {
        if (Manager.loading) {
          return <AppLoader />;
        }
        if (!Manager.isAuthenticated) {
          return <Redirect to='/login' />;
        }
        if (user.isAuthenticated && user.getRole.keyRole === "user") {
          return <Redirect to='/user' />;
        }
        if (SManager.isAuthenticated && SManager.getRole.keyRole === "smanager") {
          return <Redirect to='/smanager'/>;
        }
        if (admin.isAuthenticated && admin.getRole.keyRole === "admin") {
          return <Redirect to='/users' />;
        }
        if (Manager.isAuthenticated && Manager.getRole.keyRole === "manager") {
          return <Component {...props} />;
        }
      }}
      {...rest}
    />
  );
};

export default ManagerRoute;
