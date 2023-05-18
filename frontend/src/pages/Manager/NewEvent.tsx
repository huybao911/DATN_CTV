import * as React from "react";
import { useDispatch, useSelector } from "react-redux";
import { getUser } from "redux/actions/Manager";
import { RootState } from "redux/reducers";
import { IManager } from "redux/types/Manager";
import { Box } from "@mui/material";
import CreateEvent from "./CreateEvent";
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
        document.title = "EVENT";
    }, []);

    return (
        <>
            {Managers.map((event: any) =>
                <Box key={event._id} >
                    <CreateEvent event={event}  />
                </Box>
            )}
        </>
    );
};

export default NewEvent;
