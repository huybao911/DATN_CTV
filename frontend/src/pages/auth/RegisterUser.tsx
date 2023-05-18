
import React from "react";
import { makeStyles } from "@material-ui/core/styles";

import { Select, MenuItem, Button, CircularProgress, Typography, TextField, Container, Box } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { Formik } from "formik";
import * as Yup from "yup";
import { styled } from '@mui/material/styles';
import { getDepartments } from "redux/actions/user";
import { registerUser } from "redux/actions/user";
import { Link } from "react-router-dom";
import { InputAdornment } from "@mui/material";
import PersonIcon from '@mui/icons-material/Person';
import PasswordIcon from '@mui/icons-material/Password';
import { BoxInfor } from "layouts/navigation/style";
import { IDepartment } from "redux/types/department";
import { RootState } from "redux/reducers";

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
  selectStyle: {
    fontSize: '13px',
    marginBottom: '28px',

    "& fieldset": {
      borderRadius: "10px",
    },
  },
  boxStyle: {
    '&:hover': {
      fontWeight: 400,
      textDecoration: 'underline'
    },
    textDecoration: "none"
  },

}));

const StyledSection = styled('div')(({ theme }) => ({
  maxWidth: 460,
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
  username: string;
  email: string;
  password: string;
  confirmPassword: string;
  nameDepartment: string;
}

const Register: React.FC = (): JSX.Element => {
  const classes = useStyles();
  const dispatch = useDispatch();
  // const [checked, setChecked] = React.useState<boolean>(false);

  const initialValues: IInitialValues = {
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
    nameDepartment: "",
  };
  const [departments, setDepartments] = React.useState<IDepartment[]>([]);
  const Department = useSelector((state: RootState) => state.admin);

  React.useEffect(() => {
    dispatch(getDepartments());
  }, [dispatch]);

  React.useEffect(() => {
    setDepartments(() => Department?.departments?.filter((department: any) => department.nameDepartment));
  }, [Department]);

  const onHandleSubmit = (values: IInitialValues, { setSubmitting }: any) => {
    dispatch(registerUser({ ...values, role: "640cc3d329937ffacc4359fc" }, setSubmitting));
  };

  const validationSchema = Yup.object({
    username: Yup.string().required("Tên người dùng không được để trống"),
    email: Yup.string().email("Sai kiểu định dạng Email").required("Không được để trống Email"),
    password: Yup.string().required("Mật khẩu không được để trống"),
    confirmPassword: Yup.string().oneOf([Yup.ref('password'), null], 'Mật khẩu không trùng khớp'),
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
                Đăng ký tài khoản
              </Typography>
            </Box>
            <Box display={'flex'} textAlign={'left'} flexDirection={'row'} style={{ fontSize: "14px", fontWeight: '380' }} >
              <Box style={{ color: 'black', marginRight: '4px' }}>
                Bạn đã có tài khoản ?
              </Box>
              <Box component={Link} to="loginuser"
                style={{ color: 'rgb(84 219 154)', cursor: 'pointer' }}
                className={classes.boxStyle}
              >
                Đăng nhập ngay
              </Box>
            </Box>
            <Box textAlign={'center'}>
              <Formik
                validateOnChange={false}
                validateOnBlur={false}
                initialValues={initialValues}
                validationSchema={validationSchema}
                onSubmit={onHandleSubmit}
              >
                {({ isSubmitting, handleSubmit, handleChange, handleBlur, values, errors, touched }) => (
                  <form noValidate onSubmit={handleSubmit}>
                    <Box style={{ margin: '30px 0px 0px 0px' }}>

                      {/* input username */}
                      <TextField
                        className={classes.textField}
                        fullWidth
                        variant={'outlined'}
                        name='username'
                        value={values.username}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        placeholder='Username'
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
                        helperText={touched.username ? errors.username : ""}
                        error={touched.username ? Boolean(errors.username) : false}
                      />

                      {/* input gmail */}
                      <TextField
                        className={classes.textField}
                        fullWidth
                        variant={'outlined'}
                        name='email'
                        value={values.email}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        placeholder='Nhập Email'
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

                      {/* input password */}
                      <TextField
                        className={classes.textField}
                        fullWidth
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

                      {/* enter password */}
                      <TextField
                        className={classes.textField}
                        fullWidth
                        style={{ paddingBottom: '16px' }}
                        variant={'outlined'}
                        type='password'
                        name='confirmPassword'
                        value={values.confirmPassword}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        placeholder='Nhập lại mật khẩu'
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
                        helperText={touched.confirmPassword ? errors.confirmPassword : ""}
                        error={touched.confirmPassword ? Boolean(errors.confirmPassword) : false}
                      />


                      <Select
                        name="nameDepartment"
                        fullWidth
                        displayEmpty
                        variant={'outlined'}
                        className={classes.selectStyle}
                        value={values.nameDepartment}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        error={touched.nameDepartment ? Boolean(errors.nameDepartment) : false}
                        renderValue={(value) => value ? value : <em style={{ fontSize: '13px' }}>Vui lòng chọn khoa</em>}
                        MenuProps={{
                          PaperProps: {
                            style: {
                              fontSize: 10,
                            },
                          },
                        }}
                      >
                        {departments?.map((department: any) => {
                          return <MenuItem style={{ fontSize: '13px' }} value={department.nameDepartment} key={department._id}> {department.nameDepartment} </MenuItem>
                        })}
                      </Select>
                    </Box>
                    <Button
                      fullWidth
                      disableRipple
                      type='submit'
                      style={{ backgroundColor: 'rgb(33, 43, 54)', color: "white", borderRadius: 10, textTransform: 'capitalize', fontWeight: 'normal' }}
                      className={classes.btnLogin}
                      disabled={isSubmitting}
                    >
                      {isSubmitting ? <CircularProgress size='1rem' /> : "Đăng Ký"}
                    </Button>
                  </form>
                )}
              </Formik>
            </Box>
          </Box>

        </Container>
      </StyledSection>


    </StyledRoot >
  );
};

export default Register;






