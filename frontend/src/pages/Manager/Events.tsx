import * as React from "react";
import { useDispatch, useSelector } from "react-redux";
import { getEvents, deleteEvent } from "redux/actions/Manager";
import { RootState } from "redux/reducers";
import { IEvent } from "redux/types/event";
import UpdateEvent from "pages/Manager/UpdateEvent";
import MoreVertIcon from '@mui/icons-material/MoreVert';

import ClearIcon from '@mui/icons-material/Clear';
import RefreshIcon from '@mui/icons-material/Refresh';
import AddIcon from '@mui/icons-material/Add';

import { Link, NavLink } from 'react-router-dom';

import { Button, Container, Typography, Card, CardContent, CardMedia, Box, Popover, Avatar, Box as BoxButton, FormControl, Toolbar, Divider } from '@mui/material';
import { styled } from "@material-ui/core/styles";
import { formatDistance } from "date-fns";
import { StyledMenuItem } from "layouts/navigation/style";

const Event: React.FC = (): JSX.Element => {

    const dispatch = useDispatch();

    const StyledRoot = styled(Toolbar)(({ theme }) => ({
        justifyContent: 'center',
        padding: theme.spacing(0, 3, 0, 3),
    }));



    const [events, setEvents] = React.useState<IEvent[]>([]);
    const [anchorEl, setAnchorEl] = React.useState([null]);
    const manager = useSelector((state: RootState) => state.manager);

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
        dispatch(getEvents());
    }, [dispatch]);

    React.useEffect(() => {
        setEvents(() =>
            manager?.events?.filter((event: any) =>
                event.nameEvent
            ));
    }, [manager]);

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
                            Danh Sách Sự Kiện
                        </Typography>
                    </Box>
                    <Box flexGrow={1} />
                    <Box
                        style={{ backgroundColor: 'rgb(33, 43, 54)', color: "white", fontSize: 13, fontWeight: "400", borderRadius: 6, textDecoration: "none", padding: "6px 8px", display:"flex", flexDirection:"row" }}
                        component={Link} to={"/event/newevent"}
                    >
                        <AddIcon style={{ width: '14px', color: "white", marginRight: "2px" }} />
                        <Box style={{ fontSize: '12px', paddingTop: "5px" }} >
                            Tạo Sự Kiện
                        </Box>
                    </Box>
                </Box>
                {events.map((event: any, index) =>
                    <Box key={event._id} width={680} marginTop={4}>
                        <Box >
                            <Card style={{ boxShadow: "none", padding: 50, borderRadius: "24px" }}>
                                {event?.approver === null ? (
                                    <Box display={"flex"} flexDirection={"row"}>
                                        <Box style={{ fontSize: 16, lineHeight: 3, fontWeight: '700', letterSpacing: 0.4, paddingRight: 7 }}>
                                            Người duyệt:
                                        </Box>
                                        <Box style={{ fontSize: 16, lineHeight: 3, letterSpacing: 0.4 }}>
                                            Chưa có người duyệt
                                        </Box>
                                    </Box>
                                ) : (
                                    <Box display={"flex"} flexDirection={"row"}>
                                        <Box style={{ fontSize: 16, lineHeight: 3, fontWeight: '700', letterSpacing: 0.4, paddingRight: 7 }}>
                                            Người duyệt:
                                        </Box>
                                        <Box style={{ fontSize: 16, lineHeight: 3, letterSpacing: 0.4 }}>
                                            {event.approver.username}
                                        </Box>
                                    </Box>
                                )}
                                {/* header */}
                                <Box style={{ display: "flex", justifyContent: "center", alignItems: "center", marginBottom: "20px" }}>
                                    <Box style={{ fontSize: 24, lineHeight: 3, fontWeight: '700', letterSpacing: 0.4 }}>
                                        {event?.nameEvent ?? null}
                                    </Box>
                                    <Box flexGrow={1} />

                                    <Button onClick={(event) => handleClickUser(event, index)}  >
                                        <MoreVertIcon style={{ color: "black" }} />
                                    </Button>
                                    <Popover
                                        open={!!anchorElUser[index]}
                                        anchorEl={anchorElUser[index]}
                                        onClose={() => handleCloseUser(index)}
                                        anchorReference="anchorPosition"
                                        anchorPosition={{ top: 300, left: 1330 }}
                                        anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
                                        transformOrigin={{ vertical: 'top', horizontal: 'right' }}
                                        PaperProps={{
                                            style: {
                                                borderRadius: 20,
                                                boxShadow: 'rgba(145, 158, 171, 0.24) 0px 0px 2px 0px, rgba(145, 158, 171, 0.24) -20px 20px 40px -4px',
                                            },
                                            sx: {
                                                p: 1,
                                                width: 180,
                                                overflowX: 'unset',
                                                overflowY: 'unset',
                                                '& .MuiMenuItem-root': {
                                                    px: 1,
                                                    py: 1,
                                                    typography: 'body2',
                                                    borderRadius: 1,
                                                    justifyContent: 'left'
                                                },
                                            },
                                        }}
                                    >
                                        <Box>
                                            <StyledMenuItem component={NavLink} to={`/jobEvents/${event._id}`}>
                                                <Typography style={{ fontSize: '14px' }}>Danh sách công việc</Typography>
                                            </StyledMenuItem>
                                            <StyledMenuItem component={NavLink} to={`/listUserApply/${event._id}`}>
                                                <Typography style={{ fontSize: '14px' }}>Danh sách ứng tuyển</Typography>
                                            </StyledMenuItem>

                                            <StyledMenuItem component={NavLink} to={`/listCTVEvent/${event._id}`}>
                                                <Typography style={{ fontSize: '14px' }}>Danh sách ctv</Typography>
                                            </StyledMenuItem>

                                            <StyledMenuItem component={NavLink} to={`/listCTVCalendar/${event._id}`}>
                                                <Typography style={{ fontSize: '14px' }}>Xuất file excel lịch làm </Typography>
                                            </StyledMenuItem>

                                            <StyledMenuItem component={NavLink} to={`/listCTVExcel/${event._id}`}>
                                                <Typography style={{ fontSize: '14px' }}>Xuất file excel lương </Typography>
                                            </StyledMenuItem>
                                        </Box>
                                    </Popover>
                                </Box>

                                <Box style={{ display: "flex", justifyContent: "center", alignItems: "center", marginBottom: "20px" }}>
                                    <Box
                                        style={{
                                            display: "flex", flexDirection: "row", alignItems: "center",
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
                                    <Box flexGrow={1} />
                                    <Box>
                                        <Button style={{ color: "white", backgroundColor: '#00ab55', marginRight: 20, textTransform: 'capitalize', borderRadius: '10px', padding: '4px 12px', fontSize: '12px' }} onClick={(event) => handleOpenMenu(event, index)}  >
                                            <RefreshIcon style={{ width: "16px", marginRight: '4px', fontWeight: '600' }} />
                                            Cập nhật
                                        </Button>
                                        <Popover
                                            open={!!anchorEl[index]}
                                            anchorEl={anchorEl[index]}
                                            onClose={() => handleCloseMenu(index)}
                                            anchorReference="anchorPosition"
                                            anchorPosition={{ top: 300, left: 1270 }}
                                            anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
                                            transformOrigin={{ vertical: 'top', horizontal: 'right' }}
                                            PaperProps={{
                                                sx: {
                                                    p: 1,
                                                    width: 300,
                                                    overflowX: 'unset',
                                                    overflowY: 'unset',
                                                    '& .MuiMenuItem-root': {
                                                        px: 1,
                                                        py: 1,
                                                        typography: 'body2',
                                                        borderRadius: 1,
                                                        justifyContent: 'left'
                                                    },
                                                },
                                            }}
                                        >
                                            <Box>
                                                <UpdateEvent event={event} key={event._id} />
                                            </Box>
                                        </Popover>
                                    </Box>
                                    <Button style={{ color: "white", backgroundColor: '#FF5630', textTransform: 'capitalize', borderRadius: '10px', fontSize: '12px', padding: '4px 12px' }} onClick={(e) => dispatch(deleteEvent(event._id))} >
                                        <ClearIcon style={{ width: "16px", marginRight: '4px' }} />
                                        Xóa
                                    </Button>
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

                                <Divider style={{ margin: '10px 0' }} />

                                <Typography gutterBottom style={{ color: "black", fontSize: "16px", fontWeight: '600' }}>
                                    Bình luận
                                </Typography>
                                {/* Comment */}
                                <Box display={"flex"}
                                    flexDirection={'column'}
                                    justifyContent={'center'}
                                    alignItems={'center'}>
                                    {event.comments.map((comment: any) =>
                                        <Box style={{ display: "flex", flexDirection: "row", marginTop: 10, }}>
                                            {comment.commenter.username == null ? (
                                                <Avatar style={{ backgroundColor: "green", marginRight: "10px", marginTop: "10px", width: '28px', height: '28px', fontSize: '13px' }} aria-label="recipe">
                                                    {comment.commenter.username}
                                                </Avatar>
                                            ) : (
                                                <Avatar style={{ backgroundColor: "green", marginRight: "10px", marginTop: "10px", width: '28px', height: '28px', fontSize: '13px' }} aria-label="recipe">
                                                    {comment.commenter.username.charAt(0).toUpperCase()}
                                                </Avatar>
                                            )}
                                            <CardContent style={{ backgroundColor: "#f4f5f5", padding: "10px 10px", borderRadius: "10px" }}>
                                                <Box style={{ display: "flex", flexDirection: "row" }}>
                                                    <Typography style={{ fontWeight: "bold", fontSize: "13px", marginBottom: "5px" }}>{comment.commenter.username}</Typography>
                                                    <Box style={{ flexGrow: "1" }}></Box>
                                                    <Typography style={{ fontSize: '12px' }}>{(formatDistance(new Date(comment.created), Date.now(), { addSuffix: true })).split("about")}</Typography>
                                                </Box>
                                                <Typography style={{ fontSize: "12px", width: 400, textAlign: "justify" }}>
                                                    {comment.contentComment}
                                                </Typography>
                                            </CardContent>
                                        </Box>
                                    )}
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

export default Event;
