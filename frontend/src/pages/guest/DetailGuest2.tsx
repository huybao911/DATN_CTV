import * as React from "react";
import { styled, makeStyles } from "@material-ui/core/styles";
import { useDispatch, useSelector } from "react-redux";
import { getEvents, getDepartments } from "redux/actions/user";
import { RootState } from "redux/reducers";
import { Box, OutlinedInput, InputAdornment, TextField, Toolbar, AppBar, Typography, Avatar, ListItemIcon, Divider, MenuItem as MenuItemDepartment, IconButton, Stack, Popover, MenuItem } from '@mui/material';

import { StyledMenuItem } from '../../layouts/navigation/style'
import { BoxSpan } from '../../layouts/navigation/style'

import { IEvent } from "redux/types/event";
import { IDepartment } from "redux/types/department";

import FeedGuest from "pages/guest/FeedGuest";
import FeedDetailGuest from "pages/guest/FeedDetailGuest";

import SearchIcon from '@mui/icons-material/Search';
import { Person, PersonAdd } from '@mui/icons-material';

import { Link, useParams } from "react-router-dom";

const StyledSearch = styled(OutlinedInput)(({ theme }) => ({
    width: 240,
    '& fieldset': {
        borderWidth: `1px !important`,
        // borderColor: `${alpha(theme.palette.grey[500], 0.32)} !important`,
        borderColor: '#rgba(0, 0, 0, 0.87)'
    },
}));

const useStyles = makeStyles((theme) => ({
    textfield: {
        '& .MuiSelect-select': {
            color: 'black', fontSize: '12px'
        },
        '& .MuiSvgIcon-root': {
            fontSize: '20px', paddingRight: '2px'
        },
        '& .MuiOutlinedInput-root': {
            '& fieldset': {
                borderRadius: '20px'
            },
            '&.Mui-focused fieldset': {
                border: "1px solid black",
            }
        },
        '& label.Mui-focused': {
            color: 'black',
        },
        '& fieldset': {
            borderRadius: '30px'
        },

    },
    hoverDetail: {
        '&: hover': {
            color: 'green',
        },
    },
}))

const StyledRoot = styled(AppBar)(() => ({
    boxShadow: 'none',
    width: '100%',
    backgroundColor: 'white',
    fontWeight: 'bold',
}));
interface RouteParams {
    id: string
}
const DetailGuest: React.FC = (): JSX.Element => {

    const dispatch = useDispatch();
    const params = useParams<RouteParams>();
    const [anchorElUser, setAnchorElUser] = React.useState(null);

    const openUser = Boolean(anchorElUser);
    const handleClickUser = (event: any) => {
        setAnchorElUser(event.currentTarget);
    };
    const handleCloseUser = () => {
        setAnchorElUser(null);
    };
    const classes = useStyles();
    const [filterName, setFilterName] = React.useState('');

    const [filterNameDepartment, setFilterNameDepartment] = React.useState('');

    const [events, setEvents] = React.useState<IEvent[]>([]);
    const [eventDetails, setEventDetails] = React.useState<IEvent[]>([]);
    const [departments, setDepartments] = React.useState<IDepartment[]>([]);
    const user = useSelector((state: RootState) => state.user);

    React.useEffect(() => {
        dispatch(getEvents());
    }, [dispatch]);

    React.useEffect(() => {
        dispatch(getDepartments());
    }, [dispatch]);

    React.useEffect(() => {
        setEvents(() =>
            user?.events?.filter((event: any) =>
                event.nameEvent
            ));
    }, [user]);
    React.useEffect(() => {
        setEventDetails(() =>
            user?.events?.filter((event: any) =>
                event._id == params.id
            ));
    }, [user]);
    React.useEffect(() => {
        setDepartments(() => user?.departments?.filter((department: any) => department.nameDepartment));
    }, [user]);

    const myInputProps_TenKhoa = {
        startAdornment: <Box sx={{ fontSize: '12px', position: "start" }}
        > Khoa</Box>,
        style: {
            height: '48px',
        }
    }

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

    const handleFilterByNameDepartment = (event: any) => {
        const keyword = event.target.value;

        if (keyword !== '') {
            const results = user?.events?.filter((event: any) => {
                return event.departmentEvent.nameDepartment.toLowerCase().startsWith(keyword.toLowerCase()) || event.departmentEvent.nameDepartment.toLowerCase().startsWith(keyword.toLowerCase()) && event.nameEvent.toLowerCase().startsWith(keyword.toLowerCase());
                // Use the toLowerCase() method to make it case-insensitive
            });
            setEvents(results);
        } else {
            setEvents(() => user?.events?.filter((event: any) => event.departmentEvent.nameDepartment));
        }

        setFilterNameDepartment(keyword);
    };

    React.useEffect(() => {
        document.title = "Trang Chủ | CTV";
    }, []);

    return (
        <Box>
            <Box>
                <StyledRoot style={{ boxShadow: "none", overflowX: "hidden" }}>
                    <Toolbar>
                        <Link style={{ textDecoration: 'none' }} to={'/'}>
                            <img src="/hutech-logo.ico" style={{ height: "56px", width: "50px" }}></img>
                        </Link>
                        <Box textAlign={"center"} sx={{ flexGrow: 1 }}>
                            <StyledSearch
                                style={{ borderRadius: '20px', fontSize: '13px', height: "48px", marginRight: '16px' }}
                                value={filterName}
                                onChange={handleFilterByName}
                                placeholder="Tìm kiếm công việc..."
                                startAdornment={
                                    <InputAdornment position="start" style={{ paddingLeft: 1.3 }}>
                                        <SearchIcon style={{ width: '16px' }} sx={{ color: 'rgba(0, 0, 0, 0.87)' }} />
                                    </InputAdornment>
                                }
                            />
                            <TextField
                                id="filled-select-currency"
                                select
                                value={filterNameDepartment}
                                onChange={handleFilterByNameDepartment}
                                variant="outlined"
                                InputProps={myInputProps_TenKhoa}
                                style={{ width: 240 }}
                                className={classes.textfield}
                            >
                                {departments.map((department) => (
                                    <MenuItemDepartment key={department._id}
                                        value={department.nameDepartment}
                                        style={{ fontSize: "12px" }}
                                    >
                                        {department.nameDepartment}
                                    </MenuItemDepartment>
                                ))}
                            </TextField>
                        </Box>
                        {/* <Box>
                            <Notifications style={{ color: 'black' }} />
                        </Box> */}
                        <Stack
                            direction="row"
                            alignItems="center"
                            spacing={{
                                xs: 0.5,
                                sm: 1,
                            }}
                            sx={{ margin: 3, color: 'black' }}
                        >
                            <Box sx={{
                                display: 'flex', alignItems: 'center', textAlign: 'center'
                            }}>
                                <IconButton onClick={(event) => handleClickUser(event)}
                                    sx={{
                                        p: 0,

                                    }}>
                                    <Person style={{ color: "black" }} />
                                </IconButton>

                                <Popover
                                    open={openUser}
                                    anchorEl={anchorElUser}
                                    onClose={handleCloseUser}
                                    anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
                                    transformOrigin={{ vertical: 'top', horizontal: 'right' }}
                                    sx={{ marginLeft: 1 }}
                                    PaperProps={{
                                        style: {
                                            borderRadius: 20,
                                            boxShadow: 'rgba(145, 158, 171, 0.24) 0px 0px 2px 0px, rgba(145, 158, 171, 0.24) -20px 20px 40px -4px',
                                        },
                                        sx: {
                                            p: 1,
                                            width: 220,
                                            overflowX: 'unset',
                                            overflowY: 'unset',
                                            '& .MuiMenuItem-root': {
                                                px: 1,
                                                py: 1,
                                                typography: 'body2',
                                                borderRadius: 1,
                                                justifyContent: 'left'
                                            },
                                            '& .MuiAvatar-root': {
                                                width: 32,
                                                height: 32,
                                                ml: -0.5,
                                                mt: 1,
                                                mr: 1,
                                            },
                                        },
                                    }}
                                >

                                    <BoxSpan />
                                    <Stack sx={{ p: 0.5 }} >
                                        <StyledMenuItem component={Link} to={'/loginuser'} >
                                            <Avatar>G</Avatar>
                                            <Typography style={{ color: "black" }}>Tài Khoản</Typography>
                                        </StyledMenuItem>

                                        <Divider />

                                        <StyledMenuItem component={Link} to={'/register'} >
                                            <ListItemIcon>
                                                <PersonAdd fontSize="small" />
                                            </ListItemIcon>
                                            <Typography style={{ color: "black" }}>Đăng Ký</Typography>
                                        </StyledMenuItem>
                                    </Stack>

                                </Popover>
                            </Box>
                        </Stack>
                    </Toolbar>
                </StyledRoot>
            </Box>
            <Box style={{
                display: 'flex',
                flexDirection: 'row',
                justifyContent: 'center'
            }}>
                <Box style={{ display: "flex", flexDirection: "row" }} >
                    {events && events.length > 0 ? (
                        <Box style={{ display: "flex", flexDirection: "row" }}>
                            <Box style={{ paddingLeft: '20px', top: 100, zIndex: 10, }}>
                                {events.map((event: any) =>
                                    <Box>
                                        <Link style={{ textDecoration: "none" }} to={`/guestEvent1/${event._id}`}>
                                            <FeedGuest event={event} key={event._id} />
                                        </Link>
                                    </Box>
                                )}
                            </Box>
                            <Box style={{ display: 'flex', paddingLeft: '20px', }}>
                                {eventDetails.map((event: any) =>
                                    <Box style={{
                                        width: 500,
                                        height: 500,
                                        borderRadius: '12px',
                                        position: 'sticky',
                                        zIndex: 10,
                                        top: "100px",
                                    }}
                                    >
                                        <FeedDetailGuest event={event} key={event._id} />
                                    </Box>
                                )}
                            </Box>
                        </Box>
                    ) : (
                        <Box style={{ margin: "70px 0px" }}>
                            <Box>
                                <img style={{ width: "400px", height: "410px", display: "flex", margin: "auto" }} src="/not-found.png" />
                            </Box>
                            <Box>
                                <Typography style={{ fontSize: "45px", fontWeight: "bold" }}>
                                    Không Tồn Tại Sự Kiện
                                </Typography>
                            </Box>
                        </Box>
                    )}

                </Box >
            </Box>
        </Box >
    );
};

export default DetailGuest;
