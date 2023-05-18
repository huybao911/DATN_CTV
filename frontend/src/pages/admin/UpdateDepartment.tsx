import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Button, CircularProgress, Box } from "@material-ui/core";
import { Formik } from "formik";
import * as Yup from "yup";
import { useDispatch } from "react-redux";
import { updateDepartment } from "redux/actions/admin";
import FormDepartment from "pages/admin/FormFieldDepartment";

const useStyles = makeStyles((theme) => ({
    btnLogin: {
        '&.MuiButton-root:hover': {
            backgroundColor: "transparent",
        }
    },
}));

type Props = {
    department: any;
};

interface IInitialValues {
    nameDepartment: string;
    keyDepartment: string;
}

const CommentPost: React.FC<Props> = ({ department }): JSX.Element => {
    const dispatch = useDispatch();
    const classes = useStyles();

    const initialValues: IInitialValues = {
        nameDepartment: department?.nameDepartment ?? "",
        keyDepartment: department?.keyDepartment ?? "",
    };


    const onHandleSubmit = (
        values: IInitialValues,
        { setSubmitting }: any
    ): Promise<void> =>
        dispatch<any>(updateDepartment(values, department._id, setSubmitting));

    const validationSchema = Yup.object({
        nameDepartment: Yup.string().required("required!"),
        keyDepartment: Yup.string().required("required!"),
    });

    return (
        <Formik
            enableReinitialize
            initialValues={initialValues}
            validationSchema={validationSchema}
            onSubmit={onHandleSubmit}
        >
            {({ isSubmitting, handleSubmit }) => (
                <form noValidate onSubmit={handleSubmit}>
                    <Box>
                        <FormDepartment />
                        <Button
                             disableRipple
                             style={{ backgroundColor: "black", color: "white" }}
                             type='submit'
                             variant='contained'
                             color='primary'
                             size='small'
                             className={classes.btnLogin}
                             disabled={isSubmitting}
                        >
                            {isSubmitting ? <CircularProgress size='1rem' /> : "Cập nhật khoa"}
                        </Button>
                    </Box>
                </form>
            )}
        </Formik>
    );
};

export default CommentPost;
