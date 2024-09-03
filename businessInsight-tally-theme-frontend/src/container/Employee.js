// ** React Imports
import { useEffect, useState } from 'react'
import DeleteIcon from '@mui/icons-material/Delete'

// ** Use-Debounce Import
import { useDebouncedCallback } from 'use-debounce'

// ** MUI Imports
import AddCircleOutlineOutlinedIcon from '@mui/icons-material/AddCircleOutlineOutlined'
import SearchIcon from '@mui/icons-material/Search'

import {
  CircularProgress,
  Grid,
  InputAdornment,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TablePagination,
  TableRow,
  CardContent,
  TextField,
  Typography,
  useTheme,
  Modal,
  Box,
  Button
} from '@mui/material'

import { employRole, getRoleName, userRole } from 'src/shared/utility/helpers'

import { useSelector } from 'react-redux'
import { selectUser } from 'src/redux/reducers/authSlice'

// ** Third Party Styles Imports
import { LoadingButton } from '@mui/lab'
import { useSnackbar } from 'notistack'
import 'react-datepicker/dist/react-datepicker.css'
import { CustomModal } from 'src/@core/components/modal'
import { useDeleteEmployee, useEmployee, useInvite } from 'src/shared/utility/services/hooks/register'

// ** form validation import
import { useFormik } from 'formik'
import * as Yup from 'yup'
import DemoDialog from 'src/@core/components/DemoDialog/DemoDialog'

const columns = [
  { id: 'firstname', label: 'First Name', minWidth: 170 },
  { id: 'lastname', label: 'Last Name', minWidth: 170 },
  { id: 'email', label: 'Email', minWidth: 100 },
  { id: 'mobile', label: 'Mobile', minWidth: 100 },
  { id: 'role', label: 'Role', minWidth: 100 },
  { id: 'delete', label: 'Delete', minWidth: 100 }
]

const Employee = () => {
  // ** State
  const [open, setOpen] = useState(false)
  const [totalCount, setTotalCount] = useState(0)
  const [openDemoModal, setOpenDemoModal] = useState(false)
  const theme = useTheme()

  const [searchQuery, setSearchQuery] = useState({
    pageNo: 0,
    query: '',
    limit: 10
  })

  const [employeeList, setEmployeeList] = useState([])

  const { enqueueSnackbar } = useSnackbar()
  const user = useSelector(selectUser)

  const openModal = () => {
    setOpen(true)
  }

  const handleCloseDemoPopUp = value => {
    setOpenDemoModal(value)
  }

  const formik = useFormik({
    initialValues: {
      firstname: '',
      lastname: '',
      email: '',
      userType: 'employee'
    },
    validationSchema: Yup.object({
      firstname: Yup.string()
        .trim() // Removes leading/trailing whitespace
        .matches(/^[A-Za-z]+(?:\s+[A-Za-z]+)*$/, 'First name must contain only alphabetic characters')
        .min(2, 'First name must be at least two characters long')
        .max(50, 'First name must be at most 50 characters long')
        .required('Required'),
      lastname: Yup.string()
        .trim() // Removes leading/trailing whitespace
        .matches(/^[A-Za-z]+(?:\s+[A-Za-z]+)*$/, 'Last Name must contain only alphabetic characters')
        .min(2, 'Last Name must be at least two characters long')
        .max(50, 'Last Name must be at most 50 characters long')
        .required('Required'),
      email: Yup.string()
        .email('Invalid email address')
        .matches(/^\S+@\S+$/, 'Email address cannot contain whitespace')
        .matches(/^[^A-Z]*$/, 'Please enter a valid email address')
        .required('Required')
    }),
    onSubmit: values => {
      values.firstname = values.firstname.replace(/\s+/g, ' ').trim()
      values.lastname = values.lastname.replace(/\s+/g, ' ').trim()

      if (user?.demo) {
        setOpen(false)
        formik.resetForm()
        setOpenDemoModal(true)
      } else {
        invite(values)
      }
    }
  })

  const handleClose = () => {
    setOpen(false)
    formik.resetForm()
  }

  // ** handle Search **
  const handleSearchData = value => {
    const trimmedValue = value.trim()

    setSearchQuery(prevState => ({
      ...prevState,
      query: trimmedValue
    }))

    debouncedHandleSearch({
      query: trimmedValue,
      limit: +searchQuery?.limit,
      pageNo: 1
    })
  }

  const debouncedHandleSearch = useDebouncedCallback(value => {
    employee(value)
  }, 800)

  // ** Dynamic Pagination **
  const handleChangePage = (event, newPage) => {
    setSearchQuery(prevState => ({
      ...prevState,
      pageNo: newPage
    }))

    // Fetch data for the new page
    employee({
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
    employee({
      query: searchQuery?.query,
      limit: +event.target.value,
      pageNo: 1 // Resetting page number when changing rows per page
    })
  }

  const {
    data: employeeData,
    isLoading: employeeLoading,
    isError: employeeIsError,
    error: employeeError,
    mutate: employee
  } = useEmployee()

  const {
    data: deletedResponse,
    error: deletedError,
    mutate: deleteEmployee,
    isLoading: deleteLoading
  } = useDeleteEmployee()

  const {
    data: inviteData,
    isLoading: inviteLoading,
    isError: inviteIsError,
    error: inviteError,
    mutate: invite
  } = useInvite()

  useEffect(() => {
    employee({
      pageNo: 1,
      query: '',
      limit: 10
    })
  }, [])

  useEffect(() => {
    try {
      if (inviteData && !inviteLoading) {
        enqueueSnackbar(inviteData?.message, { variant: 'success' })
        formik.resetForm()
        setOpen(false)
      }
      if (inviteIsError) {
        enqueueSnackbar(inviteError?.response?.data?.message, { variant: 'error' })
      }
    } catch (err) {
      console.log('err', err)
    }
  }, [inviteData, inviteLoading, inviteIsError])

  useEffect(() => {
    try {
      if (deletedResponse && !deleteLoading) {
        enqueueSnackbar(deletedResponse?.message, { variant: 'success' })
      }
      if (deletedError) {
        enqueueSnackbar(deletedError?.response?.data?.message, { variant: 'error' })
      }
    } catch (err) {
      console.log('err', err)
    }
  }, [deletedResponse, deletedError, deleteLoading])

  useEffect(() => {
    try {
      if (employeeData && !employeeLoading) {
        setTotalCount(+employeeData?.total)
        setEmployeeList(employeeData?.list || [])
      }
      if (employeeIsError) {
        enqueueSnackbar(employeeError?.response?.data?.message, { variant: 'error' })
      }
    } catch (err) {
      console.log('err', err)
    }
  }, [employeeData, employeeLoading, employeeIsError])

  const handleDeleteEmpoyee = id => {
    setOpen(true)
    deleteEmployee(id)
  }

  return (
    <>
      <Paper sx={{ width: '100%', overflow: 'hidden' }}>
        <CardContent sx={{ display: 'flex', justifyContent: 'space-between' }}>
          <Typography sx={{ mb: 4 }} variant='h5'>
            Employee
          </Typography>
          {(user?.role === userRole.companyAdmin || user?.role === userRole.organizationAdmin) && (
            <LoadingButton
              size='large'
              variant='outlined'
              sx={{ marginBottom: 7, color: 'inherit ', borderColor: 'inherit ' }}
              onClick={openModal}
              startIcon={<AddCircleOutlineOutlinedIcon />}
            >
              Invite Employee
            </LoadingButton>
          )}
        </CardContent>

        <CardContent sx={{ display: 'flex', justifyContent: 'space-between' }}>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={4}>
              <TextField
                fullWidth
                sx={{ marginBottom: 4 }}
                type='text'
                onChange={e => handleSearchData(e.target.value)}
                placeholder='Search Employee'
                InputProps={{
                  startAdornment: (
                    <InputAdornment position='start'>
                      <SearchIcon />
                    </InputAdornment>
                  )
                }}
              />
            </Grid>
          </Grid>
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
              {employeeLoading && (
                <>
                  <TableRow tabIndex={-1}>
                    <TableCell colSpan={6} padding='20px' align='center'>
                      <CircularProgress />
                    </TableCell>
                  </TableRow>
                </>
              )}

              {!employeeLoading &&
                employeeList.length > 0 &&
                employeeList.map((employee, index) => {
                  return (
                    <TableRow hover role='checkbox' tabIndex={-1} key={index}>
                      <TableCell>{employee?.User?.firstname}</TableCell>
                      <TableCell>{employee?.User?.lastname}</TableCell>
                      <TableCell>{employee?.User?.email}</TableCell>
                      {!employee?.User?.mobileNo && <TableCell>-</TableCell>}
                      {employee?.User?.mobileNo && <TableCell>{employee?.User?.mobileNo}</TableCell>}
                      <TableCell>{getRoleName?.[employee?.User?.role]}</TableCell>
                      {!employRole.includes(employee.User.role) && (
                        <>
                          <TableCell onClick={() => handleDeleteEmpoyee(employee?.User?.id)}>
                            <DeleteIcon sx={{ verticalAlign: 'bottom', color: '#f02b3f', cursor: 'pointer' }} />
                          </TableCell>
                          <Modal open={open} onClose={handleClose}>
                            <Box>
                              <Typography id='modal-modal-title' variant='h6' component='h2'>
                                Are you sure you want to delete this user?
                              </Typography>
                              <Typography id='modal-modal-description' sx={{ mt: 2 }}>
                                <Button
                                  variant='contained'
                                  color='error'
                                  onClick={() => handleDeleteEmpoyee(employee?.User?._id)}
                                >
                                  Yes
                                </Button>
                                <Button color='secondary' onClick={handleClose} sx={{ ml: 2 }}>
                                  No
                                </Button>
                              </Typography>
                            </Box>
                          </Modal>
                        </>
                      )}
                    </TableRow>
                  )
                })}

              {!employeeLoading && employeeList.length === 0 && (
                <>
                  <TableRow tabIndex={-1}>
                    <TableCell colSpan={4} padding='20px' align='center'>
                      No Data Available
                    </TableCell>
                  </TableRow>
                </>
              )}
            </TableBody>
          </Table>
        </TableContainer>
        <TablePagination
          rowsPerPageOptions={[2, 10, 25, 50, 100]}
          component='div'
          count={totalCount}
          page={searchQuery?.pageNo}
          onPageChange={handleChangePage}
          rowsPerPage={searchQuery?.limit}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </Paper>
      <CustomModal open={open} onClose={handleClose} header='Employee'>
        <div style={{ mb: 6 }}>
          <Typography variant='h4' sx={{ fontWeight: 600, padding: '2rem 1rem', textAlign: 'center' }}>
            Invite Employee
          </Typography>
        </div>
        <form autoComplete='off' onSubmit={formik.handleSubmit}>
          <TextField
            fullWidth
            sx={{ marginBottom: 4 }}
            type='text'
            label='First Name'
            name='firstname'
            value={formik.values.firstname}
            onChange={formik.handleChange}
            helperText={formik.touched.firstname && formik.errors.firstname && formik.errors.firstname}
            error={formik.touched.firstname && formik.errors.firstname}
          />
          <TextField
            fullWidth
            sx={{ marginBottom: 4 }}
            type='text'
            label='Last Name'
            name='lastname'
            value={formik.values.lastname}
            onChange={formik.handleChange}
            helperText={formik.touched.lastname && formik.errors.lastname && formik.errors.lastname}
            error={formik.touched.lastname && formik.errors.lastname}
          />
          <TextField
            fullWidth
            sx={{ marginBottom: 4 }}
            type='email'
            label='Employee Email'
            name='email'
            value={formik.values.email}
            onChange={formik.handleChange}
            helperText={formik.touched.email && formik.errors.email && formik.errors.email}
            error={formik.touched.email && formik.errors.email}
          />
          <div style={{ display: 'flex', gap: 10, justifyContent: 'center' }}>
            <LoadingButton
              size='large'
              type='submit'
              variant='contained'
              sx={{ marginBottom: 7 }}
              loading={inviteLoading}
            >
              Invite
            </LoadingButton>
            <LoadingButton size='large' onClick={handleClose} variant='outlined' sx={{ marginBottom: 7 }}>
              Cancel
            </LoadingButton>
          </div>
        </form>
      </CustomModal>
      <DemoDialog open={openDemoModal} close={handleCloseDemoPopUp} />
    </>
  )
}

export default Employee
