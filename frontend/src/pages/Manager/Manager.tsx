import * as React from "react";
import { styled, alpha } from "@material-ui/core/styles";
import { useDispatch, useSelector } from "react-redux";
import { getUsers } from "redux/actions/Manager";
import { RootState } from "redux/reducers";
import { IUser } from "redux/types/user";
import { TableSortLabel, Toolbar, OutlinedInput, InputAdornment, Card, Container, Stack, Table, TableBody, TableCell, TableContainer, TableHead, TablePagination, TableRow, Typography } from "@mui/material";
// icons
// @mui
import SearchIcon from '@mui/icons-material/Search';
import { Box } from "@mui/system";
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
  _id: keyof IUser;
  username: keyof IUser;
  email: keyof IUser;
  department: keyof IUser;
  role: keyof IUser;
}

interface HeadCell {
  disablePadding: boolean;
  _id: keyof DataUser;
  label: string;
  numeric: boolean;
}

const headCells: HeadCell[] = [
  {
    _id: 'username',
    numeric: false,
    disablePadding: true,
    label: 'Username',
  },
  {
    _id: 'email',
    numeric: true,
    disablePadding: false,
    label: 'Email',
  },
  {
    _id: 'role',
    numeric: true,
    disablePadding: false,
    label: 'Role',
  },
  {
    _id: 'department',
    numeric: true,
    disablePadding: false,
    label: 'Department',
  }
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
    <TableHead>
      <TableRow>
        {headCells.map((headCell) => (
          <TableCell
            key={headCell._id}
            align={headCell.numeric ? 'right' : 'left'}
            padding={headCell.disablePadding ? 'none' : 'normal'}
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

  const [users, setUsers] = React.useState<IUser[]>([]);
  const manager = useSelector((state: RootState) => state.manager);

  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(5);
  const [filterName, setFilterName] = React.useState('');

  const [order, setOrder] = React.useState<Order>('asc');
  const [orderBy, setOrderBy] = React.useState<keyof DataUser>('username');


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
      const results = manager?.users?.filter((user: any) => {
        if (user.role.keyRole !== "admin")
          return user.username.toLowerCase().startsWith(keyword.toLowerCase());
        // Use the toLowerCase() method to make it case-insensitive
      });
      setUsers(results);
    } else {
      setUsers(() => manager?.users?.filter((user: any) => user.role.keyRole === "user" || user.role.keyRole === "manager" || user.role.keyRole === "smanager"));
      // If the text field is empty, show all users
    }

    setFilterName(keyword);
  };

  const sortUser = stableSort(users, getComparator(order, orderBy));

  React.useEffect(() => {
    dispatch(getUsers());

  }, [dispatch]);

  React.useEffect(() => {
    setUsers(() => manager?.users?.filter((user: any) => user.role.keyRole === "user" || user.role.keyRole === "manager"));
  }, [manager]);



  return (

    <>
      <Container>
        <Stack direction="row" alignItems="center" justifyContent="space-between" mb={5}>
          <Typography variant="h4" gutterBottom>
            User
          </Typography>
        </Stack>

        <Card>
          <StyledRoot
            sx={{
              color: 'primary.main',
              bgcolor: 'primary.lighter',
            }}
          >
            <StyledSearch
              value={filterName}
              onChange={handleFilterByName}
              placeholder="Tìm kiếm user..."
              startAdornment={
                <InputAdornment position="start">
                  <SearchIcon sx={{ color: 'text.disabled', width: 20, height: 20 }} />
                </InputAdornment>
              }
            />
          </StyledRoot>
          <TableContainer>
            {/* Table user */}
            <Table >
              <EnhancedTableHead
                order={order}
                orderBy={orderBy}
                onRequestSort={handleRequestSort}
              />
              {users && users.length > 0 ? (
                <TableBody>
                  {sortUser.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((user: any) =>
                    <TableRow key={user.username}>
                      <TableCell align="right">
                        {user.username}
                      </TableCell>

                      <TableCell align="right">
                        {user.email}
                      </TableCell>

                      <TableCell align="right">
                        {user.role.keyRole}
                      </TableCell>


                      <TableCell align="right">
                        {user.department.nameDepartment}
                      </TableCell >
                      {/* Button delete */}
                      {/* <TableCell align="center">
                      {
                        <Button style={{ backgroundColor: "black", color: "white", padding: "4px 10px" }}
                          type='button'
                          variant='contained'
                          color='secondary'
                          size='small'
                          onClick={(e) => dispatch(deleteUser(user._id))}
                        >
                          Xóa
                        </Button>
                      }
                    </TableCell> */}
                    </TableRow>
                  )}

                  <TableRow>
                    <TablePagination
                      rowsPerPageOptions={[5, 10, 25]}
                      labelRowsPerPage={"Số lượng hàng:"}
                      count={users.length}
                      rowsPerPage={rowsPerPage}
                      page={page}
                      onPageChange={handleChangePage}
                      onRowsPerPageChange={handleChangeRowsPerPage}
                    />
                  </TableRow>
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

            {/* <div style={{ textAlign: "center", marginTop: "30px" }}>
          <Link to="registerAdmin">
            <button style={{ fontSize: "20px", backgroundColor: "#000", color: "#fff", border: "10px solid black" }}>TẠO TÀI KHOẢN</button>
          </Link>
        </div>

       
        <div style={{ textAlign: "center", marginTop: "20px" }}>
          <Link to="adddepartment">
            <button style={{ fontSize: "20px", backgroundColor: "#000", color: "#fff", border: "10px solid black" }}>Thêm tòa nhà</button>
          </Link>
        </div> */}


          </TableContainer>
        </Card>
      </Container>
    </>
  );
};

export default Users;
