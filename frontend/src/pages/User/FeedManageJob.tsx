import * as React from 'react';
import { makeStyles } from "@material-ui/core/styles";

import { Button, Card, CardContent, Toolbar, Box } from '@mui/material';
import PlayArrowIcon from '@mui/icons-material/PlayArrow';
import TabContext from '@mui/lab/TabContext';
import TabPanel from '@mui/lab/TabPanel';

import { userApplyJob, userUnApplyJob } from "redux/actions/user";

import { useSelector, useDispatch } from "react-redux";
import { RootState } from "redux/reducers";

type Props = {
    event: any;
};

const useStyles = makeStyles((theme) => ({
    toolBar: {
        dislay: 'flex',
        flexDirection: 'row',
        justifyContent: 'center'
    },
    toolbarContent: {
        justifyContent: 'center',
        backgroundColor: 'none',
        flexDirection: 'column',
        marginBottom: 'auto'
    },
    card: {
        borderRadius: '22px',
        margin: 'auto',
        justifyContent: 'center',
        maxWidth: '100%',
        maxHeight: '100%',
        width: '1200px',
        height: '300px',
    },
    myMedia: {
        height: "250px",
        // paddingTop: '56.25%', // 16:9,
        marginTop: '30'
    },
    cardHold: {
        justifyContent: 'center',
        maxWidth: '100%',
        maxHeight: '100%',
        width: '500px',
        height: '800px',
        borderRadius: '12px',
    },
    button: {
        backgroundColor: '#CBB7F5',
        color: '#434343',
        height: '40px',
        width: '100px',
        fontSize: '12px',
        fontWeight: 'bold',
        textTransform: 'none',
        margin: '7px 0px 0px 10px',
        borderRadius: '10px',
        border: '1px solid',
        borderColor: '#808080',
    },
    toolbarTitle: {
        justifyContent: 'center',
        paddingTop: '11px',
        backgroundColor: 'white',
        maxWidth: '100%'
    },
    box: {
        justifyContent: 'center',
        textAlign: 'center'
    },
    tabClick: {
        '& .MuiTabs-indicator': {
            display: 'flex',
            justifyContent: 'center',
            backgroundColor: 'transparent',
        },
        '& .MuiTabs-indicatorSpan': {
            maxWidth: 50,
            width: '100%',
            backgroundColor: '#F8D6A4',
            borderRadius: 4
        },
        "& .MuiTab-root.Mui-selected": {
            color: 'black'
        }
    },
    tab: {
        textTransform: 'none',
        fontFamily: '',
        fontSize: '16px',
        borderRadius: 2,
        fontWeight: 'bold',
    }

}));

const FeedManageJob: React.FC<Props> = ({ event }): JSX.Element => {

    const dispatch = useDispatch();
    const [value, setValue] = React.useState('1');

    const user = useSelector((state: RootState) => state.user);

    const classes = useStyles();

    const findJobUserApply = event.usersApplyJob.filter((userapply: any) => userapply.userApply.username === user.user.username && userapply.notiApplyJob == "Bạn đã ứng tuyển thành công");

    return (
        <>
            {findJobUserApply.map((job: any) =>
                <Toolbar key={job._id} className={classes.toolBar}>
                    <Box className={classes.toolbarContent}>
                        <TabContext value={value}>
                            <TabPanel value="1" >
                                {/* de rieng ra 1 component */}
                                <Card className={classes.card}>
                                    <CardContent>
                                        <Box sx={{ display: "flex", flexDirection: "row", marginTop: "35px", marginLeft: "35px" }}>
                                            <Box sx={{ fontWeight: "bold", fontSize: "21px" }}>
                                                {event.nameEvent}
                                            </Box>
                                            <PlayArrowIcon style={{ fontSize: "35px", margin: "-5px 10px 0px 10px", color: "#c6c9c9" }} />
                                            <Box sx={{ fontWeight: "bold", fontSize: "21px" }}>
                                                {job.jobEvent.nameJob}
                                            </Box>
                                            <Box flexGrow={1} />
                                            <Box sx={{ marginTop: "50px", fontWeight: "bold" }}>
                                                {job.acceptStatus == "Chờ phê duyệt" ? (
                                                    <Box>
                                                        Chưa có thông báo nhận lương
                                                    </Box>
                                                ) : job.acceptStatus == "Duyệt" ? (
                                                    <Box sx={{ color: "#00B14F" }}>
                                                        {job.notiAccept}
                                                    </Box>
                                                ) : job.acceptStatus == "Không Duyệt" ? (
                                                    <Box sx={{ color: "red" }}>
                                                        {job.notiAccept}
                                                    </Box>
                                                ) : null}
                                            </Box>
                                        </Box>

                                        <Box sx={{ fontSize: "15px", marginTop: "10px", marginLeft: "35px" }}>
                                            {event?.dayStart ?? null} - {event?.dayEnd ?? null}
                                        </Box>

                                        <Box sx={{ fontSize: "16px", marginTop: "30px", marginLeft: "35px" }}>
                                            Địa điểm: {event.location}
                                        </Box>

                                        <Box sx={{ display: "flex", flexDirection: "row" }} >
                                            <Box>
                                                <Box sx={{ fontSize: "15px", marginTop: "20px", marginLeft: "35px" }}>
                                                    Mô tả: {job.jobEvent.jobDescription}
                                                </Box>
                                                <Box sx={{ fontSize: "15px", marginTop: "20px", marginLeft: "35px" }}>
                                                    Quyền lợi: {job.jobEvent.benefit}
                                                </Box>
                                            </Box>
                                            <Box flexGrow={1} />
                                            <Button style={{ color: "green" }} target='_blank' href={event.ggSheet} rel="noopener noreferrer">
                                                Link chi tiết công việc
                                            </Button>

                                        </Box>
                                    </CardContent>

                                </Card>
                            </TabPanel>
                        </TabContext>

                    </Box>
                </Toolbar >
            )}
        </>
    );
};

export default FeedManageJob;
