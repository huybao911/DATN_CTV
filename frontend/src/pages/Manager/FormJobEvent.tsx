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


interface IValues {
    nameJob: string;
    quantity: number;
    unitPrice: number;
    jobDescription: string;
    jobRequest: string;
}


const FormEvent: React.FC = (): JSX.Element => {
    const classes = useStyles();
    const { values, handleChange, handleBlur, errors, touched } =
        useFormikContext<IValues>();

    return (
        <>
            <FormControl fullWidth className={classes.formControl}>
                <FormLabel classes={{ root: classes.formLabel }}>Tên công việc</FormLabel>
                <TextField
                    fullWidth
                    variant="outlined"
                    name='nameJob'
                    value={values.nameJob}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    placeholder='Nhập tên công việc'
                    helperText={touched.nameJob ? errors.nameJob : ""}
                    error={touched.nameJob ? Boolean(errors.nameJob) : false}
                />
            </FormControl>
            <FormControl fullWidth className={classes.formControl}>
                <FormLabel classes={{ root: classes.formLabel }}>Số lượng người</FormLabel>
                <TextField
                    fullWidth
                    variant="outlined"
                    name='quantity'
                    value={values.quantity}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    placeholder='Nhập số lượng người'
                    helperText={touched.quantity ? errors.quantity : ""}
                    error={touched.quantity ? Boolean(errors.quantity) : false}
                />
            </FormControl>
            <FormControl fullWidth className={classes.formControl}>
                <FormLabel classes={{ root: classes.formLabel }}>Đơn giá</FormLabel>
                <TextField
                    fullWidth
                    variant="outlined"
                    name='unitPrice'
                    value={values.unitPrice}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    placeholder='Nhập đơn giá'
                    helperText={touched.unitPrice ? errors.unitPrice : ""}
                    error={touched.unitPrice ? Boolean(errors.unitPrice) : false}
                />
            </FormControl>
            <FormControl fullWidth className={classes.formControl}>
                <FormLabel classes={{ root: classes.formLabel }}>Mô tả công việc</FormLabel>
                <TextField
                    fullWidth
                    variant="outlined"
                    name='jobDescription'
                    value={values.jobDescription}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    placeholder='Nhập mô tả công việc'
                    helperText={touched.jobDescription ? errors.jobDescription : ""}
                    error={touched.jobDescription ? Boolean(errors.jobDescription) : false}
                />
            </FormControl>
            <FormControl fullWidth className={classes.formControl}>
                <FormLabel classes={{ root: classes.formLabel }}>Yêu cầu công việc</FormLabel>
                <TextField
                    fullWidth
                    variant="outlined"
                    name='jobRequest'
                    value={values.jobRequest}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    placeholder='Nhập yêu cầu công việc'
                    helperText={touched.jobRequest ? errors.jobRequest : ""}
                    error={touched.jobRequest ? Boolean(errors.jobRequest) : false}
                />
            </FormControl>
        </>
    );
};

export default FormEvent;
