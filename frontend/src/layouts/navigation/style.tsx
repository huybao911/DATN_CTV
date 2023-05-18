// @mui
import { styled } from '@mui/material/styles';
import { ListItemIcon, ListItemButton, MenuItem, Box, Grid } from '@mui/material';
import {Button} from '@material-ui/core'
import { LinkProps } from 'react-router-dom';

// ----------------------------------------------------------------------

export const StyledListItemButton = styled(ListItemButton)<LinkProps>(() => ({
  
  textTransform: "capitalize",
  // '&:hover': {
  //   backgroundColor: 'transparent'
  // },
  // '&:focus': {
  //   backgroundColor: 'green',
  //   color: '#6ECCAF'
  // },
}));

export const StyledNavItemIcon = styled(ListItemIcon)({
  color: '#979797',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
});

export const StyledMenuItem = styled(MenuItem)<LinkProps>(() => ({
  '& ..MuiButtonBase-root': {
    justifyContent: 'none'
  }
}));

export const BoxSpan = styled('span')(({
  height: 20,
  width: 20,
  top: -4,
  right: 10,
  backgroundColor: 'white',
  display: 'block',
  position: 'absolute',
  transform: 'rotate(-135deg)',
  zIndex: 1
}))

export const BoxNameDetails = styled(Box)(({
  textAlign: 'left',
  fontSize: '18px',
  color: 'rgb(33, 43, 54)',
  paddingRight: 10,
  paddingBottom: 10,
  fontWeight: 700
}))


export const BoxDetails = styled(Box)(({
  margin:'20px 26px'
}))

//infor
export const BoxInfor = styled(Box)(({
  backgroundColor: 'white',
  padding: 20,
  width: '100%',
  boxShadow: 'rgba(145, 158, 171, 0.16) 0px 4px 8px 0px',
  borderRadius: 16
}))

export const GrifInfor = styled(Grid)(({
  backgroundColor: 'white',
  width: '100%',
  boxShadow: 'rgba(145, 158, 171, 0.16) 0px 4px 8px 0px',
  borderRadius: 16,
  padding: 40,
  dislay: 'flex',
  justifyContent: 'center',
  textAlign: 'center'

}))


export const ButtonSubmitInfor = styled(Button)(({
  borderRadius: 10,
  textTransform: 'capitalize',
  fontWeight: 'normal',
  float: 'right'
}))


