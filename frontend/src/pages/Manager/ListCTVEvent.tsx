import * as React from "react";
import { styled, alpha } from "@material-ui/core/styles";
import { useDispatch, useSelector } from "react-redux";
import { getListCTV, acceptCTV, unacceptCTV } from "redux/actions/Manager";
import { RootState } from "redux/reducers";
import { IEvent } from "redux/types/event";
import UpdateCoefficient from "./UpdateCoefficient"
import { IconButton, TableSortLabel, Toolbar, OutlinedInput, InputAdornment, Card, Container, Table, TableBody, TableCell, TableContainer, TableHead, TablePagination, TableRow, Typography, Popover, Button } from "@mui/material";
// @mui
import SearchIcon from '@mui/icons-material/Search';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import HighlightOffIcon from '@mui/icons-material/HighlightOff';
import { Box } from "@mui/system";
import { visuallyHidden } from '@mui/utils';

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

interface DataUser {
  _id: keyof IEvent;
  nameEvent: keyof IEvent;
  nameJob: keyof IEvent;
  userApply: keyof IEvent;
  unitPrice: keyof IEvent;
  coefficient: keyof IEvent;
  total: keyof IEvent;
  acceptStatus: keyof IEvent;
  accept: keyof IEvent;
  unaccept: keyof IEvent;
}

interface HeadCell {
  _id: keyof DataUser;
  label: string;
  numeric: boolean;
}

const headCells: HeadCell[] = [
  {
    _id: 'nameEvent',
    numeric: false,
    label: 'Tên sự kiện',
  },
  {
    _id: 'nameJob',
    numeric: false,
    label: 'Tên công việc',
  },
  {
    _id: 'userApply',
    numeric: false,
    label: 'Tên Cộng Tác Viên',
  },
  {
    _id: 'unitPrice',
    numeric: false,
    label: 'Lương',
  },
  {
    _id: 'coefficient',
    numeric: false,
    label: 'Hệ số',
  },
  {
    _id: 'total',
    numeric: false,
    label: 'Thành tiền',
  },
  {
    _id: 'acceptStatus',
    numeric: false,
    label: 'Trạng thái',
  },
  {
    _id: 'accept',
    numeric: false,
    label: '',
  },
  {
    _id: 'unaccept',
    numeric: false,
    label: '',
  },
];


interface EnhancedTableProps {
  onRequestSort: (event: React.MouseEvent<unknown>, property: keyof DataUser) => void;
  order: Order;
  orderBy: string;
}

function EnhancedTableHead(props: EnhancedTableProps) {
  const { order, orderBy, onRequestSort } =
    props;
  const createSortHandler =
    (property: keyof DataUser) => (event: React.MouseEvent<unknown>) => {
      onRequestSort(event, property);
    };
  return (
    <TableHead style={{ backgroundColor: "#f4f5f5" }}
      sx={{
        '& th:first-child': {
          borderRadius: '1em 0 0 0'
        },
        '& th:last-child': {
          borderRadius: '0 1em 0 0'
        }
      }}>
      <TableRow>
        {headCells.map((headCell) => (
          <TableCell
            key={headCell._id}
            align={headCell.numeric ? 'right' : 'left'}
            style={{ fontSize: '13px' }}
            sortDirection={orderBy === headCell._id ? order : false}
          >
            <TableSortLabel
              active={orderBy === headCell._id}
              direction={orderBy === headCell._id ? order : 'asc'}
              onClick={createSortHandler(headCell._id)}
            >
              {headCell.label}
              {orderBy === headCell._id ? (
                <Box component="span" sx={visuallyHidden}>
                  {order === 'desc' ? 'sorted descending' : 'sorted ascending'}
                </Box>
              ) : null}
            </TableSortLabel>
          </TableCell>
        ))}
      </TableRow>
    </TableHead>
  );
}

interface RouteParams {
  id: string
}

const ListCTVEvent: React.FC = (): JSX.Element => {

  const dispatch = useDispatch();
  const params = useParams<RouteParams>();

  const [events, setEvents] = React.useState<IEvent[]>([]);
  const [anchorEl, setAnchorEl] = React.useState([null]);
  const manager = useSelector((state: RootState) => state.manager);

  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(5);
  const [filterName, setFilterName] = React.useState('');

  const [order, setOrder] = React.useState<Order>('asc');
  const [orderBy, setOrderBy] = React.useState<keyof DataUser>('nameEvent');

  const handleRequestSort = (
    event: React.MouseEvent<unknown>,
    property: keyof DataUser,
  ) => {
    const isAsc = orderBy === property && order === 'asc';
    setOrder(isAsc ? 'desc' : 'asc');
    setOrderBy(property);
  };

  const handleChangeRowsPerPage = (event: any) => {
    setPage(0);
    setRowsPerPage(parseInt(event.target.value, 10));
  };

  const handleChangePage = (event: any, newPage: any) => {
    setPage(newPage);
  };

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

  const handleOpenMenu = (jobEvent: any, index: any) => {
    const newAnchorEls = [
      ...anchorEl.slice(0, index),
      jobEvent.currentTarget,
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

  const sortApplyJob = stableSort(events, getComparator(order, orderBy));

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
                Danh Sách Cộng Tác Viên
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
            </Box>
          </StyledRoot>
          <TableContainer>
            {/* Table user */}
            <Table ref={tableRef}>
              <EnhancedTableHead
                order={order}
                orderBy={orderBy}
                onRequestSort={handleRequestSort}
              />
              {events && events.length > 0 ? (
                <TableBody>
                  {sortApplyJob.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((event: any, index) =>
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
                      <TableCell align="left" sx={{ width: "300px", fontSize: '12px' }}>
                        {event.usersApplyJob.filter((jobApply: any) => jobApply.notiApplyJob.includes("Bạn đã ứng tuyển thành công") && jobApply.acceptStatus.includes("Chờ phê duyệt")).map((job: any) =>
                          <Box key={job._id} style={{ display: "flex", flexDirection: "column", marginTop: "20px", paddingBottom: "20px" }}>
                            {new Intl.NumberFormat().format(job.jobEvent.unitPrice)} VND
                          </Box>
                        )}
                      </TableCell>
                      <TableCell align="left" sx={{ width: "250px", fontSize: '12px' }}>
                        {event.usersApplyJob.filter((jobApply: any) => jobApply.notiApplyJob.includes("Bạn đã ứng tuyển thành công") && jobApply.acceptStatus.includes("Chờ phê duyệt")).map((job: any, index: number) =>
                          <Box key={job._id} style={{ display: "flex", flexDirection: "column", marginTop: "14px", paddingBottom: "14px" }}>
                            <Button style={{ fontSize: '12px', fontWeight: "normal", textTransform: "lowercase", width: "20px" }} size="small" color="inherit" onClick={(jobApply) => handleOpenMenu(jobApply, index)} >
                              {job.coefficient}
                            </Button>
                            <Popover
                              open={!!anchorEl[index]}
                              anchorEl={anchorEl[index]}
                              onClose={() => handleCloseMenu(index)}
                              anchorOrigin={{ vertical: 'top', horizontal: 'left' }}
                              transformOrigin={{ vertical: 'top', horizontal: 'right' }}
                              PaperProps={{
                                sx: {

                                  width: 340,
                                  '& .MuiMenuItem-root': {
                                    px: 1,
                                    typography: 'body2',
                                    borderRadius: 0.75,
                                  },
                                },
                              }}
                            >
                              <UpdateCoefficient event={event} job={job} key={event._id} />
                            </Popover>
                          </Box>
                        )}
                      </TableCell>
                      <TableCell align="left" sx={{ width: "300px", fontSize: '12px' }}>
                        {event.usersApplyJob.filter((jobApply: any) => jobApply.notiApplyJob.includes("Bạn đã ứng tuyển thành công") && jobApply.acceptStatus.includes("Chờ phê duyệt")).map((job: any) =>
                          <Box key={job._id} style={{ display: "flex", flexDirection: "column", marginTop: "20px", paddingBottom: "20px" }}>
                            {new Intl.NumberFormat().format(job.total)} VND
                          </Box>
                        )}
                      </TableCell>
                      <TableCell align="left" sx={{ width: "300px", fontSize: '12px' }}>
                        {event.usersApplyJob.filter((jobApply: any) => jobApply.notiApplyJob.includes("Bạn đã ứng tuyển thành công") && jobApply.acceptStatus.includes("Chờ phê duyệt")).map((job: any) =>
                          <Box key={job._id} style={{ display: "flex", flexDirection: "column", marginTop: "20px", paddingBottom: "20px" }}>
                            {job.acceptStatus}
                          </Box>
                        )}
                      </TableCell>
                      <TableCell align="left" sx={{ width: "50px", fontSize: '12px' }}>
                        {event.usersApplyJob.filter((jobApply: any) => jobApply.notiApplyJob.includes("Bạn đã ứng tuyển thành công") && jobApply.acceptStatus.includes("Chờ phê duyệt")).map((job: any) =>
                          <Box key={job._id} style={{ display: "flex", flexDirection: "column", marginTop: "5px", paddingBottom: "10px" }}>
                            <IconButton onClick={(e) => dispatch(acceptCTV(event._id, job._id))} style={{ color: "green" }}>
                              <CheckCircleOutlineIcon />
                            </IconButton>
                          </Box>
                        )}
                      </TableCell>
                      <TableCell align="left" sx={{ width: "50px", fontSize: '12px' }}>
                        {event.usersApplyJob.filter((jobApply: any) => jobApply.notiApplyJob.includes("Bạn đã ứng tuyển thành công") && jobApply.acceptStatus.includes("Chờ phê duyệt")).map((job: any) =>
                          <Box key={job._id} style={{ display: "flex", flexDirection: "column", marginTop: "5px", paddingBottom: "10px" }}>
                            <IconButton onClick={(e) => dispatch(unacceptCTV(event._id, job._id))} style={{ color: "red" }}>
                              <HighlightOffIcon />
                            </IconButton>
                          </Box>
                        )}
                      </TableCell>
                    </TableRow>
                  )}

                  <TablePagination
                    style={{ fontSize: "12px" }}
                    sx={{
                      '& .MuiTablePagination-selectLabel': {
                        fontSize: "12px"
                      },
                      '& .MuiTablePagination-selectIcon': {
                        width: "16px"
                      },
                      '& .MuiTablePagination-displayedRows': {
                        fontSize: "12px"
                      },
                      '& .MuiSvgIcon-root': {
                        fontSize: "16px"
                      },
                    }}
                    rowsPerPageOptions={[5, 10, 25]}
                    labelRowsPerPage={"Số lượng hàng:"}
                    count={events.length}
                    rowsPerPage={rowsPerPage}
                    page={page}
                    onPageChange={handleChangePage}
                    onRowsPerPageChange={handleChangeRowsPerPage}
                    SelectProps={{
                      MenuProps: {
                        sx: {
                          "&& .MuiTablePagination-menuItem": {
                            fontSize: "12px"
                          }
                        }
                      }
                    }}
                  />
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

export default ListCTVEvent;
