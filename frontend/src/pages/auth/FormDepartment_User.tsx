import React from "react";

import { makeStyles } from "@material-ui/core/styles";
import { FormControl, FormLabel, MenuItem, Select } from "@material-ui/core";
import { useFormikContext } from "formik";

import { getDepartments } from "redux/actions/user";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "redux/reducers";
import { IDepartment } from "redux/types/department";

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
    isDepartmentCbb?: boolean;
};

interface IInitialValues {
    department: string;
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
                    <FormLabel classes={{ root: classes.formLabel }}>Khoa</FormLabel>
                    <Select
                        name="department"
                        labelId="demo-simple-select-label"
                        id="handle-department"
                        value={values.department}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        error={touched.department ? Boolean(errors.department) : false}

                    // renderValue={
                    //     role !== "" ? undefined : () => <Placeholder>Role</Placeholder>
                    // }
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
