import React from "react";

import { makeStyles } from "@material-ui/core/styles";
import { useFormikContext } from "formik";
import { MenuItem, FormControl, FormLabel, Select } from "@material-ui/core";

import { getDepartments } from "redux/actions/admin";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "redux/reducers";
import { IDepartment } from "redux/types/department";

const useStyles = makeStyles((theme) => ({
    formLabel: {
        fontWeight: 600,
        marginBottom: theme.spacing(1.5),
    },
    formControl: {
        margin: theme.spacing(0, 0),
    },
    placeholder: {
        color: "#aaa"
    },
    selectStyle: {
        fontSize: '13px',
        marginBottom: '28px',
        marginTop: 10,
        "& fieldset": {
            borderRadius: "10px",
        },
    },
}));

type Props = {
    isDepartmentCbb?: boolean;
};

interface IInitialValues {
    department: any;
}

// const Placeholder = ({ children }: { children: any }) => {
//     const classes = useStyles();
//     return <div className={classes.placeholder}>{children}</div>;
// };

const FormField: React.FC<Props> = ({ isDepartmentCbb = false }): JSX.Element => {
    const classes = useStyles();
    const dispatch = useDispatch();

    const { values, handleChange, handleBlur, touched, errors } =
        useFormikContext<IInitialValues>();

    const [departments, setDepartments] = React.useState<IDepartment[]>([]);
    const Department = useSelector((state: RootState) => state.admin);


    React.useEffect(() => {
        dispatch(getDepartments());
    }, [dispatch]);

    React.useEffect(() => {
        setDepartments(() => Department?.departments?.filter((department: any) => department.nameDepartment));
    }, [Department]);

    return (
        <>

            {isDepartmentCbb ? (
                <FormControl fullWidth className={classes.formControl}>
                    <FormLabel style={{ fontWeight: "bold", fontSize: "14px", marginTop: "5px" }}>Khoa</FormLabel>
                    <Select
                        name="department._id"
                        labelId="demo-simple-select-label"
                        id="handle-department"
                        value={values.department._id}
                        className={classes.selectStyle}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        error={touched.department ? Boolean(errors.department) : false}
                        variant={'outlined'}
                        MenuProps={{
                            PaperProps: {
                                style: {
                                    fontSize: 10,
                                },
                            },
                        }}
                    >
                        {departments?.map((department: any) => (
                            <MenuItem value={department._id} key={department._id}>
                                {department.nameDepartment}
                            </MenuItem>
                        ))}
                    </Select>
                </FormControl>
            ) : null}

        </>
    );
};

export default FormField;
