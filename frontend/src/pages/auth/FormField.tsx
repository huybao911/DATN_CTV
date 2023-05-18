import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import { FormControl, FormLabel, TextField, Grid } from "@material-ui/core";
import { useFormikContext } from "formik";

const useStyles = makeStyles((theme) => ({
  formLabel: {
    fontWeight: 600,
    marginBottom: theme.spacing(1.5),
  },
  formControl: {
    margin: theme.spacing(2, 0),
  },
}));

type Props = {
  isRegister?: boolean;
};

interface IValues {
  username: string;
  email: string;
  password: string;
}

const FormField: React.FC<Props> = ({ isRegister = false }): JSX.Element => {
  const classes = useStyles();
  const { values, handleChange, handleBlur, errors, touched } =
    useFormikContext<IValues>();

  return (
    <>
        <Grid item xs={12}>
          <FormControl fullWidth className={classes.formControl}>
            <FormLabel classes={{ root: classes.formLabel }}>Email</FormLabel>
            <TextField
              fullWidth
              name='email'
              value={values.email}
              onChange={handleChange}
              onBlur={handleBlur}
              placeholder='Nhập email'
              helperText={touched.email ? errors.email : ""}
              error={touched.email ? Boolean(errors.email) : false}
            />
          </FormControl>
        </Grid>
        {isRegister ? (
          <Grid item xs={12}>
            <FormControl fullWidth className={classes.formControl}>
              <FormLabel classes={{ root: classes.formLabel }}>Tên tài khoản</FormLabel>
              <TextField
                fullWidth
                name='username'
                value={values.username}
                onChange={handleChange}
                onBlur={handleBlur}
                placeholder='Nhập tên tài khoản'
                helperText={touched.username ? errors.username : ""}
                error={touched.username ? Boolean(errors.username) : false}
              />
            </FormControl>
          </Grid>
        ) : null}
        <Grid item xs={12}>
          <FormControl fullWidth className={classes.formControl}>
            <FormLabel classes={{ root: classes.formLabel }}>Mật khẩu</FormLabel>
            <TextField
              fullWidth
              type='password'
              name='password'
              value={values.password}
              onChange={handleChange}
              onBlur={handleBlur}
              placeholder='Nhập mật khẩu'
              helperText={touched.password ? errors.password : ""}
              error={touched.password ? Boolean(errors.password) : false}
            />
          </FormControl>
        </Grid>
    </>
  );
};

export default FormField;
