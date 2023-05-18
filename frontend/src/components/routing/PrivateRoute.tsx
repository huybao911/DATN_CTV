import React from "react";
import { Route, Redirect, RouteProps } from "react-router-dom";
import { useSelector } from "react-redux";
import AppLoader from "layouts/AppLoader";
import { RootState } from "redux/reducers";

type Props = {
  component: React.ComponentType<RouteProps>;
};

const PrivateRoute: React.FC<Props> = ({
  component: Component,
  ...rest
}): JSX.Element => {
  const user = useSelector((state: RootState) => state.user);
  const Manager = useSelector((state: RootState) => state.manager);
  const SManager = useSelector((state: RootState) => state.smanager);
  const admin = useSelector((state: RootState) => state.admin);

  return (
    <Route
      render={(props) => {
        if (user.loading) {
          return <AppLoader />;
        }
        if (!user.isAuthenticated) {
          return <Redirect to='/' />;
        }
        if (admin.isAuthenticated && admin.getRole.keyRole === "admin") {
          return <Redirect to='/users' />;
        }
        if (SManager.isAuthenticated && SManager.getRole.keyRole === "smanager") {
          return <Redirect to='/smanager' />;
        }
        if (Manager.isAuthenticated && Manager.getRole.keyRole === "manager") {
          return <Redirect to='/event' />;
        }
        if (user.isAuthenticated && user.getRole.keyRole === "user") {
          return <Component {...props} />;
        }
      }}
      {...rest}
    />
  );
};

export default PrivateRoute;
