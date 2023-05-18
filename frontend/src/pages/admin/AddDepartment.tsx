import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Button, CircularProgress } from "@material-ui/core";
import { Formik } from "formik";
import * as Yup from "yup";
import { IDepartment } from "redux/types/department";

import { useDispatch, useSelector } from "react-redux";
import { RootState } from "redux/reducers";

import { addDepartment, getDepartments } from "redux/actions/admin";

import { Box, Container, FormControl, FormLabel, TextField, Typography } from "@mui/material";

import { useHistory } from "react-router-dom";

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
  nameDepartment: string;
  keyDepartment: string;
}

const AddDepartment: React.FC = (): JSX.Element => {
  const classes = useStyles();
  const history = useHistory();
  const dispatch = useDispatch();
  const ADMIN = "640cbf0573094a5e2e001859";

  const [departments, setDepartments] = React.useState<IDepartment[]>([]);
  const Department = useSelector((state: RootState) => state.admin);

  const initialValues: IInitialValues = {
    nameDepartment: "",
    keyDepartment: "",
  };

  const onHandleSubmit = (values: IInitialValues, { setSubmitting }: any) => {
    dispatch(addDepartment({ ...values, role: ADMIN }, setSubmitting))
  };

  const validationSchema = Yup.object({
    nameDepartment: Yup.string().required("Invalid nameDepartment!"),
    keyDepartment: Yup.string().required("Invalid keyDepartment!"),
  });

  React.useEffect(() => {
    dispatch(getDepartments());
  }, [dispatch]);

  React.useEffect(() => {
    setDepartments(() => Department?.departments?.filter((department: any) => department.nameDepartment));
  }, [Department]);

  return (
    <Container style={{ maxWidth: 600 }}>

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

              <Typography style={{ fontWeight: "bold", fontSize: "18px", margin: 20 }} >
                Thêm khoa
              </Typography>

              <FormControl>
                <FormLabel style={{ fontWeight: "bold", fontSize: "14px", marginTop: "5px" }}>Ký tự viết tắt khoa</FormLabel>
                <TextField
                  style={{ width: 300 }}
                  className={classes.textField}
                  fullWidth
                  variant={'outlined'}
                  name='keyDepartment'
                  value={values.keyDepartment}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  placeholder='Nhập ký tự viết tắt khoa muốn thêm'
                  InputProps={{

                  }}
                  inputProps={{
                    style: {
                      fontSize: '12px',
                    }
                  }}
                  helperText={touched.keyDepartment ? errors.keyDepartment : ""}
                  error={touched.keyDepartment ? Boolean(errors.keyDepartment) : false}
                />
              </FormControl>

              <FormControl style={{ marginTop: 2 }} >
                <FormLabel style={{ fontWeight: "bold", fontSize: "14px", marginTop: 2 }}>
                  Tên khoa
                </FormLabel>
                <TextField
                  style={{ width: 300, }}
                  className={classes.textField}
                  fullWidth
                  variant={'outlined'}
                  name='nameDepartment'
                  value={values.keyDepartment}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  placeholder='Nhập tên khoa muốn thêm'
                  inputProps={{
                    style: {
                      fontSize: '12px',
                    }
                  }}
                  helperText={touched.nameDepartment ? errors.nameDepartment : ""}
                  error={touched.nameDepartment ? Boolean(errors.nameDepartment) : false} />

              </FormControl>
              <Box marginTop={2}>
                <Button
                  type='submit'
                  disabled={isSubmitting}
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
                >
                  {isSubmitting ? <CircularProgress size='1rem' /> : "Thêm Khoa"}
                </Button>

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
                  onClick={history.goBack}
                >Quay lại</Button>
              </Box>


            </Box>
          </form>
        )}
      </Formik>





    </Container >

  );
};

export default AddDepartment;
