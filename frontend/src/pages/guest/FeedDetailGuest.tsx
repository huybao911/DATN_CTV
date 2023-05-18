import * as React from 'react';
import { makeStyles } from "@material-ui/core/styles";
import { Divider } from '@mui/material';
import TabContext from '@mui/lab/TabContext';
import { Box, Button, FormControl } from '@mui/material';

import { useSelector, useDispatch } from "react-redux";
import { RootState } from "redux/reducers";
import { BoxNameDetails, BoxDetails } from 'layouts/navigation/style';
import { Link } from 'react-router-dom';

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

    const classes = useStyles();

    return (
        <Box >
            <TabContext value={value}>

                <Box className={classes.card}>

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
                        {event.job.map((job: any) =>
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
                                    <Box component={Link} to={"/loginuser"}>
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
                                    >Ứng Tuyển</Button>
                                    </Box>
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
                                    Số lượng:
                                </FormControl>
                                <FormControl style={{ textAlign: 'left', fontSize: '14px', fontWeight: '1000' }}>
                                    {job.quantityRemaining}
                                </FormControl>
                                <FormControl sx={{ textAlign: 'left' }} />
                            </Box>
                        )}
                    </BoxDetails>
                </Box>
            </TabContext>
        </Box>
    );
};

export default FeedDetailContent;
