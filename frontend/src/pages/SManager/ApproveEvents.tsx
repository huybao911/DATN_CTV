import * as React from "react";
import { makeStyles, styled } from "@material-ui/core/styles";
import { useDispatch, useSelector } from "react-redux";
import { getEventApprove, deleteComment } from "redux/actions/sManager";
import { RootState } from "redux/reducers";
import { IEvent } from "redux/types/event";
import { Card, CardMedia, CardContent, Avatar, Toolbar, Typography, Button, Box, Container, FormControl, Divider } from '@mui/material';

import { approveEvent } from "redux/actions/sManager";
import UpdateComment from "pages/SManager/UpdateComment";

import { formatDistance } from 'date-fns';

import CheckIcon from '@mui/icons-material/Check';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import { border } from "@mui/system";

const useStyles = makeStyles((theme) => ({
    btnLogin: {
        '&.MuiButton-root:hover': {
            backgroundColor: "transparent",
        }
    },
}));

const StyledRoot = styled(Toolbar)(({ theme }) => ({
    justifyContent: 'center',
    padding: theme.spacing(0, 3, 0, 3),
}));

const ApproveEvents: React.FC = (): JSX.Element => {

    const dispatch = useDispatch();
    const classes = useStyles();

    const [events, setEvents] = React.useState<IEvent[]>([]);
    const smanager = useSelector((state: RootState) => state.smanager);

    // function formatDate(input: any) {
    //     var datePart = input.match(/\d+/g),
    //         year = datePart[0].substring(0),
    //         month = datePart[1], day = datePart[2], hour = datePart[3], minute = datePart[4];
    //     var ampm = hour >= 12 ? 'PM' : 'AM';

    //     return hour + ':' + minute + ' ' + ampm + ' ' + ' ' + day + '/' + month + '/' + year;
    // }

    function convertTZ(date: any, tzString: any) {
        return new Date(date).toLocaleString("en-TT", { timeZone: tzString });
    }


    React.useEffect(() => {
        dispatch(getEventApprove());
    }, [dispatch]);

    React.useEffect(() => {
        setEvents(() =>
            smanager?.events?.filter((event: any) =>
                event.poster
            ));
    }, [smanager]);

    React.useEffect(() => {
        document.title = "Duyệt bài | CTV";
    }, []);

    return (
        <Container >
            <StyledRoot style={{ display: "flex", flexDirection: "column" }}>
                {events.map((event: any) =>
                    <Box key={event._id} width={680}>
                        <Box >
                            <Card style={{ boxShadow: "none", padding: 40, borderRadius: "24px" }}>
                                {/* header */}
                                <Box style={{ display: "flex", justifyContent: "center", alignItems: "center", marginBottom: "30px" }}>
                                    <Box >
                                        <Box style={{ fontSize: 24, fontWeight: '700', letterSpacing: 0.4 }}>
                                            {event?.nameEvent}
                                        </Box>
                                        <Box display={'flex'} flexDirection={'row'} >
                                            <Typography style={{ fontWeight: "bold", fontSize: '13px', color: '#757575' }}>
                                                {event.poster.username}
                                            </Typography>
                                            <Typography style={{ fontSize: '13px', padding: '0px 4px', color: '#757575' }}>
                                                |
                                            </Typography>
                                            <Typography style={{ fontWeight: "bold", fontSize: '13px', color: '#757575' }}>
                                                {convertTZ((event.created_at), "Asia/Bangkok")}
                                            </Typography>
                                        </Box>

                                    </Box>
                                    <Box flexGrow={1} />
                                    <Button
                                        style={{
                                            display: "flex", color: "green",
                                            textTransform: "capitalize",
                                            border: '1px solid'
                                        }}
                                        className={classes.btnLogin}
                                        onClick={(e) => dispatch(approveEvent(event._id))}><CheckIcon style={{ width: '18px' }} />
                                    </Button>
                                </Box>
                                {/* detail */}
                                <Box style={{ marginBottom: "20px" }}>
                                    <Typography gutterBottom style={{ color: "black", fontSize: "16px", fontWeight: '600' }}>
                                        Nội dung
                                    </Typography>
                                    <Box style={{ fontSize: '13px' }} dangerouslySetInnerHTML={{ __html: event.contentEvent }} />
                                </Box>
                                <Box style={{ marginBottom: "20px" }}>
                                    <Typography gutterBottom style={{ color: "black", fontSize: "16px", fontWeight: '600' }}>
                                        Công việc
                                    </Typography>
                                    {event.job.map((job: any) =>
                                        <Box sx={{
                                            display: 'grid',
                                            gap: 4,
                                            gridTemplateColumns: 'repeat(3, 1fr)',
                                            color: "rgb(33, 43, 54)",
                                            columnGap: 1,
                                            marginBottom: 5

                                        }} >
                                            <FormControl sx={{ alignItems: 'center', gap: 1 }} >
                                                <Box sx={{ fontSize: '14px', color: '#757575', fontWeight: 500, }}>
                                                    Tên công việc
                                                </Box>
                                                <Box sx={{ fontSize: '14px', fontWeight: '1000' }}>
                                                    {job.nameJob}
                                                </Box>
                                            </FormControl>
                                            <FormControl sx={{ alignItems: 'center', gap: 1 }} >
                                                <Box sx={{ fontSize: '14px', color: '#757575', fontWeight: 500, }}>
                                                    Số lượng
                                                </Box>
                                                <Box sx={{ fontSize: '14px', fontWeight: '1000' }}>
                                                    {job.quantity}
                                                </Box>
                                            </FormControl>
                                            <FormControl sx={{ alignItems: 'center', gap: 1 }} >
                                                <Box sx={{ fontSize: '14px', color: '#757575', fontWeight: 500, }}>
                                                    Đơn giá
                                                </Box>
                                                <Box sx={{ fontSize: '14px', fontWeight: '1000' }}>
                                                    {new Intl.NumberFormat().format(job.unitPrice)} VNĐ
                                                </Box>
                                            </FormControl>

                                        </Box>
                                    )}
                                </Box>
                                <Typography gutterBottom style={{ color: "black", fontSize: "16px", fontWeight: '600' }}>
                                    Chi tiết sự kiện
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
                                                Tổng số lượng
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
                                            <Box sx={{ fontSize: '14px', fontWeight: '1000' }}>{new Intl.NumberFormat().format(event.costs)} VNĐ</Box>
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
                                    alignItems={'center'} >

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
                                            <Avatar style={{ backgroundColor: "green", marginRight: "10px", marginTop: "10px", width: '28px', height: '28px', fontSize: '13px' }} aria-label="recipe">
                                                {comment.commenter.username.charAt(0).toUpperCase()}
                                            </Avatar>
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
                                            <Button
                                                style={{ color: "red" }}
                                                disableRipple
                                                className={classes.btnLogin}
                                                size='small'
                                                onClick={(e) => dispatch(deleteComment(event._id, comment._id))}> <DeleteForeverIcon style={{ width: '18px' }} />
                                            </Button>
                                        </Box>
                                    )}
                                    <UpdateComment event={event} />
                                </Box>
                            </Card>
                        </Box>
                    </Box>
                )}
            </StyledRoot>
        </Container>
    );
};

export default ApproveEvents;
