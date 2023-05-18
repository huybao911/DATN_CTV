import React from "react";
import { styled } from "@material-ui/core/styles";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "redux/reducers";
import { logOutUser } from "redux/actions/user";
import { StyledMenuItem } from '../../layouts/navigation/style'
import { BoxSpan } from '../../layouts/navigation/style'
import { Person, Notifications } from '@mui/icons-material';

import { AppBar, Box, Toolbar, Typography, Stack, Popover, MenuItem, Avatar, IconButton, Divider } from "@mui/material"
import { NavLink } from "react-router-dom";
const StyledRoot = styled(AppBar)(() => ({
  boxShadow: 'none',
  width: '100%',
  backgroundColor: 'white',
  fontWeight: 'bold',
}));

const Homepage: React.FC = (): JSX.Element => {

  const dispatch = useDispatch();
  const [anchorElUser, setAnchorElUser] = React.useState(null);

  const openUser = Boolean(anchorElUser);
  const handleClickUser = (event: any) => {
    setAnchorElUser(event.currentTarget);
  };
  const handleCloseUser = () => {
    setAnchorElUser(null);
  };

  const user = useSelector((state: RootState) => state.user);

  const userHeader = user.isAuthenticated && window.location.pathname.includes('/storageEvent') || user.isAuthenticated && window.location.pathname.includes('/applyJob') || user.isAuthenticated && window.location.pathname.includes('/profile') || user.isAuthenticated && window.location.pathname.includes('/manageJob') ? (
    <StyledRoot style={{ boxShadow: "none", overflowX: "hidden" }}>
      <Toolbar>
        <NavLink style={{ textDecoration: 'none' }} to={'/user'}>
          <img src="/hutech-logo.ico" style={{ height: "56px", width: "50px" }}></img>
        </NavLink>
        <Typography align='left' style={{ flexGrow: 1 }}></Typography>
        <div className="verticalLine">
        </div>
        <Box>
          <IconButton href='' style={{ color: "white" }}>
            <Notifications />
          </IconButton>
        </Box>
        <Stack
          direction="row"
          alignItems="center"
          spacing={{
            xs: 0.5,
            sm: 1,
          }}
          sx={{ margin: 3, color: 'black' }}
        >
          <Box style={{
            display: 'flex', alignItems: 'center', textAlign: 'center'
          }}>
            <IconButton onClick={(event) => handleClickUser(event)}
              sx={{
                p: 0,

              }}>
              <Person style={{ color: "black" }} />
            </IconButton>

            <Popover
              open={openUser}
              anchorEl={anchorElUser}
              onClose={handleCloseUser}
              anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
              transformOrigin={{ vertical: 'top', horizontal: 'right' }}
              sx={{ marginLeft: 1 }}
              PaperProps={{
                style: {
                  borderRadius: 20,
                  boxShadow: 'rgba(145, 158, 171, 0.24) 0px 0px 2px 0px, rgba(145, 158, 171, 0.24) -20px 20px 40px -4px',
                },
                sx: {
                  p: 1,
                  width: 220,
                  overflowX: 'unset',
                  overflowY: 'unset',
                  '& .MuiMenuItem-root': {
                    px: 1,
                    py: 1,
                    typography: 'body2',
                    borderRadius: 1,
                    justifyContent: 'left'
                  },
                  '& .MuiAvatar-root': {
                    width: 32,
                    height: 32,
                    ml: -0.5,
                    mt: 1,
                    mr: 1,
                  },
                },
              }}
            >

              <BoxSpan />
              <Stack sx={{ p: 0.5 }} >
                <StyledMenuItem component={NavLink} to={'/profile'} >
                  <Box display={"flex"}>
                    <Box>
                      <Avatar src={user.user.avatar}/>
                    </Box>
                    <Box flexDirection={'column'}>
                      <Typography style={{ fontWeight: 500, fontSize: '14px' }}>{user.user.username}</Typography>
                      <Typography style={{ color: "#637381", fontSize: '13.5px' }} >{user.user.email}</Typography>
                    </Box>
                  </Box>
                </StyledMenuItem>

                <Divider sx={{ borderStyle: 'dashed' }} />

                <StyledMenuItem component={NavLink} to={'/storageEvent'}>
                  <Typography style={{ fontSize: '14px' }}>Sự Kiện Đã Lưu</Typography>
                </StyledMenuItem>

                <StyledMenuItem component={NavLink} to={'/applyJob'}>
                  <Typography style={{ fontSize: '14px', float: 'left' }}>Công việc Đã Ứng Tuyển</Typography>
                </StyledMenuItem>

                <StyledMenuItem component={NavLink} to={'/manageJob'}>
                  <Typography style={{ fontSize: '14px', float: 'left' }}>Quản Lý Công việc</Typography>
                </StyledMenuItem>

                <Divider sx={{ borderStyle: 'dashed' }} />

                <MenuItem className="navbar-logout" onClick={(e) => dispatch(logOutUser())}>
                  <Typography style={{ fontSize: '14px' }}> Đăng Xuất</Typography>
                </MenuItem>
              </Stack>

            </Popover>
          </Box>
        </Stack>
      </Toolbar>
    </StyledRoot>
  ) : null

  React.useEffect(() => {
    document.title = "TRANG CHỦ ";
  }, []);
  return (
    <>
      {userHeader}
    </>
  );
};

export default Homepage;
