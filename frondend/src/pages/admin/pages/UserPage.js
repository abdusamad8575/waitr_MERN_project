import { Helmet } from 'react-helmet-async';
import { filter } from 'lodash';
import { useEffect, useState } from 'react';
// @mui
import {
  Card,
  Table,
  Stack,
  Paper,
  // Avatar,
  Popover,
  Checkbox,
  TableRow,
  MenuItem,
  TableBody,
  TableCell,
  Container,
  Typography,
  IconButton,
  TableContainer,
  TablePagination,
  Tooltip,
} from '@mui/material';
// components
import Label from '../components/label';
import Iconify from '../components/iconify';
import Scrollbar from '../components/scrollbar';
// sections
import { UserListHead, UserListToolbar } from '../sections/@dashboard/user';
// mock
import USERLIST from '../_mock/user';
import axiosInstance from '../../../axios';
import { useDispatch, useSelector } from 'react-redux';
import { setUserDatas } from '../../../redux-toolkit/adminSlice'

// ----------------------------------------------------------------------

const TABLE_HEAD = [
  { id: 'name', label: 'Name', alignRight: false },
  { id: 'email', label: 'email', alignRight: false },
  // { id: 'role', label: 'Role', alignRight: false },
  { id: 'adminVerify', label: 'AddHOtelREq', alignRight: false },
  { id: 'status', label: 'Status', alignRight: false },
  { id: '' },
];

// ----------------------------------------------------------------------

function descendingComparator(a, b, orderBy) {
  if (b[orderBy] < a[orderBy]) {
    return -1;
  }
  if (b[orderBy] > a[orderBy]) {
    return 1;
  }
  return 0;
}

function getComparator(order, orderBy) {
  return order === 'desc'
    ? (a, b) => descendingComparator(a, b, orderBy)
    : (a, b) => -descendingComparator(a, b, orderBy);
}

function applySortFilter(array, comparator, query) {
  const stabilizedThis = array.map((el, index) => [el, index]);
  stabilizedThis.sort((a, b) => {
    const order = comparator(a[0], b[0]);
    if (order !== 0) return order;
    return a[1] - b[1];
  });
  if (query) {
    return filter(array, (_user) => _user.name.toLowerCase().indexOf(query.toLowerCase()) !== -1);
  }
  return stabilizedThis.map((el) => el[0]);
}

export default function UserPage() {
  const userDatas = useSelector((state) => state.admin.userDatas);
  const dispatch = useDispatch();


  const [open, setOpen] = useState(null);

  const [userData, setUserData] = useState([]);

  const [page, setPage] = useState(0);

  const [order, setOrder] = useState('asc');

  const [selected, setSelected] = useState([]);

  const [orderBy, setOrderBy] = useState('name');

  const [filterName, setFilterName] = useState('');

  const [rowsPerPage, setRowsPerPage] = useState(5);

  const [clickId, setClickId] = useState('');

  useEffect(() => {
    const fetchuserData = async () => {
      const res = await axiosInstance.get('/dashboard/fetchUserData');
      const userData = res.data.users;
      setUserData(userData)
    }
    fetchuserData()
  }, [userDatas])

  const handleOpenMenu = (event) => {
    setOpen(event.currentTarget);

  };
  const handleIdPass = (id) => {
    setClickId(id)
  }

  const handleCloseMenu = () => {
    setOpen(null);
  };

  const handleRequestSort = (event, property) => {
    const isAsc = orderBy === property && order === 'asc';
    setOrder(isAsc ? 'desc' : 'asc');
    setOrderBy(property);
  };

  const handleSelectAllClick = (event) => {
    if (event.target.checked) {
      const newSelecteds = USERLIST.map((n) => n.name);
      setSelected(newSelecteds);
      return;
    }
    setSelected([]);
  };

  const handleClick = (event, name) => {
    const selectedIndex = selected.indexOf(name);
    let newSelected = [];
    if (selectedIndex === -1) {
      newSelected = newSelected.concat(selected, name);
    } else if (selectedIndex === 0) {
      newSelected = newSelected.concat(selected.slice(1));
    } else if (selectedIndex === selected.length - 1) {
      newSelected = newSelected.concat(selected.slice(0, -1));
    } else if (selectedIndex > 0) {
      newSelected = newSelected.concat(selected.slice(0, selectedIndex), selected.slice(selectedIndex + 1));
    }
    setSelected(newSelected);
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setPage(0);
    setRowsPerPage(parseInt(event.target.value, 10));
  };

  const handleFilterByName = (event) => {
    setPage(0);
    setFilterName(event.target.value);
  };

  const emptyRows = page > 0 ? Math.max(0, (1 + page) * rowsPerPage - USERLIST.length) : 0;

  const filteredUsers = applySortFilter(userData, getComparator(order, orderBy), filterName);

  const isNotFound = !filteredUsers.length && !!filterName;

  const handleAdminVerify = async (id) => {
    try {
      await axiosInstance.patch('/dashboard/adminVerify', { id })
        .then(res => dispatch(setUserDatas(res.data)))
        .catch(error => {
          console.error('Error fetching data:', error);
        });
      // Update the local state to reflect the changes made in the backend
      setUserData((prevUserData) =>
        prevUserData.map((state) =>
          state._id === id ? { ...state, addHotel: [{ ...state.addHotel[0], adminverify: false }] } : state
        )
      );
    } catch (error) {
      console.log(error);
    }
  };
  const handleBlock = async (id) => {
    await axiosInstance.patch('/dashboard/adminBlocked', { id })
      .then((res) => {
        const changeData = res.data.user.AdminBlocked;
        console.log("changeData", changeData)
        setUserData((prev) =>
          prev.map((state) =>
            state._id === id ? { ...state, AdminBlocked: changeData } : state
          )
        )
      })
      .catch(error => {
        console.error('Error fetching data:', error);
      });
    setOpen(null)
  }

  return (
    <>
      <Helmet>
        <title> User | dashboard </title>
      </Helmet>

      <Container>
        <Stack direction="row" alignItems="center" justifyContent="space-between" mb={5}>
          <Typography variant="h4" gutterBottom>
            User
          </Typography>
        </Stack>

        <Card>
          <UserListToolbar numSelected={selected.length} filterName={filterName} onFilterName={handleFilterByName} />

          <Scrollbar>
            <TableContainer sx={{ minWidth: 800 }}>
              <Table>
                <UserListHead
                  order={order}
                  orderBy={orderBy}
                  headLabel={TABLE_HEAD}
                  rowCount={USERLIST.length}
                  numSelected={selected.length}
                  onRequestSort={handleRequestSort}
                  onSelectAllClick={handleSelectAllClick}
                />
                <TableBody>
                  {filteredUsers.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((row, index) => {
                    const { _id, firstName, lastName, email, addHotel, AdminBlocked } = row;

                    const selectedUser = selected.indexOf(firstName) !== -1;

                    return (
                      <TableRow hover key={_id} tabIndex={-1} role="checkbox" selected={selectedUser}>
                        <TableCell padding="checkbox">
                          <Checkbox checked={selectedUser} onChange={(event) => handleClick(event, firstName)} />
                        </TableCell>

                        <TableCell component="th" scope="row" padding="none">
                          <Stack direction="row" alignItems="center" spacing={2}>
                            {/* <Avatar alt={firstName} src={avatarUrl} /> */}
                            <Typography variant="subtitle2" noWrap>
                              {firstName + " " + lastName}
                            </Typography>
                          </Stack>
                        </TableCell>

                        <TableCell align="left">{email}</TableCell>

                        {/* <TableCell align="left">{role}</TableCell> */}

                        <TableCell align="left">{addHotel[index]?.adminverify ?
                          <Tooltip title=" Mark all as read">
                            <IconButton color="primary" onClick={() => handleAdminVerify(_id)}>
                              <Iconify icon="eva:done-all-fill" />
                            </IconButton>
                          </Tooltip> : <Label color={'success'}>verified</Label>}</TableCell>

                        <TableCell align="left">
                          <Label color={(AdminBlocked === 0 && 'error') || 'success'}>{AdminBlocked === 1 ? 'Available' : 'Blocked'}</Label>
                        </TableCell>

                        <TableCell align="right" onClick={() => handleIdPass(_id)}>
                          <IconButton size="large" color="inherit" onClick={handleOpenMenu}>
                            <Iconify icon={'eva:more-vertical-fill'} />
                          </IconButton>
                        </TableCell>

                      </TableRow>
                    );
                  })}
                  {emptyRows > 0 && (
                    <TableRow style={{ height: 53 * emptyRows }}>
                      <TableCell colSpan={6} />
                    </TableRow>
                  )}
                </TableBody>

                {isNotFound && (
                  <TableBody>
                    <TableRow>
                      <TableCell align="center" colSpan={6} sx={{ py: 3 }}>
                        <Paper
                          sx={{
                            textAlign: 'center',
                          }}
                        >
                          <Typography variant="h6" paragraph>
                            Not found
                          </Typography>

                          <Typography variant="body2">
                            No results found for &nbsp;
                            <strong>&quot;{filterName}&quot;</strong>.
                            <br /> Try checking for typos or using complete words.
                          </Typography>
                        </Paper>
                      </TableCell>
                    </TableRow>
                  </TableBody>
                )}
              </Table>
            </TableContainer>
          </Scrollbar>

          <TablePagination
            rowsPerPageOptions={[5, 10, 25]}
            component="div"
            count={USERLIST.length}
            rowsPerPage={rowsPerPage}
            page={page}
            onPageChange={handleChangePage}
            onRowsPerPageChange={handleChangeRowsPerPage}
          />
        </Card>
      </Container>
      <Popover
        open={Boolean(open)}
        anchorEl={open}
        onClose={handleCloseMenu}
        anchorOrigin={{ vertical: 'top', horizontal: 'left' }}
        transformOrigin={{ vertical: 'top', horizontal: 'right' }}
        PaperProps={{
          sx: {
            p: 1,
            width: 140,
            '& .MuiMenuItem-root': {
              px: 1,
              typography: 'body2',
              borderRadius: 0.75,
            },
          },
        }}
      >
        <MenuItem>
          <Iconify icon={'eva:edit-fill'} sx={{ mr: 2 }} />
          Edit
        </MenuItem>
        {/* {console.log(open)}  */}
        <MenuItem sx={{ color: 'error.main' }} onClick={() => handleBlock(clickId)}>
          <Iconify icon={'eva:trash-2-outline'} sx={{ mr: 2 }} />
          Block
        </MenuItem>
      </Popover>


    </>
  );
}
