import * as React from "react";
import { useDispatch, useSelector } from "react-redux";
import { getEvent } from "redux/actions/sManager";
import { RootState } from "redux/reducers";
import { IEvent } from "redux/types/event";
import MoreVertIcon from '@mui/icons-material/MoreVert';

import ClearIcon from '@mui/icons-material/Clear';
import RefreshIcon from '@mui/icons-material/Refresh';
import AddIcon from '@mui/icons-material/Add';

import { Link, NavLink } from 'react-router-dom';

import { Button, Container, Typography, Card, CardContent, CardMedia, Box, Popover, Avatar, Box as BoxButton, FormControl, Toolbar, Divider } from '@mui/material';
import { styled } from "@material-ui/core/styles";
import { formatDistance } from "date-fns";
import { StyledMenuItem } from "layouts/navigation/style";

const EventAccept: React.FC = (): JSX.Element => {

    const dispatch = useDispatch();

    const StyledRoot = styled(Toolbar)(({ theme }) => ({
        justifyContent: 'center',
        padding: theme.spacing(0, 3, 0, 3),
    }));



    const [events, setEvents] = React.useState<IEvent[]>([]);
    const [anchorEl, setAnchorEl] = React.useState([null]);
    const smanager = useSelector((state: RootState) => state.smanager);

    const [anchorElUser, setAnchorElUser] = React.useState([null]);

    const handleClickUser = (event: any, index: any) => {
        const newAnchorEls = [
            ...anchorElUser.slice(0, index),
            event.currentTarget,
            ...anchorElUser.slice(index + 1)
        ];
        setAnchorElUser(newAnchorEls);
    };
    const handleCloseUser = (index: any) => {
        const newAnchorEls = [
            ...anchorElUser.slice(0, index),
            null,
            ...anchorElUser.slice(index + 1)
        ];
        setAnchorElUser(newAnchorEls);
    };

    React.useEffect(() => {
        dispatch(getEvent());
    }, [dispatch]);

    React.useEffect(() => {
        setEvents(() =>
            smanager?.events?.filter((event: any) =>
                event.nameEvent
            ));
    }, [smanager]);

    const handleOpenMenu = (event: any, index: any) => {
        const newAnchorEls = [
            ...anchorEl.slice(0, index),
            event.currentTarget,
            ...anchorEl.slice(index + 1)
        ];
        setAnchorEl(newAnchorEls);
    };

    const handleCloseMenu = (index: any) => {
        const newAnchorEls = [
            ...anchorEl.slice(0, index),
            null,
            ...anchorEl.slice(index + 1)
        ];
        setAnchorEl(newAnchorEls);
    };

    React.useEffect(() => {
        document.title = "Sự kiện | Manager";
    }, []);

    return (

        <Container >
            <StyledRoot style={{ display: "flex", flexDirection: "column" }}>
                {/* navigate */}
                <Box style={{ display: "flex", flexDirection: "row", width: 680 }}>
                    <Box>
                        <Typography gutterBottom style={{ color: "black", fontSize: "20px", fontWeight: 'bold' }}>
                            Danh Sách Sự Kiện Đã Duyệt
                        </Typography>
                    </Box>
                </Box>
                {events.map((event: any, index) =>
                    <Box key={event._id} width={680} marginTop={4}>
                        <Box >
                            <Card style={{ boxShadow: "none", padding: 50, borderRadius: "24px" }}>
                                {/* header */}
                                <Box style={{ marginBottom: "20px" }}>
                                    <Box style={{ fontSize: 24, lineHeight: 3, fontWeight: '700', letterSpacing: 0.4 }}>
                                        {event?.nameEvent ?? null}
                                    </Box>
                                </Box>

                                <Box style={{ marginBottom: "20px" }}>
                                    <Box
                                        style={{
                                            display: "flex", flexDirection: "row", alignItems: "left",
                                            borderRadius: "40px",
                                        }}>
                                        <Avatar style={{ backgroundColor: "red", marginRight: "15px", width: '30px', height: '30px', fontSize: '13px' }}>
                                            {event.poster.username.charAt(0).toUpperCase()}
                                        </Avatar>
                                        <Box>
                                            <Typography style={{ fontWeight: "600", fontSize: '15px' }}>{event.poster.username}</Typography>
                                            <Typography style={{ fontWeight: "400", fontSize: '13px', color: 'rgb(145, 158, 171)' }}>{event.poster.department.nameDepartment}</Typography>
                                        </Box>
                                    </Box>
                                </Box>
                                {/* noidung */}
                                <Box style={{ marginBottom: "20px" }}>
                                    <Typography gutterBottom style={{ color: "black", fontSize: "16px", fontWeight: '600' }}>
                                        Nội dung
                                    </Typography>
                                    <Box style={{ fontSize: '13px' }} dangerouslySetInnerHTML={{ __html: event.contentEvent }} />
                                </Box>
                                {/* job */}
                                <Box style={{ marginBottom: "20px" }}>
                                    <Typography gutterBottom style={{ color: "black", fontSize: "16px", fontWeight: '600' }}>
                                        Công việc
                                    </Typography>
                                    {event.job.map((job: any) =>
                                        <Box style={{ fontSize: '13px', paddingBottom: 5 }}>
                                            • {job.nameJob}
                                        </Box>
                                    )}
                                </Box>

                                {/* detail */}
                                <Typography gutterBottom style={{ color: "black", fontSize: "16px", fontWeight: '600' }}>
                                    Chi tiết
                                </Typography>
                                <Box display={"flex"}
                                    flexDirection={'column'}
                                    justifyContent={'center'}
                                    alignItems={'center'}
                                    style={{ backgroundColor: 'white', padding: '20px 0px', borderRadius: '20px' }}>

                                    <Box sx={{
                                        display: 'grid',
                                        gap: 4,
                                        gridTemplateColumns: 'repeat(3, 1fr)',
                                        color: "rgb(33, 43, 54)",
                                        columnGap: 11

                                    }} >

                                        <FormControl sx={{ alignItems: 'center', gap: 1 }} >
                                            <Box sx={{ fontSize: '14px', color: '#757575', fontWeight: 500, }}>
                                                Số lượng
                                            </Box>
                                            <Box sx={{ fontSize: '14px', fontWeight: '1000' }}>
                                                {event.quantityUser}
                                            </Box>
                                        </FormControl>

                                        <FormControl sx={{ alignItems: 'center', gap: 1 }} >
                                            <Box sx={{ fontSize: '14px', color: '#757575', fontWeight: 500, }}>Địa điểm</Box>
                                            <Box sx={{ fontSize: '14px', fontWeight: '1000' }}>{event.location}</Box>
                                        </FormControl>

                                        <FormControl sx={{ alignItems: 'center', gap: 1 }} >
                                            <Box sx={{ fontSize: '14px', color: '#757575', fontWeight: 500, }}>Tổng chi phí </Box>
                                            <Box sx={{ fontSize: '14px', fontWeight: '1000' }}>{new Intl.NumberFormat().format(event.costs)}</Box>
                                        </FormControl>

                                        <FormControl sx={{ alignItems: 'center', gap: 1 }} >
                                            <Box sx={{ fontSize: '14px', color: '#757575', fontWeight: 500, }}>Ngày bắt đầu </Box>
                                            <Box sx={{ fontSize: '14px', fontWeight: '1000' }} >
                                                {event.dayStart}
                                            </Box>
                                        </FormControl>

                                        <FormControl sx={{ alignItems: 'center', gap: 1 }} >
                                            <Box sx={{ fontSize: '14px', color: '#757575', fontWeight: 500, }}>Ngày kết thúc </Box>
                                            <Box sx={{ fontSize: '14px', fontWeight: '1000' }}>
                                                {event.dayEnd}
                                            </Box>
                                        </FormControl>

                                    </Box>
                                </Box>

                                {/* Image event */}
                                <Box display={"flex"}
                                    flexDirection={'column'}
                                    justifyContent={'center'}
                                    alignItems={'center'}>

                                    <CardMedia
                                        component="img"
                                        image={event.image}
                                        alt="Không có ảnh"
                                        style={{ width: 500, borderRadius: 10, margin: '14px 0' }}
                                    />
                                </Box>
                            </Card>
                        </Box>
                    </Box>
                )
                }
            </StyledRoot >
        </Container >
    );
};

export default EventAccept;
