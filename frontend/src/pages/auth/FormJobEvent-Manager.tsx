import React from "react";

import { makeStyles } from "@material-ui/core/styles";
import { FormControl, FormLabel, Select, MenuItem   } from "@material-ui/core";
import { useFormikContext } from "formik";

import { getJobEvents } from "redux/actions/Manager";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "redux/reducers";
import { IJobEvent } from "redux/types/jobEvent";

const useStyles = makeStyles((theme) => ({
    formLabel: {
        fontWeight: 600,
        marginBottom: theme.spacing(1.5),
    },
    formControl: {
        margin: theme.spacing(2, 0),
    },
    placeholder: {
        color: "#aaa"
    }
}));

type Props = {
    isJobEvent?: boolean;
};

interface IInitialValues {
    jobEvent: any;
}

// const Placeholder = ({ children }: { children: any }) => {
//     const classes = useStyles();
//     return <div className={classes.placeholder}>{children}</div>;
// };

const FormField: React.FC<Props> = ({ isJobEvent = false }): JSX.Element => {
    const classes = useStyles();
    const dispatch = useDispatch();

    const { values, handleChange, handleBlur, touched, errors } =
        useFormikContext<IInitialValues>();

    const [jobevents, setJobEvents] = React.useState<IJobEvent[]>([]);
    const JobEvent = useSelector((state: RootState) => state.manager);


    React.useEffect(() => {
        dispatch(getJobEvents());
    }, [dispatch]);

    React.useEffect(() => {
        setJobEvents(() => JobEvent?.jobevents?.filter((jobEvent: any) => jobEvent.nameJob));
    }, [JobEvent]);

    return (
        <>

            {isJobEvent ? (
                <FormControl fullWidth className={classes.formControl}>
                    <FormLabel classes={{ root: classes.formLabel }}>Công việc</FormLabel>
                    <Select
                        name="jobEvent"
                        labelId="demo-simple-select-label"
                        id="handle-event"
                        value={values.jobEvent._id}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        error={touched.jobEvent ? Boolean(errors.jobEvent) : false}

                    // renderValue={
                    //     role !== "" ? undefined : () => <Placeholder>Role</Placeholder>
                    // }
                    >
                        {jobevents?.map((jobEvent: any) => (
                            <MenuItem value={jobEvent._id} key={jobEvent._id}>
                                {jobEvent.nameJob}
                            </MenuItem>
                        ))}
                    </Select>
                </FormControl>
            ) : null}

        </>
    );
};

export default FormField;
