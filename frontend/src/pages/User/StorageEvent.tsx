import * as React from "react";
import { styled } from "@material-ui/core/styles";
import { useDispatch, useSelector } from "react-redux";
import { getStorager } from "redux/actions/user";
import { RootState } from "redux/reducers";
import { IEvent } from "redux/types/event";
import FeedStorageEvent from "pages/User/FeedStorageEvent";
import { Typography, OutlinedInput, InputAdornment, Box, Container } from '@material-ui/core';
import SearchIcon from '@mui/icons-material/Search';
import { Link } from "react-router-dom";

const StyledSearch = styled(OutlinedInput)(({ theme }) => ({
    width: 240,
    '& fieldset': {
        borderWidth: `1px !important`,
        // borderColor: `${alpha(theme.palette.grey[500], 0.32)} !important`,
        borderColor: '#rgba(0, 0, 0, 0.87)'
    },
}));

const StoragePost: React.FC = (): JSX.Element => {

    const dispatch = useDispatch();

    const [events, setEvents] = React.useState<IEvent[]>([]);
    const [filterName, setFilterName] = React.useState('');
    const user = useSelector((state: RootState) => state.user);

    React.useEffect(() => {
        dispatch(getStorager());
    }, [dispatch]);

    React.useEffect(() => {
        setEvents(() =>
            user?.events?.filter((event: any) =>
                event.nameEvent
            ));
    }, [user]);

    React.useEffect(() => {
        document.title = "Lưu Bài Viết | CTV";
    }, []);

    const handleFilterByName = (event: any) => {
        const keyword = event.target.value;

        if (keyword !== '') {
            const results = user?.events?.filter((event: any) => {
                return event.nameEvent.toLowerCase().startsWith(keyword.toLowerCase()) || event.location.toLowerCase().startsWith(keyword.toLowerCase()) || event.job.some((job: any) => job.nameJob.toLowerCase().startsWith(keyword.toLowerCase()));
                // Use the toLowerCase() method to make it case-insensitive
            });
            setEvents(results);
        } else {
            setEvents(() => user?.events?.filter((event: any) => event.nameEvent || event.location || event.job.some((job: any) => job.nameJob)));
        }

        setFilterName(keyword);
    };

    return (
        <Container>
            <Typography style={{ fontSize: "30px", fontWeight: "bold", margin: "30px 0px 0px -83px", }}>Sự Kiện Đã Lưu</Typography>
            <Box textAlign={"center"} sx={{ flexGrow: 1 }}>
                <StyledSearch
                    style={{ borderRadius: '20px', fontSize: '15px', height: "48px", width: "500px", marginRight: '16px' }}
                    value={filterName}
                    onChange={handleFilterByName}
                    placeholder="Tìm kiếm..."
                    startAdornment={
                        <InputAdornment position="start" style={{ paddingLeft: 1.3 }}>
                            <SearchIcon style={{ width: '20px' }} sx={{ color: 'rgba(0, 0, 0, 0.87)' }} />
                        </InputAdornment>
                    }
                />
            </Box>
            {events.map((event: any) =>
                <Link style={{ textDecoration: "none" }} to={`/storageEvent/${event._id}`}>
                    <FeedStorageEvent event={event} key={event._id} />
                </Link>
            )}
        </Container>
    );
};

export default StoragePost;
