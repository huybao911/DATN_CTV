import * as React from "react";
import { styled, alpha } from "@material-ui/core/styles";
import { useDispatch, useSelector } from "react-redux";
import { getListCTV, acceptCTV, unacceptCTV } from "redux/actions/Manager";
import { RootState } from "redux/reducers";
import { IEvent } from "redux/types/event";
import { Toolbar, OutlinedInput, InputAdornment, Card, Container, Table, TableBody, TableCell, TableContainer, TableHead, TablePagination, TableRow, Typography, Popover, Button } from "@mui/material";
// @mui
import SearchIcon from '@mui/icons-material/Search';
import { DownloadTableExcel } from 'react-export-table-to-excel';
import { Box } from "@mui/system";

import { useParams } from 'react-router-dom';

const StyledRoot = styled(Toolbar)(({ theme }) => ({
    height: 96,
    display: 'flex',
    justifyContent: 'space-between',
    padding: theme.spacing(0, 1, 0, 3),
}));

const StyledSearch = styled(OutlinedInput)(({ theme }) => ({
    width: 240,
    transition: theme.transitions.create(['box-shadow', 'width'], {
        easing: theme.transitions.easing.easeInOut,
        duration: theme.transitions.duration.shorter,
    }),
    '&.Mui-focused': {
        width: 320,
    },
    '& fieldset': {
        borderWidth: `1px !important`,
        borderColor: `${alpha(theme.palette.grey[500], 0.32)} !important`,
    },
}));

function descendingComparator<T>(a: T, b: T, orderBy: keyof T) {
    if (b[orderBy] < a[orderBy]) {
        return -1;
    }
    if (b[orderBy] > a[orderBy]) {
        return 1;
    }
    return 0;
}

type Order = 'asc' | 'desc';

function getComparator<Key extends keyof any>(
    order: Order,
    orderBy: Key,
): (
    a: { [key in Key]: number | string },
    b: { [key in Key]: number | string },
) => number {
    return order === 'desc'
        ? (a, b) => descendingComparator(a, b, orderBy)
        : (a, b) => -descendingComparator(a, b, orderBy);
}

function stableSort<T>(array: T[], comparator: (a: T, b: T) => number) {
    const stabilizedThis = array.map((el, index) => [el, index] as [T, number]);
    stabilizedThis.sort((a, b) => {
        const order = comparator(a[0], b[0]);
        if (order !== 0) {
            return order;
        }
        return a[1] - b[1];
    });
    return stabilizedThis.map((el) => el[0]);
}

interface RouteParams {
    id: string
}

const ListCTVCalendar: React.FC = (): JSX.Element => {

    const dispatch = useDispatch();
    const params = useParams<RouteParams>();

    const [events, setEvents] = React.useState<IEvent[]>([]);
    const [anchorEl, setAnchorEl] = React.useState([null]);
    const manager = useSelector((state: RootState) => state.manager);

    const [page, setPage] = React.useState(0);
    const [rowsPerPage, setRowsPerPage] = React.useState(5);
    const [filterName, setFilterName] = React.useState('');

    const handleFilterByName = (event: any) => {
        setPage(0);
        const keyword = event.target.value;

        if (keyword !== '') {
            const results = manager?.events?.filter((event: any) => {
                return event.nameEvent.toLowerCase().startsWith(keyword.toLowerCase());
                // Use the toLowerCase() method to make it case-insensitive
            });
            setEvents(results);
        } else {
            setEvents(() => manager?.events?.filter((event: any) => event.nameEvent));
            // If the text field is empty, show all users
        }

        setFilterName(keyword);
    };

    const checkUserApply = manager?.events?.filter((event: any) => event._id == params.id);

    React.useEffect(() => {
        dispatch(getListCTV());
    }, [dispatch]);

    React.useEffect(() => {
        setEvents(() => checkUserApply);
    }, [manager]);

    React.useEffect(() => {
        document.title = "LIST CVT";
    }, []);

    const tableRef = React.useRef(null);

    const nameEvent = events.map((event: any) => event.nameEvent)

    return (

        <>
            <Container>
                <Card style={{ padding: "20px", marginTop: "40px", paddingBottom: "40px", borderRadius: "22px" }}>
                    <StyledRoot
                        style={{ display: "flex", flexDirection: "row" }}
                        sx={{
                            color: 'primary.main',
                            bgcolor: 'primary.lighter',
                        }}
                    >
                        <Box>
                            <Typography gutterBottom style={{ color: "black", fontSize: "22px" }}>
                                Danh Sách Cộng Tác Viên Theo Lịch Làm
                            </Typography>
                        </Box>
                        <Box style={{ display: "flex", flexDirection: "row" }} >
                            <Box style={{ marginRight: "14px" }}>
                                <StyledSearch
                                    style={{ borderRadius: '30px', fontSize: '13px', height: "48px" }}
                                    value={filterName}
                                    onChange={handleFilterByName}
                                    placeholder="Tìm kiếm..."
                                    startAdornment={
                                        <InputAdornment position="start" sx={{ paddingLeft: 1.3 }}>
                                            <SearchIcon style={{ width: '16px' }} sx={{ color: 'text.disabled' }} />
                                        </InputAdornment>
                                    }
                                />
                            </Box>
                            <DownloadTableExcel
                                filename={"Danh sách lịch làm ctv sự kiện " +nameEvent.toString()}
                                sheet={"Danh sách ctv sự kiện " + nameEvent.toString()}
                                currentTableRef={tableRef.current}

                            >
                                <Button>
                                    <img src="/icons8-excel-48.png" style={{ width: "30px" }}></img>
                                </Button>
                            </DownloadTableExcel>
                        </Box>
                    </StyledRoot>
                    <TableContainer>
                        {/* Table user */}
                        <Table ref={tableRef}>
                            <TableHead>
                                <TableRow>
                                    <TableCell
                                        align={'left'}
                                        style={{ fontSize: '13px' }}
                                    >
                                        Tên sự kiện
                                    </TableCell>
                                    <TableCell
                                        align={'left'}
                                        style={{ fontSize: '13px' }}
                                    >
                                        Tên công việc
                                    </TableCell>
                                    <TableCell
                                        align={'left'}
                                        style={{ fontSize: '13px' }}
                                    >
                                        Tên cộng tác viên
                                    </TableCell>
                                    <TableCell
                                        align={'left'}
                                        style={{ fontSize: '13px' }}
                                    >
                                        Ca làm
                                    </TableCell>
                                    <TableCell
                                        align={'left'}
                                        style={{ fontSize: '13px' }}
                                    >
                                        Ngày làm trong tuần
                                    </TableCell>
                                </TableRow>
                            </TableHead>
                            {events && events.length > 0 ? (
                                <TableBody>
                                    {events.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((event: any, index) =>
                                        <TableRow id="row" key={event._id}>
                                            <TableCell key={event._id} align="left" sx={{ width: "200px", fontSize: '12px' }}>
                                                <Box >
                                                    {event?.nameEvent ?? null}
                                                </Box>
                                            </TableCell>
                                            <TableCell align="left" sx={{ width: "200px", fontSize: '12px' }}>
                                                {event.usersApplyJob.filter((jobApply: any) => jobApply.notiApplyJob.includes("Bạn đã ứng tuyển thành công") && jobApply.acceptStatus.includes("Chờ phê duyệt")).map((job: any) =>
                                                    <Box key={job._id} style={{ display: "flex", flexDirection: "column", marginTop: "20px", paddingBottom: "20px" }}>
                                                        {job.jobEvent.nameJob}
                                                    </Box>
                                                )}
                                            </TableCell>
                                            <TableCell align="left" sx={{ width: "200px", fontSize: '12px' }}>
                                                {event.usersApplyJob.filter((jobApply: any) => jobApply.notiApplyJob.includes("Bạn đã ứng tuyển thành công") && jobApply.acceptStatus.includes("Chờ phê duyệt")).map((job: any) =>
                                                    <Box key={job._id} style={{ display: "flex", flexDirection: "column", marginTop: "20px", paddingBottom: "20px" }}>
                                                        {job.userApply.fullName}
                                                    </Box>
                                                )}
                                            </TableCell>
                                        </TableRow>
                                    )}
                                </TableBody>
                            ) : (
                                <TableBody>
                                    <TableRow>
                                        <TableCell align="center" colSpan={6} sx={{ py: 3 }}>
                                            <Typography variant="h6" paragraph>
                                                Không tồn tại user
                                            </Typography>

                                            <Typography variant="body2">
                                                Không tìm thấy kết quả &nbsp;
                                                <strong>&quot;{filterName}&quot;</strong>.
                                            </Typography>
                                        </TableCell>
                                    </TableRow>
                                </TableBody>
                            )}
                        </Table>
                    </TableContainer>
                </Card>
            </Container >
        </>
    );
};

export default ListCTVCalendar;
