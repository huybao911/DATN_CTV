import * as React from 'react';
import { makeStyles } from "@material-ui/core/styles";

import { Divider } from '@mui/material';
import TabContext from '@mui/lab/TabContext';
import { Box, Button, FormControl } from '@mui/material';
import { userApplyJob, userUnApplyJob } from "redux/actions/user";

import { useSelector, useDispatch } from "react-redux";
import { RootState } from "redux/reducers";
import { BoxNameDetails, BoxDetails } from 'layouts/navigation/style';

type Props = {
    event: any;
};

const useStyles = makeStyles((theme) => ({
    toolBar: {
        dislay: 'flex',
        flexDirection: 'row',
        justifyContent: 'center'
    },

    card: {
        borderRadius: '12px',
        justifyContent: 'center',
        backgroundColor: 'white',
        maxHeight: '100%',
        maxWidth: '100%',
        paddingTop: 30,
        paddingBottom: 30,
        boxShadow: 'rgba(145, 158, 171, 0.2) 0px 0px 2px 0px, rgba(145, 158, 171, 0.12) 0px 12px 24px -4px'
    },
    myMedia: {
        width: "440px",
        borderRadius: "24px"
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

const FeedDetailContent: React.FC<Props> = ({ event }): JSX.Element => {

    const dispatch = useDispatch();
    const user = useSelector((state: RootState) => state.user);
    const [value, setValue] = React.useState('1');

    const userApply = event.usersApplyJob.map((userapply: any) => userapply.userApply.username);

    const userApplys = event.usersApplyJob.some((userapply: any) => user.user.username.includes(userapply.userApply.username));

    const userJob = event.usersApplyJob.map((userjob: any) => userjob.jobEvent._id);

    const compareUserApply = userApplys ? (
        event.job.map((job: any) =>
            event.usersApplyJob.some((userjob: any) => job._id.includes(userjob.jobEvent._id) && user.user.username.includes(userjob.userApply.username)) ? (
                <Box sx={{ display: 'grid', gap: 2, gridTemplateColumns: 'repeat(3, 1fr)', backgroundColor: "rgba(0,0,0,0.03)", color: "rgb(33, 43, 54)", marginBottom: 4, padding: 3, borderRadius: 4 }} key={job._id}>
                    <FormControl sx={{
                        textAlign: 'left',
                        fontSize: '14px',
                        color: '#757575',
                        fontWeight: 500,
                        marginTop: 1
                    }} >
                        Tên công việc:
                    </FormControl>

                    <FormControl sx={{ textAlign: 'left', fontSize: '14px', fontWeight: '1000', marginTop: 1 }}>
                        {job.nameJob}
                    </FormControl>

                    <FormControl sx={{ textAlign: 'left' }}>
                        <Button style={{
                            color: "#FF6969",
                            height: "30px",
                            width: "120px",
                            fontSize: "12px",
                            fontWeight: 500,
                            borderRadius: "4px",
                            textTransform: "capitalize",
                            border: '1px solid #FF6969'
                        }}
                            onClick={(e) => dispatch(userUnApplyJob(event._id, job._id))}>Hủy Ứng Tuyển</Button>
                    </FormControl>
                    <FormControl sx={{
                        textAlign: 'left',
                        fontSize: '14px',
                        color: '#757575',
                        fontWeight: 500
                    }} >
                        Yêu cầu công việc:
                    </FormControl>

                    <FormControl sx={{ textAlign: 'left', fontSize: '14px', fontWeight: '1000' }}>
                        {job.jobRequest}
                    </FormControl>

                    <FormControl sx={{ textAlign: 'left' }} />
                    <FormControl sx={{
                        textAlign: 'left',
                        fontSize: '14px',
                        color: '#757575',
                        fontWeight: 500
                    }}>
                        Mô tả công việc:
                    </FormControl>
                    <FormControl style={{ textAlign: 'left', fontSize: '14px', fontWeight: '1000' }}>
                        {job.jobDescription}
                    </FormControl>
                    <FormControl sx={{ textAlign: 'left' }} />

                    <FormControl sx={{
                        textAlign: 'left',
                        fontSize: '14px',
                        color: '#757575',
                        fontWeight: 500,
                        gap: 5
                    }}>
                        Quyền lợi:
                    </FormControl>
                    <FormControl style={{ textAlign: 'left', fontSize: '14px', fontWeight: '1000' }}>
                        {job.benefit}
                    </FormControl>
                    <FormControl sx={{ textAlign: 'left' }} />

                    <FormControl sx={{
                        textAlign: 'left',
                        fontSize: '14px',
                        color: '#757575',
                        fontWeight: 500,
                        gap: 5
                    }}>
                        Số lượng:
                    </FormControl>
                    <FormControl style={{ textAlign: 'left', fontSize: '14px', fontWeight: '1000' }}>
                        {job.quantityRemaining}
                    </FormControl>
                    <FormControl sx={{ textAlign: 'left' }} />
                </Box>

            ) : (
                <Box sx={{ display: 'grid', gap: 2, gridTemplateColumns: 'repeat(3, 1fr)', backgroundColor: "rgba(0,0,0,0.03)", color: "rgb(33, 43, 54)", marginBottom: 4, padding: 3, borderRadius: 4 }} key={job._id}>
                    <FormControl sx={{
                        textAlign: 'left',
                        fontSize: '14px',
                        color: '#757575',
                        fontWeight: 500,
                        marginTop: 1
                    }} >
                        Tên công việc:
                    </FormControl>

                    <FormControl sx={{ textAlign: 'left', fontSize: '14px', fontWeight: '1000', marginTop: 1 }}>
                        {job.nameJob}
                    </FormControl>

                    <FormControl sx={{ textAlign: 'left' }}>
                        <Button style={{
                            color: "rgb(33, 43, 54)",
                            height: "30px",
                            width: "120px",
                            fontSize: "12px",
                            borderRadius: "4px",
                            fontWeight: 500,
                            textTransform: "capitalize",
                            border: '1px solid rgb(33, 43, 54)'
                        }}
                            onClick={(e) => dispatch(userApplyJob(event._id, job._id))}>Ứng Tuyển</Button>
                    </FormControl>
                    <FormControl sx={{
                        textAlign: 'left',
                        fontSize: '14px',
                        color: '#757575',
                        fontWeight: 500
                    }} >
                        Yêu cầu công việc:
                    </FormControl>

                    <FormControl sx={{ textAlign: 'left', fontSize: '14px', fontWeight: '1000' }}>
                        {job.jobRequest}
                    </FormControl>

                    <FormControl sx={{ textAlign: 'left' }} />
                    <FormControl sx={{
                        textAlign: 'left',
                        fontSize: '14px',
                        color: '#757575',
                        fontWeight: 500
                    }}>
                        Mô tả công việc:
                    </FormControl>
                    <FormControl style={{ textAlign: 'left', fontSize: '14px', fontWeight: '1000' }}>
                        {job.jobDescription}
                    </FormControl>
                    <FormControl sx={{ textAlign: 'left' }} />

                    <FormControl sx={{
                        textAlign: 'left',
                        fontSize: '14px',
                        color: '#757575',
                        fontWeight: 500,
                        gap: 5
                    }}>
                        Quyền lợi:
                    </FormControl>
                    <FormControl style={{ textAlign: 'left', fontSize: '14px', fontWeight: '1000' }}>
                        {job.benefit}
                    </FormControl>
                    <FormControl sx={{ textAlign: 'left' }} />

                    <FormControl sx={{
                        textAlign: 'left',
                        fontSize: '14px',
                        color: '#757575',
                        fontWeight: 500,
                        gap: 5
                    }}>
                        Số lượng:
                    </FormControl>
                    <FormControl style={{ textAlign: 'left', fontSize: '14px', fontWeight: '1000' }}>
                        {job.quantityRemaining}
                    </FormControl>
                    <FormControl sx={{ textAlign: 'left' }} />
                </Box>
            )
        )
    ) : userApply !== user.user.username ? (
        event.job.map((job: any) =>
            job._id !== userJob ? (
                <Box sx={{ display: 'grid', gap: 2, gridTemplateColumns: 'repeat(3, 1fr)', backgroundColor: "rgba(0,0,0,0.03)", color: "rgb(33, 43, 54)", marginBottom: 4, padding: 3, borderRadius: 4 }} key={job._id}>
                    <FormControl sx={{
                        textAlign: 'left',
                        fontSize: '14px',
                        color: '#757575',
                        fontWeight: 500,
                        marginTop: 1
                    }} >
                        Tên công việc:
                    </FormControl>

                    <FormControl sx={{ textAlign: 'left', fontSize: '14px', fontWeight: '1000', marginTop: 1 }}>
                        {job.nameJob}
                    </FormControl>

                    <FormControl sx={{ textAlign: 'left' }}>
                        <Button style={{
                            color: "rgb(33, 43, 54)",
                            height: "30px",
                            width: "120px",
                            fontSize: "12px",
                            borderRadius: "4px",
                            fontWeight: 500,
                            textTransform: "capitalize",
                            border: '1px solid rgb(33, 43, 54)'
                        }}
                            onClick={(e) => dispatch(userApplyJob(event._id, job._id))}>Ứng Tuyển</Button>
                    </FormControl>
                    <FormControl sx={{
                        textAlign: 'left',
                        fontSize: '14px',
                        color: '#757575',
                        fontWeight: 500
                    }} >
                        Yêu cầu công việc:
                    </FormControl>

                    <FormControl sx={{ textAlign: 'left', fontSize: '14px', fontWeight: '1000' }}>
                        {job.jobRequest}
                    </FormControl>

                    <FormControl sx={{ textAlign: 'left' }} />
                    <FormControl sx={{
                        textAlign: 'left',
                        fontSize: '14px',
                        color: '#757575',
                        fontWeight: 500
                    }}>
                        Mô tả công việc:
                    </FormControl>
                    <FormControl style={{ textAlign: 'left', fontSize: '14px', fontWeight: '1000' }}>
                        {job.jobDescription}
                    </FormControl>
                    <FormControl sx={{ textAlign: 'left' }} />

                    <FormControl sx={{
                        textAlign: 'left',
                        fontSize: '14px',
                        color: '#757575',
                        fontWeight: 500,
                        gap: 5
                    }}>
                        Quyền lợi:
                    </FormControl>
                    <FormControl style={{ textAlign: 'left', fontSize: '14px', fontWeight: '1000' }}>
                        {job.benefit}
                    </FormControl>
                    <FormControl sx={{ textAlign: 'left' }} />

                    <FormControl sx={{
                        textAlign: 'left',
                        fontSize: '14px',
                        color: '#757575',
                        fontWeight: 500,
                        gap: 5
                    }}>
                        Số lượng:
                    </FormControl>
                    <FormControl style={{ textAlign: 'left', fontSize: '14px', fontWeight: '1000' }}>
                        {job.quantityRemaining}
                    </FormControl>
                    <FormControl sx={{ textAlign: 'left' }} />
                </Box>
            ) : null
        )
    ) : null

    const classes = useStyles();

    return (
        <Box >
            <TabContext value={value}>
                <Box className={classes.card}>
                    {/* <Box margin={'10px 26px'}>
                        <Box sx={{ fontSize: "20px", fontWeight: "bold" }}>
                            Khoa {event.departmentEvent.nameDepartment.toLowerCase()}
                        </Box>
                        <Box sx={{ fontSize: "14px" }}>
                            {event?.poster.username ?? null}
                        </Box>
                    </Box> */}


                    {/* <Divider /> */}

                    <BoxDetails >
                        <Box sx={{ fontSize: "14px" }}>
                            <BoxNameDetails>
                                Mô tả:
                            </BoxNameDetails>
                            <Box sx={{ textAlign: 'left', fontSize: '14px', fontWeight: 500 }} dangerouslySetInnerHTML={{ __html: event.contentEvent }} />
                        </Box>
                    </BoxDetails>

                    <Divider />
                    <BoxDetails style={{ overflowY: "auto", height: "500px" }}>
                        <BoxNameDetails >
                            Công việc:
                        </BoxNameDetails>
                        {compareUserApply}
                    </BoxDetails>
                </Box>
            </TabContext>
        </Box>
    );
};

export default FeedDetailContent;
