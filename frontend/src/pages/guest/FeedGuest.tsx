import * as React from 'react';
import { makeStyles } from "@material-ui/core/styles";

import { Avatar, Card, Box, CardMedia, Typography } from '@mui/material';
import { Divider } from '@mui/material';

import TabContext from '@mui/lab/TabContext';
import { createStorager, deleteStorager } from "redux/actions/user";

import { formatDistance } from 'date-fns';
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
        marginBottom: 'auto',
        letterSpacing: 0.6
    },
    card: {
        borderRadius: '12px',
        margin: 'auto',
        justifyContent: 'center',
        maxWidth: '100%',
        maxHeight: '100%',
        width: '500px',
        marginBottom: 30,
        boxShadow: 'rgba(145, 158, 171, 0.2) 0px 0px 2px 0px, rgba(145, 158, 171, 0.12) 0px 12px 24px -4px'
    },
    myMedia: {
        width: "450px",
        borderRadius: "16px"
    },
    cardHold: {
        justifyContent: 'center',
        maxWidth: '100%',
        maxHeight: '100%',
        width: '500px',
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

const FeedGuest: React.FC<Props> = ({ event }): JSX.Element => {

    const dispatch = useDispatch();
    const user = useSelector((state: RootState) => state.user);
    const [value, setValue] = React.useState('1');

    function handleClickStorage() {
        dispatch(createStorager(event._id));
    }

    function handleClickUnStorage() {
        dispatch(deleteStorager(event._id));
    }
    const textAvatar = event?.poster.username ?? null;
    const letterAvatar = textAvatar.charAt(0).toUpperCase();

    const lettercreatedAt = (formatDistance(new Date(event?.created_at), Date.now(), { addSuffix: true })).split("about");

    const classes = useStyles();

    return (
        <Box className={classes.toolbarContent}>
            <TabContext value={value}>

                {/* de rieng ra 1 component */}
                <Card className={classes.card}>
                    <Box margin={'0px 26px'}>
                        <Box style={{ marginTop: "30px", fontSize: "20px", fontWeight: "bold" }}>
                            Khoa {event.departmentEvent.nameDepartment.toLowerCase()}
                        </Box>
                    </Box>

                    <Divider sx={{ margin: '20px 0px' }} />
                    <Box margin={'0px 26px'}>
                        <Box display={'flex'} flexDirection={'row'} margin={'10px 0px'}>
                            <Avatar style={{
                                fontSize: "14px",
                                backgroundColor: 'white',
                                marginRight: '12px',
                                border: '1px dashed #b7b7b4',
                                color: '#454545'
                            }}
                                aria-label="recipe">
                                {letterAvatar}
                            </Avatar>

                            <Box>
                                <Box fontWeight={1000} >{event?.poster.username ?? null}</Box>
                                <Box sx={{ color: '#757575', fontSize: '14px' }}>{lettercreatedAt}</Box>
                            </Box>
                        </Box>
                    </Box>

                    <Box margin={'0px 26px'}>
                        <Box style={{ marginBottom: '30px', paddingTop: '10px' }}>

                            <Typography style={{ textAlign: 'left', fontSize: '17px', fontWeight: "600", paddingBottom: 6 }}>
                                {event?.nameEvent ?? null}
                            </Typography>

                            <Box display={'flex'} flexDirection={'row'} marginBottom={4} letterSpacing={0.6}>
                                <Box sx={{
                                    textAlign: 'left',
                                    fontSize: '14px',
                                    color: '#757575',
                                    paddingRight: 1,
                                    fontWeight: 500
                                }}>
                                    Thời gian:
                                </Box>
                                <Box style={{ textAlign: 'left', fontSize: '14px', fontWeight: '1000' }}>
                                    {event?.dayStart ?? null} - {event?.dayEnd ?? null}
                                </Box>

                            </Box>
                        </Box >
                    </Box>
                    <Divider sx={{ marginBottom: '50px' }} />
                    <Box sx={{ display: "flex", justifyContent: "center", alignItems: "center", marginTop: "-20px" }}>
                        <CardMedia
                            className={classes.myMedia}
                            component="img"
                            image={event?.image}
                            alt="Paella dish"
                        >
                        </CardMedia>
                    </Box>

                    <Divider sx={{ margin: '20px 0px' }} />
                    <Box margin={'0px 26px'}>
                        <Box display={'flex'} flexDirection={'row'} marginBottom={4}>
                            <Box sx={{
                                textAlign: 'left',
                                fontSize: '14px',
                                color: '#757575',
                                paddingRight: 1,
                                fontWeight: 500
                            }}>
                                Địa điểm:
                            </Box>
                            <Box style={{ textAlign: 'left', fontSize: '14px', fontWeight: '1000' }}>
                                {event?.location ?? null}
                            </Box>

                        </Box>
                    </Box>

                </Card>
            </TabContext>
        </Box>
    );
};

export default FeedGuest;
