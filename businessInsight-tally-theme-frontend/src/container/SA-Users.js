// ** React Imports
import { useEffect, useState } from 'react'

// ** Use-Debounce Import
import { useDebouncedCallback } from 'use-debounce'

// ** Next Imports

// ** MUI Imports
import SearchIcon from '@mui/icons-material/Search'
import CircularProgress from '@mui/material/CircularProgress'

import {
  InputAdornment,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TablePagination,
  TableRow,
  styled,
  useTheme,
  CardContent,
  FormControlLabel,
  FormGroup,
  Switch,
  TextField,
  Tooltip,
  Typography
} from '@mui/material'

// ** Third Party Styles Imports
import { useSnackbar } from 'notistack'
import 'react-datepicker/dist/react-datepicker.css'
import { useApproved, useSuperAdminUsers } from 'src/shared/utility/services/hooks/register'

// ** form validation import

const columns = [
  { id: 'username', label: 'User Name', minWidth: 170 },
  { id: 'email', label: 'Email', minWidth: 100 },
  { id: 'totalclient', label: 'Total Client', minWidth: 100, align: 'center' },
  {
    id: 'action',
    label: 'Action',
    minWidth: 170,
    align: 'center'
  }
]

const SA_Users = () => {
  // ** State
  const { enqueueSnackbar } = useSnackbar()
  const [totalCount, setTotalCount] = useState(0)

  const [searchQuery, setSearchQuery] = useState({
    isApproved: true,
    pageNo: 0,
    query: '',
    limit: 10
  })

  const [usersList, setUsersList] = useState([])

  const theme = useTheme()

  // ** Dynamic Pagination **
  const handleChangePage = (event, newPage) => {
    setSearchQuery(prevState => ({
      ...prevState,
      pageNo: newPage
    }))

    // Fetch data for the new page
    saUsers({
      isApproved: true,
      query: searchQuery?.query,
      limit: +searchQuery?.limit,
      pageNo: newPage + 1 // Adjusting page number (0-indexed to 1-indexed)
    })
  }

  const handleChangeRowsPerPage = event => {
    setSearchQuery(prevState => ({
      ...prevState,
      pageNo: 0,
      limit: +event.target.value
    }))

    // Fetch data with the new rows per page limit
    saUsers({
      isApproved: true,
      query: searchQuery?.query,
      limit: +event.target.value,
      pageNo: 1 // Resetting page number when changing rows per page
    })
  }

  const {
    data: saUsersData,
    isLoading: saUsersLoading,
    isError: saUsersIsError,
    error: saUsersError,
    mutate: saUsers
  } = useSuperAdminUsers()

  const handleSearchData = value => {
    const trimmedValue = value.trim()
    setSearchQuery(prevState => ({
      ...prevState,
      query: trimmedValue
    }))

    debouncedHandleSearch({
      isApproved: true,
      query: trimmedValue,
      limit: +searchQuery?.limit,
      pageNo: 1
    })
  }

  const debouncedHandleSearch = useDebouncedCallback(value => {
    saUsers(value)
  }, 800)

  useEffect(() => {
    saUsers({
      pageNo: 1,
      query: '',
      limit: 10
    })
  }, [])

  useEffect(() => {
    try {
      if (saUsersData && !saUsersLoading) {
        setTotalCount(+saUsersData?.total)
        setUsersList(saUsersData?.list || [])
      }
      if (saUsersIsError) {
        enqueueSnackbar(saUsersError?.response?.data?.message, { variant: 'error' })
      }
    } catch (err) {
      console.log('err', err)
    }
  }, [saUsersData, saUsersLoading, saUsersIsError])

  const {
    data: approvedData,
    isLoading: approvedLoading,
    isError: approvedIsError,
    error: approvedError,
    mutate: approved
  } = useApproved()

  const handleApprovedDisapproved = (Organization_id, value) => {
    approved({
      params: Organization_id,
      value: { isApproved: value }
    })
  }

  useEffect(() => {
    try {
      if (approvedData && !approvedLoading) {
        saUsers()
        enqueueSnackbar(approvedData?.message, { variant: 'success' })
      }
      if (approvedIsError) {
        enqueueSnackbar(approvedError?.response?.data?.message, { variant: 'error' })
      }
    } catch (err) {
      console.log('err', err)
    }
  }, [approvedData, approvedLoading, approvedIsError])

  const MaterialUISwitch = styled(Switch)(({ theme }) => ({
    width: 62,
    height: 34,
    padding: 7,
    '& .MuiSwitch-switchBase': {
      margin: 1,
      padding: 0,
      transform: 'translateX(6px)',
      '&.Mui-checked': {
        color: '#fff',
        backgroundColor: 'red !important',

        transform: 'translateX(22px)',
        '& .MuiSwitch-thumb:before': {
          backgroundColor: 'green',
          backgroundImage: `url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" height="15" width="15" viewBox="2 2 20 20"><path fill="${encodeURIComponent(
            '#fff'
          )}" d="M2 20h2c.55 0 1-.45 1-1v-9c0-.55-.45-1-1-1H2zm19.83-7.12c.11-.25.17-.52.17-.8V11c0-1.1-.9-2-2-2h-5.5l.92-4.65c.05-.22.02-.46-.08-.66-.23-.45-.52-.86-.88-1.22L14 2 7.59 8.41C7.21 8.79 7 9.3 7 9.83v7.84C7 18.95 8.05 20 9.34 20h8.11c.7 0 1.36-.37 1.72-.97z"/></svg>')`
        },
        '& + .MuiSwitch-track': {
          opacity: 1,
          backgroundColor: theme.palette.mode === 'dark' ? '#8796A5' : '#aab4be'
        }
      }
    },
    '& .MuiSwitch-thumb': {
      // backgroundColor: 'green !important',
      width: 32,
      height: 32,
      '&::before': {
        content: "''",
        position: 'absolute',
        width: '100%',
        height: '100%',
        left: 0,
        top: 0,
        backgroundRepeat: 'no-repeat',
        backgroundPosition: 'center',
        backgroundColor: 'red',
        borderRadius: '24px',
        backgroundImage: `url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" height="15" width="15" viewBox="2 2 20 20"><path fill="${encodeURIComponent(
          '#fff'
        )}" d="M22 4h-2c-.55 0-1 .45-1 1v9c0 .55.45 1 1 1h2zM2.17 11.12c-.11.25-.17.52-.17.8V13c0 1.1.9 2 2 2h5.5l-.92 4.65c-.05.22-.02.46.08.66.23.45.52.86.88 1.22L10 22l6.41-6.41c.38-.38.59-.89.59-1.42V6.34C17 5.05 15.95 4 14.66 4h-8.1c-.71 0-1.36.37-1.72.97z"/></svg>')`
      }
    },
    '& .MuiSwitch-track': {
      opacity: 1,
      backgroundColor: theme.palette.mode === 'dark' ? '#8796A5' : '#aab4be',
      borderRadius: 20 / 2
    }
  }))

  return (
    <>
      <Paper sx={{ width: '100%', overflow: 'hidden' }}>
        <CardContent
          sx={{
            display: 'flex',
            justifyContent: 'space-between',
            [theme.breakpoints.down('sm')]: {
              flexDirection: 'column'
            }
          }}
        >
          <Typography sx={{ mb: 4 }} variant='h5'>
            Partners
          </Typography>
          <TextField
            sx={{ marginBottom: 4 }}
            type='text'
            placeholder='Search Partners'
            InputProps={{
              startAdornment: (
                <InputAdornment position='start'>
                  <SearchIcon />
                </InputAdornment>
              )
            }}
            onChange={e => handleSearchData(e.target.value)}
          />
        </CardContent>
        <TableContainer sx={{ maxHeight: 440 }}>
          <Table stickyHeader aria-label='sticky table'>
            <TableHead>
              <TableRow>
                {columns.map(column => (
                  <TableCell key={column.id} align={column.align} sx={{ minWidth: column.minWidth }}>
                    {column.label}
                  </TableCell>
                ))}
              </TableRow>
            </TableHead>
            <TableBody>
              {saUsersLoading && (
                <>
                  <TableRow tabIndex={-1}>
                    <TableCell colSpan={6} align='center'>
                      <CircularProgress />
                    </TableCell>
                  </TableRow>
                </>
              )}

              {!saUsersLoading &&
                usersList?.length > 0 &&
                usersList.map((data, index) => {
                  return (
                    <TableRow hover role='checkbox' tabIndex={-1} key={index}>
                      <TableCell>
                        {data.firstname} {data.lastname}
                      </TableCell>
                      <TableCell>{data.email}</TableCell>
                      <TableCell align='center'>{data.company_count}</TableCell>
                      <TableCell
                        align={'center'}
                        style={{
                          color: 'blue',
                          cursor: 'pointer',
                          fontWeight: '600',
                          display: 'flex',
                          justifyContent: 'center'
                        }}
                      >
                        <Tooltip title={`${data.isApproved === true ? 'Approved' : 'Disapproved'}`} placement='right'>
                          <FormGroup>
                            <FormControlLabel
                              checked={data.isApproved}
                              control={<MaterialUISwitch sx={{}} defaultChecked />}
                              sx={{ margin: '0px !important' }}
                              label=''
                              onChange={() => handleApprovedDisapproved(data?.organization_id, !data.isApproved)}
                            />
                          </FormGroup>
                        </Tooltip>
                      </TableCell>
                    </TableRow>
                  )
                })}

              {!saUsersLoading && usersList?.length === 0 && (
                <>
                  <TableRow tabIndex={-1}>
                    <TableCell colSpan={6} align='center'>
                      No Data Available
                    </TableCell>
                  </TableRow>
                </>
              )}
            </TableBody>
          </Table>
        </TableContainer>
        <TablePagination
          component='div'
          rowsPerPageOptions={[2, 10, 25, 50, 100]}
          count={totalCount} // Update count with the length of dynamic data
          rowsPerPage={searchQuery?.limit}
          page={searchQuery?.pageNo}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </Paper>
    </>
  )
}

export default SA_Users
