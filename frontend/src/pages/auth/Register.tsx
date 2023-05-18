import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Formik } from "formik";
import * as Yup from "yup";
import { useDispatch, useSelector } from "react-redux";
import { getDepartments } from "redux/actions/user";
import { IDepartment } from "redux/types/department";

import FormField from "pages/auth/FormField";
import { registerSManagerAdmin } from "redux/actions/sManager";
import { registerManagerAdmin } from "redux/actions/Manager";
import { FormControlLabel, RadioGroup, Typography, Grid, Button, CircularProgress } from "@material-ui/core";
import FormFieldDepartment from "pages/auth/FormDepartment_Admin";

import { Link } from 'react-router-dom';
import { Box, Container, FormControl, FormLabel, InputAdornment, MenuItem, Select, TextField, Radio } from "@mui/material";
import { Person } from "@mui/icons-material";
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
  btnRegister: {
    marginTop: theme.spacing(2),
    padding: theme.spacing(1, 2),
  },
  checkboxWrapper: {
    display: "flex",
    justifyContent: "flex-start",
    marginTop: theme.spacing(2),
  },
  formControl: {
    margin: theme.spacing(2, 0),
    width: 300,
  },
  formLabel: {
    marginBottom: theme.spacing(1.5),
    textAlign: 'left',
    fontSize: '13px',
    borderRadius: 10
  },
  selectStyle: {
    fontSize: '13px',
    marginBottom: '28px',

    "& fieldset": {
      borderRadius: "10px",
    },
  },
  textField: {
    margin: theme.spacing(1.5, 0),
    textAlign: 'left',
    fontSize: '13px',
    "& .MuiInputBase-root": {
      "& fieldset": {
        borderRadius: "10px",
      },
    },
  },
}));

interface IInitialValues {
  username: string;
  email: string;
  password: string;
  department: string;
}

const Register: React.FC = (): JSX.Element => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const [checked2, setChecked2] = React.useState("smanager");
  const [checked3, setChecked3] = React.useState("manager");

  const Department = useSelector((state: RootState) => state.admin);

  React.useEffect(() => {
    dispatch(getDepartments());
  }, [dispatch]);


  const initialValues: IInitialValues = {
    username: "",
    email: "",
    password: "",
    department: "",
  };

  const onHandleSubmit = (values: IInitialValues, { setSubmitting }: any) => {

    if (checked2 === "smanager") {
      dispatch(registerSManagerAdmin({ ...values, role: "640cc3c229937ffacc4359f8" }, setSubmitting));
    } else if (checked3 === "manager") {
      dispatch(registerManagerAdmin({ ...values, role: "640cc3ca29937ffacc4359fa" }, setSubmitting));
    }
  };

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setChecked2(event.target.value);
    setChecked3(event.target.value);
  };

  const validationSchema = Yup.object({
    username: Yup.string().required("Invalid username!"),
    email: Yup.string().email("Invalid email!").required("Invalid email!"),
    password: Yup.string().required("Invalid password!"),
  });

  React.useEffect(() => {
    document.title = "Thêm tài khoản | CTV ";
  }, []);

  return (
    <Container style={{ maxWidth: 600 }}>
      <Box display={"flex"}
        flexDirection={'column'}
        justifyContent={'center'}
        alignItems={'center'}
        style={{ backgroundColor: 'white', padding: '40px 0px', borderRadius: '20px' }}>

        <Typography style={{ fontWeight: "bold", fontSize: "18px", marginTop: "5px" }} >
          Tạo Tài Khoản
        </Typography>
        <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={onHandleSubmit}
        >
          {({ isSubmitting, handleSubmit, values, handleChange, handleBlur, errors, touched }) => (
            <form noValidate onSubmit={handleSubmit}>
              <Box display={"flex"}
                flexDirection={'column'}
                justifyContent={'center'}
                alignItems={'center'}
                style={{ backgroundColor: 'white', padding: '40px 0px', borderRadius: '20px' }}>

                {/* Email */}
                <FormControl>
                  <FormLabel style={{ fontWeight: "bold", fontSize: "14px", marginTop: "5px" }}>
                    Email
                  </FormLabel>
                  <TextField
                    style={{ width: 300, }}
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
                          <Person style={{ width: '16px' }} sx={{ color: 'text.disabled' }} />
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
                </FormControl>



                {/* Username */}
                <FormControl>
                  <FormLabel style={{ fontWeight: "bold", fontSize: "14px", marginTop: "5px" }}>
                    Username
                  </FormLabel>
                  <TextField
                    style={{ width: 300, }}
                    className={classes.textField}
                    fullWidth
                    variant={'outlined'}
                    name='username'
                    value={values.username}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    placeholder='Nhập username'
                    InputProps={{
                      startAdornment: (
                        <InputAdornment position="start" sx={{ paddingLeft: 1.3 }}>
                          <Person style={{ width: '16px' }} sx={{ color: 'text.disabled' }} />
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
                </FormControl>

                {/* password */}
                <FormControl>
                  <FormLabel style={{ fontWeight: "bold", fontSize: "14px", marginTop: "5px" }}>Password</FormLabel>
                  <TextField
                    style={{ width: 300, }}
                    className={classes.textField}
                    fullWidth
                    variant={'outlined'}
                    name='password'
                    type="password"
                    value={values.password}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    placeholder='Nhập password'
                    InputProps={{
                      startAdornment: (
                        <InputAdornment position="start" sx={{ paddingLeft: 1.3 }}>
                          <Person style={{ width: '16px' }} sx={{ color: 'text.disabled' }} />
                        </InputAdornment>
                      ),
                    }}
                    inputProps={{
                      style: {
                        fontSize: '12px',
                      }
                    }}
                    helperText={touched.password ? errors.password : ""}
                    error={touched.password ? Boolean(errors.password) : false}
                  />
                </FormControl>



                {/* <Select
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
              </Select> */}

                <FormFieldDepartment isDepartmentCbb={true} />

                <Box  display={"flex"} justifyContent={'center'}>
                  <RadioGroup
                    name="radio-buttons-group"
                    style={{ flexDirection: 'row', fontSize: '13px' }}
                  >
                    <FormControlLabel  value="smanager" control={<Radio sx={{
                      "& svg": {
                        width: "14px",
                        height: "14px"
                      }
                    }} onChange={handleChange} />} label={<Box fontSize={'13px'} style={{ padding: '3px' }} >Quản lý cấp cao</Box>}  />
                    <FormControlLabel value="manager" control={<Radio sx={{
                      "& svg": {
                        width: "14px",
                        height: "14px"
                      }
                    }} onChange={handleChange} />} label={<Box fontSize={'13px'} style={{ padding: '3px' }} >Quản lý</Box>}  />
                  </RadioGroup>
                </Box>
                <Box marginTop={2}>
                  <Button
                    type='submit'
                    style={{
                      color: "rgb(33, 43, 54)",
                      height: "34px",
                      width: "120px",
                      fontSize: "12px",
                      borderRadius: "4px",
                      fontWeight: 500,
                      textTransform: "capitalize",
                      border: '1px solid rgb(33, 43, 54)',
                      marginRight: 10
                    }}
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? <CircularProgress size='1rem' /> : "Đăng Ký"}
                  </Button>

                  <Link to="/users">
                    <Button style={{
                      color: "#FF6969",
                      height: "34px",
                      width: "120px",
                      fontSize: "12px",
                      fontWeight: 500,
                      borderRadius: "4px",
                      textTransform: "capitalize",
                      border: '1px solid #FF6969',

                    }}
                    >Quay lại</Button>
                  </Link>
                </Box>



              </Box>
            </form>
          )}
        </Formik>
      </Box>

    </Container >

  );
};

export default Register;
