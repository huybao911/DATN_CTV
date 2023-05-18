import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Button, CircularProgress, Box } from "@material-ui/core";
import { Formik } from "formik";
import * as Yup from "yup";
import SendIcon from '@mui/icons-material/Send';
import { useDispatch } from "react-redux";
import { commentEvent } from "redux/actions/sManager";
import { FormControl, TextField } from "@mui/material";

const useStyles = makeStyles((theme) => ({
    btnLogin: {
        '&.MuiButton-root:hover': {
            backgroundColor: "transparent",
        }
    },
    formTextField: {
        "& .MuiInputBase-root": {
            "& fieldset": {
                borderRadius: 10,
            },
            "&.Mui-focused fieldset": {
                borderColor: "black"
            },
        }
    },
}));

type Props = {
    event: any;
};

interface IInitialValues {
    contentComment: string;
}

const CommentPost: React.FC<Props> = ({ event }): JSX.Element => {
    const dispatch = useDispatch();
    const classes = useStyles();

    const initialValues: IInitialValues = {
        contentComment: event?.contentComment ?? "",
    };

    const onHandleSubmit = (
        values: IInitialValues,
        { setSubmitting }: any
    ): Promise<void> =>
        dispatch<any>(commentEvent(values, event._id, setSubmitting));

    return (
        <Formik
            enableReinitialize
            initialValues={initialValues}
            onSubmit={onHandleSubmit}
        >
            {({ isSubmitting, handleSubmit, values, handleChange, handleBlur, errors, touched }) => (
                <form noValidate onSubmit={handleSubmit}>
                    <Box style={{ display: "flex", flexDirection: "row", marginTop: "30px" }}>
                        {/* <FormComment /> */}
                        <FormControl style={{ paddingLeft: 10 }}>
                            <TextField
                                style={{ width: 450, }}
                                className={classes.formTextField}
                                variant="outlined"
                                inputProps={{
                                    style: {
                                        fontSize: '12px',
                                        padding: '12px'
                                    }
                                }}
                                name='contentComment'
                                value={values.contentComment}
                                onChange={handleChange}
                                onBlur={handleBlur}
                                placeholder='Nhập bình luận...'
                            />
                        </FormControl>
                        <Button
                            disableRipple
                            type='submit'
                            className={classes.btnLogin}
                            disabled={isSubmitting}
                        >
                            {isSubmitting ? <CircularProgress size='1rem' /> : <SendIcon style={{ width: '16px' }} />}
                        </Button>
                    </Box>
                </form>
            )}
        </Formik>
    );
};

export default CommentPost;
