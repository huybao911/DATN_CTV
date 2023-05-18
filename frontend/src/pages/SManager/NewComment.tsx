import * as React from "react";
import { useDispatch, useSelector } from "react-redux";
import { getEventApprove } from "redux/actions/sManager";
import { RootState } from "redux/reducers";
import { Box } from "@mui/material";
import UpdateComment from "./UpdateComment";
import { IEvent } from "redux/types/event";
const NewEvent: React.FC = (): JSX.Element => {

    const dispatch = useDispatch();

    const [events, setEvents] = React.useState<IEvent[]>([]);
    const smanager = useSelector((state: RootState) => state.smanager);

    React.useEffect(() => {
        dispatch(getEventApprove());
    }, [dispatch]);

    React.useEffect(() => {
        setEvents(() => 
        smanager?.events?.filter((event: any) =>
        event.nameEvent
         ));
    }, [smanager]);

    React.useEffect(() => {
        document.title = "EVENT";
    }, []);

    return (
        <>
            {events.map((event: any) =>
                <Box key={event._id} >
                    <UpdateComment event={event}  />
                </Box>
            )}
        </>
    );
};

export default NewEvent;
