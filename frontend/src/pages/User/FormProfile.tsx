import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import { FormControl, FormLabel, TextField } from "@mui/material";
import { useFormikContext } from "formik";
// import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
// import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
// import { DatePicker } from '@mui/x-date-pickers/DatePicker';

const useStyles = makeStyles((theme) => ({
    formLabel: {
        fontWeight: "bold",
        color: "black",
        marginBottom: theme.spacing(3.5),
    },
    formControlLabel: {
        margin: theme.spacing(4, 3),
        marginLeft: "50px",
    },
    formControlTexeField: {
        margin: theme.spacing(2, 0),
        width: '400px',
    },
}));


interface IValues {
    username: string;
    email: string;
    fullName: string;
    birthday: string;
    mssv: string;
    classUser: string;
    phone: string;
    address: string;
}


const FormPost: React.FC = (): JSX.Element => {
    const classes = useStyles();
    const { values, handleChange, handleBlur, errors, touched } =
        useFormikContext<IValues>();

    return (
        <>
            <FormControl className={classes.formControlLabel}>
                <FormLabel style={{ marginRight: "5px" }} classes={{ root: classes.formLabel }}>Tên đăng nhập</FormLabel>
            </FormControl>
            <FormControl className={classes.formControlTexeField}>
                <TextField
                    fullWidth
                    variant="outlined"
                    name='username'
                    value={values.username}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    helperText={touched.username ? errors.username : ""}
                    error={touched.username ? Boolean(errors.username) : false}
                />
            </FormControl>

            <FormControl className={classes.formControlLabel}>
                <FormLabel style={{ marginRight: "31px" }} classes={{ root: classes.formLabel }}>Email</FormLabel>
            </FormControl>
            <FormControl className={classes.formControlTexeField}>
                <TextField
                    fullWidth
                    maxRows={10}
                    multiline
                    variant="outlined"
                    name='email'
                    value={values.email}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    placeholder='Nhập nội dung bài viết'
                    helperText={touched.email ? errors.email : ""}
                    error={touched.email ? Boolean(errors.email) : false}
                />
            </FormControl>

            <FormControl className={classes.formControlLabel}>
                <FormLabel style={{ marginRight: "45px" }} classes={{ root: classes.formLabel }}>Họ và tên</FormLabel>
            </FormControl>
            <FormControl className={classes.formControlTexeField}>
                <TextField
                    fullWidth
                    maxRows={10}
                    multiline
                    variant="outlined"
                    name='fullName'
                    value={values.fullName}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    helperText={touched.fullName ? errors.fullName : ""}
                    error={touched.fullName ? Boolean(errors.fullName) : false}
                />
            </FormControl>

            <FormControl className={classes.formControlLabel}>
                <FormLabel classes={{ root: classes.formLabel }}>Ngày sinh</FormLabel>
            </FormControl>
            <FormControl className={classes.formControlTexeField}>
                <TextField
                    fullWidth
                    maxRows={10}
                    multiline
                    variant="outlined"
                    name='birthday'
                    value={values.birthday}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    helperText={touched.birthday ? errors.birthday : ""}
                    error={touched.birthday ? Boolean(errors.birthday) : false}
                />
            </FormControl>

            <FormControl className={classes.formControlLabel}>
                <FormLabel classes={{ root: classes.formLabel }}>Mã số sinh viên</FormLabel>
            </FormControl>
            <FormControl className={classes.formControlTexeField}>
                <TextField
                    fullWidth
                    maxRows={10}
                    multiline
                    variant="outlined"
                    name='mssv'
                    value={values.mssv}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    helperText={touched.mssv ? errors.mssv : ""}
                    error={touched.mssv ? Boolean(errors.mssv) : false}
                />
            </FormControl>

            <FormControl className={classes.formControlLabel}>
                <FormLabel style={{ marginRight: "45px" }} classes={{ root: classes.formLabel }}>Lớp</FormLabel>
            </FormControl>
            <FormControl className={classes.formControlTexeField}>
                <TextField
                    fullWidth
                    maxRows={10}
                    multiline
                    variant="outlined"
                    name='classUser'
                    value={values.classUser}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    helperText={touched.classUser ? errors.classUser : ""}
                    error={touched.classUser ? Boolean(errors.classUser) : false}
                />
            </FormControl>

            <FormControl className={classes.formControlLabel}>
                <FormLabel style={{ marginRight: "17px" }} classes={{ root: classes.formLabel }}>Số điện thoại</FormLabel>
            </FormControl>
            <FormControl className={classes.formControlTexeField}>
                <TextField
                    fullWidth
                    maxRows={10}
                    multiline
                    variant="outlined"
                    name='phone'
                    value={values.phone}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    helperText={touched.phone ? errors.phone : ""}
                    error={touched.phone ? Boolean(errors.phone) : false}
                />
            </FormControl>

            <FormControl className={classes.formControlLabel}>
                <FormLabel style={{ marginRight: "23px" }} classes={{ root: classes.formLabel }}>Địa chỉ</FormLabel>
            </FormControl>
            <FormControl className={classes.formControlTexeField}>
                <TextField
                    fullWidth
                    maxRows={10}
                    multiline
                    variant="outlined"
                    name='address'
                    value={values.address}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    helperText={touched.address ? errors.address : ""}
                    error={touched.address ? Boolean(errors.address) : false}
                />
            </FormControl>
        </>
    );
};

export default FormPost;
