import React from "react";
import { Route, Redirect, RouteProps } from "react-router-dom";
import { useSelector } from "react-redux";

// import AppLoader from "layouts/AppLoader";
import { RootState } from "redux/reducers";

type Props = {
  component: React.ComponentType<RouteProps>;
};

const GuestRoute: React.FC<Props> = ({
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
        // if (user.loading || admin.loading || SManager.loading || Manager.loading) {
        //   return <AppLoader />;
        // } else if (admin.isAuthenticated && user.isAuthenticated && SManager.isAuthenticated && Manager.isAuthenticated) {
        //     return <Login />;
          if (user.isAuthenticated && user.getRole.keyRole === "user") {
          return <Redirect to='/user'/>;
        } else if (Manager.isAuthenticated && Manager.getRole.keyRole === "manager") {
          return <Redirect to='/event' />;
        } else if (SManager.isAuthenticated && SManager.getRole.keyRole === "smanager") {
          return <Redirect to='/smanager' />;
        } else if (admin.isAuthenticated && admin.getRole.keyRole === "admin") {
          return <Redirect to='/users' />;
        } else {
          return <Component {...props} />;
        }
      }}
      {...rest}
    />
  );
};

export default GuestRoute;
