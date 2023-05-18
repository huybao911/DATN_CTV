// import React from "react";
// import { makeStyles } from "@material-ui/core/styles";
// import { Button, CircularProgress, Typography } from "@material-ui/core";
// import { Formik } from "formik";
// import * as Yup from "yup";
// import { Container, Drawer, Box, TextField } from "@mui/material";

// import { useDispatch } from "react-redux";
// import { loginUser } from "redux/actions/user";
// import { Link } from "react-router-dom";
// import { InputAdornment } from "@mui/material";
// import PersonIcon from '@mui/icons-material/Person';
// import PasswordIcon from '@mui/icons-material/Password';

// const useStyles = makeStyles((theme) => ({
//   root: {
//     flexGrow: 1,
//     position: "absolute",
//     top: "0",
//     left: "0",
//     width: "100%",
//     minHeight: "100vh",
//   },
//   btnLogin: {
//     marginTop: theme.spacing(2),
//     padding: theme.spacing(1, 2),
//   },
//   checkboxWrapper: {
//     display: "flex",
//     justifyContent: "flex-start",
//     marginTop: theme.spacing(2),
//   },

//   textField: {
//     margin: theme.spacing(2, 0),
//     textAlign: 'left',
//     fontSize: '13px',
//     "& .MuiInputBase-root": {
//       "& fieldset": {
//         borderRadius: "10px",
//       },
//     },
//   },

// }));

// interface IInitialValues {
//   email: string;
//   password: string;
// }

// const LoginUser: React.FC = (): JSX.Element => {
//   const classes = useStyles();
//   const dispatch = useDispatch();
//   // const [checked, setChecked] = React.useState<boolean>(false);

//   const initialValues: IInitialValues = {
//     email: "",
//     password: "",
//   };

//   const onHandleSubmit = (values: IInitialValues, { setSubmitting }: any) => {
//     dispatch(loginUser(values, setSubmitting));
//   };

//   const validationSchema = Yup.object({
//     email: Yup.string().required("Invalid username!"),
//     password: Yup.string().required("Invalid password!"),
//   });

//   React.useEffect(() => {
//     document.title = "Đăng nhập | CTV";
//   }, []);

//   return (

//     <Box component={"nav"}
//       color={"black"}
//       display={"flex"}
//     >
//       <Box flexGrow={1} style={{ paddingRight: 360 }}>

//       </Box>
//       <Drawer
//         anchor="right"
//         open
//         variant="permanent"
//         style={{}}
//         BackdropProps={{ style: { position: 'absolute' } }}
//         PaperProps={{
//           sx: {
//             width: 400,
//             bgcolor: 'background.default',
//             borderLeftStyle: 'none',
//           },
//         }}
//       >
//         <Container style={{ maxWidth: 360, }}>
//           <Box>
//             <Box display={"flex"} flexDirection={'column'} justifyContent={'center'} style={{ backgroundColor: 'white', padding: '220px 0px 0px', borderRadius: '20px' }}>
//               <Box display={"flex"} flexDirection={'column'} justifyContent={'center'} textAlign={'left'}>
//                 <Typography style={{ fontWeight: "500", fontSize: "20px", margin: "14px 0px", letterSpacing: '0.6px', paddingBottom: '4px' }} >
//                   Đăng nhập vào Cộng Tác Viên
//                 </Typography>
//               </Box>
//               <Box display={'flex'} textAlign={'left'} flexDirection={'row'} style={{ fontSize: "14px", fontWeight: '380' }} >
//                 <Box style={{ color: 'black', marginRight: '4px' }}>
//                   Bạn là người mới ?
//                 </Box>
//                 <Box component={Link} to="/register" style={{ color: 'black', textDecoration: "none", cursor: 'pointer' }} >
//                   Tạo tài khoản
//                 </Box>
//               </Box>
//               <Box textAlign={'center'}>
//                 <Formik
//                   initialValues={initialValues}
//                   validationSchema={validationSchema}
//                   onSubmit={onHandleSubmit}
//                 >
//                   {({ isSubmitting, handleSubmit, handleChange, handleBlur, values, errors, touched }) => (
//                     <form noValidate onSubmit={handleSubmit}>
//                       <Box style={{ margin: '30px 0px 0px 0px' }}>

//                         <TextField
//                           className={classes.textField}
//                           fullWidth
//                           variant={'outlined'}
//                           name='email'
//                           value={values.email}
//                           onChange={handleChange}
//                           onBlur={handleBlur}
//                           placeholder='Nhập gmail'
//                           InputProps={{
//                             startAdornment: (
//                               <InputAdornment position="start" sx={{ paddingLeft: 1.3 }}>
//                                 <PersonIcon style={{ width: '16px' }} sx={{ color: 'text.disabled' }} />
//                               </InputAdornment>
//                             ),
//                           }}
//                           inputProps={{
//                             style: {
//                               fontSize: '12px',
//                             }
//                           }}
//                           helperText={touched.email ? errors.email : ""}
//                           error={touched.email ? Boolean(errors.email) : false}
//                         />

//                         <TextField
//                           className={classes.textField}
//                           fullWidth
//                           style={{ paddingBottom: '30px' }}
//                           variant={'outlined'}
//                           type='password'
//                           name='password'
//                           value={values.password}
//                           onChange={handleChange}
//                           onBlur={handleBlur}
//                           placeholder='Nhập mật khẩu'
//                           InputProps={{
//                             startAdornment: (
//                               <InputAdornment position="start" sx={{ paddingLeft: 1.3 }}>
//                                 <PasswordIcon style={{ width: '16px' }} sx={{ color: 'text.disabled' }} />
//                               </InputAdornment>
//                             )
//                           }}
//                           inputProps={{
//                             style: {
//                               fontSize: '12px',
//                             }
//                           }}
//                           helperText={touched.password ? errors.password : ""}
//                           error={touched.password ? Boolean(errors.password) : false}
//                         />
//                         <Box textAlign={'right'} style={{ fontSize: "14px", fontWeight: '380' }}>
//                           <Box component={Link} to="/login" style={{ color: 'black', cursor: 'pointer', paddingBottom: '4px' }}>
//                             Quên mật khẩu?
//                           </Box>
//                         </Box>

//                       </Box>
//                       <Button
//                         fullWidth
//                         disableRipple
//                         type='submit'
//                         style={{ backgroundColor: 'rgb(33, 43, 54)', color: "white", borderRadius: 10, textTransform: 'capitalize', fontWeight: 'normal' }}
//                         className={classes.btnLogin}
//                         disabled={isSubmitting}
//                       >
//                         {isSubmitting ? <CircularProgress size='1rem' /> : "Đăng Nhập"}
//                       </Button>
//                     </form>
//                   )}
//                 </Formik>
//               </Box>
//             </Box>
//           </Box>
//         </Container>
//       </Drawer>

//     </Box>
//   );
// };

// export default LoginUser;
import React from "react";
import { makeStyles } from "@material-ui/core/styles";

import { Container, Typography, Drawer, Button, Box, TextField, CircularProgress } from '@mui/material';

import { Formik } from "formik";
import * as Yup from "yup";
import { styled } from '@mui/material/styles';

import { useDispatch } from "react-redux";
import { loginUser } from "redux/actions/user";
import { Link } from "react-router-dom";
import { InputAdornment } from "@mui/material";
import PersonIcon from '@mui/icons-material/Person';
import PasswordIcon from '@mui/icons-material/Password';
import { BoxInfor } from "layouts/navigation/style";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    position: "absolute",
    top: "0",
    left: "0",
    width: "100%",
    minHeight: "100vh",
  },
  btnLogin: {
    marginTop: theme.spacing(2),
    padding: theme.spacing(1, 2),
  },
  checkboxWrapper: {
    display: "flex",
    justifyContent: "flex-start",
    marginTop: theme.spacing(2),
  },

  textField: {
    margin: theme.spacing(2, 0),
    textAlign: 'left',
    fontSize: '13px',
    "& .MuiInputBase-root": {
      "& fieldset": {
        borderRadius: "10px",
      },
    },
  },

}));



const StyledSection = styled('div')(({ theme }) => ({

  maxWidth: 600,
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
  backgroundColor: 'white'

}));

const StyledRoot = styled('div')(({ theme }) => ({
  [theme.breakpoints.up('md')]: {
    display: 'flex',
    padding: 0
  },
}));

const StyledContent = styled('div')(({ theme }) => ({
  maxWidth: 800,
  margin: 'auto',
  minHeight: '100vh',
  display: 'flex',
  justifyContent: 'center',
  flexDirection: 'column',
  padding: theme.spacing(12, 0),
}));

interface IInitialValues {
  email: string;
  password: string;
}

const LoginUser: React.FC = (): JSX.Element => {
  const classes = useStyles();
  const dispatch = useDispatch();
  // const [checked, setChecked] = React.useState<boolean>(false);

  const initialValues: IInitialValues = {
    email: "",
    password: "",
  };

  const onHandleSubmit = (values: IInitialValues, { setSubmitting }: any) => {
    dispatch(loginUser(values, setSubmitting));
  };

  const validationSchema = Yup.object({
    email: Yup.string().required("Invalid username!"),
    password: Yup.string().required("Invalid password!"),
  });

  React.useEffect(() => {
    document.title = "Đăng nhập | CTV";
  }, []);

  return (


    <StyledRoot>
      {/* this is logo */}
      {/* <Logo
      sx={{
        position: 'fixed',
        top: { xs: 16, sm: 24, md: 40 },
        left: { xs: 16, sm: 24, md: 40 },
      }}
    /> */}

      <Container maxWidth="lg">
        <StyledContent>
          <Typography style={{ fontWeight: "700", fontSize: "40px", marginBottom: "20px", letterSpacing: '0.8px', paddingBottom: '4px' }} >
            Hi, welcome to CTV
          </Typography>
          <img src="/login.png" />
        </StyledContent>

      </Container>

      <StyledSection>

        <Container >

          <Box display={"flex"} flexDirection={'column'}
            justifyContent={'center'}
            style={{ backgroundColor: 'white', padding: '120px 0px 0px', borderRadius: '20px' }}
          >
            <Box display={"flex"} flexDirection={'column'} justifyContent={'center'} textAlign={'left'}>
              <Typography style={{ fontWeight: "700", fontSize: "20px", margin: "14px 0px", letterSpacing: '0.6px', paddingBottom: '4px' }} >
                Đăng nhập vào CTV
              </Typography>
            </Box>
            <Box display={'flex'} textAlign={'left'} flexDirection={'row'} style={{ fontSize: "14px", fontWeight: '380' }} >
              <Box style={{ color: 'black', marginRight: '4px' }}>
                Bạn là người mới ?
              </Box>
              <Box component={Link} to="/register"
                style={{ color: 'rgb(84 219 154)', cursor: 'pointer' }}
              >
                Tạo tài khoản
              </Box>
            </Box>
            <Box textAlign={'center'}>
              <Formik
                initialValues={initialValues}
                validationSchema={validationSchema}
                onSubmit={onHandleSubmit}
              >
                {({ isSubmitting, handleSubmit, handleChange, handleBlur, values, errors, touched }) => (
                  <form noValidate onSubmit={handleSubmit}>
                    <Box style={{ margin: '30px 0px 0px 0px' }}>

                      <TextField
                        className={classes.textField}
                        fullWidth
                        variant={'outlined'}
                        name='email'
                        value={values.email}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        placeholder='Nhập gmail'
                        InputProps={{
                          startAdornment: (
                            <InputAdornment position="start" sx={{ paddingLeft: 1.3 }}>
                              <PersonIcon style={{ width: '16px' }} sx={{ color: 'text.disabled' }} />
                            </InputAdornment>
                          ),
                        }}
                        inputProps={{
                          style: {
                            fontSize: '12px',
                          }
                        }}
                        helperText={touched.email ? errors.email : ""}
                        error={touched.email ? Boolean(errors.email) : false}
                      />

                      <TextField
                        className={classes.textField}
                        fullWidth
                        style={{ paddingBottom: '30px' }}
                        variant={'outlined'}
                        type='password'
                        name='password'
                        value={values.password}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        placeholder='Nhập mật khẩu'
                        InputProps={{
                          startAdornment: (
                            <InputAdornment position="start" sx={{ paddingLeft: 1.3 }}>
                              <PasswordIcon style={{ width: '16px' }} sx={{ color: 'text.disabled' }} />
                            </InputAdornment>
                          )
                        }}
                        inputProps={{
                          style: {
                            fontSize: '12px',
                          }
                        }}
                        helperText={touched.password ? errors.password : ""}
                        error={touched.password ? Boolean(errors.password) : false}
                      />
                      <Box textAlign={'right'} style={{ fontSize: "14px", fontWeight: '380' }}>
                        <Box component={Link} to="/login" style={{ color: 'black', cursor: 'pointer', paddingBottom: '4px' }}>
                          Quên mật khẩu?
                        </Box>
                      </Box>

                    </Box>
                    <Button
                      fullWidth
                      disableRipple
                      type='submit'
                      style={{ backgroundColor: 'rgb(33, 43, 54)', color: "white", borderRadius: 10, textTransform: 'capitalize', fontWeight: 'normal' }}
                      className={classes.btnLogin}
                      disabled={isSubmitting}
                    >
                      {isSubmitting ? <CircularProgress size='1rem' /> : "Đăng Nhập"}
                    </Button>
                  </form>
                )}
              </Formik>
            </Box>
          </Box>

        </Container>
      </StyledSection>


    </StyledRoot>
  );
};

export default LoginUser;
