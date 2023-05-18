import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Button, CircularProgress, FormControl, FormLabel, TextField, Accordion, Box, Typography, Container } from "@mui/material";
import { Formik } from "formik";
import * as Yup from "yup";
import { useDispatch } from "react-redux";
import { createEvent } from "redux/actions/Manager";
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';

const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
    },
    accordion: {
        marginBottom: theme.spacing(3),
        padding: theme.spacing(1),
    },
    formLabel: {
        fontWeight: "bold",
        fontSize: "14px",
        marginTop: "5px"
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

type Props = {
    event: any;
};

interface IInitialValues {
    nameEvent: string;
    location: string;
    dayStart: string;
    dayEnd: string;
    image: string;
    contentEvent: string;
    ggSheet: string;
}

const CreateEvent: React.FC<Props> = ({ event }): JSX.Element => {
    const classes = useStyles();
    const dispatch = useDispatch();

    const initialValues: IInitialValues = {
        nameEvent: event?.nameEvent ?? "",
        location: event?.location ?? "",
        dayStart: event?.dayStart ?? "",
        dayEnd: event?.dayEnd ?? "",
        image: event?.image ?? "",
        contentEvent: event?.contentEvent ?? "",
        ggSheet: event?.ggSheet ?? "",
    };


    // const onHandleSubmit = (
    //     values: IInitialValues,
    //     { setSubmitting }: any
    // ): Promise<void> =>
    //     dispatch<any>(createEvent(values, setSubmitting));

    const validationSchema = Yup.object({
        nameEvent: Yup.string().required("required!"),
        location: Yup.string().required("required!"),
        dayStart: Yup.string().required("required!"),
        dayEnd: Yup.string().required("required!"),
        ggSheet: Yup.string().required("required!"),
        contentEvent: Yup.string().required("required!"),
    });

    return (
        <Container style={{ maxWidth: 600 }}>
            <Formik
                enableReinitialize
                initialValues={initialValues}
                validationSchema={validationSchema}
                onSubmit={(values: any, { setSubmitting }) => {
                    let formData = new FormData();
                    formData.append("nameEvent", values.nameEvent);
                    formData.append("location", values.location);
                    formData.append("dayStart", values.dayStart);
                    formData.append("dayEnd", values.dayEnd);
                    formData.append("image", values.image);
                    formData.append("contentEvent", values.contentEvent);
                    formData.append("ggSheet", values.ggSheet);
                    dispatch(createEvent(formData, setSubmitting));
                }}
            >
                {({ values, handleChange, handleBlur, errors, touched, setFieldValue, isSubmitting, handleSubmit }) => (
                    <form noValidate onSubmit={handleSubmit} encType="multipart/form-data">
                        <Box display={"flex"}
                            flexDirection={'column'}
                            justifyContent={'center'}
                            alignItems={'center'}
                            style={{ backgroundColor: 'white', padding: '40px 0px', borderRadius: '20px' }}>
                            <Typography style={{ fontWeight: "bold", fontSize: "18px", margin: 20 }} >
                                Thêm sự kiện
                            </Typography>
                            <FormControl>
                                <FormLabel classes={{ root: classes.formLabel }}>Tên sự kiện</FormLabel>
                                <TextField
                                    style={{ width: 300 }}
                                    className={classes.textField}
                                    fullWidth
                                    variant="outlined"
                                    name='nameEvent'
                                    value={values.nameEvent}
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                    placeholder='Nhập tên sự kiện'
                                    helperText={touched.nameEvent ? errors.nameEvent : ""}
                                    error={touched.nameEvent ? Boolean(errors.nameEvent) : false}
                                />
                            </FormControl>
                            <FormControl>
                                <FormLabel classes={{ root: classes.formLabel }}>Địa điểm tổ chức</FormLabel>
                                <TextField
                                    style={{ width: 300 }}
                                    className={classes.textField}
                                    fullWidth
                                    multiline
                                    variant="outlined"
                                    name='location'
                                    value={values.location}
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                    placeholder='Nhập địa điểm tổ chức'
                                    helperText={touched.location ? errors.location : ""}
                                    error={touched.location ? Boolean(errors.location) : false}
                                />
                            </FormControl>
                            <FormControl>
                                <FormLabel classes={{ root: classes.formLabel }}>Ngày giờ bắt đầu</FormLabel>
                                <TextField
                                    style={{ width: 300 }}
                                    className={classes.textField}
                                    fullWidth
                                    multiline
                                    variant="outlined"
                                    name='dayStart'
                                    value={values.dayStart}
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                    placeholder='Nhập ngày giờ bắt đầu'
                                    helperText={touched.dayStart ? errors.dayStart : ""}
                                    error={touched.dayStart ? Boolean(errors.dayStart) : false}
                                />
                            </FormControl>
                            <FormControl>
                                <FormLabel classes={{ root: classes.formLabel }}>Ngày giờ kết thúc</FormLabel>
                                <TextField
                                    style={{ width: 300 }}
                                    className={classes.textField}
                                    fullWidth
                                    multiline
                                    variant="outlined"
                                    name='dayEnd'
                                    value={values.dayEnd}
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                    placeholder='Nhập ngày giờ kết thúc'
                                    helperText={touched.dayEnd ? errors.dayEnd : ""}
                                    error={touched.dayEnd ? Boolean(errors.dayEnd) : false}
                                />
                            </FormControl>
                            <FormControl>
                                <FormLabel classes={{ root: classes.formLabel }}>Nội dung sự kiện</FormLabel>
                                <ReactQuill theme="snow" value={values.contentEvent} onChange={(e: any) => {
                                    setFieldValue('contentEvent', e);
                                }} />
                                {/* <TextField
                                    style={{ width: 300 }}
                                    className={classes.textField}
                                    fullWidth
                                    multiline
                                    variant="outlined"
                                    name='contentEvent'
                                    value={values.contentEvent}
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                    placeholder='Nhập nội dung sự kiện'
                                    helperText={touched.contentEvent ? errors.contentEvent : ""}
                                    error={touched.contentEvent ? Boolean(errors.contentEvent) : false}
                                /> */}
                            </FormControl>
                            <FormControl>
                                <FormLabel classes={{ root: classes.formLabel }}>Link Google Sheet</FormLabel>
                                <TextField
                                    style={{ width: 300 }}
                                    className={classes.textField}
                                    fullWidth
                                    multiline
                                    variant="outlined"
                                    name='ggSheet'
                                    value={values.ggSheet}
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                    placeholder='Nhập link google sheet'
                                    helperText={touched.ggSheet ? errors.ggSheet : ""}
                                    error={touched.ggSheet ? Boolean(errors.ggSheet) : false}
                                />
                            </FormControl>
                            <FormControl>
                                <FormLabel classes={{ root: classes.formLabel }}>Hình ảnh</FormLabel>
                                <input
                                    accept="image/*"
                                    name='image'
                                    type='file'
                                    onChange={(e: any) => {
                                        setFieldValue('image', e.target.files[0]);
                                    }}
                                    onBlur={handleBlur}
                                />
                            </FormControl>
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
                                    margin: "15px 10px 0px 0px"
                                }}
                            >
                                {isSubmitting ? <CircularProgress size='1rem' /> : "Tạo Sự Kiện"}
                            </Button>
                        </Box>

                    </form>
                )}
            </Formik>
        </Container>
    );
};

export default CreateEvent;
