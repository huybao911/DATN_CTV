import * as React from "react";
import { useDispatch, useSelector } from "react-redux";
import { getApplyJob } from "redux/actions/user";
import { RootState } from "redux/reducers";
import FeedApplyJob from "pages/User/FeedApplyJob";
import { Typography, Container } from '@mui/material';
import { IEvent } from "redux/types/event";

const ApplyJob: React.FC = (): JSX.Element => {

    const dispatch = useDispatch();

    const [events, setEvents] = React.useState<IEvent[]>([]);
    const user = useSelector((state: RootState) => state.user);

    React.useEffect(() => {
        dispatch(getApplyJob());
    }, [dispatch]);

    React.useEffect(() => {
        setEvents(() =>
            user?.events?.filter((event: any) =>
                event.nameEvent
            ));
    }, [user]);

    React.useEffect(() => {
        document.title = "Công việc đã ứng tuyển";
    }, []);

    return (

        <Container>
            <Typography style={{ fontSize: "30px", fontWeight: "bold", margin: "20px 0px 10px 15px" }}>Công Việc Đã Ứng Tuyển</Typography>
            {events.map((event: any) =>
                <FeedApplyJob event={event} key={event._id} />) ?? (
                    <p>No FeedApplyJob Found.</p>
                )}
        </Container>
    );
};

export default ApplyJob;
