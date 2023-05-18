import * as React from "react";
import { useDispatch, useSelector } from "react-redux";
import { getUser } from "redux/actions/Manager";
import { RootState } from "redux/reducers";
import { IManager } from "redux/types/Manager";
import { Box } from "@mui/material";
import CreateJobEvent from "./CreateJobEvent";
const NewEvent: React.FC = (): JSX.Element => {

    const dispatch = useDispatch();

    const [Managers, setManagers] = React.useState<IManager[]>([]);
    const manager = useSelector((state: RootState) => state.manager);

    React.useEffect(() => {
        dispatch(getUser());
    }, [dispatch]);

    React.useEffect(() => {
        setManagers(() =>
            manager?.users?.filter((user: any) =>
                user.role.keyRole === "manager"
            ));
    }, [manager]);

    React.useEffect(() => {
        document.title = "Công việc sự kiện | CTV";
    }, []);

    return (

        <>
            {Managers.map((jobEvent: any) =>
                <Box key={jobEvent._id} >
                    <CreateJobEvent jobEvent={jobEvent} />
                </Box>
            )}
        </>
    );
};

export default NewEvent;
