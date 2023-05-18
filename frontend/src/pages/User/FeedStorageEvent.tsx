import * as React from 'react';
import { makeStyles } from "@material-ui/core/styles";

import { Avatar, Card, CardContent, CardHeader, CardMedia, Toolbar, Typography, Divider, Grid, Box } from '@mui/material';
import { Bookmark, BookmarkBorder } from '@mui/icons-material';
import TabContext from '@mui/lab/TabContext';
import TabPanel from '@mui/lab/TabPanel';
import { green } from '@mui/material/colors';
import { createStorager, deleteStoragerInList } from "redux/actions/user";
import { formatDistance } from 'date-fns';

import { useDispatch, useSelector } from "react-redux";
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
        borderRadius: '12px',
        margin: 'auto',
        justifyContent: 'center',
        maxWidth: '100%',
        maxHeight: '100%',
        width:"1400px"
    },
    myMedia: {
        width: "320px",
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

const FeedStorageEvent: React.FC<Props> = ({ event }): JSX.Element => {

    const dispatch = useDispatch();
    const user = useSelector((state: RootState) => state.user);
    const [value, setValue] = React.useState('1');

    function handleClickStorage() {
        dispatch(createStorager(event._id));
    }

    function handleClickUnStorage() {
        dispatch(deleteStoragerInList(event._id));
    }

    function convertTZ(date: any, tzString: any) {
        return new Date(date).toLocaleString("en-TT", { timeZone: tzString });
    }

    const textAvatar = event.poster.username ?? null;
    const letterAvatar = textAvatar.charAt(0).toUpperCase();

    const lettercreatedAt = (formatDistance(new Date(event.created_at), Date.now(), { addSuffix: true })).split("about");

    const storager = event.storagers.map((storager: any) => storager.storager.username);

    const storagers = event.storagers.some((storager: any) => user.user.username.includes(storager.storager.username));

    const compareUser = storagers ? (
        <Bookmark onClick={handleClickUnStorage} style={{ width: "30px", height: "30px", color: 'black', marginTop: "15px", marginRight: "15px" }} />
    ) : storager !== user.user.username ? (
        <BookmarkBorder onClick={handleClickStorage} style={{ width: "30px", height: "30px", color: 'black', marginTop: "15px", marginRight: "15px" }} />
    ) : null

    const classes = useStyles();

    return (
        <>
            <Toolbar className={classes.toolBar}>
                <Box className={classes.toolbarContent}>
                    <TabContext value={value}>
                        <TabPanel value="1" >
                            {/* de rieng ra 1 component */}
                            <Card className={classes.card}>
                                <Box display={'flex'} flexDirection={'row'}>
                                    <Box sx={{ marginTop: "50px", marginLeft: "20px", fontSize: "20px", fontWeight: "bold", width: "850px" }}>
                                        <Box sx={{ marginLeft: "15px" }}>
                                            {event.nameEvent}
                                        </Box>
                                        <Typography style={{ textAlign: 'left', fontSize: '14px', margin: '0px 14px', marginTop: "6px" }}>
                                            {event?.dayStart ?? null} - {event?.dayEnd ?? null}
                                        </Typography>
                                        <Box>
                                            <CardHeader
                                                avatar={
                                                    <Avatar style={{ backgroundColor: green[500] }} aria-label="recipe">
                                                        {letterAvatar}
                                                    </Avatar>
                                                }
                                                title={event.poster.username ?? null}
                                                titleTypographyProps={{ align: 'left', fontSize: '16px', fontWeight: 'bold' }}
                                                subheader={lettercreatedAt}
                                                subheaderTypographyProps={{ align: 'left', fontSize: '12px' }}
                                            >
                                            </CardHeader>

                                            <CardContent>
                                                <Box>
                                                    <Box>
                                                        <Typography style={{ textAlign: 'left', fontSize: '15px', marginTop: "-10px", marginBottom: '14px' }}>
                                                            Công việc:
                                                        </Typography>
                                                        <Grid container spacing={2} columns={16} style={{ marginLeft: "20px", marginBottom: "25px" }}>
                                                            {event.job.map((job: any) =>
                                                                <Grid item xs={4} style={{ fontWeight: "initial", fontSize: "14px" }}>
                                                                    {job.nameJob}
                                                                </Grid>
                                                            )}
                                                        </Grid>
                                                    </Box>
                                                    <Box>
                                                        <Typography style={{ textAlign: 'left', fontSize: '14px' }}>
                                                            Địa điểm: {event.location ?? null}
                                                        </Typography>
                                                    </Box>
                                                    <Box sx={{ marginTop: "30px" }}>
                                                        {event.storagers.filter((storager:any) => storager.storager.username == user.user.username).map((storager: any) =>
                                                            <Typography style={{ textAlign: 'left', fontSize: '14px' }}>
                                                                Ngày lưu: {convertTZ((storager.created), "Asia/Bangkok")}
                                                            </Typography>
                                                        )}
                                                    </Box>
                                                </Box>
                                            </CardContent >
                                        </Box>
                                    </Box>
                                    <Box >
                                        <Divider orientation="vertical" style={{ margin: '55px 0px', height: "250px", backgroundColor: "rgba(0,0,0,0.5)" }} />
                                    </Box>
                                    <Box sx={{ width: "730px" }}>
                                        <Box display={'flex'} flexDirection={'column'}>
                                            <Box textAlign={'right'}>
                                                {compareUser}
                                            </Box>
                                            <Box sx={{ marginTop: "30px", fontSize: "20px", fontWeight: "bold", textAlign: "center" }}>
                                                Khoa {event.departmentEvent.nameDepartment.toLowerCase()}
                                            </Box>
                                            <Box sx={{ display: "flex", justifyContent: "center", alignItems: "center", marginTop: "25px" }}>
                                                <CardMedia
                                                    className={classes.myMedia}
                                                    component="img"
                                                    image={event?.image}
                                                    alt="Paella dish"
                                                >
                                                </CardMedia>
                                            </Box>
                                        </Box>
                                    </Box>
                                </Box>
                            </Card>
                        </TabPanel>
                    </TabContext>

                </Box>
            </Toolbar >
        </>
    );
};

export default FeedStorageEvent;
