import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import { FormControl, FormLabel,Grid, MenuItem, Select } from "@material-ui/core";
import { useFormikContext } from "formik";

import { getRoles } from "redux/actions/admin";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "redux/reducers";
import { IRole } from "redux/types/role";

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
    isRole?: boolean;
};

interface IValues {
    role?: any;
}

const FormField: React.FC<Props> = ({ isRole = false }): JSX.Element => {
    const classes = useStyles();
    const dispatch = useDispatch();
    const { values, handleChange, handleBlur, touched, errors } =
        useFormikContext<IValues>();
    const [roles, setRoles] = React.useState<IRole[]>([]);
    const Role = useSelector((state: RootState) => state.admin);

    React.useEffect(() => {
        dispatch(getRoles());
    }, [dispatch]);

    React.useEffect(() => {
        setRoles(() => Role?.roles?.filter((role: any) => role._id));
    }, [Role]);
    return (
        <>
            {isRole ? (
                <Grid item xs={12}>
                    <FormControl fullWidth className={classes.formControl}>
                        <FormLabel classes={{ root: classes.formLabel }}>Vai trò</FormLabel>
                        <Select
                            name='role'
                            labelId="demo-simple-select-label"
                            id="handle-role"
                            value={values.role._id}
                            onChange={handleChange}
                            onBlur={handleBlur}
                            error={touched.role ? Boolean(errors.role) : false}

                        // renderValue={
                        //     role !== "" ? undefined : () => <Placeholder>Role</Placeholder>
                        // }
                        >
                            {roles?.map((role: any) => (
                                <MenuItem value={role._id} key={role._id}>
                                    {role.nameRole}
                                </MenuItem>
                            ))}

                        </Select>
                    </FormControl>
                </Grid>
            ) : null}

        </>
    );
};

export default FormField;
