import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Box, Button, CircularProgress, FormControl, FormLabel, TextField, Typography, } from "@mui/material";
import { Formik } from "formik";
import * as Yup from "yup";
import { useDispatch } from "react-redux";
import { updateJobEvent } from "redux/actions/Manager";
import FormEvent from "pages/auth/FormEvent-Manager";
import { Container } from "@mui/material";

const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
    },
    btnLogin: {
        marginTop: theme.spacing(1.5),
        marginRight: theme.spacing(1),
        padding: theme.spacing(1, 2),
    },
    formLabel: {
        fontWeight: 600,
        marginBottom: theme.spacing(1.5),
    },
    formControl: {
        margin: theme.spacing(1, 0),
    },
}));

type Props = {
    jobEvent: any;
};

interface IInitialValues {
    nameJob: string;
    quantity: number;
    unitPrice: number;
    jobDescription: string;
    jobRequest: string;
    benefit: string;
    event: any;
}

const UpdateJobEvent: React.FC<Props> = ({ jobEvent }): JSX.Element => {
    const classes = useStyles();
    const dispatch = useDispatch();

    const initialValues: IInitialValues = {
        nameJob: jobEvent?.nameJob ?? "",
        quantity: jobEvent?.quantity ?? "",
        unitPrice: jobEvent?.unitPrice ?? "",
        jobDescription: jobEvent?.jobDescription ?? "",
        jobRequest: jobEvent?.jobRequest ?? "",
        benefit: jobEvent?.benefit ?? "",
        event: jobEvent?.event ?? "",
    };


    const onHandleSubmit = (
        values: IInitialValues,
        { setSubmitting }: any
    ): Promise<void> =>
        dispatch<any>(updateJobEvent(values, jobEvent._id, setSubmitting));

    const validationSchema = Yup.object({
        nameJob: Yup.string().required("required!"),
        quantity: Yup.string().required("required!"),
        unitPrice: Yup.string().required("required!"),
        jobDescription: Yup.string().required("required!"),
        jobRequest: Yup.string().required("required!"),
        benefit: Yup.string().required("required!"),
    });

    return (
        <Container style={{ maxWidth: 600 }}>
            <Formik
                enableReinitialize
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
                            style={{ backgroundColor: 'white', padding: '30px 0px', borderRadius: '20px' }}>
                            <FormControl className={classes.formControl}>
                                <FormLabel style={{ fontWeight: "bold", fontSize: "14px", margin: "10px 0" }}>
                                    Tên công việc
                                </FormLabel>

                                <TextField
                                    style={{ width: 300 }}
                                    fullWidth
                                    variant={'outlined'}
                                    name='nameJob'
                                    value={values.nameJob}
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                    placeholder='Nhập tên công việc'
                                    inputProps={{
                                        style: {
                                            fontSize: '12px',
                                        }
                                    }}
                                    helperText={touched.nameJob ? errors.nameJob : ""}
                                    error={touched.nameJob ? Boolean(errors.nameJob) : false}
                                />
                            </FormControl>

                            <FormControl className={classes.formControl}>
                                <FormLabel style={{ fontWeight: "bold", fontSize: "14px", margin: "10px 0" }}>
                                    Số lượng người
                                </FormLabel>

                                <TextField
                                    style={{ width: 300 }}
                                    fullWidth
                                    variant={'outlined'}
                                    name='quantity'
                                    value={values.quantity}
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                    placeholder='Nhập số lượng người'
                                    inputProps={{
                                        style: {
                                            fontSize: '12px',
                                        }
                                    }}
                                    helperText={touched.quantity ? errors.quantity : ""}
                                    error={touched.quantity ? Boolean(errors.quantity) : false}
                                />
                            </FormControl>

                            <FormControl className={classes.formControl}>
                                <FormLabel style={{ fontWeight: "bold", fontSize: "14px", margin: "10px 0" }}>
                                    Đơn giá
                                </FormLabel>
                                <TextField
                                    style={{ width: 300 }}
                                    fullWidth
                                    variant="outlined"
                                    name='unitPrice'
                                    value={values.unitPrice}
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                    placeholder='Nhập đơn giá'
                                    helperText={touched.unitPrice ? errors.unitPrice : ""}
                                    error={touched.unitPrice ? Boolean(errors.unitPrice) : false}
                                    inputProps={{
                                        style: {
                                            fontSize: '12px',
                                        }
                                    }}
                                />
                            </FormControl>

                            <FormControl className={classes.formControl}>
                                <FormLabel style={{ fontWeight: "bold", fontSize: "14px", margin: "10px 0" }}>
                                    Mô tả công việc
                                </FormLabel>

                                <TextField
                                    style={{ width: 300 }}
                                    fullWidth
                                    variant="outlined"
                                    name='jobDescription'
                                    value={values.jobDescription}
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                    placeholder='Nhập mô tả công việc'
                                    helperText={touched.jobDescription ? errors.jobDescription : ""}
                                    error={touched.jobDescription ? Boolean(errors.jobDescription) : false}
                                    inputProps={{
                                        style: {
                                            fontSize: '12px',
                                        }
                                    }}
                                />
                            </FormControl>

                            <FormControl className={classes.formControl}>
                                <FormLabel style={{ fontWeight: "bold", fontSize: "14px", margin: "10px 0" }}>
                                    Yêu cầu công việc
                                </FormLabel>
                                <TextField
                                    style={{ width: 300 }}
                                    fullWidth
                                    variant="outlined"
                                    name='jobRequest'
                                    value={values.jobRequest}
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                    placeholder='Nhập yêu cầu công việc'
                                    helperText={touched.jobRequest ? errors.jobRequest : ""}
                                    error={touched.jobRequest ? Boolean(errors.jobRequest) : false}
                                    inputProps={{
                                        style: {
                                            fontSize: '12px',
                                        }
                                    }}
                                />
                            </FormControl>

                            <FormControl className={classes.formControl}>
                                <FormLabel style={{ fontWeight: "bold", fontSize: "14px", margin: "10px 0" }}>
                                    Quyền lợi công việc
                                </FormLabel>
                                <TextField
                                    style={{ width: 300 }}
                                    fullWidth
                                    variant="outlined"
                                    name='benefit'
                                    value={values.benefit}
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                    placeholder='Nhập quyền lợi công việc'
                                    helperText={touched.benefit ? errors.benefit : ""}
                                    error={touched.benefit ? Boolean(errors.benefit) : false}
                                    inputProps={{
                                        style: {
                                            fontSize: '12px',
                                        }
                                    }}
                                />
                            </FormControl>

                            <FormEvent isEvent={true} />
                            <Button
                                style={{ backgroundColor: "black", color: "white" }}
                                type='submit'
                                variant='contained'
                                color='primary'
                                size='small'
                                className={classes.btnLogin}
                                disabled={isSubmitting}
                            >
                                {isSubmitting ? <CircularProgress size='1rem' /> : "Cập Nhật Công Việc"}
                            </Button>
                        </Box>
                    </form>
                )}
            </Formik>
        </Container>
    );
};

export default UpdateJobEvent;
