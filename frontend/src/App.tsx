import React from "react";
import { BrowserRouter } from "react-router-dom";
import { useDispatch } from "react-redux";
import { styled } from '@mui/material/styles';

// import AppHeader from "layouts/navigation/AppHeader";
import SideBar from "layouts/navigation/sidebar";
import HeaderHome from "pages/homepage/HeaderHome";


import Alert from "layouts/alert/Alert";
import Routes from "components/routing/Routes";

import { setAdminAuthToken, setManagerAuthToken, setSManagerAuthToken, setUserAuthToken } from "utils/headers";
import { loadUser } from "redux/actions/user";
import { loadManager } from "redux/actions/Manager";
import { loadSManager } from "redux/actions/sManager";
import { loadAdmin } from "redux/actions/admin";

if (localStorage.admin__token) setAdminAuthToken(localStorage.admin__token);
if (localStorage.Manager__token) setManagerAuthToken(localStorage.Manager__token);
if (localStorage.SManager__token) setSManagerAuthToken(localStorage.SManager__token);
if (localStorage.user__token) setUserAuthToken(localStorage.user__token);

const StyledRoot = styled('div')({
  display: 'flex',
  minHeight: '100%',
});


const APP_BAR_MOBILE = 64;
const APP_BAR_DESKTOP = 92;

const Main = styled('div')(({ theme }) => ({
  flexGrow: 2,
  // marginLeft: 270,
  minHeight: '100%',
  paddingTop: APP_BAR_MOBILE + 24,
  paddingBottom: theme.spacing(10),
  [theme.breakpoints.up('lg')]: {
    paddingTop: APP_BAR_DESKTOP + 24,
    paddingLeft: theme.spacing(2),
    paddingRight: theme.spacing(2),
  },
}));

const App: React.FC = (): JSX.Element => {
  const dispatch = useDispatch();

  React.useEffect(() => dispatch<any>(loadUser()), [dispatch]);
  React.useEffect(() => dispatch<any>(loadManager()), [dispatch]);
  React.useEffect(() => dispatch<any>(loadSManager()), [dispatch]);
  React.useEffect(() => dispatch<any>(loadAdmin()), [dispatch]);

  return (
    <BrowserRouter>
      <>
        <StyledRoot>
          {/* <AppHeader/> */}
          <Alert />
          <SideBar />
          <HeaderHome />

          <Main >

            <Routes />
          </Main>

        </StyledRoot>

      </>
    </BrowserRouter>
  );
};

export default App;
