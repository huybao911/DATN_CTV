import React from "react";

import { makeStyles } from "@material-ui/core/styles";
import { FormControl, FormLabel, MenuItem, Select } from "@material-ui/core";
import { useFormikContext } from "formik";

import { getEvents } from "redux/actions/Manager";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "redux/reducers";
import { IEvent } from "redux/types/event";

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
    isEvent?: boolean;
};

interface IInitialValues {
    event: any;
}

// const Placeholder = ({ children }: { children: any }) => {
//     const classes = useStyles();
//     return <div className={classes.placeholder}>{children}</div>;
// };

const FormField: React.FC<Props> = ({ isEvent = false }): JSX.Element => {
    const classes = useStyles();
    const dispatch = useDispatch();

    const { values, handleChange, handleBlur, touched, errors } =
        useFormikContext<IInitialValues>();

    const [events, setEvents] = React.useState<IEvent[]>([]);
    const Event = useSelector((state: RootState) => state.manager);


    React.useEffect(() => {
        dispatch(getEvents());
    }, [dispatch]);

    React.useEffect(() => {
        setEvents(() => Event?.events?.filter((event: any) => event.nameEvent));
    }, [Event]);

    return (
        <>

            {isEvent ? (
                <FormControl className={classes.formControl}>
                    <FormLabel style={{ fontWeight: "bold", fontSize: "14px", marginTop: "5px" }}>
                        Sự kiện
                    </FormLabel>

                    <Select 
                        name="event"
                        labelId="demo-simple-select-label"
                        id="handle-event"
                        value={values.event._id}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        error={touched.event ? Boolean(errors.event) : false}
                        className={classes.selectStyle}

                        variant={'outlined'}
                        MenuProps={{
                            PaperProps: {
                                style: {
                                    fontSize: 10,
                                },
                            },
                        }}
                    >
                        {events?.map((event: any) => (
                            <MenuItem value={event._id} key={event._id}>
                                {event.nameEvent}
                            </MenuItem>
                        ))}
                    </Select>
                </FormControl>
            ) : null}

        </>
    );
};

export default FormField;
