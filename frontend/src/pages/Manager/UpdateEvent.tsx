import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Button, CircularProgress, FormControl, FormLabel, TextField, Accordion, AccordionDetails, Container, Box } from "@mui/material";
import { Formik } from "formik";
import * as Yup from "yup";
import { useDispatch } from "react-redux";
import { updateEvent } from "redux/actions/Manager";
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';

const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
    },
    btn: {
        '&.MuiButton-root:hover': {
            backgroundColor: "transparent",
        }
    },
    accordion: {
        marginBottom: theme.spacing(3),
        padding: theme.spacing(1),
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
    event: any;
};

interface IInitialValues {
    nameEvent: string;
    location: string;
    dayStart: string;
    dayEnd: string;
    image: any;
    contentEvent: string;
    ggSheet: string;
}

const CreatePost: React.FC<Props> = ({ event }): JSX.Element => {
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

    const validationSchema = Yup.object({
        nameEvent: Yup.string().required("required!"),
        location: Yup.string().required("required!"),
        dayStart: Yup.string().required("required!"),
        dayEnd: Yup.string().required("required!"),
        contentEvent: Yup.string().required("required!"),
        ggSheet: Yup.string().required("required!"),
    });

    return (
        <Container style={{ maxWidth: 600 }}>
            <Formik
                enableReinitialize={true}
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
                    dispatch(updateEvent(formData, event._id, setSubmitting));
                }}
            >
                {({ values, handleChange, handleBlur, errors, touched, setFieldValue, isSubmitting, handleSubmit }) => (
                    <form noValidate onSubmit={handleSubmit} encType="multipart/form-data">
                        <Box display={"flex"}
                            flexDirection={'column'}
                            justifyContent={'center'}
                            alignItems={'center'}
                            style={{ backgroundColor: 'white', padding: '30px 0px', borderRadius: '20px' }}>
                            <FormControl fullWidth className={classes.formControl}>
                                <FormLabel classes={{ root: classes.formLabel }}>Tên sự kiện</FormLabel>
                                <TextField
                                    style={{ width: 237 }}
                                    fullWidth
                                    variant="outlined"
                                    name='nameEvent'
                                    value={values.nameEvent}
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                    placeholder='Nhập tên sự kiện'
                                    helperText={touched.nameEvent ? errors.nameEvent : ""}
                                    error={touched.nameEvent ? Boolean(errors.nameEvent) : false}
                                    inputProps={{
                                        style: {
                                            fontSize: '12px',
                                        }
                                    }}
                                />
                            </FormControl>
                            <FormControl fullWidth className={classes.formControl}>
                                <FormLabel classes={{ root: classes.formLabel }}>Địa điểm tổ chức</FormLabel>
                                <TextField
                                    style={{ width: 237 }}
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
                                    inputProps={{
                                        style: {
                                            fontSize: '12px',
                                        }
                                    }}
                                />
                            </FormControl>
                            <FormControl fullWidth className={classes.formControl}>
                                <FormLabel classes={{ root: classes.formLabel }}>Ngày giờ bắt đầu</FormLabel>
                                <TextField
                                    style={{ width: 237 }}
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
                                    inputProps={{
                                        style: {
                                            fontSize: '12px',
                                        }
                                    }}
                                />
                            </FormControl>
                            <FormControl fullWidth className={classes.formControl}>
                                <FormLabel classes={{ root: classes.formLabel }}>Ngày giờ kết thúc</FormLabel>
                                <TextField
                                    style={{ width: 237 }}
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
                                    inputProps={{
                                        style: {
                                            fontSize: '12px',
                                        }
                                    }}
                                />
                            </FormControl>
                            <FormControl fullWidth className={classes.formControl}>

                                <FormLabel classes={{ root: classes.formLabel }}>Nội dung sự kiện</FormLabel>
                                <ReactQuill theme="snow" value={values.contentEvent} onChange={(e: any) => {
                                    setFieldValue('contentEvent', e);
                                }} />
                            </FormControl>
                            <FormControl fullWidth className={classes.formControl}>
                                <FormLabel classes={{ root: classes.formLabel }}>Link Google Sheet</FormLabel>
                                <TextField
                                    style={{ width: 237 }}
                                    fullWidth
                                    multiline
                                    variant="outlined"
                                    name='ggSheet'
                                    value={values.ggSheet}
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                    placeholder='Nhập link Google Sheet'
                                    helperText={touched.ggSheet ? errors.ggSheet : ""}
                                    error={touched.ggSheet ? Boolean(errors.ggSheet) : false}
                                    inputProps={{
                                        style: {
                                            fontSize: '12px',
                                        }
                                    }}
                                />
                            </FormControl>
                            <FormControl fullWidth className={classes.formControl}>
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
                                disableRipple
                                style={{ backgroundColor: "black", color: "white" }}
                                type='submit'
                                variant='contained'
                                color='primary'
                                size='small'
                                className={classes.btn}
                                disabled={isSubmitting}
                            >
                                {isSubmitting ? <CircularProgress size='1rem' /> : "Cập Nhật Sự Kiện"}
                            </Button>
                        </Box>
                    </form>
                )}
            </Formik>
        </Container>
    );
};

export default CreatePost;
