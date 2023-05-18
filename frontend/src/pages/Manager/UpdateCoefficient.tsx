import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Button, CircularProgress } from "@material-ui/core";
import { Formik } from "formik";
import * as Yup from "yup";
import Accordion from "@mui/material/Accordion";
import AccordionDetails from "@mui/material/AccordionDetails";
import { useDispatch } from "react-redux";
import { updateCoefficient } from "redux/actions/Manager";
import { FormControl, FormLabel, TextField } from "@mui/material";

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
        margin: theme.spacing(2, 0),
    },
}));

type Props = {
    event: any;
    job: any
};

interface IInitialValues {
    coefficient: string;
}

const UpdateCoefficient: React.FC<Props> = ({ event, job }): JSX.Element => {
    const classes = useStyles();
    const dispatch = useDispatch();

    const initialValues: IInitialValues = {
        coefficient: job?.coefficient ?? "",
    };


    const onHandleSubmit = (
        values: IInitialValues,
        { setSubmitting }: any
    ): Promise<void> =>
        dispatch<any>(updateCoefficient(values, event._id, job._id, setSubmitting));

    const validationSchema = Yup.object({
        coefficient: Yup.string().required("required!"),
    });

    return (
        <Accordion className={classes.accordion} elevation={0}>
            <AccordionDetails>
                <Formik
                    enableReinitialize
                    initialValues={initialValues}
                    validationSchema={validationSchema}
                    onSubmit={onHandleSubmit}
                >
                    {({ values, handleChange, handleBlur, errors, touched, isSubmitting, handleSubmit }) => (
                        <form noValidate onSubmit={handleSubmit}>
                            <FormControl fullWidth className={classes.formControl}>
                                <FormLabel classes={{ root: classes.formLabel }}>Hệ số</FormLabel>
                                <TextField
                                    fullWidth
                                    variant="outlined"
                                    name='coefficient'
                                    value={values.coefficient}
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                    placeholder='Nhập hệ số '
                                    helperText={touched.coefficient ? errors.coefficient : ""}
                                    error={touched.coefficient ? Boolean(errors.coefficient) : false}
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
                                {isSubmitting ? <CircularProgress size='1rem' /> : "Cập Nhật Hệ Số"}
                            </Button>
                        </form>
                    )}
                </Formik>
            </AccordionDetails>
        </Accordion>
    );
};

export default UpdateCoefficient;
