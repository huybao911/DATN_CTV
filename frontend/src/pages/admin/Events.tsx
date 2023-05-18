import * as React from "react";
import { styled, alpha } from "@material-ui/core/styles";
import { useDispatch, useSelector } from "react-redux";
import { getEvents } from "redux/actions/admin";
import { RootState } from "redux/reducers";
import { IEvent } from "redux/types/event";
import { Box,TableSortLabel, Toolbar, OutlinedInput, InputAdornment, Card, Container, Table, TableBody, TableCell, TableContainer, TableHead, TablePagination, TableRow, Typography } from "@mui/material";
// @mui
import SearchIcon from '@mui/icons-material/Search';
import { visuallyHidden } from '@mui/utils';

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
  quantityUser: keyof IEvent;
  job: keyof IEvent;
  departmentEvent: keyof IEvent;
  costs: keyof IEvent;
  dayStart: keyof IEvent;
  dayEnd: keyof IEvent;
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
    _id: 'quantityUser',
    numeric: false,
    label: 'Số lượng người',
  },
  {
    _id: 'job',
    numeric: false,
    label: 'Công việc',
  },
  {
    _id: 'departmentEvent',
    numeric: false,
    label: 'Khoa',
  },
  {
    _id: 'costs',
    numeric: false,
    label: 'Chi phí',
  },
  {
    _id: 'dayStart',
    numeric: false,
    label: 'Ngày bắt đầu',
  },
  {
    _id: 'dayEnd',
    numeric: false,
    label: 'Ngày kết thúc',
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

const Users: React.FC = (): JSX.Element => {

  const dispatch = useDispatch();

  const [events, setEvents] = React.useState<IEvent[]>([]);
  const admin = useSelector((state: RootState) => state.admin);

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
      const results = admin?.events?.filter((event: any) => {
        return event.nameEvent.toLowerCase().startsWith(keyword.toLowerCase());
        // Use the toLowerCase() method to make it case-insensitive
      });
      setEvents(results);
    } else {
      setEvents(() => admin?.events?.filter((event: any) => event.nameEvent || event.quantityUser || event.departmentEvent || event.costs || event.dayStart || event.dayEnd));
      // If the text field is empty, show all users
    }

    setFilterName(keyword);
  };

  const sortEvent = stableSort(events, getComparator(order, orderBy));

  React.useEffect(() => {
    dispatch(getEvents());
  }, [dispatch]);

  React.useEffect(() => {

    setEvents(() => admin?.events?.filter((event: any) => event.nameEvent || event.quantityUser || event.departmentEvent || event.costs || event.dayStart || event.dayEnd));
  }, [admin]);

  React.useEffect(() => {
    document.title = "EVENT";
  }, []);

  return (

    <>
      <Container>
        <Card style={{ padding: "20px", marginTop: "80px", paddingBottom: "40px", borderRadius: "22px" }}>
          <StyledRoot
            style={{ display: "flex", flexDirection: "row" }}
            sx={{
              color: 'primary.main',
              bgcolor: 'primary.lighter',
            }}
          >
            <Box>
              <Typography gutterBottom style={{ color: "black", fontSize: "22px" }}>
                Sự Kiện
              </Typography>
            </Box>
            <Box style={{ display: "flex", flexDirection: "row" }} >
              <Box style={{ marginRight: "14px" }}>
                <StyledSearch
                  style={{ borderRadius: '30px', fontSize: '13px', height: "48px" }}
                  value={filterName}
                  onChange={handleFilterByName}
                  placeholder="Tìm kiếm sự kiện..."
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
            <Table >
              <EnhancedTableHead
                order={order}
                orderBy={orderBy}
                onRequestSort={handleRequestSort}
              />
              {events && events.length > 0 ? (
                <TableBody>
                  {sortEvent.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((event: any, index) =>
                    <TableRow key={event._id}>
                      <TableCell align="left" sx={{ width: "300px", paddingLeft: "26px", fontSize: '12px' }}>
                        {event.nameEvent}
                      </TableCell>

                      <TableCell align="left" sx={{ width: "400px", fontSize: '12px' }}>
                        {event.quantityUser}
                      </TableCell>

                      <TableCell align="left">
                        {event.job.map((job: any) =>
                          <Box key={job._id} sx={{ width: "100px", fontSize: '12px' }}>
                            - {job.nameJob}
                          </Box>
                        )}
                      </TableCell>

                      <TableCell align="left" sx={{ width: "300px", fontSize: '12px' }}>
                        {event.departmentEvent.nameDepartment}
                      </TableCell>

                      <TableCell align="left" sx={{ width: "200px", fontSize: '12px' }}>
                        {event.costs}
                      </TableCell >

                      <TableCell align="left" sx={{ width: "300px", fontSize: '12px' }}>
                        {event.dayStart}
                      </TableCell >

                      <TableCell align="left" sx={{ width: "300px", fontSize: '12px' }}>
                        {event.dayEnd}
                      </TableCell >                   
                    </TableRow>
                  )}

                  <TableRow>
                    <TablePagination
                      style={{ fontSize: "12px" }}
                      sx={{
                        '& .MuiTablePagination-select': {
                          width: "12px"
                        },
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
                        MenuProps:{
                          sx: {
                            "&& .MuiTablePagination-menuItem": {
                              fontSize: "12px"
                            }
                          }
                        }
                      }}
                    />
                  </TableRow>
                </TableBody>
              ) : (
                <TableBody>
                  <TableRow>
                    <TableCell align="center" colSpan={6} sx={{ py: 3 }}>
                      <Typography variant="h6" paragraph>
                        Không tồn tại sự kiện
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
      </Container>
    </>
  );
};

export default Users;
