import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import { FormControl, FormLabel, TextField } from "@material-ui/core";
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
};

interface IValues {
  nameDepartment: string;
  keyDepartment: string;
}

const FormFieldDepartment: React.FC<Props> = (): JSX.Element => {

  const classes = useStyles();
  const { values, handleChange, handleBlur, errors, touched } =
    useFormikContext<IValues>();

  return (
    <>
      <FormControl fullWidth className={classes.formControl}>
        <FormLabel classes={{ root: classes.formLabel }}>Ký tự viết tắt khoa</FormLabel>
        <TextField
          fullWidth
          name='keyDepartment'
          value={values.keyDepartment}
          onChange={handleChange}
          onBlur={handleBlur}
          placeholder='Nhập ký tự viết tắt khoa muốn thêm'
          helperText={touched.keyDepartment ? errors.keyDepartment : ""}
          error={touched.keyDepartment ? Boolean(errors.keyDepartment) : false}
        />
      </FormControl>
      <FormControl fullWidth className={classes.formControl}>
        <FormLabel classes={{ root: classes.formLabel }}>Tên khoa</FormLabel>
        <TextField
          fullWidth
          name='nameDepartment'
          value={values.nameDepartment}
          onChange={handleChange}
          onBlur={handleBlur}
          placeholder='Nhập tên khoa muốn thêm'
          helperText={touched.nameDepartment ? errors.nameDepartment : ""}
          error={touched.nameDepartment ? Boolean(errors.nameDepartment) : false}
        />
      </FormControl>
    </>
  );
};

export default FormFieldDepartment;
