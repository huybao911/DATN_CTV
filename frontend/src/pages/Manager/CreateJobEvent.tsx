import React from "react";
import { Box, Button, CircularProgress, Container, FormControl, FormLabel, TextField, Typography } from "@mui/material";
import { Formik } from "formik";
import * as Yup from "yup";
import { useDispatch } from "react-redux";
import { createJobEvent } from "redux/actions/Manager";
import FormEvent from "pages/auth/FormEvent-Manager";
import { makeStyles } from "@material-ui/core";
import { useHistory } from "react-router-dom";

const useStyles = makeStyles((theme) => ({
    formLabel: {
        fontWeight: 600,
        marginBottom: theme.spacing(1.5),
    },
    formControl: {
        margin: theme.spacing(1, 0),
    },
    placeholder: {
        color: "#aaa"
    },
    selectStyle: {
        fontSize: '13px',
        marginBottom: '28px',
        marginTop: 10,
        width: 300,
        "& fieldset": {
            borderRadius: "10px",
        },
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
    event: any;
}

const CreateJobEvent: React.FC<Props> = ({ jobEvent }): JSX.Element => {
    const dispatch = useDispatch();
    const history = useHistory();
    const classes = useStyles();

    const initialValues: IInitialValues = {
        nameJob: jobEvent?.nameJob ?? "",
        quantity: jobEvent?.quantity ?? "",
        unitPrice: jobEvent?.unitPrice ?? "",
        jobDescription: jobEvent?.jobDescription ?? "",
        jobRequest: jobEvent?.jobRequest ?? "",
        event: jobEvent?.event ?? "",
    };


    const onHandleSubmit = (
        values: IInitialValues,
        { setSubmitting }: any
    ): Promise<void> =>
        dispatch<any>(createJobEvent(values, setSubmitting));

    const validationSchema = Yup.object({
        nameJob: Yup.string().required("required!"),
        quantity: Yup.string().required("required!"),
        unitPrice: Yup.string().required("required!"),
        jobDescription: Yup.string().required("required!"),
        jobRequest: Yup.string().required("required!"),
        event: Yup.string().required("required!"),
    });

    return (
        <Container style={{ maxWidth: 600 }}>
            <Formik
                enableReinitialize
                initialValues={initialValues}
                validationSchema={validationSchema}
                onSubmit={onHandleSubmit}
                onReset = {(values, { resetForm }) => resetForm()}
            >
                {({ isSubmitting, handleSubmit, values, handleChange, handleBlur,setSubmitting, errors, touched, }) => (
                    <form noValidate onSubmit={handleSubmit}>
                        <Box display={"flex"}
                            flexDirection={'column'}
                            justifyContent={'center'}
                            alignItems={'center'}
                            style={{ backgroundColor: 'white', padding: '30px 0px', borderRadius: '20px' }}>
                            <Typography style={{ fontWeight: "bold", fontSize: "18px", margin: 20 }} >
                                Thêm Công việc
                            </Typography>
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

                            <FormEvent isEvent={true} />
                            <Box>
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
                                    {isSubmitting ? <CircularProgress size='1rem' /> : "Tạo Công Việc"}
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
        </Container>
    );
};

export default CreateJobEvent;
