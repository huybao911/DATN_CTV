import React from "react";
import { useSelector } from "react-redux";
import { styled } from '@mui/material/styles';

import { RootState } from "redux/reducers";
import { AppBar, Box, Toolbar } from '@mui/material';


const NAV_WIDTH = 230;

const StyledRoot = styled(AppBar)(() => ({
  boxShadow: 'none',
  width: `calc(100% - ${NAV_WIDTH + 1}px)`,
  backgroundColor: 'white',
  alignItems: 'center',
  fontWeight: 'bold',
  display: 'flex',
  justifyContent: 'center'
}));

const AppHeader: React.FC = (): JSX.Element => {

  const smanager = useSelector((state: RootState) => state.smanager);
  const manager = useSelector((state: RootState) => state.manager);
  const admin = useSelector((state: RootState) => state.admin);

  const header = admin.isAuthenticated || smanager.isAuthenticated || manager.isAuthenticated ? (
    <StyledRoot style={{ boxShadow: "none"}} >
      <Toolbar
      style={{margin: 4}}
      >
        <Box flexGrow={1} />

        <Box component={'img'} src="/hutech-logo.ico" sx={{ color: 'black', width: "40px" }}>
        </Box>
      </Toolbar>
    </StyledRoot>

  ) : null

  return (
    <>
      {header}
    </>
  );
};

export default AppHeader;
