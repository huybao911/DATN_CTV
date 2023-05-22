import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import LeaderboardIcon from '@mui/icons-material/Leaderboard'
import EventIcon from '@mui/icons-material/Event';
import SchoolIcon from '@mui/icons-material/School';
import WorkOutlineIcon from '@mui/icons-material/WorkOutline';
import EventAvailableIcon from '@mui/icons-material/EventAvailable';
import ListAltIcon from '@mui/icons-material/ListAlt';
import RecentActorsIcon from '@mui/icons-material/RecentActors';

export const dataAdmin = [
    {
        icon: <LeaderboardIcon style={{width: '18px'}} />,
        name: 'Bảng Điều Khiển',
        path: '/*'
    },

    {
        icon: <AccountCircleIcon style={{width: '18px'}} />,
        name: 'Người Dùng',
        path: '/users'
    },
    {
        icon: <EventIcon style={{width: '18px'}} />,
        name: 'Sự Kiện',
        path: '/eventAdmin'
    },
    {
        icon: <WorkOutlineIcon style={{width: '18px'}}/>,
        name: 'Công Việc Sự Kiện',
        path: '/jobEventAdmin'
    },
    {
        icon: <SchoolIcon style={{width: '18px'}}/>,
        name: 'Khoa',
        path: '/department'
    },
];

export const dataSManager = [
    {
        icon: <LeaderboardIcon style={{width: '18px'}} />,
        name: 'Bảng Điều Khiển',
        path: '/*'
    },

    {
        icon: <AccountCircleIcon style={{width: '18px'}}/>,
        name: 'User',
        path: '/smanager'
    },
    {
        icon: <EventAvailableIcon style={{width: '18px'}}/>,
        name: 'Duyệt Sự Kiện',
        path: '/approveEvent'
    },
    {
        icon: <EventIcon style={{width: '18px'}}/>,
        name: 'Sự Kiện Đã Duyệt',
        path: '/eventAccept'
    },
];

export const dataManager = [
    {
        icon: <LeaderboardIcon style={{width: '18px'}}/>,
        name: 'Bảng Điều Khiển',
        path: '/*'
    },
    {
        icon: <EventIcon style={{width: '18px'}}/>,
        name: 'Sự Kiện',
        path: '/event'
    },
];